---
title: SpringBoot
urlname: xuk6bl
date: '2022-08-30 08:32:56'
updated: '2024-05-11 23:53:04'
cover: 'https://cdn.nlark.com/yuque/0/2022/png/29688613/1662791824056-daa8dbc9-2b79-460f-ae25-0c628dc42928.png'
description: 1.SpringBoot概述和入门案例SpringBoot定位：Spring Boot是一个基于Spring框架的轻量级、快速开发的框架，它简化了基于Spring的应用程序的搭建和开发过程，让开发者可以更快速、更方便地构建和部署应用程序。Spring Boot的核心理念：Spring Boot...
---
## 1.SpringBoot概述和入门案例
- SpringBoot定位：Spring Boot是一个基于Spring框架的轻量级、快速开发的框架，它简化了基于Spring的应用程序的搭建和开发过程，让开发者可以更快速、更方便地构建和部署应用程序。
- Spring Boot的核心理念：Spring Boot的核心理念是约定大于配置，它提供了很多默认的配置和依赖管理，使得开发者可以更快速地启动和运行应用程序，同时也减少了开发者在配置方面的工作量。
- Spring Boot还提供了丰富的特性，例如自动配置、健康检查、应用程序监控、安全性、Swagger API文档生成等等，可以使得开发者更容易地添加这些特性，从而使得应用程序更加稳定和可靠。

总之，Spring Boot是一个快速、简单和可靠的应用程序开发框架，它使得开发者可以更加专注于应用程序的业务逻辑，而不是框架本身的配置和管理。
### 1.1.学习前准备
 SpringBoot课程学习前置知识 ：

-  Java基础语法  
-  Spring与SpringMVC  
   -  知道Spring是用来管理bean，能够基于Restful实现页面请求交互功能  
-  Mybatis与Mybatis-Plus  
   -  基于Mybatis和MybatisPlus能够开发出包含基础CRUD功能的标准Dao/Mapper模块  
-  数据库MySQL  
   -  能够读懂基础CRUD功能的SQL语句  
-  Maven
   -  知道maven的依赖关系，知道什么是依赖范围，依赖传递，排除依赖，可选依赖，继承  
-  web技术（含Vue，ElementUI)    
   -  知道vue如何发送ajax请求，如何获取响应数据，如何进行数据模型双向绑定  
#### (1).环境搭建-安装JDK
除了需要掌握上述的SpringBoot课程学习前置知识外，我们还需要熟知使用SpringBoot框架的环境搭建过程，这一小节带领同学们回顾一下初学Java课程时期所学习过的JDK8的安装。

- 下载安装文件
   - 首先根据自己系统下载对应版本。下载地址http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9140b7ca6c26b04b549ef4cc5ba026a5.png)
- 安装
   - 双击exe文件，按照默认设置一步一步安装
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/03d9200ab143df869c7baad55c5bb02b.png)
- 配置环境变量
   - 右键“此电脑”——“属性”——“高级系统设置”——“高级”——“环境变量”——“新建”：
   - ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/31f42bebe2b3dbdf0135cc156bb39f79.jpeg)
   - 新建环境变量JAVA_HOME；变量名：JAVA_HOME；变量值：C:\Program Files\Java\jdk-1.8 。变量值是自己的jdk安装目录(图上的也是默认安装路径)：
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/29f134b42d73829d8b0331921c68a3db.png)
   - 新建环境变量CLASSPATH；变量名：CLASSPATH；变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar需要注意变量值前面的“.;”
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/55b4a9370e72b7b70ad2dda6aa7a0a42.png)
   - 配置环境变量Path；双击Path，点击新建，添加“%JAVA_HOME%\bin”；再次点击新建，添加“%JAVA_HOME%\jre\bin”；
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4bb068f68b2eda8a35549486aea5e164.png)
- 命令行窗口查看
   - Win+R键弹出运行窗口，输入cmd命令打开如下窗口来测试下自己的Java是否安装成功；测试命令Java-version，若出现下图信息的话就证明Java环境已经配置成功了。
- ![1705834381966.jpg](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c1f7034e8c459d8ed2178203295186b2.jpeg)

至此JDK已经安装完毕。
#### (2).环境搭建-安装Maven
什么是Maven：
Maven是一个开源的项目管理和构建自动化工具。它主要用于Java项目的构建、依赖管理和项目管理。Maven通过一个中央信息管理系统可以管理项目的构建、报告和文档等整个周期。
Maven的主要功能包括：

- **项目构建：** Maven可以自动化地构建项目。开发人员只需要定义项目的基本信息、依赖关系和目录结构，Maven就能根据这些信息自动化地完成项目的编译、测试、打包和部署等任务。
- **依赖管理：** Maven可以管理项目的依赖库。开发人员可以在项目配置文件（pom.xml）中指定项目所需的各种依赖库和版本号，Maven会自动下载并管理这些依赖。
- **项目报告：** Maven能够生成各种项目报告，包括构建过程中的错误信息、测试覆盖率报告、代码质量报告等，帮助开发人员更好地了解项目的状态。
- **文档生成：** Maven可以自动生成项目的文档。开发人员可以使用Maven插件来生成项目的API文档、用户手册等。
- **标准化项目结构：** Maven规定了一种标准的项目结构，开发人员只需要按照这个结构组织项目，Maven就能够识别项目的各种元素。

Maven使用XML文件（pom.xml）来配置项目，其中包含了项目的基本信息、依赖关系、构建过程等。Maven的核心概念包括项目对象模型（Project Object Model，POM）、生命周期（Lifecycle）、插件（Plugin）等。
通过使用Maven，开发人员可以更方便地管理项目，减少了构建和部署的复杂性，提高了项目的可维护性和可扩展性。
安装完JKD，初步了解了Maven后，这一小节带领同学们学习Maven仓库的安装。

- 下载Maven
   - 点击[Maven下载官方地址](https://maven.apache.org/download.cgi)下载Maven，或者去[Maven列表下载](https://archive.apache.org/dist/maven/maven-3/)，这里我们选择去Maven列表下载3.6.3版本的Maven(依次点击3.6.3——binaries——apache-maven-3.6.3-bin.zip)
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c75170d50ca2a78c5ae7419128d53bed.png)
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e09060d7d01e81ff69c567a3aecdfbf4.png)
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/511163efaeafa78885754b390bcd1416.png)
- 解压下载的文件
   - 这里我们将解压后的文件放到D:\work\Maven这个路径
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2cac8f9d8de26a0256db16aa15a505f6.png)
- Maven配置
   - 新建环境变量MAVEN_HOME；变量名：MAVEN_HOME；变量值：D:\work\Maven\apache-maven-3.6.3 。变量值是自己的maven安装目录(图上的是自定义的安装路径)：
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7c156906ceebcf61b5225c104ef0778f.png)
   - 配置环境变量Path；双击Path，点击新建，添加“%MAVEN_HOME%\bin”，点击确定；
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/de35d0c09b769daec1cc10d72e1f2227.png)
- 命令行窗口查看
   - Win+R键弹出运行窗口，输入cmd命令打开如下窗口来测试下自己的Maven是否安装成功；测试命令mvn -v，若出现下图信息的话就证明Maven环境已经配置成功了。
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5f90bc4343fe8835383ebd5b8cdbc52c.png)
- 配置maven本地仓库
   - 首先在本地新建一个文件夹repository（文件夹名称随意，尽量见名知意即可），作为本地的maven仓库：(我们放到maven的安装路径)
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9ac7b4cb9cd6129bd487c0f470fb898c.png)
   - 接着打开maven目录下的conf/settings.xml文件，配置本地仓库
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ad9770379210f5628a972eb04ffa0535.png)
```xml
<!-- Maven仓库下载依赖的位置 -->
  <localRepository>D:\work\Maven\repository</localRepository>

<!-- aliyun镜像配置 -->
     <mirror>
      <id>nexus-aliyun</id>
      <mirrorOf>central</mirrorOf>
      <name>Nexus aliyun</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>

<!-- JDK配置 -->
  <profile>     
    <id>JDK-1.8</id>       
    <activation>       
        <activeByDefault>true</activeByDefault>       
        <jdk>1.8</jdk>       
    </activation>       
    <properties>       
        <maven.compiler.source>1.8</maven.compiler.source>       
        <maven.compiler.target>1.8</maven.compiler.target>       
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>       
    </properties>       
</profile>
```
![EFUSJKAK{_A168ZERZU%9M3.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/951ca614f7e1d32dc3a38e8edf87248c.png)

![`D(Q$5)BS2J_DP4@`G}P`Q4.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/034169538c37d1470bb3d44499541a2a.png)
![b62213f0-cfe7-4286-baf8-3ca3075bb27f.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/1ac359f26fb4966086c49f89b9eff2d2.png)
### 1.2.入门案例-Idea创建SpringBoot项目
#### (1).新建一个空项目，确认Maven版本
新建一个空项目：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b15531c4ab15ffb9f949e2cae0072fe2.png)
设置项目名称和保存路径：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cad2d28478d226d5df9d84fde7d377db.png)
设置好Maven地址和仓库地址(注意Maven版本和idea版本的协同)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/29e954e78721dde8ab8befb0b2274e98.png)

#### (2).创建一个SpringBoot工程，设定项目信息并确定JDK版本
打开file，选择项目结构，新建一个spring项目并配置相关信息
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/6550a93ba0493f454328e96e4ee999e0.png)
选择Spring Web项目(SpringBoot内置tomcat服务器)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/65e1912f71e5e2c0db96512341e298fe.png)
#### (3).搭建一个SpringWeb项目，创建一个基于Rest风格的MVC控制器，运行程序并在浏览器中进行访问
新建一个controller类，配置好controller类的注解、访问路径和一个方法
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/87a930307cdcbc88e48cda780da52a84.png)
运行SpringBoot启动类
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cfbf0daa423c09b2cc74cd0acc03c461.png)
访问此前定义好的方法路径
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e8f510e04e7940d71640f804f416a86c.png)
至此一个最基本的SpringBoot程序已经开发完成
SpringMVC简介：
Spring MVC（Model-View-Controller）是一个基于Java的框架，用于构建企业级Web应用程序。它通过将应用程序分解为三个组件（模型、视图和控制器）来实现解耦，从而增强了应用程序的可维护性和可扩展性。以下是Spring MVC的工作流程：

1. **客户端发送请求：** 客户端（通常是浏览器）发送一个HTTP请求到服务器上的Spring前端控制器（Front Controller），它的核心是DispatcherServlet。
2. **DispatcherServlet处理请求：** DispatcherServlet是Spring MVC的核心组件，它接收所有的请求并将请求分发给合适的处理器（Controller）。
3. **HandlerMapping确定处理器：** DispatcherServlet通过HandlerMapping（处理器映射器）来确定请求对应的处理器。HandlerMapping根据请求的URL或其他标识信息，将请求映射到合适的Controller处理器上。
4. **Controller处理请求：** 一旦确定了合适的Controller，DispatcherServlet将请求转发给该Controller。Controller负责处理业务逻辑，并根据需要调用相关的业务服务（Service层）来完成业务操作。
5. **Controller返回模型数据和视图信息：** Controller处理完请求后，它通常会返回一个包含模型数据的ModelAndView对象。模型数据是要传递给视图的数据，而视图信息是用于渲染响应的视图的名称。
6. **ViewResolver解析视图：** DispatcherServlet使用ViewResolver（视图解析器）来将逻辑视图名解析为具体的视图对象。视图解析器根据视图名查找并返回实际的视图对象。
7. **视图渲染：** 一旦确定了具体的视图对象，DispatcherServlet将模型数据传递给视图，并要求视图进行渲染。视图使用模型数据生成HTML、JSON等响应内容，并将其返回给客户端。
8. **响应返回客户端：** 最终，DispatcherServlet将生成的响应返回给客户端，客户端（浏览器）根据响应内容进行显示或其他操作。

这个流程说明了Spring MVC是一个基于MVC设计模式的框架，它通过DispatcherServlet负责请求的转发和处理器的调度，使得应用程序的各个组件（模型、视图和控制器）之间实现了解耦，提高了代码的可维护性和可扩展性。
### 1.3.Spring官网创建SpringBoot项目
如下图所示，我们在Idea中创建SpringBoot项目时需要选择提供服务的网址(默认为[https://start.spring.io/](https://start.spring.io/))，但是有时候因为网络原因创建不成功，那么此时就需要去spring官网创建SpringBoot项目
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d373bb0f6a8098aca9a50a1b37e07b78.png)
#### (1).Spring官网
打开Spring官网 [https://spring.io/](https://spring.io/)，点击project，选择SpringBoot，进入SpringBoot项目创建页面
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8a490c2261efde6be3f9ac035febbb40.png)
#### (2).填写项目信息并选择所需的服务，创建SpringBoot项目
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0f55a935d817090b9206a0d3c607b865.png)
#### (3).点击GENERATE，下载项目，解压后使用Idea打开
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/95b4eb15269a2485d888c6343984a698.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/53db0f718d7a7daa8cf490404a995203.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4f4f1f958c25e909095c0b09e08c9cee.png)
至此，Spring官网创建SpringBoot项目完成
#### (4).阿里云镜像Spring服务
将[https://start.spring.io](https://start.spring.io)替换为[https://start.aliyun.com](https://start.aliyun.com)
## 2.SpringBoot简化开发解析

- Spring程序的缺点

依赖设置繁琐
配置繁琐

- SpringBoot程序的优点

简化依赖配置
简化常用工程相关配置(如配置Bean，扫描路径，第三方攻击配置等)
辅助功能(内置web服务器等)
以上SpringBoot程序的优点通过以下四项技术来进行实现：

1. parent
2. starter
3. 引导类
4. 内嵌tomcat
### 2.1.parent依赖管理以及版本管理
1.
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5072984b295d75c2372793835c974a14.png)
2.![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/80f1c87f903942444a3c011fe7a893ab.png)
3.
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/3d93acbdeef2d4b74071515910924a37.png)
4.![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0cc61f0c4406987a15144a1c46783a76.png)
SpringBoot2.X版本通过spring-boot-starter-parent以及spring-boot-dependencies两个POM文件来实现常用技术的版本管理，开发者无需关心相关功能的版本冲突问题；
#### (1).spring-boot-starter-parent.pom文件的版本管理示例
在我们的项目的POM文件中加入servlet依赖，不指定依赖版本，但是在项目的Maven管理中可以看到依赖的资源中有servlet的版本信息，这就是parent.pom文件已经做好了SpringBoot2.5.5相关依赖的版本管理(经过测试与SpringBoot2.5.5相适配的servlet版本，4.0.1是最好的选型)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/dd279f87dac545ef2f0f42099fa2a837.png)
#### (2).spring-boot-starter-parent与spring-boot-dependencies依赖管理与版本管理解析
依次点击进入spring-boot-starter-parent与spring-boot-dependencies，可以看到spring-boot-dependencies.pom在<properties>标签定义了若干个版本信息，在<dependencyManagement>标签定义了坐标依赖管理并且引用了上述的版本，所以我们在项目中的只需引入相关依赖，无需定义版本号即可使用。
spring-boot-starter-parent.pom:
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/37222a5d0a724653cb840793d3302a84.png)
spring-boot-dependencies.pom:
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4de69dd7efe5235df43a7198b5cca20c.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/300f35d6393302a2436999a03282d2a7.png)
#### (3).不同版本SpringBoot的版本管理对比
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0ec68ecacec80387686c6c0aa30a7f29.png)
小结：
1.开发SpringBoot程序，在pom文件中需要继承spring-boot-starter-parent
2.继承parent模块可以避免多个依赖依赖了同一种技术出现的依赖版本冲突的问题
### 2.2.Starter与依赖传递
#### (1).Starter依赖传递简析
Starter是什么：
Starters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包(依赖传递)，可以一站式集成Spring及其他技术，而不需要到处找示例代码和依赖包。例如，如你想开发web应用，只要加入spring-boot-starter-web启动器依赖就能使用了。
以spring-boot-starter-web依赖为例：
点击进入spring-boot-starter-web依赖，可以看到spring-boot-starter-web已经引入了web开发中常用的一些依赖如：spring-webmvc，spring-web，spring-boot-starter-tomcat等，而这些依赖中又引入了一些其他的依赖，这些引入的依赖就从内层传递到外层依赖中，我们开发中只要引入了spring-boot-starter-web依赖，那么这些被集成的依赖我们项目中都能直接使用。
SpringBoot之所以好用，就是因为已经集成了大量的starter供我们使用，我们只需要关心于业务开发，无需花精力配置我们要用到的各种依赖，一个starter足以解决一类问题。
![Starter依赖传递.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/44596c9b8726fda6e32d972677919ebe.png)
#### (2).starter与parent区别

- starter是SpringBoot中常见的各种启动器，定义了当前技术中使用的所有依赖坐标，以达到减少依赖配置的目的；
- 所有SpringBoot项目都需要继承，它其中定义了若干个常用依赖坐标的版本号(依赖管理，并非依赖)，以达到减少依赖冲突，方便版本选型的目的;

扩展：实际开发中仅需要书写GAV中的G和A无需写V，除非该版本的parent中没有定义引入依赖的版本号。例如：alibaba的druid，需要写version(需要注意版本冲突)。

![pom文件的GAV选择.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/759d9bea6e1da3e365e102b5f6a427ca.png)
### 2.3.引导类
以上介绍的parent以starter都是帮我们减少项目的配置工作，说完配置，接下来讲SpringBoot是如何工作的。通过SpringBoot入门案例的介绍，我们知道SpringBoot程序的入口就是SpringBoot工程创建时自带的那个main方法类了，运行这个类就可以启动SpringBoot工程的运行。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/20e827466b987377b1574db7709872cd.png)
#### (1).引导类创建容器
如图所示这个类的内容很简单，就是一个类调用了一个方法，那么这个类是什么类，这个方法又是干了什么呢？
先来思考一个简单的事情，SpringBoot的作用是简化Spring的开发，那么也就是说它的本质还是一个Spring，既然是Spring，那么它必然有一个管理Bean的容器，那么这个类的第一个作用就出来了-初始化容器。
首先我们获取SpringApplication.run()方法的返回值，获取的就是Spring的容器对象ApplicationContext，所以SpringBoot启动类的第一个作用就是加载了Spring容器
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d3715ff3ab5c6b194705f7fd0f0a5680.png)
点到ConfigurableApplicationContext接口中我们可以看到该类继承了ApplicationContext类：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/45a653ee468fe32f73c95ff6d3edd0fd.png)
通过getBean方法我们可以获取已经注册的Bean，输出后可以看到
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ee59e145023ec1027109b21e74e295b5.png)
#### (2).引导类扫描包并注册Bean
我们学习SSM框架的时候，除了初始化容器，还得在配置文件里写一个东西叫做包扫描器，但是使用SpringBoot的时候并没有进行这样的一个操作，那么我们注册Bean是不是没法做了呢？很显然并不是，我们在上述的演示中其实已经注册了一个DemoController的Bean，那么他是怎么注册的呢?其实扫描的操作是通过@SpringBootApplication注解实现的。
点进@SpringBootApplication注解可以看到一个@ComponentScan注解，该注解就是帮助实现包扫描的
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9b5cbea2c384276d729026f88c7160e9.png)
扫描的就是引导类所在的包以及它下面的子包，如果遇到对应的注解，那么就将其注册到容器中，我们就可以获取到。
例如我们新建一个工具类DemoComponent，我们在SpingBoot启动类中获取该Bean，可以看到成功从容器中获取到了Bean
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/53f109c28ed9cf39c6a785820597a5e4.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/340d7c04216b06320143ff47b01b4402.png)
如果将该类放到SpringBoot启动类的包外可以看到报错，并提示找不到对应的Bean
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cfcfb020335d2bbdd54dfd12a21b646d.png)
#### 总结
引导类的两个作用：
1.SpringBoot工程通过引导类来启动并创建一个Spring容器；
2.扫描引导类所在的包以及它的子包，将带有注解类注册进容器；
### 2.4.内嵌Tomcat服务器
通过引导类的main方法将SpringBoot项目运行了起来。但是运行java程序不应该是执行完就结束了吗？但是我们现在明显是启动了一个web服务器，不然网页怎么能正常访问呢？这个服务器是在哪里写的呢？
#### (1).tomcat依赖引入
在我们介绍starter的依赖传递时候点开了spring-boot-starter-web，里面就引入了tomcat依赖，现在我们再来回顾一下。![Starter依赖传递.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d34b732b6f99b49f856c463e84b1466f.png)
点进spring-boot-starter-tomcat依赖，这里面有一个核心的坐标，tomcat-embed-core，叫做tomcat内嵌核心。就是这个东西把tomcat功能引入到了我们的程序中。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/215a4de5314f7cc3be049bb32ea57bba.png)
#### (2).tomcat运行原理
现在我们相当于把服务器web服务器放到了一个程序中，但是按照常理来讲不是应该把程序放到服务器中运行吗？这么做的原因是：Tomcat服务器是java语言开发的，既然是使用java语言开发的，运行的时候肯定符合java程序运行的原理，java运行的核心是对象，既然是对象，我们就可以把它交给Spring进行管理。tomcat服务器运行其实是以对象的形式在Spring容器中运行的，所以我们没有安装tomcat，而且还能使用它。
#### (3).web服务器更换
那既然是web服务器个对象，如果把这个对象从Spring容器中去掉是不是就没有web服务器的功能呢？当然可以，通过依赖排除可以去掉这个web服务器功能。根据SpringBoot的工作机制，用什么技术，加入什么依赖就行了。例如排除tomcat服务器后可以使用SpringBoot提供的内置服务器jetty。
通过<exclusions>标签我们可以排除掉tomcat依赖，排除后运行SpringBoot项目，可以看到不显示加载tomcat服务器的信息了，程序运行完后就立刻停止了，并且右侧的Maven依赖管理中也没有tomcat依赖了。
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jetty</artifactId>
        </dependency>
```
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d73373de0a1c8c79d20b3ff1842cf24b.png)
通过增加jetty服务器的依赖，再次运行程序，可以看到加载出了jetty服务器的信息，并且通过网址可以正常访问
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/175d080d5a7566b5585babbadc9c2cd6.png)
## 3.SpringBoot基础配置
### 3.1.application.properties文件配置属性
#### （1).properties文件语法格式
目前我们的服务器端口是8080(默认)，如果我们想修改端口号该如何配置呢？SpringBoot通过application.properties文件配置或者修改项目的一些属性，例如我们把服务器的端口号修改为8081可以在application.properties文件中这样做：
打开resource目录下的application.properties文件添加服务器端口配置server.port=8081
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4270b51db0da0640c377f67bf476ce6e.png)
启动后的项目日志中，端口已变为8081：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4d1a72a0ad854a6755b72d02a06c4351.png)

Properties 文件使用简单的键值对（key=value）格式。以下是 Properties 文件的基本语法规则：
**1.键值对：** Properties 文件由一系列键值对组成，键和值之间使用等号（=）或者冒号（:）进行分隔。例如：
```properties
key1=value1
key2: value2
```
**2.注释：** 可以在 Properties 文件中添加注释，注释以井号（#）或者分号（;）开头。例如：
```properties
# This is a comment
key=value

; Another comment
anotherKey=anotherValue
```
**3.空行和换行：** Properties 文件可以包含空行，空行会被忽略。键值对之间可以换行书写，换行不影响属性的解析。
```properties
key1=value1

key2=value2
```
**4.转义特殊字符：** 如果键值中包含等号、冒号、井号等特殊字符，可以使用反斜杠（\）进行转义。
```properties
special\=key=value
special\:key=value
special\#key=value
```
**5.续行符：** 如果一行的属性值太长，可以使用反斜杠（\）作为续行符，将属性值拆分到多行。
```properties
longKey=This is a very long \
value that continues on \
multiple lines.
```
以下是一些常用的属性配置：
```xml
# 数据库配置
spring.datasource.url=jdbc:mysql://localhost:3306/mydatabase
spring.datasource.username=root
spring.datasource.password=secret

# 服务器端口配置
server.port=8081

# 日志级别配置
logging.level.org.springframework=INFO

#banner打印
spring.main.banner-mode=off

#banner样式
spring.banner.image.location=banner.txt

```
banner修改：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fa8fb073e2bfe3c27f8b8c06439c1185.png)
Banner在线生成工具：[https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)
#### （2).properties 的优缺点：
优点：

1. **简单直观：** Properties 文件使用简单的键值对，没有复杂的语法，容易理解和书写。
2. **普及度高：** Properties 文件是 Java 标准库的一部分，几乎所有的 Java 应用都可以方便地使用 Properties 文件进行配置。
3. **不敏感：** Properties 文件对于缩进不敏感，键值对之间使用等号或者冒号分隔，不需要关心缩进问题。

缺点：

1. **不支持复杂结构：** Properties 文件只支持简单的键值对，不支持嵌套结构，因此在表示复杂数据时不如 YAML 灵活。
2. **可读性相对较差：** 在 Properties 文件中，当配置项较多时，文件可能会显得比较杂乱，不如 YAML 文件那样清晰。

综上所述，选择使用 YAML 还是 Properties 取决于你的具体需求。如果你的配置比较简单，Properties 文件可能更适合；如果你的配置比较复杂，特别是涉及到嵌套结构，那么 YAML 文件可能更合适。
### 3.2.application.yml/application.yaml文件配置属性
#### （1).ymal 文件语法格式：
SpringBoot除了.properties配置文件格式外，还支持.yma和.yaml配置文件格式。
YAML（YAML Ain't Markup Language）是一数据序列化格式，常用于配置文件和数据交换。以下是 YAML 的一些基本语法规则：
**1.缩进：**YAML 使用缩进表示层次关系，通常使用空格键（Space）或制表符（Tab）进行缩进。同一层级的元素必须具有相同的缩进级别。
```yaml
parent:
  child1:
    key1: value1
  child2:
    key2: value2
```
**2.键值对：**YAML 使用冒号（:）表示键值对，键值对之间用空格隔开。
```yaml
key: value
```
**3.列表：**YAML 使用连字符（-）表示列表项，可以表示一个包含多个元素的列表。
```yaml
fruits:
  - apple
  - orange
  - banana

fruits2: [apple,orange,banana]
```
**4.嵌套结构：**YAML 支持嵌套结构，可以嵌套包含键值对或者列表。
```yaml
person:
  name: John Doe
  age: 30
  address:
    city: New York
    zip: 10001
```
**5.引号：**可以使用单引号（'）或双引号（"）来表示字符串，尤其是字符串中包含特殊字符时。
```yaml
single_quoted: 'This is a single-quoted string'
double_quoted: "This is a double-quoted string with escape sequences: \n\t"
```
以下是一些常用的属性配置：
```yaml
#配置服务端口
server:
  port: 8082

# 数据库配置
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydatabase
    username: root
    password: secret

# 服务器端口配置
server:
  port: 8080

# 日志级别配置
logging:
  level:
    org.springframework: INFO

```
#### （2).ymal 的优缺点：
优点：

1. **可读性强：** YAML 使用缩进和换行来表示层次结构，使得文件更易读，尤其对于复杂的配置文件来说，YAML文件的结构更加清晰。
2. **易于写：** YAML 的语法相对简洁，不需要像 Properties 文件一样使用大量的键值对。这使得写 YAML 文件相对来说更加快速和便捷。
3. **支持复杂结构：** YAML 支持复杂的数据结构，包括列表、嵌套对象等。这意味着你可以更灵活地表示数据，特别适用于配置复杂对象的属性。
4. **注释支持：** YAML 支持注释，可以在配置文件中添加注释，提供对配置项的解释说明。

缺点：

1. **语法敏感：** YAML 的语法对于缩进非常敏感，不正确的缩进可能导致解析错误。这可能会导致一些困扰，特别是对于不熟悉 YAML 语法的人。
2. **不适用于所有场景：** 尽管 YAML 对于配置文件非常合适，但是在一些简单的配置场景下，Properties 文件可能更为直观和易用。

tips：当一个项目的根目录中.properties、.yma和.yaml三个文件都存在，那么这三个配置文件遵循："相同的覆盖，不同的叠加" 原则，覆盖的加载顺序为：.properties>.yma>.yaml
### 3.3.SpringBoot默认配置与官方配置文档
SpringBoot项目包含了许多默认的配置，要了解我们的项目中包含了那些默认配置，需要去Spring官网进行查阅。
进入Spring官网，projects选择SpringBoot，点击"LEARN"进入如下页面，点击"Reference Doc"选择[Application Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties)即可进入.properties官方配置文档
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/de77bf046be4fc9084da6c7fcef359cd.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/df382401a7b4552de1275e04ddf6d10b.png)
文档中有多配置项，包括配置项名、配置的描述以及默认值，以后我们自己的项目中需要引入或者修改配置，可以根据官方文档进行查阅。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/256e4a986f907f63570d1081c623d98a.png)
需要注意的是，可引入的配置是与项目所引入的依赖息息相关的，如果项目中没有使用到某种技术(依赖)，那么我们也无法在.propertise文件中配置相关的属性，以上的例子中之所以能配置服务器端口、banner、log是因为在我们的项目中引入了web服务的依赖，其中又引入了spring-boot-starter依赖(依赖传递)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/41fb7c525d65c8f6d29492593eebfdaf.png)
### 3.4.属性注入
#### （1).@Value注入属性
在Spring Boot中，可以使用@Value注解将application.properties或application.yml文件中的属性值直接注入到Java类的字段、方法参数、构造函数参数等中，以下为@Value的用法示例：
```yaml
name: "xiaoheizi"
age: 18
country: "zhongguo"
city: "xiangyang"

likes: ["sing","dance","rap","basketball"]

custom.property1: value1
custom.property2: 42
```
1.注入属性到字段
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyComponent {

    @Value("${custom.property1}")
    public String property1;

    @Value("${custom.property2}")
    public int property2;

    // 可以在这里使用property1和property2的值
}
```
2.注入属性到方法参数
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MyService {

    public final String property1;

    @Autowired
    public MyService(@Value("${custom.property1}") String property1) {
        this.property1 = property1;
    }

    // 在这里使用property1的值
}
```
3.注入属性到方法
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MyService2 {

    @Value("${custom.property2}")
    public String property2;

    public int setProperty1Value(@Value("${custom.property2}") String property2) {
        // 在这里使用property1的值
        int result = property2;
        return result;
    }
}

```
结果演示：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/3daeb45accecd342760dee9df4f60050.png)
注意：在使用@Value注解时，确保被注入的属性在application.properties或application.yml文件中有对应的配置。如果没有找到对应的配置，SpringBoot应用启动时可能会抛出异常。
#### （2).@ConfigurationProperties注入属性
在 SpringBoot 中，当想需要获取到配置文件数据时，除了可以用 Spring 自带的 @Value 注解外，SpringBoot 还提供了一种更加方便的方式：@ConfigurationProperties。只要在 Bean 上添加上了这个注解，指定好配置文件的前缀，那么对应的配置文件数据就会自动填充到 Bean 中，以下为@ConfigurationProperties的用法示例：
1.创建配置类
```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "custom")
public class MyComponent2 {

    private String property1;
    private int property2;

    public String getProperty1() {
        return property1;
    }

    public int getProperty2() {
        return property2;
    }

    public void setProperty1(String property1) {
        this.property1 = property1;
    }

    public void setProperty2(int property2) {
        this.property2 = property2;
    }
}

```
2.在其他组件或服务中注入MyComponent2并使用其中的属性值：
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyService3 {

    @Autowired
    private final MyComponent2 myComponent2;

    public MyService3(MyComponent2 myComponent2) {
        this.myComponent2 = myComponent2;
    }

    public void doSomething() {
        String property1 = myComponent2.getProperty1();
        int property2 = myComponent2.getProperty2();
        System.out.println("myComponent2.property1 = " + property1);
        System.out.println("myComponent2.property2 = " + property2);
        // 使用属性值进行操作
    }
}
```
在上述示例中，MyComponent2中的property1和property2属性的值会根据application.yml中的配置进行注入。这样，就可以在应用程序中方便地使用配置的属性值。要确保MyComponent2类中有对应属性的getter和setter方法，以便SpringBoot能够正确地注入属性值。
#### （3).Environment注入属性
在Spring中，你可以使用Environment对象来获取应用程序中配置的属性值。Environment接口提供了许多方法，用于获取属性、配置文件中的属性、系统属性等。你可以通过注入Environment对象来访问这些属性。
示例：
```java
@RestController
@RequestMapping("/demo")
public class DemoController {

    @Value("${likes[1]}")
    private String dance;
    
    @Autowired
    private Environment env;

    @GetMapping("/test")
    public String thisDemo() {
        
        System.out.println("dance ====> " + dance);
        System.out.println(env.getProperty("likes[0]"));
        return "spring boot is running";
    }
}
```
Environment接口提供了几种方法来获取属性值。例如，getProperty(String key)方法可以用来获取指定键名的属性值。你还可以使用getProperty(String key, String defaultValue)方法来提供默认值，如果属性不存在则返回默认值。
#### （4).**@PropertySource**与自定义配置文件
@PropertySource是一个Spring Framework的注解，它用于指定外部属性源文件，允许将外部属性加载到Spring的环境中。当你需要在Spring应用程序中使用自定义的属性文件而不是默认的application.properties或application.yml时，你可以使用@PropertySource注解。
以下是使用@PropertySource注解的基本步骤：
1.创建一个配置文件（例如 custom.properties）：
在项目的src/main/resources目录下创建一个自定义的属性文件，比如 person.properties，并在其中定义属性：
```properties
person.id=2.5
person.name=caixukun
person.age=18
person.manager=true
person.list=[basketball,dance,rap,sing]
```
2.创建PersonComponent类，使用**@PropertySource**注解并注入属性：
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import java.util.List;


@Component
@PropertySource(value = "classpath:person.properties",encoding = "UTF-8")    //读取指定路径配置文件
public class PersonComponent {

    @Value("${person.id}")
    private String id;

    @Value("${person.name}")
    private String name;

    @Value("${person.age}")
    private int age;

    @Value("${person.manager}")
    private boolean isManager;

    @Value("${person.list}")
    private List<String> list;

}
```
3.结果示例：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d8a0decf463f6d1032b4a6f8abf6e5fd.png)
#### （5).**@Profile**注解进行多环境配置
在项目开发中，包括多种环境，例如线上环境prod(product)、开发环境dev(development)、测试环境test、提测环境qa、单元测试unitest等等。不同的环境需要进行不同的配置，从而在不同的场景中跑我们的程序。例如prod环境和dev环境通常需要连接不同的数据库、需要配置不同的日志输出配置。还有一些类和方法，在不同的环境下有不同的实现方式，使用注解@Profile可以实现多环境配置。
Spring框架中的@Profile注解允许你为不同的环境配置不同的bean。通过使用@Profile注解，你可以根据特定的环境激活或者禁用特定的bean定义。
@Profile使用方法：
在这个例子中，DevelopmentConfig和ProductionConfig分别针对开发环境和生产环境进行了配置。
```java
//在不同的配置类上使用@Profile注解：
@Configuration
@Profile("development")
public class DevelopmentConfig {
    // 开发环境下的配置
}

@Configuration
@Profile("production")
public class ProductionConfig {
    // 生产环境下的配置
}
```
在这个例子中，DevelopmentBean将在开发环境中被注册为一个Spring组件，而ProductionBean将在生产环境中被注册为一个Spring组件。
```java
//在需要根据profile选择的bean上使用@Profile注解：
@Component
@Profile("development")
public class DevelopmentBean {
    // 开发环境下所需的bean
}

@Component
@Profile("production")
public class ProductionBean {
    // 生产环境下所需的bean
}
```
在application.properties或application.yml文件中，通过spring.profiles.active属性来指定激活的profile。例如：
```properties
spring.profiles.active=development
```
注意：通过这种方式，你可以根据不同的环境激活或禁用特定的bean，从而实现多环境配置。确保spring.profiles.active属性的值与@Profile注解中的profile名称一致，以便正确激活所需的配置。
#### （6).**Profile**多环境配置文件
SpringBoot 对多环境配置提供了支持，一方面是使用注解@Profile，除了@Profile注解可以标明某些方法和类具体在哪个环境下注入，SpringBoot的环境隔离还可以使用多资源文件的方式，进行一些参数的配置。
以下将演示如何使用多资源文件的方式进行多环境配置：
Springboot的资源配置文件除了application.properties之外，还可以有对应的资源文件application-{profile}.properties。例如，一个应用的工作环境有：dev、test、prod，所以我们新建4个配置文件：

- applcation.properties - 公共配置
- application-dev.properties - 开发环境配置
- application-test.properties - 测试环境配置
- application-prod.properties - 生产环境配置

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/88a683d3b1514a403d870e1c09e3567d.png)
在controller层中的Sound.java中新建一个接口，返回配置文件中的信息：name和local。
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sound")
public class Sound {

    @Value("${com.name}")
    private String name;

    @Value("${com.location}")
    private String location;

    @GetMapping("/hello")
    public String sound1(){
        System.out.println(name + "hello Spring Boot, " +location);
        return name + "，hello Spring Boot！ " +location;
    }
}
```
application.properties文件内容如下：(不同的properties配置文件也可以是在 applcation.properties 文件中来激活)
```properties
#服务器端口配置
spring.profiles.active=prod
```
application-dev.properties文件内容如下：
```properties
# 服务端口
server.port=1111

#可以定义一些自己使用的属性，然后通过@Value("${属性名}}")注解来加载对应的配置属性
com.name=DEV
com.location=Hunan
```
application-prod.properties文件内容如下：
```properties
# 服务端口
server.port=2222

#可以定义一些自己使用的属性，然后通过@Value("${属性名}}")注解来加载对应的配置属性
com.name=Prod
com.location=Hubei
```
启动Springboot后，访问[http://localhost:2222/sound/hello](http://localhost:2222/sound/hello)，则会有如下结果。如果此时访问[http://localhost:1111/sound/hello](http://localhost:11111/sound/hello)则会无法访问，因为此时spring.profiles.active=prod激活的是prod环境，使用的是application-prod.properties中的配置。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/105a7ae8216be511433adcf655860f4f.png)
更改application-dev.properties文件，spring.profiles.active=dev激活dev环境。重启Springboot则可以访问[http://localhost:1111/sound/hello](http://localhost:11111/sound/hello)。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2505d2b47f55f467f1ccebd8824777b1.png)
#### （7).SpringBoot整合JUnit
在 SpringBoot 中，JUnit是一个常用的单元测试框架，它可以帮助你测试应用程序的各个部分，包括服务层、控制器、数据访问层等。SpringBoot 提供了一些便利的功能，使得在测试中使用 JUnit 更加容易。以下是在 Spring Boot 中使用 JUnit 进行单元测试的一般步骤：
1.在pom文件中添加测试依赖：
```xml

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.junit.platform</groupId>
			<artifactId>junit-platform-launcher</artifactId>
			<scope>test</scope>
		</dependency>
```
这个依赖包含了 SpringBoot 测试框架以及JUnit，要注意的是，在我们创建SpringBoot项目的时候，SpringBoot默认已经帮助我们添加了spring-boot-starter-test依赖 (如果不加junit依赖运行测试类时可能会卡在Resolving Maven dependencies运行界面)。
2.编写测试方法：
```java
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    public String test(){
        return "hello SpringBoot test!";
    }

}
//以Controller层的方法为例
```
3.运行测试方法：
```java
import com.xyzy.controller.TestController;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import javax.annotation.Resource;

@SpringBootTest
class SpringBoot04JunitApplicationTests {

	@Resource
	private TestController testController;

	@Test
	void contextLoads() {
		String test = testController.test();
		System.out.println(test);
	}

}
//@SpringBootTest(classes = SpringBoot04JunitApplicationTests.class)
```
该测试类与测试方法均为创建SpringBoot项目时自动创建。如果需要自己创建测试类，需要在自定义的测试类加上@SpringBootTest注解，@SpringBootTest 注解用于指示这是一个 SpringBoot测试，并且会自动加载应用程序的上下文(获取Spring容器，以注入Bean，要注意测试类需要位于引导类所在的包及其子包，否则@SpringBootTest注解的的classes属性要显式的加上引导类,否则识别不到引导类)，测试方法上需要加上@Test注解。
4.运行结果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2e23912c85f792256ab0dab20c1890c6.png)

## 4.数据库访问
在 SpringBoot 中，可以使用 Spring Data JPA、Spring JDBC、MyBatis 、MyBatis-plus等多种方式访问数据库，本章将使用SpringBoot整合MyBatis和MyBatis-plus框架来进行持久层数据库的访问。
### 4.1.SpringBoot整合Mybatis
MyBatis 是一个开源的持久层框架，它是一个优秀的基于 Java 的持久层框架。MyBatis 通过 XML 文件或注解的方式将对象与 SQL 语句映射起来，从而避免了传统 JDBC 编程中手工设置参数以及获取结果集的麻烦，使得数据库操作更加方便、快捷、安全。这一节我们将使用SpringBoot来整合并使用Mybatis。
#### （1).配置数据源
首先我们先新建一个全新的模块，在依赖添加中勾选SQL下的Mybatis Framework和MySQL Driver依赖，点击Finish，这样我们就创建了一个包含Mybatis依赖的新项目。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/585bab348934af31fbc1f2912274c567.png)
如果新建项目时不勾选以上依赖，我们也可以在pom文件中手动添加Mybatis Framework和MySQL Driver的依赖坐标：
```xml
      <!-- MyBatis 依赖 -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.3.1</version>
        </dependency>
      <!-- 数据库驱动依赖，根据你使用的数据库选择对应的依赖，比如MySQL的驱动 -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.0.31</version>
            <scope>compile</scope>
        </dependency>
```
在application.yml中配置数据库连接相关信息：
```yaml
#SpringBoot_DB为连接的数据库名
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    url: jdbc:mysql://localhost:3306/SpringBoot_DB
    password: 123456
```
#### （2).创建持久层接口和实体类
在数据库中我们创建一个book表，用于存储书本相关信息：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/1346668c525cbffe285058f468313524.png)
创建一个对应book表的实体类Book：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b564d11c9ce7a8bc46ccade4629e7580.png)
```java
package com.xyzy.entity;
import lombok.Data;

@Data
public class Book {
    private int id;
    private String type;
    private String name;
    private String description;
}
```
创建持久层BookMapper接口，定义操作数据库表的方法：(此处我们用注解的形式实现数据库的查询和插入操作)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/318259b13879a314d20dc33ff1d701e9.png)
```java
import com.xyzy.entity.Book;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface BookDao {

    @Select("select * from book where id = #{id}")
    public Book getById(Integer id);

    @Insert("insert into book values(#{id},#{type},#{name},#{description})")
    public void InsertBook(Book book);

}
```
在SpringBootTests类中进行功能验证：(以查询和插入数据为例)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fec41963b5675464593e1297624ace09.png)
运行结果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/699ba0046b7d9cd8b1a45189e569725a.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/875707ac836516280036674e2b664ba8.png)
以上就是一个简单的 SpringBoot 整合 MyBatis 的示例，至此我们通过SpringBoot整合Mybatis并实现数据库访问的功能已经完成。
#### （3).Mybatis以xml映射文件的方式进行数据库访问
在第二小节，我们是以注解的方式实现数据库的查询和插入操作的，使用注解的方式直观、快捷，但是对于复杂SQL的使用，注解的方式不太适合，这一小节我们将介绍Mybatis以xml映射文件的方式进行数据库访问。
在resource目录下新建一个mapper文件夹，在mapper中创建xxMapper.xml对应mapper下的持久层接口：(此处以students表为例)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/84b96321a484f789b8769dd6521b9ccd.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fd425c693d2e537c562c23401a810a38.png)
yml配置：
```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    url: jdbc:mysql://localhost:3306/SpringBoot_DB
    password: 123456

mybatis:
  mapper-locations: classpath:/mapper/*.xml #配置xml文件的读取位置
```
新建的xml映射文件为空，我们需要在初始映射文件中添加如下内容：
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.xyzy.mapper.StudentDao">

</mapper>
```
以上是初始的xml文件， namespace: 指向相关的dao类(即每个Mapper.xml对应待实现方法的持久层接口)。必须是完整的路径，底层会自动映射到指定的实现类。
mapper标签内容：
```xml
    <resultMap id="StudentMap" type="com.xyzy.entity.Students">
        <result column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="std_no" property="stdNo"/>
        <result column="gender" property="gender"/>
        <result column="age" property="age"/>
    </resultMap>
```
| **属性** | **含义** |
| --- | --- |
| 作用 | 返回的结果集为一个map，key为表字段映射实体类的属性，value对应数据库响应的值 |
| id | 当前实体类映射的唯一的命名 |
| type | 全限定类名，或系统别名，必须是完正的实体类路径 |

result标签内容：

| **属性** | **含义** |
| --- | --- |
| column | 数据库表中的字段名 |
| property | 映射到实体类对应的属性名 |
| jdbcType | 数据库表字段类型（可省略不写） |

查询标签select：
```xml
    <select id="getStudentById" resultMap="StudentMap">
        select * from students where id = #{id}
    </select>
```
插入标签insert：
```xml
    <insert id="insertStudent" >
        insert into Students values (#{id},#{name},#{stdNo},#{gender},#{age})
    </insert>
```
同样我们在测试类中进行测试，结果如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/626295f047024773bab45bdcf053cbb2.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d4ffbc78b1d3964880c79d4ee91a3e39.png)
扩展：除了基础的增删改查语句外，Mapper.xml中还可以使用动态SQL：
**1.if元素：** 使用**<if>**元素可以根据条件包含或排除SQL片段。
```xml
<select id="getUsers" parameterType="map" resultType="User">
    SELECT * FROM users
    WHERE 1=1
    <if test="username != null">
        AND username = #{username}
    </if>
    <if test="age != null">
        AND age = #{age}
    </if>
</select>
```
在这个例子中，**<if>**元素根据**username**和**age**是否为null来动态添加了条件。
**2.choose、when、otherwise元素：** 使用**<choose>**、**<when>**和**<otherwise>**元素可以实现类似于Java中的**switch**语句的功能。
```xml
<select id="getUsers" parameterType="map" resultType="User">
    SELECT * FROM users
    <where>
        <choose>
            <when test="condition == 'A'">
                AND status = 'ACTIVE'
            </when>
            <when test="condition == 'I'">
                AND status = 'INACTIVE'
            </when>
            <otherwise>
                AND status IS NOT NULL
            </otherwise>
        </choose>
    </where>
</select>
```
这个例子中，根据**condition**的不同值，选择不同的条件进行查询。
**3.foreach元素：** 使用**<foreach>**元素可以遍历集合，生成对应的SQL片段。
```xml
<select id="getUsersByIdList" parameterType = "list" resultType="User">
    SELECT * FROM users
    WHERE id IN
    <foreach collection="idList" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>
```
```java
//实体类
public class User {
    private Long id;
    private String username;
    private String email;

    // 构造器、getter 和 setter 方法省略
}
//Mapper接口
public interface UserMapper {
    void batchInsertUsers(@Param("users") List<User> users);
}
```
```xml
<insert id="batchInsertUsers" useGeneratedKeys="true" keyProperty="users.id" parameterType="java.util.List">
    INSERT INTO users (username, email)
    VALUES
    <foreach collection="users" item="user" separator=",">
        (#{user.username}, #{user.email})
    </foreach>
    RETURNING id
</insert>
```
**collection**: 指定要迭代的集合的名称或表达式。这可以是一个List、数组或者其他可迭代对象。
**item**: 指定在每次迭代中将集合中的元素赋值给的变量名。在SQL语句中，可以使用这个变量引用集合中的当前元素。
这个例子中，根据传入的**idList**动态生成了IN语句的条件。
4.set元素：<trim>元素用于修剪生成的SQL语句，而<set>元素用于动态更新语句中的SET子句。
```xml
<update id="updateUser" parameterType="User">
    UPDATE users
    <set>
        <if test="username != null">username = #{username},</if>
        <if test="password != null">password = #{password},</if>
        <if test="email != null">email = #{email},</if>
    </set>
    WHERE id = #{id}
</update>
```
这个例子中，根据**User**对象的属性是否为null，动态生成了SET子句。
### 4.2.SpringBoot整合Mybatis-Plus
MyBatis-Plus（简称 MP）是 MyBatis 的增强工具库，是一个开源的、性能优越的持久层框架，它扩展和增强了 MyBatis 的功能，提供了大量实用的特性和工具，可以极大地简化 MyBatis 的开发流程，提高开发效率。以下是 MyBatis-Plus 的一些主要特点和功能：
1.简化CRUD操作

- 通用 Mapper： MyBatis-Plus 提供了通用的 Mapper 接口，可以自动生成常见的增删改查 SQL，无需手动编写 XML 文件或者 Mapper 接口的方法。
```java
public interface UserMapper extends BaseMapper<User> {
}
```

- 条件构造器： MyBatis-Plus 提供了方便的 QueryWrapper 和 UpdateWrapper，可以灵活构造查询和更新条件，支持链式调用。
```java
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper.eq("age", 25).like("name", "John");
List<User> users = userMapper.selectList(wrapper);
```
2.分页查询

- 内置分页插件： MyBatis-Plus 集成了分页插件，支持多种数据库，可以方便地进行分页查询，提供了简单的分页 API。
```java
Page<User> page = new Page<>(1, 10);
IPage<User> userPage = userMapper.selectPage(page, new QueryWrapper<>());
```
3.代码生成器
MyBatis-Plus Generator： MyBatis-Plus 提供了代码生成器，可以根据数据库表自动生成 Entity、Mapper、Service、Controller 等代码，减少了手动编写重复代码的工作量。
4.性能优化
性能优化： MyBatis-Plus 对常用的 SQL 语句进行了性能优化，提供了多种方式来避免 N+1 查询问题，减少数据库访问次数，提高查询性能。
5.其他特性

- **注解支持：** MyBatis-Plus 提供了丰富的注解支持，可以通过注解方式配置主键生成策略、逻辑删除字段等信息。
- **乐观锁支持：** MyBatis-Plus 支持乐观锁功能，通过 @Version 注解标识乐观锁字段，自动处理并发冲突。
- **多租户支持：** MyBatis-Plus 支持多租户应用场景，可以方便地实现基于租户的数据隔离。

总的来说，MyBatis-Plus 提供了丰富的功能和工具，使得开发者能够更加便捷地进行数据库操作，减少了很多传统 MyBatis 开发中的样板代码，提高了开发效率和代码质量。 MyBatis-Plus 的官方文档中包含了更详细的信息和示例，可以作为学习和使用的参考[https://baomidou.com/](https://baomidou.com/)。
MyBatis-Plus与MyBatis的区别：

- 导入的依赖坐标不同
- 持久层实现开发简化

以下我们来实现SpringBoot整合MyBatis-Plus：
#### （1).新建项目导入MyBatis-Plus坐标和配置数据源
同样地我们首先新建一个模块，填好项目信息后进入依赖选择界面，进入依赖选择界面点击	SQL，此时我们发现SQL下没有MyBatis-Plus依赖可选(Spring官方暂时还未收录MyBatis-Plus坐标)，那么此时我们就需要手动在pom文件中导入MyBatis-Plus坐标。
选择SQL下的依赖时我们只选择MySQL驱动：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d23ff38ddf4e0ca8b04a9a3d6f50973f.png)
导入MyBatis-Plus依赖：
```xml
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.3.2</version>
        </dependency>
```
在application.yml中配置数据库连接相关信息：
```yaml
#SpringBoot_DB为连接的数据库名
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    url: jdbc:mysql://localhost:3306/SpringBoot_DB
    password: 123456
```
至此我们的基础配置已经完毕，可以开始使用MyBatis-Plus技术了。
#### （2).创建持久层接口和实体类
在数据库中我们创建一个book表，用于存储书本相关信息：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bf95aeca726e06e40e008ea34a36dbd5.png)
创建一个对应book表的实体类Book：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/366e3acf765c3351e5c622b8ef808cb8.png)
创建持久层BookDao接口：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e91b7a7730415cc6d25987d03b365e57.png)
创建BookDao接口后，我们直接继承BaseMapper<T>接口，该接口是由MyBatis-Plus提供，BaseMapper接口中已经实现了我们日常开法中常用的CRUD功能，继承它后我们就无需编写大多数简单的CRUD SQL了，极大地简化 MyBatis 的开发流程，提高开发效率。
BaseMapper接口：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/6dba2e7772c943b4f29a640f74976e2b.png)
实现BsaeMapper接口后，BookDao接口的方法：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/47207f9055ce69ba048619c086f6fb15.png)
#### （3).Mybatis-Plus功能验证
在SpringBoot测试类中注入BookDao，调用MyBatis-Plus提供的方法：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/341243616fd6dfa66294487c1bc5d8d9.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/62ecd782a2d876dd73bea660cfa028cf.png)
至此SpringBoot整合MyBatis-Plus以及MyBatis-Plus简单的使用已演示完成。
### 4.3.SpringBoot整合Druid(第三方数据库连接池)
Druid是一个高性能的、开源的数据库连接池，它提供了对多种数据库系统（包括MySQL、PostgreSQL和Oracle等）的支持。在Spring Boot应用程序中集成Druid作为数据源可以帮助高效地管理数据库连接。
使用Druid数据源相对于传统的数据库连接池有几个优势：

1. **性能优势**：Druid被设计成高性能的数据库连接池，它能够有效地管理数据库连接，提供了诸如连接池复用、预处理、批处理等性能优化特性，可以显著提高应用程序的数据库访问性能。
2. **监控和统计**：Druid内置了强大的监控和统计功能，可以实时监控数据库连接的创建、销毁、活动连接数等信息。这些信息可以帮助开发人员和运维人员快速定位数据库连接的问题，从而提高系统的稳定性和可维护性。
3. **SQL防火墙**：Druid内置了SQL防火墙功能，可以对恶意的SQL进行防护，避免应用受到SQL注入等攻击。
4. **快速的失败恢复**：Druid可以快速检测到数据库连接的失效，并进行相应的处理。当数据库连接失效时，Druid可以自动把失效的连接剔除，从而避免了应用程序使用无效连接的情况。
5. **丰富的扩展功能**：Druid提供了丰富的扩展功能，可以通过插件机制扩展各种功能，比如监控、日志、过滤器等，满足不同场景下的需求。
6. **多数据源支持**：Druid支持多数据源的管理，可以在一个应用程序中同时连接多个不同类型的数据库，方便进行数据整合和业务拆分。

总的来说，Druid数据源的优势在于其高性能、强大的监控和统计功能，以及丰富的扩展能力，使得它成为许多Java应用程序首选的数据库连接池实现之一。
以下是如何在Spring Boot应用程序中配置Druid数据源的步骤：
1.添加Druid依赖
```xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.17</version>
        </dependency>
```
2.在application.yml中Druid数据源相关配置
```yaml
spring:
  datasource:
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      username: root
      url: jdbc:mysql://localhost:3306/SpringBoot_DB
      password: 123456
      
# Druid连接池设置
spring.datasource.druid.initial-size=5
spring.datasource.druid.min-idle=5
spring.datasource.druid.max-active=20
spring.datasource.druid.max-wait=60000
spring.datasource.druid.time-between-eviction-runs-millis=60000
spring.datasource.druid.min-evictable-idle-time-millis=300000
spring.datasource.druid.test-while-idle=true
spring.datasource.druid.test-on-borrow=false
spring.datasource.druid.test-on-return=false
spring.datasource.druid.filters=stat,wall,log4j

# 启用Druid的StatViewServlet
spring.datasource.druid.stat-view-servlet.enabled=true
spring.datasource.druid.stat-view-servlet.url-pattern=/druid/*
spring.datasource.druid.stat-view-servlet.login-username=admin
spring.datasource.druid.stat-view-servlet.login-password=admin
```
3.访问Druid监控控制台：
使用上述配置，你可以通过访问http://localhost:8080/druid（假设你的应用程序运行在端口8080上）来访问Druid监控控制台。在这里，你可以监控与你的Druid数据源相关的性能和其他统计信息。
4.功能验证：
更换Druid后通过SpringBoot测试类来验证是否生效。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5562f96a4943391023db19a0b5d15647.png)
可以看到数据源已成功更换为DruidDataSource，并且能够在数据库中查询到数据。
## 5.基于SpringBoot的SSMP整合案例
本章学习如何使用SpringBoot整合SSMP，并制作一个简单的案例模块(图书管理系统)，使同学们对后端开发有一个较为整体的了解。
案例实现方案：

-  实体类开发——使用Lombok快速制作实体类  ；
-  Mapper层开发——整合MyBatisPlus，实现持久层快速开发  ；
-  Service开发——基于MyBatisPlus进行增量开发，实现业务层快速开发；
-  Controller开发——基于Restful开发，使用PostMan测试接口功能  
-  Controller开发——前后端开发协议制作  
-  页面开发——基于VUE+ElementUI制作，前后端联调，页面数据处理，页面消息处理  
-  项目异常处理  ——使用r全局异常拦截器，拦截异常信息抛至Controller层
-  按条件查询——页面功能调整、Controller修正功能、Service修正功能  
### 5.1.模块创建与实体类开发
新建一个模块，添加Lombok、Spring Web、 MySQL Driver依赖，Mybatis-Plus和Druid依赖我们后续在pom中手动添加。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0f7c134513fa8eca8382ba1a39c3c631.png)
数据库表book：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e66640130d8cc23f191e5b558b0ad8f1.png)
实体类快速开发：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bd736a2482c3aea191d6a7ca9dbd5d15.png)
在实体类上我们使用了一个注解@Data，该注解是通过lombok技术引进的，Lombok 是一个 Java 库，它通过注解的方式，可以帮助开发者简化POJO实体类的开发。使用 Lombok，开发者可以在代码中添加注解，而不需要显式地编写这些常见的方法。例如，通过在类上添加 @Data 注解，Lombok 可以自动生成类的 getters、setters、toString()、equals() 和 hashCode() 方法。类似地，@Getter 注解会生成字段的 getters 方法，@Setter 注解会生成字段的 setters 方法，@Constructor注解会生成无参构造方法，@AllArgsConstructor注解会生成全参构造方法。
```xml
<!--lombok依赖-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
        </dependency>
```
以下为添加@Data注解后Book类的方法：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7bd11d2a783ac605a56131e890de7c66.png)
### 5.2.持久层开发
 
在Spring Boot中，持久层负责与数据库进行交互，通常使用ORM框架（如MyBatis、MyBatis-Plus、Hibernate）或Spring Data JPA进行持久化操作,以下是Spring Boot的持久层开发流程和常见实践：
#### （1).添加依赖坐标和修改配置文件
新增Mybatis-Plus和Druid依赖：
```xml
<!--在POM中新增Mybatis-Plus和Druid依赖-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.3.2</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.17</version>
        </dependency>
```
修改配置文件：
```yaml
#配置端口
server:
  port: 80

#配置数据源
spring:
  datasource:
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      username: root
      url: jdbc:mysql://localhost:3306/SpringBoot_DB
      password: 123456

#mybatis-plus插入数据自动递增
mybatis-plus:
  global-config:
    db-config:
      id-type: auto
#mybatis-plus SQL调试日志
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```
#### （2).持久层接口开发
新建一个BookMapper接口，加上@Mapper把BookMapper接口交给Spring进行管理，并继承BaseMapper接口实现基础的CRUD功能
```java
package com.xyzy.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xyzy.entity.Book;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper extends BaseMapper<Book> {

}
```
BookMapper接口功能测试：
我们在SpringBootTest类中测试BookMapper接口的根据ID查询单个、查询全部、新增、修改、删除、模糊查询、分页等功能。
```java

@SpringBootTest
class SpringBoot09SsmpApplicationTests {

    @Autowired
    private BookMapper bookMapper;

    @Test
    void testGetById() {//查询单个
        System.out.println(bookMapper.selectById(2));
    }

    @Test
    void testSave() {//新增
        Book book = new Book();
        book.setType("test2");
        book.setName("testName2");
        book.setDescription("testDescription2");
        bookMapper.insert(book);
    }

    @Test
    void testDelect() {//删除
        bookMapper.deleteById(11);
    }

    @Test
    void testUpdate() {//更新
        Book book = new Book();
        book.setId(12);
        book.setType("test3333");
        book.setName("testName3333");
        book.setDescription("testDescription3333");
        bookMapper.updateById(book);
    }

    @Test
    void testGetAll() {//查询所有
        bookMapper.selectList(null).forEach(System.out::println);
    }

    @Test
    void testGetBy() {//QueryWrapper新建查询条件-模糊查询
        QueryWrapper<Book> qw = new QueryWrapper<>();
        qw.like("name", "入门");
        bookMapper.selectList(qw);
    }

    @Test
    void testGetBy2() {//LambdaQueryWrapper新建查询条件-模糊查询
        LambdaQueryWrapper<Book> lqw = new LambdaQueryWrapper<>();
        lqw.like(Book::getName, "入门");
        bookMapper.selectList(lqw);

//        String name = null;
//        LambdaQueryWrapper<Book> lqw2 = new LambdaQueryWrapper<>();
//        lqw.like(name != null,Book::getName,name);
//        bookMapper.selectList(lqw);
    }

    @Test
    void testGetPage() {//分页
        IPage page = new Page(1, 5);
        IPage page1 = bookMapper.selectPage(page, null);
        System.out.println(page1.getCurrent());
        System.out.println(page1.getSize());
        System.out.println(page1.getTotal());
        System.out.println(page1.getPages());
        System.out.println(page1.getRecords());
    }
```
Mybatis-plus SQL调试日志：
```yaml
#mybatis-plus SQL调试日志
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```
通过配置文件添加mybatis-plus.configuration.log-impl开启Yybatis-plus的SQL调试日志，选择StdOutImpl后我们就能在控制台看到输出的SQL语句，以查询所有为例，Preparing中输出的为查询所有的SQL，Parameters为查询出的数据。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/389df68d16227472bc628efcdfc80d4b.png)
测试结果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/3d439cbfa32a314cb09aa1cf1064c096.png)
**分页查询：**
Mybatis-Plus使用Mapper.selectPage()方法进行分页查询，selectPage()方法的第一个参数为Page类型，Page 对象是 Mybatis-Plus 中封装分页查询结果的核心类。它包含了分页信息（当前页、每页显示数量、总记录数等）和查询结果数据。在进行分页查询时，可以使用 Mybatis-Plus 提供的 Page 类来封装查询结果，从而方便地获取分页信息和查询结果。
以下是一个简单的示例，演示如何在 Mybatis-Plus 中使用 Page 对象进行分页查询：
```java
    @Test
    void testGetPage() {//分页
        // 创建分页对象，指定当前页和每页显示数量
        IPage page = new Page(1, 5);
        // 执行分页查询，查询结果会被封装到 Page 对象中
        IPage page1 = bookMapper.selectPage(page, null);
        page1.getRecords().forEach(System.out::println);
    }
```
需要注意的是，在实际使用中，你需要根据自己的项目配置和需求来配置 Mybatis-Plus 提供的拦截器，确保分页查询能够正常工作。
当没有配置拦截器的时候，查询的语句没有添加limit关键字，导致分页查询不成功、
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c91764ffbd1de80cce350ad6655d83d9.png)
配置分页拦截器：
在实现分页查询时，MyBatis-Plus要求你添加一个分页拦截器（PaginationInterceptor），这是因为分页查询涉及到对SQL语句的修改和重写，以实现正确的分页效果。分页拦截器是MyBatis-Plus提供的一个组件，它会拦截执行的SQL语句，并根据指定的分页参数，修改SQL语句以获取指定范围的数据。
新建一个config文件夹下的MpConfig类用来配置分页拦截器，配置类需加上@Configuration注解，在配置类中定义一个返回值类型为PaginationInterceptor的方法，并在方法中return一个PaginationInterceptor对象，注册为Bean交给Spring进行管理。(@Configuration 是一个 Spring Framework 中的注解，它用于定义配置类。配置类是用来配置 Spring 应用上下文的 Java 类。在 Spring 应用中，通常会有很多配置信息，例如数据源的配置、Bean的定义、AOP（面向切面编程）配置等等。@Configuration 注解就是用来定义这些配置信息的类。
在配置类中，你可以使用 @Bean 注解来定义 Bean 对象。@Bean 注解告诉 Spring 容器，该方法将返回一个对象，并且该对象应该被注册为 Spring 应用上下文中的 Bean。配置类中的 @Bean 方法可以返回任何类型的对象，Spring 容器将负责管理这些对象的生命周期。)
```java
//mybatis-plus3.4.0版本以下使用
@Configuration
public class MpConfig {

    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }

}

//mybatis-plus3.4.0及版本以上使用
@Configuration
public class MpConfig {

    @Bean
    public MybatisPlusInterceptor MybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new  MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor);
        return interceptor;
    }

}
```
配置完拦截器后，分页查询的运行结果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ba55bcb99e3ec4cb5d80e2dab0c46427.png)
**条件查询：**
Mybatis-Plus提供了很多便捷的功能和工具类，其中 QueryWrapper 是一个用于构建条件查询的工具类。通过 QueryWrapper，你可以方便地构建查询条件，而无需手写 SQL 语句。下面是 QueryWrapper 的基本用法示例：
```java
    @Test
    void testGetBy() {//QueryWrapper新建查询条件-模糊查询
        QueryWrapper<Book> qw = new QueryWrapper<>();
        qw.like("name", "入门").eq("type","java");
        bookMapper.selectList(qw);
    }

    @Test
    void testGetBy2() {//LambdaQueryWrapper新建查询条件-模糊查询
        LambdaQueryWrapper<Book> lqw = new LambdaQueryWrapper<>();
        lqw.like(Book::getName, "入门").eq(Book::getType,"java");;
        bookMapper.selectList(lqw);
    }
```
常用的 QueryWrapper 方法

- **like(String column, Object value)**: 模糊查询
- **eq(String column, Object value**)：等于
- **ge(String column, Object value**)：大于
- **orderByDesc(String column**)：按字段排序
- **in(String column, Collection<?> values)**: 包含在给定集合中的查询
- **notIn(String column, Collection<?> values)**: 不包含在给定集合中的查询
- **isNull(String column)**: 判断字段是否为null
- **isNotNull(String column)**: 判断字段是否不为null
- **between(String column, Object val1, Object val2)**: BETWEEN 查询
- **or()**: 拼接 OR 条件
- **and()**: 拼接 AND 条件
- **nested(Consumer<QueryWrapper<T>> consumer)**: 嵌套条件，可以用于复杂的查询

以上只是一些常用方法的示例，QueryWrapper 还提供了更多的方法来满足不同的查询需求。你可以查阅 Mybatis-Plus 的官方文档或源代码来了解更多详细信息。
与 QueryWrapper 类似，LambdaQueryWrapper 也提供了丰富的方法来满足不同的查询需求。使用 Lambda 表达式的好处在于，可以避免手写字符串作为字段名，提高了代码的安全性和可读性。
### 5.3.业务层开发
在Spring Boot中，业务层是应用程序的核心，负责处理业务逻辑、数据校验、事务管理等。以下是Spring Boot的业务层开发流程和常见实践：
#### （1).业务层接口开发
在业务层中，通常会定义接口（Service接口）和实现类（Service实现类），接口用于定义业务方法的规范，而实现类则负责具体的业务逻辑处理。

- 定义业务层接口
   - 创建一个service包下的BookService接口
```java
package com.xyzy.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.xyzy.entity.Book;
import java.util.List;

public interface BookService {
	//插入
    Boolean save(Book book);
	//更新
    Boolean update(Book book);
	//删除
    Boolean remove(Integer id);
	//根据ID查询单个
    Book getById(Integer id);
	//查询所有
    List<Book> getAll();
	//分页
    IPage<Book> getPage(int current, int size);
}
```

- 创建业务层接口对应的实现类
   - 在service包下创建一个Impl包下的BookServiceImpl2业务层实现类
```java
package com.xyzy.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xyzy.entity.Book;
import com.xyzy.mapper.BookMapper;
import com.xyzy.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl2 implements BookService {

    @Autowired
    BookMapper bookMapper;

    @Override
    public Boolean save(Book book) {
        int insertNum = bookMapper.insert(book);
        return insertNum > 0;
    }

    @Override
    public Boolean update(Book book) {
        int updateNum = bookMapper.updateById(book);
        return updateNum > 0;
    }

    @Override
    public Boolean remove(Integer id) {
        int deleteNum = bookMapper.deleteById(id);
        return deleteNum > 0;
    }

    @Override
    public Book getById(Integer id) {
        return bookMapper.selectById(id);
    }

    @Override
    public List<Book> getAll() {
        return bookMapper.selectList(null);
    }

    @Override
    public IPage<Book> getPage(int current, int size) {
        IPage<Book> page = new Page<>(current, size);
        return bookMapper.selectPage(page, null);
    }
}

```

   - 在Spring框架中，@Service 注解是用于标识一个类为业务逻辑层的组件，通常被用在服务类（Service类）上。它是Spring的一个组件注解，与@Component 注解功能相同，只是在语义上更加清晰，表示这个类是业务逻辑层的组件。
   - 使用@Service 注解的好处有：
      - 语义明确：@Service 注解能够明确表示该类是业务逻辑层的组件，提高了代码的可读性和可维护性。
      - 自动扫描： Spring容器在扫描组件时，会自动识别带有@Service 注解的类，并将其实例化为Bean，无需手动配置。
      - AOP支持：@Service 注解通常与Spring的AOP（面向切面编程）结合使用，可以在服务层进行事务管理、日志记录等横切关注点的处理。
- 包层级：

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/1544286b6894c1a892def6ae049d19e7.png)

- 业务层接口功能测试
   - 在test包下的xyzy包下新建service.BookServiceTest测试类用以测试上述的业务层接口功能
```java
package com.xyzy.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.xyzy.entity.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BookServiceTest {

    @Autowired
    private BookService bookService;

    @Test
    void testGetById() {
        System.out.println(bookService.getById(8));
    }

    @Test
    void testGetAll() {
        bookService.getAll().forEach(System.out::println);
    }

    @Test
    void testSave() {
        Book book = new Book();
        book.setType("testServiceSave");
        book.setName("testServiceSaveName");
        book.setDescription("testServiceSaveDescription");
        bookService.save(book);
    }

    @Test
    void testUpdate() {
        Book book = new Book();
        book.setId(13);
        book.setType("testServiceUpdate");
        book.setName("testServiceUpdateName");
        book.setDescription("testServiceUpdateDescription");
        bookService.update(book);
    }

    @Test
    void testRemove() {
        bookService.remove(12);
    }

    @Test
    void testGetPage() {
        IPage<Book> page = bookService.getPage(2, 5);
        System.out.println(page);
    }

}

```

- 包层级：

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ea8a33cd5804329adcb81b8874328ea2.png)
#### （2).业务层快速开发
我们发现对于较为简单的通用业务，其功能与持久层的接口功能较为相似，对于这些“通用”业务，Mybatis-Plus提供了业务层通用接口IService<T>和业务层通用实现类ServiceImpl<M,T>供开发者使用，通用接口一般定义了常见的CRUD（增删改查）操作，通用实现类则提供了这些操作的默认实现，这样我们就可以简化我们的业务层开发，并且我们还可以在通用类基础上做功能重载或功能追加。

- 定义业务层接口
   - 创建一个service包下的IBookService接口继承IService<T>
```java
package com.xyzy.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.xyzy.entity.Book;

public interface IBookService extends IService<Book> {
//    //其他需要自己实现的业务
//    void otherServices();
}

```

   - 继承IService<T>后业务层接口的方法：

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/22d892dbecab431d0bf20d00ab865acf.png)

- 定义业务层接口实现类
   - 在Impl包下创建BookServiceImpl业务层实现类继承ServiceImpl<M,T>
```java
package com.xyzy.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xyzy.entity.Book;
import com.xyzy.mapper.BookMapper;
import com.xyzy.service.IBookService;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements IBookService{
//    @Override
//    public void otherServices() {
//    }
}

```
需要注意的是大部分的业务开发都较为复杂，还是需要自己根据需求在业务层接口和实现类中定义方法，自己手动coding实现；

- 包层级：

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5786da78e710bb64bc76d0065737b7fe.png)

- 业务层接口功能测试
   - 在test包下的xyzy包下新建service.BookServiceTestMP测试类用以测试上述的业务层接口功能
```java
package com.xyzy.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xyzy.entity.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BookServiceTestMp {

    @Autowired
    private IBookService bookService;

    @Test
    void testGetById() {
        System.out.println(bookService.getById(1));
    }

    @Test
    void testSave() {
        Book book = new Book();
        book.setType("testServiceSave2");
        book.setName("testServiceSaveName2");
        book.setDescription("testServiceSaveDescription2");
        bookService.save(book);
    }

    @Test
    void testUpdate() {
        Book book = new Book();
        book.setId(13);
        book.setType("testServiceUpdate2");
        book.setName("testServiceUpdateName2");
        book.setDescription("testServiceUpdateDescription2");
        bookService.updateById(book);
    }

    @Test
    void testRemove() {
        bookService.removeById(10);
    }

    @Test
    void testGetAll() {
        bookService.list().forEach(System.out::println);
    }

    @Test
    void testGetPage() {
        Page<Book> page = new Page<>(2, 5);
        Page<Book> page1 = bookService.page(page);
        System.out.println(page1);
    }

}
```

- 包层级：

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/13cdf0bba226c0fa4906613037b36bb3.png)
### 5.4.控制层开发
在Spring Boot中，控制层（Controller Layer）负责处理HTTP请求和响应，将数据传递给服务层，并将处理结果返回给客户端。以下是在Spring Boot中进行控制层开发的流程以及相关知识介绍：
#### （1).RESTful架构风格
##### 1).认识RESTful
RESTful API（Representational State Transfer API）是一种基于REST架构风格设计的应用程序接口，用于在网络上进行交互。它是一种通过HTTP协议进行通信的API设计方式，采用简洁的URL、标准的HTTP方法（GET、POST、PUT、DELETE等）和状态码来进行通信，具有简单、灵活、可扩展的特点。
以下是RESTful API的主要特点和介绍：

1. **基于资源（Resource-Based）**：RESTful API中的一切都被视为资源，每个资源都有一个唯一的标识符（通常是URI）。客户端通过HTTP请求对这些资源进行操作，资源的表现层以JSON或XML格式返回给客户端。
2. **统一的接口（Uniform Interface）**：RESTful API定义了一组统一的接口约束，包括使用标准的HTTP方法（GET、POST、PUT、DELETE等）来执行操作。这种统一的接口使得客户端和服务器之间的交互变得简单而一致。
3. **状态码（Status Codes）**：RESTful API使用HTTP状态码来表示请求的结果。常见的状态码包括200（成功）、201（已创建）、204（无内容）、400（客户端错误）、404（资源不存在）、500（服务器内部错误）等，用于指示请求的处理结果。
4. **无状态（Stateless）**：RESTful API是无状态的，每个请求都包含了所有必要的信息。服务器不会保存客户端的状态，每个请求都是独立的，这样设计使得系统更容易扩展和维护。
5. **自描述性（Self-descriptive Messages）**：RESTful API的响应通常包含了描述性的信息，包括资源的状态、数据格式、可用操作等，这样客户端可以根据这些信息进行下一步的操作。
6. **HATEOAS（Hypermedia As The Engine Of Application State）**：HATEOAS是RESTful API的一个重要概念，它表示客户端在访问资源的时候，不仅会获得资源的表现层，还会得到与资源相关的链接信息，这些链接信息可以指导客户端进行进一步的操作。

通过遵循这些原则，RESTful API提供了一种简单而强大的方式来构建分布式系统，可以在不同的平台和语言之间实现互操作性。它已经成为现代Web应用程序开发中非常流行的API设计风格。

通俗的来讲，以webService为例，**非REST设计**，以往我们都会这么定义接口：

- http://localhost:8080/admin/getUser?id=1（查询用户）
- http://localhost:8080/admin/addUser （新增用户）
- http://localhost:8080/admin/updateUser （更新用户）
- http://localhost:8080/admin/deleteUser?id=1 （删除用户）

以不同的URL（主要为使用动词）进行不同的操作。
非REST设计的接口示例：
```java
package com.xyzy.controller;

import com.xyzy.entity.Book;
import com.xyzy.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/books1")
public class BookControllerNotRestful {

    @Autowired
    IBookService bookService;

    @RequestMapping("/getAll")
    @ResponseBody
    List<Book> getAllBook(){
        return bookService.list();
    }

    @RequestMapping("/add")
    @ResponseBody
    Boolean addBook(@RequestBody Book book){
        return bookService.save(book);
    }

    @RequestMapping("/update")
    @ResponseBody
    Boolean updateBook(@RequestBody Book book){
        return bookService.updateById(book);
    }

    @RequestMapping("/delete")
    @ResponseBody
    Boolean deleteBook(@RequestParam Integer id){
        return bookService.removeById(id);
    }

    @RequestMapping("/getById")
    @ResponseBody
    Book getById(@RequestParam Integer id){
        return bookService.getById(id);
    }

}
```
而**REST架构设计**的接口定义是：

- GET http://localhost:8080/admin/user/1 （查询用户）
- POST http://localhost:8080/admin/user （新增用户）
- PUT http://localhost:8080/admin/user （更新用户）
- DELETE http://localhost:8080/admin/user/1 （删除用户）

URL只指定资源，以HTTP方法动词进行不同的操作，用HTTP STATUS/CODE定义操作结果，隐藏了资源的访问行为，无法通过地址得知资源是哪种操作，并且简化的书写的形式。
REST设计的接口示例：
```java
package com.xyzy.controller;

import com.xyzy.entity.Book;
import com.xyzy.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books2")
public class BookController2 {

    @Autowired
    private IBookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.list();
    }

    @PostMapping
    public Boolean saveBook(@RequestBody Book book) {
        return bookService.save(book);
    }

    @PutMapping
    public Boolean updatBook(@RequestBody Book book) {
        return bookService.updateById(book);
    }

    @DeleteMapping("/{id}")
    public Boolean deleteBook(@PathVariable Integer id) {
        return bookService.removeById(id);
    }

    @GetMapping("/{id}")
    public Book getByIdBook(@PathVariable Integer id) {
        return bookService.getById(id);
    }

}

```
##### 2).认识HTTP方法与CRUD动作映射
HTTP（Hypertext Transfer Protocol）是一种用于传输数据的应用层协议，常用于在Web浏览器和Web服务器之间传输文本、图片、视频、音频等资源。HTTP定义了一组不同的方法（也称为动词或动作），用于指定在服务器上执行的操作。这些方法与CRUD（Create、Read、Update、Delete）操作相对应，如下所示：

1. **GET**：用于从服务器获取资源，对应CRUD中的Read操作。当你在浏览器中输入网址或点击链接时，通常使用GET方法请求网页内容，在Controller类中使用@GetMapping注解实现Get请求映射到对应的方法上。
```java
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.list();
    }

    @GetMapping("/{id}")
    public Book getByIdBook(@PathVariable Integer id) {
        return bookService.getById(id);
    }
```

2. **POST**：用于在服务器上创建新的资源，对应CRUD中的Create操作。当你提交表单或上传文件时，通常使用POST方法。在Controller类中使用@PostMapping注解实现Post请求映射到对应的方法上。
```java
    @PostMapping
    public Boolean saveBook(@RequestBody Book book) {
        return bookService.save(book);
    }
```

3. **PUT**：用于更新服务器上的资源，对应CRUD中的Update操作。客户端可以使用PUT方法向服务器发送更新请求，通常用于完全替代原始资源。在Controller类中使用@PutMapping注解实现Put请求映射到对应的方法上。
4. **PATCH**：用于部分更新服务器上的资源，对应CRUD中的Update操作。与PUT不同，PATCH方法用于对资源的部分内容进行更新。在Controller类中使用@PatchMapping注解实现Patch请求映射到对应的方法上。
```java
    @PutMapping
    public Boolean updatBook(@RequestBody Book book) {
        return bookService.updateById(book);
    }
```

5. **DELETE**：用于删除服务器上的资源，对应CRUD中的Delete操作。使用DELETE方法会删除指定的资源。在Controller类中使用@DeleteMapping注解实现Delete请求映射到对应的方法上。
```java
    @DeleteMapping("/{id}")
    public Boolean deleteBook(@PathVariable Integer id) {
        return bookService.removeById(id);
    }
```
这些HTTP方法提供了一种标准化的方式来执行CRUD操作，使得客户端和服务器之间的通信更加清晰和可靠。在RESTful API设计中，这些HTTP方法通常与资源的URI（Uniform Resource Identifier）结合使用，以实现对资源的各种操作。
##### 3).封装HTTP返回状态枚举
在Spring Boot应用中，封装HTTP返回状态的枚举是一种良好的代码习惯，它可以提高代码的可读性和可维护性。我们可以创建一个枚举类，定义常见的HTTP状态码和相应的消息，并在Controller类中使用这些枚举值来返回HTTP响应。
以下是一个简单的HTTP返回状态枚举类的示例：
```java
public enum HttpStatusEnum {
    OK(200, "OK"),
    CREATED(201, "Created"),
    BAD_REQUEST(400, "Bad Request"),
    UNAUTHORIZED(401, "Unauthorized"),
    FORBIDDEN(403, "Forbidden"),
    NOT_FOUND(404, "Not Found"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error");

    private final int code;
    private final String message;

    HttpStatusEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
```
在上述示例中，枚举类**HttpStatusEnum**定义了几个常见的HTTP状态码（例如，200、201、400、401等）以及相应的消息。每个枚举值都有一个整数类型的状态码和一个字符串类型的消息。
在控制器类或其他服务类中，可以使用这些枚举值来返回HTTP响应。例如，使用BaseResponse统一封装格式类将枚举值转换为具体的HTTP响应：
```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/example")
public class ExampleController {

    @GetMapping("/ok")
    public ResponseEntity<String> exampleEndpoint() {
        // 业务逻辑处理

        // 返回HTTP状态码为200的响应
        return ResponseEntity.status(HttpStatusEnum.OK.getValue()).body("Request processed successfully");
    }

    @GetMapping("/error")
    public ResponseEntity<String> errorEndpoint() {
        // 业务逻辑处理

        // 返回HTTP状态码为404的响应
        return ResponseEntity.status(HttpStatusEnum.NOT_FOUND.getValue()).body("Request faild");
    }
}

```
在上述示例中，exampleEndpoint()方法返回HTTP状态码为200的成功响应，而errorEndpoint()方法返回HTTP状态码为404的资源未找到响应。通过使用枚举类中定义的状态码和消息，你可以使代码更加清晰和易于维护。
##### 4).封装统一返回格式
在Spring Boot应用中，可以使用自定义类或通用响应对象来封装统一的返回格式。以下示例，展示了如何使用Spring Boot实现统一返回格式：
```java
public class BaseResponse<T> {

    private Integer code;

    private String message;

    private T data;

    public BaseResponse() {
    }

    public BaseResponse(String code, String message, T data){
        this.data = data;
        this.code = code;
        this.message = message;
    } 
}

```
在以上代码中，BaseResponse类包含了一个整数类型的状态码 **code**、一个字符串类型的消息 **message**，以及一个泛型类型的数据 **data**。你可以根据实际需求调整响应对象的字段。
接下来，在控制器（Controller）方法中，你可以使用 ResponseEntity 类将 BaseResponse 对象包装成HTTP响应返回给客户端。例如：
```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/books")
public class MyController {

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<Book>> getByIdBook(@PathVariable Integer id) {
        BaseResponse<Book> response = new BaseResponse<>();
        response.setData(bookService.getById(id));
        response.setCode(HttpStatusEnum.SUCCESS.getCode());
        response.setMessage(HttpStatusEnum.SUCCESS.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
```
在这个示例中，getByIdBook() 方法返回一个 ResponseEntity<BaseResponse<Book>> 对象，其中包含了状态码、消息和数据。通过 ResponseEntity.status(HttpStatus.OK).body(response) 将 BaseResponse 对象包装成HTTP响应，返回给客户端。这样，无论何时调用API，响应都会采用统一的格式，提高了API的一致性，并且客户端可以根据响应的状态码来判断请求是否成功，并且根据消息和数据来获取详细信息。
#### （2).控制层接口开发

- 创建Controller类
   - 创建一个controller包下的BookController类,创建REST风格数据接口，并使用统一格式封装返回数据
```java

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private IBookService bookService;

    @GetMapping
    public BaseResponse<List<Book>> getAllBooks() {
        BaseResponse<List<Book>> response = new BaseResponse<>();
        response.setData(bookService.list());
        response.setCode(HttpStatusEnum.SUCCESS.getCode());
        response.setMessage(HttpStatusEnum.SUCCESS.getMessage());
        return response;
    }

    @PostMapping
    public BaseResponse<Boolean> saveBook(@RequestBody Book book) {
        BaseResponse<Boolean> response = new BaseResponse<>();
        response.setData(bookService.save(book));
        response.setCode(HttpStatusEnum.SUCCESS.getCode());
        response.setMessage(HttpStatusEnum.SUCCESS.getMessage());
        return response;
    }

    @PutMapping
    public BaseResponse<Boolean> updatBook(@RequestBody Book book) {
        BaseResponse<Boolean> response = new BaseResponse<>();
        response.setData(bookService.updateById(book));
        response.setCode(HttpStatusEnum.SUCCESS.getCode());
        response.setMessage(HttpStatusEnum.SUCCESS.getMessage());
        return response;
    }

    @DeleteMapping("/{id}")
    public BaseResponse<Boolean> deleteBook(@PathVariable Integer id) {
        BaseResponse<Boolean> response = new BaseResponse<>();
        response.setData(bookService.removeById(id));
        response.setCode(HttpStatusEnum.SUCCESS.getCode());
        response.setMessage(HttpStatusEnum.SUCCESS.getMessage());
        return response;
    }

    @GetMapping("/{id}")
    public BaseResponse<Book> getByIdBook(@PathVariable Integer id) {
        BaseResponse<Book> response = new BaseResponse<>();
        response.setData(bookService.getById(id));
        response.setCode(HttpStatusEnum.SUCCESS.getCode());
        response.setMessage(HttpStatusEnum.SUCCESS.getMessage());
        return response;
    }
}

```
在这个示例中，代码中从上至下分别是查询所有、保存、更新、删除和根据ID查询的接口，这些接口后续会被前端进行调用。
### 5.5.前后端协议联调
对于标准的前后端分离开发，前端页面的开发应该放到前端服务器中的，但是为了方便学习，我们直接将前端页面放置于单体服务器中，单体工程页面放置于项目的Resource目录下的static目录中(前端页面由教程提供，前端页面加入后建议clean工程)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/69d98f712c3755eade7689004737eca5.png)
以上是前端页面的目录，css目录中存放了前端页面的样式表，js目录中存放了一些前端所需要用的组件，如axios.js发送异步请求、vue.js进行组件定义和数据绑定等，plugins目录存放了elementui相关的组件，而我们最终要访问的页面是存放在pages目录下的books.html文件(本节的重点，也是唯一需要修改操作的文件，在books.html进行后端接口的调用)。
#### （1).books.html结构介绍
在进行后端接口调用前，本小节首先对books.html的结构进行简单的介绍：
head区存放了所有的头部信息，包括样式表的导入、页面的标题等。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5b499ddfdbea9c3317b0283608dde008.png)
body区是HTML文档的主体部分，包含了文档的实际内容，比如文本、图像、链接、按钮、脚本等。<body>标签是HTML文档的一个必需元素，它包裹着整个页面的可见内容，在body中我们需要定义分页组件、新增标签弹层、编辑标签弹层。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d54e186b164b06f9ab1868e74f633f2a.png)
script标签引入了各种的js文件
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ca953c73948882e5b69b821a23347b4a.png)
以下的script标签定义了vue的结构，其中dataList为页面中需要展示的列表数据、dialogFormVisible控制添加表单的弹层、dialogFormVisible4Edit控制编辑表单的弹层、formData是用来收集前端传输进来的表单数据、pagination为分页相关的封装数据。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/722cf32b4952a28793124c9be4416a78.png)
created()为钩子函数的一种，VUE对象初始化完成后自动执行，methods中的方法用来调用后端相关接口(对应增删改查、模糊查询、分页等功能)，并定义调用逻辑。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bcc124a8db19b2b779536e31acffacf3.png)
最终原始的页面如下图所示：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e6be9c013c5942d35bc71826719a0619.png)
#### （2).列表展示功能
在设计网页的时候，大部分情况下我们都希望进入到这个网页的时候，列表会刷新出对应的列表数据，要实现这个功能，需要用到vue.js中钩子函数中的created()函数，这个函数的功能是在vue对象初始化完成后自动执行，意思就是在我们的页面加载成功后自动执行函数中的操作，如果在函数中添加查询所有列表数据的操作，那么我们的页面加载或者刷新后就会呈现所有的列表数据，所以我们需要在created()中调用getAll()方法。
##### 1).created()函数与页面初始化加载
为了测试created()中调用getAll()方法是否成功，我们在getAll()方法中使用console.log()方法在浏览器控制台输出一句话：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/18104b8bc4f34fe32d39637cd01d9072.png)
启动项目，在Chrome浏览器的调试控制台的Console窗口能成功看到输出的内容：(证明created()函数调用成功)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f32b5465931b7d2132eda246b08633fc.png)
##### 2).展示列表数据
在上一小节中我们能够成功地通过created()函数调到getAll()方法，完成页面初始化加载，为了完成列表数据的展示功能，这一小节将完成getAll()方法与后端查询所有数据方法的绑定。
getAll()方法的内容如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/258409eaeb4f64ff216e9aa1a9120487.png)
该方法通过axios发送异步请求，以GET方法请求http://localhost/books路径，相当于前端页面调用了Controller层中的getAllBooks()方法，调用成功后，前端会收到调用后端方法获得的数据，通过箭头函数将数据存放到res参数中，取出res中data属性的data部分存入到展示列表数据的参数dataList中，前端页面即可展示所有的列表数据。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/805444adeec7567ee226afe7bc01bead.png)
请求返回的参数：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/02cdbf75ccbb5bdf0c30542c33a25377.png)
#### （3).数据新增功能
本小节将进行前端新增功能的开发，新增功能由页面上方的新增按钮发起，在books.html中已经设定了新增事件绑定handleCreate()方法，通过handleCreate()方法打开添加表单弹层页面，将前端填写的数据进行录入。初始我们将添加表单是否可见(dialogFormVisible)设置为false，现在我们在handleCreate()中将dialogFormVisible置为true，即可打开添加表单弹层页面。
新建按钮：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2ce2fc4f0360a05c4ac13986f7c72265.png)
新建按钮绑定handleCreate()：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/36dfb64541890969f4a155f60c8624be.png)
添加表单弹层页面开关dialogFormVisible(需要注意的是，前端传过来的数据由formData接受，后续会进行使用)：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/07265d77be0f27d610c9eaec30d3e7dd.png)
在handleCreate()中打开dialogFormVisible：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/54a8f63e5808c487931f758e9eb6b1f8.png)
重启项目，点击新建按钮，即可打开新增图书页面：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/86e76bfb75926072d61e069e376ff154.png)
此时我们需要将新建的图书通过前端页面调用后端的新增接口存入到数据库中，我们需要将新增图书页面中的'确定'按钮与前端存入新增图书数据的方法进行绑定，在books.html中已经设定了确定按钮与handleAdd()方法绑定，所以我们在handleAdd()方法中请求后端的新增接口即可。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/943e99d313b7c178c7286cea25f7ba65.png)
在handleAdd()方法中通过axios发送异步请求，以POST方法请求http://localhost/books路径，相当于前端页面调用了Controller层中的saveBook(Book book)方法，调用成功后，前端会将页面中填写的数据(**formData中的数据**)以json格式封装到请求体中，最终传入到saveBook方法的book参数中。
handleAdd()中封装请求体数据并发送请求：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/50f3a78aa1f7025bc2d40174e2c7c6fc.png)
发送的请求中的请求体内容：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7978aa4c8f3d2931bc4458d877a0582a.png)
数据库中成功新增数据：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2e6d1c2bd7cd5d8726a662972d7112d7.png)
但是仅仅发送请求，handleAdd()功能还没有全部完成，我们还要新增以下内容：

1. 进行判断，如果请求的返回结果的data值为true，代表请求成功，则关闭新增图书页面，并且页面提示添加成功，否则返回添加失败；
2. 最后无论是否添加成功与否，都要刷新重新图书列表；
3. 重新进入新建表单需要重置表单(将上次输入的数据置空）
4. 如果点击取消按钮，需要能成功关闭表单

完整的方案如下：
添加功能：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7cc2634945737ceb06d1f40eca6240b5.png)
resetForm()重置表单方法将formData置空，并且在handleCreate()中调用resetForm()方法(意思是在弹出窗口时重置表单数据)：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/23e435d718dc8488ae1ae8beab1e07d7.png)
在cancel()方法中将dialogFormVisible置为false，并且提示取消当前操作：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/66bd3def94188ac0f2c231cdf1fb3907.png)
页面功能如下(以添加成功为例)：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/faef901867ce23a9e0fffabbca5a3790.png)
列表页面成功刷新，并且提示添加成功：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/3d6a3dea1f40c616c0e77856c7967446.png)
重新进入新建表单，表单是重置状态
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/404f27660c9b9cdec72e7c3ad9e23f48.png)
点击取消，提示取消当前操作
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/76879caa0e50c25225e42f14db30c5e4.png)

#### （4).数据删除功能
本小节将进行前端删除功能的开发，删除功能由页面右侧操作列下的删除按钮发起，在books.html中已经设定了删除事件绑定handleDelete(scope.row)方法，其中ElementUI列表中的行对象封装为scope，scope中的row属性表示为当前操作的一行，即将要进行删除操作的行数据。我们在handleDelete()方法中请求后端的删除接口即可完成删除相关的操作。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/50611965e9d3180a42699f15b5d472a0.png)
为了测试row属性中有什么数据，在handleDelete()方法中调用console.log(row)，将row属性打印到控制台上：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/61d4724a610d6690f7035f6fe61bdcc8.png)
可以看到其中包含了当前删除按钮所在行的所有属性数据，若将其进行封装，调用后端接口即可完成删除操作。
在handleDelete()方法中通过axios发送异步请求，以DELETE方法请求http://localhost/books/路径，相当于前端页面调用了Controller层中的deleteBook(Integer id)方法，调用成功后，前端会将row属性的id拼接在请求路径后，最终传入到deleteBook方法的id参数中。
handleDelete()功能的逻辑如下：

1. 进行判断，如果请求的返回结果的data值为true，代表请求成功，页面提示删除成功，否则返回数据同步失败，自动刷新；
2. 最后无论是否删除成功与否，都要刷新重新图书列表；

完整的方案如下：
删除功能：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4285dd5beabe5e675d77bd002a4a534d.png)
页面功能如下(以删除成功为例)：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/85fd62b7abda21fcb33f1210edbd5c72.png)
但是这种方案删除没有提示信息，容易造成误删操作，因此还需要添加提醒页面：
在handleDelete()中调用confirm()方法，填入提示信息，若点击提醒页面中的确定按钮则调用删除接口，若点击取消则提示取消操作：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/26ff11bbee3369a837466d75d8f7d574.png)
添加删除提示功能的页面功能如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/efcc5c2cf507a95020aede49caefeb22.png)
取消操作：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8869922ca9e422e6d3bfc7f6639f9a34.png)
确定操作：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/dde25fe17fd63f21a771b0ad8ad37981.png)
#### （5).数据修改功能
本小节将进行前端修改功能的开发，修改功能由页面右侧操作列下的编辑按钮发起，在books.html中已经设定了编辑事件绑定handleUpdate(scope.row)方法，其中ElementUI列表中的行对象封装为scope，scope中的row属性表示为当前操作的一行，即将要进行编辑操作的行数据。我们在handleUpdate()方法中请求后端的通过id查询接口即可获取需要修改的原始数据。(修改操作可以看作在编辑操作的基础上将修改的行数据，调用后端修改接口)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bb1ed2534f0b5a87cdd97da5cd38db1f.png)
在handleUpdate()方法中通过axios发送异步请求，以GET方法请求http://localhost/books/路径，相当于前端页面调用了Controller层中的getByIdBook(Integer id)方法，调用成功后，前端会将row属性的id拼接在请求路径后，最终传入到getByIdBook方法的id参数中获取到将要修改的数据。
handleUpdate()功能的逻辑如下：

1. 进行判断，如果请求的返回结果的data值为不为null，代表请求成功，打开编辑页面弹层，将返回的数据中的data参数传给formData，否则返回数据同步失败，自动刷新；
2. 最后无论是否删除成功与否，都要刷新重新图书列表；

完整的方案如下：
编辑功能：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d5b9d6d785abd63a62392ac02eeaf1a3.png)
页面功能如下(点击编辑能看到返回的数据)：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9a12e0952647af16fb5cd92f85f03641.png)
编辑功能完成后进行修改功能的开发：
在books.html的'编辑标签弹层'中已经设定了修改确定功能绑定handleEdit()方法，在handleEdit()中通过axios发送异步请求，以PUT方法请求http://localhost/books路径，相当于前端页面调用了Controller层中的updatBook(Book book)方法，调用成功后，前端会将formData表单中的数据以json格式封装到请求体中，最终传入到updatBook方法的book参数中。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cba80fe209204aa83116f1eeb3d780da.png)
handleEdit()功能的逻辑如下：

1. 进行判断，如果请求的返回结果的data值为true，代表请求成功，则关闭编辑图书页面，并且页面提示修改成功，否则返回修改失败；
2. 最后无论是否添加成功与否，都要刷新重新图书列表；
3. 在取消按钮对应的方法cancel()中添加关闭编辑图书弹层；

完整的方案如下：
修改功能：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7520b4fbee2a589e68406aa7b77f21e8.png)
取消修改：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ec6ebb15f76811ca4fa85dab9cc21efa.png)
修改功能的页面如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/13ecdd70213371ab28b76c56f8e6d49e.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a0d06f6729a61377b2c2c4aad7cbeb99.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4188829ce80f949752e1c882ee1b1762.png)
点击取消，提示取消当前操作
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9ca7be6d30d18106ae2bf36c94604c8c.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/dd84acbb002d13073d7fa262db6668b5.png)

#### （6).列表分页功能
本小节将进行列表分页功能的开发，在第(2)小节中已经进行了列表展示功能的开发，列表分页功能在列表展示的基础上加上分页即可，所以我们前端基于已有的getAll()方法进行修改。后端分页功能使用Mybatis-Plus提供的分页拦截器和BaseMapper增强类的selectPage()方法进行开发。
##### 1).后端接口
IBookService接口中定义分页查询的方法getPage()：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/69c5254574215238614ec583818814e8.png)
分页拦截器：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d5bf112749aaf248ec238bd3b15194fb.png)
服务层实现类BookServiceImpl中实现getPage方法，返回的IPage对象中包含了分页的相关结果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/228d3fbecede5abbb7798f96879d58bf.png)
表现层接口：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9dcc673b684f18aadc4a45640521c7f9.png)
分页查询的返回结果，records中存放着分页的数据，total为总记录数，current为当前页，size为分页大小：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/16a1f7bb61059d27b6562ef4e8455083.png)
##### 2).前端实现
首先需要认识一下books.html中定义的分页组件pagination-container：
handleCurrentChange为切换页码的方法名，pagination.currentPage为当前页码值加载的数据，pagination.pageSize为分页大小加载的数据，pagination.total为列表总数加载的数据。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/04d5ff9f71123f8f31fa77ec0dc6b7e8.png)
pagination的相关数据在vue结构中进行了定义，currentPage、pageSize、total的默认值分别为1、10、0。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/67a8418957a5728014af27fd4ca4aa53.png)
total, prev, pager, next, jumper五个参数为页码布局模式，分别是总数、前一页、页码值、后一页和跳转。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a2640773c6ffa861f9f32b96c29544bf.png)
对getAll()方法进行修改，添加分页相关的逻辑并调用分页接口：
getAll()分页功能的逻辑如下：

1. 进行将默认的currentPage和pageSize拼接在请求路径中，调用后端分页接口获取分页相关数据；
2. 将查询出的分页列表数据records封装进dataList中进行列表展示；
3. 将真实的total、current、size等数据封装进对应的数据，进行前端页面回显；

完整的方案如下：
分页查询功能：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d35952666274c49ca8d8b20f0a9a62ee.png)
前端分页效果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5978f3a6452a37de261c202f8d75b79f.png)
此时页面的翻页功能还未实现，需要在handleCurrentChange(currentPage)方法中执行以下两步：

1. 修改当前的页码值为选中的页码；
2. 执行查询；

方案如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4c11744885707cb2911c026303060479.png)
翻页效果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9e5ae0106aac24fba7a5674728620fe3.png)

##### 3).分页功能维护
1)、2)节开发的分页功能存在一个较为致命的缺陷，当分页的数据只有一个的时候，删除该条数据，页面会显示BUG(前一页的内容显示为空)。造成这个BUG的原因是返回的数据中当前页current小于目前的总页数，按照原有逻辑会调取getAll()方法重新调用后端分页接口传入当前的current，导致查询为空。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e1ae3c04288228050156a18b03747195.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c734eba62d18fc3bf506838d4361f740.png)![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/82faba97266491d736568fd0df824904.png)
解决的办法为：在分页接口中进行半段，如果当前传入的前页码值大于总页码数，则更新当前页码值current为最大页码值，然后再重新进行查询。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4347b9fb40c690162443a5636cc25557.png)
修改后删除当前页面最后一条，即可成功跳转。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/699f71a74dbb3f1f7cd6f8c97edf9eaf.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fc6b1ed326d9533bbec9e40b70d2ed70.png)
#### （7).条件查询功能
本小节将进行条件查询功能的开发，在上一小节中已经进行了列表分页功能的开发，条件查询即是在分页查询的基础上将查询的条件进行携带，所以在后端分页接口的参数中加上将要查询的对象，在前端的请求地址中明文拼接查询的条件，即可完成该功能。
##### 1).前端实现
在进行开发前需要知道如何从前端获取查询的数据，前端发请求的时候需要将三个模糊查询的数据进行拼接，所以要在books.html中将模糊查询的数据图书类别、图书名称、图书描述进行数据模型定义并将数据模型绑定。
数据模型定义：因为模糊查询与分页查询是同时进行的，为了方便，在vue模型中进行数据模型定义；
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/31d1ea23221659588292bbae6f8aa4a2.png)
定义数据模型后，进行数据模型与前端标签的绑定：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8aceed7c407b30db44b4907149dd5f9a.png)
数据模型与前端标签进行绑定后，在前端页面中输入模糊查询的条件，在html中即可拿到该数据，使用console()方法接受pagination.type数据进行测试：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/838c7fde93288788b90e687836a1cba9.png)
在图书类别标签中输入123点击查询，控制台能成功显示数据：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b4d0be71d15872f92c5eea7a67073a50.png)
测试数据获取无误后，将三个模糊查询条件进行组合拼接：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ecdcee24e448e34adab83bfa46ce5dda.png)
在控制台能成功看到拼接后的数据：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0ec857637dfcda1b043c92ad1dd07203.png)
至此，前端功能已经制作完毕，接下来进行后端模糊查询的开发。
##### 2).后端接口
在IBookService中定义一个getPage方法的重载，方法参数中传入一个Book类型的参数：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/80dddfe1d4458ba6e66f9c304a01d026.png)
服务层实现类BookServiceImpl中实现重载的getPage方法：new一个LambdaQueryWrapper查询对象，调用模糊查询方法like()，填入将需要进行模糊查询的参数后，将LambdaQueryWrapper对象填入selectPage查询方法中；
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/aecfd853d9fcda904b68f420b288d67f.png)
表现层接口：
在getPage接口的方法中传入一个Book类型的参数接收前端传入的信息(通过SpringMVC的参数绑定，若参数名符合实体类的属性名，会自动为实体类注入属性)，服务层对象bookService调用的方法换为重载的getPage方法。![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9e7dde5820c763d3b06ced36f25e0360.png)
重新运行启动类进行测试:
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/11bc3d63b9e2ee5501510a3bdb689e1c.png)
能够查询出输入的内容，并展示分页信息，条件查询功能开发完毕。
至此基于SpringBoot的SSMP整合案例已全部开发完成，该项目能让同学们从项目的整体上了解后端开发的工作内容，以及前后端联调的过程，认识web网页开发的全流程。
## 6.SpringBoot缓存管理
缓存是分布式系统中的重要组件，主要解决数据库数据的高并发访问问题。在实际开发中，尤其是用户访问量较大的网站，为了提高服务器访问性能、减少数据库的访问压力、提高用户体验，使用缓存显得尤为重要。我们生活中常用到软件里处处都能看到缓存的身影，如：

- 手机短信验证等业务场景，使用Redis缓存中间件的expire命令设置一个键的生存时间(通常为60S)，到时间后redis会删除它，期间不允许同一用户再次获取验证码(限制接口的请求次数)，这样不仅满足了手机短信验证功能，还能防止恶意用户大量进行请求，保证了验证业务的稳定性。(下图为微信手机短信验证登陆)

![短信验证登陆.jpg](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e12e105533bed9f26f8855ee471a4812.jpeg)

- 延时操作业务场景，比如在订单生产后我们占用了库存，24小时后去检验用户是否真正购买，如果没有购买将该单据设置无效，同时还原库存。我们在订单生产时，设置一个key，同时设置24小时后过期， 我们在后台实现一个监听器，监听key的实效，监听到key失效时将后续逻辑加上。(下图为淘宝未支付订单)

![淘宝订单图1.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/15d4590f861d5976bb62f5f3f7bc769a.png)![淘宝订单图2.jpg](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/47d6a4f83c8544e1da593ecaf8fcc904.jpeg)

- 排行榜热点数据场景，关系型数据库在排行榜方面查询速度普遍偏慢(硬盘大量数据更新与查询)，所以可以借助redis等缓存的SortedSet进行热点数据的排序。比如微博热搜排行榜，通过zrangebyscore，将热点新闻的id作为key，将新闻的点击数作为score，利用score排序进行热搜排行，然后针对每个热点新闻做一个hash，通过id可获取热点新闻的具体内容信息。(下图为微博热搜)

![热搜.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8fd16bb808deceb422dc4d518604014a.png)
由此可见缓存的学习十分必要，在大量的业务中需要用到缓存的高性能，通过其操作简单，访问和存储的速度快的特性帮助开发者解决一些棘手的问题。SpringBoot对缓存提供了良好的支持。本章将对SpringBoot的缓存管理进行介绍，并完成SpringBoot与Redis缓存中间件的整合。
### 6.1.SpringBoot默认缓存管理
Spring框架支持透明地向应用程序添加缓存并对缓存进行管理，其管理缓存的核心是将缓存应用于操作数据的方法中，从而减少操作数据的次数，同时不会对程序本身造成任何干扰。SpringBoot继承了Spring框架的缓存管理功能，Spring的缓存模块提供了多种缓存管理方案，例如使用各种缓存库（如Ehcache、Hazelcast等）来实现缓存管理，通过使用@EnableCaching注解开启基于注解的缓存支持，本小节将以项目demo的形式介绍SpringBoot基于内存的默认缓存。
#### （1).项目及环境搭建
使用缓存的主要目的是减小数据库的访问压力，为此，本节将结合数据库的访问操作对SpringBoot的缓存进行演示，接下来首先搭建项目和配置环境。
**数据准备**：
使用前期课程创建的springboot_db数据库以及其中的Book表作为演示数据。
**项目创建**：
创建名为SpringBoot_09_defaultCache的项目，引入lombok、SpirngWeb、Mybatis、MySQL Driver依赖，并在pom文件中引入Mybatis-Plus和Druid依赖，如下图所示：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9711440346d38981958751a9c993f082.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/584e89dfc7ab155632004355015179f2.png)
**application.properties配置：**
进行web服务访问端口(默认8080)和数据库连接相关配置
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/13f842dcb83d34ce6247fb18d4621df0.png)
**实体类创建：**
在com.xyzy包下创建一个名为entity的包，在该包下创建名为Book的实体类，与数据库中的book表进行映射，使用@Data注解协助实体类快速开发。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/af9cdcf061c66f6e01b3ad07ec6fb605.png)
**持久层接口：Mapper**
在com.xyzy包下创建一个名为mapper的包，在该包下创建名为BookMapper的接口，并继承Mybatis-Plus提供的BaseMapper接口，实现持久层快速开发。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/118fe9176bcb11de75384ade005630e8.png)
**业务层接口和业务层接口实现类：**
在com.xyzy包下创建一个名为service的包，在该包下创建名为IBookService的接口，并继承Mybatis-Plus提供的IService接口，接口定义一个通过Id查询Book的方法。在service包下创建一个名为Impl的包，在该包下创建名为BookServiceImpl的类，继承ServiceImpl<M,T>类，并实现IBookService接口。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/58406fae95931e96a83401d58205bda5.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bcecf4773252b25d7aeeb9f53e4efa55.png)
**控制层开发：**
在com.xyzy包下创建一个名为controller的包，在该包下创建名为BookController的实体类用于控制层方法映射
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2fcc6de4ebb532f81cc85f7b7d9381de.png)
**项目测试：**
启动SpringBoot_09_defaultCache项目，项目成功运行后，在浏览器上访问"http://localhost:8080/books/1"查询Id为1的书目信息。访问多次，页面总是显示这一条数据，而且每次访问控制台都会输出相应的查询SQL。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4a7d3409fb689276cc6a902a88b7c732.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/047dfc282b6d311becfac9d3caeb310c.png)
之所以出现上述"而且每次访问控制台都会输出相应的查询SQL"的情况，是因为没有在SpringBoot中开启缓存管理，在没有开启缓存的情况下，每次执行一次查询操作，都会访问数据库一次并执行一次相应的SQL语句，随着用户规模的扩大，当数据规模十分庞大时，这样频繁的操作数据库会影响用户体验，并对数据库造成访问压力导致崩溃宕机等情况的发生，此时使用缓存能很好的解决这一类问题。
#### （2).SpringBoot缓存管理使用
在上一小节中搭建的web项目基础上，开启SpringBoot支持的缓存，演示使用SpringBoot缓存的效果。
**开启默认缓存：**
使用**@EnableCaching**注解开启基于注解的缓存支持，该注解通常会添加在项目启动类上。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d9ed432da971146c9757a2ec8c68293a.png)
**缓存查询结果：**
使用**@Cacheable**注解对数据操作方法进行缓存管理。将@Cacheable注解标注在BookServiceImpl类的查询方法上，对查询结果进行缓存
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/70f5bc3c8b33f7d0dc25c4d15687103a.png)
在上述代码中，@Cacheable注解指定了缓存的名称为"bookCache"，并使用方法的参数id作为缓存的键(key)。如果在后续调用中传递相同的id，则会直接从缓存中获取数据，而不会执行getById()方法。
**SpringBoot默认缓存测试：**
启动SpringBoot_09_defaultCache项目，项目成功运行后，在浏览器上访问"http://localhost:8080/books/1"查询Id为1的书目信息。访问多次，页面总是显示这一条数据，但是控制台只会输出第一次查询的SQL日志信息，往后的每一次调用接口都从缓存中获取数据(控制台打印book对象的hash值不变)。![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/67ec1ad04d9e48183cd81896bc31c64c.png)
#### （3).SpringBoot缓存相关注解介绍
在第(2)小节中，使用了@EnableCaching与@Cacheable注解实现了SpringBoot默认的基础注解的缓存管理，除此之外，SpringBoot还提供了更多的注解对缓存提供支持和配置，这一小节将进行SpringBoot常用缓存相关注解的解析。

- **SpringBoot缓存管理器**：Spring Boot 提供了对多个缓存管理器的支持，你可以根据项目需求选择合适的缓存管理器。以下是一些常见的 SpringBoot 缓存管理器：
   1. **ConcurrentMapCacheManager:**
      - **配置属性:spring.cache.type=caffeine** 或 **spring.cache.type=simple**
      - **说明:** 基于内存的缓存管理器，适用于小规模应用或开发阶段的调试。不适合分布式系统，因为缓存是存在于每个应用实例的内存中。
   2. **CaffeineCacheManager:**
      - **配置属性:spring.cache.type=caffeine**
      - **说明:** 基于 Caffeine 的缓存管理器，提供了高性能的本地缓存。适用于需要快速、轻量级缓存的场景。
   3. **EhCacheCacheManager:**
      - **配置属性:spring.cache.type=ehcache**
      - **说明:** 集成了 Ehcache 缓存框架的缓存管理器。Ehcache 是一个广泛使用的开源缓存框架，支持分布式缓存。
   4. **RedisCacheManager:**
      - **配置属性:spring.cache.type=redis**
      - **说明:** 集成了 Redis 缓存服务器的缓存管理器。适用于分布式系统，可以共享缓存数据。
- **@EnableCaching注解**：@EnableCaching 是 Spring Framework 中用于启用缓存支持的注解。当在 Spring Boot 项目中使用缓存时，通常会在配置类上添加 @EnableCaching 注解，以启用缓存功能，如果不配置缓存管理器将开启默认的ConcurrentMapCacheManager。
- **@Cacheable注解**：@Cacheable 是 Spring 框架中用于启用缓存的注解之一，通过它可以将方法的结果缓存起来，以便在后续调用时直接返回缓存的值，而不必执行实际的方法逻辑。(作用于类或者方法上，通常是方法上)以下是 @Cacheable 注解的主要属性：
| 属性 | 描述 | 示例 |
| --- | --- | --- |
| `value` | 缓存的名称 | `@Cacheable(value = "myCache")` |
| `key` | 缓存的键，可以使用SpEL表达式自定义 | `@Cacheable(value = "myCache", key = "#id")` |
| `condition` | 指定是否执行缓存的SpEL表达式，为true时执行缓存 | `@Cacheable(value = "myCache", condition = "#result != null")` |
| `unless` | 与`condition`
相反，指定是否不执行缓存的SpEL表达式，为false时执行缓存 | `@Cacheable(value = "myCache", unless = "#result == null")` |

- **@CachePut注解：**@CachePut 是 Spring 框架中用于将方法的结果放入缓存的注解之一。与 @Cacheable 注解不同，@CachePut 注解总是执行方法，并将结果放入缓存中，以确保缓存中的数据是最新的。这个注解通常用于更新缓存中的数据(作用于类或者方法上，通常是数据更新的方法上，默认执行顺序是先调用方法然后将方法的返回值更新到缓存中)，@CachePut也提供了多个属性，这些属性与@Cacheable的属性完全一致 。示例如下：

业务层接口新增updateBook方法：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7798b8bcf6d88ad4d2c0002bd8055240.png)
业务层接口实现类实现updateBook方法：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d9978e62d2ae46086efd3ba743dc29e6.png)
控制层方法映射：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/94a9dde50932167d487a8eadfde38ddc.png)
postman调用更新接口，更新书籍，更新成功后，书籍的信息会存入缓存中，key为书籍的id：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bbd57a1365457217a02a4cfe6ef9fd7e.png)
调用查询接口进行查询多次：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/46a3375417dcdb22e60cf2fa97770b5c.png)
发现控制台没有打印""----获取书籍:" + id" 相关信息，表明查询没有调用业务层的getById(Integer id)方法，信息是从缓存中获取的。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/dae97c0c153986d57681629e8dd6f7c9.png)

- **@CacheEvict注解**：@CacheEvict 是 Spring 框架中用于清除缓存中的数据的注解之一。通过 @CacheEvict 注解，可以指定在方法执行后清除缓存中的特定数据或整个缓存。这个注解通常用于在执行更新、删除等操作时，清除缓存，以便下一次访问时重新加载最新的数据(作用于类或者方法上，通常是数据删除或更新的方法上，默认执行顺序是先调用方法然后清除缓存)，@CacheEvict的属性与Cacheable的属性基本相同，除了allEntries与beforeInvocation属性**：**
| **属性** | **描述** | **示例** |
| --- | --- | --- |
| `**allEntries**` | **是否清除缓存中的所有数据，默认为 **`**false**`
**。如果设置为 **`**true**`
**，将清除整个缓存。** | `**@CacheEvict(value = "myCache", allEntries = true)**` |
| `**beforeInvocation**` | **是否在方法执行前清除缓存，默认为 **`**false**`
**。如果设置为 **`**true**`
**，缓存将在方法执行前清除，即使方法执行抛出异常。** | `**@CacheEvict(value = "myCache", beforeInvocation = true)**` |

- **@Caching注解：**@Caching 是 Spring 框架中用于同时应用多个缓存注解的注解，作用于类或者方法上。通过 @Caching 注解，可以在一个方法上同时使用 @Cacheable、@CachePut、@CacheEvict 等多个缓存注解，以实现更复杂的缓存策略。以下是 @Caching 注解的主要属性和用法示例：
```java
@Caching(
    cacheable = {
        @Cacheable(value = "cacheName1", key = "key1")
    },
    put = {
        @CachePut(value = "cacheName1", key = "key1")
    },
    evict = {
        @CacheEvict(value = "cacheName2", key = "key2")
    }
)
public ReturnType methodName(MethodParameters) {
    // Method implementation
}

```

- **@CacheConfig注解：**@CacheConfig 是 Spring 框架中用于配置缓存相关参数的注解。通过在类级别使用 @CacheConfig 注解，你可以为整个类统一配置缓存的名称、缓存管理器、缓存键的生成规则等信息，从而避免在每个缓存注解上都重复指定相同的属性。下面是一个简单的示例，演示了如何在 Spring Boot 中使用 @CacheConfig 注解：
```java
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@CacheConfig(cacheNames = "myCache", keyGenerator = "customKeyGenerator", cacheManager = "cacheManagerBeanName")
public class MyCachedService {

    @Cacheable
    public String getDataById(String id) {
        // Method implementation
        return "Data for id: " + id;
    }
}

```
在这个例子中，@CacheConfig 注解配置了默认的缓存名称为 "myCache"，并指定了使用名为 "customKeyGenerator" 的自定义键生成器。这样，类中的所有缓存操作都会应用这些默认配置。以下是`@CacheConfig`注解的属性和说明

| 属性 | 描述 | 示例 |
| --- | --- | --- |
| `cacheNames` | 指定缓存的名称。该属性的值会被应用到类中的所有缓存注解，除非在具体的注解上重新指定了缓存名称(就近原则)。 | `@CacheConfig(cacheNames = "myCache")` |
| `keyGenerator` | 指定用于生成缓存键的 `KeyGenerator`
 bean 的名称。如果不指定，将使用默认的键生成器。 | `@CacheConfig(keyGenerator = "customKeyGenerator")` |
| `cacheManager` | 指定使用的缓存管理器的名称。如果不指定，将使用默认的缓存管理器。 | `@CacheConfig(cacheManager = "customCacheManager")` |

### 6.2.SpringBoot整合Redis实现缓存
学习SpringBoot整合Redis之前我们先了解一下Redis。
Redis简介：Redis是一款内存高速缓存数据库。Redis全称为：**Remote Dictionary Server**（远程数据服务），使用C语言编写，Redis是一个key-value存储系统（键值存储系统），支持丰富的数据类型，如：String、list、set、zset、hash。
Redis是一种支持key-value等多种数据结构的存储系统。可用于缓存，事件发布或订阅，高速队列等场景。支持网络，提供字符串，哈希，列表，队列，集合结构直接存取，基于内存，可持久化。
Redis的特点：

- **读写性能优异**
- Redis能读的速度是110000次/s,写的速度是81000次/s （测试条件见下一节）。
- **数据类型丰富**
- Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
- **原子性**
- Redis的所有操作都是原子性的，同时Redis还支持对几个操作全并后的原子性执行。
- **丰富的特性**
- Redis支持 publish/subscribe, 通知, key 过期等特性。
- **持久化**
- Redis支持RDB, AOF等持久化方式
- **发布订阅**
- Redis支持发布/订阅模式
- **分布式**
- Redis Cluster

本节我们将学习Redis的安装以及Redis客户端可视化工具的安装使用，以及使用SpringBoot整合Redis实现缓存。
#### （1).Redis基础
##### 1).Redis5种基础数据类型
首先对redis来说，所有的key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的5种数据类型，分别是：String、List、Set、Zset、Hash。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/28ba5ed05e8204026f224ed199f43189.jpeg)

| 结构类型 | 结构存储的值 | 结构的读写能力 |
| --- | --- | --- |
| **String字符串** | 可以是字符串、整数或浮点数 | 对整个字符串或字符串的一部分进行操作；对整数或浮点数进行自增或自减操作； |
| **List列表** | 一个链表，链表上的每个节点都包含一个字符串 | 对链表的两端进行push和pop操作，读取单个或多个元素；根据值查找或删除元素； |
| **Set集合** | 包含字符串的无序集合 | 字符串的集合，包含基础的方法有看是否存在添加、获取、删除；还包含计算交集、并集、差集等 |
| **Hash散列** | 包含键值对的无序散列表 | 包含方法有添加、获取、删除单个元素 |
| **Zset有序集合** | 和散列一样，用于存储键值对 | 字符串成员与浮点数分数之间的有序映射；元素的排列顺序由分数的大小决定；包含方法有添加、获取、删除单个元素以及根据分值范围或成员来获取元素 |

**基础数据结构详解：**
**String字符串：**
String是redis中最基本的数据类型，一个key对应一个value。
String类型是二进制安全的，意思是 redis 的 string 可以包含任何数据。如数字，字符串，jpg图片或者序列化的对象。

- **图例**

下图是一个String类型的实例，其中键为hello，值为world。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8dce964caaeb3e32e2f28eca77fdd45d.png)

- **命令使用**
| 命令 | 简述 | 使用 |
| --- | --- | --- |
| GET | 获取存储在给定键中的值 | GET name |
| SET | 设置存储在给定键中的值 | SET name value |
| DEL | 删除存储在给定键中的值 | DEL name |
| INCR | 将键存储的值加1 | INCR key |
| DECR | 将键存储的值减1 | DECR key |
| INCRBY | 将键存储的值加上整数 | INCRBY key amount |
| DECRBY | 将键存储的值减去整数 | DECRBY key amount |

- **命令执行**
```shell
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> get hello
"world"
127.0.0.1:6379> del hello
(integer) 1
127.0.0.1:6379> get hello
(nil)
127.0.0.1:6379> set counter 2
OK
127.0.0.1:6379> get counter
"2"
127.0.0.1:6379> incr counter
(integer) 3
127.0.0.1:6379> get counter
"3"
127.0.0.1:6379> incrby counter 100
(integer) 103
127.0.0.1:6379> get counter
"103"
127.0.0.1:6379> decr counter
(integer) 102
127.0.0.1:6379> get counter
"102"
```

- **实战场景**
   - **缓存**： 经典使用场景，把常用信息，字符串，图片或者视频等信息放到redis中，redis作为缓存层，mysql做持久化层，降低mysql的读写压力。
   - **计数器**：redis是单线程模型，一个命令执行完才会执行下一个，同时数据可以一步落地到其他的数据源。
   - **session**：常见方案spring session + redis实现session共享，

---

**List列表：**
Redis中的List其实就是链表（Redis用双端链表实现List）。
 使用List结构，我们可以轻松地实现最新消息排队功能（比如新浪微博的TimeLine）。List的另一个应用就是消息队列，可以利用List的 PUSH 操作，将任务存放在List中，然后工作线程再用 POP 操作将任务取出进行执行。

- **图例**

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e63e3df9797f9b7416d65c0d46862edd.png)

- **命令使用**
| 命令 | 简述 | 使用 |
| --- | --- | --- |
| RPUSH | 将给定值推入到列表右端 | RPUSH key value |
| LPUSH | 将给定值推入到列表左端 | LPUSH key value |
| RPOP | 从列表的右端弹出一个值，并返回被弹出的值 | RPOP key |
| LPOP | 从列表的左端弹出一个值，并返回被弹出的值 | LPOP key |
| LRANGE | 获取列表在给定范围上的所有值 | LRANGE key 0 -1 |
| LINDEX | 通过索引获取列表中的元素。你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。 | LINDEX key index |

- **命令执行**
```shell
127.0.0.1:6379> lpush mylist 1 2 ll ls mem
(integer) 5
127.0.0.1:6379> lrange mylist 0 -1
1) "mem"
2) "ls"
3) "ll"
4) "2"
5) "1"
127.0.0.1:6379> lindex mylist -1
"1"
127.0.0.1:6379> lindex mylist 10        # index不在 mylist 的区间范围内
(nil)
```

- **实战场景**
   - **微博TimeLine**: 有人发布微博，用lpush加入时间轴，展示新的列表信息。
   - **消息队列**

---

**Set集合：**
Redis 的 Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

- **图例**

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/306753f81efea1e66aa00247b32b5f5b.png)

- **命令使用**
| 命令 | 简述 | 使用 |
| --- | --- | --- |
| SADD | 向集合添加一个或多个成员 | SADD key value |
| SCARD | 获取集合的成员数 | SCARD key |
| SMEMBERS | 返回集合中的所有成员 | SMEMBERS key member |
| SISMEMBER | 判断 member 元素是否是集合 key 的成员 | SISMEMBER key member |

其它一些集合操作，参考菜鸟教程[https://www.runoob.com/redis/redis-sets.html](https://www.runoob.com/redis/redis-sets.html)

- **命令执行**
```shell
127.0.0.1:6379> sadd myset hao hao1 xiaohao hao
(integer) 3
127.0.0.1:6379> smembers myset
1) "xiaohao"
2) "hao1"
3) "hao"
127.0.0.1:6379> sismember myset hao
(integer) 1
```

- **实战场景**
   - **标签**（tag）,给用户添加标签，或者用户给消息添加标签，这样有同一标签或者类似标签的可以给推荐关注的事或者关注的人。
   - **点赞，或点踩，收藏等**，可以放到set中实现

---

Hash散列：
Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/67bb06211135716e63d371edccab1357.png)

- **命令使用**
| 命令 | 简述 | 使用 |
| --- | --- | --- |
| HSET | 添加键值对 | HSET hash-key sub-key1 value1 |
| HGET | 获取指定散列键的值 | HGET hash-key key1 |
| HGETALL | 获取散列中包含的所有键值对 | HGETALL hash-key |
| HDEL | 如果给定键存在于散列中，那么就移除这个键 | HDEL hash-key sub-key1 |

- **命令执行**
```shell
127.0.0.1:6379> hset user name1 hao
(integer) 1
127.0.0.1:6379> hset user email1 hao@163.com
(integer) 1
127.0.0.1:6379> hgetall user
1) "name1"
2) "hao"
3) "email1"
4) "hao@163.com"
127.0.0.1:6379> hget user user
(nil)
127.0.0.1:6379> hget user name1
"hao"
127.0.0.1:6379> hset user name2 xiaohao
(integer) 1
127.0.0.1:6379> hset user email2 xiaohao@163.com
(integer) 1
127.0.0.1:6379> hgetall user
1) "name1"
2) "hao"
3) "email1"
4) "hao@163.com"
5) "name2"
6) "xiaohao"
7) "email2"
8) "xiaohao@163.com"
```
**实战场景**

- **缓存**： 相比string更节省空间，维护缓存信息，如用户信息，媒体信息等

---

Zset有序集合：
Redis 有序集合和集合一样也是 string 类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个 double 类型的分数score。redis 正是通过score来为集合中的成员进行从小到大的排序。
有序集合的成员是唯一的, 但分数(score)却可以重复。有序集合是通过两种数据结构实现：

1. **压缩列表(ziplist)**: ziplist是为了提高存储效率而设计的一种特殊编码的双向链表。它可以存储字符串或者整数，存储整数时是采用整数的二进制而不是字符串形式存储。它能在O(1)的时间复杂度下完成list两端的push和pop操作。但是因为每次操作都需要重新分配ziplist的内存，所以实际复杂度和ziplist的内存使用量相
2. **跳跃表（zSkiplist)**: 跳跃表的性能可以保证在查找，删除，添加等操作的时候在对数期望时间内完成，这个性能是可以和平衡树来相比较的，而且在实现方面比平衡树要优雅，这是采用跳跃表的主要原因。跳跃表的复杂度是O(log(n))。
- **图例**

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0da44658e4dcaa096db2e04e10538907.png)

- **命令使用**
| 命令 | 简述 | 使用 |
| --- | --- | --- |
| ZADD | 将一个带有给定分值的成员添加到有序集合里面 | ZADD zset-key 178 member1 |
| ZRANGE | 根据元素在有序集合中所处的位置，从有序集合中获取多个元素 | ZRANGE zset-key 0-1 withccores |
| ZREM | 如果给定元素成员存在于有序集合中，那么就移除这个元素 | ZREM zset-key member1 |

更多命令请参考菜鸟教程[https://www.runoob.com/redis/redis-sorted-sets.html](https://www.runoob.com/redis/redis-sorted-sets.html)

- **命令执行**
```shell
127.0.0.1:6379> zadd myscoreset 100 hao 90 xiaohao
(integer) 2
127.0.0.1:6379> ZRANGE myscoreset 0 -1
1) "xiaohao"
2) "hao"
127.0.0.1:6379> ZSCORE myscoreset hao
"100"
```

- **实战场景**
   - **排行榜**：有序集合经典使用场景。例如小说视频等网站需要对用户上传的小说视频做排行榜，榜单可以按照用户关注数，更新时间，字数等打分，做排行。

学习以上五种基本的Redis数据结构和其相关操作后，我们就能使用Redis进行key的存取修改了。
#### （2).Windows下Redis的安装
Redis官网下载地址：[https://redis.io/download/](https://redis.io/download/)，Redis GitHub下载地址(推荐)：[https://github.com/tporadowski/redis/releases/](https://github.com/tporadowski/redis/releases/)
安装和使用步骤：
1.下载下图中的zip版本，在本地进行解压：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/58feaf44c2851354dc68818ff7cec60b.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/65ac3c0d120627feb3a701980dc82697.png)
2.Windows下Redis的使用方法：
启动服务端：
服务端启动命令：redis-server.exe(如果无法启动服务端，使用命令： redis-server redis.windows.conf  )
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5ca78c7b19c415071c837083528666d7.png)
启动客户端：
客户端启动命令：redis-cli
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/aa8792f561f6dea7ea17a4bd5f6d5a93.png)
启动完服务端和客户端后，在客户端就能使用Redis的命令存取数据了。
#### （3).Redis客户端可视化工具Redis Desktop Manager
Redis Desktop Manager GitHub下载地址：[https://github.com/RedisInsight/RedisDesktopManager/releases/tag/0.9.3](https://github.com/RedisInsight/RedisDesktopManager/releases/tag/0.9.3)
安装和使用步骤：
安装：运行下载好的安装文件redis-desktop-manager-0.9.3.817.exe，点击下一步直到选择安装路径页面，选择合适的安装路径，点击安装即可：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/51713f560a63987a8ec690ac288e4760.png)
使用方法：
1.打开RedisDesktopManager客户端，点击左上方的“连接到Redis服务”，进行Redis服务连接。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/78ca6aff47f0e116b3d017050d032760.png)
2.输入连接相关信息：
连接名称(自定义)，服务端地址(本地默认127.0.0.1)，Redis 端口(默认 6379，验证密码(如没有设置，为空即可)，输入完成后点击下方的测试连接，出现连接成功窗口即可使用(点击右下角的"好"关闭窗口)。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/18c8078a01011bcd2b9c95b71408e674.png)
3.点击左侧的连接图标即可进入查询缓存、添加缓存、删除缓存等。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/09dd2e8b97662a80191823bf2fd9aaa8.png)
#### （4).SpringBoot整合Redis(基于注解)
本小节在6.1节SpringBoot默认缓存管理的基础上引入Redis缓存组件，使用基于注解的方式实现SpringBoot整合Redis。
**添加Redis依赖**：
在SpringBoot_09_defaultCache项目的pom文件中添加Redis依赖，示例如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ec04989dcee211158d5f57cf6f684bc7.png)
**Redis服务连接配置**：
在SpringBoot中使用第三方组件的时候都需要进行服务连接配置(如前面所学的连接MySQL)，在进行配置连接之前，首先需要开启第三方组件的服务，开启服务后在application.properties中添加Redis配置信息，示例如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/313be1ef2ce0aeb66045bc478b3b6f87.png)
**缓存管理器设置：**
在配置文件中修改缓存管理器为Redis缓存管理器：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0405f81d11c8a1814041fe43e8590174.png)
**基于注解的Redis缓存实现：**

- 服务层接口：定义一个服务层接口IBooksServiceRedisAnnotation，在其中通过Id查询书籍、更新书籍、删除书籍的方法。
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/43b00700a952d75643a630849b8d8bdf.png)
- 服务层接口实现类：定义一个服务层接口实现类BooksServiceRedisAnnotationImpl并实现IBooksServiceRedisAnnotation接口的方法。
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0009f33a8393febe7b2713997bc5c35e.png)
- 实体类序列化：Book实体类实现JDK自带的序列化接口Serializable(实现Serializable接口作用：将对象换为字节流，使其可以在网络上传输，与序列化相对的是反序列化，它将流转换为对象。这两个过程结合起来，可以实现数据的存储和网络数据。此处需要将数据缓存进Redis，如果传输的实体类对象不实现Serializable接口，会报IllegalArgumentException异常)。
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/da7367632d9d90d69059c41e205fa1b0.png)
   - 未实现Serializable接口的异常：
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/055fd232563587621eab0238c9ea2eb2.png)
- 控制层开发：修改6.1小节使用的controller层接口，注入IBooksServiceRedisAnnotation对象，并添加一个新的方法deleteBook(Integer id)来实现删除接口。
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/3c7cc9a141f032531864f506416f4f40.png)
- ID查询功能测试：使用postman测试通过id查询书籍的接口，通过GET请求多次调用“http://localhost:8080/books/1”，查询id为1的书籍信息，可以看到postman中总是显示这一条数据，但是控制台只会输出第一次查询的SQL日志信息，往后的每一次调用接口都从缓存中获取数据。

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fd79331ddfeb528a489d1f56c7e1e2d4.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a8af93bb28a73acb81c53ce31f94edb9.png)
打开RedisDesktopManager客户端可以看到名为bookCache的名称空间中key为“bookCache::1”的缓存数据已经被Redis成功获取，其中的value数据经过JDK的默认序列化格式化转变为HEX格式被存入缓存中。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/443cad97be79f5a0b28d5e414da720a1.png)

- 更新功能测试：使用postman测试更新书籍的接口，通过PUT请求调用“http://localhost:8080/books”，请求体输入需要更改书籍的JSON数据(修改id为1的数据)，调用接口可以看到postman中返回调用成功的信息，控制台输出更新数据的SQL日志信息，接着通过GET请求多次调用“http://localhost:8080/books/1"，可以看到控制台没有打印查询的SQL日志信息，并且postman中返回了更新后的正确结果，表明@CachePut缓存更新配置成功。

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8e7cf3dcd16d7f3459b8dcb3297fe23d.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/79957bbb8d52aebe77feacd0d657889a.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c1be8d61d7b5d4d3e7de793b463205ba.png)

- 删除功能测试：使用postman测试删除书籍的接口，通过DELETE请求调用“http://localhost:8080/books/1”删除ID为1的数据，调用接口可以看到postman中返回调用成功的信息，控制台输出删除数据的SQL日志信息，接着通过GET请求调用“http://localhost:8080/books/1"，可以看到控制台打印了查询的SQL日志信息，并且无法查询出已经删除的书籍信息，表明缓存已经删除。通过RedisDesktopManager客户端可以看到名为bookCache的名称空间已经删除。

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8a638ed948f2050f7a763ef38ac0f8a7.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e1beb2c7d6b7d9ca75f25d3aeb43363c.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/86ca7c114bfc8561f0e878732e5cb398.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/87856fecca7f31c10df85d97d3a88c9f.png)
除了使用@CacheEvict注解删除缓存，我们还可以为缓存配置有效时间，待缓存存活的时间超过设置的有效时间后，系统会自动删除，配置如下(全局配置，且对API实现的Redis缓存不生效)：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b98b4bdb074e13454aa7b9b4746f5e4c.png)
#### （5).SpringBoot整合Redis(基于API)
在SpringBoot中整合Redis，除了基于注解形式的Redis缓存实现外，还有开发中最常用的一种方式-基于API的Redis缓存实现，下面我们通过Redis API演示使用SpringBoot整合Redis的具体实现。
在本小节中，我们使用RedisTemplate(Spring Data Redis 提供的一个用于操作 Redis 数据库的模板类)来执行缓存操作，以下是RedisTemplate在SpringBoot项目中的使用，以及如何操作5种基础数据类型(使用前需要注入RedisTemplate对象，或者new一个RedisTemplate对象)：
##### 1).使用RedisTemplate操作5种基础数据类型
1.opsForValue()：获取用于操作字符串类型的值的 ValueOperations 对象。这个对象提供了一系列操作字符串的方法，比如设置值、获取值、递增等。
```java
// 获取 ValueOperations 对象
ValueOperations<String, String> opsForValue = redisTemplate.opsForValue();

// 设置值
opsForValue.set("key", "value");

// 获取值
String value = opsForValue.get("key");

// 递增操作
opsForValue.increment("counter", 1);

// 设置带有过期时间的值
opsForValue.set("keyWithExpiration", "value", 10, TimeUnit.SECONDS);
```
2.opsForList()：用于获取操作列表类型的值的 ListOperations 对象。这个对象提供了一系列操作列表的方法，比如在列表头部或尾部添加元素、获取范围内的元素等。
```java
// 获取 ListOperations 对象
ListOperations<String, String> opsForList = redisTemplate.opsForList();

// 在列表尾部添加元素
opsForList.rightPush("myList", "element1");

// 在列表头部添加元素
opsForList.leftPush("myList", "element2");

// 获取范围内的元素
List<String> elements = opsForList.range("myList", 0, -1);
```
3.opsForSet() 用于获取操作集合类型的值的 SetOperations 对象。这个对象提供了一系列操作集合的方法，比如添加元素、移除元素、获取集合的大小等。
```java
// 获取 SetOperations 对象
SetOperations<String, String> opsForSet = redisTemplate.opsForSet();

// 添加元素
opsForSet.add("mySet", "element1", "element2", "element3");

// 移除元素
opsForSet.remove("mySet", "element2");

// 获取集合的大小
Long size = opsForSet.size("mySet");

// 获取所有元素
Set<String> elements = opsForSet.members("mySet");
```
4.opsForZSet() 用于获取操作有序集合类型的值的 ZSetOperations 对象。这个对象提供了一系列操作有序集合的方法，比如添加元素、按照分数范围获取元素等。
```java
// 获取 ZSetOperations 对象
ZSetOperations<String, String> opsForZSet = redisTemplate.opsForZSet();

// 添加元素
opsForZSet.add("myZSet", "element1", 1.0);
opsForZSet.add("myZSet", "element2", 2.0);

// 获取指定范围的元素
Set<String> elementsInRange = opsForZSet.rangeByScore("myZSet", 1.0, 2.0);
```
5.opsForHash() 用于获取操作哈希类型的值的 HashOperations 对象。这个对象提供了一系列操作哈希的方法，比如设置字段值、获取字段值、获取所有字段等。
```java
// 获取 HashOperations 对象
HashOperations<String, String, String> opsForHash = redisTemplate.opsForHash();

// 设置字段值
opsForHash.put("myHash", "field1", "value1");
opsForHash.put("myHash", "field2", "value2");

// 获取字段值
String value = opsForHash.get("myHash", "field1");

// 获取所有字段
Map<String, String> allFields = opsForHash.entries("myHash");
```
这只是 RedisTemplate 提供的一部分常用方法，可以根据实际需求选择合适的方法进行操作。具体的使用方式可以根据 Spring Data Redis 的文档进行详细了解。
##### 2).基于API的Redis缓存实现
本小节在6.2节SpringBoot默认缓存管理的基础上新建一个服务类使用Redis API来进行数据缓存。

- 服务层接口：定义一个服务层接口IBookServiceRedisApi，在其中通过Id查询书籍、更新书籍、删除书籍的方法。
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/407700a5feaaf9562e49e305e4dd833c.png)
- 服务层接口实现类：定义一个服务层接口实现类BookServiceRedisApiImpl并实现IBookServiceRedisApi接口的方法。
```java
@Service
public class BookServiceRedisApiImpl implements IBookServiceRedisApi {

    @Autowired
    BookMapper bookMapper;

    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public Book getById(Integer id) {
        //从缓存中查询数据
        Object obj = redisTemplate.opsForValue().get("book_" + id);
        if(Objects.isNull(obj)){
            //如果缓存中没有，去数据库中查，并将结果进行缓存
            Book book = bookMapper.selectById(id);
            if(!Objects.isNull(book)){
                //缓存时间为1天
                redisTemplate.opsForValue().set("book_" + id,book,1, TimeUnit.DAYS);
                return book;
            }else {
                return null;
            }
        }else{
            //如果缓存中有，直接返回数据
            return (Book) obj;
        }
    }

    @Override
    public Book updateBook(Book book) {
        int res = bookMapper.updateById(book);
        if(res > 0){
            //如果更新成功，则更新缓存
            redisTemplate.opsForValue().set("book_" + book.getId(),book);
            return book;
        }else {
            return null;
        }
    }

    @Override
    public Boolean deleteBook(Integer id) {
        int res = bookMapper.deleteById(id);
        if(res > 0){
            //如果删除成功，则删除缓存
            redisTemplate.delete("book_" + id);
            return true;
        }
        return false;
    }
}
```

- 控制层开发：修改上一小节使用的controller层接口，注入IBookServiceRedisApi对象，其他不变。

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/df3a8d43e7909173b06e1bda62534d0b.png)
至此本小节基于API的Redis缓存实现完毕，需要补充的是，基于API的Redis缓存实现不需要在SpringBoot启动类上添加@EnableCaching注解，所以可以在此处选择删除添加在启动类上的@EnableCaching注解，也可选择不管，添加该注解与否不影响基于API的Redis缓存的使用。
另外，无论是基于API的Redis缓存还是基于注解的Redis缓存都需要在pom文件中引入Redis的依赖，并在配置文件中配置Redis的连接信息，同事在实体类上实现序列化接口，这些相关的配置此前已经实现，此处不再重复。
本小节完成基于API的Redis缓存后，就可以进行缓存功能的测试，测试步骤与上一小节完全相同，此处不再进行重复演示。
相对使用注解的方式，使用Redis API进行数据缓存更加灵活，例如进行手机登录验证，灵活设置验证码过期时间，但是代码量也会随之增加。
#### （6).自定义Redis缓存序列化机制
前面我们已经实现了SpringBoot整合Redis进行数据的缓存管理，但是缓存的实体类数据在Redis中是以HEX格式进行保存的，不便于我们使用RedisDesktopManager进行查看和管理。本小节将介绍Redis序列化机制的实现原理以及如何自定义Redis序列化机制进行数据缓存管理。
##### 1).Redis默认序列化机制
基于API的Redis缓存是基于RedisTemplate模板类来实现的，打开RedisTemplate类，查看该类的信息。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/00558cafb2ab187f37a2f0f67e125e1a.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0ba976b93920918f917442f18fdc6898.png)
在RedisTemplate内部声明了缓存数据key、value、hashKey、hashValue的序列化方式和默认的序列化方式变量defaultSerializer(5个变量的初始值均为null)，在afterPropertiesSet()方法中进行了判断：如果defaultSerializer的值为null，则将defaultSerializer赋值为JdkSerializationRedisSerializer，enableDefaultSerializer默认值为true，后续判断会将缓存数据key、value、hashKey、hashValue的序列化方式均设置为defaultSerializer的值，即为JdkSerializationRedisSerializer。经过上述源码分析，我们可以知道使用RedisTemplate的时候如果不手动设置defaultSerializer的值，则会默认使用Jdk序列化机制。如果我们在自定义的配置类中修改defaultSerializer的值，或者直接定义key、value、hashKey、hashValue的序列化方式，即可自定义我们需要的序列化机制。
进入到RedisSerializer接口中我们可以看到该接口的具体实现，在2.5.5版本的Redis依赖下RedisSerializer接口有7个默认的实现类，其中JdkSerializationRedisSerializer是JDK自带的序列化实现方式，我们可以根据需要自行选择其他的6中序列化方式。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/3b6a706b9f671b0963c91c54fe8a97bd.png)
**RedisTemplate 中常用的几种序列化机制：**

1. **JdkSerializationRedisSerializer:**
   - 使用 Java 序列化机制，将对象序列化为字节数组。缺点是序列化后的数据较大，可读性差，且不够灵活。
2. **StringRedisSerializer:**
   - 将对象序列化为字符串，适用于存储简单的字符串数据。
3. **GenericJackson2JsonRedisSerializer:**
   - 使用 Jackson 库将对象序列化为 JSON 格式的字符串，可读性好，且支持复杂对象。
4. **OxmSerializer:**
   - 使用 Spring O/X Mapping 框架进行对象的序列化和反序列化。
5. **ByteArrayRedisSerializer:**
   - 直接将对象序列化为字节数组，适用于存储二进制数据。
6. **Jackson2JsonRedisSerializer:**
   - 用于将对象序列化为JSON格式的字符串，以便在Redis中存储。使用Jackson库来实现JSON的序列化和反序列化。
##### 2).自定义RedisTemplate序列化机制
经过上述源码的分析，我们知道，只要在初始化RedisTemplate对象的时候修改defaultSerializer的值，即可更改RedisTemplate的序列化机制，初始化对象在SpringBoot提供的RedisAutoConfiguration配置类中完成的，首先我们对RedisAutoConfiguration类的关键代码进行分析。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b73be5fc9986003de3bb34fc3ffcceb1.png)
RedisAutoConfiguration是一个自动配置类，用于配置RedisTemplate和相关的Redis组件；
**@Configuration: **标注RedisAutoConfiguration是一个配置类，用于声明Bean。
**redisTemplate**(RedisConnectionFactory redisConnectionFactory)方法上的@Bean注解声明了一个Bean，用于创建**RedisTemplate**对象；
**@ConditionalOnMissingBean(name = "redisTemplate")**注解表示只有当名为redisTemplate的Bean不存在时，才会创建RedisTemplate。这意味着如果用户已经自定义了redisTemplate的Bean，自动配置将不会覆盖用户的配置。
**redisTemplate()方法内部**通过Redis连接工厂初始化一个RedisTemplate；
经上述分析，只要我们自定义一个配置类，声明一个名为**redisTemplate**的Bean，在配置类中通过连接工厂初始化一个RedisTemplate，此时设置RedisTemplate对象的defaultSerializer属性的值，即可完成自定义序列化配置。
**自定义序列化配置类：**
在SpringBoot_09_defaultCache项目中的com.xyzy包下创建名为config的包，在该包下创建一个名为RedisConfig的Redis自定义配置类，示例如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f68a8c7a090d7906385805ffbcaa5548.png)
上述配置类中指定了key、value、hashKey、hashValue缓存数据的序列化方式，现在进行测试：
启动SpringBoot项目，通过GET请求访问"http://localhost:8080/books/5多次，SQL查询只进行了一次，说明Redis缓存生效，使用RedisDesktopManager查看缓存数据，可以看到value数据成功转化为JSON数据，说明自定义的Redis配置类生效。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a418a157b601433ecbd77e0c2874e621.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/be7d4543ce2760ba40b04c6fe455aced.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/910e4f224540c9b2d0738f0394c477b3.png)

## 7.SpringBoot消息服务
在实际的项目开发中，特别是在物联网或者硬件相关的行业项目中，经常需要与其他的系统进行集成交互，共同完成相关的业务功能，这种情况下最原始的做法是不同系统中程序内部相互调用，但是这种方法代码耦合度高，不利于代码的维护和扩展，除此之外，还可以使用消息队列进行业务处理，使用消息队列处理业务能够提升系统的异步通信和扩展解耦能力。SpringBoot对第三方消息队列中间件(又称消息中间件)提供了非常好的支持，本章将针对SpringBoot的消息服务进行介绍，完成SpringBoot与常用第三方消息中间件的整合。
### 7.1.消息队列
#### （1).消息队列概述和作用
**什么是消息队列：**

- **消息队列(Message Queue)**是一种用于在应用程序之间传递消息的通信方式，消息队列允许应用程序异步地发送和接收消息，并且不需要直接连接到对方。
- **消息(Message)**是指在应用间传递的数据。消息可以非常简单，比如只包含文本字符串，也可以更复杂，如包含对象的JSON数据。
- **队列(Queue)**是一种数据结构，可以存储数据，数据从队头依次进入，从队尾依次弹出，具有先进新出的特性，能保证消息按进入队列的顺序依次被消费。

**消息队列的作用和应用场景：**
在多数应用系统中，消息服务是不可或缺的重要部分，使用消息队列可以解决很多复杂的业务，如异步处理、流量削峰、分布式解耦、分布式事务管理等，使用消息服务可以实现一个高性能、高可用、高扩展的系统。
以下是常见的消息队列应用场景：

- **应用解耦：**
   - 未使用消息队列：现有一个生产UserId的系统A，和使用系统A提供UserId的系统B、C、D，当系统B、C、D需要使用系统A提供支持的时候，需要在系统A中调用其他系统的接口，如果其他某一个系统后续不需要A提供支持了，系统A中的代码还需要删除对应的操作，使得代码耦合度高，维护功能需要频繁修改代码。
      - 系统A接入B、C系统
   - ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fdb5655ca8504f84fa2db2716f337ccb.webp)
```java
伪代码示例：
public class SystemA {

    // 系统B和系统C的依赖
    SystemB systemB = new SystemB();
    SystemC systemC = new SystemC();

    // 系统A独有的数据userId
    private String userId = "JavaID";

    public void doSomething() {

        // 系统B和系统C都需要拿着系统A的userId去操作其他的事
        systemB.SystemBNeed2do(userId);
        systemC.SystemCNeed2do(userId);

    }
}
```

      - 系统A接入新接入D系统，删除B系统
   - ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/431c2dcd6eba7ffe4db038884db12b5f.webp)
```java
伪代码示例：
public class SystemA {

    // 已经不再需要系统B的依赖了
    // SystemB systemB = new SystemB();

    // 系统C和系统D的依赖
    SystemC systemC = new SystemC();
    SystemD systemD = new SystemD();

    // 系统A独有的数据
    private String userId = "JavaID";

    public void doSomething() {


        // 已经不再需要系统B的依赖了
        //systemB.SystemBNeed2do(userId);

        // 系统C和系统D都需要拿着系统A的userId去操作其他的事
        systemC.SystemCNeed2do(userId);
        systemD.SystemDNeed2do(userId);

    }
}
```

   - 使用消息队列：系统A只负责把数据写到队列中，谁想要或不想要这个数据(消息)，系统A一点都不关心。 即便现在系统D不想要userId这个数据了，系统B又突然想要userId这个数据了，都跟系统A无关，系统A一点代码都不用改。 系统D拿userId不再经过系统A，而是从消息队列里边拿。系统D即便挂了或者请求超时，都跟系统A无关，只跟消息队列有关，这样就实现了系统A与系统B、C、D都解耦了。
   - ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/671fbbf630c131dd4fbef01fad2b98e6.webp)
- **异步处理**
   - 以12306购票软件场景为例：
   - 串行处理请求方式：如果不使用MQ，那么我们的代码必然耦合在一起，下单成功后，依次要通过RPC远程调用这几个系统，然后同步等到他们的响应才能返回给用户是否成功的结果。假设库存、短信、邮件每个系统耗时200ms，那么就得花费600ms。这种串行处理请求的方式非常耗时，用户体验不友好。
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f372481d65ed540139ec4ec1e2ba976a.png)
   - **使用消息队列异步请求：**所以我们可以将这个逻辑我们可以设计成异步的。我们可以当下单成功后，只需要将订单消息发给MQ，然后立即将结果返回通知客户。这才是正确的打开姿势。这样一来，我订单系统只需要告诉MQ，用户下单成功了，其他模块收到消息后，该发短信的发短信，发邮件的发邮件。再加上MQ的性能本身就很好，系统的效率相较此前会提升很多。
- ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bb612f919e34c775b498674a55d9e3af.webp)
- **流量削峰/限流**
   - 以12306购票软件场景为例：
   - 平时可能买票的人不多，所以订单系统的QPS( 每秒查询率 )也不是很高，每秒也就处理1000个请求，但是一到节假日、春运期间可能抢票的人就非常多，并发量远远大于平时，这个时候，订单系统明显扛不住了。怎么办呢，当然我们可以设计，弹性伸缩的集群，进行机器扩容，保证高可用。我们依然可以采用MQ来解决这个问题。
- ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bba659ebc0f277d0bff6361015824b1e.png)
   - 我们可以设计高可用的MQ，让所有的请求都到MQ，缓存起来。这样一来高峰期的流量和数据都将积压在MQ中，流量高峰就被削弱了（削峰），然后我们的订单系统就避免了，高并发的请求，订单系统可以慢慢的从MQ中拉取自己能力范围内的消息就行处理。这样一来，高峰期积压的消息也终将被消费完
#### （2).常用的消息中间件
消息中间件是一种用于在分布式系统中传递消息的软件组件或服务。它提供了一种异步通信的机制，允许不同的应用程序、服务或组件在彼此之间发送和接收消息，而无需直接耦合彼此的实现。目前市面上流行的消息中间件有很多，它们的侧重点各有不同，接下来我们对常用的消息中间件进行介绍。

1. **Kafka：** Apache Kafka是一个开源的分布式流处理平台，最初由LinkedIn开发并开源。它被设计用于构建实时数据管道和流应用程序，吞吐量高，能够处理大规模的实时数据流。Kafka在许多场景中都得到了广泛的应用，包括日志收集、事件驱动架构、实时分析等。它的灵活性和可扩展性使其成为构建大规模、高性能实时数据处理系统的理想选择。
2. **RocketMQ：**Apache RocketMQ是一个开源的分布式消息中间件系统，由阿里巴巴集团开发并贡献给Apache软件基金会。它被设计用于构建可靠的、高性能的消息通信系统，它单机吞吐量十万级，可用性非常高，分布式架构，消息可以做到0丢失，适用于大规模的分布式架构。RocketMQ被广泛应用于多个行业，包括电商、金融、物联网等，以提供可靠的消息传递服务。
3. **ActiveM**Q： Apache ActiveMQ 是 Apache 软件基金会研发的开放源代码消息中间件，基于 Java 开发，完全支持 JMS1.1 和 J2EE 1.4 规范的 JMS(Java Message Service：一种Java平台上用于实现消息传递的API规范)实现、ActiveMQ丰富的API和多种集群构建模式使得它早期广泛应用于中小企业中。相较后续出现的Kafka、RocketMQ、RabbitMQ等消息中间件，ActiveMQ性能较弱，在高并发、大数据处理的场景下能力稍显不足，容易出现消息延迟、阻塞等现象
4. **RabbitMQ**：RabbitMQ是一个开源的高性能的分布式消息中间件系统，使用Erlang语言开发,实现了高级消息队列协议AMQP（Advanced Message Queuing Protocol），AMQP是一种开放标准的网络协议，用于异步消息传递。它旨在提供高级的消息队列服务，支持跨网络的、异步的、分布式的消息通信。AMQP的目标是提供一个通用的、灵活的框架，使得不同的消息中间件系统能够遵循相同的协议进行通信，从而实现跨平台、跨语言的消息传递。正是基于AMQP协议的各种性能优势，使得RabbitMQ在开发中十分受欢迎。

本章将使用RabbitMQ作为SpringBoot整合的消息中间件，后续的学习内容将基于RabbitMQ相关知识进行展开。
### 7.2.RabbitMQ消息中间件
#### （1).Rabbit的工作流程
 RabbitMQ 本质是 AMQP 协议的一个开源实现，在AMQP协议中定义了消息队列的消息代理流程，在学习代理流程前我们先要了解AMQP 的一些基本概念：

- **Publisher**：消息的生产者，也是一个向交换器发布消息的客户端应用程序
- **Exchange**：交换器，用来接收生产者发送的消息并将这些消息路由给服务器中的队列
- **Binding**：绑定，用于将消息队列和交换器之间建立关联。一个绑定就是基于路由键将交换器和消息队列连接起来的路由规则，所以可以将它理解成一个由绑定构成的路由表。
- **Queue**：消息队列，用来保存消息直到发送给消费者
- **Connection**：网络连接，比如一个 TCP 连接
- **Channel**：信道，多路复用连接中的一条独立的双向数据流通道
- **Consumer**：消息的消费者，表示一个从消息队列中取得消息的客户端应用程序
- **Virtual Host**：虚拟主机，表示一批交换器、消息队列和相关对象。虚拟主机是共享相同的身份认证和加密环境的独立服务器域。每个 vhost 本质上就是一个 mini 版的 RabbitMQ 服务器，拥有自己的队列、交换器、绑定和权限机制。vhost 是 AMQP 概念的基础，必须在连接时指定，RabbitMQ 默认的 vhost 是名称为  "/"的虚拟主机
- **Broker**：表示消息队列服务器实体

RabbitMQ的消息代理的执行流程如下：

1. 生产者(Publisher)向RabbitMQ的Broker进行申请，连接到 服务器，并建立一个连接（Connection），开启一个信道(Channel)。
2. 生产者声明交换器(Exchange)和队列(Queue)，设置相关属性，并通过路由键将交换器和队列进行绑定(Binding)。
3. 消费者(Consumer)也需要进行建立连接，开启信道等操作，便于接收消息。
4. 生产者发送消息，发送到服务端中的虚拟主机中的交换器。
5. 虚拟主机中的交换器根据路由键选择路由规则，发送到不同的消息队列中。
6. 订阅了消息队列的消费者就可以获取到消息，进行消费。

以下为消息队列的消息代理流程图：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cd02f97392f9ad8f7f6a1349a8769661.png)
简要过程：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/59af543777368f4d5caf873f81061835.png)
#### （2).Rabbit的交换器分发策略与工作模式
当消息的生产者将消息发送到交换器之后，是不会存储消息的，而是通过中间层绑定关系将消息分发到不同的队列上，其中交换器的分发策略分为四种：Direct、Topic、Headers、Fanout，这四种交换策略可以实现RabbitMQ的多种工作模式，以满足不同服务的需求。
**交换器分发策略：**
**1.Direct**
Direct 是 RabbitMQ 默认的交换机模式，也是最简单的模式，消息中的路由键（routing key）如果和 Binding 中的 binding key 一致， 交换器就将消息发到对应的队列中，例如：如果传入的 routing key 为 black，则不会转发到black.green，Direct 类型交换器是完全匹配、单播的模式。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9bf0e504c83b3d55481d4db7037c49ac.png)
**2.Topic**
Topic 类型交换器转发消息和 Direct 一样，不同的是：它支持通配符转发，相比 Direct 类型更加灵活！
两种通配符：*只能匹配一个单词，#可以匹配零个或多个。如果传入的 routing key 为 black#，不仅会转发到black，也会转发到black.green。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/16f57c2219ae84db297a1d326fb72d60.png)
**3.Headers**
headers 也是根据规则匹配, 相比 direct 和 topic 固定地使用 routing_key , headers 则是通过一个自定义匹配规则的消息头部类进行匹配。
在队列与交换器绑定时，会设定一组键值对规则，消息中也包括一组键值对( headers 属性)，当这些键值对有一对, 或全部匹配时，消息被投送到对应队列。
此外 headers 交换器和 direct 交换器完全一致，但性能差很多，目前几乎用不到了。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/113cf304f5eb7d640d5fbd8f316f3dc2.png)
**4.Fanout**
Fanout 类型交换器与上面几个不同，**不管路由键或者是路由模式，会把消息发给绑定给它的全部队列**，如果配置了 routing_key 会被忽略，也被成为消息广播模式。很像子网广播，每台子网内的主机都获得了一份复制的消息,fanout 类型转发消息在四种类型中是最快的。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fadf26b63188e9cf1f3385bd5463d801.png)
**RabbitMQ常用工作模式：**
RabbitMQ工作模式则是依照于所选择的交换器的分发策略来实现的。
**1.Work queue(工作队列/直连模式)**
在工作队列模式模式中，不需要手动设置交换器，RabbitMQ内部使用默认的Direct交换器，需要为消费者指定唯一的消息队列进行消息传递，并且可以有多个消息消费者。在这种模式下，多个消息消费者通过轮询的方式依次接收消息队列中存储的消息，一旦消息被某一个消费者接收，消息队列会将消息移除，而接收并处理消息的消费者必须在消费完一条消息后再准备接收下一条消息，工作队列模式与Direct交换器分发策略类似，不同的是无需指定routing key，消息队列也只有一个。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e446e3bfb27dfa51d3f3a4e7f10b0c9d.png)
使用场景：适用于那些较为繁重，并且可以进行拆分处理的业务，这种情况下可以分派给多个消费者轮流处理业务，例如：短信服务部署多个，只需要有一个节点成功发送即可。
**2.Publish/Subscribe（发布订阅模式）**
在订阅模型中，多了一个 Exchange 角色，而且过程略有变化：
生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发给X（交换机）;
消费者，消息的接收者，会一直等待消息到来;
消息队列，接收消息、缓存消息;
交换机一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型。发布订阅模式中Exchange的选型有常见以下3种类型：
Fanout：广播，将消息交给所有绑定到交换机的队列
Direct：定向，把消息交给符合指定routing key 的队列
Topic：通配符，把消息交给符合routing pattern（路由模式） 的队列
如果没有任何队列与 Exchange 绑定，或者没有符合路由规则的队列，那么消息会丢失。
使用场景：适用于进行相同业务功能处理的场景，例如：用户注册成功后，需要同时发送短信和邮件通知用户，那么邮件服务消费者和短信服务消费者需要共同消费"用户注册成功"这一条消息。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b7a0e90d6257b42163d1ca503ee08702.png)
**3.Routing（路由模式）**
在Routing工作模式中，必须先配置一个direct类型的交换器，并指定不同的路由键值（Routing key）将对应的消息从交换器路由到不同的消息队列进行存储，由消费者进行各自消费，路由模式与Direct交换器分发策略完全一致。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5d155a9e5b8e5f180e2a8361aa724412.png)
使用场景：适用于进行相同业务功能处理的场合。
**4.Topics（通配符模式）**
在Topics工作模式中，必须先配置一个topic类型的交换器，并指定不同的路由键值（Routing key）将对应的消息从交换器路由到不同的消息队列进行存储，然后由消费者进行各自消费，例如：item.# 能够匹配 item.insert.abc 或者 item.insert，item.* 只能匹配 item.insert，通配符模式与Topic交换器分发策略完全一致。
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/52e9c3a371a95bffc5c065b461d346b3.png)
使用场景：适用于根据不同需求动态传递处理业务的场合。
### 7.3.RabbitMQ安装与环境配置
在使用RabbitMQ之前必须先进行安装和配置，RabbitMQ支持多平台安装，如Linux、Windows、Docker等。这里，我们以Windows环境为例，介绍RabbitMQ的安装配置(以最新的rabbitmq-server-3.12.10版本下载安装配置为例)。
#### （1).Erlang语言安装
在Windows环境下载安装RabbitMQ之前，我们需要安装Erlang语言(RabbitMQ基于Erlang开发)，进入RabbitMQ官网([https://www.rabbitmq.com/install-windows.html](https://www.rabbitmq.com/install-windows.html))，找到Windows版下载页面：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/de0f63d7a86202dd7402ad0fdbc5cdd7.png)
点击官网下载页面的"Erlang 25.3"链接，进入Erlang语言下载页面，点右侧的"Download Windows installer"下载Erlang 25.3安装文件，下载到本地后进行安装即可(必须使用管理员身份进行安装)。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5d8676e91ec21355643025929090bfb9.png)
Erlang环境变量配置：
进入我的电脑-系统属性-高级系统配置，进行Erlang的环境变量配置，点击系统变量Path，新建环境变量，将Erlang安装路径的bin目录配置其中；
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5d23342085eff1333478157b9353d262.png)
#### （1).Rabbit的安装与配置
**RabbitMQ安装：**
点击官网下载页面的"rabbitmq-server-3.12.10.exe "链接，下载rabbitmq3.12.10安装文件，下载到本地后双击文件rabbitmq-server-3.12.10.exe，安装至合适位置（注意不要安装在包含中文和空格的目录下)安装后window服务中就存在rabbitMQ了，并且是启动状态。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/301d8f53230f151e547aef4a9ecd7772.png)
**RabbitMQ管理界面配置：**
RabbitMQ默认提供了两个端口号"5672"与"15672"，启用5672是RabbitMQ的服务端口号，15672是可视化管理端口号，在浏览器上访问"http://127.0.0.1:15672"通过可视化的方式查看RabbitMQ。
因为RabbitMQ默认禁用了管理界面，所以要通过命令重新开启管理界面，方法如下：
1.进入rabbitMQ安装目录的sbin目录，点击上方的路径框输入cmd，按下回车键，进入命令行窗口；
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/829eae35b54c143d09b7a1c81ce19769.png)
2.输入命令"rabbitmq-plugins enable rabbitmq_management"点击回车；
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2a478249dd32d7c609bcdf30b9f1a9be.png)
3.重启服务，双击sbin目录中的rabbitmq-server.bat文件（双击后可能需要等待一会）
4.打开浏览器，地址栏输入http://127.0.0.1:15672 ,即可看到管理界面的登陆页，输入用户名和密码(都为guest)，进入主界面：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4bf349a8bc4b127ce7de09f774464402.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/86f862b9f697717f9f00cbe70eb35793.png)
上图就是RabbitMQ的可视化管理页面，页面中显示RabbitMQ和Erlang的版本以及用户信息等，最上侧的导航依次是：概览、连接、信道、交换器、队列、用户管理在内的管理面板。
### 7.4.SpringBoot整合RabbitMQ
#### （1).基础环境搭建
完成RabbitMQ的安装后，下面我们开始对SpringBoot整合RabbitMQ的环境进行搭建，步骤如下：

- 创建名为SpringBoot_10_RabbitMQ的项目，引入SpirngWeb、Lombok依赖，如下图所示：

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c2afcc9aa2c93d4795f8785a330f41c1.png)

- 添加RabbitMQ依赖：打开pom文件添加RabbitMQ依赖坐标；

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/1f8c171841d527afde79c2d1a64d6674.png)

- 配置文件编写：打开application.properties全局配置文件，在配置文件中编写RabbitMQ服务的连接配置(账号密码默认使用guest可以不进行配置)；

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5fc112cc2e45333270c5e5d0c1c63667.png)
以上内容就是该项目的基本环境，完成基本环境搭建后，我们将进行基于配置(基于API使用较少)的方式实现开发中常使用的4种工作模式：Work queue、Publish/Subscribe、Routing和Topic。
#### （2).Work queue(工作队列/直连模式)实现
SpringBoot整合RabbitMQ中间件实现消息服务，主要围绕3个部分的工作进行展开：定制中间件(注册交换机、队列、路由键以及绑定交换机和队列)、开发消息生产者发送消息和开发消费者接受消息。4种工作模式的实现我们都将围绕这些工作进行展开。
**定制中间件：**
本小节通过配置类的方式，注册交换机、队列、路由键的Bean，来实现中间件的定制工作：
在com.xyzy包下新建一个名为config的包，在该包下新建一个DirectRabbitConfig配置类用于配置定制中间件相关的Bean。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7308848e6ee0b6efc50b71d8edcafd7a.png)
**org.springframework.amqp.core**核心包介绍：
org.springframework.amqp.core 是 Spring AMQP 框架中的一个核心包，提供了一组用于定义 AMQP（Advanced Message Queuing Protocol）消息交换、队列和绑定的类。Spring AMQP 用于简化在基于消息的应用程序中使用 RabbitMQ 或其他 AMQP 提供者的开发。
下面是一些 org.springframework.amqp.core 包中主要类的简要介绍：

1. **Exchange（交换机）**:
   - **DirectExchange**: 直接交换机，根据消息的路由键将消息直接发送到指定队列。
   - **FanoutExchange**: 扇形交换机，将消息广播到所有绑定的队列。
   - **TopicExchange**: 主题交换机，根据消息的路由键进行模式匹配，发送消息到匹配的队列。
   - **HeadersExchange**: 根据消息的头信息进行匹配，发送消息到匹配的队列。
2. **Queue（队列）**:
   - **Queue**: 定义一个队列，用于存储消息。
3. **Binding（绑定）**:
   - **Binding**: 将交换机和队列通过绑定关系连接在一起，定义了消息从交换机到队列的路由规则。
4. **Message（消息）**:
   - **Message**: 表示要发送或接收的消息，包括消息体、头部和属性等信息。
5. **AmqpAdmin**:
   - **AmqpAdmin**: 用于声明交换机、队列和绑定的接口，可以通过它在应用程序启动时创建这些 AMQP 实体。
6. **AmqpTemplate**:
   - **AmqpTemplate**: 提供了发送和接收消息的模板方法，简化了与 AMQP 的交互。

**编写接口进行消息推送(Publisher)：**
在com.xyzy包下新建一个名为controller的包，在该包下新建一个RabbitMQController控制层类用于向指定的交换器内推送消息。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/46cd608b632e5ff3d80ae2f1f0fb3b0b.png)
**RabbitTemplate**核心类介绍：
RabbitTemplate 是 Spring AMQP 框架中提供的一个核心类，用于简化与 RabbitMQ 代理进行交互的操作。它封装了发送和接收消息的一般性操作，使得在 Spring 应用中使用 RabbitMQ 变得更加方便。
以下是 RabbitTemplate 的一些主要功能和方法：

1. **发送消息：**
   - **convertAndSend(String routingKey, Object message)**: 将消息发送到指定的路由键。
   - **convertAndSend(String exchange, String routingKey, Object message)**: 将消息发送到指定的交换机和路由键。
2. **接收消息：**
   - **receive(String queueName)**: 从指定队列接收消息。返回消息的 **Message** 对象。
   - **receiveAndConvert(String queueName)**: 从指定队列接收消息并将其转换为指定类型的对象。
3. **回调机制：**
   - **send(String exchange, String routingKey, Message message, CorrelationData correlationData)**: 允许使用回调机制来处理消息发送的结果，以及确认消息是否被成功发送到 RabbitMQ 代理。

**启动SpringBoot项目，调用请求：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8932e343451a0ee7ce2f019346666862.png)
调用"http://localhost:8080/rabbitMQ/sendDirectMessage"发送请求后，打开RabbitMQ可视化界面，可以看到消息已经进入到MQ中，点击Exchanges与Queue and Stream窗口可以看到我们注册的"directExchange"交换器和"directQueue"队列，队列中的数据是我们通过"directRoutingKey"路由键推送的。由于还未有消费者接收消息，所以调用请求发送的消息会暂时存在MQ中。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bbe8cd23be6401711bd3b1b83062d718.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/84b5f4ca3fe2607f0b0fb1efa10c01f4.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5f917b16b6a97a3424375c3caf45b17f.png)
**编写消费者监听类消费消息(Consumer)：**
在com.xyzy包下新建一个名为receiver的包，在该包下新建一个DirectConsumer消费者监听类用于接受MQ中已经推送的消息。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/1f7291f63b811976a4ad8f0165234527.png)
消费者相关注解简介：

- **@RabbitListener：** 是 Spring AMQP 框架中用于声明消息监听器的注解。它用于将一个方法标记为 RabbitMQ 消息的消费者，并指定监听的队列或主题交换机。

**1.基本用法：**
```java
@RabbitListener(queues = {"queue1", "queue2"}) //监听多个队列
public void handleMessage(String message) {
    // 处理收到的消息
}
```
2.**监听指定的交换机和路由键：**
```java
@RabbitListener(
    bindings = @QueueBinding(
        value = @Queue(value = "myQueue", durable = "true"),
        exchange = @Exchange(value = "myExchange", type = ExchangeTypes.TOPIC),
        key = "myRoutingKey"
    )
)
public void handleMessage(String message) {
    // 处理收到的消息
}
```

- **@RabbitHandler：** 用于标识消息处理方法。它通常与 @RabbitListener 注解一起使用，用于指定在接收到消息时应该调用的方法。

**重启SpringBoot项目，使消费者监听对应的队列，消费消息：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/51c951fc3936df14a8be2927a8f1305d.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/32e6e2e0085f03f581379cb17168afc2.png)
重启项目后立即看到消费者消费了队列中的消息，并在控制台进行了输出，并且队列中的消息也清零了。至此一条完整的消息发送、消息中间件存储、消息消费的直连模式的案例已经实现。
#### （3).Publish/Subscribe(发布订阅模式)实现
发布订阅模式与直连模式不同是的，在定制中间件配置类中需要配置Fanout类型的交换机，配置多个Queue用于共同接收交换机广播的消息，最后需要将所有的队列一一与Fanout类型的交换机进行绑定。以下是发布订阅模式的实现：
**定制中间件：**
在该config包下新建一个PublishSubscribeConfig配置类用于配置定制中间件相关的Bean。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2b8b0df39aa2186efd9a1146e8fb65ce.png)
**编写接口进行消息推送(Publisher)：**
在RabbitMQController控制层类中新建sendPubSubMessage()方法，用于创建调用发送消息的接口，测试发布订阅模式。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fc4fe228ac14b922d5702a7a57d60a57.png)
**编写消费者监听类消费消息(Consumer)：**
在receiver包下新建一个PubSubConsumer消费者监听类用于接受MQ中推送的消息(多个消费者对应多个传递消息的Queue)。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f9e37de8fc8dedc7272ae7b852151c54.png)
**启动SpringBoot项目，使消费者监听对应的队列，消费消息：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0dc1811b0f8ceaaee37966da375c99cb.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cf0735e7271d2009dc141feb55bb7187.png)这里每调用一次发布订阅模式的接口，多个不同的消息订阅者都接收到了同一条消息并进行了消费，至此一条完整的消息发送、消息中间件存储、消息消费的发布订阅的案例已经实现。
#### （4).Routing(路由模式)实现
路由模式与直连模式类似，它们定制中间件的配置类中都需要配置Direct类型的交换机，不同的是，路由模式一般配置多个Queue用于接收交换机分发的消息，并且每个Queue都可以映射多个RoutingKey。以下是路由模式的实现：
**定制中间件：**
在该config包下新建一个RoutingConfig配置类用于配置定制中间件相关的Bean。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9a39175329e3bd6026d2e06019be9270.png)
**编写接口进行消息推送(Publisher)：**
在RabbitMQController控制层类中新建sendRoutingMessage()方法，用于创建调用发送消息的接口，测试路由模式。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2840afae96d7056cc283bc747b2cad13.png)
**编写消费者监听类消费消息(Consumer)：**
在receiver包下新建一个RoutingConsumer消费者监听类用于接受MQ中推送的消息(多个消费者对应多个传递消息的Queue)。![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/efa3c83f7451d78091a9b68308d9d6e7.png)
**启动SpringBoot项目，使消费者监听对应的队列，消费消息：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a6f3bca4ea2981b5f66b59648062ff65.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/acbf4ef463c6d3d046d98615848d3c76.png)这里调用一次路由模式的接口，两个消息订阅者分别接收到映射了对应RoutingKey的消息，并在控制台打印了出来，至此一条完整的消息发送、消息中间件存储、消息消费的路由模式的案例已经实现。
#### （5).Topic(通配符模式)实现
在通配符模式中，必须先配置一个topic类型的交换器，通配符模式一般配置多个Queue用于接收交换机分发的消息，并且每个Queue都可以映射一个或多个带有通配符的RoutingKey，下面我们以不同用户对邮件和短讯订阅需求的这一场景为例来实现通配符模式。
**定制中间件：**
在该config包下新建一个TopicConfig配置类用于配置定制中间件相关的Bean。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8d5d7cab084aacb65431d19adcd7ab54.png)
**编写接口进行消息推送(Publisher)：**
在RabbitMQController控制层类中新建sendTopicMessage()方法，用于创建调用发送消息的接口，测试通配符模式。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/65b6139cc6810715dd5d5c0d6a7121a0.png)
**编写消费者监听类消费消息(Consumer)：**
在receiver包下新建一个TopicConsumer消费者监听类用于接受MQ中推送的消息(多个消费者对应多个传递消息的Queue)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b081ca7eefad6684d19fad4321feabbd.png)
**启动SpringBoot项目，使消费者监听对应的队列，消费消息：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5b49b79fb45b995399e606c8e6bc4895.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2825f016209317f883fbb495dba446c1.png)
可以看到推送了三条消息，routingKey为"info.email"的消息被推送至topicEmailQueue中，routingKey为"info.sms"的消息被推送至topicSmsQueue中，而routingKey为"info.email.sms"的消息分别被推送至topicEmailQueue和topicEmailQueue中，故最终有四条消息被消费者消费，并在控制台打印了出来，至此一条完整的消息发送、消息中间件存储、消息消费的路由模式的案例已经实现。
#### （6).实体类对象数据推送
**新建实体类User：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/12b3db769284f464cfcd0861ae80c8ca.png)
**配置Queue与RoutingKey：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f4341fb4b80a0e7bd35a081acdf2b8ff.png)
**编写接口进行实体类对象推送：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/548b084ee023b2485fcb6d3bdc5f4bfc.png)
当我们将实体类对象推送至RabbitMQ的时候，如果实体类没有实现序列化的时候，会出现IllegalArgumentException异常，提示我们需要将实体类进行序列化，解决上述问题我们需要进行实体类序列化，有两种方案：一是实现JDK自带的序列化接口Serializable，二是定制其他类型的消息转化器(定制序列化)。第一种方案可视化效果较差，转化后的消息无法识别，所以我们一般实现第二种定制序列化的方式。
IllegalArgumentException异常：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4a5677f610aca5066eb041fe777ea812.png)
实现Serializable的数据：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b3075e8ebb0ab492e04d740accaaac12.png)
**定制序列化：**
要实现定制序列话，需要在配置类中通过@Bean注册一个Jackson2JsonMessageConverter类型的消息转换器组件，该组件的返回值为MessageConverter类型。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ac5de0ae27707701d1f39241ac64d36e.png)
实现JOSN类型的消息转换器后再次发送请求，推送消息，这次可以看到队列中的消息已经是正常的JSON数据了。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a017eee906bb027d548621ced31e2958.png)
**编写消费者监听类消费消息)：**
在DirectConsumer类中新增一个process1方法用于消费消息。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/71a0959d11648860b2c30b72ade66cea.png)
实体类对象被成功接收消费：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/62d8f6d4e9c03973f1c3dacd23464166.png)

## 8.SpringBoot视图技术
在一个Web应用中，通常会采用MVC设计模式实现对应的模型、视图和控制器，其中。视图是用户看到并与之交互的界面。对最初的Web应用来说，视图是由HTML元素组成的静态界面；而后期的Web应用更倾向于使用动态模板技术，从而实现前后端分离和页面的动态数据展示。Spring Boot框架为简化项目的整体开发，提供了一些视图技术支持，并主要推荐整合模板引擎技术实现前端页面的动态化内容，其中Thymeleaf是最为常用的视图技术。
### 8.1.SpringBoot支持的视图技术
前端模板引擎技术的出现，使前端开发人员无需关注后端业务的具体实现，只关注自己页面的呈现效果即可，从而解决了前端代码错综复杂的问题、实现了前后端分离开发。Spring Boot对很多模板引擎技术支持

1. FreeMarker：FreeMarker是一个基于模板生成输出文件文本(HTML页面、电子邮件，配置文件等)的模板引擎，它不是面向最终用户的，而是一个Java类库，是一款程序员可以嵌入所开发产品的组件。
2. Groovy：Groovy是一种基于JVM的敏捷开发语言，它结合了Python、Ruby和Smalltalk的许多强大特性，能够与Java代码很好地结合，也能扩展现有代码。Groovy运行在JVM上，它可以使用Java语言编写的其他库。
3. Thymeleaf：它是一种用于Web和独立环境的现代服务器端的Java模板引擎，其主要目标是将优雅的Java模板带到开发工作流程中，将HTML在浏览器中正确显示，并且可以作为静态原型，让开发团队能够更容易地协作。Thymeleaf能够处理HTML，XML，JavaScript，CSS甚至纯文本。
4. Mustache：Mustache是轻逻辑地模板引擎(Logic-less templates)，它是一个模板，用于对JS进行分离展示。Mustache地优势在于可以应用在JavaScript、PHP、Python、Perl等多种编程语言中。

Spring Boot不太支持常用地JSP模板，并且没有提供对应的整合配置，这是因为嵌入式Servlet容器的Spring Boot应用程序对于JSP模板存在一些限制：

- Spring Boot默认使用的嵌入式Servlet容器以JAR包的方式进行项目打包部署。JAR包方式不支持JSP模板。
- 使用Undertow嵌入式容器部署Spring Boot项目时，不支持JSP模板。
- Spring Boot默认提供了一个处理请求路径"/error"的统一错误处理器，返回具体异常信息。使用JSP模板时，无法使用Spring Boot自带的异常处理器，只能根据要求在Spring项目的指定位置定制错误页面。

以上对SpringBoot支持的模板引擎进行了介绍，并指出了整合JSP模板的一些限制。接下来，本章将选择其中常用的Thymeleaf模板引擎进行介绍，并完成与SpringBoot框架的整合实现。
### 8.2.认识Thymeleaf
Thymeleaf是一种用于Web和独立环境的现代服务器端Java模板引擎。它是为了在Web和非Web环境下支持自然模板的创建而设计的。Thymeleaf能够处理HTML、XML、JavaScript、CSS和纯文本等各种模板。
以下是Thymeleaf的一些主要特点和用途：

1. **自然模板语法：** Thymeleaf的语法设计得非常自然，类似于标准的HTML。这使得模板文件在没有被处理的情况下，仍然可以在浏览器中正常显示。
2. **支持多种模板模式：** Thymeleaf支持多种模板模式，包括HTML、XML、文本等。这使得它在不同场景下都可以灵活运用。
3. **可嵌入性：** Thymeleaf可以直接嵌入到HTML、XML、JavaScript和CSS中，使得模板的编写更加方便。
4. **表达式语言：** Thymeleaf提供了强大的表达式语言（Thymeleaf Expression Language，简称Thymeleaf EL），可以在模板中动态地引用和操作数据。
5. **集成Spring框架：** Thymeleaf广泛用于与Spring框架集成，作为Spring MVC的默认模板引擎。在Spring Boot项目中，通过简单的依赖配置即可使用Thymeleaf。
6. **灵活的模板配置：** Thymeleaf的配置非常灵活，允许开发者根据项目需求进行自定义配置。
7. **易于学习：** Thymeleaf的语法相对简单，易于学习和使用，特别适合开发者在HTML中嵌入动态数据的场景。
8. **强大的生态系统：** Thymeleaf拥有庞大的社区和强大的生态系统，提供了丰富的文档和示例，支持广泛的应用场景。

Thymeleaf的主要应用场景是在服务器端渲染Web页面，特别适用于开发动态、交互性强的Web应用。它的设计目标是在模板中提供更自然的语法，使得非开发人员也能够理解和修改模板。
#### （1).SpringBoot整合**Thymeleaf入门配置**
为了能够快速认识Thymeleaf，本小节通过一个简单的示例对Thymeleaf进行入门讲解(本章主要讲解Thymeleaf对HTML页面的处理，Thymeleaf对其他模板视图的嵌入方法略有不同，在使用时可以自行查看Thymeleaf文档说明)：

- 创建名为SpringBoot_11_thymeleaf的项目，引入SpirngWeb、Lombok、thymeleaf依赖，如下图所示：
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f9c0e1c12be34a489614db0291a82423.png)
- 在application.properties中进行Thymeleaf相关配置：
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2e887db667da84d94c1f845f2c1683c7.png)
- 在resources/templates目录创建一个index.html页面(Thymeleaf模板文件)
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/704c9596f47b95949913f91dd69aabd6.png)
   - 上述代码中的"xmlns:th="http://www.thymeleaf.org""用于引入Thymeleaf模板引擎，关键字“th”标签是Thymeleaf提供的标签，“th:text”用于动态显示标签文本内容。除此之外Thymeleaf模板还提供了很多标签，我们会在后续内容中进行讲解。
- 编写跳转页面的控制层类PageController：
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/94c48a47a423a83be36911465d6bbbeb.png)
   - 此处使用了SpringMVC框架中的**Model**接口，通过使用Model，可以将数据从控制器传递到视图，实现动态的、与业务逻辑相关的页面展示，以便在视图中渲染并呈现给用户。
- 测试页面显示结果(postman请求http://localhost:8080/hello)：
   - ![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f044f3f28c214caea8388b0a0fed3fee.png)
   - 可以看到Thymeleaf模板引擎解析成功，成功地将我们输入的动态数据传输到了html页面。

以上是一个简单的SpringBoot与Thymeleaf的集成示例。通过这个示例我们能够了解在SpringBoot中如何使用Thymeleaf模板引擎，接下来我们来更加深入的学习Thymeleaf相关知识。
#### （2).**Thymeleaf基本语法**
在上一小节中我们使用了“th:text”来动态地显示标签文本内容，除“th:text之外Thymeleaf模板还提供了很多标签，本小节首先来讲解Thymeleaf常用的标签：

1. Thymeleaf 命名空间声明：
```
xmlns:th="http://www.thymeleaf.org"
```

2. 文本替换标签th:text：用于替换元素内的文本内容。
```
<p th:text="${expression}">Default Text</p>
```

3. 条件判断标签th:if和th:unless：根据条件显示或隐藏内容。th:if条件成立时，显示th标签内容，th:unless条件不成立时，显示th标签内容
```
<div th:if="${condition}">Content to be displayed when condition is true</div>
<div th:unless="${condition}">Content to be displayed when condition is false</div>
```

4. 循环标签th:each：用于遍历集合或数组，生成重复的HTML结构。
```
<ul>
    <li th:each="item : ${items}" th:text="${item}">Item Text</li>
</ul>
```

5. URL处理标签th:href：用于设置超链接的URL。
```
<a th:href="@{/user/details/{id}(id=${userId})}">User Details</a>
```

6. 片段引入标签th:include：引入指定片段的内容。
```
<div th:include="fragment :: fragmentName">Content from fragment</div>
```

7. 属性绑定标签th:field：用于绑定表单字段到后端数据模型。
```
<input type="text" th:field="*{propertyName}" />
```

8. 国际化标签th:text：
```
<p th:text="#{message.key}">Default Text</p>
```

9. **内联脚本和样式标签th:inline：**
```
<script th:inline="javascript">
    /* JavaScript code here, can use Thymeleaf expressions */
    var value = [[${variable}]];
</script>

<style th:inline="css">
    /* CSS code here, can use Thymeleaf expressions */
    .class {
        background-color: [[${backgroundColor}]];
    }
</style>
```

10. **单选框和复选框标签th:field：**
```
<input type="radio" th:field="*{propertyName}" th:value="optionValue" />

<input type="checkbox" th:field="*{propertyName}" th:value="optionValue" />
```

11. **动态引入资源标签th:href和th:src（例如，JS和CSS文件）：**
```
<link th:href="@{/css/style.css}" rel="stylesheet" />

<script th:src="@{/js/script.js}"></script>
```
需要说明的是，上述操作是以HTML为基础嵌入了Thymeleaf模板引擎，并使用th:*属性进行了页面需求开发。这种Thymeleaf模板页面虽然与纯HTML页面基本相似，但已经不是一个标准的HTML5页面了，这是因为在Thymeleaf页面中使用的th:*属性是HTML5规范所不允许的。如果我们想要使用Thymeleaf页面进行纯HTML5的页面开发，可以使用data-th-*属性替换th:*属性进行页面开发，例如使用data-th-text 将表达式的结果应用到元素的 data-text 数据属性上：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e415c84bc89fb75dcf44255bdb434422.png)
上述代码中，使用标准HTML5语法格式嵌入了Thymeleaf模板引擎进行页面动态数据展示。在使用data-th-*属性时，不需要引入Thymeleaf标签，并且属性名要使用data-th-*的形式。不过使用这种方式不会出现属性的快捷提示，对于开发来说比较麻烦，因此在实际开发中，相对推荐使用Thymeleaf标签的形式进行模板引擎页面的开发。
#### （3).**Thymeleaf标准表达式**
Thymeleaf模板引擎提供了多种标签表达式语法，以下是最常用的简单表示式语法：

| **说明** | **表达式语法** |
| --- | --- |
| 变量表达式 | ${…} |
| 选择变量表达式 | *{…} |
| 消息表达式 | #{…} |
| 链接URL表达式 | @{…} |
| 片段表达式 | ~{…} |

除了以上这些语法外Thymeleaf还提供了更多语法支持，例如文本表达式、算数表达式、布尔表达式、比较表达式等。下面我们将针对上表中的这些语法进行具体的讲解和使用说明。
**变量表达式：**
变量表达式${...}的作用是从web作用域里面取到对应的值，作用域包括** request、session、application**。
示例如下：
实体类：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fcdc83db4b35b48031479823b41ba058.png)
控制层接口：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4058542ebb3f4cbb2c76bb4936811753.png)
html文件：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/edb23f53603c325ddb2677a599f38ed6.png)
测试结果：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ab37963df4b3ada7a4f03cfb5ffa6098.png)
**选择变量表达式：**
使用变量表达式${...}来取request、session、application作用域上的属性时，可以发现，我们需要重复编写user1、session.user2和application.use3三次，如果user对象的属性有十几个怎么办？显然写十几次相同的代码不是我们想要解决方案。针对这种问题，Thymeleaf提供了**选择变量表达式***{...}来解决：
可以将上述的html页面替换为以下结构：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7e81d4dd5b22726c09d305a2beea5a81.png)
修改控制层接口访问上述html文件，html文件能正确接收到接口传入的数据。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5d681ae51f028e98c879da253a406100.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8b860ecd23effb44ad0630152a7dfbd1.png)
**消息表达式：**
消息表达式#{...}主要用于Thymeleaf模板页面国际化内容的动态替换和展示。使用消息表达式#{...}进行国际化设置时，还需要提供一些国际化配置文件。后续章节会进行国际化登陆页面的开发，会进行详细说明，此处了解即可。
**链接URL表达式：**
链接表达式@{...}一般用于页面跳转或者资源的引入，在Web开发中占据着非常重要的地位，并且使用也非常频繁,接下来我们通过一个页面跳转的示例来展示链接表达式的功能。
在控制层中创建"/home"与"/user"两个接口，访问"/home"进入网站主页，访问"/user"进入用户详情列表，这里我们通过访问主页页面跳转的形式访问"/user"进入用户详情列表。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f6c53c053e0d0c77387c0152f8da3403.png)
创建Thymeleaf模板 (src/main/resources/templates/home.html 和 src/main/resources/templates/user_details.html):
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ebb0e8240e66486a30049bb8ff5fe0bb.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/8642511a18c9b6bed2d0bbded551db26.png)
运行SpringBoot项目，并在Web浏览器中访问 http://localhost:8080/home。可以看到 "欢迎访问主页" 的消息和指向 "用户详情" 页面的链接。点击链接将跳转到用户详情页面，其中展示了带参数的另一个动态链接。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ed3ea1b193312d9176d03b53d3b31f62.png)

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a69198ed72f96be9e827ad25d8b3c4ac.png)
这个示例演示了在Thymeleaf中使用 @{...} 创建带有和不带参数的动态链接。实际的URL由Spring MVC控制器处理，Thymeleaf用于在HTML模板中生成动态链接。
**片段表达式：**
片段表达式~{...}用于引用片段。片段是可以在多个模板中重复使用的一部分HTML代码。其中，最常见的用法是使用th:insert或th:replace属性插入片段。下面我们通过一个示例来展示片段表达式的功能。
创建一个新的Thymeleaf模板，header.html，包含一个简单的页面头部：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4a2f0f5739b2bc6eb3088c4e686b8fd9.png)
创建一个包含片段的主页模板 home1.html，使用片段表达式引用头部片段：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/db227b4b6eb57aff19ffb941fd591349.png)
在控制层中创建接口访问"home1.html"：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/15b63cb02e9e19502225bddef87a16a6.png)
运行SpringBoot项目，并在Web浏览器中访问 http://localhost:8080/home1。可以看到一个包含头部片段的主页，这个头部片段是通过片段表达式引用的。这种方式可以让在多个页面中共享和重用HTML片段，使代码更加模块化和易于维护。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/aeb496b205c3a6f0a21ce49458ce5c24.png)
#### （4).**Thymeleaf自动配置**
通过上面章节的讲解，可以发现一个问题，为什么thymeleaf页面放在templates文件夹里面，而不是其他地方呢？-这是由Thymeleaf和Spring Boot的默认配置约定所决定的，SpringBoot框架会将内置支持的功能组件放在spring-boot-autoconfigure-2.X.X.RELEASE.jar(X.X代表SpringBoot的版本，不同版本的自动配置可能稍有不同) 包下，而 Thymeleaf 框架就是内置支持的。所以在这个包里面可以找对应的自动配置代码，如图：(如果找默认的属性配置应该找XxxxProperties类)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2a7c56ec8bd8140a2bb281874f5bd060.png)
代码中定义了默认模板位置在classpath:/templates/目录下，Spring Boot默认会在classpath:/templates/目录下查找Thymeleaf模板文件，并使用类路径扫描来自动发现并加载应用程序的资源。除此之外自动配置类中还定义了一些其他的属性，SpringBoot使用默认约定可以大大简化配置(**约定大于配置**)。在许多情况下，开发者只需将Thymeleaf模板文件放置在templates文件夹内，并使用.html后缀，而不必显式地配置模板文件的位置和后缀。
项目结构中还有一个static文件夹，是用来存放静态资源（css、js、image等等），SpringBoot将通用的Web模块的参数放在Web分包，具体资源配置信息放置在WebProperties配置类中，静态资源默认路径为下图红框标注（如果SpringBoot默认生成的resources目录下同时存在public、resources、static 3个子目录，SpringBoot默认会依次从public、resources、static里面查找静态资源）。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/14d6b2121f01a86f93654b77fed5b148.png)
### 8.3.使用Thymeleaf进行页面开发
前面我们已经对Thymeleaf的基本语法以及使用进行了了解，并介绍了Thymeleaf和前端开发所使用的静态资源的自动化配置，接下来我们通过制作页面登陆跳转的demo(在SpringBoot_11_thymeleaf项目基础上进行开发)来重点讲解SpringBoot与Thymeleaf的整合使用。
**引入项目所需依赖：**
在项目中导入Mybatis、Mybatis-Plus、Druid、MySQL连接依赖
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/de08079eb3064187e26bd08adc3c65a3.png)
**创建User数据表：**
在Navicat中创建User表，用于用户登录验证功能(提前新增一条记录，用于后续登陆功能的验证)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a90d25b29350d2c3457baa5af4153923.png)
**修改配置文件：**
在全局配置文件application.properties中进行数据库连接和Mybatis相关配置，并且将Thymeleaf的模板缓存置为false(设置为false方便开发中进行调试，上线稳定后可保持默认值true)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c388dc5867863802f0c6e628fac4bb37.png)
**实体类：**
新建实体类User
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/bc52c3d8d6944f2655ed74e4310207ca.png)
**持久层接口：**
创建持久层接口UserMapper，继承BaseMapper接口，实现持久层快速开发
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e9ffada7d68d281faf9acd573428254f.png)
**服务层接口：**
创建服务层接口IUserService，定义查询用户和登陆验证的方法
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/37bd3f9fa9f1bcd45f511bfb586bb461.png)
**服务层实现类：**
创建服务层实现类UserServiceImpl，实现查询用户和登陆验证的方法
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cf135527fc8e53520cef53b485477efd.png)
**表现层：**
创建表现层类LoginController，用于定义登陆接口和访问主页接口，其中**login**方法处理GET请求，返回登录页面的Thymeleaf模板名称。**doLogin**方法处理POST请求，根据用户名和密码的验证结果进行跳转。**home**方法用于处理首页的请求。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/cefea48a10d20b9e031462a377ac3037.png)
**创建模板页面：**
 在resources/templates目录创建login.html页面用于前端登陆功能的实现，创建myhome.html页面模拟主页，用于页面跳转功能的实现。当用户访问/login时，会显示登录页面，用户输入用户名和密码后，提交表单，会由doLogin方法处理验证逻辑，如果验证成功，将跳转到/myhome，并显示欢迎页面。登录失败则返回登录页面，并显示错误信息。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4c1072efb58980855a45daee9757d888.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/47f18dc4129052d405750a9b6f2c6e66.png)
**效果测试：**
启动项目进行测试，项目启动成功后，在浏览器上访问"http://localhost:8080/login"进入用户登陆页面，输入数据库中不存在的账号，或者错误的密码，页面提示"用户名或密码错误"，说明"error"属性引入静态文件成功。输入正确的账号密码，页面成功跳转到主页，并显示存入session中的账号名称，SpringBoot整合Thymeleaf成功。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/ce18b76c0b75d9dca600da172cac2845.png)![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4308fa650154e77c71643a428ed0bfc3.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/fd95494ff4fc94cfc67eb64de9971359.png)![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/4f71d62701abcb38ebc7fe3c5113b851.png)
**登陆拦截功能：**
上述页面登陆跳转的功能还存在缺陷，如果不经过登录页面正常登录，而是直接访问"http://localhost:8080/myhome"也能进入主页，这样的缺陷在实际工作中是不允许发生的，对于管理系统或其他需要用户登录的系统，登录验证都是必不可少的环节，在SpringBoot开发的项目中，可以通过实现拦截器来实现用户登录拦截并验证。
SpringBoot通过实现HandlerInterceptor接口实现拦截器，通过实现WebMvcConfigurer接口实现一个配置类，在配置类中注入拦截器，最后再通过@Configuration注解注入配置。以下是一个简单的拦截器的实现：
**实现HandlerInterceptor接口：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7702d398943597f39b06e69fab9d8397.png)
preHandle在Controller之前执行，因此拦截器的功能主要就是在这个部分实现：

- 检查session中是否有username存在；
- 如果存在，就返回true，那么Controller就会继续后面的操作；
- 如果不存在，就会重定向到登录界面。就是通过这个拦截器，使得Controller在执行之前，都执行一遍preHandle。

**实现WebMvcConfigurer接口，注册拦截器：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/71e2d974def059c2473dbccd6f3898fe.png)
将拦截器注册到了拦截器列表中，并且指明了拦截哪些访问路径，不拦截哪些访问路径，不拦截哪些资源文件；最后再以@Configuration注解将配置注入。
**效果验证：**
重新启动SpringBoot项目，访问除了"/login"以外的任何页面，拦截器都会将请求重定向到登录页面。此后只需进行一次正确的登录，在正确登录之后，就将username保存到session中，再次访问页面的时候，登录拦截器就可以找到这个username对象，就不需要再次拦截到登录界面了，可以正常访问其他页面。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/13cf998bbea8ec2bdd0b2821588ce024.png)
Chrome浏览器开发者模式中查看存储的Cookie与Session：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/93cfa160f1ed33a9dfbdefd581160a35.png)

![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/428eaf36758d6f2ffab4269b338410a0.png)
### 8.4.Thymeleaf配置国际化页面
本小节我们在上一小节的基础上配置国际化页面。
在项目的类路径resources下创建名称为i18n(全称：Internationalization)的文件夹，并在该文件夹中根据需要编写对应得多语言国家化文件login.properties、login_zh_CN.properties和login_en_US.properties文件。
**login.properties(自定义默认语言配置文件)：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/15455075418b5e8bc83c519d2c49b420.png)
**login_zh_CN.properties(自定义中文国际化文件)：**
![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704204331188-76eff22e-00fb-438a-8dbe-c3ee9ce10648.png#averageHue=%232b2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=153&id=OA4x5&originHeight=229&originWidth=915&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23601&status=done&style=none&taskId=u512c22fc-495f-437a-9aaf-076696792e4&title=&width=610)
**login_en_US.properties(自定义英文国际化文件)：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/78966dabf518d79efe872dd3d2599340.png)
Spring Boot默认识别的语言配置文件为类路径resources下的messages.properties；其他国际化文件得名称必须严格按照文件前缀名_语言代码_国家代码.properties的形式命名。
本项目默认语言配置文件名自定义为login.properties，因此如果项目需要引入自定义国际化文件，必须在项目的全局配置文件中进行国际化文件的基础名配置。
**修改配置文件：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c237985ecf4bb42bc233ea46dc62f1da.png)
**修改相应的html文件：**
修改login.html和home.html模板文件，使用Thymeleaf的国际化表达式（#{}）来引用消息：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/002d7926038c67b469c7e378e18ed9ef.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b11e04c1db5a80eefff0f9eabaa2cdc0.png)
**定制区域信息解析器：**
完成上一步中多语言国际化文件的编写和配置后，就可以正式在前端页面中结合Thymeleaf模板相关属性进行国际化语言设置和展示了，不过这种实现方式默认是Spring Boo使用请求头中的语言信息(**Accept-Language**)自动进行语言切换的，有些项目还会提供手动语言切换的功能，这就需要定制区域解析器了。
在config包下创建一个用于定制国际化功能区域信息解析器的自定义配置类MyLocalResovel：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/458ebee841659a8579370b3c202346b7.png)
**修改相应的html文件：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/002b142f152e9e1e7920a9ec7d8a66f7.png)
MyLocalResovel配置类实现了LocaleResovel接口，并重写了LocaleResovel接口的resolveLocale()方法解析自定义语言。使用@Bean注解将当前配置类注册成Spring容器中一个Bean组件。这样就可以覆盖默认的LocaleResolver组件。在重写的resolveLocale()方法中，可以根据不同的需求切换语言信息从而获取请求的参数，只有请求参数不为空时，才可以进行语言的切换(访问 **http://localhost:8080/login?l=en_US** 使用英文（美国）的区域信息;访问 **http://localhost:8080/login?l=zh_CN** 使用中文（中国）的区域信息)。
**效果验证：**
启动项目进行测试，项目启动成功后，在浏览器上访问"http://localhost:8080/login"进入用户登陆页面，此时使用默认语言，显示为中文，点击登陆按钮下方的English超链接，成功访问"http://localhost:8080/login?l=en_US"，登录页面切换为英文，请求头中的Content-Language参数成功为en-US。点击登陆按钮下方的中文超链接，成功访问"http://localhost:8080/login?l=zh_CN"，登录页面切换为中文，请求头中的Content-Language参数成功为zh_CN。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/739da9959de05115b6f4bc67b3b88093.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/270e6f32045fd32cbaca3602625280de.png)
至此，关于SpringBoot整合Thymeleaf模板引擎的介绍完毕。

## 9.SpringBoot安全管理
安全管理是软件系统必不可少的的功能。根据经典的“墨菲定律”——凡是可能，总会发生。如果系统存在安全隐患，最终必然会出现问题。Spring家族提供了Spring Security这一强大的安全性解决方案，用于保护Java应用程序的安全性。本章将基于Spring Security框架进行讲解。
### 9.1.认识Spring Security
#### （1).Spring Security主要特性
Spring Security在Web应用程序、基于方法的安全性、认证、授权等方面提供强大的支持。这些特性使其成为保护应用程序免受各种安全威胁的强大工具，并且同时提供了足够的灵活性，以适应各种不同类型的应用程序需求。以下是Spring Security的一些主要特性：

1. **认证（Authentication）：**
   - Spring Security提供了各种认证机制，包括基于表单、基于HTTP基本认证、LDAP认证等。
   - 支持多种认证提供者，包括数据库、LDAP、OAuth、OpenID等。
2. **授权（Authorization）：**
   - Spring Security通过访问控制和方法级别的安全性来实现授权。
   - 可以通过注解或配置文件定义访问规则，限制用户对资源的访问。
3. **过滤器链（Filter Chain）：**
   - Spring Security通过过滤器链来处理Web请求。每个过滤器执行特定的安全任务，例如认证、授权、CSRF防护等。
   - 过滤器链可以根据应用程序的需求进行定制。
4. **会话管理（Session Management）：**
   - 提供会话管理功能，包括限制同一用户的并发登录数、过期处理、会话固定保护等。
5. **密码编码器（Password Encoding）：**
   - 支持密码的加密和解密，以及验证用户提供的密码是否匹配存储在数据库中的加密密码。
6. **Remember-Me 记住我功能：**
   - 提供"记住我"功能，使用户在注销后、会话过期后仍能够保持登录状态。
7. **单点登录（Single Sign-On, SSO）：**
   - 支持集成单点登录，使用户只需登录一次即可访问多个相互信任的应用程序。
8. **OAuth支持：**
   - 支持OAuth协议，可以作为认证服务器或资源服务器，实现安全的API访问。
9. **CSRF 防护：**
   - 提供跨站请求伪造（CSRF）防护，确保请求来源的合法性。
#### （2).Spring Security功能支持
为了方便Spring Boot项目的安全管理，Spring Boot对Spring Security安全框架进行了整合支持，并提供了通用的自动化配置，从而实现了Spring Security安全框架中包含的多数安全管理功能。下面针对常见的安全管理功能进行介绍，具体如下。

1. **MVC Security**是Spring Boot整合Spring MVC搭建Web应用的安全管理框架，也是开发中使用最多的⼀款安全功能。
2. **WebFlux Security**是Spring Boot整合Spring WebFlux搭建Web应用的安全管理。虽然Spring WebFlux框架刚出现不久、文档不够健全，但是它集成了其他安全功能的优点，后续有可能在Web开发中越来越流行。
3. **OAuth2**是一个关于授权的开放网络标准，允许用户授权第三方应用访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方移动应用或分享他们数据的所有内容，可以实现第三方认证、单点登录等功能(用途十分广泛，例如：接入第三方应用授权登录，比如QQ，微博，微信，谷歌的授权登录)。
4. **Actuator Security**用户于对项目的⼀些运行环境提供安全监控，例如Health健康信息、Info运行信息等，它主要作为系统指标供运维人员查看管理系统的运行情况。 

上面介绍了Spring Boot整合Spring Security安全框架可以实现的⼀些安全管理功能。项目安全管理是⼀个很大的话题，开发者可以根据实际项目需求，选择性地使用Spring Security安全框架中的功能。
#### （3).Spring Security使用简介
作为一个知名的安全管理框架， Spring Security 对安全管理功能的封装已经非常完整了。
Spring Boot 整合 Spring Security ，实际上大部分工作都在安全管理配置类上。
我们通过安全管理配置类，将用户、密码及其对应的权限信息放入容器，同时将访问路径所需要的权限信息放入容器， Spring Security 就会按照用户访问路径--判断所需权限--用户是否具备该权限--允许或拒绝访问这样的逻辑实施权限管理了。
我们在使用 Spring Security 时，只需要从配置文件或者数据库中，把用户、权限相关的信息取出来。然后通过配置类方法告诉 Spring Security ， Spring Security 就能自动实现认证、授权等安全管理操作了。

- 系统初始化时，告诉 Spring Security 访问路径所需要的对应权限。
- 登录时，告诉 Spring Security 真实用户名和密码。
- 登录成功时，告诉 Spring Security 当前用户具备的权限。
- 用户访问接口时，Spring Security 已经知道用户具备的权限，也知道访问路径需要的对应权限，所以自动判断能否访问。
### 9.2.Spring Security默认实现
Spring Security的安全管理有两个重要概念，分别是Authentication（认证）和Authorization（授权）。其中，认证即确认用户是否登录，并对用户登录进行管控；授权即确定用户所拥有的功能权限，并对用户权限进行管控。本章后续将围绕用户登录管理和访问权限控制进行Spring Boot整合Spring Security的讲解。首先我们通过一个快速入门案例来体验Spring Boot整合Spring Security实现MVC Security安全管理效果。
#### （1).**基础环境搭建**
为了讲述认证和授权，本小节及后续将会结合一个动漫列表和动漫详情的案例进行演示，首先进行案例的基础环境搭建。
**项目创建：**
创建名为SpringBoot_12_security的项目，引入SpirngWeb、Lombok、thymeleaf依赖，如下图所示：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/874839590c93e7354831a9edb446d6cd.png)
**引入html资源文件：**
在项目的resources下创建templates目录，引入案例所需的资源文件。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/a1c4a3d43a24a9173b106fafff33f8b1.png)
index.html为项目首页，common和vip目录中分别对应的是普通用户和vip用户可以访问的页面。
**common1.html：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f21fcc7b67523ccfb5c1c7ab69f9cf13.png)
**common2.html：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/301dbd9e6c4855c4d6aa736417267cef.png)
**vip1.html：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/0ccebe7108d90c5b13a41038c5cbc494.png)
**vip2.html：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/7b0a5eca012fe176854e6c0f6eb5e320.png)
**index.html：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/19d06f84d850db5017309b89d8bd029f.png)
index.html首页中通过标签分类展示了普通番剧和大会员专享，并这些动漫都通过<a>标签连接到了具体的动漫详情路径，在templates目录下，common和vip文目录中引入HTML文件就是对应动漫的简介，static目录下，img目录中为引入的图片。
**web表现层：**
在xyzy包下创建controller包，在controller包下创建AnimeController类，用于页面请求处理。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/93571b1b12c6f8d7ff4dd3adc7cd553c.png)
AnimeController类中编写了一个向影片详情跳转的方法toDetail()，一个跳转主页的方法home()，该文件中没有涉及用户登录提交以及退出操作的方法，在该项目中引入Spring Security后Spring Security会自动生成一个默认的登录页面。
#### （2).**Spring Security安全管理效果测试**
要使用Spring Security，需要在项目中引入安全管理依赖，在pom文件中引入spring-boot-starter-security启动器。
**添加spring-boot-starter-security启动器：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/002962b8d6c51d7ca84a830674539d36.png)
一旦项目引入spring-boot-starter-security启动器，MVC Security和WebFlux Security负责的安全功能都会立即生效，如果需要使用OAuth2则还需要额外引入spring-security-oauth2-autoconfigure依赖。
**项目测试：**
启动SpringBoot_12_security项目，项目启动时会在控制台Console中自动生成一个安全密码。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b35d62d5a0e71e646c0e89626ffc7671.png)
浏览器访问http://localhost:8080/查看项目首页，项目中并没有手动创建用户登录页面，而添加了Security依赖后，Spring Security的自动化配置生效，项目具有了一些默认的安全管理功能，从而生成一个默认的登录页面http://localhost:8080/login。Security会默认提供一个可登录的用户信息，其中用户名为user，密码随机生成，这个密码会随着项目的每次启动随机生成并打印在控制台上。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/6c9a67befb93e134c97f015c70a054a0.png)
在登录页面输入错误的用户名和密码，页面会重定向到"/login？error"，并且页面会显示出错误信息，提示用户。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e75db2d718302024eba214f292abda36.png)
在登录页面输入正确的用户名和密码后，登陆成功跳转至主页，点击相应的动漫名称，可以跳转至动漫详情介绍。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/b263fe7b02843f38f401e76af677463e.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/d86db3ff103676417fe5fd8da9fcbd2c.png)
但是这种默认的安全管理方式还存在许多问题，例如： 只有唯一的默认登录用户user、密码随机生成且过于暴露、登录页面及错误提示页面不是我们想要的等。
### 9.3.MVC Security安全配置介绍
Spring Security是Spring框架提供的用于处理身份验证和授权的强大安全框架。当与Spring MVC结合使用时，Spring Security提供了一种有效的方式-MVC Security安全管理功能来保护应用程序免受各种安全威胁。其默认的安全配置是在SecurityAutoConfiguration和 UserDetailsServiceAutoConfiguration中实现的。其中，SecurityAutoConfiguration会导入并自动化配置 SpringBootWebSecurityConfiguration用于启动Web安全管理，UserDetailsServiceAutoConfiguration则用于配置用户身份信息。
以下是MVC Security安全配置介绍：
**Security配置：**使用配置类来配置Spring Security。配置类继承WebSecurityConfigurerAdapter()，并使用@EnableWebSecurity注解开启MVC Security安全支持。在配置类中，可以定义如何进行身份验证、授权以及其他相关的安全性配置。例如
**请求访问配置示例**：
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .authorizeRequests()
        .antMatchers("/public/**").permitAll()
        .anyRequest().authenticated()
        .and()
        .formLogin()
        .loginPage("/login")
        .permitAll()
        .and()
        .logout()
        .permitAll();
    }
}
```
上述例子中重写**configure(HttpSecurity http)**方法用于定制基于HTTP请求的用户访问控制：

- **/public/**** 路径下的资源不需要身份验证，允许所有人访问。
- 任何其他请求都需要进行身份验证。
- 登录页是 "/login"。
- 注销是允许所有人访问的。

**用户认证配置示例：** 在配置类中可以定义用户认证的方式，例如内存中的用户、数据库中的用户等。以下是一个简单的内存用户配置：
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
                .withUser("user").password("{noop}password").roles("USER")
                .and()
                .withUser("admin").password("{noop}admin").roles("USER", "ADMIN");
    }
}
```
上述例子中重写**configure(AuthenticationManagerBuilder auth)**方法用于定制用户认证管理器来实现用户认证，**{noop} **表示密码不加密（在实际项目中，密码应该加密存储)。
但是： 在Spring Security 5.x 版本之后(SpringBoot版本为2.7.X)，Spring 推荐使用基于组件的配置方式而不是继承 **WebSecurityConfigurerAdapter(不推荐使用)**。这种基于组件的配置方式可以通过声明**SecurityFilterChain**和**UserDetailsService**等类型的**bean**的方式来进行相关配置。
**请求访问配置示例**：
```java
@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                    .antMatchers("/public/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .loginPage("/login")
                    .permitAll()
                    .and()
                .logout()
                    .permitAll();
        	return http.build();
    }
}
```
**用户认证配置示例：** 
```java
@Configuration
public class SecurityConfiguration {

    @Bean
    public UserDetailsService userDetailsService() {
        // 配置内存中的用户
        return new InMemoryUserDetailsManager(
            User.withUsername("user").password(passwordEncoder().encode("password")).roles("USER").build(),
            User.withUsername("admin").password(passwordEncoder().encode("admin")).roles("USER", "ADMIN").build()
        );
    }
}
```
### 9.4.自定义用户认证
对于自定义用户认证，Spring Security提供了多种自定义认证方式，包括有：

- In-Memory Authentication：内存身份认证
- JDBC Authentication：JDBC身份认证
- UserDetailsService：身份详情服务
- LDAP Authentication：LDAP身份认证
- AuthenticationProvider：身份认证提供商

本节将选取前三个认证方式进行自定义用户认证介绍。
#### （1).**内存身份认证**
Spring Security允许在内存中配置用户身份认证，其对于快速测试或简单应用程序非常方便。自定义内存身份认证时，只需要在配置类中注册UserDetailsService类型的bean，并在方法中定义测试用户即可。下面通过Spring Boot整合Spring Security实现内存身份认证。
**自定义组件配置：**
在xyzy包下创建config包，在config包下创建SecurityConfig类，用于自定义身份配置。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/619b9656cfa0e79e6a62b83fad14cd2f.png)
在以上配置类中注册了UserDetailsService类型的Bean用于配置内存中的用户，设置了两个用户，包括用户名、密码和角色。进行用户配置时需要注意以下几个问题：

1. 从Spring Security 5开始，自定义用户认证必须设置密码编码器用于保护密码，否则控制台会出现 “IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"”异常错误。
2. Spring Security提供了多种密码编码器，包括BCryptPasswordEncoder、Pbkdf2PasswordEncoder、 ScryptPasswordEncoder等，注册这几种密码编译器类型的Bean即可使用。
3. 自定义用户认证时，可以定义用户角色roles，也可以定义用户权限authorities。在进行赋值时，权限通常是在角色值的基础上添加 ROLE_ 前缀。例如， roles("common") 和 authorities("ROLE_common") 是等效的。
4. 自定义用户认证时，可以为某个用户⼀次指定多个角色或权限，例如， roles("common", "vip") 或 authorities("ROLE_common", "ROLE_vip") 。

**效果测试：**
启动SpringBoot_12_security项目，项目启动成功后，发现控制台已经不再打印默认安全管理随机生成的密码了，访问[http://localhost:8080](http://localhost:8080/)，同样自动跳转到了用户登录页面http://localhost:8080/login。如果输入的用户名或者密码错误，会出现相应的错误提示。如果输入的用户名和密码正确，那么会跳转进入网站首页。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/1467fe5fe75294f583149a4e7aa5e124.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/49705cb630c8c8bbd861c1655098f556.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c273ca4623415cd933764ba8717716e5.png)

实际开发中，用户都是在页面注册和登录时进行认证管理的，而非在程序内部使用内存管理的方式手动控制注册用户，所以上述使用内存身份认证的方式无法用于实际生产，只可以作为初学者的测试使用。
#### （2).**JDBC身份认证**
JDBC Authentication（JDBC身份认证）是通过JDBC连接数据库对已有用户身份进行认证。接下来通过一个案例进行JDBC身份认证的讲解。
**数据准备：**
JDBC身份认证的本质是通过JDBC连接数据库对已有用户身份进行认证。所以需要提前准备好相关数据，这里使用我们一直使用的数据库springboot_db，在该数据库创建三个表customer用户表、authority用户权限表、customer_authority用户权限关联表，并预先插入几条测试数据。
**customer用户表：**(username需要唯一，valid表示用户身份是否合法，默认1为合法，密码为BCryptPasswordEncoder编码器加密后的密码，分别是123123和123124)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f1176fe776ef0e7a10f882c7bd9cafd6.png)
**authority用户表：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9d9906295c7d96d2dff204a88a3123e8.png)
**customer_authority用户表：**
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e9609b034764006626449fa392b7d68c.png)
**添加JDBC依赖和MySQL连接依赖：**
在POM文件中添加如下依赖：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/2aadb42d9eac7848eebb74a52308484d.png)
**数据库连接配置：**
在全局配置文件application.properties中编写数据库连接配置。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/02063f3ff2145175210feabbe182a80f.png)
**JDBC身份认证配置：**
在SecurityConfig 类中使用注册Bean的方式实现JDBC身份认证，使用JDBC身份认证时，需要对密码进行编码设置（必须与数据库中用户密码加密方式一致），需要加载JDBC进行认证连接的数据源DataSource；最后，执行SQL语句，实现通过用户名username查询用户信息和用户权限。
```java
@Configuration
public class SecurityConfig{

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/SpringBoot_DB");
        dataSource.setUsername("root");
        dataSource.setPassword("123456");
        return dataSource;
    }

    @Bean
    public JdbcUserDetailsManager userDetailsManager() {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource());
        // 设置用户信息查询SQL
        String userSQL = "SELECT username, password, valid FROM customer WHERE username = ?";
        userDetailsManager.setUsersByUsernameQuery(userSQL);
        // 设置用户权限查询SQL
        String authoritySQL = "SELECT c.username, a.authority FROM customer c, authority a, customer_authority ca " +
                "WHERE ca.customer_id = c.id AND ca.authority_id = a.id AND c.username= ?";
        userDetailsManager.setAuthoritiesByUsernameQuery(authoritySQL);
        return userDetailsManager;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailsManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // 配置密码加密方式
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        //配置处理认证过程。它负责验证用户的身份（即用户名和密码）
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

}
```
需要注意的是，定义用户查询的SQL语句时，必须返回用户名username、密码password、是否为有效用户valid这3个字段信息；定义权限查询的SQL语句时，必须返回用户名username、权限authority两个字段信息。否则，登录时输入正确的用户信息会出现PreparedStatement Callback的SQL异常错误信息。
**效果测试：**
启动SpringBoot_12_security项目，项目启动成功后，访问[http://localhost:8080](http://localhost:8080/)，通过数据库中存在的正确信息可以正常访问主页，输入错误的用户信息会正确提示。
#### （3).**UserDetailService身份认证**
对于用户流量较大的项目来说，频繁地使用JDBC进行数据库查询认证不仅麻烦，而且会降低网站响应速度。对于一 个完善的项目来说，如果某些业务已经实现了用户信息查询的服务，就没必要使用JDBC进行身份认证了。
假设当前项目中已经有用户信息查询的业务方法，在已有的用户信息服务的基础上选择使用实现UserDetailsService接口的方法进行自定义用户身份认证。
为了案例的演示，还需要完成以下实体类、持久层接口、服务层接口、服务层实体类的编写。
**定义用户及用户权限的实体类：**
Authority用户权限实体类：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/da664371fd558291bb86e1a2c9b6656b.png)
Customer用户数据实体类：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/41ccbf8468cbc9b0d2d05793dda7ed1a.png)
**定义查询用户及用户权限的持久层接口：**
查询用户信息的持久层接口CustomerMapper(Mybatis-Plus开发)：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/c3dce804a0e33c0ea5895565a9ca5f3b.png)
查询用户权限的持久层接口AuthorityMapper：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/6f0531c65da9383974bbc45a34c7bf45.png)
查询用户权限的持久层接口AuthorityMapper对应的配置文件AuthorityMapper.xml：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/5331bf43c9d7c7dc26eecc1dbdf5e70a.png)
**定义查询用户及用户权限的服务层接口和服务层实现类：**
查询用户权限的服务层接口IAuthorityService：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e5d7b721c10ad62ae2a2c73b6f2a12d4.png)
查询用户权限的服务层接口ICustomerService：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/3c01bc62965bf584f2b5b55aa5dbd5ae.png)
查询用户权限的服务层接口实现类AuthorityServiceImpl：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/06d3e2f866dfaf5ebdbb0ab64912d9b2.png)
查询用户信息的服务层接口实现类CustomerServiceImpl：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/f3c957ee9b8423252a171a7ed67c7ee9.png)
AuthorityServiceImpl与CustomerServiceImpl是项目中的业务处理服务类，这两个类结合Redis缓存、定义了通过username获取用户信息和用户权限信息的方法。
**定义实现UserDetailsService接口的服务类UserDetailsServiceImpl：UserDetailsService 是 Spring Security 中定义的一个接口，用于加载用户信息的服务接口。该接口定义了一个方法 loadUserByUsername()，用于根据用户名加载用户信息。用户信息包括用户名、密码、是否启用、是否过期、是否锁定、权限等。自定义一个UserDetailsService接口的实现类，通过重写loadUserByUsername()方法即可封装我们需要自定义的用户信息。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/9103e19774c469df25f24904bef0c310.png)
上述代码中**SimpleGrantedAuthority** 是 Spring Security 提供的一个简单实现了 GrantedAuthority 接口的类。GrantedAuthority 表示赋予给用户的权限，它是一个标识权限的接口。在 Spring Security 中，权限通常表示为字符串，例如 "ROLE_VIP"；
**UserDetails **接口是 Spring Security 中定义的接口，用于表示用户的详细信息。这个接口包含了描述用户的各种属性，如用户名、密码、权限等。UserDetails 是构建认证（authentication）对象的基础，用于存储有关用户的信息，返回的UserDetails 对象提供给Security进行认证使用。
需要注意的是，UserDetailsServiceImpl业务处理类获取Customer实体类时，必须对当前用户进行非空判断，这里使用throw进行异常处理，如果查询的用户为空，throw会抛出UsernameNotFoundException的异常。如果没有 使用throw异常处理，Security将无法识别，导致程序整体报错。
**UserDetailsService自定义身份认证配置：**
在config包下新建一个UserDetailServiceSecurityConfig配置类，在UserDetailServiceSecurityConfig 中使用注册Bean的方式实现UserDetailsService身份认证配置。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/e3dd1a5071111b1dc849a6548b7d6ead.png)
**效果测试：**
启动SpringBoot_12_security项目，项目启动成功后，访问[http://localhost:8080](http://localhost:8080/)访问项目首页（前提需要保证UserDetailServiceSecurityConfig配置类的所有配置完成，并且需要启动Redis服务器），输入正确或者错误的信息，页面效果和上一小节所展示的效果一样。
至此，关于Spirng Security中的自定义用户认证已演示完毕。内存身份认证最为简单，适合作用于测试以及初学者体验；JDBC身份认证和UserDetailsService身份认证在实际开发中使用较多，根据实际开发中的业务情况来看使用UserDetailsService身份认证较为合适。
### 9.5.自定义用户授权
当⼀个系统建立之后，通常需要适当地做⼀些权限控制，使得不同用户具有不同的权限操作系统。例如，⼀般的项目中都会做⼀些简单的登录控制，只有特定用户才能登录访问。接下来我们针对Web应用中常见的自定义用户授权管理进行介绍。
#### （1).**自定义用户访问控制**
在实际开发中，网站的访问基本上都是基于HTTP请求的，在9.3节进行MVC Security安全配置介绍时，我们已经介绍了通过在配置类中声明SecurityFilterChain类型的bean可以进行请求访问配置，只要在配置方法中进行相关的设置，就可以对基于HTTP的请求访问进行控制。接下来我们对该配置方法进行剖析，分析的自定义用户访问控制的实现过程。
```java
@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                .authorizeRequests()
                    .antMatchers("/public/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .loginPage("/login")
                    .permitAll()
                    .and()
                .logout()
                    .permitAll();
        	return http.build();
    }
}
```
**SecurityFilterChain**：这是Spring Security 5引入的一个新概念，用于配置安全过滤器链。它定义了一系列的安全过滤器，用于处理不同类型的安全问题。
**filterChain(HttpSecurity http)：**这个方法配置了安全过滤器链。参数http是一个HttpSecurity对象，它提供了一些方法来配置不同的安全性设置，这些方法允许开发者定义哪些请求需要进行身份验证，哪些请求不需要身份验证，以及如何处理这些请求。除此之外，它还能用来处理Session管理配置、CSRF跨站请求问题等。HttpSecurity类常用的方法如下表所示：

| **方法** | **描述** |
| --- | --- |
| `authorizeRequests()` | 开启基于HttpServletRequest请求访问的限制 |
| `formLogin()` | 配置基于表单的登录 |
| `logout()` | 配置退出登录 |
| `sessionManagement()` | 配置会话管理设置 |
| `rememberMe()` | 配置“记住我”功能，允许用户在成功身份验证后被记住。通常涉及使用持久化令牌，例如Cookies，以自动登录用户 |
| `csrf()` | 配置跨站请求伪造（CSRF）保护 |

用户请求控制相关的主要方法及说明：

| 方法 | 描述 |
| --- | --- |
| `antMatchers(java.lang.String... antPatterns)` | 开启Ant风格的路径匹配 |
| `mvcMatchers(java.lang.String... patterns)` | 开启MVC风格的路径匹配（与Ant风格类似） |
| `regexMatchers(java.lang.String... regexPatterns)` | 开启正则表达式的路径匹配 |
| `and()` | 功能连接符 |
| `anyRequest()` | 匹配任何请求 |
| `rememberMe()` | 开启记住我功能 |
| `access(String attribute)` | 匹配给定的SpEL表达式计算结果是否为true |
| `hasAnyRole(String... roles)` | 匹配用户是否有参数中的任意角色 |
| `hasRole(String role)` | 匹配用户是否有某一个角色 |
| `hasAnyAuthority(String... authorities)` | 匹配用户是否有参数中的任意权限 |
| `hasAuthority(String authority)` | 匹配用户是否有某一个权限 |
| `authenticated()` | 匹配已经登录认证的用户 |
| `fullyAuthenticated()` | 匹配完整登录认证的用户（非rememberMe登录用户） |
| `hasIpAddress(String ipAddressExpression)` | 匹配某IP地址的访问请求 |
| `permitAll()` | 无条件对请求进行放行 |

以上列举了用户请求访问的常见用法，更多方法可以查看Spring Security官方API文档。
接下来，在上一节自定义用户认证案例的基础上，进行用户访问配置，演示Spring Security授权管理的用法。
在上一章创建的配置类UserDetailServiceSecurityConfig中进行**用户访问配置**，示例如下：
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/82708838586494138f99683c8ba6d21b.png)
上述代码中，filterChain()方法设置了用户访问权限，其中，路径为“/”的请求直接放行；路径为 /detail/common/** 的请求，只有用户角色为common（即ROLE_common权限）才允许访问；路径为 /detail/vip/** 的请求，只有用户角色为vip（即ROLE_vip权限）才允许访问；其他请求则要求用户必须先进行登录认证。
**效果测试：**
启动SpringBoot_12_security项目，项目启动成功后，访问[http://localhost:8080](http://localhost:8080/)访问项目首页。可以直接进入项目首页，这是因为自定义的用户访问控制中，对"/"的请求是直接放行的，说明自定义用户访问控制生效。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/17ec8e9e3b4b9de9e18d4034cb55b304.png)
在项目首页中单击普通番剧或者大会员专享的影片名称查看详情，会直接被自定义的访问控制拦截并跳转到默认用户登陆界面。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/1b1c78a6a0009c16fb2fb2d76cf03083.png)
在拦截的登陆界面输入正确的用户名和密码后(VIP用户)，会立即跳转到之前将要访问的影片详情页面。说明当前登陆的用户有查看普通影片详情的权限。
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/24d32e6ec51e45a24d40487740d29dd2.png)
点击影片详情左上角的"返回"链接，会再次返回到项目首页。此时，之前登录的VIP用户还处于登陆状态，点击普通番剧的影片查看详情，页面会出现403Forbidden(禁止访问)的错误信息，并且控制台不会报错，说明示例中配置的用户访问控制对不同的请求拦截也生效了
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/SpringBoot/22cf45d1d4bad772f2264eeb112b83ee.png)
(当前页面还没有做用户注销功能，切换用户需要重启SpringBoot项目，或者清理浏览器缓存和重启浏览器等)
#### （2).**自定义用户登录**
#### （3).**自定义用户退出**
### 9.6.登录用户信息获取



