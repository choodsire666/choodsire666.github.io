id: bidah4yzy0ih3lbu
title: idea打war包
date: '2024-05-24 16:19:18'
updated: '2024-05-22 16:19:20'
tags:

- idea

  categories:

  - java后端
---

### 第一种方法

首先模拟,这种离谱情况

- 注意看,现在idea没有识别到---->这个项目是web工程

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241434191.png)

- 我们打开项目结构
  	1. 点击Facets
   	2. 点击加号
   	3. 添加web
   	4. 选择你要添加的模块

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241436675.png)

- 现在你就填加进来了

  1. 然后他会提示需要fix一个错误
  2. 意识是你没有绑定一个Artifacts(用于打包的)
  3. 所以需要创建一个
  4. 直接点击create artifacts
  5. 搞定

  

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241436394.png)

- 现在他运行的非常好
  - 首先看他<output root>下面
  - 有WEB-INF
  - 和resources
  - 呢就没问题了

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241436401.png)



### 第二种方法

- 还是老样子开始

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241434191.png)

- 第一步

  ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241436280.png)

- 然后你的项目就被标记为web项目了

  ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241436895.png)

- 在factes中标记为web项目后

  1. 在如下图所示窗口
  2. 就会出现empty和from modules
  3. 如果没有标记,就看不到一下from moudules
  4. 就算有,点进去也找不到你要的module

  ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241437879.png)

#### 第一种

- 看到,创建了一个unnamed的artifacts. 可以修改名字
- 但是注意看,右边啥也没有

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241437924.png)

- 然后做下面操作

  ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241437012.png)

- 然后就成这

  ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/202405241437073.png)

apply一下就完事了



然后你会说,那还不如第一种.确实.都必须加factes



#### 第二种

标记完了factes

那就直接from module就完事了



### 总结

第一种方法更好用，更便捷