# 1.部署单点es
## 1.1.创建网络
因为我们还需要部署kibana容器，因此需要让es和kibana容器互联。这里先创建一个网络：
```shell
docker network create es-net
```
## 1.2.加载镜像
这里我们采用elasticsearch的7.12.1版本的镜像，这个镜像体积非常大，接近1G。不建议大家自己pull。<br />可使用资料提供的镜像tar包：<br />![image-20210510165308064.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678754729369-0f77dec3-cbc2-4bed-b048-b51f0b60c816.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4f0ee&clientId=u317d41d6-9e2b-4&from=paste&id=ub761fd78&originHeight=293&originWidth=478&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=25081&status=done&style=none&taskId=ua416a6fa-6b54-4e18-bfbc-8e83f5f427f&title=)<br />将其上传到虚拟机中(任意目录，如：我们一直在用的/tmp下)，然后运行命令加载即可：
```shell
# 导入数据
docker load -i es.tar
```
同理还有`kibana`的tar包(任意目录，如：我们一直在用的/tmp下)也需要这样做。
```java
docker load -i kibana.tar
```
## 1.3.运行
运行docker命令，部署单点es：
```shell
docker run -d \
	--name es \
    -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
    -e "discovery.type=single-node" \
    -v es-data:/usr/share/elasticsearch/data \
    -v es-plugins:/usr/share/elasticsearch/plugins \
    --privileged \
    --network es-net \
    -p 9200:9200 \
    -p 9300:9300 \
elasticsearch:7.12.1
```
命令解释：

- `-e "cluster.name=es-docker-cluster"`：设置集群名称
- `-e "http.host=0.0.0.0"`：监听的地址，可以外网访问
- `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`：内存大小
- `-e "discovery.type=single-node"`：非集群模式
- `-v es-data:/usr/share/elasticsearch/data`：挂载逻辑卷，绑定es的数据目录
- `-v es-logs:/usr/share/elasticsearch/logs`：挂载逻辑卷，绑定es的日志目录
- `-v es-plugins:/usr/share/elasticsearch/plugins`：挂载逻辑卷，绑定es的插件目录
- `--privileged`：授予逻辑卷访问权
- `--network es-net` ：加入一个名为es-net的网络中
- `-p 9200:9200`：端口映射配置

在浏览器中输入：[http://192.168.150.101:9200](http://192.168.150.101:9200) 即可看到elasticsearch的响应结果：<br />![image-20210506101053676.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678754820302-cede64f5-acbb-4c8a-8b23-7c1f3679a204.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f7f6&clientId=u317d41d6-9e2b-4&from=paste&id=ubdf96d96&originHeight=591&originWidth=753&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66749&status=done&style=none&taskId=u860d416c-8203-4ad8-af42-0b842f4ebf4&title=)
# 2.部署kibana
kibana可以给我们提供一个elasticsearch的可视化界面，便于我们学习。
## 2.1.部署
运行docker命令，部署kibana，同理先加载镜像： docker load -i kibana.tar，然后启动：
```shell
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
--network=es-net \
-p 5601:5601  \
kibana:7.12.1
```

- `--network es-net` ：加入一个名为es-net的网络中，与elasticsearch在同一个网络中
- `-e ELASTICSEARCH_HOSTS=http://es:9200"`：设置elasticsearch的地址，因为**kibana已经与elasticsearch在一个网络**，因此可以用容器名直接访问elasticsearch
- `-p 5601:5601`：端口映射配置

kibana启动一般比较慢，需要多等待一会，可以通过命令：
```shell
docker logs -f kibana
```
查看运行日志，当查看到下面的日志，说明成功：<br />![image-20210109105135812.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678754870814-18158a20-4711-45cb-b304-1856485a24d9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23a7d2e8&clientId=u317d41d6-9e2b-4&from=paste&height=240&id=u0d430e1f&originHeight=360&originWidth=1504&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=58070&status=done&style=none&taskId=ucd08f3ef-f5b2-4912-9f82-39b7484f161&title=&width=1002.6666666666666)<br />此时，在浏览器输入地址访问：http://192.168.150.101:5601，即可看到结果
## 2.2.DevTools
kibana中提供了一个DevTools界面（可以直接搜索栏搜索：Dev Tools）：<br />我们可以输入简单尝试一下：
```http
GET /_analyze
{
  "analyzer": "standard",
  "text": "黑马程序员"
}
```
输入之后，有一个执行的按钮，执行一下就有下述的效果（这时候就已经测试出了默认分词器的效果）：<br />![image-20210506102630393.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678754901334-08c9f4ed-1dd6-458e-96d7-c5fb71f10c0a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_32%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%234db0c0&clientId=u317d41d6-9e2b-4&from=paste&height=355&id=u9bb5c381&originHeight=533&originWidth=1122&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=60176&status=done&style=none&taskId=ue2a2bc1e-7be2-4f50-8bd1-b6a1ced2f9a&title=&width=748)<br />这个界面中可以编写DSL来操作elasticsearch。并且对DSL语句有自动补全功能。<br />上述分词存在明显的问题：将中文逐字分词，没有任何业务语义，因此需要借助专业的分词器
# 3.安装IK分词器
## 3.1.在线安装ik插件（较慢）
```shell
# 进入容器内部
docker exec -it elasticsearch /bin/bash

# 在线下载并安装
./bin/elasticsearch-plugin  install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip

#退出
exit
#重启容器
docker restart elasticsearch
```
## 3.2.离线安装ik插件（推荐）
### 1）查看数据卷目录
安装插件需要知道elasticsearch的plugins目录位置，而我们用了数据卷挂载，因此需要查看elasticsearch的数据卷目录，通过下面命令查看:
```shell
docker volume inspect es-plugins
```
显示结果：
```json
[
    {
        "CreatedAt": "2022-05-06T10:06:34+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/es-plugins/_data",
        "Name": "es-plugins",
        "Options": null,
        "Scope": "local"
    }
]
```
说明plugins目录被挂载到了：`/var/lib/docker/volumes/es-plugins/_data`这个目录中。
### 2）解压缩分词器安装包
下面我们需要把课前资料中的ik分词器解压缩，重命名为ik<br />![image-20210506110249144.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678754945751-a7337052-44ee-423f-9784-8e7a295c63f7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5eeed&clientId=u317d41d6-9e2b-4&from=paste&id=u4cde3111&originHeight=216&originWidth=486&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=16028&status=done&style=none&taskId=uef62fcdb-fb2d-4f38-8d25-74ce26a0d52&title=)
### 3）上传到es容器的插件数据卷中
也就是`/var/lib/docker/volumes/es-plugins/_data`：<br />![image-20210506110704293.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678754958534-d36a1165-4777-4013-ba63-c4d0f35dff6c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6f2f1&clientId=u317d41d6-9e2b-4&from=paste&height=235&id=u7fe23bda&originHeight=353&originWidth=1226&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=39299&status=done&style=none&taskId=u80ff1f09-1160-4e48-b4cd-3c34d1bf466&title=&width=817.3333333333334)
### 4）重启容器
```shell
# 4、重启容器
docker restart es
```

```shell
# 查看es日志
docker logs -f es
```
### 5）测试：
IK分词器包含两种模式：

-  `ik_smart`：最少切分 
-  `ik_max_word`：最细切分 
```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "黑马程序员学习java太棒了"
}
```
结果：
```json
{
  "tokens" : [
    {
      "token" : "黑马",
      "start_offset" : 0,
      "end_offset" : 2,
      "type" : "CN_WORD",
      "position" : 0
    },
    {
      "token" : "程序员",
      "start_offset" : 2,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 1
    },
    {
      "token" : "程序",
      "start_offset" : 2,
      "end_offset" : 4,
      "type" : "CN_WORD",
      "position" : 2
    },
    {
      "token" : "员",
      "start_offset" : 4,
      "end_offset" : 5,
      "type" : "CN_CHAR",
      "position" : 3
    },
    {
      "token" : "学习",
      "start_offset" : 5,
      "end_offset" : 7,
      "type" : "CN_WORD",
      "position" : 4
    },
    {
      "token" : "java",
      "start_offset" : 7,
      "end_offset" : 11,
      "type" : "ENGLISH",
      "position" : 5
    },
    {
      "token" : "太棒了",
      "start_offset" : 11,
      "end_offset" : 14,
      "type" : "CN_WORD",
      "position" : 6
    },
    {
      "token" : "太棒",
      "start_offset" : 11,
      "end_offset" : 13,
      "type" : "CN_WORD",
      "position" : 7
    },
    {
      "token" : "了",
      "start_offset" : 13,
      "end_offset" : 14,
      "type" : "CN_CHAR",
      "position" : 8
    }
  ]
}
```
## 3.3 扩展词词典
随着互联网的发展，“造词运动”也越发的频繁。出现了很多新的词语，在原有的词汇列表中并不存在。比如：“奥力给”，“传智播客” 等。<br />所以我们的词汇也需要不断的更新，IK分词器提供了扩展词汇的功能。<br />1）打开IK分词器config目录，找到文件：IKAnalyzer.cfg.xml<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680575619105-6ac8ccfb-f839-4e3d-94dc-8c45cff02184.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2367cc7a&clientId=ue91d5666-d14d-4&from=paste&height=631&id=u4fbf03e5&originHeight=946&originWidth=1689&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=855430&status=done&style=none&taskId=ue1f27197-1f37-4f07-b57a-2b125772956&title=&width=1126)<br />2）在IKAnalyzer.cfg.xml配置文件内容添加：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 *** 添加扩展词典-->
        <entry key="ext_dict">ext.dic</entry>
</properties>
```
3）新建一个 ext.dic，可以参考config目录下复制一个配置文件进行修改
```properties
传智播客
奥力给
```
4）**重启elasticsearch**
```shell
docker restart es

# 查看 日志
docker logs -f es
```
日志中已经成功加载ext.dic配置文件<br />![image-20201115230900504.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678755022579-64ddba9a-1158-4083-8862-defa4c263824.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_96%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23181a1a&clientId=u317d41d6-9e2b-4&from=paste&height=512&id=uc4b50c84&originHeight=768&originWidth=3368&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=329712&status=done&style=none&taskId=u02942a02-c328-4504-bcfd-91061279a3c&title=&width=2245.3333333333335)<br />5）测试效果：
```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "传智播客Java就业超过90%,奥力给！"
}
```
> 注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑，可以直接linux系统vi编辑

## 3.4 停用词词典
在互联网项目中，在网络间传输的速度很快，所以很多语言是不允许在网络上传递的，如：关于宗教、政治等敏感词语，那么我们在搜索时也应该忽略当前词汇。

IK分词器也提供了强大的停用词功能，让我们在索引时就直接忽略当前的停用词汇表中的内容。

1）IKAnalyzer.cfg.xml配置文件内容添加：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典-->
        <entry key="ext_dict">ext.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典  *** 添加停用词词典-->
        <entry key="ext_stopwords">stopword.dic</entry>
</properties>
```
3）在 stopword.dic 添加停用词
```properties
干啥
```
4）重启elasticsearch
```shell
# 重启服务
docker restart es
docker restart kibana

# 查看 日志
docker logs -f es
```
日志中已经成功加载stopword.dic配置文件<br />5）测试效果：
```json
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "传智播客Java就业率超过95%,干啥都点赞,奥力给！"
}
```
> 注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑

# 4.ES启动报错
如遇下述ES启动报错问题：<br />![ES启动报错.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680772122920-a1ae8f1a-9581-4864-b22c-3f09ee20c44f.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_47%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%230c0906&clientId=u4b4d2c0b-53cf-4&from=paste&height=498&id=udcb57cb1&originHeight=747&originWidth=1656&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=588052&status=done&style=none&taskId=u5b60c120-a3f5-4cf1-9cd6-e83a8b5ee9f&title=&width=1104)<br />需要执行：curl -XDELETE ip:端口/报错信息括号中的信息，如我上述报错则执行：
```shell
curl -XDELETE 192.168.37.128:9200/.KIBANA_TASK_MANAGER_7.12.1_001
```
然后重启es
```shell
docker restart es
```
