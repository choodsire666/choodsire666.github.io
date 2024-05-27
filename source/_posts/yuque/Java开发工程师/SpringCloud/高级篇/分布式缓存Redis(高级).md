> 作为分布式系统中，必不可少的非结构化存储中间件，Redis在小型、中型、大型乃至高并发系统中均有自己发挥的场合，除了基础数据结构（String/Hash/Set/ZSet/List）的增删改查操作，在真正的生产环境中我们如何避免数据的丢失？如何避免单点的性能瓶颈？如何搭建合适的集群架构？
> 本节笔者将从数据的持久化、多种集群结构搭建去解决不同的应用场景，以满足读者朋友们生产环境下的种种问题，最终实现Redis技术中间件的优雅落地。

单机的Redis存在四大问题：<br />![image-20210725144240631.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848113504-1740ae0f-e9d9-4ad1-93b2-95852bdb5b0d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f1e4e4&clientId=ud6eddd95-a20b-4&from=paste&height=320&id=u5e85ba56&originHeight=480&originWidth=1154&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=49828&status=done&style=none&taskId=u98899790-76fb-4f73-9db1-560d67ea3bb&title=&width=769.3333333333334)
# 1.Redis持久化
Redis有两种持久化方案：

- RDB持久化
- AOF持久化
## 1.1.RDB持久化
RDB全称Redis Database Backup file（Redis数据备份文件），也被叫做Redis数据快照。简单来说就是把内存中的所有数据都记录到磁盘中。当Redis实例故障重启后，从磁盘读取快照文件，恢复数据。快照文件称为RDB文件，默认是保存在当前运行目录。
### 1.1.1.执行时机
RDB持久化在四种情况下会执行：

- 执行save命令
- 执行bgsave命令
- Redis停机时
- 触发RDB条件时

**1）save命令**<br />执行下面的命令，可以立即执行一次RDB：<br />![image-20210725144536958.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848171393-6941ab38-11a1-42f0-9a71-9aff9879bfb8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_32%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23042d49&clientId=ud6eddd95-a20b-4&from=paste&height=129&id=u153d0583&originHeight=193&originWidth=1108&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=63229&status=done&style=none&taskId=uafd8a0a4-b06f-4e10-9a23-cd1f452910e&title=&width=738.6666666666666)<br />save命令会导致**主进程**执行RDB，这个过程中**其它所有命令都会被阻塞**。只有在数据迁移时可能用到。<br />**2）bgsave命令**<br />下面的命令可以异步执行RDB：<br />![image-20210725144725943.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848181136-bf5d4d7d-3dfb-46f7-919e-1a1d3ebf76fa.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23042d48&clientId=ud6eddd95-a20b-4&from=paste&height=75&id=uf0523e56&originHeight=112&originWidth=1157&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21413&status=done&style=none&taskId=u1e2d0f6a-f8f6-4f8e-a676-aaa31eeaf5e&title=&width=771.3333333333334)<br />这个命令执行后会开启**独立进程完成**RDB，主进程可以持续处理用户请求，不受影响。<br />**3）停机时**<br />Redis停机时会执行一次save命令，实现RDB持久化。<br />**4）触发RDB条件**<br />Redis内部有触发RDB的机制，可以在redis.conf文件中找到，格式如下：
```properties
# 900秒内，如果至少有1个key被修改，则执行bgsave ， 如果是save "" 则表示禁用RDB
save 900 1  
save 300 10  
save 60 10000
```
可以修改保存后重启redis，然后再进行数据的保存，来查看规则是否生效
```shell
# 停止redis服务(redis.conf所在文件夹，如我的：/tmp/redis-6.2.4)
redis-cli shutdown
# 启动redis服务(路径同上)
redis-server redis.conf
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
### 1.1.2.RDB原理
bgsave开始时会fork主进程得到子进程，子进程共享主进程的内存数据。完成fork后读取内存数据并写入 RDB 文件。<br />fork采用的是copy-on-write技术：

- 当主进程执行读操作时，访问共享内存；
- 当主进程执行写操作时，则会拷贝一份数据，执行写操作。

![image-20210725151319695.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848214818-8cebad41-ac9d-4f60-a749-a7db99918b51.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7efef&clientId=ud6eddd95-a20b-4&from=paste&id=ud9dfd842&originHeight=547&originWidth=1514&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=89999&status=done&style=none&taskId=u8625dbfd-c142-4d47-b56c-e033fcf77fc&title=)
### 1.1.3.小结
RDB方式bgsave的基本流程？

- fork主进程得到一个子进程，共享内存空间
- 子进程读取内存数据并写入新的RDB文件
- 用新RDB文件替换旧的RDB文件

RDB会在什么时候执行？save 60 1000代表什么含义？

- 默认是服务停止时
- 代表60秒内至少执行1000次修改则触发RDB

RDB的缺点？

- RDB执行间隔时间长，两次RDB之间写入数据有丢失的风险
- fork子进程、压缩、写出RDB文件都比较耗时
## 1.2.AOF持久化
### 1.2.1.AOF原理
AOF全称为Append Only File（追加文件）。Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件。<br />![image-20210725151543640.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848233916-73d3ed72-0da0-4d43-afb3-d7da3efe980e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5e7e6&clientId=ud6eddd95-a20b-4&from=paste&id=ua04042d8&originHeight=444&originWidth=918&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=57761&status=done&style=none&taskId=u696413c6-76cd-4106-884e-5d41e980840&title=)
### 1.2.2.AOF配置
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
三种策略对比：<br />![image-20210725151654046.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848264413-3d46a7e4-0ee8-4f09-a0eb-0c9ae152c0d5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_29%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23c3a7a6&clientId=ud6eddd95-a20b-4&from=paste&id=u465a8bf4&originHeight=168&originWidth=1008&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=31983&status=done&style=none&taskId=u21ef0cda-4b99-4ea1-9859-c5e6740fc9b&title=)
### 1.2.3.AOF文件重写
因为是记录命令，AOF文件会比RDB文件大的多。而且AOF会记录对同一个key的多次写操作，但只有最后一次写操作才有意义。通过执行bgrewriteaof命令，可以让AOF文件执行重写功能，用最少的命令达到相同效果。<br />![image-20210725151729118.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848288691-97d71944-46e7-4422-83b6-7d069937296c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f8&clientId=ud6eddd95-a20b-4&from=paste&height=89&id=u95deeda8&originHeight=134&originWidth=970&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=17459&status=done&style=none&taskId=ua628af93-6533-4846-8c73-5264ea20343&title=&width=646.6666666666666)<br />如图，AOF原本有三个命令，但是`set num 123 和 set num 666`都是对num的操作，第二次会覆盖第一次的值，因此第一个命令记录下来没有意义。<br />在redis控制台执行<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680359959921-9d95d9ab-6260-4a6a-9a62-22180fdfaa4d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23274558&clientId=u0dcbc53d-ce7c-4&from=paste&height=48&id=ud351acb5&originHeight=72&originWidth=538&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40969&status=done&style=none&taskId=u93a05931-1174-46c7-bd4f-824d31ce461&title=&width=358.6666666666667)<br />发现开始完成文件写入<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680359977826-980939dc-9c22-4c79-b901-2ac9244b402e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232b4a5e&clientId=u0dcbc53d-ce7c-4&from=paste&height=189&id=u9451d4f3&originHeight=283&originWidth=1220&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=376149&status=done&style=none&taskId=u39bf94b8-da5c-426f-ac1f-574d7d74d8e&title=&width=813.3333333333334)<br />写完之后，aof文件指令会发生变化<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680360022417-eed7915e-0ad7-4ced-ae23-23b56cb65120.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232d4d62&clientId=u0dcbc53d-ce7c-4&from=paste&height=114&id=u5fa06432&originHeight=171&originWidth=742&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=131763&status=done&style=none&taskId=uc0273e87-0310-4870-a815-9d466611c1c&title=&width=494.6666666666667)![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680360039855-64eee9a4-0f69-476a-b2aa-b027717ebc27.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23284759&clientId=u0dcbc53d-ce7c-4&from=paste&height=93&id=ued4cf3b8&originHeight=140&originWidth=671&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=104183&status=done&style=none&taskId=u21fe25f7-6034-4fc0-aeae-edbcb9bd388&title=&width=447.3333333333333)<br />所以重写命令后，AOF文件内容就是：`mset name jack num 666`<br />Redis也会在触发阈值时自动去重写AOF文件。阈值也可以在redis.conf中配置：
```properties
# AOF文件比上次文件 增长超过多少百分比则触发重写
auto-aof-rewrite-percentage 100
# AOF文件体积最小多大以上才触发重写 
auto-aof-rewrite-min-size 64mb
```
## 1.3.RDB与AOF对比
RDB和AOF各有自己的优缺点，如果对数据安全性要求较高，在实际开发中往往会**结合**两者来使用。![image-20210725151940515.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848319932-7f47484a-d780-4d07-8f32-6ab6f7ece458.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23c9bbba&clientId=ud6eddd95-a20b-4&from=paste&height=290&id=ud65b9a42&originHeight=435&originWidth=1198&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=80443&status=done&style=none&taskId=ueb1addf6-743b-4349-8862-f6852c3589f&title=&width=798.6666666666666)
# 2.Redis主从
## 2.1.搭建主从架构
单节点Redis的并发能力是有上限的，要进一步提高Redis的并发能力，就需要搭建主从集群，实现读写分离。<br />具体搭建流程参考：[Redis集群部署指南](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/mx7mgdckvih774rb?view=doc_embed&inner=c1c0b6c3)
## 2.2.主从数据同步原理
### 2.2.1.全量同步
主从第一次建立连接时，会执行**全量同步**，将master节点的所有数据都拷贝给slave节点，流程：<br />![image-20210725152222497.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848419516-b351380b-f8d3-45b0-949a-5c51c459f243.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e8eedb&clientId=ud6eddd95-a20b-4&from=paste&height=458&id=ucc680df6&originHeight=687&originWidth=1231&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=88270&status=done&style=none&taskId=uaaf43afc-9e74-48d7-91e5-042696d8b4a&title=&width=820.6666666666666)<br />这里有一个问题，master如何得知salve是第一次来连接呢？？有几个概念，可以作为判断依据：

- **Replication Id**：简称replid，是数据集的标记，id一致则说明是同一数据集。每一个master都有唯一的replid，slave则会继承master节点的replid
- **offset**：偏移量，随着记录在repl_baklog中的数据增多而逐渐增大。slave完成同步时也会记录当前同步的offset。如果slave的offset小于master的offset，说明slave数据落后于master，需要更新。

因此slave做数据同步，必须向master声明自己的replication id 和offset，master才可以判断到底需要同步哪些数据。因为slave原本也是一个master，有自己的replid和offset，当第一次变成slave，与master建立连接时，发送的replid和offset是自己的replid和offset。master判断发现slave发送来的replid与自己的不一致，说明这是一个全新的slave，就知道要做全量同步了。master会将自己的replid和offset都发送给这个slave，slave保存这些信息。以后slave的replid就与master一致了。<br />因此，**master判断一个节点是否是第一次同步的依据，就是看replid是否一致**。如图：<br />![image-20210725152700914.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848457338-fc5e402f-bf35-419d-a7e7-45c3e037d640.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e8eedb&clientId=ud6eddd95-a20b-4&from=paste&id=uc8f7bace&originHeight=649&originWidth=1239&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=87414&status=done&style=none&taskId=ua2103d30-7e41-4c9e-9b18-a907021b571&title=)<br />完整流程描述：

- slave节点请求增量同步
- master节点判断replid，发现不一致，拒绝增量同步
- master将完整内存数据生成RDB，发送RDB到slave
- slave清空本地数据，加载master的RDB
- master将RDB期间的命令记录在repl_baklog，并持续将log中的命令发送给slave
- slave执行接收到的命令，保持与master之间的同步
### 2.2.2.增量同步
全量同步需要先做RDB，然后将RDB文件通过网络传输个slave，成本太高了。因此除了第一次做全量同步，其它大多数时候slave与master都是做**增量同步**。增量同步就是只更新slave与master存在差异的部分数据。如图：<br />![image-20210725153201086.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848479306-e6c53671-9bba-4fc4-822c-2236f080627f.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%236c6968&clientId=ud6eddd95-a20b-4&from=paste&height=325&id=uf563cf07&originHeight=488&originWidth=1210&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=55328&status=done&style=none&taskId=u49b8511e-7d33-4353-9815-10321823b15&title=&width=806.6666666666666)<br />那么master怎么知道slave与自己的数据差异在哪里呢?
### 2.2.3.repl_backlog原理
master怎么知道slave与自己的数据差异在哪里呢？这就要说到全量同步时的repl_baklog文件了。<br />这个文件是一个固定大小的数组，只不过数组是环形，也就是说**角标到达数组末尾后，会再次从0开始读写**，这样数组头部的数据就会被覆盖。repl_baklog中会记录Redis处理过的命令日志及offset，包括master当前的offset，和slave已经拷贝到的offset：<br />![image-20210725153359022.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848498872-7dfd2529-8ff9-429c-bcad-0c639006c3d1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdf6f5&clientId=ud6eddd95-a20b-4&from=paste&height=162&id=u40a8f3b9&originHeight=243&originWidth=226&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=8103&status=done&style=none&taskId=u28475963-f9eb-4d50-a9b1-9753b5bd29f&title=&width=150.66666666666666)<br />slave与master的offset之间的差异，就是salve需要增量拷贝的数据了。随着不断有数据写入，master的offset逐渐变大，slave也不断的拷贝，追赶master的offset：<br />![](assets/image-20210725153524190.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=vW1Oi&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />直到数组被填满：<br />![image-20210725153715910.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848525423-3cb096e1-6bdb-45d9-8e19-df679ffec738.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_11%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdf7f7&clientId=ud6eddd95-a20b-4&from=paste&height=177&id=u68df5b16&originHeight=265&originWidth=238&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=11570&status=done&style=none&taskId=u2be7c06a-88af-4a21-9d5c-b10ab1d7d85&title=&width=158.66666666666666)<br />此时，如果有新的数据写入，就会覆盖数组中的旧数据。不过，旧的数据只要是绿色的，说明是已经被同步到slave的数据，即便被覆盖了也没什么影响。因为未同步的仅仅是红色部分。但是，如果slave出现网络阻塞，导致master的offset远远超过了slave的offset：<br />![image-20210725153937031.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848535748-70ff366d-0e00-4ed9-ac05-6a0392d51853.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9e7e6&clientId=ud6eddd95-a20b-4&from=paste&height=166&id=uedc403d0&originHeight=249&originWidth=202&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=11121&status=done&style=none&taskId=u9d3514d7-656d-4fd5-a4e6-8d9a69d9103&title=&width=134.66666666666666)<br />如果master继续写入新数据，其offset就会覆盖旧的数据，直到将slave现在的offset也覆盖：<br />![image-20210725154155984.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848559203-5b20bb65-b299-4a1b-852f-3b72aa5320d7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8e7e5&clientId=ud6eddd95-a20b-4&from=paste&height=169&id=uef6ba76b&originHeight=253&originWidth=218&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=14270&status=done&style=none&taskId=uf12b683a-d646-4a71-b57d-7988d005dfb&title=&width=145.33333333333334)<br />棕色框中的红色部分，就是尚未同步，但是却已经被覆盖的数据。此时如果slave恢复，需要同步，却发现自己的offset都没有了，无法完成增量同步了。只能做全量同步。<br />![image-20210725154216392.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848589322-e862971d-4f86-4e2b-9fd3-dbeb5c75b270.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23ebe6e6&clientId=ud6eddd95-a20b-4&from=paste&height=89&id=u9d5e0e0d&originHeight=134&originWidth=1350&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=31577&status=done&style=none&taskId=u252de72c-1aec-4391-81ce-9fb18f3e400&title=&width=900)
## 2.3.主从同步优化
主从同步可以保证主从数据的一致性，非常重要。可以从以下几个方面来优化Redis主从就集群：

- 在master中配置repl-diskless-sync yes启用无磁盘复制，避免全量同步时的磁盘IO。
- Redis单节点上的内存占用不要太大，减少RDB导致的过多磁盘IO
- 适当提高repl_baklog的大小，发现slave宕机时尽快实现故障恢复，尽可能避免全量同步
- 限制一个master上的slave节点数量，如果实在是太多slave，则可以采用主-从-从链式结构，减少master压力

主从从架构图：![image-20210725154405899.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848615271-4acadfd1-49e0-441e-8cda-c8bb665c5caf.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_37%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6e8e7&clientId=ud6eddd95-a20b-4&from=paste&id=u0e1aa045&originHeight=412&originWidth=1308&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=93919&status=done&style=none&taskId=u95a4c35d-4c55-41c3-a3c9-f1b54156ccb&title=)
## 2.4.小结
简述全量同步和增量同步区别？

- 全量同步：master将完整内存数据生成RDB，发送RDB到slave。后续命令则记录在repl_baklog，逐个发送给slave。
- 增量同步：slave提交自己的offset到master，master获取repl_baklog中从offset之后的命令给slave

什么时候执行全量同步？

- slave节点第一次连接master节点时
- slave节点断开时间太久，repl_baklog中的offset已经被覆盖时

什么时候执行增量同步？

- slave节点断开又恢复，并且在repl_baklog中能找到offset时
# 3.Redis哨兵
Redis提供了哨兵（Sentinel）机制来实现主从集群的自动故障恢复。
## 3.1.哨兵原理
### 3.1.1.集群结构和作用
哨兵的结构如图：<br />![image-20210725154528072.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848649144-f18f82d9-c42e-482c-8713-191de977231e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4ded5&clientId=ud6eddd95-a20b-4&from=paste&id=u4dbc8e27&originHeight=617&originWidth=820&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=83826&status=done&style=none&taskId=uda0641cc-9b2f-4c10-85ce-26bd3754ba7&title=)<br />哨兵的作用如下：

- **监控**：Sentinel 会不断检查您的master和slave是否按预期工作
- **自动故障恢复**：如果master故障Sentinel会将一个slave提升为master。当故障实例恢复后也以新的master为主
- **通知**：Sentinel充当Redis客户端的服务发现来源，当集群发生故障转移时会将最新信息推送给Redis的客户端
### 3.1.2.集群监控原理
Sentinel基于心跳机制监测服务状态，每隔1秒向集群的每个实例发送ping命令：<br />•主观下线：如果某sentinel节点发现某实例未在规定时间响应，则认为该实例**主观下线**。<br />•客观下线：若超过指定数量（quorum）的sentinel都认为该实例主观下线，则该实例**客观下线**。quorum值最好超过Sentinel实例数量的一半。<br />![image-20210725154632354.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848671481-394b2df6-bcfe-4f5d-a89e-38f84e5db56d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3d9ce&clientId=ud6eddd95-a20b-4&from=paste&id=uc9547e2c&originHeight=409&originWidth=660&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=46855&status=done&style=none&taskId=ufb5bf789-48f7-4553-8b3d-b726cbbe18a&title=)
### 3.1.3.集群故障恢复原理
一旦发现master故障，sentinel需要在salve中选择一个作为新的master，选择依据是这样的：

- 首先会判断slave节点与master节点断开时间长短，如果超过指定值（down-after-milliseconds * 10）则会排除该slave节点
- **然后判断slave节点的slave-priority值，越小优先级越高，如果是0则永不参与选举**
- **如果slave-prority一样，则判断slave节点的offset值，越大说明数据越新，优先级越高**
- 最后是判断slave节点的运行id大小，越小优先级越高。

当选出一个新的master后，该如何实现切换呢？<br />流程如下：

- sentinel给备选的slave1节点发送slaveof no one命令，让该节点成为master
- sentinel给所有其它slave发送slaveof 192.168.150.101 7002 命令，让这些slave成为新master的从节点，开始从新的master上同步数据。
- 最后，sentinel将故障节点标记为slave，当故障节点恢复后会自动成为新的master的slave节点

![image-20210725154816841.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848691539-dd6ca16e-3bac-41c5-a265-6dee86127839.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6e9e6&clientId=ud6eddd95-a20b-4&from=paste&id=ub0bbdbac&originHeight=593&originWidth=838&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=55169&status=done&style=none&taskId=u673e516b-7ff3-48fa-a217-0e19fdee046&title=)
### 3.1.4.小结
Sentinel的三个作用是什么？

- 监控
- 故障转移
- 通知

Sentinel如何判断一个redis实例是否健康？

- 每隔1秒发送一次ping命令，如果超过一定时间没有相向则认为是主观下线
- 如果大多数sentinel都认为实例主观下线，则判定服务下线

故障转移步骤有哪些？

- 首先选定一个slave作为新的master，执行slaveof no one
- 然后让所有节点都执行slaveof 新master
- 修改故障节点配置，添加slaveof 新master
## 3.2.搭建哨兵集群
具体搭建流程参考：[《Redis集群.md》](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/mx7mgdckvih774rb#3b4a9ea3)
## 3.3.RedisTemplate
在Sentinel集群监管下的Redis主从集群，其节点会因为自动故障转移而发生变化，Redis的客户端必须感知这种变化，及时更新连接信息。Spring的RedisTemplate底层利用lettuce实现了节点的感知和自动切换。<br />下面，我们通过一个测试来实现RedisTemplate集成哨兵机制。
### 3.3.1.导入Demo工程
首先，我们引入提供的Demo工程：[redis-demo.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711614670028-11426d64-b012-4227-994b-9c7c3c370c5c.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fzip%2F29688613%2F1711614670028-11426d64-b012-4227-994b-9c7c3c370c5c.zip%22%2C%22name%22%3A%22redis-demo.zip%22%2C%22size%22%3A5031%2C%22ext%22%3A%22zip%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u5a63b222-c918-4c8c-9d86-1d188cfbad3%22%2C%22taskType%22%3A%22transfer%22%2C%22type%22%3A%22application%2Fx-zip-compressed%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u986c5f8f%22%2C%22card%22%3A%22file%22%7D)
### 3.3.2.引入依赖
在项目的pom文件中引入依赖：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```
### 3.3.3.配置Redis地址
然后在配置文件application.yml中指定redis的sentinel相关信息：
```java
spring:
  redis:
    sentinel:
      master: mymaster
      nodes:
        - 192.168.150.101:27001
        - 192.168.150.101:27002
        - 192.168.150.101:27003
```
### 3.3.4.配置读写分离
在项目的启动类中，添加一个新的bean：<br />这个Bean代码最初编写如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680361165875-f1eb3f79-551d-4c55-9108-c33b4c00ebfc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfaf6&clientId=u1d4705d0-8042-4&from=paste&height=205&id=u0de834cd&originHeight=307&originWidth=1415&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=183263&status=done&style=none&taskId=u45d49a9a-9f83-44ea-bdd5-22252c13bce&title=&width=943.3333333333334)<br />通过Idea提示的Lamada优化，变成下述样子：
```java
@Bean
public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer(){
    return clientConfigurationBuilder -> clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
}
```
这个bean中配置的就是读写策略，包括四种：

- MASTER：从主节点读取
- MASTER_PREFERRED：优先从master节点读取，master不可用才读取replica
- REPLICA：从slave（replica）节点读取
- REPLICA _PREFERRED：优先从slave（replica）节点读取，所有的slave都不可用才读取master
### 3.3.5.测试
#### 验证master存储

- 地址栏输入(存入)：[http://localhost:8080/set/num/888](http://localhost:8080/set/num/888)
   - 因为写操作只能在主节点完成，因此所有操作端口应该是7003

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680361380049-bad28355-00c2-4887-b3a6-453f5183ddab.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f0e5&clientId=u1d4705d0-8042-4&from=paste&height=241&id=u4940ec92&originHeight=361&originWidth=1753&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=726218&status=done&style=none&taskId=ufac13152-b7fa-4271-b8a7-a080f7ed132&title=&width=1168.6666666666667)
#### 验证slave读取

- 地址栏输入(读取)：[http://localhost:8080/get/num/](http://localhost:8080/set/num/888)
   - 此时7003是主节点，因此读取数据不会从主节点，如下均为7002

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680361341782-553e2104-827f-4fca-8011-f4a225a612fe.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23efebe0&clientId=u1d4705d0-8042-4&from=paste&height=231&id=ude80541a&originHeight=346&originWidth=1679&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=603479&status=done&style=none&taskId=uf8e7252b-ecc4-4bf0-a4da-4a19b5f54e8&title=&width=1119.3333333333333)
#### 验证主节点宕机恢复

- 进入7003主节点redis，ctrl+c 或（redis-cli shutdown）
- 查看任意sentinel的日志信息

![](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847657256-64ab6270-78de-4553-a30c-bf21ed08f71d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23252422&from=url&id=JNYZi&originHeight=832&originWidth=1670&originalType=binary&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&title=)

- 查看idea（redis客户端）日志，发现一样的日志信息，关键信息如下

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680361639623-9c327e41-cf87-4377-ad20-4633694c32c5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e7e2d8&clientId=u1d4705d0-8042-4&from=paste&height=120&id=u76b6f726&originHeight=180&originWidth=1177&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=181348&status=done&style=none&taskId=u99ac28bd-fd46-409b-99e4-4e28a98d730&title=&width=784.6666666666666)

- 此时重新恢复redis 7003，会发现服务启动之后，立马做数据同步，并且做了全量同步

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680361711114-e89cf079-f6d5-4f88-ac7a-e77a1fb8bcc8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%231e537b&clientId=u1d4705d0-8042-4&from=paste&height=329&id=u41a0f6fe&originHeight=493&originWidth=1620&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1094507&status=done&style=none&taskId=uac5cf1c0-32e1-42f1-b57e-a4007a88675&title=&width=1080)
#### 验证恢复后的读写操作
此时因为7003恢复后变成slave节点，因此后续所有的读操作会变成7003或7002（浏览器访问一次set）<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680361793650-8be6f2b2-dd61-446a-8f23-8ee025a90773.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f0&clientId=u1d4705d0-8042-4&from=paste&height=217&id=u7dea8786&originHeight=326&originWidth=1744&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=684386&status=done&style=none&taskId=u02c78cc7-76ec-4f96-8d6b-a03527b5ed6&title=&width=1162.6666666666667)<br />而写操作会变成新的master节点：7001<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680361833545-ef50025c-c5c8-4d66-97e2-a3a799ea0856.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f1f3ef&clientId=u1d4705d0-8042-4&from=paste&height=175&id=u5d3eee07&originHeight=262&originWidth=1759&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=642802&status=done&style=none&taskId=u4c762959-2d12-41c2-a63c-524b2f38f51&title=&width=1172.6666666666667)
# 4.Redis分片集群
## 4.1.搭建分片集群
主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决：

-  海量数据存储问题 
-  高并发写的问题 

使用分片集群可以解决上述问题，如图:<br />![image-20210725155747294.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848804119-75c1a10d-21cf-4054-b354-a56e281634cd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7ebea&clientId=ud6eddd95-a20b-4&from=paste&id=u193d08e7&originHeight=631&originWidth=771&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=80224&status=done&style=none&taskId=u6be25df8-4f3d-4316-836d-0a854dfbfce&title=)<br />分片集群特征：

-  集群中有多个master，每个master保存不同数据 
-  每个master都可以有多个slave节点 
-  master之间通过ping监测彼此健康状态 
-  客户端请求可以访问集群任意节点，最终都会被转发到正确节点 

具体搭建流程参考：[Redis集群部署指南](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/mx7mgdckvih774rb?view=doc_embed&inner=6c474822)
## 4.2.散列插槽
### 4.2.1.插槽原理
Redis会把每一个master节点映射到0~16383共16384个插槽（hash slot）上，查看集群信息时就能看到：<br />![image-20210725155820320.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848857911-fc04dab9-1fe2-4ea2-95eb-1b8177dd04f8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_17%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%235e5b4d&clientId=ud6eddd95-a20b-4&from=paste&height=83&id=u2e4fe292&originHeight=124&originWidth=591&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=88359&status=done&style=none&taskId=ua1fbcd34-6f54-4011-98e0-4cc403409fe&title=&width=394)<br />数据key不是与节点绑定，而是与插槽绑定。redis会根据key的有效部分计算插槽值，分两种情况：

- key中包含"{}"，且“{}”中至少包含1个字符，“{}”中的部分是有效部分
- key中不包含“{}”，整个key都是有效部分

例如：key是num，那么就根据num计算，如果是{itcast}num，则根据itcast计算。计算方式是利用**CRC16算法得到一个hash值，然后对16384取余**，得到的结果就是slot值。<br />![image-20210725155850200.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848871144-27688eb6-4549-40d7-93d3-019d571744cc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_16%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233b3a38&clientId=ud6eddd95-a20b-4&from=paste&height=82&id=u23a81fa0&originHeight=123&originWidth=574&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=46855&status=done&style=none&taskId=uaa2ebe99-db64-4714-aaca-b3c4475ed14&title=&width=382.6666666666667)<br />如图，在7001这个节点执行set a 1时，对a做hash运算，对16384取余，得到的结果是15495，因此要存储到7003节点，所以也会发现上述的链接信息自动跳转到了7003。<br />此时假设我们想把其余数据跟a存在一个节点，就可以执行类似下述操作，会发现不再做重定向：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680362950497-3c38c3b9-3187-4c4f-a215-260a29156c74.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2326455d&clientId=u1d4705d0-8042-4&from=paste&height=55&id=u44245d37&originHeight=83&originWidth=482&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=52696&status=done&style=none&taskId=u3ee59b37-2936-4031-ade6-516df5e3e5d&title=&width=321.3333333333333)<br />到了7003后，执行`get num`时，对num做hash运算，对16384取余，得到的结果是2765，因此需要切换到7001节点【即：不止存储会做插槽计算和重定向，查询也会做】<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1683879900026-43e74201-6d2b-4735-90be-efdc3736d1ce.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23213b4e&clientId=u2f6fa95e-b97f-4&from=paste&height=150&id=u0eb3fe70&originHeight=225&originWidth=702&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=186752&status=done&style=none&taskId=u52597b2a-ef96-41be-8268-2d3a268e2c2&title=&width=468)
### 4.2.1.小结
Redis如何判断某个key应该在哪个实例？

- 将16384个插槽分配到不同的实例
- 根据key的有效部分计算哈希值，对16384取余
- 余数作为插槽，寻找插槽所在实例即可

如何将同一类数据固定的保存在同一个Redis实例？

- 这一类数据使用相同的有效部分，例如key都以{typeId}为前缀
## 4.3.集群伸缩
redis-cli --cluster提供了很多操作集群的命令，可以通过下面方式查看：<br />![image-20210725160138290.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848896899-be5d3bf7-d5a9-4075-8e3f-3c295e631f3b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_16%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2331302f&clientId=ud6eddd95-a20b-4&from=paste&height=133&id=uc10fa5e8&originHeight=200&originWidth=572&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=64097&status=done&style=none&taskId=u4ae5843d-9377-4ceb-b1ab-68ff770b809&title=&width=381.3333333333333)<br />比如，添加节点的命令：<br />![image-20210725160448139.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848909972-43b353f5-736b-40bb-a890-989639ef41cd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23373635&clientId=ud6eddd95-a20b-4&from=paste&height=100&id=ud1fb3e28&originHeight=150&originWidth=665&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=58189&status=done&style=none&taskId=ucc6c053a-f914-4302-b1d7-5a90ada023a&title=&width=443.3333333333333)
### 4.3.1.需求分析
需求：向集群中添加一个新的master节点，并向其中存储 num = 10

- 启动一个新的redis实例，端口为7004
- 添加7004到之前的集群，并作为一个master节点
- 给7004节点分配插槽，使得num这个key可以存储到7004实例

这里需要两个新的功能：

- 添加一个节点到集群中
- 将部分插槽分配到新插槽
### 4.3.2.创建新的redis实例
创建一个文件夹（在/tmp目录下执行下述命令）：
```shell
mkdir 7004
```
拷贝配置文件：
```shell
cp redis.conf /tmp/7004
```
修改配置文件：
```shell
sed -i -e 's/6379/7004/g' -e 's/dir .\//dir \/tmp\/7004\//g' 7004/redis.conf
```
启动（在/tmp目录下执行下述命令）
```shell
redis-server 7004/redis.conf
```
### 4.3.3.添加新节点到redis
添加节点的语法如下：<br />![](assets/image-20210725160448139.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=aJgAS&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />执行命令：
```shell
redis-cli --cluster add-node  192.168.206.129:7004 192.168.206.129:7001
```
通过命令查看集群状态：
```shell
redis-cli -p 7001 cluster nodes
```
如图，7004加入了集群，并且默认是一个master节点：<br />![image-20210725161007099.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848956538-b49f6a37-dd36-43c9-80f4-cd51035b74b3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23284558&clientId=ud6eddd95-a20b-4&from=paste&height=161&id=ua46308de&originHeight=242&originWidth=1551&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=395894&status=done&style=none&taskId=u09c3b035-d1cb-454e-a96e-b8ba19efbb8&title=&width=1034)<br />但是，可以看到7004节点的插槽数量为0，因此没有任何数据可以存储到7004上
### 4.3.4.转移插槽
我们要将num存储到7004节点，因此需要先看看num的插槽是多少：<br />![](assets/image-20210725161241793.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=SG9Aj&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />如上图所示，num的插槽为2765.<br />我们可以将0~3000的插槽从7001转移到7004，命令格式如下：<br />![image-20210725161401925.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678848982643-7dcfcb49-8d12-442e-a686-55912a19a2ec.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23403f3b&clientId=ud6eddd95-a20b-4&from=paste&height=383&id=uf062bd77&originHeight=575&originWidth=877&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=323260&status=done&style=none&taskId=uc8e4b558-6ea7-4917-8b1d-4c781ed21bb&title=&width=584.6666666666666)<br />具体命令如下：<br />建立连接：
```
redis-cli --cluster reshard 192.168.206.129:7001
```
![image-20210725161506241.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849016291-b36ec137-e6e4-47ed-aa1f-422816054fa5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233c4a4d&clientId=ud6eddd95-a20b-4&from=paste&height=25&id=u94f73c00&originHeight=37&originWidth=883&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=39357&status=done&style=none&taskId=ua89efc72-be86-4a2f-b81b-a18c4944640&title=&width=588.6666666666666)<br />得到下面的反馈：<br />![image-20210725161540841.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849022730-d049e8a1-ce1c-4cd7-9347-202d46fbab46.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23353531&clientId=ud6eddd95-a20b-4&from=paste&height=119&id=ub0cb099d&originHeight=178&originWidth=981&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=143183&status=done&style=none&taskId=u01b83023-138d-4e80-aaa7-a327dff4bf1&title=&width=654)<br />询问要移动多少个插槽，我们计划是3000个：<br />![image-20210725161637152.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849031801-4319009d-34b8-4c27-9da7-b684e4fce06b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23403e3a&clientId=ud6eddd95-a20b-4&from=paste&height=101&id=u95ae2cd8&originHeight=152&originWidth=840&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=106054&status=done&style=none&taskId=ue421b6bd-ce39-4ef4-a343-c32e4db8504&title=&width=560)<br />新的问题来了：哪个node来接收这些插槽？？显然是7004，那么7004节点的id是多少呢？<br />![image-20210725161731738.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849078830-c739c6f3-c52d-4b9f-ac69-32f2b43e8e3e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2350514e&clientId=ud6eddd95-a20b-4&from=paste&height=165&id=u48aa7642&originHeight=248&originWidth=789&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=223014&status=done&style=none&taskId=ud648e1af-4ce4-4b41-b7bb-5cafabdcfee&title=&width=526)<br />复制这个id，然后拷贝到刚才的控制台后：<br />![image-20210725161817642.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849090238-0e3ef303-f4d6-4c69-861d-38fd0e8727a4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2345443f&clientId=ud6eddd95-a20b-4&from=paste&height=215&id=uf128d12c&originHeight=323&originWidth=1186&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=299553&status=done&style=none&taskId=ueaa23919-4199-4954-a8b5-093ac752936&title=&width=790.6666666666666)<br />这里询问，你的插槽是从哪里移动过来的？

- all：代表全部，也就是三个节点各转移一部分
- 具体的id：目标节点的id
- done：执行完操作结束的指令

这里我们要从7001获取，因此填写7001的id：<br />![image-20210725162030478.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849106855-b26522c4-5ebf-4afb-9a35-baadff6fab4c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_30%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2340413d&clientId=ud6eddd95-a20b-4&from=paste&height=238&id=ud23b225f&originHeight=357&originWidth=1053&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=342021&status=done&style=none&taskId=u482e88d5-e348-4c89-9bf6-98e76bd9a70&title=&width=702)<br />填完后，点击done，这样插槽转移就准备好了：<br />![image-20210725162101228.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849114049-f0847357-7654-48d8-9de6-0f762200984a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233d3f3d&clientId=ud6eddd95-a20b-4&from=paste&height=137&id=u5c753665&originHeight=205&originWidth=877&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=256880&status=done&style=none&taskId=u378fcb4e-2782-44ec-b8d9-56a6dfb79b2&title=&width=584.6666666666666)<br />确认要转移吗？输入yes：然后，通过命令查看结果：<br />![image-20210725162145497.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849128156-c3d23d1f-244c-4402-a4cc-d558d044e8ff.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233a3d3c&clientId=ud6eddd95-a20b-4&from=paste&height=21&id=udd5a02fc&originHeight=31&originWidth=666&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=26834&status=done&style=none&taskId=ue7a4fd8a-19cc-4cde-8c3f-9a12a9f40f7&title=&width=444)<br />可以看到如下效果，目的达成：<br />![image-20210725162224058.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849136775-458531d3-958a-4441-b0f6-1dd401a0671e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23353c36&clientId=ud6eddd95-a20b-4&from=paste&height=185&id=ufe2c7d37&originHeight=278&originWidth=1451&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=499024&status=done&style=none&taskId=u75f83eb8-c85c-4f33-a3bf-38efcb829bc&title=&width=967.3333333333334)
### 4.3.5.转移失败修复方案
[https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/admw1r0h0n90cbv7](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/admw1r0h0n90cbv7)
## 4.4.故障转移
集群初识状态是这样的：<br />![image-20210727161152065.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849170822-2e8a8a75-0ddb-40cc-b70d-c71d49fef66b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2358574c&clientId=ud6eddd95-a20b-4&from=paste&height=69&id=uae9dc9d7&originHeight=104&originWidth=921&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=165960&status=done&style=none&taskId=u0589dab1-b589-472e-9486-5d5588932a5&title=&width=614)<br />其中7001、7002、7003都是master，我们计划让7002宕机。
### 4.4.1.自动故障转移
当集群中有一个master宕机会发生什么呢？我们新开一个窗口执行下面的指令
```
watch redis-cli -p 7001 cluster nodes
```
直接停止一个redis实例，例如7002：
```shell
redis-cli -p 7002 shutdown
```
1）首先是该实例与其它实例失去连接<br />2）然后是疑似宕机：

- 注意查看下面的日志，可以看到8001本来是7002的从节点，有slave 7002的id

![image-20210725162319490.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849200645-4ec77f14-2290-44a0-a158-b1556e361b67.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_32%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23665a47&clientId=ud6eddd95-a20b-4&from=paste&height=78&id=ue2da0fa1&originHeight=117&originWidth=1118&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=185771&status=done&style=none&taskId=uf0b6eb04-c6f0-4f75-82e2-a2b525a6225&title=&width=745.3333333333334)<br />3）最后是确定下线，自动**提升一个slave为新的master**：<br />![image-20210725162408979.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849212171-401d3eb6-13ad-42b7-90bb-90eacaee977b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_32%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%236b604b&clientId=ud6eddd95-a20b-4&from=paste&height=81&id=ub24623c6&originHeight=121&originWidth=1118&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=193268&status=done&style=none&taskId=ud362cee6-3cb4-4cd8-8238-485de6e9fe1&title=&width=745.3333333333334)<br />4）当7002再次启动，
```shell
printf '%s\n' 7002 | xargs -I{} -t redis-server {}/redis.conf
```
就会变为一个slave节点了：<br />![image-20210727160803386.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849229178-defd536d-61ae-4d5b-80ac-4d8b4bd24747.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_39%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%235c5c4f&clientId=ud6eddd95-a20b-4&from=paste&height=110&id=u8720d95b&originHeight=165&originWidth=1382&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=335683&status=done&style=none&taskId=u2ae26b5d-7d4f-4e53-a5e2-1926e2b1afc&title=&width=921.3333333333334)
### 4.4.2.手动故障转移
利用cluster failover命令可以手动让集群中的某个master宕机，切换到执行cluster failover命令的这个slave节点，实现无感知的数据迁移。其流程如下：<br />![image-20210725162441407.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849243832-cf0726db-556f-436d-b8a1-8aaf2846fdf3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdfcfb&clientId=ud6eddd95-a20b-4&from=paste&id=ud5dde28b&originHeight=591&originWidth=762&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47048&status=done&style=none&taskId=uf6dd6089-f18d-4fc7-9ffe-b0c2c91eb16&title=)<br />这种failover命令可以指定三种模式：

- 缺省：默认的流程，如图1~6歩
- force：省略了对offset的一致性校验
- takeover：直接执行第5歩，忽略数据一致性、忽略master状态和其它master的意见

**案例需求**：在7002这个slave节点执行手动故障转移，重新夺回master地位<br />步骤如下：<br />1）利用redis-cli连接7002这个节点，因为在上面我们停止了7002，所以这里需要重启7002，可以在tmp下执行
```properties
redis-server 7002/redis.conf
```
2）执行cluster failover命令<br />如图：<br />![image-20210727160037766.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849270519-f62171ca-bcfd-4800-8dd6-bad2ce522aac.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233b3b36&clientId=ud6eddd95-a20b-4&from=paste&height=47&id=u01e14753&originHeight=71&originWidth=710&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40647&status=done&style=none&taskId=ubfa96476-654d-46f5-bde3-a234cd10172&title=&width=473.3333333333333)<br />效果：<br />![image-20210727161152065.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678849281571-ef91414c-f21e-45a2-a06b-a4dd57ae33c3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2358574c&clientId=ud6eddd95-a20b-4&from=paste&height=69&id=ud913d716&originHeight=104&originWidth=921&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=165960&status=done&style=none&taskId=u9bdcf4a7-ae4f-4acb-b668-610ca7bc7e0&title=&width=614)
## 4.5.RedisTemplate访问分片集群
RedisTemplate底层同样基于lettuce实现了分片集群的支持，而使用的步骤与哨兵模式基本一致：<br />1）引入redis的starter依赖<br />2）配置分片集群地址<br />3）配置读写分离<br />与哨兵模式相比，其中只有分片集群的配置方式略有差异，如下：

- 由于节点之间的通信机制，以下节点信息即使不配置7004，浏览器访问：[http://localhost:8080/get/num](http://localhost:8080/get/num) 也可以从7004完成数据获取
- 这里只配置一个主节点，不要任何从节点一样可以做到读写分离
```yaml
spring:
  redis:
    cluster:
      nodes:
        - 192.168.150.101:7001
        - 192.168.150.101:7002
        - 192.168.150.101:7003
        - 192.168.150.101:8001
        - 192.168.150.101:8002
        - 192.168.150.101:8003
```
此时可以存储一个数据：set num 666，会存储到7004节点，当浏览器访问：/get/num接口，会发现读操作也到了这个主节点（不符合我们的读写分离呀），是因为当前7004没有从节点才直接读取的主节点，对应我们工程启动类注册的策略嘛。同样操作也会发现其余节点正常读写还是分离的。
# 5.推荐阅读资料

- **分布式锁**问题及更多**实战**问题：[https://www.bilibili.com/video/BV1cr4y1671t](https://www.bilibili.com/video/BV1cr4y1671t)

---

