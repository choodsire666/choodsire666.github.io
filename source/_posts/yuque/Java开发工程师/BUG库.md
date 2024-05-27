# Idea
快捷键熟练
# 开发环境
## idea导入Maven目录
相信自己解决问题的能力，当下犯得每一个错误，对未来都是少走一步弯路，坚持是一种优良的传统美德。加油欧里给！！！<br />你的知识底蕴，方法论，勤奋的品质，都是其他人足以羡慕的！
## 编译目录
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29688613/1661397327129-e9cce257-1a51-47d6-983f-cd6ddf4d6d47.png#averageHue=%233d4145&clientId=u39ece894-3217-4&from=paste&id=ue7b7c111&originHeight=520&originWidth=1120&originalType=url&ratio=1&rotation=0&showTitle=false&size=53863&status=done&style=none&taskId=ub7d0a22f-c412-4b2f-8c20-2663271acda&title=)
## 让idea识别静态文件夹，
ps：没有识别时webContent文件夹没有变成小蓝点<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/29688613/1661397353718-43d4756a-fc7c-45d8-b986-094ecfe25760.png#averageHue=%233d4146&clientId=u39ece894-3217-4&from=paste&id=uedaae052&originHeight=977&originWidth=1296&originalType=url&ratio=1&rotation=0&showTitle=false&size=87391&status=done&style=none&taskId=u88daa717-195e-463d-9683-c6c89900eed&title=)
## 这是配置成将会导出的war包
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29688613/1661397401402-5333475c-cfbe-4487-97fe-6e76d74e0592.png#averageHue=%233d4246&clientId=u39ece894-3217-4&from=paste&id=u51579aa9&originHeight=534&originWidth=931&originalType=url&ratio=1&rotation=0&showTitle=false&size=51713&status=done&style=none&taskId=u915548f2-44b8-421f-8de2-cde4a3a9fc4&title=)
# Java基础
判断字符串是否相等时候<br />异常判断<br />File文件之间的判断
# 数据库
## 查询问题
## sql_mode=only_full_group_by 
方法一：直接修改数据库配置
```sql
select @@global.sql_mode;
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION
SET GLOBAL sql_mode='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
```
方法二：修改数据库配置(永久生效)<br />修改配置文件my.ini<br />在[mysqld]模块下新增一行配置：
```sql
sql_mode='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
```
运行后重启，即可生效<br />方法三：使用 any_value() 或 group_concat()

1. any_value()：将分到同一组的数据里第一条数据的指定列值作为返回数据。 （any_value()函数就是MySQL提供的用来抑制ONLY_FULL_GROUP_BY值被拒绝的）
```sql
select Beijing,any_value(Shanghai) from city group by Beijing
```

2. group_concat()：将分到同一组的数据默认用逗号隔开作为返回数据
```sql
select Beijing,group_concat(Shanghai) from city group by Beijing
```
在return 循环里面不能用查询语句	<br />通义灵码的代码提示<br />代码回顾

## 数据库的问题
## 新版本的数据库连接
![image.png](https://cdn.nlark.com/yuque/0/2022/png/29688613/1661399038176-4bfe8d03-ae65-41bc-bf21-0633b49924e4.png#averageHue=%231f1f29&clientId=u39ece894-3217-4&from=paste&height=192&id=udf026e52&originHeight=238&originWidth=574&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27600&status=done&style=none&taskId=u3d062cbd-9d12-4ae2-93bd-f32f76c707b&title=&width=463.05880868546916)<br />版本之间要对应
# Javaweb开发中的报错
## 细节上的开发错误
关于单词的问题<br />缺少变量<br />方法参数的对应
## XML
配置时id名要相对应<br />xml文件中字段不对应<br />要严格按照格式进行书写，不得有一丝马虎大意<br />比如里面有的是小括号有的是大括号
## 注入属性
Value()的使用要加$才能注入进去
## 对应的类要加入注解
@Component这样才能创建对象<br />在使用的时候才能找到。
## 数组越界问题
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 6
# Spring
# MyBatisPlus
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29688613/1715827542493-1c0ee449-3b97-4e4d-bc86-9990ce275a3d.png#averageHue=%2333343e&clientId=udc8fff46-c485-4&from=paste&height=183&id=uf066fa3a&originHeight=227&originWidth=1338&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=296368&status=done&style=none&taskId=ud9233961-43a4-40dd-af55-e22a16ecc03&title=&width=1079.394923381808)<br />接到需求<br />查看前端发过来的数据有哪些？<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29688613/1715827678766-5d376bd6-fe51-4de3-89db-4fe7875531d9.png#averageHue=%2335343c&clientId=udc8fff46-c485-4&from=paste&height=101&id=u8ed6d7db&originHeight=125&originWidth=866&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=98377&status=done&style=none&taskId=ua03f7013-e2f9-424b-8a2e-09913426628&title=&width=698.6218263442793)<br />这是数据库表中字段对应着的属性



