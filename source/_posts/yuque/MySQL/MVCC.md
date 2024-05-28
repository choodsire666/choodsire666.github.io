---
title: MVCC
urlname: zet55u1fhb20gn4w
date: '2024-04-08 11:53:38'
updated: '2024-04-15 16:04:40'
cover: 'https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055417475-e92bc177-bff9-425c-b3b9-277a01f1ff11.png'
description: MVCC：全称 Multi-Version Concurrency Control，多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突，快照读为MySQL实现MVCC提供了一个非阻塞读功能。MVCC的具体实现，还需要依赖于数据库记录中的三个隐式字段、undo log日志、readV...
---
MVCC：全称 Multi-Version Concurrency Control，多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突，快照读为MySQL实现MVCC提供了一个非阻塞读功能。MVCC的具体实现，还需要依赖于数据库记录中的三个隐式字段、undo log日志、readView。
接下来，我们再来介绍一下InnoDB引擎的表中涉及到的隐藏字段 、undolog 以及 readview，从而来介绍一下MVCC的原理。
# **4 MVCC**
## **4.1 基本概念**
当前读：指的是读取的是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如：select ... lock in share mode(共享锁)，select ...for update、update、insert、delete(排他锁)都是一种当前读。
快照读：简单的select就是快照读，快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读。
Read Commit 每次读，都生成一个快照读
Repeatable Read 开启事务后第一个select语句才是快照读的地方。
Serilizable 快照读会退化成当前读
测试：
```sql
create table stu(
    id int primary key auto_increment,
    name varchar(32),
    age int
);
insert into stu(name,age) value("java",21);
insert into stu(name,age) value("h5",28);
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/0217b361135f9250f1cc5d9530941589.png)

1. **开启事务A**
2. 开启事务B
3. 在事务A中查询stu表的所有数据
4. 在事务B中修改stu表中id为1的数据
5. 在事务A中查询stu表的所有数据，发现id为1的数据没有变化
6. 在事务B中提交本次事务
7. 在事务A中查询stu表的所有数据，发现id为1的数据没有变化
8. 在事务A中查询stu表的所有数据，加上lock in share mode(共享锁)，发现id为1的数据是最新数据

在测试中我们可以看到，即使是在默认的RR隔离级别下，事务A中依然可以读取到事务B最新提交的内容，因为在查询语句后面加上了 lock in share mode 共享锁，此时是当前读操作。当然，当我们加排他锁的时候，也是当前读操作。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/8713975c02d640e396f10aa1d714d40e.png)

快照读：简单的select（不加锁）就是快照读，快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/db7f476c05c89898965333afbb81cd99.png)

- Read Committed：每次select，都生成一个快照读。
- Repeatable Read：开启事务后第一个select语句才是快照读的地方。

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/4b3484e94f15d362e9cd71c256732651.png)

- Serializable：快照读会退化为当前读。

测试
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/282f410f492a871a990384ce9643ab0e.png)
在测试中,我们看到即使事务B提交了数据,事务A中也查询不到。 原因就是因为普通的select是快照读，而在当前默认的RR隔离级别下，开启事务后第一个select语句才是快照读的地方，后面执行相同的select语句都是从快照中获取数据，可能不是当前的最新数据，这样也就保证了可重复读。
## 4.2 隐藏字段
### 4.2.1 介绍
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/80020cd656d0fbb2c6cc8e2743fbd6b7.png)
当我们创建了上面的这张表，我们在查看表结构的时候，就可以显式的看到这三个字段。 实际上除了这三个字段以外，InnoDB还会自动的给我们添加三个隐藏字段及其含义分别是：

| 隐藏字段 | 含义 |
| --- | --- |
| DB_TRX_ID | 最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID。 |
| DB_ROLL_PTR | 回滚指针，指向这条记录的上一个版本，用于配合undo log，指向上一个版本。 |
| DB_ROW_ID | 隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段。 |

而上述的前两个字段是肯定会添加的， 是否添加最后一个字段DB_ROW_ID，得看当前表有没有主键，如果有主键，则不会添加该隐藏字段。
### 4.2.2 测试
**查看有主键的表 stu**
进入服务器中的 /Users/admin/Desktop/docker-container/mysql/data/db2019 , 查看stu的表结构信息, 通过如下指令:
```graphql
ibd2sdi stu.ibd
```
查看到的表结构信息中，有一栏 columns，在其中我们会看到处理我们建表时指定的字段以外，还有额外的两个字段 分别是：DB_TRX_ID 、 DB_ROLL_PTR ，因为该表有主键，所以没有DB_ROW_ID隐藏字段。
```json
admin@cg db2019 % ibd2sdi stu.ibd
["ibd2sdi"
,
{
	"type": 1,
	"id": 398,
	"object":
		{
    "mysqld_version_id": 80032,
    "dd_version": 80023,
    "sdi_version": 80019,
    "dd_object_type": "Table",
    "dd_object": {
        "name": "stu",
        "mysql_version_id": 80032,
        "created": 20230510025716,
        "last_altered": 20230510025716,
        "hidden": 1,
        "options": "avg_row_length=0;encrypt_type=N;key_block_size=0;keys_disabled=0;pack_record=1;stats_auto_recalc=0;stats_sample_pages=0;",
        "columns": [
            {
                "name": "id",
                "type": 4,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": true,
                "is_virtual": false,
                "hidden": 1,
                "ordinal_position": 1,
                "char_length": 11,
                "numeric_precision": 10,
                "numeric_scale": 0,
                "numeric_scale_null": false,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": false,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "AAAAAA==",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "interval_count=0;",
                "se_private_data": "table_id=1091;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 2,
                "column_type_utf8": "int",
                "elements": [],
                "collation_id": 255,
                "is_explicit_collation": false
            },
            {
                "name": "name",
                "type": 16,
                "is_nullable": true,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 1,
                "ordinal_position": 2,
                "char_length": 128,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "interval_count=0;",
                "se_private_data": "table_id=1091;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "varchar(32)",
                "elements": [],
                "collation_id": 255,
                "is_explicit_collation": false
            },
            {
                "name": "age",
                "type": 4,
                "is_nullable": true,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 1,
                "ordinal_position": 3,
                "char_length": 11,
                "numeric_precision": 10,
                "numeric_scale": 0,
                "numeric_scale_null": false,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "interval_count=0;",
                "se_private_data": "table_id=1091;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "int",
                "elements": [],
                "collation_id": 255,
                "is_explicit_collation": false
            },
            {
                "name": "DB_TRX_ID",
                "type": 10,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 4,
                "char_length": 6,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1091;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            },
            {
                "name": "DB_ROLL_PTR",
                "type": 9,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 5,
                "char_length": 7,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1091;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            }
        ],
        "schema_ref": "db2019",
        "se_private_id": 1091,
        "engine": "InnoDB",
        "last_checked_for_upgrade_version_id": 0,
        "comment": "",
        "se_private_data": "autoinc=0;version=0;",
        "engine_attribute": "",
        "secondary_engine_attribute": "",
        "row_format": 2,
        "partition_type": 0,
        "partition_expression": "",
        "partition_expression_utf8": "",
        "default_partitioning": 0,
        "subpartition_type": 0,
        "subpartition_expression": "",
        "subpartition_expression_utf8": "",
        "default_subpartitioning": 0,
        "indexes": [
            {
                "name": "PRIMARY",
                "hidden": false,
                "is_generated": false,
                "ordinal_position": 1,
                "comment": "",
                "options": "flags=0;",
                "se_private_data": "id=202;root=4;space_id=25;table_id=1091;trx_id=6940;",
                "type": 1,
                "algorithm": 2,
                "is_algorithm_explicit": false,
                "is_visible": true,
                "engine": "InnoDB",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "elements": [
                    {
                        "ordinal_position": 1,
                        "length": 4,
                        "order": 2,
                        "hidden": false,
                        "column_opx": 0
                    },
                    {
                        "ordinal_position": 2,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 3
                    },
                    {
                        "ordinal_position": 3,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 4
                    },
                    {
                        "ordinal_position": 4,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 1
                    },
                    {
                        "ordinal_position": 5,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 2
                    }
                ],
                "tablespace_ref": "db2019/stu"
            }
        ],
        "foreign_keys": [],
        "check_constraints": [],
        "partitions": [],
        "collation_id": 255
    }
}
}
,
{
	"type": 2,
	"id": 30,
	"object":
		{
    "mysqld_version_id": 80032,
    "dd_version": 80023,
    "sdi_version": 80019,
    "dd_object_type": "Tablespace",
    "dd_object": {
        "name": "db2019/stu",
        "comment": "",
        "options": "autoextend_size=0;encryption=N;",
        "se_private_data": "flags=16417;id=25;server_version=80032;space_version=1;state=normal;",
        "engine": "InnoDB",
        "engine_attribute": "",
        "files": [
            {
                "ordinal_position": 1,
                "filename": "./db2019/stu.ibd",
                "se_private_data": "id=25;"
            }
        ]
    }
}
}
]

```
**查看没有主键的表 employee**
建表语句：
```plsql
create table employee (id int , name varchar(10));
```
此时，我们再通过以下指令来查看表结构及其其中的字段信息：
```plsql
ibd2sdi employee.ibd
```
查看到的表结构信息中，有一栏 columns，在其中我们会看到处理我们建表时指定的字段以外，还有额外的三个字段 分别是：DB_TRX_ID 、 DB_ROLL_PTR 、DB_ROW_ID，因为employee表是没有指定主键的。
```json
admin@cg db2019 % ibd2sdi employee.ibd
["ibd2sdi"
,
{
	"type": 1,
	"id": 400,
	"object":
		{
    "mysqld_version_id": 80032,
    "dd_version": 80023,
    "sdi_version": 80019,
    "dd_object_type": "Table",
    "dd_object": {
        "name": "employee",
        "mysql_version_id": 80032,
        "created": 20230511054438,
        "last_altered": 20230511054438,
        "hidden": 1,
        "options": "avg_row_length=0;encrypt_type=N;key_block_size=0;keys_disabled=0;pack_record=1;stats_auto_recalc=0;stats_sample_pages=0;",
        "columns": [
            {
                "name": "id",
                "type": 4,
                "is_nullable": true,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 1,
                "ordinal_position": 1,
                "char_length": 11,
                "numeric_precision": 10,
                "numeric_scale": 0,
                "numeric_scale_null": false,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "interval_count=0;",
                "se_private_data": "table_id=1092;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "int",
                "elements": [],
                "collation_id": 255,
                "is_explicit_collation": false
            },
            {
                "name": "name",
                "type": 16,
                "is_nullable": true,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 1,
                "ordinal_position": 2,
                "char_length": 40,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "interval_count=0;",
                "se_private_data": "table_id=1092;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "varchar(10)",
                "elements": [],
                "collation_id": 255,
                "is_explicit_collation": false
            },
            {
                "name": "DB_ROW_ID",
                "type": 10,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 3,
                "char_length": 6,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1092;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            },
            {
                "name": "DB_TRX_ID",
                "type": 10,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 4,
                "char_length": 6,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1092;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            },
            {
                "name": "DB_ROLL_PTR",
                "type": 9,
                "is_nullable": false,
                "is_zerofill": false,
                "is_unsigned": false,
                "is_auto_increment": false,
                "is_virtual": false,
                "hidden": 2,
                "ordinal_position": 5,
                "char_length": 7,
                "numeric_precision": 0,
                "numeric_scale": 0,
                "numeric_scale_null": true,
                "datetime_precision": 0,
                "datetime_precision_null": 1,
                "has_no_default": false,
                "default_value_null": true,
                "srs_id_null": true,
                "srs_id": 0,
                "default_value": "",
                "default_value_utf8_null": true,
                "default_value_utf8": "",
                "default_option": "",
                "update_option": "",
                "comment": "",
                "generation_expression": "",
                "generation_expression_utf8": "",
                "options": "",
                "se_private_data": "table_id=1092;",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "column_key": 1,
                "column_type_utf8": "",
                "elements": [],
                "collation_id": 63,
                "is_explicit_collation": false
            }
        ],
        "schema_ref": "db2019",
        "se_private_id": 1092,
        "engine": "InnoDB",
        "last_checked_for_upgrade_version_id": 0,
        "comment": "",
        "se_private_data": "",
        "engine_attribute": "",
        "secondary_engine_attribute": "",
        "row_format": 2,
        "partition_type": 0,
        "partition_expression": "",
        "partition_expression_utf8": "",
        "default_partitioning": 0,
        "subpartition_type": 0,
        "subpartition_expression": "",
        "subpartition_expression_utf8": "",
        "default_subpartitioning": 0,
        "indexes": [
            {
                "name": "PRIMARY",
                "hidden": true,
                "is_generated": false,
                "ordinal_position": 1,
                "comment": "",
                "options": "",
                "se_private_data": "id=203;root=4;space_id=26;table_id=1092;trx_id=7444;",
                "type": 2,
                "algorithm": 2,
                "is_algorithm_explicit": false,
                "is_visible": true,
                "engine": "InnoDB",
                "engine_attribute": "",
                "secondary_engine_attribute": "",
                "elements": [
                    {
                        "ordinal_position": 1,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 2
                    },
                    {
                        "ordinal_position": 2,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 3
                    },
                    {
                        "ordinal_position": 3,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 4
                    },
                    {
                        "ordinal_position": 4,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 0
                    },
                    {
                        "ordinal_position": 5,
                        "length": 4294967295,
                        "order": 2,
                        "hidden": true,
                        "column_opx": 1
                    }
                ],
                "tablespace_ref": "db2019/employee"
            }
        ],
        "foreign_keys": [],
        "check_constraints": [],
        "partitions": [],
        "collation_id": 255
    }
}
}
,
{
	"type": 2,
	"id": 31,
	"object":
		{
    "mysqld_version_id": 80032,
    "dd_version": 80023,
    "sdi_version": 80019,
    "dd_object_type": "Tablespace",
    "dd_object": {
        "name": "db2019/employee",
        "comment": "",
        "options": "autoextend_size=0;encryption=N;",
        "se_private_data": "flags=16417;id=26;server_version=80032;space_version=1;state=normal;",
        "engine": "InnoDB",
        "engine_attribute": "",
        "files": [
            {
                "ordinal_position": 1,
                "filename": "./db2019/employee.ibd",
                "se_private_data": "id=26;"
            }
        ]
    }
}
}
]
```
## 4.3 undolog
### 4.3.1 介绍
回滚日志：在insert、update、delete的时候产生的便于数据回滚的日志。
当insert的时候，产生的undo log日志只在回滚时需要，在事务提交后，可被立即删除。
而update、delete的时候，产生的undo log日志不仅在回滚时需要，在快照读时也需要，不会立即被删除。
### 4.3.2 undolog 版本链
有一张表原始数据为：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/a6500b55e0b0271200c8e5489c7dcc3f.png)
DB_TRX_ID : 代表最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID，是自增的。
DB_ROLL_PTR ： 由于这条数据是才插入的，没有被更新过，所以该字段值为null。

然后，有四个并发事务同时在访问这张表。

1. 第一步
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/28c35e5d132982febedd7ea528a1c5eb.png)
当事务2执行第一条修改语句时，会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/67cf79a9a4c49fb8e4a630d182c3765d.png)
2. 第二步
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/ccf5319410a5c6314a859d14de5dff03.png)
当事务3执行第一条修改语句时，也会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/7b084dd3432adedb65e5b13d2c782a78.png)
3. 第三步
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/6a99822f9e7a3d66e4f400dfb1881901.png)
当事务4执行第一条修改语句时，也会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/9476de99bcede77ec3631c31dd497fbe.png)

最终我们发现，不同事务或相同事务对同一条记录进行修改，会导致该记录的undolog生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录。
## 4.4 readview
ReadView（读视图）是 快照读 SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃的事务（未提交的）id。
ReadView中包含了四个核心字段：

| 字段 | 含义 |
| --- | --- |
| m_ids | 当前活跃的事务ID集合 |
| min_trx_id | 最小活跃事务ID |
| max_trx_id | 预分配事务ID，当前最大事务ID+1（因为事务ID是自增的） |
| creator_trx_id | ReadView创建者的事务ID |


而在readview中就规定了版本链数据的访问规则：

| 条件 | 是否可以访问 | 说明 |
| --- | --- | --- |
| trx_id == creator_trx_id | 可以访问该版本 | 成立，说明数据是当前这个事务更改的。 |
| trx_id < min_trx_id | 可以访问该版本 | 成立，说明数据已经提交了。 |
| trx_id > max_trx_id | 不可以访问该版本 | 成立，说明该事务是在ReadView生成后才开启。 |
| min_trx_id <= trx_id <= max_trx_id | 如果trx_id不在m_ids中，是可以访问该版本的 | 成立，说明数据已经提交。 |

不同的隔离级别，生成ReadView的时机不同：

- READ COMMITTED ：在事务中每一次执行快照读时生成ReadView。
- REPEATABLE READ：仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView。
## 4.5 原理分析
### 4.5.1 RC隔离级别
RC隔离级别下，在事务中每一次执行快照读时生成ReadView。
我们就来分析事务5中，两次快照读读取数据，是如何获取数据的?
在事务5中，查询了两次id为30的记录，由于隔离级别为Read Committed，所以每一次进行快照读都会生成一个ReadView，那么两次生成的ReadView如下。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/4460d2b3fee048ed6700f19e63992590.png)
那么这两次快照读在获取数据时，就需要根据所生成的ReadView以及ReadView的版本链访问规则，到undolog版本链中匹配数据，最终决定此次快照读返回的数据。

1. 先来看第一次快照读具体的读取过程：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/c140caec0fc35bcb64cf389b7bea4e3f.png)
在进行匹配时，会从undo log的版本链，从上到下进行挨个匹配：

先匹配
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/08b7496ccc2803998df3a2109e686694.png)
这条记录，这条记录对应的trx_id为4，也就是将4带入右侧的匹配规则中。 ①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条。
再匹配第二条
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/c54b653f37541f4c0e3c28bec51a6dbd.png)
这条记录对应的trx_id为3，也就是将3带入右侧的匹配规则中。①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条
再匹配第三条
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/3cecdfc22de8e8953402f267dc38161d.png)
这条记录对应的trx_id为2，也就是将2带入右侧的匹配规则中。①不满足 ②满足 终止匹配，此次快照读，返回的数据就是版本链中记录的这条数据。

2. 再来看第二次快照读具体的读取过程:
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/4fea621cc080a0ed5be310b0040f5ce5.png)
在进行匹配时，会从undo log的版本链，从上到下进行挨个匹配：
先匹配
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/152b1e53bcf8b3af80b02480f45691c5.png)
这条记录，这条记录对应的trx_id为4，也就是将4带入右侧的匹配规则中。 ①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条。
再匹配第二条
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/f65eba6400367dddcb9d9eac684b845f.png)
这条记录对应的trx_id为3，也就是将3带入右侧的匹配规则中。①不满足 ②满足 。终止匹配，此次快照读，返回的数据就是版本链中记录的这条数据。
### 4.5.2 RR隔离级别
RR隔离级别下，仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView。 而RR 是可重复读，在一个事务中，执行两次相同的select语句，查询到的结果是一样的。
那MySQL是如何做到可重复读的呢? 我们简单分析一下就知道了
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/da3c93041bacf60c1bfbc4f0f4929bb8.png)
我们看到，在RR隔离级别下，只是在事务中第一次快照读时生成ReadView，后续都是复用该ReadView，那么既然ReadView都一样， ReadView的版本链匹配规则也一样， 那么最终快照读返回的结果也是一样的。
所以呢，MVCC的实现原理就是通过 InnoDB表的隐藏字段、UndoLog 版本链、ReadView来实现的。而MVCC + 锁，则实现了事务的隔离性。 而一致性则是由redolog 与 undolog保证。

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/MVCC/7eeab8c6b230e5e5e16a170daca10c09.png)
