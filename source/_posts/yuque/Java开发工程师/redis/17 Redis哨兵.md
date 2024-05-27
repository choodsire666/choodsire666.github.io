**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)<br />Redis提供了哨兵（Sentinel）机制来实现主从集群的自动故障恢复。
## 1 搭建哨兵集群
具体搭建流程参考另一篇文章：<br />[15 redis集群搭建](https://www.yuque.com/u21918439/vg7knb/xkt6nu?view=doc_embed)
## 2 哨兵原理
### 2.1 集群结构和作用

哨兵的结构如图：<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310889-3e965b05-c2d3-4984-9372-b01a13195bc8.png#averageHue=%23f4ded5&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=488&id=KHon2&originHeight=617&originWidth=820&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6fbc039f-f4e2-4e12-9d51-310835468e6&title=&width=649)

哨兵的作用如下：

- **监控**：Sentinel 会不断检查您的master和slave是否按预期工作
- **自动故障恢复**：如果master故障，Sentinel会将一个slave提升为master。当故障实例恢复后也以新的master为主
- **通知**：Sentinel充当Redis客户端的服务发现来源，当集群发生故障转移时，会将最新信息推送给Redis的客户端
### 2.2 集群监控原理
Sentinel基于心跳机制监测服务状态，每隔1秒向集群的每个实例发送ping命令：

-  主观下线：如果某sentinel节点发现某实例未在规定时间响应，则认为该实例**主观下线**。 
-  客观下线：若超过指定数量（quorum）的sentinel都认为该实例主观下线，则该实例**客观下线**。quorum值最好超过Sentinel实例数量的一半。 

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310895-080dcf8e-1eb5-44bc-9710-05b49d9f0b6e.png#averageHue=%23f3d9ce&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=oGL7j&originHeight=409&originWidth=660&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u19e53e96-64be-46e3-a6a4-ffb4595ff20&title=)
### 2.3 集群故障恢复原理
一旦发现master故障，sentinel需要在salve中选择一个作为新的master，选择依据是这样的：

- 首先会判断slave节点与master节点断开时间长短，如果超过指定值（down-after-milliseconds * 10）则会排除该slave节点
- 然后判断slave节点的slave-priority值，越小优先级越高，如果是0则永不参与选举
- 如果slave-prority一样，则判断slave节点的offset值，越大说明数据越新，优先级越高
- 最后是判断slave节点的运行id大小，越小优先级越高。

当选出一个新的master后，该如何实现切换呢？<br />流程如下：

- sentinel给备选的slave1节点发送slaveof no one命令，让该节点成为master
- sentinel给所有其它slave发送slaveof 192.168.150.101 7002 命令，让这些slave成为新master的从节点，开始从新的master上同步数据。
- 最后，sentinel将故障节点标记为slave，当故障节点恢复后会自动成为新的master的slave节点

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532311039-b16ec1f4-d50d-4b89-a481-7d2849995581.png#averageHue=%23f6e9e6&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=gAynJ&originHeight=593&originWidth=838&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u121969da-71b6-4f02-9d9c-9c4638e7f1e&title=)

### 2.4 小结
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
## 3 RedisTemplate
在Sentinel集群监管下的Redis主从集群，其节点会因为自动故障转移而发生变化，Redis的客户端必须感知这种变化，及时更新连接信息。Spring的RedisTemplate底层利用lettuce实现了节点的感知和自动切换。<br />下面，我们通过一个测试来实现RedisTemplate集成哨兵机制。
### 3.1 导入Demo工程

首先，我们引入课前资料提供的Demo工程：<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532311157-49bcd9e1-16d0-487b-85de-5e3534a59c3a.png#averageHue=%23fcf8eb&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=G9SYc&originHeight=213&originWidth=196&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u0f8cc5ee-dc40-473e-bcdb-9ac0f724168&title=)

### 3.2 引入依赖
在项目的pom文件中引入依赖：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 3.3 配置Redis地址
然后在配置文件application.yml中指定redis的sentinel相关信息：
```yaml
spring:
  redis:
    sentinel:
      master: mymaster
      nodes:
        - 192.168.150.101:27001
        - 192.168.150.101:27002
        - 192.168.150.101:27003
```

### 3.4 配置读写分离
在项目的启动类中，添加一个新的bean：
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

