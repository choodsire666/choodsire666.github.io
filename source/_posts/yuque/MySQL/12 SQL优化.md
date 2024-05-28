---
title: 12 SQL优化
urlname: kflrk7t7h9ozf2nk
date: '2024-03-13 17:49:07'
updated: '2024-04-15 16:07:57'
cover: ''
description: '笔记来源：黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括1 插入数据1.1 insert如果我们需要一次性往数据库表中插入多条记录，可以从以下三个方面进行优化。insert into tb_test values(1,''tom'');  inser...'
---
**笔记来源：**[**黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括**](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
## 1 插入数据
### 1.1 insert
如果我们需要一次性往数据库表中插入多条记录，可以从以下三个方面进行优化。
```plsql
insert into tb_test values(1,'tom'); 
insert into tb_test values(2,'cat'); 
insert into tb_test values(3,'jerry');
.....
```

优化方案一：批量插入数据
```plsql
Insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry');
```

优化方案二：手动控制事务
```plsql
start transaction; 
insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry'); 
insert into tb_test values(4,'Tom'),(5,'Cat'),(6,'Jerry'); 
insert into tb_test values(7,'Tom'),(8,'Cat'),(9,'Jerry'); 
commit;
```

优化方案三：主键顺序插入，性能要高于乱序插入。
```plsql
主键乱序插入 : 8 1 9 21 88 2 4 15 89 5 7 3 
主键顺序插入 : 1 2 3 4 5 7 8 9 15 21 88 89
```
### 1.2 大批量插入数据
如果一次性需要插入大批量数据(比如: 几百万的记录)，使用insert语句插入性能较低，此时可以使用MySQL数据库提供的`load`指令进行插入。操作如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015248-92fc1f45-105c-4d5f-b564-a46f9f3ec4b0.png#averageHue=%239ccc98&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=raaPI&originHeight=286&originWidth=1240&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6d1a371f-5fbf-445d-86d8-e7abaf8411c&title=)
可以执行如下指令，将数据脚本文件中的数据加载到表结构中：
```sql
-- 客户端连接服务端时，加上参数 -–local-infile 
mysql –-local-infile -u root -p 

-- 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关 
set global local_infile = 1; 

-- 执行load指令将准备好的数据，加载到表结构中 
load data local infile '/root/sql1.log' into table tb_user fields terminated by ',' lines terminated by '\n' ;
```
> 主键顺序插入性能高于乱序插入


示例演示:
A. 创建表结构
```plsql
CREATE TABLE  tb_user ( 
  id INT(11) NOT NULL AUTO_INCREMENT, 
  username VARCHAR(50) NOT NULL, 
  password VARCHAR(50) NOT NULL, 
  name VARCHAR(20) NOT NULL, 
  birthday DATE DEFAULT NULL, 
  sex CHAR(1) DEFAULT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE KEY `unique_user_username` (`username`) 
) ENGINE=INNODB DEFAULT CHARSET=utf8 ;
```

B. 设置参数
```plsql
-- 客户端连接服务端时，加上参数 -–local-infile 
mysql –-local-infile -u root -p 

-- 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关 
set global local_infile = 1;
```

C. load加载数据
```plsql
load data local infile '/root/load_user_100w_sort.sql' into table tb_user fields terminated by ',' lines terminated by '\n' ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015335-f795cad3-6e55-483e-b1d9-a397f51e685b.png#averageHue=%23243d50&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=BPCPK&originHeight=256&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9eba576b-6e0f-4fc9-ba2a-dd51d7fa7cd&title=)
我们看到，插入100w的记录，17s就完成了，性能很好。
> 在load时，主键顺序插入性能高于乱序插入


## 2 主键优化
在上一小节，我们提到，主键顺序插入的性能是要高于乱序插入的。 这一小节，就来介绍一下具体的原因，然后再分析一下主键又该如何设计。
### 2.1 数据组织方式
在InnoDB存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为索引组织表(index organized table IOT)。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015321-5ae85556-5d83-4cfc-bde0-73f75ded937d.png#averageHue=%23fbf5f0&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=GAfgS&originHeight=477&originWidth=1181&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=udf4cfad3-2efb-4e5c-b477-bc9a32d984f&title=)
行数据，都是存储在聚集索引的叶子节点上的。而我们之前也讲解过InnoDB的逻辑结构图：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015463-698ac332-c1c2-471b-975b-37156b4793ad.png#averageHue=%23d5b86d&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=NrBMK&originHeight=486&originWidth=1105&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4e8bf876-33c7-4270-8e78-37277d9f993&title=)
在InnoDB引擎中，数据行是记录在逻辑结构 page 页中的，而每一个页的大小是固定的，默认16K。那也就意味着， 一个页中所存储的行也是有限的，如果插入的数据行row在该页存储不小，将会存储到下一个页中，页与页之间会通过指针连接。

### 2.2 页分裂
页可以为空，也可以填充一半，也可以填充100%。每个页包含了2-N行数据(如果一行数据过大，会行溢出)，根据主键排列。
1）主键顺序插入效果
①. 从磁盘中申请页， 主键顺序插入
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015383-ce58cd84-cd3b-482c-904b-e9ae27b8662e.png#averageHue=%23c9e3ab&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&height=251&id=gGdcC&originHeight=340&originWidth=1021&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u050bf1e1-74c4-4e8b-8ae2-f5430b1e3e2&title=&width=753)
②. 第一个页没有满，继续往第一页插入
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015760-9510db12-7606-4bfc-b53a-52742c0b3211.png#averageHue=%23a0e098&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&height=201&id=OZTkg&originHeight=267&originWidth=1006&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ubd08ed78-44d9-4d27-9669-8c2acf062fb&title=&width=756)
③. 当第一个也写满之后，再写入第二个页，页与页之间会通过指针连接
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015894-703fbed3-77df-400d-bb9f-f87dcd27b938.png#averageHue=%23f8d9b5&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&height=194&id=qKnWh&originHeight=211&originWidth=1216&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u369c1e08-f3b3-4904-a5b0-6aa4c28a50d&title=&width=1120)
④. 当第二页写满了，再往第三页写入
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015920-dbd8cd2a-0fc6-412d-97e8-7678613893ca.png#averageHue=%23f5d8b5&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=iAZIY&originHeight=157&originWidth=1207&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4e17e327-55d4-488f-bb0e-1babe287513&title=)

2）主键乱序插入效果
①. 加入1#,2#页都已经写满了，存放了如图所示的数据
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055015946-4df01022-2914-4a9f-9f99-87ced3dc57dc.png#averageHue=%23b8eba2&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=yp7vB&originHeight=197&originWidth=1218&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u97684242-0c68-40c1-8d6d-e213205cfda&title=)
②. 此时再插入id为50的记录，我们来看看会发生什么现象，会再次开启一个页，写入新的页中吗？
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055016059-974140d1-e459-4a5a-b186-e90232f9df12.png#averageHue=%23fdf8f4&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=UxV6A&originHeight=347&originWidth=1269&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u1b5f4dc4-d985-47bf-99ab-dbb86de2662&title=)
不会。因为，索引结构的叶子节点是有顺序的。按照顺序，应该存储在47之后。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055016399-91cac889-ce1e-410e-bdb8-51688061c777.png#averageHue=%23fdfbf8&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=JPHqD&originHeight=478&originWidth=1254&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ua47aaf12-7809-429a-812d-7d624e9a47e&title=)
但是47所在的1#页，已经写满了，存储不了50对应的数据了。 那么此时会开辟一个新的页 3#。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055016562-dc32e6cd-0f61-4c7f-bec2-496ab0724bf5.png#averageHue=%23f7d8b5&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=t4y7Y&originHeight=147&originWidth=1274&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ub36d148d-4cb7-453a-84b3-d2594b4d3fd&title=)
但是并不会直接将50存入3#页，而是会将1#页后一半的数据，移动到3#页，然后在3#页，插入50。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055016627-96f87fc7-6a8b-41e5-91af-5fa1ef14607d.png#averageHue=%23f6d8b4&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=woL72&originHeight=277&originWidth=1257&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ubc21bb29-c9c6-45f3-8f5e-1030454801b&title=)
移动数据，并插入id为50的数据之后，那么此时，这三个页之间的数据顺序是有问题的。 1#的下一个页，应该是3#， 3#的下一个页是2#。 所以，此时，需要重新设置链表指针。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055016949-a8f58e1e-6352-4fbd-bf66-938923829650.png#averageHue=%23f6dab8&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=WAoaj&originHeight=173&originWidth=1248&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9595b25b-d09d-42a0-aa21-e05820724b4&title=)
上述的这种现象，称之为 "页分裂"，是比较耗费性能的操作。
### 2.3 页合并
目前表中已有数据的索引结构(叶子节点)如下：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017130-361db440-5402-4608-af14-1bb25eb85613.png#averageHue=%23f5dab8&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=Arj1D&originHeight=180&originWidth=1224&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9c9ec3c0-ce7f-4562-94f7-b0230ec4658&title=)
当我们对已有数据进行删除时，具体的效果如下:
当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记（flaged）为删除并且它的空间变得允许被其他记录声明使用。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017417-a697ff0c-24d4-4862-ad1c-889754359f3e.png#averageHue=%23f7d2a9&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=wtt9B&originHeight=155&originWidth=1212&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ufbfc058c-4f87-4870-9ad2-0aa853f9131&title=)
当我们继续删除2#的数据记录
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017302-b31c0db1-1682-447d-baab-9ed8c21ca380.png#averageHue=%23fdf6f0&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=EljOc&originHeight=220&originWidth=1208&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u91f1d5e3-f102-4270-8938-7f4ea91ccb5&title=)
当页中删除的记录达到 MERGE_THRESHOLD（默认为页的50%），InnoDB会开始寻找最靠近的页（前或后）看看是否可以将两个页合并以优化空间使用。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017352-7a1fbffc-4ac5-4cfb-b908-1176d6fe66ad.png#averageHue=%23fdf2e8&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=GDuFz&originHeight=342&originWidth=1205&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u79ff16a2-5f9b-437f-9aba-9cbc5ba8a8d&title=)
删除数据，并将页合并之后，再次插入新的数据21，则直接插入3#页
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017425-35598f34-e16f-40bd-b61b-3b65945666af.png#averageHue=%23fcf1e6&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=gReav&originHeight=159&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ucac2939f-b731-434f-a733-744cf30e8d8&title=)
这个里面所发生的合并页的这个现象，就称之为 "页合并"。
> 知识小贴士：MERGE_THRESHOLD：合并页的阈值，可以自己设置，在创建表或者创建索引时指定。


### 2.4 索引设计原则

- 满足业务需求的情况下，尽量降低主键的长度。
- 插入数据时，尽量选择顺序插入，选择使用AUTO_INCREMENT自增主键。
- 尽量不要使用UUID做主键或者是其他自然主键，如身份证号。
- 业务操作时，避免对主键的修改。

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017650-bdefe0cb-943a-4323-a3df-bf65760d9bbf.png#averageHue=%23f9f9f9&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=ccVlL&originHeight=461&originWidth=1239&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u779aa5fa-8ebc-4e07-ac58-c86e977b97e&title=)
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017639-255aeca9-bdce-4aa0-8b23-110cd81d8421.png#averageHue=%23f7f6f0&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=eCLnD&originHeight=466&originWidth=1223&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u328aa726-db75-4221-a66d-9664e3bc06d&title=)

## 3 order by优化
MySQL的排序，有两种方式：

- Using filesort : 通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区sort buffer中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序。
- Using index : 通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高。

对于以上的两种排序方式，Using index的性能高，而Using filesort的性能低，我们在优化排序操作时，尽量要优化为 Using index。接下来，我们来做一个测试：

A. 数据准备
把之前测试时，为tb_user表所建立的部分索引直接删除掉
```plsql
drop index idx_user_phone on tb_user; 
drop index idx_user_phone_name on tb_user; 
drop index idx_user_name on tb_user;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017833-f3ceb6d0-4059-4faa-bc14-fe6d56ac5fc2.png#averageHue=%23274357&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=bU3qQ&originHeight=377&originWidth=1213&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud58f0b90-d0d2-422e-82cf-fb8b5d088c6&title=)
B. 执行排序SQL
```plsql
explain select id,age,phone from tb_user order by age ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017741-b700e361-9069-4dc5-a3ab-f8121606fb6c.png#averageHue=%237f968f&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=JdQ9L&originHeight=191&originWidth=1223&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u16a4182b-6464-4522-aa97-7f680ea4369&title=)
```plsql
explain select id,age,phone from tb_user order by age, phone ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055017898-a048b3c0-7ca3-4283-a1fe-07eca5ba6dd5.png#averageHue=%23546a73&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=tRTLU&originHeight=181&originWidth=1225&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ucbaff901-6bf4-40e3-abdb-82b083e16ac&title=)
由于 age, phone 都没有索引，所以此时再排序时，出现Using filesort， 排序性能较低。

C. 创建索引
```sql
-- 创建索引 
create index idx_user_age_phone_aa on tb_user(age,phone);
```

D. 创建索引后，根据age, phone进行升序排序
```plsql
explain select id,age,phone from tb_user order by age;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018144-ec405e5d-f888-4acb-a325-066475a8a9a0.png#averageHue=%23889f9a&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=sCTwa&originHeight=185&originWidth=1218&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u8a33fd04-39ff-4fc8-a540-5c92781666c&title=)

```plsql
explain select id,age,phone from tb_user order by age , phone;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018209-9fc2f532-7f68-40cb-8581-5f160d0df23d.png#averageHue=%23526a72&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=qsRnJ&originHeight=177&originWidth=1225&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ue99c4b3d-5c1f-4d00-a213-83af87104f7&title=)
建立索引之后，再次进行排序查询，就由原来的Using filesort， 变为了 Using index，性能就是比较高的了。

E. 创建索引后，根据age, phone进行降序排序
```plsql
explain select id,age,phone from tb_user order by age desc , phone desc ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018188-6e2ca7f2-7b70-4bd7-8ef8-be0efb8dc9ec.png#averageHue=%23223a4c&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=pKu5k&originHeight=152&originWidth=1228&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u36160ac5-79e3-42ee-918a-20adf2658f8&title=)
也出现 Using index， 但是此时Extra中出现了 Backward index scan，这个代表反向扫描索引，因为在MySQL中我们创建的索引，默认索引的叶子节点是从小到大排序的，而此时我们查询排序时，是从大到小，所以，在扫描时，就是反向扫描，就会出现 Backward index scan。 在MySQL8版本中，支持降序索引，我们也可以创建降序索引。

F. 根据phone，age进行升序排序，phone在前，age在后。
```plsql
explain select id,age,phone from tb_user order by phone , age;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018530-66613c1f-a61d-4e24-aaf2-98ae5ae9d2ad.png#averageHue=%23223a4c&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=z36db&originHeight=160&originWidth=1215&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uf15a3018-3154-4dbb-b24a-b782cf28894&title=)
排序时,也需要满足最左前缀法则,否则也会出现 filesort。因为在创建索引的时候， age是第一个字段，phone是第二个字段，所以排序时，也就该按照这个顺序来，否则就会出现 Using filesort。

G. 根据age, phone进行降序一个升序，一个降序
```plsql
explain select id,age,phone from tb_user order by age asc , phone desc ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018437-ecc25e42-8a40-4bba-ba4c-ba4bd2ed1bbc.png#averageHue=%23223a4c&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=fsMum&originHeight=155&originWidth=1210&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u73dc65f8-2560-4745-9caa-2c103eaae53&title=)
因为创建索引时，如果未指定顺序，默认都是按照升序排序的，而查询时，一个升序，一个降序，此时就会出现Using filesort。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018590-9aa1e876-bdb3-43b5-967b-9d6957fd4de9.png#averageHue=%23355464&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=hJF7Z&originHeight=244&originWidth=1230&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u1c2dfcde-37f8-4743-975a-7c0b00a3369&title=)
为了解决上述的问题，我们可以创建一个索引，这个联合索引中 age 升序排序，phone 倒序排序。

H. 创建联合索引(age 升序排序，phone 倒序排序)
```plsql
create index idx_user_age_phone_ad on tb_user(age asc ,phone desc);
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018923-8b913a07-9121-464c-b551-3f3eef767469.png#averageHue=%23243e50&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=RfRoS&originHeight=252&originWidth=1206&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u8a497749-bdba-49b3-86e3-d07e5e472a8&title=)

J. 然后再次执行如下SQL
```plsql
explain select id,age,phone from tb_user order by age asc , phone desc ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055018909-9079a8cb-0025-4c96-a7f3-74ee0183d3c6.png#averageHue=%23253f50&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=RVmZf&originHeight=164&originWidth=1224&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3cfe0e43-227f-4b6b-b8a8-dad575840d6&title=)
升序/降序联合索引结构图示:
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055019213-7c934ef8-e019-49b7-bfbe-000cd4abee7d.png#averageHue=%23fbf3ee&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=FN88i&originHeight=199&originWidth=1174&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ud975c3f5-4738-41ba-b10e-0059af5b407&title=)
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055019349-6b117576-b02f-459a-b436-6a3c38fce7b6.png#averageHue=%23fbf3ef&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=uEEzg&originHeight=218&originWidth=1223&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u1ca1de32-9ea0-47ea-b585-359ee593500&title=)
由上述的测试,我们得出order by优化原则:

- A. 根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则。
- B. 尽量使用覆盖索引。
- C. 多字段排序, 一个升序一个降序，此时需要注意联合索引在创建时的规则（ASC/DESC）。
- D. 如果不可避免的出现filesort，大数据量排序时，可以适当增大排序缓冲区大小sort_buffer_size(默认256k)。
## 4 group by优化
分组操作，我们主要来看看索引对于分组操作的影响。
```plsql
drop index idx_user_pro_age_sta on tb_user; 
drop index idx_email_5 on tb_user; 
drop index idx_user_age_phone_aa on tb_user; 
drop index idx_user_age_phone_ad on tb_user;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055019511-2ddb3aa4-8645-43f6-b408-dd3a587c02fc.png#averageHue=%237f9592&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=Uuy84&originHeight=172&originWidth=1214&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uf2fa2d15-df5a-4cec-a792-3441fe85e9d&title=)
接下来，在没有索引的情况下，执行如下SQL，查询执行计划：
```plsql
explain select profession , count(*) from tb_user group by profession ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055019483-5f3fdea2-0b50-4364-af8d-551c8c5e2c80.png#averageHue=%237c8b84&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=Fx4E1&originHeight=156&originWidth=1224&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u47cdaf90-609e-405c-999a-dad573fcc8b&title=)
然后，我们在针对于 profession ， age， status 创建一个联合索引。
```plsql
create index idx_user_pro_age_sta on tb_user(profession , age , status);
```

紧接着，再执行前面相同的SQL查看执行计划。
```plsql
explain select profession , count(*) from tb_user group by profession ;
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055019721-b4c3e10f-1f1d-46ef-a836-40190b182fd6.png#averageHue=%23233c4e&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=Yy0vB&originHeight=171&originWidth=1219&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4f0992d0-d29c-4a35-8319-0f9aedf324f&title=)
再执行如下的分组查询SQL，查看执行计划：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055019729-c61af753-44a5-4c15-9d7f-41fcd3387cdf.png#averageHue=%23284557&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=VfncH&originHeight=324&originWidth=1212&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ubc096cda-51d9-4750-9323-c449cbc50ad&title=)
我们发现，如果仅仅根据age分组，就会出现 Using temporary ；而如果是 根据profession,age两个字段同时分组，则不会出现 Using temporary。原因是因为对于分组操作，在联合索引中，也是符合最左前缀法则的。

所以，在分组操作中，我们需要通过以下两点进行优化，以提升性能：

- A. 在分组操作时，可以通过索引来提高效率。
- B. 分组操作时，索引的使用也是满足最左前缀法则的。
## 5 limit优化
在数据量比较大时，如果进行limit分页查询，在查询时，越往后，分页查询效率越低。
我们一起来看看执行limit分页查询耗时对比：
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055019891-386639f4-06d2-41f5-989b-155014307dd0.png#averageHue=%23848a89&clientId=ube2fb6bf-1489-4&errorMessage=unknown%20error&id=J14jl&originHeight=305&originWidth=1231&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u0c69c7ec-f5eb-4b1f-847d-434d6ab918e&title=)
通过测试我们会看到，越往后，分页查询效率越低，这就是分页查询的问题所在。

因为，当在进行分页查询时，如果执行 limit 2000000,10 ，此时需要MySQL排序前2000010 记录，仅仅返回 2000000 - 2000010 的记录，其他记录丢弃，查询排序的代价非常大 。
优化思路: 一般分页查询时，通过创建 覆盖索引 能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化。
```plsql
explain select * from tb_sku t , (select id from tb_sku order by id limit 2000000,10) a where t.id = a.id;
```
## 6 count优化
### 6.1 概述
```plsql
select count(*) from tb_user ;
```
在之前的测试中，我们发现，如果数据量很大，在执行count操作时，是非常耗时的。

- MyISAM 引擎把一个表的总行数存在了磁盘上，因此执行 count(*) 的时候会直接返回这个数，效率很高； 但是如果是带条件的count，MyISAM也慢。
- InnoDB 引擎就麻烦了，它执行 count(*) 的时候，需要把数据一行一行地从引擎里面读出来，然后累积计数。

如果说要大幅度提升InnoDB表的count效率，主要的优化思路：自己计数(可以借助于redis这样的数据库进行,但是如果是带条件的count又比较麻烦了)。

### 6.2 count用法
count() 是一个聚合函数，对于返回的结果集，一行行地判断，如果 count 函数的参数不是NULL，累计值就加 1，否则不加，最后返回累计值。
用法：count（*）、count（主键）、count（字段）、count（数字）

| count用法 | 含义 |
| --- | --- |
| count(主键) | InnoDB 引擎会遍历整张表，把每一行的 主键id 值都取出来，返回给服务层。服务层拿到主键后，直接按行进行累加(主键不可能为null) |
| count(字段) | 没有not null 约束 : InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，服务层判断是否为null，不为null，计数累加。有not null 约束：InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，直接按行进行累加。 |
| count(数字) | InnoDB 引擎遍历整张表，但不取值。服务层对于返回的每一行，放一个数字“1”进去，直接按行进行累加。 |
| count(*) | InnoDB引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加。 |

> 按照效率排序的话，count(字段) < count(主键 id) < count(1) ≈ count()，所以尽量使用 count()。

## 7 update优化
我们主要需要注意一下update语句执行时的注意事项。
```plsql
update course set name = 'javaEE' where id = 1 ;
```
当我们在执行删除的SQL语句时，会锁定id为1这一行的数据，然后事务提交之后，行锁释放。
但是当我们在执行如下SQL时。
```plsql
update course set name = 'SpringBoot' where name = 'PHP' ;
```
当我们开启多个事务，在执行上述的SQL时，我们发现行锁升级为了表锁。 导致该update语句的性能大大降低。
> InnoDB的行锁是针对索引加的锁，不是针对记录加的锁 ,并且该索引不能失效，否则会从行锁升级为表锁 。

