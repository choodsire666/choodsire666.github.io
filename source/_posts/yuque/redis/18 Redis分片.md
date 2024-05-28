---
title: 18 Redis分片
urlname: qqxngbrgz4a3d50p
date: '2024-03-31 11:09:06'
updated: '2024-03-31 11:10:46'
cover: ''
description: '笔记来源：黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案1 搭建分片集群主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决： 海量数据存储问题  高并发写的问题 使用分片集群可以解决上述问题，如图:分片集群特征： 集群中有多个...'
---
**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
## 1 搭建分片集群
主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决：

-  海量数据存储问题 
-  高并发写的问题 

使用分片集群可以解决上述问题，如图:
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532311275-e4a7ea85-09c3-42bc-9a6b-4fc4207a20a9.png#averageHue=%23f7ebea&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=owjm1&originHeight=631&originWidth=771&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ucd0f8874-7b1e-4989-b82e-a42caaf8f45&title=)
分片集群特征：

-  集群中有多个master，每个master保存不同数据 
-  每个master都可以有多个slave节点 
-  master之间通过ping监测彼此健康状态 
-  客户端请求可以访问集群任意节点，最终都会被转发到正确节点 

具体搭建流程参考：
[15 redis集群搭建](https://www.yuque.com/u21918439/vg7knb/xkt6nu?view=doc_embed)
## 2 散列插槽
### 2.1 插槽原理
Redis会把每一个master节点映射到0~16383共16384个插槽（hash slot）上，查看集群信息时就能看到：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532311643-9d7c3732-71be-4b03-bcd1-672f2798f3ef.png#averageHue=%235e5b4d&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=141&id=XBNbK&originHeight=124&originWidth=591&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uac4bd19a-fb9c-4bab-9649-0d2544ea7e3&title=&width=672)

数据key不是与节点绑定，而是与插槽绑定。redis会根据key的有效部分计算插槽值，分两种情况：

- key中包含"{}"，且“{}”中至少包含1个字符，“{}”中的部分是有效部分
- key中不包含“{}”，整个key都是有效部分

例如：key是num，那么就根据num计算，如果是{itcast}num，则根据itcast计算。计算方式是利用CRC16算法得到一个hash值，然后对16384取余，得到的结果就是slot值。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532311683-46bda016-af68-4684-a01e-a583f50b5987.png#averageHue=%233b3a38&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=143&id=pCzDV&originHeight=123&originWidth=574&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u20b866f2-478d-42c2-8874-1e117fe5dd2&title=&width=665)
如图，在7001这个节点执行set a 1时，对a做hash运算，对16384取余，得到的结果是15495，因此要存储到103节点。
到了7003后，执行`get num`时，对num做hash运算，对16384取余，得到的结果是2765，因此需要切换到7001节点

**小结**
Redis如何判断某个key应该在哪个实例？

- 将16384个插槽分配到不同的实例
- 根据key的有效部分计算哈希值，对16384取余
- 余数作为插槽，寻找插槽所在实例即可

如何将同一类数据固定的保存在同一个Redis实例？

- 这一类数据使用相同的有效部分，例如key都以{typeId}为前缀
## 3 集群伸缩
redis-cli --cluster提供了很多操作集群的命令，可以通过下面方式查看：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532311771-a5745c4a-5a86-4e95-ac91-8fe2ce1496b8.png#averageHue=%2331302f&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=249&id=QGZj8&originHeight=200&originWidth=572&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u11c9b97e-0455-4866-b1ee-b25c1857072&title=&width=712)

比如，添加节点的命令：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312066-22a22a82-7e9c-4191-af2f-ff986e0b0540.png#averageHue=%23373635&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=mRMCF&originHeight=150&originWidth=665&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud6b89a76-5b54-4768-802b-c45e22f8abc&title=)

### 3.1 需求分析
需求：向集群中添加一个新的master节点，并向其中存储 num = 10

- 启动一个新的redis实例，端口为7004
- 添加7004到之前的集群，并作为一个master节点
- 给7004节点分配插槽，使得num这个key可以存储到7004实例

这里需要两个新的功能：

- 添加一个节点到集群中
- 将部分插槽分配到新插槽

### 3.2 创建新的redis实例

创建一个文件夹：
```shell
mkdir 7004
```

拷贝配置文件：
```shell
cp redis.conf /7004
```

修改配置文件：
```shell
sed /s/6379/7004/g 7004/redis.conf
```

启动
```shell
redis-server 7004/redis.conf
```

### 3.3 添加新节点到redis
添加节点的语法如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312252-48a9d2c0-34dc-43b0-9ccc-7677aff9b379.png#averageHue=%23373635&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=H5fUc&originHeight=150&originWidth=665&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ub3494d7e-94ef-4d33-9d5e-441c548997c&title=)

执行命令：
```shell
redis-cli --cluster add-node  192.168.150.101:7004 192.168.150.101:7001
```

通过命令查看集群状态：
```shell
redis-cli -p 7001 cluster nodes
```

如图，7004加入了集群，并且默认是一个master节点：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312435-75aeb553-d990-4ac9-86d7-09b43f8ca740.png#averageHue=%233a3f3a&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=aLFV0&originHeight=254&originWidth=1445&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u400beaad-37ea-41b8-86e2-576399c8d3b&title=)
但是，可以看到7004节点的插槽数量为0，因此没有任何数据可以存储到7004上

### 3.4 转移插槽
我们要将num存储到7004节点，因此需要先看看num的插槽是多少：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312447-9dbd56ba-1ede-428b-adb2-7d37190154c0.png#averageHue=%23454540&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=Zlff5&originHeight=98&originWidth=928&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uadb043ba-99dd-401e-a1cb-07e55f4232e&title=)

如上图所示，num的插槽为2765。
我们可以将0~3000的插槽从7001转移到7004，命令格式如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312604-b0a20092-9779-4c4d-89c3-ac4beec6a15c.png#averageHue=%23403f3b&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=U2RGk&originHeight=575&originWidth=877&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u09e63aa6-8f5f-4f02-8395-23fb240cb21&title=)

具体命令如下：

建立连接：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312805-9892d1d5-e713-47e6-a0b0-26e1b085c3d1.png#averageHue=%233c4a4d&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=DG7iF&originHeight=37&originWidth=883&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ua6983adc-cd7a-4188-9ab5-ad3de21b6bc&title=)

得到下面的反馈：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312824-dbe20570-f9d0-4e37-8d58-1430e959c8b8.png#averageHue=%23353531&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=dDXxP&originHeight=178&originWidth=981&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ucc14e9ab-30f1-4005-bf08-eff744f9925&title=)

询问要移动多少个插槽，我们计划是3000个：

新的问题来了：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532313032-c49ff365-d75b-41a9-b3a5-3e9d6a6bb935.png#averageHue=%23403e3a&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=AAIJr&originHeight=152&originWidth=840&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4f72f76c-c321-460d-ad25-0d1904d00ed&title=)

那个node来接收这些插槽？？

显然是7004，那么7004节点的id是多少呢？
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532313289-0567f098-9ba5-492e-84c9-e288e85cdf95.png#averageHue=%2350514e&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=P2DYI&originHeight=248&originWidth=789&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3ddf338c-5ca4-40d9-8096-3edbdc93640&title=)

复制这个id，然后拷贝到刚才的控制台后：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532313361-deeb70f3-4782-4fb5-aed0-bc5ecff61149.png#averageHue=%2345443f&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=DIfl8&originHeight=323&originWidth=1186&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u22cd9c9c-f194-4bce-b72c-49519cfeca2&title=)

这里询问，你的插槽是从哪里移动过来的？

- all：代表全部，也就是三个节点各转移一部分
- 具体的id：目标节点的id
- done：没有了

这里我们要从7001获取，因此填写7001的id：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532313535-b4b4b265-40a4-4155-aef4-2081b80281fc.png#averageHue=%2340413d&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=BuvTW&originHeight=357&originWidth=1053&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u7163b92b-8b7e-45ea-b09b-b22e20d899e&title=)

填完后，点击done，这样插槽转移就准备好了：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532313743-0dbab3ee-cb3c-4761-8099-cb10ced21ae0.png#averageHue=%233d3f3d&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=tv477&originHeight=205&originWidth=877&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ua8554771-6378-42f4-bdd8-430fd6752f0&title=)

确认要转移吗？输入yes：

然后，通过命令查看结果：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532314248-35e61d8c-a0fa-401a-b0bf-bd094f6f1575.png#averageHue=%233a3d3c&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=QUhcv&originHeight=31&originWidth=666&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u05179380-9dca-4cc2-b2f8-65c6f3f8147&title=)

可以看到：

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532314588-5f0c54e3-ea44-4944-a309-8c89486cdd7a.png#averageHue=%23353c36&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=Sluma&originHeight=278&originWidth=1451&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3f103f36-c3fb-4eea-baf9-8a32a60fa4a&title=)

目的达成。

## 4 故障转移

集群初识状态是这样的：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532314860-a5c2b606-2242-49e6-91f9-34a91c3308e6.png#averageHue=%2358574c&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=sYzBn&originHeight=104&originWidth=921&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u77639c02-002e-4d4a-accb-89a06a08ced&title=)
其中7001、7002、7003都是master，我们计划让7002宕机。

### 4.1 自动故障转移

当集群中有一个master宕机会发生什么呢？

直接停止一个redis实例，例如7002：
```shell
redis-cli -p 7002 shutdown
```

1）首先是该实例与其它实例失去连接
2）然后是疑似宕机：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532314843-c0dd34d1-5dad-46da-9e33-dcd1f59329db.png#averageHue=%23665a47&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=fwYZc&originHeight=117&originWidth=1118&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uf433e517-7ada-4710-a078-f1282d94985&title=)
3）最后是确定下线，自动提升一个slave为新的master：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532315100-5dd82108-0f78-4f7a-8438-9fb21ec2e191.png#averageHue=%236b604b&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=gfeY1&originHeight=121&originWidth=1118&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u0944b980-a06c-47fe-9d57-a6f97b913db&title=)

4）当7002再次启动，就会变为一个slave节点了：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532315051-c438b435-3695-4ef5-82f2-4048083d7c17.png#averageHue=%235c5c4f&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=bwUaR&originHeight=165&originWidth=1382&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9507f3e5-0e4b-4525-9421-e7af332aab4&title=)

### 4.2 手动故障转移

利用cluster failover命令可以手动让集群中的某个master宕机，切换到执行cluster failover命令的这个slave节点，实现无感知的数据迁移。其流程如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532316304-c87a795f-9485-4bfe-a39a-ab618f9bcb32.png#averageHue=%23fdfcfb&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=XinCz&originHeight=591&originWidth=762&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud6acf022-8be8-41b2-b660-3ca91bced32&title=)

这种failover命令可以指定三种模式：

- 缺省：默认的流程，如图1~6歩
- force：省略了对offset的一致性校验
- takeover：直接执行第5歩，忽略数据一致性、忽略master状态和其它master的意见

**案例需求**：在7002这个slave节点执行手动故障转移，重新夺回master地位

步骤如下：
1）利用redis-cli连接7002这个节点
2）执行cluster failover命令
如图：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532316260-4dba02d1-ad1e-45a7-a778-20d5dda44b3e.png#averageHue=%233b3b36&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=a9Zhi&originHeight=71&originWidth=710&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u5fa60137-b881-40a6-8a07-bef0d4eada0&title=)

效果：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532316598-40a20d27-fbf2-445c-b422-71ae31f6c86e.png#averageHue=%2358574c&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=afkwP&originHeight=104&originWidth=921&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u8a89b174-330a-4b6b-a3a7-856ba5e927e&title=)

## 5 RedisTemplate访问分片集群

RedisTemplate底层同样基于lettuce实现了分片集群的支持，而使用的步骤与哨兵模式基本一致：

1）引入redis的starter依赖
2）配置分片集群地址
3）配置读写分离
与哨兵模式相比，其中只有分片集群的配置方式略有差异，如下：
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
