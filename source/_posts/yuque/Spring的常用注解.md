---
title: Spring的常用注解
urlname: gavw0zv066enu3ge
date: '2024-05-04 14:39:10'
updated: '2024-06-25 13:36:02'
description: '类别注解说明Bean的声明@Component定义基础层的通用组件, 没有明确的角色@Service定义业务逻辑层的服务组件@Repository在数据访问层定义数据资源服务@Controller在展示层使用, 用于定义控制器Bean的注入@Autowried服务依赖注入, byType注入,...'
cover: 'https://cdn.jsdelivr.net/gh/choodsire666/blog-img/Spring的常用注解/cover.jpg'
---
| 类别 | 注解 | 说明 |
| --- | --- | --- |
| Bean的声明 | @Component | 定义基础层的通用组件, 没有明确的角色 |
|  | @Service | 定义业务逻辑层的服务组件 |
|  | @Repository | 在数据访问层定义数据资源服务 |
|  | @Controller | 在展示层使用, 用于定义控制器 |
| Bean的注入
 | @Autowried | 服务依赖注入, byType注入, 默认required为true |
|  | @Qualifier | 用于和@Autowried注解配合使用, 实现ByName功能 |
|  | @Primary | 当多个相同类型的bean被定义时，被标记为@Primary的bean会被优先选择 |
|  | @Resource | 服务依赖注入, byName注入, 如果没有就采用byType注入
注: Jdk提供的注解, 可用于不同的mvc框架 |
|  | @Configurable | 用于非Spring容器管理的类, 注入Bean对象
value
autowire：
autowire= Autowire.BY_NAME 表示依赖的Bean是按名字来自动装配。当然也可以使用autowire= Autowire.BY_TYPE，按类型来装配。
dependencyCheck：依赖检查
preConstruction： preConstruction =true表示依赖的Bean在构造函数调用之前就被注入 |
| 配置类注解 | @Configuration | 声明该类为配置类, 其中的@Value属性可以直接和配置文件的属性映射 |
|  | @Bean | 声明在方法上, 声明该方法的返回值为一个Bean实例 |
|  | @ComponentScan | 用于对Component进行扫描配置 |
|  | @ComponentScans | 用于对Component进行扫描配置 |
|  | @Filter | 用在ComponentScan中, 进行过滤 |
|  | @Profile |  用来, 根据目前环境来判断是否注入bean
@Profile(!profile)， 逻辑非，代表当profile没有激活;
@Profile(profileA&profileB)，逻辑与，代表当profileA和profileB都激活;
@Profile(profileA&#124;profileB)，逻辑或，代表当profileA或profileB被激活;
@Profile({profileA,profileB})，逗号分隔的多个profile，相当于逻辑或 |
| AOP注解 | @EnableAspectJAutoProxy | 开启Spring对AspectJ代理的支持,
springboot因为有自动配置，所以不需要开发人员手工配置@EnableAspectJAutoProxy,
proxyTargetClass = true表示使用cglib |
|  | @EnableLoadTimeWeaving | 
 |
|  | @Aspect | 声明一个切面, 使用@After, @Before, @Around定义通知, 可以将拦截规则(切点)作为参数 |
|  | @After | 在方法执行之后执行 |
|  | @Before | 在方法执行之前执行 |
|  | @Around | 在方法执行之前和执行之后都执行 |
|  | @PointCut | 声明一个切点, 可以却expression(切入点表达式), 也可以为一个注解类

execution(访问修饰符[可省略] 返回类型 包名.类名.方法名(参数)  包名可以省略) |
|  | @AfterThrowing | 在抛出异常之后执行 |
|  | @AfterReturning | 在执行结束后返回结果时执行, 出现异常时不执行 |
| Bean支持注解 | @Scope | 设置Spring容器Bean实例的生命周期, 取值有singleton, prototype, request, session, global session |
|  | @Lazy | 声明Bean为懒加载, 等同xml中lazy-init |
|  | @Role | bean角色定义为ROLE_APPLICATION(默认值)、ROLE_SUPPORT(辅助角色)、ROLE_INFRASTRUCTURE(后台角色，用户无感) |
|  | @PostConstruct | 声明方法在构造函数执行完毕后开始执行 |
|  | @PreDestroy | 声明方法在Bean销毁之前执行 |
|  | @Value | 为属性注入值 |
|  | @PropertySource | 声明和加载配置文件 |
|  | @PropertySources | 声明和加载多个配置文件 |
|  | @Import | 导入配置类 |
|  | @ImportResource | 声明和加载配置文件 |
|  | @DependsOn | 用于声明一个Bean是在另一个Bean之后创建 |
|  | @Order | 用于声明一个Bean的执行顺序, 越小越先执行, 对应有Ordered接口 |
|  | @Conditioinal | 根据条件来判断是否注入bean, Conditional接口, SpringBoot中有许多派生注解
@ConditionalOn系列 |
|  | @Lookup | 当一个单例bean依赖于另一个bean时, 并希望这个bean是非单例的, 就使用@Lookup注解 |
|  | @Required | 用于Bean的setter方法上，用于检查一个Bean的属性的值在配置期间是否被赋值。隐式地注册RequiredAnnotationBeanPostProcessor，使@Required注解生效。 |
| 异步操作注解 | @EnableAsync | 声明在类上, 开启对异步任务的支持 |
|  | @Async | 声明方法是个异步任务, Spring后台基于线程池异步执行该方法 |
| 定时任务相关 | @EnableScheduling | 声明在类上, 开启对调度任务的支持 |
|  | @Scheduled | 声明一个定时任务, 包括cron, fixDelay, fixRate等参数

cron 秒 分 时 日 月 周 |
| 缓存相关 | @EnableCaching | 开启对缓存的支持 |
|  | @Cacheable | 获取缓存, 和设置缓存 |
|  | @CachePut | 设置缓存 |
|  | @CacheEvict | 删除缓存 |
|  | @CacheConfig | 这个注解写在类上，主要作用是让类中的所有缓存注解都共享这些属性. |
| 事务相关 | @EnableTransactionManagement | 开启对事务的支持
 spring-boot-starter-jdbc 依赖，框架会默认注入 DataSourceTransactionManager 实例。如果你添加的是 spring-boot-starter-data-jpa 依赖，框架会默认注入 JpaTransactionManager 实例。

对于系统需要提供默认事务管理的情况下，实现接口 TransactionManagementConfigurer 指定 |
|  | @Transactional | 声明使用事务,
传播行为,
回滚异常,
隔离级别 |
| 开启功能支持 | @EnableAspectJAutoProxy | 开启对AspectJ自动代理的支持 |
|  | @EnableAsync | 开启对异步方法的支持 |
|  | @EnableScheduling | 开启对定时任务的支持 |
|  | @EnableWebMVC | 开启对WebMVC的配置支持 |
|  | @EnableJpaRepositories | 开启对SpringData JPA Repository的支持 |
|  | @EnableTransactionManagement | 开启对事务的支持 |
|  | @EnableCaching | 开启对缓存的支持 |
| 测试相关注解 | @RunWith | 运行器, Spring中通常用于对JUnit的支持 |
|  | @ContextConfiguration | 用来加载配置ApplicationContext, 其中classes属性用来加载配置类 |
| SpringMVC相关注解 | @Controller | 声明该类为Spring MVC中的控制器 |
|  | @RequestMapping | 用于声明映射Web请求的地址和参数, 包括访问路径和参数
products: 可以设置返回的Content-Type
consumes: 只能处理的消息媒体
headers: 只能处理有这个请求头的
params: 会根据params参数的值来确定是否执行 |
|  | @RequestParam | 
 |
|  | @ResponseBody | 支持将返回值放在Response Body体中返回, 通常用于返回JSON数据 |
|  | @RequestBody | 允许request的参数在Request Body中 |
|  | @PathVariable | 用于接受基于路径的参数, 通常作为Restful接口的实现 |
|  | @RestController | 组合注解, 相当于@Controller和@ResponseBody的组合 |
|  | @ExceptionHandler | 用于全局控制器的异常处理 |
|  | @InitBinder | WebDataBinder用来自动绑定前台请求的参数到模型(Model)中 |
|  | @GetMapping | 相当于RequestMapping中的RequestMethod为get |
|  | @PostMapping | 相当于RequestMapping中的RequestMethod为post |
|  | @PutMapping | 相当于RequestMapping中的RequestMethod为put |
|  | @DeleteMapping | 相当于RequestMapping中的RequestMethod为delete |
|  | @PatchMapping | 相当于RequestMapping中的RequestMethod为patch |
|  | @ResponseStatus | 
 |
|  | @ControllerAdvice | 
 |
|  | @RestControllerAdvice | 
 |
|  | @JsonSerialize | Jackson提供的注解 |
| SpringBoot相关注解 | @EnableConfigurationProperties | 开启对@ConfigurationProperties注解配置Bean的支持 |
|  | @ConfigurationProperties | 
 |
|  | @SpringBootApplication | 
 |
|  | @EnableAutoConfiguration | 
 |
|  | @Validated | 参数合法校验
JSR303 |


