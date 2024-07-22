**笔记来源：**[**黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括**](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
# 1 介绍
读写分离,简单地说是把对数据库的读和写操作分开,以对应不同的数据库服务器。主数据库提供写操作，从数据库提供读操作，这样能有效地减轻单台数据库的压力。
通过MyCat即可轻易实现上述功能，不仅可以支持MySQL，也可以支持Oracle和SQL Server。
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389859048-9e5174a9-812f-43d6-a550-fccc5957ea95.png#averageHue=%23fbfaf9&clientId=u2890a5f9-13b5-4&id=BeDwv&originHeight=517&originWidth=1157&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u25d8bf98-58d0-47c7-8f4c-450c5b54f99&title=)
# 2 一主一从
## 2.1 原理
MySQL的主从复制，是基于二进制日志（binlog）实现的。
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389859848-62363d1a-1f0a-4525-9ed7-03ce34263e8f.png#averageHue=%23fbfaf9&clientId=u2890a5f9-13b5-4&id=j9NEn&originHeight=645&originWidth=1217&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u82c8d1ac-52b3-4440-b1aa-d6f81593e58&title=)
准备

| 主机 | 角色 | 用户名 | 密码 |
| --- | --- | --- | --- |
| 192.168.200.211 | master | root | 1234 |
| 192.168.200.212 | slave | root | 1234 |

> 备注：主从复制的搭建，可以参考前面主从复制讲解的步骤操作。


# 3 一主一从读写分离
MyCat控制后台数据库的读写分离和负载均衡由schema.xml文件datahost标签的balance属性控制。
## 3.1 schema.xml配置
```xml
<!-- 配置逻辑库 -->
<schema name="ITCAST_RW" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn7">

</schema>
<dataNode name="dn7" dataHost="dhost7" database="itcast"/> 

<dataHost name="dhost7" maxCon="1000" minCon="10" balance="1" writeType="0" 
          dbType="mysql" dbDriver="jdbc" switchType="1" slaveThreshold="100">

    <heartbeat>select user()</heartbeat>
    <writeHost host="master1"
           url="jdbc:mysql://192.168.200.211:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
           user="root" password="1234">
        <readHost host="slave1"
              url="jdbc:mysql://192.168.200.212:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
              user="root" password="1234"/>
    </writeHost>
</dataHost>
```

上述配置的具体关联对应情况如下：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389859456-16187b16-f510-4f7d-9c3a-183113da5755.png#averageHue=%23fefafa&clientId=u2890a5f9-13b5-4&id=MQIWI&originHeight=386&originWidth=1211&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u85779c91-d1d1-48e7-a291-5cfe4a54030&title=)
writeHost代表的是写操作对应的数据库，readHost代表的是读操作对应的数据库。 所以我们要想实现读写分离，就得配置writeHost关联的是主库，readHost关联的是从库。
而仅仅配置好了writeHost以及readHost还不能完成读写分离，还需要配置一个非常重要的负责均衡的参数 balance，取值有4种，具体含义如下：

| 参数值 | 含义 |
| --- | --- |
| 0 | 不开启读写分离机制 , 所有读操作都发送到当前可用的writeHost上 |
| 1 | 全部的readHost 与 备用的writeHost 都参与select 语句的负载均衡（主要针对于双主双从模式） |
| 2 | 所有的读写操作都随机在writeHost , readHost上分发 |
| 3 | 所有的读请求随机分发到writeHost对应的readHost上执行, writeHost不负担读压力 |

所以，在一主一从模式的读写分离中，balance配置1或3都是可以完成读写分离的。
## 3.2 server.xml配置

配置root用户可以访问SHOPPING、ITCAST 以及 ITCAST_RW逻辑库。
```xml
<user name="root" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">SHOPPING,ITCAST,ITCAST_RW
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
## 3.3 测试
配置完毕MyCat后，重新启动MyCat。
```bash
bin/mycat stop 
bin/mycat start
```
然后观察，在执行增删改操作时，对应的主库及从库的数据变化。 在执行查询操作时，检查主库及从库对应的数据变化。
在测试中，我们可以发现当主节点Master宕机之后，业务系统就只能够读，而不能写入数据了。
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389859238-1fe54f4c-ceb9-44b2-9c14-43b055e9742d.png#averageHue=%231e5698&clientId=u2890a5f9-13b5-4&id=mQZAW&originHeight=458&originWidth=1220&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf35b8c68-6483-4583-b7f5-0ea207214a7&title=)
那如何解决这个问题呢？这个时候我们就得通过另外一种主从复制结构来解决了，也就是我们接下来讲解的双主双从。

# 4 双主双从
## 4.1 介绍
一个主机 Master1 用于处理所有写请求，它的从机 Slave1 和另一台主机 Master2 还有它的从机 Slave2 负责所有读请求。当 Master1 主机宕机后，Master2 主机负责写请求，Master1 、Master2 互为备机。架构图如下:
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389859028-9bca51e1-1c3b-4dc1-aa9d-4b82a76388e9.png#averageHue=%23f9f9f7&clientId=u2890a5f9-13b5-4&id=UoOr6&originHeight=513&originWidth=1209&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6130c25a-6d8d-4caf-8ff8-73c4cfe8cff&title=)
## 4.2 准备
我们需要准备5台服务器，具体的服务器及软件安装情况如下：

| 编号 | IP | 预装软件 | 角色 |
| --- | --- | --- | --- |
| 1 | 192.168.200.210 | MyCat、MySQL MyCat | 中间件服务器 |
| 2 | 192.168.200.211 | MySQL | M1 |
| 3 | 192.168.200.212 | yySQL | S1 |
| 4 | 192.168.200.213 | MySQL | M2 |
| 5 | 192.168.200.214 | MySQL | S2 |

关闭以上所有服务器的防火墙：
```bash
systemctl stop firewalld
systemctl disable firewalld
```
## 4.3 搭建
### 4.3.1 主库配置

**Master1(192.168.200.211)**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389859885-199473d0-6187-479d-a197-2e1f53c2ad71.png#averageHue=%23f7e8e5&clientId=u2890a5f9-13b5-4&id=LIuvs&originHeight=632&originWidth=600&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua7e67052-8b66-45ea-8fd4-078d02bd093&title=)
A. 修改配置文件 /etc/my.cnf
```properties
#mysql 服务ID，保证整个集群环境中唯一，取值范围：1 – 2^32-1，默认为1 
server-id=1 

#指定同步的数据库 
binlog-do-db=db01 
binlog-do-db=db02 
binlog-do-db=db03 

# 在作为从数据库的时候，有写入操作也要更新二进制日志文件 
log-slave-updates
```

B. 重启MySQL服务器
```bash
systemctl restart mysqld
```

C. 创建账户并授权
```sql
--创建itcast用户，并设置密码，该用户可在任意主机连接该MySQL服务 
CREATE USER 'itcast'@'%' IDENTIFIED WITH mysql_native_password BY 'Root@123456' ;

--为 'itcast'@'%' 用户分配主从复制权限 
GRANT REPLICATION SLAVE ON *.* TO 'itcast'@'%';
```

通过指令，查看两台主库的二进制日志坐标
show master status ;
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389859889-502bbda1-9839-48d6-a5e7-430c09f21d6c.png#averageHue=%231e5d9f&clientId=u2890a5f9-13b5-4&id=zTwV6&originHeight=339&originWidth=1225&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uad848662-a807-4270-bb47-7feae4893d3&title=)

**Master2(192.168.200.213)**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389860293-41c54b11-5997-48cf-893d-45d21e3dfc6a.png#averageHue=%23f7eae7&clientId=u2890a5f9-13b5-4&id=GiwgZ&originHeight=628&originWidth=649&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6817f6a8-8761-4096-a3fe-53021e5c756&title=)
A. 修改配置文件 /etc/my.cnf
```properties
#mysql 服务ID，保证整个集群环境中唯一，取值范围：1 – 2^32-1，默认为1 
server-id=3 

#指定同步的数据库 
binlog-do-db=db01 
binlog-do-db=db02 
binlog-do-db=db03 

# 在作为从数据库的时候，有写入操作也要更新二进制日志文件 
log-slave-updates
```

B. 重启MySQL服务器
```
systemctl restart mysqld
```

C. 创建账户并授权
```sql
--创建itcast用户，并设置密码，该用户可在任意主机连接该MySQL服务 
CREATE USER 'itcast'@'%' IDENTIFIED WITH mysql_native_password BY 'Root@123456' ;

--为 'itcast'@'%' 用户分配主从复制权限 
GRANT REPLICATION SLAVE ON *.* TO 'itcast'@'%';
```

通过指令，查看两台主库的二进制日志坐标
```plsql
show master status ;
```
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389860412-0485cd20-ef5b-4b8f-a39d-e422c3611802.png#averageHue=%231e5d9e&clientId=u2890a5f9-13b5-4&id=FC3rv&originHeight=325&originWidth=1219&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u63bc6939-4d81-4fd8-837d-224e5a1e6eb&title=)

### 4.3.2 从库配置
uploading-image-256106.png
A. 修改配置文件 /etc/my.cnf
```properties
#mysql 服务ID，保证整个集群环境中唯一，取值范围：1 – 232-1，默认为1 
server-id=2
```

B. 重新启动MySQL服务器
```bash
systemctl restart mysqld
```

**Slave2(192.168.200.214)**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389860882-bc7ce90b-b95e-4bff-a65e-635ed3ef84d3.png#averageHue=%23f7e8e5&clientId=u2890a5f9-13b5-4&id=Dzc3z&originHeight=621&originWidth=600&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue792ca29-6cd9-43f4-8c1b-d21ca385149&title=)
A. 修改配置文件 /etc/my.cnf
```properties
#mysql 服务ID，保证整个集群环境中唯一，取值范围：1 – 232-1，默认为1 
server-id=4
```

B. 重新启动MySQL服务器
```bash
systemctl restart mysqld
```

### 4.3.3 从库关联主库
1). 两台从库配置关联的主库
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389860579-38ae8b1e-92a4-44cc-afed-091dbe692e40.png#averageHue=%23f6e5e2&clientId=u2890a5f9-13b5-4&id=JO5RM&originHeight=617&originWidth=599&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u448b7593-ce05-4275-9360-37ef0771da7&title=)
> 需要注意slave1对应的是master1，slave2对应的是master2。

A. 在 slave1(192.168.200.212)上执行
```bash
CHANGE MASTER TO MASTER_HOST='192.168.200.211', MASTER_USER='itcast', MASTER_PASSWORD='Root@123456', MASTER_LOG_FILE='binlog.000002', MASTER_LOG_POS=663;
```

B. 在 slave2(192.168.200.214)上执行
```bash
CHANGE MASTER TO MASTER_HOST='192.168.200.213', MASTER_USER='itcast', MASTER_PASSWORD='Root@123456', MASTER_LOG_FILE='binlog.000002', MASTER_LOG_POS=663;
```

C. 启动两台从库主从复制，查看从库状态
```bash
start slave; 
show slave status \G;
```

![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389860851-bbfa5817-8092-4ea0-9041-75fcd8b824a9.png#averageHue=%231d599b&clientId=u2890a5f9-13b5-4&id=n0Vuq&originHeight=643&originWidth=1218&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8e9705dc-e048-4c46-90b5-7d1ab64a49d&title=)
2). 两台主库相互复制
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389861244-221359a8-a417-431c-bc6d-828d9c1e68cd.png#averageHue=%23f6e3df&clientId=u2890a5f9-13b5-4&id=nh6Ko&originHeight=615&originWidth=551&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0e8bdd0c-1a42-468f-b057-5bedc8a70bb&title=)
```
Master2 复制 Master1，Master1 复制 Master2。
```

A. 在 Master1(192.168.200.211)上执行
```plsql
CHANGE MASTER TO MASTER_HOST='192.168.200.213', MASTER_USER='itcast', MASTER_PASSWORD='Root@123456', MASTER_LOG_FILE='binlog.000002', MASTER_LOG_POS=663;
```

B. 在 Master2(192.168.200.213)上执行
```plsql
CHANGE MASTER TO MASTER_HOST='192.168.200.211', MASTER_USER='itcast', MASTER_PASSWORD='Root@123456', MASTER_LOG_FILE='binlog.000002', MASTER_LOG_POS=663;
```

C. 启动两台从库主从复制，查看从库状态
```bash
start slave; 
show slave status \G;
```
经过上述的三步配置之后，双主双从的复制结构就已经搭建完成了。 接下来，我们可以来测试验证一下。
## 4.4 测试
分别在两台主库Master1、Master2上执行DDL、DML语句，查看涉及到的数据库服务器的数据同步情况。
```plsql
create database db01; 
use db01; 
create table tb_user( 
    id int(11) not null primary key , 
    name varchar(50) not null, 
    sex varchar(1) 
)engine=innodb default charset=utf8mb4; 

insert into tb_user(id,name,sex) values(1,'Tom','1');
insert into tb_user(id,name,sex) values(2,'Trigger','0'); 
insert into tb_user(id,name,sex) values(3,'Dawn','1'); 
insert into tb_user(id,name,sex) values(4,'Jack Ma','1'); 
insert into tb_user(id,name,sex) values(5,'Coco','0'); 
insert into tb_user(id,name,sex) values(6,'Jerry','1');
```
在Master1中执行DML、DDL操作，看看数据是否可以同步到另外的三台数据库中。
在Master2中执行DML、DDL操作，看看数据是否可以同步到另外的三台数据库中。
完成了上述双主双从的结构搭建之后，接下来，我们再来看看如何完成这种双主双从的读写分离。

# 5 双主双从读写分离
## 5.1 配置
MyCat控制后台数据库的读写分离和负载均衡由schema.xml文件datahost标签的balance属性控制，通过writeType及switchType来完成失败自动切换的。
1) schema.xml
配置逻辑库：
```xml
<schema name="ITCAST_RW2" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn7"> </schema>
```

配置数据节点：
```xml
<dataNode name="dn7" dataHost="dhost7" database="db01" />
```

配置节点主机：
```xml
<dataHost name="dhost7" maxCon="1000" minCon="10" balance="1" 
          writeType="0" dbType="mysql" dbDriver="jdbc"
          switchType="1" slaveThreshold="100">
    
    <heartbeat>select user()</heartbeat>
    
    <writeHost host="master1"
               url="jdbc:mysql://192.168.200.211:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
               user="root" password="1234">
        <readHost host="slave1"
                  url="jdbc:mysql://192.168.200.212:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                  user="root" password="1234"/>
    </writeHost>
    
    <writeHost host="master2"
               url="jdbc:mysql://192.168.200.213:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
               user="root" password="1234">
        <readHost host="slave2"
                  url="jdbc:mysql://192.168.200.214:3306? useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8"
                  user="root" password="1234"/>
    </writeHost>
    
</dataHost>
```

具体的对应情况如下：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1710389861355-2fab7749-d658-4be2-b5cb-0d6e034b4665.png#averageHue=%23fef8f8&clientId=u2890a5f9-13b5-4&id=J0w7P&originHeight=323&originWidth=1208&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u67320e87-f51f-49b4-bfa9-b76e594cf04&title=)
属性说明：
`balance="1"` 

- 代表全部的 readHost 与 stand by writeHost 参与 select 语句的负载均衡，简单的说，当双主双从模式(M1->S1，M2->S2，并且 M1 与 M2 互为主备)，正常情况下，M2,S1,S2 都参与 select 语句的负载均衡 ;

 
`writeType`

- 0 : 写操作都转发到第1台writeHost, writeHost1挂了, 会切换到writeHost2上;
- 1 : 所有的写操作都随机地发送到配置的writeHost上 ;

 
`switchType`

- -1 : 不自动切换
- 1 : 自动切换

2) user.xml
配置root用户也可以访问到逻辑库 ITCAST_RW2。
```xml
<user name="root" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">SHOPPING,ITCAST,ITCAST_RW2
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

## 5.2 测试
登录MyCat，测试查询及更新操作，判定是否能够进行读写分离，以及读写分离的策略是否正确。
当主库挂掉一个之后，是否能够自动切换。
