---
title: Nacos��װָ��
urlname: lpuuqw7sfzg0
date: '2024-06-01 13:38:49'
updated: '2024-06-01 13:38:54'
---
# Nacos安装指南
# 1.Windows安装
开发阶段采用单机安装即可。
## 1.1.下载安装包
在Nacos的GitHub页面，提供有下载链接，可以下载编译好的Nacos服务端或者源代码：
GitHub主页：[https://github.com/alibaba/nacos](https://github.com/alibaba/nacos)
GitHub的Release下载页：[https://github.com/alibaba/nacos/releases](https://github.com/alibaba/nacos/releases)
如图：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327513-e8840f64-c54c-4276-a912-936faec2d1d7.png#from=url&id=VW0hP&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
本课程采用1.4.1.版本的Nacos，课前资料已经准备了安装包：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327592-5f565778-e728-4e35-847d-4a5870c293e0.png#from=url&id=nu0F1&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
windows版本使用nacos-server-1.4.1.zip包即可。
## 1.2.解压
将这个包解压到任意非中文目录下，如图：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327651-3405e176-c614-4967-b72f-d95d4fb1547e.png#from=url&id=e0LdG&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
目录说明：

- bin：启动脚本
- conf：配置文件
## 1.3.端口配置
Nacos的默认端口是8848，如果你电脑上的其它进程占用了8848端口，请先尝试关闭该进程。
**如果无法关闭占用8848端口的进程**，也可以进入nacos的conf目录，修改配置文件中的端口：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327712-3c2b8c43-0666-40ac-ba34-f41791b7b106.png#from=url&id=xmhTF&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
修改其中的内容：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327782-38d3c729-ead3-42ef-9c71-ecb59916de93.png#from=url&id=yuhDD&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
## 1.4.启动
启动非常简单，进入bin目录，结构如下：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327855-d9edb48a-a76f-4c62-8969-42682cbfb156.png#from=url&id=N9A3P&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
然后执行命令即可：

- windows命令：
```
startup.cmd -m standalone
```
执行后的效果如图：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327920-14de0c57-85bb-48ce-8b9c-2c5f2ab8c8b7.png#from=url&id=p58hq&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
## 1.5.访问
在浏览器输入地址：http://127.0.0.1:8848/nacos即可：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327975-a941d0b0-c01b-4321-9d6a-fbfd2f17c602.png#from=url&id=oSJKm&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
默认的账号和密码都是nacos，进入后：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220328057-2ee71404-8992-488f-92d2-7ccaeb032f58.png#from=url&id=EsMzU&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
# 2.Linux安装
Linux或者Mac安装方式与Windows类似。
## 2.1.安装JDK
Nacos依赖于JDK运行，索引Linux上也需要安装JDK才行。
上传jdk安装包：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220328126-1d7f3624-7473-42ee-a72a-91a1344fc4ba.png#from=url&id=qCT6m&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
上传到某个目录，例如：/usr/local/
然后解压缩：
```
tar -xvf jdk-8u144-linux-x64.tar.gz
```
然后重命名为java
配置环境变量：
```
export JAVA_HOME=/usr/local/java
export PATH=$PATH:$JAVA_HOME/bin
```
设置环境变量：
```
source /etc/profile
```
## 2.2.上传安装包
如图：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327513-e8840f64-c54c-4276-a912-936faec2d1d7.png#from=url&id=Vzulr&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
也可以直接使用课前资料中的tar.gz：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220327592-5f565778-e728-4e35-847d-4a5870c293e0.png#from=url&id=tQ1jM&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
上传到Linux服务器的某个目录，例如/usr/local/src目录下：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220328187-8d3619ab-36dc-44b1-83b0-30e3243cfa02.png#from=url&id=G05ZO&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
## 2.3.解压
命令解压缩安装包：
```
tar -xvf nacos-server-1.4.1.tar.gz
```
然后删除安装包：
```
rm -rf nacos-server-1.4.1.tar.gz
```
目录中最终样式：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220328259-dcc676fd-371c-40c3-bde6-646387f29c2f.png#from=url&id=LxCS6&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
目录内部：
![](https://cdn.nlark.com/yuque/0/2024/png/29688613/1717220328327-42a413fc-58d0-4d51-a3e6-7194207fa432.png#from=url&id=Xklj8&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
## 2.4.端口配置
与windows中类似
## 2.5.启动
在nacos/bin目录中，输入命令启动Nacos：
```
sh startup.sh -m standalone
```
# 3.Nacos的依赖
父工程：
```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.5.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```
客户端：
```xml
<!-- nacos客户端依赖包 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```
