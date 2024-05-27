---
title: swagger
urlname: wsccbdsgmg75q9mv
date: '2024-03-15 16:17:32'
updated: '2024-04-06 12:14:16'
cover: 'https://cdn.nlark.com/yuque/0/2022/png/29688613/1663162310969-390beff8-4f42-4064-9d03-6d1a545e8a41.png'
description: 'Swagger简介官网：https://swagger.io/Swagger是一个规范和完整的框架，用于生成，描述，调用和可视化RESTful风格的Web服务。功能1。使得前后端分离开发更加方便，有利于团队协作2.接口文档在线自动生成，降低后端开发人员编写接口文档的负担3.接口功能测试使用Sw...'
---
# Swagger
## 简介
官网：[https://swagger.io/](https://swagger.io/)
Swagger是一个规范和完整的框架，用于生成，描述，调用和可视化RESTful风格的Web服务。功能
1。使得前后端分离开发更加方便，有利于团队协作
2.接口文档在线自动生成，降低后端开发人员编写接口文档的负担
3.接口功能测试
使用Swagger只需要按照它的规范去定义接口及接口相关的信息，再通过Swagger衍生出来的一系列项目和工具，就可以做到生成各种格式的接口文档，以及在线接口调试页面等等
直接使用Swagger, 需要按照Swagger的规范定义接口, 实际上就是编写Json文件，编写起来比较繁琐、并不方便, 。而在项目中使用，我们一般会选择一些现成的框架来简化文档的编写，而这些框架是基于Swagger的，如knife4j。knife4j是为Java MVC框架集成Swagger生成Api文档的增强解决方案。而我们要使用kinfe4j，需要在pom.xml中引入如下依赖即可： 
```
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

### 使用方式
接下来，我们就将我们的项目集成Knife4j，来自动生成接口文档。这里我们还是需要再创建一个新的分支v1.2，在该分支中进行knife4j的集成，集成测试完毕之后，没有问题，我们再将v1.2分支合并到master。
使用knife4j,主要需要操作一下几步：
1.导入依赖
2.导入knife4j相关配置类
这里我们不需要创建一个新的配置类了，我们直接再WebMvcConfig配置类中声明即可。

A. 在该配置类中加上两个注解 @EnableSwagger2 @EnableKnife4j ,开启Swagger和Knife4j的功能。
B.再配置类中声明一个Docket类型的bean，通过该bean来指定生成文档的信息。

> 注意： Docket声明时，指定的有一个包扫描的路径，该路径指定的是Controller所在包的路径。因为Swagger在生成接口文档时，就是根据这里指定的包路径，自动的扫描该包下的@Controller， @RestController， @RequestMapping等SpringMVC的注解，依据这些注解来生成对应的接口文档。

设置静态资源映射
由于Swagger生成的在线文档中，涉及到很多静态资源，这些静态资源需要添加静态资源映射，否则接口文档页面无法访问。因此需要在WebMvcConfig类中的addResourceHanders方法中增加如下配置。
### 注解的介绍

为了解决上述的问题，Swagger提供了很多的注解，通过这些注解，我们可以更好更清晰的描述我们的接口，包含接口的请求参数、响应数据、数据模型等。核心的注解，主要包含以下几个：

| 注解 | 位置 | 说明 |
| --- | --- | --- |
| [@Api ](/Api ) | 类 | 加载Controller类上,表示对类的说明 |
| [@ApiModel ](/ApiModel ) | 类(通常是实体类) | 描述实体类的作用 |
| [@ApiModelProperty ](/ApiModelProperty ) | 属性 | 描述实体类的属性 |
| [@ApiOperation ](/ApiOperation ) | 方法 | 说明方法的用途、作用 |
| [@ApiImplicitParams ](/ApiImplicitParams ) | 方法 | 表示一组参数说明 |
| [@ApiImplicitParam ](/ApiImplicitParam ) | 方法 | 用在@ApiImplicitParams注解中，指定一个请求参数的各个方面的属性 |

ApiModel，ApiModelProperty描述实体类及属性
```
@Data
@ApiModel("套餐")
public class Setmeal implements Serializable {
    private static final long serialVersionUID = 1L;
    @ApiModelProperty("主键")
    private Long id;
    
    //分类id
    @ApiModelProperty("分类id")
    private Long categoryId;
    
    //套餐名称
    @ApiModelProperty("套餐名称")
    private String name;

    //套餐价格
    @ApiModelProperty("套餐价格")
    private BigDecimal price;

    //状态 0:停用 1:启用
    @ApiModelProperty("状态")
    private Integer status;

    //编码
    @ApiModelProperty("套餐编号")
    private String code;

    //描述信息
    @ApiModelProperty("描述信息")
    private String description;

    //图片
    @ApiModelProperty("图片")
    private String image;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @TableField(fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateUser;
}
```
总之，我们想清晰的描述一个接口，就需要借助Swagger给我们提供的注解。
## 项目部署
### 部署结构
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/3ccc5711ffe65132246cd7a999611735.png)
前端部署服务器：nginx
后端部署服务器：Tomcat

| 服务器 | 软件 | 名称 |
| --- | --- | --- |
| 192.168.138.100 | Nginx(部署前端项目、配置反向代理)，MySQL(主从复制的主库) | 服务器A |
| 192.168.138.101 | JDK1.8、Git、Maven、jar(项目jar包基于内嵌Tomcat运行)、MySQL(主从复制的从库) | 服务器B |
| 172.17.2.94 | Redis(缓存中间件) | 服务器C |

课程中Nginx,Mysql的主从复制，Redis,JDK,Git,Maven都演示郭安装及配置了
## Swagger2
**1.加入pom依赖**
```xml
<!--swagger,调试restful接口,界面-->
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>2.9.2</version>
</dependency>
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.9.2</version>
</dependency>
```
2.写配置文件
```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket webApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
        .groupName("webApi")
        .apiInfo(webApiInfo())
        .select()
        .build();
    }

    private ApiInfo webApiInfo(){
        return new ApiInfoBuilder()
        .title("rabbitmq接口文档")
        .description("本文档描述了rabbitmq微服务接口定义")
        .version("1.0")
        .contact(new Contact("a","http://www.baidu.com","asdasda@qq.com"))
        .build();
    }
}
```
注意:如果启动报错,可能是springboot版本过高,换成2.5.6试试

## Swagger3

我来填坑了!!!
```xml
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-boot-starter</artifactId>
  <version>3.0.0</version>
</dependency>
```
这是Swagger3的配置, DocumentationType.SWAGGER_2 也可以配置成Swagger2,也能用.
```java
package com.xie.swagger.config;

import com.xie.swagger.annotation.NoApiSwagger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.RequestHandlerSelectors.*;

@Configuration
//@EnableSwagger2
@EnableOpenApi //swagger3才有的
public class SwaggerConfig {

    @Value("${swagger.enable}")
    private boolean enableSwagger;//开发环境(false)关闭

    @Bean
    public Docket docket() {
        ApiInfo apiInfo =
        new ApiInfoBuilder()
        .contact(new Contact("IT世界",
                             "https://www.artprogramming.xn--6qq986b3xl/",
                             "a1609981289@gamil.com")
                )
        .title("swagger学习帮助文档")
        .description("swagger学习帮助文档详细描述")
        .version("1.0")
        .build();

        return new Docket(DocumentationType.SWAGGER_2)//swagger版本
        .apiInfo(apiInfo)
        .enable(enableSwagger)
        .select()
        .apis((withMethodAnnotation(NoApiSwagger.class).negate()))//用这个注解标记的方法不生产api文档
        .apis(basePackage("com.xie.swagger.controller"))//在这个包下的才会生成api文档
        .paths(PathSelectors.regex("/swagger/.*"))//匹配路径的接口才会生成api文档
        .build();
    }

}
```
发现Swagger3, 也是不支持springboot 2.6.0及以上版本.
而且功能上也不完备. 比如: example,就不会显示. @ApiParam, 也不能显示, 得用@ApiImplicitParams才能显示,而且还不能example
当然了,来此填坑
```properties
#加上此参数, 就能在springboot 2.6.0及以上版本使用了, 完全能运行, 但是修改了路径匹配规则,就变成以前的那种了
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
swagger.enable=true
```
示例
```java
package com.xie.swagger.controller;

import com.xie.swagger.annotation.NoApiSwagger;
import com.xie.swagger.entity.MyEntity;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/swagger")
@Api(tags = {"MyController","Swagger学习控制器"})
public class MyController {

    @GetMapping("testEntity")
    public MyEntity testMyEntity() {
        return new MyEntity();
    }

    @GetMapping("/test")
    @ApiOperation(value = "test方法",notes = "测试一下Swagger3是否可以说明参数信息")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "a", value = "新增时提供的用户名", required = true, paramType = "query", dataType = "int", example = "zhangsan"),
        @ApiImplicitParam(name = "b", value = "新增时提供的密码", required = true, paramType = "query", dataType = "int", example = "123456")
    })
    public String test(String a, String b) {
        System.out.println(a + ":" + b);
        return "test";
    }

    @PostMapping("/post")
    @ApiOperation(value = "post方法,做数据新增操作",notes = "Swagger学习使用post请求处理方法")
    public String post(
        @ApiParam(name = "用户名(a)", value = "新增时提供的用户名", required = true, type = "String", example = "zhangsan") String a,
        @ApiParam(name = "密码(b)", value = "新增时提供的密码", required = true, type = "String", example = "123456") String b) {
        return "post";
    }

    @ApiIgnore
    @GetMapping("/get")
    public String get(String a, String b) {
        return "get";
    }

    @NoApiSwagger
    @RequestMapping("/req")
    public String req(String m) {
        return "req";
    }
}
```

 
因此建议使用Swagger2

## 使用Knife4j集成Swagger
```xml
<dependency>
  <groupId>com.github.xiaoymin</groupId>
  <artifactId>knife4j-spring-boot-starter</artifactId>
  <version>3.0.2</version>
</dependency>

```

```yaml
knife4j:
  title: Knife4j接口文档
  description: Knife4j接口文档描述
  version: 1.0.0
  contact:
    name: 开发者姓名
    url: http://example.com
    email: developer@example.com
  terms-of-service-url: http://example.com/terms
  license:
    name: Apache License 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
  swagger-resources:
    - name: default
      location: /v2/api-docs
      swaggerVersion: 2.0
  # 其他 Knife4j 配置项
  # 是否开启 Knife4j 接口文档，默认为 true
  enable: true
  # 接口文档扫描的包路径，多个路径用逗号分隔，默认为全部扫描
  base-packages: com.example.controller
  # 是否开启密码访问，如果为 true，则需要通过输入密码才能访问接口文档，默认为 false
  password-enabled: false
  # 访问密码，如果开启了密码访问，则需要设置密码，默认为空
  password: your_password
  # 是否开启权限认证，默认为 false
  authorization-enabled: false
  # 授权的 URL，如果开启了权限认证，则需要设置授权的 URL，默认为空
  authorization-url: /auth
  # 授权的用户名，默认为空
  authorization-username: admin
  # 授权的密码，默认为空
  authorization-password: admin_password
  # 是否开启文档分组，默认为 true
  group-enabled: true
  # 默认分组的名称，默认为 default
  group-name: default
  # 文档扫描的路径前缀，默认为空
  path-prefixes: /api/v1

```
