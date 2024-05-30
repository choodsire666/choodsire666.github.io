---
title: BUG库
urlname: gr7lgx
date: '2022-08-21 09:32:55'
updated: '2024-05-17 13:49:27'
cover: 'https://raw.githubusercontent.com/choodsire666/blog-img/main/BUG库/f288e0b99641a9caaac776afb5639f0a.png'
description: Idea快捷键熟练开发环境idea导入Maven目录相信自己解决问题的能力，当下犯得每一个错误，对未来都是少走一步弯路，坚持是一种优良的传统美德。加油欧里给！！！你的知识底蕴，方法论，勤奋的品质，都是其他人足以羡慕的！编译目录让idea识别静态文件夹，ps：没有识别时webContent文件夹...
---
# Idea
快捷键熟练
# 开发环境
## idea导入Maven目录
相信自己解决问题的能力，当下犯得每一个错误，对未来都是少走一步弯路，坚持是一种优良的传统美德。加油欧里给！！！
你的知识底蕴，方法论，勤奋的品质，都是其他人足以羡慕的！
## 编译目录
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/BUG库/f288e0b99641a9caaac776afb5639f0a.png)
## 让idea识别静态文件夹，
ps：没有识别时webContent文件夹没有变成小蓝点
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/BUG库/c2c332a347fda43985145e5b4a80e0a9.png)
## 这是配置成将会导出的war包
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/BUG库/57b180bd6e0562fc1be2d6a2de97f4bb.png)
# Java基础
判断字符串是否相等时候
异常判断
File文件之间的判断
# 数据库
## 查询问题
## sql_mode=only_full_group_by 
方法一：直接修改数据库配置
```sql
select @@global.sql_mode;
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION
SET GLOBAL sql_mode='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
```
方法二：修改数据库配置(永久生效)
修改配置文件my.ini
在[mysqld]模块下新增一行配置：
```sql
sql_mode='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
```
运行后重启，即可生效
方法三：使用 any_value() 或 group_concat()

1. any_value()：将分到同一组的数据里第一条数据的指定列值作为返回数据。 （any_value()函数就是MySQL提供的用来抑制ONLY_FULL_GROUP_BY值被拒绝的）
```sql
select Beijing,any_value(Shanghai) from city group by Beijing
```

2. group_concat()：将分到同一组的数据默认用逗号隔开作为返回数据
```sql
select Beijing,group_concat(Shanghai) from city group by Beijing
```
在return 循环里面不能用查询语句	
通义灵码的代码提示
代码回顾

## 数据库的问题
## 新版本的数据库连接
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/BUG库/1dea514b2975a0143670ad7d5aed4833.png)
版本之间要对应
# Javaweb开发中的报错
## 细节上的开发错误
关于单词的问题
缺少变量
方法参数的对应
## XML
配置时id名要相对应
xml文件中字段不对应
要严格按照格式进行书写，不得有一丝马虎大意
比如里面有的是小括号有的是大括号
## 注入属性
Value()的使用要加$才能注入进去
## 对应的类要加入注解
@Component这样才能创建对象
在使用的时候才能找到。
## 数组越界问题
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 6
# Spring
# MyBatisPlus
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/BUG库/e01b6d097edd5982524e259a523ead5c.png)
接到需求
查看前端发过来的数据有哪些？
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/BUG库/1e70743a47678e4d509051ffd4d60bb7.png)
这是数据库表中字段对应着的属性



