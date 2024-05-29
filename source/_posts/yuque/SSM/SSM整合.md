# 前言
在做SSM项目时，发现配置文件很多，而且代码日后可以复用（便于以后能够快速复制粘贴），所以记录下来，供以后开发和学习（偷懒）用。
# 注解整合
	注解	解释
Spring	@Autowired	Spring提供的工具（由Spring的依赖注入工具（BeanPostProcessor、BeanFactoryPostProcessor）自动注入。）
Spring	@Configuration	声明当前类是一个配置类（相当于一个Spring配置的xml文件）
Spring	@Bean	注解在方法上，声明当前方法的返回值为一个Bean。返回的Bean对应的类中可以定义init()方法和destroy()方法，然后在@Bean(initMethod=”init”,destroyMethod=”destroy”)定义，在构造之后执行init，在销毁之前执行destroy。
Spring	@Cacheable	声明数据缓存
Spring	@EnableAspectJAutoProxy	开启Spring对AspectJ的支持
Spring	@Value	值得注入。经常与Sping EL表达式语言一起使用，注入普通字符，系统属性，表达式运算结果，其他Bean的属性，文件内容，网址请求内容，配置文件属性值等等
Spring	@PropertySource	指定文件地址。提供了一种方便的、声明性的机制，用于向Spring的环境添加PropertySource。与@configuration类一起使用。
Spring	@PostConstruct	标注在方法上，该方法在构造函数执行完成之后执行。
Spring	@PreDestroy	标注在方法上，该方法在对象销毁之前执行。
Spring	@Profile	表示当一个或多个指定的文件是活动的时，一个组件是有资格注册的。使用@Profile注解类或者方法，达到在不同情况下选择实例化不同的Bean。@Profile(“dev”)表示为dev时实例化。
Spring	@EnableAsync	开启异步任务支持。注解在配置类上。
Spring	@Async	注解在方法上标示这是一个异步方法，在类上标示这个类所有的方法都是异步方法。
Spring	@Conditional	根据满足某一特定条件创建特定的Bean
Spring	@Enable*	通过简单的@Enable*来开启一项功能的支持。所有@Enable*注解都有一个@Import注解，@Import是用来导入配置类的，这也就意味着这些自动开启的实现其实是导入了一些自动配置的Bean(1.直接导入配置类2.依据条件选择配置类3.动态注册配置类)
Spring	@RunWith	这个是Junit的注解，springboot集成了junit。一般在测试类里使用:@RunWith(SpringJUnit4ClassRunner.class) — SpringJUnit4ClassRunner在JUnit环境下提供Sprng TestContext Framework的功能
Spring	@ContextConfiguration	用来加载配置ApplicationContext，其中classes属性用来加载配置类:@ContextConfiguration(classes = {TestConfig.class(自定义的一个配置类)})
Spring	@ActiveProfiles	用来声明活动的profile–@ActiveProfiles(“prod”(这个prod定义在配置类中))
Spring	@Scheduled	注解在方法上，声明该方法是计划任务。支持多种类型的计划任务：cron,fixDelay,fixRate
Spring	@WebAppConfiguration	一般用在测试上，注解在类上，用来声明加载的ApplicationContext是一个WebApplicationContext。他的属性指定的是Web资源的位置，默认为src/main/webapp,我们可以修改为：@WebAppConfiguration(“src/main/resources”)。
Spring	@ImportResource	虽然Spring提倡零配置，但是还是提供了对xml文件的支持，这个注解就是用来加载xml配置的。例：@ImportResource({“classpath
SpringAOP	@Aspect	声明一个切面（就是说这是一个额外功能）
SpringAOP	@After	后置建言（advice），在原方法前执行。
SpringAOP	@Before	前置建言（advice），在原方法后执行。
SpringAOP	@Around	环绕建言（advice），在原方法执行前执行，在原方法执行后再执行（@Around可以实现其他两种advice）
SpringAOP	@PointCut	声明切点，即定义拦截规则，确定有哪些方法会被切入
SpringAOP	@Transactional	声明事务（一般默认配置即可满足要求，当然也可以自定义）
SpringMVC	@Controller	组合注解（组合了@Component注解），应用在MVC层（控制层）,DispatcherServlet会自动扫描注解了此注解的类，然后将web请求映射到注解了@RequestMapping的方法上。
SpringMVC	@Service	组合注解（组合了@Component注解），应用在service层（业务逻辑层）
SpringMVC	@Reponsitory	组合注解（组合了@Component注解），应用在dao层（数据访问层）
SpringMVC	@Component	表示一个带注释的类是一个“组件”，成为Spring管理的Bean。当使用基于注解的配置和类路径扫描时，这些类被视为自动检测的候选对象。同时@Component还是一个元注解。
SpringMVC	@EnableWebMvc	用在配置类上，开启SpringMvc的Mvc的一些默认配置：如ViewResolver，MessageConverter等。同时在自己定制SpringMvc的相关配置时需要做到两点：1.配置类继承WebMvcConfigurerAdapter类2.就是必须使用这个@EnableWebMvc注解。
SpringMVC	@RequestMapping	用来映射web请求（访问路径和参数），处理类和方法的。可以注解在类和方法上，注解在方法上的@RequestMapping路径会继承注解在类上的路径。同时支持Serlvet的request和response作为参数，也支持对request和response的媒体类型进行配置。其中有value(路径)，produces(定义返回的媒体类型和字符集)，method(指定请求方式)等属性。
SpringMVC	@ResponseBody	将返回值放在response体内。返回的是数据而不是页面
SpringMVC	@RequestBody	允许request的参数在request体中，而不是在直接链接在地址的后面。此注解放置在参数前。
SpringMVC	@PathVariable	放置在参数前，用来接受路径参数。
SpringMVC	@RestController	组合注解，组合了@Controller和@ResponseBody,当我们只开发一个和页面交互数据的控制层的时候可以使用此注解。
SpringMVC	@ControllerAdvice	用在类上，声明一个控制器建言，它也组合了@Component注解，会自动注册为Spring的Bean。
SpringMVC	@ExceptionHandler	用在方法上定义全局处理，通过他的value属性可以过滤拦截的条件：@ExceptionHandler(value=Exception.class)–表示拦截所有的Exception。
SpringMVC	@ModelAttribute	将键值对添加到全局，所有注解了@RequestMapping的方法可获得次键值对（就是在请求到达之前，往model里addAttribute一对name-value而已）。
SpringMVC	@InitBinder	通过@InitBinder注解定制WebDataBinder（用在方法上，方法有一个WebDataBinder作为参数，用WebDataBinder在方法内定制数据绑定，例如可以忽略request传过来的参数Id等）。
SpringBoot	@EnableAutoConfiguration	此注释自动载入应用程序所需的所有Bean——这依赖于Spring Boot在类路径中的查找。该注解组合了@Import注解，@Import注解导入了EnableAutoCofigurationImportSelector类，它使用SpringFactoriesLoader.loaderFactoryNames方法来扫描具有META-INF/spring.factories文件的jar包。而spring.factories里声明了有哪些自动配置。
SpringBoot	@SpingBootApplication	SpringBoot的核心注解，主要目的是开启自动配置。它也是一个组合注解，主要组合了@Configurer，@EnableAutoConfiguration（核心）和@ComponentScan。可以通过@SpringBootApplication(exclude={想要关闭的自动配置的类名.class})来关闭特定的自动配置。
SpringBoot	@ConfigurationProperties	将properties属性与一个Bean及其属性相关联，从而实现类型安全的配置。例：@ConfigurationProperties(prefix=”authot”，locations={“classpath
SpringBoot	@ConditionalOnBean	条件注解。当容器里有指定Bean的条件下。
SpringBoot	@ConditionalOnClass	条件注解。当类路径下有指定的类的条件下。
SpringBoot	@ConditionalOnExpression	条件注解。基于SpEL表达式作为判断条件。
SpringBoot	@ConditionalOnJava	条件注解。基于JVM版本作为判断条件。
SpringBoot	@ConditionalOnJndi	条件注解。在JNDI存在的条件下查找指定的位置。
SpringBoot	@ConditionalOnMissingBean	条件注解。当容器里没有指定Bean的情况下。
SpringBoot	@ConditionalOnMissingClass	条件注解。当类路径下没有指定的类的情况下。
SpringBoot	@ConditionalOnNotWebApplication	条件注解。当前项目不是web项目的条件下。
SpringBoot	@ConditionalOnResource	条件注解。类路径是否有指定的值。
SpringBoot	@ConditionalOnSingleCandidate	条件注解。当指定Bean在容器中只有一个，后者虽然有多个但是指定首选的Bean。
SpringBoot	@ConditionalOnWebApplication	条件注解。当前项目是web项目的情况下。
SpringBoot	@EnableConfigurationProperties	注解在类上，声明开启属性注入，使用@Autowired注入。例：@EnableConfigurationProperties(HttpEncodingProperties.class)。
SpringBoot	@AutoConfigureAfter	在指定的自动配置类之后再配置。例：@AutoConfigureAfter(WebMvcAutoConfiguration.class)
SpringBoot	@ComponentScan	自动扫描指定包下所有使用@Service,@Component,@Controller,@Repository的类并注册
SpringBoot	@EnableScheduling	注解在配置类上，开启对计划任务的支持。
# 1、pom依赖导入
（1）依赖包括：junit,数据库驱动,连接池,servlet,jsp,mybatis,mybatis-spring,spring 
```xml
<dependencies>
  <!--Junit-->
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
  </dependency>
  <!--数据库驱动-->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
  </dependency>
  <!-- 数据库连接池 -->
  <dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5.2</version>
  </dependency>
  <!--Servlet - JSP -->
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
  </dependency>
  <dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>jsp-api</artifactId>
    <version>2.2</version>
  </dependency>
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
  </dependency>
  <!--Mybatis-->
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.2</version>
  </dependency>
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.2</version>
  </dependency>
  <!--Spring-->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.1.9.RELEASE</version>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.1.9.RELEASE</version>
  </dependency>
  <!--lombok-->
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.10</version>
  </dependency>
</dependencies>
```
（2） 在build中配置resources，来防止我们资源导出失败的问题
```xml
<build>
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <includes>
        <include>**/*.properties</include>
        <include>**/*.xml</include>
      </includes>
    </resource>
    <resource>
      <directory>src/main/java</directory>
      <includes>
        <include>**/*.properties</include>
        <include>**/*.xml</include>
      </includes>
      <filtering>true</filtering>
    </resource>
  </resources>
</build>
```
# 2.数据库配置文件
database.properties ：
如果使用的是MySQL8.0+,就需要增加一个时区的配置;&ServerTimezone=Asia/Shanghai
```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssmbuild?useSSL=true&useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=root
```
# 3.MyBatis核心配置文件
mybatis-config.xml：
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <typeAliases>
    <package name="com.pojo"/>
  </typeAliases>
  <mappers>
    <mapper class="com.dao.BookMapper"/>
  </mappers>
</configuration>
```
# 4.Spring整合MyBatis
spring-dao.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:context="http://www.springframework.org/schema/context"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
  http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
  <!--1.关联数据库配置文件-->
  <context:property-placeholder location="classpath:database.properties"/>

  <!-- 2.数据库连接池 -->
  <!--数据库连接池
  dbcp 半自动化操作 不能自动连接
  c3p0 自动化操作（自动的加载配置文件 并且设置到对象里面）
  druid 阿里开发的连接池，目前企业用的较多
  -->
  <!-- 配置连接池属性 -->
  <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
    <!-- c3p0连接池的私有属性 -->
    <property name="maxPoolSize" value="30"/>
    <property name="minPoolSize" value="10"/>
    <!-- 关闭连接后不自动commit -->
    <property name="autoCommitOnClose" value="false"/>
    <!-- 获取连接超时时间 -->
    <property name="checkoutTimeout" value="10000"/>
    <!-- 当获取连接失败重试次数 -->
    <property name="acquireRetryAttempts" value="2"/>
  </bean>
  <!-- 3.配置SqlSessionFactory对象 -->
  <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <!-- 注入数据库连接池 -->
    <property name="dataSource" ref="dataSource"/>
    <!-- 配置MyBatis全局配置文件:mybatis-config.xml -->
    <property name="configLocation" value="classpath:mybatis-config.xml"/>
  </bean>
  <!--配置dao接口扫描包，动态的实现了Dao接口可以注入到Spring容器中-->
  <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!-- 注入sqlSessionFactory -->
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    <!-- 给出需要扫描Dao接口包 -->
    <property name="basePackage" value="com.dao"/>
  </bean>

</beans>
```
# 5.Spring整合Service
spring-service.xml ：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:context="http://www.springframework.org/schema/context"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
  http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
  <!-- 扫描service相关的bean -->
  <context:component-scan base-package="com.service" />

  <!--BookServiceImpl注入到IOC容器中-->
  <bean id="BookServiceImpl" class="com.service.BookServiceImpl">
    <property name="bookMapper" ref="bookMapper"/>
  </bean>
  <!-- 配置事务管理器 -->
  <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!-- 注入数据库连接池 -->
    <property name="dataSource" ref="dataSource" />
  </bean>
</beans>
```
# 6.Web配置文件
web.xml：
@Servlet
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--DispatchServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:applicationContext.xml</param-value>
        </init-param>
        <!--启动级别为1，和服务器一起启动-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    <!--乱码过滤-->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    <session-config>
        <session-timeout>15</session-timeout>
    </session-config>
</web-app>
```
# 7.SpringMVC核心配置文件
spring-mvc.xml ：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <!--1、注解驱动-->
    <mvc:annotation-driven/>
    <!--2、静态资源过滤-->
    <mvc:default-servlet-handler/>
    <!--3、扫描包-->
    <context:component-scan base-package="com.controller"/>
    <!--4、视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"
          id="internalResourceViewResolver">
        <!-- 前缀 -->
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <!-- 后缀 -->
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```
# 8.Spring配置整合文件
applicationContext.xml：
@ImportSource
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">
    <import resource="spring-dao.xml"/>
    <import resource="spring-service.xml"/>
    <import resource="spring-mvc.xml"/>
</beans>
```
注意：编写接口对应的 Mapper.xml 文件时，如果写SQL语句没有提示语句，可按下面的操作进行（IDEA为偷懒而生）。
1、File--->Settings 
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SSM整合/74ee5157fc1f738f0629628bd03fdf91.png)
2、将你的项目文件添加一下，再点击“ok”，“apply”即可
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SSM整合/9bbbd1570ed91e81866782ad7e3bda2d.png)
 3、写SQL语句就会有提示了，又可以偷下小懒了
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SSM整合/562b73b1e563df97e41df065137e19a9.png)
4、当你写好全部配置文件，并部署好所有项目时，可以会出现下列情况，千万别放弃！！！
