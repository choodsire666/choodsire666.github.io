---
title: 微服务保护Sentinel
urlname: lgg8wwk93pd4lw68
date: '2024-03-28 16:33:02'
updated: '2024-03-28 16:33:32'
cover: 'https://raw.githubusercontent.com/choodsire666/blog-img/main/微服务保护Sentinel/2dc45ec7a08ed5b1f86d1527ddc03725.jpeg'
description: 目标了解雪崩产生的原因及常见解决方案能够完成Sentinel部署并整合微服务能够实现Sentinel限流效果（三种模式+三种效果）能够完成Feign整合Sentinel了解线程隔离实现方案，了解Sentinel断路器状态机流转能够完成Sentinel线程隔离和熔断降级能够实现Sentinel授...
---
# 目标
- 了解雪崩产生的原因及常见解决方案
- 能够完成Sentinel部署并整合微服务
- 能够实现Sentinel限流效果（三种模式+三种效果）
- 能够完成Feign整合Sentinel
- 了解线程隔离实现方案，了解Sentinel断路器状态机流转
- 能够完成Sentinel线程隔离和熔断降级
- 能够实现Sentinel授权规则（黑白名单）
- 了解Sentinel规则持久化的三种方案，push模式实现步骤
# 前言
应用的硬件、软件架构在涉及到部署时，一般会根据实际请求量做一定的压力测试，以测试系统稳定性、健壮性，避免后续线上未知故障。假设在一个电商的秒杀场景下，订单中心本身能够承载的QPS预设是10W，因为活动的火爆导致流量瞬时达到100W，此时订单中心因无法承载其10倍的请求将会崩溃，那么对于整个分布式架构系统会产生什么问题呢？本节我们将借助于Sentinel的流量控制、隔离降级来解决上述分布式架构中常见的雪崩问题。
# 1.雪崩问题及解决方案
## 1.1 什么是雪崩问题
在微服务医疗系统中，当医生给患者开立药品医嘱时，需要完成对药品库存的扣减、新医嘱信息的创建、医疗费用的预扣等多个业务活动。假设此时费用中心服务宕机，此时医嘱创建请求会持续等待下游服务的响应，在系统未做任何保护时，请求会在响应之前持续等待，随着更多的请求过来直至医嘱中心服务资源耗尽。费用中心不可用的现象转移到其上游医嘱中心，医嘱中心的不可用随着更多的请求继续向上转移到医生站，最终导致所有服务不可用。
这种在微服务调用链路中，因为某个服务不可用导致上游服务调用者不可用，最终扩大至整个服务集群产生不可用的问题称之为雪崩效应（一个不可用导致全部不可用）。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/1169676/1673852349295-ef5fbe2f-f5d4-46c8-9118-1d31e458dd5b.jpeg)
## 1.2 造成雪崩问题的原因
造成服务不可用的原因有很多，从硬件、软件的角度都可以大致给出一些故障现场，如硬件：机房故障、网线断开等，软件：流量过载、缓存击穿等。当服务提供者不可用，往往都会出现大量重试的情况：用户重试、代码逻辑重试、MQ重试，这些重试会进一步导致流量增加，加剧了服务雪崩的最终产生。
所以导致雪崩效应的根本原因是：大量同步请求等待造成的资源耗尽，一旦资源耗尽服务调用者提供的服务也处于不可能用砖，于是服务雪崩效应产生。既然有问题肯定也有解决方案，目前通用的解决方案具体如下：
## 1.3 雪崩问题的解决方案
### 1 超时处理
针对服务调用增加超时机制(一般dubbo默认30s)，一旦超时自动释放资源，因释放资源较快一定程度可抑制资源耗尽问题。但如果在超时释放的时间内陡增大量请求，依然会导致服务宕机不可用。
![超时处理.gif](https://cdn.nlark.com/yuque/0/2023/gif/1169676/1674980007161-416c684f-69b7-40c2-8925-04d1768ec199.gif#averageHue=%23f7f7f6&clientId=ubc062550-f9e7-4&from=paste&height=588&id=uc5b76cdf&originHeight=882&originWidth=1692&originalType=binary&ratio=1&rotation=0&showTitle=false&size=282576&status=done&style=none&taskId=u0623f6a4-7f35-4a27-a649-bb5ad398f03&title=&width=1128)
### 2 舱壁模式
限定每个业务能使用的线程数，避免耗尽整个tomcat的资源，因此也叫线程隔离。它可以避免因部分服务不可用导致整个服务不可用的问题，但是也会存在线程资源浪费的问题了。![image-20210715173215243.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673854059045-49f2f40c-4b08-4627-b9b4-2d3fc35c07a1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdf5f3&clientId=u9e4a6ca6-f08c-4&from=drop&id=u5e49e730&originHeight=419&originWidth=765&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25086&status=done&style=none&taskId=u63235108-25ec-4ef5-affa-ef3a1018ccc&title=)
### 3 熔断降级
由断路器统计业务执行的异常比例，如果超出阈值则会熔断该业务，拦截访问该业务的一切请求。断路器会统计指定服务的请求数异常比例、异常数：![image-20210715173327075.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673854113161-e363f3ba-d8ee-4d57-879e-29a55511981e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fef5f4&clientId=u9e4a6ca6-f08c-4&from=drop&id=ue84faa96&originHeight=468&originWidth=615&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19287&status=done&style=none&taskId=ub6c1326a-081f-45aa-9c4f-c1aece00e85&title=)
当发现异常比例、异常数超过配置的阈值时，断路器开始生效，拦截访问下游服务D的一切请求，形成熔断。![image-20210715173428073.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673854170910-1219ac9e-8801-42aa-afaa-710bbdd26930.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_17%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fdf2f1&clientId=u9e4a6ca6-f08c-4&from=drop&id=u16170721&originHeight=463&originWidth=585&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23263&status=done&style=none&taskId=u72a78610-ba7e-47e0-94e9-aa31cb84adc&title=)
### 4 流量控制
相较于上述的针对已发生情况的自下而上的处理，实际更推荐自上而下的处理方案，这种方案将借助于Sentinel的流控功能去处理，拦截所有的请求，只释放服务能处理的粒度，从而保证服务的稳定性。
![image-20210715173555158.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673854187491-9bdf0ba2-cc02-4b22-bd23-6bf71e329b6e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23d69238&clientId=u9e4a6ca6-f08c-4&from=drop&id=u57333461&originHeight=359&originWidth=1346&originalType=binary&ratio=1&rotation=0&showTitle=false&size=86844&status=done&style=none&taskId=u7f1f3a2c-9e8e-4e98-bff2-55d459d6f58&title=)
## 1.4 总结
截止此我们学到了两个重要的知识点：

1. 什么是[雪崩问题](https://www.yuque.com/yzxb/index/fvf58cgpd76hgfpg#EFm0C)？造成[雪崩的根本原因](https://www.yuque.com/yzxb/index/fvf58cgpd76hgfpg#w3MCa)是什么？
2. 解决雪崩的常见[解决方案](https://www.yuque.com/yzxb/index/fvf58cgpd76hgfpg#ufqh0)：

保护：流量控制
解决：超时处理、舱壁模式、熔断降级
# 2.Sentinel
## 2.1 常见微服务保护技术对比
既然上面我们分析了种种方案，那么对应这些方案又有哪些技术可以去落地呢？目前能结合SpringCloud支持微服务保护的技术一般是：Hystrix、Sentinel，在此我们横向比对下面两种常见技术：

| **对比指标** | [**Sentinel**](https://sentinelguard.io/zh-cn/index.html) | [**HyStrix**](https://github.com/Netflix/Hystrix) |
| --- | --- | --- |
| 隔离策略 | 信号量隔离 | 线程池隔离/信号量隔离 |
| 熔断降级策略 | 慢调用比例/异常比例/异常数 | 失败比率 |
| 实时指标实现 | [滑动窗口](https://www2.tkn.tu-berlin.de/teaching/rn/animations/gbn_sr/) | 滑动窗口(基于RxJava) |
| 规则配置 | 支持多种数据源 | 支持多种数据源 |
| 扩展性 | 多个扩展点 | 插件形式 |
| 基于注解的支持 | 支持 | 支持 |
| 限流 | 基于QPS、支持基于调用关系的限流 | 优先的支持 |
| 流量整形 | 支持冷启动、排队等待模式 | 不支持 |
| 系统自适应保护 | 支持 | 不支持 |
| 控制台 | 开箱即用、可配置规则、查看秒级监控、机器发现等 | 不完善 |
| 常见框架适配 | Servlet、SpringCloud、Dubbo、gRPC等 | Servlet、SpringCloud Netflix |

在种种差异中，我们重点关注红色标注的部分：
**隔离策略**

- 线程池隔离：同上述线程隔离案例，给不同业务分配不同线程池，这种方案可以杜绝雪崩问题；但是因为tomcat之外的线程池开销也使得系统开销增加，频繁的上下文切换将给系统性能带来额外的损失。
- 信号量隔离：不会给业务单独创建线程池（统一使用tomcat一个容器），而是限制每个业务能使用的线程数量。统计当前业务使用的线程数，当达到指定数量后（类似计数器）触发隔离。相较于线程池隔离性差一点。

**熔断降级策略**

- 慢调用比例/异常比例/异常数：统计调用中慢性能的比例、异常的比例、或异常数量均可触发熔断降级。
- 失败比例：只能根据异常请求比例触发熔断降级策略。

**限流**

- 基于QPS/调用链路：基于调用的QPS、调用链路都可以做到限流。
- 有限的控制：没有专门的限流方案，基于线程池隔离做的，线程池有多少线程数就限制到多少。

**流量整形**

- 慢调用/排队等待：避免突发流量的暴增而引起系统崩溃，而Hystrix则没有解决方案

**控制台**

- Sentinel有较为完善的控制台，界面化操作实时生效，而Hystrix只能查看一下服务状态，不可动态调整。

对比可以发现Hystrix的重点在于隔离、熔断为主的容错机制，而Sentinel的侧重点在于：多样化的流量控制、熔断降级、系统保护、实时监控和控制台。同时基于HyStrix停止维护，加上Sentinel在阿里巴巴经过双十一的高峰流量验证，目前国内主流保护还是选择了后者。因为后续的章节中我们也将借助于Sentinel为大家实践微服务保护相关的知识点。
## 2.2 Sentinel介绍
Sentinel 是面向分布式、多语言异构化服务架构的流量治理组件，主要以流量为切入点，从流量控制、流量路由、熔断降级、系统自适应保护等多个维度来帮助用户保障微服务的稳定性。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673855270417-e1d3e159-bb96-46b1-9b1b-765f322a2a30.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_31%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fefefe&clientId=u9e4a6ca6-f08c-4&from=paste&height=500&id=u6bdb3569&originHeight=500&originWidth=1100&originalType=binary&ratio=1&rotation=0&showTitle=false&size=113253&status=done&style=none&taskId=u609784ab-14dd-4910-8f9f-fd6754a5bbc&title=&width=1100)
**丰富的应用场景**：阿里巴巴 10 年双十一积累的丰富流量场景，包括秒杀、双十一零点持续洪峰、热点商品探测、预热、消息队列削峰填谷等多样化的场景
**易于使用快速接入**：简单易用，开源生态广泛，针对 Dubbo、Spring Cloud、gRPC、Zuul、Reactor、Quarkus 等框架只需要引入适配模块即可快速接入
**多样化的流量控制**：资源粒度、调用关系、指标类型、控制效果等多维度的流量控制
**可视化的监控和规则管理**：简单易用的 Sentinel 控制台
## 2.3 Sentinel本地安装与启动
相较于前面Nacos的下载、shell指令的启动，Sentinel为开发者提供开箱即用的jar包，您可以从 [release 页面](https://github.com/alibaba/Sentinel/releases) 下载最新版本的控制台 jar 包。也可以直接使用提供的：[sentinel-dashboard-1.8.4.jar.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/29688613/1711614790634-675bf543-f8ab-4fad-9587-4379e48e6f6b.zip?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fzip%2F29688613%2F1711614790634-675bf543-f8ab-4fad-9587-4379e48e6f6b.zip%22%2C%22name%22%3A%22sentinel-dashboard-1.8.4.jar.zip%22%2C%22size%22%3A20482357%2C%22ext%22%3A%22zip%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u70913fee-ff00-451b-b7a9-884d4c0002f%22%2C%22taskType%22%3A%22transfer%22%2C%22type%22%3A%22application%2Fzip%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u0698ba23%22%2C%22card%22%3A%22file%22%7D)
> **注意**：启动 Sentinel 控制台需要 JDK 版本为 1.8 及以上版本；jar包需放在非中文路径下

使用指令启动：java -jar sentinel-dashboard.jar
Sentinel同时支持其余配置项来修改启动端口、用户名、密码：

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| server.port | 8080 | 服务端口 |
| server.dashboard.auth.username | sentinel | 默认用户名 |
| server.dashboard.auth.password | sentinel | 默认密码 |

如修改启动端口则可使用下述指令：
```shell
java -Dserver.port=8080 -jar sentinel-dashboard.jar
```
启动后访问控制台：[http://localhost:8080/#/login](http://localhost:8080/#/login)，账户密码均为：sentinel
## 2.4 服务整合Sentinel
### 1 引入Sentinel依赖
在order-service服务中新增sentinel的pom依赖，如下：
```xml
<!--引入Sentinel依赖-->
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```
### 2 配置控制台
```yaml
 spring: 
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
```
### 3 访问验证
> **注意**：服务启动依赖Nacos，需先将Nacos启动：startup.cmd -m standalone

访问order-service服务任意接口：[http://localhost:8088/order/101](http://localhost:8088/order/101)，去控制台实时监控即可查看如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673857705086-582143e4-2285-4562-82c1-ba719672afe5.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fafafa&clientId=u9e4a6ca6-f08c-4&from=paste&height=672&id=u0aa365e2&originHeight=672&originWidth=1570&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97933&status=done&style=none&taskId=ufc1e8b94-6769-4745-90a9-2821d91b13d&title=&width=1570)
# 3.流量控制
前面我们在给出解决方案（流量控制、熔断降级、线程隔离、超时处理）时，引出Sentinel这一技术选型，那么Sentinel是如何做到的呢？在一个调用链路中既然要实现上述方案，必然需要针对调用链路进行监控，从某一个端点对流量做拦截、隔离等处理，这一个链路特征我们叫做：簇点链路。
Sentinel监控SpringMVC的每一个端点（Endpoint），因此SpringMVC的每一个端点（Endpoint）就是调用链路中的一个资源。请求进入微服务时，访问DispatcherServlet，然后进入Controller、Service、Mapper，这样的一个调用链就叫做**簇点链路**。簇点链路中被监控的每一个接口就是一个**资源**。关于资源的进一步了解：[跳转](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/yeq5ax/azoswcli7ho9713b#V9evU)
以上述访问链路为例，其端点对应的就是：/order/{orderId}
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673860061205-f57894d0-08f6-42ee-ad87-4fd6ddcc5ef1.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f9f9&clientId=u9e4a6ca6-f08c-4&from=paste&height=565&id=uee3a7fdc&originHeight=565&originWidth=1506&originalType=binary&ratio=1&rotation=0&showTitle=false&size=94585&status=done&style=none&taskId=ufda30991-85fe-46ce-99bb-5820c9efedd&title=&width=1506)
后续我们的流控、熔断都将针对簇点链路中的资源进行发起。上面操作对应的规则汇总如下：

- 流控：流量控制
- 降级：熔断降级
- 热点：热点参数限流，限流的一种特殊使用场景
- 授权：请求的权限控制
## 3.1 快速上手
点击编辑资源 /order/{orderId} 的流控按钮
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673860679912-372d644c-1209-4622-b0f3-69aaaf8855dd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f8f8&clientId=u9e4a6ca6-f08c-4&from=paste&height=411&id=u1ecb68c7&originHeight=411&originWidth=1513&originalType=binary&ratio=1&rotation=0&showTitle=false&size=81018&status=done&style=none&taskId=u11c54066-13be-4a9b-8f17-8ba75ff060c&title=&width=1513)
弹出表单如下，我们填写单机阈值：1，其含义是：限制资源/order/{orderId} 的QPS为1，即每秒只允许一次请求，超过的请求会被拦截并报错。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673860769471-6590e613-6cdf-498f-97c8-f0f52d44cbae.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8f6f6&clientId=u9e4a6ca6-f08c-4&from=paste&height=392&id=u066bb73b&originHeight=392&originWidth=673&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35253&status=done&style=none&taskId=ud8aaf62e-4510-4ffa-918a-b6703bb35f1&title=&width=673)
当我们快速刷新浏览器时，会发现出现下述错误信息
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673860826949-e56be4de-e6e8-463e-b45e-180ef7cd87e7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_12%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23e3e8ee&clientId=u9e4a6ca6-f08c-4&from=paste&height=125&id=u2b64340b&originHeight=125&originWidth=428&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18086&status=done&style=none&taskId=uc6123f26-294d-443d-8af6-62331aa60ef&title=&width=428)
但一般来说生产的流量要更多，此处我们将借助于一个压测工具：Jmeter做更为全面的压力测试。
### 1 新增限流规则
新增一个流控规则，其QPS为5：![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673860946416-24b9bdcc-9db7-478f-aef9-c544771c6147.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7f6f6&clientId=u9e4a6ca6-f08c-4&from=paste&height=389&id=u1949bd17&originHeight=389&originWidth=677&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34363&status=done&style=none&taskId=u24111c63-3c0e-4b64-b0a3-77fd8c898cb&title=&width=677)
### 2 利用jmeter测试
开始压测之前，对于未使用过Jmeter的可以参考：[Jmeter快速入门](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/yeq5ax/ksygfgyv82qtub2r)
导入提供的测试样例：[sentinel测试.jmx](https://www.yuque.com/attachments/yuque/0/2024/jmx/29688613/1711614790632-94d96603-225a-441d-9802-d5d7df38d3d7.jmx?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fjmx%2F29688613%2F1711614790632-94d96603-225a-441d-9802-d5d7df38d3d7.jmx%22%2C%22name%22%3A%22sentinel%E6%B5%8B%E8%AF%95.jmx%22%2C%22size%22%3A38873%2C%22ext%22%3A%22jmx%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22uae069baf-67a1-4748-9bb8-9f958993a1a%22%2C%22taskType%22%3A%22transfer%22%2C%22type%22%3A%22%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22u346f04d2%22%2C%22card%22%3A%22file%22%7D)，步骤如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673863222627-29182ee3-7dba-4663-b916-be8ad34b6f77.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_32%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23616872&clientId=u8a827063-7302-4&from=paste&height=560&id=udffb69ad&originHeight=560&originWidth=1114&originalType=binary&ratio=1&rotation=0&showTitle=false&size=304601&status=done&style=none&taskId=ucb28379d-e1b8-4fb5-912a-f2647e68cd7&title=&width=1114)
确认一下：“流控入门，QPS<5”的请求路径、端口是否与自己本地一致
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673922715511-a57579a8-5e0d-4db0-bfb3-08ad95337c73.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_82%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%233f4245&clientId=u02b7e5b3-8209-4&from=paste&height=750&id=u241af1cc&originHeight=750&originWidth=2872&originalType=binary&ratio=1&rotation=0&showTitle=false&size=199500&status=done&style=none&taskId=uc405cdc5-3ffd-41ca-803e-f4d86077868&title=&width=2872)
此规则如下：20个请求在2s内执行完成，此时生效的限流规则上面我们配置的为5（每秒最多5个请求通过）
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673922890982-255b0362-9edb-4d5c-b627-84e71863935a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f3f3f3&clientId=u02b7e5b3-8209-4&from=paste&height=962&id=u6249f315&originHeight=962&originWidth=1888&originalType=binary&ratio=1&rotation=0&showTitle=false&size=175340&status=done&style=none&taskId=u71326ea1-9dad-4ee9-874d-564590fae3c&title=&width=1888)
右键启动运行
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673923456915-e97adc1e-44d7-43c6-89a9-0e69836e8148.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23ebebeb&clientId=u02b7e5b3-8209-4&from=paste&height=528&id=u77330410&originHeight=528&originWidth=736&originalType=binary&ratio=1&rotation=0&showTitle=false&size=124899&status=done&style=none&taskId=u94c7acf6-25b6-494c-8953-fe89c609b6d&title=&width=736)
运行启动后会发现每秒能通过的请求最多5个（如下展示可能会乱序，以请求时间为准）：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1673923421852-caa35ed2-df81-4c61-a8f9-c28b555a1e7e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_82%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f5f4f4&clientId=u02b7e5b3-8209-4&from=paste&height=1352&id=ue0b5977f&originHeight=1352&originWidth=2870&originalType=binary&ratio=1&rotation=0&showTitle=false&size=369511&status=done&style=none&taskId=u6f84c890-1603-4da1-bfc4-7e963303a83&title=&width=2870)
此时，我们就完成了流量控制的入门效果，这一效果也是流控模式之一的直接模式。
## 3.2 流控模式
在上面的入门案例之后，我们已经实践了流控模式之一的直接模式，接下来我们将针对剩下的逐一实践。
### 1 直接模式
#### 直接模式是什么
直接模式：针对当前资源的请求，触发阈值时就对当前资源直接限流，也是默认的模式。
#### 直接模式适用于什么场景
对于没有明显差异、特殊化场景的都可以采用直接模式，它更简单易用
#### 直接模式如何实现
参照上述：3.1 快速上手
### 2 关联模式
#### 关联模式是什么
关联模式：统计与当前资源相关的另一个资源(相关或竞争)，触发阈值时对当前资源限流
#### 关联模式适用于什么场景
在一个商城系统中，用户支付时需要修改订单状态，同时用户需要查询订单。查询和修改操作会争抢数据库锁(读速过高影响写、写速过高影响读速度)，争抢本身带来的开销会降低整体吞吐量。此时我们需要优先保证修改订单的功能，对查询对单业务限流。即当A触发条件时，被关联的资源B产生限流。
![ezgif.com-gif-maker (1).gif](https://cdn.nlark.com/yuque/0/2023/gif/1169676/1673926462151-b2bc797b-6bb1-42c2-97d4-88047b4e3696.gif#averageHue=%23fafafa&clientId=u02b7e5b3-8209-4&from=ui&id=uc3c3bece&originHeight=378&originWidth=780&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42079&status=done&style=none&taskId=u879aa9b6-7ace-4aef-9c22-b30bb59bdca&title=)
#### 关联模式如何实现
针对上述场景，我们可以建立新的关联规则如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1674184651074-5c86bb36-da81-414d-8296-484d6a1af75d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f9f9&clientId=u1b841f96-4034-4&from=paste&height=531&id=u46bfbcfd&originHeight=796&originWidth=994&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75031&status=done&style=none&taskId=u973b2778-f945-4569-b3d7-991b052d443&title=&width=662.6666666666666)
其规则含义为：当访问：/write接口的资源量触发阈值时（write有自己的流控规则）对：/read限流，从而避免对：/write资源的影响。下面我们结合实际案例来展开代码的实际编写。

- 在OrderController中新建两个端点(http接口)：/order/query 和 /order/update，不用实现具体细节
- 配置流控规则，当 /order/update 资源被访问的QPS超过5时，对 /order/query 请求限流

**步骤一**：
定义/order/query 端点，模拟订单查询
```java
@GetMapping("/query")
public String queryOrder() {
    return "查询订单成功";
}
```
**步骤二**：
定义/order/update 端点，模拟订单更新
```java
@GetMapping("/update")
public String updateOrder() {
    return "更新订单成功";
}
```
**步骤三**：
重启OrderApplication应用后，浏览器访问端点：[http://localhost:8088/order/query](http://localhost:8088/order/query)、[http://localhost:8088/order/update](http://localhost:8088/order/update)，访问Sentinel控制台，查看到新的端点信息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1675047362289-ab2c41e8-1e12-46eb-8d9f-74ee0f11ca9e.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_46%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fcfcfb&clientId=u0840e739-0b66-4&from=paste&height=321&id=u98c389c7&originHeight=321&originWidth=1623&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34996&status=done&style=none&taskId=uc0b86291-273c-45ca-8995-e3e8c83369a&title=&width=1623)
配置流控规则如下：
> 需注意：我们是针对谁做限流，就点击对应资源的流控按钮，此处我们针对：/order/query

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1675047418590-7f1d85d7-3b50-4590-aa99-7a7ef0d92d0f.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f9f9&clientId=u0840e739-0b66-4&from=paste&height=551&id=u92ab60ec&originHeight=551&originWidth=671&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34513&status=done&style=none&taskId=u87d0776d-316e-412f-9da1-3c0994ad869&title=&width=671)
**步骤四**：
Jmeter压测验证，持续时长100s，qps=10，目的是持续造成超过配置阈值的窗口期，给用户访问验证的时间
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1675047568457-99492300-2564-4d94-b9cc-975f9a2f31bb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_31%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f1f0f0&clientId=u0840e739-0b66-4&from=paste&height=377&id=uee1d63e7&originHeight=377&originWidth=1074&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34444&status=done&style=none&taskId=uc2fd6cfd-4aff-49fc-bacd-0b5af177256&title=&width=1074)
运行后我们浏览器访问：[http://localhost:8088/order/query](http://localhost:8088/order/query)，发现限流成功：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1675047665637-06a5ae40-f51e-4c4f-a4ea-afada6cba583.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_12%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fbfaf8&clientId=u0840e739-0b66-4&from=paste&height=140&id=u70e11561&originHeight=140&originWidth=412&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7388&status=done&style=none&taskId=uc75192f6-4a8b-4161-9a54-8af620659a9&title=&width=412)
### 3 链路模式
#### 链路模式是什么
链路模式：针对从指定链路访问到本资源的请求做统计，判断是否超过阈值
#### 链路模式适用于什么场景
作为业务开发人员，我们有一个订单查询业务，同时输出做页面展现，访问链路：自身系统Controller-->查询订单接口。此时数据团队需要依赖我们的接口做驾驶舱信息，因为我们将查询订单接口暴露给别的团队，即新增一条访问链路：数据团队Controller-->查询订单接口。
自身系统的QPS我们根据压测做过合理评估，但是数据团队的请求我们并未考虑，假设有上万的请求过来，我们自身的系统性能也将收到明显影响。此时我们就需要将来自数据团队的调用加上限流。如下：
![Sentinel限流-链路模式.gif](https://cdn.nlark.com/yuque/0/2023/gif/1169676/1675048938763-fc842152-1d5f-42fa-b95a-a26aab968b59.gif#averageHue=%23f5f5f5&clientId=u0840e739-0b66-4&from=ui&height=499&id=u580c2197&originHeight=996&originWidth=993&originalType=binary&ratio=1&rotation=0&showTitle=false&size=205222&status=done&style=none&taskId=u61cdd5f1-7cd3-475f-bcb4-140cac53920&title=&width=497)
#### 链路模式如何实现
步骤一：OrderService中添加一个queryGoods方法
```java
 public void queryGoods() {
    System.out.println("查询订单成功");
}
```
步骤二：OrderController中，改造/order/query端点，调用OrderService中的queryGoods方法
```java
@GetMapping("/query")
public String queryOrder() {
    orderService.queryGoods();
    return "查询订单成功";
}
```
步骤三：OrderController中添加一个/order/save的端点，调用OrderService的queryGoods方法
```java
@GetMapping("/save")
public String saveOrder() {
    orderService.queryGoods();
    return "存储订单成功";
}
```
步骤四：给queryGoods设置限流规则，从/order/query进入queryGoods的方法限制QPS必须小于2
> 注意：设置规则之前同样需要访问才会产生簇点链路，才可以针对性设置规则，因此需要重启服务+访问新接口

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1675049644527-41cdbcd3-deb3-4e69-9ebd-20f2984e8b7a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23faf9f9&clientId=u0840e739-0b66-4&from=paste&height=549&id=u6c3b0f0d&originHeight=549&originWidth=671&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33759&status=done&style=none&taskId=u15527a29-21e4-4421-b74a-9042a05d553&title=&width=671)
步骤五：启动Jmeter压测，预期/oder/save不受影响，而/order/query最多允许放行流量=2
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1675049746224-8f90766b-69ef-47f2-b57e-6dd5e4c640bd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f1f1f1&clientId=u0840e739-0b66-4&from=paste&height=808&id=u4082b382&originHeight=808&originWidth=1514&originalType=binary&ratio=1&rotation=0&showTitle=false&size=99476&status=done&style=none&taskId=ua65f6b0d-2413-400d-9c02-0804dfc5e18&title=&width=1514)
## 3.3 流控效果
### 1 快速失败
#### 快速失败是什么
快速失败：针对超出限流规则配置阈值的请求，直接拦截并抛出异常
#### 快速失败适用于什么场景
对于无特殊场景都可以采用快速失败
#### 快速失败如何实现
参见上述：3.1 快速上手
### 2 Warm up(预热模式)
#### 预热模式是什么
预热模式：应对服务冷启动的一种方案，对超出阈值的请求同样是拒绝并抛出异常。但这种模式阈值会动态变化，从一个较小值逐渐增加到最大阈值。
请求阈值初始值是 threshold / coldFactor，持续指定时长后，逐渐提高到threshold值。而coldFactor的默认值是3.例如，设置QPS的threshold为10，预热时间为5秒，那么初始阈值就是 10 / 3 ，也就是3，然后在5秒后逐渐增长到10。![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1675050155038-a9b3c0bf-3ca0-42a5-9787-82f16024f66d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_27%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23fefefe&clientId=u0840e739-0b66-4&from=paste&height=421&id=u26be5026&originHeight=421&originWidth=930&originalType=binary&ratio=1&rotation=0&showTitle=false&size=64001&status=done&style=none&taskId=ua9c64354-10b3-4184-a0a0-233ce4b4abe&title=&width=930)
#### 预热模式适用于什么场景
对于大型分布式系统而言，应用启动之初需要连接多个中间件信息，此时如果大量的请求涌入，可能会让应用直接崩溃，从而无法保障系统的稳定性。对于这种模式下我们往往会采用预热模式，给系统一个缓冲时间。
![限流效果-预热模式适用场景.gif](https://cdn.nlark.com/yuque/0/2023/gif/1169676/1675051168941-ce89081f-a4ba-4aac-849f-e326c496851a.gif#averageHue=%23f7f7f7&clientId=u0840e739-0b66-4&from=ui&id=uacaa615c&originHeight=267&originWidth=471&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96067&status=done&style=none&taskId=ua20dc7e1-1dd8-4e3c-9c7f-b781719434d&title=)
