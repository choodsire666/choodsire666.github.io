**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)

Redis的中文文档：[中文文档](http://www.redis.cn/commands.html)
菜鸟教程官网：[菜鸟教程](https://www.runoob.com/redis/redis-keys.html)
## 1 Redis数据结构介绍
**Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854200739-f856afa6-e264-43ab-9f73-e147ea20098b.png#averageHue=%23edd5ac&clientId=u0575c434-da09-4&height=429&id=A0tuZ&originHeight=543&originWidth=1047&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u29095f1a-0225-4fa4-964b-f3cd3585f07&title=&width=828)
## 2 通用命令
**通用指令是部分数据类型的，都可以使用的指令，常见的有如下表格所示**

| 指令 | 描述 |
| --- | --- |
| KEYS | 查看符合模板的所有key，不建议在生产环境设备上使用 |
| DEL | 删除一个指定的key |
| EXISTS | 判断key是否存在 |
| EXPIRE | 给一个key设置有效期，有效期到期时该key会被自动删除 |
| TTL | 查看一个KEY的剩余有效期 |

**可以通过**`**help [command]**`**可以查看一个命令的具体用法！	**

## 3 String类型
**String类型，也就是字符串类型，是Redis中最简单的存储类型。**
其value是字符串，不过根据字符串的格式不同，又可以分为3类：

- `**string**`：普通字符串
- `**int**`：整数类型，可以做自增、自减操作
- `**float**`：浮点类型，可以做自增、自减操作

不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同。字符串类型的最大空间不能超过**512m**.

| **KEY** | **VALUE** |
| --- | --- |
| msg | hello world |
| num | 10 |
| score | 92.5 |

String的常见命令有如下表格所示:

| 命令 | 描述 |
| --- | --- |
| SET | 添加或者修改已经存在的一个String类型的键值对 |
| GET | 根据key获取String类型的value |
| MSET | 批量添加多个String类型的键值对 |
| MGET | 根据多个key获取多个String类型的value |
| INCR | 让一个整型的key自增1 |
| INCRBY | 让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2 |
| INCRBYFLOAT | 让一个浮点类型的数字自增并指定步长 |
| SETNX | 添加一个String类型的键值对，前提是这个key不存在，否则不执行 |
| SETEX | 添加一个String类型的键值对，并且指定有效期 |

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22334924/1666165318719-fee61104-55a3-4d60-bea9-cc9f406f2167.png#averageHue=%23faf9f9&clientId=ue3768dcb-f79a-4&errorMessage=unknown%20error&from=paste&height=481&id=u7796f9ba&originHeight=539&originWidth=950&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59152&status=error&style=none&taskId=u90be7044-087d-42b5-84ac-74d14c95128&title=&width=847)
Redis的key允许有多个单词形成层级结构，多个单词之间用” ：“隔开，格式如下：
```java
项目名:业务名:类型:id
```
这个格式并非固定，也可以根据自己的需求来删除或添加词条。
例如我们的项目名称叫 `heima`，有`user`和`product`两种不同类型的数据，我们可以这样定义key：

- **user**相关的key：`heima:user:1`
- **product**相关的key：`heima:product:1`

如果Value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储

| KEY | VALUE |
| --- | --- |
| heima:user:1 | {"id":1, "name": "Jack", "age": 21} |
| heima:product:1 | {"id":1, "name": "小米11", "price": 4999} |

## 3 Hash类型
**Hash类型，也叫散列，其value是一个无序字典，类似于Java中的**`**HashMap**`**结构。**
**Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD**  
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664282986775-bc7d8041-c918-4c4a-93f1-160174f81026.png#averageHue=%23f5f4f4&clientId=u3f6f68b3-9d6e-4&errorMessage=unknown%20error&id=ZDlCe&originHeight=296&originWidth=693&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9f86e3d3-892f-46c8-ac79-4cb3da964b6&title=)

**Hash的常见命令有：**  

| 命令 | 描述 |
| --- | --- |
| HSET key field value | 添加或者修改hash类型key的field的值 |
| HGET key field | 获取一个hash类型key的field的值 |
| HMSET | hmset 和 hset 效果相同 ，4.0之后hmset可以弃用了 |
| HMGET | 批量获取多个hash类型key的field的值 |
| HGETALL | 获取一个hash类型的key中的所有的field和value |
| HKEYS | 获取一个hash类型的key中的所有的field |
| HVALS | 获取一个hash类型的key中的所有的value |
| HINCRBY | 让一个hash类型key的字段值自增并指定步长 |
| HSETNX | 添加一个hash类型的key的field值，前提是这个field不存在，否则不执行 |

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22334924/1666166325919-d9de2b80-979a-4017-904e-2a06fd1fe21f.png#averageHue=%23f4f4f4&clientId=ua4f21d2c-f18d-4&errorMessage=unknown%20error&from=paste&height=647&id=u6657c10b&originHeight=351&originWidth=327&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21337&status=error&style=none&taskId=u34dc3e49-7875-4540-8bcf-13f8d482536&title=&width=602.5)
## 4 List类型
**Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。**
**特征也与**`**LinkedList**`**类似：**

- 有序
- 元素可以重复
- 插入和删除快
- 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等.
List的常见命令有:

| 命令 | 描述 |
| --- | --- |
| LPUSH key  element ... | 向列表左侧插入一个或多个元素 |
| LPOP key | 移除并返回列表左侧的第一个元素，没有则返回nil |
| RPUSH key  element ... | 向列表右侧插入一个或多个元素 |
| RPOP key | 移除并返回列表右侧的第一个元素 |
| LRANGE key star end | 返回一段角标范围内的所有元素 |
| BLPOP和BRPOP | 与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil |

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22334924/1666166764668-e6ca1ad1-9e77-4f74-a728-68f78c724b87.png#averageHue=%23f4f4f4&clientId=u1d46ae95-ac9c-4&from=paste&height=464&id=u7b82eb20&originHeight=335&originWidth=634&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35770&status=done&style=none&taskId=u1ab3029b-d03f-461b-a1dd-c06a315eeb2&title=&width=878)

![](https://cdn.nlark.com/yuque/0/2024/gif/29688613/1711854200653-524c552f-8409-49b7-adac-b923c025e805.gif#averageHue=%23fefefe&clientId=u0575c434-da09-4&height=156&id=Veo2l&originHeight=200&originWidth=1650&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2f7357a0-8d20-4eb8-9c6b-6e25a485a5f&title=&width=1285)
**思考：**

-  **如何利用List结构模拟一个栈?** 
   - 先进后出，入口和出口在同一边
-  **如何利用List结构模拟一个队列?** 
   - 先进先出，入口和出口在不同边
-  **如何利用List结构模拟一个阻塞队列?** 
   - 入口和出口在不同边
   - 出队时采用BLPOP或BRPOP

## 5 Set类型
**Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征**

- 无序
- 元素不可重复
- 查找快
- 支持交集、并集、差集等功能

Set的常见命令有：

| 命令 | 描述 |
| --- | --- |
| SADD key member ... | 向set中添加一个或多个元素 |
| SREM key member ... | 移除set中的指定元素 |
| SCARD key | 返回set中元素的个数 |
| SISMEMBER key member | 判断一个元素是否存在于set中 |
| SMEMBERS | 获取set中的所有元素 |
| SINTER key1 key2 ... | 求key1与key2的交集 |
| SDIFF key1 key2 ... | 求key1与key2的差集 |
| SUNION key1 key2 .. | 求key1和key2的并集 |

![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1676444319009-22a73487-27a5-4a96-87c3-10b21b8e4bce.png#averageHue=%23efefef&clientId=uf1806d59-0bb1-4&from=paste&height=156&id=ue62fbd57&originHeight=156&originWidth=550&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30106&status=done&style=none&taskId=u4dcdc8ef-a2b6-4074-8fe8-f62fd33b81b&title=&width=550)
交集、差集、并集图示：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854200803-f5c362a1-5971-4c67-a921-ce1fe31812f3.png#averageHue=%23cca772&clientId=u0575c434-da09-4&height=437&id=GhiZ9&originHeight=510&originWidth=636&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u014118f3-133c-457a-8c3c-d434cd34b73&title=&width=545)
## 6 SortedSet类型
**Redis的SortedSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。**
**SortedSet具备下列特性：**

- 可排序
- 元素不重复
- 查询速度快

因为SortedSet的可排序特性，经常被用来实现排行榜这样的功能。
SortedSet的常见命令有

| 命令 | 描述 |
| --- | --- |
| ZADD key score member | 添加一个或多个元素到sorted set ，如果已经存在则更新其score值 |
| ZREM key member | 删除sorted set中的一个指定元素 |
| ZSCORE key member | 获取sorted set中的指定元素的score值 |
| ZRANK key member | 获取sorted set 中的指定元素的排名 |
| ZCARD key | 获取sorted set中的元素个数 |
| ZCOUNT key min max | 统计score值在给定范围内的所有元素的个数 |
| ZINCRBY key increment member | 让sorted set中的指定元素自增，步长为指定的increment值 |
| ZRANGE key min max | 按照score排序后，获取指定排名范围内的元素 |
| ZRANGEBYSCORE key min max | 按照score排序后，获取指定score范围内的元素 |
| ZDIFF、ZINTER、ZUNION | 求差集、交集、并集 |

![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1676444236318-5b4ab939-85c8-4b9f-a8ea-63107bbe345a.png#averageHue=%23f1f1f1&clientId=uf1806d59-0bb1-4&from=paste&height=228&id=u4ffe44e6&originHeight=262&originWidth=678&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49600&status=done&style=none&taskId=ucda5da26-0707-4f4b-af21-f4fb15faa8a&title=&width=589)
**注意：所有的排名默认都是升序，如果要降序则在命令的Z后面添加**`**REV**`**即可**
## 8 BitMap类型
BitMap的操作命令有：

- SETBIT：向指定位置（offset）存入一个0或1
- GETBIT ：获取指定位置（offset）的bit值
- BITCOUNT ：统计BitMap中值为1的bit位的数量
- BITFIELD ：操作（查询、修改、自增）BitMap中bit数组中的指定位置（offset）的值
- BITFIELD_RO ：获取BitMap中bit数组，并以十进制形式返回
- BITOP ：将多个BitMap的结果做位运算（与 、或、异或）
- BITPOS ：查找bit数组中指定范围内第一个0或1出现的位置

![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1676447678321-45998775-0401-474a-86fd-b4d3ff8efbe4.png#averageHue=%23f5f5f5&clientId=u78fc9154-47df-4&from=paste&height=468&id=ubbc39820&originHeight=542&originWidth=1212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=152127&status=done&style=none&taskId=u5880f692-4ee2-4bc5-a4c8-1d6f0452571&title=&width=1047)
