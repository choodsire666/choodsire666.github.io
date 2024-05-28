---
title: ElasticSearch集群
urlname: ypvfpte531pktdzv
date: '2024-03-28 16:36:22'
updated: '2024-03-28 16:36:33'
description: '集群单机的elasticsearch做数据存储，必然面临两个问题：海量数据存储问题、单点故障问题。海量数据存储问题：将索引库从逻辑上拆分为N个分片（shard），存储到多个节点单点故障问题：将分片数据在不同节点备份（replica ）ES集群相关概念: 集群（cluster）：一组拥有共同的 ...'
cover: ''
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
![image-20200104124551912.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678882971231-2e5c116c-12dd-4f3a-8bdb-d282102a78e4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23ba8143&clientId=u9179c916-36ec-4&from=paste&id=ufcaffd27&originHeight=764&originWidth=834&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=71846&status=done&style=none&taskId=u9260e9a3-cf3b-457b-ada3-29c99941543&title=)
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
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680522395956-39883abd-4670-46d6-ba75-52698b5112d1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e8c077&clientId=ue257a456-d2da-4&from=paste&height=593&id=u73ab4131&originHeight=890&originWidth=1555&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=502297&status=done&style=none&taskId=u22c1c776-a734-494b-991f-c275d5d1cf7&title=&width=1036.6666666666667)
es运行需要修改一些linux系统权限，修改`/etc/sysctl.conf`文件
```shell
vi /etc/sysctl.conf
```
添加下面的内容：
```shell
vm.max_map_count=262144
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680522251061-7284427b-c92f-4c36-aa4e-16ec449955b9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232e4f64&clientId=ue257a456-d2da-4&from=paste&height=282&id=u0f917ae9&originHeight=423&originWidth=878&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=352591&status=done&style=none&taskId=u5266a333-a4ab-4436-bda8-a4580ab3fbb&title=&width=585.3333333333334)
然后执行命令，让配置生效：
```shell
sysctl -p
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680522273967-f20b5b98-1477-4d09-af65-eddc7799a903.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232d4f64&clientId=ue257a456-d2da-4&from=paste&height=51&id=u14b4b151&originHeight=76&originWidth=676&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=56750&status=done&style=none&taskId=uabedd238-e684-4329-a436-ea28d949300&title=&width=450.6666666666667)
如果上面创建了文件夹，则在/tmp/es-cluster路径下执行下述命令，通过docker-compose启动集群：
```shell
docker-compose up -d
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680522568366-c70479e8-2bcb-47d5-9af3-1d2173be81c9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_31%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233a5c6f&clientId=ue257a456-d2da-4&from=paste&height=212&id=ua0371ddd&originHeight=318&originWidth=1076&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=229522&status=done&style=none&taskId=u56f98f6e-5fdf-42b4-aae2-4aacb50df0d&title=&width=717.3333333333334)

可以通过：docker logs -f es02查看启动日志，会发现左侧CPU基本打满
通过docker ps查看应用是否启动完成（状态都是up）
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680522651517-f709fc16-624d-4223-a59b-5e8fb6600b46.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232b4c60&clientId=ue257a456-d2da-4&from=paste&height=218&id=ud51e2a3b&originHeight=327&originWidth=1621&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=418173&status=done&style=none&taskId=uf30f8c9d-9409-4220-9881-71e2725b708&title=&width=1080.6666666666667)
### 2.集群状态监控
kibana可以监控es集群，不过新版本需要依赖es的x-pack 功能，配置比较复杂。这里推荐使用cerebro来监控es集群状态，官方网址：[https://github.com/lmenezes/cerebro](https://github.com/lmenezes/cerebro)，或使用提供的安装包
[cerebro-0.9.4.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711614990464-488edc66-b9a2-4b9b-ae46-4a184fcf9d9a.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fzip%2F29688613%2F1711614990464-488edc66-b9a2-4b9b-ae46-4a184fcf9d9a.zip%22%2C%22name%22%3A%22cerebro-0.9.4.zip%22%2C%22size%22%3A57251010%2C%22ext%22%3A%22zip%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22ub4a513d2-e825-4b4d-97ae-0fd732c0b90%22%2C%22taskType%22%3A%22transfer%22%2C%22type%22%3A%22application%2Fx-zip-compressed%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u27a263fe%22%2C%22card%22%3A%22file%22%7D)，双击bin目录下的`cerebro.bat`文件即可启动服务。
![image-20210602220941101.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883538692-9b9ec5fe-5374-4f67-a075-f85262915819.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_31%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233d3d3c&clientId=u9179c916-36ec-4&from=paste&height=261&id=ud3df6b5b&originHeight=391&originWidth=1085&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=342953&status=done&style=none&taskId=u755d4435-ccc1-44d7-be50-d9f4b21ba31&title=&width=723.3333333333334)
访问[http://localhost:9000](http://localhost:9000) 即可进入管理界面：
注意：输入地址需要完整：[http://192.168.206.130:9201](http://192.168.206.130:9201)
![image-20210602221030854.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883550968-6da77301-d219-4ee1-9234-dd4e67590201.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23434649&clientId=u9179c916-36ec-4&from=paste&height=434&id=u2610973d&originHeight=651&originWidth=773&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=54878&status=done&style=none&taskId=u564ca2a3-80d9-4aa9-a3c1-4166c3704a0&title=&width=515.3333333333334)
 输入你的elasticsearch的任意节点的地址和端口，点击connect即可：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680522856409-d10c5adf-d51d-4495-abae-9394ce3a5c36.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_55%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23383e3f&clientId=ue257a456-d2da-4&from=paste&height=587&id=ue90d5c62&originHeight=880&originWidth=1920&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=96812&status=done&style=none&taskId=u28e7a18d-cb84-49fc-befd-05b81e82cd6&title=&width=1280)
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
![image-20210602221409524.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883656132-d195f055-8748-4693-b1f9-642128c6a992.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_17%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233c4446&clientId=u9179c916-36ec-4&from=paste&id=u0dbc9ae1&originHeight=189&originWidth=594&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=17631&status=done&style=none&taskId=uf4679ebd-9163-4831-ad18-da577837f0d&title=)
 填写索引库信息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680523020502-3961d269-751e-4911-968c-f5b3cf2a2635.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_55%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233c4042&clientId=ue257a456-d2da-4&from=paste&height=587&id=u72c28d9d&originHeight=880&originWidth=1920&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=74259&status=done&style=none&taskId=ud12e18ce-af97-4852-a1d1-f882e1cde34&title=&width=1280)
 点击右下角的create按钮：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680523040236-421700e8-0ac6-40b6-a37c-f3c7caa546a8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233b4143&clientId=ue257a456-d2da-4&from=paste&height=189&id=u60a5ad9b&originHeight=284&originWidth=880&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=17934&status=done&style=none&taskId=uc6d0b605-f3b2-4c1e-b8a3-1e8bf1fb4ef&title=&width=586.6666666666666)
### 4.查看分片效果
回到首页，即可查看索引库分片效果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680523100498-d5f2a8cc-6838-4908-903e-b4779afbc324.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23383d3f&clientId=ue257a456-d2da-4&from=paste&height=461&id=ucae10975&originHeight=691&originWidth=1912&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=77715&status=done&style=none&taskId=u2877cf00-91c2-44af-ac18-811f0979786&title=&width=1274.6666666666667)
## 2.集群脑裂问题
### 2.1.集群职责划分
elasticsearch中集群节点有不同的职责划分：
![image-20210723223008967.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883074084-a9ce1676-d009-430d-913d-651116953cc0.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23cbb6b6&clientId=u9179c916-36ec-4&from=paste&height=370&id=ua7c99988&originHeight=555&originWidth=1516&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=85235&status=done&style=none&taskId=u8af41a87-cfcf-4d49-be87-42007adb265&title=&width=1010.6666666666666)
默认情况下，集群中的任何一个节点都同时具备上述四种角色。但是真实的集群一定要将集群职责分离：

- master节点：对CPU要求高，但是内存要求低
- data节点：对CPU和内存要求都高
- coordinating节点：对网络带宽、CPU要求高

职责分离可以让我们根据不同节点的需求分配不同的硬件去部署。而且避免业务之间的互相干扰。
一个典型的es集群职责划分如图：
![image-20210723223629142.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883090866-6ce1843a-96e2-488d-bdbb-f4e048ad27a2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f8ef&clientId=u9179c916-36ec-4&from=paste&height=439&id=u15c23d08&originHeight=659&originWidth=1547&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=82760&status=done&style=none&taskId=uc9528343-5dd7-4d13-a9e0-bd62c0fd45d&title=&width=1031.3333333333333)
### 2.2.脑裂问题
脑裂是因为集群中的节点失联导致的。例如一个集群中，主节点与其它节点失联：
![image-20210723223804995.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883108759-a4c0f3e0-c112-49f0-9726-8feeea31c6ed.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_39%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfbfb&clientId=u9179c916-36ec-4&from=paste&height=319&id=ucaa6ddad&originHeight=478&originWidth=1374&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=20823&status=done&style=none&taskId=u4fa2e38d-a366-49a0-a277-fa513793720&title=&width=916)
此时，node2和node3认为node1宕机，就会重新选主：
![image-20210723223845754.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883116957-2be3f17e-5706-4ca0-b766-6b4d5f37f6a1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_39%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfbfb&clientId=u9179c916-36ec-4&from=paste&height=324&id=u4e5672cf&originHeight=486&originWidth=1367&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21536&status=done&style=none&taskId=u1dbe2ab4-d09f-4d3b-ad6f-65efcdd8277&title=&width=911.3333333333334)
当node3当选后，集群继续对外提供服务，node2和node3自成集群，node1自成集群，两个集群数据不同步，出现数据差异。
当网络恢复后，因为集群中有两个master节点，集群状态的不一致，出现脑裂的情况：
![image-20210723224000555.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883123079-a93648a9-c318-4040-9090-89d93689e2ef.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fafafa&clientId=u9179c916-36ec-4&from=paste&height=235&id=ueddf94ca&originHeight=353&originWidth=1349&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=16610&status=done&style=none&taskId=ub198c814-74b3-497a-a4dd-0fa9a024a85&title=&width=899.3333333333334)
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
![image-20210723225006058.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883247569-a27ae339-15c5-4137-8ed5-93fbef3d30e7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f9f8&clientId=u9179c916-36ec-4&from=paste&height=221&id=u42d5940a&originHeight=332&originWidth=915&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38647&status=done&style=none&taskId=uba9b99b2-d821-4b7c-9afb-d447289b2fb&title=&width=610)![image-20210723225034637.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883247601-b6f08fde-a220-44b9-9b60-74bfaa707732.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf9f9&clientId=u9179c916-36ec-4&from=paste&height=211&id=u7c2d240d&originHeight=317&originWidth=857&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38871&status=done&style=none&taskId=ue0603838-3058-44a8-a13d-06570713be2&title=&width=571.3333333333334)![image-20210723225112029.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883247546-1e73fdb1-6121-41a2-a43e-c6820205ef0c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f8f8&clientId=u9179c916-36ec-4&from=paste&height=205&id=u65cf5f40&originHeight=307&originWidth=992&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=39170&status=done&style=none&taskId=uc8458a81-54f4-4405-a6a1-35d4c1d2e2c&title=&width=661.3333333333334)
测试可以看到，三条数据分别在不同分片：
![image-20210723225227928.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883268562-a9746cbc-881b-40f6-a2d0-c687b4ad8be7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f9f9&clientId=u9179c916-36ec-4&from=paste&height=276&id=ucb9e6893&originHeight=414&originWidth=921&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=42415&status=done&style=none&taskId=u85a9658f-866e-40be-9226-727513c2b3d&title=&width=614)
结果：
![image-20210723225342120.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883279316-ab8f4ec0-94da-49e4-94b4-52daa6ef80f5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdfdfc&clientId=u9179c916-36ec-4&from=paste&height=457&id=u892b2731&originHeight=685&originWidth=616&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=108562&status=done&style=none&taskId=uf2c77d87-dc96-4088-95ad-d21ec7bc29e&title=&width=410.6666666666667)
### 3.2.分片存储原理
elasticsearch会通过hash算法来计算文档应该存储到哪个分片：
![image-20210723224354904.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883290819-eb767ddf-b9ab-4321-ab04-23d48dd6f2fa.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%237b7b7a&clientId=u9179c916-36ec-4&from=paste&height=55&id=u2a2acc6a&originHeight=82&originWidth=654&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=6832&status=done&style=none&taskId=uebb9484e-371b-44b1-b149-1ec14c62ea5&title=&width=436)
说明：

- _routing默认是文档的id
- 算法与分片数量有关，因此索引库一旦创建，分片数量不能修改！

新增文档的流程如下：
![image-20210723225436084.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883315255-cde85540-dc4f-4348-a545-27aafa859565.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f7f7&clientId=u9179c916-36ec-4&from=paste&height=474&id=u57e0d357&originHeight=711&originWidth=1618&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=78521&status=done&style=none&taskId=u08f8b45d-4716-4035-a561-ec032ac36d4&title=&width=1078.6666666666667)
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

![image-20210723225809848.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883331396-6bd62135-76f9-4d93-b7ff-689dcb3e1917.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfcfc&clientId=u9179c916-36ec-4&from=paste&height=319&id=u9c63cad2&originHeight=479&originWidth=873&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38080&status=done&style=none&taskId=ubcee2d48-7168-48b8-b943-4f50c7737ac&title=&width=582)
## 5.集群故障转移
集群的master节点会监控集群中的节点状态，如果发现有节点宕机，会立即将宕机节点的分片数据迁移到其它节点，确保数据安全，这个叫做故障转移。
1）例如一个集群结构如图：
![image-20210723225945963.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883349405-1b86ed30-7fd7-4a89-ba48-d0d08e4cb5df.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfcfc&clientId=u9179c916-36ec-4&from=paste&height=259&id=u44eb9e1f&originHeight=389&originWidth=1430&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=24850&status=done&style=none&taskId=u8507f5c5-550b-4736-9b41-46a55940d9a&title=&width=953.3333333333334)
现在，node1是主节点，其它两个节点是从节点。
2）突然，node1发生了故障：
![](assets/image-20210723230020574.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=Xrwt7&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
宕机后的第一件事，需要重新选主，例如选中了node2：
![image-20210723230055974.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883362519-05e92cf7-b812-4145-966a-378b61c21ec7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbebeb&clientId=u9179c916-36ec-4&from=paste&height=231&id=u115b1887&originHeight=346&originWidth=1324&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=35105&status=done&style=none&taskId=u091d1193-f645-4239-af9d-543da4c6305&title=&width=882.6666666666666)
node2成为主节点后，会检测集群监控状态，发现：shard-1、shard-0没有副本节点。因此需要将node1上的数据迁移到node2、node3：
![image-20210723230216642.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678883368748-c95b57c0-fb46-4698-b47e-d061203f2c2a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_39%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbeded&clientId=u9179c916-36ec-4&from=paste&height=256&id=ub1926c8b&originHeight=384&originWidth=1364&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=46696&status=done&style=none&taskId=uc7f3aa85-3123-48cc-bcd4-43e5f7308ae&title=&width=909.3333333333334)
![](assets/image-20210723230216642.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=uFB3r&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680524184880-49b860db-c11b-429a-8ae4-ef0f5cf0d225.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232d4e62&clientId=ue257a456-d2da-4&from=paste&height=191&id=u9400bb99&originHeight=287&originWidth=1629&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=397663&status=done&style=none&taskId=u0022d221-ddfe-404a-95d9-814cf8bd926&title=&width=1086)
去cerebro查看也都正常
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680524215871-85a746f0-1921-453a-91ea-80ac24c4d503.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_39%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23393e40&clientId=ue257a456-d2da-4&from=paste&height=429&id=u451ce597&originHeight=643&originWidth=1381&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=48941&status=done&style=none&taskId=u9e464dcf-f242-4e01-aef1-6d5beebd4a9&title=&width=920.6666666666666)
此时，我们挂机主节点，目前是es03，所以我们应该（停掉当前的主节点才可以）：docker rm -f es03
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680524263466-bf37a1a5-15d1-497c-a1e9-af65e6cd0f42.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23223c50&clientId=ue257a456-d2da-4&from=paste&height=53&id=u24752cf6&originHeight=79&originWidth=540&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44556&status=done&style=none&taskId=ud74a905c-aec0-4a32-8fbf-56ef42b72f0&title=&width=360)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680524285680-0f5f839a-b147-44c6-a611-0a4d753d30c7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232a4a5f&clientId=ue257a456-d2da-4&from=paste&height=173&id=uad377467&originHeight=260&originWidth=1609&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=360674&status=done&style=none&taskId=u90fd707f-5068-483d-8862-ae9565d7782&title=&width=1072.6666666666667)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680524347485-26f307bb-286a-46b1-a37e-c975c792ce70.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_55%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23393d3f&clientId=ue257a456-d2da-4&from=paste&height=407&id=uea33ca32&originHeight=611&originWidth=1932&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=79561&status=done&style=none&taskId=ua4dd6a17-0264-4b44-9253-2360116bae7&title=&width=1288)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680524373896-c0a2a8d9-c0de-4921-ad06-b26850af7349.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23383d3f&clientId=ue257a456-d2da-4&from=paste&height=431&id=u31339a4e&originHeight=647&originWidth=1907&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=59204&status=done&style=none&taskId=ue11bc2f7-9499-458f-b073-4e2572fa00b&title=&width=1271.3333333333333)
