**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
## 1 搭建主从架构
单节点Redis的并发能力是有上限的，要进一步提高Redis的并发能力，就需要搭建主从集群，实现读写分离。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532309058-34f3eae4-b973-46b1-87aa-df30b7605113.png#averageHue=%23faf4f4&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=429&id=z27Wo&originHeight=604&originWidth=1297&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uc3a5f2a1-4e66-4907-b546-0f04da50a37&title=&width=922)
具体搭建流程参考另一篇文章：
[15 redis集群搭建](https://www.yuque.com/u21918439/vg7knb/xkt6nu?view=doc_embed)
## 2 主从数据同步原理
### 2.1 全量同步
主从第一次建立连接时，会执行**全量同步**，将master节点的所有数据都拷贝给slave节点，流程：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532309327-e79f94ba-e756-4eb1-9f00-e52a275ed634.png#averageHue=%23e8eedb&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=584&id=D798m&originHeight=687&originWidth=1231&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u69731136-35d8-434a-9362-fc267376393&title=&width=1047)
这里有一个问题，master如何得知salve是第一次来连接呢？？
有几个概念，可以作为判断依据：

- **Replication Id**：简称replid，是数据集的标记，id一致则说明是同一数据集。每一个master都有唯一的replid，slave则会继承master节点的replid
- **offset**：偏移量，随着记录在repl_baklog中的数据增多而逐渐增大。slave完成同步时也会记录当前同步的offset。如果slave的offset小于master的offset，说明slave数据落后于master，需要更新。

因此slave做数据同步，必须向master声明自己的replication id 和offset，master才可以判断到底需要同步哪些数据。
因为slave原本也是一个master，有自己的replid和offset，当第一次变成slave，与master建立连接时，发送的replid和offset是自己的replid和offset。
master判断发现slave发送来的replid与自己的不一致，说明这是一个全新的slave，就知道要做全量同步了。
master会将自己的replid和offset都发送给这个slave，slave保存这些信息。以后slave的replid就与master一致了。
因此，**master判断一个节点是否是第一次同步的依据，就是看replid是否一致**。
如图：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532309861-113319f3-9441-4423-9ee5-489e8a1bd139.png#averageHue=%23e8eedb&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=599&id=v3upe&originHeight=649&originWidth=1239&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ufe466e14-4a1b-4035-8b4e-901734a49cb&title=&width=1143)
完整流程描述：

- slave节点请求增量同步
- master节点判断replid，发现不一致，拒绝增量同步
- master将完整内存数据生成RDB，发送RDB到slave
- slave清空本地数据，加载master的RDB
- master将RDB期间的命令记录在repl_baklog，并持续将log中的命令发送给slave
- slave执行接收到的命令，保持与master之间的同步

### 2.2 增量同步
全量同步需要先做RDB，然后将RDB文件通过网络传输个slave，成本太高了。因此除了第一次做全量同步，其它大多数时候slave与master都是做**增量同步**。
什么是增量同步？就是只更新slave与master存在差异的部分数据。如图：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532309713-8fd88ccb-ee84-48bd-83da-e771a4659ce0.png#averageHue=%236c6968&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=437&id=khlvg&originHeight=488&originWidth=1210&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ucb4abb75-eea5-4af5-a3fc-4628daede97&title=&width=1083)
那么master怎么知道slave与自己的数据差异在哪里呢?

### 2.3 repl_backlog原理
master怎么知道slave与自己的数据差异在哪里呢?
这就要说到全量同步时的repl_baklog文件了。
这个文件是一个固定大小的数组，只不过数组是环形，也就是说**角标到达数组末尾后，会再次从0开始读写**，这样数组头部的数据就会被覆盖。
repl_baklog中会记录Redis处理过的命令日志及offset，包括master当前的offset，和slave已经拷贝到的offset：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310021-de32bde6-273b-40c2-99ca-119ab3db2d6f.png#averageHue=%23fdf6f5&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=QGt6Z&originHeight=243&originWidth=226&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uabf998e5-83f4-450b-b463-3c6a90a6072&title=)
slave与master的offset之间的差异，就是salve需要增量拷贝的数据了。
随着不断有数据写入，master的offset逐渐变大，slave也不断的拷贝，追赶master的offset：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310303-f8da5f56-bf6e-476a-9530-a05aaaf0d58c.png#averageHue=%23fcf4f3&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=Kfnvm&originHeight=252&originWidth=239&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u505f2cf8-4e59-4ad0-be63-0f8d486e6c3&title=)

直到数组被填满：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310067-8014056e-7e93-4421-a381-82007bc000ef.png#averageHue=%23fdf7f7&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=murwu&originHeight=265&originWidth=238&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u66fd2f5c-4973-4816-9eb0-b6bd8e538eb&title=)

此时，如果有新的数据写入，就会覆盖数组中的旧数据。不过，旧的数据只要是绿色的，说明是已经被同步到slave的数据，即便被覆盖了也没什么影响。因为未同步的仅仅是红色部分。
但是，如果slave出现网络阻塞，导致master的offset远远超过了slave的offset：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310371-01d337c3-9702-4ded-972b-22975ae722fc.png#averageHue=%23f9e7e6&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=kGilr&originHeight=249&originWidth=202&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u52ca7972-5a42-4d78-94a6-be44d1d3f31&title=)
如果master继续写入新数据，其offset就会覆盖旧的数据，直到将slave现在的offset也覆盖：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310575-4a90aa50-f7a7-4137-bfa7-87b55b5f8a18.png#averageHue=%23f8e7e5&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&id=zTeH0&originHeight=253&originWidth=218&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u49707c58-5a56-4023-bb8a-2bf16335069&title=)

棕色框中的红色部分，就是尚未同步，但是却已经被覆盖的数据。此时如果slave恢复，需要同步，却发现自己的offset都没有了，无法完成增量同步了。只能做全量同步。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310605-84cd1d69-c285-48f8-b686-b45e3f3977f5.png#averageHue=%23ebe6e6&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=106&id=jabpy&originHeight=134&originWidth=1350&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3d74de46-e072-430a-91d3-89e61893108&title=&width=1065)

## 3 主从同步优化
主从同步可以保证主从数据的一致性，非常重要。
可以从以下几个方面来优化Redis主从就集群：

- 在master中配置repl-diskless-sync yes启用无磁盘复制，避免全量同步时的磁盘IO。
- Redis单节点上的内存占用不要太大，减少RDB导致的过多磁盘IO
- 适当提高repl_baklog的大小，发现slave宕机时尽快实现故障恢复，尽可能避免全量同步
- 限制一个master上的slave节点数量，如果实在是太多slave，则可以采用主-从-从链式结构，减少master压力

主从从架构图：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664532310690-32ab5dcd-9232-4531-99e5-79e6bc1906c1.png#averageHue=%23f6e8e7&clientId=u64bd80a6-af81-4&errorMessage=unknown%20error&height=328&id=QyB7L&originHeight=412&originWidth=1308&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=udd3adf0a-65d8-4a7e-b17a-c98a60556a2&title=&width=1040)
## 4 小结
简述全量同步和增量同步区别？

- 全量同步：master将完整内存数据生成RDB，发送RDB到slave。后续命令则记录在repl_baklog，逐个发送给slave。
- 增量同步：slave提交自己的offset到master，master获取repl_baklog中从offset之后的命令给slave

什么时候执行全量同步？

- slave节点第一次连接master节点时
- slave节点断开时间太久，repl_baklog中的offset已经被覆盖时

什么时候执行增量同步？

- slave节点断开又恢复，并且在repl_baklog中能找到offset时

