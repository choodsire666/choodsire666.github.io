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
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698733562828-dfb19a81-54a6-4870-a826-8d5b1f0e4b4c.png#averageHue=%23dad9d8&clientId=u5af1f25c-30d8-4&from=paste&height=864&id=ub5944a7e&originHeight=1296&originWidth=2125&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=233779&status=done&style=none&taskId=u03b2272a-b753-41c2-806d-552e8b4f3d2&title=&width=1416.6666666666667)
- 安装
   - 双击exe文件，按照默认设置一步一步安装
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698738888487-42bb0e9d-2ef0-48a0-b531-7c3d0fd51c30.png#averageHue=%23faf9f7&clientId=u5af1f25c-30d8-4&from=paste&height=45&id=u77f99723&originHeight=67&originWidth=428&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=3782&status=done&style=none&taskId=u2c524ce5-c702-4c9b-b136-400c2ec0b5b&title=&width=285.3333333333333)
- 配置环境变量
   - 右键“此电脑”——“属性”——“高级系统设置”——“高级”——“环境变量”——“新建”：
   - ![](https://cdn.nlark.com/yuque/0/2023/jpeg/33318872/1698738942173-07df42f4-cda8-475f-9206-e9966481bec7.jpeg#averageHue=%23e1daca&clientId=u5af1f25c-30d8-4&from=paste&id=ub6e76f24&originHeight=894&originWidth=1534&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u90661203-475c-4d80-bf35-13a5067f06f&title=)
   - 新建环境变量JAVA_HOME；变量名：JAVA_HOME；变量值：C:\Program Files\Java\jdk-1.8 。变量值是自己的jdk安装目录(图上的也是默认安装路径)：
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698739009127-d49152bf-4f7f-434d-b525-4789979d9e34.png#averageHue=%23efeeee&clientId=u5af1f25c-30d8-4&from=paste&height=179&id=uc3ba194b&originHeight=269&originWidth=1045&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=18424&status=done&style=none&taskId=u0eb8f35b-7d9f-46aa-8c75-45e9d6a7acf&title=&width=696.6666666666666)
   - 新建环境变量CLASSPATH；变量名：CLASSPATH；变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar需要注意变量值前面的“.;”
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698739178662-01e7596a-a302-4318-a8a6-84a8503a5729.png#averageHue=%23eeeeed&clientId=u5af1f25c-30d8-4&from=paste&height=179&id=u2efd440f&originHeight=269&originWidth=1045&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=18673&status=done&style=none&taskId=uff29cf0b-b41b-4cb9-b717-f37c0dd9f79&title=&width=696.6666666666666)
   - 配置环境变量Path；双击Path，点击新建，添加“%JAVA_HOME%\bin”；再次点击新建，添加“%JAVA_HOME%\jre\bin”；
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698739276699-3d9f7e2c-e99f-4086-81ba-f2195152e3e4.png#averageHue=%23edeae9&clientId=u5af1f25c-30d8-4&from=paste&height=627&id=u5c54b075&originHeight=941&originWidth=990&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=110078&status=done&style=none&taskId=u63360e47-15fa-487a-9cc6-1a24f4f049a&title=&width=660)
- 命令行窗口查看
   - Win+R键弹出运行窗口，输入cmd命令打开如下窗口来测试下自己的Java是否安装成功；测试命令Java-version，若出现下图信息的话就证明Java环境已经配置成功了。
- ![1705834381966.jpg](https://cdn.nlark.com/yuque/0/2024/jpeg/33318872/1705834413292-ba8ff05b-25b6-47e4-9af6-ab39a922a62e.jpeg#averageHue=%23101010&clientId=u9725c8b2-09b0-4&from=paste&height=638&id=u3fe1f0c2&originHeight=957&originWidth=1734&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38369&status=done&style=none&taskId=u7fdb4237-4065-4fbe-8367-2766253e6b0&title=&width=1156)

至此JDK已经安装完毕。
#### (2).环境搭建-安装Maven
什么是Maven：<br />Maven是一个开源的项目管理和构建自动化工具。它主要用于Java项目的构建、依赖管理和项目管理。Maven通过一个中央信息管理系统可以管理项目的构建、报告和文档等整个周期。<br />Maven的主要功能包括：

- **项目构建：** Maven可以自动化地构建项目。开发人员只需要定义项目的基本信息、依赖关系和目录结构，Maven就能根据这些信息自动化地完成项目的编译、测试、打包和部署等任务。
- **依赖管理：** Maven可以管理项目的依赖库。开发人员可以在项目配置文件（pom.xml）中指定项目所需的各种依赖库和版本号，Maven会自动下载并管理这些依赖。
- **项目报告：** Maven能够生成各种项目报告，包括构建过程中的错误信息、测试覆盖率报告、代码质量报告等，帮助开发人员更好地了解项目的状态。
- **文档生成：** Maven可以自动生成项目的文档。开发人员可以使用Maven插件来生成项目的API文档、用户手册等。
- **标准化项目结构：** Maven规定了一种标准的项目结构，开发人员只需要按照这个结构组织项目，Maven就能够识别项目的各种元素。

Maven使用XML文件（pom.xml）来配置项目，其中包含了项目的基本信息、依赖关系、构建过程等。Maven的核心概念包括项目对象模型（Project Object Model，POM）、生命周期（Lifecycle）、插件（Plugin）等。<br />通过使用Maven，开发人员可以更方便地管理项目，减少了构建和部署的复杂性，提高了项目的可维护性和可扩展性。<br />安装完JKD，初步了解了Maven后，这一小节带领同学们学习Maven仓库的安装。

- 下载Maven
   - 点击[Maven下载官方地址](https://maven.apache.org/download.cgi)下载Maven，或者去[Maven列表下载](https://archive.apache.org/dist/maven/maven-3/)，这里我们选择去Maven列表下载3.6.3版本的Maven(依次点击3.6.3——binaries——apache-maven-3.6.3-bin.zip)
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698742390215-27ea63cc-3cda-4fe3-a5c9-b698099e8b7e.png#averageHue=%23fcfbfa&clientId=u5af1f25c-30d8-4&from=paste&height=678&id=ud009cc95&originHeight=1017&originWidth=1348&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=87791&status=done&style=none&taskId=u5be1d11e-d799-45f1-96ee-d481e6ae1a2&title=&width=898.6666666666666)
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698742410518-662aa6da-0ad3-4d89-a49f-50c38e142b1e.png#averageHue=%23f9f7f6&clientId=u5af1f25c-30d8-4&from=paste&height=217&id=u7739ccd6&originHeight=325&originWidth=1136&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=24013&status=done&style=none&taskId=ufe0f97f4-4661-4d48-b2be-ed05cf2a6b2&title=&width=757.3333333333334)
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698742426090-909e1692-3327-4474-9b9e-6846958fc2cf.png#averageHue=%23f8f4f3&clientId=u5af1f25c-30d8-4&from=paste&height=297&id=u955e4be8&originHeight=446&originWidth=1185&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=50350&status=done&style=none&taskId=uc5270b78-cd48-476d-a3ba-25af5336e1f&title=&width=790)
- 解压下载的文件
   - 这里我们将解压后的文件放到D:\work\Maven这个路径
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698742628698-f8bbd48f-3829-44b8-b3b3-2c1ec22e6df5.png#averageHue=%23fafafa&clientId=u5af1f25c-30d8-4&from=paste&height=753&id=ue8f72cc4&originHeight=1129&originWidth=1736&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=107999&status=done&style=none&taskId=u08545b18-d643-4d15-9590-c4ba6208db9&title=&width=1157.3333333333333)
- Maven配置
   - 新建环境变量MAVEN_HOME；变量名：MAVEN_HOME；变量值：D:\work\Maven\apache-maven-3.6.3 。变量值是自己的maven安装目录(图上的是自定义的安装路径)：
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698743504704-fdf0cf9b-54d5-4028-a540-4f16b30d589f.png#averageHue=%23eeeeed&clientId=u5af1f25c-30d8-4&from=paste&height=179&id=u6ebae06b&originHeight=269&originWidth=1045&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=18934&status=done&style=none&taskId=u6f6ce6e5-d927-4eee-b7c9-221559f9532&title=&width=696.6666666666666)
   - 配置环境变量Path；双击Path，点击新建，添加“%MAVEN_HOME%\bin”，点击确定；
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698743591692-63bf87bf-9eff-4a3d-860e-1ca9022d36c9.png#averageHue=%23edeceb&clientId=u5af1f25c-30d8-4&from=paste&height=627&id=ufc881aef&originHeight=941&originWidth=990&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=101243&status=done&style=none&taskId=u5659d6da-0798-4c22-869e-500c1069e7f&title=&width=660)
- 命令行窗口查看
   - Win+R键弹出运行窗口，输入cmd命令打开如下窗口来测试下自己的Maven是否安装成功；测试命令mvn -v，若出现下图信息的话就证明Maven环境已经配置成功了。
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698743685221-a9636db3-4625-4be6-9796-6356cb48b4e4.png#averageHue=%23151515&clientId=u5af1f25c-30d8-4&from=paste&height=644&id=ue90b68a6&originHeight=966&originWidth=1752&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=74286&status=done&style=none&taskId=uba74d926-f0e3-4131-bc97-38bfb085b21&title=&width=1168)
- 配置maven本地仓库
   - 首先在本地新建一个文件夹repository（文件夹名称随意，尽量见名知意即可），作为本地的maven仓库：(我们放到maven的安装路径)
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698743785110-7d1393cb-b73c-4326-970d-39d7c2c27173.png#averageHue=%23fcfcfb&clientId=u5af1f25c-30d8-4&from=paste&height=243&id=uc3719e58&originHeight=364&originWidth=1300&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=27465&status=done&style=none&taskId=u2f962da6-f1b2-49ca-a01a-0907b6b7474&title=&width=866.6666666666666)
   - 接着打开maven目录下的conf/settings.xml文件，配置本地仓库
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698743952163-718a2b92-e566-4070-8c3c-6c3882832d51.png#averageHue=%23e2bf74&clientId=u5af1f25c-30d8-4&from=paste&height=386&id=u13d66bf1&originHeight=579&originWidth=1709&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=62942&status=done&style=none&taskId=u2714462d-0c67-4487-8768-12b07d3a273&title=&width=1139.3333333333333)
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
![EFUSJKAK{_A168ZERZU%9M3.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698802886912-eb25ea36-8ba6-4f3c-88f4-9b6eecc46ab0.png#averageHue=%23fefdfd&clientId=u04d500b8-06c5-4&from=drop&id=u17155b8a&originHeight=991&originWidth=2279&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=127741&status=done&style=none&taskId=uc04b5662-9274-4250-9e89-cd5ed75a805&title=)

![`D(Q$5)BS2J_DP4@`G}P`Q4.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698802898238-6649a892-acb2-4417-8914-7898f50494e5.png#averageHue=%23fefefe&clientId=u04d500b8-06c5-4&from=drop&id=u7617a8b5&originHeight=1063&originWidth=1543&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=112392&status=done&style=none&taskId=u87af2579-bf47-4399-9f73-5d56d73acb0&title=)<br />![b62213f0-cfe7-4286-baf8-3ca3075bb27f.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698802911320-633fb8ba-8586-4270-a397-4cba94e04486.png#averageHue=%23fefefe&clientId=u04d500b8-06c5-4&from=drop&id=u5374c273&originHeight=1154&originWidth=1780&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=140027&status=done&style=none&taskId=u08216c8b-db7f-48c2-af4d-dbcdb36d352&title=)
### 1.2.入门案例-Idea创建SpringBoot项目
#### (1).新建一个空项目，确认Maven版本
新建一个空项目：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695717410450-b6382b56-1238-4486-8a68-e70127ec8af5.png#averageHue=%233c4146&clientId=uc4bbefec-b764-4&from=paste&height=626&id=Wq8DL&originHeight=939&originWidth=1206&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66332&status=done&style=none&taskId=u404e616c-47aa-4cdd-a8aa-d543880d8b8&title=&width=804)<br />设置项目名称和保存路径：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695717395396-b8957411-547f-47b4-9278-5918b74e8b83.png#averageHue=%233c4042&clientId=uc4bbefec-b764-4&from=paste&height=633&id=SB0i9&originHeight=949&originWidth=1224&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=55389&status=done&style=none&taskId=ue3a5f700-4263-4563-85a7-7242dd410f6&title=&width=816)<br />设置好Maven地址和仓库地址(注意Maven版本和idea版本的协同)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695717463247-bca051d8-c58f-4120-9d79-0f4dbecb84d3.png#averageHue=%233d4246&clientId=uc4bbefec-b764-4&from=paste&height=703&id=bc3WT&originHeight=1054&originWidth=1481&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=122278&status=done&style=none&taskId=u00aa29a7-882e-4c20-915d-5bd3d12b4ed&title=&width=987.3333333333334)

#### (2).创建一个SpringBoot工程，设定项目信息并确定JDK版本
打开file，选择项目结构，新建一个spring项目并配置相关信息<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695718073621-f05f0667-b224-4ab3-af38-f62ee4a61631.png#averageHue=%233d4145&clientId=uc4bbefec-b764-4&from=paste&height=825&id=PMRAJ&originHeight=1238&originWidth=1310&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=182773&status=done&style=none&taskId=u27a9d84f-9ecd-433f-bab2-a787e778d9e&title=&width=873.3333333333334)<br />选择Spring Web项目(SpringBoot内置tomcat服务器)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695718254343-18add241-d7eb-4424-8c9b-b57731028dac.png#averageHue=%233d4145&clientId=uc4bbefec-b764-4&from=paste&height=821&id=ftzLz&originHeight=1231&originWidth=1304&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=168149&status=done&style=none&taskId=udfe27409-b610-44a1-82e4-4bb6075302d&title=&width=869.3333333333334)
#### (3).搭建一个SpringWeb项目，创建一个基于Rest风格的MVC控制器，运行程序并在浏览器中进行访问
新建一个controller类，配置好controller类的注解、访问路径和一个方法<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695722475731-226fe1ba-8886-430a-ae9d-8f05876c2b2b.png#averageHue=%23403e39&clientId=uc4bbefec-b764-4&from=paste&height=854&id=UGcyZ&originHeight=1281&originWidth=2189&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2457774&status=done&style=none&taskId=u86776da9-1af4-406b-b5c7-cd98841fd72&title=&width=1459.3333333333333)<br />运行SpringBoot启动类<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695722196578-6e54fc50-5ff2-4572-aedf-661195e7ef6b.png#averageHue=%2340403b&clientId=uc4bbefec-b764-4&from=paste&height=1011&id=WJEGR&originHeight=1516&originWidth=2552&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=3253254&status=done&style=none&taskId=ufbda32a3-1928-4992-92c0-fdac43b29d6&title=&width=1701.3333333333333)<br />访问此前定义好的方法路径<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1695722630654-90c4b934-6835-47e6-99cf-4fefe2e1f634.png#averageHue=%23f6ebe5&clientId=uc4bbefec-b764-4&from=paste&height=507&id=V4AKY&originHeight=760&originWidth=1638&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=54903&status=done&style=none&taskId=u2f55edb6-9ea7-46b3-85a4-f09a6df694d&title=&width=1092)<br />至此一个最基本的SpringBoot程序已经开发完成<br />SpringMVC简介：<br />Spring MVC（Model-View-Controller）是一个基于Java的框架，用于构建企业级Web应用程序。它通过将应用程序分解为三个组件（模型、视图和控制器）来实现解耦，从而增强了应用程序的可维护性和可扩展性。以下是Spring MVC的工作流程：

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
如下图所示，我们在Idea中创建SpringBoot项目时需要选择提供服务的网址(默认为[https://start.spring.io/](https://start.spring.io/))，但是有时候因为网络原因创建不成功，那么此时就需要去spring官网创建SpringBoot项目<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696925297088-87c8eb23-c637-48c0-94aa-3ee1a4fbb741.png#averageHue=%233d4144&clientId=u2c3e46e5-6ce0-4&from=paste&height=624&id=xGgro&originHeight=936&originWidth=1200&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=89514&status=done&style=none&taskId=ue53ff2fa-f196-4c71-a0c2-81d6fab089a&title=&width=800)
#### (1).Spring官网
打开Spring官网 [https://spring.io/](https://spring.io/)，点击project，选择SpringBoot，进入SpringBoot项目创建页面<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696925590851-4ca91d0b-6a79-44e3-90e5-c14c524217a6.png#averageHue=%23f1e9e4&clientId=u2c3e46e5-6ce0-4&from=paste&height=909&id=g0AwU&originHeight=1364&originWidth=2539&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=284397&status=done&style=none&taskId=ufa5b7961-dd4b-401f-969b-f03c2efc696&title=&width=1692.6666666666667)
#### (2).填写项目信息并选择所需的服务，创建SpringBoot项目
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696925712345-b0ebbb27-1ed4-4d2e-a6b4-ffe084388f0c.png#averageHue=%23faf9f9&clientId=u2c3e46e5-6ce0-4&from=paste&height=903&id=IS9d3&originHeight=1355&originWidth=2551&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=200682&status=done&style=none&taskId=uae3f0903-5f20-4d76-ad74-c293d1a2c6e&title=&width=1700.6666666666667)
#### (3).点击GENERATE，下载项目，解压后使用Idea打开
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696925806387-3cbc2553-d967-41cf-9571-e3be572370c0.png#averageHue=%23f8f3f0&clientId=u2c3e46e5-6ce0-4&from=paste&height=975&id=sZC4i&originHeight=1463&originWidth=1834&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=150245&status=done&style=none&taskId=u9b54b494-c7f9-41e9-b96e-a92071542f9&title=&width=1222.6666666666667)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696926386963-20ebcf1a-97fc-4d57-bc56-9078db81fb4d.png#averageHue=%23fcfcfc&clientId=u2c3e46e5-6ce0-4&from=paste&height=732&id=DVjuK&originHeight=1098&originWidth=1702&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=122149&status=done&style=none&taskId=u057698b3-4ff8-40d0-997b-803f63bf8a0&title=&width=1134.6666666666667)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696926427399-86ca0514-cc06-44c3-8b23-d5bbf9ec9a6b.png#averageHue=%233c4141&clientId=u2c3e46e5-6ce0-4&from=paste&height=938&id=C3Ucy&originHeight=1407&originWidth=2128&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1174069&status=done&style=none&taskId=u09b59d44-ffe1-44b8-a2e7-c121be0e938&title=&width=1418.6666666666667)<br />至此，Spring官网创建SpringBoot项目完成
#### (4).阿里云镜像Spring服务
将[https://start.spring.io](https://start.spring.io)替换为[https://start.aliyun.com](https://start.aliyun.com)
## 2.SpringBoot简化开发解析

- Spring程序的缺点

依赖设置繁琐<br />配置繁琐

- SpringBoot程序的优点

简化依赖配置<br />简化常用工程相关配置(如配置Bean，扫描路径，第三方攻击配置等)<br />辅助功能(内置web服务器等)<br />以上SpringBoot程序的优点通过以下四项技术来进行实现：

1. parent
2. starter
3. 引导类
4. 内嵌tomcat
### 2.1.parent依赖管理以及版本管理
1.<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698760671115-a8010f06-2dd3-41cf-bae7-952135274ad8.png#averageHue=%23fcfbec&clientId=u5af1f25c-30d8-4&from=paste&height=595&id=lhXJb&originHeight=893&originWidth=1740&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=209596&status=done&style=none&taskId=uaeb1c4aa-ce03-4494-8175-9af34db1c04&title=&width=1160)<br />2.![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698760730236-a5448215-fb87-43d1-a3a9-8a510a39a4b9.png#averageHue=%23fcfbee&clientId=u5af1f25c-30d8-4&from=paste&height=597&id=u6d48598a&originHeight=896&originWidth=1739&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=221895&status=done&style=none&taskId=u003d7ae2-e768-45d8-9f9b-932e767d80d&title=&width=1159.3333333333333)<br />3.<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698760779320-fde17129-fbd3-45f4-9382-917d5ad973e4.png#averageHue=%23faf8e9&clientId=u5af1f25c-30d8-4&from=paste&height=611&id=ucbf8f601&originHeight=916&originWidth=1731&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=307583&status=done&style=none&taskId=udd84a234-0bec-42fc-baf8-1be5a396b57&title=&width=1154)<br />4.![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698760829693-97f75dbb-3f39-4fcc-b045-b98937705b01.png#averageHue=%23faf6dc&clientId=u5af1f25c-30d8-4&from=paste&height=608&id=u33cb5608&originHeight=912&originWidth=1747&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=360467&status=done&style=none&taskId=u08a41d86-4db0-4d84-83d5-3d8ee8ffdc1&title=&width=1164.6666666666667)<br />SpringBoot2.X版本通过spring-boot-starter-parent以及spring-boot-dependencies两个POM文件来实现常用技术的版本管理，开发者无需关心相关功能的版本冲突问题；
#### (1).spring-boot-starter-parent.pom文件的版本管理示例
在我们的项目的POM文件中加入servlet依赖，不指定依赖版本，但是在项目的Maven管理中可以看到依赖的资源中有servlet的版本信息，这就是parent.pom文件已经做好了SpringBoot2.5.5相关依赖的版本管理(经过测试与SpringBoot2.5.5相适配的servlet版本，4.0.1是最好的选型)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696932843490-33b5ae9c-9c56-4002-a83d-891855323be3.png#averageHue=%23475945&clientId=u4b38e313-bd95-4&from=paste&height=765&id=gMudc&originHeight=1147&originWidth=1964&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1977066&status=done&style=none&taskId=u93d26cce-ee85-4f81-9207-df4ecedb4de&title=&width=1309.3333333333333)
#### (2).spring-boot-starter-parent与spring-boot-dependencies依赖管理与版本管理解析
依次点击进入spring-boot-starter-parent与spring-boot-dependencies，可以看到spring-boot-dependencies.pom在<properties>标签定义了若干个版本信息，在<dependencyManagement>标签定义了坐标依赖管理并且引用了上述的版本，所以我们在项目中的只需引入相关依赖，无需定义版本号即可使用。<br />spring-boot-starter-parent.pom:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696933242315-b279767d-a175-4215-95b5-50a2248059e3.png#averageHue=%233a3633&clientId=u4b38e313-bd95-4&from=paste&height=866&id=c78Cn&originHeight=1299&originWidth=1959&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2239704&status=done&style=none&taskId=ube6c2117-8f97-49ec-a03a-cce96df464b&title=&width=1306)<br />spring-boot-dependencies.pom:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696933269314-2e773c67-d352-492c-bf50-4dff68a98360.png#averageHue=%23383633&clientId=u4b38e313-bd95-4&from=paste&height=879&id=KY5AP&originHeight=1318&originWidth=1874&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2284178&status=done&style=none&taskId=u55707eae-86d2-4ed8-ace3-18163e24756&title=&width=1249.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696933287925-3d766b13-e1f3-4fb8-927f-595fcf5b8acf.png#averageHue=%23393633&clientId=u4b38e313-bd95-4&from=paste&height=745&id=VN9yC&originHeight=1118&originWidth=1630&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1787834&status=done&style=none&taskId=u6bae8459-f80f-40a8-b33f-3a3ad00eeb2&title=&width=1086.6666666666667)
#### (3).不同版本SpringBoot的版本管理对比
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1696934096269-70f2300b-c04b-4d67-94ba-4427b06207a9.png#averageHue=%23303730&clientId=u4b38e313-bd95-4&from=paste&height=747&id=b1KOK&originHeight=1121&originWidth=2232&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2436934&status=done&style=none&taskId=u6cb6f4a6-9b8a-4c65-a0ad-dfdd664ccba&title=&width=1488)<br />小结：<br />1.开发SpringBoot程序，在pom文件中需要继承spring-boot-starter-parent<br />2.继承parent模块可以避免多个依赖依赖了同一种技术出现的依赖版本冲突的问题
### 2.2.Starter与依赖传递
#### (1).Starter依赖传递简析
Starter是什么：<br />Starters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包(依赖传递)，可以一站式集成Spring及其他技术，而不需要到处找示例代码和依赖包。例如，如你想开发web应用，只要加入spring-boot-starter-web启动器依赖就能使用了。<br />以spring-boot-starter-web依赖为例：<br />点击进入spring-boot-starter-web依赖，可以看到spring-boot-starter-web已经引入了web开发中常用的一些依赖如：spring-webmvc，spring-web，spring-boot-starter-tomcat等，而这些依赖中又引入了一些其他的依赖，这些引入的依赖就从内层传递到外层依赖中，我们开发中只要引入了spring-boot-starter-web依赖，那么这些被集成的依赖我们项目中都能直接使用。<br />SpringBoot之所以好用，就是因为已经集成了大量的starter供我们使用，我们只需要关心于业务开发，无需花精力配置我们要用到的各种依赖，一个starter足以解决一类问题。<br />![Starter依赖传递.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697006570677-02a29625-9d94-4068-9244-ac324ffc8704.png#averageHue=%23949190&clientId=u06b56fff-3011-4&from=drop&id=WqS13&originHeight=1062&originWidth=2293&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1271461&status=done&style=none&taskId=u4f605abe-dd58-437f-bb82-d199119306d&title=)
#### (2).starter与parent区别

- starter是SpringBoot中常见的各种启动器，定义了当前技术中使用的所有依赖坐标，以达到减少依赖配置的目的；
- 所有SpringBoot项目都需要继承，它其中定义了若干个常用依赖坐标的版本号(依赖管理，并非依赖)，以达到减少依赖冲突，方便版本选型的目的;

扩展：实际开发中仅需要书写GAV中的G和A无需写V，除非该版本的parent中没有定义引入依赖的版本号。例如：alibaba的druid，需要写version(需要注意版本冲突)。

![pom文件的GAV选择.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697007829620-90077e08-9140-462d-8113-3acb744554ac.png#averageHue=%23959291&clientId=u06b56fff-3011-4&from=drop&id=ZKZ2Q&originHeight=960&originWidth=2293&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=971821&status=done&style=none&taskId=uec52e2db-79af-49a2-bb61-3678185b5fa&title=)
### 2.3.引导类
以上介绍的parent以starter都是帮我们减少项目的配置工作，说完配置，接下来讲SpringBoot是如何工作的。通过SpringBoot入门案例的介绍，我们知道SpringBoot程序的入口就是SpringBoot工程创建时自带的那个main方法类了，运行这个类就可以启动SpringBoot工程的运行。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697009644754-3ba77d42-cafa-4b9c-a455-2b88658077dc.png#averageHue=%23393532&clientId=u28eb3c43-7464-4&from=paste&height=291&id=YRcaQ&originHeight=437&originWidth=1469&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=667403&status=done&style=none&taskId=u49c2b80c-0510-4843-bd9f-993980a48a3&title=&width=979.3333333333334)
#### (1).引导类创建容器
如图所示这个类的内容很简单，就是一个类调用了一个方法，那么这个类是什么类，这个方法又是干了什么呢？<br />先来思考一个简单的事情，SpringBoot的作用是简化Spring的开发，那么也就是说它的本质还是一个Spring，既然是Spring，那么它必然有一个管理Bean的容器，那么这个类的第一个作用就出来了-初始化容器。<br />首先我们获取SpringApplication.run()方法的返回值，获取的就是Spring的容器对象ApplicationContext，所以SpringBoot启动类的第一个作用就是加载了Spring容器<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697011207540-253606d8-f890-476b-b92c-2ac6e7661cb1.png#averageHue=%233a3532&clientId=u28eb3c43-7464-4&from=paste&height=344&id=xRhiv&originHeight=516&originWidth=1432&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=762542&status=done&style=none&taskId=ua71c2861-0ba4-4aa3-b11b-b76dc946d80&title=&width=954.6666666666666)<br />点到ConfigurableApplicationContext接口中我们可以看到该类继承了ApplicationContext类：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697011250001-c8681f1b-0c83-4d19-b1f7-7bf9ddaa3daf.png#averageHue=%233e3936&clientId=u28eb3c43-7464-4&from=paste&height=278&id=olpEG&originHeight=417&originWidth=1207&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=548779&status=done&style=none&taskId=ue8bfef31-105c-49ae-a8e8-153f626ce37&title=&width=804.6666666666666)<br />通过getBean方法我们可以获取已经注册的Bean，输出后可以看到<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697011913687-085ea82f-ba98-4471-bf85-be5081ee3536.png#averageHue=%23403e39&clientId=u28eb3c43-7464-4&from=paste&height=898&id=qAvnb&originHeight=1347&originWidth=2411&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2958359&status=done&style=none&taskId=u5727fc72-8acc-4323-bb61-7efe807ba9b&title=&width=1607.3333333333333)
#### (2).引导类扫描包并注册Bean
我们学习SSM框架的时候，除了初始化容器，还得在配置文件里写一个东西叫做包扫描器，但是使用SpringBoot的时候并没有进行这样的一个操作，那么我们注册Bean是不是没法做了呢？很显然并不是，我们在上述的演示中其实已经注册了一个DemoController的Bean，那么他是怎么注册的呢?其实扫描的操作是通过@SpringBootApplication注解实现的。<br />点进@SpringBootApplication注解可以看到一个@ComponentScan注解，该注解就是帮助实现包扫描的<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697012277123-a9ee5aa4-0736-47dc-a9ee-8a21d689a30c.png#averageHue=%233d3834&clientId=u28eb3c43-7464-4&from=paste&height=659&id=qlJBs&originHeight=989&originWidth=1055&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1141140&status=done&style=none&taskId=ude50b201-d47b-491d-81e7-328f5b91947&title=&width=703.3333333333334)<br />扫描的就是引导类所在的包以及它下面的子包，如果遇到对应的注解，那么就将其注册到容器中，我们就可以获取到。<br />例如我们新建一个工具类DemoComponent，我们在SpingBoot启动类中获取该Bean，可以看到成功从容器中获取到了Bean<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697012596179-d4dadb88-817d-4ddb-8fd6-82b9f879e473.png#averageHue=%2343443d&clientId=u28eb3c43-7464-4&from=paste&height=238&id=Rtt75&originHeight=357&originWidth=1217&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=403160&status=done&style=none&taskId=u9f6cb64e-66e8-4644-91a7-7da1dde82fb&title=&width=811.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697012735545-626c5410-7188-4f90-9295-fb3801f7ca1b.png#averageHue=%23413f39&clientId=u28eb3c43-7464-4&from=paste&height=900&id=wFeKW&originHeight=1350&originWidth=2312&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2947303&status=done&style=none&taskId=u8fcac74a-48b9-4726-9c2c-6c41e6060b0&title=&width=1541.3333333333333)<br />如果将该类放到SpringBoot启动类的包外可以看到报错，并提示找不到对应的Bean<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697012917232-ddeaa043-e0f9-4d76-bcc3-27b75303ba7d.png#averageHue=%233f3c38&clientId=u28eb3c43-7464-4&from=paste&height=875&id=omCLC&originHeight=1313&originWidth=2371&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2939533&status=done&style=none&taskId=u5421b339-0347-4196-ad36-4bcbc797693&title=&width=1580.6666666666667)
#### 总结
引导类的两个作用：<br />1.SpringBoot工程通过引导类来启动并创建一个Spring容器；<br />2.扫描引导类所在的包以及它的子包，将带有注解类注册进容器；
### 2.4.内嵌Tomcat服务器
通过引导类的main方法将SpringBoot项目运行了起来。但是运行java程序不应该是执行完就结束了吗？但是我们现在明显是启动了一个web服务器，不然网页怎么能正常访问呢？这个服务器是在哪里写的呢？
#### (1).tomcat依赖引入
在我们介绍starter的依赖传递时候点开了spring-boot-starter-web，里面就引入了tomcat依赖，现在我们再来回顾一下。![Starter依赖传递.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697014805499-6c8fbac7-5a16-4dff-b68f-25fa7a20c3f4.png#averageHue=%23949190&clientId=u1c5690e3-8d7d-4&from=drop&id=QKxZa&originHeight=1062&originWidth=2293&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1271461&status=done&style=none&taskId=u859fa18c-2d62-4823-802e-bb5bbeb8700&title=)<br />点进spring-boot-starter-tomcat依赖，这里面有一个核心的坐标，tomcat-embed-core，叫做tomcat内嵌核心。就是这个东西把tomcat功能引入到了我们的程序中。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697014920176-44af1ca6-a4d9-47bf-a3dd-dfe05228aec2.png#averageHue=%23373331&clientId=u1c5690e3-8d7d-4&from=paste&height=857&id=TsLYQ&originHeight=1285&originWidth=1542&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1914310&status=done&style=none&taskId=u2c136874-41fe-46d9-9f88-646084a21a1&title=&width=1028)
#### (2).tomcat运行原理
现在我们相当于把服务器web服务器放到了一个程序中，但是按照常理来讲不是应该把程序放到服务器中运行吗？这么做的原因是：Tomcat服务器是java语言开发的，既然是使用java语言开发的，运行的时候肯定符合java程序运行的原理，java运行的核心是对象，既然是对象，我们就可以把它交给Spring进行管理。tomcat服务器运行其实是以对象的形式在Spring容器中运行的，所以我们没有安装tomcat，而且还能使用它。
#### (3).web服务器更换
那既然是web服务器个对象，如果把这个对象从Spring容器中去掉是不是就没有web服务器的功能呢？当然可以，通过依赖排除可以去掉这个web服务器功能。根据SpringBoot的工作机制，用什么技术，加入什么依赖就行了。例如排除tomcat服务器后可以使用SpringBoot提供的内置服务器jetty。<br />通过<exclusions>标签我们可以排除掉tomcat依赖，排除后运行SpringBoot项目，可以看到不显示加载tomcat服务器的信息了，程序运行完后就立刻停止了，并且右侧的Maven依赖管理中也没有tomcat依赖了。
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
![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697015627808-2016ce27-f459-4ca2-988f-bf8372036e0a.png#averageHue=%2340403b&clientId=u1c5690e3-8d7d-4&from=paste&height=961&id=nMRqY&originHeight=1442&originWidth=2525&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=3135823&status=done&style=none&taskId=u07b3c7da-d576-465f-9e81-cb1535dacb2&title=&width=1683.3333333333333)<br />通过增加jetty服务器的依赖，再次运行程序，可以看到加载出了jetty服务器的信息，并且通过网址可以正常访问<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697016071787-001c0bab-f9f5-4861-92a4-ae34da854acb.png#averageHue=%23403d38&clientId=u1c5690e3-8d7d-4&from=paste&height=523&id=JyJ8U&originHeight=785&originWidth=2406&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1781348&status=done&style=none&taskId=u541ab063-ef88-4403-9bd4-f088401109b&title=&width=1604)
## 3.SpringBoot基础配置
### 3.1.application.properties文件配置属性
#### （1).properties文件语法格式
目前我们的服务器端口是8080(默认)，如果我们想修改端口号该如何配置呢？SpringBoot通过application.properties文件配置或者修改项目的一些属性，例如我们把服务器的端口号修改为8081可以在application.properties文件中这样做：<br />打开resource目录下的application.properties文件添加服务器端口配置server.port=8081<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697453340211-970ac789-3a8d-4167-be65-7104f14e2a65.png#averageHue=%23464743&clientId=ufd65cff7-db6d-4&from=paste&height=436&id=ufe0af4fd&originHeight=654&originWidth=1074&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=557306&status=done&style=none&taskId=u45e1904b-fd56-4bab-b6e5-c6f179ee30a&title=&width=716)<br />启动后的项目日志中，端口已变为8081：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697453902260-48860226-8bbb-4523-9fbb-b4c8a7287b0b.png#averageHue=%233c3935&clientId=ufd65cff7-db6d-4&from=paste&height=482&id=u3425c6e1&originHeight=723&originWidth=2386&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1574886&status=done&style=none&taskId=uad0aa364-d8d4-4fab-a076-6d556a3d249&title=&width=1590.6666666666667)

Properties 文件使用简单的键值对（key=value）格式。以下是 Properties 文件的基本语法规则：<br />**1.键值对：** Properties 文件由一系列键值对组成，键和值之间使用等号（=）或者冒号（:）进行分隔。例如：
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
banner修改：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697458347587-f525526a-7efa-4b50-9444-36b08c3a4897.png#averageHue=%233c3936&clientId=ud4c61541-8083-4&from=paste&height=775&id=u370561d8&originHeight=1162&originWidth=2319&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2400466&status=done&style=none&taskId=u41c94aa3-c381-482b-b19d-1c9aad952ef&title=&width=1546)<br />Banner在线生成工具：[https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)
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
SpringBoot除了.properties配置文件格式外，还支持.yma和.yaml配置文件格式。<br />YAML（YAML Ain't Markup Language）是一数据序列化格式，常用于配置文件和数据交换。以下是 YAML 的一些基本语法规则：<br />**1.缩进：**YAML 使用缩进表示层次关系，通常使用空格键（Space）或制表符（Tab）进行缩进。同一层级的元素必须具有相同的缩进级别。
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
SpringBoot项目包含了许多默认的配置，要了解我们的项目中包含了那些默认配置，需要去Spring官网进行查阅。<br />进入Spring官网，projects选择SpringBoot，点击"LEARN"进入如下页面，点击"Reference Doc"选择[Application Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties)即可进入.properties官方配置文档<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697458747543-fd4aec67-3eef-4442-ab2a-2207c03f2097.png#averageHue=%23f5eeea&clientId=uf3155053-12c2-4&from=paste&height=887&id=u613a58ac&originHeight=1331&originWidth=2356&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=272973&status=done&style=none&taskId=u9214aee4-a542-4037-8567-24ab61f29bd&title=&width=1570.6666666666667)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697458862486-e3a3ce3c-6211-458b-a116-4e4653d00d61.png#averageHue=%23fefcfb&clientId=uf3155053-12c2-4&from=paste&height=891&id=JsgfZ&originHeight=1336&originWidth=1845&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=207228&status=done&style=none&taskId=ua1e60b1b-63b2-4012-819f-fe0a5c7417a&title=&width=1230)<br />文档中有多配置项，包括配置项名、配置的描述以及默认值，以后我们自己的项目中需要引入或者修改配置，可以根据官方文档进行查阅。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697458995745-02e5f7a6-354d-4489-8933-823f6455bfb7.png#averageHue=%23fefefe&clientId=uf3155053-12c2-4&from=paste&height=895&id=u68eef5b0&originHeight=1342&originWidth=2106&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=217942&status=done&style=none&taskId=u32bc098b-f8cb-4e67-853b-f285ca58577&title=&width=1404)<br />需要注意的是，可引入的配置是与项目所引入的依赖息息相关的，如果项目中没有使用到某种技术(依赖)，那么我们也无法在.propertise文件中配置相关的属性，以上的例子中之所以能配置服务器端口、banner、log是因为在我们的项目中引入了web服务的依赖，其中又引入了spring-boot-starter依赖(依赖传递)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697459595135-12e3fd56-2102-4985-bac0-855a5646698e.png#averageHue=%233a3f44&clientId=u12c50cbf-4f8c-4&from=paste&height=329&id=u7390894c&originHeight=493&originWidth=619&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=151520&status=done&style=none&taskId=ud731a68c-bb77-4a0b-a811-22e94876e12&title=&width=412.6666666666667)
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
结果演示：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697525208347-1df883b6-271a-4923-81ec-187b7b2954cc.png#averageHue=%233f3d38&clientId=ua5918304-5e60-4&from=paste&height=870&id=ucb848ad2&originHeight=1305&originWidth=2249&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=2729735&status=done&style=none&taskId=u9f429606-5b64-466f-a622-43e1508fd02&title=&width=1499.3333333333333)<br />注意：在使用@Value注解时，确保被注入的属性在application.properties或application.yml文件中有对应的配置。如果没有找到对应的配置，SpringBoot应用启动时可能会抛出异常。
#### （2).@ConfigurationProperties注入属性
在 SpringBoot 中，当想需要获取到配置文件数据时，除了可以用 Spring 自带的 @Value 注解外，SpringBoot 还提供了一种更加方便的方式：@ConfigurationProperties。只要在 Bean 上添加上了这个注解，指定好配置文件的前缀，那么对应的配置文件数据就会自动填充到 Bean 中，以下为@ConfigurationProperties的用法示例：<br />1.创建配置类
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
在Spring中，你可以使用Environment对象来获取应用程序中配置的属性值。Environment接口提供了许多方法，用于获取属性、配置文件中的属性、系统属性等。你可以通过注入Environment对象来访问这些属性。<br />示例：
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
@PropertySource是一个Spring Framework的注解，它用于指定外部属性源文件，允许将外部属性加载到Spring的环境中。当你需要在Spring应用程序中使用自定义的属性文件而不是默认的application.properties或application.yml时，你可以使用@PropertySource注解。<br />以下是使用@PropertySource注解的基本步骤：<br />1.创建一个配置文件（例如 custom.properties）：<br />在项目的src/main/resources目录下创建一个自定义的属性文件，比如 person.properties，并在其中定义属性：
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
3.结果示例：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697535229423-19202b3f-a3f8-4436-bd48-8dc70f45eb43.png#averageHue=%233d4033&clientId=u8bc9897c-b9c4-4&from=paste&height=265&id=u51dc3f25&originHeight=398&originWidth=1367&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=398781&status=done&style=none&taskId=u39bf0a89-e22b-49f4-8da5-7f701cb493e&title=&width=911.3333333333334)
#### （5).**@Profile**注解进行多环境配置
在项目开发中，包括多种环境，例如线上环境prod(product)、开发环境dev(development)、测试环境test、提测环境qa、单元测试unitest等等。不同的环境需要进行不同的配置，从而在不同的场景中跑我们的程序。例如prod环境和dev环境通常需要连接不同的数据库、需要配置不同的日志输出配置。还有一些类和方法，在不同的环境下有不同的实现方式，使用注解@Profile可以实现多环境配置。<br />Spring框架中的@Profile注解允许你为不同的环境配置不同的bean。通过使用@Profile注解，你可以根据特定的环境激活或者禁用特定的bean定义。<br />@Profile使用方法：<br />在这个例子中，DevelopmentConfig和ProductionConfig分别针对开发环境和生产环境进行了配置。
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
SpringBoot 对多环境配置提供了支持，一方面是使用注解@Profile，除了@Profile注解可以标明某些方法和类具体在哪个环境下注入，SpringBoot的环境隔离还可以使用多资源文件的方式，进行一些参数的配置。<br />以下将演示如何使用多资源文件的方式进行多环境配置：<br />Springboot的资源配置文件除了application.properties之外，还可以有对应的资源文件application-{profile}.properties。例如，一个应用的工作环境有：dev、test、prod，所以我们新建4个配置文件：

- applcation.properties - 公共配置
- application-dev.properties - 开发环境配置
- application-test.properties - 测试环境配置
- application-prod.properties - 生产环境配置

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697537868814-396db3ed-160b-4b3a-af9a-640fbbea0d14.png#averageHue=%23464946&clientId=u31cf80a5-7e52-4&from=paste&height=283&id=uce9ddc93&originHeight=424&originWidth=543&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=166467&status=done&style=none&taskId=u860f0db0-506a-4558-b053-5d46f5df2e9&title=&width=362)<br />在controller层中的Sound.java中新建一个接口，返回配置文件中的信息：name和local。
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
启动Springboot后，访问[http://localhost:2222/sound/hello](http://localhost:2222/sound/hello)，则会有如下结果。如果此时访问[http://localhost:1111/sound/hello](http://localhost:11111/sound/hello)则会无法访问，因为此时spring.profiles.active=prod激活的是prod环境，使用的是application-prod.properties中的配置。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697538857693-39db8448-e40a-471f-908c-a52fb3c182f7.png#averageHue=%23edd7c8&clientId=u31cf80a5-7e52-4&from=paste&height=244&id=uf9d2dad6&originHeight=366&originWidth=984&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=26439&status=done&style=none&taskId=u1d45d68c-788e-448c-9fbd-cb78422481b&title=&width=656)<br />更改application-dev.properties文件，spring.profiles.active=dev激活dev环境。重启Springboot则可以访问[http://localhost:1111/sound/hello](http://localhost:11111/sound/hello)。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697538813968-5c22bf65-70fd-4b89-8823-37ea5301a9cc.png#averageHue=%23e9cdbb&clientId=u31cf80a5-7e52-4&from=paste&height=214&id=s1HOE&originHeight=274&originWidth=834&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21492&status=done&style=none&taskId=u09607220-cd7f-40b0-9d09-412a9de19f5&title=&width=652)
#### （7).SpringBoot整合JUnit
在 SpringBoot 中，JUnit是一个常用的单元测试框架，它可以帮助你测试应用程序的各个部分，包括服务层、控制器、数据访问层等。SpringBoot 提供了一些便利的功能，使得在测试中使用 JUnit 更加容易。以下是在 Spring Boot 中使用 JUnit 进行单元测试的一般步骤：<br />1.在pom文件中添加测试依赖：
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
这个依赖包含了 SpringBoot 测试框架以及JUnit，要注意的是，在我们创建SpringBoot项目的时候，SpringBoot默认已经帮助我们添加了spring-boot-starter-test依赖 (如果不加junit依赖运行测试类时可能会卡在Resolving Maven dependencies运行界面)。<br />2.编写测试方法：
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
该测试类与测试方法均为创建SpringBoot项目时自动创建。如果需要自己创建测试类，需要在自定义的测试类加上@SpringBootTest注解，@SpringBootTest 注解用于指示这是一个 SpringBoot测试，并且会自动加载应用程序的上下文(获取Spring容器，以注入Bean，要注意测试类需要位于引导类所在的包及其子包，否则@SpringBootTest注解的的classes属性要显式的加上引导类,否则识别不到引导类)，测试方法上需要加上@Test注解。<br />4.运行结果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1697639431436-05a9505b-09c7-4b50-ad65-6a9f8797c7c0.png#averageHue=%23423f3c&clientId=u4a7d871e-3634-4&from=paste&height=367&id=u4e235c3d&originHeight=551&originWidth=1377&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=644967&status=done&style=none&taskId=u2b66069a-5f60-47e8-9e02-d6dbea05f1b&title=&width=918)

## 4.数据库访问
在 SpringBoot 中，可以使用 Spring Data JPA、Spring JDBC、MyBatis 、MyBatis-plus等多种方式访问数据库，本章将使用SpringBoot整合MyBatis和MyBatis-plus框架来进行持久层数据库的访问。
### 4.1.SpringBoot整合Mybatis
MyBatis 是一个开源的持久层框架，它是一个优秀的基于 Java 的持久层框架。MyBatis 通过 XML 文件或注解的方式将对象与 SQL 语句映射起来，从而避免了传统 JDBC 编程中手工设置参数以及获取结果集的麻烦，使得数据库操作更加方便、快捷、安全。这一节我们将使用SpringBoot来整合并使用Mybatis。
#### （1).配置数据源
首先我们先新建一个全新的模块，在依赖添加中勾选SQL下的Mybatis Framework和MySQL Driver依赖，点击Finish，这样我们就创建了一个包含Mybatis依赖的新项目。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698109881355-06472148-1362-4c61-a748-892994e92131.png#averageHue=%233c4144&clientId=u3ec899d4-91d9-4&from=paste&height=628&id=u4941d1b2&originHeight=942&originWidth=1098&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=62758&status=done&style=none&taskId=u3fb4eebb-e909-4753-af4d-8fb39390dce&title=&width=732)<br />如果新建项目时不勾选以上依赖，我们也可以在pom文件中手动添加Mybatis Framework和MySQL Driver的依赖坐标：
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
在数据库中我们创建一个book表，用于存储书本相关信息：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698110789757-e58beda7-951e-41b0-af17-411cd785afed.png#averageHue=%23f8f7f7&clientId=u3ec899d4-91d9-4&from=paste&height=935&id=u7aa57acb&originHeight=1403&originWidth=2034&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=172738&status=done&style=none&taskId=ubfe02376-6b41-49ae-90eb-3f953b2206c&title=&width=1356)<br />创建一个对应book表的实体类Book：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698110904806-7de2744e-e431-4640-82c6-c532c582f058.png#averageHue=%23474843&clientId=u3ec899d4-91d9-4&from=paste&height=388&id=u104d75f7&originHeight=582&originWidth=1083&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=373571&status=done&style=none&taskId=u9f0f8127-5978-4f42-8df9-4393ed71ec8&title=&width=722)
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
创建持久层BookMapper接口，定义操作数据库表的方法：(此处我们用注解的形式实现数据库的查询和插入操作)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698111226541-73b52f53-a042-41d6-8b95-544976cbc460.png#averageHue=%234e4d42&clientId=u3ec899d4-91d9-4&from=paste&height=491&id=u5938290e&originHeight=736&originWidth=1698&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=841555&status=done&style=none&taskId=u1fff7399-b848-409d-9166-1a42cea29dd&title=&width=1132)
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
在SpringBootTests类中进行功能验证：(以查询和插入数据为例)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698111424991-df48a383-6500-42f6-887f-7b0022e45f12.png#averageHue=%234a4940&clientId=u3ec899d4-91d9-4&from=paste&height=559&id=uf8989476&originHeight=839&originWidth=1598&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=902535&status=done&style=none&taskId=ueaa97786-8cd0-4f1d-ba8a-e59978e0562&title=&width=1065.3333333333333)<br />运行结果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698111481493-b60f5e05-d02b-458f-b4b8-c079552c14b7.png#averageHue=%233b3835&clientId=u3ec899d4-91d9-4&from=paste&height=437&id=u05298858&originHeight=655&originWidth=1805&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=728879&status=done&style=none&taskId=ua4569c70-aca4-4d2f-8598-a2793649e4d&title=&width=1203.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698111521892-991e1be6-6414-4a55-b429-769117c74a48.png#averageHue=%23f8f4f3&clientId=u3ec899d4-91d9-4&from=paste&height=301&id=ucdec640d&originHeight=451&originWidth=1269&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=32604&status=done&style=none&taskId=u218fe683-5f17-4772-8484-705940ea3d6&title=&width=846)<br />以上就是一个简单的 SpringBoot 整合 MyBatis 的示例，至此我们通过SpringBoot整合Mybatis并实现数据库访问的功能已经完成。
#### （3).Mybatis以xml映射文件的方式进行数据库访问
在第二小节，我们是以注解的方式实现数据库的查询和插入操作的，使用注解的方式直观、快捷，但是对于复杂SQL的使用，注解的方式不太适合，这一小节我们将介绍Mybatis以xml映射文件的方式进行数据库访问。<br />在resource目录下新建一个mapper文件夹，在mapper中创建xxMapper.xml对应mapper下的持久层接口：(此处以students表为例)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698112717778-8b9e7a78-6ba3-4b9b-9973-9ed351ebd221.png#averageHue=%23fbfafa&clientId=u3ec899d4-91d9-4&from=paste&height=426&id=u7883e736&originHeight=639&originWidth=1281&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=53043&status=done&style=none&taskId=u67914965-42a3-4159-b3fa-e57d64898cc&title=&width=854)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698112777705-ae0b0c80-eb1c-4018-bf56-5effb338eca1.png#averageHue=%23404343&clientId=u3ec899d4-91d9-4&from=paste&height=174&id=u9d87e544&originHeight=178&originWidth=546&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=49640&status=done&style=none&taskId=u86e91182-4ce9-45d6-83f3-485b102fdd6&title=&width=534)<br />yml配置：
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
以上是初始的xml文件， namespace: 指向相关的dao类(即每个Mapper.xml对应待实现方法的持久层接口)。必须是完整的路径，底层会自动映射到指定的实现类。<br />mapper标签内容：
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
同样我们在测试类中进行测试，结果如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698114112131-9d3f1594-5cd0-4c6b-a15e-91dbaaa30c8a.png#averageHue=%233c3835&clientId=u3ec899d4-91d9-4&from=paste&height=785&id=ue92d7190&originHeight=1178&originWidth=1815&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1294129&status=done&style=none&taskId=ud8666b29-06c7-46e0-af71-d5aee826de3&title=&width=1210)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698114140774-0275abb6-398c-4f49-b362-4439f93997c2.png#averageHue=%23fbfbfb&clientId=u3ec899d4-91d9-4&from=paste&height=137&id=u286e5422&originHeight=205&originWidth=1084&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=9480&status=done&style=none&taskId=u33a2573e-7fca-45e1-882a-59f6e58956f&title=&width=722.6666666666666)<br />扩展：除了基础的增删改查语句外，Mapper.xml中还可以使用动态SQL：<br />**1.if元素：** 使用**<if>**元素可以根据条件包含或排除SQL片段。
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
在这个例子中，**<if>**元素根据**username**和**age**是否为null来动态添加了条件。<br />**2.choose、when、otherwise元素：** 使用**<choose>**、**<when>**和**<otherwise>**元素可以实现类似于Java中的**switch**语句的功能。
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
这个例子中，根据**condition**的不同值，选择不同的条件进行查询。<br />**3.foreach元素：** 使用**<foreach>**元素可以遍历集合，生成对应的SQL片段。
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
**collection**: 指定要迭代的集合的名称或表达式。这可以是一个List、数组或者其他可迭代对象。<br />**item**: 指定在每次迭代中将集合中的元素赋值给的变量名。在SQL语句中，可以使用这个变量引用集合中的当前元素。<br />这个例子中，根据传入的**idList**动态生成了IN语句的条件。<br />4.set元素：<trim>元素用于修剪生成的SQL语句，而<set>元素用于动态更新语句中的SET子句。
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
MyBatis-Plus（简称 MP）是 MyBatis 的增强工具库，是一个开源的、性能优越的持久层框架，它扩展和增强了 MyBatis 的功能，提供了大量实用的特性和工具，可以极大地简化 MyBatis 的开发流程，提高开发效率。以下是 MyBatis-Plus 的一些主要特点和功能：<br />1.简化CRUD操作

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
3.代码生成器<br />MyBatis-Plus Generator： MyBatis-Plus 提供了代码生成器，可以根据数据库表自动生成 Entity、Mapper、Service、Controller 等代码，减少了手动编写重复代码的工作量。<br />4.性能优化<br />性能优化： MyBatis-Plus 对常用的 SQL 语句进行了性能优化，提供了多种方式来避免 N+1 查询问题，减少数据库访问次数，提高查询性能。<br />5.其他特性

- **注解支持：** MyBatis-Plus 提供了丰富的注解支持，可以通过注解方式配置主键生成策略、逻辑删除字段等信息。
- **乐观锁支持：** MyBatis-Plus 支持乐观锁功能，通过 @Version 注解标识乐观锁字段，自动处理并发冲突。
- **多租户支持：** MyBatis-Plus 支持多租户应用场景，可以方便地实现基于租户的数据隔离。

总的来说，MyBatis-Plus 提供了丰富的功能和工具，使得开发者能够更加便捷地进行数据库操作，减少了很多传统 MyBatis 开发中的样板代码，提高了开发效率和代码质量。 MyBatis-Plus 的官方文档中包含了更详细的信息和示例，可以作为学习和使用的参考[https://baomidou.com/](https://baomidou.com/)。<br />MyBatis-Plus与MyBatis的区别：

- 导入的依赖坐标不同
- 持久层实现开发简化

以下我们来实现SpringBoot整合MyBatis-Plus：
#### （1).新建项目导入MyBatis-Plus坐标和配置数据源
同样地我们首先新建一个模块，填好项目信息后进入依赖选择界面，进入依赖选择界面点击	SQL，此时我们发现SQL下没有MyBatis-Plus依赖可选(Spring官方暂时还未收录MyBatis-Plus坐标)，那么此时我们就需要手动在pom文件中导入MyBatis-Plus坐标。<br />选择SQL下的依赖时我们只选择MySQL驱动：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698301337546-7a90c00e-9ae5-4981-b5d4-59096db8b529.png#averageHue=%233d4145&clientId=uded20bc5-254f-4&from=paste&height=548&id=u91f23bce&originHeight=822&originWidth=975&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=49969&status=done&style=none&taskId=u678c286e-2306-43e1-aee1-6c0fc32f256&title=&width=650)<br />导入MyBatis-Plus依赖：
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
在数据库中我们创建一个book表，用于存储书本相关信息：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698303804442-2b7781fb-7206-4d7c-8cc0-9ae3fafe5d8d.png#averageHue=%23f9f8f7&clientId=uded20bc5-254f-4&from=paste&height=765&id=u71303f7f&originHeight=1147&originWidth=2020&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=154122&status=done&style=none&taskId=u43c769fe-ce20-4423-b336-d508ac9e24f&title=&width=1346.6666666666667)<br />创建一个对应book表的实体类Book：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698303889653-2963416d-f890-4464-adf7-8ef1df91d8ed.png#averageHue=%234c4d46&clientId=uded20bc5-254f-4&from=paste&height=507&id=ua7d3f591&originHeight=760&originWidth=1490&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=731240&status=done&style=none&taskId=udac84626-9cb6-4c69-9cf4-8af779dddfa&title=&width=993.3333333333334)<br />创建持久层BookDao接口：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698303948812-473e5166-2d49-4c47-b648-e63b71fd993f.png#averageHue=%23484943&clientId=uded20bc5-254f-4&from=paste&height=443&id=u8a444576&originHeight=664&originWidth=1536&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=644683&status=done&style=none&taskId=uf14e09e5-d0d8-4c29-b901-f825e2cabba&title=&width=1024)<br />创建BookDao接口后，我们直接继承BaseMapper<T>接口，该接口是由MyBatis-Plus提供，BaseMapper接口中已经实现了我们日常开法中常用的CRUD功能，继承它后我们就无需编写大多数简单的CRUD SQL了，极大地简化 MyBatis 的开发流程，提高开发效率。<br />BaseMapper接口：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698304195091-71954936-041e-47eb-b264-60b674897490.png#averageHue=%23393532&clientId=uded20bc5-254f-4&from=paste&height=807&id=uec18dfe3&originHeight=1211&originWidth=1437&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1140086&status=done&style=none&taskId=u5b659ed0-d7f9-4fad-8adf-d3d5bd3247e&title=&width=958)<br />实现BsaeMapper接口后，BookDao接口的方法：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698304289206-c9ec6ebd-e7c8-4851-a378-f2b4cb04bfdb.png#averageHue=%23333a30&clientId=uded20bc5-254f-4&from=paste&height=606&id=ud0a42835&originHeight=909&originWidth=1345&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=400763&status=done&style=none&taskId=u6947e004-9bda-4936-a155-cca32bb3d45&title=&width=896.6666666666666)
#### （3).Mybatis-Plus功能验证
在SpringBoot测试类中注入BookDao，调用MyBatis-Plus提供的方法：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698304434302-9fa40af5-3f4e-4eb2-a253-ffa69cfdd7a5.png#averageHue=%233d3936&clientId=uded20bc5-254f-4&from=paste&height=721&id=ue36df1f3&originHeight=1082&originWidth=1898&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1228700&status=done&style=none&taskId=udd3341a5-68dc-43ba-96db-4aaaced5e76&title=&width=1265.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698304472660-f2aa6ca8-453d-4ddc-9521-70c748faa510.png#averageHue=%233c3835&clientId=uded20bc5-254f-4&from=paste&height=782&id=u2ce32573&originHeight=1173&originWidth=1973&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1390033&status=done&style=none&taskId=u569dd727-5502-4d90-a589-a8f4ace9d4b&title=&width=1315.3333333333333)<br />至此SpringBoot整合MyBatis-Plus以及MyBatis-Plus简单的使用已演示完成。
### 4.3.SpringBoot整合Druid(第三方数据库连接池)
Druid是一个高性能的、开源的数据库连接池，它提供了对多种数据库系统（包括MySQL、PostgreSQL和Oracle等）的支持。在Spring Boot应用程序中集成Druid作为数据源可以帮助高效地管理数据库连接。<br />使用Druid数据源相对于传统的数据库连接池有几个优势：

1. **性能优势**：Druid被设计成高性能的数据库连接池，它能够有效地管理数据库连接，提供了诸如连接池复用、预处理、批处理等性能优化特性，可以显著提高应用程序的数据库访问性能。
2. **监控和统计**：Druid内置了强大的监控和统计功能，可以实时监控数据库连接的创建、销毁、活动连接数等信息。这些信息可以帮助开发人员和运维人员快速定位数据库连接的问题，从而提高系统的稳定性和可维护性。
3. **SQL防火墙**：Druid内置了SQL防火墙功能，可以对恶意的SQL进行防护，避免应用受到SQL注入等攻击。
4. **快速的失败恢复**：Druid可以快速检测到数据库连接的失效，并进行相应的处理。当数据库连接失效时，Druid可以自动把失效的连接剔除，从而避免了应用程序使用无效连接的情况。
5. **丰富的扩展功能**：Druid提供了丰富的扩展功能，可以通过插件机制扩展各种功能，比如监控、日志、过滤器等，满足不同场景下的需求。
6. **多数据源支持**：Druid支持多数据源的管理，可以在一个应用程序中同时连接多个不同类型的数据库，方便进行数据整合和业务拆分。

总的来说，Druid数据源的优势在于其高性能、强大的监控和统计功能，以及丰富的扩展能力，使得它成为许多Java应用程序首选的数据库连接池实现之一。<br />以下是如何在Spring Boot应用程序中配置Druid数据源的步骤：<br />1.添加Druid依赖
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
3.访问Druid监控控制台：<br />使用上述配置，你可以通过访问http://localhost:8080/druid（假设你的应用程序运行在端口8080上）来访问Druid监控控制台。在这里，你可以监控与你的Druid数据源相关的性能和其他统计信息。<br />4.功能验证：<br />更换Druid后通过SpringBoot测试类来验证是否生效。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698305985558-de34621b-05ef-48c4-b755-f81e57b58ce8.png#averageHue=%233c3835&clientId=uded20bc5-254f-4&from=paste&height=705&id=u0adfc2e5&originHeight=1058&originWidth=1926&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1162369&status=done&style=none&taskId=u3fb7e100-994a-4166-ab44-f01af4e30cb&title=&width=1284)<br />可以看到数据源已成功更换为DruidDataSource，并且能够在数据库中查询到数据。
## 5.基于SpringBoot的SSMP整合案例
本章学习如何使用SpringBoot整合SSMP，并制作一个简单的案例模块(图书管理系统)，使同学们对后端开发有一个较为整体的了解。<br />案例实现方案：

-  实体类开发——使用Lombok快速制作实体类  ；
-  Mapper层开发——整合MyBatisPlus，实现持久层快速开发  ；
-  Service开发——基于MyBatisPlus进行增量开发，实现业务层快速开发；
-  Controller开发——基于Restful开发，使用PostMan测试接口功能  
-  Controller开发——前后端开发协议制作  
-  页面开发——基于VUE+ElementUI制作，前后端联调，页面数据处理，页面消息处理  
-  项目异常处理  ——使用r全局异常拦截器，拦截异常信息抛至Controller层
-  按条件查询——页面功能调整、Controller修正功能、Service修正功能  
### 5.1.模块创建与实体类开发
新建一个模块，添加Lombok、Spring Web、 MySQL Driver依赖，Mybatis-Plus和Druid依赖我们后续在pom中手动添加。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698476411633-f84f3cd8-f23f-49da-bce5-4d0d51089072.png#averageHue=%233d4144&clientId=u19e6a3ea-a87e-4&from=paste&height=624&id=uc159dbdc&originHeight=936&originWidth=1100&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=60628&status=done&style=none&taskId=u3c293c6e-0dfb-4439-b9ed-6ccd494ed04&title=&width=733.3333333333334)<br />数据库表book：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698477811831-0386ced9-1635-44f2-b045-ce4b202ebd8a.png#averageHue=%23f4f3f2&clientId=u19e6a3ea-a87e-4&from=paste&height=249&id=u73d980fc&originHeight=374&originWidth=1283&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=39315&status=done&style=none&taskId=ue1db5ead-f380-439b-a1f6-8fff4af1971&title=&width=855.3333333333334)<br />实体类快速开发：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698477852992-137d5f7c-0bec-4f6d-9947-e1cac3b3547c.png#averageHue=%233c3633&clientId=u19e6a3ea-a87e-4&from=paste&height=337&id=u03c714e2&originHeight=505&originWidth=1100&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=408276&status=done&style=none&taskId=u58c6f47c-a078-4cb9-b450-532e796f2d6&title=&width=733.3333333333334)<br />在实体类上我们使用了一个注解@Data，该注解是通过lombok技术引进的，Lombok 是一个 Java 库，它通过注解的方式，可以帮助开发者简化POJO实体类的开发。使用 Lombok，开发者可以在代码中添加注解，而不需要显式地编写这些常见的方法。例如，通过在类上添加 @Data 注解，Lombok 可以自动生成类的 getters、setters、toString()、equals() 和 hashCode() 方法。类似地，@Getter 注解会生成字段的 getters 方法，@Setter 注解会生成字段的 setters 方法，@Constructor注解会生成无参构造方法，@AllArgsConstructor注解会生成全参构造方法。
```xml
<!--lombok依赖-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
        </dependency>
```
以下为添加@Data注解后Book类的方法：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698478205468-810534b4-1c8c-406b-bccb-46889262464f.png#averageHue=%23647871&clientId=u19e6a3ea-a87e-4&from=paste&height=587&id=u20df237e&originHeight=881&originWidth=1106&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=278184&status=done&style=none&taskId=uc1fe6dd2-7fb1-48c1-8c28-b934c834404&title=&width=737.3333333333334)
### 5.2.持久层开发
 <br />在Spring Boot中，持久层负责与数据库进行交互，通常使用ORM框架（如MyBatis、MyBatis-Plus、Hibernate）或Spring Data JPA进行持久化操作,以下是Spring Boot的持久层开发流程和常见实践：
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
BookMapper接口功能测试：<br />我们在SpringBootTest类中测试BookMapper接口的根据ID查询单个、查询全部、新增、修改、删除、模糊查询、分页等功能。
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
通过配置文件添加mybatis-plus.configuration.log-impl开启Yybatis-plus的SQL调试日志，选择StdOutImpl后我们就能在控制台看到输出的SQL语句，以查询所有为例，Preparing中输出的为查询所有的SQL，Parameters为查询出的数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698480213206-d03f5c35-a0f5-4b7e-b12b-4e815ab1d287.png#averageHue=%232a467e&clientId=u19e6a3ea-a87e-4&from=paste&height=531&id=u92efa98e&originHeight=796&originWidth=1866&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=798898&status=done&style=none&taskId=ua9f3f882-089e-4383-8a4c-29bdf02e6d3&title=&width=1244)<br />测试结果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698479900273-e5dc5f1b-998b-427f-8bf8-cd12c6866b45.png#averageHue=%23464642&clientId=u19e6a3ea-a87e-4&from=paste&height=401&id=u5c3c29bd&originHeight=602&originWidth=2446&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=865558&status=done&style=none&taskId=u1ef8be6c-f78c-45b3-888c-a5dfa2c5fb3&title=&width=1630.6666666666667)<br />**分页查询：**<br />Mybatis-Plus使用Mapper.selectPage()方法进行分页查询，selectPage()方法的第一个参数为Page类型，Page 对象是 Mybatis-Plus 中封装分页查询结果的核心类。它包含了分页信息（当前页、每页显示数量、总记录数等）和查询结果数据。在进行分页查询时，可以使用 Mybatis-Plus 提供的 Page 类来封装查询结果，从而方便地获取分页信息和查询结果。<br />以下是一个简单的示例，演示如何在 Mybatis-Plus 中使用 Page 对象进行分页查询：
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
需要注意的是，在实际使用中，你需要根据自己的项目配置和需求来配置 Mybatis-Plus 提供的拦截器，确保分页查询能够正常工作。<br />当没有配置拦截器的时候，查询的语句没有添加limit关键字，导致分页查询不成功、<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698512898055-7615152a-770e-4230-9742-7ef601d0f650.png#averageHue=%233f3c38&clientId=u19e6a3ea-a87e-4&from=paste&height=422&id=u2ce28a94&originHeight=633&originWidth=2002&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=820199&status=done&style=none&taskId=ufc08b36c-93ba-4be2-9f68-73c3072deaa&title=&width=1334.6666666666667)<br />配置分页拦截器：<br />在实现分页查询时，MyBatis-Plus要求你添加一个分页拦截器（PaginationInterceptor），这是因为分页查询涉及到对SQL语句的修改和重写，以实现正确的分页效果。分页拦截器是MyBatis-Plus提供的一个组件，它会拦截执行的SQL语句，并根据指定的分页参数，修改SQL语句以获取指定范围的数据。<br />新建一个config文件夹下的MpConfig类用来配置分页拦截器，配置类需加上@Configuration注解，在配置类中定义一个返回值类型为PaginationInterceptor的方法，并在方法中return一个PaginationInterceptor对象，注册为Bean交给Spring进行管理。(@Configuration 是一个 Spring Framework 中的注解，它用于定义配置类。配置类是用来配置 Spring 应用上下文的 Java 类。在 Spring 应用中，通常会有很多配置信息，例如数据源的配置、Bean的定义、AOP（面向切面编程）配置等等。@Configuration 注解就是用来定义这些配置信息的类。<br />在配置类中，你可以使用 @Bean 注解来定义 Bean 对象。@Bean 注解告诉 Spring 容器，该方法将返回一个对象，并且该对象应该被注册为 Spring 应用上下文中的 Bean。配置类中的 @Bean 方法可以返回任何类型的对象，Spring 容器将负责管理这些对象的生命周期。)
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
配置完拦截器后，分页查询的运行结果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698513976721-f4e42801-f703-4df3-994f-2b67f8ea80b5.png#averageHue=%23413e3a&clientId=u19e6a3ea-a87e-4&from=paste&height=396&id=ue774b218&originHeight=594&originWidth=2361&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=832368&status=done&style=none&taskId=ucadf8f54-06c4-4c3a-9fcd-7f632ae9ed5&title=&width=1574)<br />**条件查询：**<br />Mybatis-Plus提供了很多便捷的功能和工具类，其中 QueryWrapper 是一个用于构建条件查询的工具类。通过 QueryWrapper，你可以方便地构建查询条件，而无需手写 SQL 语句。下面是 QueryWrapper 的基本用法示例：
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

以上只是一些常用方法的示例，QueryWrapper 还提供了更多的方法来满足不同的查询需求。你可以查阅 Mybatis-Plus 的官方文档或源代码来了解更多详细信息。<br />与 QueryWrapper 类似，LambdaQueryWrapper 也提供了丰富的方法来满足不同的查询需求。使用 Lambda 表达式的好处在于，可以避免手写字符串作为字段名，提高了代码的安全性和可读性。
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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698825686652-3565b4a2-1441-450e-9006-0197cecb82bb.png#averageHue=%23484c47&clientId=u04d500b8-06c5-4&from=paste&height=413&id=uc94f84cf&originHeight=619&originWidth=536&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=169944&status=done&style=none&taskId=udefbcdf2-4d0e-46d7-8ddf-83eaa042b95&title=&width=357.3333333333333)

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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698825761587-e950c4dc-fd1b-4c95-acdb-3290f1f3a89f.png#averageHue=%2351584e&clientId=u04d500b8-06c5-4&from=paste&height=180&id=ub7e29e30&originHeight=270&originWidth=596&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=74352&status=done&style=none&taskId=ufa0a47c1-6314-4c45-bc5a-540feda371e&title=&width=397.3333333333333)
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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698828083177-ec50b942-057c-48e8-8664-277488b86dd8.png#averageHue=%2347524c&clientId=u04d500b8-06c5-4&from=paste&height=586&id=u5cc8e241&originHeight=879&originWidth=1121&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=305711&status=done&style=none&taskId=ud3ed9ea0-9ed0-4047-8db0-a37c7d10940&title=&width=747.3333333333334)

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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698828335436-7b8b0af9-9613-4873-97fd-5356c0b7284b.png#averageHue=%23515b4a&clientId=u04d500b8-06c5-4&from=paste&height=126&id=u499bfec0&originHeight=189&originWidth=601&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=63374&status=done&style=none&taskId=u76cea170-e818-4dd6-a140-f319aadb861&title=&width=400.6666666666667)

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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1698828791959-a4050dc4-9653-4776-9dae-86610e8811fc.png#averageHue=%2351584f&clientId=u04d500b8-06c5-4&from=paste&height=161&id=u8fd7d01c&originHeight=241&originWidth=603&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=65669&status=done&style=none&taskId=ube4c76fa-ff0c-4575-805b-6e1068d9289&title=&width=402)
### 5.4.控制层开发
在Spring Boot中，控制层（Controller Layer）负责处理HTTP请求和响应，将数据传递给服务层，并将处理结果返回给客户端。以下是在Spring Boot中进行控制层开发的流程以及相关知识介绍：
#### （1).RESTful架构风格
##### 1).认识RESTful
RESTful API（Representational State Transfer API）是一种基于REST架构风格设计的应用程序接口，用于在网络上进行交互。它是一种通过HTTP协议进行通信的API设计方式，采用简洁的URL、标准的HTTP方法（GET、POST、PUT、DELETE等）和状态码来进行通信，具有简单、灵活、可扩展的特点。<br />以下是RESTful API的主要特点和介绍：

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

以不同的URL（主要为使用动词）进行不同的操作。<br />非REST设计的接口示例：
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

URL只指定资源，以HTTP方法动词进行不同的操作，用HTTP STATUS/CODE定义操作结果，隐藏了资源的访问行为，无法通过地址得知资源是哪种操作，并且简化的书写的形式。<br />REST设计的接口示例：
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
在Spring Boot应用中，封装HTTP返回状态的枚举是一种良好的代码习惯，它可以提高代码的可读性和可维护性。我们可以创建一个枚举类，定义常见的HTTP状态码和相应的消息，并在Controller类中使用这些枚举值来返回HTTP响应。<br />以下是一个简单的HTTP返回状态枚举类的示例：
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
在上述示例中，枚举类**HttpStatusEnum**定义了几个常见的HTTP状态码（例如，200、201、400、401等）以及相应的消息。每个枚举值都有一个整数类型的状态码和一个字符串类型的消息。<br />在控制器类或其他服务类中，可以使用这些枚举值来返回HTTP响应。例如，使用BaseResponse统一封装格式类将枚举值转换为具体的HTTP响应：
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
在以上代码中，BaseResponse类包含了一个整数类型的状态码 **code**、一个字符串类型的消息 **message**，以及一个泛型类型的数据 **data**。你可以根据实际需求调整响应对象的字段。<br />接下来，在控制器（Controller）方法中，你可以使用 ResponseEntity 类将 BaseResponse 对象包装成HTTP响应返回给客户端。例如：
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
对于标准的前后端分离开发，前端页面的开发应该放到前端服务器中的，但是为了方便学习，我们直接将前端页面放置于单体服务器中，单体工程页面放置于项目的Resource目录下的static目录中(前端页面由教程提供，前端页面加入后建议clean工程)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1700815897125-723dfbff-bc83-418c-a554-99aa8f605404.png#averageHue=%233d4043&clientId=u9dce96f5-7efd-4&from=paste&height=308&id=u46b4bc98&originHeight=462&originWidth=626&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=20906&status=done&style=none&taskId=uce8aaf6f-5861-4753-9d99-090b0799a1b&title=&width=417.3333333333333)<br />以上是前端页面的目录，css目录中存放了前端页面的样式表，js目录中存放了一些前端所需要用的组件，如axios.js发送异步请求、vue.js进行组件定义和数据绑定等，plugins目录存放了elementui相关的组件，而我们最终要访问的页面是存放在pages目录下的books.html文件(本节的重点，也是唯一需要修改操作的文件，在books.html进行后端接口的调用)。
#### （1).books.html结构介绍
在进行后端接口调用前，本小节首先对books.html的结构进行简单的介绍：<br />head区存放了所有的头部信息，包括样式表的导入、页面的标题等。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1700816915829-4a9936b5-59c2-4942-95ba-034653294bac.png#averageHue=%232b2b2b&clientId=u9dce96f5-7efd-4&from=paste&height=471&id=ufd58d38d&originHeight=706&originWidth=1323&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=64484&status=done&style=none&taskId=uca69c9e6-510c-48e1-b3b6-72eaea66a85&title=&width=882)<br />body区是HTML文档的主体部分，包含了文档的实际内容，比如文本、图像、链接、按钮、脚本等。<body>标签是HTML文档的一个必需元素，它包裹着整个页面的可见内容，在body中我们需要定义分页组件、新增标签弹层、编辑标签弹层。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1700817164058-20537974-f67f-45e1-8aa1-0c374ac51fd7.png#averageHue=%232c2b2b&clientId=u9dce96f5-7efd-4&from=paste&height=739&id=u38c85b07&originHeight=1108&originWidth=1381&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=148888&status=done&style=none&taskId=ude7a64b9-7b41-4011-a97b-558d0c842e0&title=&width=920.6666666666666)<br />script标签引入了各种的js文件<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1700817552473-7159614b-d8a1-4671-a804-fff837af10d1.png#averageHue=%232b2b2b&clientId=u9dce96f5-7efd-4&from=paste&height=174&id=u97345997&originHeight=261&originWidth=1206&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=30470&status=done&style=none&taskId=u65b0952a-0203-46e7-9fda-d66a99e5e97&title=&width=804)<br />以下的script标签定义了vue的结构，其中dataList为页面中需要展示的列表数据、dialogFormVisible控制添加表单的弹层、dialogFormVisible4Edit控制编辑表单的弹层、formData是用来收集前端传输进来的表单数据、pagination为分页相关的封装数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1700817724976-7971e18d-494b-4e83-aa37-5ba0b3c03bab.png#averageHue=%232b2b2b&clientId=u9dce96f5-7efd-4&from=paste&height=424&id=u5e4c94a6&originHeight=636&originWidth=1301&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=85934&status=done&style=none&taskId=u6e29af9a-f6ae-4c2c-ba14-f24267c11bf&title=&width=867.3333333333334)<br />created()为钩子函数的一种，VUE对象初始化完成后自动执行，methods中的方法用来调用后端相关接口(对应增删改查、模糊查询、分页等功能)，并定义调用逻辑。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1700818250614-9030725e-3a37-4e7f-bc5e-342ecea15203.png#averageHue=%232c2c2b&clientId=u9dce96f5-7efd-4&from=paste&height=458&id=u276aa074&originHeight=687&originWidth=1360&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=35369&status=done&style=none&taskId=u3e7adda7-59d4-493e-9998-56a298b94a1&title=&width=906.6666666666666)<br />最终原始的页面如下图所示：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701171823249-9c500a99-8781-4d27-bd9e-ef86ffae1962.png#averageHue=%23fefefe&clientId=ucbccb6de-a3d2-4&from=paste&height=770&id=ueed0039d&originHeight=1155&originWidth=2553&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=36812&status=done&style=none&taskId=ua4cda75c-b738-4639-8e40-17f330f8cb3&title=&width=1702)
#### （2).列表展示功能
在设计网页的时候，大部分情况下我们都希望进入到这个网页的时候，列表会刷新出对应的列表数据，要实现这个功能，需要用到vue.js中钩子函数中的created()函数，这个函数的功能是在vue对象初始化完成后自动执行，意思就是在我们的页面加载成功后自动执行函数中的操作，如果在函数中添加查询所有列表数据的操作，那么我们的页面加载或者刷新后就会呈现所有的列表数据，所以我们需要在created()中调用getAll()方法。
##### 1).created()函数与页面初始化加载
为了测试created()中调用getAll()方法是否成功，我们在getAll()方法中使用console.log()方法在浏览器控制台输出一句话：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701172681557-7d381012-b001-4f00-93ce-aea9b7534f7e.png#averageHue=%232c2c2b&clientId=ucbccb6de-a3d2-4&from=paste&height=221&id=ub28c6b5a&originHeight=331&originWidth=1281&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=29545&status=done&style=none&taskId=u2abeb382-fe33-48ec-87cf-8e59b55774e&title=&width=854)<br />启动项目，在Chrome浏览器的调试控制台的Console窗口能成功看到输出的内容：(证明created()函数调用成功)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701172812420-d83b1914-efc0-40eb-9370-9ed9db76c9c9.png#averageHue=%23fefdfc&clientId=ucbccb6de-a3d2-4&from=paste&height=386&id=u14f2fccd&originHeight=579&originWidth=1755&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=70447&status=done&style=none&taskId=u81f6e675-b8c5-4dd1-b57a-a5ace37d80c&title=&width=1170)
##### 2).展示列表数据
在上一小节中我们能够成功地通过created()函数调到getAll()方法，完成页面初始化加载，为了完成列表数据的展示功能，这一小节将完成getAll()方法与后端查询所有数据方法的绑定。<br />getAll()方法的内容如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701173323277-5f0c282f-ef14-4a2f-8c15-07d7f814e66d.png#averageHue=%232c2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=207&id=u7437785f&originHeight=310&originWidth=1337&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=30959&status=done&style=none&taskId=u64adfca5-a83f-4466-ad2e-7c18c441e42&title=&width=891.3333333333334)<br />该方法通过axios发送异步请求，以GET方法请求http://localhost/books路径，相当于前端页面调用了Controller层中的getAllBooks()方法，调用成功后，前端会收到调用后端方法获得的数据，通过箭头函数将数据存放到res参数中，取出res中data属性的data部分存入到展示列表数据的参数dataList中，前端页面即可展示所有的列表数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701174311550-86222cc3-31fe-4bae-ab1b-5bee459b7990.png#averageHue=%23fcfaf9&clientId=ucbccb6de-a3d2-4&from=paste&height=745&id=ua293a4c2&originHeight=1118&originWidth=2551&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=256986&status=done&style=none&taskId=ud07e24f9-3d5b-44fb-9ae7-0311542a935&title=&width=1700.6666666666667)<br />请求返回的参数：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701174336462-80caedb2-67f3-4d68-9198-b07eceac8b28.png#averageHue=%23e0b479&clientId=ucbccb6de-a3d2-4&from=paste&height=706&id=ua15d9685&originHeight=1059&originWidth=1234&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=260121&status=done&style=none&taskId=uf8489936-195c-4a8d-87e7-f8f18dc4638&title=&width=822.6666666666666)
#### （3).数据新增功能
本小节将进行前端新增功能的开发，新增功能由页面上方的新增按钮发起，在books.html中已经设定了新增事件绑定handleCreate()方法，通过handleCreate()方法打开添加表单弹层页面，将前端填写的数据进行录入。初始我们将添加表单是否可见(dialogFormVisible)设置为false，现在我们在handleCreate()中将dialogFormVisible置为true，即可打开添加表单弹层页面。<br />新建按钮：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701176558664-34c6a911-a411-4e66-ba4b-45898d902492.png#averageHue=%23fefdfd&clientId=ucbccb6de-a3d2-4&from=paste&height=131&id=u7bde9914&originHeight=197&originWidth=1794&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=12145&status=done&style=none&taskId=u419942ac-8f23-4217-8f82-1c70d49c9e9&title=&width=1196)<br />新建按钮绑定handleCreate()：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701176705442-d9f13a90-87ae-4fa8-85f3-37f9c13b1b21.png#averageHue=%2331302d&clientId=ucbccb6de-a3d2-4&from=paste&height=161&id=u2424c324&originHeight=241&originWidth=1329&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=61836&status=done&style=none&taskId=u6e8b329c-2f1b-447e-af6f-976dab550aa&title=&width=886)<br />添加表单弹层页面开关dialogFormVisible(需要注意的是，前端传过来的数据由formData接受，后续会进行使用)：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701177222420-aa8f26cf-85bb-430f-82f9-d6636f476b8f.png#averageHue=%232c2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=337&id=u93dc7713&originHeight=506&originWidth=1335&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=50797&status=done&style=none&taskId=u0d2cf7a3-7b22-478b-bf56-fc19e17f664&title=&width=890)<br />在handleCreate()中打开dialogFormVisible：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701177330110-81003878-0ea0-490a-9eb4-7738c8e6ac93.png#averageHue=%232d2c2b&clientId=ucbccb6de-a3d2-4&from=paste&height=115&id=u099616ca&originHeight=172&originWidth=943&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=13010&status=done&style=none&taskId=u250a9719-c7f7-45f0-a29b-6747223cb2f&title=&width=628.6666666666666)<br />重启项目，点击新建按钮，即可打开新增图书页面：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701177396329-a1e6493b-2c08-4366-b86f-335297aa4377.png#averageHue=%23e5e5e5&clientId=ucbccb6de-a3d2-4&from=paste&height=393&id=ue0d6990c&originHeight=590&originWidth=1309&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23675&status=done&style=none&taskId=uce85993f-6e7a-499b-81ff-0d64f32e62e&title=&width=872.6666666666666)<br />此时我们需要将新建的图书通过前端页面调用后端的新增接口存入到数据库中，我们需要将新增图书页面中的'确定'按钮与前端存入新增图书数据的方法进行绑定，在books.html中已经设定了确定按钮与handleAdd()方法绑定，所以我们在handleAdd()方法中请求后端的新增接口即可。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701177619196-e3e77dff-012b-4404-a073-11458fb615c8.png#averageHue=%232b2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=173&id=ud6f4c7b8&originHeight=259&originWidth=1220&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=26745&status=done&style=none&taskId=uaa27e084-c568-4c05-8cbf-ecb351bc3b4&title=&width=813.3333333333334)<br />在handleAdd()方法中通过axios发送异步请求，以POST方法请求http://localhost/books路径，相当于前端页面调用了Controller层中的saveBook(Book book)方法，调用成功后，前端会将页面中填写的数据(**formData中的数据**)以json格式封装到请求体中，最终传入到saveBook方法的book参数中。<br />handleAdd()中封装请求体数据并发送请求：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701178439121-af023aa2-eea8-46da-ace6-b55630a47156.png#averageHue=%232b2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=169&id=ub5584763&originHeight=254&originWidth=1028&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=16850&status=done&style=none&taskId=u049e01db-4844-4e7c-a5bf-b77ed031f4d&title=&width=685.3333333333334)<br />发送的请求中的请求体内容：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701178502051-d9865a3e-81da-4208-b106-b30d06de53cc.png#averageHue=%23dddada&clientId=ucbccb6de-a3d2-4&from=paste&height=435&id=udb6c93ae&originHeight=653&originWidth=2202&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=102490&status=done&style=none&taskId=ufe12b243-2968-477f-9694-bf8bd41f337&title=&width=1468)<br />数据库中成功新增数据：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701178703194-57559f57-c519-4e6e-9891-dd252589f4f9.png#averageHue=%23f8f5f4&clientId=ucbccb6de-a3d2-4&from=paste&height=529&id=u129ede86&originHeight=794&originWidth=1461&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=57662&status=done&style=none&taskId=u99f1a049-3b17-4b28-8be8-6e1762218fa&title=&width=974)<br />但是仅仅发送请求，handleAdd()功能还没有全部完成，我们还要新增以下内容：

1. 进行判断，如果请求的返回结果的data值为true，代表请求成功，则关闭新增图书页面，并且页面提示添加成功，否则返回添加失败；
2. 最后无论是否添加成功与否，都要刷新重新图书列表；
3. 重新进入新建表单需要重置表单(将上次输入的数据置空）
4. 如果点击取消按钮，需要能成功关闭表单

完整的方案如下：<br />添加功能：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701186414779-748ff44f-e54d-4825-8a03-bc12427cfb61.png#averageHue=%232c2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=370&id=uafc1ced4&originHeight=555&originWidth=1287&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=55939&status=done&style=none&taskId=u7fa006aa-e51f-406f-9e25-5a1ecbe8073&title=&width=858)<br />resetForm()重置表单方法将formData置空，并且在handleCreate()中调用resetForm()方法(意思是在弹出窗口时重置表单数据)：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701186908989-8a165622-7828-4ecc-8e77-ba8119b3b255.png#averageHue=%232c2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=237&id=u043e8cf9&originHeight=355&originWidth=1110&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=25626&status=done&style=none&taskId=uf2e37b16-e455-4039-b306-4c64860fa3a&title=&width=740)<br />在cancel()方法中将dialogFormVisible置为false，并且提示取消当前操作：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701187266334-d5dc73dd-6b6c-4168-a13f-cd9e74654278.png#averageHue=%232e2d2d&clientId=ucbccb6de-a3d2-4&from=paste&height=130&id=ua0d2e62a&originHeight=187&originWidth=1066&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=18822&status=done&style=none&taskId=uc76ea189-0481-488e-acdd-66c998e66d6&title=&width=740.6666870117188)<br />页面功能如下(以添加成功为例)：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701186662330-cd80b368-ebf4-4886-867b-e7a10d4994fe.png#averageHue=%23979696&clientId=ucbccb6de-a3d2-4&from=paste&height=824&id=u649cd840&originHeight=1236&originWidth=2521&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=123263&status=done&style=none&taskId=u2ccea027-89ae-430d-81c8-7399b6e6369&title=&width=1680.6666666666667)<br />列表页面成功刷新，并且提示添加成功：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701186673788-fdf89256-18d9-479a-a9fa-2f7948c184df.png#averageHue=%23fcfafa&clientId=ucbccb6de-a3d2-4&from=paste&height=894&id=uc5e45c5b&originHeight=1341&originWidth=2519&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=139505&status=done&style=none&taskId=uf05f9483-3c70-433f-89f7-0a2185fd2c0&title=&width=1679.3333333333333)<br />重新进入新建表单，表单是重置状态<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701187094849-43feaa72-862f-42c0-8bd3-58c1eb8bdcd9.png#averageHue=%23979696&clientId=ucbccb6de-a3d2-4&from=paste&height=843&id=u2941e4d7&originHeight=1265&originWidth=2494&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=125014&status=done&style=none&taskId=u129576c8-d494-4bc1-9ca1-7264f31808c&title=&width=1662.6666666666667)<br />点击取消，提示取消当前操作<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701187393464-7f5dca22-6d64-473d-a8e1-dbcf87abde01.png#averageHue=%23fcf9f8&clientId=ucbccb6de-a3d2-4&from=paste&height=396&id=uda05f61b&originHeight=594&originWidth=2516&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=58317&status=done&style=none&taskId=u19bec71d-66a3-47c4-b5f4-4019e3c6255&title=&width=1677.3333333333333)

#### （4).数据删除功能
本小节将进行前端删除功能的开发，删除功能由页面右侧操作列下的删除按钮发起，在books.html中已经设定了删除事件绑定handleDelete(scope.row)方法，其中ElementUI列表中的行对象封装为scope，scope中的row属性表示为当前操作的一行，即将要进行删除操作的行数据。我们在handleDelete()方法中请求后端的删除接口即可完成删除相关的操作。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701187710263-aaf21748-309c-4636-8569-9f56214eee01.png#averageHue=%232b2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=275&id=u87c7e71c&originHeight=412&originWidth=1428&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=45974&status=done&style=none&taskId=u23ce40af-711f-4d3b-8a80-77eca139e35&title=&width=952)<br />为了测试row属性中有什么数据，在handleDelete()方法中调用console.log(row)，将row属性打印到控制台上：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701188278681-7172fa65-0514-4f42-a591-e0d84d167fa3.png#averageHue=%23fcf9f9&clientId=ucbccb6de-a3d2-4&from=paste&height=551&id=u1985a0ec&originHeight=827&originWidth=2466&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=173567&status=done&style=none&taskId=u4f3655f0-1bcf-4f3c-886b-2c6db503ca9&title=&width=1644)<br />可以看到其中包含了当前删除按钮所在行的所有属性数据，若将其进行封装，调用后端接口即可完成删除操作。<br />在handleDelete()方法中通过axios发送异步请求，以DELETE方法请求http://localhost/books/路径，相当于前端页面调用了Controller层中的deleteBook(Integer id)方法，调用成功后，前端会将row属性的id拼接在请求路径后，最终传入到deleteBook方法的id参数中。<br />handleDelete()功能的逻辑如下：

1. 进行判断，如果请求的返回结果的data值为true，代表请求成功，页面提示删除成功，否则返回数据同步失败，自动刷新；
2. 最后无论是否删除成功与否，都要刷新重新图书列表；

完整的方案如下：<br />删除功能：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701189134484-a7743957-dee8-4799-80bd-f76a350b9d2b.png#averageHue=%232c2c2b&clientId=ucbccb6de-a3d2-4&from=paste&height=341&id=ue44f144b&originHeight=511&originWidth=1299&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=53234&status=done&style=none&taskId=ue257040a-764c-42f2-b27c-cdbe22c9402&title=&width=866)<br />页面功能如下(以删除成功为例)：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701189263819-5e3f19e6-a3a7-45af-8439-8b3257f3f2e2.png#averageHue=%23fcfafa&clientId=ucbccb6de-a3d2-4&from=paste&height=877&id=uf5afa42f&originHeight=1316&originWidth=2520&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=132536&status=done&style=none&taskId=u8322b4ef-9737-4540-9d63-d57dae98b7a&title=&width=1680)<br />但是这种方案删除没有提示信息，容易造成误删操作，因此还需要添加提醒页面：<br />在handleDelete()中调用confirm()方法，填入提示信息，若点击提醒页面中的确定按钮则调用删除接口，若点击取消则提示取消操作：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701189611689-b1a9cf47-4695-4391-b10c-5f80a6222a2f.png#averageHue=%232d2c2b&clientId=ucbccb6de-a3d2-4&from=paste&height=431&id=u76cd39ba&originHeight=646&originWidth=1411&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=89132&status=done&style=none&taskId=ucc9d2e22-f3c6-4a3a-81d1-48c0e98390c&title=&width=940.6666666666666)<br />添加删除提示功能的页面功能如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701189855705-810dee91-c919-4af1-8d60-d776bbe1a3f8.png#averageHue=%23848282&clientId=ucbccb6de-a3d2-4&from=paste&height=750&id=uffa7bcae&originHeight=1125&originWidth=2441&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=125846&status=done&style=none&taskId=u9a7ee2a2-2619-44a9-9492-d8d381ff258&title=&width=1627.3333333333333)<br />取消操作：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701189866695-03a3f7ec-edbd-46f7-b862-be0984b55f6f.png#averageHue=%23fdfafa&clientId=ucbccb6de-a3d2-4&from=paste&height=864&id=u3bfaf425&originHeight=1296&originWidth=2523&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=132653&status=done&style=none&taskId=u2e22963c-e367-45fc-a164-540bef4a681&title=&width=1682)<br />确定操作：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701189884883-c16a301e-17ea-4b23-bd08-e205890583f5.png#averageHue=%23fcfafa&clientId=ucbccb6de-a3d2-4&from=paste&height=866&id=u52b76857&originHeight=1299&originWidth=2546&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=129164&status=done&style=none&taskId=ufce807c5-a983-41db-9904-e4f87d12511&title=&width=1697.3333333333333)
#### （5).数据修改功能
本小节将进行前端修改功能的开发，修改功能由页面右侧操作列下的编辑按钮发起，在books.html中已经设定了编辑事件绑定handleUpdate(scope.row)方法，其中ElementUI列表中的行对象封装为scope，scope中的row属性表示为当前操作的一行，即将要进行编辑操作的行数据。我们在handleUpdate()方法中请求后端的通过id查询接口即可获取需要修改的原始数据。(修改操作可以看作在编辑操作的基础上将修改的行数据，调用后端修改接口)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701191932110-4b4a1b1d-46e8-42ce-8f9a-b7c0e489ea47.png#averageHue=%232c2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=274&id=u7ec1f21c&originHeight=411&originWidth=1452&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=48079&status=done&style=none&taskId=uc284c272-f89c-46ad-b0e9-4aa3f19a9e1&title=&width=968)<br />在handleUpdate()方法中通过axios发送异步请求，以GET方法请求http://localhost/books/路径，相当于前端页面调用了Controller层中的getByIdBook(Integer id)方法，调用成功后，前端会将row属性的id拼接在请求路径后，最终传入到getByIdBook方法的id参数中获取到将要修改的数据。<br />handleUpdate()功能的逻辑如下：

1. 进行判断，如果请求的返回结果的data值为不为null，代表请求成功，打开编辑页面弹层，将返回的数据中的data参数传给formData，否则返回数据同步失败，自动刷新；
2. 最后无论是否删除成功与否，都要刷新重新图书列表；

完整的方案如下：<br />编辑功能：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701192682965-bdb96f6c-9fff-40d8-aaba-385e7fc4e880.png#averageHue=%232c2b2b&clientId=ucbccb6de-a3d2-4&from=paste&height=313&id=u1710bfbf&originHeight=469&originWidth=1273&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=46983&status=done&style=none&taskId=ua1fd4173-272e-491c-a571-6580e8d073b&title=&width=848.6666666666666)<br />页面功能如下(点击编辑能看到返回的数据)：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701192742379-d4c56d7d-9f53-4588-ab20-24f6189d1661.png#averageHue=%23999898&clientId=ucbccb6de-a3d2-4&from=paste&height=822&id=u385a7e6d&originHeight=1233&originWidth=2507&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=128318&status=done&style=none&taskId=u5fc05881-c183-465c-abda-103de81fe3b&title=&width=1671.3333333333333)<br />编辑功能完成后进行修改功能的开发：<br />在books.html的'编辑标签弹层'中已经设定了修改确定功能绑定handleEdit()方法，在handleEdit()中通过axios发送异步请求，以PUT方法请求http://localhost/books路径，相当于前端页面调用了Controller层中的updatBook(Book book)方法，调用成功后，前端会将formData表单中的数据以json格式封装到请求体中，最终传入到updatBook方法的book参数中。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701193711513-c33cb963-153e-4373-8acc-9265f0a28aa9.png#averageHue=%232b2b2b&clientId=u0e368983-7523-4&from=paste&height=212&id=u87226336&originHeight=318&originWidth=1280&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=29353&status=done&style=none&taskId=u42ee1e0e-5395-4298-9ae2-6d5dd808f14&title=&width=853.3333333333334)<br />handleEdit()功能的逻辑如下：

1. 进行判断，如果请求的返回结果的data值为true，代表请求成功，则关闭编辑图书页面，并且页面提示修改成功，否则返回修改失败；
2. 最后无论是否添加成功与否，都要刷新重新图书列表；
3. 在取消按钮对应的方法cancel()中添加关闭编辑图书弹层；

完整的方案如下：<br />修改功能：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701193824744-ab0cc6af-5f02-4336-84c4-16cde314949d.png#averageHue=%232c2b2b&clientId=u0e368983-7523-4&from=paste&height=386&id=ub4feb4a3&originHeight=579&originWidth=1358&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=57239&status=done&style=none&taskId=u5e769988-db69-4818-9029-172332467d4&title=&width=905.3333333333334)<br />取消修改：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701193896611-480d6184-32c7-4058-a7dc-0e3ef53faa75.png#averageHue=%232e2c2b&clientId=u0e368983-7523-4&from=paste&height=167&id=u536e2380&originHeight=251&originWidth=1266&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=24837&status=done&style=none&taskId=ubc7c7a7e-8f6a-4a52-99f1-3c18aa22aac&title=&width=844)<br />修改功能的页面如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701193965660-df6ffbf8-1b99-402e-a5cd-c8e13f693bbc.png#averageHue=%23c2c1c1&clientId=u0e368983-7523-4&from=paste&height=635&id=u229ec3b3&originHeight=953&originWidth=1315&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66191&status=done&style=none&taskId=ue9bce4d4-862e-4e52-92ab-1d620741dae&title=&width=876.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701193994664-a8462b51-f0ee-4fb0-8ce1-158a446b7f08.png#averageHue=%23c1c0c0&clientId=u0e368983-7523-4&from=paste&height=646&id=u174ca8b1&originHeight=969&originWidth=1309&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66208&status=done&style=none&taskId=u76f3ced5-dfe8-46af-bec4-14dd20660d0&title=&width=872.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701194009327-ae774de3-d88d-4376-bbea-c40eb505843b.png#averageHue=%23fdfaf9&clientId=u0e368983-7523-4&from=paste&height=822&id=u12311bd9&originHeight=1233&originWidth=2535&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=128213&status=done&style=none&taskId=u4d3d9de7-ff21-4bf5-a426-5403a667466&title=&width=1690)<br />点击取消，提示取消当前操作<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701194063990-adf03100-f168-4f07-aee5-9d08e8fb123f.png#averageHue=%23999898&clientId=u0e368983-7523-4&from=paste&height=803&id=u4a2b3c0f&originHeight=1204&originWidth=2543&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=127861&status=done&style=none&taskId=u33862e14-1e31-419d-bb9b-23f6766f495&title=&width=1695.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701194072335-17ce7fb0-f9b6-4ddc-a68a-cfd5138efa65.png#averageHue=%23fdfbfb&clientId=u0e368983-7523-4&from=paste&height=351&id=u88b0601c&originHeight=526&originWidth=2457&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=51340&status=done&style=none&taskId=u5516067f-5c8c-4f86-b36c-8d991705291&title=&width=1638)

#### （6).列表分页功能
本小节将进行列表分页功能的开发，在第(2)小节中已经进行了列表展示功能的开发，列表分页功能在列表展示的基础上加上分页即可，所以我们前端基于已有的getAll()方法进行修改。后端分页功能使用Mybatis-Plus提供的分页拦截器和BaseMapper增强类的selectPage()方法进行开发。
##### 1).后端接口
IBookService接口中定义分页查询的方法getPage()：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701532417357-97c54d9d-2225-403d-81e3-c4f921d18e21.png#averageHue=%232c2b2b&clientId=ubb5c576c-5633-4&from=paste&height=140&id=u7edd4b9b&originHeight=210&originWidth=1165&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=17258&status=done&style=none&taskId=ucd19239e-e472-48bf-8a53-55d0f20b906&title=&width=776.6666666666666)<br />分页拦截器：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701532635455-d31d3da5-0568-49fd-8613-e36b9665a054.png#averageHue=%232c2b2b&clientId=ubb5c576c-5633-4&from=paste&height=202&id=ub5be99e8&originHeight=303&originWidth=1285&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21891&status=done&style=none&taskId=uff5e0093-ceed-4db7-b086-15d69434632&title=&width=856.6666666666666)<br />服务层实现类BookServiceImpl中实现getPage方法，返回的IPage对象中包含了分页的相关结果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701532447783-fe15a540-2db4-4321-a80e-533fc32209b3.png#averageHue=%232c2c2b&clientId=ubb5c576c-5633-4&from=paste&height=271&id=uf2bf94f3&originHeight=407&originWidth=1301&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=50364&status=done&style=none&taskId=ud21b3cc1-36ef-43dc-b812-4c9fd66ff3b&title=&width=867.3333333333334)<br />表现层接口：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701532687368-4259ef8c-73f7-43d8-a82d-5e6f676adefd.png#averageHue=%232d2c2b&clientId=ubb5c576c-5633-4&from=paste&height=219&id=u0fd314a7&originHeight=329&originWidth=1387&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=62732&status=done&style=none&taskId=u18b648fe-eb80-4dda-a5e7-cf3dcc34861&title=&width=924.6666666666666)<br />分页查询的返回结果，records中存放着分页的数据，total为总记录数，current为当前页，size为分页大小：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701532937686-69d08138-7115-4b82-a31a-af306a69ded4.png#averageHue=%23fdfdfc&clientId=ubb5c576c-5633-4&from=paste&height=568&id=u9d897f28&originHeight=852&originWidth=1325&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=86540&status=done&style=none&taskId=ufd8139e4-d039-4444-b7d0-98c3db1a47b&title=&width=883.3333333333334)
##### 2).前端实现
首先需要认识一下books.html中定义的分页组件pagination-container：<br />handleCurrentChange为切换页码的方法名，pagination.currentPage为当前页码值加载的数据，pagination.pageSize为分页大小加载的数据，pagination.total为列表总数加载的数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701615445780-7fe73cba-4412-4f20-8745-a445da8d225c.png#averageHue=%232b2b2b&clientId=u85d28c1a-50db-4&from=paste&height=436&id=u5e754e57&originHeight=654&originWidth=1309&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=49832&status=done&style=none&taskId=u99d49bca-8439-4f1f-ba8e-f8eac5bbec8&title=&width=872.6666666666666)<br />pagination的相关数据在vue结构中进行了定义，currentPage、pageSize、total的默认值分别为1、10、0。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701615998843-0532cfd5-4ccd-4c29-a23b-e195cc6f5132.png#averageHue=%232d2c2b&clientId=u85d28c1a-50db-4&from=paste&height=393&id=u0927c693&originHeight=590&originWidth=1229&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=83234&status=done&style=none&taskId=u84473e97-74f6-4f13-ac29-f8a5dd7d1c1&title=&width=819.3333333333334)<br />total, prev, pager, next, jumper五个参数为页码布局模式，分别是总数、前一页、页码值、后一页和跳转。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701616502851-c2c5c653-1f86-47ad-b720-a2063868beb0.png#averageHue=%23fefefe&clientId=u85d28c1a-50db-4&from=paste&height=67&id=u6df6cd34&originHeight=100&originWidth=641&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=3816&status=done&style=none&taskId=u8264a6d4-d908-4b1b-b242-b59936a1a34&title=&width=427.3333333333333)<br />对getAll()方法进行修改，添加分页相关的逻辑并调用分页接口：<br />getAll()分页功能的逻辑如下：

1. 进行将默认的currentPage和pageSize拼接在请求路径中，调用后端分页接口获取分页相关数据；
2. 将查询出的分页列表数据records封装进dataList中进行列表展示；
3. 将真实的total、current、size等数据封装进对应的数据，进行前端页面回显；

完整的方案如下：<br />分页查询功能：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701616264710-a78a1a13-0f75-4df8-b8c1-ea9043c99e5f.png#averageHue=%232c2b2b&clientId=u85d28c1a-50db-4&from=paste&height=213&id=uf118e7ac&originHeight=320&originWidth=1395&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=43434&status=done&style=none&taskId=u875b8bf6-a90f-4cea-be91-12ce9de53c9&title=&width=930)<br />前端分页效果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701616845318-21bc4d58-b252-4c29-9f42-e2cdc1fb1fbb.png#averageHue=%23fdfbfb&clientId=u85d28c1a-50db-4&from=paste&height=672&id=ud0856ce2&originHeight=1008&originWidth=2517&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=96722&status=done&style=none&taskId=u1c9d266d-bdf2-43dd-8157-e4659cbce98&title=&width=1678)<br />此时页面的翻页功能还未实现，需要在handleCurrentChange(currentPage)方法中执行以下两步：

1. 修改当前的页码值为选中的页码；
2. 执行查询；

方案如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701617050830-a0ff7f68-b666-4552-8b39-c19d2544ad53.png#averageHue=%232d2c2b&clientId=u85d28c1a-50db-4&from=paste&height=140&id=ucbb7981c&originHeight=210&originWidth=1214&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23755&status=done&style=none&taskId=u769e2625-bd0d-478e-aef5-9b3d495d48c&title=&width=809.3333333333334)<br />翻页效果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701617150002-70f119d0-7256-4af9-b84a-10f33bcbd62c.png#averageHue=%23fdfcfc&clientId=u85d28c1a-50db-4&from=paste&height=395&id=u0d0e184e&originHeight=593&originWidth=2528&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=55288&status=done&style=none&taskId=ua54c42b4-edda-4979-945f-0ad9870e92f&title=&width=1685.3333333333333)

##### 3).分页功能维护
1)、2)节开发的分页功能存在一个较为致命的缺陷，当分页的数据只有一个的时候，删除该条数据，页面会显示BUG(前一页的内容显示为空)。造成这个BUG的原因是返回的数据中当前页current小于目前的总页数，按照原有逻辑会调取getAll()方法重新调用后端分页接口传入当前的current，导致查询为空。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701618937014-c9db6251-a241-4e22-b965-64ae56c0da4e.png#averageHue=%23fefefe&clientId=u85d28c1a-50db-4&from=paste&height=712&id=u4d512d7a&originHeight=1068&originWidth=2555&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40990&status=done&style=none&taskId=u76a525c1-9565-4a20-8a2d-ea4490a42e7&title=&width=1703.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701618959635-22c01bbe-56a1-4e4e-9b07-3e1e0ac0b3c9.png#averageHue=%23fefefe&clientId=u85d28c1a-50db-4&from=paste&height=640&id=u0d1af7cf&originHeight=960&originWidth=2557&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40608&status=done&style=none&taskId=u208acde0-88e2-4412-8e82-96e9966d470&title=&width=1704.6666666666667)![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701619046994-1d3f503d-55ea-47e1-8138-3094b126c4c1.png#averageHue=%23fefdfd&clientId=u85d28c1a-50db-4&from=paste&height=509&id=u4cd03f44&originHeight=763&originWidth=2100&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=104774&status=done&style=none&taskId=uce01749b-d404-4b91-8fec-65b2d5180d8&title=&width=1400)<br />解决的办法为：在分页接口中进行半段，如果当前传入的前页码值大于总页码数，则更新当前页码值current为最大页码值，然后再重新进行查询。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701619304156-23c68d3a-c96a-419e-9c9b-383acb1d9f83.png#averageHue=%232d2c2b&clientId=u85d28c1a-50db-4&from=paste&height=297&id=ud098cad5&originHeight=445&originWidth=1388&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=84134&status=done&style=none&taskId=u63cbc105-44e2-4b46-a9ba-90c215abb1c&title=&width=925.3333333333334)<br />修改后删除当前页面最后一条，即可成功跳转。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701619421430-0617dfd6-b2cd-42e1-a98d-d38a7eb3f645.png#averageHue=%23fefefe&clientId=u85d28c1a-50db-4&from=paste&height=455&id=ubf213a6b&originHeight=682&originWidth=2556&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=33977&status=done&style=none&taskId=ud441543c-ae60-42fd-b0e0-317313ca652&title=&width=1704)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701619459475-cf03b9c5-9372-4744-a0af-14becb0164d4.png#averageHue=%23fdfbfb&clientId=u85d28c1a-50db-4&from=paste&height=693&id=uc1ffdd6b&originHeight=1039&originWidth=2558&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=90916&status=done&style=none&taskId=u2de1e231-1e3c-4913-a6c6-d51414f969b&title=&width=1705.3333333333333)
#### （7).条件查询功能
本小节将进行条件查询功能的开发，在上一小节中已经进行了列表分页功能的开发，条件查询即是在分页查询的基础上将查询的条件进行携带，所以在后端分页接口的参数中加上将要查询的对象，在前端的请求地址中明文拼接查询的条件，即可完成该功能。
##### 1).前端实现
在进行开发前需要知道如何从前端获取查询的数据，前端发请求的时候需要将三个模糊查询的数据进行拼接，所以要在books.html中将模糊查询的数据图书类别、图书名称、图书描述进行数据模型定义并将数据模型绑定。<br />数据模型定义：因为模糊查询与分页查询是同时进行的，为了方便，在vue模型中进行数据模型定义；<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701791203390-7ad6a52e-a265-4d05-8330-02d8a897537d.png#averageHue=%232d2b2b&clientId=ubcb090c2-d4b4-4&from=paste&height=443&id=u0c0bc1e8&originHeight=665&originWidth=1232&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=88889&status=done&style=none&taskId=u13c498bd-3520-4935-bf35-a36804324d1&title=&width=821.3333333333334)<br />定义数据模型后，进行数据模型与前端标签的绑定：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701791287503-abf865db-800e-44ae-92f9-501245fe43ca.png#averageHue=%232f2e2c&clientId=ubcb090c2-d4b4-4&from=paste&height=298&id=u74c4ff02&originHeight=447&originWidth=1518&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=97329&status=done&style=none&taskId=u000b388c-54b6-403f-9be2-26286fbb621&title=&width=1012)<br />数据模型与前端标签进行绑定后，在前端页面中输入模糊查询的条件，在html中即可拿到该数据，使用console()方法接受pagination.type数据进行测试：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701791559465-b35c61d7-58bd-4c72-a0b8-d610de6ab5e6.png#averageHue=%232d2b2b&clientId=ubcb090c2-d4b4-4&from=paste&height=285&id=uacb4916f&originHeight=428&originWidth=1353&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=57834&status=done&style=none&taskId=ufa0cf6d5-e42c-4547-9788-dfeaf3ee055&title=&width=902)<br />在图书类别标签中输入123点击查询，控制台能成功显示数据：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701791649344-6c12d991-4f20-400b-8460-f60149c62e2e.png#averageHue=%23fcfaf9&clientId=ubcb090c2-d4b4-4&from=paste&height=726&id=ub08cf779&originHeight=1089&originWidth=2091&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=175617&status=done&style=none&taskId=u3a17633d-3780-4597-be30-2a6ac1699fc&title=&width=1394)<br />测试数据获取无误后，将三个模糊查询条件进行组合拼接：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701791887220-47066c2d-e09c-4a21-ad37-a087ae80b0e8.png#averageHue=%232c2b2b&clientId=ubcb090c2-d4b4-4&from=paste&height=349&id=u5d5d5126&originHeight=523&originWidth=1432&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=76273&status=done&style=none&taskId=udd64e7d6-951e-4b85-81dd-251a485657b&title=&width=954.6666666666666)<br />在控制台能成功看到拼接后的数据：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701792065367-0912d1bc-83d4-495c-8982-3e5ae7981dc8.png#averageHue=%23fdfdfd&clientId=ubcb090c2-d4b4-4&from=paste&height=455&id=u4374f21b&originHeight=683&originWidth=2517&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=116839&status=done&style=none&taskId=u8a3927b2-461c-4272-8c8b-ecd96184894&title=&width=1678)<br />至此，前端功能已经制作完毕，接下来进行后端模糊查询的开发。
##### 2).后端接口
在IBookService中定义一个getPage方法的重载，方法参数中传入一个Book类型的参数：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701792229887-81860817-6b64-4420-8ab1-fdca6a783541.png#averageHue=%23322c2b&clientId=ubcb090c2-d4b4-4&from=paste&height=167&id=uc9e6657f&originHeight=250&originWidth=949&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=25405&status=done&style=none&taskId=u08760c31-3138-4365-94e3-370732ced51&title=&width=632.6666666666666)<br />服务层实现类BookServiceImpl中实现重载的getPage方法：new一个LambdaQueryWrapper查询对象，调用模糊查询方法like()，填入将需要进行模糊查询的参数后，将LambdaQueryWrapper对象填入selectPage查询方法中；<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701792278117-f55d479c-f931-4778-9e48-0db11837195e.png#averageHue=%232d2c2b&clientId=ubcb090c2-d4b4-4&from=paste&height=243&id=u5c5441af&originHeight=364&originWidth=1421&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=69123&status=done&style=none&taskId=u4c9e7025-4ee9-4591-88a0-0d84fe4ea91&title=&width=947.3333333333334)<br />表现层接口：<br />在getPage接口的方法中传入一个Book类型的参数接收前端传入的信息(通过SpringMVC的参数绑定，若参数名符合实体类的属性名，会自动为实体类注入属性)，服务层对象bookService调用的方法换为重载的getPage方法。![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701792640455-abdde397-3580-448b-9451-875ce854bd6e.png#averageHue=%232d2c2b&clientId=ubcb090c2-d4b4-4&from=paste&height=291&id=ub1d67493&originHeight=437&originWidth=1387&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=85419&status=done&style=none&taskId=u290188e1-bd0c-4f8d-ac13-5552e3b09cd&title=&width=924.6666666666666)<br />重新运行启动类进行测试:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701792827723-d13a57c8-53d2-405b-b254-2bf60730a840.png#averageHue=%23fefdfd&clientId=ubcb090c2-d4b4-4&from=paste&height=680&id=u6d003c5d&originHeight=1020&originWidth=2459&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=130882&status=done&style=none&taskId=uf2e13ac7-c9dc-4558-aaef-1f8d6fbd8a8&title=&width=1639.3333333333333)<br />能够查询出输入的内容，并展示分页信息，条件查询功能开发完毕。<br />至此基于SpringBoot的SSMP整合案例已全部开发完成，该项目能让同学们从项目的整体上了解后端开发的工作内容，以及前后端联调的过程，认识web网页开发的全流程。
## 6.SpringBoot缓存管理
缓存是分布式系统中的重要组件，主要解决数据库数据的高并发访问问题。在实际开发中，尤其是用户访问量较大的网站，为了提高服务器访问性能、减少数据库的访问压力、提高用户体验，使用缓存显得尤为重要。我们生活中常用到软件里处处都能看到缓存的身影，如：

- 手机短信验证等业务场景，使用Redis缓存中间件的expire命令设置一个键的生存时间(通常为60S)，到时间后redis会删除它，期间不允许同一用户再次获取验证码(限制接口的请求次数)，这样不仅满足了手机短信验证功能，还能防止恶意用户大量进行请求，保证了验证业务的稳定性。(下图为微信手机短信验证登陆)

![短信验证登陆.jpg](https://cdn.nlark.com/yuque/0/2023/jpeg/33318872/1701848120094-9431d401-72e4-4a20-acf5-2bda58697c73.jpeg#averageHue=%231e1e1e&clientId=u656123d2-cc4a-4&from=drop&height=425&id=ua0b7f494&originHeight=2532&originWidth=1170&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=127747&status=done&style=none&taskId=u5cddb7b2-c0c7-4759-a525-bf307cdb183&title=&width=196.33334350585938)

- 延时操作业务场景，比如在订单生产后我们占用了库存，24小时后去检验用户是否真正购买，如果没有购买将该单据设置无效，同时还原库存。我们在订单生产时，设置一个key，同时设置24小时后过期， 我们在后台实现一个监听器，监听key的实效，监听到key失效时将后续逻辑加上。(下图为淘宝未支付订单)

![淘宝订单图1.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701848751280-b205ae18-dea0-4b26-b908-101cbc9e8454.png#averageHue=%23dec3a8&clientId=u656123d2-cc4a-4&from=drop&height=386&id=u4f9ff8ac&originHeight=2532&originWidth=1170&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1582927&status=done&style=none&taskId=ua4e2f814-c6e8-4a57-9a6c-b8645396be2&title=&width=178.33334350585938)![淘宝订单图2.jpg](https://cdn.nlark.com/yuque/0/2023/jpeg/33318872/1701848765030-750fbb4a-9214-4706-bee2-618ce0d2f8de.jpeg#averageHue=%23f1eeec&clientId=u656123d2-cc4a-4&from=drop&height=377&id=u64efe317&originHeight=2532&originWidth=1170&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=214089&status=done&style=none&taskId=ud2dbd0c9-ad59-4977-a594-e9b89061fed&title=&width=174.33334350585938)

- 排行榜热点数据场景，关系型数据库在排行榜方面查询速度普遍偏慢(硬盘大量数据更新与查询)，所以可以借助redis等缓存的SortedSet进行热点数据的排序。比如微博热搜排行榜，通过zrangebyscore，将热点新闻的id作为key，将新闻的点击数作为score，利用score排序进行热搜排行，然后针对每个热点新闻做一个hash，通过id可获取热点新闻的具体内容信息。(下图为微博热搜)

![热搜.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701849325856-89c77741-25e0-43fd-96e3-14dedfc9138a.png#averageHue=%23f4e9d4&clientId=u656123d2-cc4a-4&from=drop&height=410&id=ufa8977e8&originHeight=2532&originWidth=1170&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1363162&status=done&style=none&taskId=u6d133a91-db1b-4d2c-bb5d-75d8571ee71&title=&width=189.33334350585938)<br />由此可见缓存的学习十分必要，在大量的业务中需要用到缓存的高性能，通过其操作简单，访问和存储的速度快的特性帮助开发者解决一些棘手的问题。SpringBoot对缓存提供了良好的支持。本章将对SpringBoot的缓存管理进行介绍，并完成SpringBoot与Redis缓存中间件的整合。
### 6.1.SpringBoot默认缓存管理
Spring框架支持透明地向应用程序添加缓存并对缓存进行管理，其管理缓存的核心是将缓存应用于操作数据的方法中，从而减少操作数据的次数，同时不会对程序本身造成任何干扰。SpringBoot继承了Spring框架的缓存管理功能，Spring的缓存模块提供了多种缓存管理方案，例如使用各种缓存库（如Ehcache、Hazelcast等）来实现缓存管理，通过使用@EnableCaching注解开启基于注解的缓存支持，本小节将以项目demo的形式介绍SpringBoot基于内存的默认缓存。
#### （1).项目及环境搭建
使用缓存的主要目的是减小数据库的访问压力，为此，本节将结合数据库的访问操作对SpringBoot的缓存进行演示，接下来首先搭建项目和配置环境。<br />**数据准备**：<br />使用前期课程创建的springboot_db数据库以及其中的Book表作为演示数据。<br />**项目创建**：<br />创建名为SpringBoot_09_defaultCache的项目，引入lombok、SpirngWeb、Mybatis、MySQL Driver依赖，并在pom文件中引入Mybatis-Plus和Druid依赖，如下图所示：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701855889367-f68925c2-24fc-4d6f-ab15-4447ea19d03d.png#averageHue=%233c4144&clientId=u656123d2-cc4a-4&from=paste&height=629&id=u38b4ab59&originHeight=944&originWidth=1211&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=71286&status=done&style=none&taskId=u4d79caf2-f688-4b70-9f4c-8f1e90b55c8&title=&width=807.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701855984345-ea0b29ab-ff40-4b5a-a670-5fd30ee0098a.png#averageHue=%23494b44&clientId=u656123d2-cc4a-4&from=paste&height=695&id=ufb51d998&originHeight=1043&originWidth=1956&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1304467&status=done&style=none&taskId=u972915db-8846-473d-aaaf-46c0841d545&title=&width=1304)<br />**application.properties配置：**<br />进行web服务访问端口(默认8080)和数据库连接相关配置<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701941653199-17b8422d-bb07-441a-849c-71a953993a58.png#averageHue=%233f3935&clientId=u5580017e-3bb2-4&from=paste&height=491&id=u745bbd90&originHeight=736&originWidth=1483&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=712082&status=done&style=none&taskId=ua6e0165d-85f9-4b62-bd6a-63a699c9cbd&title=&width=988.6666666666666)<br />**实体类创建：**<br />在com.xyzy包下创建一个名为entity的包，在该包下创建名为Book的实体类，与数据库中的book表进行映射，使用@Data注解协助实体类快速开发。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701856427297-c4f7ed32-0d56-487d-ba2e-4ec1a50de6b6.png#averageHue=%233e3835&clientId=u656123d2-cc4a-4&from=paste&height=278&id=ucbf633a8&originHeight=417&originWidth=859&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=277471&status=done&style=none&taskId=ufa606d86-eb1d-4500-918a-0df12ec6378&title=&width=572.6666666666666)<br />**持久层接口：Mapper**<br />在com.xyzy包下创建一个名为mapper的包，在该包下创建名为BookMapper的接口，并继承Mybatis-Plus提供的BaseMapper接口，实现持久层快速开发。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701941963364-849a4d50-ca4f-4cc5-a8db-fae2444e28a0.png#averageHue=%233f3a35&clientId=u5580017e-3bb2-4&from=paste&height=253&id=u0309f09e&originHeight=379&originWidth=1065&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=312049&status=done&style=none&taskId=ua9a36469-2d87-4d52-97aa-2d5263643ba&title=&width=710)<br />**业务层接口和业务层接口实现类：**<br />在com.xyzy包下创建一个名为service的包，在该包下创建名为IBookService的接口，并继承Mybatis-Plus提供的IService接口，接口定义一个通过Id查询Book的方法。在service包下创建一个名为Impl的包，在该包下创建名为BookServiceImpl的类，继承ServiceImpl<M,T>类，并实现IBookService接口。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701943084105-f7758b43-da45-447e-b9de-aed124d87ab0.png#averageHue=%233c3734&clientId=u5580017e-3bb2-4&from=paste&height=236&id=u335deb46&originHeight=354&originWidth=1031&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=282960&status=done&style=none&taskId=ufc0ea160-37d2-49cf-9f10-6367262539a&title=&width=687.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701943098892-2e70f00e-6e28-4b67-a401-59403c22fa66.png#averageHue=%233a3533&clientId=u5580017e-3bb2-4&from=paste&height=435&id=u94a9fba7&originHeight=652&originWidth=1322&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=599179&status=done&style=none&taskId=u13ebd164-8bda-465a-bec1-86a42a15aa3&title=&width=881.3333333333334)<br />**控制层开发：**<br />在com.xyzy包下创建一个名为controller的包，在该包下创建名为BookController的实体类用于控制层方法映射<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701956419114-8073a4c1-c0db-40aa-9a02-b16d2a95d504.png#averageHue=%23393431&clientId=u9061f7e3-8a81-4&from=paste&height=315&id=u130a11ac&originHeight=472&originWidth=1452&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=458187&status=done&style=none&taskId=u0cd8ebff-7005-41b6-9776-1c241f52a6e&title=&width=968)<br />**项目测试：**<br />启动SpringBoot_09_defaultCache项目，项目成功运行后，在浏览器上访问"http://localhost:8080/books/1"查询Id为1的书目信息。访问多次，页面总是显示这一条数据，而且每次访问控制台都会输出相应的查询SQL。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701952919273-37a15ee1-7a12-4547-b15a-0dd0d6bf58bd.png#averageHue=%23fdfdfd&clientId=u9061f7e3-8a81-4&from=paste&height=715&id=ud8de2682&originHeight=1072&originWidth=1371&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=85799&status=done&style=none&taskId=u22018dd0-8851-4c7a-bd76-81de372cf15&title=&width=914)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701943638860-bf10b27d-c5fe-41a2-abd4-ac7e0039cafd.png#averageHue=%233b3835&clientId=u5580017e-3bb2-4&from=paste&height=526&id=u94f9cba5&originHeight=789&originWidth=1894&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=988499&status=done&style=none&taskId=u3ea7935c-ff64-4d19-a1dc-49d3ccb9ef5&title=&width=1262.6666666666667)<br />之所以出现上述"而且每次访问控制台都会输出相应的查询SQL"的情况，是因为没有在SpringBoot中开启缓存管理，在没有开启缓存的情况下，每次执行一次查询操作，都会访问数据库一次并执行一次相应的SQL语句，随着用户规模的扩大，当数据规模十分庞大时，这样频繁的操作数据库会影响用户体验，并对数据库造成访问压力导致崩溃宕机等情况的发生，此时使用缓存能很好的解决这一类问题。
#### （2).SpringBoot缓存管理使用
在上一小节中搭建的web项目基础上，开启SpringBoot支持的缓存，演示使用SpringBoot缓存的效果。<br />**开启默认缓存：**<br />使用**@EnableCaching**注解开启基于注解的缓存支持，该注解通常会添加在项目启动类上。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701946068572-98e98d3f-75ff-42b4-ae22-a271e61bcce0.png#averageHue=%233d3733&clientId=u5580017e-3bb2-4&from=paste&height=286&id=u88181821&originHeight=429&originWidth=1143&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=396533&status=done&style=none&taskId=u49347798-fe2f-4dd7-bcf4-3bca3421ba5&title=&width=762)<br />**缓存查询结果：**<br />使用**@Cacheable**注解对数据操作方法进行缓存管理。将@Cacheable注解标注在BookServiceImpl类的查询方法上，对查询结果进行缓存<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701956447091-fab55633-27d8-4f7b-8c35-7e8eb82a76b2.png#averageHue=%233b3533&clientId=u9061f7e3-8a81-4&from=paste&height=313&id=ub0b1afe8&originHeight=470&originWidth=1304&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=435756&status=done&style=none&taskId=u036ce766-2cf5-4975-a46d-f267b2123f6&title=&width=869.3333333333334)<br />在上述代码中，@Cacheable注解指定了缓存的名称为"bookCache"，并使用方法的参数id作为缓存的键(key)。如果在后续调用中传递相同的id，则会直接从缓存中获取数据，而不会执行getById()方法。<br />**SpringBoot默认缓存测试：**<br />启动SpringBoot_09_defaultCache项目，项目成功运行后，在浏览器上访问"http://localhost:8080/books/1"查询Id为1的书目信息。访问多次，页面总是显示这一条数据，但是控制台只会输出第一次查询的SQL日志信息，往后的每一次调用接口都从缓存中获取数据(控制台打印book对象的hash值不变)。![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701953071874-032bdb43-a19c-45c2-8a28-a0549bdf242f.png#averageHue=%233c3835&clientId=u9061f7e3-8a81-4&from=paste&height=419&id=u3ff161f0&originHeight=628&originWidth=2314&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=896430&status=done&style=none&taskId=u2688ffd0-63d2-451e-9983-443b6243d33&title=&width=1542.6666666666667)
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
| `unless` | 与`condition`<br />相反，指定是否不执行缓存的SpEL表达式，为false时执行缓存 | `@Cacheable(value = "myCache", unless = "#result == null")` |

- **@CachePut注解：**@CachePut 是 Spring 框架中用于将方法的结果放入缓存的注解之一。与 @Cacheable 注解不同，@CachePut 注解总是执行方法，并将结果放入缓存中，以确保缓存中的数据是最新的。这个注解通常用于更新缓存中的数据(作用于类或者方法上，通常是数据更新的方法上，默认执行顺序是先调用方法然后将方法的返回值更新到缓存中)，@CachePut也提供了多个属性，这些属性与@Cacheable的属性完全一致 。示例如下：

业务层接口新增updateBook方法：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701960746221-16c7b463-0351-440e-8f0d-1204b509c8c3.png#averageHue=%23393432&clientId=u9061f7e3-8a81-4&from=paste&height=180&id=ub6a20b34&originHeight=270&originWidth=1452&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=272202&status=done&style=none&taskId=u72849f6d-c661-4ed9-aed7-18363ee78ae&title=&width=968)<br />业务层接口实现类实现updateBook方法：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701960761424-d02c0563-25db-4316-abe3-5179b8e993fc.png#averageHue=%23353230&clientId=u9061f7e3-8a81-4&from=paste&height=137&id=u451e4b9a&originHeight=206&originWidth=1449&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=172452&status=done&style=none&taskId=u977a7ec0-c71e-446b-8cae-f6af44ed5c5&title=&width=966)<br />控制层方法映射：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701960774797-1f6b9c8b-dd77-47ac-9408-ba0dc2f6cd72.png#averageHue=%23393532&clientId=u9061f7e3-8a81-4&from=paste&height=186&id=u6f53f80c&originHeight=279&originWidth=1454&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=241774&status=done&style=none&taskId=u642658b3-07b7-4098-8375-a752781a8cb&title=&width=969.3333333333334)<br />postman调用更新接口，更新书籍，更新成功后，书籍的信息会存入缓存中，key为书籍的id：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701961025982-ea55637d-7db2-4df8-9bc0-97dd942927e2.png#averageHue=%23fcfcfb&clientId=u9061f7e3-8a81-4&from=paste&height=417&id=uf6c00161&originHeight=626&originWidth=1328&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=83980&status=done&style=none&taskId=u14494076-8124-4194-a931-3f751b6e1f1&title=&width=885.3333333333334)<br />调用查询接口进行查询多次：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701961007304-4b3b8228-b1dc-4381-878d-cce2750d18a3.png#averageHue=%23fdfcfc&clientId=u9061f7e3-8a81-4&from=paste&height=483&id=u018d604e&originHeight=725&originWidth=1324&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=83634&status=done&style=none&taskId=u4144e975-ba7d-49df-92d5-b2f61e05636&title=&width=882.6666666666666)<br />发现控制台没有打印""----获取书籍:" + id" 相关信息，表明查询没有调用业务层的getById(Integer id)方法，信息是从缓存中获取的。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701961062518-c22d2266-3487-4833-8ae4-fdfc87a71a30.png#averageHue=%23393633&clientId=u9061f7e3-8a81-4&from=paste&height=256&id=u035ae27e&originHeight=384&originWidth=1936&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=471396&status=done&style=none&taskId=ufbf5650e-119d-419b-8264-63d3eceb7b9&title=&width=1290.6666666666667)

- **@CacheEvict注解**：@CacheEvict 是 Spring 框架中用于清除缓存中的数据的注解之一。通过 @CacheEvict 注解，可以指定在方法执行后清除缓存中的特定数据或整个缓存。这个注解通常用于在执行更新、删除等操作时，清除缓存，以便下一次访问时重新加载最新的数据(作用于类或者方法上，通常是数据删除或更新的方法上，默认执行顺序是先调用方法然后清除缓存)，@CacheEvict的属性与Cacheable的属性基本相同，除了allEntries与beforeInvocation属性**：**
| **属性** | **描述** | **示例** |
| --- | --- | --- |
| `**allEntries**` | **是否清除缓存中的所有数据，默认为 **`**false**`<br />**。如果设置为 **`**true**`<br />**，将清除整个缓存。** | `**@CacheEvict(value = "myCache", allEntries = true)**` |
| `**beforeInvocation**` | **是否在方法执行前清除缓存，默认为 **`**false**`<br />**。如果设置为 **`**true**`<br />**，缓存将在方法执行前清除，即使方法执行抛出异常。** | `**@CacheEvict(value = "myCache", beforeInvocation = true)**` |

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
| `keyGenerator` | 指定用于生成缓存键的 `KeyGenerator`<br /> bean 的名称。如果不指定，将使用默认的键生成器。 | `@CacheConfig(keyGenerator = "customKeyGenerator")` |
| `cacheManager` | 指定使用的缓存管理器的名称。如果不指定，将使用默认的缓存管理器。 | `@CacheConfig(cacheManager = "customCacheManager")` |

### 6.2.SpringBoot整合Redis实现缓存
学习SpringBoot整合Redis之前我们先了解一下Redis。<br />Redis简介：Redis是一款内存高速缓存数据库。Redis全称为：**Remote Dictionary Server**（远程数据服务），使用C语言编写，Redis是一个key-value存储系统（键值存储系统），支持丰富的数据类型，如：String、list、set、zset、hash。<br />Redis是一种支持key-value等多种数据结构的存储系统。可用于缓存，事件发布或订阅，高速队列等场景。支持网络，提供字符串，哈希，列表，队列，集合结构直接存取，基于内存，可持久化。<br />Redis的特点：

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
首先对redis来说，所有的key（键）都是字符串。我们在谈基础数据结构时，讨论的是存储值的数据类型，主要包括常见的5种数据类型，分别是：String、List、Set、Zset、Hash。<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/33318872/1701966391495-6e4c2a7c-feb7-455f-ad58-73ccd35fa0ee.jpeg#averageHue=%23eedfd3&clientId=u9061f7e3-8a81-4&from=paste&id=ubcc4f66d&originHeight=392&originWidth=876&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u7cc26e2b-b1a8-4659-8449-0265601e8ed&title=)

| 结构类型 | 结构存储的值 | 结构的读写能力 |
| --- | --- | --- |
| **String字符串** | 可以是字符串、整数或浮点数 | 对整个字符串或字符串的一部分进行操作；对整数或浮点数进行自增或自减操作； |
| **List列表** | 一个链表，链表上的每个节点都包含一个字符串 | 对链表的两端进行push和pop操作，读取单个或多个元素；根据值查找或删除元素； |
| **Set集合** | 包含字符串的无序集合 | 字符串的集合，包含基础的方法有看是否存在添加、获取、删除；还包含计算交集、并集、差集等 |
| **Hash散列** | 包含键值对的无序散列表 | 包含方法有添加、获取、删除单个元素 |
| **Zset有序集合** | 和散列一样，用于存储键值对 | 字符串成员与浮点数分数之间的有序映射；元素的排列顺序由分数的大小决定；包含方法有添加、获取、删除单个元素以及根据分值范围或成员来获取元素 |

**基础数据结构详解：**<br />**String字符串：**<br />String是redis中最基本的数据类型，一个key对应一个value。<br />String类型是二进制安全的，意思是 redis 的 string 可以包含任何数据。如数字，字符串，jpg图片或者序列化的对象。

- **图例**

下图是一个String类型的实例，其中键为hello，值为world。<br />![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701966590870-cc486eae-590c-4cb0-8108-6d80d6db421d.png#averageHue=%23f7f7f7&clientId=u9061f7e3-8a81-4&from=paste&height=292&id=u55a56619&originHeight=504&originWidth=814&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=uf9318934-b231-463a-86be-1fc3081005e&title=&width=472.3333435058594)

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

**List列表：**<br />Redis中的List其实就是链表（Redis用双端链表实现List）。<br /> 使用List结构，我们可以轻松地实现最新消息排队功能（比如新浪微博的TimeLine）。List的另一个应用就是消息队列，可以利用List的 PUSH 操作，将任务存放在List中，然后工作线程再用 POP 操作将任务取出进行执行。

- **图例**

![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701966973041-dfe44fad-94da-48cf-8fc5-b6e64c5cd6d3.png#averageHue=%23f2f2f2&clientId=u9061f7e3-8a81-4&from=paste&height=277&id=ude58effb&originHeight=518&originWidth=768&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=udaf99d95-3c55-462d-97f7-70d27a09838&title=&width=411.3333740234375)

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

**Set集合：**<br />Redis 的 Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

- **图例**

![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701967198732-8cc6fe50-b1df-422a-a89b-a71ee4b2d725.png#averageHue=%23f3f3f3&clientId=u9061f7e3-8a81-4&from=paste&height=237&id=ue309bd55&originHeight=544&originWidth=776&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u681e4c3d-88bb-42ea-9444-194755ab716&title=&width=338.3333435058594)

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

Hash散列：<br />Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。<br />![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701967374525-a6301a96-87a3-46e3-979e-19e2136726f7.png#averageHue=%23f0f0f0&clientId=u9061f7e3-8a81-4&from=paste&height=272&id=u53c360db&originHeight=582&originWidth=742&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=ucd73258c-46d5-4569-ab07-87e89f1e6c5&title=&width=347)

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

Zset有序集合：<br />Redis 有序集合和集合一样也是 string 类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个 double 类型的分数score。redis 正是通过score来为集合中的成员进行从小到大的排序。<br />有序集合的成员是唯一的, 但分数(score)却可以重复。有序集合是通过两种数据结构实现：

1. **压缩列表(ziplist)**: ziplist是为了提高存储效率而设计的一种特殊编码的双向链表。它可以存储字符串或者整数，存储整数时是采用整数的二进制而不是字符串形式存储。它能在O(1)的时间复杂度下完成list两端的push和pop操作。但是因为每次操作都需要重新分配ziplist的内存，所以实际复杂度和ziplist的内存使用量相
2. **跳跃表（zSkiplist)**: 跳跃表的性能可以保证在查找，删除，添加等操作的时候在对数期望时间内完成，这个性能是可以和平衡树来相比较的，而且在实现方面比平衡树要优雅，这是采用跳跃表的主要原因。跳跃表的复杂度是O(log(n))。
- **图例**

![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701967663654-af985923-bfd7-43cc-871e-617b3ddbfab8.png#averageHue=%23ededed&clientId=u9061f7e3-8a81-4&from=paste&height=285&id=u3a1cd153&originHeight=542&originWidth=730&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u9844ee2d-694e-4d61-a85a-3fe2e0f8322&title=&width=384)

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
Redis官网下载地址：[https://redis.io/download/](https://redis.io/download/)，Redis GitHub下载地址(推荐)：[https://github.com/tporadowski/redis/releases/](https://github.com/tporadowski/redis/releases/)<br />安装和使用步骤：<br />1.下载下图中的zip版本，在本地进行解压：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701962629729-04674de6-8f01-4a19-a734-5b01728e2727.png#averageHue=%23fefdfd&clientId=u9061f7e3-8a81-4&from=paste&height=430&id=ue3388e30&originHeight=645&originWidth=1370&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=82022&status=done&style=none&taskId=uf7e46a70-3182-4a23-a828-d6ada7662b8&title=&width=913.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701963270556-755a6442-c601-49db-a669-bfaadd3b84cc.png#averageHue=%23fcfbfb&clientId=u9061f7e3-8a81-4&from=paste&height=609&id=uc0355a36&originHeight=913&originWidth=1464&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=89888&status=done&style=none&taskId=u5a2d7fc0-cd5b-4b5e-924f-3772f50ca1d&title=&width=976)<br />2.Windows下Redis的使用方法：<br />启动服务端：<br />服务端启动命令：redis-server.exe(如果无法启动服务端，使用命令： redis-server redis.windows.conf  )<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701963908541-9352c19a-ad06-4723-850f-090e890361de.png#averageHue=%23141414&clientId=u9061f7e3-8a81-4&from=paste&height=633&id=udf7b7bf9&originHeight=950&originWidth=1731&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=93834&status=done&style=none&taskId=u9c446532-47fa-4fca-acf8-98755f4d16b&title=&width=1154)<br />启动客户端：<br />客户端启动命令：redis-cli<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701966142504-c77ae306-63f4-405e-b42d-5ef11cddd61d.png#averageHue=%23111111&clientId=u9061f7e3-8a81-4&from=paste&height=638&id=ub950442e&originHeight=957&originWidth=1734&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=72414&status=done&style=none&taskId=u8a130fb4-9e15-4da4-a81a-1f8583e0469&title=&width=1156)<br />启动完服务端和客户端后，在客户端就能使用Redis的命令存取数据了。
#### （3).Redis客户端可视化工具Redis Desktop Manager
Redis Desktop Manager GitHub下载地址：[https://github.com/RedisInsight/RedisDesktopManager/releases/tag/0.9.3](https://github.com/RedisInsight/RedisDesktopManager/releases/tag/0.9.3)<br />安装和使用步骤：<br />安装：运行下载好的安装文件redis-desktop-manager-0.9.3.817.exe，点击下一步直到选择安装路径页面，选择合适的安装路径，点击安装即可：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701965284024-a0d33da0-a4f8-4d26-8e77-25cb259f4b8a.png#averageHue=%23efeeed&clientId=u9061f7e3-8a81-4&from=paste&height=385&id=u6263a087&originHeight=577&originWidth=749&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=107176&status=done&style=none&taskId=uaf9b82e3-8099-487f-9c23-155d9a5e48b&title=&width=499.3333333333333)<br />使用方法：<br />1.打开RedisDesktopManager客户端，点击左上方的“连接到Redis服务”，进行Redis服务连接。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701965587912-c0a48636-38aa-485a-971c-329f06e69017.png#averageHue=%23f8f7f7&clientId=u9061f7e3-8a81-4&from=paste&height=1012&id=u26812b57&originHeight=1518&originWidth=2556&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=123323&status=done&style=none&taskId=u2a060fe0-45f6-47f1-b7af-6540887dd75&title=&width=1704)<br />2.输入连接相关信息：<br />连接名称(自定义)，服务端地址(本地默认127.0.0.1)，Redis 端口(默认 6379，验证密码(如没有设置，为空即可)，输入完成后点击下方的测试连接，出现连接成功窗口即可使用(点击右下角的"好"关闭窗口)。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701965867359-adcc799e-71d1-4dac-8ba4-ce9935114670.png#averageHue=%23f4f4f4&clientId=u9061f7e3-8a81-4&from=paste&height=425&id=ub4437c71&originHeight=1389&originWidth=1203&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=93222&status=done&style=none&taskId=u7689cddb-6a51-47cf-8126-83331b1c748&title=&width=368.3333740234375)<br />3.点击左侧的连接图标即可进入查询缓存、添加缓存、删除缓存等。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1701966034218-d4fb0c74-5b94-48ef-8479-118781f0a637.png#averageHue=%23fbfbfa&clientId=u9061f7e3-8a81-4&from=paste&height=1004&id=u9790bebe&originHeight=1506&originWidth=2544&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=148446&status=done&style=none&taskId=udd40a6c1-ca90-4ef4-8968-abcb22f0590&title=&width=1696)
#### （4).SpringBoot整合Redis(基于注解)
本小节在6.1节SpringBoot默认缓存管理的基础上引入Redis缓存组件，使用基于注解的方式实现SpringBoot整合Redis。<br />**添加Redis依赖**：<br />在SpringBoot_09_defaultCache项目的pom文件中添加Redis依赖，示例如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702383015868-395218a8-8c9f-4978-ace9-e0f981406e4c.png#averageHue=%23383533&clientId=ue3808248-b4f3-4&from=paste&height=111&id=u91ed18d0&originHeight=166&originWidth=1311&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=143466&status=done&style=none&taskId=u60363e98-1406-4278-9ce8-070691e3cc5&title=&width=874)<br />**Redis服务连接配置**：<br />在SpringBoot中使用第三方组件的时候都需要进行服务连接配置(如前面所学的连接MySQL)，在进行配置连接之前，首先需要开启第三方组件的服务，开启服务后在application.properties中添加Redis配置信息，示例如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702383581624-9d3ec87c-8e7a-4194-a338-78d54d21f49d.png#averageHue=%232c2b2b&clientId=ue3808248-b4f3-4&from=paste&height=180&id=ue8462370&originHeight=270&originWidth=1167&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=29870&status=done&style=none&taskId=u644498d2-3236-4ae2-84a4-dba4a442dcc&title=&width=778)<br />**缓存管理器设置：**<br />在配置文件中修改缓存管理器为Redis缓存管理器：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702455308969-3cb2c640-f99e-436f-b905-d5da4b29a01e.png#averageHue=%232d2c2b&clientId=uf40869a3-202e-4&from=paste&height=51&id=uca35ff59&originHeight=77&originWidth=679&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=7717&status=done&style=none&taskId=ud7274755-86c7-497e-9647-9ea79d76ea4&title=&width=452.6666666666667)<br />**基于注解的Redis缓存实现：**

- 服务层接口：定义一个服务层接口IBooksServiceRedisAnnotation，在其中通过Id查询书籍、更新书籍、删除书籍的方法。
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702384742868-ef208432-430b-45c3-a7e4-dfe890eaaf83.png#averageHue=%232c2b2b&clientId=ue3808248-b4f3-4&from=paste&height=307&id=u166918fe&originHeight=460&originWidth=1426&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38389&status=done&style=none&taskId=u3ed74ad8-0a9f-4570-9aa3-b470749e294&title=&width=950.6666666666666)
- 服务层接口实现类：定义一个服务层接口实现类BooksServiceRedisAnnotationImpl并实现IBooksServiceRedisAnnotation接口的方法。
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702385705768-a62bc66e-729d-4dc1-a352-98a35beec101.png#averageHue=%232c2b2b&clientId=ue3808248-b4f3-4&from=paste&height=679&id=u07e0acfb&originHeight=1018&originWidth=1453&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=119432&status=done&style=none&taskId=ud558cb94-f0a0-4b06-83cc-6c9cb2f3eb1&title=&width=968.6666666666666)
- 实体类序列化：Book实体类实现JDK自带的序列化接口Serializable(实现Serializable接口作用：将对象换为字节流，使其可以在网络上传输，与序列化相对的是反序列化，它将流转换为对象。这两个过程结合起来，可以实现数据的存储和网络数据。此处需要将数据缓存进Redis，如果传输的实体类对象不实现Serializable接口，会报IllegalArgumentException异常)。
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702384975888-6f56d9a6-4680-4835-ab97-a53a12688928.png#averageHue=%232c2b2b&clientId=ue3808248-b4f3-4&from=paste&height=191&id=u5e16cf3f&originHeight=286&originWidth=1064&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=31322&status=done&style=none&taskId=u4e2a3f1b-17fb-4dbb-8a06-d2395a8cca8&title=&width=709.3333333333334)
   - 未实现Serializable接口的异常：
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702386107548-d52a7ec1-65cf-412b-9bba-993c04c5bad1.png#averageHue=%2331302f&clientId=ue3808248-b4f3-4&from=paste&height=209&id=u5478ee9d&originHeight=313&originWidth=2130&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=126752&status=done&style=none&taskId=u508e4a44-96a5-4531-a344-d302fe270aa&title=&width=1420)
- 控制层开发：修改6.1小节使用的controller层接口，注入IBooksServiceRedisAnnotation对象，并添加一个新的方法deleteBook(Integer id)来实现删除接口。
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702385839369-50345559-5941-4903-aec8-255c280c51e3.png#averageHue=%232c2b2b&clientId=ue3808248-b4f3-4&from=paste&height=615&id=u31768a28&originHeight=923&originWidth=1464&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=122727&status=done&style=none&taskId=uc24ce729-9e8d-4c19-af35-2afff6b40da&title=&width=976)
- ID查询功能测试：使用postman测试通过id查询书籍的接口，通过GET请求多次调用“http://localhost:8080/books/1”，查询id为1的书籍信息，可以看到postman中总是显示这一条数据，但是控制台只会输出第一次查询的SQL日志信息，往后的每一次调用接口都从缓存中获取数据。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702386267464-79c8afa8-4606-4722-8268-80a61d018d24.png#averageHue=%232d2c2c&clientId=ue3808248-b4f3-4&from=paste&height=331&id=zgde8&originHeight=497&originWidth=1944&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=92105&status=done&style=none&taskId=uff8674c4-0be9-41e4-977e-0dfefbfb41a&title=&width=1296)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702386357739-7601b982-97e3-4493-bd2e-d3a8a64499c7.png#averageHue=%23fcfcfb&clientId=ue3808248-b4f3-4&from=paste&height=436&id=u7fe3302f&originHeight=654&originWidth=1305&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=78918&status=done&style=none&taskId=ub7dd6cc7-5415-4d52-bfd9-8771f56a34a&title=&width=870)<br />打开RedisDesktopManager客户端可以看到名为bookCache的名称空间中key为“bookCache::1”的缓存数据已经被Redis成功获取，其中的value数据经过JDK的默认序列化格式化转变为HEX格式被存入缓存中。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702386526160-f5e01d2d-a46d-43fe-b997-56d8d6bb3b79.png#averageHue=%23f9f7f6&clientId=ue3808248-b4f3-4&from=paste&height=557&id=u3c6ad8e8&originHeight=835&originWidth=2548&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=89487&status=done&style=none&taskId=u889f7106-aa85-4034-88a4-04f440d9722&title=&width=1698.6666666666667)

- 更新功能测试：使用postman测试更新书籍的接口，通过PUT请求调用“http://localhost:8080/books”，请求体输入需要更改书籍的JSON数据(修改id为1的数据)，调用接口可以看到postman中返回调用成功的信息，控制台输出更新数据的SQL日志信息，接着通过GET请求多次调用“http://localhost:8080/books/1"，可以看到控制台没有打印查询的SQL日志信息，并且postman中返回了更新后的正确结果，表明@CachePut缓存更新配置成功。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702388495081-afcfee31-f398-483c-83b7-3e63a6370798.png#averageHue=%23fcfcfb&clientId=ue3808248-b4f3-4&from=paste&height=428&id=u4f817761&originHeight=642&originWidth=1325&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=84249&status=done&style=none&taskId=u5098b3a0-78ec-4835-bbbf-ab18ab3776d&title=&width=883.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702388526875-1da860c7-0dbd-4c31-97d0-351f0c4b4eda.png#averageHue=%23fdfdfc&clientId=ue3808248-b4f3-4&from=paste&height=466&id=u39b2230a&originHeight=699&originWidth=1321&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=75328&status=done&style=none&taskId=u9447fcbe-0685-4db7-88cd-e6284ebc283&title=&width=880.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702388545726-8dcff035-6cfb-4282-a347-bb435a714f61.png#averageHue=%232e2d2c&clientId=ue3808248-b4f3-4&from=paste&height=227&id=u6c335440&originHeight=341&originWidth=1861&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=77057&status=done&style=none&taskId=u7f83f25b-533e-42cf-b1d0-5d7397e6b03&title=&width=1240.6666666666667)

- 删除功能测试：使用postman测试删除书籍的接口，通过DELETE请求调用“http://localhost:8080/books/1”删除ID为1的数据，调用接口可以看到postman中返回调用成功的信息，控制台输出删除数据的SQL日志信息，接着通过GET请求调用“http://localhost:8080/books/1"，可以看到控制台打印了查询的SQL日志信息，并且无法查询出已经删除的书籍信息，表明缓存已经删除。通过RedisDesktopManager客户端可以看到名为bookCache的名称空间已经删除。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702388816325-fb4ab3cd-7c30-4c33-bfc7-4ba9fddf0ba6.png#averageHue=%23fcfcfc&clientId=ue3808248-b4f3-4&from=paste&height=433&id=u79a6901c&originHeight=650&originWidth=1313&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66681&status=done&style=none&taskId=u393469f0-e85f-4993-8add-2c0ccd24409&title=&width=875.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702388828728-7b0530dc-6ab8-42e0-918b-6818ec4ded0f.png#averageHue=%23fdfcfc&clientId=ue3808248-b4f3-4&from=paste&height=498&id=u3c23def8&originHeight=747&originWidth=1324&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=83734&status=done&style=none&taskId=ub31e0ea6-90fa-4a3c-9f14-d3b20baf5f4&title=&width=882.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702388875646-b0d2507c-fb76-4587-b899-522648087521.png#averageHue=%232e2d2d&clientId=ue3808248-b4f3-4&from=paste&height=472&id=u25912d33&originHeight=708&originWidth=2054&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=168782&status=done&style=none&taskId=u6fda1b04-03bc-442c-b122-9e415a93242&title=&width=1369.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702388929124-a48383a7-ec69-4e5c-bf42-dcaead306747.png#averageHue=%23fbfaf9&clientId=ue3808248-b4f3-4&from=paste&height=488&id=ue292fdc3&originHeight=732&originWidth=2441&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=51158&status=done&style=none&taskId=u878a8b4c-8fd0-4183-944c-c1858389a68&title=&width=1627.3333333333333)<br />除了使用@CacheEvict注解删除缓存，我们还可以为缓存配置有效时间，待缓存存活的时间超过设置的有效时间后，系统会自动删除，配置如下(全局配置，且对API实现的Redis缓存不生效)：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702389193915-57e87a55-e45a-4e1a-af7c-2b8e1ddfdeda.png#averageHue=%232d2c2b&clientId=ue3808248-b4f3-4&from=paste&height=81&id=uce5b8070&originHeight=122&originWidth=819&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=10614&status=done&style=none&taskId=u2ecdc4e7-5619-43b0-b1f2-bf3626c0303&title=&width=546)
#### （5).SpringBoot整合Redis(基于API)
在SpringBoot中整合Redis，除了基于注解形式的Redis缓存实现外，还有开发中最常用的一种方式-基于API的Redis缓存实现，下面我们通过Redis API演示使用SpringBoot整合Redis的具体实现。<br />在本小节中，我们使用RedisTemplate(Spring Data Redis 提供的一个用于操作 Redis 数据库的模板类)来执行缓存操作，以下是RedisTemplate在SpringBoot项目中的使用，以及如何操作5种基础数据类型(使用前需要注入RedisTemplate对象，或者new一个RedisTemplate对象)：
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
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702393658079-b2028c2c-df68-441a-b452-1a26969d36ea.png#averageHue=%232b2b2b&clientId=ue3808248-b4f3-4&from=paste&height=218&id=uc48b8dd8&originHeight=327&originWidth=1363&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=27039&status=done&style=none&taskId=ue440ee34-7f05-4606-b6ad-f9aa7607400&title=&width=908.6666666666666)
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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702396114897-4e8a72d0-59f4-42e5-ae0a-cc7054b61bf5.png#averageHue=%232c2c2b&clientId=ue3808248-b4f3-4&from=paste&height=577&id=u5573e414&originHeight=866&originWidth=1458&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=119605&status=done&style=none&taskId=u5912073c-a4cb-4033-9215-9e6165622fb&title=&width=972)<br />至此本小节基于API的Redis缓存实现完毕，需要补充的是，基于API的Redis缓存实现不需要在SpringBoot启动类上添加@EnableCaching注解，所以可以在此处选择删除添加在启动类上的@EnableCaching注解，也可选择不管，添加该注解与否不影响基于API的Redis缓存的使用。<br />另外，无论是基于API的Redis缓存还是基于注解的Redis缓存都需要在pom文件中引入Redis的依赖，并在配置文件中配置Redis的连接信息，同事在实体类上实现序列化接口，这些相关的配置此前已经实现，此处不再重复。<br />本小节完成基于API的Redis缓存后，就可以进行缓存功能的测试，测试步骤与上一小节完全相同，此处不再进行重复演示。<br />相对使用注解的方式，使用Redis API进行数据缓存更加灵活，例如进行手机登录验证，灵活设置验证码过期时间，但是代码量也会随之增加。
#### （6).自定义Redis缓存序列化机制
前面我们已经实现了SpringBoot整合Redis进行数据的缓存管理，但是缓存的实体类数据在Redis中是以HEX格式进行保存的，不便于我们使用RedisDesktopManager进行查看和管理。本小节将介绍Redis序列化机制的实现原理以及如何自定义Redis序列化机制进行数据缓存管理。
##### 1).Redis默认序列化机制
基于API的Redis缓存是基于RedisTemplate模板类来实现的，打开RedisTemplate类，查看该类的信息。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702457752927-5cc1f037-ec26-44a6-b1f6-8317787bc476.png#averageHue=%23312c2b&clientId=uf40869a3-202e-4&from=paste&height=373&id=u8b92d798&originHeight=559&originWidth=1411&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=125044&status=done&style=none&taskId=u1a069cc5-c235-46c4-8a57-e39c00ce446&title=&width=940.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702458268971-e1332a81-67ec-4fce-882f-8135dd34825f.png#averageHue=%232b2b2b&clientId=uf40869a3-202e-4&from=paste&height=715&id=ue7a1e3a5&originHeight=1072&originWidth=1415&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=103423&status=done&style=none&taskId=ude98cff6-5ff7-43d6-b6cf-07d49a4ed89&title=&width=943.3333333333334)<br />在RedisTemplate内部声明了缓存数据key、value、hashKey、hashValue的序列化方式和默认的序列化方式变量defaultSerializer(5个变量的初始值均为null)，在afterPropertiesSet()方法中进行了判断：如果defaultSerializer的值为null，则将defaultSerializer赋值为JdkSerializationRedisSerializer，enableDefaultSerializer默认值为true，后续判断会将缓存数据key、value、hashKey、hashValue的序列化方式均设置为defaultSerializer的值，即为JdkSerializationRedisSerializer。经过上述源码分析，我们可以知道使用RedisTemplate的时候如果不手动设置defaultSerializer的值，则会默认使用Jdk序列化机制。如果我们在自定义的配置类中修改defaultSerializer的值，或者直接定义key、value、hashKey、hashValue的序列化方式，即可自定义我们需要的序列化机制。<br />进入到RedisSerializer接口中我们可以看到该接口的具体实现，在2.5.5版本的Redis依赖下RedisSerializer接口有7个默认的实现类，其中JdkSerializationRedisSerializer是JDK自带的序列化实现方式，我们可以根据需要自行选择其他的6中序列化方式。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702459072398-083ebc85-3217-4360-8705-7caee7547ef9.png#averageHue=%236b6f62&clientId=uf40869a3-202e-4&from=paste&height=212&id=uc7387518&originHeight=318&originWidth=1690&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=91268&status=done&style=none&taskId=u8da9daa6-2b97-4959-a78f-b0ae0143b1b&title=&width=1126.6666666666667)<br />**RedisTemplate 中常用的几种序列化机制：**

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
经过上述源码的分析，我们知道，只要在初始化RedisTemplate对象的时候修改defaultSerializer的值，即可更改RedisTemplate的序列化机制，初始化对象在SpringBoot提供的RedisAutoConfiguration配置类中完成的，首先我们对RedisAutoConfiguration类的关键代码进行分析。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702459937272-62e43b31-9d37-4723-81e9-57c81fa0045f.png#averageHue=%232c2c2b&clientId=uf40869a3-202e-4&from=paste&height=665&id=u44690f33&originHeight=997&originWidth=1306&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=141122&status=done&style=none&taskId=ubea7eca2-d4e2-46cd-8209-64348f19406&title=&width=870.6666666666666)<br />RedisAutoConfiguration是一个自动配置类，用于配置RedisTemplate和相关的Redis组件；<br />**@Configuration: **标注RedisAutoConfiguration是一个配置类，用于声明Bean。<br />**redisTemplate**(RedisConnectionFactory redisConnectionFactory)方法上的@Bean注解声明了一个Bean，用于创建**RedisTemplate**对象；<br />**@ConditionalOnMissingBean(name = "redisTemplate")**注解表示只有当名为redisTemplate的Bean不存在时，才会创建RedisTemplate。这意味着如果用户已经自定义了redisTemplate的Bean，自动配置将不会覆盖用户的配置。<br />**redisTemplate()方法内部**通过Redis连接工厂初始化一个RedisTemplate；<br />经上述分析，只要我们自定义一个配置类，声明一个名为**redisTemplate**的Bean，在配置类中通过连接工厂初始化一个RedisTemplate，此时设置RedisTemplate对象的defaultSerializer属性的值，即可完成自定义序列化配置。<br />**自定义序列化配置类：**<br />在SpringBoot_09_defaultCache项目中的com.xyzy包下创建名为config的包，在该包下创建一个名为RedisConfig的Redis自定义配置类，示例如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702461995960-e63584ae-3bf4-4b18-8c04-8ca545965d87.png#averageHue=%232c2c2b&clientId=uf40869a3-202e-4&from=paste&height=483&id=ueedcb07c&originHeight=724&originWidth=1453&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=111280&status=done&style=none&taskId=uf62f376b-680f-47bf-988d-db64ede2039&title=&width=968.6666666666666)<br />上述配置类中指定了key、value、hashKey、hashValue缓存数据的序列化方式，现在进行测试：<br />启动SpringBoot项目，通过GET请求访问"http://localhost:8080/books/5多次，SQL查询只进行了一次，说明Redis缓存生效，使用RedisDesktopManager查看缓存数据，可以看到value数据成功转化为JSON数据，说明自定义的Redis配置类生效。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702462154445-b06be408-2da5-40e5-b356-900e8f0c2e09.png#averageHue=%232e2e2d&clientId=uf40869a3-202e-4&from=paste&height=343&id=u6cd72ef8&originHeight=515&originWidth=1925&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=93437&status=done&style=none&taskId=u14953430-43b5-426b-bd4c-4f31861620e&title=&width=1283.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702462387619-10b6f1e0-efe4-4ed8-a92e-1aad32dafdf4.png#averageHue=%23fcfcfb&clientId=uf40869a3-202e-4&from=paste&height=404&id=u039eeda1&originHeight=606&originWidth=1343&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=76623&status=done&style=none&taskId=uc3f5907d-5690-4602-9f17-7bfb93af985&title=&width=895.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702462404536-4c9bba44-d0c7-4f30-8817-5745969b5d05.png#averageHue=%23f8f7f6&clientId=uf40869a3-202e-4&from=paste&height=210&id=u23913df9&originHeight=315&originWidth=2114&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=33264&status=done&style=none&taskId=u5f50ecc2-747e-46e8-9b38-eb35b381fa2&title=&width=1409.3333333333333)

## 7.SpringBoot消息服务
在实际的项目开发中，特别是在物联网或者硬件相关的行业项目中，经常需要与其他的系统进行集成交互，共同完成相关的业务功能，这种情况下最原始的做法是不同系统中程序内部相互调用，但是这种方法代码耦合度高，不利于代码的维护和扩展，除此之外，还可以使用消息队列进行业务处理，使用消息队列处理业务能够提升系统的异步通信和扩展解耦能力。SpringBoot对第三方消息队列中间件(又称消息中间件)提供了非常好的支持，本章将针对SpringBoot的消息服务进行介绍，完成SpringBoot与常用第三方消息中间件的整合。
### 7.1.消息队列
#### （1).消息队列概述和作用
**什么是消息队列：**

- **消息队列(Message Queue)**是一种用于在应用程序之间传递消息的通信方式，消息队列允许应用程序异步地发送和接收消息，并且不需要直接连接到对方。
- **消息(Message)**是指在应用间传递的数据。消息可以非常简单，比如只包含文本字符串，也可以更复杂，如包含对象的JSON数据。
- **队列(Queue)**是一种数据结构，可以存储数据，数据从队头依次进入，从队尾依次弹出，具有先进新出的特性，能保证消息按进入队列的顺序依次被消费。

**消息队列的作用和应用场景：**<br />在多数应用系统中，消息服务是不可或缺的重要部分，使用消息队列可以解决很多复杂的业务，如异步处理、流量削峰、分布式解耦、分布式事务管理等，使用消息服务可以实现一个高性能、高可用、高扩展的系统。<br />以下是常见的消息队列应用场景：

- **应用解耦：**
   - 未使用消息队列：现有一个生产UserId的系统A，和使用系统A提供UserId的系统B、C、D，当系统B、C、D需要使用系统A提供支持的时候，需要在系统A中调用其他系统的接口，如果其他某一个系统后续不需要A提供支持了，系统A中的代码还需要删除对应的操作，使得代码耦合度高，维护功能需要频繁修改代码。
      - 系统A接入B、C系统
   - ![](https://cdn.nlark.com/yuque/0/2023/webp/33318872/1702541829966-46d5113c-e32b-430b-a6c0-b9df12fd0e1d.webp#averageHue=%23d1e3bd&clientId=u32fc3d85-6870-4&from=paste&id=u4d09c16b&originHeight=630&originWidth=1282&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u2df552f5-5783-4a89-ba6d-94cfbfb1985&title=)
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
   - ![](https://cdn.nlark.com/yuque/0/2023/webp/33318872/1702541850259-5015d07f-74b7-46c1-b1ea-34228ff73f2a.webp#averageHue=%23d0e2bc&clientId=u32fc3d85-6870-4&from=paste&id=u8b7ce480&originHeight=860&originWidth=1308&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u0f21f363-5af1-46b3-b5fd-a45bd90fbaa&title=)
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
   - ![](https://cdn.nlark.com/yuque/0/2023/webp/33318872/1702542334411-29b39582-9ade-4a20-b49b-df14ec5b9225.webp#averageHue=%23cddebb&clientId=u32fc3d85-6870-4&from=paste&id=u2dd4d8e4&originHeight=805&originWidth=1440&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u17f8cb32-7e42-48b6-a81f-f9258843d1a&title=)
- **异步处理**
   - 以12306购票软件场景为例：
   - 串行处理请求方式：如果不使用MQ，那么我们的代码必然耦合在一起，下单成功后，依次要通过RPC远程调用这几个系统，然后同步等到他们的响应才能返回给用户是否成功的结果。假设库存、短信、邮件每个系统耗时200ms，那么就得花费600ms。这种串行处理请求的方式非常耗时，用户体验不友好。
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702810210566-afedb6bb-a697-4ead-b0ea-7fbbb060721a.png#averageHue=%23eae3c4&clientId=ua61ce054-d534-4&from=paste&height=261&id=ue5fa6841&originHeight=391&originWidth=1247&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=120216&status=done&style=none&taskId=ub71aa9a3-18c2-478c-87f0-7401f2b29c8&title=&width=831.3333333333334)
   - **使用消息队列异步请求：**所以我们可以将这个逻辑我们可以设计成异步的。我们可以当下单成功后，只需要将订单消息发给MQ，然后立即将结果返回通知客户。这才是正确的打开姿势。这样一来，我订单系统只需要告诉MQ，用户下单成功了，其他模块收到消息后，该发短信的发短信，发邮件的发邮件。再加上MQ的性能本身就很好，系统的效率相较此前会提升很多。
- ![](https://cdn.nlark.com/yuque/0/2023/webp/33318872/1702810363678-3d480aca-f251-4586-bca2-373db8337c55.webp#averageHue=%23fbfbf9&clientId=ua61ce054-d534-4&from=paste&id=ua676bb55&originHeight=462&originWidth=1080&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u0895a933-fe59-4f83-ba32-ebbc65065a9&title=)
- **流量削峰/限流**
   - 以12306购票软件场景为例：
   - 平时可能买票的人不多，所以订单系统的QPS( 每秒查询率 )也不是很高，每秒也就处理1000个请求，但是一到节假日、春运期间可能抢票的人就非常多，并发量远远大于平时，这个时候，订单系统明显扛不住了。怎么办呢，当然我们可以设计，弹性伸缩的集群，进行机器扩容，保证高可用。我们依然可以采用MQ来解决这个问题。
- ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702810732756-0978f60d-de38-43c9-944c-5ff028ce84c2.png#averageHue=%23fbfbf9&clientId=ua61ce054-d534-4&from=paste&height=341&id=uc52f0087&originHeight=512&originWidth=1098&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=138133&status=done&style=none&taskId=u33e8370a-d00c-4382-b31a-6a462217dc2&title=&width=732)
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

以下为消息队列的消息代理流程图：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702562864233-58d9a597-a298-4102-b71d-a6967df5065e.png#averageHue=%23e9c777&clientId=u722dd5bc-59db-4&from=paste&height=361&id=u02875da1&originHeight=541&originWidth=1107&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=280438&status=done&style=none&taskId=u3227c12b-0e43-4b09-b774-ecc2c39c071&title=&width=738)<br />简要过程：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702563311730-e8d34050-e328-4b23-bce4-1471cb351d13.png#averageHue=%23f4f4f4&clientId=u722dd5bc-59db-4&from=paste&height=333&id=u599fe768&originHeight=500&originWidth=1318&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=215145&status=done&style=none&taskId=u59a5c326-f870-4511-856c-8b51462c46a&title=&width=878.6666666666666)
#### （2).Rabbit的交换器分发策略与工作模式
当消息的生产者将消息发送到交换器之后，是不会存储消息的，而是通过中间层绑定关系将消息分发到不同的队列上，其中交换器的分发策略分为四种：Direct、Topic、Headers、Fanout，这四种交换策略可以实现RabbitMQ的多种工作模式，以满足不同服务的需求。<br />**交换器分发策略：**<br />**1.Direct**<br />Direct 是 RabbitMQ 默认的交换机模式，也是最简单的模式，消息中的路由键（routing key）如果和 Binding 中的 binding key 一致， 交换器就将消息发到对应的队列中，例如：如果传入的 routing key 为 black，则不会转发到black.green，Direct 类型交换器是完全匹配、单播的模式。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702565465722-7c0f8b63-c0b2-459d-9bc3-8f34e61cffc7.png#averageHue=%23f6f6f6&clientId=u722dd5bc-59db-4&from=paste&height=317&id=u98b80485&originHeight=476&originWidth=1353&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=197116&status=done&style=none&taskId=ua0f4c113-3c31-470f-9ab1-d98000116e0&title=&width=902)<br />**2.Topic**<br />Topic 类型交换器转发消息和 Direct 一样，不同的是：它支持通配符转发，相比 Direct 类型更加灵活！<br />两种通配符：*只能匹配一个单词，#可以匹配零个或多个。如果传入的 routing key 为 black#，不仅会转发到black，也会转发到black.green。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702565731153-368b7410-277b-4c6e-bb20-85d945f7ca09.png#averageHue=%23f6f5f5&clientId=u722dd5bc-59db-4&from=paste&height=315&id=ud0e5ef61&originHeight=472&originWidth=1332&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=199334&status=done&style=none&taskId=u52b2c76c-c887-4afa-9833-aa1d0b59663&title=&width=888)<br />**3.Headers**<br />headers 也是根据规则匹配, 相比 direct 和 topic 固定地使用 routing_key , headers 则是通过一个自定义匹配规则的消息头部类进行匹配。<br />在队列与交换器绑定时，会设定一组键值对规则，消息中也包括一组键值对( headers 属性)，当这些键值对有一对, 或全部匹配时，消息被投送到对应队列。<br />此外 headers 交换器和 direct 交换器完全一致，但性能差很多，目前几乎用不到了。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702565825013-b3c2bcdb-e808-4a92-b756-9b8a06446ce3.png#averageHue=%23f4f3f3&clientId=u722dd5bc-59db-4&from=paste&height=310&id=uf359c9bf&originHeight=465&originWidth=1348&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=268580&status=done&style=none&taskId=u2aa01826-610e-4fe3-b5a7-732a3f67771&title=&width=898.6666666666666)<br />**4.Fanout**<br />Fanout 类型交换器与上面几个不同，**不管路由键或者是路由模式，会把消息发给绑定给它的全部队列**，如果配置了 routing_key 会被忽略，也被成为消息广播模式。很像子网广播，每台子网内的主机都获得了一份复制的消息,fanout 类型转发消息在四种类型中是最快的。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702565952881-1308c3a8-e658-44b2-9178-6f1d7ac27afc.png#averageHue=%23f6f4f4&clientId=u722dd5bc-59db-4&from=paste&height=315&id=u88e520a0&originHeight=472&originWidth=1339&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=216439&status=done&style=none&taskId=uecddc41f-071a-4b21-a473-fede5a1762e&title=&width=892.6666666666666)<br />**RabbitMQ常用工作模式：**<br />RabbitMQ工作模式则是依照于所选择的交换器的分发策略来实现的。<br />**1.Work queue(工作队列/直连模式)**<br />在工作队列模式模式中，不需要手动设置交换器，RabbitMQ内部使用默认的Direct交换器，需要为消费者指定唯一的消息队列进行消息传递，并且可以有多个消息消费者。在这种模式下，多个消息消费者通过轮询的方式依次接收消息队列中存储的消息，一旦消息被某一个消费者接收，消息队列会将消息移除，而接收并处理消息的消费者必须在消费完一条消息后再准备接收下一条消息，工作队列模式与Direct交换器分发策略类似，不同的是无需指定routing key，消息队列也只有一个。<br />![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702567158358-34acee0b-d674-4b1e-9272-e7090bf5aaad.png#averageHue=%23fafafa&clientId=u722dd5bc-59db-4&from=paste&id=u49395707&originHeight=543&originWidth=965&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=ud81a6d80-1246-4932-bd84-4e29e2766d1&title=)<br />使用场景：适用于那些较为繁重，并且可以进行拆分处理的业务，这种情况下可以分派给多个消费者轮流处理业务，例如：短信服务部署多个，只需要有一个节点成功发送即可。<br />**2.Publish/Subscribe（发布订阅模式）**<br />在订阅模型中，多了一个 Exchange 角色，而且过程略有变化：<br />生产者，也就是要发送消息的程序，但是不再发送到队列中，而是发给X（交换机）;<br />消费者，消息的接收者，会一直等待消息到来;<br />消息队列，接收消息、缓存消息;<br />交换机一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型。发布订阅模式中Exchange的选型有常见以下3种类型：<br />Fanout：广播，将消息交给所有绑定到交换机的队列<br />Direct：定向，把消息交给符合指定routing key 的队列<br />Topic：通配符，把消息交给符合routing pattern（路由模式） 的队列<br />如果没有任何队列与 Exchange 绑定，或者没有符合路由规则的队列，那么消息会丢失。<br />使用场景：适用于进行相同业务功能处理的场景，例如：用户注册成功后，需要同时发送短信和邮件通知用户，那么邮件服务消费者和短信服务消费者需要共同消费"用户注册成功"这一条消息。<br />![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702567233874-2461ced7-5909-4daa-a4dc-c632b3392d4c.png#averageHue=%23f9f9f9&clientId=u722dd5bc-59db-4&from=paste&id=u657ab009&originHeight=382&originWidth=1087&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=u65b5dbf2-6748-4892-8945-96d76dd2551&title=)<br />**3.Routing（路由模式）**<br />在Routing工作模式中，必须先配置一个direct类型的交换器，并指定不同的路由键值（Routing key）将对应的消息从交换器路由到不同的消息队列进行存储，由消费者进行各自消费，路由模式与Direct交换器分发策略完全一致。<br />![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702567874617-352b29b6-0d52-4370-bd21-4c58a3431e48.png#averageHue=%23f9f9f9&clientId=u722dd5bc-59db-4&from=paste&id=u7bd46f0a&originHeight=391&originWidth=1108&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=uef2a44a2-c20d-43e8-9803-68d4947de28&title=)<br />使用场景：适用于进行相同业务功能处理的场合。<br />**4.Topics（通配符模式）**<br />在Topics工作模式中，必须先配置一个topic类型的交换器，并指定不同的路由键值（Routing key）将对应的消息从交换器路由到不同的消息队列进行存储，然后由消费者进行各自消费，例如：item.# 能够匹配 item.insert.abc 或者 item.insert，item.* 只能匹配 item.insert，通配符模式与Topic交换器分发策略完全一致。<br />![](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702567900056-340a79e8-ddc3-4b6d-a075-7cc822207eaa.png#averageHue=%23f4f2eb&clientId=u722dd5bc-59db-4&from=paste&id=u2eab433f&originHeight=379&originWidth=1662&originalType=url&ratio=1.5&rotation=0&showTitle=false&status=done&style=none&taskId=udfa66392-90b8-4181-887a-f0e45b4ba66&title=)<br />使用场景：适用于根据不同需求动态传递处理业务的场合。
### 7.3.RabbitMQ安装与环境配置
在使用RabbitMQ之前必须先进行安装和配置，RabbitMQ支持多平台安装，如Linux、Windows、Docker等。这里，我们以Windows环境为例，介绍RabbitMQ的安装配置(以最新的rabbitmq-server-3.12.10版本下载安装配置为例)。
#### （1).Erlang语言安装
在Windows环境下载安装RabbitMQ之前，我们需要安装Erlang语言(RabbitMQ基于Erlang开发)，进入RabbitMQ官网([https://www.rabbitmq.com/install-windows.html](https://www.rabbitmq.com/install-windows.html))，找到Windows版下载页面：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702811845694-37d367e6-3f50-44dd-89ca-051c1df2eaaf.png#averageHue=%23fbf8f7&clientId=ua61ce054-d534-4&from=paste&height=828&id=u59bc0137&originHeight=1242&originWidth=2518&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=224350&status=done&style=none&taskId=uf4e7c754-6d82-45ba-b9e8-b995ac96c19&title=&width=1678.6666666666667)<br />点击官网下载页面的"Erlang 25.3"链接，进入Erlang语言下载页面，点右侧的"Download Windows installer"下载Erlang 25.3安装文件，下载到本地后进行安装即可(必须使用管理员身份进行安装)。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702811964990-45c8e0fd-7125-486e-9e25-7360af2a82b0.png#averageHue=%23fcfcfb&clientId=ua61ce054-d534-4&from=paste&height=826&id=u0ecff64a&originHeight=1239&originWidth=2075&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=157927&status=done&style=none&taskId=u11dbb916-78da-47fa-88c9-2d79c736cc9&title=&width=1383.3333333333333)<br />Erlang环境变量配置：<br />进入我的电脑-系统属性-高级系统配置，进行Erlang的环境变量配置，点击系统变量Path，新建环境变量，将Erlang安装路径的bin目录配置其中；<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702816013155-f5c3e88d-8080-4966-97fc-4ed10c7b5ca5.png#averageHue=%23f2f0ef&clientId=ua61ce054-d534-4&from=paste&height=617&id=u1c6a9ba9&originHeight=925&originWidth=1457&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=180124&status=done&style=none&taskId=ue8ac2028-51a7-497e-ac01-ece97ce6495&title=&width=971.3333333333334)
#### （1).Rabbit的安装与配置
**RabbitMQ安装：**<br />点击官网下载页面的"rabbitmq-server-3.12.10.exe "链接，下载rabbitmq3.12.10安装文件，下载到本地后双击文件rabbitmq-server-3.12.10.exe，安装至合适位置（注意不要安装在包含中文和空格的目录下)安装后window服务中就存在rabbitMQ了，并且是启动状态。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702812652538-ba00b0aa-9fa4-414c-acd4-f505f4c1ac11.png#averageHue=%23f7f6f5&clientId=ua61ce054-d534-4&from=paste&height=708&id=uba149133&originHeight=1062&originWidth=1650&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=496664&status=done&style=none&taskId=u515fb775-0763-420d-8b13-0c04c279924&title=&width=1100)<br />**RabbitMQ管理界面配置：**<br />RabbitMQ默认提供了两个端口号"5672"与"15672"，启用5672是RabbitMQ的服务端口号，15672是可视化管理端口号，在浏览器上访问"http://127.0.0.1:15672"通过可视化的方式查看RabbitMQ。<br />因为RabbitMQ默认禁用了管理界面，所以要通过命令重新开启管理界面，方法如下：<br />1.进入rabbitMQ安装目录的sbin目录，点击上方的路径框输入cmd，按下回车键，进入命令行窗口；<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702813047568-b0ffb399-967c-4c25-826c-f2eeb5512ab6.png#averageHue=%230f0f0f&clientId=ua61ce054-d534-4&from=paste&height=638&id=ue4732086&originHeight=957&originWidth=1734&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=35245&status=done&style=none&taskId=u23f9901d-8e01-47b9-899d-299f4f83d92&title=&width=1156)<br />2.输入命令"rabbitmq-plugins enable rabbitmq_management"点击回车；<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702813111101-6b3ed144-264c-4cee-96ed-b8383d737584.png#averageHue=%23131313&clientId=ua61ce054-d534-4&from=paste&height=638&id=u29a67532&originHeight=957&originWidth=1734&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=87432&status=done&style=none&taskId=ua7172946-8b4c-4d37-979e-bb279c17ced&title=&width=1156)<br />3.重启服务，双击sbin目录中的rabbitmq-server.bat文件（双击后可能需要等待一会）<br />4.打开浏览器，地址栏输入http://127.0.0.1:15672 ,即可看到管理界面的登陆页，输入用户名和密码(都为guest)，进入主界面：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702813343530-95b1a6e4-8b6f-4a2e-936d-3340851c92b2.png#averageHue=%23fdfcfb&clientId=ua61ce054-d534-4&from=paste&height=317&id=u21c4b594&originHeight=475&originWidth=882&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=11439&status=done&style=none&taskId=u6fc7bd8d-3a5e-4b17-a39a-7f13c4c3b59&title=&width=588)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702813360114-47324ab7-1f98-4cdd-94e1-e6fc8d1692d3.png#averageHue=%23f9f8f8&clientId=ua61ce054-d534-4&from=paste&height=731&id=ua844a7c4&originHeight=1096&originWidth=2519&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=140224&status=done&style=none&taskId=uc4a14e14-8eb8-4879-a85c-eb0cfa0d20f&title=&width=1679.3333333333333)<br />上图就是RabbitMQ的可视化管理页面，页面中显示RabbitMQ和Erlang的版本以及用户信息等，最上侧的导航依次是：概览、连接、信道、交换器、队列、用户管理在内的管理面板。
### 7.4.SpringBoot整合RabbitMQ
#### （1).基础环境搭建
完成RabbitMQ的安装后，下面我们开始对SpringBoot整合RabbitMQ的环境进行搭建，步骤如下：

- 创建名为SpringBoot_10_RabbitMQ的项目，引入SpirngWeb、Lombok依赖，如下图所示：

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702816855107-6a80de2d-fa9b-4a8d-b666-29d5f3216018.png#averageHue=%233c4044&clientId=ua61ce054-d534-4&from=paste&height=626&id=u3530bed1&originHeight=939&originWidth=1206&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=51044&status=done&style=none&taskId=uda920082-c83a-40c9-bee9-20d08936566&title=&width=804)

- 添加RabbitMQ依赖：打开pom文件添加RabbitMQ依赖坐标；

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702817004717-7f1cfcfa-de50-455c-9d22-2940ca4324d8.png#averageHue=%23686e54&clientId=ua61ce054-d534-4&from=paste&height=146&id=u524ed8c0&originHeight=219&originWidth=1621&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44617&status=done&style=none&taskId=u29b54a16-3d37-4515-ad7c-f3b12207d37&title=&width=1080.6666666666667)

- 配置文件编写：打开application.properties全局配置文件，在配置文件中编写RabbitMQ服务的连接配置(账号密码默认使用guest可以不进行配置)；

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702817124403-5818aba7-d650-418e-8fe8-de0dedb7951a.png#averageHue=%232e2c2b&clientId=ua61ce054-d534-4&from=paste&height=186&id=ud30d8a56&originHeight=279&originWidth=1029&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=32214&status=done&style=none&taskId=ud3375541-8b55-45d8-8333-e33a9944a7c&title=&width=686)<br />以上内容就是该项目的基本环境，完成基本环境搭建后，我们将进行基于配置(基于API使用较少)的方式实现开发中常使用的4种工作模式：Work queue、Publish/Subscribe、Routing和Topic。
#### （2).Work queue(工作队列/直连模式)实现
SpringBoot整合RabbitMQ中间件实现消息服务，主要围绕3个部分的工作进行展开：定制中间件(注册交换机、队列、路由键以及绑定交换机和队列)、开发消息生产者发送消息和开发消费者接受消息。4种工作模式的实现我们都将围绕这些工作进行展开。<br />**定制中间件：**<br />本小节通过配置类的方式，注册交换机、队列、路由键的Bean，来实现中间件的定制工作：<br />在com.xyzy包下新建一个名为config的包，在该包下新建一个DirectRabbitConfig配置类用于配置定制中间件相关的Bean。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703173151319-d19c5b76-41d0-4a95-934d-f39ab4bb182b.png#averageHue=%232d2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=594&id=ud3e06d4c&originHeight=891&originWidth=1541&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=138747&status=done&style=none&taskId=ud2534221-5d52-4567-8b1e-0b0394d6131&title=&width=1027.3333333333333)<br />**org.springframework.amqp.core**核心包介绍：<br />org.springframework.amqp.core 是 Spring AMQP 框架中的一个核心包，提供了一组用于定义 AMQP（Advanced Message Queuing Protocol）消息交换、队列和绑定的类。Spring AMQP 用于简化在基于消息的应用程序中使用 RabbitMQ 或其他 AMQP 提供者的开发。<br />下面是一些 org.springframework.amqp.core 包中主要类的简要介绍：

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

**编写接口进行消息推送(Publisher)：**<br />在com.xyzy包下新建一个名为controller的包，在该包下新建一个RabbitMQController控制层类用于向指定的交换器内推送消息。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702987699818-9c216219-f5f6-4b78-a680-eec77d94be43.png#averageHue=%232c2b2b&clientId=u442781ec-bca4-4&from=paste&height=533&id=u337b372a&originHeight=800&originWidth=1452&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=116204&status=done&style=none&taskId=uecee0ce3-f0f6-4f14-91d1-1a0193186a7&title=&width=968)<br />**RabbitTemplate**核心类介绍：<br />RabbitTemplate 是 Spring AMQP 框架中提供的一个核心类，用于简化与 RabbitMQ 代理进行交互的操作。它封装了发送和接收消息的一般性操作，使得在 Spring 应用中使用 RabbitMQ 变得更加方便。<br />以下是 RabbitTemplate 的一些主要功能和方法：

1. **发送消息：**
   - **convertAndSend(String routingKey, Object message)**: 将消息发送到指定的路由键。
   - **convertAndSend(String exchange, String routingKey, Object message)**: 将消息发送到指定的交换机和路由键。
2. **接收消息：**
   - **receive(String queueName)**: 从指定队列接收消息。返回消息的 **Message** 对象。
   - **receiveAndConvert(String queueName)**: 从指定队列接收消息并将其转换为指定类型的对象。
3. **回调机制：**
   - **send(String exchange, String routingKey, Message message, CorrelationData correlationData)**: 允许使用回调机制来处理消息发送的结果，以及确认消息是否被成功发送到 RabbitMQ 代理。

**启动SpringBoot项目，调用请求：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702985678222-77fa4bc4-6e46-4a5b-9892-0ff41ddd4ac3.png#averageHue=%23fcfcfb&clientId=u442781ec-bca4-4&from=paste&height=441&id=uf2e253bd&originHeight=662&originWidth=1328&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=71858&status=done&style=none&taskId=u49ebc71c-156e-434f-adcf-c31a86677f1&title=&width=885.3333333333334)<br />调用"http://localhost:8080/rabbitMQ/sendDirectMessage"发送请求后，打开RabbitMQ可视化界面，可以看到消息已经进入到MQ中，点击Exchanges与Queue and Stream窗口可以看到我们注册的"directExchange"交换器和"directQueue"队列，队列中的数据是我们通过"directRoutingKey"路由键推送的。由于还未有消费者接收消息，所以调用请求发送的消息会暂时存在MQ中。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702985223406-9e69ff5d-5b82-4021-a231-8a951b838a5e.png#averageHue=%23f9f8f8&clientId=u442781ec-bca4-4&from=paste&height=899&id=uf2f76881&originHeight=1348&originWidth=2560&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=181877&status=done&style=none&taskId=u8e0122d8-d611-4198-b674-1a2a2900d2c&title=&width=1706.6666666666667)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702985807741-c4564a6c-55d6-4439-af97-52d2a7488dd3.png#averageHue=%23f8f7f7&clientId=u442781ec-bca4-4&from=paste&height=627&id=u94e81292&originHeight=940&originWidth=1964&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=105623&status=done&style=none&taskId=u2dd9a047-91d2-4002-8b54-9bc9bfa85a9&title=&width=1309.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702985822567-0ed9128a-2d03-42a0-8ef8-95f5077d2949.png#averageHue=%23f8f7f7&clientId=u442781ec-bca4-4&from=paste&height=417&id=u143a2a76&originHeight=625&originWidth=1808&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=63535&status=done&style=none&taskId=u9d75de5b-7944-4ecb-8f12-0f5e36c1267&title=&width=1205.3333333333333)<br />**编写消费者监听类消费消息(Consumer)：**<br />在com.xyzy包下新建一个名为receiver的包，在该包下新建一个DirectConsumer消费者监听类用于接受MQ中已经推送的消息。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702986317752-b735a8ee-12c1-455b-844b-8c6ea4209d41.png#averageHue=%232c2b2b&clientId=u442781ec-bca4-4&from=paste&height=363&id=uc8cd18ec&originHeight=545&originWidth=1331&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=70751&status=done&style=none&taskId=udee1ae13-a1a1-4bac-a6fa-9cf39f7855c&title=&width=887.3333333333334)<br />消费者相关注解简介：

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

**重启SpringBoot项目，使消费者监听对应的队列，消费消息：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702986672507-0e07501a-6b75-4e88-891b-663a38b3f806.png#averageHue=%23302f2e&clientId=u442781ec-bca4-4&from=paste&height=211&id=ube9b5174&originHeight=316&originWidth=2390&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=148589&status=done&style=none&taskId=uf16eda9a-c71d-4f59-966a-2335383bb5f&title=&width=1593.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702986757644-0f064e2f-7dc2-408a-b55e-710b5fd0b630.png#averageHue=%23f9f8f8&clientId=u442781ec-bca4-4&from=paste&height=461&id=uda3052d7&originHeight=691&originWidth=1904&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=72786&status=done&style=none&taskId=u48283ab8-7744-42b8-b52c-2e0335f1859&title=&width=1269.3333333333333)<br />重启项目后立即看到消费者消费了队列中的消息，并在控制台进行了输出，并且队列中的消息也清零了。至此一条完整的消息发送、消息中间件存储、消息消费的直连模式的案例已经实现。
#### （3).Publish/Subscribe(发布订阅模式)实现
发布订阅模式与直连模式不同是的，在定制中间件配置类中需要配置Fanout类型的交换机，配置多个Queue用于共同接收交换机广播的消息，最后需要将所有的队列一一与Fanout类型的交换机进行绑定。以下是发布订阅模式的实现：<br />**定制中间件：**<br />在该config包下新建一个PublishSubscribeConfig配置类用于配置定制中间件相关的Bean。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702989657757-2ce7ab89-2f2d-4c30-ade9-0105091534c2.png#averageHue=%232c2c2b&clientId=u442781ec-bca4-4&from=paste&height=838&id=u7fd3366a&originHeight=1257&originWidth=1447&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=145713&status=done&style=none&taskId=u1ca94ae6-a41e-4238-a6a5-827cfbb275b&title=&width=964.6666666666666)<br />**编写接口进行消息推送(Publisher)：**<br />在RabbitMQController控制层类中新建sendPubSubMessage()方法，用于创建调用发送消息的接口，测试发布订阅模式。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702989685798-b2475f92-4e54-41d2-a050-3cd0949b12fb.png#averageHue=%232d2c2b&clientId=u442781ec-bca4-4&from=paste&height=207&id=u08a099ee&originHeight=311&originWidth=1316&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=67834&status=done&style=none&taskId=u4b9c29b7-6f84-4000-bc78-a3f8705be6a&title=&width=877.3333333333334)<br />**编写消费者监听类消费消息(Consumer)：**<br />在receiver包下新建一个PubSubConsumer消费者监听类用于接受MQ中推送的消息(多个消费者对应多个传递消息的Queue)。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702989819469-d53839db-cd22-46ab-9635-3cd0577f7a8d.png#averageHue=%232c2b2b&clientId=u442781ec-bca4-4&from=paste&height=493&id=u7500c572&originHeight=740&originWidth=1436&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=106332&status=done&style=none&taskId=u373a4121-c0bc-4c3c-a89b-3ab26d55be1&title=&width=957.3333333333334)<br />**启动SpringBoot项目，使消费者监听对应的队列，消费消息：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702989903814-82a42dd7-7777-4ec1-a72c-ab03e9d3c7d8.png#averageHue=%23fcfbfb&clientId=u442781ec-bca4-4&from=paste&height=367&id=uc1ebef7e&originHeight=551&originWidth=1327&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=71686&status=done&style=none&taskId=u494a6657-09c9-4369-a42f-be182633efc&title=&width=884.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1702989884311-b8eee3aa-d277-476c-ab65-7bce6586ad55.png#averageHue=%23302f2e&clientId=u442781ec-bca4-4&from=paste&height=224&id=u663a51a4&originHeight=336&originWidth=2237&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=148061&status=done&style=none&taskId=uf67bee1d-1c90-4e1d-bf67-a87a8802b5a&title=&width=1491.3333333333333)这里每调用一次发布订阅模式的接口，多个不同的消息订阅者都接收到了同一条消息并进行了消费，至此一条完整的消息发送、消息中间件存储、消息消费的发布订阅的案例已经实现。
#### （4).Routing(路由模式)实现
路由模式与直连模式类似，它们定制中间件的配置类中都需要配置Direct类型的交换机，不同的是，路由模式一般配置多个Queue用于接收交换机分发的消息，并且每个Queue都可以映射多个RoutingKey。以下是路由模式的实现：<br />**定制中间件：**<br />在该config包下新建一个RoutingConfig配置类用于配置定制中间件相关的Bean。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703063277059-0f183c13-bec7-446b-81e3-c8deb23846c1.png#averageHue=%232c2c2b&clientId=uccc7e6b7-aa1e-4&from=paste&height=858&id=u3e431d11&originHeight=1287&originWidth=1492&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=154951&status=done&style=none&taskId=u317e7885-aae0-4cb3-b76d-91f1b7113b0&title=&width=994.6666666666666)<br />**编写接口进行消息推送(Publisher)：**<br />在RabbitMQController控制层类中新建sendRoutingMessage()方法，用于创建调用发送消息的接口，测试路由模式。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703063293895-37142050-8150-424b-b8f2-8e2bf5947832.png#averageHue=%232d2c2b&clientId=uccc7e6b7-aa1e-4&from=paste&height=285&id=ua5ca3cd6&originHeight=427&originWidth=1445&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=108861&status=done&style=none&taskId=uea9f3dc6-a00d-452e-b0dd-769523cbf1b&title=&width=963.3333333333334)<br />**编写消费者监听类消费消息(Consumer)：**<br />在receiver包下新建一个RoutingConsumer消费者监听类用于接受MQ中推送的消息(多个消费者对应多个传递消息的Queue)。![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703063389072-32a810fe-ed8c-49a0-9f40-3e723f5264d6.png#averageHue=%232c2c2b&clientId=uccc7e6b7-aa1e-4&from=paste&height=490&id=u6a8c080d&originHeight=735&originWidth=1164&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=103208&status=done&style=none&taskId=ub1ed165d-8798-427f-a999-fca9525afbc&title=&width=776)<br />**启动SpringBoot项目，使消费者监听对应的队列，消费消息：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703063418043-078c5b55-65ef-4b53-9ece-754af68fbce3.png#averageHue=%23fcfbfb&clientId=uccc7e6b7-aa1e-4&from=paste&height=392&id=u7c4d77f6&originHeight=588&originWidth=1337&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=72179&status=done&style=none&taskId=u163be008-52f9-4bbd-b085-a6d70eaf3ec&title=&width=891.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703063434113-88e9fa36-c3cc-446c-a9c1-e54eb82b7d34.png#averageHue=%2331302f&clientId=uccc7e6b7-aa1e-4&from=paste&height=251&id=u1031b399&originHeight=376&originWidth=2018&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=160012&status=done&style=none&taskId=u2971949b-29bf-454e-bb14-ad6fb48028e&title=&width=1345.3333333333333)这里调用一次路由模式的接口，两个消息订阅者分别接收到映射了对应RoutingKey的消息，并在控制台打印了出来，至此一条完整的消息发送、消息中间件存储、消息消费的路由模式的案例已经实现。
#### （5).Topic(通配符模式)实现
在通配符模式中，必须先配置一个topic类型的交换器，通配符模式一般配置多个Queue用于接收交换机分发的消息，并且每个Queue都可以映射一个或多个带有通配符的RoutingKey，下面我们以不同用户对邮件和短讯订阅需求的这一场景为例来实现通配符模式。<br />**定制中间件：**<br />在该config包下新建一个TopicConfig配置类用于配置定制中间件相关的Bean。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703172158549-04b5debc-d075-4009-b1b3-ad8dde66c09f.png#averageHue=%232d2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=516&id=u1258fe59&originHeight=774&originWidth=1417&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=97795&status=done&style=none&taskId=ud1e72dbc-f502-4cea-b601-7e9664b77e4&title=&width=944.6666666666666)<br />**编写接口进行消息推送(Publisher)：**<br />在RabbitMQController控制层类中新建sendTopicMessage()方法，用于创建调用发送消息的接口，测试通配符模式。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703172209584-f51a0fe6-fbb4-48ff-8c9a-118cf1b5e401.png#averageHue=%232d2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=264&id=uc4591474&originHeight=396&originWidth=1366&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=94055&status=done&style=none&taskId=ua877bee4-c0f0-4e5e-a6c6-8c39ea22d87&title=&width=910.6666666666666)<br />**编写消费者监听类消费消息(Consumer)：**<br />在receiver包下新建一个TopicConsumer消费者监听类用于接受MQ中推送的消息(多个消费者对应多个传递消息的Queue)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703172248673-1d614469-2a8f-4a82-a244-e10dad1ca49f.png#averageHue=%232c2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=302&id=u1d2381b4&originHeight=453&originWidth=1410&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=73166&status=done&style=none&taskId=ued00015e-4637-4a96-9cf6-2b342634aea&title=&width=940)<br />**启动SpringBoot项目，使消费者监听对应的队列，消费消息：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703172280234-21c9da0e-db35-4cf5-be1f-960d195ca567.png#averageHue=%23fcfcfb&clientId=u4bc3d5f5-7c6c-4&from=paste&height=409&id=uc272e98c&originHeight=613&originWidth=1375&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=72265&status=done&style=none&taskId=uc5386265-50b0-4eff-b6ce-2fd457ce6ad&title=&width=916.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703172290051-1641f22b-a034-4988-99d5-b978b8ade0d6.png#averageHue=%23323130&clientId=u4bc3d5f5-7c6c-4&from=paste&height=249&id=u96ca5cfd&originHeight=373&originWidth=1916&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=151755&status=done&style=none&taskId=u22214802-7566-4935-a37a-b0f9b3681ac&title=&width=1277.3333333333333)<br />可以看到推送了三条消息，routingKey为"info.email"的消息被推送至topicEmailQueue中，routingKey为"info.sms"的消息被推送至topicSmsQueue中，而routingKey为"info.email.sms"的消息分别被推送至topicEmailQueue和topicEmailQueue中，故最终有四条消息被消费者消费，并在控制台打印了出来，至此一条完整的消息发送、消息中间件存储、消息消费的路由模式的案例已经实现。
#### （6).实体类对象数据推送
**新建实体类User：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703173500604-9f2d0273-9180-445b-a561-c6afde7fbc5f.png#averageHue=%232c2b2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=262&id=u2c10d5a2&originHeight=393&originWidth=849&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=28865&status=done&style=none&taskId=u0f07ab39-49a0-4354-a3ec-730b6f0badf&title=&width=566)<br />**配置Queue与RoutingKey：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703174001862-7436a815-e647-4a45-a319-e36376425056.png#averageHue=%232c2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=238&id=ucaa154e5&originHeight=357&originWidth=1383&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40650&status=done&style=none&taskId=u1474dc75-0666-4c7f-8ae9-de1d2ba75a3&title=&width=922)<br />**编写接口进行实体类对象推送：**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703173538343-a60d6f82-112b-4586-b0a8-52c8bad1de2a.png#averageHue=%232c2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=207&id=u778be49d&originHeight=310&originWidth=1243&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47976&status=done&style=none&taskId=uad59f530-a500-4710-aa43-9ad9b049b97&title=&width=828.6666666666666)<br />当我们将实体类对象推送至RabbitMQ的时候，如果实体类没有实现序列化的时候，会出现IllegalArgumentException异常，提示我们需要将实体类进行序列化，解决上述问题我们需要进行实体类序列化，有两种方案：一是实现JDK自带的序列化接口Serializable，二是定制其他类型的消息转化器(定制序列化)。第一种方案可视化效果较差，转化后的消息无法识别，所以我们一般实现第二种定制序列化的方式。<br />IllegalArgumentException异常：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703173796900-1c9cad36-7d8b-4933-9138-9fa2224087dd.png#averageHue=%23333230&clientId=u4bc3d5f5-7c6c-4&from=paste&height=140&id=ueaa14ca1&originHeight=210&originWidth=1947&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=84830&status=done&style=none&taskId=ud1007799-fe20-4b21-8b00-52f97c42920&title=&width=1298)<br />实现Serializable的数据：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703173905415-2479615c-97cd-4f16-b6d0-03a77f415b5a.png#averageHue=%23fcf8f8&clientId=u4bc3d5f5-7c6c-4&from=paste&height=440&id=u2e7d5b0f&originHeight=660&originWidth=1537&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=75544&status=done&style=none&taskId=u105f48bb-5f70-47f7-92ef-cb14b9bc228&title=&width=1024.6666666666667)<br />**定制序列化：**<br />要实现定制序列话，需要在配置类中通过@Bean注册一个Jackson2JsonMessageConverter类型的消息转换器组件，该组件的返回值为MessageConverter类型。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703174172613-7cd46cc0-9c73-4ace-a6ec-de0332869165.png#averageHue=%232c2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=131&id=u121a9b1f&originHeight=197&originWidth=1193&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=18397&status=done&style=none&taskId=ub0de6c39-ffe9-4036-9368-190aadf0918&title=&width=795.3333333333334)<br />实现JOSN类型的消息转换器后再次发送请求，推送消息，这次可以看到队列中的消息已经是正常的JSON数据了。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703174239358-af65c366-587a-41ee-b6ca-45aeeb008a80.png#averageHue=%23fdfcfc&clientId=u4bc3d5f5-7c6c-4&from=paste&height=309&id=u48b84389&originHeight=463&originWidth=1413&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=45986&status=done&style=none&taskId=u86c88f67-909e-4498-ae03-d99762f62d5&title=&width=942)<br />**编写消费者监听类消费消息)：**<br />在DirectConsumer类中新增一个process1方法用于消费消息。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703174385944-747fd1a7-d5ed-49b3-98b6-9a40f9272a0b.png#averageHue=%232c2c2b&clientId=u4bc3d5f5-7c6c-4&from=paste&height=135&id=uf608d5cf&originHeight=203&originWidth=1286&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=30426&status=done&style=none&taskId=ufa03aacc-aa89-4943-a9af-56a046e3f43&title=&width=857.3333333333334)<br />实体类对象被成功接收消费：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703174467742-7e9fab06-c17d-4327-a435-1a9e66726ad4.png#averageHue=%232d2d2d&clientId=u4bc3d5f5-7c6c-4&from=paste&height=99&id=u5fa9b809&originHeight=149&originWidth=1272&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=24109&status=done&style=none&taskId=u09f173be-d0c0-4bdb-8874-581d34a3a06&title=&width=848)

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
Thymeleaf是一种用于Web和独立环境的现代服务器端Java模板引擎。它是为了在Web和非Web环境下支持自然模板的创建而设计的。Thymeleaf能够处理HTML、XML、JavaScript、CSS和纯文本等各种模板。<br />以下是Thymeleaf的一些主要特点和用途：

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
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703600532669-da042897-a1e7-4106-9e95-56ede6a5aadc.png#averageHue=%233c4144&clientId=ue2d5eb3e-05b2-4&from=paste&height=632&id=u1cb91a31&originHeight=948&originWidth=1224&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=62525&status=done&style=none&taskId=u5300c613-55d7-4838-901a-4c8601f23ee&title=&width=816)
- 在application.properties中进行Thymeleaf相关配置：
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703608724417-b3877940-638b-4100-a6c1-d001bfa9eb0d.png#averageHue=%232e2c2b&clientId=u63d50e9c-7c39-4&from=paste&height=223&id=u9a584aa9&originHeight=334&originWidth=1165&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=56197&status=done&style=none&taskId=udec7aac3-34c6-4e58-8e07-d3399a80ba4&title=&width=776.6666666666666)
- 在resources/templates目录创建一个index.html页面(Thymeleaf模板文件)
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703602849293-1f623aa6-10b9-43a9-8592-c992db8f83b1.png#averageHue=%232f2c2b&clientId=ue2d5eb3e-05b2-4&from=paste&height=253&id=ua54f1a1f&originHeight=380&originWidth=1022&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40356&status=done&style=none&taskId=ua3bef98d-521a-45c1-80ba-4ce7cd9dc67&title=&width=681.3333333333334)
   - 上述代码中的"xmlns:th="http://www.thymeleaf.org""用于引入Thymeleaf模板引擎，关键字“th”标签是Thymeleaf提供的标签，“th:text”用于动态显示标签文本内容。除此之外Thymeleaf模板还提供了很多标签，我们会在后续内容中进行讲解。
- 编写跳转页面的控制层类PageController：
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703602640143-ddaa3dc5-d05b-4619-98e4-a9e483607b2c.png#averageHue=%232d2c2c&clientId=ue2d5eb3e-05b2-4&from=paste&height=209&id=u4bca5067&originHeight=313&originWidth=1160&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=32468&status=done&style=none&taskId=u17758fd7-4811-4793-a528-e55abf58a9c&title=&width=773.3333333333334)
   - 此处使用了SpringMVC框架中的**Model**接口，通过使用Model，可以将数据从控制器传递到视图，实现动态的、与业务逻辑相关的页面展示，以便在视图中渲染并呈现给用户。
- 测试页面显示结果(postman请求http://localhost:8080/hello)：
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703603059113-dd72d63b-a9bb-4774-8c3e-3af5c5b7bcb4.png#averageHue=%23fdfcfb&clientId=ue2d5eb3e-05b2-4&from=paste&height=581&id=uecdf9413&originHeight=871&originWidth=1296&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=92235&status=done&style=none&taskId=u87f6b63f-eacc-41e3-81b0-c80edbb4eab&title=&width=864)
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
需要说明的是，上述操作是以HTML为基础嵌入了Thymeleaf模板引擎，并使用th:*属性进行了页面需求开发。这种Thymeleaf模板页面虽然与纯HTML页面基本相似，但已经不是一个标准的HTML5页面了，这是因为在Thymeleaf页面中使用的th:*属性是HTML5规范所不允许的。如果我们想要使用Thymeleaf页面进行纯HTML5的页面开发，可以使用data-th-*属性替换th:*属性进行页面开发，例如使用data-th-text 将表达式的结果应用到元素的 data-text 数据属性上：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703604913377-439d10de-1ddb-4ba5-aea9-edddeef2dd6f.png#averageHue=%232f2c2b&clientId=u63d50e9c-7c39-4&from=paste&height=269&id=u916e9dde&originHeight=403&originWidth=940&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44121&status=done&style=none&taskId=u73e1aed8-080f-4fe8-b228-e5f9defadfb&title=&width=626.6666666666666)<br />上述代码中，使用标准HTML5语法格式嵌入了Thymeleaf模板引擎进行页面动态数据展示。在使用data-th-*属性时，不需要引入Thymeleaf标签，并且属性名要使用data-th-*的形式。不过使用这种方式不会出现属性的快捷提示，对于开发来说比较麻烦，因此在实际开发中，相对推荐使用Thymeleaf标签的形式进行模板引擎页面的开发。
#### （3).**Thymeleaf标准表达式**
Thymeleaf模板引擎提供了多种标签表达式语法，以下是最常用的简单表示式语法：

| **说明** | **表达式语法** |
| --- | --- |
| 变量表达式 | ${…} |
| 选择变量表达式 | *{…} |
| 消息表达式 | #{…} |
| 链接URL表达式 | @{…} |
| 片段表达式 | ~{…} |

除了以上这些语法外Thymeleaf还提供了更多语法支持，例如文本表达式、算数表达式、布尔表达式、比较表达式等。下面我们将针对上表中的这些语法进行具体的讲解和使用说明。<br />**变量表达式：**<br />变量表达式${...}的作用是从web作用域里面取到对应的值，作用域包括** request、session、application**。<br />示例如下：<br />实体类：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703610153063-7ec41d8e-79bc-421d-bf90-5a0bf8d9ace5.png#averageHue=%232c2b2b&clientId=u63d50e9c-7c39-4&from=paste&height=311&id=u9fcb649a&originHeight=466&originWidth=1163&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=39177&status=done&style=none&taskId=u6ee2532b-a236-467c-b555-03af1286f6e&title=&width=775.3333333333334)<br />控制层接口：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703609817186-aa5ea76c-abc8-4f47-b51d-4f942da48f55.png#averageHue=%232d2c2b&clientId=u63d50e9c-7c39-4&from=paste&height=282&id=u52d67205&originHeight=423&originWidth=1349&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=71740&status=done&style=none&taskId=u13f4a1c0-6b1e-45cd-8a08-f59fe2bc9e7&title=&width=899.3333333333334)<br />html文件：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703609874790-e4978b52-29a3-4eef-b604-77029ed77a3c.png#averageHue=%232c2b2b&clientId=u63d50e9c-7c39-4&from=paste&height=664&id=ufe733ddd&originHeight=996&originWidth=1341&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=137666&status=done&style=none&taskId=u8a6b6f56-a00c-432d-8c8f-e25f13d3fd7&title=&width=894)<br />测试结果：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703609945014-3b63f519-f6b1-43d4-b5a2-dd313d1e6919.png#averageHue=%23fbfbfb&clientId=u63d50e9c-7c39-4&from=paste&height=582&id=u59c4c662&originHeight=873&originWidth=1330&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=103368&status=done&style=none&taskId=udf06b2b9-aae0-4c7d-a756-1b2105d210d&title=&width=886.6666666666666)<br />**选择变量表达式：**<br />使用变量表达式${...}来取request、session、application作用域上的属性时，可以发现，我们需要重复编写user1、session.user2和application.use3三次，如果user对象的属性有十几个怎么办？显然写十几次相同的代码不是我们想要解决方案。针对这种问题，Thymeleaf提供了**选择变量表达式***{...}来解决：<br />可以将上述的html页面替换为以下结构：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703610091240-2534a280-d46b-4459-9ada-8c64b8fa6300.png#averageHue=%232c2b2b&clientId=u63d50e9c-7c39-4&from=paste&height=659&id=ub5c19020&originHeight=988&originWidth=1352&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=137833&status=done&style=none&taskId=ued06de62-2054-4de2-af39-e2b776fb78a&title=&width=901.3333333333334)<br />修改控制层接口访问上述html文件，html文件能正确接收到接口传入的数据。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703610310210-17c91646-b9bc-4995-bb7a-2b0401a46f39.png#averageHue=%232e2c2b&clientId=u63d50e9c-7c39-4&from=paste&height=278&id=uabc282ef&originHeight=417&originWidth=1161&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=70942&status=done&style=none&taskId=ue3eed00c-87f1-4693-8b07-949b1526ca7&title=&width=774)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703610341567-a874b0da-f9c8-424d-a434-896b1af42310.png#averageHue=%23fbfbfb&clientId=u63d50e9c-7c39-4&from=paste&height=535&id=u25f70ccc&originHeight=803&originWidth=1339&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=99028&status=done&style=none&taskId=u97db6944-d0c0-4175-aded-5e8e4787139&title=&width=892.6666666666666)<br />**消息表达式：**<br />消息表达式#{...}主要用于Thymeleaf模板页面国际化内容的动态替换和展示。使用消息表达式#{...}进行国际化设置时，还需要提供一些国际化配置文件。后续章节会进行国际化登陆页面的开发，会进行详细说明，此处了解即可。<br />**链接URL表达式：**<br />链接表达式@{...}一般用于页面跳转或者资源的引入，在Web开发中占据着非常重要的地位，并且使用也非常频繁,接下来我们通过一个页面跳转的示例来展示链接表达式的功能。<br />在控制层中创建"/home"与"/user"两个接口，访问"/home"进入网站主页，访问"/user"进入用户详情列表，这里我们通过访问主页页面跳转的形式访问"/user"进入用户详情列表。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703753702487-9cb736e2-a099-49e7-9a74-aec6f117e47a.png#averageHue=%232c2c2b&clientId=u72a73f85-6c37-4&from=paste&height=267&id=u34b4f1f9&originHeight=401&originWidth=1238&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47698&status=done&style=none&taskId=uc1a20cfc-c8b1-4e1e-9dc4-a9f3dcd4f48&title=&width=825.3333333333334)<br />创建Thymeleaf模板 (src/main/resources/templates/home.html 和 src/main/resources/templates/user_details.html):<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703753804554-9eb12396-4d56-4ffd-85f8-99f9ee8ea30e.png#averageHue=%232c2b2b&clientId=u72a73f85-6c37-4&from=paste&height=357&id=u7fe78c68&originHeight=535&originWidth=1124&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=50721&status=done&style=none&taskId=u358ac37e-aec5-4dba-84fa-47b76c70129&title=&width=749.3333333333334)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703753814945-ebcb9de4-a156-4527-a419-fe5cf6af643b.png#averageHue=%232d2c2c&clientId=u72a73f85-6c37-4&from=paste&height=295&id=ueef8a484&originHeight=443&originWidth=1174&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47217&status=done&style=none&taskId=u8921142f-77cc-4ab3-8ee9-5ed8ed8ae4a&title=&width=782.6666666666666)<br />运行SpringBoot项目，并在Web浏览器中访问 http://localhost:8080/home。可以看到 "欢迎访问主页" 的消息和指向 "用户详情" 页面的链接。点击链接将跳转到用户详情页面，其中展示了带参数的另一个动态链接。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703753964689-479a17e5-5fe7-40fb-9a95-2d41346eeef3.png#averageHue=%23edd8ca&clientId=u72a73f85-6c37-4&from=paste&height=281&id=u832b1792&originHeight=422&originWidth=1418&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=32605&status=done&style=none&taskId=uaa4d5f95-3821-40e5-8ca0-3ad4453c9ec&title=&width=945.3333333333334)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703753977451-4ef339f7-31f7-4f2d-874f-1ec367b4227c.png#averageHue=%23efded3&clientId=u72a73f85-6c37-4&from=paste&height=343&id=u409fbbfd&originHeight=514&originWidth=1428&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=31505&status=done&style=none&taskId=u04794cde-77ca-4979-ae9d-3f34ee27327&title=&width=952)<br />这个示例演示了在Thymeleaf中使用 @{...} 创建带有和不带参数的动态链接。实际的URL由Spring MVC控制器处理，Thymeleaf用于在HTML模板中生成动态链接。<br />**片段表达式：**<br />片段表达式~{...}用于引用片段。片段是可以在多个模板中重复使用的一部分HTML代码。其中，最常见的用法是使用th:insert或th:replace属性插入片段。下面我们通过一个示例来展示片段表达式的功能。<br />创建一个新的Thymeleaf模板，header.html，包含一个简单的页面头部：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703777701920-c10dbd40-bab6-4301-b7f4-d6723c5c949f.png#averageHue=%232c2c2b&clientId=u72a73f85-6c37-4&from=paste&height=393&id=uf773a4b4&originHeight=589&originWidth=1020&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=58365&status=done&style=none&taskId=u0e827764-1449-4aa2-b502-34645122b40&title=&width=680)<br />创建一个包含片段的主页模板 home1.html，使用片段表达式引用头部片段：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703777743866-f79ac8ea-e3a1-4439-beb3-e1f612875ac0.png#averageHue=%232c2b2b&clientId=u72a73f85-6c37-4&from=paste&height=378&id=ua0cc0324&originHeight=567&originWidth=1109&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=53188&status=done&style=none&taskId=u9dde5b97-81f9-46d2-8480-ac64b322f2c&title=&width=739.3333333333334)<br />在控制层中创建接口访问"home1.html"：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703777813110-7456f233-f408-43a1-ba9f-cf5a3585d4e0.png#averageHue=%232e2d2c&clientId=u72a73f85-6c37-4&from=paste&height=65&id=u217dfb71&originHeight=98&originWidth=982&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=14098&status=done&style=none&taskId=uc0efce7c-9b54-4e08-86ea-5a3c5c0d048&title=&width=654.6666666666666)<br />运行SpringBoot项目，并在Web浏览器中访问 http://localhost:8080/home1。可以看到一个包含头部片段的主页，这个头部片段是通过片段表达式引用的。这种方式可以让在多个页面中共享和重用HTML片段，使代码更加模块化和易于维护。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703777840412-80090b45-628a-4ca1-98b2-13270bfe86f1.png#averageHue=%23eedbd0&clientId=u72a73f85-6c37-4&from=paste&height=322&id=uc31619b0&originHeight=483&originWidth=1423&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=41746&status=done&style=none&taskId=ua22dc287-3de8-4e53-aa08-42471ffdb14&title=&width=948.6666666666666)
#### （4).**Thymeleaf自动配置**
通过上面章节的讲解，可以发现一个问题，为什么thymeleaf页面放在templates文件夹里面，而不是其他地方呢？-这是由Thymeleaf和Spring Boot的默认配置约定所决定的，SpringBoot框架会将内置支持的功能组件放在spring-boot-autoconfigure-2.X.X.RELEASE.jar(X.X代表SpringBoot的版本，不同版本的自动配置可能稍有不同) 包下，而 Thymeleaf 框架就是内置支持的。所以在这个包里面可以找对应的自动配置代码，如图：(如果找默认的属性配置应该找XxxxProperties类)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703778924178-e2a655d8-6384-4f94-b04d-2e7b2a421772.png#averageHue=%233a3632&clientId=u72a73f85-6c37-4&from=paste&height=449&id=ua9259011&originHeight=673&originWidth=1609&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=122971&status=done&style=none&taskId=uf3a4f9cf-6682-4991-8673-d9346c0ded6&title=&width=1072.6666666666667)<br />代码中定义了默认模板位置在classpath:/templates/目录下，Spring Boot默认会在classpath:/templates/目录下查找Thymeleaf模板文件，并使用类路径扫描来自动发现并加载应用程序的资源。除此之外自动配置类中还定义了一些其他的属性，SpringBoot使用默认约定可以大大简化配置(**约定大于配置**)。在许多情况下，开发者只需将Thymeleaf模板文件放置在templates文件夹内，并使用.html后缀，而不必显式地配置模板文件的位置和后缀。<br />项目结构中还有一个static文件夹，是用来存放静态资源（css、js、image等等），SpringBoot将通用的Web模块的参数放在Web分包，具体资源配置信息放置在WebProperties配置类中，静态资源默认路径为下图红框标注（如果SpringBoot默认生成的resources目录下同时存在public、resources、static 3个子目录，SpringBoot默认会依次从public、resources、static里面查找静态资源）。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/33318872/1703779027598-11f95aec-18df-4655-86ad-7d63d75346bb.png#averageHue=%23393330&clientId=u72a73f85-6c37-4&from=paste&height=294&id=u49510435&originHeight=441&originWidth=1911&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=84696&status=done&style=none&taskId=u284a7a42-3c60-46cb-8410-c3b5fea04e1&title=&width=1274)
### 8.3.使用Thymeleaf进行页面开发
前面我们已经对Thymeleaf的基本语法以及使用进行了了解，并介绍了Thymeleaf和前端开发所使用的静态资源的自动化配置，接下来我们通过制作页面登陆跳转的demo(在SpringBoot_11_thymeleaf项目基础上进行开发)来重点讲解SpringBoot与Thymeleaf的整合使用。<br />**引入项目所需依赖：**<br />在项目中导入Mybatis、Mybatis-Plus、Druid、MySQL连接依赖<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704197969773-dbae3b6c-f301-4c22-abf5-56d8bd2f3f89.png#averageHue=%232b2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=528&id=u03bf413d&originHeight=792&originWidth=1422&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=89323&status=done&style=none&taskId=u8c558aac-0e0f-42a0-bc92-72279a13e12&title=&width=948)<br />**创建User数据表：**<br />在Navicat中创建User表，用于用户登录验证功能(提前新增一条记录，用于后续登陆功能的验证)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704198139411-d239eafd-f9e9-45dc-bd71-461c40af0da3.png#averageHue=%23f8f7f7&clientId=u408ae6d0-7d0f-4&from=paste&height=234&id=ueb881255&originHeight=351&originWidth=1305&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=30746&status=done&style=none&taskId=uf23cc842-6288-4af3-b035-a9db9363c00&title=&width=870)<br />**修改配置文件：**<br />在全局配置文件application.properties中进行数据库连接和Mybatis相关配置，并且将Thymeleaf的模板缓存置为false(设置为false方便开发中进行调试，上线稳定后可保持默认值true)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704198223100-55d21b47-9c97-4498-94ac-b419c2534c37.png#averageHue=%232d2c2b&clientId=u408ae6d0-7d0f-4&from=paste&height=320&id=u7381c192&originHeight=480&originWidth=1222&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=67278&status=done&style=none&taskId=uf0fb0300-3410-44ec-8cd1-54f0bc67a20&title=&width=814.6666666666666)<br />**实体类：**<br />新建实体类User<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704198454973-b9248850-97a7-4567-9427-68a48a098268.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=377&id=uc39e1c7c&originHeight=566&originWidth=1182&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=57586&status=done&style=none&taskId=u01548150-28c6-40bd-9697-338f21e116d&title=&width=788)<br />**持久层接口：**<br />创建持久层接口UserMapper，继承BaseMapper接口，实现持久层快速开发<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704198599621-cd8ef7bf-8d3e-4010-80c4-ba322099e659.png#averageHue=%232d2c2b&clientId=u408ae6d0-7d0f-4&from=paste&height=201&id=u78d8bb4b&originHeight=302&originWidth=920&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=32926&status=done&style=none&taskId=u501fde51-25cc-4ce3-9d0b-1158eb2e8fc&title=&width=613.3333333333334)<br />**服务层接口：**<br />创建服务层接口IUserService，定义查询用户和登陆验证的方法<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704198662652-cf1f6330-b8be-409c-82db-bb19368bc93d.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=461&id=u5e6424b7&originHeight=691&originWidth=1210&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=71022&status=done&style=none&taskId=u15c31cfe-3762-4cba-a4b2-ed988496772&title=&width=806.6666666666666)<br />**服务层实现类：**<br />创建服务层实现类UserServiceImpl，实现查询用户和登陆验证的方法<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704198721188-673044b3-287d-4bc6-9d3a-a969f24751b1.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=659&id=u26422b7d&originHeight=988&originWidth=1480&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=107517&status=done&style=none&taskId=u4f13bd83-2ff9-40e1-94d5-f3eb3726683&title=&width=986.6666666666666)<br />**表现层：**<br />创建表现层类LoginController，用于定义登陆接口和访问主页接口，其中**login**方法处理GET请求，返回登录页面的Thymeleaf模板名称。**doLogin**方法处理POST请求，根据用户名和密码的验证结果进行跳转。**home**方法用于处理首页的请求。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704199153391-30579227-55a4-4749-acd0-10e8818d5132.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=679&id=ufbd598cc&originHeight=1019&originWidth=1500&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=130992&status=done&style=none&taskId=u99308665-e4fc-4cab-8a77-e6b980b1bc3&title=&width=1000)<br />**创建模板页面：**<br /> 在resources/templates目录创建login.html页面用于前端登陆功能的实现，创建myhome.html页面模拟主页，用于页面跳转功能的实现。当用户访问/login时，会显示登录页面，用户输入用户名和密码后，提交表单，会由doLogin方法处理验证逻辑，如果验证成功，将跳转到/myhome，并显示欢迎页面。登录失败则返回登录页面，并显示错误信息。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704200199332-0cb45621-4af6-4182-9753-676711186141.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=443&id=u380784d6&originHeight=664&originWidth=1216&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=83467&status=done&style=none&taskId=u7b03ed31-660c-4e25-a4cb-74a7a89a8fb&title=&width=810.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704198940582-69e62397-f2ac-4a4e-ace7-d538fe6dfb5c.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=245&id=u097b042f&originHeight=368&originWidth=1100&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44485&status=done&style=none&taskId=u36f0a147-a0ba-47dd-9853-59ec95b8fb7&title=&width=733.3333333333334)<br />**效果测试：**<br />启动项目进行测试，项目启动成功后，在浏览器上访问"http://localhost:8080/login"进入用户登陆页面，输入数据库中不存在的账号，或者错误的密码，页面提示"用户名或密码错误"，说明"error"属性引入静态文件成功。输入正确的账号密码，页面成功跳转到主页，并显示存入session中的账号名称，SpringBoot整合Thymeleaf成功。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704200421852-58427892-2487-40cc-aada-5659629c90bb.png#averageHue=%23fbfbfb&clientId=u408ae6d0-7d0f-4&from=paste&height=179&id=iKHy1&originHeight=268&originWidth=513&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=5977&status=done&style=none&taskId=u33867b4f-2d36-45d8-bdd9-80e1513354c&title=&width=342)![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704200451381-51dc4af5-446e-4b38-8f8f-caed17bf2539.png#averageHue=%23fbfafa&clientId=u408ae6d0-7d0f-4&from=paste&height=178&id=u66dba0e5&originHeight=267&originWidth=512&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=7749&status=done&style=none&taskId=uee82eb05-e38b-4f4e-a803-58d5960f236&title=&width=341.3333333333333)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704200556254-9871e60d-5663-420e-9702-11c4b62528fa.png#averageHue=%23f9f9f8&clientId=u408ae6d0-7d0f-4&from=paste&height=178&id=u51751e08&originHeight=267&originWidth=513&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=8632&status=done&style=none&taskId=u4b46953d-2072-42a8-8787-72b135d8dec&title=&width=342)![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704200584442-9bc12d93-3460-4973-b4f4-08e6dd2252f6.png#averageHue=%23e1bfaa&clientId=u408ae6d0-7d0f-4&from=paste&height=179&id=u9a817676&originHeight=268&originWidth=513&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=16897&status=done&style=none&taskId=u96400925-b12e-4746-88f2-f08eaab1774&title=&width=342)<br />**登陆拦截功能：**<br />上述页面登陆跳转的功能还存在缺陷，如果不经过登录页面正常登录，而是直接访问"http://localhost:8080/myhome"也能进入主页，这样的缺陷在实际工作中是不允许发生的，对于管理系统或其他需要用户登录的系统，登录验证都是必不可少的环节，在SpringBoot开发的项目中，可以通过实现拦截器来实现用户登录拦截并验证。<br />SpringBoot通过实现HandlerInterceptor接口实现拦截器，通过实现WebMvcConfigurer接口实现一个配置类，在配置类中注入拦截器，最后再通过@Configuration注解注入配置。以下是一个简单的拦截器的实现：<br />**实现HandlerInterceptor接口：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704201901845-8238d0ca-4a50-4780-847a-741c58ef9a58.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=858&id=u26a414a5&originHeight=1287&originWidth=1540&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=200346&status=done&style=none&taskId=u11853418-10cf-4a58-bcae-876905328a4&title=&width=1026.6666666666667)<br />preHandle在Controller之前执行，因此拦截器的功能主要就是在这个部分实现：

- 检查session中是否有username存在；
- 如果存在，就返回true，那么Controller就会继续后面的操作；
- 如果不存在，就会重定向到登录界面。就是通过这个拦截器，使得Controller在执行之前，都执行一遍preHandle。

**实现WebMvcConfigurer接口，注册拦截器：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704202065176-cecef12d-2753-4e9d-bbad-39e47e293c9c.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=436&id=u4348a1c8&originHeight=654&originWidth=1358&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=84683&status=done&style=none&taskId=u3620572d-03c9-4c65-aa48-325a8c8738e&title=&width=905.3333333333334)<br />将拦截器注册到了拦截器列表中，并且指明了拦截哪些访问路径，不拦截哪些访问路径，不拦截哪些资源文件；最后再以@Configuration注解将配置注入。<br />**效果验证：**<br />重新启动SpringBoot项目，访问除了"/login"以外的任何页面，拦截器都会将请求重定向到登录页面。此后只需进行一次正确的登录，在正确登录之后，就将username保存到session中，再次访问页面的时候，登录拦截器就可以找到这个username对象，就不需要再次拦截到登录界面了，可以正常访问其他页面。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704202341175-fcb1eb62-e19a-42b2-8ff0-ff5537de2566.png#averageHue=%23ead5c7&clientId=u408ae6d0-7d0f-4&from=paste&height=208&id=u4f0773d9&originHeight=312&originWidth=844&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21695&status=done&style=none&taskId=u8c442fe9-2e5a-44c6-8ae9-cc56575577d&title=&width=562.6666666666666)<br />Chrome浏览器开发者模式中查看存储的Cookie与Session：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704203070683-8375420e-c5f5-42c4-afd5-2769ab4ef04f.png#averageHue=%23fdfdfd&clientId=u408ae6d0-7d0f-4&from=paste&height=222&id=u703c79a0&originHeight=333&originWidth=1753&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=31785&status=done&style=none&taskId=ud5427f94-13cc-49df-9de3-ed0a5c4caa6&title=&width=1168.6666666666667)

![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704202924521-53d65a0c-eb6b-4e02-9b1f-15368b8c393c.png#averageHue=%23f2f2f2&clientId=u408ae6d0-7d0f-4&from=paste&height=361&id=u369cfe4b&originHeight=542&originWidth=1619&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=66787&status=done&style=none&taskId=ue23108cf-4fa7-4599-8cd2-a490c26146f&title=&width=1079.3333333333333)
### 8.4.Thymeleaf配置国际化页面
本小节我们在上一小节的基础上配置国际化页面。<br />在项目的类路径resources下创建名称为i18n(全称：Internationalization)的文件夹，并在该文件夹中根据需要编写对应得多语言国家化文件login.properties、login_zh_CN.properties和login_en_US.properties文件。<br />**login.properties(自定义默认语言配置文件)：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704204331188-76eff22e-00fb-438a-8dbe-c3ee9ce10648.png#averageHue=%232b2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=153&id=ubb3eb53e&originHeight=229&originWidth=915&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23601&status=done&style=none&taskId=u512c22fc-495f-437a-9aaf-076696792e4&title=&width=610)<br />**login_zh_CN.properties(自定义中文国际化文件)：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704204331188-76eff22e-00fb-438a-8dbe-c3ee9ce10648.png#averageHue=%232b2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=153&id=OA4x5&originHeight=229&originWidth=915&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23601&status=done&style=none&taskId=u512c22fc-495f-437a-9aaf-076696792e4&title=&width=610)<br />**login_en_US.properties(自定义英文国际化文件)：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704204387426-6451729a-7dd9-4757-be77-31f4588ab89e.png#averageHue=%232b2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=155&id=uc951daf6&originHeight=232&originWidth=906&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=25621&status=done&style=none&taskId=u797863a1-d17f-4e2d-84d3-83e111f3105&title=&width=604)<br />Spring Boot默认识别的语言配置文件为类路径resources下的messages.properties；其他国际化文件得名称必须严格按照文件前缀名_语言代码_国家代码.properties的形式命名。<br />本项目默认语言配置文件名自定义为login.properties，因此如果项目需要引入自定义国际化文件，必须在项目的全局配置文件中进行国际化文件的基础名配置。<br />**修改配置文件：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704204783785-ed5e7c5f-0f0d-4ca5-a218-3dda965a925f.png#averageHue=%232d2c2b&clientId=u408ae6d0-7d0f-4&from=paste&height=68&id=uae691711&originHeight=102&originWidth=813&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=9417&status=done&style=none&taskId=u94b63a37-76de-4759-9ee0-09778b92a88&title=&width=542)<br />**修改相应的html文件：**<br />修改login.html和home.html模板文件，使用Thymeleaf的国际化表达式（#{}）来引用消息：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704205364474-249794b9-5359-417f-b8a8-bc05a2cccd0c.png#averageHue=%232c2c2b&clientId=u408ae6d0-7d0f-4&from=paste&height=437&id=u9c29e315&originHeight=655&originWidth=1182&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=105738&status=done&style=none&taskId=u8bcf2d9d-427f-41f4-a491-8eaf443bf4b&title=&width=788)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704205385817-d13e76a9-ea02-456a-b802-cc880a1d5437.png#averageHue=%232c2c2b&clientId=u408ae6d0-7d0f-4&from=paste&height=243&id=u8dc6925d&originHeight=364&originWidth=1090&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=49005&status=done&style=none&taskId=u37f92b6b-f6ee-457b-bc33-0c3f0356492&title=&width=726.6666666666666)<br />**定制区域信息解析器：**<br />完成上一步中多语言国际化文件的编写和配置后，就可以正式在前端页面中结合Thymeleaf模板相关属性进行国际化语言设置和展示了，不过这种实现方式默认是Spring Boo使用请求头中的语言信息(**Accept-Language**)自动进行语言切换的，有些项目还会提供手动语言切换的功能，这就需要定制区域解析器了。<br />在config包下创建一个用于定制国际化功能区域信息解析器的自定义配置类MyLocalResovel：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704211766734-52e10998-9a34-4186-993b-a8ad9c623baf.png#averageHue=%232c2b2b&clientId=u408ae6d0-7d0f-4&from=paste&height=592&id=u20befe45&originHeight=888&originWidth=1465&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=111709&status=done&style=none&taskId=ua44d768d-2d08-491c-970a-543a72ff166&title=&width=976.6666666666666)<br />**修改相应的html文件：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704212133752-23cb112d-7ad8-44ef-a5d8-3979fdfa4595.png#averageHue=%232e2c2b&clientId=u408ae6d0-7d0f-4&from=paste&height=501&id=ue339ebbb&originHeight=752&originWidth=1231&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=128898&status=done&style=none&taskId=u3b6b4ad2-e4b4-4e4d-b40f-84f9c69adce&title=&width=820.6666666666666)<br />MyLocalResovel配置类实现了LocaleResovel接口，并重写了LocaleResovel接口的resolveLocale()方法解析自定义语言。使用@Bean注解将当前配置类注册成Spring容器中一个Bean组件。这样就可以覆盖默认的LocaleResolver组件。在重写的resolveLocale()方法中，可以根据不同的需求切换语言信息从而获取请求的参数，只有请求参数不为空时，才可以进行语言的切换(访问 **http://localhost:8080/login?l=en_US** 使用英文（美国）的区域信息;访问 **http://localhost:8080/login?l=zh_CN** 使用中文（中国）的区域信息)。<br />**效果验证：**<br />启动项目进行测试，项目启动成功后，在浏览器上访问"http://localhost:8080/login"进入用户登陆页面，此时使用默认语言，显示为中文，点击登陆按钮下方的English超链接，成功访问"http://localhost:8080/login?l=en_US"，登录页面切换为英文，请求头中的Content-Language参数成功为en-US。点击登陆按钮下方的中文超链接，成功访问"http://localhost:8080/login?l=zh_CN"，登录页面切换为中文，请求头中的Content-Language参数成功为zh_CN。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704212623635-5d802d95-bc67-4e50-88a2-3a0fad3a4255.png#averageHue=%23f3e8e1&clientId=u408ae6d0-7d0f-4&from=paste&height=652&id=u2163b796&originHeight=978&originWidth=1351&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=113584&status=done&style=none&taskId=u5eef54ca-7f66-4e12-a63a-080f1a19fe2&title=&width=900.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704212609817-fb7cc583-64f1-4621-a190-43f5ba80f863.png#averageHue=%23f2e7e1&clientId=u408ae6d0-7d0f-4&from=paste&height=657&id=u35f2972a&originHeight=985&originWidth=1336&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=113514&status=done&style=none&taskId=ub0a188c7-18ad-426d-b4b6-834f1969e12&title=&width=890.6666666666666)<br />至此，关于SpringBoot整合Thymeleaf模板引擎的介绍完毕。

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
作为一个知名的安全管理框架， Spring Security 对安全管理功能的封装已经非常完整了。<br />Spring Boot 整合 Spring Security ，实际上大部分工作都在安全管理配置类上。<br />我们通过安全管理配置类，将用户、密码及其对应的权限信息放入容器，同时将访问路径所需要的权限信息放入容器， Spring Security 就会按照用户访问路径--判断所需权限--用户是否具备该权限--允许或拒绝访问这样的逻辑实施权限管理了。<br />我们在使用 Spring Security 时，只需要从配置文件或者数据库中，把用户、权限相关的信息取出来。然后通过配置类方法告诉 Spring Security ， Spring Security 就能自动实现认证、授权等安全管理操作了。

- 系统初始化时，告诉 Spring Security 访问路径所需要的对应权限。
- 登录时，告诉 Spring Security 真实用户名和密码。
- 登录成功时，告诉 Spring Security 当前用户具备的权限。
- 用户访问接口时，Spring Security 已经知道用户具备的权限，也知道访问路径需要的对应权限，所以自动判断能否访问。
### 9.2.Spring Security默认实现
Spring Security的安全管理有两个重要概念，分别是Authentication（认证）和Authorization（授权）。其中，认证即确认用户是否登录，并对用户登录进行管控；授权即确定用户所拥有的功能权限，并对用户权限进行管控。本章后续将围绕用户登录管理和访问权限控制进行Spring Boot整合Spring Security的讲解。首先我们通过一个快速入门案例来体验Spring Boot整合Spring Security实现MVC Security安全管理效果。
#### （1).**基础环境搭建**
为了讲述认证和授权，本小节及后续将会结合一个动漫列表和动漫详情的案例进行演示，首先进行案例的基础环境搭建。<br />**项目创建：**<br />创建名为SpringBoot_12_security的项目，引入SpirngWeb、Lombok、thymeleaf依赖，如下图所示：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704356223154-fb2d8a36-8699-49e1-b285-f32644c64e2f.png#averageHue=%233c4044&clientId=u5da05f6b-de41-4&from=paste&height=626&id=u54e7e0f4&originHeight=939&originWidth=1206&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=51970&status=done&style=none&taskId=ucb82880e-4b83-436b-a124-9529a719bb0&title=&width=804)<br />**引入html资源文件：**<br />在项目的resources下创建templates目录，引入案例所需的资源文件。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704360637297-dbc16657-5999-4835-8213-2240af836867.png#averageHue=%233d4043&clientId=u5da05f6b-de41-4&from=paste&height=341&id=ud5338d3e&originHeight=512&originWidth=615&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=22315&status=done&style=none&taskId=ua19f5727-4039-4ee4-9bfb-e6f380bdcd4&title=&width=410)<br />index.html为项目首页，common和vip目录中分别对应的是普通用户和vip用户可以访问的页面。<br />**common1.html：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704361832417-f412804d-3ec9-4b04-9717-18cedcf7db89.png#averageHue=%232c2c2b&clientId=u5da05f6b-de41-4&from=paste&height=613&id=u1b65c0dd&originHeight=920&originWidth=1541&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=190048&status=done&style=none&taskId=u49f2daaa-106e-4e2a-8053-d0b4a91c90e&title=&width=1027.3333333333333)<br />**common2.html：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704361842347-33962c8f-36d1-404f-8cbb-72e732789902.png#averageHue=%232d2c2c&clientId=u5da05f6b-de41-4&from=paste&height=557&id=u6c5f4b70&originHeight=835&originWidth=1537&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=172167&status=done&style=none&taskId=uf1e0e9d0-2f24-4eea-bb3c-85f3994d284&title=&width=1024.6666666666667)<br />**vip1.html：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704361851926-a7acf1a2-8ee9-49e9-b1ab-a36116ca9906.png#averageHue=%232d2c2c&clientId=u5da05f6b-de41-4&from=paste&height=618&id=u6f1aa7c8&originHeight=927&originWidth=1540&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=219466&status=done&style=none&taskId=u61fb8cc4-dc54-4861-85dc-8302d39410b&title=&width=1026.6666666666667)<br />**vip2.html：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704361867602-cbdd0e74-c666-440f-bd59-3ccf4a20d3ae.png#averageHue=%232d2c2b&clientId=u5da05f6b-de41-4&from=paste&height=547&id=u077dad94&originHeight=820&originWidth=1538&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=183859&status=done&style=none&taskId=u54ec8f4d-fd01-4082-9b64-ff09997b48c&title=&width=1025.3333333333333)<br />**index.html：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704361236786-57f1d1df-a07a-49e5-acc8-fe24550649ad.png#averageHue=%232d2c2b&clientId=u5da05f6b-de41-4&from=paste&height=779&id=u85899f3a&originHeight=1169&originWidth=1553&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=211156&status=done&style=none&taskId=ufb3a718e-6acf-4f4f-9d7d-7f773c0552d&title=&width=1035.3333333333333)<br />index.html首页中通过标签分类展示了普通番剧和大会员专享，并这些动漫都通过<a>标签连接到了具体的动漫详情路径，在templates目录下，common和vip文目录中引入HTML文件就是对应动漫的简介，static目录下，img目录中为引入的图片。<br />**web表现层：**<br />在xyzy包下创建controller包，在controller包下创建AnimeController类，用于页面请求处理。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704361936590-97512fef-09c2-4d8c-8b6d-c09169dd2a3c.png#averageHue=%232d2c2b&clientId=u5da05f6b-de41-4&from=paste&height=445&id=uebee1783&originHeight=668&originWidth=1499&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=90842&status=done&style=none&taskId=ufc350906-8de9-4dac-a16a-dfc4780eac0&title=&width=999.3333333333334)<br />AnimeController类中编写了一个向影片详情跳转的方法toDetail()，一个跳转主页的方法home()，该文件中没有涉及用户登录提交以及退出操作的方法，在该项目中引入Spring Security后Spring Security会自动生成一个默认的登录页面。
#### （2).**Spring Security安全管理效果测试**
要使用Spring Security，需要在项目中引入安全管理依赖，在pom文件中引入spring-boot-starter-security启动器。<br />**添加spring-boot-starter-security启动器：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704363012537-837d0a79-5ba7-4e4b-b96e-81d8a33050b0.png#averageHue=%232b2b2b&clientId=u5da05f6b-de41-4&from=paste&height=90&id=u14ebfe7d&originHeight=135&originWidth=966&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=19063&status=done&style=none&taskId=u922568db-b744-4ef9-8712-3328d1ab2ad&title=&width=644)<br />一旦项目引入spring-boot-starter-security启动器，MVC Security和WebFlux Security负责的安全功能都会立即生效，如果需要使用OAuth2则还需要额外引入spring-security-oauth2-autoconfigure依赖。<br />**项目测试：**<br />启动SpringBoot_12_security项目，项目启动时会在控制台Console中自动生成一个安全密码。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704363294024-34203c3d-33c0-4fa8-b32a-739e9c166c32.png#averageHue=%232e2d2c&clientId=u5da05f6b-de41-4&from=paste&height=202&id=u03a6af3b&originHeight=303&originWidth=2001&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=69746&status=done&style=none&taskId=u726f9c04-2415-4dbc-b4ab-60192198f47&title=&width=1334)<br />浏览器访问http://localhost:8080/查看项目首页，项目中并没有手动创建用户登录页面，而添加了Security依赖后，Spring Security的自动化配置生效，项目具有了一些默认的安全管理功能，从而生成一个默认的登录页面http://localhost:8080/login。Security会默认提供一个可登录的用户信息，其中用户名为user，密码随机生成，这个密码会随着项目的每次启动随机生成并打印在控制台上。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704363358957-1288606b-b1a3-484a-83d7-fe7d2177fc91.png#averageHue=%23e6d7cd&clientId=u5da05f6b-de41-4&from=paste&height=392&id=ud785b355&originHeight=588&originWidth=1276&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40496&status=done&style=none&taskId=u29776906-45ea-4658-a5a8-0d98ced59d5&title=&width=850.6666666666666)<br />在登录页面输入错误的用户名和密码，页面会重定向到"/login？error"，并且页面会显示出错误信息，提示用户。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704363955080-ae13b8fe-7e38-4d6a-a0e4-dc02088112fb.png#averageHue=%23e7d8ce&clientId=u5da05f6b-de41-4&from=paste&height=422&id=u939b1446&originHeight=633&originWidth=1278&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44325&status=done&style=none&taskId=ub8a5b25d-2288-4118-a4c2-2b535af6b35&title=&width=852)<br />在登录页面输入正确的用户名和密码后，登陆成功跳转至主页，点击相应的动漫名称，可以跳转至动漫详情介绍。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704364169381-db4b3c46-8f57-4c9c-a4e9-9e2397406d22.png#averageHue=%23f8f1ed&clientId=u5da05f6b-de41-4&from=paste&height=980&id=uaee3f096&originHeight=1470&originWidth=2556&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=385298&status=done&style=none&taskId=u2b25847b-62bb-42b8-ae9b-cab2577586c&title=&width=1704)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704364189807-40b76aac-d9c3-4b48-b39f-ede8e127cb94.png#averageHue=%23f3eae5&clientId=u5da05f6b-de41-4&from=paste&height=871&id=u9b68dec4&originHeight=1306&originWidth=2553&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=610415&status=done&style=none&taskId=uaaed79e1-2a8d-4b96-91ff-33b51c932a9&title=&width=1702)<br />但是这种默认的安全管理方式还存在许多问题，例如： 只有唯一的默认登录用户user、密码随机生成且过于暴露、登录页面及错误提示页面不是我们想要的等。
### 9.3.MVC Security安全配置介绍
Spring Security是Spring框架提供的用于处理身份验证和授权的强大安全框架。当与Spring MVC结合使用时，Spring Security提供了一种有效的方式-MVC Security安全管理功能来保护应用程序免受各种安全威胁。其默认的安全配置是在SecurityAutoConfiguration和 UserDetailsServiceAutoConfiguration中实现的。其中，SecurityAutoConfiguration会导入并自动化配置 SpringBootWebSecurityConfiguration用于启动Web安全管理，UserDetailsServiceAutoConfiguration则用于配置用户身份信息。<br />以下是MVC Security安全配置介绍：<br />**Security配置：**使用配置类来配置Spring Security。配置类继承WebSecurityConfigurerAdapter()，并使用@EnableWebSecurity注解开启MVC Security安全支持。在配置类中，可以定义如何进行身份验证、授权以及其他相关的安全性配置。例如<br />**请求访问配置示例**：
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
上述例子中重写**configure(AuthenticationManagerBuilder auth)**方法用于定制用户认证管理器来实现用户认证，**{noop} **表示密码不加密（在实际项目中，密码应该加密存储)。<br />但是： 在Spring Security 5.x 版本之后(SpringBoot版本为2.7.X)，Spring 推荐使用基于组件的配置方式而不是继承 **WebSecurityConfigurerAdapter(不推荐使用)**。这种基于组件的配置方式可以通过声明**SecurityFilterChain**和**UserDetailsService**等类型的**bean**的方式来进行相关配置。<br />**请求访问配置示例**：
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
Spring Security允许在内存中配置用户身份认证，其对于快速测试或简单应用程序非常方便。自定义内存身份认证时，只需要在配置类中注册UserDetailsService类型的bean，并在方法中定义测试用户即可。下面通过Spring Boot整合Spring Security实现内存身份认证。<br />**自定义组件配置：**<br />在xyzy包下创建config包，在config包下创建SecurityConfig类，用于自定义身份配置。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704371293061-2f47ecf9-81a4-4414-9ce3-6189501c0dff.png#averageHue=%232c2b2b&clientId=u5da05f6b-de41-4&from=paste&height=542&id=u11b63b6c&originHeight=813&originWidth=1392&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=104006&status=done&style=none&taskId=u1e4dabce-2326-4205-bb5b-d3f91c8ce31&title=&width=928)<br />在以上配置类中注册了UserDetailsService类型的Bean用于配置内存中的用户，设置了两个用户，包括用户名、密码和角色。进行用户配置时需要注意以下几个问题：

1. 从Spring Security 5开始，自定义用户认证必须设置密码编码器用于保护密码，否则控制台会出现 “IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"”异常错误。
2. Spring Security提供了多种密码编码器，包括BCryptPasswordEncoder、Pbkdf2PasswordEncoder、 ScryptPasswordEncoder等，注册这几种密码编译器类型的Bean即可使用。
3. 自定义用户认证时，可以定义用户角色roles，也可以定义用户权限authorities。在进行赋值时，权限通常是在角色值的基础上添加 ROLE_ 前缀。例如， roles("common") 和 authorities("ROLE_common") 是等效的。
4. 自定义用户认证时，可以为某个用户⼀次指定多个角色或权限，例如， roles("common", "vip") 或 authorities("ROLE_common", "ROLE_vip") 。

**效果测试：**<br />启动SpringBoot_12_security项目，项目启动成功后，发现控制台已经不再打印默认安全管理随机生成的密码了，访问[http://localhost:8080](http://localhost:8080/)，同样自动跳转到了用户登录页面http://localhost:8080/login。如果输入的用户名或者密码错误，会出现相应的错误提示。如果输入的用户名和密码正确，那么会跳转进入网站首页。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704371589332-6cc5d994-d2ae-447c-990f-16f47f6425a4.png#averageHue=%23e6d8cf&clientId=u5da05f6b-de41-4&from=paste&height=425&id=u13119fc8&originHeight=637&originWidth=1273&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40730&status=done&style=none&taskId=u77fc5603-cd8b-4b31-bd86-69fe91a21c3&title=&width=848.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704371602561-084f3833-fba8-433b-aed9-f6a010937bdf.png#averageHue=%23e8dbd3&clientId=u5da05f6b-de41-4&from=paste&height=497&id=u70f329a0&originHeight=746&originWidth=1276&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44568&status=done&style=none&taskId=uac2107cb-ee45-42d2-a5ec-ae8c98ec20d&title=&width=850.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704371634523-1cb4e4bb-d2c5-4d8b-a3ce-773ada639afb.png#averageHue=%23f7eee9&clientId=u5da05f6b-de41-4&from=paste&height=774&id=ub8ebfeb1&originHeight=1161&originWidth=2253&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=375500&status=done&style=none&taskId=u72645fb5-6ff9-4ad2-9c4f-c0518de81c7&title=&width=1502)

实际开发中，用户都是在页面注册和登录时进行认证管理的，而非在程序内部使用内存管理的方式手动控制注册用户，所以上述使用内存身份认证的方式无法用于实际生产，只可以作为初学者的测试使用。
#### （2).**JDBC身份认证**
JDBC Authentication（JDBC身份认证）是通过JDBC连接数据库对已有用户身份进行认证。接下来通过一个案例进行JDBC身份认证的讲解。<br />**数据准备：**<br />JDBC身份认证的本质是通过JDBC连接数据库对已有用户身份进行认证。所以需要提前准备好相关数据，这里使用我们一直使用的数据库springboot_db，在该数据库创建三个表customer用户表、authority用户权限表、customer_authority用户权限关联表，并预先插入几条测试数据。<br />**customer用户表：**(username需要唯一，valid表示用户身份是否合法，默认1为合法，密码为BCryptPasswordEncoder编码器加密后的密码，分别是123123和123124)<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704374533175-b638ff25-69dc-4f27-b413-f1adcfb9c19a.png#averageHue=%23f3f1ef&clientId=u5da05f6b-de41-4&from=paste&height=146&id=u68324216&originHeight=219&originWidth=1051&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=27115&status=done&style=none&taskId=u1fff3803-ad29-4d77-97dc-eea945a55a2&title=&width=700.6666666666666)<br />**authority用户表：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704374073744-8bbffeae-6968-4125-aa42-56523482152d.png#averageHue=%23f5f3f3&clientId=u5da05f6b-de41-4&from=paste&height=128&id=u7a9b4354&originHeight=192&originWidth=771&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=17119&status=done&style=none&taskId=u88e48f8a-951b-4716-b808-df2adf074d9&title=&width=514)<br />**customer_authority用户表：**<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704374126564-7dcb98ec-608e-434b-8c0b-e614931e6c30.png#averageHue=%23f6f5f5&clientId=u5da05f6b-de41-4&from=paste&height=149&id=ufd151dfa&originHeight=224&originWidth=791&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=16893&status=done&style=none&taskId=uaf2a7eca-caa3-44e2-b29f-6ed0b5944a5&title=&width=527.3333333333334)<br />**添加JDBC依赖和MySQL连接依赖：**<br />在POM文件中添加如下依赖：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704374745970-59ddb4f2-6f07-4a3c-b24c-a791fbb90969.png#averageHue=%232b2b2b&clientId=u5da05f6b-de41-4&from=paste&height=215&id=u264baafe&originHeight=322&originWidth=1188&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=43379&status=done&style=none&taskId=u75e00dd1-4af4-4942-97bf-b3cc3c003d3&title=&width=792)<br />**数据库连接配置：**<br />在全局配置文件application.properties中编写数据库连接配置。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704374863596-c0dc50c1-6fe9-48bc-a48e-add55367930e.png#averageHue=%232f2d2b&clientId=u5da05f6b-de41-4&from=paste&height=135&id=u37fdda90&originHeight=202&originWidth=898&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=31053&status=done&style=none&taskId=u2f5c56c7-fac0-44ef-8cf2-3bdd31b9113&title=&width=598.6666666666666)<br />**JDBC身份认证配置：**<br />在SecurityConfig 类中使用注册Bean的方式实现JDBC身份认证，使用JDBC身份认证时，需要对密码进行编码设置（必须与数据库中用户密码加密方式一致），需要加载JDBC进行认证连接的数据源DataSource；最后，执行SQL语句，实现通过用户名username查询用户信息和用户权限。
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
需要注意的是，定义用户查询的SQL语句时，必须返回用户名username、密码password、是否为有效用户valid这3个字段信息；定义权限查询的SQL语句时，必须返回用户名username、权限authority两个字段信息。否则，登录时输入正确的用户信息会出现PreparedStatement Callback的SQL异常错误信息。<br />**效果测试：**<br />启动SpringBoot_12_security项目，项目启动成功后，访问[http://localhost:8080](http://localhost:8080/)，通过数据库中存在的正确信息可以正常访问主页，输入错误的用户信息会正确提示。
#### （3).**UserDetailService身份认证**
对于用户流量较大的项目来说，频繁地使用JDBC进行数据库查询认证不仅麻烦，而且会降低网站响应速度。对于一 个完善的项目来说，如果某些业务已经实现了用户信息查询的服务，就没必要使用JDBC进行身份认证了。<br />假设当前项目中已经有用户信息查询的业务方法，在已有的用户信息服务的基础上选择使用实现UserDetailsService接口的方法进行自定义用户身份认证。<br />为了案例的演示，还需要完成以下实体类、持久层接口、服务层接口、服务层实体类的编写。<br />**定义用户及用户权限的实体类：**<br />Authority用户权限实体类：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714516386-d857fc30-b773-4196-b802-5513613fdc39.png#averageHue=%232c2b2b&clientId=u7d3bdb05-4282-4&from=paste&height=263&id=uf7fc2e74&originHeight=395&originWidth=1226&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=37460&status=done&style=none&taskId=ua6cff5d2-be0c-4bab-b1bd-37ef34f6793&title=&width=817.3333333333334)<br />Customer用户数据实体类：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714569642-53bf2920-a121-42a5-bdb3-caccaa9594f7.png#averageHue=%232c2b2b&clientId=u7d3bdb05-4282-4&from=paste&height=307&id=u0d18d9ab&originHeight=460&originWidth=1292&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=48213&status=done&style=none&taskId=u004dd29c-4277-4f4f-a9be-5ac4ff2ccf1&title=&width=861.3333333333334)<br />**定义查询用户及用户权限的持久层接口：**<br />查询用户信息的持久层接口CustomerMapper(Mybatis-Plus开发)：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714598008-483b8c4b-1733-4708-a904-542f496e2b6c.png#averageHue=%232d2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=197&id=u70a96e1a&originHeight=295&originWidth=1290&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38958&status=done&style=none&taskId=uefdaddd5-6aa1-4acd-9c8d-5e69be366f3&title=&width=860)<br />查询用户权限的持久层接口AuthorityMapper：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714654235-be06a9dc-86a6-4cff-b3c2-19cecfcfef41.png#averageHue=%232d2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=307&id=ucaa8b96e&originHeight=460&originWidth=1335&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=59024&status=done&style=none&taskId=u6e87d6fc-ac67-403e-89d2-9e31e64f5f4&title=&width=890)<br />查询用户权限的持久层接口AuthorityMapper对应的配置文件AuthorityMapper.xml：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714773981-c0d7bcb1-4fbb-4031-aa5d-553787417665.png#averageHue=%2337362f&clientId=u7d3bdb05-4282-4&from=paste&height=440&id=u3feed1c3&originHeight=660&originWidth=1418&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=101031&status=done&style=none&taskId=u66f5c6aa-e504-4ac3-83fa-a0cd5cd588c&title=&width=945.3333333333334)<br />**定义查询用户及用户权限的服务层接口和服务层实现类：**<br />查询用户权限的服务层接口IAuthorityService：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714856833-5ab6a06f-4b74-4fa9-b1da-baddb5711bed.png#averageHue=%232d2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=221&id=u5f6e3f12&originHeight=331&originWidth=1152&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=37860&status=done&style=none&taskId=u7d9f032e-aaca-430f-a741-024f9c512d1&title=&width=768)<br />查询用户权限的服务层接口ICustomerService：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714869538-1f0a9d41-5aca-4818-a86c-9910461ab8ec.png#averageHue=%232c2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=197&id=u35f83f3a&originHeight=296&originWidth=1245&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=31170&status=done&style=none&taskId=uba7caebe-16ea-4eb9-ac55-caad162e62c&title=&width=830)<br />查询用户权限的服务层接口实现类AuthorityServiceImpl：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704714994977-6423e927-b6ab-49df-9be0-21928ade0c17.png#averageHue=%232d2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=681&id=u2d61174e&originHeight=1022&originWidth=1565&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=140064&status=done&style=none&taskId=u7f7f0511-9998-4b48-8613-e8789841be7&title=&width=1043.3333333333333)<br />查询用户信息的服务层接口实现类CustomerServiceImpl：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704715037974-12367bc4-c006-4181-aa85-9cb7f2dbb68e.png#averageHue=%232c2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=725&id=ued423831&originHeight=1087&originWidth=1565&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=152348&status=done&style=none&taskId=uf9a56c8e-3009-44a6-9aa1-b5e4463e52a&title=&width=1043.3333333333333)<br />AuthorityServiceImpl与CustomerServiceImpl是项目中的业务处理服务类，这两个类结合Redis缓存、定义了通过username获取用户信息和用户权限信息的方法。<br />**定义实现UserDetailsService接口的服务类UserDetailsServiceImpl：UserDetailsService 是 Spring Security 中定义的一个接口，用于加载用户信息的服务接口。该接口定义了一个方法 loadUserByUsername()，用于根据用户名加载用户信息。用户信息包括用户名、密码、是否启用、是否过期、是否锁定、权限等。自定义一个UserDetailsService接口的实现类，通过重写loadUserByUsername()方法即可封装我们需要自定义的用户信息。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704715327620-1d68a860-2bf0-43f9-9123-66e3fc1d3c67.png#averageHue=%232c2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=703&id=uca85a6aa&originHeight=1055&originWidth=1542&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=169307&status=done&style=none&taskId=ub0de94f2-94ec-42e9-aae4-b57bd6f9957&title=&width=1028)<br />上述代码中**SimpleGrantedAuthority** 是 Spring Security 提供的一个简单实现了 GrantedAuthority 接口的类。GrantedAuthority 表示赋予给用户的权限，它是一个标识权限的接口。在 Spring Security 中，权限通常表示为字符串，例如 "ROLE_VIP"；<br />**UserDetails **接口是 Spring Security 中定义的接口，用于表示用户的详细信息。这个接口包含了描述用户的各种属性，如用户名、密码、权限等。UserDetails 是构建认证（authentication）对象的基础，用于存储有关用户的信息，返回的UserDetails 对象提供给Security进行认证使用。<br />需要注意的是，UserDetailsServiceImpl业务处理类获取Customer实体类时，必须对当前用户进行非空判断，这里使用throw进行异常处理，如果查询的用户为空，throw会抛出UsernameNotFoundException的异常。如果没有 使用throw异常处理，Security将无法识别，导致程序整体报错。<br />**UserDetailsService自定义身份认证配置：**<br />在config包下新建一个UserDetailServiceSecurityConfig配置类，在UserDetailServiceSecurityConfig 中使用注册Bean的方式实现UserDetailsService身份认证配置。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704716150319-db2bdc1c-1ab7-45cf-a279-3cac6d9823d3.png#averageHue=%232d2c2b&clientId=u7d3bdb05-4282-4&from=paste&height=704&id=ub29ba154&originHeight=1056&originWidth=1546&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=178923&status=done&style=none&taskId=u845fbc92-7b5d-4750-931b-d02d38772d5&title=&width=1030.6666666666667)<br />**效果测试：**<br />启动SpringBoot_12_security项目，项目启动成功后，访问[http://localhost:8080](http://localhost:8080/)访问项目首页（前提需要保证UserDetailServiceSecurityConfig配置类的所有配置完成，并且需要启动Redis服务器），输入正确或者错误的信息，页面效果和上一小节所展示的效果一样。<br />至此，关于Spirng Security中的自定义用户认证已演示完毕。内存身份认证最为简单，适合作用于测试以及初学者体验；JDBC身份认证和UserDetailsService身份认证在实际开发中使用较多，根据实际开发中的业务情况来看使用UserDetailsService身份认证较为合适。
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
**SecurityFilterChain**：这是Spring Security 5引入的一个新概念，用于配置安全过滤器链。它定义了一系列的安全过滤器，用于处理不同类型的安全问题。<br />**filterChain(HttpSecurity http)：**这个方法配置了安全过滤器链。参数http是一个HttpSecurity对象，它提供了一些方法来配置不同的安全性设置，这些方法允许开发者定义哪些请求需要进行身份验证，哪些请求不需要身份验证，以及如何处理这些请求。除此之外，它还能用来处理Session管理配置、CSRF跨站请求问题等。HttpSecurity类常用的方法如下表所示：

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

以上列举了用户请求访问的常见用法，更多方法可以查看Spring Security官方API文档。<br />接下来，在上一节自定义用户认证案例的基础上，进行用户访问配置，演示Spring Security授权管理的用法。<br />在上一章创建的配置类UserDetailServiceSecurityConfig中进行**用户访问配置**，示例如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704790257745-a8e934d3-ec15-40cc-bcfb-2cee4c623760.png#averageHue=%232e2d2c&clientId=ufdba1dc9-d353-4&from=paste&height=264&id=u5811dfb4&originHeight=396&originWidth=1518&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=98207&status=done&style=none&taskId=u95f1d446-447f-4dc8-b422-65b78150c68&title=&width=1012)<br />上述代码中，filterChain()方法设置了用户访问权限，其中，路径为“/”的请求直接放行；路径为 /detail/common/** 的请求，只有用户角色为common（即ROLE_common权限）才允许访问；路径为 /detail/vip/** 的请求，只有用户角色为vip（即ROLE_vip权限）才允许访问；其他请求则要求用户必须先进行登录认证。<br />**效果测试：**<br />启动SpringBoot_12_security项目，项目启动成功后，访问[http://localhost:8080](http://localhost:8080/)访问项目首页。可以直接进入项目首页，这是因为自定义的用户访问控制中，对"/"的请求是直接放行的，说明自定义用户访问控制生效。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704790283651-44f30a75-8cf8-4d41-8103-8aa12439a033.png#averageHue=%23f6eee8&clientId=ufdba1dc9-d353-4&from=paste&height=768&id=u4ef06405&originHeight=1152&originWidth=2257&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=375897&status=done&style=none&taskId=ud5c9c7f3-684d-49bf-9cb4-bdfb9e69d26&title=&width=1504.6666666666667)<br />在项目首页中单击普通番剧或者大会员专享的影片名称查看详情，会直接被自定义的访问控制拦截并跳转到默认用户登陆界面。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704789826226-ff5ae7a1-8a94-4ec7-bff0-f83c327e9d23.png#averageHue=%23e7dad1&clientId=ufdba1dc9-d353-4&from=paste&height=449&id=u84e0ccb9&originHeight=673&originWidth=1278&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38303&status=done&style=none&taskId=u8a2d29cc-a23e-4a1e-b562-4cfd55519ee&title=&width=852)<br />在拦截的登陆界面输入正确的用户名和密码后(VIP用户)，会立即跳转到之前将要访问的影片详情页面。说明当前登陆的用户有查看普通影片详情的权限。<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704789862916-d0d773f5-b928-4115-966c-6ddc4ee87836.png#averageHue=%23ded0c5&clientId=ufdba1dc9-d353-4&from=paste&height=594&id=uad29fdeb&originHeight=891&originWidth=1278&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=559051&status=done&style=none&taskId=u92e51e93-2e2e-4903-8976-8d0dc33756e&title=&width=852)<br />点击影片详情左上角的"返回"链接，会再次返回到项目首页。此时，之前登录的VIP用户还处于登陆状态，点击普通番剧的影片查看详情，页面会出现403Forbidden(禁止访问)的错误信息，并且控制台不会报错，说明示例中配置的用户访问控制对不同的请求拦截也生效了<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/33318872/1704789882978-41e5443f-5656-481f-a82e-c78d468fa2ab.png#averageHue=%23eedcd1&clientId=ufdba1dc9-d353-4&from=paste&height=351&id=u7de24a85&originHeight=526&originWidth=1281&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=44471&status=done&style=none&taskId=u2a9c76af-1577-4631-81d5-6d9de8db98a&title=&width=854)<br />(当前页面还没有做用户注销功能，切换用户需要重启SpringBoot项目，或者清理浏览器缓存和重启浏览器等)
#### （2).**自定义用户登录**
#### （3).**自定义用户退出**
### 9.6.登录用户信息获取



