---
title: Seata的部署和集成
urlname: alw5bumbvhg6svwc
date: '2024-03-28 16:32:30'
updated: '2024-03-28 16:32:55'
description: '一、部署Seata的tc-server1.下载下载seata-server地址在：http://seata.io/zh-cn/blog/download.html，版本：1.5.1。或使用提供好的资料中的：seata-server-1.5.1.zip2.解压在非中文目录解压缩这个zip包，其目...'
---
# 一、部署Seata的tc-server
## 1.下载
下载seata-server地址在：[http](http://seata.io/zh-cn/blog/download.html)[://seata.io/zh-cn/blog/download](http://seata.io/zh-cn/blog/download.html)[.](http://seata.io/zh-cn/blog/download.html)[html](http://seata.io/zh-cn/blog/download.html)，版本：1.5.1。或使用提供好的资料中的：seata-server-1.5.1.zip
## 2.解压
在非中文目录解压缩这个zip包，其目录结构如下：
![image-20210622202515014.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678850541705-6f99fb03-51d2-4dac-ae97-1c70b01c1429.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_12%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdfcfa&clientId=ue46bfc92-2738-4&from=paste&height=113&id=u93b95688&originHeight=169&originWidth=411&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21549&status=done&style=none&taskId=u9bea8272-7df4-4946-9d49-5396aec00d6&title=&width=274)
## 3.修改配置
修改conf目录下的application.yml文件，内容如下：
```properties
server:
  port: 7091

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # 读取tc服务端的配置文件的方式，这里是从nacos配置中心读取，这样如果tc是集群，可以共享配置
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace:
      group: SEATA_GROUP
      username: nacos
      password: nacos
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #access-key: ""
      #secret-key: ""
      data-id: seataServer.properties
  registry:
    # tc服务的注册中心类，这里选择nacos，也可以是eureka、zookeeper等
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: DEFAULT_GROUP
      namespace:
      cluster: GZ
      username: nacos
      password: nacos

#  server:
#    service-port: 8091 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```
## 4.在nacos添加配置
特别注意，为了让tc服务的集群可以共享配置，我们选择了nacos作为统一配置中心。因此服务端配置文件`seataServer.properties`文件需要在nacos中配好。格式如下：
![image-20220620003641290.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678850644341-5e9efaf6-791c-433b-be15-454eff638632.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23c6c6c6&clientId=ue46bfc92-2738-4&from=paste&height=445&id=u59b82fb8&originHeight=668&originWidth=1602&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=68044&status=done&style=none&taskId=u5d0bd70d-55cd-4d24-8595-c02a79dae61&title=&width=1068)
配置内容如下：
```properties
# 数据存储方式，db代表数据库
store.mode=db
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=root
store.db.password=root
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
# 事务、日志等配置
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000

# 客户端与服务端传输方式
transport.serialization=seata
transport.compressor=none
# 关闭metrics功能，提高性能
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```
其中的数据库地址、用户名、密码都需要修改成你自己的数据库信息。
## 5.创建数据库表
特别注意：tc服务在管理分布式事务时，需要记录事务相关数据到数据库中，你需要提前创建好这些表。
新建一个名为`seata`的数据库，运行sql（这些表主要记录全局事务、分支事务、全局锁信息）：
```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- 分支事务表
-- ----------------------------
DROP TABLE IF EXISTS `branch_table`;
CREATE TABLE `branch_table`  (
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `transaction_id` bigint(20) NULL DEFAULT NULL,
  `resource_group_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `resource_id` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `branch_type` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT NULL,
  `client_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `application_data` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gmt_create` datetime(6) NULL DEFAULT NULL,
  `gmt_modified` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`branch_id`) USING BTREE,
  INDEX `idx_xid`(`xid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- 全局事务表
-- ----------------------------
DROP TABLE IF EXISTS `global_table`;
CREATE TABLE `global_table`  (
  `xid` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `transaction_id` bigint(20) NULL DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `application_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `transaction_service_group` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `transaction_name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `timeout` int(11) NULL DEFAULT NULL,
  `begin_time` bigint(20) NULL DEFAULT NULL,
  `application_data` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gmt_create` datetime NULL DEFAULT NULL,
  `gmt_modified` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`xid`) USING BTREE,
  INDEX `idx_gmt_modified_status`(`gmt_modified`, `status`) USING BTREE,
  INDEX `idx_transaction_id`(`transaction_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
```
## 6.启动TC服务
进入bin目录，运行其中的`seata-server.bat`即可，启动成功后，seata-server应该已经注册到nacos注册中心了。打开浏览器，访问seata控制台；地址：[http://localhost:7091](http://localhost:7091)
![image-20220620004453632.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678850723722-a7fb8455-1962-4768-bc12-4a92ba58c1e0.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_55%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fafaf9&clientId=ue46bfc92-2738-4&from=paste&height=393&id=u9a2c3753&originHeight=589&originWidth=1917&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=65082&status=done&style=none&taskId=u4f12ea14-f999-4505-8174-f0f96f7fa25&title=&width=1278)
打开浏览器，访问nacos地址：http://localhost:8848/nacos，然后进入服务列表页面，可以看到seata-server的信息：
![image-20220620004558607.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678850741763-1a71a240-95f8-4c4d-a8b3-705de8b13753.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23c2aa82&clientId=ue46bfc92-2738-4&from=paste&height=463&id=u0d9f7e4b&originHeight=694&originWidth=1894&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=78528&status=done&style=none&taskId=u8da45ff6-d326-4b51-b233-5088cfa7401&title=&width=1262.6666666666667)
# 二、微服务集成seata
需要进行分布式事务处理的每个微服务上都配置如下：
## 1.引入依赖
首先，我们需要在每个微服务中引入seata依赖：
```xml
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
<!--seata starter 采用1.5.1版本-->
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>${seata.version}</version>
</dependency>
```
## 2.修改配置文件
需要修改每个微服务中的application.yml文件，添加一些配置：
```yaml
seata:
  registry: # TC服务注册中心的配置，微服务根据这些信息去注册中心获取tc服务地址
    # 参考tc服务自己的application.yml中的配置
    type: nacos
    nacos: # tc
      server-addr: 127.0.0.1:8848
      namespace: ""
      group: DEFAULT_GROUP
      application: seata-server # tc服务在nacos中的服务名称
      cluster: GZ  #无效
  tx-service-group: seata-demo # 事务组，根据这个获取tc服务的cluster名称
  service:
    vgroup-mapping: # 事务组与TC服务cluster的映射关系
      seata-demo: GZ
```
# 三、TC服务的高可用和异地容灾
## 1.模拟异地容灾的TC集群
计划启动两台seata的tc服务节点：

| 节点名称 | ip地址 | 端口号 | 集群名称 |
| --- | --- | --- | --- |
| seata | 127.0.0.1 | 8091 | GZ |
| seata2 | 127.0.0.1 | 8092 | HZ |

之前我们已经启动了一台seata服务，端口是8091，集群名为GZ。现在，将seata目录复制一份，起名为seata2。修改seata2/conf/application.yml内容如下：
```nginx
server:
  port: 7092

spring:
  application:
    name: seata-server

logging:
  config: classpath:logback-spring.xml
  file:
    path: ${user.home}/logs/seata

console:
  user:
    username: seata
    password: seata

seata:
  config:
    # 读取tc服务端的配置文件的方式，这里是从nacos配置中心读取，这样如果tc是集群，可以共享配置
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace:
      group: SEATA_GROUP
      username: nacos
      password: nacos
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #access-key: ""
      #secret-key: ""
      data-id: seataServer.properties
  registry:
    # tc服务的注册中心类，这里选择nacos，也可以是eureka、zookeeper等
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: DEFAULT_GROUP
      namespace:
      cluster: HZ
      username: nacos
      password: nacos

  server:
    service-port: 8092 #If not configured, the default is '${server.port} + 1000'
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```
进入seata2/bin目录，然后运行双击 `seata-server.bat`。打开nacos控制台，查看服务列表：
![image-20220620202914341.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678850793427-5d9439f6-f75c-4bca-970f-da75da2f7ed3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_47%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfbfb&clientId=ue46bfc92-2738-4&from=paste&height=288&id=ub5cf6003&originHeight=432&originWidth=1634&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=49143&status=done&style=none&taskId=u565cc925-e257-415c-9a3f-f3b89faf267&title=&width=1089.3333333333333)
![](assets/image-20220620202914341.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=tAjy7&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image-20220620202945657.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678850802016-69bd131f-ed6b-471d-8661-121657ca9d91.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23494c47&clientId=ue46bfc92-2738-4&from=paste&height=479&id=ua7cddb61&originHeight=719&originWidth=1616&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=39030&status=done&style=none&taskId=u424407bb-c51b-497f-8d76-b76b419291d&title=&width=1077.3333333333333)
## 2.将事务组映射配置到nacos
接下来，我们需要将tx-service-group与cluster的映射关系都配置到nacos配置中心。新建一个配置：
![image-20210624151507072.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678850824390-f0ee4c08-3ec4-443b-a8be-76c64e5d57d9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23ebeaea&clientId=ue46bfc92-2738-4&from=paste&height=313&id=uf60133ec&originHeight=470&originWidth=908&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=20629&status=done&style=none&taskId=u0c5a5056-7219-4154-a4c2-417395c6f78&title=&width=605.3333333333334)
配置的内容如下：
```properties
# 事务组映射关系
service.vgroupMapping.seata-demo=GZ

service.enableDegrade=false
service.disableGlobalTransaction=false
# 与TC服务的通信配置
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableClientBatchSendRequest=false
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
transport.shutdown.wait=3
# RM配置
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=false
client.rm.tableMetaCheckerInterval=60000
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
# TM配置
client.tm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000

# undo日志配置
client.undo.dataValidation=true
client.undo.logSerialization=jackson
client.undo.onlyCareUpdateColumns=true
client.undo.logTable=undo_log
client.undo.compress.enable=true
client.undo.compress.type=zip
client.undo.compress.threshold=64k
client.log.exceptionRate=100
```
## 3.微服务读取nacos配置
接下来，需要修改每一个微服务的application.yml文件，让微服务读取nacos中的client.properties文件：
```yaml
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      username: nacos
      password: nacos
      group: SEATA_GROUP
      data-id: client.properties
```
> 也注释掉原来文件中的如下内容（如果不注释也可以；则作为一个默认，对动态切换集群不受影响）：

```
service:
vgroup-mapping: # 事务组与TC服务cluster的映射关系
 seata-demo: GZ
```
重启微服务，现在微服务到底是连接tc的GZ集群，还是tc的HZ集群，都统一由nacos的client.properties来决定了。
