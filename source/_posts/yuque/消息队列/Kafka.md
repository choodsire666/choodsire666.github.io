---
title: Kafka
urlname: en74nvgltz2kkh16
date: '2024-03-15 16:52:06'
updated: '2024-03-15 17:01:55'
description: 'Kafka集群第一种方式搭建zookeeper集群version: ''3''  # 定义了一个网络, 用于和kafka位于同一个网络 networks:   zk-net:     name: "zk-net"     driver: bridge  services:   zoo1:     ...'
---

### Kafka集群
#### 第一种方式
##### 搭建zookeeper集群
```yaml
version: '3'

# 定义了一个网络, 用于和kafka位于同一个网络
networks:
  zk-net:
    name: "zk-net"
    driver: bridge

services:
  zoo1:
    image: zookeeper
    container_name: zoo1
    # 一定要给权限
    privileged: true
    ports:
      - "2181:2181"
    environment:
      # myid
      ZOO_MY_ID: 1
      # zookeeper集群的服务地址
      ZOO_SERVERS: "server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181"
    networks:
      - zk-net

  zoo2:
    image: zookeeper
    container_name: zoo2
    privileged: true
    ports:
      - "2182:2181"
    environment:
      ZOO_MY_ID: 2
      ZOO_SERVERS: "server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181"
    networks:
      - zk-net

  zoo3:
    image: zookeeper
    container_name: zoo3
    privileged: true
    ports:
      - "2183:2181"
    environment:
      ZOO_MY_ID: 3
      ZOO_SERVERS: "server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181"
    networks:
      - zk-net
```
```shell
# 启动
docker-compose -f docker-compose-zoo.yml up -d
```
##### 搭建kafka集群
```yaml
version: '3'

# 引入网络
networks:
  zk-net:
    external: true

services:
  kafka1:
    image: 'bitnami/kafka'
    container_name: kafka1
    hostname: kafka1
    # 一定要给权限
    privileged: true
    environment:
      # kafka的brokerid, 要唯一
      KAFKA_BROKER_ID: 0
      # 连接zookeeper
      KAFKA_CFG_ZOOKEEPER_CONNECT: zoo1:2181,zoo2:2181,zoo3:2181
      # 用于指定 Kafka broker 向客户端报告的监听器的地址
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://kafka1:9092
      # 监听端口
      KAFKA_CFG_LISTENERS: PLAINTEXT://0.0.0.0:9092
      ALLOW_PLAINTEXT_LISTENER: yes
    ports:
      - '9092:9092'
    depends_on:
      - zoo1
      - zoo2
      - zoo3
    networks:
      - zk-net

  kafka2:
    image: 'bitnami/kafka'
    container_name: kafka2
    hostname: kafka2
    privileged: true
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_CFG_ZOOKEEPER_CONNECT: zoo1:2181,zoo2:2181,zoo3:2181
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://kafka2:9093
      KAFKA_CFG_LISTENERS: PLAINTEXT://0.0.0.0:9093
      ALLOW_PLAINTEXT_LISTENER: yes
    ports:
      # 要和其他不一样, 在同一台机器上的话
      - '9093:9093'
    depends_on:
      - zoo1
      - zoo2
      - zoo3
    networks:
      - zk-net

  kafka3:
    image: 'bitnami/kafka'
    container_name: kafka3
    hostname: kafka3
    privileged: true
    environment:
      KAFKA_BROKER_ID: 2
      KAFKA_CFG_ZOOKEEPER_CONNECT: zoo1:2181,zoo2:2181,zoo3:2181
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://kafka3:9094
      KAFKA_CFG_LISTENERS: PLAINTEXT://0.0.0.0:9094
      ALLOW_PLAINTEXT_LISTENER: yes
    ports:
      - '9094:9094'
    depends_on:
      - zoo1
      - zoo2
      - zoo3
    networks:
      - zk-net

  kafka-manager:
    image: sheepkiller/kafka-manager
    container_name: kafka-manager
    hostname: kafka-namager
    privileged: true
    ports:
      - '9000:9000'
    environment:
      ZK_HOSTS: zoo1:2181,zoo2:2181,zoo3:2181
    networks:
      - zk-net
```
```shell
# 启动
docker-compose -f docker-compose-kafka.yml up -d
```

#### 第二种方式
```yaml
version: "3.0"

services:
  zoo1:
    image: zookeeper
    container_name: zoo1
    hostname: zoo1
    privileged: true
    ports:
      - 2181:2181
    environment:
      TZ: Asia/Shanghai
      ZOO_MY_ID: 1 
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181

  zoo2:
    image: zookeeper
    container_name: zoo2
    hostname: zoo2
    privileged: true
    ports:
      - 2182:2181
    environment:
      TZ: Asia/Shanghai
      ZOO_MY_ID: 2 
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181
  
  zoo3:
    image: zookeeper
    container_name: zoo3
    hostname: zoo3
    privileged: true
    ports:
      - 2183:2181
    environment:
      ZOO_MY_ID: 3 
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181

  kafka1:
    image: bitnami/kafka
    container_name: kafka1
    hostname: kafka1
    privileged: true
    ports:
      - 9092:9092
    environment:
      TZ: Asia/Shanghai
      KAFKA_BROKER_ID: 0
      KAFKA_ZOOKEEPER_CONNECT: zoo1:2181,zoo2:2181,zoo3:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka1:9092
      KAFKA_LISTENERS: PLAINTEXT://:9092
      ALLOW_PLAINTEXT_LISTNER: yes

  kafka2:
    image: bitnami/kafka
    container_name: kafka2
    hostname: kafka2
    privileged: true
    ports:
      - 9093:9093
    environment:
      TZ: Asia/Shanghai
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zoo1:2181,zoo2:2181,zoo3:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka2:9093
      KAFKA_LISTENERS: PLAINTEXT://:9093
      ALLOW_PLAINTEXT_LISTNER: yes

  kafka3:
    image: bitnami/kafka
    container_name: kafka3
    hostname: kafka3
    privileged: true
    ports:
      - 9094:9094
    environment:
      TZ: Asia/Shanghai
      KAFKA_BROKER_ID: 2
      KAFKA_ZOOKEEPER_CONNECT: zoo1:2181,zoo2:2181,zoo3:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka3:9094
      KAFKA_LISTENERS: PLAINTEXT://:9094
      ALLOW_PLAINTEXT_LISTNER: yes

  kafka-manager:
    image: sheepkiller/kafka-manager
    container_name: kafka-manager
    hostname: kafka-manager
    privileged: true
    ports:
      - 9000:9000
    environment:
      TZ: Asia/Shanghai
      ZK_HOSTS: zoo1:2181,zoo2:2181,zoo3:2181

  kafka-boot:
    image: kafka-boot
    container_name: kafka-boot
    hostname: kafka-boot
    privileged: true
    ports:
      - 8080:8080
    environment:
      KAFKA_IP: kafka1
```

```shell
# 启动
docker-compose up -d
```
