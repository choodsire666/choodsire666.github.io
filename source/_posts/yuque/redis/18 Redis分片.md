---
title: 18 Redis分片
urlname: qqxngbrgz4a3d50p
date: '2024-03-31 11:09:06'
updated: '2024-03-31 11:10:46'
cover: 'https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/dc3b5fa097e1762d3536db6066bcb2be.png'
description: '笔记来源：黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案1 搭建分片集群主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决： 海量数据存储问题  高并发写的问题 使用分片集群可以解决上述问题，如图:分片集群特征： 集群中有多个...'
---
**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
## 1 搭建分片集群
主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决：

-  海量数据存储问题 
-  高并发写的问题 

使用分片集群可以解决上述问题，如图:
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/dc3b5fa097e1762d3536db6066bcb2be.png)
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
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/3bb19daffb10c6c0b43ae7de1dc54c48.png)

数据key不是与节点绑定，而是与插槽绑定。redis会根据key的有效部分计算插槽值，分两种情况：

- key中包含"{}"，且“{}”中至少包含1个字符，“{}”中的部分是有效部分
- key中不包含“{}”，整个key都是有效部分

例如：key是num，那么就根据num计算，如果是{itcast}num，则根据itcast计算。计算方式是利用CRC16算法得到一个hash值，然后对16384取余，得到的结果就是slot值。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/352ebfc834bbac34571294a230f83b7d.png)
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
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/368ac3878afe9b99bd4f60dc2236e876.png)

比如，添加节点的命令：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/037a7580edb3ec2e7ebc0297f6220114.png)

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
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/0670a9b392105c59f6644384a6c6a6e0.png)

执行命令：
```shell
redis-cli --cluster add-node  192.168.150.101:7004 192.168.150.101:7001
```

通过命令查看集群状态：
```shell
redis-cli -p 7001 cluster nodes
```

如图，7004加入了集群，并且默认是一个master节点：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/47fe64598394e871d4a61e2a0ef3c174.png)
但是，可以看到7004节点的插槽数量为0，因此没有任何数据可以存储到7004上

### 3.4 转移插槽
我们要将num存储到7004节点，因此需要先看看num的插槽是多少：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/4d47aac35a089569cdeb285b94c6e09b.png)

如上图所示，num的插槽为2765。
我们可以将0~3000的插槽从7001转移到7004，命令格式如下：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/6c5a964e60d3e8afc05b7c800b478ccc.png)

具体命令如下：

建立连接：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532312805-9892d1d5-e713-47e6-a0b0-26e1b085c3d1.png#averageHue=%233c4a4d&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=DG7iF&originHeight=37&originWidth=883&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ua6983adc-cd7a-4188-9ab5-ad3de21b6bc&title=)

得到下面的反馈：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/098e225c0a92cb3b871bdd364ff56f0b.png)

询问要移动多少个插槽，我们计划是3000个：

新的问题来了：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/85a8e9752d7f4770afc9e001f6355528.png)

那个node来接收这些插槽？？

显然是7004，那么7004节点的id是多少呢？
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/97eb08c51f256860ad4fac50c4139cc9.png)

复制这个id，然后拷贝到刚才的控制台后：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/17ea0232404ce7a701e3f3969a379019.png)

这里询问，你的插槽是从哪里移动过来的？

- all：代表全部，也就是三个节点各转移一部分
- 具体的id：目标节点的id
- done：没有了

这里我们要从7001获取，因此填写7001的id：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/2934e5dc71a3cdb5a4c7cba380fc89f0.png)

填完后，点击done，这样插槽转移就准备好了：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/b59748c00f8e250e1ae0a8622a56199a.png)

确认要转移吗？输入yes：

然后，通过命令查看结果：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/5b8c394764f0247c3cd67f5bee4214f1.png)

可以看到：

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/6ad513c3f6a1eb6eadde41d09776758f.png)

目的达成。

## 4 故障转移

集群初识状态是这样的：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/351045acc748150c7b72e404c219d661.png)
其中7001、7002、7003都是master，我们计划让7002宕机。

### 4.1 自动故障转移

当集群中有一个master宕机会发生什么呢？

直接停止一个redis实例，例如7002：
```shell
redis-cli -p 7002 shutdown
```

1）首先是该实例与其它实例失去连接
2）然后是疑似宕机：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/bf23dc4791824babdcc514bde7ba6903.png)
3）最后是确定下线，自动提升一个slave为新的master：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/72f2eff502030fad2329c9310a04ae30.png)

4）当7002再次启动，就会变为一个slave节点了：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/ab458e16dfe2848ad65676b4fe8113ac.png)

### 4.2 手动故障转移

利用cluster failover命令可以手动让集群中的某个master宕机，切换到执行cluster failover命令的这个slave节点，实现无感知的数据迁移。其流程如下：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/88a2957272adf8e48e7648de8a09ee72.png)

这种failover命令可以指定三种模式：

- 缺省：默认的流程，如图1~6歩
- force：省略了对offset的一致性校验
- takeover：直接执行第5歩，忽略数据一致性、忽略master状态和其它master的意见

**案例需求**：在7002这个slave节点执行手动故障转移，重新夺回master地位

步骤如下：
1）利用redis-cli连接7002这个节点
2）执行cluster failover命令
如图：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/a3af1ee85ef4ff61f8068e813b7ea51d.png)

效果：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 Redis分片/b90ee43f376e091c6d261b45c2cec2d6.png)

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
