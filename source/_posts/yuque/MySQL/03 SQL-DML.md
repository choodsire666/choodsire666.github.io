---
title: 03 SQL-DML
urlname: neza21i4oy5v3wvf
date: '2024-03-13 17:29:06'
updated: '2024-03-14 11:56:57'
description: 笔记来源：黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括DML英文全称是Data Manipulation Language(数据操作语言)，用来对数据库中表的数据记录进行增、删、改操作。●添加数据（INSERT）●修改数据（UPDATE）●删除...
---

**笔记来源：**[黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)

DML英文全称是Data Manipulation Language(数据操作语言)，用来对数据库中表的数据记录进行增、删、改操作。
●添加数据（INSERT）
●修改数据（UPDATE）
●删除数据（DELETE）

## 1 添加数据
① 给指定字段添加数据
案例:

插入数据完成之后，可以直接一条查询数据的SQL语句, 语句如下:

案例:
执行上述的SQL语句时，报错了，具体的错误信息如下： 
![](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fimg2022.cnblogs.com%2Fblog%2F2217415%2F202204%2F2217415-20220428211021163-1286049682.png&sign=2880cb03fb2927d90c348324dbc96272b8c82ed864817cd6967cfc0ecb1739ec#from=url&id=RB7dp&originHeight=84&originWidth=1275&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&status=done&style=none&title=)
因为 employee 表的age字段类型为 tinyint，而且还是无符号的 unsigned ，所以取值只能在0-255 之间。
**② 给全部字段添加数据**
案例：

**③ 批量添加数据**部分字段：
全部字段：
案例：
注意事项:
●插入数据时，指定的字段顺序需要与值的顺序是一一对应的。
●字符串和日期型数据应该包含在引号中。
●插入的数据大小，应该在字段的规定范围内。
## 2 修改数据

修改数据的具体语法为:

UPDATE 表名 SET 字段名1 = 值1 , 字段名2 = 值2 , .... [WHERE 条件 ];
案例:

-- A. 修改id为1的数据，将name修改为itheima
update employee set name ='itheima'where id =1;
-- B. 修改id为1的数据, 将name修改为小昭, gender修改为 女
update employee set name ='小昭', gender ='女'where id =1;
-- C. 将所有的员工入职日期修改为 2008-01-01
update employee set entrydate ='2008-01-01';
注意事项:修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据。
## **3.删除数据**

删除数据的具体语法为：

DELETEFROM 表名 [WHERE 条件 ];
案例:

-- A. 删除gender为女的员工
deletefrom employee where gender ='女';
-- B. 删除所有员工
deletefrom employee;
注意事项
●DELETE 语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数据。
●DELETE 语句不能删除某一个字段的值(可以使用UPDATE，将该字段值置为NULL即 可)。
●当进行删除全部数据操作时，datagrip会提示我们，询问是否确认删除，我们直接点击Execute即可。
