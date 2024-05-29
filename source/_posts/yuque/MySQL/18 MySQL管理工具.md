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
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/fef64476cdf2c1c168f3bd62cebe375f.png)
执行完毕，并未进入Mysql命令行。
# 2 mysqladmin
mysqladmin 是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等。
通过帮助文档查看选项：
```sql
mysqladmin --help
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/07ffb264ffffb5f2f3a980029734ff25.png)
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
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/a12666f6bd8818ecbbaa774429630911.png)
```sql
mysqladmin -uroot –p1234 version;
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/7538d82bb2013d298dc8b86049252f51.png)
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
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/d6f6a1eb9b509905f35a98a980e476f5.png)
上述查看到的二进制日志文件数据信息量太多了，不方便查询。 我们可以加上一个参数 -s 来显示简单格式。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/3c5bbb9b1b18f231510af20c3cdf0616.png)
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
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/f8ba2db656b8eb122e13f63485fad5c4.png)

2. 查看数据库db01的统计信息
```plsql
mysqlshow -uroot -p1234 db01 --count
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/81f64f6da3111570bcf82c6e5a5fd9e0.png)

3. 查看数据库db01中的course表的信息
```plsql
mysqlshow -uroot -p1234 db01 course --count
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/856d214624160fd70b1a112a41b7addf.png)

4. 查看数据库db01中的course表的id字段的信息
```plsql
mysqlshow -uroot -p1234 db01 course id --count
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/fafe5934db13b6856edd996deea6d86c.png)
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
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/43f61ee097cf08efbea23d42bb2bccf5.png)
可以直接打开db01.sql，来查看备份出来的数据到底什么样。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/9df2e15b371830effd1dccaa438c36c3.png)
备份出来的数据包含：

- 删除表的语句
- 创建表的语句
- 数据插入语句

如果我们在数据备份时，不需要创建表，或者不需要备份数据，只需要备份表结构，都可以通过对应的参数来实现。

B. 备份db01数据库中的表数据，不备份表结构(-t)
```plsql
mysqldump -uroot -p1234 -t db01 > db02.sql
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/55ad254425140a751b3541302a3c6510.png)
打开 db02.sql ，来查看备份的数据，只有insert语句，没有备份表结构。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/ec27492e738b2b66d487845087858ee6.png)
C. 将db01数据库的表的表结构与数据分开备份(-T)
```plsql
mysqldump -uroot -p1234 -T /root db01 score
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/5a6cfc72d99324c508895203a6958aa1.png)
执行上述指令，会出错，数据不能完成备份，原因是因为我们所指定的数据存放目录/root，MySQL认为是不安全的，需要存储在MySQL信任的目录下。那么，哪个目录才是MySQL信任的目录呢，可以查看一下系统变量 secure_file_priv 。执行结果如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/99eb3d8c0d86d22be1517700dc61a7af.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/dec9a9c6fce664e40a171fb3744faa02.png)
上述的两个文件 score.sql 中记录的就是表结构文件，而 score.txt 就是表数据文件，但是需要注意表数据文件，并不是记录一条条的insert语句，而是按照一定的格式记录表结构中的数据。如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/00d23654eb7ec646c8ca3617ee73a35a.png)
# 6 mysqlimport/source
**mysqlimport**
mysqlimport 是客户端数据导入工具，用来导入mysqldump 加 -T 参数后导出的文本文件。
```sql
--语法 ：
mysqlimport [options] db_name textfile1 [textfile2...] 
--示例 ：
mysqlimport -uroot -p2143 test /tmp/city.txt
```
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/18 MySQL管理工具/4cc68e1b3467d00222500fa87282885e.png)
**source**
如果需要导入sql文件,可以使用mysql中的source 指令 :
```sql
--语法 ：
source /root/xxxxx.sql
```
