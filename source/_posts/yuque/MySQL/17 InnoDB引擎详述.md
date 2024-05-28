---
title: 17 InnoDB引擎详述
urlname: ixgx5y5warh2ogcm
date: '2024-03-14 12:14:31'
updated: '2024-04-11 15:30:30'
cover: 'https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055415399-3519ec15-1e58-4cc7-89fa-f2bb4261656f.png?x-oss-process=image%2Fformat%2Cwebp%2Fresize%2Cw_1022%2Climit_0'
description: '笔记来源：黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括1 逻辑存储结构InnoDB的逻辑存储结构如下图所示:表空间：是InnoDB存储引擎逻辑结构的最高层， 如果用户启用了参数 innodb_file_per_table(在8.0版本中默认开启...'
---
**笔记来源：**[**黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括**](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
# 1 逻辑存储结构
InnoDB的逻辑存储结构如下图所示:
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/a7dc648311f8549a00a3c7a7a4c0ebbd.png)

- **表空间**：是InnoDB存储引擎逻辑结构的最高层， 如果用户启用了参数 innodb_file_per_table(在8.0版本中默认开启) ，**则每张表都会有一个表空间（xxx.ibd），一个mysql实例可以对应多个表空间**，用于存储记录、索引等数据。
- **段**：分为数据段（Leaf node segment）、索引段（Non-leaf node segment）、回滚段（Rollback segment），InnoDB是索引组织表，数据段就是B+树的叶子节点， 索引段即为B+树的非叶子节点。段用来管理多个Extent（区）。
- **区**：表空间的单元结构，每个区的大小为1M。 默认情况下， InnoDB存储引擎页大小为16K， 即一个区中一共有64个连续的页。
- **页**：是InnoDB 存储引擎磁盘管理的最小单元，每个页的大小默认为 16KB。为了保证页的连续性，InnoDB 存储引擎每次从磁盘申请 4-5 个区。
- **行**：InnoDB 存储引擎数据是按行进行存放的。在行中，默认有两个隐藏字段： 
   - Trx_id：每次对某条记录进行改动时，都会把对应的事务id赋值给trx_id隐藏列。
   - Roll_pointer：每次对某条引记录进行改动时，都会把旧的版本写入到undo日志中，然后这个隐藏列就相当于一个指针，可以通过它来找到该记录修改前的信息。

关于 ibd 文件
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/1782b68ba9651c18c23c2657073e4827.png)
# 2 架构
## 2.1 概述
MySQL 5.5 版本开始，默认使用InnoDB存储引擎，它擅长事务处理，具有崩溃恢复特性，在日常开发中使用非常广泛。下面是InnoDB架构图，左侧为内存结构，右侧为磁盘结构。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/96a433430d1fd1597909a8f01c7efb29.png)
## 2.2 内存结构
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/383911d26bcd6d8eb511e432f6581ae4.png)

在左侧的内存结构中，主要分为这么四大块儿：

- Buffer Pool
- Change Buffer
- Adaptive Hash Index
- Log Buffer

左边的一个个小方块就可以理解为一个个页
接下来介绍一下这四个部分。

**Buffer Pool**
InnoDB存储引擎基于磁盘文件存储，访问物理硬盘和在内存中进行访问，速度相差很大，为了尽可能弥补这两者之间的I/O效率的差值，就需要把经常使用的数据加载到缓冲池中，避免每次访问都进行磁盘I/O。
在InnoDB的缓冲池中不仅缓存了索引页和数据页，还包含了undo页、插入缓存、自适应哈希索引以及InnoDB的锁信息等等。
缓冲池 Buffer Pool，是主内存中的一个区域，里面可以缓存磁盘上经常操作的真实数据，在执行增删改查操作时，先操作缓冲池中的数据（若缓冲池没有数据，则从磁盘加载并缓存），然后再以一定频率刷新到磁盘，从而减少磁盘IO，加快处理速度。
缓冲池以Page页为单位，底层采用链表数据结构管理Page。根据状态，将Page分为三种类型：

- free page：空闲page，未被使用。
- clean page：被使用page，数据没有被修改过。
- dirty page：脏页，被使用page，数据被修改过，也中数据与磁盘的数据产生了不一致。

在专用服务器上，通常将多达80％的物理内存分配给缓冲池 。参数设置： `show variableslike 'innodb_buffer_pool_size';`

**Change Buffer**
Change Buffer，更改缓冲区（针对于非唯一二级索引页），在执行DML（增删改）语句时，如果这些数据Page没有在Buffer Pool中，不会直接操作磁盘，而会将数据变更存在更改缓冲区 Change Buffer中，在未来数据被读取时，再将数据合并恢复到Buffer Pool中，再将合并后的数据刷新到磁盘中。

Change Buffer的意义是什么呢?
先来看一幅图，这个是二级索引的结构图：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/925045f806250e261d6a0a8250095d7c.png)
与聚集索引不同，二级索引通常是非唯一的，并且以相对随机的顺序插入二级索引。同样，删除和更新可能会影响索引树中不相邻的二级索引页，如果每一次都操作磁盘，会造成大量的磁盘IO。有了ChangeBuffer之后，我们可以在缓冲池中进行合并处理，减少磁盘IO。

**Adaptive Hash Index**
自适应hash索引，用于优化对Buffer Pool数据的查询。**MySQL的innoDB引擎中虽然没有直接支持hash索引**，但是给我们提供了一个功能就是这个自适应hash索引。因为前面我们讲到过，hash索引在进行等值匹配时，一般性能是要高于B+树的，因为hash索引一般只需要一次IO即可，而B+树，可能需要几次匹配，所以hash索引的效率要高，但是hash索引又不适合做范围查询、模糊匹配等。
InnoDB存储引擎会监控对表上各索引页的查询，如果观察到在特定的条件下hash索引可以提升速度，则建立hash索引，称之为自适应hash索引。
自适应哈希索引，无需人工干预，是系统根据情况自动完成。
参数： adaptive_hash_index
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/72b720722a9110ab6f6e00d6c04cd907.png)
ON代表的是开启。

**Log Buffer**
Log Buffer：日志缓冲区，用来保存要写入到磁盘中的log日志数据（redo log 、undo log），默认大小为 16MB，日志缓冲区的日志会定期刷新到磁盘中。如果需要更新、插入或删除许多行的事务，增加日志缓冲区的大小可以节省磁盘 I/O。
参数:

- innodb_log_buffer_size：缓冲区大小

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/3778f60b2aa79847277b4e4352b6e75f.png)

- innodb_flush_log_at_trx_commit：日志刷新到磁盘时机，取值主要包含以下三个：

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/7bc0e86187d29017cecc98e2089f0d53.png)

   - 1：日志在每次事务提交时写入并刷新到磁盘，默认值。
   - 0：每秒将日志写入并刷新到磁盘一次。
   - 2：日志在每次事务提交后写入，并每秒刷新到磁盘一次。

## 2.3 磁盘结构
接下来，再来看看InnoDB体系结构的右边部分，也就是磁盘结构：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/b8bd9793d4f9a261843d54f6ff30ef90.png)
**System Tablespace**
系统表空间是更改缓冲区的存储区域。如果表是在系统表空间而不是每个表文件或通用表空间中创建的，它也可能包含表和索引数据。(在MySQL5.x版本中还包含InnoDB数据字典、undolog等)
参数：innodb_data_file_path
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/726703e95e73c9500b4017ffa07365b6.png)
系统表空间，默认的文件名叫 ibdata1。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/3799069d951f6d3956dc57923a7db214.png)
由于我们的mysql是docker创建的
```bash
docker run -d -p 3306:3306 -v /Users/admin/Desktop/docker-container/mysql/conf:/etc/mysql/conf.d -v /Users/admin/Desktop/docker-container/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql mysql:latest
```
此文件原在 /var/lib/mysql 目录下，被我们挂载映射到 /Users/admin/Desktop/docker-container/mysql/data下，我们来看看是不是这个目录。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/fee04b46cd64f1fefa057de86586e04e.png)

**File-Per-Table Tablespaces**
如果开启了innodb_file_per_table开关 ，则**每个表的文件表空间包含单个InnoDB表的数据和索引 **，并存储在文件系统上的单个数据文件中。
开关参数：innodb_file_per_table ，该参数默认开启。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/349b46436e04dfec971b6da79a8ac985.png)
那也就是说，我们每创建一个表，都会产生一个表空间文件，如图：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/f9b1fb9bf5aea5890e778717df7caae8.png)

**General Tablespaces**
通用表空间，需要通过 CREATE TABLESPACE 语法创建通用表空间，在创建表时，可以指定该表空间。

1. 创建表空间
```plsql
CREATE TABLESPACE ts_name ADD DATAFILE 'file_name' ENGINE = engine_name;
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/06b1f0239f782e5279e889599e7bc153.png)
看看我们创立的表空间
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/faa50ffc28320c09a892a1880e1555cf.png)

2. 创建表时指定表空间
```plsql
CREATE TABLE xxx ... TABLESPACE ts_name;
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/fea4979edeb5109662abf7fcf47c5420.png)

**Undo Tablespaces**
撤销表空间：MySQL实例在初始化时会自动创建两个默认的undo表空间（初始大小16M），用于存储undo log日志。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/45d71c345ae959593457db1e07f6152a.png)

**Temporary Tablespaces：临时表空间**
InnoDB 使用会话临时表空间和全局临时表空间。存储用户创建的临时表等数据。

**Doublewrite Buffer Files**
双写缓冲区：innoDB引擎将数据页从Buffer Pool刷新到磁盘前，先将数据页写入双写缓冲区文件中，便于系统异常时恢复数据。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/41b681d696a0cf7ba8ce7435eca3e3f0.png)

**Redo Log**
重做日志：是用来实现事务的持久性。该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log），前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都会存到该日志中，用于在刷新脏页到磁盘时,发生错误时, 进行数据恢复使用。
以循环方式写入重做日志文件，涉及两个文件：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/3778a68ef7b4ab033cc69a9e011cdc4f.png)
前面我们介绍了InnoDB的内存结构，以及磁盘结构，那么内存中我们所更新的数据，又是如何到磁盘中的呢？ 此时，就涉及到一组后台线程，接下来，就来介绍一些InnoDB中涉及到的后台线程。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/3ab3878f865e0a0fec83f6feb7912c46.png)
##  2.4 后台线程
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/e2a0b3f656f5bcf0c08dd2f154002b73.png)
在InnoDB的后台线程中，分为4类，分别是：

- Master Thread
- IO Thread
- Purge Thread
- Page Cleaner Thread



**Master Thread**
核心后台线程，负责调度其他线程，还负责将缓冲池中的数据异步刷新到磁盘中, 保持数据的一致性，还包括脏页的刷新、合并插入缓存、undo页的回收 。

**IO Thread**
在InnoDB存储引擎中大量使用了AIO来处理IO请求, 这样可以极大地提高数据库的性能，而IOThread主要负责这些IO请求的回调。

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
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/33d8c3c454d8fa48d0cf7cc10b5d8f7f.png)
可以看到全部采用的是aio，是异步io。
**Purge Thread**
主要用于回收事务已经提交了的undo log，在事务提交之后，undo log可能不用了，就用它来回收。

**Page Cleaner Thread**
协助 Master Thread 刷新脏页到磁盘的线程，它可以减轻 Master Thread 的工作压力，减少阻塞。

# 3 事务原理
## 3.1 事务基础
事务：事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即**这些操作要么同时成功，要么同时失败**。

事务特性

- 原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。
- 一致性（Consistency）：事务完成时，必须使所有的数据都保持一致状态。
- 隔离性（Isolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。
- 持久性（Durability）：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

那实际上，我们研究事务的原理，就是研究MySQL的InnoDB引擎是如何保证事务的这四大特性的。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/1803949761c7f0f2d93e8aba962f90cc.png)

而对于这四大特性，实际上分为两个部分。 其中的原子性、一致性、持久化，实际上是由InnoDB中的两份日志来保证的，一份是redo log日志，一份是undo log日志。 而持久性是通过数据库的锁，加上MVCC来保证的。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/a1afed25868af9e05ace56b4badc1767.png)
我们在讲解事务原理的时候，主要就是来研究一下redolog，undolog以及MVCC。
## 3.2 redo log
重做日志，记录的是事务提交时数据页的物理修改，**是用来实现事务的持久性**。
该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log file），前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都存到该日志文件中, 用于在刷新脏页到磁盘,发生错误时, 进行数据恢复使用。

如果没有redolog，可能会存在什么问题的？ 我们一起来分析一下。
我们知道，在InnoDB引擎中的内存结构中，主要的内存区域就是缓冲池，在缓冲池中缓存了很多的数据页。 当我们在一个事务中，执行多个增删改的操作时，InnoDB引擎会先操作缓冲池中的数据，如果缓冲区没有对应的数据，会通过后台线程将磁盘中的数据加载出来，存放在缓冲区中，然后将缓冲池中的数据修改，修改后的数据页我们称为脏页。 而脏页则会在一定的时机，通过后台线程刷新到磁盘中，从而保证缓冲区与磁盘的数据一致。 而缓冲区的脏页数据并不是实时刷新的，而是一段时间之后将缓冲区的数据刷新到磁盘中，假如刷新到磁盘的过程出错了，而提示给用户事务提交成功，而数据却没有持久化下来，这就出现问题了，没有保证事务的持久性。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/8937b118a667cf32d462e1f270da56d5.png)
那么，如何解决上述的问题呢？ 在InnoDB中提供了一份日志 redo log，接下来我们再来分析一下，通过redolog如何解决这个问题。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/17 InnoDB引擎详述/7397c1053eafd41ee15e39b03dcd2baf.png)
有了 redolog 之后，当对缓冲区的数据进行增删改之后，会首先将操作的数据页的变化，记录在redo log buffer中。在事务提交时，会将redo log buffer中的数据刷新到redo log磁盘文件中。过一段时间之后，如果刷新缓冲区的脏页到磁盘时，发生错误，此时就可以借助于redo log进行数据恢复，这样就保证了事务的持久性。 而如果脏页成功刷新到磁盘或或者涉及到的数据已经落盘，此时redolog就没有作用了，就可以删除了，所以存在的两个redolog文件是循环写的。
那为什么每一次提交事务，要刷新redo log 到磁盘中呢，而不是直接将buffer pool中的脏页刷新到磁盘呢 ?
因为在业务操作中，我们操作数据一般都是随机读写磁盘的，而不是顺序读写磁盘。 而redo log在往磁盘文件中写入数据，由于是日志文件，所以都是顺序写的。顺序写的效率，要远大于随机写。 这种先写日志的方式，称之为 WAL（Write-Ahead Logging）。
## 3.3 undo log
**回滚日志**：用于记录数据被修改前的信息 , 作用包含两个 : 提供回滚(保证事务的原子性) 和MVCC(多版本并发控制) 。用于解决原子性问题。
undo log和redo log记录物理日志不一样，它是逻辑日志。可以认为当delete一条记录时，undo log中会记录一条对应的insert记录，反之亦然，当update一条记录时，它记录一条对应相反的update记录。当执行rollback时，就可以从undo log中的逻辑记录读取到相应的内容并进行回滚。
**Undo log销毁**：undo log在事务执行时产生，事务提交时，并不会立即删除undo log，因为这些日志可能还用于MVCC。
**Undo log存储**：undo log采用段的方式进行管理和记录，存放在前面介绍的 rollback segment回滚段中，内部包含1024个undo log segment。

