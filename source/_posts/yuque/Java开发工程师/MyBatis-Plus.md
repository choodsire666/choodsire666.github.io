前面我们学习过的ORM[Object Relational Mapping(对象关系映射)]持久层框架MyBatis，它可以帮助我们完成单表、多表、动态SQL的业务逻辑处理，与之平级的还有Hibernate，和这节我们要学习的[MyBatisPlus](https://www.baomidou.com/)了。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701739308458-fc07f765-25b4-4139-849d-bcf933f75078.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23d2cdcc&clientId=u3542056e-a0cd-4&from=paste&height=556&id=u652642bb&originHeight=667&originWidth=1674&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=358325&status=done&style=none&taskId=ue91d8271-32d6-41c1-be9c-8d10e417bd1&title=&width=1394.9999445676826)
# 1.快速入门
## 1.1 入门案例
[mp.sql](https://www.yuque.com/attachments/yuque/0/2024/sql/29688613/1711857741135-c6f1c63e-10a0-426f-8a7f-45551208a15f.sql)<br />[mp-demo.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711857741141-062070fa-1657-43fa-abb2-9d4f9da7ca04.zip)<br />首先我们根据提供的资料导入一下工程案例，一起看下实现下列功能的代码逻辑：

- 新增用户功能
- 根据id查询用户
- 根据id批量查询用户
- 根据id更新用户
- 根据id删除用户

代码执行流程如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701739751206-5d529ac8-531b-4f93-9483-c689370aae96.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f8&clientId=u3542056e-a0cd-4&from=paste&height=537&id=u4db4747e&originHeight=645&originWidth=1527&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=142372&status=done&style=none&taskId=u6c2cce8b-adbb-484f-b92f-6a1a36b3939&title=&width=1272.4999494353951)<br />当我们打开：UserMapper_20231023_150307.xml 文件后，可以看到熟悉的代码<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/1169676/1701739846888-2c5f79f7-45a2-491f-8250-db4ea4d0cbbd.jpeg?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_14%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23605339&clientId=u3542056e-a0cd-4&from=paste&id=u31873e36&originHeight=266&originWidth=474&originalType=url&ratio=1.2000000476837158&rotation=0&showTitle=false&status=done&style=none&taskId=uf22c78c4-b9e7-4bc5-b805-597eac7547f&title=)<br />但是我们不禁要思考一个问题，简单的单表的增删改查，他的SQL语句基本固定，这种是否可以优化呢？当然是可以的，这就是这一小节MP要做的事情。而要引入MP框架并应用起来，遵循下面的步骤即可。
### 1-引入MybatisPlus的起步依赖
MyBatisPlus官方提供了starter，其中集成了Mybatis和MybatisPlus的所有功能，并且实现了自动装配效果。因此我们可以用MybatisPlus的starter代替Mybatis的starter：

- 原来的mybatis依赖可以删除掉
```xml
<!--MybatisPlus-->
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>mybatis-plus-boot-starter</artifactId>
  <version>3.5.3.1</version>
</dependency>
```
### 2-继承BaseMapper
然后我们在自己的mapper接口中继承BaseMapper，并声明泛型对应的实体类就可以有常见的CRUD代码了。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741217737-4c3c7eaf-0228-4f8b-9145-948943c085be.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfbf9&clientId=u3542056e-a0cd-4&from=paste&height=475&id=u3f39915c&originHeight=570&originWidth=888&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=70183&status=done&style=none&taskId=u99f044cd-98a8-4d81-aa14-b5e3968c1cb&title=&width=739.9999705950431)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741240269-2ddb8336-99d5-4421-8078-16103835ddc8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f7f3&clientId=u3542056e-a0cd-4&from=paste&height=378&id=u2b477e9b&originHeight=454&originWidth=1407&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=255050&status=done&style=none&taskId=u5a86cffb-0e5c-4f20-ba70-c4cbf403c88&title=&width=1172.4999534090377)<br />接下来我们就用MP依次替代上述增删改查的原始代码

- 新增用户功能

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741327674-7d379637-2996-4ce4-b38c-8bfc82408adb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_49%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfaf8&clientId=u3542056e-a0cd-4&from=paste&height=352&id=uac9e5e55&originHeight=422&originWidth=1729&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=99358&status=done&style=none&taskId=u1d767a23-5c90-46eb-9c72-b2cd25ce213&title=&width=1440.833276079763)

- 根据id查询用户

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741356800-ac1a194b-7df3-4e3c-b8ef-20592afe144a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfbfa&clientId=u3542056e-a0cd-4&from=paste&height=154&id=uee59905e&originHeight=185&originWidth=1517&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=31856&status=done&style=none&taskId=u8a04d277-b1c2-4346-8e1f-5a5c47031e3&title=&width=1264.1666164331987)

- 根据id批量查询用户

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741382210-681aaca7-1e30-491f-8d1c-1dca88aaecc0.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfaf8&clientId=u3542056e-a0cd-4&from=paste&height=228&id=uf24a6005&originHeight=274&originWidth=1586&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=60181&status=done&style=none&taskId=u4e709cb9-bcca-4878-b5d6-f4d25a2f39a&title=&width=1321.666614148354)

- 根据id更新用户

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741406634-63712008-c61d-42dd-a0cc-d5ac7144f819.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfaf7&clientId=u3542056e-a0cd-4&from=paste&height=185&id=ue6a77e64&originHeight=222&originWidth=1349&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=48939&status=done&style=none&taskId=ubadbabaf-f5ec-483a-91b7-b6d26381f01&title=&width=1124.1666219962985)

- 根据id删除用户

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741432813-56d6030a-36ad-47c0-a854-fa2ee3c61ac8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfbfa&clientId=u3542056e-a0cd-4&from=paste&height=102&id=ud972899d&originHeight=123&originWidth=1321&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=19613&status=done&style=none&taskId=u9401387f-a3ca-44c5-a5d6-fc3b7a5d476&title=&width=1100.8332895901485)<br />整体改造完之后，我们就可以把之前：UserMapper_20231023_150307.xml 中的代码都删掉了，是不是很简洁<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741554357-b2098490-acf9-445e-89fc-4dc494170ebd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_31%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23494c46&clientId=u3542056e-a0cd-4&from=paste&id=u86912a37&originHeight=608&originWidth=1080&originalType=url&ratio=1.2000000476837158&rotation=0&showTitle=false&size=655951&status=done&style=none&taskId=uf4af721e-3174-4f4a-80a7-5ae0ff93349&title=)
## 1.2 常见注解
通过上面的案例我们可以发现mp的使用很便捷，用户基本是无感知的，那他是如何做到表跟属性值的映射的呢？MyBatisPlus通过扫描实体类，并基于**反射**获取实体类信息作为数据库表信息。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701741634382-bc9a15dd-634c-44dc-9600-48fbac7836d0.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_49%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f7f4&clientId=u3542056e-a0cd-4&from=paste&height=587&id=udd1a5add&originHeight=705&originWidth=1731&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=281747&status=done&style=none&taskId=u3bb909b6-c4d9-4c6f-89ef-cd5d89b76f5&title=&width=1442.4999426802021)<br />但是上述的都是正常情况，如果存在一些异常：如表名跟实体类不一样、实体类部分字段表中没有等，就可以通过一些常见注解来完成映射了，MybatisPlus中比较常用的几个注解如下：

- @TableName：用来指定表名
- @TableId：用来指定表中的主键字段信息
- @TableField：用来指定表中的普通字段信息

假设表结构如下<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701742319711-f0ec100d-f62b-417f-8ebc-e69d094395e2.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e9e8e6&clientId=u3542056e-a0cd-4&from=paste&height=273&id=u5f26c990&originHeight=328&originWidth=771&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=22207&status=done&style=none&taskId=u81fc6043-018d-428e-9fa0-6e3269b89f0&title=&width=642.4999744693448)<br />则对应的实体类可以映射如下<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701742252288-9d51a275-cea4-457d-88de-cc532169a561.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f8f5&clientId=u3542056e-a0cd-4&from=paste&height=420&id=u626beab5&originHeight=504&originWidth=735&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=47412&status=done&style=none&taskId=u02a0603c-81d4-4adc-af6b-f6d47641fa7&title=&width=612.4999756614377)<br />其中<br />IdType枚举：

- AUTO：数据库自增长
- INPUT：通过set方法自行输入
- ASSIGN_ID：分配 ID，接口IdentifierGenerator的方法nextId来生成id，默认实现类为DefaultIdentifierGenerator

雪花算法使用@TableField的常见场景：

- 成员变量名与数据库字段名不一致
- 成员变量名以is开头，且是布尔值
- 成员变量名与数据库关键字冲突
- 成员变量不是数据库字段
## 1.3 常见配置
MyBatisPlus的配置项继承了MyBatis原生配置和一些自己特有的配置。例如：
```yaml
mybatis-plus:
  type-aliases-package: com.itheima.mp.domain.po # 别名扫描包
    mapper-locations: "classpath*:/mapper/**/*.xml" # Mapper.xml文件地址，默认值
    configuration: 
    map-underscore-to-camel-case: true # 是否开启下划线和驼峰的映射
    	cache-enabled: false # 是否开启二级缓存
    global-config:
    db-config:
     id-type: assign_id # id为雪花算法生成
     update-strategy: not_null # 更新策略：只更新非空字段

```
具体可参考官方文档：[使用配置 | MyBatis-Plus (baomidou.com)](https://www.baomidou.com/pages/56bac0/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)
# 2.核心功能
## 2.1 条件构造器
### 理论分析
MyBatisPlus支持各种复杂的where条件，可以满足日常开发的所有需求。当我们继承BaseMapper之后，就具备了一些常见的接口方法<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701742786963-0ebe23cb-f7a1-4862-8d1b-0b1a4900b8d9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_29%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23eeece7&clientId=u3542056e-a0cd-4&from=paste&height=370&id=u42272b8d&originHeight=444&originWidth=1014&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=54723&status=done&style=none&taskId=u27bfbf51-91e1-4aea-bf23-05a4c2d1692&title=&width=844.9999664227181)<br />这里的Wrapper就是各种条件构造器，他的子类继承体系如下<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701742719729-928face0-813c-462b-8215-661b54be28cc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_31%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8faf2&clientId=u3542056e-a0cd-4&from=paste&height=356&id=J1rcE&originHeight=427&originWidth=1095&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=44759&status=done&style=none&taskId=uf9ea9f5a-93b4-4022-b79c-6c4f9473d03&title=&width=912.4999637405092)

在这个体系中，AbstractWrapper定义了各种查询的条件，如：eq、in、between、like、gt、lt等。也就是说借助于他可以完成单表各种场景的查询条件组装。那为什么他又有QueryWrapper、UpdateWrapper呢？这是因为我们一个完整的查询语句是：SELECT 字段 FROM 表名 WHERE 条件
> QueryWrapper可以帮助我们声明要查询的具体字段，避免查询全部字段，导致IO开销过大，从而影响SQL性能的问题。同理UpdateWrapper一样，可以帮我们更新指定字段。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701743345550-ed6aefed-4f4d-4421-922d-8749c94bcd50.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23d9a968&clientId=u3542056e-a0cd-4&from=paste&height=265&id=u9850bdd4&originHeight=318&originWidth=872&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=38026&status=done&style=none&taskId=u55b207ac-2a2d-4d64-86b4-dd9b59fe3e3&title=&width=726.6666377915288)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701743349626-20688019-f8d5-450e-936a-25acdb923c74.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e8e6e3&clientId=u3542056e-a0cd-4&from=paste&height=265&id=u4b6ba8d0&originHeight=318&originWidth=923&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=38640&status=done&style=none&taskId=u5335eaf5-d429-4439-a348-19e286a3f1d&title=&width=769.1666361027305)
### 案例实操
接下来我们就通过几个案例，来实际体验一下吧

- **查询出名字中带o的，存款大于等于1000元的人的id、username、info、balance字段**

上述案例的SQL大概如下
```sql
SELECT id, username, info, balance
FROM user
WHERE 
username like '%o%'
AND balance >= 1000
```
**分析**：因为是查询，且查询指定字段，所以这里考虑QueryWrapper
```java
@Test
void testQueryWrapper() {
    QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
    queryWrapper
            .select("id", "username", "info", "balance")
            .like("username", "o")
            .ge("balance", "1000");
    List<User> users = userMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```

- **更新用户名为jack的用户的余额为2000**

上述案例的SQL大概如下
```sql
UPDATE user
SET balance = 2000
WHERE username = "jack"
```
**分析**：因为更新的where条件中带查询，所以可以用QueryWrapper
```java
@Test
void testQueryWrapper2() {
    // 1-数据
    User user = new User();
    user.setBalance(2000);
    // 2-条件
    QueryWrapper<User> wrapper = new QueryWrapper<User>().eq("username", "jack");
    // 3-更新
    userMapper.update(user, wrapper);
}
```

- **更新id为1,2,4的用户的余额，扣200**

上述案例的SQL大概如下
```sql
UPDATE user
SET balance = balance - 200
WHERE id in (1, 2, 4)
```
**分析**：这个SQL更新条件不需要做额外的查询，所以UpdateWrapper可以直接搞定，并且这里是账户余额扣减200不是直接设置成两百，所以我们的更新参数第一个user给null就好
```java
@Test
void testUpdateWrapper() {
    UpdateWrapper<User> updateWrapper = new UpdateWrapper<User>()
            .setSql("balance = balance - 200")
            .in("id", Arrays.asList(1L, 2L, 3L));
    userMapper.update(null, updateWrapper);
}
```
> 如果这里同时需要设置用户姓名拼接：***，就可以初始化一个User对象，然后做拼接，最后传递进去就可以

## 2.2 自定义SQL
> **这个我们在项目二会使用到**

我们可以利用MyBatisPlus的Wrapper来构建复杂的**Where条件**，然后自己定义SQL语句中剩下的部分。<br />**需求：将id在指定范围的用户（例如1、2、4 ）的余额扣减指定值**<br />正常我们的SQL语句如下<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701745045984-8a712c70-ce45-4d2e-b6a4-186b7b7f2d35.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6f9f6&clientId=u3542056e-a0cd-4&from=paste&height=337&id=uba7c4dae&originHeight=404&originWidth=1152&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=31418&status=done&style=none&taskId=ua64d740e-7363-4b75-91e4-5e625b2fc57&title=&width=959.9999618530288)<br />如果我们采用自定义的，就会将整个Where条件抽取，实现细节如下<br />**①基于Wrapper构建where条件**
```java
@Test
void testUserFormatSql() {
    List<Long> ids = Arrays.asList(1L, 2L, 4L);
    int amount = 200;
    // 1.构建条件
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>()
    	.in(User::getId, ids);
    // 2.自定义SQL方法调用
    userMapper.updateBalanceByIds(wrapper, amount);
}
```
**②创建接口方法，在mapper方法参数中用Param注解声明wrapper变量名称，必须是ew**
```java
void updateBalanceByIds(@Param("ew") LambdaQueryWrapper<User> wrapper, 
                        @Param("amount") int amount);

```
**③自定义SQL，并使用Wrapper条件，这里可以二选一**<br />一、动态SQL
```sql
<update id="updateBalanceByIds">
	UPDATE tb_user SET balance = balance - #{amount} ${ew.customSqlSegment}
</update>

```
二、注解形式（直接在接口方法增加@Update注解）
```java
@Update("UPDATE tb_user SET balance = balance - #{amount} ${ew.customSqlSegment}")
void updateBalanceByIds(LambdaQueryWrapper<User> wrapper, int amount);
```
## 2.3 Service接口
### 理论分析
前面我们的MP接口都是在mapper层编写的，MP也为我们提供了一些更高效的service层方法<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701745925752-8271ab2a-0923-410f-9b59-a7b185fbe2a6.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_51%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f7f3&clientId=u3542056e-a0cd-4&from=paste&height=680&id=u953c3df6&originHeight=816&originWidth=1793&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=626116&status=done&style=none&taskId=u1df7f0e5-2b98-4a4c-b1d4-e02b5e7e4d6&title=&width=1494.16660729382)<br />比如上述的批量新增、批量更新、查询单个、批量删除、分页等都是非常实用的。而要去实现这个功能就不能像原来Mapper层一样直接继承BaseMapper了，因为接口是有实现类的，所以我们遵循下面这一套规范：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701746019833-7f115a0e-c96c-467f-b6bb-3d29bafb9ce9.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfcfc&clientId=u3542056e-a0cd-4&from=paste&height=621&id=u832c7d16&originHeight=745&originWidth=1155&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=75025&status=done&style=none&taskId=uab408e70-0e2c-4b7b-af32-c134aa15cc6&title=&width=962.4999617536878)

- 用户的接口继承：IService
```java
public interface UserService extends IService<User> {
}
```

- 用户的接口实现类继承：ServiceImpl
```java
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itheima.mp.domain.po.User;
import com.itheima.mp.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```
### 案例实操
#### IService的Lambda查询
**需求：实现一个根据复杂条件查询用户的接口**，查询条件如下：

- name：用户名关键字，可以为空
- status：用户状态，可以为空
- minBalance：最小余额，可以为空
- maxBalance：最大余额，可以为空

根据这个要求，我们不难分析出它的SQL<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701746258548-b1b8f016-c778-44cd-9b98-68f8ff6cda62.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_26%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3f7f3&clientId=u3542056e-a0cd-4&from=paste&height=508&id=u1ab46982&originHeight=610&originWidth=900&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=51213&status=done&style=none&taskId=uf84d3f01-a93e-439f-a346-5091cf8f21a&title=&width=749.9999701976787)<br />接下来我们在service层做一个简单实现
```java
public List<User> queryUserList(String name, 
                                Integer status, 
                                Integer minBalance, 
                                Integer maxBalance) {
return lambdaQuery()
        .like(null != name, User::getUsername, name)
        .eq(null != status, User::getStatus, status)
        .between(null != minBalance && null != maxBalance, 
                 User::getBalance, minBalance, maxBalance)
        .list();
}
```
#### IService的Lambda更新
**需求：根据id修改用户余额的接口**，要求如下

- 输入条件为id、username、balance
- 每次将指定用户的余额扣减balance
- 如果扣减后余额为0，则将用户status修改为冻结状态（2）

代码实现大致如下
```java
public void updateUser(Integer id, String userName, Integer balance) {
lambdaUpdate()
        .setSql("balance = balance - " + balance)
        .set( balance == 0, User::getStatus, 2)
        .eq(null != id, User::getId, id)
        .eq(null != userName, User::getUsername, userName)
        .update();
}
```
#### IService批量新增
需求：批量插入10万条用户数据，并作出对比：

- 普通for循环插入
- IService的批量插入开启rewriteBatchedStatements=true参数，
   - 在连接信息的url后拼接：&rewriteBatchedStatements=true

批处理方案分析：

- 普通for循环逐条插入速度极差，不推荐
- MP的批量新增，基于预编译的批处理，性能不错
- 配置jdbc参数，开rewriteBatchedStatements，性能最好

所以这里我们先配置一下链接参数：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701747440553-756fe579-669b-4e3d-b9ca-ed4e423282c5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_50%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf9f5&clientId=u0d48ba5b-04ad-4&from=paste&height=110&id=u17d573d9&originHeight=132&originWidth=1771&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=25704&status=done&style=none&taskId=u0ddd576e-07e8-4481-b9d0-154a16cbfd2&title=&width=1475.833274688988)<br />然后编写一个批量测试的方法
```java
public void batchSave() {
    // 1-准备数据
    List<User> userList = initData();
    // 批量新增
    saveBatch(userList);
}

private List<User> initData() {

    List<User> userList = new ArrayList<>();

    for (int i = 0; i < 1000; i++) {
        User user = new User();
        user.setUsername(i + "-测试用户");
        user.setBalance(100);
        user.setInfo("测试数据");

        userList.add(user);
    }
    return userList;
}
```
# 3.拓展功能
## 3.1 代码生成
前面我们写的这一大堆代码都是自己手动写出来的，这小节我们将借助于一个插件帮助开发们自动生成下面的代码<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701747829556-8edaf785-5d62-43cd-8f60-44cec0591adf.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_31%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e0c789&clientId=u0d48ba5b-04ad-4&from=paste&height=400&id=u691f9a7e&originHeight=480&originWidth=1101&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=68003&status=done&style=none&taskId=u43f921f5-c76c-4a7e-835f-bc03ab3aa12&title=&width=917.499963541827)<br />首先我们安装一个插件<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701756808214-b00e2838-c481-4838-b8aa-768756bcc48d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6f5f5&clientId=u0d48ba5b-04ad-4&from=paste&height=632&id=uda3331d4&originHeight=758&originWidth=1490&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=108053&status=done&style=none&taskId=ue2f5792a-8ef6-47bd-ab86-5a1c6f74e24&title=&width=1241.6666173272683)<br />安装之后，可以在other点击：config Database，配置数据库<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701756822855-4e342bd5-3c88-4018-a906-25fab4898478.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23a7a7a6&clientId=u0d48ba5b-04ad-4&from=paste&height=672&id=u1056b85f&originHeight=807&originWidth=1263&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=65156&status=done&style=none&taskId=u3dc35092-368b-42bb-92e9-2d0e00de3d3&title=&width=1052.4999581774093)<br />然后点击：code generator，生成代码，规则如下<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701756875010-149ec009-569a-4883-be3b-284043513261.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_37%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23ded5d4&clientId=u0d48ba5b-04ad-4&from=paste&height=656&id=ube87d715&originHeight=787&originWidth=1297&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=144408&status=done&style=none&taskId=ub33bcc6d-e080-43e2-92df-b7e97245571&title=&width=1080.833290384877)
## 3.2 静态工具(了解)
前面我们在mapper层或者service完成了各种CRUD，但是MP也提供了一个静态工具类：Db，这里面也封装了日常需要使用的接口方法，以解决：service之间相互引入，嵌套引入导致的循环依赖问题。其API如下<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757174182-aa7fc189-e4b5-41d5-be70-04ec0657c17a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_51%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f4&clientId=u0d48ba5b-04ad-4&from=paste&height=705&id=u20a745a7&originHeight=846&originWidth=1806&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=565734&status=done&style=none&taskId=uc1fd5482-2921-4066-9391-b2a84b14311&title=&width=1504.9999401966754)<br />当我们需要使用时，如下图即可：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757198523-7b8a4906-0f05-4a67-970a-8e4f1787765c.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_32%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f9f3&clientId=u0d48ba5b-04ad-4&from=paste&height=377&id=u81c1299b&originHeight=452&originWidth=1106&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=298784&status=done&style=none&taskId=u06721795-a488-4a69-9c9f-837432d0142&title=&width=921.6666300429252)
## 3.3 逻辑删除
逻辑删除就是基于代码逻辑模拟删除效果，但并不会真正删除数据。思路如下：

- 在表中添加一个字段标记数据是否被删除
- 当删除数据时把标记置为1
- 查询时只查询标记为0的数据例

如逻辑删除字段为deleted：<br />删除操作：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757256079-7283a20a-50d5-4f45-8974-87f650350f20.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_27%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23efb73d&clientId=u0d48ba5b-04ad-4&from=paste&height=111&id=u97e354a4&originHeight=133&originWidth=953&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=11664&status=done&style=none&taskId=u15baee7c-a56f-41e0-bec0-4682789f8bc&title=&width=794.1666351093198)<br />查询操作：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757260246-1445fea2-7ffb-4dae-88a8-e84d36020ecc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_27%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23efb73d&clientId=u0d48ba5b-04ad-4&from=paste&height=111&id=uc0ff80e8&originHeight=133&originWidth=953&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=10416&status=done&style=none&taskId=u46981bb5-b91b-406c-831b-307ba498173&title=&width=794.1666351093198)<br />MybatisPlus提供了逻辑删除功能，无需改变方法调用的方式，而是在底层帮我们自动修改CRUD的语句。我们要做的就是在application.yaml文件中配置逻辑删除的字段名称和值即可：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757281725-4bf37280-fdbf-470b-843e-720883a86b73.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f9f7&clientId=u0d48ba5b-04ad-4&from=paste&height=327&id=u30b9eb77&originHeight=392&originWidth=1482&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=48721&status=done&style=none&taskId=udd625e9d-1501-4280-89ba-a436d180701&title=&width=1234.999950925511)<br />**注意**：<br />逻辑删除本身也有自己的问题，比如：

- 会导致数据库表垃圾数据越来越多，影响查询效率
- SQL中全都需要对逻辑删除字段做判断，影响查询效率

因此，生产环境采用逻辑删除功能比较多，但如果数据不能删除，也可以把数据迁移到其它表中。
## 3.4 枚举处理器
当数据库是status是int类型，为了实现PO类中的枚举类型变量与数据库字段的转换，我们就可以借助：@EnumValue 注解将其做映射，无需特殊处理<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757425286-ac5aad2d-701f-4372-b727-75498278e583.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_49%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2f2ec&clientId=u0d48ba5b-04ad-4&from=paste&height=650&id=ue6914cc7&originHeight=780&originWidth=1732&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=242890&status=done&style=none&taskId=u8cc90015-ab2f-4fda-911d-ef466d9fc0e&title=&width=1443.3332759804218)<br />其实现步骤共两步<br />①给枚举中的与数据库对应value值添加@EnumValue注解<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757575302-00fe61ea-2824-40fe-b751-f485806da9cd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8faf6&clientId=u0d48ba5b-04ad-4&from=paste&height=152&id=u54e48503&originHeight=183&originWidth=536&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=23572&status=done&style=none&taskId=u6c7268cd-9d81-4640-a38f-635994f8c3d&title=&width=446.6666489177287)<br />②在application.yml中配置全局枚举处理器：
```yaml
mybatis-plus:
	configuration:
    default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
```
## 3.5 JSON处理器
当数据库中有一个JSON类型字段时，MP依然做了支持，只需要在对应属性值追加下面截图注解即可。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757637778-4cdd07ee-ebc5-41d6-bc0d-42ae8c11a7dd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_47%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23d6c3a0&clientId=u0d48ba5b-04ad-4&from=paste&height=666&id=ua6ab129b&originHeight=799&originWidth=1646&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=293643&status=done&style=none&taskId=u49bc77c8-82a3-4f3c-b414-079dcab9399&title=&width=1371.6666121615326)
# 4.插件功能
MP提供的内置拦截器如下，借助于这些拦截器我们就可以实现一些比较有意思的功能了。这里我们给大家讲解一下使用频率最高的分页插件。【项目二会使用到动态表名插件-做分库分表】<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757722055-5557eb05-b724-42c0-b0ee-6e54c77b0a5e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_40%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23dfcecd&clientId=u0d48ba5b-04ad-4&from=paste&height=486&id=u518efd96&originHeight=583&originWidth=1408&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=76495&status=done&style=none&taskId=u7b016c2c-210b-4c19-acd7-ab81be4cb59&title=&width=1173.3332867092574)
## 4.1 分页插件
首先，要在配置类中注册MyBatisPlus的核心插件，同时添加分页插件：
```java
@Configuration
public class MybatisConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        // 1.初始化核心插件
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 2.添加分页插件
        PaginationInnerInterceptor pageInterceptor = 
        	new PaginationInnerInterceptor(DbType.MYSQL);
        pageInterceptor.setMaxLimit(1000L); // 设置分页上限
        interceptor.addInnerInterceptor(pageInterceptor);
        return interceptor;
    }
}
```
接着，就可以使用分页的API了：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701757892431-879c2136-9443-4ca7-91b0-a1ee1b01624e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7fbdd&clientId=u0d48ba5b-04ad-4&from=paste&height=102&id=u0b3a187f&originHeight=123&originWidth=876&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=25107&status=done&style=none&taskId=ufac5eb30-7b03-4a9c-962a-5bb5be39317&title=&width=729.9999709924074)<br />大概实现代码如下：
```java
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itheima.mp.domain.po.User;
import com.itheima.mp.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@Test
void testPageQuery() {
    // 1.查询
    int pageNo = 1, pageSize = 5;
    // 1.1.分页参数
    Page<User> page = Page.of(pageNo, pageSize);
    // 1.2.排序参数, 通过OrderItem来指定
    page.addOrder(new OrderItem("balance", false));
    // 1.3.分页查询
    Page<User> p = userService.page(page);
    // 2.总条数
    System.out.println("total = " + p.getTotal());
    // 3.总页数
    System.out.println("pages = " + p.getPages());
    // 4.分页数据
    List<User> records = p.getRecords();
    records.forEach(System.out::println);
}
```
## 4.2 通用分页实体
前面我们做了简单的分页查询之后接下来通过一个案例做一下我们今天整体功能的收尾。需求如下

| 参数 | 说明 |
| --- | --- |
| 请求方式 | GET |
| 请求路径 | /users/page |
| 请求入参 | {<br />    **"pageNo"**:**1**,<br />    **"pageSize"**:**5**,<br />    **"sortBy"**:**"balance"**,<br />    **"isAsc"**:**false**,<br />    **"name"**:**"jack"**,<br />    **"status"**:**1**<br />} |
| 响应出参 | **{**<br />**    "total":1005,**<br />**    "pages":201,**<br />**    "list":[**<br />**        {**<br />**            "id":1,**<br />**            "username":"Jack",**<br />**            "info":{**<br />**                "age":21,**<br />**                "gender":"male",**<br />**                "intro":"佛系青年"**<br />**            },**<br />**            "status":"正常",**<br />**            "balance":2000**<br />**        },**<br />**        {**<br />**            "id":2,**<br />**            "username":"Rose",**<br />**            "info":{**<br />**                "age":20,**<br />**                "gender":"female",**<br />**                "intro":"文艺青年"**<br />**            },**<br />**            "status":"冻结",**<br />**            "balance":1000**<br />**        }**<br />**    ]**<br />**}** |
| 特殊说明 | <br />- 如果排序字段为空，默认按照更新时间排序<br />- 排序字段不为空，则按照排序字段排序<br /> |

### 1-引入依赖
```xml
<dependency>
  <groupId>io.swagger</groupId>
  <artifactId>swagger-models</artifactId>
  <version>1.5.20</version>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
### 2-接口入参定义

- 根据入参我们定义了具有四个请求属性的实体类
- 这里我们定义了一些基本方法，帮助我们封装请求参数
```java
package com.itheima.mp.domain.query;

import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.Data;

@Data
public class PageQuery {
    private Integer pageNo;
    private Integer pageSize;
    private String sortBy;
    private Boolean isAsc;

    public <T>  Page<T> toMpPage(OrderItem ... orders){
        // 1.分页条件
        Page<T> p = Page.of(pageNo, pageSize);
        // 2.排序条件
        // 2.1.先看前端有没有传排序字段
        if (sortBy != null) {
            p.addOrder(new OrderItem(sortBy, isAsc));
            return p;
        }
        // 2.2.再看有没有手动指定排序字段
        if(orders != null){
            p.addOrder(orders);
        }
        return p;
    }

    public <T> Page<T> toMpPage(String defaultSortBy, boolean isAsc){
        return this.toMpPage(new OrderItem(defaultSortBy, isAsc));
    }

    public <T> Page<T> toMpPageDefaultSortByCreateTimeDesc() {
        return toMpPage("create_time", false);
    }

    public <T> Page<T> toMpPageDefaultSortByUpdateTimeDesc() {
        return toMpPage("update_time", false);
    }
}
```
### 3-接口出参定义

- 外层通用数据结构
```java
package com.itheima.mp.domain.dto;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageDTO<V> {
    private Long total;
    private Long pages;
    private List<V> list;

    /**
     * 返回空分页结果
     * @param p MybatisPlus的分页结果
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> empty(Page<P> p){
        return new PageDTO<>(p.getTotal(), p.getPages(), Collections.emptyList());
    }

    /**
     * 将MybatisPlus分页结果转为 VO分页结果
     * @param p MybatisPlus的分页结果
     * @param voClass 目标VO类型的字节码
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> of(Page<P> p, Class<V> voClass) {
        // 1.非空校验
        List<P> records = p.getRecords();
        if (records == null || records.size() <= 0) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2.数据转换
        List<V> vos = BeanUtil.copyToList(records, voClass);
        // 3.封装返回
        return new PageDTO<>(p.getTotal(), p.getPages(), vos);
    }

    /**
     * 将MybatisPlus分页结果转为 VO分页结果，允许用户自定义PO到VO的转换方式
     * @param p MybatisPlus的分页结果
     * @param convertor PO到VO的转换函数
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> of(Page<P> p, Function<P, V> convertor) {
        // 1.非空校验
        List<P> records = p.getRecords();
        if (records == null || records.size() <= 0) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2.数据转换
        List<V> vos = records.stream().map(convertor).collect(Collectors.toList());
        // 3.封装返回
        return new PageDTO<>(p.getTotal(), p.getPages(), vos);
    }
}
```

- 内层具体实体类结构
```java
package com.itheima.mp.domain.dto;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "用户表单实体")
public class UserFormDTO {

    @ApiModelProperty("id")
    private Long id;

    @ApiModelProperty("用户名")
    private String username;

    @ApiModelProperty("密码")
    private String password;

    @ApiModelProperty("注册手机号")
    private String phone;

    @ApiModelProperty("详细信息，JSON风格")
    private String info;

    @ApiModelProperty("账户余额")
    private Integer balance;
}
```

- 返回VO定义
```java
package com.itheima.mp.domain.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "用户VO实体")
public class UserVO {

    @ApiModelProperty("用户id")
    private Long id;

    @ApiModelProperty("用户名")
    private String username;

    @ApiModelProperty("详细信息")
    private String info;

    @ApiModelProperty("使用状态（1正常 2冻结）")
    private Integer status;

    @ApiModelProperty("账户余额")
    private Integer balance;
}
```
### 4-三层架构定义

- controller接口定义
```java
package com.itheima.mp.controller;

import com.itheima.mp.domain.po.PageDTO;
import com.itheima.mp.domain.po.PageQuery;
import com.itheima.mp.domain.po.UserVO;
import com.itheima.mp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("pages")
    public PageDTO<UserVO> queryUserByPage(PageQuery query) {
        return userService.queryUserByPage(query);
    }
}
```

- service层接口定义
```java
package com.itheima.mp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itheima.mp.domain.po.PageDTO;
import com.itheima.mp.domain.po.PageQuery;
import com.itheima.mp.domain.po.User;
import com.itheima.mp.domain.po.UserVO;

public interface UserService extends IService<User> {
    PageDTO<UserVO> queryUserByPage(PageQuery query);
}
```
### 5-业务代码实现
```java
package com.itheima.mp.service;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itheima.mp.domain.po.PageDTO;
import com.itheima.mp.domain.po.PageQuery;
import com.itheima.mp.domain.po.User;
import com.itheima.mp.domain.po.UserVO;
import com.itheima.mp.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public PageDTO<UserVO> queryUserByPage(PageQuery query) {

        // 1-构建分页条件
        Page<User> p = Page.of(query.getPageNo(), query.getPageSize());

        // 2-构建排序条件
        if (StringUtils.isBlank(query.getSortBy())) {
            p.addOrder(new OrderItem("update_time", false));
        } else {
            p.addOrder(new OrderItem(query.getSortBy(), query.getIsAsc()));
        }

        // 3-查询
        page(p);

        // 4-获取结果
        List<User> records = p.getRecords();
        // 4.1 非空判断
        if (CollectionUtil.isEmpty(records)) {
            // 4.2 没数据返回空
            return PageDTO.empty(p);
        }
        // 4.3 有数据返回具体集合
        return PageDTO.of(p, UserVO.class);
    }
}
```
### 6-功能代码测试

- 访问浏览器：[http://localhost:8080/users/pages?pageNo=1&pageSize=1](http://localhost:8080/users/pages?pageNo=1&pageSize=1)
- 查看页面效果

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1701759799551-b6d76688-2f55-4991-8e9b-0620122a43f5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_55%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf8f6&clientId=u0d48ba5b-04ad-4&from=paste&height=373&id=u79b959bc&originHeight=448&originWidth=1920&originalType=binary&ratio=1.2000000476837158&rotation=0&showTitle=false&size=141020&status=done&style=none&taskId=ua2f15310-0a2b-4657-97ae-346448d711e&title=&width=1599.9999364217147)
### 7-代码重构优化

- 上述的业务逻辑实现代码，可以优化如下。能优化的前提依赖于我们封装的多个方法
```java
@Override
public PageDTO<UserVO> queryUserByPage(PageQuery query) {

    // 1-构建分页条件
    Page<User> p = query.toMpPageDefaultSortByUpdateTimeDesc();
    
    // 2-查询
    page(p);

    // 3-返回结果
    return PageDTO.of(p, UserVO.class);
}
```

---

至此，我们就完成了MP的理论学习了，MP作为Mybatis的增强版本，企业中用到的还是比较多的，尤其是QueryWrapper，希望大家可以熟练掌握。
# 5.完整代码
[mp-demo.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711857741143-e0e4626c-5067-4cd8-a7d6-114b170d44e9.zip)

