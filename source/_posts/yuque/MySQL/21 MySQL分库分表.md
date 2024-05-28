---
title: 21 MySQL分库分表
urlname: wx79qbh5pgh25inz
date: '2024-03-14 12:14:44'
updated: '2024-03-14 12:17:27'
cover: 'https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056709980-40621c40-f709-44bb-a3ae-384c1adc5aaf.png'
description: 笔记来源：黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括1 介绍1.1 问题分析随着互联网及移动互联网的发展，应用系统的数据量也是成指数式增长，若采用单数据库进行数据存储，存在以下性能瓶颈：IO瓶颈：热点数据太多，数据库缓存不足，产生大量磁盘IO...
---
**笔记来源：**[**黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括**](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
# 1 介绍
## 1.1 问题分析

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056709980-40621c40-f709-44bb-a3ae-384c1adc5aaf.png#averageHue=%23fbe9e5&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=qmwIE&originHeight=323&originWidth=1201&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u27c5863a-564a-4ce6-a5d1-bfc0c17e18e&title=)
随着互联网及移动互联网的发展，应用系统的数据量也是成指数式增长，若采用单数据库进行数据存储，存在以下性能瓶颈：

1. IO瓶颈：热点数据太多，数据库缓存不足，产生大量磁盘IO，效率较低。 请求数据太多，带宽不够，网络IO瓶颈。
2. CPU瓶颈：排序、分组、连接查询、聚合统计等SQL会耗费大量的CPU资源，请求数太多，CPU出现瓶颈。

为了解决上述问题，我们需要对数据库进行分库分表处理。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056710047-14572986-3a5e-489c-8e2e-7968a4fabb3d.png#averageHue=%23fbfbfa&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=u48tx&originHeight=389&originWidth=1227&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4a7401bb-63a3-4807-bfff-84d4b155fb8&title=)
分库分表的中心思想都是将数据分散存储，使得单一数据库/表的数据量变小来缓解单一数据库的性能问题，从而达到提升数据库性能的目的。

## 1.2 拆分策略
分库分表的形式，主要是两种：垂直拆分和水平拆分。而拆分的粒度，一般又分为分库和分表，所以组成的拆分策略最终如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056709975-11850773-b75c-4f32-94e2-54a56ed1e167.png#averageHue=%23fdfdfd&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=JCKyd&originHeight=615&originWidth=1215&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ufec1899b-c546-4be5-a5dd-4eaea1c286f&title=)
## 1.3 垂直拆分

1. 垂直分库
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056709966-b50c8dd7-920c-40b8-a8aa-54439791a6a0.png#averageHue=%23f4f3f1&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=Z05ed&originHeight=622&originWidth=1161&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6c38e51b-ba19-4d4c-a90e-1c288964547&title=)
垂直分库：以表为依据，根据业务将不同表拆分到不同库中。
特点：
   - 每个库的表结构都不一样。
   - 每个库的数据也不一样。
   - 所有库的并集是全量数据。

2. 垂直分表
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056710090-5adf24c1-93b3-424f-9f18-1670e986307b.png#averageHue=%23f5f5f3&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=iTETS&originHeight=668&originWidth=1183&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u46806ff4-df48-451d-87f5-40e833be893&title=)
垂直分表：以字段为依据，根据字段属性将不同字段拆分到不同表中。
特点：
   - 每个表的结构都不一样。
   - 每个表的数据也不一样，一般通过一列（主键/外键）关联。
   - 所有表的并集是全量数据。

## 1.4 水平拆分

1. 水平分库
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056710570-48c98a31-2318-4298-a5a7-3d66ae0a263e.png#averageHue=%23f5f4f2&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=tI1xU&originHeight=637&originWidth=1116&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u94baeaa3-b4a7-4485-a78d-26a89de7ba8&title=)

水平分库：以字段为依据，按照一定策略，将一个库的数据拆分到多个库中。
特点：

- 每个库的表结构都一样。
- 每个库的数据都不一样。
- 所有库的并集是全量数据。

2. 水平分表
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056710635-0409c5c7-5873-4432-ac9b-1e8049b92a15.png#averageHue=%23f6f5f3&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=YE4UM&originHeight=611&originWidth=1162&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9e14f331-d68d-4213-8f3a-60e7e95bacc&title=)
水平分表：以字段为依据，按照一定策略，将一个表的数据拆分到多个表中。
特点：
   - 每个表的表结构都一样。
   - 每个表的数据都不一样。
   - 所有表的并集是全量数据。
> 在业务系统中，为了缓解磁盘IO及CPU的性能瓶颈，到底是垂直拆分，还是水平拆分；具体是分库，还是分表，都需要根据具体的业务需求具体分析。

## 1.5 实现技术

- shardingJDBC：基于AOP原理，在应用程序中对本地执行的SQL进行拦截，解析、改写、路由处理。需要自行编码配置实现，只支持java语言，性能较高。
- MyCat：数据库分库分表中间件，不用调整代码即可实现分库分表，支持多种语言，性能不及前者。

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056710619-b6fd6b90-c63d-4699-8540-e53bfa730946.png#averageHue=%23fafaf9&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=nNlid&originHeight=372&originWidth=1201&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u710a9f63-aeb8-44b1-964c-617396cdf11&title=)
我们选择了是MyCat数据库中间件，通过MyCat中间件来完成分库分表操作。
# 2 MyCat概述
## 2.1 介绍
Mycat是开源的、活跃的、基于Java语言编写的MySQL数据库中间件。可以像使用mysql一样来使用mycat，对于开发人员来说根本感觉不到mycat的存在。
开发人员只需要连接MyCat即可，而具体底层用到几台数据库，每一台数据库服务器里面存储了什么数据，都无需关心。 具体的分库分表的策略，只需要在MyCat中配置即可。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056710747-91392530-20af-4007-a8de-e12b48f4f039.png#averageHue=%23faf8f7&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=Vn1ja&originHeight=653&originWidth=684&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9add536c-aa0b-4b44-bca4-ab16edc6f89&title=)
优势：

- 性能可靠稳定
- 强大的技术团队
- 体系完善
- 社区活跃

## 2.2 下载
下载地址：[http://dl.mycat.org.cn/](http://dl.mycat.org.cn/)
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056710739-2ae86bba-3fc1-4684-b45c-f459e82ae5ed.png#averageHue=%23bec6c6&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=g3c21&originHeight=426&originWidth=923&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4b381619-fb68-4889-ac86-706347abd04&title=)
Mycat是采用java语言开发的开源的数据库中间件，支持Windows和Linux运行环境，下面介绍
MyCat的Linux中的环境搭建。我们需要在准备好的服务器中安装如下软件。

- MySQL
- JDK
- Mycat
| 服务器 | 安装软件 | 说明 |
| --- | --- | --- |
| 192.168.200.210 | JDK、Mycat | MyCat中间件服务器 |
| 192.168.200.210 | MySQL | 分片服务器 |
| 192.168.200.213 | MySQL | 分片服务器 |
| 192.168.200.214 | MySQL | 分片服务器 |

## 2.3 目录介绍
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711277-278722bf-8d64-4227-8d06-7b3f64fbc11c.png#averageHue=%2335a693&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=ZoabW&originHeight=175&originWidth=952&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud9fd8569-b2df-4319-a3d6-413ba99e198&title=)

- bin : 存放可执行文件，用于启动停止mycat
- conf：存放mycat的配置文件
- lib：存放mycat的项目依赖包（jar）
- logs：存放mycat的日志文件
## 2.4 概念介绍

在MyCat的整体结构中，分为两个部分：上面的逻辑结构、下面的物理结构。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711222-1d172310-014f-4246-a28a-cc6dc032f8db.png#averageHue=%23f3f1e5&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=Kkxj2&originHeight=567&originWidth=1233&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uaab9f8ec-4be3-4932-9d2f-2e27a6aa9f1&title=)
在MyCat的逻辑结构主要负责逻辑库、逻辑表、分片规则、分片节点等逻辑结构的处理，而具体的数据存储还是在物理结构，也就是数据库服务器中存储的。
在后面讲解MyCat入门以及MyCat分片时，还会讲到上面所提到的概念。

# 3 MyCat入门
## 3.1 需求
由于 tb_order 表中数据量很大，磁盘IO及容量都到达了瓶颈，现在需要对 tb_order 表进行数据分片，分为三个数据节点，每一个节点主机位于不同的服务器上, 具体的结构，参考下图：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711334-3f0a5504-5554-4ae2-bef9-5ca12fbd8dc2.png#averageHue=%23fcfcfc&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=rBUGN&originHeight=792&originWidth=1156&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u87a3f7e0-5b22-46bf-b468-714e0936fa8&title=)

## 3.2 环境准备
准备3台服务器：
192.168.200.210：MyCat中间件服务器，同时也是第一个分片服务器。
192.168.200.213：第二个分片服务器。
192.168.200.214：第三个分片服务器。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711437-5d782af1-2f0d-4fd0-aac1-8e6128929f00.png#averageHue=%23fafaf8&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=EufgI&originHeight=685&originWidth=890&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u1c67bf5a-76d9-47b5-907c-c6707c6d7aa&title=)
并且在上述3台数据库中创建数据库 db01

## 3.3 配置
1) schema.xml
在schema.xml中配置逻辑库、逻辑表、数据节点、节点主机等相关信息。具体的配置如下：
```xml
<?xml version="1.0"?> <!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
    <schema name="DB01" checkSQLschema="true" sqlMaxLimit="100">
        <table name="TB_ORDER" dataNode="dn1,dn2,dn3" rule="auto-sharding-long"/>
    </schema>
    <dataNode name="dn1" dataHost="dhost1" database="db01"/>
    <dataNode name="dn2" dataHost="dhost2" database="db01"/>
    <dataNode name="dn3" dataHost="dhost3" database="db01"/>
    <dataHost name="dhost1" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
              switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
                   url="jdbc:mysql://192.168.200.210:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                   user="root" password="1234"/>
    </dataHost>
    <dataHost name="dhost2" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
              switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
                   url="jdbc:mysql://192.168.200.213:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                   user="root" password="1234"/>
    </dataHost>
    <dataHost name="dhost3" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
              switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
                   url="jdbc:mysql://192.168.200.214:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                   user="root" password="1234"/>
    </dataHost>
</mycat:schema>
```

2) server.xml
需要在server.xml中配置用户名、密码，以及用户的访问权限信息，具体的配置如下：
```xml
<user name="root" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">DB01
    </property> <!-- 表级 DML 权限设置 -->
    <!-- <privileges check="true"> 
    <schema name="DB01" dml="0110" > 
    <table name="TB_ORDER" dml="1110"></table> 
    </schema> 
    </privileges> -->
</user>
<user name="user">
    <property name="password">123456</property>
    <property name="schemas">DB01</property>
    <property name="readOnly">true</property>
</user>
```
上述的配置表示，定义了两个用户 root 和 user ，这两个用户都可以访问 DB01 这个逻辑库，访问密码都是123456，但是root用户访问DB01逻辑库，既可以读，又可以写，但是 user用户访问DB01逻辑库是只读的。
## 3.4 测试
### 3.4.1 启动
配置完毕后，先启动涉及到的3台分片服务器，然后启动MyCat服务器。切换到Mycat的安装目录，执行如下指令，启动Mycat：
```bash
#启动 
bin/mycat start 

#停止 
bin/mycat stop
```
Mycat启动之后，占用端口号 8066。
启动完毕之后，可以查看logs目录下的启动日志，查看Mycat是否启动完成。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711311-f667b358-3323-4666-bfd1-ff20ccf39a0e.png#averageHue=%2323659e&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=bD66c&originHeight=303&originWidth=1236&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=udf66ac21-bff3-4be7-ba01-2a053d1218c&title=)
### 3.4.2 测试
1) 连接MyCat
通过如下指令，就可以连接并登陆MyCat。
```plsql
mysql -h 192.168.200.210 -P 8066 -uroot -p123456
```
我们看到我们是通过MySQL的指令来连接的MyCat，因为MyCat在底层实际上是模拟了MySQL的协议。

2) 数据测试
然后就可以在MyCat中来创建表，并往表结构中插入数据，查看数据在MySQL中的分布情况。
```plsql
CREATE TABLE TB_ORDER ( 
  id BIGINT(20) NOT NULL,
  title VARCHAR(100) NOT NULL , 
  PRIMARY KEY (id) 
) ENGINE=INNODB DEFAULT CHARSET=utf8 ; 

INSERT INTO TB_ORDER(id,title) VALUES(1,'goods1'); 
INSERT INTO TB_ORDER(id,title) VALUES(2,'goods2'); 
INSERT INTO TB_ORDER(id,title) VALUES(3,'goods3'); 
INSERT INTO TB_ORDER(id,title) VALUES(1,'goods1'); 
INSERT INTO TB_ORDER(id,title) VALUES(2,'goods2'); 
INSERT INTO TB_ORDER(id,title) VALUES(3,'goods3');
INSERT INTO TB_ORDER(id,title) VALUES(5000000,'goods5000000'); 
INSERT INTO TB_ORDER(id,title) VALUES(10000000,'goods10000000'); 
INSERT INTO TB_ORDER(id,title) VALUES(10000001,'goods10000001'); 
INSERT INTO TB_ORDER(id,title) VALUES(15000000,'goods15000000'); 
INSERT INTO TB_ORDER(id,title) VALUES(15000001,'goods15000001');
```
经过测试，我们发现，在往 TB_ORDER 表中插入数据时：

- 如果id的值在1-500w之间，数据将会存储在第一个分片数据库中。
- 如果id的值在500w-1000w之间，数据将会存储在第二个分片数据库中。
- 如果id的值在1000w-1500w之间，数据将会存储在第三个分片数据库中。
- 如果id的值超出1500w，在插入数据时，将会报错。

为什么会出现这种现象，数据到底落在哪一个分片服务器到底是如何决定的呢？ 这是由逻辑表配置时的一个参数 rule 决定的，而这个参数配置的就是分片规则，关于分片规则的配置，在后面会详细讲解。
# 4 MyCat配置
## 4.1 schema.xml
schema.xml 作为MyCat中最重要的配置文件之一 , 涵盖了MyCat的逻辑库 、 逻辑表 、 分片规则、分片节点及数据源的配置。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711737-136ddd09-36cc-451e-8bbe-a0cccd0b084b.png#averageHue=%23fef9f9&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=Ml3e3&originHeight=495&originWidth=1268&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u93dadc15-6def-4144-9423-fe677cf8d2a&title=)
主要包含以下三组标签：

- schema标签
- datanode标签
- datahost标签
### 4.1.1 schema标签
1) schema 定义逻辑库
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711798-ee948102-6cb5-40d8-b489-592719a2b8f8.png#averageHue=%23fefdfc&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=Fk7DN&originHeight=131&originWidth=1188&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u181cc995-0ed2-4d98-b1ca-b198adb7f52&title=)
schema 标签用于定义 MyCat实例中的逻辑库 , 一个MyCat实例中, 可以有多个逻辑库 , 可以通过 schema 标签来划分不同的逻辑库。MyCat中的逻辑库的概念，等同于MySQL中的database概念, 需要操作某个逻辑库下的表时, 也需要切换逻辑库(use xxx)。
核心属性：

- name：指定自定义的逻辑库库名
- checkSQLschema：在SQL语句操作时指定了数据库名称，执行时是否自动去除；true：自动去除，false：不自动去除
- sqlMaxLimit：如果未指定limit进行查询，列表查询模式查询多少条记录

2) schema 中的table定义逻辑表
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711861-7b675ab6-b899-4be2-966a-5a6f8d187ed8.png#averageHue=%23fbe9df&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=HYdCQ&originHeight=108&originWidth=1228&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6f73dc72-ab13-443f-9725-7c3afd98f77&title=)
table 标签定义了MyCat中逻辑库schema下的逻辑表 , 所有需要拆分的表都需要在table标签中定义 。
核心属性：

- name：定义逻辑表表名，在该逻辑库下唯一
- dataNode：定义逻辑表所属的dataNode，该属性需要与dataNode标签中name对应；多个dataNode逗号分隔
- rule：分片规则的名字，分片规则名字是在rule.xml中定义的
- primaryKey：逻辑表对应真实表的主键
- type：逻辑表的类型，目前逻辑表只有全局表和普通表，如果未配置，就是普通表；全局表，配置为 global
### 4.1.2 datanode标签
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712036-99e79815-908c-4450-9816-f89a2cf3195e.png#averageHue=%23fbe5d8&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=DZtwB&originHeight=145&originWidth=1226&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud88c3b32-434f-43b9-9f76-1b36bb7a467&title=)
核心属性：

- name：定义数据节点名称
- dataHost：数据库实例主机名称，引用自 dataHost 标签中name属性
- database：定义分片所属数据库

### 4.1.3 datahost标签
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056711997-8b96bd77-9d8a-4c19-8cfe-69d39afe42cc.png#averageHue=%23fefdfd&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=vPTG3&originHeight=139&originWidth=1258&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u06c03e1f-02d7-474a-84f8-248e14b01fe&title=)
该标签在MyCat逻辑库中作为底层标签存在, 直接定义了具体的数据库实例、读写分离、心跳语句。
核心属性：

- name：唯一标识，供上层标签使用
- maxCon/minCon：最大连接数/最小连接数
- balance：负载均衡策略，取值 0,1,2,3
- writeType：写操作分发方式（0：写操作转发到第一个writeHost，第一个挂了，切换到第二个；1：写操作随机分发到配置的writeHost）
- dbDriver：数据库驱动，支持 native、jdbc

## 4.2 rule.xml
rule.xml中定义所有拆分表的规则, 在使用过程中可以灵活的使用分片算法, 或者对同一个分片算法使用不同的参数, 它让分片过程可配置化。主要包含两类标签：tableRule、Function。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712282-8ff06b60-23da-4921-8762-614597f48785.png#averageHue=%23fdfafa&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=KsXvy&originHeight=438&originWidth=1222&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u688893b0-ae71-47d2-b1c9-c6bbe229bbe&title=)
## 4.3 server.xml
server.xml配置文件包含了MyCat的系统配置信息，主要有两个重要的标签：system、user。
1) system标签
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712436-a81b21b3-aa78-41da-93e5-807147ebc5bb.png#averageHue=%23e9cfc2&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=rxSWb&originHeight=229&originWidth=1233&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u19b847e3-37b7-49f1-bb4b-8104b0f7731&title=)
主要配置MyCat中的系统配置信息，对应的系统配置项及其含义，如下：

| 属性 | 取值 | 含义 |
| --- | --- | --- |
| charset | utf8 | 设置Mycat的字符集, 字符集需要与MySQL的 字符集保持一致 |
| nonePasswordLogin | 0,1 | 0为需要密码登陆、1为不需要密码登陆 ,默认 为0，设置为1则需要指定默认账户 |
| useHandshakeV10 | 0,1 | 使用该选项主要的目的是为了能够兼容高版本 的jdbc驱动, 是否采用 HandshakeV10Packet来与client进行通 信, 1:是, 0:否 |
| useSqlStat | 0,1 | 开启SQL实时统计, 1 为开启 , 0 为关闭 ; 开启之后, MyCat会自动统计SQL语句的执行 情况 ; 
`mysql -h 127.0.0.1 -P 9066 -u root -p` 查看MyCat执行的SQL, 执行 效率比较低的SQL , SQL的整体执行情况、读写比例等 ; 
show @[@sql ](/sql ); 
show @[@sql.slow ](/sql.slow ); 
show @[@sql.sum ](/sql.sum );  |
| useGlobleTableCheck | 0,1 | 是否开启全局表的一致性检测。1为开启 ，0 为关闭 。 |
| sqlExecuteTimeout | 1000 | SQL语句执行的超时时间 , 单位为 s ; |
| sequnceHandlerType | 0,1,2 | 用来指定Mycat全局序列类型，0 为本地文 件，1 为数据库方式，2 为时间戳列方式，默 认使用本地文件方式，文件方式主要用于测试 |
| sequnceHandlerPattern | 正则表达式 | 必须带有MYCATSEQ或者 mycatseq进入序列 匹配流程 注意MYCATSEQ_有空格的情况 |
| subqueryRelationshipCheck | true,false | 子查询中存在关联查询的情况下,检查关联字 段中是否有分片字段 .默认 false |
| useCompression | 0,1 | 开启mysql压缩协议 , 0 : 关闭, 1 : 开 启 |
| fakeMySQLVersion | 5.5,5.6 | 设置模拟的MySQL版本号 |
| defaultSqlParser |  | 由于MyCat的最初版本使用了FoundationDB 的SQL解析器, 在MyCat1.3后增加了Druid 解析器, 所以要设置defaultSqlParser属 性来指定默认的解析器; 解析器有两个 : druidparser 和 fdbparser, 在 MyCat1.4之后,默认是druidparser, fdbparser已经废除了 |
| processors | 1,2.... | 指定系统可用的线程数量, 默认值为CPU核心 x 每个核心运行线程数量; processors 会 影响processorBufferPool, processorBufferLocalPercent, processorExecutor属性, 所有, 在性能 调优时, 可以适当地修改processors值 |
| processorBufferChunk |  | 指定每次分配Socket Direct Buffer默认 值为4096字节, 也会影响BufferPool长度, 如果一次性获取字节过多而导致buffer不够 用, 则会出现警告, 可以调大该值 |
| processorExecutor |  | 指定NIOProcessor上共享 businessExecutor固定线程池的大小; MyCat把异步任务交给 businessExecutor 线程池中, 在新版本的MyCat中这个连接池使 用频次不高, 可以适当地把该值调小 |
| packetHeaderSize |  | 指定MySQL协议中的报文头长度, 默认4个字 节 |
| maxPacketSize |  | 指定MySQL协议可以携带的数据最大大小, 默 认值为16M |
| idleTimeout | 30 | 指定连接的空闲时间的超时长度;如果超时,将 关闭资源并回收, 默认30分钟 |
| txIsolation | 1,2,3,4 | 初始化前端连接的事务隔离级别,默认为 REPEATED_READ , 对应数字为3 READ_UNCOMMITED=1; READ_COMMITTED=2; REPEATED_READ=3; SERIALIZABLE=4; |
| sqlExecuteTimeout | 300 | 执行SQL的超时时间, 如果SQL语句执行超时, 将关闭连接; 默认300秒; |
| serverPort | 8066 | 定义MyCat的使用端口, 默认8066 |
| managerPort | 9066 | 定义MyCat的管理端口, 默认9066 |


2) user标签
配置MyCat中的用户、访问密码，以及用户针对于逻辑库、逻辑表的权限信息，具体的权限描述方式及配置说明如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712334-5fc6c33a-b8a2-441c-895a-271ba00fe183.png#averageHue=%23fcf9f9&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=cU8sw&originHeight=531&originWidth=1195&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u7d47752e-51af-4cb5-87c9-22de4486711&title=)
在测试权限操作时，我们只需要将 privileges 标签的注释放开。 在 privileges 下的schema标签中配置的dml属性配置的是逻辑库的权限。 在privileges的schema下的table标签的dml属性中配置逻辑表的权限。
# 5 MyCat分片
## 5.1 垂直拆分
### 5.1.1 场景
在业务系统中, 涉及以下表结构 ,但是由于用户与订单每天都会产生大量的数据, 单台服务器的数据存储及处理能力是有限的, 可以对数据库表进行拆分, 原有的数据库表如下。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712591-fccfb43e-f2eb-4cd3-a762-2439b02d84ce.png#averageHue=%23fde1e1&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=jNbKE&originHeight=647&originWidth=938&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u704cd5a7-4777-4245-90fe-16ee0d6ad9b&title=)
现在考虑将其进行垂直分库操作，将商品相关的表拆分到一个数据库服务器，订单表拆分的一个数据库服务器，用户及省市区表拆分到一个服务器。最终结构如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712623-6b58f829-b144-4a46-b8db-4374c5caf169.png#averageHue=%23fcfcfc&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=c6IWN&originHeight=707&originWidth=824&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9f97e0f4-5792-4507-9967-32241e21b97&title=)
### 5.1.2 准备
准备三台服务器，IP地址如图所示：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712932-92b82c94-9a26-4afa-8dcc-8972829b56f2.png#averageHue=%23fbfbfa&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=aazC0&originHeight=680&originWidth=934&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3d13d08c-f1e8-4d35-973d-401e3c4c314&title=)
并且在192.168.200.210，192.168.200.213, 192.168.200.214上面创建数据库shopping。

###  5.1.3 配置
1) schema.xml
```xml
<schema name="SHOPPING" checkSQLschema="true" sqlMaxLimit="100">
    <table name="tb_goods_base" dataNode="dn1" primaryKey="id"/>
    <table name="tb_goods_brand" dataNode="dn1" primaryKey="id"/>
    <table name="tb_goods_cat" dataNode="dn1" primaryKey="id"/>
    <table name="tb_goods_desc" dataNode="dn1" primaryKey="goods_id"/>
    <table name="tb_goods_item" dataNode="dn1" primaryKey="id"/>
    
    <table name="tb_order_item" dataNode="dn2" primaryKey="id"/>
    <table name="tb_order_master" dataNode="dn2" primaryKey="order_id"/>
    <table name="tb_order_pay_log" dataNode="dn2" primaryKey="out_trade_no"/>
    
    <table name="tb_user" dataNode="dn3" primaryKey="id"/>
    <table name="tb_user_address" dataNode="dn3" primaryKey="id"/>
    <table name="tb_areas_provinces" dataNode="dn3" primaryKey="id"/>
    <table name="tb_areas_city" dataNode="dn3" primaryKey="id"/>
    <table name="tb_areas_region" dataNode="dn3" primaryKey="id"/>
</schema>

<dataNode name="dn1" dataHost="dhost1" database="shopping"/>
<dataNode name="dn2" dataHost="dhost2" database="shopping"/>
<dataNode name="dn3" dataHost="dhost3" database="shopping"/>

<dataHost name="dhost1" maxCon="1000" minCon="10" balance="0"
          writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1"
          slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
           url="jdbc:mysql://192.168.200.210:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
           user="root" password="1234"/>
</dataHost> 


<dataHost name="dhost2" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
          switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
           url="jdbc:mysql://192.168.200.213:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
           user="root" password="1234"/>
</dataHost>


<dataHost name="dhost3" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc"
          switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master"
           url="jdbc:mysql://192.168.200.214:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
           user="root" password="1234"/>
</dataHost>
```

2) server.xml
```xml
<user name="root" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">SHOPPING</property>
    
    <!-- 表级 DML 权限设置 -->
    <!-- 
    <privileges check="true"> 
        <schema name="DB01" dml="0110" > 
            <table name="TB_ORDER" dml="1110"></table> 
        </schema> 
    </privileges> 
    -->
</user>

<user name="user">
    <property name="password">123456</property>
    <property name="schemas">SHOPPING</property>
    <property name="readOnly">true</property>
</user>
```

### 5.1.4 测试

1. 上传测试SQL脚本到服务器的/root目录
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056712915-5cdd6b91-f7c3-4100-aa72-05f0f08cdead.png#averageHue=%23aeb09b&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=RmLL1&originHeight=93&originWidth=1251&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6c110d0e-953a-42dc-9f74-5709b0e5588&title=)

2. 执行指令导入测试数据
重新启动MyCat后，在mycat的命令行中，通过source指令导入表结构，以及对应的数据，查看数据分布情况。
```plsql
source /root/shopping-table.sql 
source /root/shopping-insert.sql
```
将表结构及对应的测试数据导入之后，可以检查一下各个数据库服务器中的表结构分布情况。 检查是否和我们准备工作中规划的服务器一致。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056713040-876123c4-e13f-4b2a-9f8b-ab36b0b22856.png#averageHue=%23fbfbfa&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=cfST9&originHeight=390&originWidth=1237&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u7f91d8e1-4cee-4bcc-b6f6-9e89c0ba94c&title=)

3. 查询用户的收件人及收件人地址信息(包含省、市、区)。 在MyCat的命令行中，当我们执行以下多表联查的SQL语句时，可以正常查询出数据。
```plsql
select ua.user_id, ua.contact, p.province, c.city, r.area , ua.address from tb_user_address ua ,tb_areas_city c , tb_areas_provinces p ,tb_areas_region r 
where ua.province_id = p.provinceid and ua.city_id = c.cityid and ua.town_id = r.areaid ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056713240-6ffe2bbf-b7b9-4394-8539-0ddddefc3a43.png#averageHue=%231e66a6&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=wQmjX&originHeight=264&originWidth=1234&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u68fefac7-8e1e-41da-9381-310ffc1eb94&title=)

4. 查询每一笔订单及订单的收件地址信息(包含省、市、区)。
实现该需求对应的SQL语句如下：
```plsql
SELECT order_id , payment ,receiver, province , city , area FROM tb_order_master o , tb_areas_provinces p , tb_areas_city c , tb_areas_region r 
WHERE o.receiver_province = p.provinceid AND o.receiver_city = c.cityid AND o.receiver_region = r.areaid ;
```
但是现在存在一个问题，订单相关的表结构是在 192.168.200.213 数据库服务器中，而省市区的数据库表是在 192.168.200.214 数据库服务器中。那么在MyCat中执行是否可以成功呢？
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056713292-200f7b59-02ca-4c6c-879a-186f270b04d6.png#averageHue=%2383999f&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=LgcAf&originHeight=161&originWidth=1236&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6d07dc1e-c09d-41f4-8179-8f0d8c5cf0a&title=)
经过测试，我们看到，SQL语句执行报错。原因就是因为MyCat在执行该SQL语句时，需要往具体的数据库服务器中路由，而当前没有一个数据库服务器完全包含了订单以及省市区的表结构，造成SQL语句失败，报错。
对于上述的这种现象，我们如何来解决呢？ 下面我们介绍的全局表，就可以轻松解决这个问题。

### 5.1.5 全局表
对于省、市、区/县表tb_areas_provinces , tb_areas_city , tb_areas_region，是属于数据字典表，在多个业务模块中都可能会遇到，可以将其设置为全局表，利于业务操作。
修改schema.xml中的逻辑表的配置，修改 tb_areas_provinces、tb_areas_city、tb_areas_region 三个逻辑表，增加 type 属性，配置为global，就代表该表是全局表，就会在所涉及到的dataNode中创建给表。对于当前配置来说，也就意味着所有的节点中都有该表了。
```xml

<table name="tb_areas_provinces" dataNode="dn1,dn2,dn3" primaryKey="id" type="global"/> 
<table name="tb_areas_city" dataNode="dn1,dn2,dn3" primaryKey="id" type="global"/> 
<table name="tb_areas_region" dataNode="dn1,dn2,dn3" primaryKey="id" type="global"/>
```

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056713547-82cec74b-05f5-4deb-97b3-8cd9890fb128.png#averageHue=%23fcfcfc&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=NrIz3&originHeight=861&originWidth=914&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u8d5285f8-679d-4ed0-b582-311d93a9de5&title=)
配置完毕后，重新启动MyCat。
1). 删除原来每一个数据库服务器中的所有表结构
2). 通过source指令，导入表及数据
```plsql
source /root/shopping-table.sql 
source /root/shopping-insert.sql
```
3). 检查每一个数据库服务器中的表及数据分布，看到三个节点中都有这三张全局表
4). 然后再次执行上面的多表联查的SQL语句
```plsql
SELECT order_id , payment ,receiver, province , city , area FROM tb_order_master o , tb_areas_provinces p , tb_areas_city c , tb_areas_region r 
WHERE o.receiver_province = p.provinceid AND o.receiver_city = c.cityid AND o.receiver_region = r.areaid ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056713707-14e2a430-0634-403a-b90e-06fa87c7f4f4.png#averageHue=%23215492&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=gKlhF&originHeight=513&originWidth=1231&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u55b1df3d-c5e7-450d-a1af-4bd96d11c67&title=)
是可以正常执行成功的。
5). 当在MyCat中更新全局表的时候，我们可以看到，所有分片节点中的数据都发生了变化，每个节点的全局表数据时刻保持一致。

## 5.2 水平拆分
### 5.2.1 场景
在业务系统中, 有一张表(日志表), 业务系统每天都会产生大量的日志数据 , 单台服务器的数据存储及处理能力是有限的, 可以对数据库表进行拆分。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056713890-d725946b-6712-4912-9b78-8bb98733ab99.png#averageHue=%23fdfcfc&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=I9ecQ&originHeight=559&originWidth=1217&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud0489f87-2137-456b-bc1e-17a11bb45ca&title=)

### 5.2.2 准备
准备三台服务器，具体的结构如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056713896-db7473e4-5d9e-4fae-912d-f1daa8cbb4d8.png#averageHue=%23fbfaf9&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=G6zxq&originHeight=653&originWidth=897&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u8bbdf851-c237-45a2-8321-f09ba3d0c52&title=)
并且，在三台数据库服务器中分表创建一个数据库itcast。

### 5.2.3 配置
1) schema.xml
```xml
<schema name="ITCAST" checkSQLschema="true" sqlMaxLimit="100"> 
  <table name="tb_log" dataNode="dn4,dn5,dn6" primaryKey="id" rule="mod-long" /> 
</schema> 

<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```
tb_log表最终落在3个节点中，分别是 dn4、dn5、dn6 ，而具体的数据分别存储在 dhost1、dhost2、dhost3的itcast数据库中。

2) server.xml
配置root用户既可以访问 SHOPPING 逻辑库，又可以访问ITCAST逻辑库。
```xml
<user name="root" defaultAccount="true">
<property name="password">123456</property>
<property name="schemas">SHOPPING,ITCAST
</property>
    <!-- 表级 DML 权限设置 -->
    <!--
    <privileges check="true">
        <schema name="DB01" dml="0110" >
            <table name="TB_ORDER" dml="1110"></table>
        </schema>
    </privileges>
    -->
</user>
```
### 5.2.4 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
CREATE TABLE tb_log ( 
  id bigint(20) NOT NULL COMMENT 'ID', 
  model_name varchar(200) DEFAULT NULL COMMENT '模块名', 
  model_value varchar(200) DEFAULT NULL COMMENT '模块值', 
  return_value varchar(200) DEFAULT NULL COMMENT '返回值', 
  return_class varchar(200) DEFAULT NULL COMMENT '返回值类型', 
  operate_user varchar(20) DEFAULT NULL COMMENT '操作用户', 
  operate_time varchar(20) DEFAULT NULL COMMENT '操作时间', 
  param_and_value varchar(500) DEFAULT NULL COMMENT '请求参数名及参数值', 
  operate_class varchar(200) DEFAULT NULL COMMENT '操作类', 
  operate_method varchar(200) DEFAULT NULL COMMENT '操作方法', 
  cost_time bigint(20) DEFAULT NULL COMMENT '执行方法耗时, 单位 ms', 
  source int(1) DEFAULT NULL COMMENT '来源 : 1 PC , 2 Android , 3 IOS', 
  PRIMARY KEY (id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

```plsql
INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('1','user','insert','success','java.lang.String','10001','2022-01-06 18:12:28','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','insert','10',1); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('2','user','insert','success','java.lang.String','10001','2022-01-06 18:12:27','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','insert','23',1); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('3','user','update','success','java.lang.String','10001','2022-01-06 18:16:45','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','update','34',1);

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('4','user','update','success','java.lang.String','10001','2022-01-06 18:16:45','{\"age\":\"20\",\"name\":\"Tom\",\"gender\":\"1\"}','cn.itcast.contro ller.UserController','update','13',2); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('5','user','insert','success','java.lang.String','10001','2022-01-06 18:30:31','{\"age\":\"200\",\"name\":\"TomCat\",\"gender\":\"0\"}','cn.itcast.co ntroller.UserController','insert','29',3); 

INSERT INTO tb_log (id, model_name, model_value, return_value, return_class, operate_user, operate_time, param_and_value, operate_class, operate_method, cost_time，source) VALUES('6','user','find','success','java.lang.String','10001','2022-01-06 18:30:31','{\"age\":\"200\",\"name\":\"TomCat\",\"gender\":\"0\"}','cn.itcast.co ntroller.UserController','find','29',2);
```

## 5.3 分片规则
### 5.3.1 范围分片

1. 介绍
根据指定的字段及其配置的范围与数据节点的对应情况， 来决定该数据属于哪一个分片。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714060-17c589b6-74dc-4a80-8d0a-8712f841ff23.png#averageHue=%23fdfbf4&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=LoRSX&originHeight=604&originWidth=885&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uf8fdab00-96a9-4c97-92d8-1d102c32dab&title=)

2. 配置

schema.xml逻辑表配置：
```xml
<table name="TB_ORDER" dataNode="dn1,dn2,dn3" rule="auto-sharding-long" />
```

schema.xml数据节点配置：
```xml
<dataNode name="dn1" dataHost="dhost1" database="db01" /> 
<dataNode name="dn2" dataHost="dhost2" database="db01" /> 
<dataNode name="dn3" dataHost="dhost3" database="db01" />
```

rule.xml分片规则配置：
```xml
<tableRule name="auto-sharding-long">
  <rule>
    <columns>id</columns>
    <algorithm>rang-long</algorithm>
  </rule>
</tableRule> 

<function name="rang-long" class="io.mycat.route.function.AutoPartitionByLong">
  <property name="mapFile">autopartition-long.txt</property>
  <property name="defaultNode">0</property>
</function>
```

分片规则配置属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| mapFile | 对应的外部配置文件 |
| type | 默认值为0 ; 0 表示Integer , 1 表示String |
| defaultNode | 默认节点 默认节点的所用:枚举分片时,如果碰到不识别的枚举值, 就让它路由到默认节点 ; 如果没有默认值,碰到不识别的则报错 。 |

在rule.xml中配置分片规则时，关联了一个映射配置文件 autopartition-long.txt，该配置文件的配置如下：
```
# range start-end ,data node index 
# K=1000,M=10000. 
0-500M=0 
500M-1000M=1 
1000M-1500M=2
```
含义：

- 0-500万之间的值，存储在0号数据节点(数据节点的索引从0开始) ； 
- 500万-1000万之间的数据存储在1号数据节点 ； 
- 1000万-1500万的数据节点存储在2号节点 ；

该分片规则，主要是针对于数字类型的字段适用。 在MyCat的入门程序中，我们使用的就是该分片规则。

### 5.3.2 取模分片
1) 介绍
根据指定的字段值与节点数量进行求模运算，根据运算结果， 来决定该数据属于哪一个分片。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714049-0ab00a4d-92c1-40f8-beb0-46ad870f4e47.png#averageHue=%23fdfbf3&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=zr07r&originHeight=632&originWidth=863&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2ce22bf8-2078-4bd5-9e7d-f5fa8ebe1ad&title=)
2) 配置
schema.xml逻辑表配置：
```xml
<table name="tb_log" dataNode="dn4,dn5,dn6" primaryKey="id" rule="mod-long" />
```

schema.xml数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml分片规则配置：
```xml
<tableRule name="mod-long">
    <rule>
        <columns>id</columns>
        <algorithm>mod-long</algorithm>
    </rule>
</tableRule> 

<function name="mod-long" class="io.mycat.route.function.PartitionByMod">
    <property name="count">3</property>
</function>
```

分片规则属性说明如下：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| count | 数据节点的数量 |

该分片规则，主要是针对于数字类型的字段适用。 在前面水平拆分的演示中，我们选择的就是取模分片。
3) 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。

### 5.3.3 一致性hash分片
1) 介绍
所谓一致性哈希，相同的哈希因子计算值总是被划分到相同的分区表中，不会因为分区节点的增加而改变原来数据的分区位置，有效的解决了分布式数据的拓容问题。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714303-98fdcd2a-d3bb-4207-83a6-6862360c9fcf.png#averageHue=%23fdfbf6&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=fIhHW&originHeight=477&originWidth=930&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2aea9456-e4d7-4dbb-a44d-af0f69f6985&title=)
2) 配置
schema.xml中逻辑表配置：
```xml
<!-- 一致性hash --> 
<table name="tb_order" dataNode="dn4,dn5,dn6" rule="sharding-by-murmur" />
```

schema.xml中数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：
```xml
<tableRule name="sharding-by-murmur">
    <rule>
        <columns>id</columns>
        <algorithm>murmur</algorithm>
    </rule>
</tableRule>

<function name="murmur" class="io.mycat.route.function.PartitionByMurmurHash">
    <property name="seed">0</property><!-- 默认是0 -->
    <property name="count">3</property>
    <property name="virtualBucketTimes">160</property>
</function>
```

分片规则属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| seed | 创建murmur_hash对象的种子，默认0 |
| count | 要分片的数据库节点数量，必须指定，否则没法分片 |
| virtualBucketTimes | 一个实际的数据库节点被映射为这么多虚拟节点，默认是160倍，也就是虚拟节点数是物理节点数的160倍;virtualBucketTimes*count就是虚拟结点数量 ; |
| weightMapFile | 节点的权重，没有指定权重的节点默认是1。以properties文件的格式填写，以从0开始到count-1的整数值也就是节点索引为key，以节点权重值为值。所有权重值必须是正整数，否则以1代替 |
| bucketMapPath | 用于测试时观察各物理节点与虚拟节点的分布情况，如果指定了这个属性，会把虚拟节点的murmur hash值与物理节点的映射按行输出到这个文件，没有默认值，如果不指定，就不会输出任何东西 |


3) 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
create table tb_order( id varchar(100) not null primary key, money int null, content varchar(200) null );

INSERT INTO tb_order (id, money, content) VALUES ('b92fdaaf-6fc4-11ec-b831- 482ae33c4a2d', 10, 'b92fdaf8-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b93482b6-6fc4-11ec-b831- 482ae33c4a2d', 20, 'b93482d5-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b937e246-6fc4-11ec-b831- 482ae33c4a2d', 50, 'b937e25d-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b93be2dd-6fc4-11ec-b831- 482ae33c4a2d', 100, 'b93be2f9-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b93f2d68-6fc4-11ec-b831- 482ae33c4a2d', 130, 'b93f2d7d-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b9451b98-6fc4-11ec-b831- 482ae33c4a2d', 30, 'b9451bcc-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b9488ec1-6fc4-11ec-b831- 482ae33c4a2d', 560, 'b9488edb-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b94be6e6-6fc4-11ec-b831- 482ae33c4a2d', 10, 'b94be6ff-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b94ee10d-6fc4-11ec-b831- 482ae33c4a2d', 123, 'b94ee12c-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b952492a-6fc4-11ec-b831- 482ae33c4a2d', 145, 'b9524945-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b95553ac-6fc4-11ec-b831- 482ae33c4a2d', 543, 'b95553c8-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b9581cdd-6fc4-11ec-b831- 482ae33c4a2d', 17, 'b9581cfa-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b95afc0f-6fc4-11ec-b831- 482ae33c4a2d', 18, 'b95afc2a-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b95daa99-6fc4-11ec-b831- 482ae33c4a2d', 134, 'b95daab2-6fc4-11ec-b831-482ae33c4a2d');

INSERT INTO tb_order (id, money, content) VALUES ('b9667e3c-6fc4-11ec-b831- 482ae33c4a2d', 156, 'b9667e60-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b96ab489-6fc4-11ec-b831- 482ae33c4a2d', 175, 'b96ab4a5-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b96e2942-6fc4-11ec-b831- 482ae33c4a2d', 180, 'b96e295b-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b97092ec-6fc4-11ec-b831- 482ae33c4a2d', 123, 'b9709306-6fc4-11ec-b831-482ae33c4a2d'); 

INSERT INTO tb_order (id, money, content) VALUES ('b973727a-6fc4-11ec-b831- 482ae33c4a2d', 230, 'b9737293-6fc4-11ec-b831-482ae33c4a2d'); 
INSERT INTO tb_order (id, money, content) VALUES ('b978840f-6fc4-11ec-b831- 482ae33c4a2d', 560, 'b978843c-6fc4-11ec-b831-482ae33c4a2d');
```
### 5.3.4 枚举分片
1). 介绍
通过在配置文件中配置可能的枚举值, 指定数据分布到不同数据节点上, 本规则适用于按照省份、性别、状态拆分数据等业务 。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714507-68a0d3c4-5b3b-49ec-af8c-bdd2de677be6.png#averageHue=%23fdfbf5&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=V6gZh&originHeight=550&originWidth=812&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u05c3dc87-cb47-4e02-904f-3ba82a3aa9e&title=)
2). 配置
schema.xml中逻辑表配置：
```xml
<!-- 枚举 --> 
<table name="tb_user" dataNode="dn4,dn5,dn6" rule="sharding-by-intfile-enumstatus" />
```

schema.xml中数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：
```xml
<tableRule name="sharding-by-intfile">
  <rule>
    <columns>sharding_id</columns>
    <algorithm>hash-int</algorithm>
  </rule>
</tableRule>

<!-- 自己增加 tableRule -->
<tableRule name="sharding-by-intfile-enumstatus">
  <rule>
    <columns>status</columns>
    <algorithm>hash-int</algorithm>
  </rule>
</tableRule>

<function name="hash-int" class="io.mycat.route.function.PartitionByFileMap">
  <property name="defaultNode">2</property>
  <property name="mapFile">partition-hash-int.txt</property>
</function>
```

partition-hash-int.txt ，内容如下 :
```
1=0 
2=1 
3=2
```
分片规则属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| mapFile | 对应的外部配置文件 |
| type | 默认值为0 ; 0 表示Integer , 1 表示String |
| defaultNode | 默认节点 ; 小于0 标识不设置默认节点 , 大于等于0代表设置默认节点 ;默认节点的所用:枚举分片时,如果碰到不识别的枚举值, 就让它路由到默认节点 ; 如果没有默认值,碰到不识别的则报错 。 |


3). 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
CREATE TABLE tb_user ( 
  id bigint(20) NOT NULL COMMENT 'ID', 
  username varchar(200) DEFAULT NULL COMMENT '姓名', 
  status int(2) DEFAULT '1' COMMENT '1: 未启用, 2: 已启用, 3: 已关闭', 
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

insert into tb_user (id,username ,status) values(1,'Tom',1); 
insert into tb_user (id,username ,status) values(2,'Cat',2); 
insert into tb_user (id,username ,status) values(3,'Rose',3); 
insert into tb_user (id,username ,status) values(4,'Coco',2); 
insert into tb_user (id,username ,status) values(5,'Lily',1);

insert into tb_user (id,username ,status) values(6,'Tom',1); 
insert into tb_user (id,username ,status) values(7,'Cat',2); 
insert into tb_user (id,username ,status) values(8,'Rose',3); 
insert into tb_user (id,username ,status) values(9,'Coco',2); 
insert into tb_user (id,username ,status) values(10,'Lily',1);
```

### 5.3.5 应用指定算法
1). 介绍
运行阶段由应用自主决定路由到那个分片 , 直接根据字符子串（必须是数字）计算分片号。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714480-328c3a17-accc-4003-a754-445b32993ad8.png#averageHue=%23fdfbf4&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=h2vGq&originHeight=566&originWidth=734&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4bbedc4b-d0f4-43fd-b7cb-76e4fe511aa&title=)
2). 配置
schema.xml中逻辑表配置：
```xml
<!-- 应用指定算法 --> 
<table name="tb_app" dataNode="dn4,dn5,dn6" rule="sharding-by-substring" />
```

schema.xml中数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：
```xml
<tableRule name="sharding-by-substring">
  <rule>
    <columns>id</columns>
    <algorithm>sharding-by-substring</algorithm>
  </rule>
</tableRule>

<function name="sharding-by-substring" class="io.mycat.route.function.PartitionDirectBySubString">
  <property name="startIndex">0</property> <!-- zero-based -->
  <property name="size">2</property>
  <property name="partitionCount">3</property>
  <property name="defaultPartition">0</property>
</function>
```

分片规则属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| startIndex | 字符子串起始索引 |
| size | 字符长度 |
| partitionCount | 分区(分片)数量 |
| defaultPartition | 默认分片(在分片数量定义时, 字符标示的分片编号不在分片数量内时,使用默认分片) |

示例说明 :
id=05-100000002 , 在此配置中代表根据id中从 startIndex=0，开始，截取siz=2位数字即05，05就是获取的分区，如果没找到对应的分片则默认分配到defaultPartition 。

3). 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
CREATE TABLE tb_app ( 
  id varchar(10) NOT NULL COMMENT 'ID', 
  name varchar(200) DEFAULT NULL COMMENT '名称', 
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

insert into tb_app (id,name) values('0000001','Testx00001'); 
insert into tb_app (id,name) values('0100001','Test100001'); 
insert into tb_app (id,name) values('0100002','Test200001'); 
insert into tb_app (id,name) values('0200001','Test300001'); 
insert into tb_app (id,name) values('0200002','TesT400001');
```
### 5.3.6 固定分片hash算法
1). 介绍
该算法类似于十进制的求模运算，但是为二进制的操作，例如，取 id 的二进制低 10 位 与1111111111 进行位 & 运算，位与运算最小值为 0000000000，最大值为1111111111，转换为十进制，也就是位于0-1023之间。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714586-fabe01bb-27e0-46b8-9293-512195a5ae43.png#averageHue=%23fefbf3&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=xE1Fq&originHeight=584&originWidth=1122&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2ba399ff-c0b9-4015-80c5-2f30948a715&title=)
特点：

- 如果是求模，连续的值，分别分配到各个不同的分片；但是此算法会将连续的值可能分配到相同的分片，降低事务处理的难度。
- 可以均匀分配，也可以非均匀分配。
- 分片字段必须为数字类型。

2). 配置
schema.xml中逻辑表配置：
```xml
<!-- 固定分片hash算法 --> 
<table name="tb_longhash" dataNode="dn4,dn5,dn6" rule="sharding-by-long-hash" />
```

schema.xml中数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：
```xml
<tableRule name="sharding-by-long-hash">
  <rule>
    <columns>id</columns>
    <algorithm>sharding-by-long-hash</algorithm>
  </rule>
</tableRule>

<!-- 分片总长度为1024，count与length数组长度必须一致； -->
<function name="sharding-by-long-hash"
  class="io.mycat.route.function.PartitionByLong">
  <property name="partitionCount">2,1</property>
  <property name="partitionLength">256,512</property>
</function>
```

分片规则属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段名 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| partitionCount | 分片个数列表 |
| partitionLength | 分片范围列表 |

约束 :

1. 分片长度 : 默认最大2^10 , 为 1024 ;
2. . count, length的数组长度必须是一致的 ;

以上分为三个分区:0-255,256-511,512-1023
示例说明 :
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714779-8e20df2f-659d-4565-9ba8-f0688c93c23d.png#averageHue=%23fcfbfa&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=LFelU&originHeight=168&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u8046f7d4-b1d5-49e5-b25c-5e98ff4b25f&title=)

3). 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
CREATE TABLE tb_longhash ( 
  id int(11) NOT NULL COMMENT 'ID', 
  name varchar(200) DEFAULT NULL COMMENT '名称', 
  firstChar char(1) COMMENT '首字母', 
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 

insert into tb_longhash (id,name,firstChar) values(1,'七匹狼','Q'); 
insert into tb_longhash (id,name,firstChar) values(2,'八匹狼','B'); 
insert into tb_longhash (id,name,firstChar) values(3,'九匹狼','J'); 
insert into tb_longhash (id,name,firstChar) values(4,'十匹狼','S'); 
insert into tb_longhash (id,name,firstChar) values(5,'六匹狼','L'); 
insert into tb_longhash (id,name,firstChar) values(6,'五匹狼','W'); 
insert into tb_longhash (id,name,firstChar) values(7,'四匹狼','S'); 
insert into tb_longhash (id,name,firstChar) values(8,'三匹狼','S'); 
insert into tb_longhash (id,name,firstChar) values(9,'两匹狼','L');
```

### 5.3.7 字符串hash解析算法
1). 介绍
截取字符串中的指定位置的子字符串, 进行hash算法， 算出分片。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714791-e028e0b7-b32e-427c-b0fb-9b04cb905e58.png#averageHue=%23fdfbf4&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=bSfOi&originHeight=508&originWidth=1240&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ue6eabcfc-4470-4e36-aa4d-aca5c44c289&title=)

2). 配置
schema.xml中逻辑表配置：
```xml
<!-- 字符串hash解析算法 -->
<table name="tb_strhash" dataNode="dn4,dn5" rule="sharding-by-stringhash" />
```

schema.xml中数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" />
```

rule.xml中分片规则配置：
```xml
<tableRule name="sharding-by-stringhash">
  <rule>
    <columns>name</columns>
    <algorithm>sharding-by-stringhash</algorithm>
  </rule>
</tableRule> 

<function name="sharding-by-stringhash" class="io.mycat.route.function.PartitionByString">
  <property name="partitionLength">512</property> <!-- zero-based -->
  <property name="partitionCount">2</property>
  <property name="hashSlice">0:2</property>
</function>
```

分片规则属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| partitionLength hash | 求模基数 ; length*count=1024 (出于性能考虑) |
| partitionCount | 分区数 |
| hashSlice | hash运算位 , 根据子字符串的hash运算 ; 0 代表 str.length(), -1 代表 str.length()-1 , 大于0只代表数字自身 ; 可以理解为substring（start，end），start为0则只表示0 |


示例说明：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715027-5541a97e-05a2-4ab9-bd19-7220620e44de.png#averageHue=%23fcf9f9&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=isvSD&originHeight=155&originWidth=839&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ue4c9e826-0c00-4054-83e9-1f2168e12b5&title=)

3). 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
create table tb_strhash( 
  name varchar(20) primary key, 
  content varchar(100) 
)engine=InnoDB DEFAULT CHARSET=utf8mb4; 

INSERT INTO tb_strhash (name,content) VALUES('T1001', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('ROSE', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('JERRY', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('CRISTINA', UUID()); 
INSERT INTO tb_strhash (name,content) VALUES('TOMCAT', UUID());
```

### 5.3.8 按天分片算法
1). 介绍
按照日期及对应的时间周期来分片。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715075-2e5f755d-bb89-4a8c-9fe9-6f1bd2be2b33.png#averageHue=%23fef7ec&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=SefXN&originHeight=474&originWidth=792&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u7cdd2ea1-4231-441f-91b1-3ce58aaa207&title=)
2). 配置
schema.xml中逻辑表配置：
```xml
<!-- 按天分片 -->
<table name="tb_datepart" dataNode="dn4,dn5,dn6" rule="sharding-by-date" />
```

schema.xml中数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：
```xml
<tableRule name="sharding-by-date">
  <rule>
    <columns>create_time</columns>
    <algorithm>sharding-by-date</algorithm>
  </rule>
</tableRule>

<function name="sharding-by-date" class="io.mycat.route.function.PartitionByDate">
  <property name="dateFormat">yyyy-MM-dd</property>
  <property name="sBeginDate">2022-01-01</property>
  <property name="sEndDate">2022-01-30</property>
  <property name="sPartionDay">10</property>
</function> 

<!--从开始时间开始，每10天为一个分片，到达结束时间之后，会重复开始分片插入 配置表的 dataNode 的分片，必须和分片规则数量一致，例如 2022-01-01 到 2022-12-31 ，每 10天一个分片，一共需要37个分片。 -->
```

分片规则属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| dateFormat | 日期格式 |
| sBeginDate | 开始日期 |
| sEndDate | 结束日期，如果配置了结束日期，则代码数据到达了这个日期的分片后，会重复从开始分片插入 |
| sPartionDay | 分区天数，默认值 10 ，从开始日期算起，每个10天一个分区 |


3). 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
create table tb_datepart( 
  id bigint not null comment 'ID' primary key, 
  name varchar(100) null comment '姓名', 
  create_time date null 
);

insert into tb_datepart(id,name ,create_time) values(1,'Tom','2022-01-01'); 
insert into tb_datepart(id,name ,create_time) values(2,'Cat','2022-01-10');
insert into tb_datepart(id,name ,create_time) values(3,'Rose','2022-01-11'); 
insert into tb_datepart(id,name ,create_time) values(4,'Coco','2022-01-20'); 
insert into tb_datepart(id,name ,create_time) values(5,'Rose2','2022-01-21'); 
insert into tb_datepart(id,name ,create_time) values(6,'Coco2','2022-01-30'); 
insert into tb_datepart(id,name ,create_time) values(7,'Coco3','2022-01-31');
```

### 5.3.9 自然月分片
1). 介绍
使用场景为按照月份来分片, 每个自然月为一个分片。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056714990-48867203-c4fb-45cf-bf6c-ff6478d42ba8.png#averageHue=%23fdfbf5&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=BeXms&originHeight=544&originWidth=759&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ucd1114d5-7a1e-4d72-81df-e12ab895a78&title=)

2). 配置
schema.xml中逻辑表配置：
```xml
<!-- 按自然月分片 --> 
<table name="tb_monthpart" dataNode="dn4,dn5,dn6" rule="sharding-by-month" />
```

schema.xml中数据节点配置：
```xml
<dataNode name="dn4" dataHost="dhost1" database="itcast" /> 
<dataNode name="dn5" dataHost="dhost2" database="itcast" /> 
<dataNode name="dn6" dataHost="dhost3" database="itcast" />
```

rule.xml中分片规则配置：
```xml
<tableRule name="sharding-by-month">
  <rule>
    <columns>create_time</columns>
    <algorithm>partbymonth</algorithm>
  </rule>
</tableRule>

<function name="partbymonth" class="io.mycat.route.function.PartitionByMonth">
  <property name="dateFormat">yyyy-MM-dd</property>
  <property name="sBeginDate">2022-01-01</property>
  <property name="sEndDate">2022-03-31</property>
</function>

<!--从开始时间开始，一个月为一个分片，到达结束时间之后，会重复开始分片插入 配置表的 dataNode 的分片，必须和分片规则数量一致，例如 2022-01-01 到 2022-12-31 ，一 共需要12个分片。 -->
```

分片规则属性含义：

| 属性 | 描述 |
| --- | --- |
| columns | 标识将要分片的表字段 |
| algorithm | 指定分片函数与function的对应关系 |
| class | 指定该分片算法对应的类 |
| dateFormat | 日期格式 |
| sBeginDate | 开始日期 |
| sEndDate | 结束日期，如果配置了结束日期，则代码数据到达了这个日期的分片后，会重复从开始分片插入 |


3). 测试
配置完毕后，重新启动MyCat，然后在mycat的命令行中，执行如下SQL创建表、并插入数据，查看数据分布情况。
```plsql
create table tb_monthpart( 
  id bigint not null comment 'ID' primary key, 
  name varchar(100) null comment '姓名', 
  create_time date null 
);

insert into tb_monthpart(id,name ,create_time) values(1,'Tom','2022-01-01'); 
insert into tb_monthpart(id,name ,create_time) values(2,'Cat','2022-01-10'); 
insert into tb_monthpart(id,name ,create_time) values(3,'Rose','2022-01-31'); 
insert into tb_monthpart(id,name ,create_time) values(4,'Coco','2022-02-20'); 
insert into tb_monthpart(id,name ,create_time) values(5,'Rose2','2022-02-25'); 
insert into tb_monthpart(id,name ,create_time) values(6,'Coco2','2022-03-10'); 
insert into tb_monthpart(id,name ,create_time) values(7,'Coco3','2022-03-31'); 
insert into tb_monthpart(id,name ,create_time) values(8,'Coco4','2022-04-10'); 
insert into tb_monthpart(id,name ,create_time) values(9,'Coco5','2022-04-30');
```

# 6 MyCat管理及监控
## 6.1 MyCat原理

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715243-197d624f-6c44-40e7-a8bd-2276f0331081.png#averageHue=%23fefdfa&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=v23jV&originHeight=544&originWidth=1240&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u79b8c802-13ed-457a-aed6-f09daa78cce&title=)
在MyCat中，当执行一条SQL语句时，MyCat需要进行SQL解析、分片分析、路由分析、读写分离分析等操作，最终经过一系列的分析决定将当前的SQL语句到底路由到那几个(或哪一个)节点数据库，数据库将数据执行完毕后，如果有返回的结果，则将结果返回给MyCat，最终还需要在MyCat中进行结果合并、聚合处理、排序处理、分页处理等操作，最终再将结果返回给客户端。

而在MyCat的使用过程中，MyCat官方也提供了一个管理监控平台MyCat-Web（MyCat-eye）。Mycat-web 是 Mycat 可视化运维的管理和监控平台，弥补了 Mycat 在监控上的空白。帮 Mycat分担统计任务和配置管理任务。Mycat-web 引入了 ZooKeeper 作为配置中心，可以管理多个节点。Mycat-web 主要管理和监控 Mycat 的流量、连接、活动线程和内存等，具备 IP 白名单、邮件告警等模块，还可以统计 SQL 并分析慢 SQL 和高频 SQL 等。为优化 SQL 提供依据。

## 6.2 MyCat管理

Mycat默认开通2个端口，可以在server.xml中进行修改。

- 8066 数据访问端口，即进行 DML 和 DDL 操作。
- 9066 数据库管理端口，即 mycat 服务管理控制功能，用于管理mycat的整个集群状态

连接MyCat的管理控制台：
```
mysql -h 192.168.200.210 -p 9066 -uroot -p123456
```
| 命令 | 含义 |
| --- | --- |
| show | @[@help ](/help )查看Mycat管理工具帮助文档  |
| show | @[@version ](/version )查看Mycat的版本  |
| reload | @[@config ](/config )重新加载Mycat的配置文件  |
| show | @[@datasource ](/datasource )查看Mycat的数据源信息  |
| show | @[@datanode ](/datanode )查看MyCat现有的分片节点信息  |
| show | @[@threadpool ](/threadpool )查看Mycat的线程池信息  |
| show | @[@sql ](/sql )查看执行的SQL  |
| show | @[@sql.sum ](/sql.sum )查看执行的SQL统计  |

## 6.3 MyCat-eye
### 6.3.1 介绍
Mycat-web(Mycat-eye)是对mycat-server提供监控服务，功能不局限于对mycat-server使用。他通过JDBC连接对Mycat、Mysql监控，监控远程服务器(目前仅限于linux系统)的cpu、内存、网络、磁盘。
Mycat-eye运行过程中需要依赖zookeeper，因此需要先安装zookeeper。

1. zookeeper安装
参考:[https://www.yuque.com/u21918439/java/thds96](https://www.yuque.com/u21918439/java/thds96)
2. Mycat-web安装
```properties
a. 上传安装包 ：Mycat-web.tar.gz
b. 解压：tar -zxvf Mycat-web.tar.gz -C /usr/local/
c. 目录介绍
  ■ etc：jetty配置文件
  ■ lib：依赖jar包
  ■ mycat-web：mycat-web项目
  ■ readme.txt
  ■ start.jar：启动jar
  ■ start.sh： linux启动脚本
d. 启动：sh start.sh
e. 访问：http://192.168.200.210:8082/mycat
```
> 备注:
如果Zookeeper与Mycat-web不在同一台服务器上 , 需要设置Zookeeper的地址 ; 在/usr/local/mycat-web/mycat-web/WEB-INF/classes/mycat.properties文件中配置 :
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715480-fe963f97-ba56-433b-9d58-c6cbd91837e2.png#averageHue=%23575252&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=k7QQN&originHeight=139&originWidth=795&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u335498be-9d4e-4b6f-aedd-727c754c79c&title=)


### 6.3.3 访问
[http://192.168.200.210:8082/mycat](http://192.168.200.210:8082/mycat)
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715500-c5b81349-a760-4016-b44f-ea47998179da.png#averageHue=%23bac9d7&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=cGUgx&originHeight=353&originWidth=1244&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u38497bce-7c83-4eb9-be82-eacc8b17292&title=)

### 6.3.4 配置
1). 开启MyCat的实时统计功能(server.xml)
```properties
<property name="useSqlStat">1</property> <!-- 1为开启实时统计、0为关闭 -->
```

2). 在Mycat监控界面配置服务地址
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715356-c7063caf-a69f-41e8-9ecf-fa30939921dd.png#averageHue=%23e7e5e1&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=rjlO0&originHeight=602&originWidth=1219&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u16150659-8270-4826-9444-6c32fa94eb2&title=)

### 6.3.5 测试
配置好了之后，我们可以通过MyCat执行一系列的增删改查的测试，然后过一段时间之后，打开mycat-eye的管理界面，查看mycat-eye监控到的数据信息。
A. 性能监控
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715587-e7e213bc-9015-454a-b6d6-f149e024ff59.png#averageHue=%23f6f6f3&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=zoPGw&originHeight=607&originWidth=1215&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2eb6243b-4be3-4d83-89df-6a21719826f&title=)
B. 物理节点
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715806-b48d8578-745d-420e-a502-266d6c7d6ddc.png#averageHue=%23e0e7d4&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=xhtm5&originHeight=521&originWidth=1211&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6cd6be03-2afd-4cc6-ad6f-6e5a8f4a7d9&title=)
C. SQL统计
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056715876-efdc7e71-0865-4e39-89a3-f054ab2d9745.png#averageHue=%23edeae5&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=K7sSC&originHeight=598&originWidth=1217&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u8eebc0c7-22ff-4af4-b976-eb565e6847f&title=)
D. SQL表分析
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056716109-1632b75e-94b3-4f6e-b673-11b94d083c81.png#averageHue=%23faa479&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=qSQOJ&originHeight=624&originWidth=1227&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u0f0887d6-eb36-4925-aeae-02fbd6447b0&title=)
E. SQL监控
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056716213-749b2854-bda0-4479-ac32-846aa02a9e66.png#averageHue=%23f2ede0&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=W9lYq&originHeight=600&originWidth=1204&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud6b64b20-2533-4dcd-a663-db175e5d986&title=)
F. 高频SQL
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665056716376-32f943ee-a604-4cc9-a7f3-9f1a0bc6c560.png#averageHue=%23f2f1ed&clientId=uf97a126f-23b0-4&errorMessage=unknown%20error&id=c7RF7&originHeight=609&originWidth=1218&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u05f91c4f-8139-4c2d-85c0-b0398f26837&title=)
