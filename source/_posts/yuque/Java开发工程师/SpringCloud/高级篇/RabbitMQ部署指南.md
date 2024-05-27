# 1.单机部署
我们在Centos7虚拟机中使用Docker来安装。
## 1.1.下载镜像
```json
docker pull rabbitmq:3.8-management
```
## 1.2.安装MQ
执行下面的命令来运行MQ容器：
```shell
docker run \
 -e RABBITMQ_DEFAULT_USER=itcast \
 -e RABBITMQ_DEFAULT_PASS=123321 \
 -v mq-plugins:/plugins \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3.8-management
```
<br /> 启动后即可验证：[http://192.168.206.128:15672/#/](http://192.168.206.128:15672/#/)
# 2.安装DelayExchange插件
官方的安装指南地址为：[官方地址](https://blog.rabbitmq.com/posts/2015/04/scheduling-messages-with-rabbitmq)。上述文档是基于linux原生安装RabbitMQ，然后安装插件。<br />因为我们之前是基于Docker安装RabbitMQ，所以下面我们会讲解基于Docker来安装RabbitMQ插件。
## 2.1.下载插件
RabbitMQ官方的插件社区地址：[链接](https://www.rabbitmq.com/community-plugins.html)，其中包含各种各样的插件，包括我们使用的DelayExchange插件：<br />![image-20210713104511055.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842110515-cc71120a-20bc-4dbf-a107-30a699ab231a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcf9f7&clientId=u18d2dc85-a4cf-4&from=paste&id=ub4e5a005&originHeight=152&originWidth=714&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=18885&status=done&style=none&taskId=uca3282c6-b619-449d-9a55-a0521e653e5&title=)<br />读者朋友们可以去对应的GitHub页面下载3.8.9版本的插件，地址为：[插件地址](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/tag/3.8.9)，这个对应RabbitMQ的3.8.5以上版本。这里我也提供了下载好的插件：<br />![image-20210713104808909.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842233715-265b8c14-76e4-4ac1-84b0-655cb7189e7e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf8f6&clientId=u18d2dc85-a4cf-4&from=paste&id=uad8a2609&originHeight=128&originWidth=528&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=7539&status=done&style=none&taskId=u802f28ac-435d-418c-b26b-871d2dcb02c&title=)
## 2.2.上传插件
因为我们是基于Docker安装，所以需要先查看RabbitMQ的插件目录对应的数据卷。如果不是基于Docker的读者朋友们，请参考第一章部分，重新创建Docker容器。<br />我们之前设定的RabbitMQ的数据卷名称为`mq-plugins`，所以我们使用下面命令查看数据卷：
```shell
docker volume inspect mq-plugins
```
可以得到下面结果：<br />![image-20210713105135701.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842505756-3f7f4845-378c-4287-baf0-40ded3a5e2a8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_30%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23021e32&clientId=u18d2dc85-a4cf-4&from=paste&height=271&id=ud5213952&originHeight=407&originWidth=1059&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=35198&status=done&style=none&taskId=u7ca9df4e-de6e-4e19-89e8-d3b93da8bee&title=&width=706)<br />接下来，将插件上传到这个目录即可：<br />![image-20210713105339785.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842508790-a38eb6a6-de97-4b54-8cd1-55bc497cab0b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_16%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23c2a062&clientId=u18d2dc85-a4cf-4&from=paste&height=107&id=u398f6100&originHeight=161&originWidth=564&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=10508&status=done&style=none&taskId=u9f7c916e-e0fb-4d80-8b73-685f2af100a&title=&width=376)
## 2.3.安装插件
最后就是安装了，需要进入MQ容器内部来执行安装。我的容器名为`mq`，所以执行下面命令：
```shell
docker exec -it mq bash
```
执行时，请将其中的 `-it` 后面的`mq`替换为你自己的容器名。进入容器内部后，执行下面命令开启插件：
```shell
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```
结果如下：<br />![image-20210713105829435.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842535559-753a284b-62b7-4a87-b376-1c953d4e04bb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23042034&clientId=u18d2dc85-a4cf-4&from=paste&height=298&id=uc86ab47c&originHeight=447&originWidth=1144&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=52270&status=done&style=none&taskId=u17409a99-f658-4542-97ce-7b4ab6041c3&title=&width=762.6666666666666)
# 3.集群部署
## 3.1.集群分类
在RabbitMQ的官方文档中，讲述了两种集群的配置方式：

- 普通模式：普通模式集群不进行数据同步，每个MQ都有自己的队列、数据信息（其它元数据信息如交换机等会同步）。例如我们有2个MQ：mq1，和mq2，如果你的消息在mq1，而你连接到了mq2，那么mq2会去mq1拉取消息，然后返回给你。如果mq1宕机，消息就会丢失。
- 镜像模式：与普通模式不同，队列会在各个mq的镜像节点之间同步，因此你连接到任何一个镜像节点，均可获取到消息。而且如果一个节点宕机，并不会导致数据丢失。不过，这种方式增加了数据同步的带宽消耗。

我们先来看普通模式集群，我们的计划部署3节点的mq集群：

| 主机名 | 控制台端口 | amqp通信端口 |
| --- | --- | --- |
| mq1 | 8081 ---> 15672 | 8071 ---> 5672 |
| mq2 | 8082 ---> 15672 | 8072 ---> 5672 |
| mq3 | 8083 ---> 15672 | 8073  ---> 5672 |

集群中的节点标示默认都是：`rabbit@[hostname]`，因此以上三个节点的名称分别为：

- rabbit[@mq1 ](/mq1 ) 
- rabbit[@mq2 ](/mq2 ) 
- rabbit[@mq3 ](/mq3 ) 
## 3.2.获取cookie
RabbitMQ底层依赖于Erlang，而Erlang虚拟机就是一个面向分布式的语言，默认就支持集群模式。集群模式中的每个RabbitMQ 节点使用 cookie 来确定它们是否被允许相互通信。要使两个节点能够通信，它们必须具有相同的共享秘密，称为**Erlang cookie**。cookie 只是一串最多 255 个字符的字母数字字符。<br />每个集群节点必须具有**相同的 cookie**。实例之间也需要它来相互通信。我们先在之前启动的mq容器中获取一个cookie值，作为集群的cookie。执行下面的命令：
```shell
docker exec -it mq cat /var/lib/rabbitmq/.erlang.cookie
```
可以看到cookie值如下：
```shell
PQJERKAZREMMJWYYWWVD
```

---

也可到指定容器下去查找，路径：/var/lib/docker/volumes/最新数据/_data/.erlang.cookie

---

接下来，停止并删除当前的mq容器，我们重新搭建集群。
```shell
docker rm -f mq
```
## 3.3.准备集群配置
在/tmp目录新建一个配置文件 rabbitmq.conf：
```shell
cd /tmp
# 创建文件
touch rabbitmq.conf
```
文件内容如下：
```nginx
loopback_users.guest = false
listeners.tcp.default = 5672
cluster_formation.peer_discovery_backend = rabbit_peer_discovery_classic_config
cluster_formation.classic_config.nodes.1 = rabbit@mq1
cluster_formation.classic_config.nodes.2 = rabbit@mq2
cluster_formation.classic_config.nodes.3 = rabbit@mq3
```
再创建一个文件，记录cookie
```shell
cd /tmp
# 创建cookie文件
touch .erlang.cookie
# 写入cookie
echo "PQJERKAZREMMJWYYWWVD" > .erlang.cookie
# 修改cookie文件的权限
chmod 600 .erlang.cookie
```
准备三个目录,mq1、mq2、mq3：
```shell
cd /tmp
# 创建目录
mkdir mq1 mq2 mq3
```
然后拷贝rabbitmq.conf、cookie文件到mq1、mq2、mq3：
```shell
# 进入/tmp
cd /tmp
# 拷贝
cp rabbitmq.conf mq1
cp rabbitmq.conf mq2
cp rabbitmq.conf mq3
cp .erlang.cookie mq1
cp .erlang.cookie mq2
cp .erlang.cookie mq3
```
## 3.4.启动集群
创建一个网络，用作集群间通信：
```shell
docker network create mq-net
```
运行命令
```shell
docker run -d --net mq-net \
-v ${PWD}/mq1/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq1 \
--hostname mq1 \
-p 8071:5672 \
-p 8081:15672 \
rabbitmq:3.8-management
```

```shell
docker run -d --net mq-net \
-v ${PWD}/mq2/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq2 \
--hostname mq2 \
-p 8072:5672 \
-p 8082:15672 \
rabbitmq:3.8-management
```

```shell
docker run -d --net mq-net \
-v ${PWD}/mq3/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq3 \
--hostname mq3 \
-p 8073:5672 \
-p 8083:15672 \
rabbitmq:3.8-management
```
## 3.5.测试
在mq1这个节点上添加一个队列：<br />![image-20210717222833196.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842687119-12ab70a2-59d8-4b9c-a800-cebf3851794c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f8&clientId=u18d2dc85-a4cf-4&from=paste&height=421&id=u45614b36&originHeight=631&originWidth=1201&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66419&status=done&style=none&taskId=u286b6d5f-9700-4c6f-ae5c-2a2dddfe75d&title=&width=800.6666666666666)<br />如图，在mq2和mq3两个控制台也都能看到：<br />![image-20210717223057902.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842696281-e72c02d6-a7f0-4814-856f-2dcd9ddc56ba.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f6f6&clientId=u18d2dc85-a4cf-4&from=paste&height=225&id=ubcb02792&originHeight=337&originWidth=967&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=26501&status=done&style=none&taskId=uc064c5bb-56b4-4ccb-b958-8dbfa81bdde&title=&width=644.6666666666666)
### 3.5.1.数据共享测试
点击这个队列，进入管理页面：<br />![image-20210717223421750.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842736760-c9d16f0d-4f78-49ec-a6f4-50c127996cf2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f7f6&clientId=u18d2dc85-a4cf-4&from=paste&height=227&id=u8dd155bf&originHeight=341&originWidth=875&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=25097&status=done&style=none&taskId=u3b4bec85-62fd-4b01-96e1-7864d68116d&title=&width=583.3333333333334)<br />然后利用控制台发送一条消息到这个队列：<br />![image-20210717223320238.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842750011-768546d6-fe19-4b20-95c4-858b5d75b227.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_27%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf9f9&clientId=u18d2dc85-a4cf-4&from=paste&height=361&id=u0a15baaa&originHeight=542&originWidth=956&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=34612&status=done&style=none&taskId=u7b3f7e31-80d8-419e-ad74-c02279aa81a&title=&width=637.3333333333334)<br />结果在mq2、mq3上都能看到这条消息：<br />![image-20210717223603628.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842759140-e61ac28f-6b92-428c-a6e2-b231d62320b4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f6f5&clientId=u18d2dc85-a4cf-4&from=paste&height=286&id=uf62e6d02&originHeight=429&originWidth=1259&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47358&status=done&style=none&taskId=u1f14b08e-b4e2-4154-8648-d53df0afc41&title=&width=839.3333333333334)
### 3.5.2.可用性测试
我们让其中一台节点mq1宕机：
```shell
docker stop mq1
```
然后登录mq2或mq3的控制台，发现simple.queue也不可用了：<br />![image-20210717223800203.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678842790064-001f17d3-b98a-4f4f-add2-7ea53c0518d9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f6f5&clientId=u18d2dc85-a4cf-4&from=paste&height=297&id=u711740a9&originHeight=445&originWidth=1269&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=48234&status=done&style=none&taskId=ua152ddfc-02ec-45ea-b773-bb9b4d6c9d4&title=&width=846)<br />说明数据并没有拷贝到mq2、mq3。显然在生产环境下是不可以的，那么如何更好的做集群设计和优化呢？
# 4.镜像模式
在刚刚的案例中，一旦创建队列的主机宕机，队列就会不可用。不具备高可用能力。如果要解决这个问题，必须使用官方提供的镜像集群方案。官方文档地址：[https://www.rabbitmq.com/ha.html](https://www.rabbitmq.com/ha.html)
## 4.1.镜像模式的特征
默认情况下，队列只保存在创建该队列的节点上。而镜像模式下，创建队列的节点被称为该队列的**主节点**，队列还会拷贝到集群中的其它节点，也叫做该队列的**镜像**节点。但是，不同队列可以在集群中的任意节点上创建，因此不同队列的主节点可以不同。甚至，**一个队列的主节点可能是另一个队列的镜像节点**。用户发送给队列的一切请求，例如发送消息、消息回执默认都会在主节点完成，如果是从节点接收到请求，也会路由到主节点去完成。**镜像节点仅仅起到备份数据作用**。当主节点接收到消费者的ACK时，所有镜像都会删除节点中的数据。<br />总结如下：

- 镜像队列结构是一主多从（从就是镜像）
- 所有操作都是主节点完成，然后同步给镜像节点
- 主宕机后，镜像节点会替代成新的主（如果在主从同步完成前，主就已经宕机，可能出现数据丢失）
- 不具备负载均衡功能，因为所有操作都会有主节点完成（但是不同队列，其主节点可以不同，可以利用这个提高吞吐量）
## 4.2.镜像模式的配置
镜像模式的配置有3种模式：

| ha-mode | ha-params | 效果 |
| --- | --- | --- |
| 准确模式exactly | 队列的副本量count | 集群中队列副本（主服务器和镜像服务器之和）的数量。count如果为1意味着单个副本：即队列主节点。count值为2表示2个副本：1个队列主和1个队列镜像。换句话说：**count = 镜像数量 + 1**。如果群集中的节点数少于count，则该队列将镜像到所有节点。如果有集群总数大于count+1，并且包含镜像的节点出现故障，则将在另一个节点上创建一个新的镜像。 |
| all | (none) | 队列在群集中的所有节点之间进行镜像。队列将镜像到任何新加入的节点。镜像到所有节点将对所有群集节点施加额外的压力，包括网络I / O，磁盘I / O和磁盘空间使用情况。推荐使用exactly，设置副本数为（N / 2 +1）。 |
| nodes | _node names_ | 指定队列创建到哪些节点，如果指定的节点全部不存在，则会出现异常。如果指定的节点在集群中存在，但是暂时不可用，会创建节点到当前客户端连接到的节点。 |

这里我们以rabbitmqctl命令作为案例来讲解配置语法。
### 4.2.1.exactly模式
```
rabbitmqctl set_policy ha-two "^two\." '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'
```

- `rabbitmqctl set_policy`：固定写法
- `ha-two`：策略名称，自定义
- `"^two\."`：匹配队列的正则表达式，符合命名规则的队列才生效，这里是任何以`two.`开头的队列名称
- `'{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'`: 策略内容 
   - `"ha-mode":"exactly"`：策略模式，此处是exactly模式，指定副本数量
   - `"ha-params":2`：策略参数，这里是2，就是副本数量为2，1主1镜像
   - `"ha-sync-mode":"automatic"`：同步策略，默认是manual，即新加入的镜像节点不会同步旧的消息。如果设置为automatic，则新加入的镜像节点会把主节点中所有消息都同步，会带来额外的网络开销
### 4.2.2.all模式
```
rabbitmqctl set_policy ha-all "^all\." '{"ha-mode":"all"}'
```

- `ha-all`：策略名称，自定义
- `"^all\."`：匹配所有以`all.`开头的队列名
- `'{"ha-mode":"all"}'`：策略内容 
   - `"ha-mode":"all"`：策略模式，此处是all模式，即所有节点都会称为镜像节点
### 4.2.3.nodes模式
```
rabbitmqctl set_policy ha-nodes "^nodes\." '{"ha-mode":"nodes","ha-params":["rabbit@nodeA", "rabbit@nodeB"]}'
```

- `rabbitmqctl set_policy`：固定写法
- `ha-nodes`：策略名称，自定义
- `"^nodes\."`：匹配队列的正则表达式，符合命名规则的队列才生效，这里是任何以`nodes.`开头的队列名称
- `'{"ha-mode":"nodes","ha-params":["rabbit@nodeA", "rabbit@nodeB"]}'`: 策略内容 
   - `"ha-mode":"nodes"`：策略模式，此处是nodes模式
   - `"ha-params":["rabbit@mq1", "rabbit@mq2"]`：策略参数，这里指定副本所在节点名称
## 4.3.测试
我们使用exactly模式的镜像，因为集群节点数量为3，因此镜像数量就设置为2。运行下面的命令（任一节点均可，这里以mq1为例），进入控制台：
```shell
docker exec -it mq1 rabbitmqctl set_policy ha-two "^two\." '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'
```
下面，我们创建一个新的队列：<br />![image-20210717231751411.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843021876-35114424-8ff4-4827-97a1-cc252248356d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_34%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f8&clientId=u18d2dc85-a4cf-4&from=paste&height=295&id=u31c4247d&originHeight=443&originWidth=1203&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=63165&status=done&style=none&taskId=ub2d53d80-10ce-4add-829c-52df3504a45&title=&width=802)<br />在任意一个mq控制台查看队列：<br />![](assets/image-20210717231829505.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=DEkMF&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
### 4.3.1.测试数据共享
注意：下面的发消息，需要点击图示：+1 ，查看对应的从节点是哪个再去操作，这里我的是mq2<br />![mq2.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843055611-4c7fe5a6-3250-40b9-8d97-f781b841d365.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_29%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f5f4&clientId=u18d2dc85-a4cf-4&from=paste&height=159&id=u7b51b892&originHeight=239&originWidth=1032&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=22409&status=done&style=none&taskId=u6895e397-3e3f-4ce0-b45a-824abefb549&title=&width=688)<br />给two.queue发送一条消息：<br />![image-20210717231958996.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843065505-e3b656b7-681b-4181-ada6-d06f8b399654.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_29%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f7f7&clientId=u18d2dc85-a4cf-4&from=paste&height=382&id=u8888ed48&originHeight=573&originWidth=1028&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=42680&status=done&style=none&taskId=ucb9fd798-191f-443f-b995-f0d9749ba19&title=&width=685.3333333333334)<br />然后在mq1、mq2、mq3的任意控制台查看消息：<br />![image-20210717232108584.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843076466-48d98e8d-0571-445b-ab08-d61851c0edbe.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f7f6&clientId=u18d2dc85-a4cf-4&from=paste&height=428&id=u8e883c87&originHeight=642&originWidth=869&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=49751&status=done&style=none&taskId=ubd8ee70f-1959-4250-be1d-c5bd1802feb&title=&width=579.3333333333334)
### 4.3.2.测试高可用
现在，我们让two.queue的主节点mq1宕机：
```shell
docker stop mq1
```
查看集群状态：<br />![image-20210717232257420.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843098553-27ff3c86-bfaa-4fd7-b97a-1359b5b27d41.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_39%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eedcdb&clientId=u18d2dc85-a4cf-4&from=paste&height=163&id=u68630f06&originHeight=244&originWidth=1356&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40377&status=done&style=none&taskId=u1ad9daf9-40e2-4427-af1f-b93791f6c67&title=&width=904)<br />查看队列状态：<br />![image-20210717232322646.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843106000-72458bbd-ab33-4325-83b4-0c18c1d33d95.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6f4f3&clientId=u18d2dc85-a4cf-4&from=paste&height=265&id=u6a579261&originHeight=398&originWidth=1316&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=52180&status=done&style=none&taskId=u19091ab9-1a19-457c-9cbe-c52f2152cc8&title=&width=877.3333333333334)<br />发现依然是健康的！并且其主节点切换到了rabbit@mq2上
# 5.仲裁队列
从RabbitMQ 3.8版本开始，引入了新的仲裁队列，他具备与镜像队里类似的功能，但使用更加方便。
## 5.1.添加仲裁队列
在任意控制台添加一个队列，一定要选择队列类型为Quorum类型。<br />![image-20210717234329640.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843133575-74531394-d52d-46f4-871a-c6811f05905a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f8&clientId=u18d2dc85-a4cf-4&from=paste&height=268&id=uf29454f7&originHeight=402&originWidth=1267&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=50092&status=done&style=none&taskId=u42743292-1921-46e6-b0f1-dfe6c42bd7b&title=&width=844.6666666666666)<br />在任意控制台查看队列：<br />![image-20210717234426209.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843141781-108ffa23-85cf-4eca-9b5f-798b242852a9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4f3f3&clientId=u18d2dc85-a4cf-4&from=paste&height=209&id=u71e7ad2c&originHeight=314&originWidth=1247&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40454&status=done&style=none&taskId=u3df249ae-4544-4ad0-b797-a0815ba4102&title=&width=831.3333333333334)<br />可以看到，仲裁队列的 + 2字样。代表这个队列有2个镜像节点。因为仲裁队列默认的镜像数为5。如果你的集群有7个节点，那么镜像数肯定是5；而我们集群只有3个节点，因此镜像数量就是3.
## 5.2.测试
可以参考对镜像集群的测试，效果是一样的。
## 5.3.集群扩容
### 5.3.1.加入集群
1）启动一个新的MQ容器：
```shell
docker run -d --net mq-net \
-v ${PWD}/.erlang.cookie:/var/lib/rabbitmq/.erlang.cookie \
-e RABBITMQ_DEFAULT_USER=itcast \
-e RABBITMQ_DEFAULT_PASS=123321 \
--name mq4 \
--hostname mq5 \
-p 8074:15672 \
-p 8084:15672 \
rabbitmq:3.8-management
```
2）进入容器控制台：
```shell
docker exec -it mq4 bash
```
3）停止mq进程
```shell
rabbitmqctl stop_app
```
4）重置RabbitMQ中的数据：
```shell
rabbitmqctl reset
```
5）加入mq1：
```shell
rabbitmqctl join_cluster rabbit@mq1
```
6）再次启动mq进程
```shell
rabbitmqctl start_app
```
![image-20210718001909492.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843188415-75673df7-e64d-44a3-a5d5-190c2ce58927.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e4e3e2&clientId=u18d2dc85-a4cf-4&from=paste&height=203&id=u44924bcc&originHeight=305&originWidth=1579&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=74345&status=done&style=none&taskId=u4ddc2d1e-fc45-4a7c-b341-a1d29ee7009&title=&width=1052.6666666666667)
### 5.3.2.增加仲裁队列副本
我们先查看下quorum.queue这个队列目前的副本情况，进入mq1容器：
```shell
docker exec -it mq1 bash
```
执行命令：
```shell
rabbitmq-queues quorum_status "quorum.queue"
```
结果：<br />![image-20210718002118357.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843201490-2f70c886-810b-49f2-b5f3-bbdf0f48bd26.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23042034&clientId=u18d2dc85-a4cf-4&from=paste&height=165&id=u6808b572&originHeight=247&originWidth=1158&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=19565&status=done&style=none&taskId=u66491d0c-e8a5-459b-b7b6-4d009c8ffbc&title=&width=772)<br />现在，我们让mq4也加入进来：
```shell
rabbitmq-queues add_member "quorum.queue" "rabbit@mq4"
```
结果：<br />![image-20210718002253226.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843218873-2622ef35-9845-434c-9286-34ffb88dd318.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23072438&clientId=u18d2dc85-a4cf-4&from=paste&height=57&id=ucfe7ca98&originHeight=85&originWidth=833&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=9659&status=done&style=none&taskId=ua4f49a1a-b2a8-46c6-8b5a-f200b048b9f&title=&width=555.3333333333334)<br />再次查看：
```shell
rabbitmq-queues quorum_status "quorum.queue"
```
![image-20210718002342603.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843224058-b6b4ab94-44e7-4b48-a7ba-abd7d38fb8ff.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23042034&clientId=u18d2dc85-a4cf-4&from=paste&height=198&id=ua813d22a&originHeight=297&originWidth=1159&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23316&status=done&style=none&taskId=u3a197e39-2b8f-4968-9892-0b8900f8ac1&title=&width=772.6666666666666)<br />查看控制台，发现quorum.queue的镜像数量也从原来的 +2 变成了 +3：<br />![image-20210718002422365.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678843234549-e1ef6695-8072-459d-a698-fc24f24bf7a1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_29%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3f3f2&clientId=u18d2dc85-a4cf-4&from=paste&height=214&id=u6eb1e1a3&originHeight=321&originWidth=1034&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38402&status=done&style=none&taskId=u2eff5071-952d-4f85-824d-e47d16e8780&title=&width=689.3333333333334)
