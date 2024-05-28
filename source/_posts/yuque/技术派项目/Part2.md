---
title: Part2
urlname: muo43650pk21f2io
date: '2024-04-26 16:29:33'
updated: '2024-04-26 16:34:32'
description: 'RedisRedis的操作技术派将Redis的操作封装在RedisClient类中，其所有方法都是静态方法，意味着可以在任何地方操作Redis。RedisClient类的内容如下：基本操作：register(RedisTemplate<String, String>) : voidnullCh...'
---
# Redis
### Redis的操作
技术派将Redis的操作封装在RedisClient类中，其所有方法都是静态方法，意味着可以在任何地方操作Redis。
RedisClient类的内容如下：
基本操作：

- register(RedisTemplate<String, String>) : void
- nullCheck(Object...) : void
- valBytes(T) : byte[]
- keyBytes(String) : byte[] []
- keyBytes(List<String>) : byte[] []
- toObj(byte[], Class<T>) : T
- piplineAction() : PipelineActioin

对string的操作：

- getStr(String) : String
- setStr(String, String) : void
- del(String) : void
- expire(String, Long) : void
- setStrWithExpire(String, String, Long) : Boolean

对hash的操作：

- hGetAll(String, Class<T>) : Map<String, T>
- hGet(String, String, Class<T>) : T
- hIncr(String, String, Integer) : Long
- hDel(String, String) : Boolean
- hSet(String, String, T) : Boolean
- hMSet(String, Map<String, T>) : void
- hMGet(String, List<String>, Class<T>) : Map<String, T>

对set的操作：

- sIsMember(String, T) : Boolean
- sGetAll(String, Class<T>) : Set<T>
- sPut(String, T) : boolean
- sDel(String, T) : void

对Zset的操作：

- zIncrBy(String, String, Integer) : Double
- zRankInfo(String, String) : ImmutablePair<Integer, Double>
- zScore(String, String) : Double
- zRank(String, String) : Integer
- zTopNScore(String, int) : List<ImmutablePair<String, Double>>

list操作：

- lPush(String, T) : Long
- rPush(String, T) : Long
- lRange(String, int, int, Class<T>) : List<T>
- lTrim(String, int, int) : void

**补充信息**：

- 其中，ImmutablePair<L, R>是一个Java内部的、不常用的数据结构。
   - 其是一个单体数据对，其继承于Pair<L, R>类。Pair<L, R>类又实现了Map.Entry<L, R>接口。
   - ImmutablePair内部的数据不可变的。
   - Pair类的默认实现是ImmutablePair。
- RedisClient内部编写了一个内部类PipelineAction，用于封装多个操作为管道执行。同时使用了Java官方的BiConsumer，还创建了一个三参数的方法接口ThreeConsumer，用于传递参数。下面为其源码：
```java
public static class PipelineAction {
    private List<Runnable> run = new ArrayList<>();

    private RedisConnection connection;

    public PipelineAction add(String key, BiConsumer<RedisConnection, byte[]> conn) {
        run.add(() -> conn.accept(connection, RedisClient.keyBytes(key)));
        return this;
    }

    public PipelineAction add(String key, String field, ThreeConsumer<RedisConnection, byte[], byte[]> conn) {
        run.add(() -> conn.accept(connection, RedisClient.keyBytes(key), valBytes(field)));
        return this;
    }

    public void execute() {
        template.executePipelined((RedisCallback<Object>) connection -> {
            PipelineAction.this.connection = connection;
            run.forEach(Runnable::run);
            return null;
        });
    }
}
@FunctionalInterface
public interface ThreeConsumer<T, U, P> {
    void accept(T t, U u, P p);
}
```
RedisClient内部提供了一个工厂方法用于创建一个PipelineAction实例：
```java
public static PipelineAction pipelineAction() {
    return new PipelineAction();
}
```

- RedisClient大部分方法的实现都基于RedisTemple的execute()方法，内部实现RedisCallback接口，其是一个方法接口，例如：
```java
public static Double zIncrBy(String key, String value, Integer score) {
    return template.execute(new RedisCallback<Double>() {
        @Override
        public Double doInRedis(RedisConnection connection) throws DataAccessException {
            return connection.zIncrBy(keyBytes(key), score, valBytes(value));
        }
    });
}
```
**吐槽一下**：我不说可能没人注意到，sPut()返回的boolean而不是Boolean。杀死强迫症！
###Redis的持久化
在技术派中，Redis不再是一个简单的缓存工具，而是一个基于内存的快速的数据库，所以需要一定的持久化策略。
很遗憾，我没有找到关于Redis持久化的配置信息……但猜测应该是AOF混合持久化。
### Redis的集群
在技术派中，尝试使用Redis的集群来扩展更多的分布式内容，但是对应整体的业务来看，Redis集群只是保证了Redis的高可用特性，对于开发人员调用Redis接口来说是无感的。
# Redis的缓存
## 设计思路
Redis的缓存涉及了下面的类：

- SitemapServiceImpl：站点地图：站点的所有url内容、PV/UV计数统计
- UserStatisticEventListener：统计用户的粉丝、收藏、关注信息
- CountServiceImpl：统计文章的点赞、阅读、评论数量
- TagSettingServiceImpl：标签相关的类
- ForumCoreAutoConfig：缓存相关的设置类

对于SitemapServiceImpl、CountServiceImpl和UserStatisticEventListener这些计数的功能类，在版本1.0中，其具体的实现都需要先添加到数据库，然后通过SQL的COUNT()函数获得具体的值。使用了Redis之后，可以通过操作Redis重写这些需求的实现。
对于TagSettingService这种单纯为了“缓存”的抽象类，原本可以使用@Cacheable注解实现功能，但是技术派仍然将Redis的代码嵌入代码实现了，有一些冗余。你可以在CountServiceImpl中看到这些缓存的使用方法，所以这一部分不会说明。
对于ForumCoreAutoConfig的配置类，内部配置了缓存器，但因为配置内容比较少，也不会说明。
## 具体实现
### 1 SitemapService
该类实现了“站点地图”和“流量记录”这两个功能。

---

#### 站点地图
你可以在这篇[知乎文章](https://zhuanlan.zhihu.com/p/441973408)中理解站点地图的意义。这里不做详细介绍。
下面是百度的站点地图文件的一个样例：
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- XML文件需以utf-8编码-->
<urlset>
<!--必填标签-->
    <url>
        <!--必填标签,这是具体某一个链接的定义入口，每一条数据都要用<url>和</url>包含在里面，这是必须的 -->
        <loc>http://www.yoursite.com/yoursite.html</loc>
        <!--必填,URL链接地址,长度不得超过256字节-->
        <lastmod>2009-12-14</lastmod>
        <!--可以不提交该标签,用来指定该链接的最后更新时间-->
        <changefreq>daily</changefreq>
        <!--可以不提交该标签,用这个标签告诉此链接可能会出现的更新频率 -->
        <priority>0.8</priority>
        <!--可以不提交该标签,用来指定此链接相对于其他链接的优先权比值，此值定于0.0-1.0之间-->
    </url>
    <url>
        <loc>http://www.yoursite.com/yoursite2.html</loc>
        <lastmod>2010-05-01</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```
其基本内容能够包含：

- 链接的url
- 链接的更新日期
- 链接的更新频率
- 链接的权重
- ……

在技术派中，主要在站点地图中放入了“文章的id-最后更新的时间”。
在SitemapService中，下面的几个方法提供sitemap服务：

- 查询站点信息
- 定时刷新站点信息：初始站点信息/刷新站点信息
- 更新站点信息：文章上线、文章删除/下线

**1. 查询站点信息**
其源码如下：
```java
public SiteMapVo getSiteMap() {
    // key = 文章id, value = 最后更新时间
    Map<String, Long> siteMap = RedisClient.hGetAll(SITE_MAP_CACHE_KEY, Long.class);
    if (CollectionUtils.isEmpty(siteMap)) {
        // 首次访问时，没有数据，全量初始化
        initSiteMap();
    }
    siteMap = RedisClient.hGetAll(SITE_MAP_CACHE_KEY, Long.class);
    SiteMapVo vo = initBasicSite();
    if (CollectionUtils.isEmpty(siteMap)) {
        return vo;
    }

    for (Map.Entry<String, Long> entry : siteMap.entrySet()) {
        vo.addUrl(new SiteUrlVo(host + "/article/detail/" + entry.getKey(), DateUtil.time2utc(entry.getValue())));
    }
    return vo;
}
```
可以看到，这里说明了sitemap主要的内容是“文章的id”和“最后更新时间”。
主要获取是通过RedisClient的hGetAll()方法，得到对应的“文章id-最后更新时间”，然后通过Map初始化站点地图的内容。
这个方法在SiteMapController的sitemap()方法中被调用，该方法是一个API：
```java
@RequestMapping(path = "/sitemap", produces = "application/xml;charset=utf-8")
public SiteMapVo sitemap() {
    return sitemapService.getSiteMap();
}
```
**2. 定时刷新站点信息**
SitemapService提供了定期刷新站点信息的方法，避免在Redis更新过程中出现错误，具体的源码如下：
```java
@Scheduled(cron = "0 15 5 * * ?")
public void autoRefreshCache() {
    log.info("开始刷新sitemap.xml的url地址，避免出现数据不一致问题!");
    refreshSitemap();
    log.info("刷新完成！");
}
```
```java
@Override
public void refreshSitemap() {
    initSiteMap();
}
```
```java
private synchronized void initSiteMap() {
    long lastId = 0L;
    RedisClient.del(SITE_MAP_CACHE_KEY);
    while (true) {
        // 1. 同步数据库的文章点赞信息
        List<SimpleArticleDTO> list = articleDao
            .getBaseMapper()
            .listArticlesOrderById(lastId, SCAN_SIZE);// SCAN_SIZE为100
        list.forEach(s -> countService.refreshArticleStatisticInfo(s.getId()));

        // 2. 刷新站点地图信息
        Map<String, Long> map = list.stream().collect(Collectors.toMap(
            s -> String.valueOf(s.getId()),
            s -> s.getCreateTime().getTime(),
            (a, b) -> a));
        
        RedisClient.hMSet(SITE_MAP_CACHE_KEY, map);
        if (list.size() < SCAN_SIZE) {
            break;
        }
        lastId = list.get(list.size() - 1).getId();
    }
}
```
CountService的refreshArticleStatisticInfo()方法如下：
```java
public void refreshArticleStatisticInfo(Long articleId) {
    ArticleFootCountDTO res = userFootDao.countArticleByArticleId(articleId);
    if (res == null) {
        res = new ArticleFootCountDTO();
    } else {
        res.setCommentCount(commentReadService.queryCommentCount(articleId));
    }

    RedisClient.hMSet(CountConstants.ARTICLE_STATISTIC_INFO + articleId,
                      MapUtils.create(CountConstants.COLLECTION_COUNT, res.getCollectionCount(),
                                      CountConstants.PRAISE_COUNT, res.getPraiseCount(),
                                      CountConstants.READ_COUNT, res.getReadCount(),
                                      CountConstants.COMMENT_COUNT, res.getCommentCount()
                                     )
                     );
}
```
@Scheduled用于开启一个定时任务，对于@Scheduled注解的使用方式和原理这里不做说明。
综合下来，initSiteMap()方法的流程如下：

1. 加锁，意味着当前方法只能够单线程执行；
2. 删除Redis的sitemap的信息，那么当前获取的Redis的数据为null；
3. 循环执行下面操作： 
   1. 从文章id为lastId开始获取100个文章的内容；
   2. 通过“用户足迹服务”，获取文章的点赞量、阅读量、收藏量。假如没有记录则这些信息全为0；
   3. 通过“评论服务”，获取文章的评论量；
   4. 使用hMSet()方法，将文章的点赞量、阅读量、收藏量、评论量更新至Redis的sitemap中；
   5. 获取文章的id和创建时间；
   6. 使用hMSet()方法，将文章id和更新时间更新至Redis的sitemap中；
   7. 当获取的文章数量已经少于最小获取数量时，离开循环；
   8. 将当前最后一个文章的id设置为lastId；
4. 循环结束，释放锁；

**补充信息**：

- 注释说主要获取的“文章id”和“**更新时间**”，而在SimpleArticleDTO中获取时间的方法为**getCreateTime()**。但是实际上，SimpleArticleDTO的**createTime**属性底层获取的就是表中的**updateTime**属性。你可以在ArticleMapper的listArticlesOrderById()方法对应的XML中，看到具体的实现：
```sql
select id, title, update_time as createTime from article
where id > #{lastId}
and status = ${@com.github.paicoding.forum.api.model.enums.PushStatusEnum@ONLINE.code}
and deleted = ${@com.github.paicoding.forum.api.model.enums.YesOrNoEnum@NO.code}
order by id asc limit #{size}
```

- 可以很明显意识到，这一部分功能的实现就是简单的批量增删改查，Redis的缓存使用就是如此简单。

**吐槽一下**：

- SitemapService除了更新站点以外，还做了CountService的事情，即更新文章的计数信息。这样的代码设计违背了“单一职责原则”，不管是否对于性能有所提升，一个类就应该做好其原本的工作，从而避免增加后期的维护成本。
- 服务层：**Sitemap**Service；Controller层：**SiteMap**Controller。此处大小写不对应。

---

#### PV/UV
你可以在这篇[知乎文章](https://zhuanlan.zhihu.com/p/49329968)中了解PV/UV的定义和意义。这里不做详细介绍。
**1. 实现逻辑**
在SitemapService中，提供了下面的方法

- saveVisitInfo(String visitIp, String path)：保存用户某一天访问某路径的信息。
- querySiteVisitInfo(LocalDate date, String path)：查询站点某一天/总的访问信息。

对于PV/UV，使用的Redis的hash数据结构，具体设计如下：
ps：其中，存在“#{}”符号的key/field，代表由一种类型的命名规范，存在多个实例。

- **pai_visit_info**：全局统计 
   - **pv**：站点的总pv
   - **uv**：站点的总uv
   - **pv_#{path}**：站点某个资源的总pv
   - **uv_#{path}**：站点某个资源的总uv
- **pai_visit_info_#{ip}**：对某一个ip/用户访问的统计 
   - **pv**：用户总的访问次数
   - **pv_#{path}**：用户访问某个路径的总次数
- **pai_visit_info_#{time}**：某日的访问统计 
   - **pv**：某日的pv
   - **uv**：某日的uv
   - **pv_#{path}**：某个资源的当天pv
   - **uv_#{path}**：某个资源的当天uv
   - **pv_#{ip}**：用户当天的访问次数
   - **pv_#{path}_#{ip}**：用户对资源的当天访问次数

你可以在SitemapServiceImpl的saveVisitInfo()方法中查看具体的修改逻辑。
这里本来添加了其源码，但是代码的可读性比较差，加上本人的能力有限，花了将近半个小时，没能很好的改进。
值得一提的是：在saveVisitInfo()中，调用RedisClient.pipelineAction()方法创建了一个PipelineAction，该类用于批量执行Redis的命令。同时，使用了hIncrBy()方法用于增加值。大致使用如下：
```java
RedisClient.PipelineAction pipe = RedisClient.pipelineAction();
pipe.add(todayKey, "uv", (connection, key, field) -> connection.hIncrBy(key, field, 1));
pipe.add(todayKey, "uv_" + path, (connection, key, field) -> connection.hIncrBy(key, field, 1));
...
pipe.execute();
```
SitemapServiceImpl的querySiteVisitInfo()方法用于获取具体的PV/UV的信息。主要调用了RedisClient的hMGet()方法获取结果。下面是稍微修改后的代码：
```java
/**
 * 查询站点某一天or总的访问信息
 *
 * @param date 日期，为空时，表示查询所有的站点信息
 * @param path 访问路径，为空时表示查站点信息
 * @return
 */
public SiteCntVo querySiteVisitInfo(LocalDate date, String path) {
    String globalKey = SitemapConstants.SITE_VISIT_KEY;
    String day = null;
    
    String key = globalKey;
    if (date != null) {
        day = SitemapConstants.day(date);
        key = globalKey + "_" + day;
    }

    String pvField = "pv";
    String uvField = "uv";
    if (path != null) {
        pvField += "_" + path;
        uvField += "_" + path;
    }

    Map<String, Integer> map = RedisClient.hMGet(key, Arrays.asList(pvField, uvField), Integer.class);
    
    SiteCntVo siteInfo = new SiteCntVo();
    siteInfo.setDay(day);
    siteInfo.setPv(map.getOrDefault(pvField, 0));
    siteInfo.setUv(map.getOrDefault(uvField, 0));
    return siteInfo;
}
```
**吐槽一下**：

- 这一部分“代码和注释”的可读性真的太差了： 
   - 在代码上，建议使用isXXX来存储判定结果，既能够减少代码缩进，又能够清楚判定的语意。
   - 在代码内部的注释中，可以看到“PV”有的大写，有的小写；有的英文和中文有间隔，有的没有；有的“pv_”，有的“pv” + “_”。
   - 在代码外部的注释中，一段用“#”，一段又没用。
- saveVisitInfo()方法的代码逻辑想复杂了，建议修改。
- querySiteVisitInfo()方法中，源码存在一行声明多个变量，建议不要这样编写代码。
### 2 信息统计
CountServiceImpl和UserStatisticEventListener提供了用户/文章的信息统计服务，主要涉及下面内容的统计：

- 用户：关注量、已发布文章、被点赞、被阅读量、被收藏、粉丝量
- 文章：被点赞、被收藏、被评论、被阅读量

整个信息统计可以分为三个部分：

- 查询：用于获取计数信息。
- 修改：用于同步计数信息。
- 刷新：因为有可能Redis执行命令出错，刷新用于保证数据的一致性。

下面逐步介绍其具体的调用逻辑。
**1. 查询**
可以看到CountServiceImpl类的下面两个方法中提供了用户和文章的查询服务：
```java
public UserStatisticInfoDTO queryUserStatisticInfo(Long userId) {
    Map<String, Integer> ans = RedisClient.hGetAll(CountConstants.USER_STATISTIC_INFO + userId, Integer.class);
    UserStatisticInfoDTO info = new UserStatisticInfoDTO();
    info.setFollowCount(ans.getOrDefault(CountConstants.FOLLOW_COUNT, 0));
    info.setArticleCount(ans.getOrDefault(CountConstants.ARTICLE_COUNT, 0));
    info.setPraiseCount(ans.getOrDefault(CountConstants.PRAISE_COUNT, 0));
    info.setCollectionCount(ans.getOrDefault(CountConstants.COLLECTION_COUNT, 0));
    info.setReadCount(ans.getOrDefault(CountConstants.READ_COUNT, 0));
    info.setFansCount(ans.getOrDefault(CountConstants.FANS_COUNT, 0));
    return info;
}
```
```java
public ArticleFootCountDTO queryArticleStatisticInfo(Long articleId) {
    Map<String, Integer> ans = RedisClient.hGetAll(CountConstants.ARTICLE_STATISTIC_INFO + articleId, Integer.class);
    ArticleFootCountDTO info = new ArticleFootCountDTO();
    info.setPraiseCount(ans.getOrDefault(CountConstants.PRAISE_COUNT, 0));
    info.setCollectionCount(ans.getOrDefault(CountConstants.COLLECTION_COUNT, 0));
    info.setCommentCount(ans.getOrDefault(CountConstants.COMMENT_COUNT, 0));
    info.setReadCount(ans.getOrDefault(CountConstants.READ_COUNT, 0));
    return info;
}
```
主要调用了RedisClient的hGetAll()方法进行数据缓存，能够代替数据库的查询，从而加快响应速度。
这两个方法在获取用户或文章内容时被调用。
这是一种经典的缓存设计。
**2. 修改**
主要的修改逻辑在UserStatisticEventListener类中，其代码大致如下：
```java
@EventListener(classes = NotifyMsgEvent.class)
@Async
public void notifyMsgListener(NotifyMsgEvent msgEvent) {
    switch (msgEvent.getNotifyType()) {
        case COMMENT:
        case REPLY:
            CommentDO comment = (CommentDO) msgEvent.getContent();
            RedisClient.hIncr(CountConstants.ARTICLE_STATISTIC_INFO + comment.getArticleId(), CountConstants.COMMENT_COUNT, 1);
            break;
        ...
        case FOLLOW:
            UserRelationDO relation = (UserRelationDO) msgEvent.getContent();
            // 主用户粉丝数 + 1
            RedisClient.hIncr(CountConstants.USER_STATISTIC_INFO + relation.getUserId(), CountConstants.FANS_COUNT, 1);
            // 粉丝的关注数 + 1
            RedisClient.hIncr(CountConstants.USER_STATISTIC_INFO + relation.getFollowUserId(), CountConstants.FOLLOW_COUNT, 1);
            break;
        case CANCEL_FOLLOW:
            relation = (UserRelationDO) msgEvent.getContent();
            // 主用户粉丝数 + 1
            RedisClient.hIncr(CountConstants.USER_STATISTIC_INFO + relation.getUserId(), CountConstants.FANS_COUNT, -1);
            // 粉丝的关注数 + 1
            RedisClient.hIncr(CountConstants.USER_STATISTIC_INFO + relation.getFollowUserId(), CountConstants.FOLLOW_COUNT, -1);
            break;
        default:
    }
}
```
其中主要就是跟踪用户的执行，然后进行具体的Redis数据更新操作。可见“用户的操作追踪”对于整个项目都是非常重要的。
在CountServiceImpl中，提供了一个阅读量增加方法，用于补全上述中“无法监听用户阅读文章”的操作。
```java
public void incrArticleReadCount(Long authorUserId, Long articleId) {
    // db层的计数+1
    articleDao.incrReadCount(articleId);
    // redis计数器 +1
    RedisClient.pipelineAction()
        .add(CountConstants.ARTICLE_STATISTIC_INFO + articleId, CountConstants.READ_COUNT,
             (connection, key, value) -> connection.hIncrBy(key, value, 1))
        .add(CountConstants.USER_STATISTIC_INFO + authorUserId, CountConstants.READ_COUNT,
             (connection, key, value) -> connection.hIncrBy(key, value, 1))
        .execute();
}
```
该方法在“用户获取文章内容”时被调用，具体在ArticleReadServiceImpl的queryFullArticleInfo()方法中，这里不展示代码。
由此可见，“用户的操作追踪”其实并不完善，还需要业务的改进，否则会混乱嵌入到其他的代码中，导致后期难以维护和升级。
**3. 刷新**
下面是CountServiceImpl的autoRefreshAllUserStatisticInfo()方法，用于刷新数据：
```java
@Scheduled(cron = "0 15 4 * * ?")
public void autoRefreshAllUserStatisticInfo() {
    Long now = System.currentTimeMillis();
    log.info("开始自动刷新用户统计信息");
    Long userId = 0L;
    int batchSize = 20;
    while (true) {
        List<Long> userIds = userDao.scanUserId(userId, batchSize);
        userIds.forEach(this::refreshUserStatisticInfo);
        if (userIds.size() < batchSize) {
            userId = userIds.get(userIds.size() - 1);
            break;
        } else {
            userId = userIds.get(batchSize - 1);
        }
    }
    log.info("结束自动刷新用户统计信息，共耗时: {}ms, maxUserId: {}", System.currentTimeMillis() - now, userId);
}
```
主要刷新使用了userId参数，调用refreshUserstatisticInfo()方法。下面是其源码：
```java
public void refreshUserStatisticInfo(Long userId) {
    // 用户的文章点赞数，收藏数，阅读计数
    ArticleFootCountDTO count = userFootDao.countArticleByUserId(userId);
    if (count == null) {
        count = new ArticleFootCountDTO();
    }

    // 获取关注数
    Long followCount = userRelationDao.queryUserFollowCount(userId);
    // 粉丝数
    Long fansCount = userRelationDao.queryUserFansCount(userId);

    // 查询用户发布的文章数
    Integer articleNum = articleDao.countArticleByUser(userId);

    String key = CountConstants.USER_STATISTIC_INFO + userId;
    RedisClient.hMSet(key, MapUtils.create(CountConstants.PRAISE_COUNT, count.getPraiseCount(),
                                           CountConstants.COLLECTION_COUNT, count.getCollectionCount(),
                                           CountConstants.READ_COUNT, count.getReadCount(),
                                           CountConstants.FANS_COUNT, fansCount,
                                           CountConstants.FOLLOW_COUNT, followCount,
                                           CountConstants.ARTICLE_COUNT, articleNum));
}
```
和前面的文章/站点刷新逻辑基本一致。
**吐槽一下**：

- 在“修改”的UserStatisticEventListener代码中，某些注释是错误的。
- 在“刷新”的用户统计中，和之前的文章/站点刷新逻辑相同，但是代码的实现规范不同。甚至这里没有使用常量来规范“文章的一次获取的数量限制”，个人认为，某些可能影响业务的参数，使用@Value注解，可以单独提出到配置文件中控制数值。
- 根据业务逻辑，还差某个评论的点赞量，这个也很重要才对。
# Redis的排行榜
## 具体实现
若你已经加入“技术派”的语雀文档，你可以在基础篇中看到“技术派Redis实现用户活跃排行榜”的实现逻辑。这里就不具体描述如何实现。
你可以在UserActivityRankServiceImpl类中看到更详细的实现。
**补充信息**：

- 在UserActivityRankServiceImpl的addActivityScore()方法中存在下面的内容：
```java
Double newAns = RedisClient.zIncrBy(todayRankKey, String.valueOf(userId), score);
...
if (newAns <= score) {...}
```
业务逻辑：当增加日活跃的score后，检查增加后的数值（即newAns）是否为score，用于判断今日活是否存在。这里不使用“等于”而使用“小于等于”的目的是**业务严谨（不确定）**。

- 在ActivityScoreBo的设计中，存在@Accessor注解，该注解来源于Lambok，用于扩展类。下面是其主要参数的作用：
   - fluent：默认为false，当为true时，setter/getter对应的方法名不会含有set/get，而是对应的属性名。
   - chain：默认为false，当为true时，setter方法会返回其本身，用于链式操作。
- 可以发现这个业务围绕着“追踪用户操作”，可见“追踪用户操作”的重要性。
- 该部分业务可以直接写成一个Lua脚本执行。
- 整个业务没有做并发处理，并不能完全避免并发问题。在第2步——幂等时，分为了两部分：
   1. 获取对应field的value。
   2. 然后分为：1. 假如value为null；2. 假如value不为null。
- 并发问题类似于“懒汉的单例模式”，假如两个操作同时查看field的value，都会进行value为null的操作。可以使用Redis的[HSETNX](6e453c30aab1e2cc480cd09c6c9ceae2)命令替换。

**吐槽一下**：

- ActivityScoreBo类的设计我个人认为存在问题，导致后面一堆if-else。既然不做内容聚合（把多个加分项拉在一个类中），应该设计一个type属性，然后再使用switch代替代码部分。
- 排行榜的业务设计是存在歧义的：其实当用户收藏/点赞/关注，就已经表示用户活跃过了，完全没必要因为其取消而减少活跃值。技术派的排行榜设计其实更像是“用户依赖度排行榜”。
- 最让我烦恼的是：在技术派的代码中，经常使用存在复合的方法操作，这些操作会导致歧义性。例如：
   - hGet()：当“field不存在”或者“hash不存在时”，返回null。
   - hSet()：假如hash不存在，会创建对应的hash，再执行set操作。
   - zIncrBy()：假如hash不存在，会创建对应的hash；假如field不存在，会先初始化为0，再执行increase操作。
- 这和平常使用hash数据结构不一致，导致我重看这段代码时，仍然非常混乱。
## 我的想法
修改内容：

- 去掉删除活跃度的业务逻辑。
- 重写ActivityScoreBo类。
- 重写分数添加的执行逻辑。

ActivityScoreBo类的设计：
```java
@Data
public class ActivityScoreBo {
    private ActivityAction type;
    private String targetInfo;
}
```
addActivityScore方法更改后如下：
```java
public void addActivityScore(@NotNull Long userId, @NotNull ActivityScoreBo activityScore) {
    String field;
    int sore;
    switch (activityScore.getType()) {
        case VISIT_PATH: field = "visit_path_"; score = 1; break;
        case PRAISE_ARTICLE: field = "praise_"; score = 2; break;
        case COLLECT_ARTICLE: field = "collect_"; score = 2; break;
        case COMMENT_ARTICLE: field = "comment_"; score = 2; break;
        case PUBLISH_ARTICLE: field = "publish_"; score = 5; break;
        case FOLLOW_AUTHOR: field = "follow_"; score = 2; break;
        default: throw new UnexpectableUserActionType("...");
    }
    field += activityScore.getTargetInfo();
    
    final String todayRankKey = generateTodayRankKey();
    final String monthRankKey = generateMonthRankKey();
    
    final String userTodayActionKey = generateUserTodayActionKey(userId);
    boolean isExist = RedisClient.hasKey(userTodayActionKey);
    
    boolean flag = RedisClient.putIfAbsent(userTodayActionKey, field, score);
    if (flag) {
        RedisClient.zIncrBy(todayRankKey, String.valueOf(userId), score);
        RedisClient.zIncrBy(monthRankKey, String.valueOf(userId), score);
        
        if (!isExist) RedisClient.expire(userTodayActionKey, 31 * DateUtil.ONE_DAY_SECONDS);
    }
}
```
```java
@Schedule(...)
public void equipActivityRankConfig() {
    final String todayRankKey = todayRankKey();
    final String monthRankKey = monthRankKey();
    
    RedisClient.zPut(todayRankKey, null, null);// 不会放入任何信息，用于保证Zset已经被创建
    RedisClient.zPut(monthRankKey, null, null);
    
    RedisClient.expire(todayRankKey, 31 * DateUtil.ONE_DAY_SECONDS);
    RedisClient.expire(monthRankKey, 12 * DateUtil.ONE_MONTH_SECONDS);
}
```
纯手搓，可能有误。
**额外说明**：

- 我把Redis的field写成switch来拼接字符串，这样写会更加直观。还可以进一步将对应添加的“字符串和分数”写在常量类中，可以使用@Value来配置，将具体的设计解耦到配置文件中。
- 整个业务中，只有addActivityScore()的第26行代码存在一次并发问题，但实际上影响不大。
- putIfAbsent()方法调用了Redis的HSETNX命令，假如不存在则放入，假如存在则返回false，其余返回true。

**总结一下**：

- 除了基本的逻辑设计：
   1. 得到操作的幂等值；
   2. 尝试SET；
   3. 假如操作成功，则放入则执行当日、当月的分数增加操作；假如操作失败，则代表操作已经执行。
- 还需要让对应的过期信息一定作用到对应的key上，这需要额外的设计思路。
- 源代码中，使用的hGet操作，然后判断再hSet进入hash中，这里使用了putIfAbsent()方法，实际上使用了Redis的HSETNX命令，能够有效避免并发问题。
- 最大的问题是Redis的方法调用不熟练。例如zPut()参数为null，就不会Put，但会保证Zset已经被创建，这种情况下，自己完全想不到，借助了Chat GPT才能够了解到这些知识。
# Redis的白名单
## 具体实现
若你已经加入“技术派”的语雀文档，你可以在基础篇中看到“技术派Redis实现作者白名单”的实现逻辑。这里就不具体描述如何实现。
你可以在AuthorWhiteListServiceImpl类中看到更详细的实现。该类在ArticleWriteServiceImpl类中被调用。
**吐槽一下**：

- 抽象类的命名：**Author**WhiteListService；ArticleWriteServiceImpl中的变量命名：**article**WhiteListService。
- 我已经在版本1.0吐槽过，在ArticleWriteServiceImpl的insertArticle()方法中，文章创建后连续发布了“文章创建事件”和“文章上线事件”。我个人感觉，这里的逻辑存在一些问题： 
   - 白名单的设计应该为：当文章发布后设置文章状态为REVIEW，执行拦截（或者额外添加自动审核机制）：假如对应的文章作者在白名单，则触发上线操作（其中包括“发布上线事件”和“设置文章状态为ONLINE”）；假如不是则不做任何操作。
   - 在技术派中的设计为：提前检查作者是否在白名单中，然后修改为对应的文章状态，个人感觉设计有些别扭。
   - 文章没有完全发布，应该不会加分，但是在UserActivityListener的publishArticleListener()方法中直接进行了加分操作。
# Redis的JWT升级
在技术派的1.0设计中，token内部包含了用户的id。然后在拦截器中解析。当用户登录时生成一个token到用户的Cookie中，之后用户访问网页就无需登录。直到用户执行登录操作，清理token或者token过期，这样用户才算是退出登录。这样看来，token的过期权限几乎在用户的手中，因为服务端只负责生成token，而不会管理。
在技术派的2.0设计中，使用了SessionHelper来存储用户的token，当得到用户请求中的token时，尝试从Redis来获取，假如token不存在或者已经过期，则需要重新登录。这种设计让token的过期权限移动到了服务端的手里。
### 我的想法
JWT的最大优点应该是无状态和安全，所以完全没有必要将token存储到Redis中。我推荐使用双token机制。
规定：用户存在两个token，都会存储用户信息。

- accessToken：有效期1小时
- refreshToken：有效期7天

前端：

- 使用accessToken请求资源：假如成功则返回；假如失败，进入下一步。
- 使用refreshToken请求资源：假如失败则跳转登录界面；假如成功，后端会返回新的accessToken和refreshToken，更新本地的token。

后端：

- 检查token是否有效：假如无效则不通过；假如有效进入下一步。
- 检查token的类型，假如为refreshToken则重新生成两个token在Authorization中。

该阶段可以在Interceptor执行，也可以在Filter执行，但推荐使用Spring Security框架实现。我在【版本1.0】的【2 权限管理】中提到了Spring Security，你可以在那篇文章看到关于Spring Security的大致设计。
# Caffeine的缓存
若你已经加入“技术派”的语雀文档，你可以在基础篇中看到“技术派Caffeine整合本地缓存”的实现逻辑。这里就不具体描述如何实现。
你可以在SidebarServiceImpl类中看到更详细的实现。
**补充信息**：

- 你可以在这篇[博客](https://blog.csdn.net/youbl/article/details/113052502)看到更多Spring Cache的扩展使用。
- Caffeine是存储的实例指针，对应的缓存内容仍然存储在Java进程内部中，所以称之为“本地缓存”。需要和Redis这种“序列化缓存”区分开来。你可以在“技术派Caffeine整合本地缓存踩坑实录”中看到它们更加详细的区别。

**吐槽一下**：Spring Cache也太垃圾了吧……
# Guava的缓存
若你已经加入“技术派”的语雀文档，你可以在基础篇中看到“技术派Guava整合本地缓存”的实现逻辑。这里就不具体描述如何实现。
**补充信息**：

- 技术派中，只使用了Guava的LoadingCache类。你可以把LoadingCache看成一个完全的HashMap，只是在get()时缓存了结果，假如没有则执行对应的load()方法得到结果。
- 和Caffeine比较，Caffeine更加优秀，你可以在这篇[知乎文章](https://zhuanlan.zhihu.com/p/345175951)查看具体的信息。

**吐槽一下**：个人不建议将Guava称为一种缓存，而是一种工具，内部包含了缓存。在初始技术派时，我以为常常需要Guava和Caffeine二选一来用。
# 技术派的缓存设计
技术派的缓存设计很少，但是对于缓存的面试考点很多。
一般情况下，面试官会问你在哪些地方实现了缓存，下面开始对于这些问题的开始延展。
#### 1 如何设计缓存？
双重缓存Caffeine + Redis

- Caffeine使用官方注解。
- Redis使用自己定义AOP注解。
- Caffeine的过期时间为Redis的一半。
- 不同数据的缓存时间不同。
- 固定部分的缓存设置永不过期。

数据修改时：先更新数据库，再删缓存。
缓存数据时：提供随机固定时间+过期时间方式。
总体设计如下：

- 注解：[@RedisCache(cacheName](/RedisCache(cacheName ) = “”, keyValue=“”)、[@RedisCacheEvit(cacheName](/RedisCacheEvit(cacheName ) = “”, keyValue = “”) 
- CacheConfig类
   - prefix
   - expireTimeMode
   - expireFixedTime
   - expireMaxRandomTime
   - serialTool
- RedisCacheConfigManager：存在一个Map<String, CacheConfig>用于映射配置。提供Config的获取。自定义时在内部添加CacheConfig即可。
- AOP：[@RedisCache](/RedisCache )
   - 使用SpEL，cacheName映射RedisCacheConfig。获取key。
   - 查看缓存。
   - 方法执行，得到结果。
   - 通过RedsiCacheConfig执行缓存操作。
- [@RedisCacheEvit](/RedisCacheEvit )
   - 方法执行，得到结果。
   - 使用SpEL，cacheName映射RedisCacheConfig。得到key。
   - 执行删除操作。
   - 返回方法结果。

我觉得这个设计有点弱。仅供参考。
#### 2 什么地方使用缓存？
核心：**连续一段时间内访问同一个方法，得到的是相同的数据；或者，允许某个的方法在一段时间内返回相同结果。**
在技术派中真正意义上可以使用到缓存的地方：

- **侧边栏信息**：侧边栏的活动信息，永不过期。
- **专栏的文章列表**：
   - key：column_#{id}
   - values：#{articleId}
   - 序列化方式：JSON
   - 数据结构：list
- **文章/专栏简单信息**：文章id-文章标题、文章简介、文章作者、文章标签。（可以设置一个额外的）
   - field：article_#{id}
   - value：
   - 序列化方式：JSON
   - 数据结构：hash
```json
{
    title = "",
    intro = "",
    authorId = "",
	picUrl = "",
    tags = [""]
}
```

- **标签/用户名**：缓存标签id-name：
   - field：tag_#{id}
   - value：#{tagName}
   - 序列化方式：JSON
   - 数据结构：hash
- **热门文章排行榜**：每隔一个小时更新“一周内的热门文章TOP10”文章信息。
   - key：hot_article_rank
   - values：
   - 序列化方式：JSON
   - 数据结构：list
```json
{
    title = "",
    id = "",
    views = ""
}
```

- **热门文章内容**：对于热门文章采用缓存，非热门直接从数据库读取，更新时需要判断是否为热门文章。

其他的使用也算是缓存：

- 网站PV/UV计数
- 用户/文章状态计数
- 活跃度排行榜
- 白名单
#### 3 缓存击穿、缓存雪崩、缓存穿透怎么做的？

- 缓存击穿：热key突然过期，导致所有查询都打到MySQL上，MySQL可能承受不住。
   - 分布式锁：主要针对“热门文章”，使用Redisson实现分布式锁来缓存。并在CacheConfig中添加下面属性：
      - isLockCache
      - lockKeyPrefix
   - 若你已经加入“技术派”的语雀文档
      - 可以在进阶篇的“技术派Redis分布式锁”中看到关于分布式锁的详细教学。
      - 可以在基础篇的“技术派Redis缓存示例”中看到我的相关评论。
   - ~~设置缓存“永不过期”~~：
      - 永不过期不可能，文章修改时会出现脏读。
      - 定时更新不可能，文章内容需要及时性。
      - 时间过期设置长，仍然会出现缓存击穿。
- 缓存雪崩：多个key突然过期，导致大量查询打到MySQL上，MySQL很容易崩。
   - 单个缓存：随机过期时间
   - 不同缓存：不同的过期时间
- 缓存穿透：查询不存在的值，MySQL中没有Redis也没有，就像缓存不存在一样。
   - 存储任意的查询结果，包括null。
   - ~~布隆过滤器~~：布隆过滤器不能删除key。
#### 4 大key问题了解吗？如何解决？
大key问题：就是value很大，因为Redis单线程，导致传输的时候出现阻塞，减慢Redis的执行效率。
大key可以分为“value很大”或者“复合类型的元素超过5000个”。
技术派主要涉及大key的部分：
**1. SiteMapService**
大key问题：当文章过多会导致“文章id-文章最后一次更新时间”的hash元素过多。网站会获取全部的数据，产生大key问题。
解决方案：尝试将该hash封装为一个数据结构，将hash分为几个不同的hash，并通过某种下标分配算法分配。
分配算法可以参考下面几个：

- 哈希求余
- 一致性哈希
- 虚拟槽分区

**2. 待定**
