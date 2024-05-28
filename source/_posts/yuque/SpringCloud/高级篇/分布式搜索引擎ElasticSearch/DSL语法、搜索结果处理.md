---
title: DSL语法、搜索结果处理
urlname: tw4e1oe6q4ixiqbo
date: '2024-03-28 16:35:21'
updated: '2024-03-28 16:35:44'
description: 在前面的学习中，笔者带领大家完成海量数据导入ES，实现了ES基本的存储功能，但是我们知道ES最擅长的还是搜索、数据分析。所以本节笔者将继续带领大家研究一下ES的数据搜索功能，同上节一样，继续分别采用DSL和RestClient实现搜索。1.DSL查询文档elasticsearch的查询依然是基...
cover: ''
---
> 在前面的学习中，笔者带领大家完成海量数据导入ES，实现了ES基本的存储功能，但是我们知道ES最擅长的还是搜索、数据分析。所以本节笔者将继续带领大家研究一下ES的数据搜索功能，同上节一样，继续分别采用DSL和RestClient实现搜索。

# 1.DSL查询文档
elasticsearch的查询依然是基于JSON风格的DSL来实现的。
## 1.1.DSL查询分类
Elasticsearch提供了基于JSON的DSL（[Domain Specific Language](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)）来定义查询。常见的查询类型包括：

-  **查询所有**：查询出所有数据，一般测试用。例如：match_all 
-  **全文检索（full text）查询**：利用分词器对用户输入内容分词，然后去倒排索引库中匹配。例如： 
   - match_query
   - multi_match_query
-  **精确查询**：根据精确词条值查找数据，一般是查找keyword、数值、日期、boolean等类型字段。例如： 
   - ids
   - range
   - term
-  **地理（geo）查询**：根据经纬度查询。例如： 
   - geo_distance
   - geo_bounding_box
-  **复合（compound）查询**：复合查询可以将上述各种查询条件组合起来，合并查询条件。例如： 
   - bool
   - function_score

查询的语法基本一致：
```json
GET /indexName/_search
{
  "query": {
    "查询类型": {
      "查询条件": "条件值"
    }
  }
}
```
我们以查询所有为例，其中：

- 查询类型为match_all
- 没有查询条件
```json
// 查询所有
GET /indexName/_search
{
  "query": {
    "match_all": {
    }
  }
}
```
其它查询无非就是**查询类型**、**查询条件**的变化。
## 1.2.全文检索查询
### 1.2.1.使用场景
全文检索查询的基本流程如下：

- 对用户搜索的内容做分词，得到词条
- 根据词条去倒排索引库中匹配，得到文档id
- 根据文档id找到文档，返回给用户

比较常用的场景包括：

- 商城的输入框搜索
- 百度输入框搜索

例如京东：
![image-20210721165326938.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678878533516-63bc1795-18ca-422e-b937-36a719d5788f.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_29%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6efee&clientId=ufbeed8c6-eba3-4&from=paste&height=124&id=u5b7a99cc&originHeight=186&originWidth=1024&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=62683&status=done&style=none&taskId=ud776ff4f-d430-432a-934d-41900de5712&title=&width=682.6666666666666)
因为是拿着词条去匹配，因此参与搜索的字段也必须是可分词的text类型的字段。
### 1.2.2.基本语法
常见的全文检索查询包括：

- match查询：单字段查询
- multi_match查询：多字段查询，任意一个字段符合条件就算符合查询条件

match查询语法如下：
```json
GET /indexName/_search
{
  "query": {
    "match": {
      "FIELD": "TEXT"
    }
  }
}
```
mulit_match语法如下：
```json
GET /indexName/_search
{
  "query": {
    "multi_match": {
      "query": "TEXT",
      "fields": ["FIELD1", " FIELD12"]
    }
  }
}
```
### 1.2.3.示例
match查询示例：
![image-20210721170455419.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678878604720-94faa66a-b615-4b17-b3a4-d55adaf3dcdf.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23d8e8e7&clientId=ufbeed8c6-eba3-4&from=paste&height=392&id=uaf174da5&originHeight=588&originWidth=1758&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=343334&status=done&style=none&taskId=ud488e6ce-d385-4c25-8478-f525aed1c80&title=&width=1172)
```xml
GET /hotel182/_search
{
  "query": {
    "match": {
      "name": "如家"
    }
  }
}
```

multi_match查询示例：
![image-20210721170720691.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678878612147-37e88cbb-e0d3-4c81-9a54-c4f7d802c05d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3f7fa&clientId=ufbeed8c6-eba3-4&from=paste&height=391&id=u0747f650&originHeight=586&originWidth=1761&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=407579&status=done&style=none&taskId=ud8cbc12e-4ae2-4063-b0fe-8afd0f62849&title=&width=1174)
```xml
GET /hotel182/_search
{
  "query": {
    "multi_match": {
      "query": "如家",
      "fields": ["brand", "name"]
    }
  }
}
```
可以看到，两种查询结果是一样的：因为我们将brand、name、business值都利用copy_to复制到了all字段中。因此你根据三个字段搜索，和根据all字段搜索效果当然一样了。但是，搜索字段越多，对查询性能影响越大，因此建议采用copy_to，然后单字段查询的方式。
### 1.2.4.总结
match和multi_match的区别是什么？

- match：根据一个字段查询
- multi_match：根据多个字段查询，参与查询字段越多，查询性能越差
## 1.3.精准查询
精确查询一般是查找keyword、数值、日期、boolean等类型字段。所以**不会**对搜索条件分词。常见的有：

- term：根据词条精确值查询
- range：根据值的范围查询
### 1.3.1.term查询
因为精确查询的字段搜是不分词的字段，因此查询的条件也必须是**不分词**的词条。查询时，用户输入的内容跟自动值完全匹配时才认为符合条件。如果用户输入的内容过多，反而搜索不到数据。语法说明：
```json
// term查询
GET /indexName/_search
{
  "query": {
    "term": {
      "FIELD": {
        "value": "VALUE"
      }
    }
  }
}
```
示例：当我搜索的是精确词条时，能正确查询出结果：
![image-20210721171655308.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879017888-d35c6002-95a7-4acd-9817-59de3e475a2d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3f7fa&clientId=ufbeed8c6-eba3-4&from=paste&height=371&id=u077d6918&originHeight=557&originWidth=1557&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=321331&status=done&style=none&taskId=u5692ffec-a931-40a2-87ad-c3a8b8a52af&title=&width=1038)
```xml
# 精确查询：term查询
GET /hotel182/_search
{
  "query": {
    "term": {
      "brand": {
        "value": "希尔33顿"
      }
    }
  }
}
```
但是，当我搜索的内容不是词条，而是多个词语形成的短语时，反而搜索不到：
![image-20210721171838378.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879032856-4a363280-254d-4baa-9308-d2128a26d430.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_37%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f5f9&clientId=ufbeed8c6-eba3-4&from=paste&height=309&id=u77316d41&originHeight=463&originWidth=1307&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=161795&status=done&style=none&taskId=uf4c0fc25-3836-4718-ba0f-3673a8ef237&title=&width=871.3333333333334)
### 1.3.2.range查询
范围查询，一般应用在对数值类型做范围过滤的时候。比如做价格范围过滤。基本语法：
```json
// range查询
GET /indexName/_search
{
  "query": {
    "range": {
      "FIELD": {
        "gte": 10, // 这里的gte代表大于等于，gt则代表大于
        "lte": 20 // lte代表小于等于，lt则代表小于
      }
    }
  }
}
```
示例：
![image-20210721172307172.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879139492-38fa47be-233c-455a-9440-451d406c581e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f0f5f8&clientId=ufbeed8c6-eba3-4&from=paste&height=276&id=u3432db72&originHeight=414&originWidth=1482&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=257316&status=done&style=none&taskId=u83f661ff-57d7-4ddc-a2a0-2e970f5adc4&title=&width=988)
```xml
# 精确查询：range查询
GET /hotel182/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 100,
        "lte": 200
      }
    }
  }
}
```
### 1.3.3.总结
精确查询常见的有哪些？

- term查询：根据词条精确匹配，一般搜索keyword类型、数值类型、布尔类型、日期类型字段
- range查询：根据数值范围查询，可以是数值、日期的范围
## 1.4.地理坐标查询
所谓的地理坐标查询，其实就是根据经纬度查询，官方文档：[链接](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-queries.html)，常见的使用场景包括：

- 携程：搜索我附近的酒店
- 滴滴：搜索我附近的出租车
- 微信：搜索我附近的人

附近的酒店：
![](assets/image-20210721172645103.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=CbnQU&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
附近的车：
![image-20210721172654880.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879205482-b57e45ce-6e4d-4973-a022-6fd551fcfb5c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_13%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2358b8a3&clientId=ufbeed8c6-eba3-4&from=paste&height=335&id=uad961b16&originHeight=502&originWidth=295&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=94375&status=done&style=none&taskId=u7bd82d55-06c0-40d5-be0b-e633259672c&title=&width=196.66666666666666)
### 1.4.1.矩形范围查询
矩形范围查询，也就是geo_bounding_box查询，查询坐标落在某个矩形范围的所有文档：
![DKV9HZbVS6.gif](https://cdn.nlark.com/yuque/0/2023/gif/1169676/1678879762799-89e07c7d-6540-497d-8f34-304d7d6bb811.gif#averageHue=%23bed2b7&clientId=ufbeed8c6-eba3-4&from=paste&id=u2d9374cc&originHeight=170&originWidth=336&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=164696&status=done&style=none&taskId=uc13c0e36-a872-4acb-af6a-28dc55633df&title=)
查询时，需要指定矩形的**左上**、**右下**两个点的坐标，然后画出一个矩形，落在该矩形内的都是符合条件的点。
语法如下：
```json
// geo_bounding_box查询
GET /indexName/_search
{
  "query": {
    "geo_bounding_box": {
      "FIELD": {
        "top_left": { // 左上点
          "lat": 31.1,
          "lon": 121.5
        },
        "bottom_right": { // 右下点
          "lat": 30.9,
          "lon": 121.7
        }
      }
    }
  }
}
```
这种并不符合“附近的人”这样的需求，所以我们就不做了。
### 1.4.2.附近查询
附近查询，也叫做距离查询（geo_distance）：查询到指定中心点小于某个距离值的所有文档。
换句话来说，在地图上找一个点作为圆心，以指定距离为半径，画一个圆，落在圆内的坐标都算符合条件：
![](assets/vZrdKAh19C.gif#id=o8DB9&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
语法说明：
```json
// geo_distance 查询
GET /indexName/_search
{
  "query": {
    "geo_distance": {
      "distance": "15km", // 半径
      "FIELD": "31.21,121.5" // 圆心
    }
  }
}
```
示例，我们先搜索陆家嘴附近15km的酒店：
![image-20210721175443234.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879810702-a89f87b8-44d6-4b0b-bff2-7eb0b5778ec9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_37%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f6f9&clientId=ufbeed8c6-eba3-4&from=paste&height=316&id=ua76239d6&originHeight=474&originWidth=1283&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=240083&status=done&style=none&taskId=u874541ad-4391-43a7-8aa6-befac2c9af5&title=&width=855.3333333333334)
发现共有47家酒店。然后把半径缩短到3公里：
![image-20210721182031475.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879821906-c4d8fde7-8fee-4265-bb58-a29a9caed0b2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_37%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23d9e9ea&clientId=ufbeed8c6-eba3-4&from=paste&height=313&id=ub6101213&originHeight=470&originWidth=1308&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=248020&status=done&style=none&taskId=u31218f63-8935-43e1-808e-0cb8a580e27&title=&width=872)
可以发现，搜索到的酒店数量减少到了5家。
## 1.5.复合查询
复合（compound）查询：复合查询可以将其它简单查询组合起来，实现更复杂的搜索逻辑。常见的有两种：

- fuction score：算分函数查询，可以控制文档相关性算分，控制文档排名
- bool query：布尔查询，利用逻辑关系组合多个其它的查询，实现复杂搜索
### 1.5.1.相关性算分
当我们利用match查询时，文档结果会根据与搜索词条的关联度打分（_score），返回结果时按照分值降序排列。
例如，我们搜索 "虹桥如家"，结果如下：
```json
[
  {
    "_score" : 17.850193,
    "_source" : {
      "name" : "虹桥如家酒店真不错",
    }
  },
  {
    "_score" : 12.259849,
    "_source" : {
      "name" : "外滩如家酒店真不错",
    }
  },
  {
    "_score" : 11.91091,
    "_source" : {
      "name" : "迪士尼如家酒店真不错",
    }
  }
]
```
在elasticsearch中，早期使用的打分算法是TF-IDF算法，公式如下：
![image-20210721190152134.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879860658-9a3138cb-d182-4441-975b-7e0187c5a796.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_24%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23a6a6a6&clientId=ufbeed8c6-eba3-4&from=paste&height=251&id=u6002a569&originHeight=376&originWidth=851&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38973&status=done&style=none&taskId=uce6624ab-4a98-4e13-961a-bd918fcdf9f&title=&width=567.3333333333334)
在后来的5.1版本升级中，elasticsearch将算法改进为BM25算法，公式如下：
![image-20210721190416214.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879870427-5242f9e4-28ca-4d78-952d-76b844082ab8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23979797&clientId=ufbeed8c6-eba3-4&from=paste&height=130&id=ucc56ab87&originHeight=195&originWidth=912&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=13901&status=done&style=none&taskId=uab0ed3e6-af66-43fd-92fd-a78782cc66c&title=&width=608)
TF-IDF算法有一各缺陷，就是词条频率越高，文档得分也会越高，单个词条对文档影响较大。而BM25则会让单个词条的算分有一个上限，曲线更加平滑：
![image-20210721190907320.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879879018-360b560d-5805-434d-a998-91b08caf69cc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_17%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6f6f6&clientId=ufbeed8c6-eba3-4&from=paste&id=u2bba39bd&originHeight=416&originWidth=589&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=131188&status=done&style=none&taskId=u91fbd1e6-92db-469a-aedc-9d5d41e9c57&title=)
小结：elasticsearch会根据词条和文档的相关度做打分，算法由两种：

- TF-IDF算法
- BM25算法，elasticsearch5.1版本后采用的算法
### 1.5.2.算分函数查询
根据相关度打分是比较合理的需求，但**合理的不一定是产品经理需要**的。
以百度为例，你搜索的结果中，并不是相关度越高排名越靠前，而是谁掏的钱多排名就越靠前。如图：
![](assets/image-20210721191144560.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=NrmN4&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
要想认为控制相关性算分，就需要利用elasticsearch中的function score 查询了。
#### 1）语法说明
![image-20210721191544750.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678879919697-ad93e9b2-5eaa-404e-a32f-127b5ef5607e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f7f0&clientId=ufbeed8c6-eba3-4&from=paste&height=371&id=ue691f23c&originHeight=556&originWidth=1409&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=132320&status=done&style=none&taskId=ub9114130-bae0-495e-9d69-99d1da796a5&title=&width=939.3333333333334)
function score 查询中包含四部分内容：

- **原始查询**条件：query部分，基于这个条件搜索文档，并且基于BM25算法给文档打分，**原始算分**（query score)
- **过滤条件**：filter部分，符合该条件的文档才会重新算分
- **算分函数**：符合filter条件的文档要根据这个函数做运算，得到的**函数算分**（function score），有四种函数 
   - weight：函数结果是常量
   - field_value_factor：以文档中的某个字段值作为函数结果
   - random_score：以随机数作为函数结果
   - script_score：自定义算分函数算法
- **运算模式**：算分函数的结果、原始查询的相关性算分，两者之间的运算方式，包括： 
   - multiply：相乘
   - replace：用function score替换query score
   - 其它，例如：sum、avg、max、min

function score的运行流程如下：

- 1）根据**原始条件**查询搜索文档，并且计算相关性算分，称为**原始算分**（query score）
- 2）根据**过滤条件**，过滤文档
- 3）符合**过滤条件**的文档，基于**算分函数**运算，得到**函数算分**（function score）
- 4）将**原始算分**（query score）和**函数算分**（function score）基于**运算模式**做运算，得到最终结果，作为相关性算分。

因此，其中的关键点是：

- 过滤条件：决定哪些文档的算分被修改
- 算分函数：决定函数算分的算法
- 运算模式：决定最终算分结果
#### 2）示例
需求：给“如家”这个品牌的酒店排名靠前一些，翻译一下这个需求，转换为之前说的四个要点：

- 原始条件：不确定，可以任意变化
- 过滤条件：brand = "如家"
- 算分函数：可以简单粗暴，直接给固定的算分结果，weight
- 运算模式：比如求和

因此最终的DSL语句如下：
```json
GET /hotel/_search
{
  "query": {
    "function_score": {
      "query": {  .... }, // 原始查询，可以是任意条件
      "functions": [ // 算分函数
        {
          "filter": { // 满足的条件，品牌必须是如家
            "term": {
              "brand": "如家"
            }
          },
          "weight": 2 // 算分权重为2
        }
      ],
      "boost_mode": "sum" // 加权模式，求和
    }
  }
}
```
测试，在未添加算分函数时，如家得分如下：
![image-20210721193152520.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880033433-6c1dcffa-d4fa-4580-8a48-a20b655b2e7b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f0f4f9&clientId=ufbeed8c6-eba3-4&from=paste&height=296&id=ue3e60395&originHeight=444&originWidth=1340&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=242711&status=done&style=none&taskId=udadc5c09-58f3-4b91-904a-636397e3df7&title=&width=893.3333333333334)
添加了算分函数后，如家得分就提升了(![](assets/image-20210721193152520.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=zOXXC&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image-20210721193458182.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880043553-03084786-57d1-4938-a917-8c86e4ae561a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eef3f8&clientId=ufbeed8c6-eba3-4&from=paste&height=379&id=uebc52c08&originHeight=568&originWidth=1402&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=370718&status=done&style=none&taskId=uee14a047-1038-41e0-9cd2-546cda8ea42&title=&width=934.6666666666666)
```xml
GET /hotel182/_search
{
  "query": {
    "function_score": {
      "query": {
        "match": {
          "all": "外滩"
        }
      },
      "functions": [
        {
          "filter": {
            "term": {
              "brand": "如家"
            }
          },
            "weight": 10
        }
      ],
      "boost_mode": "sum"
    }
  }
}
```
这里算分模式如果替换成：replace，所有的query score都将失效，被function score所替代，都变成10
#### 3）小结
function score query定义的三要素是什么？

- 过滤条件：哪些文档要加分
- 算分函数：如何计算function score
- 加权方式：function score 与 query score如何运算

### 1.5.3.布尔查询
布尔查询是一个或多个查询子句的组合，每一个子句就是一个**子查询**。子查询的组合方式有：

- must：必须匹配每个子查询，类似“与”
- should：选择性匹配子查询，类似“或”
- must_not：必须不匹配，**不参与算分**，类似“非”
- filter：必须匹配，**不参与算分**

比如在搜索酒店时，除了关键字搜索外，我们还可能根据品牌、价格、城市等字段做过滤：
![](assets/image-20210721193822848.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=A3qeo&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
每一个不同的字段，其查询的条件、方式都不一样，必须是多个不同的查询，而要组合这些查询，就必须用bool查询了。
需要注意的是，搜索时，参与**打分的字段越多，查询的性能也越差**。因此这种多条件查询时，建议这样做：

- 搜索框的关键字搜索，是全文检索查询，使用must查询，参与算分
- 其它过滤条件，采用filter查询。不参与算分
#### 1）语法示例：
```json
GET /hotel/_search
{
  "query": {
    "bool": {
      "must": [
        {"term": {"city": "上海" }}
      ],
      "should": [
        {"term": {"brand": "皇冠假日" }},
        {"term": {"brand": "华美达" }}
      ],
      "must_not": [
        { "range": { "price": { "lte": 500 } }}
      ],
      "filter": [
        { "range": {"score": { "gte": 45 } }}
      ]
    }
  }
}
```
#### 2）示例
需求：搜索名字包含“如家”，价格不大于400，在坐标31.21,121.5周围10km范围内的酒店。
分析：

- 名称搜索，属于全文检索查询，应该参与算分。放到must中
- 价格不大于400，用range查询，属于过滤条件，可以不参与算分。放到must_not中
- 周围10km范围内，用geo_distance查询，属于过滤条件，可以不参与算分。放到filter中

![image-20210721194744183.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880095066-56c9eb91-8b46-4e11-90ba-15f0ec3c0064.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eff4f8&clientId=ufbeed8c6-eba3-4&from=paste&height=420&id=ue8bea04e&originHeight=630&originWidth=1559&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=469807&status=done&style=none&taskId=u3f55b7e3-f74a-47a6-ac1e-9c95c19ed6a&title=&width=1039.3333333333333)
```xml
GET /hotel182/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "name": "如家"
        }}
      ],
      "must_not": [
        {"range": {
          "price": {
            "gt": 400
          }
        }}
      ],
      "filter": [
        {"geo_distance": {
          "distance": "10km",
          "location": {
            "lat": 31.21,
            "lon": 121.5
          }
        }}
      ]
    }
  }
}
```
#### 3）小结
bool查询有几种逻辑关系？

- must：必须匹配的条件，可以理解为“与”
- should：选择性匹配的条件，可以理解为“或”
- must_not：必须不匹配的条件，不参与打分
- filter：必须匹配的条件，不参与打分
# 2.搜索结果处理
## 2.1.排序
elasticsearch默认是根据相关度算分（_score）来排序，但是也支持自定义方式对搜索[结果排序](https://www.elastic.co/guide/en/elasticsearch/reference/current/sort-search-results.html)。可以排序字段类型有：keyword类型、数值类型、地理坐标类型、日期类型等。
### 2.1.1.普通字段排序
keyword、数值、日期类型排序的语法基本一致。
**语法**：
```json
GET /indexName/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "FIELD": "desc"  // 排序字段、排序方式ASC、DESC
    }
  ]
}
```
排序条件是一个数组，也就是可以写多个排序条件，并且与query标签保持平行。按照声明的顺序，当第一个条件相等时，再按照第二个条件排序，以此类推。**示例**：
需求描述：酒店数据按照用户评价（score)降序排序，评价相同的按照价格(price)升序排序

- 语法一：官方自己默认
```xml
GET /hotel182/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "score": {
        "order": "desc"
      }
    },
    {
      "price": {
        "order": "asc"
      }
    }
  ]
}
```

- 语法二：简化排序格式，跟字段保持平齐
```xml
GET /hotel182/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "score": {
        "order": "desc"
      }
    },
    {
      "price": {
        "order": "asc"
      }
    }
  ]
}
```
 此时可以查看到数据：评分最高是49分，接着两个一样的48里，价格是升序返回的。
### 2.1.2.地理坐标排序
地理坐标排序略有不同。**语法说明**：
```json
GET /indexName/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "_geo_distance" : {
          "FIELD" : "纬度，经度", // 文档中geo_point类型的字段名、目标坐标点
          "order" : "asc", // 排序方式
          "unit" : "km" // 排序的距离单位
      }
    }
  ]
}
```
这个查询的含义是：

- 指定一个坐标，作为目标点
- 计算每一个文档中，指定字段（必须是geo_point类型）的坐标 到目标点的距离是多少
- 根据距离排序

**示例：**
需求描述：实现对酒店数据按照到你的位置坐标的距离升序排序。提示：获取你的位置的经纬度的方式：[链接](https://lbs.amap.com/demo/jsapi-v2/example/map/click-to-get-lnglat/)
假设我的位置是：31.034661，121.612282，寻找我周围距离最近的酒店。
![image-20210721200214690.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880184268-198f7ca2-fef4-4500-bcca-f863fa1a35c4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eef2f8&clientId=ufbeed8c6-eba3-4&from=paste&height=321&id=u55bc98c7&originHeight=482&originWidth=1437&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=349942&status=done&style=none&taskId=u41c9b9a1-d3ee-413d-98b2-3535b19fe22&title=&width=958)
```xml
GET /hotel182/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "_geo_distance": {
        "location": {
          "lat": 31.034661,
          "lon": 121.612282
        },
        "order": "desc", 
        "unit": "km"
      }
    }
  ]
}
```
这里的排序语法也可以跟上面的组合在一起，形成三个排序：得分、价格、地理坐标。
## 2.2.分页
elasticsearch 默认情况下只返回top10的数据。而如果要查询更多数据就需要修改分页参数了。elasticsearch中通过修改from、size参数来控制要返回的分页结果：

- from：从第几个文档开始
- size：总共查询几个文档

类似于mysql中的`limit ?, ?`
### 2.2.1.基本的分页
分页的基本语法如下：
```json
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "from": 0, // 分页开始的位置，默认为0
  "size": 20, // 期望获取的文档总数
  "sort": [
    {"price": "asc"}
  ]
}
```
### 2.2.2.深度分页问题
现在，我要查询990~1000的数据，查询逻辑要这么写：
```json
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "from": 990, // 分页开始的位置，默认为0
  "size": 10, // 期望获取的文档总数
  "sort": [
    {"price": "asc"}
  ]
}
```
这里是查询990开始的数据，也就是 第990~第1000条数据。不过，elasticsearch内部分页时，必须先查询 0~1000条，然后截取其中的990 ~ 1000的这10条：
![image-20210721200643029.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880224763-6e66572d-a34f-4387-b0fd-872f390d0d8a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfbfb&clientId=ufbeed8c6-eba3-4&from=paste&id=u3c43679e&originHeight=291&originWidth=776&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21206&status=done&style=none&taskId=u4e3cb942-9809-4bfc-aff1-f8941a1355a&title=)
查询TOP1000，如果es是单点模式，这并无太大影响。但是elasticsearch将来一定是集群，例如我集群有5个节点，我要查询TOP1000的数据，并不是每个节点查询200条就可以了。因为节点A的TOP200，在另一个节点可能排到10000名以外了。
因此要想获取整个集群的TOP1000，必须先查询出每个节点的TOP1000，汇总结果后，重新排名，重新截取TOP1000。
![image-20210721201003229.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880233684-1bfc8163-5932-4fa4-8807-27303a630414.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fafafa&clientId=ufbeed8c6-eba3-4&from=paste&id=u49d01c92&originHeight=529&originWidth=821&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=33999&status=done&style=none&taskId=u7ce10b07-1377-4044-a56e-df53d1625ef&title=)
那如果我要查询9900~10000的数据呢？是不是要先查询TOP10000呢？那每个节点都要查询10000条？汇总到内存中？当查询分页深度较大时，汇总数据过多，对内存和CPU会产生非常大的压力，因此elasticsearch会禁止from+ size 超过10000的请求。针对深度分页，ES提供了两种解决方案，[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html)：

- search after：分页时需要排序，原理是从上一次的排序值开始，查询下一页数据。官方推荐使用的方式。
- scroll：原理将排序后的文档id形成快照，保存在内存。官方已经不推荐使用。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680751682838-62384c82-17db-4622-a9d7-e82dfff3be62.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_53%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eef2f6&clientId=u309a1af0-61af-4&from=paste&height=436&id=u706321cb&originHeight=654&originWidth=1854&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=170598&status=done&style=none&taskId=u6757acf0-f92b-4afc-b0d3-98e558bf26d&title=&width=1236)
### 2.2.3.小结
分页查询的常见实现方案以及优缺点：

-  `from + size`： 
   - 优点：支持随机翻页
   - 缺点：深度分页问题，默认查询上限（from + size）是10000
   - 场景：百度、京东、谷歌、淘宝这样的随机翻页搜索
-  `after search`： 
   - 优点：没有查询上限（单次查询的size不超过10000）
   - 缺点：只能向后逐页查询，不支持随机翻页
   - 场景：没有随机翻页需求的搜索，例如手机向下滚动翻页
-  `scroll`： 
   - 优点：没有查询上限（单次查询的size不超过10000）
   - 缺点：会有额外内存消耗，并且搜索结果是非实时的
   - 场景：海量数据的获取和迁移。从ES7.1开始不推荐，建议用 after search方案。
## 2.3.高亮
### 2.3.1.高亮原理
什么是高亮显示呢？我们在百度，京东搜索时，关键字会变成红色，比较醒目，这叫高亮显示：
![image-20210721202705030.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880295123-0e8940a8-58e0-4a5e-ad3f-ea1c649f93a6.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_16%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f7&clientId=ufbeed8c6-eba3-4&from=paste&id=uc28da991&originHeight=475&originWidth=570&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=158358&status=done&style=none&taskId=u60ec7e6f-bfd2-421c-b163-7d0e21b6ce7&title=)
高亮显示的实现分为两步：

- 1）给文档中的所有关键字都添加一个标签，例如`<em>`标签
- 2）页面给`<em>`标签编写CSS样式
### 2.3.2.实现高亮
**高亮的语法**：
```json
GET /hotel/_search
{
  "query": {
    "match": {
      "FIELD": "TEXT" // 查询条件，高亮一定要使用全文检索查询
    }
  },
  "highlight": {
    "fields": { // 指定要高亮的字段
      "FIELD": {
        "pre_tags": "<em>",  // 用来标记高亮字段的前置标签
        "post_tags": "</em>" // 用来标记高亮字段的后置标签
      }
    }
  }
}
```
**注意：**

- 高亮是对关键字高亮，因此**搜索条件必须带有关键字**，而不能是范围这样的查询。
- 默认情况下，**高亮的字段，必须与搜索指定的字段一致**，否则无法高亮
- 如果要对非搜索字段高亮，则需要添加一个属性：required_field_match=false

**示例**：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680323530892-c5e7e504-f2b2-4abe-8a04-33eac65caa94.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23ecf1f5&clientId=ucd7cc4b2-fac6-4&from=paste&height=379&id=ub9c3642e&originHeight=568&originWidth=1768&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=149185&status=done&style=none&taskId=uda8f5d88-06a0-46f5-8049-e693128c73a&title=&width=1178.6666666666667)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680323580815-e4baebbd-74ed-4d6e-9f95-b77efb9f1f95.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23ebf0f5&clientId=ucd7cc4b2-fac6-4&from=paste&height=399&id=ucb0cb0a5&originHeight=598&originWidth=1742&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=162696&status=done&style=none&taskId=u06a46d3d-f6ea-40a0-ad86-47cb5062c58&title=&width=1161.3333333333333)
```json
GET /hotel182/_search
{
  "query": {
    "match": {
      "all": "如家"
    }
  },
  "highlight": {
    "fields": {
      "brand": {
        "pre_tags": "<em>",
        "post_tags": "</em>",
        "require_field_match": "false"
      }
    }
  }
}
```
## 2.4.总结
查询的DSL是一个大的JSON对象，包含下列属性：

- query：查询条件
- from和size：分页条件
- sort：排序条件
- highlight：高亮条件

示例：
![image-20210721203657850.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880350801-186bbb05-a24b-4469-a394-304997e775d8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdfcfb&clientId=ufbeed8c6-eba3-4&from=paste&id=u915cbff3&originHeight=688&originWidth=795&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=76475&status=done&style=none&taskId=u51e93beb-d08b-496d-814f-d9881e273f5&title=)
# 3.RestClient查询文档
文档的查询同样适用昨天学习的 RestHighLevelClient对象，基本步骤包括：

- 1）准备Request对象
- 2）准备请求参数
- 3）发起请求
- 4）解析响应
## 3.1.快速入门
在我们昨天学习的课程基础之上，我们继续在单测中练习。我们以match_all查询为例(这里也可新建一个单测类)
### 3.1.1.发起查询请求
![image-20210721203950559.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880378724-7cc015bb-d951-42c3-9f5b-1373a7fa2a39.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3f6f0&clientId=ufbeed8c6-eba3-4&from=paste&height=291&id=u13443d58&originHeight=436&originWidth=1440&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=76773&status=done&style=none&taskId=u8691cfcb-ccd9-4d28-9096-f20b853d4ab&title=&width=960)
代码解读：

-  第一步，创建`SearchRequest`对象，指定索引库名 
-  第二步，利用`request.source()`构建DSL，DSL中可以包含查询、分页、排序、高亮等 
   - `query()`：代表查询条件，利用`QueryBuilders.matchAllQuery()`构建一个match_all查询的DSL
-  第三步，利用client.search()发送请求，得到响应 

这里关键的API有两个，一个是`request.source()`，其中包含了查询、排序、分页、高亮等所有功能：![image-20210721215640790.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880400105-1f704aa4-ce7d-44fa-bac6-d3473d8b3237.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23edebde&clientId=ufbeed8c6-eba3-4&from=paste&id=u12b09a88&originHeight=484&originWidth=693&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=168438&status=done&style=none&taskId=u08331867-ea52-4829-9af9-6134fb446c4&title=)
另一个是![](assets/image-20210721215640790.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=kV4Z6&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image-20210721215729236.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880411774-0dffcb8a-17a1-48c4-a8d3-29b342b130c4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_17%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4f8f3&clientId=ufbeed8c6-eba3-4&from=paste&id=ucfaec9e9&originHeight=369&originWidth=610&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=199521&status=done&style=none&taskId=u296b9c2e-e5a8-4b77-ac70-d26c19f6335&title=)
### 3.1.2.解析响应
响应结果的解析：
![image-20210721214221057.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880429785-63947b25-dcb9-4918-b80b-302625296177.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f6ef&clientId=ufbeed8c6-eba3-4&from=paste&height=465&id=u5031c423&originHeight=698&originWidth=1435&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=143502&status=done&style=none&taskId=uadd2bbf6-a613-4f23-b280-0880f7108c1&title=&width=956.6666666666666)
![](assets/image-20210721214221057.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=lpyCz&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- `hits`：命中的结果 
   - `total`：总条数，其中的value是具体的总条数值
   - `max_score`：所有结果中得分最高的文档的相关性算分
   - `hits`：搜索结果的文档数组，其中的每个文档都是一个json对象 
      - `_source`：文档中的原始数据，也是json对象

因此，我们解析响应结果，就是逐层解析JSON字符串，流程如下：

- `SearchHits`：通过response.getHits()获取，就是JSON中的最外层的hits，代表命中的结果 
   - `SearchHits#getTotalHits().value`：获取总条数信息
   - `SearchHits#getHits()`：获取SearchHit数组，也就是文档数组 
      - `SearchHit#getSourceAsString()`：获取文档结果中的_source，也就是原始的json文档数据
### 3.1.3.完整代码
完整代码如下：
```java
@Test
void testMatchAll() throws IOException {
    // 1.准备Request
    SearchRequest request = new SearchRequest("hotel");
    // 2.准备DSL
    request.source()
        .query(QueryBuilders.matchAllQuery());
    // 3.发送请求
    SearchResponse response = client.search(request, RequestOptions.DEFAULT);

    // 4.解析响应
    handleResponse(response);
}

private void handleResponse(SearchResponse response) {
    // 4.解析响应
    SearchHits searchHits = response.getHits();
    // 4.1.获取总条数
    long total = searchHits.getTotalHits().value;
    System.out.println("共搜索到" + total + "条数据");
    // 4.2.文档数组
    SearchHit[] hits = searchHits.getHits();
    // 4.3.遍历
    for (SearchHit hit : hits) {
        // 获取文档source
        String json = hit.getSourceAsString();
        // 反序列化
        HotelDoc hotelDoc = JSON.parseObject(json, HotelDoc.class);
        System.out.println("hotelDoc = " + hotelDoc);
    }
}
```

- 代码和DSL语句映射关系

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680332204829-1ce66a13-83af-4398-ba7e-8e97e16f1d0e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfaf8&clientId=u6f51b92f-82f1-4&from=paste&height=547&id=u06cde429&originHeight=821&originWidth=1679&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=189827&status=done&style=none&taskId=ude46496d-71da-4f6f-aee4-e8b06bd4bf8&title=&width=1119.3333333333333)
### 3.1.4.小结
查询的基本步骤是：

1.  创建SearchRequest对象 
2.  准备Request.source()，也就是DSL。
① QueryBuilders来构建查询条件
② 传入Request.source() 的 query() 方法 
3.  发送请求，得到结果 
4.  解析结果（参考JSON结果，从外到内，逐层解析） 
## 3.2.match查询
全文检索的match和multi_match查询与match_all的API基本一致。差别是查询条件，也就是query的部分。
![](assets/image-20210721215923060.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=vbuUl&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
因此，Java代码上的差异主要是request.source().query()中的参数了。同样是利用QueryBuilders提供的方法：
![image-20210721215843099.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880477166-2553613b-24b5-4a0c-a7d2-0cdf39471fac.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4f8ef&clientId=ufbeed8c6-eba3-4&from=paste&height=107&id=ue93cf8b5&originHeight=160&originWidth=717&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=17366&status=done&style=none&taskId=uf36d6bea-4707-4bf5-940d-04f82034298&title=&width=478)
而结果解析代码则完全一致，可以抽取并共享。完整代码如下：
```java
@Test
void testMatch() throws IOException {
    // 1.准备Request
    SearchRequest request = new SearchRequest("hotel");
    // 2.准备DSL
    request.source()
        .query(QueryBuilders.matchQuery("all", "如家"));
    // 3.发送请求
    SearchResponse response = client.search(request, RequestOptions.DEFAULT);
    // 4.解析响应
    handleResponse(response);

}
```
## 3.3.精确查询
精确查询主要是两者：

- term：词条精确匹配
- range：范围查询

与之前的查询相比，差异同样在查询条件，其它都一样。查询条件构造的API如下：
![image-20210721220305140.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880511240-b1dba5c5-f8d9-484d-9016-a39dab6bbd2d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f8f0&clientId=ufbeed8c6-eba3-4&from=paste&height=107&id=u4cc6729f&originHeight=160&originWidth=643&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=15759&status=done&style=none&taskId=ub80fd6d5-7ce1-4a14-9c58-d595269bbff&title=&width=428.6666666666667)
## 3.4.布尔查询
布尔查询是用must、must_not、filter等方式组合其它查询，代码示例如下：
![image-20210721220927286.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880526023-0405d770-23a0-4ce6-a08f-26bd05b3a667.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f4ef&clientId=ufbeed8c6-eba3-4&from=paste&height=351&id=u4836f0db&originHeight=527&originWidth=1472&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=88625&status=done&style=none&taskId=uf5bf5ecc-811e-46d1-b7f2-97f23a470cb&title=&width=981.3333333333334)
可以看到，API与其它查询的差别同样是在查询条件的构建，QueryBuilders，结果解析等其他代码完全不变。完整代码如下：
```java
@Test
void testBool() throws IOException {
    // 1.准备Request
    SearchRequest request = new SearchRequest("hotel");
    // 2.准备DSL
    // 2.1.准备BooleanQuery
    BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
    // 2.2.添加term
    boolQuery.must(QueryBuilders.termQuery("city", "杭州"));
    // 2.3.添加range
    boolQuery.filter(QueryBuilders.rangeQuery("price").lte(250));

    request.source().query(boolQuery);
    // 3.发送请求
    SearchResponse response = client.search(request, RequestOptions.DEFAULT);
    // 4.解析响应
    handleResponse(response);

}
```
会发现查不到数据，可以把城市换成：上海，价格2000，再试试就有数据返回了
## 3.5.排序、分页
搜索结果的排序和分页是与query同级的参数，因此同样是使用request.source()来设置。对应的API如下：
![image-20210721221121266.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880560898-7b133e18-8f3e-4651-ad8f-f227bfa0f2b3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4f6f1&clientId=ufbeed8c6-eba3-4&from=paste&height=293&id=u84bc9e66&originHeight=440&originWidth=1456&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66297&status=done&style=none&taskId=ue28881cd-37ce-43fe-a615-b79a73c7beb&title=&width=970.6666666666666)
完整代码示例：
```java
@Test
void testPageAndSort() throws IOException {
    // 页码，每页大小
    int page = 1, size = 5;

    // 1.准备Request
    SearchRequest request = new SearchRequest("hotel");
    // 2.准备DSL
    // 2.1.query
    request.source().query(QueryBuilders.matchAllQuery());
    // 2.2.排序 sort
    request.source().sort("price", SortOrder.ASC);
    // 2.3.分页 from、size
    request.source().from((page - 1) * size).size(5);
    // 3.发送请求
    SearchResponse response = client.search(request, RequestOptions.DEFAULT);
    // 4.解析响应
    handleResponse(response);

}
```
## 3.6.高亮
高亮的代码与之前代码差异较大，有两点：

- 查询的DSL：其中除了查询条件，还需要添加高亮条件，同样是与query同级。
- 结果解析：结果除了要解析_source文档数据，还要解析高亮结果
### 3.6.1.高亮请求构建
高亮请求的构建API如下：
![image-20210721221744883.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880592979-9a325090-a53e-4627-81ca-c385a3840dd0.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6f9f3&clientId=ufbeed8c6-eba3-4&from=paste&height=369&id=uf41b93b3&originHeight=553&originWidth=1435&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=62535&status=done&style=none&taskId=u82ae8430-37f1-4c19-ad9d-808d69217c5&title=&width=956.6666666666666)
上述代码省略了查询条件部分，但是大家不要忘了：高亮查询**必须使用全文检索查询，并且要有搜索关键字**，将来才可以对关键字高亮。完整代码如下：
```java
@Test
void testHighlight() throws IOException {
    // 1.准备Request
    SearchRequest request = new SearchRequest("hotel");
    // 2.准备DSL
    // 2.1.query
    request.source().query(QueryBuilders.matchQuery("all", "如家"));
    // 2.2.高亮
    request.source().highlighter(new HighlightBuilder().field("name").requireFieldMatch(false));
    // 3.发送请求
    SearchResponse response = client.search(request, RequestOptions.DEFAULT);
    // 4.解析响应
    handleResponse(response);

}
```
### 3.6.2.高亮结果解析
高亮的结果与查询的文档结果默认是分离的，并不在一起。
![image-20210721222057212.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880613211-63260638-29d1-4378-97ff-5507c5f70cf1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f3ec&clientId=ufbeed8c6-eba3-4&from=paste&height=457&id=ufd46b7cb&originHeight=685&originWidth=1486&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=163086&status=done&style=none&taskId=u1f6dc4d9-cd06-4489-8faa-863e94b3136&title=&width=990.6666666666666)
因此解析高亮的代码需要额外处理：
代码解读：

- 第一步：从结果中获取source。hit.getSourceAsString()，这部分是非高亮结果，json字符串。还需要反序列为HotelDoc对象
- 第二步：获取高亮结果。hit.getHighlightFields()，返回值是一个Map，key是高亮字段名称，值是HighlightField对象，代表高亮值
- 第三步：从map中根据高亮字段名称，获取高亮字段值对象HighlightField
- 第四步：从HighlightField中获取Fragments，并且转为字符串。这部分就是真正的高亮字符串了
- 第五步：用高亮的结果替换HotelDoc中的非高亮结果

完整代码如下：
```java
private void handleResponse(SearchResponse response) {
    // 4.解析响应
    SearchHits searchHits = response.getHits();
    // 4.1.获取总条数
    long total = searchHits.getTotalHits().value;
    System.out.println("共搜索到" + total + "条数据");
    // 4.2.文档数组
    SearchHit[] hits = searchHits.getHits();
    // 4.3.遍历
    for (SearchHit hit : hits) {
        // 获取文档source
        String json = hit.getSourceAsString();
        // 反序列化
        HotelDoc hotelDoc = JSON.parseObject(json, HotelDoc.class);
        // 获取高亮结果
        Map<String, HighlightField> highlightFields = hit.getHighlightFields();
        if (!CollectionUtils.isEmpty(highlightFields)) {
            // 根据字段名获取高亮结果
            HighlightField highlightField = highlightFields.get("name");
            if (highlightField != null) {
                // 获取高亮值（这里获取真正的key对应的高亮返回值）
                String name = highlightField.getFragments()[0].string();
                // 覆盖非高亮结果
                hotelDoc.setName(name);
            }
        }
        System.out.println("hotelDoc = " + hotelDoc);
    }
}
```
# 4.黑马旅游案例
下面，我们通过黑马旅游的案例来实战演练下之前学习的知识。我们实现四部分功能：

- 酒店搜索和分页
- 酒店结果过滤
- 酒店竞价排名

启动我们提供的hotel-demo项目，其默认端口是8089，访问http://localhost:8090，就能看到项目页面了：
![image-20210721223159598.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880642361-a16d36fa-050b-4c65-9d7a-8cc16187fd70.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbf9f6&clientId=ufbeed8c6-eba3-4&from=paste&height=461&id=ud4a75f47&originHeight=692&originWidth=1477&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=339603&status=done&style=none&taskId=u346dc74f-4901-411b-9c30-46942fe3028&title=&width=984.6666666666666)
## 4.1.酒店搜索和分页
案例需求：实现黑马旅游的酒店搜索功能，完成关键字搜索和分页
启动项目后访问：[http://localhost:8089/](http://localhost:8089/)
### 4.1.1.需求分析
在项目的首页，有一个大大的搜索框，还有分页按钮：
![image-20210721223859419.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880660275-5474cb0e-b879-48aa-904a-793cc85b4b71.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf9f8&clientId=ufbeed8c6-eba3-4&from=paste&id=uc03f4904&originHeight=245&originWidth=861&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=45051&status=done&style=none&taskId=u40cc522f-b124-4a0a-a98b-cb634d0fd31&title=)
点击搜索按钮，可以看到浏览器控制台发出了请求：
![image-20210721224033789.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880672691-736a4e42-adae-4884-ab3c-4145e5c6352b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4f4f4&clientId=ufbeed8c6-eba3-4&from=paste&id=u1d0690dd&originHeight=220&originWidth=641&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47778&status=done&style=none&taskId=u6fa03d8c-6584-4ce5-9f85-8c12afa055d&title=)
请求参数如下：
![image-20210721224112708.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880677348-4f960a3b-e7d0-4779-9ac2-e6aea15cbdfb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_20%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdfdfd&clientId=ufbeed8c6-eba3-4&from=paste&id=u9683da32&originHeight=204&originWidth=695&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=28171&status=done&style=none&taskId=ub6d69f99-680f-4cd5-9318-b62bdcaa508&title=)
由此可以知道，我们这个请求的信息如下：

- 请求方式：POST
- 请求路径：/hotel/list
- 请求参数：JSON对象，包含4个字段： 
   - key：搜索关键字
   - page：页码
   - size：每页大小
   - sortBy：排序，目前暂不实现
- 返回值：分页查询，需要返回分页结果PageResult，包含两个属性： 
   - `total`：总条数
   - `List<HotelDoc>`：当前页的数据

因此，我们实现业务的流程如下：

- 步骤一：定义实体类，接收请求参数的JSON对象
- 步骤二：编写controller，接收页面的请求
- 步骤三：编写业务实现，利用RestHighLevelClient实现搜索、分页
### 4.1.2.定义实体类
实体类有两个，一个是前端的请求参数实体，一个是服务端应该返回的响应结果实体。
1）请求参数
前端请求的json结构如下：
```json
{
    "key": "搜索关键字",
    "page": 1,
    "size": 3,
    "sortBy": "default"
}
```
因此，我们在`cn.itcast.hotel.pojo`包下定义一个实体类：
```java
package cn.itcast.hotel.pojo;

import lombok.Data;

@Data
public class RequestParams {
    private String key;
    private Integer page;
    private Integer size;
    private String sortBy;
}
```
2）返回值
分页查询，需要返回分页结果PageResult，包含两个属性：

- `total`：总条数
- `List<HotelDoc>`：当前页的数据

因此，我们在`cn.itcast.hotel.pojo`中定义返回结果：
```java
package cn.itcast.hotel.pojo;

import lombok.Data;

import java.util.List;

@Data
public class PageResult {
    private Long total;
    private List<HotelDoc> hotels;

    public PageResult() {
    }

    public PageResult(Long total, List<HotelDoc> hotels) {
        this.total = total;
        this.hotels = hotels;
    }
}
```
### 4.1.3.定义controller
定义一个HotelController，声明查询接口，满足下列要求：

- 请求方式：Post
- 请求路径：/hotel/list
- 请求参数：对象，类型为RequestParam
- 返回值：PageResult，包含两个属性 
   - `Long total`：总条数
   - `List<HotelDoc> hotels`：酒店数据

因此，我们在`cn.itcast.hotel.web`中定义HotelController：
```java
@RestController
@RequestMapping("/hotel")
public class HotelController {

    @Autowired
    private IHotelService hotelService;
	// 搜索酒店数据
    @PostMapping("/list")
    public PageResult search(@RequestBody RequestParams params){
        return hotelService.search(params);
    }
}
```
### 4.1.4.实现搜索业务
我们在controller调用了IHotelService，并没有实现该方法，因此下面我们就在IHotelService中定义方法，并且去实现业务逻辑。
1）在`cn.itcast.hotel.service`中的`IHotelService`接口中定义一个方法：
```java
/**
 * 根据关键字搜索酒店信息
 * @param params 请求参数对象，包含用户输入的关键字 
 * @return 酒店文档列表
 */
PageResult search(RequestParams params);
```
2）实现搜索业务，肯定离不开RestHighLevelClient，我们需要把它注册到Spring中作为一个Bean。在`cn.itcast.hotel`中的`HotelDemoApplication`中声明这个Bean：(注意更改IP)
```java
@Bean
public RestHighLevelClient client(){
    return  new RestHighLevelClient(RestClient.builder(
        HttpHost.create("http://192.168.150.101:9200")
    ));
}
```
3）在`cn.itcast.hotel.service.impl`中的`HotelService`中实现search方法：
```java
@Override
public PageResult search(RequestParams params) {
    try {
        // 1.准备Request
        SearchRequest request = new SearchRequest("hotel");
        // 2.准备DSL
        // 2.1.query
        String key = params.getKey();
        // 为空查全部，不为空做指定字段查询
        if (key == null || "".equals(key)) {
            request.source().query(QueryBuilders.matchAllQuery());
        } else {
            request.source().query(QueryBuilders.matchQuery("all", key));
        }

        // 2.2.分页
        int page = params.getPage();
        int size = params.getSize();
        request.source().from((page - 1) * size).size(size);

        // 3.发送请求
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        // 4.解析响应
        return handleResponse(response);
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}

// 结果解析
private PageResult handleResponse(SearchResponse response) {
    // 4.解析响应
    SearchHits searchHits = response.getHits();
    // 4.1.获取总条数
    long total = searchHits.getTotalHits().value;
    // 4.2.文档数组
    SearchHit[] hits = searchHits.getHits();
    // 4.3.遍历
    List<HotelDoc> hotels = new ArrayList<>();
    for (SearchHit hit : hits) {
        // 获取文档source
        String json = hit.getSourceAsString();
        // 反序列化
        HotelDoc hotelDoc = JSON.parseObject(json, HotelDoc.class);
		// 放入集合
        hotels.add(hotelDoc);
    }
    // 4.4.封装返回
    return new PageResult(total, hotels);
}
```
4）重启项目后访问，发现搜索结果会出来，同时分页信息也产生了变化
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680337639209-440bc77d-6a92-413f-9fef-a0f9ce9443b4.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23c89666&clientId=u6f51b92f-82f1-4&from=paste&height=599&id=ub7971169&originHeight=898&originWidth=1909&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=262309&status=done&style=none&taskId=u797cb63f-10f8-4ba6-9984-2ea627ffc9a&title=&width=1272.6666666666667)
## 4.2.酒店结果过滤
需求：添加品牌、城市、星级、价格等过滤功能
### 4.2.1.需求分析
在页面搜索框下面，会有一些过滤项：
![image-20210722091940726.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880828944-714fd398-290f-41ac-af39-441ce29f2ba2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf9f8&clientId=ufbeed8c6-eba3-4&from=paste&height=153&id=u2c4b2622&originHeight=230&originWidth=913&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=43651&status=done&style=none&taskId=ub0a8e82e-3148-433a-8f03-d66f56a1334&title=&width=608.6666666666666)
![](assets/image-20210722091940726.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=deJq1&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image-20210722092051994.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880833404-4bc7ad44-49fe-406c-8c38-6fa4c3f5bb89.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_10%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfbfb&clientId=ufbeed8c6-eba3-4&from=paste&height=255&id=ueed5f110&originHeight=383&originWidth=354&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47603&status=done&style=none&taskId=ude9179bb-f66d-41ee-bf16-0d4a500aff3&title=&width=236)
![](assets/image-20210722092051994.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=utKyM&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- brand：品牌值
- city：城市
- minPrice~maxPrice：价格范围
- starName：星级

我们需要做两件事情：

- 修改请求参数的对象RequestParams，接收上述参数
- 修改业务逻辑，在搜索条件之外，添加一些过滤条件
### 4.2.2.修改实体类
修改在`cn.itcast.hotel.pojo`包下的实体类RequestParams：
```java
@Data
public class RequestParams {
    private String key;
    private Integer page;
    private Integer size;
    private String sortBy;
    // 下面是新增的过滤条件参数
    private String city;
    private String brand;
    private String starName;
    private Integer minPrice;
    private Integer maxPrice;
}
```
### 4.2.3.修改搜索业务
在HotelService的search方法中，只有一个地方需要修改：requet.source().query( ... )其中的查询条件。
在之前的业务中，只有match查询，根据关键字搜索，现在要添加条件过滤，包括：

- 品牌过滤：是keyword类型，用term查询
- 星级过滤：是keyword类型，用term查询
- 价格过滤：是数值类型，用range查询
- 城市过滤：是keyword类型，用term查询

多个查询条件组合，肯定是boolean查询来组合：

- 关键字搜索放到must中，参与算分
- 其它过滤条件放到filter中，不参与算分

因为条件构建的逻辑比较复杂，这里先封装为一个函数：
![image-20210722092935453.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678880865408-4c2f990e-c5f8-482a-81bc-96105de34994.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6faf2&clientId=ufbeed8c6-eba3-4&from=paste&height=447&id=uf3f72d4a&originHeight=670&originWidth=1163&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=237252&status=done&style=none&taskId=u13faee8c-576d-4761-b655-1e51f9386db&title=&width=775.3333333333334)
buildBasicQuery的代码如下：
```java
private void buildBasicQuery(RequestParams params, SearchRequest request) {
    // 1.构建BooleanQuery
    BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
    // 2.关键字搜索
    String key = params.getKey();
    if (key == null || "".equals(key)) {
        boolQuery.must(QueryBuilders.matchAllQuery());
    } else {
        boolQuery.must(QueryBuilders.matchQuery("all", key));
    }
    // 3.城市条件
    if (params.getCity() != null && !params.getCity().equals("")) {
        boolQuery.filter(QueryBuilders.termQuery("city", params.getCity()));
    }
    // 4.品牌条件
    if (params.getBrand() != null && !params.getBrand().equals("")) {
        boolQuery.filter(QueryBuilders.termQuery("brand", params.getBrand()));
    }
    // 5.星级条件
    if (params.getStarName() != null && !params.getStarName().equals("")) {
        boolQuery.filter(QueryBuilders.termQuery("starName", params.getStarName()));
    }
	// 6.价格
    if (params.getMinPrice() != null && params.getMaxPrice() != null) {
        boolQuery.filter(QueryBuilders
                         .rangeQuery("price")
                         .gte(params.getMinPrice())
                         .lte(params.getMaxPrice())
                        );
    }
	// 7.放入source
    request.source().query(boolQuery);
}
```


## 4.3.酒店竞价排名
需求：让指定的酒店在搜索结果中排名置顶
### 4.3.1.需求分析
要让指定酒店在搜索结果中排名置顶，效果如图：
![](assets/image-20210722100947292.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=vMCg2&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
页面会给指定的酒店添加**广告**标记。那怎样才能让指定的酒店排名置顶呢？
我们之前学习过的function_score查询可以影响算分，算分高了，自然排名也就高了。而function_score包含3个要素：

- 过滤条件：哪些文档要加分
- 算分函数：如何计算function score
- 加权方式：function score 与 query score如何运算

这里的需求是：让**指定酒店**排名靠前。因此我们需要给这些酒店添加一个标记，这样在过滤条件中就可以**根据这个标记来判断，是否要提高算分**。
比如，我们给酒店添加一个字段：isAD，Boolean类型：

- true：是广告
- false：不是广告

这样function_score包含3个要素就很好确定了：

- 过滤条件：判断isAD 是否为true
- 算分函数：我们可以用最简单暴力的weight，固定加权值
- 加权方式：可以用默认的相乘，大大提高算分

因此，业务的实现步骤包括：

1.  给HotelDoc类添加isAD字段，Boolean类型 
2.  挑选几个你喜欢的酒店，给它的文档数据添加isAD字段，值为true 
3.  修改search方法，添加function score功能，给isAD值为true的酒店增加权重 
### 4.3.2.修改HotelDoc实体
给`cn.itcast.hotel.pojo`包下的HotelDoc类添加isAD字段：
![](assets/image-20210722101908062.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=NwOjl&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
### 4.3.3.添加广告标记
接下来，我们挑几个酒店，添加isAD字段，设置为true：（注意改成自己本地DB的数据ID）
```json
POST /hotel/_update/38609
{
    "doc": {
        "isAD": true
    }
}
POST /hotel/_update/36934
{
    "doc": {
        "isAD": true
    }
}
```
修改完成可以通过命令查看是否有：isAD：true
```java
POST /hotel182/_search
{
  "query": {
    "match": {
      "id": "38609"
    }
  }
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680339969416-c71eed22-279f-43a5-a55d-6d897d43e073.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_51%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eef2f6&clientId=ua6061438-0de9-4&from=paste&height=373&id=u5f31f823&originHeight=559&originWidth=1796&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=128813&status=done&style=none&taskId=u7ecce4cb-eaa9-40db-93d0-cd8fbab3935&title=&width=1197.3333333333333)
### 4.3.4.添加算分函数查询
接下来我们就要修改查询条件了。之前是用的boolean 查询，现在要改成function_socre查询。
function_score查询结构如下：
![image-20210721191544750.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678881109769-fa471aee-492e-4d7b-bae0-3da471fbf127.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f7f0&clientId=ufbeed8c6-eba3-4&from=paste&height=371&id=u2b10b922&originHeight=556&originWidth=1409&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=132320&status=done&style=none&taskId=u2cac22bb-0e18-4808-a221-0ad3c3e8151&title=&width=939.3333333333334)
![](assets/image-20210721191544750.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=nNIHM&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image-20210722102850818.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678881122473-32843825-4b49-4495-bc34-5b013038b587.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f5ef&clientId=ufbeed8c6-eba3-4&from=paste&height=393&id=u654da748&originHeight=590&originWidth=1465&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=138840&status=done&style=none&taskId=ufc38347e-23c9-4864-8f58-f6098484bef&title=&width=976.6666666666666)
我们可以将之前写的boolean查询作为**原始查询**条件放到query中，接下来就是添加**过滤条件**、**算分函数**、**加权模式**了。所以原来的代码依然可以沿用。
修改`cn.itcast.hotel.service.impl`包下的`HotelService`类中的`buildBasicQuery`方法，添加算分函数查询：
```java
private void buildBasicQuery(RequestParams params, SearchRequest request) {
    // 1.构建BooleanQuery
    BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
    // 关键字搜索
    String key = params.getKey();
    if (key == null || "".equals(key)) {
        boolQuery.must(QueryBuilders.matchAllQuery());
    } else {
        boolQuery.must(QueryBuilders.matchQuery("all", key));
    }
    // 城市条件
    if (params.getCity() != null && !params.getCity().equals("")) {
        boolQuery.filter(QueryBuilders.termQuery("city", params.getCity()));
    }
    // 品牌条件
    if (params.getBrand() != null && !params.getBrand().equals("")) {
        boolQuery.filter(QueryBuilders.termQuery("brand", params.getBrand()));
    }
    // 星级条件
    if (params.getStarName() != null && !params.getStarName().equals("")) {
        boolQuery.filter(QueryBuilders.termQuery("starName", params.getStarName()));
    }
    // 价格
    if (params.getMinPrice() != null && params.getMaxPrice() != null) {
        boolQuery.filter(QueryBuilders
                         .rangeQuery("price")
                         .gte(params.getMinPrice())
                         .lte(params.getMaxPrice())
                        );
    }

    // 2.算分控制
    FunctionScoreQueryBuilder functionScoreQuery =
        QueryBuilders.functionScoreQuery(
        // 原始查询，相关性算分的查询
        boolQuery,
        // function score的数组
        new FunctionScoreQueryBuilder.FilterFunctionBuilder[]{
            // 其中的一个function score 元素
            new FunctionScoreQueryBuilder.FilterFunctionBuilder(
                // 过滤条件
                QueryBuilders.termQuery("isAD", true),
                // 算分函数
                ScoreFunctionBuilders.weightFactorFunction(10)
            )
        });
    request.source().query(functionScoreQuery);
}
```
运行项目之后，可以发现上面ID被修改过的数据，优先排在前面
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680340116058-bf48e55d-b671-43f8-8088-0ec872592cf9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23857d69&clientId=ua6061438-0de9-4&from=paste&height=193&id=ub58a885d&originHeight=289&originWidth=1762&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=133265&status=done&style=none&taskId=ue90d7460-4dd8-4626-aaec-8d2ee9f2126&title=&width=1174.6666666666667)
### 4.3.5.添加排序
排序相对比较简单，注意它是跟query同级的，所以我们不放在封装的：buildBasicQuery 中，而是与其保持平级，代码如下：
```java
if (StringUtils.isNotBlank(params.getSortBy()) 
    && !StringUtils.equals("default", params.getSortBy())) {
    request.source().sort(params.getSortBy(), SortOrder.DESC);
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680340851977-7d49abcc-cbb7-435c-892e-a722a91fb6cc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdfaf7&clientId=ua6061438-0de9-4&from=paste&height=339&id=uf44dde81&originHeight=509&originWidth=1585&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=63008&status=done&style=none&taskId=u133fa866-d601-419a-b376-111fb05c28c&title=&width=1056.6666666666667)重启工程后，可以点击测试：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680340905221-13c1dfbc-f24d-4609-805a-fcd6be7a6466.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f5f1&clientId=ua6061438-0de9-4&from=paste&height=533&id=ud5df51d0&originHeight=800&originWidth=1510&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=250352&status=done&style=none&taskId=u6a9d4652-41b9-422a-827e-a94ec09cdcc&title=&width=1006.6666666666666)
### 4.3.6.添加高亮
高亮的技术实现与我们单测一模一样，分别是：

- 与query平级的高亮处理（因为高亮不影响数据结果集大小，所以放在哪里都可以）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680341264805-f21c5b18-eb82-4641-af8e-d9cd5f310c53.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfaf8&clientId=ua6061438-0de9-4&from=paste&height=491&id=u7c35d6aa&originHeight=737&originWidth=1412&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=92710&status=done&style=none&taskId=udf80eec1-1e00-4417-833b-d43796e83d6&title=&width=941.3333333333334)
```java
@Override
public PageResult search(RequestParams params) {
    try {
        // 1-准备请求
        SearchRequest request = new SearchRequest("hotel182");

        // 2-准备DSL语句
        // 2.1-基础查询
        buildBasicQuery(params, request);

        // 2.2 排序
        if (StringUtils.isNotBlank(params.getSortBy()) && !StringUtils.equals("default", params.getSortBy())) {
            request.source().sort(params.getSortBy(), SortOrder.DESC);
        }

        // 2.3-分页
        request.source().from((params.getPage() - 1) * params.getSize()).size(params.getSize());

        // 2.4-高亮
        request.source().highlighter(new HighlightBuilder()
                .field("name")
                .requireFieldMatch(false));

        // 3-发送请求
        SearchResponse search = restHighLevelClient.search(request, RequestOptions.DEFAULT);

        // 4-解析结果
        return handleResponse(search);
    } catch (IOException e) {
        e.printStackTrace();
        throw new RuntimeException("系统异常，请联系管理员");
    }
}
```

- 返回结果处理，重新设置name属性

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680341283892-7a08e199-ad94-417b-9dd4-9fb309538f46.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3e8cd&clientId=ua6061438-0de9-4&from=paste&height=457&id=u87164110&originHeight=686&originWidth=1246&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=99450&status=done&style=none&taskId=u0a8cecad-68ec-43db-865d-1aba71c258c&title=&width=830.6666666666666)
```java
private PageResult handleResponse(SearchResponse searchResponse) {

    // 0-实例化返回结果
    PageResult result = new PageResult();

    // 1- 拿到最外层hits
    SearchHits hits = searchResponse.getHits();

    // 2-循环遍历内层hits
    List<HotelDoc> hotelDocList = new ArrayList<>();
    for (SearchHit hit : hits) {
        // 3-获取每一个里面的souce
        String sourceJson = hit.getSourceAsString();
        // 4-输出source转换成HotelDoc
        HotelDoc hotelDoc = JSON.parseObject(sourceJson, HotelDoc.class);
        // 5-获取高亮数据
        Map<String, HighlightField> highlightFields = hit.getHighlightFields();
        if (null != highlightFields && highlightFields.containsKey("name")) {
            String name = highlightFields.get("name").getFragments()[0].string();
            hotelDoc.setName(name);
        }

        hotelDocList.add(hotelDoc);
    }

    result.setTotal(hits.getTotalHits().value);
    result.setHotels(hotelDocList);

    return result;
}
```
