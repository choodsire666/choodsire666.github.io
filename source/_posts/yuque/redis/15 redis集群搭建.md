---
title: 15 redis集群搭建
urlname: nsr40eau65k75qa0
date: '2024-03-31 11:08:58'
updated: '2024-04-15 16:19:58'
cover: ''
description: 笔记来源：黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案基于CentOS7下的Redis集群教程，包括：单机安装RedisRedis主从Redis分片集群1 单机安装Redis首先需要安装Redis所需要的依赖：yum install -y g...
---
**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
基于CentOS7下的Redis集群教程，包括：

- 单机安装Redis
- Redis主从
- Redis分片集群
# 1 单机安装Redis
首先需要安装Redis所需要的依赖：
```shell
yum install -y gcc tcl
```
然后将课前资料提供的Redis安装包上传到虚拟机的任意目录：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854604508-cd74f0d5-7221-4d4f-b9a7-ad317f93f06e.png#averageHue=%23fdfdfd&clientId=u296c007f-9a6a-4&id=VPgz2&originHeight=129&originWidth=802&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub3d58d94-b544-4106-a772-adedf68b820&title=)
例如，我放到了/tmp目录：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854604631-f264cf0d-86f3-4d0d-922a-1d569870abc5.png#averageHue=%23fbfaf9&clientId=u296c007f-9a6a-4&id=QnZZ1&originHeight=223&originWidth=797&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u797d3a44-315c-4c23-a960-9adcc8a3d62&title=)
解压缩：
```shell
tar -xzf redis-6.2.4.tar.gz
```
解压后：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854604548-32b9b83d-cfeb-4c90-857e-ed150be47276.png#averageHue=%23fcfbf9&clientId=u296c007f-9a6a-4&id=LkANO&originHeight=232&originWidth=801&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u42fa8b83-247f-4eb9-8fcf-0596e48fe05&title=)

进入redis目录：
```shell
cd redis-6.2.4
```

运行编译命令：
```shell
make && make install
```
如果没有出错，应该就安装成功了。

然后修改redis.conf文件中的一些配置：
```properties
# 绑定地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问
bind 0.0.0.0
# 保护模式，关闭保护模式
protected-mode no
# 数据库数量，设置为1
databases 1
```

启动Redis：
```shell
redis-server redis.conf
```

停止redis服务：
```shell
redis-cli shutdown
```

# 2 Redis主从集群
## 2.1 集群结构
我们搭建的主从集群结构如图：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854604559-814a8750-7f3d-42f2-b1b3-ae8e666fe365.png#averageHue=%23f9f1f0&clientId=u296c007f-9a6a-4&id=JtgRX&originHeight=353&originWidth=757&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6b4cd848-166e-4aeb-9c5d-bae8d79b902&title=)
共包含三个节点，一个主节点，两个从节点。
这里我们会在同一台虚拟机中开启3个redis实例，模拟主从集群，信息如下：

| IP | PORT | 角色 |
| --- | --- | --- |
| 192.168.150.101 | 7001 | master |
| 192.168.150.101 | 7002 | slave |
| 192.168.150.101 | 7003 | slave |

## 2.2.准备实例和配置
要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。
1）创建目录
我们创建三个文件夹，名字分别叫7001、7002、7003：
```shell
# 进入/tmp目录
cd /tmp
# 创建目录
mkdir 7001 7002 7003
```
如图：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854604480-65bde3be-f38a-43c9-a71a-56e34115b3d1.png#averageHue=%23022c48&clientId=u296c007f-9a6a-4&height=185&id=ZYsqS&originHeight=267&originWidth=811&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue8536c13-4553-4ba6-94f8-2e2f14aaf5d&title=&width=562)
2）恢复原始配置
修改redis-6.2.4/redis.conf文件，将其中的持久化模式改为默认的RDB模式，AOF保持关闭状态。
```properties
# 开启RDB
# save ""
save 3600 1
save 300 100
save 60 10000

# 关闭AOF
appendonly no
```

3）拷贝配置文件到每个实例目录
然后将redis-6.2.4/redis.conf文件拷贝到三个目录中（在/tmp目录执行下列命令）：
```shell
# 方式一：逐个拷贝
cp redis-6.2.4/redis.conf 7001
cp redis-6.2.4/redis.conf 7002
cp redis-6.2.4/redis.conf 7003

# 方式二：管道组合命令，一键拷贝
echo 7001 7002 7003 | xargs -t -n 1 cp redis-6.2.4/redis.conf
```

4）修改每个实例的端口、工作目录
修改每个文件夹内的配置文件，将端口分别修改为7001、7002、7003，将rdb文件保存位置都修改为自己所在目录（在/tmp目录执行下列命令）：
```shell
sed -i -e 's/6379/7001/g' -e 's/dir .\//dir \/tmp\/7001\//g' 7001/redis.conf
sed -i -e 's/6379/7002/g' -e 's/dir .\//dir \/tmp\/7002\//g' 7002/redis.conf
sed -i -e 's/6379/7003/g' -e 's/dir .\//dir \/tmp\/7003\//g' 7003/redis.conf
```

5）修改每个实例的声明IP
虚拟机本身有多个IP，为了避免将来混乱，我们需要在redis.conf文件中指定每一个实例的绑定ip信息，格式如下：
```properties
# redis实例的声明 IP
replica-announce-ip 192.168.150.101
```

每个目录都要改，我们一键完成修改（在/tmp目录执行下列命令）：
```shell
# 逐一执行
sed -i '1a replica-announce-ip 192.168.150.101' 7001/redis.conf
sed -i '1a replica-announce-ip 192.168.150.101' 7002/redis.conf
sed -i '1a replica-announce-ip 192.168.150.101' 7003/redis.conf

# 或者一键修改
printf '%s\n' 7001 7002 7003 | xargs -I{} -t sed -i '1a replica-announce-ip 192.168.150.101' {}/redis.conf
```

## 2.3 启动
为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令：
```shell
# 第1个
redis-server 7001/redis.conf
# 第2个
redis-server 7002/redis.conf
# 第3个
redis-server 7003/redis.conf
```

启动后：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854605416-61746f94-823e-4121-bc8e-712570465a2d.png#averageHue=%23373535&clientId=u296c007f-9a6a-4&id=iKOOU&originHeight=877&originWidth=1883&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u13e72aba-44e9-4566-adaf-68313425bb1&title=)
如果要一键停止，可以运行下面命令：
```shell
printf '%s\n' 7001 7002 7003 | xargs -I{} -t redis-cli -p {} shutdown
```

## 2.4 开启主从关系
现在三个实例还没有任何关系，要配置主从可以使用replicaof 或者slaveof（5.0以前）命令。
有临时和永久两种模式：

-  修改配置文件（永久生效） 
   - 在redis.conf中添加一行配置：`slaveof <masterip> <masterport>`
-  使用redis-cli客户端连接到redis服务，执行slaveof命令（重启后失效）： 
```shell
slaveof <masterip> <masterport>
```
**注意**：在5.0以后新增命令replicaof，与salveof效果一致。
这里我们为了演示方便，使用方式二。
通过redis-cli命令连接7002，执行下面命令：
```shell
# 连接 7002
redis-cli -p 7002
# 执行slaveof
slaveof 192.168.150.101 7001
```

通过redis-cli命令连接7003，执行下面命令：
```shell
# 连接 7003
redis-cli -p 7003
# 执行slaveof
slaveof 192.168.150.101 7001
```

然后连接 7001节点，查看集群状态：
```shell
# 连接 7001
redis-cli -p 7001
# 查看状态
info replication
```

结果：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854605234-f54bc94c-313a-4b10-abb0-eebaaf2dd02d.png#averageHue=%23393836&clientId=u296c007f-9a6a-4&id=IVki6&originHeight=395&originWidth=827&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud72da98f-8398-4a59-bdd8-84b881b4c9e&title=)
## 2.5 测试
执行下列操作以测试：

-  利用redis-cli连接7001，执行`set num 123` 
-  利用redis-cli连接7002，执行`get num`，再执行`set num 666` 
-  利用redis-cli连接7003，执行`get num`，再执行`set num 888` 

可以发现，只有在7001这个master节点上可以执行写操作，7002和7003这两个slave节点只能执行读操作。
# 3 搭建哨兵集群
## 3.1 集群结构
这里我们搭建一个三节点形成的Sentinel集群，来监管之前的Redis主从集群。如图：

![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854605283-40b76c7c-6a64-40de-add2-e335799fb68e.png#averageHue=%23f4ded4&clientId=u296c007f-9a6a-4&id=pWzpO&originHeight=575&originWidth=742&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0f61d83b-dd76-46c9-b1f6-92fb25dade5&title=)
三个sentinel实例信息如下：

| 节点 | IP | PORT |
| --- | --- | --- |
| s1 | 192.168.150.101 | 27001 |
| s2 | 192.168.150.101 | 27002 |
| s3 | 192.168.150.101 | 27003 |

## 3.2 准备实例和配置
要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。
我们创建三个文件夹，名字分别叫s1、s2、s3：
```shell
# 进入/tmp目录
cd /tmp
# 创建目录
mkdir s1 s2 s3
```

如图：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854605153-0a9083ab-6930-4262-b02a-4555d89b36ed.png#averageHue=%23262524&clientId=u296c007f-9a6a-4&height=256&id=A3e9Y&originHeight=333&originWidth=941&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u151fc284-5224-4738-aa97-0832ddfa86e&title=&width=723)

然后我们在s1目录创建一个sentinel.conf文件，添加下面的内容：
```properties
port 27001
sentinel announce-ip 192.168.150.101
sentinel monitor mymaster 192.168.150.101 7001 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
dir "/tmp/s1"
```
解读：

- `port 27001`：是当前sentinel实例的端口
- `sentinel monitor mymaster 192.168.150.101 7001 2`：指定主节点信息 
   - `mymaster`：主节点名称，自定义，任意写
   - `192.168.150.101 7001`：主节点的ip和端口
   - `2`：选举master时的quorum值

然后将s1/sentinel.conf文件拷贝到s2、s3两个目录中（在/tmp目录执行下列命令）：
```shell
# 方式一：逐个拷贝
cp s1/sentinel.conf s2
cp s1/sentinel.conf s3
# 方式二：管道组合命令，一键拷贝
echo s2 s3 | xargs -t -n 1 cp s1/sentinel.conf
```

修改s2、s3两个文件夹内的配置文件，将端口分别修改为27002、27003：
```shell
sed -i -e 's/27001/27002/g' -e 's/s1/s2/g' s2/sentinel.conf
sed -i -e 's/27001/27003/g' -e 's/s1/s3/g' s3/sentinel.conf
```

## 3.3 启动
为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令：
```shell
# 第1个
redis-sentinel s1/sentinel.conf
# 第2个
redis-sentinel s2/sentinel.conf
# 第3个
redis-sentinel s3/sentinel.conf
```

启动后：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854605332-d05b52a8-dd2e-4f3c-bcfb-0adf338aa11a.png#averageHue=%23363534&clientId=u296c007f-9a6a-4&height=692&id=WU0wb&originHeight=878&originWidth=1689&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf36906fc-99e8-417e-bcff-ca2df353029&title=&width=1332)

## 3.4 测试
尝试让master节点7001宕机，查看sentinel日志：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854606075-0218ea15-7b1a-426a-a4be-b1762dedcce4.png#averageHue=%23252422&clientId=u296c007f-9a6a-4&id=PGe31&originHeight=832&originWidth=1670&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0240e433-1237-4bbe-a1b8-899413969f3&title=)

查看7003的日志：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854606383-9bb4ee6c-c632-479d-9095-099233149385.png#averageHue=%232d2a27&clientId=u296c007f-9a6a-4&id=nBjkn&originHeight=446&originWidth=914&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufdabda21-de2f-420c-aa3e-b8fa0081430&title=)

查看7002的日志：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854605947-f9293b5f-ccb8-4dc9-8d43-1a7a89cfbee8.png#averageHue=%232d2a27&clientId=u296c007f-9a6a-4&id=YdhhS&originHeight=371&originWidth=950&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc79909c1-bf99-4b4d-b678-5e1db6ad7a3&title=)

# 4 搭建分片集群
## 4.1 集群结构
分片集群需要的节点数量较多，这里我们搭建一个最小的分片集群，包含3个master节点，每个master包含一个slave节点，结构如下：

![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854606225-0589f82a-5693-471e-ad52-c4e7a9444627.png#averageHue=%23f7ebea&clientId=u296c007f-9a6a-4&id=lpqHO&originHeight=595&originWidth=518&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue3539dd8-abfa-4a6b-96f1-4985c0d808c&title=)

这里我们会在同一台虚拟机中开启6个redis实例，模拟分片集群，信息如下：

| IP | PORT | 角色 |
| --- | --- | --- |
| 192.168.150.101 | 7001 | master |
| 192.168.150.101 | 7002 | master |
| 192.168.150.101 | 7003 | master |
| 192.168.150.101 | 8001 | slave |
| 192.168.150.101 | 8002 | slave |
| 192.168.150.101 | 8003 | slave |

## 4.2 准备实例和配置
删除之前的7001、7002、7003这几个目录，重新创建出7001、7002、7003、8001、8002、8003目录：
```shell
# 进入/tmp目录
cd /tmp
# 删除旧的，避免配置干扰
rm -rf 7001 7002 7003
# 创建目录
mkdir 7001 7002 7003 8001 8002 8003
```

在/tmp下准备一个新的redis.conf文件，内容如下：
```properties
port 6379
# 开启集群功能
cluster-enabled yes
# 集群的配置文件名称，不需要我们创建，由redis自己维护
cluster-config-file /tmp/6379/nodes.conf
# 节点心跳失败的超时时间
cluster-node-timeout 5000
# 持久化文件存放目录
dir /tmp/6379
# 绑定地址
bind 0.0.0.0
# 让redis后台运行
daemonize yes
# 注册的实例ip
replica-announce-ip 192.168.150.101
# 保护模式
protected-mode no
# 数据库数量
databases 1
# 日志
logfile /tmp/6379/run.log
```

将这个文件拷贝到每个目录下：
```shell
# 进入/tmp目录
cd /tmp
# 执行拷贝
echo 7001 7002 7003 8001 8002 8003 | xargs -t -n 1 cp redis.conf
```

修改每个目录下的redis.conf，将其中的6379修改为与所在目录一致：
```shell
# 进入/tmp目录
cd /tmp
# 修改配置文件
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t sed -i 's/6379/{}/g' {}/redis.conf
```

## 4.3 启动
因为已经配置了后台启动模式，所以可以直接启动服务：
```shell
# 进入/tmp目录
cd /tmp
# 一键启动所有服务
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-server {}/redis.conf
```

通过ps查看状态：
```shell
ps -ef | grep redis
```

发现服务都已经正常启动：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854606239-159e539e-ce38-41fe-bce2-37b90c2ad898.png#averageHue=%23292625&clientId=u296c007f-9a6a-4&id=fK8WG&originHeight=205&originWidth=1223&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1c155a80-ae2a-46bc-8bc2-344fe5bb7d8&title=)

如果要关闭所有进程，可以执行命令：
```shell
ps -ef | grep redis | awk '{print $2}' | xargs kill
```

或者（推荐这种方式）：
```shell
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-cli -p {} shutdown
```

## 4.4 创建集群
虽然服务启动了，但是目前每个服务之间都是独立的，没有任何关联。
我们需要执行命令来创建集群，在Redis5.0之前创建集群比较麻烦，5.0之后集群管理命令都集成到了redis-cli中。

1）Redis5.0之前
Redis5.0之前集群命令都是用redis安装包下的src/redis-trib.rb来实现的。因为redis-trib.rb是有ruby语言编写的所以需要安装ruby环境。
```shell
# 安装依赖
yum -y install zlib ruby rubygems
gem install redis
```

然后通过命令来管理集群：
```shell
# 进入redis的src目录
cd /tmp/redis-6.2.4/src
# 创建集群
./redis-trib.rb create --replicas 1 192.168.150.101:7001 192.168.150.101:7002 192.168.150.101:7003 192.168.150.101:8001 192.168.150.101:8002 192.168.150.101:8003
```

2）Redis5.0以后
我们使用的是Redis6.2.4版本，集群管理以及集成到了redis-cli中，格式如下：
```shell
redis-cli --cluster create --cluster-replicas 1 192.168.150.101:7001 192.168.150.101:7002 192.168.150.101:7003 192.168.150.101:8001 192.168.150.101:8002 192.168.150.101:8003
```
命令说明：

- `redis-cli --cluster`或者`./redis-trib.rb`：代表集群操作命令
- `create`：代表是创建集群
- `--replicas 1`或者`--cluster-replicas 1` ：指定集群中每个master的副本个数为1，此时`节点总数 ÷ (replicas + 1)` 得到的就是master的数量。因此节点列表中的前n个就是master，其它节点都是slave节点，随机分配到不同master

运行后的样子：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854607068-c9788d2c-7a99-49af-902e-761e7054effc.png#averageHue=%23242222&clientId=u296c007f-9a6a-4&id=dcpaV&originHeight=710&originWidth=1559&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud1fecb3a-894b-4867-af88-e040d5dd796&title=)

这里输入yes，则集群开始创建：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854606967-6066f3ea-bfb8-44eb-b49a-829823bef689.png#averageHue=%23292725&clientId=u296c007f-9a6a-4&id=yumf6&originHeight=822&originWidth=968&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0196822f-970d-4221-a255-8f19a8e422c&title=)

通过命令可以查看集群状态：
```shell
redis-cli -p 7001 cluster nodes
```
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854607239-d4b226f1-6ca0-4499-a31d-13f70ba08585.png#averageHue=%232d2a28&clientId=u296c007f-9a6a-4&id=PjRxg&originHeight=165&originWidth=1589&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uffbe204d-7f10-4e10-b420-ba26ed56160&title=)

## 4.5 测试
尝试连接7001节点，存储一个数据：
```shell
# 连接
redis-cli -p 7001
# 存储数据
set num 123
# 读取数据
get num
# 再次存储
set a 1
```
结果悲剧了：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854607210-2a822426-5736-4d71-8af8-c4ca280108fe.png#averageHue=%237a7979&clientId=u296c007f-9a6a-4&id=ebMOr&originHeight=210&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u41225ee4-64a0-4d08-a98e-e067efc21d5&title=)
集群操作时，需要给`redis-cli`加上`-c`参数才可以：
```shell
redis-cli -c -p 7001
```
这次可以了：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854607275-5d6ab57b-06dd-41a5-92bb-0d680ed1aa5a.png#averageHue=%23565555&clientId=u296c007f-9a6a-4&id=UUo39&originHeight=295&originWidth=826&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8f73f497-e55e-49c5-974e-b2124339cf8&title=)
