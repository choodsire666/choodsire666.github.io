---
title: MyBatis-Plus
urlname: yozncwtghxzg9gwr
date: '2024-03-31 11:38:38'
updated: '2024-05-21 15:30:34'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/29688613/1711856637559-15044093-18a1-44fd-99a2-52c3c26a54b0.png'
description: '前面我们学习过的ORM[Object Relational Mapping(对象关系映射)]持久层框架MyBatis，它可以帮助我们完成单表、多表、动态SQL的业务逻辑处理，与之平级的还有Hibernate，和这节我们要学习的MyBatisPlus了。1.快速入门1.1 入门案例mp.sqlm...'
---
前面我们学习过的ORM[Object Relational Mapping(对象关系映射)]持久层框架MyBatis，它可以帮助我们完成单表、多表、动态SQL的业务逻辑处理，与之平级的还有Hibernate，和这节我们要学习的[MyBatisPlus](https://www.baomidou.com/)了。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/f8f18f137518dd7ec0e059be510ffc2c.png)
# 1.快速入门
## 1.1 入门案例
[mp.sql](https://www.yuque.com/attachments/yuque/0/2024/sql/29688613/1711857741135-c6f1c63e-10a0-426f-8a7f-45551208a15f.sql)
[mp-demo.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711857741141-062070fa-1657-43fa-abb2-9d4f9da7ca04.zip)
首先我们根据提供的资料导入一下工程案例，一起看下实现下列功能的代码逻辑：

- 新增用户功能
- 根据id查询用户
- 根据id批量查询用户
- 根据id更新用户
- 根据id删除用户

代码执行流程如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/21b391ce2654ef2a35c5b5fd6b883ab5.png)
当我们打开：UserMapper_20231023_150307.xml 文件后，可以看到熟悉的代码
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/23246242a79ecc214672c382f3acadf2.jpeg)
但是我们不禁要思考一个问题，简单的单表的增删改查，他的SQL语句基本固定，这种是否可以优化呢？当然是可以的，这就是这一小节MP要做的事情。而要引入MP框架并应用起来，遵循下面的步骤即可。
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
然后我们在自己的mapper接口中继承BaseMapper，并声明泛型对应的实体类就可以有常见的CRUD代码了。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/3f1f8f03e09ad94cc043e5ab6fa1b84d.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/c445ec5102c19ed1b14d50e66d94e1de.png)
接下来我们就用MP依次替代上述增删改查的原始代码

- 新增用户功能

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/0aef2839f3790a16cb1b008d867da0aa.png)

- 根据id查询用户

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/8dd6a9b9c2fd68b1770d031523776868.png)

- 根据id批量查询用户

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/ef1cf7778d63dd0d19fe373645854caf.png)

- 根据id更新用户

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/43b2894e0db853c0d8503b46b284a1e7.png)

- 根据id删除用户

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/1201374984537bb142ddd45bcb286e9b.png)
整体改造完之后，我们就可以把之前：UserMapper_20231023_150307.xml 中的代码都删掉了，是不是很简洁
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/3270de356423c8909539324d28f88dc7.png)
## 1.2 常见注解
通过上面的案例我们可以发现mp的使用很便捷，用户基本是无感知的，那他是如何做到表跟属性值的映射的呢？MyBatisPlus通过扫描实体类，并基于**反射**获取实体类信息作为数据库表信息。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/e0df49740194ece0a80d35618219d2db.png)
但是上述的都是正常情况，如果存在一些异常：如表名跟实体类不一样、实体类部分字段表中没有等，就可以通过一些常见注解来完成映射了，MybatisPlus中比较常用的几个注解如下：

- @TableName：用来指定表名
- @TableId：用来指定表中的主键字段信息
- @TableField：用来指定表中的普通字段信息

假设表结构如下
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/68c98f8cde8a498818ebf649ccfd5d7e.png)
则对应的实体类可以映射如下
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/7444d27e81b0c82e194bf8fffd88a716.png)
其中
IdType枚举：

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
MyBatisPlus支持各种复杂的where条件，可以满足日常开发的所有需求。当我们继承BaseMapper之后，就具备了一些常见的接口方法
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/f29106ebf92a781af0b78dc84359bb15.png)
这里的Wrapper就是各种条件构造器，他的子类继承体系如下
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/33ce7b39c24dc65264fd4a84c092c1cb.png)

在这个体系中，AbstractWrapper定义了各种查询的条件，如：eq、in、between、like、gt、lt等。也就是说借助于他可以完成单表各种场景的查询条件组装。那为什么他又有QueryWrapper、UpdateWrapper呢？这是因为我们一个完整的查询语句是：SELECT 字段 FROM 表名 WHERE 条件
> QueryWrapper可以帮助我们声明要查询的具体字段，避免查询全部字段，导致IO开销过大，从而影响SQL性能的问题。同理UpdateWrapper一样，可以帮我们更新指定字段。

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/b9a450625686388bb66d257e9add9b1e.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/a8d55847a25de4f8c8eafa1199b12aac.png)
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

我们可以利用MyBatisPlus的Wrapper来构建复杂的**Where条件**，然后自己定义SQL语句中剩下的部分。
**需求：将id在指定范围的用户（例如1、2、4 ）的余额扣减指定值**
正常我们的SQL语句如下
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/94bc43739f501acc65ede334a1667b45.png)
如果我们采用自定义的，就会将整个Where条件抽取，实现细节如下
**①基于Wrapper构建where条件**
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
**③自定义SQL，并使用Wrapper条件，这里可以二选一**
一、动态SQL
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
前面我们的MP接口都是在mapper层编写的，MP也为我们提供了一些更高效的service层方法
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/cf1c20e52c24c51ec728ce1befec6e71.png)
比如上述的批量新增、批量更新、查询单个、批量删除、分页等都是非常实用的。而要去实现这个功能就不能像原来Mapper层一样直接继承BaseMapper了，因为接口是有实现类的，所以我们遵循下面这一套规范：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/6f44d79ef045f675a723516851884a3a.png)

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

根据这个要求，我们不难分析出它的SQL
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/114ca8aad55d4c73d7c9b90bab4a0d78.png)
接下来我们在service层做一个简单实现
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

所以这里我们先配置一下链接参数：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/900e9055b0f89a5e966d5b253b11cd34.png)
然后编写一个批量测试的方法
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
前面我们写的这一大堆代码都是自己手动写出来的，这小节我们将借助于一个插件帮助开发们自动生成下面的代码
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/4d356afca1ecefafdd8d9dc4968a1353.png)
首先我们安装一个插件
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/4be430a212163e0c262535c6a9d8c3a3.png)
安装之后，可以在other点击：config Database，配置数据库
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/51a72b35813282643519702797c33d34.png)
然后点击：code generator，生成代码，规则如下
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/461d8c0c5beba3b48f0a0c3ca73f295e.png)
## 3.2 静态工具(了解)
前面我们在mapper层或者service完成了各种CRUD，但是MP也提供了一个静态工具类：Db，这里面也封装了日常需要使用的接口方法，以解决：service之间相互引入，嵌套引入导致的循环依赖问题。其API如下
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/10520797facfc624ae72e7020d8bc0c9.png)
当我们需要使用时，如下图即可：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/d8324e642fc32503ea0f98bd3b4adef2.png)
## 3.3 逻辑删除
逻辑删除就是基于代码逻辑模拟删除效果，但并不会真正删除数据。思路如下：

- 在表中添加一个字段标记数据是否被删除
- 当删除数据时把标记置为1
- 查询时只查询标记为0的数据例

如逻辑删除字段为deleted：
删除操作：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/15768bcbf2084de6505713b52e3bab45.png)
查询操作：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/f8077d09d0e286fb1b5bfad06f9261f1.png)
MybatisPlus提供了逻辑删除功能，无需改变方法调用的方式，而是在底层帮我们自动修改CRUD的语句。我们要做的就是在application.yaml文件中配置逻辑删除的字段名称和值即可：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/e191b619306def096fb56dfce989dfec.png)
**注意**：
逻辑删除本身也有自己的问题，比如：

- 会导致数据库表垃圾数据越来越多，影响查询效率
- SQL中全都需要对逻辑删除字段做判断，影响查询效率

因此，生产环境采用逻辑删除功能比较多，但如果数据不能删除，也可以把数据迁移到其它表中。
## 3.4 枚举处理器
当数据库是status是int类型，为了实现PO类中的枚举类型变量与数据库字段的转换，我们就可以借助：@EnumValue 注解将其做映射，无需特殊处理
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/80d1c4742b89615264d2d770aac89a41.png)
其实现步骤共两步
①给枚举中的与数据库对应value值添加@EnumValue注解
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/8dde4888da9595f54a6117b28a2321cf.png)
②在application.yml中配置全局枚举处理器：
```yaml
mybatis-plus:
	configuration:
    default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
```
## 3.5 JSON处理器
当数据库中有一个JSON类型字段时，MP依然做了支持，只需要在对应属性值追加下面截图注解即可。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/5762f357d41b712094e4a801858dcff8.png)
# 4.插件功能
MP提供的内置拦截器如下，借助于这些拦截器我们就可以实现一些比较有意思的功能了。这里我们给大家讲解一下使用频率最高的分页插件。【项目二会使用到动态表名插件-做分库分表】
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/0803d259bc7e7ee08c5ea7b32918265a.png)
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
接着，就可以使用分页的API了：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/f6ea860127573fd2cec1711c54fe7e6d.png)
大概实现代码如下：
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
| 请求入参 | {
    **"pageNo"**:**1**,
    **"pageSize"**:**5**,
    **"sortBy"**:**"balance"**,
    **"isAsc"**:**false**,
    **"name"**:**"jack"**,
    **"status"**:**1**
} |
| 响应出参 | **{**
**    "total":1005,**
**    "pages":201,**
**    "list":[**
**        {**
**            "id":1,**
**            "username":"Jack",**
**            "info":{**
**                "age":21,**
**                "gender":"male",**
**                "intro":"佛系青年"**
**            },**
**            "status":"正常",**
**            "balance":2000**
**        },**
**        {**
**            "id":2,**
**            "username":"Rose",**
**            "info":{**
**                "age":20,**
**                "gender":"female",**
**                "intro":"文艺青年"**
**            },**
**            "status":"冻结",**
**            "balance":1000**
**        }**
**    ]**
**}** |
| 特殊说明 | 
- 如果排序字段为空，默认按照更新时间排序
- 排序字段不为空，则按照排序字段排序
 |

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

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/fd79dc210b1200572872392552b82bdf.png)
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

