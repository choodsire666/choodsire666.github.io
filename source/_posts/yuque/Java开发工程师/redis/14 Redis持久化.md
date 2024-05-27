**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)<br />单机的Redis存在四大问题：<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532308215-177308fc-c6d9-4564-bdd9-fceda380b08b.png#averageHue=%23f1e4e4&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=361&id=g0OM1&originHeight=480&originWidth=1154&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4a43e91e-128e-47cb-9b9a-d1b292fd8f5&title=&width=868)<br />Redis有两种持久化方案：

- RDB持久化
- AOF持久化
## 1 RDB持久化
RDB全称Redis Database Backup file（Redis数据备份文件），也被叫做Redis数据快照。简单来说就是把内存中的所有数据都记录到磁盘中。当Redis实例故障重启后，从磁盘读取快照文件，恢复数据。快照文件称为RDB文件，默认是保存在当前运行目录。
### 1.1 执行时机
RDB持久化在四种情况下会执行：

- 执行save命令
- 执行bgsave命令
- Redis停机时
- 触发RDB条件时

**1）save命令**<br />执行下面的命令，可以立即执行一次RDB：<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532308202-3ee51825-22a2-4812-ba2e-a3f1705e24c4.png#averageHue=%23042d49&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=105&id=xX9R9&originHeight=193&originWidth=1108&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9652382a-beab-4d79-a513-814f491ff87&title=&width=601)<br />save命令会导致主进程执行RDB，这个过程中其它所有命令都会被阻塞。只有在数据迁移时可能用到。

**2）bgsave命令**<br />下面的命令可以异步执行RDB：<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532308120-09d52bc6-d8d5-4c4c-ac7a-ec33a94386ea.png#averageHue=%23042d48&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=62&id=Gynzu&originHeight=112&originWidth=1157&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u830c8df7-dcde-416c-9f21-975e2d92bfb&title=&width=642)<br />这个命令执行后会开启独立进程完成RDB，主进程可以持续处理用户请求，不受影响。

**3）停机时**<br />Redis停机时会执行一次save命令，实现RDB持久化。

**4）触发RDB条件**<br />Redis内部有触发RDB的机制，可以在redis.conf文件中找到，格式如下：
```properties
# 900秒内，如果至少有1个key被修改，则执行bgsave ， 如果是save "" 则表示禁用RDB
save 900 1  
save 300 10  
save 60 10000
```

RDB的其它配置也可以在redis.conf文件中设置：
```properties
# 是否压缩 ,建议不开启，压缩也会消耗cpu，磁盘的话不值钱
rdbcompression yes

# RDB文件名称
dbfilename dump.rdb  

# 文件保存的路径目录
dir ./
```
### 1.2 RDB原理
bgsave开始时会fork主进程得到子进程，子进程共享主进程的内存数据。完成fork后读取内存数据并写入 RDB 文件。<br />fork采用的是copy-on-write技术：

- 当主进程执行读操作时，访问共享内存；
- 当主进程执行写操作时，则会拷贝一份数据，执行写操作。

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532308041-ca74187f-3527-48a3-8f04-81ccb705b4ad.png#averageHue=%23f7efef&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=424&id=jgANO&originHeight=547&originWidth=1514&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u26829932-da23-4e97-bf57-6f82c8fe276&title=&width=1174)
### 1.3 小结
**RDB方式bgsave的基本流程？**

- fork主进程得到一个子进程，共享内存空间
- 子进程读取内存数据并写入新的RDB文件
- 用新RDB文件替换旧的RDB文件

**RDB会在什么时候执行？save 60 1000代表什么含义？**

- 默认是服务停止时
- 代表60秒内至少执行1000次修改则触发RDB

**RDB的缺点？**

- RDB执行间隔时间长，两次RDB之间写入数据有丢失的风险
- fork子进程、压缩、写出RDB文件都比较耗时

## 2 AOF持久化
### 2.1 AOF原理
AOF全称为Append Only File（追加文件）。Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532308003-6da78dbf-19d2-46c2-9157-c8b9fa66ae0a.png#averageHue=%23f5e7e6&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=RL4Jk&originHeight=444&originWidth=918&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2caf18e1-a097-43eb-982a-8d5a30ef37d&title=)
### 2.2 AOF配置
AOF默认是关闭的，需要修改redis.conf配置文件来开启AOF：
```properties
# 是否开启AOF功能，默认是no
appendonly yes
# AOF文件的名称
appendfilename "appendonly.aof"
```

AOF的命令记录的频率也可以通过redis.conf文件来配：
```properties
# 表示每执行一次写命令，立即记录到AOF文件
appendfsync always 
# 写命令执行完先放入AOF缓冲区，然后表示每隔1秒将缓冲区数据写到AOF文件，是默认方案
appendfsync everysec 
# 写命令执行完先放入AOF缓冲区，由操作系统决定何时将缓冲区内容写回磁盘
appendfsync no
```

三种策略对比：<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532308847-7b6922df-7098-478e-b629-33b812cb9088.png#averageHue=%23c3a7a6&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=rsM81&originHeight=168&originWidth=1008&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2e9e8d0d-0a65-4ad8-8bf0-068dcbf2101&title=)

### 2.3 AOF文件重写
因为是记录命令，AOF文件会比RDB文件大的多。而且AOF会记录对同一个key的多次写操作，但只有最后一次写操作才有意义。通过执行bgrewriteaof命令，可以让AOF文件执行重写功能，用最少的命令达到相同效果。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532309146-7ab40268-2717-43b5-aecd-e07b7e04845f.png#averageHue=%23f9f8f8&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=VGdhp&originHeight=134&originWidth=970&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u95a461d4-d669-4f04-8bff-0677b2ac13f&title=)

如图，AOF原本有三个命令，但是`set num 123 和 set num 666`都是对num的操作，第二次会覆盖第一次的值，因此第一个命令记录下来没有意义。<br />所以重写命令后，AOF文件内容就是：`mset name jack num 666`

Redis也会在触发阈值时自动去重写AOF文件。阈值也可以在redis.conf中配置：
```properties
# AOF文件比上次文件 增长超过多少百分比则触发重写
auto-aof-rewrite-percentage 100
# AOF文件体积最小多大以上才触发重写 
auto-aof-rewrite-min-size 64mb
```

## 3 RDB与AOF对比
RDB和AOF各有自己的优缺点，如果对数据安全性要求较高，在实际开发中往往会**结合**两者来使用。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532309055-8defb08d-d9f7-4ab0-a987-0c6cb3505eb8.png#averageHue=%23c9bbba&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=364&id=e89DG&originHeight=435&originWidth=1198&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ufb95b67c-c420-4201-94ed-f65b4511d77&title=&width=1003)
