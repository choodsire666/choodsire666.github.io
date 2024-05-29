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
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683687979340-1f321205-be1c-4fa8-8702-0b105133a1f7.png#averageHue=%23eeeeee&clientId=ucde2468f-83c7-4&from=paste&height=670&id=l5wS7&originHeight=1340&originWidth=3350&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1152000&status=done&style=none&taskId=u0a8a9723-319b-4e9b-9d65-d4856aea6e4&title=&width=1675)

1. **开启事务A**
2. 开启事务B
3. 在事务A中查询stu表的所有数据
4. 在事务B中修改stu表中id为1的数据
5. 在事务A中查询stu表的所有数据，发现id为1的数据没有变化
6. 在事务B中提交本次事务
7. 在事务A中查询stu表的所有数据，发现id为1的数据没有变化
8. 在事务A中查询stu表的所有数据，加上lock in share mode(共享锁)，发现id为1的数据是最新数据

在测试中我们可以看到，即使是在默认的RR隔离级别下，事务A中依然可以读取到事务B最新提交的内容，因为在查询语句后面加上了 lock in share mode 共享锁，此时是当前读操作。当然，当我们加排他锁的时候，也是当前读操作。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683688307305-e26a64c8-ef59-47e1-b6d5-6f7b4c286a87.png#averageHue=%23f3f3f3&clientId=ucde2468f-83c7-4&from=paste&height=296&id=kpOJL&originHeight=592&originWidth=3318&originalType=binary&ratio=2&rotation=0&showTitle=false&size=526722&status=done&style=none&taskId=u95fab9e0-3bd4-47c5-955b-4215ed5c2d2&title=&width=1659)

快照读：简单的select（不加锁）就是快照读，快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683688399796-bbd51b4e-687c-419b-a3cd-3db78131ca8a.png#averageHue=%23f3f3f3&clientId=ucde2468f-83c7-4&from=paste&height=296&id=hxIQF&originHeight=592&originWidth=3344&originalType=binary&ratio=2&rotation=0&showTitle=false&size=542521&status=done&style=none&taskId=ue6e77fc3-06d6-497a-87b6-2bd18755b08&title=&width=1672)

- Read Committed：每次select，都生成一个快照读。
- Repeatable Read：开启事务后第一个select语句才是快照读的地方。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683688683686-bff5c9a8-a367-467c-a8bb-93817677b55a.png#averageHue=%23eeeded&clientId=ucde2468f-83c7-4&from=paste&height=415&id=JTBYX&originHeight=830&originWidth=3344&originalType=binary&ratio=2&rotation=0&showTitle=false&size=741744&status=done&style=none&taskId=u45511127-a3b8-4a69-a739-c582e297de7&title=&width=1672)

- Serializable：快照读会退化为当前读。

测试
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683688875493-4ba5b778-44be-4151-8e8a-e7902da7a61c.png#averageHue=%23f3f2f2&clientId=ucde2468f-83c7-4&from=paste&height=604&id=jtdsM&originHeight=1208&originWidth=3348&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1131864&status=done&style=none&taskId=ue9a3f9ad-d29d-4ae3-adaa-cbb2730a554&title=&width=1674)
在测试中,我们看到即使事务B提交了数据,事务A中也查询不到。 原因就是因为普通的select是快照读，而在当前默认的RR隔离级别下，开启事务后第一个select语句才是快照读的地方，后面执行相同的select语句都是从快照中获取数据，可能不是当前的最新数据，这样也就保证了可重复读。
## 4.2 隐藏字段
### 4.2.1 介绍
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055417475-e92bc177-bff9-425c-b3b9-277a01f1ff11.png#averageHue=%23f9f8f8&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=oYpvn&originHeight=202&originWidth=365&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3e0f9ac0-1db0-49ff-80d7-d645d7b188a&title=)
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
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683792591605-cdaa8016-eba4-4189-884a-c18d216cc136.png#averageHue=%23faf3f1&clientId=uda8b01c9-b14b-4&from=paste&height=189&id=u2ca738c8&originHeight=178&originWidth=764&originalType=binary&ratio=2&rotation=0&showTitle=false&size=120796&status=done&style=none&taskId=u6c25451f-d7b1-4aec-90c0-84d59f4c32d&title=&width=811)
DB_TRX_ID : 代表最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID，是自增的。
DB_ROLL_PTR ： 由于这条数据是才插入的，没有被更新过，所以该字段值为null。

然后，有四个并发事务同时在访问这张表。

1. 第一步
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055418613-9ada5e88-c42c-43de-8cda-6caf05ba8021.png#averageHue=%23faf8f8&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=H81s4&originHeight=375&originWidth=915&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=uf4fca036-9fdf-4eb4-8a1d-c623c5ab82d&title=)
当事务2执行第一条修改语句时，会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055418807-9dad6f89-6751-427c-92ae-408200357a75.png#averageHue=%23f9efe5&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=BJs79&originHeight=301&originWidth=927&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u05d5bdbb-2187-4b28-b298-fe92cc6305a&title=)
2. 第二步
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055418837-24d87388-ec70-43b3-9661-e09b1d468f07.png#averageHue=%23faf7f6&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=snxdL&originHeight=378&originWidth=905&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4366386a-c0fe-48b6-9e1b-ad0d05f1e99&title=)
当事务3执行第一条修改语句时，也会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055418930-e3379982-fda4-4fad-9e50-df8a35bad483.png#averageHue=%23f8e8db&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=Eus5e&originHeight=324&originWidth=946&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u2f8b647e-2ae5-4ba5-a046-b7673c2f670&title=)
3. 第三步
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055419078-8909c7ed-5270-46f8-827f-5beeefd2ec23.png#averageHue=%23faf6f5&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=tDqlT&originHeight=379&originWidth=901&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u4a140e42-0ff2-4a6e-aa1f-afc8a45c5fa&title=)
当事务4执行第一条修改语句时，也会记录undo log日志，记录数据变更之前的样子; 然后更新记录，并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本。
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055419109-db5cf60b-fa2b-4f46-8454-28f870b51e01.png#averageHue=%23f8e6d6&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=DIlBp&originHeight=293&originWidth=912&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ub844a714-5e6c-4bab-93f0-be78cc9b9b4&title=)

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
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683793804166-b3247e5f-ae08-48dc-8b44-74ee5d6cafb7.png#averageHue=%23f0f0f0&clientId=uda8b01c9-b14b-4&from=paste&height=327&id=u01660750&originHeight=369&originWidth=1269&originalType=binary&ratio=2&rotation=0&showTitle=false&size=397568&status=done&style=none&taskId=u9cf55d3d-10e0-44d0-b04e-ed16a0ec811&title=&width=1125.5)
那么这两次快照读在获取数据时，就需要根据所生成的ReadView以及ReadView的版本链访问规则，到undolog版本链中匹配数据，最终决定此次快照读返回的数据。

1. 先来看第一次快照读具体的读取过程：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683794144466-836a0f7c-d5ad-4613-9ae0-201f1fc2dbb1.png#averageHue=%23f4f2ef&clientId=uda8b01c9-b14b-4&from=paste&height=613&id=u27ae3912&originHeight=660&originWidth=1642&originalType=binary&ratio=2&rotation=0&showTitle=false&size=965241&status=done&style=none&taskId=ud917ce3d-0793-4054-b8ac-4f0818adea4&title=&width=1526)
在进行匹配时，会从undo log的版本链，从上到下进行挨个匹配：

先匹配
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683794204070-abbff7e6-c5d0-431e-9aae-1b7febcf416c.png#averageHue=%23c7ecc7&clientId=uda8b01c9-b14b-4&from=paste&height=114&id=u8a9401f2&originHeight=72&originWidth=370&originalType=binary&ratio=2&rotation=0&showTitle=false&size=31466&status=done&style=none&taskId=u5bb41849-e0ce-4859-a6e5-1d7e118cb15&title=&width=584)
这条记录，这条记录对应的trx_id为4，也就是将4带入右侧的匹配规则中。 ①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条。
再匹配第二条
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055419622-42cd0608-8a70-4133-b7bc-92c6b631042f.png#averageHue=%23f6dbc3&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&height=57&id=QSx8z&originHeight=57&originWidth=646&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u09e52e90-a30d-481b-90fc-87fb8f3a272&title=&width=646)
这条记录对应的trx_id为3，也就是将3带入右侧的匹配规则中。①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条
再匹配第三条
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055419577-80a7e701-9c56-49c4-ade4-17e3a2cd100c.png#averageHue=%23f8e3d1&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&height=67&id=ruG42&originHeight=67&originWidth=637&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u0f3b5708-8a0f-4487-8668-f91ab4bf6dd&title=&width=637)
这条记录对应的trx_id为2，也就是将2带入右侧的匹配规则中。①不满足 ②满足 终止匹配，此次快照读，返回的数据就是版本链中记录的这条数据。

2. 再来看第二次快照读具体的读取过程:
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683794577723-df90e2ba-bc67-4067-a856-f9cfb39d46a9.png#averageHue=%23f3f1ef&clientId=uda8b01c9-b14b-4&from=paste&height=611&id=udf81ffe3&originHeight=656&originWidth=1616&originalType=binary&ratio=2&rotation=0&showTitle=false&size=965973&status=done&style=none&taskId=u21e6fcda-d6d3-41f0-a06f-f04077b7867&title=&width=1504)
在进行匹配时，会从undo log的版本链，从上到下进行挨个匹配：
先匹配
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055419741-59cfda8c-6e0b-4e26-85fa-f933170ede16.png#averageHue=%23e9e8e6&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=yCa7U&originHeight=133&originWidth=725&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u7561b279-cc82-465c-9e2f-ad7334e542b&title=)
这条记录，这条记录对应的trx_id为4，也就是将4带入右侧的匹配规则中。 ①不满足 ②不满足 ③不满足 ④也不满足 ，都不满足，则继续匹配undo log版本链的下一条。
再匹配第二条
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055420094-b8804c0a-3acf-40e3-9ff5-c1b004282f6c.png#averageHue=%23f8e1ce&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&height=74&id=OTCqU&originHeight=89&originWidth=858&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u6e21c063-850b-4c87-b984-f874872c8cc&title=&width=717)
这条记录对应的trx_id为3，也就是将3带入右侧的匹配规则中。①不满足 ②满足 。终止匹配，此次快照读，返回的数据就是版本链中记录的这条数据。
### 4.5.2 RR隔离级别
RR隔离级别下，仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView。 而RR 是可重复读，在一个事务中，执行两次相同的select语句，查询到的结果是一样的。
那MySQL是如何做到可重复读的呢? 我们简单分析一下就知道了
![image.png](https://cdn.nlark.com/yuque/0/2023/png/22334924/1683794976934-c56d5045-0053-4d88-a479-7e6877a85bc9.png#averageHue=%23f0f0ef&clientId=uda8b01c9-b14b-4&from=paste&height=563&id=u6f8bff17&originHeight=333&originWidth=1020&originalType=binary&ratio=2&rotation=0&showTitle=false&size=323038&status=done&style=none&taskId=u641180ce-e1d2-4f05-8f6b-27a1fbe07a6&title=&width=1723)
我们看到，在RR隔离级别下，只是在事务中第一次快照读时生成ReadView，后续都是复用该ReadView，那么既然ReadView都一样， ReadView的版本链匹配规则也一样， 那么最终快照读返回的结果也是一样的。
所以呢，MVCC的实现原理就是通过 InnoDB表的隐藏字段、UndoLog 版本链、ReadView来实现的。而MVCC + 锁，则实现了事务的隔离性。 而一致性则是由redolog 与 undolog保证。

![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665055420040-372e81e5-1d5b-4e00-ad26-456212f8eb3c.png#averageHue=%23fbf4f3&clientId=u76b53889-a52a-4&errorMessage=unknown%20error&id=OZ0fC&originHeight=493&originWidth=1183&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u23ba0303-1192-41c0-8cfd-28f35a8b57b&title=)
