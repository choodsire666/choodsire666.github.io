---
title: Part1
urlname: readme
date: '2024-04-26 16:06:01'
updated: '2024-04-26 16:29:38'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/29688613/1714118762565-8e9f27ad-fd74-4192-bd07-55837a5400d6.png'
description: 功能整理1 前言创作来源于自己项目设计能力太弱，利用技术派深入项目设计。在阅读此整合内容前，你需要下面的能力： 理解Spring的基本知识——IoC、AOP 使用Spring Boot配合MyBatis操作MySQL SQL的基本使用 能够使用Spring Boot搭建一个简单的人员的增删改查...
---
# 功能整理
### 1 前言
创作来源于自己项目设计能力太弱，利用技术派深入项目设计。
在阅读此整合内容前，你需要下面的能力：

- [x]  理解Spring的基本知识——IoC、AOP
- [x]  使用Spring Boot配合MyBatis操作MySQL
- [x]  SQL的基本使用
- [x]  能够使用Spring Boot搭建一个简单的人员的增删改查
- [x]  Redis的基本使用
- [x]  使用Spring Boot的RedisTemplate操作Redis
- [x]  了解Spring AOP
- [x]  观看并掌握语雀的技术派的基础篇内容

为了你良好的Markdown的阅读体验，请使用Typora并使用Pixyll主题观看。
为了你良好的阅读体验，请使用100%的字体比例。
该文档**完全免费**用于社区分享和个人使用，你可以修改内部任意的内容发布到社区中。
此篇文章会自动省略某些简化操作的知识。例如MyBatis-Plus、Knife4j、MapStruct，这些内容和整体项目无关。
次文档分为四个部分：

- **版本1**：【已完成】使用简单的Spring Boot+MySQL，实现基本的业务需求。
- **版本2**：【已完成】使用Redis、Caffine等缓存工具，提高项目的并发能力，扩充部分业务。
- **版本3**：【未完成】使用MQ、ElasticSearch，优化项目结构和提供更优的搜索功能。
- **代码重构部分**：【部分完成】因为技术派存在个人认为设计不足的地方，该部分写出重构思路和代码。
### 2 使用Tips

- 你可以在IDEA中【双击Shift】通过类名查询某一个类的源代码。
- 你可以使用【长按Ctrl+鼠标左键点击】某一个类/方法，查看其使用源头。
### 3 文章规范
【01】英文和中文没有空格。
【02】尽量不使用图片。
【03】“ps”部分代表内容的补充，和原文保持一定的逻辑。
【04】“引用”部分代表个人编写该部分的想法。
【05】代码块中的“...”代表代码的省略。
【06】当描述“某个类的方法”时会在其后面添加“()”符号；当描述“某个的方法为事务”时，会在“事务”前面添加“@”符号。
例如：A的lalala()方法是@事务的。
【07】具有先后顺序使用“数字列表”。
【08】具有并列关系的内容使用“无序列表”。
【09】所有列表的“句子”都使用“句号”结束；词语则不使用符号。
【10】“加粗”的目的是醒目某些字体。
【11】对于所有Service类，主要针对其实现类，而不是针对抽象类。

---

### 1 前言
下面是基础的业务需求，由简单的Spring Boot+MySQL实现。
技术派是一个社区项目，本质上是任何用户都可以发布帖子（博客），然后其余用户观看和评论。具体设计下面的模块：

- 用户模块：主要做用户的信息管理，包括用户的基本信息、注册登陆。
- 文章模块：主要做文章的信息管理，包括文章的基本信息、文章的审查。
- 评论模块：主要做文章的评论的信息管理，包括文章的的基本信息。
- 消息模块：主要做交互的消息管理，包括用户-用户和系统-用户，消息发送和通知。
- 通用模块：主要做整个网站运营的其他需求，包括阅读计数、pv/uv、全局字典、图片上传、文章搜索等。

技术派分成了几个模块：

- api：这个模块主要是设计PO类，例如DO（Domain Object，领域对象）。这些类打包后，给其他模块导入，这样可以为后续的微服务开道。
- core：这个模块主要是做工具配置，例如缓存的配置、线程池的配置、IP分析的配置等等。
- service：这个模块是做功能的实现逻辑，里面会用到api内部的PO类和core中的工具。
- ui：这个是基于jsp的模块，就把它看作是一个前端项目即可。ps：后端人员无需看这一部分。
- web：这个模块是开辟HTTP接口的模块，接受客户端的请求，然后处理逻辑。

下面抽象模型：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/0b9f381d9070c65bb051fe33331c3410.png)
**除了业务的增删改查（Create Retrieve Update Delete，下面简称CRUD）**，下面为每个模块具体探讨。
### 2 用户模块
#### 2.1 注册登录
**需求**：用户的注册和登录账号。
**数据表**：user表
**实现逻辑**：

- 用户名+密码
- 微信公众号+验证码+SSE长链接
#### 2.2 权限管理
**需求**：某些操作需要权限，执行前获取用户的权限，然后鉴权决定是否放行。
**数据表**：user_info表
**实现逻辑**：

- token内部存储用户id。
- 使用Filter分析token，获取用户id，然后用户id从获取数据库的用户信息（包括权限），放入ThreadLocal中。
- 面对需要权限的接口，使用Interceptor拦截器过滤。
#### 2.3 订阅关注
**需求**：用户关注某些博主。
**数据表**：user_relation表
**实现逻辑**：

- CRUD
#### 2.4 用户轨迹
**需求**：记录用户的“阅读/收藏/点赞”“文章/评论”，用于记录信息。
**数据表**：user_foot表
**实现逻辑**：

1. 当用户触发某些事件时，通过事件监听机制，将事件放入线程池中异步添加。
2. 下游业务（即监听器）对事件做出响应。
### 3 文章模块
#### 3.1 文章设计
**需求**：将文章分为元信息和文章内容，能够保证文章的版本变化。
**数据表**：article表、article_detail表
**实现逻辑**：

- CRUD

**需求**：将文章分类为不同的类型，方便推荐。文章元信息内部自带文章分类。每个文章只能有一个分类。
**数据表**：category表
**实现逻辑**：

- CRUD

**需求**：文章带有不同的标签，方便推荐。每个文章可以包含多个标签。
**数据表**：tag表、artical_tag表
**实现逻辑**：

- CRUD
#### 3.2 文章发布
**需求**：用户发布文章，需要先通过图片转链，然后上传，审核，公开。
**数据表**：article表
**实现逻辑**：

1. 图片转链
2. 创建文章（审核状态）
3. 文章公开（公开状态）
#### 3.3 专栏
**需求**：专栏为多个文章的集合，方便统一管理和使用。
**数据表**：column_info表、column_article表
**实现逻辑**：

- CRUD
### 4 评论模块
#### 4.1 评论内容
**需求**：获取某个文章的评论内容。
**数据表**：comment表
**实现逻辑**：

- CRUD
#### 4.2 评论点赞
**需求**：获取某个评论的点赞量。
**数据表**：user_foot表
**实现逻辑**：

- 直接使用count函数即可。
### 5 消息模块
#### 5.1 消息内容
**需求**：获取某个用户的消息内容。
**数据表**：notify_msg表
**实现逻辑**：

- CRUD
#### 5.2 消息发布
**需求**：当需要向目标用户发送消息时，对目标用户是无感的。
**数据表**：notify_msg表、user_foot表
**实现逻辑**：

- 当触发用户触发事件时，通过事件监听机制，采用线程池异步添加信息。
### 6 通用模块
#### 6.1 阅读计数
**需求**：文章/评论的阅读量计数。
**数据表**：read_count表
**实现逻辑**：

- 当文章被请求时，通过事件监听机制，采用线程池异步增加阅读量
- 获取时，返回阅读量即可。
#### 6.2 pv/uv
**需求**：获取网站的Page View/User View
**数据表**：request_count表
**实现逻辑**：

- 在Filter层进行拦截，对根据用户信息进行计数
#### 6.3 全局字典
**需求**：网站的一些证书或者说明需要灵活修改，放入到数据库中即可查询
**数据表**：dict_common
**实现逻辑**：

- CRUD
#### 6.4 图片上传
**需求**：博客上传之后，需要转链对应的图片，然后将图片下载
**数据表**：磁盘存储
**实现逻辑**：

1. 安全校验
2. 保存
#### 6.5 搜索
**需求**：使用文本搜索title，提供推荐内容
**数据表**：article表
**实现逻辑**：

- 使用数据库模糊查询。
# 注册登录具体实现
## 设计思路
**需求**：用户的注册和登录账号。
**数据表**：user表
**实现逻辑**：

- 用户名+密码
- 微信公众号+验证码+SSE连接

ps：我会主动省略关于星球、AI以及邀请码相关的信息，因为它们暂时不重要。
## 实现逻辑
### 密码登录
# 

---

#### 1 封装类
技术派创建了UserPwdLoginReq类，用于存储密码登录相关信息，成员变量如下：

- userId
- username
- password
- starNumber（与该篇内容无关）
- invitationCode（与该篇内容无关）

---

#### 2 注册
调用逻辑：

- 在LoginRestController的register()方法中实现了注册的HTTP接口。
- register()方法调用了LoginService的registerByUserPwd()方法，进入业务逻辑部分。
- registerByUserPwd()方法调用了RegisterService的registerByUserNameAndPassword()方法，该方法是@事务的。

具体逻辑如下：
**1. Controller层接收UserPwdLoginReq，传递到Service层。**
```java
@PostMapping("/login/register")
public ResVo<Boolean> register(UserPwdLoginReq loginReq, HttpServletResponse response) {
    String session = loginService.registerByUserPwd(loginReq);// <==进入service层@Azien
    if (StringUtils.isNotBlank(session)) {
        // cookie中写入用户登录信息，用于身份识别
        response.addCookie(SessionUtil.newCookie(LoginService.SESSION_KEY, session));
        return ResVo.ok(true);
    } else {
        return ResVo.fail(StatusEnum.LOGIN_FAILED_MIXED, "用户名和密码登录异常，请稍后重试");
    }
}
```
**2. 首先到达的是LoginService，这一层主要以用户状态判断来执行分流操作，比如用户已经登陆但是想绑定账号，或者单纯想使用账号密码登录。**（其实没看懂为什么要绑定，可能是这个接口在其他地方被重复使用了，业务逻辑有点乱）
**3. LoginService具体调用了RegisterService的registerByUserNameAndPassword()方法做真正的注册。**
```java
public String registerByUserPwd(UserPwdLoginReq loginReq) {
    // 1. 前置校验，检查星球和邀请码是否准确
    registerPreCheck(loginReq);

    // 2. 判断当前用户是否登录，若已经登录，则直接走绑定流程
    Long userId = ReqInfoContext.getReqInfo().getUserId();
    loginReq.setUserId(userId);
    if (userId != null) {
        // 2.1 如果用户已经登录，则走绑定用户信息流程
        userService.bindUserInfo(loginReq);
        return ReqInfoContext.getReqInfo().getSession();
    }


    // 3. 尝试使用用户名进行登录，若成功，则依然走绑定流程（没看懂@Aizen）
    UserDO user = userDao.getUserByUserName(loginReq.getUsername());
    if (user != null) {
        if (!userPwdEncoder.match(loginReq.getPassword(), user.getPassword())) {
            // 3.1 用户名已经存在
            throw ExceptionUtil.of(StatusEnum.USER_LOGIN_NAME_REPEAT, loginReq.getUsername());
        }

        // 3.2 用户存在，尝试走绑定流程
        userId = user.getId();
        loginReq.setUserId(userId);
        userAiService.initOrUpdateAiInfo(loginReq);
    } else {
        //4. 走用户注册流程
        userId = registerService.registerByUserNameAndPassword(loginReq);// <==进入注册流程@Aizen
    }
    ReqInfoContext.getReqInfo().setUserId(userId);
    return userSessionHelper.genSession(userId);
}
```
**4. 进入真正的注册流程。**
```java
@Transactional(rollbackFor = Exception.class)
public Long registerByUserNameAndPassword(UserPwdLoginReq loginReq) {
    // 1. 判断用户名是否准确
    UserDO user = userDao.getUserByUserName(loginReq.getUsername());
    if (user != null) {
        throw ExceptionUtil.of(StatusEnum.USER_LOGIN_NAME_REPEAT, loginReq.getUsername());
    }

    // 2. 保存用户登录信息
    user = new UserDO();
    user.setUserName(loginReq.getUsername());
    user.setPassword(userPwdEncoder.encPwd(loginReq.getPassword()));
    user.setThirdAccountId("");
    // 用户名密码注册
    user.setLoginType(LoginTypeEnum.USER_PWD.getType());
    userDao.saveUser(user);

    // 3. 保存用户信息
    UserInfoDO userInfo = new UserInfoDO();
    userInfo.setUserId(user.getId());
    userInfo.setUserName(loginReq.getUsername());
    userInfo.setPhoto(UserRandomGenHelper.genAvatar());
    userDao.save(userInfo);

    // 4. 保存ai相互信息
    UserAiDO userAiDO = UserAiConverter.initAi(user.getId(), loginReq.getStarNumber());
    userAiDao.saveOrUpdateAiBindInfo(userAiDO, loginReq.getInvitationCode());
    processAfterUserRegister(user.getId());
    return user.getId();
}
```
逻辑如下：

1. 查询用户名是否存在，假如存在则抛出一个用户名重复的异常，这些异常会被统一管理然后返回结果码。
2. 通过MD5加盐编码的方式进行密码加密。
3. 创建一个用户DO，将需要的信息放入DO中，保存至数据库。
4. 创建一个用户信息DO，将需要的信息放入DO中，保存至数据库。
5. 异步发布一个用户注册事件，是为了后续给一个欢迎的系统消息。
6. 返回用户的id至LoginService。

**5. LoginService得到用户id后，会生成token，返回至Controller层。**
**6. Controller层添加token至Cookie中。**
```java
...
{
    //4. 走用户注册流程
    userId = registerService.registerByUserNameAndPassword(loginReq);// <==进入注册流程@Aizen
}
ReqInfoContext.getReqInfo().setUserId(userId);
return userSessionHelper.genSession(userId);
```
```java
String session = loginService.registerByUserPwd(loginReq);// <==进入service层@Azien
if (StringUtils.isNotBlank(session)) {
    // cookie中写入用户登录信息，用于身份识别
    response.addCookie(SessionUtil.newCookie(LoginService.SESSION_KEY, session));
    return ResVo.ok(true);
} else {
    return ResVo.fail(StatusEnum.LOGIN_FAILED_MIXED, "用户名和密码登录异常，请稍后重试");
}
```
**补充信息**：

- **RegisterService的registerByUserNameAndPassword()方法**调用了processAfterUserRegister()方法，此方法会利用事务工具发布一个异步的注册事件。当方法是事务时，事件发布后无法回收。则需要用额外的事务判定机制，能够判定调用该方法的任务是否在事务中。该实现逻辑为：
   - 假如事务正常结束，则发送事件。
   - 若未结束，则注册一个任务，等到事务提交前触发。
```java
// 处于事务中
if (TransactionSynchronizationManager.isSynchronizationActive()) {
    // 等事务提交前执行，发生错误会回滚事务
    TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
        @Override
        public void beforeCommit(boolean readOnly) {
            runnable.run();
        }
    });
} else {
    // 马上执行
    runnable.run();
}
```
其中TransactionSynchronizationManager是官方提供的事务管理类。

- [JWT的原理](https://blog.csdn.net/qq_41688840/article/details/108810489)

**吐槽一下**：

- 细想一下，其实没必要使用上述的异步发布事件，因为能够执行到这里，即代表了整个流程正常，发布事件即可（当然也说不准）。ps：这种方法还可以用来做“消息队列的分布式事务”。
- 整理的流程有些复杂了，个人认为，注册的做注册的事情即可。其余的绑定内容可以在绑定页面去额外开辟接口。
- 这里没有额外的密码限制验证，例如必须要数字+大小写字母等等，前后端都需要进行验证才能够完全保证接口安全。

---

#### 3 登录
调用逻辑：

- 在LoginRestController的login()方法中提供了密码登陆的HTTP接口。
- login()方法调用了LoginService的loginByUserPwd()方法，进入业务逻辑处理。

具体逻辑：
**1. Controller层接收username和password。**
```java
@PostMapping("/login/username")
public ResVo<Boolean> login(@RequestParam(name = "username") String username,
                            @RequestParam(name = "password") String password,
                            HttpServletResponse response) {
    String session = loginService.loginByUserPwd(username, password);// <==进入service层@Aizen
    if (StringUtils.isNotBlank(session)) {
        // cookie中写入用户登录信息，用于身份识别
        response.addCookie(SessionUtil.newCookie(LoginService.SESSION_KEY, session));
        return ResVo.ok(true);
    } else {
        return ResVo.fail(StatusEnum.LOGIN_FAILED_MIXED, "用户名和密码登录异常，请稍后重试");
    }
}
```
**2. 通过username获取用户DO。**
**3. 假如用户DO不存在，则抛出一个用户名不存在的异常。**
**4. 将password通过MD5加盐编码的方式，比对和数据库得到的密码是否正确，不正确则抛出一个密码不正确的异常。**
**5. 根据userId生成token，返回至Controller层。**
```java
public String loginByUserPwd(String username, String password) {
    UserDO user = userDao.getUserByUserName(username);
    if (user == null) {
        throw ExceptionUtil.of(StatusEnum.USER_NOT_EXISTS, "userName=" + username);
    }

    if (!userPwdEncoder.match(password, user.getPassword())) {
        throw ExceptionUtil.of(StatusEnum.USER_PWD_ERROR);
    }

    Long userId = user.getId();
    ...

    // 登录成功，返回对应的session
    ReqInfoContext.getReqInfo().setUserId(userId);
    return userSessionHelper.genSession(userId);
}
```
Controller层保存至Session中。
#### 4 登出
登出的设计很简单：前端直接删除Cookie中的token即可。
**补充信息**：因为此时是1.0版本，所以不会涉及更多的工具使用，只把其当做简单的数据库增删改查即可。后续使用了Redis可以强化这一部分。
### 微信公众号
注意：在这个流程中，注册和登录是放在一起的。
该部分面试官问得最多，也是面试官最感兴趣的部分。各位先看源码再看我的总结也可以。[@Aizen](/Aizen )

---

#### 1 需要提前知道的知识
整体流程中，需要先了解下面类，才能够更好地理解流程：

- **验证码生成器**：用于生成验证码，具体的实现是CodeGenerateUtil类，这个类生成的逻辑很简单，就是随机产出一些数字。
- **LoadingCache类**：一个key-value结构的缓存池。其特性如下： 
   - 可以配置value的缓存时间。超时的key-value会过期，过期的key-value会被自动释放（底层是利用了一个线程来维护），无法通过get()获取。
   - 当用户获取的value时，假如不存在则会调用自定义的load()方法获取value，并放入缓存池中。
- **接收微信的信息**：服务端需要开放一个接口，该接口的URL需要在公众号后端配置，技术派为“wx/callback”。你可以在[知乎](https://zhuanlan.zhihu.com/p/31157348)看到更详细的内容。你可以在WxCallbackRestController类中看到具体的接口信息。该接口需要提供两个方法： 
   - GET方法为心跳策略，检测服务端是否可用。
   - POST方法用于接收“用户对微信公众号发送的消息”。根据这个方法可以接收到用户的微信信息和用户发送的内容。
- **长连接**：SSE协议（Serve-Send Events），一个基于HTTP的协议，能够保持长连接并且服务端能够主动推送信息给客户端。具体信息可以查看[什么是SSE？](https://zhuanlan.zhihu.com/p/21308648)以及[如何在Spring Boot使用SSE？](https://juejin.cn/post/7195496297151266877)。通过SSE能够实现当用户发送验证码后自动跳转。
- **设备id**：技术派在Filter设置了拦截，会在用户的Cookie中存放“设备id”。当请求中没有“设备id”时，会使用UUID随机提前生成一个“设备id”添加到用户的Cookie中，这样，后续的请求都会附带“设备id”，以识别多个请求是否来自于同一个主机。你可以在ReqRecordFilter的getOrInitDeviceId()方法中看到具体的逻辑。

---

#### 2 登录流程
调用逻辑：

- WxCallbackRestController的callBack()方法提供了微信消息接收的接口。
- callBack()方法调用了WxAckHelper的buildResponseBody()方法引入了登陆的接口。
- buildResponseBody()方法调用了WxLoginHelper的login()方法实现的登陆流程。
- 具体的实现流程都在buildResponseBody()方法中。

因为该流程涉及多个类，调用复杂，推荐大家看源码，所以只给出大致的实现流程（ps：“XX->YY”代表XX向YY进行某些操作）：

1. **用户客户端->服务端**：当用户在登录页面请求进行“微信登录”时，会返回“公众号二维码”和“验证码”（使用验证码生成器生成验证码），并建立一个长连接，服务端将其放入“验证码-长连接缓存池”中。
2. **用户手机->微信服务器**：用户扫描二维码，关注公众号，然后输入验证码，微信服务器收到数据，转发给服务端。
3. **微信服务器->服务端**：服务端接收到微信服务器的文字，过滤后，调用登陆操作。
4. **服务端**：初始化“发送验证码的微信用户”的账号信息，若没有则进行自动注册。同时将得到的具体信息放入请求上下文中，即某一个ThreadLocal封装类。（不建议还没有校验就初始化）
5. **服务端**：通过“验证码-长连接缓存池”，查找建立的长连接。若长连接已失效或不存在，则验证码过期，此时服务端利用接口返回信息到微信服务器，微信服务器通过公众号响应文本——“验证码过期”。
6. **服务端->用户客户端**：服务端得到长连接后，返回生成的token和Cookie的路径，前端会将其当做Cookie处理。
7. **服务端->用户客户端**：断开长连接。
8. **服务端**：删除“验证码-长连接缓存池”中的缓存。

---

#### 3 刷新验证码
技术派提供了“刷新验证码”机制，用户可以点击二维码下面的“刷新验证码”以刷新验证码，当用户刷新验证码时，会向对应的接口进行请求。你可以在WxLoginController的refresh()方法看到具体信息。
同时，为了保证同一个设备多次请求验证码的结果一致，设置了“设备id-验证码缓存池”，获取验证码时，优先通过设备id获取。其定义如下：
```java
deviceCodeCache = CacheBuilder.newBuilder()
    .maximumSize(300)
    .expireAfterWrite(5, TimeUnit.MINUTES)
    .build(new CacheLoader<String, String>() {
    @Override
    public String load(String s) {
        int cnt = 0;
        while (true) {
            String code = CodeGenerateUtil.genCode(cnt++);
            if (!verifyCodeCache.asMap().containsKey(code)) {
                return code;
            }
        }
    }
});
```
刷新验证码的大致流程如下：

1. 得到设备id。
2. 通过“设备id-验证码缓存池”，得到旧验证码。
3. 通过旧验证码得到连接。假如验证码/连接失效，则刷新失败，返回null。
4. 删除“验证码-长连接缓存池”中的旧数据。
5. 生成一个新的验证码，通过连接发送至用户。
6. 将新数据放入“验证码-长连接缓存池”中。
7. 更新“设备id-验证码缓存池”的数据。

---

#### 4 其他信息
**补充信息**：

- 在“微信服务器->服务端”（即服务端接受微信公众号消息）中，具体的处理如下（不确定）： 
   1. 微信服务器收到用户输入的内容后，先向服务端进行token验证，确保接口可用。
   2. 然后将用户内容以及微信id等信息封装返回给服务端，服务端存在一个接口用于接受用户对公众号发送的信息，检查是否为验证码。
   3. 通过唯一微信id自动创建一个用户，并通过长连接将其的token返回给前端，为了后面鉴权身份验证，就可自动登录。
- 你可以在WxLoginHelper类的subscribe()方法中看到长连接的配置信息： 
   - 当断开/异常时：删除“验证码-长连接缓存池”中的缓存。
   - 超时时间设置为：15 mins
- 在长连接中，前后端的交互其实只有简单的文本传输，具体的类型识别是由“type#info”（例如“token#lalala”）这种“文本规定”来实现的。也可以自定义事件类型实现。
- 在建立长连接时，服务端会提前从“设备id-验证码”缓存池中查看用户是否已经生成了验证码，假如存在，则代表用户过去已经建立过长连接（比如刷新网页，重新开一个网页等等），然后将新的长连接更新到“验证码-长连接缓存池”中。但值得一提的是，这个功能只是“保证服务端同步最新的长连接到缓存池中”，和“刷新验证码机制”完全没有关系。

**吐槽一下**：

- 整个流程的耦合性很强。对于SSE长连接应该写成一个Util建立。以方便后续使用。
- 整个流程中，当用户发送验证码后，还未保证验证码或对应长连接可用，就直接为用户注册了账号，这里存在一个设计得比较别扭的地方。但虽然别扭，但也符合需求。
- 对于微信的接受消息我认为可以优化一下，对于可操作文本建立前缀树，然后使用策略模式提供对于用户发的文本提供处理。
# 权限管理具体实现
## 设计思路
**需求**：某些操作需要权限，执行前分析用户的权限，然后鉴权。
**数据表**：user_info表
**实现逻辑**：

- token内部存储用户id。
- 使用Filter分析token，获取用户id，然后通过获取数据库的用户权限，放入ThreadLocal中。
- 面对需要权限的接口，使用Interceptor拦截器过滤。
## 代码实现

---

#### 1 使用效果
下面是一个使用的例子：
```java
@Permission(role = UserRole.ADMIN)
@GetMapping(path = "operate")
public ResVo<String> operate(@RequestParam(name = "articleId") Long articleId, @RequestParam(name = "operateType") Integer operateType) {
    OperateArticleEnum operate = OperateArticleEnum.fromCode(operateType);
    if (operate == OperateArticleEnum.EMPTY) {
        return ResVo.fail(StatusEnum.ILLEGAL_ARGUMENTS_MIXED, operateType + "非法");
    }
    articleSettingService.operateArticle(articleId, operate);
    return ResVo.ok("ok");
}
```
其中@Permission就是所定义的注解：
```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Permission {
    UserRole role() default UserRole.ALL;
}
```
```java
public enum UserRole {
    ADMIN,
    LOGIN,
    ALL;
}
```

---

#### 2 获取用户权限
在Filter中进行了信息的初始化：
```java
private HttpServletRequest initReqInfo(HttpServletRequest request, HttpServletResponse response) {
    if (isStaticURI(request)) return request;
    ...
    ReqInfoContext.ReqInfo reqInfo = new ReqInfoContext.ReqInfo();
    globalInitService.initLoginUser(reqInfo);// <==进入初始化@Aizen
    ReqInfoContext.addReqInfo(reqInfo);
    ...
    return request;
}
```
具体的初始化使用的globalInitService的initLoginUser()方法，源码如下：
```java
public void initLoginUser(ReqInfoContext.ReqInfo reqInfo) {
    HttpServletRequest request =
        ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    if (request.getCookies() == null) return;
    
    Optional
        .ofNullable(SessionUtil.findCookieByName(request, LoginService.SESSION_KEY))// 尝试获取token
        .ifPresent(cookie -> initLoginUser(cookie.getValue(), reqInfo));// 假如有则初始化
}

public void initLoginUser(String session, ReqInfoContext.ReqInfo reqInfo) {
    BaseUserInfoDTO user = userService.getAndUpdateUserIpInfoBySessionId(session, null);// <==进入操作阶段
    reqInfo.setSession(session);
    if (user != null) {
        reqInfo.setUserId(user.getUserId());
        reqInfo.setUser(user);
        reqInfo.setMsgNum(notifyService.queryUserNotifyMsgCount(user.getUserId()));
    }
}
```
在userService.getAndUpdateUserIpInfoBySessionId()方法中，实现如下：
```java
public BaseUserInfoDTO getAndUpdateUserIpInfoBySessionId(String session, String clientIp) {
    if (StringUtils.isBlank(session)) return null;

    Long userId = userSessionHelper.getUserIdBySession(session);// 分析token
    if (userId == null) return null;
    ...
    UserInfoDO user = userDao.getByUserId(userId);// 通过数据库获取用户信息
    ...
    return user;
}
```
分析token使用的UserSessionHelper的getUserIdBySession()方法如下：
```java
public Long getUserIdBySession(String session) {
    // jwt的校验方式，如果token非法或者过期，则直接验签失败
    try {
        DecodedJWT decodedJWT = verifier.verify(session);
        String pay = new String(Base64Utils.decodeFromString(decodedJWT.getPayload()));
        // jwt验证通过，获取对应的userId
        String userId = String.valueOf(JsonUtil.toObj(pay, HashMap.class).get("u"));

        return Long.valueOf(user);
    } catch (Exception e) {
        log.info("jwt token校验失败! token: {}, msg: {}", session, e.getMessage());
        return null;
    }
}
```
由此，在UserInfoContext中，初始化了UserInfo，但是假如没有该用户，则此时UserInfo内部信息是空的。
总结如下：

1. 在filter层中先判断Cookie中是否存在token，有则获取。否则上下文中有关用户信息就是空的。
2. 获得token，调用UserSessionHelper的getUserIdBySession()方法将token进行解析，获得payload部分中存储的userId。
3. 如果获得userId没有失效，就通过userId在数据库中获得用户信息，并存入上下文中。

**补充信息**：这里的UserSessionHelper其实就是token的管理，在我看来很别扭，是因为在技术派中，是将token存入Cookie，其中Cookie是存储在用户本地的信息，会随着请求发送，前端不需要做额外操作；但是在一般情况下，token会放入请求头的Authoration部分，由前端请求时设置，而不是默认发送。（技术派的文档里面也提到这一点，好像是因为这个是前后端一体的缘故）
**吐槽一下**：

- 当用户token校验失败时，技术派一路上返回的null，这样写会导致后期的维护困难。下面两个方法：
   - 抛出异常。
   - 当用户未登录时，也应该赋给用户一个未登录的状态例如“UnLoged/Unverified”。
- 我个人建议，在token中放入用户的权限。像技术派这样每次都使用数据库已经偏离了token无状态的优势了。

---

#### 3 权限过滤
具体使用的是HandlerInterceptor接口实现权限过滤，具体实现如下：
```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
    throws Exception {
    if (handler instanceof HandlerMethod) {
        // 1. 得到接口需要的权限信息
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Permission permission = handlerMethod.getMethod().getAnnotation(Permission.class);
        if (permission == null) {// 兼容类的权限设置
            permission = handlerMethod.getBeanType().getAnnotation(Permission.class);
        }

        // 2. 当访问“不需要权限的接口”时
        if (permission == null || permission.role() == UserRole.ALL) {
            // 对有身份的用户执行活跃度增加
            if (ReqInfoContext.getReqInfo() != null) {
                SpringUtil.getBean(UserActivityRankService.class).
                    addActivityScore(
                    	ReqInfoContext.getReqInfo().getUserId(),
                    	new ActivityScoreBo().setPath(ReqInfoContext.getReqInfo().getPath()));
            }
            return true;
        }
        
        // 3. 当访问“需要权限的接口”时
        // 3.1 对游客执行以下操作
        if (ReqInfoContext.getReqInfo() == null || ReqInfoContext.getReqInfo().getUserId() == null) {
            if (handlerMethod.getMethod().getAnnotation(ResponseBody.class) != null ||
                // 3.1.1 访问需要登录的rest接口，直接返回错误信息
                handlerMethod.getMethod().getDeclaringClass().getAnnotation(RestController.class) != null) {
                response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
                response.getWriter().println(JsonUtil.toStr(ResVo.fail(StatusEnum.FORBID_NOTLOGIN)));
                response.getWriter().flush();
                return false;
            } else if (request.getRequestURI().startsWith("/api/admin/") ||
                       request.getRequestURI().startsWith("/admin/")) {
                // 3.1.2 访问的是admin接口
                response.sendRedirect("/admin");
            } else {
                // 3.1.3 访问需要登录的页面时，直接跳转到登录界面
                response.sendRedirect("/");
            }
            return false;
        }
        // 3.2 对不是管理员的用户执行以下操作
        if (permission.role() == UserRole.ADMIN &&
            !UserRole.ADMIN.name().equalsIgnoreCase(ReqInfoContext.getReqInfo().getUser().getRole())) {
            // 设置为无权限
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return false;
        }
    }
    return true;
}
```
**补充信息**：

- 只有当Interceptor的preHandle()方法（即上面的方法）返回true时，后续的handler才会继续执行；否则返回当前的Response。
- 技术派实现的AsyncHandlerInterceptor接口，相比较一般的HandlerInterceptor接口，能够拦截异步操作。

**吐槽一下**：

- 使用Interceptor的拦截固然很好，但是整体的框架设计存在问题。不建议将权限的过滤和其他业务逻辑参杂在一起，这样方法会导致后期的维护困难。简易分离权限和其他业务，或者使用更加有效的权限框架来处理。
- 批评一下，这里的代码有点乱，注释有点看不懂，我花时间整理了一下才明白。下面这样写可能会好很多：
```java
UserRole userRole = ...;
UserRole needRole = ...;
return switch (needRole) {
    case ALL -> doAll(userRole, reponse);
    case USER -> doUser(userRole, reponse);
    case ADMIN -> doAdmin(userRole, reponse);
    default throw new UnreachableException("...");
};
```
```java
private Permission analysePermission(...) {...}
private boolean doAll(...) {...}
private boolean doUser(...) {...}
private boolean doAdmin(...) {...}
```

---

#### 4 Spring Security的设计
感觉整体的设计很模糊，这里提一下Spring Security的设计。
下面是Spring Security的设计图：
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/d5e214dff29ac4796546973469ae6988.png)

- **用户安全信息管理**：关于安全的内容由SecurityContextHolder类来保存，内部由ThreadLocal实现，包括用户的角色、权限、账号和密码等。
- **安全检验入口**：由一个Filter（Servlet的Filter类，为图片中的DelegatingFilterProxy）执行信息处理，这是一个执行链的入口，用于开启执行一系列的链式安全检验。进入某个SecurityFilter后，如果不满足具体的执行前提，会交给下一个SecurityFilter进行处理。
- **安全检验逻辑**：
   - 对于安全检验的SecurityFilter，会检查SecurityContextHolder中是否存在用户信息，存在则表示已经通过安全校验，否则会执行相关的安全检验，例如账号密码登录、通过token登录等。当通过安全检验时，会将具体的安全信息放入SecurityContextHolder中。
   - 当某个SecurityFilter发现权限不通过，例如密码错误时，会抛出对应异常。这个异常由“执行链靠前的异常捕获Filter”捕获，并调用相关的类执行处理。大概代码逻辑如下：
```java
try {
    next.dofilter(...);
} catch (WrongPasswordException e) {
    wrongPasswordHandler.handle(e);
} catch (...) {
    ...
}
```
在Spring Securiy框架中，没有提供关于token操作的SecurityFilter，需要用户自定义。
当调用需要权限的方法时，Spring Security提供了对应的注解，本质上会使用由Spring AOP实现的具体的权限分析和管理（不确定，也可能是Interceptor），会抛出对应异常。关于Spring Security的详细使用内容可以看我在知识星球发过的[文档](https://wx.zsxq.com/dweb2/index/topic_detail/211242288522241)。
# 用户操作追踪具体实现
## 设计思路
**需求**：记录用户的“阅读/收藏/点赞”“文章/评论”，用于记录信息。
**数据表**：user_foot表
**实现逻辑**：

1. 当用户触发某些事件时，通过事件监听机制，将事件放入线程池中异步添加。
2. 下游业务（即监听器）对事件做出响应。
## 数据库表的设计

---

#### 1 技术派的设计
在技术派中，user_foot表其实更像是user_document表，用于描述user和评论/文章的关系。列有如下：

- id
- user_id
- document_id
- document_type
- document_user_id（应该是document_owner_id）
- collection_stat
- read_stat
- somment_stat
- praise_stat
- create_time
- update_time

这样设计表的好处很多，可以直接获取某一个用户对评论/文章的操作，加上冗余的document_user_owner信息，同时能够更好地执行通知操作。

---

#### 2 额外的设计方法
对于用户操作追踪，其实还可以有下面的设计：

- id
- user_id
- document_id
- operation_type
- create_time
- update_time

这样的设计，可以说是更符合user_foot设定，同时，若需要获取用户对某一个用户是否点赞+浏览+收藏信息，则使用下面的SQL获取，然后过滤得到DO：
```sql
SELECT operation_type FROM user_foot
WHERE user_id = #{user_id}
AND document_id = #{document_id}
```
但是这种频繁添加和删除的表，会导致对应的查询变慢，同时，重复的冗余部分也会导致数据量暴增，而技术派设计的表可以保证一条记录就能体现用户对文章/评论的所有操作。

---

#### 3 总结
相比较技术派的设计，但其实更好的是，将文章和评论分开存储，使用user_article和user_comment替代，因为对于评论只能点赞操作，相比较原本也就更节省空间一些。同时，技术派的命名应该为user_document，而不是user_foot，不然难以理解。
但无论是哪种设计，对于用户文章/评论，应用层都需要五个参数：

- userId
- targetId
- targetTpye
- targetOwnerId
- operationType
## 实现代码

---

#### 1 使用示例
该功能主要由UserFootService的saveOrUpdateUserFoot()方法实现。
其在ArticleRestController的favor()方法中被调用：
```java
/**
 * 收藏、点赞等相关操作
 *
 * @param commendId
 * @param type      取值来自于 OperateTypeEnum#code
 * @return
 */
@Permission(role = UserRole.LOGIN)
@GetMapping(path = "favor")
public ResVo<Boolean> favor(@RequestParam(name = "commentId") Long commendId,
                            @RequestParam(name = "type") Integer type) {
    OperateTypeEnum operate = OperateTypeEnum.fromCode(type);
    if (operate == OperateTypeEnum.EMPTY) {
        return ResVo.fail(StatusEnum.ILLEGAL_ARGUMENTS_MIXED, type + "非法");
    }

    // 要求文章必须存在
    CommentDO comment = commentReadService.queryComment(commendId);
    if (comment == null) {
        return ResVo.fail(StatusEnum.ILLEGAL_ARGUMENTS_MIXED, "评论不存在!");
    }

    UserFootDO foot = userFootService.saveOrUpdateUserFoot(DocumentTypeEnum.COMMENT,
                                                           commendId,
                                                           comment.getUserId(),
                                                           ReqInfoContext.getReqInfo().getUserId(),
                                                           operate);
    // 点赞、收藏消息
    NotifyTypeEnum notifyType = OperateTypeEnum.getNotifyType(operate);
    Optional
        .ofNullable(notifyType)
        .ifPresent(notify -> SpringUtil.publishEvent(new NotifyMsgEvent<>(this, notify, foot)));
    return ResVo.ok(true);
}
```
对于上面的方案，可以看出技术派使用的是直接注入service，然后调用接口操作。
**补充信息**：该业务可以使用Spring AOP实现，具体信息可以在【代码重构部分】的【用户操作追踪】查看。
**吐槽一下**：我一直以为Controller层只负责接受参数，调用对应的Service接口正常返回结果，不会执行逻辑处理。在Service层会执行业务业务逻辑，遇到错误只会抛出异常。然后利用“全局异常拦截器”根据对应的错误写入对应的错误信息返回。但是，技术派这里不是这样处理的，Controller层做了操作。（不确定）

---

#### 2 保存信息
UserFootService的saveOrUpdateUserFoot()方法具体如下：
```java
/**
 * 保存或更新状态信息
 *
 * @param documentType    文档类型：博文 + 评论
 * @param documentId      文档id
 * @param authorId        作者
 * @param userId          操作人
 * @param operateTypeEnum 操作类型：点赞，评论，收藏等
 */
@Override
public UserFootDO saveOrUpdateUserFoot(DocumentTypeEnum documentType, Long documentId, Long authorId, Long userId, OperateTypeEnum operateTypeEnum) {
    // 查询是否有该足迹；有则更新，没有则插入
    UserFootDO readUserFootDO = userFootDao.getByDocumentAndUserId(documentId, documentType.getCode(), userId);
    if (readUserFootDO == null) {
        readUserFootDO = new UserFootDO();
        readUserFootDO.setUserId(userId);
        readUserFootDO.setDocumentId(documentId);
        readUserFootDO.setDocumentType(documentType.getCode());
        readUserFootDO.setDocumentUserId(authorId);
        setUserFootStat(readUserFootDO, operateTypeEnum);
        userFootDao.save(readUserFootDO);
    } else if (setUserFootStat(readUserFootDO, operateTypeEnum)) {
        readUserFootDO.setUpdateTime(new Date());
        userFootDao.updateById(readUserFootDO);
    }
    return readUserFootDO;
}
```
**吐槽一下**：这个类不止做了保存或更新，还做了查询，应该分开写成两个方法：
```java
public UserFootDO queryUserArticleFoot(...) {...}
public boolean checkIsExistUserArticleFoor(...){...}
```

---

#### 3 保存评论
对于评论的操作：
```java
@Override
public void saveCommentFoot(CommentDO comment, Long articleAuthor, Long parentCommentAuthor) {
    // 保存文章对应的评论足迹
    saveOrUpdateUserFoot(
        DocumentTypeEnum.ARTICLE,
        comment.getArticleId(),
        articleAuthor,
        comment.getUserId(),
        OperateTypeEnum.COMMENT);
    // 如果是子评论，则找到父评论的记录，然后设置为已评
    if (comment.getParentCommentId() != null && comment.getParentCommentId() != 0) {
        // 如果需要展示父评论的子评论数量，authorId 需要传父评论的 userId
        saveOrUpdateUserFoot(
            DocumentTypeEnum.COMMENT,
            comment.getParentCommentId(),
            parentCommentAuthor,
            comment.getUserId(),
            OperateTypeEnum.COMMENT);
    }
}
```
**吐槽一下**：这个业务逻辑是存在设计问题的。user_comment表（技术派中的user_document表）只需要“是否点赞”信息，而不需要“是否评论”和“是否浏览”。不确定这些信息是否有其他作用。
# 文章发布具体实现
## 设计思路
需求：用户发布文章，需要先通过图片转链，然后上传，审核，公开。
数据表：article表
实现逻辑：

1. 图片转链
2. 创建文章（审核状态）
3. 文章公开（公开状态）
## 代码实现

---

#### 1 文章转链
ImageServiceImpl类的mdImgReplace()方法实现了图片转链：
```java
@AsyncExecute(timeOutRsp = "#content")
public String mdImgReplace(String content) {
    List<MdImgLoader.MdImg> imgList = MdImgLoader.loadImgs(content);
    if (CollectionUtils.isEmpty(imgList)) {
        return content;
    }

    if (imgList.size() == 1) {
        // 只有一张图片时，没有必要走异步，直接转存并返回
        MdImgLoader.MdImg img = imgList.get(0);
        String newImg = saveImg(img.getUrl());
        return StringUtils.replace(content, img.getOrigin(), "![" + img.getDesc() + "](" + newImg + ")");
    }

    // 超过1张图片时，做并发的图片转存，提升性能
    AsyncUtil.CompletableFutureBridge bridge = AsyncUtil.concurrentExecutor("MdImgReplace");
    Map<MdImgLoader.MdImg, String> imgReplaceMap = Maps.newHashMapWithExpectedSize(imgList.size());
    for (MdImgLoader.MdImg img : imgList) {
        bridge.runAsyncWithTimeRecord(() -> {
            imgReplaceMap.put(img, saveImg(img.getUrl()));
        }, img.getUrl());
    }
    bridge.allExecuted().prettyPrint();

    // 图片替换
    for (Map.Entry<MdImgLoader.MdImg, String> entry : imgReplaceMap.entrySet()) {
        MdImgLoader.MdImg img = entry.getKey();
        String newImg = entry.getValue();
        content = StringUtils.replace(content, img.getOrigin(), "![" + img.getDesc() + "](" + newImg + ")");
    }
    return content;
}
```
具体逻辑为：

1. 分析内容，拿到图片的链接。
2. 假如没有图片，返回。
3. 假如只有一张图片，直接保存。
4. 假如超过一张图片，并发保存。
5. 将原本内容的图片链接转化成新的保存地址。

下面逐步讨论。
**1. 分析内容，拿到图片的链接。**
可以看到，具体的实现是由MdImgLoader的loadImgs()方法实现，下面是其源码，主要由“正则表达式”实现：
```java
public class MdImgLoader {
    private static Pattern IMG_PATTERN = Pattern.compile("!\\[(.*?)\\]\\((.*?)\\)");

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MdImg {
        /**
         * 原始文本
         */
        private String origin;
        /**
         * 图片描述
         */
        private String desc;
        /**
         * 图片地址
         */
        private String url;
    }

    public static List<MdImg> loadImgs(String content) {
        Matcher matcher = IMG_PATTERN.matcher(content);
        List<MdImg> list = new ArrayList<>();
        while (matcher.find()) {
            list.add(new MdImg(matcher.group(0), matcher.group(1), matcher.group(2)));
        }
        return list;
    }
}
```
**2. 图片保存**
图片保存是一个内部的saveImg(String url)实现，下面是源码：
```java
public String saveImg(String img) {
    if (imageUploader.uploadIgnore(img)) {
        // 已经转存过，不需要再次转存；非http图片，不处理
        return img;
    }

    try {
        String ans = imgReplaceCache.get(img);
        if (StringUtils.isBlank(ans)) {
            return buildUploadFailImgUrl(img);
        }
        return ans;
    } catch (Exception e) {
        return buildUploadFailImgUrl(img);
    }
}
```
具体逻辑是：

1. 假如可以找到具体的图片，则不进行存储。
2. 假如没有则尝试通过缓存池获取，假如获取失败则返回失败信息。

缓存池的原理是：当内部不存在对应的key-value时，则调用load()方法获取value，然后put进缓存中。
其缓存池的配置如下：
```java
private LoadingCache<String, String> imgReplaceCache = CacheBuilder.
    newBuilder().
    maximumSize(300).
    expireAfterWrite(5, TimeUnit.MINUTES).
    build(new CacheLoader<String, String>() {
    @Override
    public String load(String img) {
        try {
            InputStream stream = FileReadUtil.getStreamByFileName(img);
            URI uri = URI.create(img);
            String path = uri.getPath();
            int index = path.lastIndexOf(".");
            String fileType = null;
            if (index > 0) {
                // 从url中获取文件类型
                fileType = path.substring(index + 1);
            }
            return imageUploader.upload(stream, fileType);
        } catch (Exception e) {
            log.error("外网图片转存异常! img:{}", img, e);
            return "";
        }
    }
});
```
可以看到具体的保存图片是由imageUploader.upload()方法实现，主要方式就是保存图片，这里不做过多说明。
**3. 并发保存**
单独把并发部分的代码拿出来看一下。
```java
AsyncUtil.CompletableFutureBridge bridge = AsyncUtil.concurrentExecutor("MdImgReplace");
Map<MdImgLoader.MdImg, String> imgReplaceMap = Maps.newHashMapWithExpectedSize(imgList.size());
for (MdImgLoader.MdImg img : imgList) {
    bridge.runAsyncWithTimeRecord(() -> {
        imgReplaceMap.put(img, saveImg(img.getUrl()));
    }, img.getUrl());
}
bridge.allExecuted().prettyPrint();
```
并发部分主要在于AsyncUtil类，其内部创建了一个线程池：
```java
private static final ThreadFactory THREAD_FACTORY = new ThreadFactory() {
    private final ThreadFactory defaultFactory = Executors.defaultThreadFactory();
    private final AtomicInteger threadNumber = new AtomicInteger(1);

    public Thread newThread(Runnable r) {
        Thread thread = this.defaultFactory.newThread(r);
        if (!thread.isDaemon()) {
            thread.setDaemon(true);
        }

        thread.setName("paicoding-" + this.threadNumber.getAndIncrement());
        return thread;
    }
};
private static ExecutorService executorService;
private static SimpleTimeLimiter simpleTimeLimiter;

static {
    initExecutorService(0, 50);
}

public static void initExecutorService(int core, int max) {
    executorService = new ExecutorBuilder().
        setCorePoolSize(core).
        setMaxPoolSize(max).
        setKeepAliveTime(0).
        setKeepAliveTime(0, TimeUnit.SECONDS).
        setWorkQueue(new SynchronousQueue<Runnable>()).
        setHandler(new ThreadPoolExecutor.CallerRunsPolicy()).
        setThreadFactory(THREAD_FACTORY).buildFinalizable();
    simpleTimeLimiter = SimpleTimeLimiter.create(executorService);
}
```
同时AsyncUtil定义了一个CompletableFutureBridge内部类，用于集合异步的结果：
```java
public static class CompletableFutureBridge {
    private List<CompletableFuture> list;
    private Map<String, Long> cost;
    private String taskName;

    public CompletableFutureBridge() {
        this("CompletableFutureExecute");
    }

    public CompletableFutureBridge(String task) {
        this.taskName = task;
        list = new ArrayList<>();
        cost = new ConcurrentHashMap<>();
        cost.put(task, System.currentTimeMillis());
    }
    
    ...
}
```
并发保存图片主要调用的方法是runAsyncWithTimeRecord()，实现如下：
```java
public CompletableFutureBridge runAsyncWithTimeRecord(Runnable run, String name) {
    return runAsyncWithTimeRecord(run, name, executorService);
}
```
```java
public CompletableFutureBridge runAsyncWithTimeRecord(Runnable run, String name, ExecutorService executor) {
    list.add(CompletableFuture.runAsync(runWithTime(run, name), executor));
    return this;
}
```
总体来说，使用了一个线程池来并发完成该任务，任务结果会放入CompletableFutureBridge的结果集合中，直到所有任务结束，然后返回。
**x. 整体异步**
可以看到整个方法使用@AyncExecute注解：
```java
@AsyncExecute(timeOutRsp = "#content")
```
主要使用了Spring AOP将该方法异步，具体实现如下，大致了解即可：
```java
@Around("@annotation(asyncExecute)")
public Object handle(ProceedingJoinPoint joinPoint, AsyncExecute asyncExecute) throws Throwable {
    if (!asyncExecute.value()) {
        // 不支持异步执行时，直接返回
        return joinPoint.proceed();
    }

    try {
        // 携带超时时间的执行调用
        return AsyncUtil.callWithTimeLimit(asyncExecute.timeOut(), asyncExecute.unit(), () -> {
            try {
                return joinPoint.proceed();
            } catch (Throwable e) {
                throw new RuntimeException(e);
            }
        });
    } catch (ExecutionException | InterruptedException | TimeoutException e) {
        if (StringUtils.isNotBlank(asyncExecute.timeOutRsp())) {
            return defaultRespWhenTimeOut(joinPoint, asyncExecute);
        } else {
            throw e;
        }
    } catch (Exception e) {
        throw e;
    }
}
```
当该方法达到一定时间还没有完成的话，直接返回content内容。

---

#### 2 创建文章
主要代码如下：
```java
private Long insertArticle(ArticleDO article, String content, Set<Long> tags) {
    // article + article_detail + tag  三张表的数据变更
    if (needToReview(article)) {
        // 非白名单中的作者发布文章需要进行审核
        article.setStatus(PushStatusEnum.REVIEW.getCode());
    }

    // 1. 保存文章信息
    Long articleId = IdUtil.genId();// 使用分布式id生成文章主键
    article.setId(articleId);
    articleDao.saveOrUpdate(article);

    // 2. 保存文章内容
    articleDao.saveArticleContent(articleId, content);

    // 3. 保存文章标签
    articleTagDao.batchSave(articleId, tags);

    // 4. 发布文章，阅读计数+1
    userFootService.saveOrUpdateUserFoot(DocumentTypeEnum.ARTICLE, articleId, article.getUserId(), article.getUserId(), OperateTypeEnum.READ);

    // 5. 发布文章创建事件
    SpringUtil.publishEvent(new ArticleMsgEvent<>(this, ArticleEventEnum.CREATE, article));
    // 6. 文章直接上线时，发布上线事件
    SpringUtil.publishEvent(new ArticleMsgEvent<>(this, ArticleEventEnum.ONLINE, article));
    return articleId;
}
```
**补充信息**：文章创建事件和上线事件都是为了后面的活跃度而设计的。
**吐槽一下**：

- 建议去掉“发布后立马阅读计数+1”这个逻辑。
- 这里的代码逻辑是有问题的——还没有审核就发布了上线事件。但是发布上线实现和这里其实没有什么关系。代码和具体的实现其实有差异，这会增大后期的维护成本。

---

#### 3 文章审核
由管理端操作，具体就是把REVIEW状态转化为ONLINE操作，这里不详细说明。
```java
article.setStatus(req.getStatus());
if (req.getStatus() == PushStatusEnum.OFFLINE.getCode()) {
    operateEvent = ArticleEventEnum.OFFLINE;
} else if (req.getStatus() == PushStatusEnum.REVIEW.getCode()) {
    operateEvent = ArticleEventEnum.REVIEW;
} else if (req.getStatus() == PushStatusEnum.ONLINE.getCode()) {
    operateEvent = ArticleEventEnum.ONLINE;
}
```
**吐槽一下**：这里为什么不用switch？？？
# 消息发布具体实现
## 设计思路
**需求**：当需要向目标用户发送消息时，对目标用户是无感的。
**数据表**：notify_msg表、user_foot表
**实现逻辑**：当触发用户触发事件时，通过事件监听机制，采用线程池异步添加消息。
对于消息，可以分为下面几种类型：

- 评论：文章评论、评论回复
- 点赞：文章点赞、评论点赞
- 收藏：文章收藏、专栏收藏（这个没说，但是可以这样扩展）
- 关注：用户关注
- 系统：文章发布、文章审核、文章下线……

ps：技术派中，还设计了其他的动作追踪，但都没有对应的操作。
对于上面几个部分，又可以分为：

- 可撤销的：点赞、收藏、关注
- 不可撤销的：评论、系统

对于不可撤销的部分，又分了：

- 撤销时不撤销信息的：点赞
- 撤销时需要撤销信息的：收藏、关注

所以对于点赞、收藏、关注这三个部分，因为可以撤销，则需要额外的查重处理，其他的两个直接数据库添加即可。
**补充信息**：将所有通知放在一个表中，数据增长会很快。可以选择垂直分表，将消息分为评论、点赞等等，然后存在不同的数据表中。
**吐槽一下**：一般情况的业务场景下，是不会撤销信息的，删除是一个很复杂的东西，假如因为延迟导致了取消收藏比收藏更快，就删除失败了；再者，用户的某一个信息刚看到，做出反应，然后就被删除了……总而言之，这会造成更多的业务漏洞，个人觉得不应该删除信息。可以在回复时尝试判断具体的内容是否“无效”即可。
## 代码实现

---

#### 1 类的定义
整体是由NotifyMsgListener类实现，下面是它的定义：
```java
@Async
@Service
public class NotifyMsgListener<T> implements ApplicationListener<NotifyMsgEvent<T>> {...}
```
可以看到是一个Service，并且所有的执行都是异步的。
Spring Boot提供了默认的线程池，对于@Async注解的方法，会放到默认的线程池中去运行。

---

#### 2 事件发布
下面举例几个发布的使用：
```java
public void saveUserRelation(UserRelationReq req) {
    // 查询是否存在
    UserRelationDO userRelationDO = userRelationDao.getUserRelationRecord(req.getUserId(), ReqInfoContext.getReqInfo().getUserId());
    if (userRelationDO == null) {
        userRelationDO = UserConverter.toDO(req);
        userRelationDao.save(userRelationDO);
        // 发布关注事件
        SpringUtil.publishEvent(new NotifyMsgEvent<>(this, NotifyTypeEnum.FOLLOW, userRelationDO));
        return;
    }

    // 将是否关注状态重置
    ...
    // 发布关注、取消关注事件
    SpringUtil.publishEvent(new NotifyMsgEvent<>(this, req.getFollowed() ? NotifyTypeEnum.FOLLOW : NotifyTypeEnum.CANCEL_FOLLOW, userRelationDO));
}
```
```java
public void deleteComment(Long commentId, Long userId) {
    ...
    // 3. 发布删除评论事件
    SpringUtil.publishEvent(new NotifyMsgEvent<>(this, NotifyTypeEnum.DELETE_COMMENT, commentDO));
    if (NumUtil.upZero(commentDO.getParentCommentId())) {
        // 评论
        SpringUtil.publishEvent(new NotifyMsgEvent<>(this, NotifyTypeEnum.DELETE_REPLY, commentDO));
    }
}
```

---

#### 3 事件监听
NotifyMsgListener类中的onApplicationEvent进行分流：
```java
@Override
public void onApplicationEvent(NotifyMsgEvent<T> msgEvent) {
    switch (msgEvent.getNotifyType()) {
        case COMMENT:
            saveCommentNotify((NotifyMsgEvent<CommentDO>) msgEvent);
            break;
        case REPLY:
            saveReplyNotify((NotifyMsgEvent<CommentDO>) msgEvent);
            break;
        case PRAISE:
        case COLLECT:
            saveArticleNotify((NotifyMsgEvent<UserFootDO>) msgEvent);
            break;
        case CANCEL_PRAISE:
        case CANCEL_COLLECT:
            removeArticleNotify((NotifyMsgEvent<UserFootDO>) msgEvent);
            break;
        case FOLLOW:
            saveFollowNotify((NotifyMsgEvent<UserRelationDO>) msgEvent);
            break;
        case CANCEL_FOLLOW:
            removeFollowNotify((NotifyMsgEvent<UserRelationDO>) msgEvent);
            break;
        case LOGIN:
            // todo 用户登录，判断是否需要插入新的通知消息，暂时先不做
            break;
        case REGISTER:
            // 首次注册，插入一个欢迎的消息
            saveRegisterSystemNotify((Long) msgEvent.getContent());
            break;
        default:
            // todo 系统消息
    }
}
```
saveCommentNotify()具体如下：
```java
private void saveCommentNotify(NotifyMsgEvent<CommentDO> event) {
        NotifyMsgDO msg = new NotifyMsgDO();
        CommentDO comment = event.getContent();
        ArticleDO article = articleReadService.queryBasicArticle(comment.getArticleId());
        msg.setNotifyUserId(article.getUserId())
                .setOperateUserId(comment.getUserId())
                .setRelatedId(article.getId())
                .setType(event.getNotifyType().getType())
                .setState(NotifyStatEnum.UNREAD.getStat()).setMsg(comment.getContent());
        // 对于评论而言，支持多次评论；因此若之前有也不删除
        notifyMsgDao.save(msg);
    }
```
## 扩展内容
**扩展需求**：假如当作者发布了对应的文章，要通知信息给到读者，如何实现？
**基本设计**：监听文章上线事件，获取当前作者的粉丝，依次将文章信息添加到通知数据库中。
**问题在于**：当作者的粉丝很多时，会涉及到很大的事务操作。
**简单的优化方案**：

- 反转角色：作者发布文章，不会通知粉丝，只有当粉丝上线时，会根据上一次连接时间和当前时间获取其关注作者的文章个数。
- 简化需求：作者发布文章，只会添加粉丝的“文章未读个数”，而不会具体的生成信息通知内容。
- 缩小范围：可能部分粉丝并不活跃，只给一定时间内活跃的用户推荐，可以对用户的最后一次登陆进行记录。
