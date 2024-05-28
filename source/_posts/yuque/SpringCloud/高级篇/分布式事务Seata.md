---
title: 分布式事务Seata
urlname: sfr3tv4tl2l6fp8c
date: '2024-03-28 16:32:00'
updated: '2024-03-28 16:32:25'
description: 在分布式架构系统中，服务不止一个，一个完整的业务链路肯定也不止调用一个服务，此时每个服务都有自己的数据库增删改查，而每一个写操作对应一个本地事务。如果想要确保全部的业务状态一致，也就意味着需要所有的本地事务状态一致，这在我们之前的学习中肯定是不具备的，如何做到跨服务、跨数据源的事务一致性将是本...
cover: ''
---
> 在分布式架构系统中，服务不止一个，一个完整的业务链路肯定也不止调用一个服务，此时每个服务都有自己的数据库增删改查，而每一个写操作对应一个本地事务。如果想要确保全部的业务状态一致，也就意味着需要所有的本地事务状态一致，这在我们之前的学习中肯定是不具备的，如何做到跨服务、跨数据源的事务一致性将是本章节的重点学习内容。

# 0.学习目标

- 了解分布式事务
- 了解CAP定理和BASE理论
- 能自己搭建Seata的TC服务并与微服务集成
- 理解XA模式原理并利用XA解决分布式事务
- 理解AT模式原理并利用AT解决分布式事务
- 理解TCC模式原理并利用TCC解决分布式事务
- 理解各种模式的优缺点
- 能部署Seata的异地高可用容灾架构
# 1.分布式事务问题
## 1.1.本地事务
本地事务，也就是传统的**单机事务**。在传统数据库事务中，必须要满足四个原则：
![image-20210724165045186.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/3c645881a8ccaec1cd44652e20ff12ea.png)
## 1.2.分布式事务
**分布式事务**，就是指不是在单个服务或单个数据库架构下，产生的事务，例如：

- 跨数据源的分布式事务
- 跨服务的分布式事务
- 综合情况

在数据库水平拆分、服务垂直拆分之后，一个业务操作通常要跨多个数据库、服务才能完成。例如电商行业中比较常见的下单付款案例，包括下面几个行为：

- 创建新订单
- 扣减商品库存
- 从用户账户余额扣除金额

完成上面的操作需要访问三个不同的微服务和三个不同的数据库。
![image-20210724165338958.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/1301658d0147437d4f7370d03fd55db6.png)
订单的创建、库存的扣减、账户扣款在每一个服务和数据库内是一个本地事务，可以保证ACID原则。
但是当我们把三件事情看做一个"业务"，要满足保证“业务”的原子性，要么所有操作全部成功，要么全部失败，不允许出现部分成功部分失败的现象，这就是**分布式系统下的事务**了。此时ACID难以满足，这是分布式事务要解决的问题
## 1.3.演示分布式事务问题
我们通过一个案例来演示分布式事务的问题：
1）**创建数据库，名为seata_demo，然后导入SQL文件：**
```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account_tbl
-- ----------------------------
DROP TABLE IF EXISTS `account_tbl`;
CREATE TABLE `account_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` int(11) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of account_tbl
-- ----------------------------
INSERT INTO `account_tbl` VALUES (1, 'user202103032042012', 1000);

-- ----------------------------
-- Table structure for order_tbl
-- ----------------------------
DROP TABLE IF EXISTS `order_tbl`;
CREATE TABLE `order_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commodity_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT 0,
  `money` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of order_tbl
-- ----------------------------

-- ----------------------------
-- Table structure for storage_tbl
-- ----------------------------
DROP TABLE IF EXISTS `storage_tbl`;
CREATE TABLE `storage_tbl`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commodity_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `count` int(11) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `commodity_code`(`commodity_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of storage_tbl
-- ----------------------------
INSERT INTO `storage_tbl` VALUES (1, '100202003032041', 10);

SET FOREIGN_KEY_CHECKS = 1;

```
2）**导入课前资料提供的微服务：**
[seata-demo.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711614729168-207a1764-0d4a-4295-8f39-603fbffcd0ce.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fzip%2F29688613%2F1711614729168-207a1764-0d4a-4295-8f39-603fbffcd0ce.zip%22%2C%22name%22%3A%22seata-demo.zip%22%2C%22size%22%3A25815%2C%22ext%22%3A%22zip%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u990914bc-70b8-4837-890e-1a6aed33fa5%22%2C%22taskType%22%3A%22transfer%22%2C%22type%22%3A%22application%2Fx-zip-compressed%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u7ff418e2%22%2C%22card%22%3A%22file%22%7D)
微服务结构中：
seata-demo：父工程，负责管理项目依赖

- account-service：账户服务，负责管理用户的资金账户。提供扣减余额的接口
- storage-service：库存服务，负责管理商品库存。提供扣减库存的接口
- order-service：订单服务，负责管理订单。创建订单时，需要调用account-service和storage-service

**3）启动nacos、所有微服务**
**4）测试下单功能，发出Post请求：**
请求如下：
```shell
curl --location --request POST 'http://localhost:8082/order?userId=user202103032042012&commodityCode=100202003032041&count=20&money=200'
```
如图：
请求方式：POST
请求地址：[http://localhost:8082/order?userId=user202103032042012&commodityCode=100202003032041&count=20&money=200](http://localhost:8082/order?userId=user202103032042012&commodityCode=100202003032041&count=20&money=200)
![image-20210724170113404.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/5ddb8ba1a6438c2039bbf63c6765e045.png)
测试发现，当库存不足时，如果余额已经扣减，并不会回滚，出现了分布式事务问题。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/048778d3c328497724d31cd90151a016.png)	![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/24955e947a9b295bd50bf4a407895b69.png)
# 2.理论基础
解决分布式事务问题，需要一些分布式系统的基础知识作为理论指导。
## 2.1.CAP定理
1998年，加州大学的计算机科学家 Eric Brewer 提出，分布式系统有三个指标。
> - Consistency（一致性）
> - Availability（可用性）
> - Partition tolerance （分区容错性）

它们的第一个字母分别是 C、A、P。Eric Brewer 说，这三个指标不可能同时做到。这个结论就叫做 CAP 定理。
### 2.1.1.一致性
Consistency（一致性）：用户访问分布式系统中的任意节点，得到的数据必须一致。
比如现在包含两个节点，其中的初始数据是一致的：
![image-20210724170704694.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/ac3434543b030651b5d8b2121f6327fc.png)
当我们修改其中一个节点的数据时，两者的数据产生了差异：
![image-20210724170735847.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/2f511936461233cc515e61b0e6e53f75.png)
要想保住一致性，就必须实现node01 到 node02的数据 同步：
![image-20210724170834855.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/c7c65e2b00841e2d5b299f8e5b552efd.png)
### 2.1.2.可用性
Availability （可用性）：用户访问集群中的任意健康节点，必须能得到响应，而不是超时或拒绝。如图，有三个节点的集群，访问任何一个都可以及时得到响应：
![image-20210724170932072.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/8b223ebbef9d4d0a3a298d131e10248f.png)
当有部分节点因为网络故障或其它原因无法访问时，代表节点不可用：
![image-20210724171007516.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/ddcc4673223ce4cfa41d25fdc3e2a137.png)
### 2.1.3.分区容错
**Partition（分区）**：因为网络故障或其它原因导致分布式系统中的部分节点与其它节点失去连接，形成独立分区。
![image-20210724171041210.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/a7b7a4572a799d4bfb074f27ac43e92a.png)
**Tolerance（容错）**：在集群出现分区时，整个系统也要持续对外提供服务
### 2.1.4.矛盾
在分布式系统中，系统间的网络不能100%保证健康，一定会有故障的时候，而服务又必须对外保证服务。因此Partition Tolerance不可避免。当节点接收到新的数据变更时，就会出现问题了：
如果此时要保证**一致性**，就必须等待网络恢复，完成数据同步后，整个集群才对外提供服务，服务处于阻塞状态，不可用。
如果此时要保证**可用性**，就不能等待网络恢复，那node01、node02与node03之间就会出现数据不一致。
也就是说，在P一定会出现的情况下，A和C之间只能实现一个。
## 2.2.BASE理论
BASE理论是对CAP的一种解决思路，包含三个思想：

- **Basically Available** **（基本可用）**：分布式系统在出现故障时，允许损失部分可用性，即保证核心可用。
- **Soft State（软状态）：**在一定时间内，允许出现中间状态，比如临时的不一致状态。
- **Eventually Consistent（最终一致性）**：虽然无法保证强一致性，但是在软状态结束后，最终达到数据一致。
## 2.3.解决分布式事务的思路
分布式事务最大的问题是各个子事务的一致性问题，因此可以借鉴CAP定理和BASE理论，有两种解决思路：

-  AP模式：各子事务分别执行和提交，允许出现结果不一致，然后采用弥补措施恢复数据即可，实现最终一致。 
-  CP模式：各个子事务执行后互相等待，同时提交，同时回滚，达成强一致。但事务等待过程中，处于弱可用状态。 

但不管是哪一种模式，都需要在子系统事务之间互相通讯，协调事务状态，也就是需要一个**事务协调者(TC)**：
![image-20210724172123567.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/05c691f0f7812fc2900b18626ac0fad2.png)
这里的子系统事务，称为**分支事务**；有关联的各个分支事务在一起称为**全局事务**。
# 3.初识Seata
Seata是 2019 年 1 月份蚂蚁金服和阿里巴巴共同开源的分布式事务解决方案。致力于提供高性能和简单易用的分布式事务服务，为用户打造一站式的分布式解决方案。官网地址：http://seata.io/，其中的文档、播客中提供了大量的使用说明、源码分析。
![image-20210724172225817.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/5f1d03f56906227f65ed1cfaa11d70a8.png)
## 3.1.Seata的架构
Seata事务管理中有三个重要的角色：

-  **TC (Transaction Coordinator) -** **事务协调者：**维护全局和分支事务的状态，协调全局事务提交或回滚。 
-  **TM (Transaction Manager) -** **事务管理器：**定义全局事务的范围、开始全局事务、提交或回滚全局事务。 
-  **RM (Resource Manager) -** **资源管理器：**管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。 

整体的架构如图：
![image-20210724172326452.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/2a10c9c07c90fdc5d1b8d94f0a3dfb72.png)
Seata基于上述架构提供了四种不同的分布式事务解决方案：

- XA模式：强一致性分阶段事务模式，牺牲了一定的可用性，无业务侵入
- TCC模式：最终一致的分阶段事务模式，有业务侵入
- AT模式：最终一致的分阶段事务模式，无业务侵入，也是Seata的默认模式
- SAGA模式：长事务模式，有业务侵入

无论哪种方案，都离不开TC，也就是事务的协调者。
## 3.2.部署TC服务
参考：[Seata的部署和集成](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/tyvzebhpluiorwpk?view=doc_embed)
## 3.3.微服务集成Seata
我们以order-service为例来演示。
### 3.3.1.引入依赖
首先，在order-service中引入依赖：
```xml
<!--seata-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <exclusions>
        <!--版本较低，1.3.0，因此排除--> 
        <exclusion>
            <artifactId>seata-spring-boot-starter</artifactId>
            <groupId>io.seata</groupId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <!--seata starter 采用1.5.1版本-->
    <version>${seata.version}</version>
</dependency>
```
### 3.3.2.配置TC地址
在order-service中的application.yml中，配置TC服务信息，通过注册中心nacos，结合服务名称获取TC地址：
```yaml
seata:
  registry: # TC服务注册中心的配置，微服务根据这些信息去注册中心获取tc服务地址
    type: nacos # 注册中心类型 nacos
    nacos:
      server-addr: 127.0.0.1:8848 # nacos地址
      namespace: "" # namespace，默认为空
      group: DEFAULT_GROUP # 分组，默认是DEFAULT_GROUP
      application: seata-server # seata服务名称
      username: nacos
      password: nacos
  tx-service-group: seata-demo # 事务组名称
  service:
    vgroup-mapping: # 事务组与cluster的映射关系
      seata-demo: GZ
```
微服务如何根据这些配置寻找TC的地址呢？我们知道注册到Nacos中的微服务，确定一个具体实例需要四个信息：

- namespace：命名空间
- group：分组
- application：服务名
- cluster：集群名

以上四个信息，在刚才的yaml文件中都能找到：
![image-20210724173654258.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/468a1246a5b30a41b997f21e3be49144.png)
namespace为空，就是默认的public
结合起来，TC服务的信息就是：public@DEFAULT_GROUP@seata-tc-server@GZ，这样就能确定TC服务集群了。然后就可以去Nacos拉取对应的实例信息了。
### 3.3.3.其它服务
其它两个微服务也都参考order-service的步骤来做，完全一样。
# 4.动手实践
下面我们就一起学习下Seata中的四种不同的事务模式。
## 4.1.XA模式
XA 规范 是 X/Open 组织定义的分布式事务处理（DTP，Distributed Transaction Processing）标准，XA 规范 描述了全局的TM与局部的RM之间的接口，几乎所有主流的数据库都对 XA 规范 提供了支持。
### 4.1.1.两阶段提交
XA是规范，目前主流数据库都实现了这种规范，实现的原理都是基于两阶段提交。
正常情况：
![image-20210724174102768.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/ab3a1d5b1988643e65c2dbc142888be5.png)
异常情况：
![image-20210724174234987.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/8d0607aef46eb88695c5ec5f89813378.png)
一阶段：

- 事务协调者通知每个事物参与者执行本地事务
- 本地事务执行完成后报告事务执行状态给事务协调者，此时事务不提交，继续持有数据库锁

二阶段：

- 事务协调者基于一阶段的报告来判断下一步操作 
   - 如果一阶段都成功，则通知所有事务参与者，提交事务
   - 如果一阶段任意一个参与者失败，则通知所有事务参与者回滚事务
### 4.1.2.Seata的XA模型
Seata对原始的XA模式做了简单的封装和改造，以适应自己的事务模型，基本架构如图：
![image-20210724174424070.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/da174ea7bc7dcadce05e476384a24866.png)
RM一阶段的工作：
	① 注册分支事务到TC
	② 执行分支业务sql但不提交
	③ 报告执行状态到TC
TC二阶段的工作：

-  TC检测各分支事务执行状态
a.如果都成功，通知所有RM提交事务
b.如果有失败，通知所有RM回滚事务 

RM二阶段的工作：

- 接收TC指令，提交或回滚事务
### 4.1.3.优缺点
XA模式的优点是什么？

- 事务的强一致性，满足ACID原则。
- 常用数据库都支持，实现简单，并且没有代码侵入

XA模式的缺点是什么？

- 因为一阶段需要锁定数据库资源，等待二阶段结束才释放，性能较差
- 依赖关系型数据库实现事务
### 4.1.4.实现XA模式
Seata的starter已经完成了XA模式的自动装配，实现非常简单，步骤如下：
1）修改application.yml文件（**每个参与事务的微服务**），开启XA模式：
```yaml
seata:
  data-source-proxy-mode: XA
```
2）给发起全局事务的入口方法添加@GlobalTransactional注解:
本例中是OrderServiceImpl中的create方法.
![image-20210724174859556.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/a7b5e6562dae67fa90881d4d6b455463.png)
3）重启服务并测试
重启order-service，再次测试，发现无论怎样，三个微服务都能成功回滚。
## 4.2.AT模式
AT模式同样是分阶段提交的事务模型，不过缺弥补了XA模型中资源锁定周期过长的缺陷。
### 4.2.1.Seata的AT模型
基本流程图：
![image-20210724175327511.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/29af20476414867467dc694a8b394a33.png)
阶段一RM的工作：

- 注册分支事务
- 记录undo-log（数据快照）
- 执行业务sql并提交
- 报告事务状态

阶段二提交时RM的工作：

- 删除undo-log即可

阶段二回滚时RM的工作：

- 根据undo-log恢复数据到更新前
### 4.2.2.流程梳理
我们用一个真实的业务来梳理下AT模式的原理。
比如，现在有一个数据库表，记录用户余额：

| **id** | **money** |
| --- | --- |
| 1 | 100 |

其中一个分支业务要执行的SQL为：
```sql
update tb_account set money = money - 10 where id = 1
```
AT模式下，当前分支事务执行流程如下：
一阶段：
1）TM发起并注册全局事务到TC
2）TM调用分支事务
3）分支事务准备执行业务SQL
4）RM拦截业务SQL，根据where条件查询原始数据，形成快照。
```json
{
    "id": 1, "money": 100
}
```
5）RM执行业务SQL，提交本地事务，释放数据库锁。此时 `money = 90`
6）RM报告本地事务状态给TC
二阶段：
1）TM通知TC事务结束
2）TC检查分支事务状态
	 a）如果都成功，则立即删除快照
	 b）如果有分支事务失败，需要回滚。读取快照数据（`{"id": 1, "money": 100}`），将快照恢复到数据库。此时数据库再次恢复为100
流程图：
![image-20210724180722921.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/afa6a0c5cb7a5003eec2052c85956322.png)
### 4.2.3.AT与XA的区别
简述AT模式与XA模式最大的区别是什么？

- XA模式一阶段不提交事务，锁定资源；AT模式一阶段直接提交，不锁定资源。
- XA模式依赖数据库机制实现回滚；AT模式利用数据快照实现数据回滚。
- XA模式强一致；AT模式最终一致
### 4.2.4.脏写问题
在多线程并发访问AT模式的分布式事务时，有可能出现脏写问题，如图：
![image-20210724181541234.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/0ac8f1d77757444c77363a574f915088.png)
解决思路就是引入了全局锁的概念。在释放DB锁之前，先拿到全局锁。避免同一时刻有另外一个事务来操作当前数据。
![image-20210724181843029.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/726aec24736079d60020f53bef1cfa61.png)
### 4.2.5.优缺点
AT模式的优点：

- 一阶段完成直接提交事务，释放数据库资源，性能比较好
- 利用全局锁实现读写隔离
- 没有代码侵入，框架自动完成回滚和提交

AT模式的缺点：

- 两阶段之间属于软状态，属于最终一致
- 框架的快照功能会影响性能，但比XA模式要好很多
### 4.2.6.实现AT模式
AT模式中的快照生成、回滚等动作都是由框架自动完成，没有任何代码侵入，因此实现非常简单。
只不过，AT模式需要一个表来记录全局锁、另一张表来记录数据快照undo_log。
1）导入数据库表，记录全局锁
其中`lock_table`、`distributed_lock`导入到TC服务关联的数据库（seata），`undo_log`表导入到微服务关联的数据库（seata_demo）：
```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for undo_log
-- ----------------------------
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log`  (
  `branch_id` bigint(20) NOT NULL COMMENT 'branch transaction id',
  `xid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'global transaction id',
  `context` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'undo_log context,such as serialization',
  `rollback_info` longblob NOT NULL COMMENT 'rollback info',
  `log_status` int(11) NOT NULL COMMENT '0:normal status,1:defense status',
  `log_created` datetime(6) NOT NULL COMMENT 'create datetime',
  `log_modified` datetime(6) NOT NULL COMMENT 'modify datetime',
  UNIQUE INDEX `ux_undo_log`(`xid`, `branch_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'AT transaction mode undo table' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of undo_log
-- ----------------------------






CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_status` (`status`),
    KEY `idx_branch_id` (`branch_id`),
    KEY `idx_xid_and_branch_id` (`xid` , `branch_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
    `lock_key`       CHAR(20) NOT NULL,
    `lock_value`     VARCHAR(20) NOT NULL,
    `expire`         BIGINT,
    primary key (`lock_key`)
) ENGINE = InnoDB;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```
2）修改application.yml文件，将事务模式修改为AT模式即可：
```yaml
seata:
  data-source-proxy-mode: AT # 默认就是AT
```
3）重启服务并测试
## 4.3.TCC模式
TCC模式与AT模式非常相似，每阶段都是独立事务，不同的是TCC通过人工编码来实现数据恢复。需要实现三个方法：

-  Try：资源的检测和预留； 
-  Confirm：完成资源操作业务；要求 Try 成功 Confirm 一定要能成功。 
-  Cancel：预留资源释放，可以理解为try的反向操作。 
### 4.3.1.流程分析
举例，一个扣减用户余额的业务。假设账户A原来余额是100，需要余额扣减30元。

- **阶段一（ Try ）**：检查余额是否充足，如果充足则冻结金额增加30元，可用余额扣除30

初始余额：
![image-20210724182424907.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/3df444a0ba5ed2a4d23e2f8c0eaa95a5.png)
余额充足，可以冻结：
![image-20210724182457951.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/bf61be71d304fea22cfd4dd2b611a0fe.png)
此时，总金额 = 冻结金额 + 可用金额，数量依然是100不变。事务直接提交无需等待其它事务。

- **阶段二（Confirm)**：假如要提交（Confirm），则冻结金额扣减30

确认可以提交，不过之前可用金额已经扣减过了，这里只要清除冻结金额就好了：
![image-20210724182706011.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/afe3780f86e8b8ebdee50187f47fda6d.png)
此时，总金额 = 冻结金额 + 可用金额 = 0 + 70  = 70元

- **阶段二(Canncel)**：如果要回滚（Cancel），则冻结金额扣减30，可用余额增加30

需要回滚，那么就要释放冻结金额，恢复可用金额：
![](assets/image-20210724182810734.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=ekYZU&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
### 4.3.2.Seata的TCC模型
Seata中的TCC模型依然延续之前的事务架构，如图：
![image-20210724182937713.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/ee79ec61439983e7d935547be8a11fac.png)
### 4.3.3.优缺点
TCC模式的每个阶段是做什么的？

- Try：资源检查和预留
- Confirm：业务执行和提交
- Cancel：预留资源的释放

TCC的优点是什么？

- 一阶段完成直接提交事务，释放数据库资源，性能好
- 相比AT模型，无需生成快照，无需使用全局锁，性能最强
- 不依赖数据库事务，而是依赖补偿操作，可以用于非事务型数据库

TCC的缺点是什么？

- 有代码侵入，需要人为编写try、Confirm和Cancel接口，太麻烦
- 软状态，事务是最终一致
- 需要考虑Confirm和Cancel的失败情况，做好幂等处理
### 4.3.4.事务悬挂和空回滚
#### 1）空回滚
当某分支事务的try阶段**阻塞**时，可能导致全局事务超时而触发二阶段的cancel操作。在未执行try操作时先执行了cancel操作，这时cancel不能做回滚，就是**空回滚**。
如图：
![image-20210724183426891.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/a77a587682a6acec3d3dcb0809796235.png)
执行cancel操作时，应当判断try是否已经执行，如果尚未执行，则应该空回滚。
#### 2）业务悬挂
对于已经空回滚的业务，之前被阻塞的try操作恢复，继续执行try，就永远不可能confirm或cancel ，事务一直处于中间状态，这就是**业务悬挂**。
执行try操作时，应当判断cancel是否已经执行过了，如果已经执行，应当阻止空回滚后的try操作，避免悬挂
### 4.3.5.实现TCC模式
解决空回滚和业务悬挂问题，必须要记录当前事务状态，是在try、还是cancel？
#### 1）思路分析
这里我们定义一张表；在 seata_demo数据库中创建如下表：
```sql
CREATE TABLE `account_freeze_tbl`(
    `xid` varchar(128) NOT NULL,
    `user_id` varchar(255) DEFAULT NULL COMMENT'用户id',
    `freeze_money`int(11) unsigned DEFAULT'0'COMMENT'冻结金额',
    `state`int(1) DEFAULT NULL COMMENT'事务状态，0:try，1:confirm，2:cancel',
    PRIMARY KEY(`xid`)USING BTREE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
```
其中：

- xid：是全局事务id
- freeze_money：用来记录用户冻结金额
- state：用来记录事务状态

那此时，我们的业务该怎么做呢？

- Try业务： 
   - 记录冻结金额和事务状态到account_freeze表
   - 扣减account表可用金额
- Confirm业务 
   - 根据xid删除account_freeze表的冻结记录
- Cancel业务 
   - 修改account_freeze表，冻结金额为0，state为2
   - 修改account表，恢复可用金额
- 如何判断是否空回滚？ 
   - cancel业务中，根据xid查询account_freeze，如果为null则说明try还没做，需要空回滚
- 如何避免业务悬挂？ 
   - try业务中，根据xid查询account_freeze ，如果已经存在则证明Cancel已经执行，拒绝执行try业务

接下来，我们改造account-service，利用TCC实现余额扣减功能。
#### 2）声明TCC接口
TCC的Try、Confirm、Cancel方法都需要在接口中基于注解来声明，
我们在`account-service`项目中的`cn.itcast.account.service`包中新建一个接口，声明TCC三个接口：
```java
package cn.itcast.account.service;

import io.seata.rm.tcc.api.BusinessActionContext;
import io.seata.rm.tcc.api.BusinessActionContextParameter;
import io.seata.rm.tcc.api.LocalTCC;
import io.seata.rm.tcc.api.TwoPhaseBusinessAction;

@LocalTCC
public interface AccountTCCService {

    /**
     * 根据用户id扣减余额，记录冻结金额
     * commitMethod 提交时对于的方法；rollbackMethod回滚时对于的方法
     * @param userId 用户id
     * @param money 扣减金额
     */
    @TwoPhaseBusinessAction(name = "deduct", commitMethod = "confirm", rollbackMethod = "cancel")
    void deduct(@BusinessActionContextParameter("userId")String userId,
                @BusinessActionContextParameter("money")int money);

    /**
     * 执行TCC事务时，提交事务时执行的方法
     * @param ctx 上下文对象
     * @return 执行结果
     */
    Boolean confirm(BusinessActionContext ctx);
    /**
     * 执行TCC事务时，回滚事务时执行的方法
     * @param ctx 上下文对象
     * @return 执行结果
     */
    Boolean cancel(BusinessActionContext ctx);
}
```
#### 3）编写实现类
在`account-service`服务中的`cn.itcast.account.service.impl`包下新建一个类，实现TCC业务：
```java
package cn.itcast.account.service.impl;

import cn.itcast.account.entity.AccountFreeze;
import cn.itcast.account.mapper.AccountFreezeMapper;
import cn.itcast.account.mapper.AccountMapper;
import cn.itcast.account.service.AccountTCCService;
import io.seata.core.context.RootContext;
import io.seata.rm.tcc.api.BusinessActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountTCCServiceImpl implements AccountTCCService {

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private AccountFreezeMapper accountFreezeMapper;

    @Override
    @Transactional
    public void deduct(String userId, int money) {
        //获取事务id
        String xid = RootContext.getXID();
        //处理业务悬挂
        AccountFreeze freeze = accountFreezeMapper.selectById(xid);
        if (freeze != null) {
            //已经cancel过，拒绝业务
            return;
        }

        //1 扣减余额
        accountMapper.deduct(userId, money);

        //2 记录冻结金额
        AccountFreeze accountFreeze = new AccountFreeze();
        accountFreeze.setXid(xid);
        accountFreeze.setUserId(userId);
        accountFreeze.setFreezeMoney(money);
        accountFreeze.setState(AccountFreeze.State.TRY);
        accountFreezeMapper.insert(accountFreeze);
    }

    @Override
    public Boolean confirm(BusinessActionContext ctx) {
        //删除冻结金额
        String xid = ctx.getXid();
        int count = accountFreezeMapper.deleteById(xid);
        return count==1;
    }

    @Override
    public Boolean cancel(BusinessActionContext ctx) {
        //获取全局事务id
        String xid = ctx.getXid();
        //用户id
        String userId = ctx.getActionContext("userId").toString();
        AccountFreeze accountFreeze = accountFreezeMapper.selectById(xid);

        //处理空回滚
        if (accountFreeze == null) {
            accountFreeze = new AccountFreeze();
            accountFreeze.setXid(xid);
            accountFreeze.setUserId(userId);
            accountFreeze.setFreezeMoney(0);
            accountFreeze.setState(AccountFreeze.State.CANCEL);
            accountFreezeMapper.insert(accountFreeze);
            return true;
        }

        //幂等处理
        if (accountFreeze.getState() == AccountFreeze.State.CANCEL) {
            //说明已经回滚过了；不需要再处理
            return true;
        }

        //1 回退金额
        accountMapper.refund(userId, accountFreeze.getFreezeMoney());

        //2 更新冻结金额为0和状态
        accountFreeze.setFreezeMoney(0);
        accountFreeze.setState(AccountFreeze.State.CANCEL);
        int count = accountFreezeMapper.updateById(accountFreeze);

        return count==1;
    }
}
```

改造 `src/main/java/cn/itcast/account/web/AccountController.java` 如下：
![image-20220620195501868.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/580f7ff2ead7f5c8bffd55e839de246a.png)
## 4.4.SAGA模式
Saga 模式是 Seata 即将开源的长事务解决方案，将由蚂蚁金服主要贡献。其理论基础是Hector & Kenneth  在1987年发表的论文[Sagas](https://microservices.io/patterns/data/saga.html)。
Seata官网对于Saga的指南：[https://seata.io/zh-cn/docs/user/saga.html](https://seata.io/zh-cn/docs/user/saga.html)
### 4.4.1.原理
在 Saga 模式下，分布式事务内有多个参与者，每一个参与者都是一个冲正补偿服务，需要用户根据业务场景实现其正向操作和逆向回滚操作。
分布式事务执行过程中，依次执行各参与者的正向操作，如果所有正向操作均执行成功，那么分布式事务提交。如果任何一个正向操作执行失败，那么分布式事务会去退回去执行前面各参与者的逆向回滚操作，回滚已提交的参与者，使分布式事务回到初始状态。
![image-20210724184846396.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/8937924bd7111ab6b8a7c8c9a3c2bb59.png)
Saga也分为两个阶段：

- 一阶段：直接提交本地事务
- 二阶段：成功则什么都不做；失败则通过编写补偿业务来回滚
### 4.4.2.优缺点
优点：

- 事务参与者可以基于事件驱动实现异步调用，吞吐高
- 一阶段直接提交事务，无锁，性能好
- 不用编写TCC中的三个阶段，实现简单

缺点：

- 软状态持续时间不确定，时效性差
- 没有锁，没有事务隔离，会有脏写
## 4.5.四种模式对比
我们从以下几个方面来对比四种实现：

- 一致性：能否保证事务的一致性？强一致还是最终一致？
- 隔离性：事务之间的隔离性如何？
- 代码侵入：是否需要对业务代码改造？
- 性能：有无性能损耗？
- 场景：常见的业务场景

如图：
![image-20210724185021819.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/ae5bb445e65157caf8a6b257e315b1c9.png)
# 5.高可用
Seata的TC服务作为分布式事务核心，一定要保证集群的高可用性。
## 5.1.高可用架构模型
搭建TC服务集群非常简单，启动多个TC服务，注册到nacos即可。
但集群并不能确保100%安全，万一集群所在机房故障怎么办？所以如果要求较高，一般都会做异地多机房容灾。
比如一个TC集群在广州，另一个TC集群在杭州：
![image-20220620202137645.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/分布式事务Seata/d396579f8e9e883e6a17b2d868ba2c20.png)
微服务基于事务组（tx-service-group)与TC集群的映射关系，来查找当前应该使用哪个TC集群。当GZ集群故障时，只需要将vgroup-mapping中的映射关系改成HZ。则所有微服务就会切换到HZ的TC集群了。
## 5.2.实现高可用
具体实现请参考：[《seata的部署和集成.md》](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/tyvzebhpluiorwpk)


