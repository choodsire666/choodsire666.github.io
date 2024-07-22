**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)

安装完成Redis，我们就可以操作Redis，实现数据的CRUD了。这需要用到Redis客户端，包括：

- **命令行客户端**
- **图形化桌面客户端**
- **编程客户端**

## 1 命令行客户端

-  **Redis安装完成后就自带了命令行客户端：**`**redis-cli**`**，使用方式如下：** 
```shell
redis-cli [options] [commonds]
```

-  **其中常见的**`**options**`**有：** 
   - `-h 127.0.0.1`：指定要连接的redis节点的IP地址，默认是127.0.0.1
   - `-p 6379`：指定要连接的redis节点的端口，默认是6379
   - `-a 132537`：指定redis的访问密码
-  **其中的**`**commonds**`**就是Redis的操作命令，例如：** 
   - `ping`：与redis服务端做心跳测试，服务端正常会返回`pong`
   - 不指定commond时，会进入`redis-cli`的交互控制台：

![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232150-864b4920-bab5-4db3-8504-7d70203d15a9.png#averageHue=%23021e31&clientId=ue9b12b69-c25a-4&height=291&id=Gdp6K&originHeight=387&originWidth=1593&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9a5a08f7-f51d-4f72-ad5c-ab8500788e2&title=&width=1196)
## 2 图形化客户端
下载地址：[https://pan.baidu.com/s/1sxQTOt-A5MCvVZnlgDf0eA?pwd=1234](https://pan.baidu.com/s/1sxQTOt-A5MCvVZnlgDf0eA?pwd=1234)
①  **如何连接到Redis** 
![](https://cdn.nlark.com/yuque/0/2022/png/22334924/1664283624189-28cca076-09b2-49fc-bf35-49a05716fb0d.png#averageHue=%23f3f0f0&clientId=u3f6f68b3-9d6e-4&errorMessage=unknown%20error&height=575&id=sC618&originHeight=827&originWidth=1177&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9a34ed25-d034-40c0-868b-79ae9836052&title=&width=818) 
**② 连接成功后如图所示**
 ![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232181-85528e1d-f28f-4f7d-85be-0bc63895e1bb.png#averageHue=%23f3eeed&clientId=ue9b12b69-c25a-4&height=577&id=FgNoa&originHeight=832&originWidth=1179&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uba3e0b41-ec58-40f7-915f-f6e6cee8cbd&title=&width=818) 
## 3 Java客户端
### 3.1 Jedis快速入门
Jedis的官网地址： [Jedis官网](https://github.com/redis/jedis)，我们先来个快速入门：
**① 新建一个Maven工程并引入以下依赖** 
```xml
<!--引入Jedis依赖-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>4.2.0</version>
</dependency>

<!--引入单元测试依赖-->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.8.2</version>
    <scope>test</scope>
</dependency>
```
 
**② 编写测试类并与Redis建立连接** 
```java
private Jedis jedis;

@BeforeEach //被该注解修饰的方法每次执行其他方法前自动执行
void setUp(){
    // 1. 获取连接
    jedis = new Jedis("192.168.230.88",6379);
    // 2. 设置密码
    jedis.auth("132537");
    // 3. 选择库（默认是下标为0的库）
    jedis.select(0);
}
```
 
**③ 编写一个操作数据的方法（这里以操作String类型为例）** 
```java
@Test
public void testString(){
    // 1.往redis中存放一条String类型的数据并获取返回结果
    String result = jedis.set("url", "https://www.oz6.cn");
    System.out.println("result = " + result);

    // 2.从redis中获取一条数据
    String url = jedis.get("url");
    System.out.println("url = " + url);
}
```
 
**④ 最后不要忘记编写一个释放资源的方法** 
```java
    @AfterEach //被该注解修饰的方法会在每次执行其他方法后执行
    void tearDown(){
        // 1.释放资源
        if (jedis != null){
            jedis.close();
        }
    }
```
 
**⑤ 执行**`**testString()**`**方法后测试结果如图所示**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232188-02adcbd2-5e7c-482a-9af0-1edf6511abc0.png#averageHue=%23f1e6e5&clientId=ue9b12b69-c25a-4&id=oOqYf&originHeight=201&originWidth=808&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3866f050-78f3-48e0-a6a5-41b35985e8d&title=) 

### 3.2 Jedis连接池
**Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们推荐大家使用Jedis连接池代替Jedis的直连方式**
```java
public class JedisConnectionFactory {
    private static final JedisPool jedisPool;

    static {
        //配置连接池
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(8);
        jedisPoolConfig.setMaxIdle(8);
        jedisPoolConfig.setMinIdle(0);
        jedisPoolConfig.setMaxWaitMillis(200);
        //创建连接池对象
        jedisPool = new JedisPool(jedisPoolConfig,"192.168.230.88",6379,1000,"132537");
    }

    public static Jedis getJedis(){
       return jedisPool.getResource();
    }
}
```
### 3.3 SpringDataRedis介绍
**SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做**`**SpringDataRedis**`
**官网地址**：[https://spring.io/projects/spring-data-redis](https://spring.io/projects/spring-data-redis)

- 提供了对不同Redis客户端的整合（`Lettuce`和`Jedis`）
- 提供了`RedisTemplate`统一API来操作Redis
- 支持Redis的发布订阅模型
- 支持Redis哨兵和Redis集群
- 支持基于Lettuce的响应式编程
- 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
- 支持基于Redis的JDKCollection实现

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232197-af6c253b-03e7-4300-8db5-8ac6f41ad8b1.png#averageHue=%23d0bebc&clientId=ue9b12b69-c25a-4&height=318&id=Ulkb3&originHeight=364&originWidth=1091&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u659aa71d-8914-4bf0-962d-4c27307cb26&title=&width=952)
### 3.4  SpringDataRedis快速入门
`**SpringBoot**`**已经提供了对**`**SpringDataRedis**`**的支持，使用非常简单**
**① 首先新建一个Spring Boot工程**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232148-c776b971-2652-4258-9833-05fe29d7a360.png#averageHue=%23f3eeee&clientId=ue9b12b69-c25a-4&id=E3yhK&originHeight=594&originWidth=1042&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4477bccc-1706-47c8-8b8c-c0aef67a6b1&title=) 
**② 然后引入连接池依赖** 
```xml
<!--连接池依赖-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```
 
**③ 编写配置文件**`**application.yml**`**（连接池的配置在实际开发中是根据需求来的）** 
```yaml
spring:
  redis:
    host: 192.168.230.88 #指定redis所在的host
    port: 6379  #指定redis的端口
    password: 132537  #设置redis密码
    lettuce:
      pool:
        max-active: 8 #最大连接数
        max-idle: 8 #最大空闲数
        min-idle: 0 #最小空闲数
        max-wait: 100ms #连接等待时间
```
 
**④ 编写测试类执行测试方法** 
```java
@SpringBootTest
class RedisDemoApplicationTests {

	@Resource
	private RedisTemplate redisTemplate;

	@Test
	void testString() {
		// 1.通过RedisTemplate获取操作String类型的ValueOperations对象
		ValueOperations ops = redisTemplate.opsForValue();
		// 2.插入一条数据
		ops.set("blogName","Vz-Blog");
		
		// 3.获取数据
		String blogName = (String) ops.get("blogName");
		System.out.println("blogName = " + blogName);
	}
}
```
### 3.5 RedisSerializer配置
**RedisTemplate可以接收任意Object作为值写入Redis，只不过写入前会把Object序列化为字节形式，**`**默认是采用JDK序列化**`**，得到的结果是这样的**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232598-5f0e9ba5-5991-4344-b3d3-be6112d64c66.png#averageHue=%23d5c8c7&clientId=ue9b12b69-c25a-4&id=j0I4K&originHeight=248&originWidth=784&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u57d4ae99-9936-4449-8174-7bba6cd5def&title=)
**缺点：**

- 可读性差
- 内存占用较大

**那么如何解决以上的问题呢？我们可以通过自定义RedisTemplate序列化的方式来解决。**
**① 编写一个配置类**`**RedisConfig**` 
```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory factory){
        // 1.创建RedisTemplate对象
        RedisTemplate<String ,Object> redisTemplate = new RedisTemplate<>();
        // 2.设置连接工厂
        redisTemplate.setConnectionFactory(factory);

        // 3.创建序列化对象
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        GenericJackson2JsonRedisSerializer genericJackson2JsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

        // 4.设置key和hashKey采用String的序列化方式
        redisTemplate.setKeySerializer(stringRedisSerializer);
        redisTemplate.setHashKeySerializer(stringRedisSerializer);

        // 5.设置value和hashValue采用json的序列化方式
        redisTemplate.setValueSerializer(genericJackson2JsonRedisSerializer);
        redisTemplate.setHashValueSerializer(genericJackson2JsonRedisSerializer);

        return redisTemplate;
    }
}
```
**② 此时我们已经将RedisTemplate的key设置为**`**String序列化**`**，value设置为**`**Json序列化**`**的方式，再来执行方法测试**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232621-1a6b80dc-d1b7-4a86-aae2-b27b890955ba.png#averageHue=%23d7cecc&clientId=ue9b12b69-c25a-4&id=pHJHn&originHeight=244&originWidth=785&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ufeb0bbcf-264f-4438-aee0-02f151b0b3d&title=) 
**③ 由于我们设置的value序列化方式是Json的，因此我们可以直接向redis中插入一个对象** 
```java
@Test
void testSaveUser() {
    redisTemplate.opsForValue().set("user:100", new User("Vz", 21));
    User user = (User) redisTemplate.opsForValue().get("user:100");
    System.out.println("User = " + user);
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232638-fd101d2d-9598-4c82-ace0-6df3f549e2a2.png#averageHue=%23e0d7d6&clientId=ue9b12b69-c25a-4&id=pUWKy&originHeight=333&originWidth=788&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1b526fb7-2b9e-4743-9e39-1e82fab7bb9&title=)
尽管Json序列化可以满足我们的需求，但是依旧存在一些问题。
如上图所示，为了在反序列化时知道对象的类型，JSON序列化器会将类的class类型写入json结果中，存入Redis，会带来额外的内存开销。
那么我们如何解决这个问题呢？我们可以通过下文的`StringRedisTemplate`来解决这个问题。 
### 3.6	StringRedisTemplate
**为了节省内存空间，我们并不会使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232715-430eb9c0-0c67-4283-9256-5cb85a2f3e27.png#averageHue=%23f1e8e7&clientId=ue9b12b69-c25a-4&id=oWfnA&originHeight=385&originWidth=1161&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2ec135db-f224-4df3-8897-277ca0cc0d3&title=)
**Spring默认提供了一个StringRedisTemplate类，它的key和value的序列化方式默认就是String方式。省去了我们自定义RedisTemplate的过程**
**① 我们可以直接编写一个测试类使用StringRedisTemplate来执行以下方法** 
```java
@SpringBootTest
class RedisStringTemplateTest {

	@Resource
	private StringRedisTemplate stringRedisTemplate;

	@Test
	void testSaveUser() throws JsonProcessingException {
		// 1.创建一个Json序列化对象
		ObjectMapper objectMapper = new ObjectMapper();
		// 2.将要存入的对象通过Json序列化对象转换为字符串
		String userJson1 = objectMapper.writeValueAsString(new User("Vz", 21));
		// 3.通过StringRedisTemplate将数据存入redis
		stringRedisTemplate.opsForValue().set("user:100",userJson1);
		// 4.通过key取出value
		String userJson2 = stringRedisTemplate.opsForValue().get("user:100");
		// 5.由于取出的值是String类型的Json字符串，因此我们需要通过Json序列化对象来转换为java对象
		User user = objectMapper.readValue(userJson2, User.class);
		// 6.打印结果
		System.out.println("user = " + user);
	}

}
```
 
**② 执行完毕回到Redis的图形化客户端查看结果**
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1711854232777-2bc32d5e-4cd1-4715-ad47-bcb700a072ee.png#averageHue=%23dfd5d4&clientId=ue9b12b69-c25a-4&id=J5hQG&originHeight=302&originWidth=786&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2fe57611-6a7b-4268-9998-969fcdc9d40&title=) 
### 3.7 总结
RedisTemplate的两种序列化实践方案，两种方案各有各的优缺点，可以根据实际情况选择使用。
方案一：

1. 自定义RedisTemplate
2. 修改RedisTemplate的序列化器为GenericJackson2JsonRedisSerializer

方案二：

1. 使用StringRedisTemplate
2. 写入Redis时，手动把对象序列化为JSON
3. 读取Redis时，手动把读取到的JSON反序列化为对象
