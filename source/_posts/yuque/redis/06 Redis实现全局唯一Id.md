---
title: 06 Redis实现全局唯一Id
urlname: nk0295vsa2w1
date: '2024-03-14 14:48:11'
updated: '2024-03-31 11:05:40'
cover: 'https://raw.githubusercontent.com/choodsire666/blog-img/main/06 Redis实现全局唯一Id/e1f996055ae07923be463fe76e2837c6.png'
description: 笔记来源：黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案1 全局唯一ID每个店铺都可以发布优惠券：当用户抢购时，就会生成订单并保存到tb_voucher_order这张表中，而订单表如果使用数据库自增ID就存在一些问题：id的规律性太明显受单表...
---
**笔记来源：**[**黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案**](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=e8046ccbdc793e09a75eb61fe8e84a30)
## 1 全局唯一ID
每个店铺都可以发布优惠券：
![1653362612286.png](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665032900159-55407570-ed06-46d3-b000-d3c84a3e2bbb.png#averageHue=%23fae9e6&clientId=u94722be3-b773-4&errorMessage=unknown%20error&from=drop&id=u1f377905&originHeight=177&originWidth=563&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8577&status=error&style=none&taskId=u878f22af-e89c-4c1c-a35c-76b67289e24&title=)
当用户抢购时，就会生成订单并保存到`tb_voucher_order`这张表中，而订单表如果使用数据库自增ID就存在一些问题：

- id的规律性太明显
- 受单表数据量的限制

**场景分析一**：如果我们的id具有太明显的规则，用户或者说商业对手很容易猜测出来我们的一些敏感信息，比如商城在一天时间内，卖出了多少单，这明显不合适。
**场景分析二**：随着我们商城规模越来越大，mysql的单表的容量不宜超过500W，数据量过大之后，我们要进行拆库拆表，但拆分表了之后，他们从逻辑上讲他们是同一张表，所以他们的id是不能一样的， 于是乎我们需要保证id的唯一性。
**全局ID生成器**：是一种在分布式系统下用来生成全局唯一ID的工具，一般要满足下列特性
![1653363100502.png](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665032931638-82031c5d-9096-4c15-b7ac-36b65dde739f.png#averageHue=%23dcc0c0&clientId=u94722be3-b773-4&errorMessage=unknown%20error&from=drop&id=ufb36ce33&originHeight=304&originWidth=743&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26687&status=error&style=none&taskId=u901518a7-c809-41e0-b4e6-657e8908c66&title=)
为了增加ID的安全性，我们可以不直接使用Redis自增的数值，而是拼接一些其它信息：
![1653363172079.png](https://cdn.nlark.com/yuque/0/2022/png/22334924/1665032979512-a5bc7a3c-e7a6-4280-a7bd-abd67df25f17.png#averageHue=%23fcf4f4&clientId=u94722be3-b773-4&errorMessage=unknown%20error&from=drop&id=u71113513&originHeight=199&originWidth=905&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9273&status=error&style=none&taskId=u0617bb28-f92c-45ca-bb4b-a3523ec56d2&title=)
ID的组成部分：符号位：1bit，永远为0
**时间戳**：31bit，以秒为单位，可以使用69年
**序列号**：32bit，秒内的计数器，支持每秒产生2^32个不同ID
## 2 Redis实现全局唯一Id
```java
@Component
public class RedisIdWorker {
    /**
     * 开始时间戳
     */
    private static final long BEGIN_TIMESTAMP = 1640995200L;
    /**
     * 序列号的位数
     */
    private static final int COUNT_BITS = 32;

    private StringRedisTemplate stringRedisTemplate;

    public RedisIdWorker(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public long nextId(String keyPrefix) {
        // 1.生成时间戳
        LocalDateTime now = LocalDateTime.now();
        long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
        long timestamp = nowSecond - BEGIN_TIMESTAMP;

        // 2.生成序列号
        // 2.1.获取当前日期，精确到天
        String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        // 2.2.自增长
        long count = stringRedisTemplate.opsForValue().increment("icr:" + keyPrefix + ":" + date);

        // 3.拼接并返回
        return timestamp << COUNT_BITS | count;
    }
}
```
测试类
```java
@Test
void testIdWorker() throws InterruptedException {
    CountDownLatch latch = new CountDownLatch(300);

    Runnable task = () -> {
        for (int i = 0; i < 100; i++) {
            long id = redisIdWorker.nextId("order");
            System.out.println("id = " + id);
        }
        latch.countDown();
    };
    long begin = System.currentTimeMillis();
    for (int i = 0; i < 300; i++) {
        es.submit(task);
    }
    latch.await();
    long end = System.currentTimeMillis();
    System.out.println("time = " + (end - begin));
}
```
**知识小贴士**：关于countdownlatch

- countdownlatch名为信号枪：主要的作用是同步协调在多线程的等待于唤醒问题
- 我们如果没有CountDownLatch ，那么由于程序是异步的，当异步程序没有执行完时，主线程就已经执行完了，然后我们期望的是分线程全部走完之后，主线程再走，所以我们此时需要使用到CountDownLatch
- CountDownLatch 中有两个最重要的方法:`countDown``await`
   - await 方法是阻塞方法，我们担心分线程没有执行完时，main线程就先执行，所以使用await可以让main线程阻塞，那么什么时候main线程不再阻塞呢？当CountDownLatch  内部维护的 变量变为0时，就不再阻塞，直接放行，那么什么时候CountDownLatch维护的变量变为0 呢，我们只需要调用一次countDown ，内部变量就减少1，我们让分线程和变量绑定， 执行完一个分线程就减少一个变量，当分线程全部走完，CountDownLatch 维护的变量就是0，此时await就不再阻塞，统计出来的时间也就是所有分线程执行完后的时间。
