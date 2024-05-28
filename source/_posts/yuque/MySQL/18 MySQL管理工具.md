---
title: 18 MySQL管理工具
urlname: cnimlcxf8gntnpx1
date: '2024-03-14 12:14:33'
updated: '2024-04-08 11:51:11'
cover: ''
description: 笔记来源：黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括前言Mysql数据库安装完成后，自带了一下四个数据库，具体作用如下：数据库含义mysql存储MySQL服务器正常运行所需要的各种信息 （时区、主从、用户、权限等）information_sc...
---
**笔记来源：**[**黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括**](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)

**前言**
Mysql数据库安装完成后，自带了一下四个数据库，具体作用如下：

| 数据库 | 含义 |
| --- | --- |
| mysql | 存储MySQL服务器正常运行所需要的各种信息 （时区、主从、用户、权限等） |
| information_schema | 提供了访问数据库元数据的各种表和视图，包含数据库、表、字段类型及访问权限等 |
| performance_schema | 为MySQL服务器运行时状态提供了一个底层监控功能，主要用于收集数据库服务器性能参数 |
| sys | 包含了一系列方便 DBA 和开发人员利用 performance_schema性能数据库进行性能调优和诊断的视图 |

# 1 mysql
该mysql不是指mysql服务，而是指mysql的客户端工具。
```sql
--语法 ：
mysql [options] [database] 
/**
选项 ：
-u, --user=name #指定用户名 
-p, --password[=name] #指定密码 
-h, --host=name #指定服务器IP或域名 
-P, --port=port #指定连接端口 
-e, --execute=name #执行SQL语句并退出
*/
```
`-e`选项可以在Mysql客户端执行SQL语句，而不用连接到MySQL数据库再执行，对于一些批处理脚本，这种方式尤其方便。
示例：
```plsql
mysql -uroot –p123456 db01 -e "select * from stu";
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683855619100-f43bf7d7-0c57-4b20-8b98-1aa6cbfa3225.png#averageHue=%23f2f2f2&clientId=u262becf4-dc28-4&from=paste&height=198&id=u002edee5&originHeight=308&originWidth=1380&originalType=binary&ratio=1&rotation=0&showTitle=false&size=195169&status=done&style=none&taskId=u1ae0287e-3b3d-4471-9d03-0d4cae855d4&title=&width=887)
执行完毕，并未进入Mysql命令行。
# 2 mysqladmin
mysqladmin 是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等。
通过帮助文档查看选项：
```sql
mysqladmin --help
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683855866788-f4c55d20-7080-4bcd-8b7e-587c3deed4c2.png#averageHue=%23eeeeee&clientId=u262becf4-dc28-4&from=paste&height=689&id=u1c30e0e3&originHeight=868&originWidth=1516&originalType=binary&ratio=1&rotation=0&showTitle=false&size=635704&status=done&style=none&taskId=ubb3af695-815a-435f-bcbb-c5d4a29a7f4&title=&width=1203)
```sql
--语法:
mysqladmin [options] command ... 
/**
选项:
-u, --user=name #指定用户名 
-p, --password[=name] #指定密码 
-h, --host=name #指定服务器IP或域名 
-P, --port=port #指定连接端口
*/
```

示例：
```plsql
mysqladmin -uroot –p1234 create 'test01'; 
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683856626240-fd0d19af-d74e-449e-a327-1b4fb20673b1.png#averageHue=%23f6f6f6&clientId=u262becf4-dc28-4&from=paste&height=914&id=uc61f772e&originHeight=1338&originWidth=1986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1107039&status=done&style=none&taskId=u014b8dd6-5360-4006-b028-a4b7bf6150b&title=&width=1356)
```sql
mysqladmin -uroot –p1234 version;
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683856532353-2f795569-caa1-47af-a8dd-4b49649fe628.png#averageHue=%23f3f3f3&clientId=u262becf4-dc28-4&from=paste&height=371&id=u18d83755&originHeight=546&originWidth=2002&originalType=binary&ratio=1&rotation=0&showTitle=false&size=486265&status=done&style=none&taskId=u859519cb-74d6-4a89-a540-f807204a9cf&title=&width=1360)
# 3 mysqlbinlog
由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到mysqlbinlog 日志管理工具。
```sql
--语法 ：
mysqlbinlog [options] log-files1 log-files2 ... 
/**
选项 ：
-d, --database=name 指定数据库名称，只列出指定的数据库相关操作。 
-o, --offset=# 忽略掉日志中的前n行命令。 
-r,--result-file=name 将输出的文本格式日志输出到指定文件。 
-s, --short-form 显示简单格式， 省略掉一些信息。 
--start-datatime=date1 --stop-datetime=date2 指定日期间隔内的所有日志。 
--start-position=pos1 --stop-position=pos2 指定位置间隔内的所有日志。
*/
```
示例:
查看 binlog.000008这个二进制文件中的数据信息
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683856826977-186770f3-561c-4fc3-a0c4-1486639a0b1d.png#averageHue=%23f2f2f2&clientId=u262becf4-dc28-4&from=paste&height=798&id=u35a72177&originHeight=798&originWidth=2332&originalType=binary&ratio=1&rotation=0&showTitle=false&size=811986&status=done&style=none&taskId=u78d86b99-50b2-4ada-940c-98686609bc1&title=&width=2332)
上述查看到的二进制日志文件数据信息量太多了，不方便查询。 我们可以加上一个参数 -s 来显示简单格式。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683856867937-da0d40a6-f049-495b-b6df-9a84d2782683.png#averageHue=%23ededed&clientId=u262becf4-dc28-4&from=paste&height=349&id=u9b2108cf&originHeight=514&originWidth=1484&originalType=binary&ratio=1&rotation=0&showTitle=false&size=375316&status=done&style=none&taskId=u0cebfb67-d35a-44a1-a54e-f2b83fd0d33&title=&width=1007)
# 4 mysqlshow
mysqlshow 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引。
```sql
--语法 ：
mysqlshow [options] [db_name [table_name [col_name]]] 
/**
选项 ：
--count 显示数据库及表的统计信息（数据库，表 均可以不指定） 
-i 显示指定数据库或者指定表的状态信息
*/
```

示例：

1. 查询每个数据库的表的数量及表中记录的数量
```plsql
mysqlshow -uroot -p1234 --count
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683857068431-ea7050cd-2320-4b2c-a4df-7ba1e7e2ded5.png#averageHue=%23eeeeee&clientId=u262becf4-dc28-4&from=paste&height=482&id=ude170866&originHeight=552&originWidth=1522&originalType=binary&ratio=1&rotation=0&showTitle=false&size=404232&status=done&style=none&taskId=u40fe9f39-89fe-4a10-9677-4d13e98461f&title=&width=1329)

2. 查看数据库db01的统计信息
```plsql
mysqlshow -uroot -p1234 db01 --count
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683857171163-1848a58f-d1b2-41b9-b3a4-fda9b02a1f89.png#averageHue=%23f1f1f1&clientId=u262becf4-dc28-4&from=paste&height=353&id=u8b26fe5b&originHeight=380&originWidth=1440&originalType=binary&ratio=1&rotation=0&showTitle=false&size=248415&status=done&style=none&taskId=u846dcb0d-d3b1-4327-8f44-835fa67dfe1&title=&width=1336)

3. 查看数据库db01中的course表的信息
```plsql
mysqlshow -uroot -p1234 db01 course --count
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683857216347-7545a0f6-f5b3-476c-9512-c89c2796dd63.png#averageHue=%23ececec&clientId=u262becf4-dc28-4&from=paste&height=252&id=ud439474d&originHeight=358&originWidth=1978&originalType=binary&ratio=1&rotation=0&showTitle=false&size=327796&status=done&style=none&taskId=udd099ec2-f751-4e02-a19d-9473f4a596e&title=&width=1391)

4. 查看数据库db01中的course表的id字段的信息
```plsql
mysqlshow -uroot -p1234 db01 course id --count
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683857262419-f0f11a6d-cf0b-442d-b0e7-670bbf4576d6.png#averageHue=%23eaeaea&clientId=u262becf4-dc28-4&from=paste&height=247&id=u11e986e4&originHeight=312&originWidth=1752&originalType=binary&ratio=1&rotation=0&showTitle=false&size=262319&status=done&style=none&taskId=u1fb5d085-767f-4130-910a-a1a6b998494&title=&width=1386)
# 5 mysqldump
mysqldump 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。备份内容包含创建表，及插入表的SQL语句。
```sql
--语法 ：
mysqldump [options] db_name [tables] 
mysqldump [options] --database/-B db1 [db2 db3...] 
mysqldump [options] --all-databases/-A 
/**
连接选项 ： 
-u, --user=name 指定用户名 
-p, --password[=name] 指定密码 
-h, --host=name 指定服务器ip或域名 
-P, --port=# 指定连接端口 

输出选项： 
--add-drop-database 在每个数据库创建语句前加上 drop database 语句 
--add-drop-table 在每个表创建语句前加上 drop table 语句 , 默认开启 ; 不 开启 (--skip-add-drop-table) 
-n, --no-create-db 不包含数据库的创建语句 
-t, --no-create-info 不包含数据表的创建语句 
-d --no-data 不包含数据 
-T, --tab=name 自动生成两个文件：一个.sql文件，创建表结构的语句；一 个.txt文件，数据文件
*/
```

示例:
A. 备份db01数据库
```plsql
mysqldump -uroot -p1234 db01 > db01.sql
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683857459469-c3664a45-ba93-48b1-8494-9ff2b15ae7db.png#averageHue=%23f0efef&clientId=u262becf4-dc28-4&from=paste&height=1474&id=u6ddf6763&originHeight=1474&originWidth=2022&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1447749&status=done&style=none&taskId=uae96cbce-8cfc-40d6-bfda-1c7d6d651cc&title=&width=2022)
可以直接打开db01.sql，来查看备份出来的数据到底什么样。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683857509856-9271c6de-4870-4363-b4d1-0ef3c7372878.png#averageHue=%23f0f0f0&clientId=u262becf4-dc28-4&from=paste&height=1712&id=u9a7c0615&originHeight=1712&originWidth=1618&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1268821&status=done&style=none&taskId=u2495ba79-bbf6-4636-81b0-728c8118986&title=&width=1618)
备份出来的数据包含：

- 删除表的语句
- 创建表的语句
- 数据插入语句

如果我们在数据备份时，不需要创建表，或者不需要备份数据，只需要备份表结构，都可以通过对应的参数来实现。

B. 备份db01数据库中的表数据，不备份表结构(-t)
```plsql
mysqldump -uroot -p1234 -t db01 > db02.sql
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683857586086-fbd9a24b-cf74-4235-8e1b-bd1325d5d055.png#averageHue=%23ededed&clientId=u262becf4-dc28-4&from=paste&height=1064&id=u2685d2d9&originHeight=1472&originWidth=1736&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1298710&status=done&style=none&taskId=u6ce0d5cd-14a0-4c00-bf50-7570d7e1b5b&title=&width=1255)
打开 db02.sql ，来查看备份的数据，只有insert语句，没有备份表结构。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683858305879-4779bce4-f067-44f2-8682-b5cdbe3224e5.png#averageHue=%23eeeeee&clientId=u262becf4-dc28-4&from=paste&height=1001&id=u49528ae2&originHeight=1334&originWidth=1540&originalType=binary&ratio=1&rotation=0&showTitle=false&size=964107&status=done&style=none&taskId=u7d9c362a-1303-47fe-a3e0-57cbda73c46&title=&width=1155)
C. 将db01数据库的表的表结构与数据分开备份(-T)
```plsql
mysqldump -uroot -p1234 -T /root db01 score
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683859136583-edba684f-1d5d-4bf3-9970-a4743a1b5f1f.png#averageHue=%23efefef&clientId=u262becf4-dc28-4&from=paste&height=158&id=ue3b5147e&originHeight=158&originWidth=2676&originalType=binary&ratio=1&rotation=0&showTitle=false&size=193970&status=done&style=none&taskId=u2e555794-d772-4c64-9ea1-5512b2f0de8&title=&width=2676)
执行上述指令，会出错，数据不能完成备份，原因是因为我们所指定的数据存放目录/root，MySQL认为是不安全的，需要存储在MySQL信任的目录下。那么，哪个目录才是MySQL信任的目录呢，可以查看一下系统变量 secure_file_priv 。执行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683859043254-73b83974-029f-4901-833b-98d1a151b999.png#averageHue=%23f1f1f1&clientId=u262becf4-dc28-4&from=paste&height=154&id=u227f674f&originHeight=280&originWidth=1032&originalType=binary&ratio=1&rotation=0&showTitle=false&size=133203&status=done&style=none&taskId=u7794d88f-6141-4d99-b2cb-1b12dabdda3&title=&width=567)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683859234514-3d1e5b15-4b0d-4d55-8759-47676251ee2a.png#averageHue=%23f2f2f2&clientId=u262becf4-dc28-4&from=paste&height=258&id=u6de84e28&originHeight=258&originWidth=2710&originalType=binary&ratio=1&rotation=0&showTitle=false&size=303298&status=done&style=none&taskId=uc15c6b96-f279-4375-9985-49fbc012ea9&title=&width=2710)
上述的两个文件 score.sql 中记录的就是表结构文件，而 score.txt 就是表数据文件，但是需要注意表数据文件，并不是记录一条条的insert语句，而是按照一定的格式记录表结构中的数据。如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683859273922-7b344ca2-2e48-4863-8e61-2b53c4b6789a.png#averageHue=%23f1f1f1&clientId=u262becf4-dc28-4&from=paste&height=147&id=u705cc71c&originHeight=258&originWidth=684&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90483&status=done&style=none&taskId=u79d63143-3253-4ca9-9043-61a4fd71974&title=&width=390)
# 6 mysqlimport/source
**mysqlimport**
mysqlimport 是客户端数据导入工具，用来导入mysqldump 加 -T 参数后导出的文本文件。
```sql
--语法 ：
mysqlimport [options] db_name textfile1 [textfile2...] 
--示例 ：
mysqlimport -uroot -p2143 test /tmp/city.txt
```
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055979080-be918742-e640-4f03-8b77-1de60a951514.png#averageHue=%23e2f3eb&clientId=u19981f0f-bd37-4&errorMessage=unknown%20error&id=zfA3M&originHeight=101&originWidth=1220&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u97a403c0-03d2-4c3c-b88e-126bac91ad4&title=)
**source**
如果需要导入sql文件,可以使用mysql中的source 指令 :
```sql
--语法 ：
source /root/xxxxx.sql
```
