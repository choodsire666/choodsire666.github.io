---
title: Rabbitmq
urlname: pz454cmh13ivgg1u
date: '2024-03-15 16:33:28'
updated: '2024-03-15 16:51:58'
cover: 'https://raw.githubusercontent.com/choodsire666/blog-img/main/Rabbitmq/5b674f4589203984b830fc84f82aac6c.png'
description: '第一章 RabbitMQ介绍MQ: (Messaeg queue)消息队列发送者,只管把消息放进消息队列,并不知道接受者是谁接受者,只管从消息队列中取消息,并不知道发送者是谁从而实现了异步,提高了效率,解耦合RabbitMQ: 实现了AMQP协议的MQ,是由Erlang语言开发的需要基于Erl...'
---
### 第一章 RabbitMQ介绍

MQ: (Messaeg queue)消息队列

发送者,只管把消息放进消息队列,并不知道接受者是谁

接受者,只管从消息队列中取消息,并不知道发送者是谁

从而实现了异步,提高了效率,解耦合

RabbitMQ: 实现了AMQP协议的MQ,是由Erlang语言开发的

需要基于Erlang环境使用

AMQP: Advanced Message Queue Protocol,高级消息队列协议.它是应用层协议的一个开发标准

为面向消息的中间件设计,基于此协议的客户端与消息中间件可传递消息,并不受产品,开发语言等条件的

限制

RabbitMQ: 最初起源于金融系统,用于在分布式系统中存储转发消息,在易用性,扩展性,高可用性,安全性等方面表现不俗

特点

- 可靠性: 使用一些机制来保证可靠性,如持久化,传输确认,发布确认
- 灵活的路由: 在消息进入队列之前,通过Exchang来路由消息.对与典型的路由功能,RabbitMQ已经提供了一些内置的Exchang绑定在一起,也通过插件机制实现自己的Exchang
- 消息集群: 多个RabbitMQ服务器可以组成一个集群,形成一个逻辑Broker.
- 高可用: 队列可以在集群中的机器上进行镜像,使得在部分节点出现问题的情况下队列依然可以用
- 多种协议: RabbitMQ支持多种消息队列协议,如 STOMP,MQTT,AMQP等
- 多语言客户端: RabbitMQ几乎支持所有常用语言,如java,.NET,Ruby,Python等
- 管理界面: RabbitMQ提供了一个易用的用户界面,使得用户可以监控和管理消息Broker的许多方面
- 跟踪机制: 如果消息异常,RabbitMQ 提供了消息跟踪机制,使用者可以找出发生了什么

### 第二章 RabbitMQ的安装

安装需要Erlang语言

Erlang: [https://www.erlang.org/downloads](https://www.erlang.org/downloads)

RabbitMQ官方下载地址: [https://www.rabbitmq.com/download.html](https://www.rabbitmq.com/download.html)

```shell
#依赖库的准备
yum install gcc glibc-devel make ncurses-devel openssl-devel xmlto

#下载erlang
wget https://packages.erlang-solutions.com/erlang-solutions-2.0-1.noarch.rpm
rpm -Uvh erlang-solutions-2.0-1.noarch.rpm
sudo yum install erlang

#下载RabbitMQ
#上传rabbitmq-server-3.9.14-1.el8.noarch.rpm
rpm -ivh --nodeps rabbitmq-server-3.9.14-1.el8.noarch.rpm
```

### 第三章 RabbitMQ常用命令

#### 启动和停止

```shell
#启动
rabbitmq-server start &

#停止
rabbitmqctl stop

ps -ef|gerp rabbitmq 
kill
```

#### 插件管理

添加插件

rabbitmq-plugins enable 插件名

删除插件

rabbitmq-plugins disable 插件名

使用管控台

rabbitmq-plugins enable rabbitmq_management

[http://ip:15672](http://ip:15672)

#### 用户管理

管控台的默认用户guest密码guest 只能在本机登入

添加用户

rabbitmqctl add_user root root

删除用户

rabbitmqctl delete_user root

修改密码

rabbitmqctl change_password root123456

设置用户角色

rabbitmqctl set_user_tags username tag

rabbitmqctl set_user_tags root administartor

tag: management,monitoring,policymaker,administrator

### 第四章  交换机的类型

#### java依赖

```xml
<dependencies>
    <dependency>
        <groupId>com.rabbitmq</groupId>
        <artifactId>amqp-client</artifactId>
        <version>5.14.1</version>
    </dependency>
</dependencies>
```

```java
//获取一个信道
public static Channel createChannel() throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();

        factory.setHost("192.168.1.104");
        factory.setUsername("root");
        factory.setPassword("root");

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        return channel;
}
```

```java
//声明一个交换机
/**
* exchange: 交换机名称
* type: 交换机类型
* durable: 是否持久化
* autoDelete: 是否自动删除
* internal: 设置是否内置的。如果设置为true，则表示是内置的交换器，客户端程序无法直接发送消息到这个交换器中，
* 只能通过交换器路由到交换器这种方式。
* arguments: 参数
*/
exchangeDeclare(String exchange, BuiltinExchangeType type, boolean durable, boolean autoDelete, boolean internal, Map<String, Object> arguments)
```

```java
//声明一个队列
/**
* queue: 队列名称
* durable: 是否持久化
* exclusive: 是否排外
* autoDelete: 是否自动删除
* arguments: 参数,比如过期时间:x-message-ttl,最大长度,死信交换机:x-dead-letter-exchange,死信routing     key:x-dead-letter-routing-key 
*/
queueDeclare(String queue, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments);

//获取一个随机队列
channel.queueDeclare().getQueue();
```

```java
//绑定一个交换机和队列
/**
* queue: 队列名称
* exchange: 交换机名称
* routingkey: 路由键--->如果是fanout类型,为空字符串:""
*/
queueBind(String queue, String exchange, String routingKey)
```

```java
//接收消息
/**
* queue:队列名称
* autoAck: 是否自动确认
* callback: 回调函数
*/ 
basicConsume(String queue, boolean autoAck, Consumer callback)

//如
channel.basicConsume(NORMAL_QUEUE,true,new DefaultConsumer(channel){
            @Override
    		/**
    		* consumerTag: 消费者编号
            *  envelope: getDeliveryTag(): 获取消息编号 getExchange():获取交换机
            * getRoutingKey():获取路由键,isRedeliver():是否重复接收
            * properties: 属性
            * body: 消息
    		*/
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties 					properties, byte[] body) throws IOException {
                super.handleDelivery(consumerTag, envelope, properties, body);
            }
});

/**
* queue: 队列名称
* autoAck: 是否自动确认
* deliverCallback: 接受消息回调函数
* CancelCallback: 取消消息回调函数
*/
basicConsume(String queue, boolean autoAck, DeliverCallback deliverCallback, CancelCallback cancelCallback);

/**
* consumerTags: 消费者编号
* delivery: getBody(): 获取消息,getEnvelope(): 获取envelope ,getProperties(): 获取属性
*/
DeliverCallback callback = new DeliverCallback() {
            public void handle(String consumerTags, Delivery delivery) throws IOException {

            }
};

//consumerTags: 消费者编号
CancelCallback cancelCallback = new CancelCallback() {
            public void handle(String consumerTags) throws IOException {

            }
};
```

```java
//发送消息
/**
* exchange: 交换机名称,如果没有为""
* routingkey: 路由键:如果没有为""
* props: AMQP.BasicProperties ,属性
* body: 消息
*/
basicPublish(String exchange, String routingKey, BasicProperties props, byte[] body);

//设置属性
AMQP.BasicProperties properties = new AMQP.BasicProperties().builder().expiration("1").build();
```

#### Direct类型

一对一

#### Fanout类型

消息会分发到所有绑定的队列上去,转发消息是最快的,只要订阅了就会收到.不能保证信息一定能收到,用于信息不重要的场景,收不收得到都无所谓

#### Topic类型

通过消息匹配的形式绑定

用#和_匹配,# 代表 0个或多个单词, _ 代表匹配一个单词.

单词和单词之间用 . 分割 如果 : aa.bb

### 第五章 事务

channel.txSelect();

channel.txCommit();

channnel.txRollback();

### 第六章 发送确认

confirmSelect(): 开启发送确认

#### waitForConfirms()

确认一条消息是否发送成功,成功返回true,失败返回false

失败如果要补发消息,可以通过递归,或redis + 定时任务

可以传入一个毫秒值,如果超时也会认为失败

#### waitForConfirmsOrDie()

批量消息确认

会判断之前发送的所有消息是否发送成功,如果有一条没成功,就会抛出异常,无返回值

可以传入一个毫秒值,如果超时也失败

确认速度比普通快,但是无法确认哪条失败了,补发需要全部补发

#### addConfirmListener()

```java
channel.addConfirmListener(new ConfirmListener() {
    //成功
    //l: 消息编号,从1开始
    //b: 是否是多条,如果是多条,代表是小于等于该编号的消息
    public void handleAck(long l, boolean b) throws IOException {
        
    }

    //失败
    public void handleNack(long l, boolean b) throws IOException {

    }
});
```

可以通过并发map: ConcurrentSkipListMap来存取key:编号,value:消息.

在确定回调中删除确认的消息.

从而拿到未确定的消息.再来重发

### 第七章 接受确认

接受监听中,第二个参数为true 表示自动确认,会把消息从消息队列中移除

为false,表示手动确认,如果不做处理,会把消息放到unpack中,而不会移除

basicAck():确认,如果传true,表示该tag,以下的都确认,如果传false,表示只确认这一条

basicRecover(): 重新发送到队列中

basicReject():拒绝接受,不处理,只能拒接一条.可以设置为放到队列,或者丢掉

basicNack():可以一次性拒绝多条消息

envelope.getDeliveryTag(): 获取消息编号

envelope.isRedeliver(): 是否已经处理过

如果用到了事务:

如果不提交事务,那么就无法确认消息

第二个参数表示是否是自动确认

```java
channel.basicConsume("topicQueue.03",false,"",new DefaultConsumer(channel){
    @Override
    public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
        String message = new String(body,"utf-8");
        System.out.println("03: " + message);
    }
});
```

### 第八章 不公平分发

```java
//默认是公平分发,轮询分发
channel.basicQos(0);
//当值为1,为不公平分发,能者多劳
channel.basicQos(1);
//当值大于1,为预期值,指定分配.
channel.basicQos(2);
```

### 第九章 死信队列

当消息进入队列时,由于队列中消息数量满了,消息过期了,消息被拒了-->称为死信--->进入死信队列--->再做处理

条件:

-  消息数量满了 
```java
//可以接收的数量-->指堆积
arguments.put("x-max-length",6);
```
 

-  消息过期了 
```java
Map<String,Object> arguments = new HashMap<String, Object>();
arguments.put("x-dead-letter-exchange","dead_exchange");
arguments.put("x-dead-letter-routing-key","lisi");
arguments.put("x-message-ttl",10000);

channel.queueDeclare(NORMAL_QUEUE,false,false,false,arguments);
```
 
```java
//设置属性
AMQP.BasicProperties properties = new AMQP.BasicProperties().builder().expiration("10000").build();
```
 

-  消息被拒了 

```java
//deliveryTag: 消息编号
//requeue: 是否重新入列
basicReject(long deliveryTag, boolean requeue);
```

```java
//deliveryTag: 消息编号
//multiple: 是否批量应答
basicAck(long deliveryTag, boolean multiple);
```

### 第九章 延迟队列

过期时间:

联想成-->if else

如果在过期时间内--->消费者一来处理

过了过期时间--->消费者二来处理

由消费者二处理--->延迟队列,延迟时间就是过期时间

场景:

订单在十分钟之内未支付自动取消订单等

```java
/**
* name: 交换机名称
* durable: 是否持久化
* autoDelete: 是否自动删除
* arguments: 参数
*/
DirectExchange(String name, boolean durable, boolean autoDelete, Map<String, Object> arguments);

//创建交换机
@Bean
public DirectExchange xExchange(){
    return new DirectExchange(X_EXCHANGE);
}
```

```java
/**
* name: 队列名称
* durable: 是否持久化
* exclusive: 是否排外
* autoDelete: 是否自动删除
* arguments: 参数
*/
Queue(String name, boolean durable, boolean exclusive, boolean autoDelete, @Nullable Map<String, Object> arguments);

//创建队列
@Bean
public Queue queueA(){
    Map<String,Object> arguments = new HashMap<>();
    arguments.put("x-message-ttl",10000);
    arguments.put("x-dead-letter-exchange",Y_DEAD_LETTER_EXCHANGE);
    arguments.put("x-dead-letter-routing-key","YD");
    //带参数
    return QueueBuilder.durable(QUEUE_A).withArguments(arguments).build();
}
```

```java
//创建绑定关系
@Bean
public Binding queueABindingX(){
    //bind(queue).to(exchange).with(routingkey)
    return BindingBuilder.bind(queueA()).to(xExchange()).with("XA");
}
```

```java
@Resource
private RabbitTemplate rabbitTemplate;

@GetMapping("sendMsg/{message}")
public void sendMsg(@PathVariable String message){
     log.info("当前时间:{},发送一条信息给TTL队列:{}",new Date().toString(),message);
    //交换机名称,routingkey,消息
     rabbitTemplate.convertAndSend("X","XA","消息来自ttl为10s的队列:" + message);
     rabbitTemplate.convertAndSend("X","XB","消息来自ttl为40s的队列:" + message);
}
```

```java
@RabbitListener(queues = {"QD"})
    public void receiveD(Message message, Channel channel){
        String msg = new String(message.getBody());
        log.info("当前时间:{},收到死信队列的消息:{}",new Date().toString(),msg);
}
```

```java
@GetMapping("/sendExpirationMsg/{message}/{ttlTime}")
    public void sendMsg(@PathVariable String message,@PathVariable String ttlTime){
        log.info("当前时间:{},发送一条信息给TTL队列:{}",new Date().toString(),message);
        rabbitTemplate.convertAndSend("X","XC","消息来自ttl为"+ttlTime+"ms的队列:" + message,
                msg -> {
            msg.getMessageProperties().setExpiration(ttlTime);
            return msg;
        });
}
```

```
2022-04-04 18:59:47.616  INFO 25144 --- [nio-8080-exec-8] c.x.r.controller.SendMessageController   : 当前时间:Mon Apr 04 18:59:47 CST 2022,发送一条信息给TTL队列:com on baby1
2022-04-04 18:59:52.121  INFO 25144 --- [nio-8080-exec-9] c.x.r.controller.SendMessageController   : 当前时间:Mon Apr 04 18:59:52 CST 2022,发送一条信息给TTL队列:com on baby2
2022-04-04 19:00:07.620  INFO 25144 --- [ntContainer#0-1] c.x.r.consumer.DeadLetterQueueConsumer   : 当前时间:Mon Apr 04 19:00:07 CST 2022,收到死信队列的消息:消息来自ttl为20000ms的队列:com on baby1
2022-04-04 19:00:07.620  INFO 25144 --- [ntContainer#0-1] c.x.r.consumer.DeadLetterQueueConsumer   : 当前时间:Mon Apr 04 19:00:07 CST 2022,收到死信队列的消息:消息来自ttl为2000ms的队列:com on baby2
```

//通过以上的延迟队列,需要排队.

如果第二条消息的延迟时间比第一条短,到时候接受还是第一条消息在前面

要实现真正的延迟队列需要使用插件

[https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases)

```shell
#将这个插件放到plugins文件夹中
/usr/lib/rabbitmq/lib/rabbitmq_server-3.9.14/plugins
#然后安装
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
#重启服务
systemctl restart rabbitmq-server
```

//使用延迟队列

```java
private static final String DELAYED_QUEUE_NAME = "delayed.queue";
private static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";
private static final String DELAYED_ROUTING_KEY = "delayed.routingkey";

@Bean
public CustomExchange delayedExchange(){

    Map<String,Object> arguments = new HashMap<>();
    arguments.put("x-delayed-type","direct");

    /**
     *  交换机名称
     *  交换机类型
     *  是否持久化
     *  是否自动删除
     *  参数
     */
    return new CustomExchange(DELAYED_EXCHANGE_NAME,"x-delayed-message",true,false,arguments);
}

@Bean
public Queue delayedQueue(){
    return new Queue(DELAYED_QUEUE_NAME);
}

@Bean
public Binding delayedQueueBindingDelayedExchange(@Qualifier("delayedQueue") Queue delayedQueue,@Qualifier("delayedExchange") CustomExchange delayedExchange){
    return BindingBuilder.bind(delayedQueue).to(delayedExchange).with(DELAYED_ROUTING_KEY).noargs();
}
```

```java
@GetMapping("/sendDelayedMsg/{message}/{delayTime}")
public void sendMsg(@PathVariable String message,@PathVariable Integer delayTime){
    log.info("当前时间:{},发送一条延迟{}毫秒的信息给延迟队列:{}",new Date().toString(),delayTime,message);
    rabbitTemplate.convertAndSend("delayed.exchange","delayed.routingkey","消息来自延迟队列:" + message,
            msg -> {
                msg.getMessageProperties().setDelay(delayTime);
                return msg;
    });
}
```

```
2022-04-04 18:58:30.703  INFO 25144 --- [nio-8080-exec-5] c.x.r.controller.SendMessageController   : 当前时间:Mon Apr 04 18:58:30 CST 2022,发送一条延迟20000毫秒的信息给延迟队列:com on baby1
2022-04-04 18:58:36.182  INFO 25144 --- [nio-8080-exec-6] c.x.r.controller.SendMessageController   : 当前时间:Mon Apr 04 18:58:36 CST 2022,发送一条延迟2000毫秒的信息给延迟队列:com on baby2
2022-04-04 18:58:38.191  INFO 25144 --- [ntContainer#1-1] c.x.r.consumer.DelayQueueConsumer        : 当前时间:Mon Apr 04 18:58:38 CST 2022,收到延迟队列的消息:消息来自延迟队列:com on baby2
2022-04-04 18:58:50.710  INFO 25144 --- [ntContainer#1-1] c.x.r.consumer.DelayQueueConsumer        : 当前时间:Mon Apr 04 18:58:50 CST 2022,收到延迟队列的消息:消息来自延迟队列:com on baby1
```

### 第十章 发布确认高级

#### 发布确认

```yaml
spring:
  rabbitmq:
    host: 192.168.1.104
    username: root
    password: root
    port: 5672
    publisher-confirm-type: correlated
    #publisher-confirm-type: NONE:禁用, correlated:发送成功到交换器后调用  simple:失败后会关闭信道,同步确认
```

```java
@Slf4j
@Component
public class MyCallBack implements RabbitTemplate.ConfirmCallback {

    //注入
    @Resource
    private RabbitTemplate rabbitTemplate;

    //会自动调用改方法
    @PostConstruct
    public void init(){
        //注入到rabbitTemplate中
        rabbitTemplate.setConfirmCallback(this);
    }

    /**
     * 交换机回调方法
     * @param correlationData 保存回调消息的id及消息
     * @param b 是否收到消息
     * @param s 原因
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean b, String s) {
        if(b){
            log.info("交换机已经收到了ID为{}的消息",correlationData.getId()==null?"":correlationData.getId());
        }else{
            log.info("交换机还没收到ID为{}的消息,原因是:{}",correlationData.getId()==null?"":correlationData.getId(),s);
        }
    }
}
```

```java
@GetMapping("/sendMsg/{message}")
public void sendMsg(@PathVariable String message){
    CorrelationData correlationData = new CorrelationData("1");
    rabbitTemplate.convertAndSend(ConfirmConfig.EXCHANGE_NAME,ConfirmConfig.ROUTING_KEY,message,correlationData);
    log.info("发送消息内容:{}",message);
}
```

#### 回退消息

```yaml
spring:
  rabbitmq:
    host: 192.168.1.104
    username: root
    password: root
    port: 5672
    publisher-returns: true
```

```java
@Slf4j
@Component
public class MyCallBack implements RabbitTemplate.ConfirmCallback,RabbitTemplate.ReturnsCallback{

    //注入
    @Resource
    private RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init(){
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnsCallback(this);
    }

    /**
     * 交换机回调方法
     * @param correlationData 保存回调消息的id及消息
     * @param b 是否收到消息
     * @param s 原因
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean b, String s) {
        if(b){
            log.info("交换机已经收到了ID为{}的消息",correlationData.getId()==null?"":correlationData.getId());
        }else{
            log.info("交换机还没收到ID为{}的消息,原因是:{}",correlationData.getId()==null?"":correlationData.getId(),s);
        }
    }

    /**
     * 无法路由时调用
     * @param returnedMessage
     */
    @SneakyThrows
    @Override
    public void returnedMessage(ReturnedMessage returnedMessage) {
        log.error("消息{},被交换机{}退回,退回原因:{},路由key:{}",new String(returnedMessage.getMessage().getBody(),"utf-8"),
                returnedMessage.getExchange(),returnedMessage.getReplyText(),returnedMessage.getRoutingKey());
    }
}
```

```java
@GetMapping("/sendMsg/{message}")
public void sendMsg(@PathVariable String message){
    CorrelationData correlationData = new CorrelationData("1");
    rabbitTemplate.convertAndSend(ConfirmConfig.EXCHANGE_NAME,ConfirmConfig.ROUTING_KEY + "123",message,correlationData);
    log.info("发送消息内容:{}",message);
}
```

#### 备份交换机

```java
@Bean
public DirectExchange directExchange(){
    return ExchangeBuilder.directExchange(EXCHANGE_NAME).durable(true).withArgument("alternate-exchange",BACKUP_EXCHANGE_NAME).build();
}

@Bean
    public FanoutExchange backupExchange(){
        return new FanoutExchange(BACKUP_EXCHANGE_NAME);
    }

    @Bean
    public Queue backQueue(){
        return new Queue(BACKUP_QUEUE_NAME);
    }

    @Bean
    public Queue warningQueue(){
        return new Queue(WARNING_QUEUE_NAME);
    }

    @Bean
    public Binding backupQueueBindingBackupExchange(Queue backQueue,FanoutExchange backupExchange){
        return BindingBuilder.bind(backQueue).to(backupExchange);
    }

    @Bean
    public Binding warningQueueBindingBackupExchange(Queue warningQueue,FanoutExchange backupExchange){
        return BindingBuilder.bind(warningQueue).to(backupExchange);
    }
```

### 幂等性

消息重复消费

可能由于网路等原因造成,重复

### 优先级

优先队列中: 0 - 255

数字越大,优先级越高

x-max-priority: 最大优先级

```java
Map<String,Object> arguments = new HashMap<String, Object>();
        arguments.put("x-max-priority",10);

        channel.queueDeclare("priorityQueue",false,false,false,arguments);

        String message;
        for(int i = 1;i < 11;i++){
            message = "info" + i;
            if(i == 5){
                AMQP.BasicProperties properties = new AMQP.BasicProperties().builder().priority(5).build();
                channel.basicPublish("","priorityQueue",properties,message.getBytes());
            }else{
                channel.basicPublish("","priorityQueue",null,message.getBytes());
            }
        }
```

### 惰性队列

x-queue-mode: lazy:惰性队列 default: 正常队列

惰性队列消息存在硬盘中,读取慢,消费慢,占用内存极小

正常队列存在内存中,读取快,效率高,占用内存大

### 集群

1. 


准备n台主机

修改主机的,/etc/hostname 主机名

修改主机的/etc/hosts 本地dns映射

2. 


确保各个节点的cookie文件使用同一个值

```shell
scp /var/lib/rabbitmq/.erlang.cookie root@node2:/var/lib/rabbitmq/.erlang.cookie
```

3.启动rabbitmq服务

```shell
rabbitmq-server-detached
```

4.加入节点

```shell
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@node1
rabbitmqctl start_app
```

5. 


查看集群状态

```shell
rabbitmqctl cluster_status
```

6.重新设置用户

创建账号

```shell
rabbitmqctl add_user admin 123
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
```

7.解除集群节点

```shell
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
rabbitmqctl cluster_status
rabbitmqctl forget_cluster_node rabbit@node2 #(主节点机忘记加入进来的)
```

### 镜像队列

添加策略

name: 策略名称

pattern: 匹配规则 , 如^mirror

apply to: 匹配类型

definition:

	ha-mode: exactly : 指定型

	ha-params: 2 : 之数量

	ha-sync-mode: automatic :自动

### 负载均衡

nginx

或

haproxy + keepalive

### 联邦交换机

不同地方的rabbitmq数据同步问题

1.开启插件

```shell
rabbitmq-plugins enable rabbitmq_federation
rabbitmq-plugins enable rabbitmq_federation_management
```

2.创建交换机

3.在下游配置upstream

name:名称

uri: amqp://用户名:密码@ip

4.配置策略

name:名称

pattern: 匹配规则

apply to: 匹配类型,exchanges

definition:

	federation-upstream = 刚刚配置的upstream名称

### 联邦队列

2.创建交换机

3.在下游配置upstream

name:名称

uri: amqp://用户名:密码@ip

4.配置策略

name:名称

pattern: 匹配规则

apply to: 匹配类型,queues

definition:

	federation-upstream = 刚刚配置的upstream名称

### Shovel

可以从一个Borker中的队列(源端)拉取数据发送到Borker的交换器(目的端).可以位于不同的broker或者相同的broker

1.装插件

```shell
rabbitmq-plugins enable rabbitmq_shovel
rabbitmq-plugins enable rabbitmq_shovel_management
```

2.配置

name : 自定义

source: 版本

	uri: amqp://用户名:密码@ip

Destination: 版本

	uri:amqp://用户名:密码@ip




### 采用docker配置集群
```yaml
version: "3.0"

services:
  rabbit1:
    image: rabbitmq
    container_name: rabbit1
    hostname: rabbit1
    privileged: true
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
      RABBITMQ_ERLANG_COOKIE: admin
    ports:
      - 15672:15672
      - 5672:5672

  rabbit2:
    image: rabbitmq
    container_name: rabbit2
    hostname: rabbit2
    privileged: true
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
      RABBITMQ_ERLANG_COOKIE: admin
    ports:
      - 15673:15672
      - 5673:5672

  rabbit3:
    image: rabbitmq
    container_name: rabbit3
    hostname: rabbit3
    privileged: true
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
      RABBITMQ_ERLANG_COOKIE: admin
    ports:
      - 15674:15672
      - 5674:5672
```

```shell
# 运行容器
docker-compose -f docker-compose-rabbit.yml up -d
```

然后需要进入容器中, 开启rabbitmq_management, 并加入集群
```shell
# 进入容器
docker exec -it rabbit1 /bin/bash
# 查看集群状态
rabbitmqctl cluster_status
# 然后能看到节点名称, 记下来, 应该是rabbit@rabbit1
# 开启management
rabbitmq-plugins enable rabbitmq_management
# 开启一下全部features
rabbitmqctl enable_feature_flag all
# 设置一下, 防止管理页面中channel页面报错
cd  /etc/rabbitmq/conf.d/
echo management_agent.disable_metrics_collector = false > management_agent.disable_metrics_collector.conf

# 退出该容器
exit

# 进入容器
docker exec -it rabbit2 /bin/bash
# 查看集群状态, 应该是rabbit@rabbit2
rabbitmqctl cluster_status
# 加入集群
rabbitmqctl join_cluster rabbit@rabbit1

# 开启management
rabbitmq-plugins enable rabbitmq_management
# 开启一下全部features
rabbitmqctl enable_feature_flag all
# 设置一下, 防止管理页面中channel页面报错
cd  /etc/rabbitmq/conf.d/
echo management_agent.disable_metrics_collector = false > management_agent.disable_metrics_collector.conf

# 退出该容器
exit

# 进入容器
docker exec -it rabbit3 /bin/bash
# 查看集群状态, 应该是rabbit@rabbit3
rabbitmqctl cluster_status
# 加入集群
rabbitmqctl join_cluster rabbit@rabbit1

# 开启management
rabbitmq-plugins enable rabbitmq_management
# 开启一下全部features
rabbitmqctl enable_feature_flag all
# 设置一下, 防止管理页面中channel页面报错
cd  /etc/rabbitmq/conf.d/
echo management_agent.disable_metrics_collector = false > management_agent.disable_metrics_collector.conf

# 这时候就配置好了
rabbitmqctl cluster_status
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43047777/1710492166285-327cc967-76a9-4b62-bae3-3b8ac3c2af5f.png#averageHue=%23f6f5ed&clientId=u2834c29a-87cd-4&from=paste&height=783&id=u0ed51ba3&originHeight=979&originWidth=1668&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=153238&status=done&style=none&taskId=u007d29c5-d76b-45f5-9304-74ec2545c24&title=&width=1334.4)

在这里添加一下镜像队列Policy(虽然不知道为什么过时了)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43047777/1710492188364-db9ac9ca-aaf7-4c49-87c4-47522c550fd4.png#averageHue=%23faf9f2&clientId=u2834c29a-87cd-4&from=paste&height=786&id=u10d1d899&originHeight=982&originWidth=1847&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=135214&status=done&style=none&taskId=u3f718a2b-5f83-4a22-aaca-03cdc5b3c18&title=&width=1477.6)

### 配置HAproxy+Keepalived实现高可用

创建配置文件haproxy.cfg
```shell
defaults
    mode            tcp
    log             global
    option          tcplog
    option          dontlognull
    option http-server-close
    option          redispatch
    retries         3
    timeout http-request 10s
    timeout queue   1m
    timeout connect 10s
    timeout client  1m
    timeout server  1m
    timeout http-keep-alive 10s
    timeout check   10s
    maxconn         3000

listen rabbitmq_cluster
    bind 0.0.0.0:5666
    option tcplog
    mode tcp
    balance roundrobin
    server rabbit1 10.0.0.5:5672 check inter 2000ms rise 2 fall 3
    server rabbit2 10.0.0.5:5673 check inter 2000ms rise 2 fall 3
    server rabbit3 10.0.0.5:5674 check inter 2000ms rise 2 fall 3

listen rabbitmq_admin
   bind 0.0.0.0:15666
   server rabbit1 10.0.0.5:15672 check inter 2000ms rise 2 fall 3
   server rabbit2 10.0.0.5:15673 check inter 2000ms rise 2 fall 3
   server rabbit3 10.0.0.5:15674 check inter 2000ms rise 2 fall 3

listen http_front
    bind 0.0.0.0:25666
    mode http
    stats uri /haproxy
    stats auth admin:admin
    stats admin if TRUE

```

```shell
# 启动haproxy容器
docker run -itd --name haproxy -p 5666:5666 -p 15666:15666 -p 25666:25666 -v /opt/docker/haproxy:/usr/local/etc/haproxy --privileged=true haproxy
# 这时, 没报错的话就启动成功了
docker ps
# 去浏览器中访问一下 http://ip:15666 就可以看到rabbit的管理界面了
# 去浏览器中访问一下 http://ip:25666/haproxy 就可以考到haproxy的监控界面了
```

配置keepalived
```shell
# 执行docker命令创建keepalived-master容器
docker run -itd --name keepalived-master --net=host -e KEEPALIVED_INTERFACE="ens33" -e KEEPALIVED_PRIORITY=100 -e KEEPALIVED_UNICAST_PEERS="#PYTHON2BASH:['10.0.0.5']" -e KEEPALIVED_VIRTUAL_IPS="10.0.0.4" -e KEEPALIVED_STATE="MASTER" --privileged=true osixia/keepalived
# 执行docker命令创建keepalived-backup容器
docker run -itd --name keepalived-back --net=host -e KEEPALIVED_INTERFACE="ens33" -e KEEPALIVED_PRIORITY=100 -e KEEPALIVED_UNICAST_PEERS="#PYTHON2BASH:['10.0.0.5']" -e KEEPALIVED_VIRTUAL_IPS="10.0.0.4" -e KEEPALIVED_STATE="BACK" --privileged=true osixia/keepalived
# 执行下面命令, 可以看到ens33网卡下多了个虚拟ip, 当然你们创建的时候网卡接口要写你们自己有的,要不然报错
ip addr show

# 去浏览器中访问一下 http://虚拟ip:15666 就可以看到rabbit的管理界面了
# 去浏览器中访问一下 http://虚拟ip:25666/haproxy 就可以考到haproxy的监控界面了
```

![`L(LOU%}_SO]_6]@$(O)W2U.png](https://cdn.nlark.com/yuque/0/2024/png/43047777/1710492711849-5c8a7616-8e4b-4a63-a011-e7e05cc5cbb0.png#averageHue=%23f9f8f8&clientId=u2834c29a-87cd-4&from=drop&id=u2e017c4d&originHeight=828&originWidth=936&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=19233&status=done&style=none&taskId=u91bd8518-ddba-4094-98a5-72b12df8af5&title=)
