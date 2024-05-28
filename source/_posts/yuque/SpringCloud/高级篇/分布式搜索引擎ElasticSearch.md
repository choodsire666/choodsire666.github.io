---
title: 分布式搜索引擎ElasticSearch
urlname: demgaggh1tyqt5m1
date: '2024-03-28 16:34:09'
updated: '2024-03-28 16:34:22'
description: 1.初识elasticsearch1.1.了解ES1.1.1.elasticsearch的作用elasticsearch是一款非常强大的开源搜索引擎，具备非常多强大功能，可以帮助我们从海量数据中快速找到需要的内容，例如： 在GitHub搜索代码 在电商网站搜索商品 在百度搜索答案 在打车软件搜...
cover: ''
---
# 1.初识elasticsearch
## 1.1.了解ES
### 1.1.1.elasticsearch的作用
elasticsearch是一款非常强大的开源搜索引擎，具备非常多强大功能，可以帮助我们从海量数据中快速找到需要的内容，例如：

-  在GitHub搜索代码![image-20210720193623245.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876458115-c3b76c96-a938-4777-a2a6-d42bc055746d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfbfa&clientId=u47f4ab86-b781-4&from=paste&id=u9eefcbff&originHeight=304&originWidth=923&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=99928&status=done&style=none&taskId=ude87f114-d5d1-4d22-a244-c88ce29e62d&title=)
-  在电商网站搜索商品![image-20210720193633483.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876462098-5a726e3f-547b-48f5-ac16-920583c52fc3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e1cabb&clientId=u47f4ab86-b781-4&from=paste&id=u5017fb83&originHeight=401&originWidth=892&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=191724&status=done&style=none&taskId=u5457572f-64e4-48d8-b515-38e782a798b&title=)
-  在百度搜索答案

![image-20210720193641907.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876465350-50d17aa4-0255-48e3-9b2d-8a0a482d21fc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfaf9&clientId=u47f4ab86-b781-4&from=paste&id=ue0d5ec63&originHeight=377&originWidth=701&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=138833&status=done&style=none&taskId=u45116eab-5789-4a9c-840b-6df6a0b22f4&title=)

-  在打车软件搜索附近的车

![image-20210720193648044.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876468265-369ab529-1d33-4f18-9e75-2a3dea1dc4f0.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_13%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2358b8a3&clientId=u47f4ab86-b781-4&from=paste&id=u368ff47f&originHeight=502&originWidth=295&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=94375&status=done&style=none&taskId=u27c8bc80-1224-4356-8fe3-23c97bf4df6&title=)
### 1.1.2.ELK技术栈
elasticsearch结合kibana、Logstash、Beats，也就是elastic stack（ELK）。被广泛应用在日志数据分析、实时监控等领域：
![image-20210720194008781.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876531167-b3ca698f-7b16-4f15-8488-f31e2c495f3a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbf9f4&clientId=u47f4ab86-b781-4&from=paste&id=u3313fee1&originHeight=474&originWidth=837&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=208398&status=done&style=none&taskId=ua7d60ccd-2b4a-46e3-a1aa-bb6cbf54bb2&title=)
而elasticsearch是elastic stack的核心，负责存储、搜索、分析数据。
![image-20210720194230265.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876546731-17324d93-d54e-4404-8207-a12cdeb403e4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23b7decf&clientId=u47f4ab86-b781-4&from=paste&id=u004d71c5&originHeight=549&originWidth=929&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=34627&status=done&style=none&taskId=u27fa42f7-1413-4853-aa51-daf73bad783&title=)
### 1.1.3.elasticsearch和lucene
elasticsearch底层是基于**lucene**来实现的。**Lucene**是一个Java语言的搜索引擎类库，是Apache公司的顶级项目，由DougCutting于1999年研发。官网地址：[https://lucene.apache.org/](https://lucene.apache.org/) 。
![image-20210720194547780.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876582562-e61a3a05-5264-4d6e-9365-370d2577dd72.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23efebe9&clientId=u47f4ab86-b781-4&from=paste&height=415&id=u4b7000b0&originHeight=622&originWidth=1446&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=277625&status=done&style=none&taskId=u63146e4d-6d80-46f9-a5fb-d3c148e89aa&title=&width=964)
**elasticsearch**的发展历史：

- 2004年Shay Banon基于Lucene开发了Compass
- 2010年Shay Banon 重写了Compass，取名为Elasticsearch。

![image-20210720195001221.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876596321-cf5d35c5-8a43-43dd-881a-68ca062bea12.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3efeb&clientId=u47f4ab86-b781-4&from=paste&height=375&id=u427868f6&originHeight=562&originWidth=1420&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=209517&status=done&style=none&taskId=u633134c0-2b83-4d1c-8f9a-f8835600919&title=&width=946.6666666666666)
### 1.1.4.为什么不是其他搜索技术？
目前比较知名的搜索引擎技术排名：
![image-20210720195142535.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876612996-62c278f1-600b-4a72-a464-4b1626bdaae4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3f1f1&clientId=u47f4ab86-b781-4&from=paste&id=uaae657d4&originHeight=342&originWidth=690&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=109034&status=done&style=none&taskId=u65da1941-32e1-476d-947e-60b57c377d6&title=)
虽然在早期，Apache Solr是最主要的搜索引擎技术，但随着发展elasticsearch已经渐渐超越了Solr，独占鳌头：
![image-20210720195306484.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876616115-6604a4cd-9db3-4f73-a5e8-92a68a03fe8c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_27%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfcfc&clientId=u47f4ab86-b781-4&from=paste&id=u4f56c927&originHeight=583&originWidth=951&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=78525&status=done&style=none&taskId=u5c8253d3-6a7c-4b44-a316-bfab64db370&title=)
### 1.1.5.总结
什么是elasticsearch？

- 一个开源的分布式搜索引擎，可以用来实现搜索、日志统计、分析、系统监控等功能

什么是elastic stack（ELK）？

- 是以elasticsearch为核心的技术栈，包括beats、Logstash、kibana、elasticsearch

什么是Lucene？

- 是Apache的开源搜索引擎类库，提供了搜索引擎的核心API
## 1.2.倒排索引
倒排索引的概念是基于MySQL这样的正向索引而言的。
### 1.2.1.正向索引
那么什么是正向索引呢？例如给下表（tb_goods）中的id创建索引：
![image-20210720195531539.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876643943-73e14a2c-8aeb-499d-a5a1-686eb933f17e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2eaea&clientId=u47f4ab86-b781-4&from=paste&height=419&id=u4da7bcdc&originHeight=629&originWidth=1428&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=79054&status=done&style=none&taskId=u70344e8f-bcb8-4089-936c-f3b91a98a34&title=&width=952)
如果是根据id查询，那么直接走索引，查询速度非常快。但如果是基于title做模糊查询，只能是逐行扫描数据，流程如下：
1）用户搜索数据，条件是title符合`"%手机%"`
2）逐行获取数据，比如id为1的数据
3）判断数据中的title是否符合用户搜索条件
4）如果符合则放入结果集，不符合则丢弃。回到步骤1
逐行扫描，也就是全表扫描，随着数据量增加，其查询效率也会越来越低。当数据量达到数百万时，就是一场灾难。
### 1.2.2.倒排索引
倒排索引中有两个非常重要的概念：

- 文档（`Document`）：用来搜索的数据，其中的每一条数据就是一个文档。例如一个网页、一个商品信息
- 词条（`Term`）：对文档数据或用户搜索数据，利用某种算法分词，得到的具备含义的词语就是词条。例如：我是中国人，就可以分为：我、是、中国人、中国、国人这样的几个词条

**创建倒排索引**是对正向索引的一种特殊处理，流程如下：

- 将每一个文档的数据利用算法分词，得到一个个词条
- 创建表，每行数据包括词条、词条所在文档id、位置等信息
- 因为词条唯一性，可以给词条创建索引，例如hash表结构索引

如图：
![image-20210720200457207.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876678399-17ebff18-d817-41e5-9c01-4e10d6842d32.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_30%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e2d4d4&clientId=u47f4ab86-b781-4&from=paste&id=u06dd33a4&originHeight=378&originWidth=1050&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44014&status=done&style=none&taskId=udcbd4411-44d4-4021-9ad4-20a4ee8dcd0&title=)
倒排索引的**搜索流程**如下（以搜索"华为手机"为例）：
1）用户输入条件`"华为手机"`进行搜索。
2）对用户输入内容**分词**，得到词条：`华为`、`手机`。
3）拿着词条在倒排索引中查找，可以得到包含词条的文档id：1、2、3。
4）拿着文档id到正向索引中查找具体文档。
如图：
![image-20210720201115192.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678876691933-c555feb0-1a68-4f72-bc07-41a52346d63e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eee3e2&clientId=u47f4ab86-b781-4&from=paste&id=u577e2cc7&originHeight=701&originWidth=1158&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=93376&status=done&style=none&taskId=u4d0d6b0b-4a00-4a02-8771-755cf58917f&title=)
虽然要先查询倒排索引，再查询倒排索引，但是无论是词条、还是文档id都建立了索引，查询速度非常快！无需全表扫描。
### 1.2.3.正向和倒排
那么为什么一个叫做正向索引，一个叫做倒排索引呢？

-  **正向索引**是最传统的，根据id索引的方式。但根据词条查询时，必须先逐条获取每个文档，然后判断文档中是否包含所需要的词条，是**根据文档找词条的过程**。 
-  而**倒排索引**则相反，是先找到用户要搜索的词条，根据词条得到保护词条的文档的id，然后根据id获取文档。是**根据词条找文档的过程**。 

是不是恰好反过来了？那么两者方式的优缺点是什么呢？
**正向索引**：

- 优点： 
   - 可以给多个字段创建索引
   - 根据索引字段搜索、排序速度非常快
- 缺点： 
   - 根据非索引字段，或者索引字段中的部分词条查找时，只能全表扫描。

**倒排索引**：

- 优点： 
   - 根据词条搜索、模糊搜索时，速度非常快
- 缺点： 
   - 只能给词条创建索引，而不是字段
   - 无法根据字段做排序
# 2.小节
由于ES课程API文档较多，这里统一汇总如下，有需自取
[ES.xmind](https://www.yuque.com/attachments/yuque/0/2024/xmind/29688613/1711614851119-64c5333d-53f6-4535-8155-aabe04890369.xmind)
![ES.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1679042165726-a8fa88dd-0367-4521-a420-2c7a26b44ff6.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_116%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#clientId=u71f04b18-1f15-4&from=ui&id=u50a910e1&originHeight=24038&originWidth=4076&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=5894012&status=done&style=none&taskId=udeb25cb2-3f1d-488a-ae75-e98b12d6db2&title=)
