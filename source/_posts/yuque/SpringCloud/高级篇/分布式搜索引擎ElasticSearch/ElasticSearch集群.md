---
title: ElasticSearch集群
urlname: ypvfpte531pktdzv
date: '2024-03-28 16:36:22'
updated: '2024-03-28 16:36:33'
description: '集群单机的elasticsearch做数据存储，必然面临两个问题：海量数据存储问题、单点故障问题。海量数据存储问题：将索引库从逻辑上拆分为N个分片（shard），存储到多个节点单点故障问题：将分片数据在不同节点备份（replica ）ES集群相关概念: 集群（cluster）：一组拥有共同的 ...'
---
# 集群
单机的elasticsearch做数据存储，必然面临两个问题：海量数据存储问题、单点故障问题。

- 海量数据存储问题：将索引库从逻辑上拆分为N个分片（shard），存储到多个节点
- 单点故障问题：将分片数据在不同节点备份（replica ）

**ES集群相关概念**:

-  集群（cluster）：一组拥有共同的 cluster name 的 节点。 
-  节点（node)   ：集群中的一个 Elasticearch 实例 
-  分片（shard）：索引可以被拆分为不同的部分进行存储，称为分片。在集群环境下，一个索引的不同分片可以拆分到不同的节点中

解决问题：数据量太大，单点存储量有限的问题。
![](assets/image-20200104124440086-5602723.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=jnVoi&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
> 此处，我们把数据分成3片：shard0、shard1、shard2

-  主分片（Primary shard）：相对于副本分片的定义。 
-  副本分片（Replica shard）每个主分片可以有一个或者多个副本，数据和主分片一样。

数据备份可以保证高可用，但是每个分片备份一份，所需要的节点数量就会翻一倍，成本实在是太高了！
为了在高可用和成本间寻求平衡，我们可以这样做：

- 首先对数据分片，存储到不同节点
- 然后对每个分片进行备份，放到对方节点，完成互相备份

这样可以大大减少所需要的服务节点数量，如图，我们以3分片，每个分片备份一份为例：
![image-20200104124551912.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/9194030de972ce7e3f2cce821a5b818d.png)
现在，每个分片都有1个备份，存储在3个节点：

- node0：保存了分片0和1
- node1：保存了分片0和2
- node2：保存了分片1和2
## 1.搭建ES集群
我们会在单机上利用docker容器运行多个es实例来模拟es集群。不过生产环境推荐大家每一台服务节点仅部署一个es的实例。部署es集群可以直接使用docker-compose来完成，但这要求你的Linux虚拟机至少有**4G**的内存空间。
### 1.创建es集群
首先编写一个docker-compose文件（我们已经帮大家准备好了，直接上传即可），内容如下：
```shell
version: '2.2'
services:
  es01:
    image: elasticsearch:7.12.1
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es02,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9201:9200
    networks:
      - elastic
  es02:
    image: elasticsearch:7.12.1
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - data02:/usr/share/elasticsearch/data
    ports:
      - 9202:9200
    networks:
      - elastic
  es03:
    image: elasticsearch:7.12.1
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es02
      - cluster.initial_master_nodes=es01,es02,es03
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - data03:/usr/share/elasticsearch/data
    networks:
      - elastic
    ports:
      - 9203:9200
volumes:
  data01:
    driver: local
  data02:
    driver: local
  data03:
    driver: local

networks:
  elastic:
    driver: bridge
```
创建一个存放路径。我们再tmp目录下创建一个文件件：es-cluster，将文件上传进去
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/0f05f552fdf0a8a23413e1687080914c.png)
es运行需要修改一些linux系统权限，修改`/etc/sysctl.conf`文件
```shell
vi /etc/sysctl.conf
```
添加下面的内容：
```shell
vm.max_map_count=262144
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/f11d025f4c6899824951bfbd1d6c2234.png)
然后执行命令，让配置生效：
```shell
sysctl -p
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/342248f0863b1158c2c24676c714adb4.png)
如果上面创建了文件夹，则在/tmp/es-cluster路径下执行下述命令，通过docker-compose启动集群：
```shell
docker-compose up -d
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/94c727fdce36b1a502578112ffa104bc.png)

可以通过：docker logs -f es02查看启动日志，会发现左侧CPU基本打满
通过docker ps查看应用是否启动完成（状态都是up）
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/d25b76d0ee426d69158d1f4d5e5e4927.png)
### 2.集群状态监控
kibana可以监控es集群，不过新版本需要依赖es的x-pack 功能，配置比较复杂。这里推荐使用cerebro来监控es集群状态，官方网址：[https://github.com/lmenezes/cerebro](https://github.com/lmenezes/cerebro)，或使用提供的安装包
[cerebro-0.9.4.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711614990464-488edc66-b9a2-4b9b-ae46-4a184fcf9d9a.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fzip%2F29688613%2F1711614990464-488edc66-b9a2-4b9b-ae46-4a184fcf9d9a.zip%22%2C%22name%22%3A%22cerebro-0.9.4.zip%22%2C%22size%22%3A57251010%2C%22ext%22%3A%22zip%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22ub4a513d2-e825-4b4d-97ae-0fd732c0b90%22%2C%22taskType%22%3A%22transfer%22%2C%22type%22%3A%22application%2Fx-zip-compressed%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u27a263fe%22%2C%22card%22%3A%22file%22%7D)，双击bin目录下的`cerebro.bat`文件即可启动服务。
![image-20210602220941101.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/139f1de48e674f0321aadbc2d9382d68.png)
访问[http://localhost:9000](http://localhost:9000) 即可进入管理界面：
注意：输入地址需要完整：[http://192.168.206.130:9201](http://192.168.206.130:9201)
![image-20210602221030854.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/7af5d58f2061c95c5b07003bd007c09f.png)
 输入你的elasticsearch的任意节点的地址和端口，点击connect即可：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/32fd2acb7ab89e1f6731f5ce96ddd293.png)
 绿色的条，代表集群处于绿色（健康状态）。
### 3.创建索引库
#### 方式一：利用kibana的DevTools创建索引库
在DevTools中输入指令：
```
PUT /itcast
{
  "settings": {
    "number_of_shards": 3, // 分片数量
    "number_of_replicas": 1 // 副本数量
  },
  "mappings": {
    "properties": {
      // mapping映射定义 ...
    }
  }
}
```
#### 方式二：利用cerebro创建索引库
利用cerebro还可以创建索引库：
![image-20210602221409524.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/3c9b71778b2837e5b5183c391b0b6bf6.png)
 填写索引库信息：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/227e100e3661824f8fc2279453cd5f41.png)
 点击右下角的create按钮：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/dac36f1acd391b638bb19f87294119cd.png)
### 4.查看分片效果
回到首页，即可查看索引库分片效果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/a689e8aac14e0fbec2f40cf153bd39ce.png)
## 2.集群脑裂问题
### 2.1.集群职责划分
elasticsearch中集群节点有不同的职责划分：
![image-20210723223008967.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/35a1ab478f112309b3389907116c31a3.png)
默认情况下，集群中的任何一个节点都同时具备上述四种角色。但是真实的集群一定要将集群职责分离：

- master节点：对CPU要求高，但是内存要求低
- data节点：对CPU和内存要求都高
- coordinating节点：对网络带宽、CPU要求高

职责分离可以让我们根据不同节点的需求分配不同的硬件去部署。而且避免业务之间的互相干扰。
一个典型的es集群职责划分如图：
![image-20210723223629142.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/85dfa839f774838200b5aa035ba6099a.png)
### 2.2.脑裂问题
脑裂是因为集群中的节点失联导致的。例如一个集群中，主节点与其它节点失联：
![image-20210723223804995.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/c95fc518a9b7d6202e7f9c23abaf7953.png)
此时，node2和node3认为node1宕机，就会重新选主：
![image-20210723223845754.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/9aab88f87de95161635fbf3ccdd94a6d.png)
当node3当选后，集群继续对外提供服务，node2和node3自成集群，node1自成集群，两个集群数据不同步，出现数据差异。
当网络恢复后，因为集群中有两个master节点，集群状态的不一致，出现脑裂的情况：
![image-20210723224000555.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/7aa455ffb65e7fcbc7e4b2e3c32a496f.png)
![](assets/image-20210723224000555.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=ixB1e&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
例如：3个节点形成的集群，选票必须超过 （3 + 1） / 2 ，也就是2票。node3得到node2和node3的选票，当选为主。node1只有自己1票，没有当选。集群中依然只有1个主节点，没有出现脑裂。
### 2.3.小结
master eligible节点的作用是什么？

- 参与集群选主
- 主节点可以管理集群状态、管理分片信息、处理创建和删除索引库的请求

data节点的作用是什么？

- 数据的CRUD

coordinator节点的作用是什么？

-  路由请求到其它节点 
-  合并查询到的结果，返回给用户 
## 3.集群分布式存储
当新增文档时，应该保存到不同分片，保证数据均衡，那么coordinating node如何确定数据该存储到哪个分片呢？
### 3.1.分片存储测试
插入三条数据：
![image-20210723225006058.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/f12f5a2a87ae43fe2e267a30ebb8a8f6.png)![image-20210723225034637.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/9acc9f6a102f7eeec2787352344a783a.png)![image-20210723225112029.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/bad4f62ba5177620058630e569b4a3e5.png)
测试可以看到，三条数据分别在不同分片：
![image-20210723225227928.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/0fda3926ffdb62be35b8f6587eb7cf95.png)
结果：
![image-20210723225342120.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/e7b079528eaf0676314157fefb961f4a.png)
### 3.2.分片存储原理
elasticsearch会通过hash算法来计算文档应该存储到哪个分片：
![image-20210723224354904.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/5b61bf5de73f147ae4e191b8de969d65.png)
说明：

- _routing默认是文档的id
- 算法与分片数量有关，因此索引库一旦创建，分片数量不能修改！

新增文档的流程如下：
![image-20210723225436084.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/a3062adb75e13fccb4e3207393424dc3.png)
解读：

- 1）新增一个id=1的文档
- 2）对id做hash运算，假如得到的是2，则应该存储到shard-2
- 3）shard-2的主分片在node3节点，将数据路由到node3
- 4）保存文档
- 5）同步给shard-2的副本replica-2，在node2节点
- 6）返回结果给coordinating-node节点
## 4.集群分布式查询
elasticsearch的查询分成两个阶段：

-  scatter phase：分散阶段，coordinating node会把请求分发到每一个分片 
-  gather phase：聚集阶段，coordinating node汇总data node的搜索结果，并处理为最终结果集返回给用户 

![image-20210723225809848.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/1c581d216e017b9f92b417a2c1c43cce.png)
## 5.集群故障转移
集群的master节点会监控集群中的节点状态，如果发现有节点宕机，会立即将宕机节点的分片数据迁移到其它节点，确保数据安全，这个叫做故障转移。
1）例如一个集群结构如图：
![image-20210723225945963.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/f37cc54b8907c475ab61a3f927ccb179.png)
现在，node1是主节点，其它两个节点是从节点。
2）突然，node1发生了故障：
![](assets/image-20210723230020574.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=Xrwt7&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
宕机后的第一件事，需要重新选主，例如选中了node2：
![image-20210723230055974.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/5bb39d6dfee893a0638b88688b7a7b15.png)
node2成为主节点后，会检测集群监控状态，发现：shard-1、shard-0没有副本节点。因此需要将node1上的数据迁移到node2、node3：
![image-20210723230216642.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/13ffbced076a7447616ae865c46b087a.png)
![](assets/image-20210723230216642.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=uFB3r&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/dddaa19d99fa15aa8e46e569499b74b5.png)
去cerebro查看也都正常
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/0cc32384d60d91a220a243840663df6c.png)
此时，我们挂机主节点，目前是es03，所以我们应该（停掉当前的主节点才可以）：docker rm -f es03
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/3013937ec19348c8e49d05e64b0f02bf.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/3954931a40b550ee694c8a78e4d986bc.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/853ece805c5b06767f386606886f1361.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ElasticSearch集群/1477f4bfa627750e998e81c48bd813d8.png)
