---
title: 分布式搜索引擎ElasticSearch
urlname: demgaggh1tyqt5m1
date: '2024-03-28 16:34:09'
updated: '2024-03-28 16:34:22'
description: 1.初识elasticsearch1.1.了解ES1.1.1.elasticsearch的作用elasticsearch是一款非常强大的开源搜索引擎，具备非常多强大功能，可以帮助我们从海量数据中快速找到需要的内容，例如： 在GitHub搜索代码 在电商网站搜索商品 在百度搜索答案 在打车软件搜...
---
# 1.初识elasticsearch
## 1.1.了解ES
### 1.1.1.elasticsearch的作用
elasticsearch是一款非常强大的开源搜索引擎，具备非常多强大功能，可以帮助我们从海量数据中快速找到需要的内容，例如：

-  在GitHub搜索代码![image-20210720193623245.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/00d17f4e748a6a61f756ede7a949d247.png)
-  在电商网站搜索商品![image-20210720193633483.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/39940b900e1ba99e039ea9bc082bb68c.png)
-  在百度搜索答案

![image-20210720193641907.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ae59116fc0722b5833302830d2615cba.png)

-  在打车软件搜索附近的车

![image-20210720193648044.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/26de1e5799a0a9db247d92bca47ec06f.png)
### 1.1.2.ELK技术栈
elasticsearch结合kibana、Logstash、Beats，也就是elastic stack（ELK）。被广泛应用在日志数据分析、实时监控等领域：
![image-20210720194008781.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/14b701d4db45e461e81aa9f647b42113.png)
而elasticsearch是elastic stack的核心，负责存储、搜索、分析数据。
![image-20210720194230265.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/8257a620665c0a59c97b48e48c769c66.png)
### 1.1.3.elasticsearch和lucene
elasticsearch底层是基于**lucene**来实现的。**Lucene**是一个Java语言的搜索引擎类库，是Apache公司的顶级项目，由DougCutting于1999年研发。官网地址：[https://lucene.apache.org/](https://lucene.apache.org/) 。
![image-20210720194547780.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/c2c54dcb3f149f383c7c54e15e82cc2c.png)
**elasticsearch**的发展历史：

- 2004年Shay Banon基于Lucene开发了Compass
- 2010年Shay Banon 重写了Compass，取名为Elasticsearch。

![image-20210720195001221.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/baa81c8d3995a1be8a1fa5d1f3f8a46e.png)
### 1.1.4.为什么不是其他搜索技术？
目前比较知名的搜索引擎技术排名：
![image-20210720195142535.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/888363e34ba0a8024aeb3859eb3f24fb.png)
虽然在早期，Apache Solr是最主要的搜索引擎技术，但随着发展elasticsearch已经渐渐超越了Solr，独占鳌头：
![image-20210720195306484.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/4df2d35aefb5d3f16cca3c15688bc01e.png)
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
![image-20210720195531539.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ce24023f2da09cea2c832bf67e201b82.png)
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
![image-20210720200457207.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/65ebd2db4d567bbdb50071838c31ca66.png)
倒排索引的**搜索流程**如下（以搜索"华为手机"为例）：
1）用户输入条件`"华为手机"`进行搜索。
2）对用户输入内容**分词**，得到词条：`华为`、`手机`。
3）拿着词条在倒排索引中查找，可以得到包含词条的文档id：1、2、3。
4）拿着文档id到正向索引中查找具体文档。
如图：
![image-20210720201115192.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/1b00e6736b7a60e2354171681a5bae8c.png)
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
![ES.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/2e72db7dc18d9d74bbc086a82920590f.png)
