**笔记来源：**[**黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括**](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
# 1 逻辑存储结构
InnoDB的逻辑存储结构如下图所示:<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055415399-3519ec15-1e58-4cc7-89fa-f2bb4261656f.png#averageHue=%2390ca54&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=Jqj3I&originHeight=628&originWidth=1221&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=udd649f0f-6b03-466c-b448-180bf692071&title=)

- **表空间**：是InnoDB存储引擎逻辑结构的最高层， 如果用户启用了参数 innodb_file_per_table(在8.0版本中默认开启) ，**则每张表都会有一个表空间（xxx.ibd），一个mysql实例可以对应多个表空间**，用于存储记录、索引等数据。
- **段**：分为数据段（Leaf node segment）、索引段（Non-leaf node segment）、回滚段（Rollback segment），InnoDB是索引组织表，数据段就是B+树的叶子节点， 索引段即为B+树的非叶子节点。段用来管理多个Extent（区）。
- **区**：表空间的单元结构，每个区的大小为1M。 默认情况下， InnoDB存储引擎页大小为16K， 即一个区中一共有64个连续的页。
- **页**：是InnoDB 存储引擎磁盘管理的最小单元，每个页的大小默认为 16KB。为了保证页的连续性，InnoDB 存储引擎每次从磁盘申请 4-5 个区。
- **行**：InnoDB 存储引擎数据是按行进行存放的。在行中，默认有两个隐藏字段： 
   - Trx_id：每次对某条记录进行改动时，都会把对应的事务id赋值给trx_id隐藏列。
   - Roll_pointer：每次对某条引记录进行改动时，都会把旧的版本写入到undo日志中，然后这个隐藏列就相当于一个指针，可以通过它来找到该记录修改前的信息。

关于 ibd 文件<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683627502204-bea81c80-0c01-4213-aad5-72a3bf05cad3.png#averageHue=%23f0efef&clientId=u02c6d1b8-b712-4&from=paste&height=816&id=uc5d72fb9&originHeight=1632&originWidth=2746&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1331340&status=done&style=none&taskId=u322dd3ee-7077-415c-bbab-b4dceb0598c&title=&width=1373)
# 2 架构
## 2.1 概述
MySQL 5.5 版本开始，默认使用InnoDB存储引擎，它擅长事务处理，具有崩溃恢复特性，在日常开发中使用非常广泛。下面是InnoDB架构图，左侧为内存结构，右侧为磁盘结构。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683627890968-d65f97c4-7d27-4294-89b7-af438591e7d1.png#averageHue=%23e9e8e8&clientId=u02c6d1b8-b712-4&from=paste&height=646&id=u74de9910&originHeight=689&originWidth=970&originalType=binary&ratio=2&rotation=0&showTitle=false&size=588125&status=done&style=none&taskId=u5cf816e6-6465-4cca-8c19-b25cb0629c4&title=&width=910)
## 2.2 内存结构
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683627973635-4caf258c-9ceb-421f-8557-b07acfc15ae3.png#averageHue=%23e2e0de&clientId=u02c6d1b8-b712-4&from=paste&height=621&id=uae30e698&originHeight=621&originWidth=296&originalType=binary&ratio=2&rotation=0&showTitle=false&size=155433&status=done&style=none&taskId=ueb11d67e-ec96-4918-975f-0134944a9cb&title=&width=296)

在左侧的内存结构中，主要分为这么四大块儿：

- Buffer Pool
- Change Buffer
- Adaptive Hash Index
- Log Buffer

左边的一个个小方块就可以理解为一个个页<br />接下来介绍一下这四个部分。

**Buffer Pool**<br />InnoDB存储引擎基于磁盘文件存储，访问物理硬盘和在内存中进行访问，速度相差很大，为了尽可能弥补这两者之间的I/O效率的差值，就需要把经常使用的数据加载到缓冲池中，避免每次访问都进行磁盘I/O。<br />在InnoDB的缓冲池中不仅缓存了索引页和数据页，还包含了undo页、插入缓存、自适应哈希索引以及InnoDB的锁信息等等。<br />缓冲池 Buffer Pool，是主内存中的一个区域，里面可以缓存磁盘上经常操作的真实数据，在执行增删改查操作时，先操作缓冲池中的数据（若缓冲池没有数据，则从磁盘加载并缓存），然后再以一定频率刷新到磁盘，从而减少磁盘IO，加快处理速度。<br />缓冲池以Page页为单位，底层采用链表数据结构管理Page。根据状态，将Page分为三种类型：

- free page：空闲page，未被使用。
- clean page：被使用page，数据没有被修改过。
- dirty page：脏页，被使用page，数据被修改过，也中数据与磁盘的数据产生了不一致。

在专用服务器上，通常将多达80％的物理内存分配给缓冲池 。参数设置： `show variableslike 'innodb_buffer_pool_size';`

**Change Buffer**<br />Change Buffer，更改缓冲区（针对于非唯一二级索引页），在执行DML（增删改）语句时，如果这些数据Page没有在Buffer Pool中，不会直接操作磁盘，而会将数据变更存在更改缓冲区 Change Buffer中，在未来数据被读取时，再将数据合并恢复到Buffer Pool中，再将合并后的数据刷新到磁盘中。

Change Buffer的意义是什么呢?<br />先来看一幅图，这个是二级索引的结构图：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683681787776-0cb64dcc-c8f7-48b1-88b9-a20b7d2488a4.png#averageHue=%23f0eee9&clientId=ueeffcab6-1cbe-4&from=paste&height=437&id=u14bd485d&originHeight=410&originWidth=1022&originalType=binary&ratio=2&rotation=0&showTitle=false&size=296792&status=done&style=none&taskId=u6136747c-000c-42c9-a693-c3f2f18a33d&title=&width=1089)<br />与聚集索引不同，二级索引通常是非唯一的，并且以相对随机的顺序插入二级索引。同样，删除和更新可能会影响索引树中不相邻的二级索引页，如果每一次都操作磁盘，会造成大量的磁盘IO。有了ChangeBuffer之后，我们可以在缓冲池中进行合并处理，减少磁盘IO。

**Adaptive Hash Index**<br />自适应hash索引，用于优化对Buffer Pool数据的查询。**MySQL的innoDB引擎中虽然没有直接支持hash索引**，但是给我们提供了一个功能就是这个自适应hash索引。因为前面我们讲到过，hash索引在进行等值匹配时，一般性能是要高于B+树的，因为hash索引一般只需要一次IO即可，而B+树，可能需要几次匹配，所以hash索引的效率要高，但是hash索引又不适合做范围查询、模糊匹配等。<br />InnoDB存储引擎会监控对表上各索引页的查询，如果观察到在特定的条件下hash索引可以提升速度，则建立hash索引，称之为自适应hash索引。<br />自适应哈希索引，无需人工干预，是系统根据情况自动完成。<br />参数： adaptive_hash_index<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683682412485-14832bfb-eedc-48a9-b6d5-85fcf1fd13e5.png#averageHue=%23efefef&clientId=ueeffcab6-1cbe-4&from=paste&height=215&id=u06a5014f&originHeight=254&originWidth=1166&originalType=binary&ratio=2&rotation=0&showTitle=false&size=86760&status=done&style=none&taskId=ue83b7fbc-6846-40df-9a3d-d173ed6c69e&title=&width=986)<br />ON代表的是开启。

**Log Buffer**<br />Log Buffer：日志缓冲区，用来保存要写入到磁盘中的log日志数据（redo log 、undo log），默认大小为 16MB，日志缓冲区的日志会定期刷新到磁盘中。如果需要更新、插入或删除许多行的事务，增加日志缓冲区的大小可以节省磁盘 I/O。<br />参数:

- innodb_log_buffer_size：缓冲区大小

![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683682548017-4bd484ff-251f-41ba-a422-326a5287a808.png#averageHue=%23efefef&clientId=ueeffcab6-1cbe-4&from=paste&height=196&id=u0a6833d4&originHeight=228&originWidth=1118&originalType=binary&ratio=2&rotation=0&showTitle=false&size=73068&status=done&style=none&taskId=uf9e140ed-8222-458d-8827-e401a6ddd78&title=&width=961)

- innodb_flush_log_at_trx_commit：日志刷新到磁盘时机，取值主要包含以下三个：

![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683682704961-653cad57-1821-4636-8d51-cbaf1e37d0be.png#averageHue=%23ededed&clientId=ueeffcab6-1cbe-4&from=paste&height=241&id=ub495f46d&originHeight=246&originWidth=982&originalType=binary&ratio=2&rotation=0&showTitle=false&size=75072&status=done&style=none&taskId=u42837319-0ad6-47e5-9704-07f3e1deba4&title=&width=962)

   - 1：日志在每次事务提交时写入并刷新到磁盘，默认值。
   - 0：每秒将日志写入并刷新到磁盘一次。
   - 2：日志在每次事务提交后写入，并每秒刷新到磁盘一次。

## 2.3 磁盘结构
接下来，再来看看InnoDB体系结构的右边部分，也就是磁盘结构：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683682842688-e0805bb7-878d-4149-9c96-6dfb6d573e5f.png#averageHue=%23ebeaea&clientId=ueeffcab6-1cbe-4&from=paste&height=1013&id=u268a98b4&originHeight=626&originWidth=511&originalType=binary&ratio=2&rotation=0&showTitle=false&size=282837&status=done&style=none&taskId=u9b0bfbca-2baf-4ba3-a081-8c0c220edff&title=&width=826.5)<br />**System Tablespace**<br />系统表空间是更改缓冲区的存储区域。如果表是在系统表空间而不是每个表文件或通用表空间中创建的，它也可能包含表和索引数据。(在MySQL5.x版本中还包含InnoDB数据字典、undolog等)<br />参数：innodb_data_file_path<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683682954664-865fed59-0cee-49c0-a8bc-ef7c0c7deab2.png#averageHue=%23eaeaea&clientId=ueeffcab6-1cbe-4&from=paste&height=202&id=ud734457b&originHeight=246&originWidth=1016&originalType=binary&ratio=2&rotation=0&showTitle=false&size=80500&status=done&style=none&taskId=u8685732f-eaf3-4280-b294-9961f02d525&title=&width=835)<br />系统表空间，默认的文件名叫 ibdata1。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683683044669-5e1e8e38-1854-4566-bfc7-956489f73615.png#averageHue=%23e9e9e9&clientId=ueeffcab6-1cbe-4&from=paste&height=505&id=u1f7cde6e&originHeight=1010&originWidth=1530&originalType=binary&ratio=2&rotation=0&showTitle=false&size=567872&status=done&style=none&taskId=ucd5c7acb-c8da-4a53-801c-8f740774ce6&title=&width=765)<br />由于我们的mysql是docker创建的
```bash
docker run -d -p 3306:3306 -v /Users/admin/Desktop/docker-container/mysql/conf:/etc/mysql/conf.d -v /Users/admin/Desktop/docker-container/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql mysql:latest
```
此文件原在 /var/lib/mysql 目录下，被我们挂载映射到 /Users/admin/Desktop/docker-container/mysql/data下，我们来看看是不是这个目录。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683683237547-7433aad6-0f6a-4194-b409-051f99258083.png#averageHue=%23e8e8e8&clientId=ueeffcab6-1cbe-4&from=paste&height=581&id=u00a32ae8&originHeight=1072&originWidth=1408&originalType=binary&ratio=2&rotation=0&showTitle=false&size=571242&status=done&style=none&taskId=u1851b27c-5c96-4967-98c7-032042ed947&title=&width=763)

**File-Per-Table Tablespaces**<br />如果开启了innodb_file_per_table开关 ，则**每个表的文件表空间包含单个InnoDB表的数据和索引 **，并存储在文件系统上的单个数据文件中。<br />开关参数：innodb_file_per_table ，该参数默认开启。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683683327459-e0906f8f-62e2-4ac0-9075-817d857fc6ae.png#averageHue=%23ececec&clientId=ueeffcab6-1cbe-4&from=paste&height=188&id=ubca3467d&originHeight=210&originWidth=852&originalType=binary&ratio=2&rotation=0&showTitle=false&size=57555&status=done&style=none&taskId=u7332c3f2-1edd-45b8-b5f6-4fe15a5605e&title=&width=764)<br />那也就是说，我们每创建一个表，都会产生一个表空间文件，如图：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683683379249-8f5adff4-4afc-4e60-915e-778f989fb1f7.png#averageHue=%23ececec&clientId=ueeffcab6-1cbe-4&from=paste&height=96&id=u89f2d39e&originHeight=148&originWidth=1180&originalType=binary&ratio=2&rotation=0&showTitle=false&size=62817&status=done&style=none&taskId=ued3ceaab-6495-40b1-b2eb-c55bdf141bf&title=&width=767)

**General Tablespaces**<br />通用表空间，需要通过 CREATE TABLESPACE 语法创建通用表空间，在创建表时，可以指定该表空间。

1. 创建表空间
```plsql
CREATE TABLESPACE ts_name ADD DATAFILE 'file_name' ENGINE = engine_name;
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683683618714-e1dfb886-8496-4d5c-b71b-87e80f999dba.png#averageHue=%23ededed&clientId=ueeffcab6-1cbe-4&from=paste&height=78&id=ub2eecf8d&originHeight=138&originWidth=1304&originalType=binary&ratio=2&rotation=0&showTitle=false&size=56145&status=done&style=none&taskId=u8e861b96-89d2-4e1e-b140-3e36762f396&title=&width=737)<br />看看我们创立的表空间<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683683694223-4f9566f0-fd8c-4d57-b670-bc29d274c9b4.png#averageHue=%23eaeaea&clientId=ueeffcab6-1cbe-4&from=paste&height=631&id=u53f487aa&originHeight=1262&originWidth=1816&originalType=binary&ratio=2&rotation=0&showTitle=false&size=769930&status=done&style=none&taskId=uf3a8ef1e-f9d8-4e40-bc6c-dc3664f74be&title=&width=908)

2. 创建表时指定表空间
```plsql
CREATE TABLE xxx ... TABLESPACE ts_name;
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683683943363-f69774fe-558c-4536-b152-d197dc074475.png#averageHue=%23ebebeb&clientId=ueeffcab6-1cbe-4&from=paste&height=184&id=ua40ffe94&originHeight=324&originWidth=1606&originalType=binary&ratio=2&rotation=0&showTitle=false&size=161343&status=done&style=none&taskId=u2e2d5dfe-3a9b-4a3a-bd97-7d0955bc24f&title=&width=913)

**Undo Tablespaces**<br />撤销表空间：MySQL实例在初始化时会自动创建两个默认的undo表空间（初始大小16M），用于存储undo log日志。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683684081606-07bf7547-6816-4879-842c-8d1491dc1ea3.png#averageHue=%23eae9e9&clientId=ueeffcab6-1cbe-4&from=paste&height=637&id=u7c17a2e8&originHeight=1274&originWidth=1882&originalType=binary&ratio=2&rotation=0&showTitle=false&size=790096&status=done&style=none&taskId=u276943b1-e58a-4384-a4cb-97175d3d8c4&title=&width=941)

**Temporary Tablespaces：临时表空间**<br />InnoDB 使用会话临时表空间和全局临时表空间。存储用户创建的临时表等数据。

**Doublewrite Buffer Files**<br />双写缓冲区：innoDB引擎将数据页从Buffer Pool刷新到磁盘前，先将数据页写入双写缓冲区文件中，便于系统异常时恢复数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683684200283-9ff5a042-04aa-4e05-9166-bcd88b6acb31.png#averageHue=%23e9e8e8&clientId=ueeffcab6-1cbe-4&from=paste&height=634&id=ue8333659&originHeight=1268&originWidth=1686&originalType=binary&ratio=2&rotation=0&showTitle=false&size=738022&status=done&style=none&taskId=u8736171a-edb1-48b4-9e02-84503f7b128&title=&width=843)

**Redo Log**<br />重做日志：是用来实现事务的持久性。该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log），前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都会存到该日志中，用于在刷新脏页到磁盘时,发生错误时, 进行数据恢复使用。<br />以循环方式写入重做日志文件，涉及两个文件：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683684412388-d575861e-d7b0-486c-8e33-4710aff03009.png#averageHue=%23f7f7f6&clientId=ueeffcab6-1cbe-4&from=paste&height=106&id=u61adb0c3&originHeight=86&originWidth=465&originalType=binary&ratio=2&rotation=0&showTitle=false&size=26819&status=done&style=none&taskId=u4a8df718-b411-4fcc-b496-26aa17ceadb&title=&width=572.5)<br />前面我们介绍了InnoDB的内存结构，以及磁盘结构，那么内存中我们所更新的数据，又是如何到磁盘中的呢？ 此时，就涉及到一组后台线程，接下来，就来介绍一些InnoDB中涉及到的后台线程。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055416429-85442c8d-2710-47ff-be9f-6be9c6d625c7.png#averageHue=%23f1f0f0&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=zKIra&originHeight=843&originWidth=1214&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6165c27c-474e-4e79-bba4-19cd5e97461&title=)
##  2.4 后台线程
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683684529639-02a3b048-16af-4307-a224-4a4afdb31bdd.png#averageHue=%23f4f4f4&clientId=ueeffcab6-1cbe-4&from=paste&height=767&id=ue0a9234b&originHeight=533&originWidth=566&originalType=binary&ratio=2&rotation=0&showTitle=false&size=202135&status=done&style=none&taskId=ucffbc4d7-a5d4-4633-9167-e6e4da6e20a&title=&width=814)<br />在InnoDB的后台线程中，分为4类，分别是：

- Master Thread
- IO Thread
- Purge Thread
- Page Cleaner Thread



**Master Thread**<br />核心后台线程，负责调度其他线程，还负责将缓冲池中的数据异步刷新到磁盘中, 保持数据的一致性，还包括脏页的刷新、合并插入缓存、undo页的回收 。

**IO Thread**<br />在InnoDB存储引擎中大量使用了AIO来处理IO请求, 这样可以极大地提高数据库的性能，而IOThread主要负责这些IO请求的回调。

| 线程类型 | 默认个数 | 职责 |
| --- | --- | --- |
| Read thread | 4 | 负责读操作 |
| Write thread | 4 | 负责写操作 |
| Log thread | 1 | 负责将日志缓冲区刷新到磁盘 |
| Insert buffer thread | 1 | 负责将写缓冲区内容刷新到磁盘 |

我们可以通过以下的这条指令，查看到InnoDB的状态信息，其中就包含IO Thread信息。
```sql
show engine innodb status \G;
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683685054947-402f5a7d-f23e-419c-a0fd-81e9a84f13be.png#averageHue=%23eeeeee&clientId=ueeffcab6-1cbe-4&from=paste&height=891&id=ucdbff146&originHeight=1782&originWidth=2188&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1081987&status=done&style=none&taskId=udcdc65a2-b8cf-4cbb-a703-a1283e14a30&title=&width=1094)<br />可以看到全部采用的是aio，是异步io。<br />**Purge Thread**<br />主要用于回收事务已经提交了的undo log，在事务提交之后，undo log可能不用了，就用它来回收。

**Page Cleaner Thread**<br />协助 Master Thread 刷新脏页到磁盘的线程，它可以减轻 Master Thread 的工作压力，减少阻塞。

# 3 事务原理
## 3.1 事务基础
事务：事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即**这些操作要么同时成功，要么同时失败**。

事务特性

- 原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。
- 一致性（Consistency）：事务完成时，必须使所有的数据都保持一致状态。
- 隔离性（Isolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。
- 持久性（Durability）：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

那实际上，我们研究事务的原理，就是研究MySQL的InnoDB引擎是如何保证事务的这四大特性的。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055416685-ac637d77-80c6-4c23-b60d-4a092f7689ae.png#averageHue=%23fbfaf8&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=yo19l&originHeight=206&originWidth=1215&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9c445a7e-888e-4201-9cb8-5c6f11e6eac&title=)

而对于这四大特性，实际上分为两个部分。 其中的原子性、一致性、持久化，实际上是由InnoDB中的两份日志来保证的，一份是redo log日志，一份是undo log日志。 而持久性是通过数据库的锁，加上MVCC来保证的。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055416795-fa6b3d32-a133-4a6e-84a8-5ccfb4cd4642.png#averageHue=%23fcfbfa&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=rw76r&originHeight=452&originWidth=1201&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ub91e076a-cf3d-417b-9ca4-62a3d1a6a83&title=)<br />我们在讲解事务原理的时候，主要就是来研究一下redolog，undolog以及MVCC。
## 3.2 redo log
重做日志，记录的是事务提交时数据页的物理修改，**是用来实现事务的持久性**。<br />该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log file），前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都存到该日志文件中, 用于在刷新脏页到磁盘,发生错误时, 进行数据恢复使用。

如果没有redolog，可能会存在什么问题的？ 我们一起来分析一下。<br />我们知道，在InnoDB引擎中的内存结构中，主要的内存区域就是缓冲池，在缓冲池中缓存了很多的数据页。 当我们在一个事务中，执行多个增删改的操作时，InnoDB引擎会先操作缓冲池中的数据，如果缓冲区没有对应的数据，会通过后台线程将磁盘中的数据加载出来，存放在缓冲区中，然后将缓冲池中的数据修改，修改后的数据页我们称为脏页。 而脏页则会在一定的时机，通过后台线程刷新到磁盘中，从而保证缓冲区与磁盘的数据一致。 而缓冲区的脏页数据并不是实时刷新的，而是一段时间之后将缓冲区的数据刷新到磁盘中，假如刷新到磁盘的过程出错了，而提示给用户事务提交成功，而数据却没有持久化下来，这就出现问题了，没有保证事务的持久性。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055417098-40328e8d-65c8-47b1-9bd2-3b54496e57b9.png#averageHue=%23faf2ea&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&height=498&id=dW8rw&originHeight=498&originWidth=1215&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u68744ea8-f166-4ec7-819c-ee4e79026d2&title=&width=1215)<br />那么，如何解决上述的问题呢？ 在InnoDB中提供了一份日志 redo log，接下来我们再来分析一下，通过redolog如何解决这个问题。<br />![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055417167-8ed067c3-2be2-466d-b2ac-04c49e99c180.png#averageHue=%23faf2ea&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&height=498&id=rCDtU&originHeight=498&originWidth=1214&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4242f9d8-b38b-49e3-b359-e5c24a0e056&title=&width=1214)<br />有了 redolog 之后，当对缓冲区的数据进行增删改之后，会首先将操作的数据页的变化，记录在redo log buffer中。在事务提交时，会将redo log buffer中的数据刷新到redo log磁盘文件中。过一段时间之后，如果刷新缓冲区的脏页到磁盘时，发生错误，此时就可以借助于redo log进行数据恢复，这样就保证了事务的持久性。 而如果脏页成功刷新到磁盘或或者涉及到的数据已经落盘，此时redolog就没有作用了，就可以删除了，所以存在的两个redolog文件是循环写的。<br />那为什么每一次提交事务，要刷新redo log 到磁盘中呢，而不是直接将buffer pool中的脏页刷新到磁盘呢 ?<br />因为在业务操作中，我们操作数据一般都是随机读写磁盘的，而不是顺序读写磁盘。 而redo log在往磁盘文件中写入数据，由于是日志文件，所以都是顺序写的。顺序写的效率，要远大于随机写。 这种先写日志的方式，称之为 WAL（Write-Ahead Logging）。
## 3.3 undo log
**回滚日志**：用于记录数据被修改前的信息 , 作用包含两个 : 提供回滚(保证事务的原子性) 和MVCC(多版本并发控制) 。用于解决原子性问题。<br />undo log和redo log记录物理日志不一样，它是逻辑日志。可以认为当delete一条记录时，undo log中会记录一条对应的insert记录，反之亦然，当update一条记录时，它记录一条对应相反的update记录。当执行rollback时，就可以从undo log中的逻辑记录读取到相应的内容并进行回滚。<br />**Undo log销毁**：undo log在事务执行时产生，事务提交时，并不会立即删除undo log，因为这些日志可能还用于MVCC。<br />**Undo log存储**：undo log采用段的方式进行管理和记录，存放在前面介绍的 rollback segment回滚段中，内部包含1024个undo log segment。

