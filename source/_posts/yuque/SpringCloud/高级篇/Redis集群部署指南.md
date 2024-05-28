---
title: Redis集群部署指南
urlname: nsgd1vcw40dhn1gz
date: '2024-03-28 16:31:22'
updated: '2024-03-28 16:31:40'
description: "本章是基于CentOS7下的Redis集群教程，包括：单机安装RedisRedis主从Redis分片集群1.单机安装Redis首先需要安装Redis所需要的依赖：yum install -y gcc tcl然后将课前资料提供的Redis安装包上传到虚拟机的任意目录：\U0001F4CEredis-6.2.4...."
cover: ''
---
本章是基于CentOS7下的Redis集群教程，包括：

- 单机安装Redis
- Redis主从
- Redis分片集群
# 1.单机安装Redis
首先需要安装Redis所需要的依赖：
```shell
yum install -y gcc tcl
```
然后将课前资料提供的Redis安装包上传到虚拟机的任意目录：[redis-6.2.4.tar.gz](https://www.yuque.com/attachments/yuque/0/2024/gz/29688613/1711614690538-8492e392-5d23-47a1-9e1d-2f0a4f564254.gz?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2024%2Fgz%2F29688613%2F1711614690538-8492e392-5d23-47a1-9e1d-2f0a4f564254.gz%22%2C%22name%22%3A%22redis-6.2.4.tar.gz%22%2C%22size%22%3A2457940%2C%22ext%22%3A%22gz%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u44084d11-f344-4b50-9d6e-8d3c6146640%22%2C%22taskType%22%3A%22transfer%22%2C%22type%22%3A%22application%2Fx-gzip%22%2C%22mode%22%3A%22title%22%2C%22id%22%3A%22uce192a13%22%2C%22card%22%3A%22file%22%7D)
例如，我放到了/tmp目录：
![image-20210629114830642.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847333801-81369503-992e-462a-9500-2a1c52dc8454.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f7f5&clientId=ua305cb6b-5473-4&from=paste&height=139&id=u23c43b25&originHeight=208&originWidth=532&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=16430&status=done&style=none&taskId=u2811ed6e-252a-40e3-a563-4867b6a0107&title=&width=354.6666666666667)
解压缩：
```shell
tar -xvf redis-6.2.4.tar.gz
```
解压后：
![image-20210629114941810.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847415661-f24ed749-f4d6-4511-b968-846c1f1119b3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f9f8f5&clientId=ua305cb6b-5473-4&from=paste&height=140&id=u1aa008b9&originHeight=210&originWidth=520&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=15001&status=done&style=none&taskId=ue9c230ef-1aff-43c4-9456-437dea65990&title=&width=346.6666666666667)
进入redis目录：
```shell
cd redis-6.2.4
```
运行编译命令：
```shell
make && make install
```
如果没有出错就安装成功。然后修改redis.conf文件中的一些配置（**注意是四个0，不要额外的**）：
```properties
# 绑定地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问
bind 0.0.0.0
# 数据库数量，设置为1
databases 1
```
启动Redis：
```shell
redis-server redis.conf
```
停止redis服务（ctrl + c也可停止）：
```shell
redis-cli shutdown
```
# 2.Redis主从集群
## 2.1.集群结构
我们搭建的主从集群结构如图：
![image-20210630111505799.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847456789-a5c01ba6-3086-4bf8-bc79-a56dc2aa1b7d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_18%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f8edec&clientId=ua305cb6b-5473-4&from=paste&id=u7e248edd&originHeight=343&originWidth=630&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=38560&status=done&style=none&taskId=uc7e48be9-c2f8-4671-96d4-64e8b4afec6&title=)
共包含三个节点，一个主两个从。这里我们会在同一台虚拟机中开启3个redis实例，模拟主从集群，信息如下：

| IP | PORT | 角色 |
| --- | --- | --- |
| 192.168.206.129 | 7001 | master |
| 192.168.206.129 | 7002 | slave |
| 192.168.206.129 | 7003 | slave |

## 2.2.准备实例和配置
要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。
确保下面的配置已经更改（位置也别错）
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680404851794-c74df923-1b2e-4812-aa3d-fd402e1454de.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_33%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232e4d62&clientId=ufc68422e-c2bf-4&from=paste&height=429&id=ufbad919e&originHeight=643&originWidth=1143&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=732495&status=done&style=none&taskId=u8ab003ba-025f-438b-b2a1-52e47ebb5cb&title=&width=762)
### 1）创建目录
我们创建三个文件夹，名字分别叫7001、7002、7003：
```shell
# 进入/tmp目录
cd /tmp
# 创建目录
mkdir 7001 7002 7003
```
如图：
![image-20210630113929868.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847479940-c857fa12-2897-4eac-9175-16e41f14245a.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23022c4a&clientId=ua305cb6b-5473-4&from=paste&id=ua573f14c&originHeight=252&originWidth=745&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23072&status=done&style=none&taskId=u1f271c8e-6ae4-4075-9687-ae19552b3d5&title=)
### 2）恢复原始配置
修改redis-6.2.4/redis.conf文件，将其中的持久化模式改为默认的RDB模式，AOF保持关闭状态。
```properties
# 开启RDB
# save ""
save 3600 1
save 300 100
save 60 10000

# 关闭AOF
appendonly no
```
### 3）拷贝配置文件到每个实例目录
然后将redis-6.2.4/redis.conf文件拷贝到三个目录中（在/tmp目录执行下列命令）：
```shell
# 方式一：逐个拷贝
cp redis-6.2.4/redis.conf 7001
cp redis-6.2.4/redis.conf 7002
cp redis-6.2.4/redis.conf 7003
# 方式二：管道组合命令，一键拷贝
echo 7001 7002 7003 | xargs -t -n 1 cp redis-6.2.4/redis.conf
```
### 4）修改每个实例的端口、工作目录
修改每个文件夹内的配置文件，将端口分别修改为7001、7002、7003，将rdb文件保存位置都修改为自己所在目录（在/tmp目录执行下列命令）：
```shell
sed -i -e 's/6379/7001/g' -e 's/dir .\//dir \/tmp\/7001\//g' 7001/redis.conf
sed -i -e 's/6379/7002/g' -e 's/dir .\//dir \/tmp\/7002\//g' 7002/redis.conf
sed -i -e 's/6379/7003/g' -e 's/dir .\//dir \/tmp\/7003\//g' 7003/redis.conf
```
### 5）修改每个实例的声明IP（注意IP需要修改）
虚拟机本身有多个IP，为了避免将来混乱，我们需要在redis.conf文件中指定每一个实例的绑定ip信息，格式如下(**下面这个只是语法说明，别执行**)：
```properties
# redis实例的声明 IP
replica-announce-ip 192.168.150.101
```
每个目录都要改，我们一键完成修改（在/tmp目录执行下列命令）：
```shell
# 逐一执行
sed -i '1a replica-announce-ip 192.168.206.129' 7001/redis.conf
sed -i '1a replica-announce-ip 192.168.206.129' 7002/redis.conf
sed -i '1a replica-announce-ip 192.168.206.129' 7003/redis.conf

# 或者一键修改
printf '%s\n' 7001 7002 7003 | xargs -I{} -t sed -i '1a replica-announce-ip 192.168.206.130' {}/redis.conf
```
## 2.3.启动
为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令（在/tmp目录执行下列命令）：
```shell
# 第1个
redis-server 7001/redis.conf
# 第2个
redis-server 7002/redis.conf
# 第3个
redis-server 7003/redis.conf
```
启动后：
![image-20210630183914491.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847524458-f58f96d1-0b6c-42bd-8ed0-df0dff81780f.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_54%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23373535&clientId=ua305cb6b-5473-4&from=paste&height=585&id=ua7a816dc&originHeight=877&originWidth=1883&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=164496&status=done&style=none&taskId=u10b823c0-aaf7-49a2-a9c6-c10f2e12655&title=&width=1255.3333333333333)
如果要一键停止，可以运行下面命令：
```shell
printf '%s\n' 7001 7002 7003 | xargs -I{} -t redis-cli -p {} shutdown
```
## 2.4.开启主从关系
现在三个实例还没有任何关系，要配置主从可以使用replicaof 或者slaveof（5.0以前）命令。
**新开窗口执行下述命令，一旦ctrl +c退出后，redis服务将中断**
有临时和永久两种模式：

-  修改配置文件（永久生效） 
   - 在redis.conf中添加一行配置：`slaveof <masterip> <masterport>`
-  使用redis-cli客户端连接到redis服务，执行slaveof命令（重启后失效）： 
```shell
slaveof <masterip> <masterport>
```
**注意**：在5.0以后新增命令replicaof，与salveof效果一致。（**注意IP需要修改**）
这里我们为了演示方便，使用方式二（在/tmp目录执行下列命令）。通过redis-cli命令连接7002，执行下面命令：
```shell
# 连接 7002
redis-cli -p 7002
# 执行slaveof
slaveof 192.168.206.129 7001
```
执行完：exit，退出可继续执行后续命令。通过redis-cli命令连接7003，执行下面命令：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680401149652-90b64e73-fb42-4ab1-8226-a5a193ad8b12.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%2320384b&clientId=u5832d857-0c27-4&from=paste&height=53&id=u6d021eb1&originHeight=80&originWidth=808&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=73353&status=done&style=none&taskId=u87666acf-2361-469f-a2de-a428009886f&title=&width=538.6666666666666)
```shell
# 连接 7003
redis-cli -p 7003
# 执行slaveof
slaveof 192.168.206.130 7001
```
然后连接 7001节点，查看集群状态：
```shell
# 连接 7001
redis-cli -p 7001
# 查看状态
info replication
```
结果：
![image-20210630201258802.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847566676-e8eed3e0-e214-4893-9fb6-a06e86067262.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_25%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23282625&clientId=ua305cb6b-5473-4&from=paste&id=uac734fc0&originHeight=418&originWidth=881&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=48139&status=done&style=none&taskId=u537cd9c3-5346-4344-b2a8-fa36a49535f&title=)
## 2.5.测试
执行下列操作以测试：

-  利用redis-cli连接7001，执行`set num 123` 
-  利用redis-cli连接7002，执行`get num`，再执行`set num 666` 
-  利用redis-cli连接7003，执行`get num`，再执行`set num 888` 

可以发现，只有在7001这个master节点上可以执行写操作，7002和7003这两个slave节点只能执行读操作。
# 3.搭建哨兵集群
## 3.1.集群结构
这里我们搭建一个三节点形成的Sentinel集群，来监管之前的Redis主从集群。如图：
![image-20210701215227018.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847594805-cf8c88f0-a6d3-4d4a-b2ee-1de68d3a31fb.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f4ded4&clientId=ua305cb6b-5473-4&from=paste&id=u5cafedd7&originHeight=575&originWidth=742&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=79970&status=done&style=none&taskId=ua2059015-d9de-4537-b95c-578b0c48a0c&title=)
三个sentinel实例信息如下：

| 节点 | IP | PORT |
| --- | --- | --- |
| s1 | 192.168.206.129 | 27001 |
| s2 | 192.168.206.129 | 27002 |
| s3 | 192.168.206.129 | 27003 |

## 3.2.准备实例和配置
要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。
我们创建三个文件夹，名字分别叫s1、s2、s3：
```shell
# 进入/tmp目录
cd /tmp
# 创建目录
mkdir s1 s2 s3
```
如图：
![image-20210701215534714.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847614308-400059a7-1d8b-4c0b-9247-d99dd60236ee.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_27%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23262524&clientId=ua305cb6b-5473-4&from=paste&id=u88361352&originHeight=333&originWidth=941&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=39346&status=done&style=none&taskId=u311578a4-626a-41b7-9322-c0666b67efd&title=)
然后我们在s1目录创建一个sentinel.conf文件，添加下面的内容：

- cd /tmp/s1
- touch sentinel.conf
- vi sentinel.conf
- 粘贴下述文本
```properties
port 27001
sentinel announce-ip 192.168.206.130
sentinel monitor mymaster 192.168.206.130 7001 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
dir "/tmp/s1"
```
解读：

- `port 27001`：是当前sentinel实例的端口
- `sentinel monitor mymaster 192.168.206.129 7001 2`：指定主节点信息 
   - `mymaster`：主节点名称，自定义，任意写
   - `192.168.206.129 7001`：主节点的ip和端口
   - `2`：选举master时的quorum值

然后将s1/sentinel.conf文件拷贝到s2、s3两个目录中（在**/tmp**目录执行下列命令）：
```shell
# 方式一：逐个拷贝
cp s1/sentinel.conf s2
cp s1/sentinel.conf s3
# 方式二：管道组合命令，一键拷贝
echo s2 s3 | xargs -t -n 1 cp s1/sentinel.conf
```
修改s2、s3两个文件夹内的配置文件，将端口分别修改为27002、27003：
```shell
sed -i -e 's/27001/27002/g' -e 's/s1/s2/g' s2/sentinel.conf
sed -i -e 's/27001/27003/g' -e 's/s1/s3/g' s3/sentinel.conf
```
## 3.3.启动
为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令（在tmp目录执行）：
```shell
# 第1个
redis-sentinel s1/sentinel.conf
# 第2个
redis-sentinel s2/sentinel.conf
# 第3个
redis-sentinel s3/sentinel.conf
```
启动后：![image-20210701220714104.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847641209-434d7bce-6eb5-41bb-9d6a-1bbc5b050f5f.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_48%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23363534&clientId=ua305cb6b-5473-4&from=paste&height=585&id=u4570bfbb&originHeight=878&originWidth=1689&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=113607&status=done&style=none&taskId=ub3254f8a-45c5-46e0-adff-2bc840059b3&title=&width=1126)
## 3.4.测试

- 停止7001（当前主节点），此时会在多个哨兵中选举出一个哨兵的master，如下
   - 27001投给27002
   - 27002投给自己
   - 27003投给27002
   - 因此27002变成哨兵master

![步骤1-主观下线-选举哨兵master.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680408715319-b5ec17bd-98e6-487c-b853-e03bf32c42fd.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_52%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232c4b5f&clientId=u5553f9ce-48b3-4&from=ui&id=u6c0ffdd0&originHeight=828&originWidth=1840&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=1191308&status=done&style=none&taskId=u765ff19a-d088-4287-b1ce-da054bf7c8c&title=)

- 主观下线变客观下线

![步骤2-主观下线变客观下线.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680408861762-9866ab35-4c34-401a-9a2b-c7972a2eded3.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_38%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f6f8c8&clientId=u5553f9ce-48b3-4&from=ui&id=u6391548d&originHeight=561&originWidth=1341&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=439515&status=done&style=none&taskId=u4e10dc0f-e170-4eb7-ba2c-166ff67d839&title=)

- 哨兵master自己从当前集群中的slave节点中选出一个新的master，原则是：
```properties
1-首先会判断slave节点与master节点断开时间长短，如果超过指定值（down-after-milliseconds * 10）则会排除该slave节点
2-然后判断slave节点的slave-priority值，越小优先级越高，如果是0则永不参与选举
3-如果slave-prority一样，则判断slave节点的offset值，越大说明数据越新，优先级越高
4-最后是判断slave节点的运行id大小，越小优先级越高。
```
![步骤3-哨兵master选举新的主节点-新主节点执行slaveof no one.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680408908962-7bbb2681-1a63-4d4d-bf61-a3f011c00def.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232b4b5f&clientId=u5553f9ce-48b3-4&from=ui&id=ue4c61990&originHeight=165&originWidth=1493&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=240957&status=done&style=none&taskId=u3713f2b0-b181-4c32-adcb-e4facc82803&title=)

- 现有slave节点执行slave of，服从新的master节点

![步骤4-现有slave节点重新分配master节点.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680408980882-3f9d623a-8430-4cb1-a1ea-9bb335431e7b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23264356&clientId=u5553f9ce-48b3-4&from=ui&id=u359bed32&originHeight=337&originWidth=1212&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=418919&status=done&style=none&taskId=u56c27848-9944-422d-8828-0ae942a6a4e&title=)

- 其余哨兵得到哨兵msater的选举通知

![步骤5-其余哨兵得到通知.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680409014417-dfff57de-7868-458b-9a6d-876bca059ed0.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_41%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23345265&clientId=u5553f9ce-48b3-4&from=ui&id=u232151e3&originHeight=633&originWidth=1423&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=744188&status=done&style=none&taskId=u11654f53-f727-4ddc-9f1d-4c729e34d00&title=)

- 此时我们恢复7001，会发现会做一次全量同步

![步骤6-7001恢复启动并实现数据全量同步.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680409081746-51b56f5a-2566-4d84-b00d-bab5b722a3b8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_43%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232f4c60&clientId=u5553f9ce-48b3-4&from=ui&id=u75e009b6&originHeight=611&originWidth=1510&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=902217&status=done&style=none&taskId=uf5808c84-4da3-4e66-b5bb-f11e4cb285d&title=)

- 新加入的节点，执行slave of服从当前master（此时是从配置文件中读取）

![步骤7-哨兵监控执行从节点命令.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680409131487-407f4b2b-ca1f-41c1-80db-2a43e2065527.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23314e61&clientId=u5553f9ce-48b3-4&from=ui&id=uea3c055a&originHeight=653&originWidth=1528&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=898302&status=done&style=none&taskId=u47dd7181-ffb5-4a9b-bdb4-9f545e79fb0&title=)
# 4.搭建分片集群
## 4.1.集群结构
分片集群需要的节点数量较多，这里我们搭建一个最小的分片集群，包含3个master节点，每个master包含一个slave节点，结构如下
![image-20210702164116027.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847688835-d26788a6-fffd-4c8f-b5e5-99a5a05c39c8.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_15%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f7ebea&clientId=ua305cb6b-5473-4&from=paste&id=u58cddca8&originHeight=595&originWidth=518&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=58049&status=done&style=none&taskId=uacd58a1a-fd18-49f5-8556-dcfc7c3651c&title=)
这里我们会在同一台虚拟机中开启6个redis实例，模拟分片集群，信息如下：

| IP | PORT | 角色 |
| --- | --- | --- |
| 192.168.206.129 | 7001 | master |
| 192.168.206.129 | 7002 | master |
| 192.168.206.129 | 7003 | master |
| 192.168.206.129 | 8001 | slave |
| 192.168.206.129 | 8002 | slave |
| 192.168.206.129 | 8003 | slave |

## 4.2.准备实例和配置
停止原来的所有redis服务（哨兵也要停止），同时删除之前的7001、7002、7003这几个目录，重新创建出7001、7002、7003、8001、8002、8003目录：
```shell
# 进入/tmp目录
cd /tmp
# 删除旧的，避免配置干扰
rm -rf 7001 7002 7003
# 创建目录
mkdir 7001 7002 7003 8001 8002 8003
```
在**/tmp**下准备一个新的redis.conf文件，内容如下：

- touch redis.conf
- vi redis.conf
```properties
port 6379
# 开启集群功能
cluster-enabled yes
# 集群的配置文件名称，不需要我们创建，由redis自己维护
cluster-config-file /tmp/6379/nodes.conf
# 节点心跳失败的超时时间
cluster-node-timeout 5000
# 持久化文件存放目录
dir /tmp/6379
# 绑定地址(非常重要，别漏也别改)
bind 0.0.0.0
# 让redis后台运行
daemonize yes
# 注册的实例ip
replica-announce-ip 192.168.206.130
# 保护模式
protected-mode no
# 数据库数量
databases 1
# 日志
logfile /tmp/6379/run.log
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680418924162-8b4ea2e2-b193-43d9-9313-601cbef56958.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_36%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232a4a5e&clientId=u8f742023-5f05-4&from=paste&height=346&id=u4d6f12df&originHeight=519&originWidth=1258&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=636236&status=done&style=none&taskId=uc01ef674-446e-4b92-835f-a027fb7b391&title=&width=838.6666666666666)
将这个文件拷贝到每个目录下：
```shell
# 进入/tmp目录
cd /tmp
# 执行拷贝
echo 7001 7002 7003 8001 8002 8003 | xargs -t -n 1 cp redis.conf
```
修改每个目录下的redis.conf，将其中的6379修改为与所在目录一致：
```shell
# 进入/tmp目录
cd /tmp
# 修改配置文件
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t sed -i 's/6379/{}/g' {}/redis.conf
```
此时可以进到任意目录查看一下，确认是否都存在相关的配置文件
## 4.3.启动
因为已经配置了后台启动模式，所以可以直接启动服务：
```shell
# 进入/tmp目录
cd /tmp
# 一键启动所有服务
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-server {}/redis.conf
```
通过ps查看状态：
```shell
ps -ef | grep redis
```
发现服务都已经正常启动：![image-20210702174255799.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847725927-f147aa51-fa64-4d11-8ef1-1b71a6d62c7b.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_35%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23292625&clientId=ua305cb6b-5473-4&from=paste&height=137&id=ued9e82de&originHeight=205&originWidth=1223&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=37078&status=done&style=none&taskId=u7cedb77a-bcdf-46ee-a7e5-318d7bc7cd5&title=&width=815.3333333333334)
如果要关闭所有进程，可以执行命令：
```shell
ps -ef | grep redis | awk '{print $2}' | xargs kill
```
或者（推荐这种方式）：
```shell
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-cli -p {} shutdown
```
## 4.4.创建集群

---

- 更多测试细节也可查看：[https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/fzoohtlg0r8gz6cd#ecac7084](https://www.yuque.com/xiankanpengyouquandisitiaodongtai/diods0/fzoohtlg0r8gz6cd#ecac7084)

---

虽然服务启动了，但是目前每个服务之间都是独立的，没有任何关联。
我们需要执行命令来创建集群，在Redis5.0之前创建集群比较麻烦，5.0之后集群管理命令都集成到了redis-cli中。
1）Redis5.0之前（**我们版本是之后，不适用这个**）
Redis5.0之前集群命令都是用redis安装包下的src/redis-trib.rb来实现的。因为redis-trib.rb是有ruby语言编写的所以需要安装ruby环境。
```shell
# 安装依赖
yum -y install zlib ruby rubygems
gem install redis
```
然后通过命令来管理集群：
```shell
# 进入redis的src目录
cd /tmp/redis-6.2.4/src
# 创建集群
./redis-trib.rb create --replicas 1 192.168.150.101:7001 192.168.150.101:7002 192.168.150.101:7003 192.168.150.101:8001 192.168.150.101:8002 192.168.150.101:8003
```
2）Redis5.0以后
我们使用的是Redis6.2.4版本，集群管理以及集成到了redis-cli中，格式如下：
```shell
redis-cli --cluster create --cluster-replicas 1 192.168.206.129:7001 192.168.206.129:7002 192.168.206.129:7003 192.168.206.129:8001 192.168.206.129:8002 192.168.206.129:8003
```
命令说明：

- `redis-cli --cluster`或者`./redis-trib.rb`：代表集群操作命令
- `create`：代表是创建集群
- `--replicas 1`或者`--cluster-replicas 1` ：指定集群中每个master的副本个数为1，此时`节点总数 ÷ (replicas + 1)` 得到的就是master的数量。因此节点列表中的前n个就是master，其它节点都是slave节点，随机分配到不同master

运行后的样子：
![image-20210702181101969.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847781153-92af3b01-27f5-4414-b845-7c0286c48b04.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_44%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23242222&clientId=ua305cb6b-5473-4&from=paste&height=473&id=u5057548c&originHeight=710&originWidth=1559&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=141386&status=done&style=none&taskId=u1fecb969-e1ae-4efb-b57e-63c9ceaf970&title=&width=1039.3333333333333)
这里输入yes，则集群开始创建：
![image-20210702181215705.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847788439-4322a1b6-387a-4cf5-9a8d-4d2315845bb7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23292725&clientId=ua305cb6b-5473-4&from=paste&id=ub91578b1&originHeight=822&originWidth=968&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=112768&status=done&style=none&taskId=u8302f87b-466a-47f2-bc4e-d20fbe958df&title=)
![创建分片集群时确认集群关系图.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680420255739-9e8e30e7-8231-4a9d-82df-99a078d1df7d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_28%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232a485c&clientId=u8f742023-5f05-4&from=drop&id=ufef0182a&originHeight=672&originWidth=993&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=688390&status=done&style=none&taskId=u9499ff44-e9d8-4075-baae-aa06433f57a&title=)通过命令可以查看集群状态（下面端口可以是集群中的任意端口都行）：
```shell
redis-cli -p 7001 cluster nodes
```
![image-20210702181922809.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847800988-bd818147-350b-4f74-bb19-0aa487de3707.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_45%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%232d2a28&clientId=ua305cb6b-5473-4&from=paste&height=110&id=ub41ea462&originHeight=165&originWidth=1589&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=53340&status=done&style=none&taskId=u4d9e02eb-379f-4089-9a00-25a721e2652&title=&width=1059.3333333333333)
其中的映射关系分析如下图
![分片集群日志分析.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1680420272933-25b235f6-715d-4be8-a133-2769559e8b02.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_42%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23f2bd64&clientId=u8f742023-5f05-4&from=drop&id=u5d5b2898&originHeight=800&originWidth=1488&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=417098&status=done&style=none&taskId=u2815fd27-0395-4c1c-9ddb-7750dbaf5a5&title=)

## 4.5.测试
尝试连接7001节点，存储一个数据：
```shell
# 连接
redis-cli -p 7001
# 存储数据
set num 123
# 读取数据
get num
# 再次存储
set a 1
```
结果悲剧了：
![](assets/image-20210702182343979.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_9%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#id=FH3Bq&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
集群操作时，需要给`redis-cli`**加上**`**-c**`**参数**才可以：
```shell
 redis-cli -c -p 7001
```
这次可以了：
![image-20210702182602145.png](https://cdn.nlark.com/yuque/0/2023/png/1169676/1678847828465-a01cdc8b-a107-4b54-ad38-2d266886765d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5rK554K45bCP5rOi%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10#averageHue=%23201f1e&clientId=ua305cb6b-5473-4&from=paste&id=uce54de39&originHeight=260&originWidth=720&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=25318&status=done&style=none&taskId=u2881c402-e65a-4431-bf35-59c8d28b38a&title=)
