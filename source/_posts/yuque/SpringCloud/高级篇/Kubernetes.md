## Kubernetes介绍
### 1.1 应用方式部署改变
在部署应用程序的方式上，主要经历了3个时代

1. 传统部署：互联网早期，直接将应用部署在物理机上
:::info
优点 简单，不需要其他技术的参与
缺点 不能为程序定义资源使用边界，很难合理分配计算机资源，而且程序之间容易产生影响
:::

2. 虚拟化部署：可以在一台物理机上运行多个虚拟机，每个虚拟机都是独立的环境
:::info
优点：程序之间不会相互影响，且提供了一定的安全性
缺点：增加了操作系统，浪费了部分资源
:::

3. 容器化部署：与虚拟化相似，但是共享了操作系统
:::info
优点：可以保证每个容器有自己的文件系统，CPU，内存，进程等
 运行程序所需的资源被容器包装，并和底层基础构架解耦
容器化的应用程序可以跨云服务商，跨Linux操作系统发行版进行部署
:::
 ![](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/ef0ad2457a4ed077fd9eaf6010da6806.png)
容器化部署方式带来了很多便利，但是也会出现一些问题，比如：

- 一个容器故障停机了，怎么让另外一个容器立刻启动去替补停机的容器
- 当并发访问量比较大时，怎么样做到横向扩展容器数量

这些容器管理问题统称为容器编排问题，为了解决这些容器编排问题，产生了一些**容器编排软件**：

- **Swarm** :Docker自己的容器编排工具
   - Swarm是Docker公司推出的用来管理docker集群的平台。它是将一群Docker宿主机变成一个单一的虚拟主机。Swarm使用标准的Docker API接口作为其前端的访问入口，换言之，各种形式的Docker Client(compose,docker-py等)均可以直接与Swarm通信，甚至Docker本身都可以很容易的与Swarm集成，这大大方便了用户将原本基于单节点的系统移植到Swarm上，同时Swarm内置了对Docker网络插件的支持，用户也很容易的部署跨主机的容器集群服务。

从 Docker 1.12.0 版本开始，Docker Swarm 已经包含在 Docker 引擎中（docker swarm），并且已经内置了服务发现工具

- **Mesos**：Apache的一个资源统一管控的工具，需要和Marathon结合使用
   - Mesos使用了与Linux内核相似的规则来构造，仅仅是不同抽象层级的差别。Mesos从设备（物理机或虚拟机）抽取 CPU，内存，存储和其他计算资源，让容错和弹性分布式系统更容易使用。Mesos内核运行在每个机器上，在整个数据中心和云环境内向应用程序（Hadoop、Spark、Kafka、Elastic Serarch等等）提供资源管理和资源负载的API接口。
   - 可扩展到10000个节点
   - 使用ZooKeeper实现Master和Slave的容错
   - 支持Docker容器
   - 使用Linux容器实现本地任务隔离
   - 基于多资源（内存，CPU、磁盘、端口）调度
   - 提供Java，Python，C++等多种语言 APIs
   - 通过Web界面查看集群状态
- Kubernetes：Google开源的一个容器编排工具
### 1.2 Kubernetes简介
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/bcd191aa27871e84a0d6583aaf2acae9.png)
Kubernetes，是一个全新的基于容器的分布式架构领先方案，是谷歌严格保密十几年的密码武器–Borg系统的一个开源版本，于2014年9月发布的第一个版本。

Kubernetes的本质是一组服务器集群，他可以在集群的每个节点上运行特定的程序，来对节点中的容器进行管理，他的目的就是实现资源管理的自动化，主要提供了以下功能：

- **自我修复：**Kubernetes 将重新启动失败的容器、替换容器、杀死不响应用户定义的运行状况检查的容器， 并且在准备好服务之前不将其通告给客户端。
- **弹性伸缩：**可以根据需要，自动对集群中运行的容器数量进行调整
- **自我部署和回滚: **你可以使用 Kubernetes 描述已部署容器的所需状态， 它可以以受控的速率将实际状态更改为期望状态。 例如，你可以自动化 Kubernetes 来为你的部署创建新容器， 删除现有容器并将它们的所有资源用于新容器。
- **服务发现和负载均衡：**Kubernetes 可以使用 DNS 名称或自己的 IP 地址来暴露容器。 如果进入容器的流量很大， Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定。
- **机密和配置管理: **Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 ssh 密钥。 你可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。
- **存储编排：**Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。
- **自动完成装箱计算: **你为 Kubernetes 提供许多节点组成的集群，在这个集群上运行容器化的任务。 你告诉 Kubernetes 每个容器需要多少 CPU 和内存 (RAM)。 Kubernetes 可以将这些容器按实际情况调度到你的节点上，以最佳方式利用你的资源。

![](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/db0d6e785f87cc3694a3e36336878193.png)
### 1.3 kubernetes组件
一个Kubernetes集群主要是由控制节点，工作节点构成，每个节点上安装有不同的组件。 
Master：集群的控制平面，负责集群的决策（管理）(控制面板)
:::info
kube-apiserver: 资源操作的唯一入口，接收用户输入的命令，提供认证，授权，API注册和发现等机制
kube-schedule：负责集群资源调度，按照预定的调度策略将Pod调度到相应的node节点上
ControllerManager：负责维护集群的状态，比如程序部署安排，故障检测，自动扩展，滚动更新等

- kube-controller-manager:
   - 节点控制器（Node Controller）：负责在节点出现故障时进行通知和响应
   - 任务控制器（Job Controller）：监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成
   - 端点分片控制器（EndpointSlice controller）：填充端点分片（EndpointSlice）对象（以提供 Service 和 Pod 之间的链接）。
   - 服务账号控制器（ServiceAccount controller）：为新的命名空间创建默认的服务账号（ServiceAccount）。
- cloud-controller-manager:
   - 允许你将你的集群连接到云提供商的 API 之上， 并将与该云平台交互的组件同与你的集群交互的组件分离开来。

etcd：负责存储集群中各种资源对象的信息, k8s的数据库, 键值类型存储的分布式数据库, 提供了基于Raft算法实现的自主的集群高可用; 老版本: 基于内存 新版本:基于持久化存储
:::
node：集群的数据平面，负责为容器提供运行环境（干活）
:::info
Kubelet:负责维护容器的生命周期，即通过控控制docker，来创建，更新，销毁容器, kubelet 接收一组通过各类机制提供给它的 PodSpecs， 确保这些 PodSpecs 中描述的容器处于运行状态且健康。 kubelet 不会管理不是由 Kubernetes 创建的容器
kube-proxy: 负责维护集群内部的服务发现和负载均衡(4层负载), 维护节点上的一些网络规则， 这些网络规则会允许从集群内部或外部的网络会话与 Pod 进行网络通信。
container-runtime: 
docker：负责节点上容器的各种操作
contained:
CRI-O: 
pod: 里面至少有一个容器, 可以有多个
:::
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/103184591ae498b06be1478b48d8eca6.svg)
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/10f1d4328436b478ad3079a3f818ca46.png)
附加组件:
:::info
kube-dns: 负责为整个集群提供DNS服务
Ingress Controller: 为服务提供外网入口
Prometheus: 资源监控
Dashboard: 提供GUI
Federation: 提供跨分区集群
Fluentd-elasticsearch: 日志采集, 存储和查询
:::

### 1.4 服务的类型
无状态(Nginx等):
优点:
:::info
对客户端透明, 无依赖关系, 可以高效实现扩容迁移
:::
缺点:
:::info
不能存储数据, 需要额外的数据服务支撑
:::
有状态(Mysql, Redis等):
优点:
:::info
可以独立存储数据, 实现数据管理
:::
缺点
:::info
集群环境下需要实现主从、数据同步、备份、水平扩容复杂
:::

## 资源和对象
### 1.1 资源与对象

Kubernetes 中的所有内容都被抽象为“资源”，如 Pod、Service、Node 等都是资源。“对象”就是“资源”的实例，是持久化的实体。如某个具体的 Pod、某个具体的 Node。Kubernetes 使用这些实体去表示整个集群的状态。
对象的创建、删除、修改都是通过 “Kubernetes API”，也就是 “Api Server” 组件提供的 API 接口，这些是 RESTful 风格的 Api，与 k8s 的“万物皆对象”理念相符。命令行工具 “kubectl”，实际上也是调用 kubernetes api。
K8s 中的资源类别有很多种，kubectl 可以通过配置文件来创建这些 “对象”，配置文件更像是描述对象“属性”的文件，配置文件格式可以是 “JSON” 或 “YAML”，常用 “YAML”。

### 1.2 规约与状态
规约可以看成是期望的状态
状态是实际的状态
### 1.3 资源的分类
#### 1.3.1 元数据(Pod共享):
Horizontal Pod Autoscalar(HPA)
:::info
Pod 自动扩容：可以根据 CPU 使用率或自定义指标（metrics）自动对 Pod 进行扩/缩容。

- 控制管理器每隔30s（可以通过–horizontal-pod-autoscaler-sync-period修改）查询metrics的资源使用情况
- 支持三种metrics类型
   - 预定义metrics（比如Pod的CPU）以利用率的方式计算
   - 自定义的Pod metrics，以原始值（raw value）的方式计算
   - 自定义的object metrics
- 支持两种metrics查询方式：Heapster和自定义的REST API
- 支持多metrics
:::
 Pod Template:
:::info
Pod Template 是关于 Pod 的定义，但是被包含在其他的 Kubernetes 对象中（例如 Deployment、	StatefulSet、DaemonSet 等控制器）。控制器通过 Pod Template 信息来创建 Pod。
:::
LimitRange:
:::info
可以对集群内 Request 和 Limits 的配置做一个全局的统一的限制，相当于批量设置了某一个范围内（某个命名空间）的 Pod 的资源使用限制。
:::

#### 1.3.2 集群(一块独立的空间, 资源隔离):
NameSpace:  
:::info
Kubernetes 支持多个虚拟集群，它们底层依赖于同一个物理集群，这些虚拟集群被称为命名空间。作用是用于实现多团队/环境的资源隔离。命名空间 namespace 是 k8s 集群级别的资源，可以给不同的用户、租户、环境或项目创建对应的命名空间。
默认 namespace：

- kube-system 主要用于运行系统级资源，存放 k8s 自身的组件
- kube-public 此命名空间是自动创建的，并且可供所有用户（包括未经过身份验证的用户）读取。此命名空间主要用于集群使用，关联的一些资源在集群中是可见的并且可以公开读取。此命名空间的公共方面知识一个约定，但不是非要这么要求。
- default 未指定名称空间的资源就是 default，即你在创建pod 时如果没有指定 namespace，则会默认使用 default
:::
Node:
:::info
不像其他的资源（如 Pod 和 Namespace），Node 本质上不是Kubernetes 来创建的，Kubernetes 只是管理 Node 上的资源。虽然可以通过 Manifest 创建一个Node对象，但 Kubernetes 也只是去检查是否真的是有这么一个 Node，如果检查失败，也不会往上调度 Pod。
:::
ClusterRole: 
:::info
ClusterRole 是一组权限的集合，但与 Role 不同的是，ClusterRole 可以在包括所有Namespace 和集群级别的资源或非资源类型进行鉴权。
:::
ClusterRoleBinding:
:::info
将 Subject 绑定到 ClusterRole，ClusterRoleBinding 将使规则在所有命名空间中生效。
:::
#### 1.3.3 命名空间(在集群空间内, 再次划分, 资源隔离):
##### 1.3.3.1 工作负载型
###### Pod
:::info
Pod（容器组）是 Kubernetes 中最小的可部署单元。一个 Pod（容器组）包含了一个应用程序容器（某些情况下是多个容器）、存储资源、一个唯一的网络 IP 地址、以及一些确定容器该如何运行的选项。Pod 容器组代表了 Kubernetes 中一个独立的应用程序运行实例，该实例可能由单个容器或者几个紧耦合在一起的容器组成。
Docker 是 Kubernetes Pod 中使用最广泛的容器引擎；Kubernetes Pod 同时也支持其他类型的容器引擎。
Kubernetes 集群中的 Pod 存在如下两种使用途径：

- 一个 Pod 中只运行一个容器。"one-container-per-pod" 是 Kubernetes 中最常见的使用方式。此时，您可以认为 Pod 容器组是该容器的 wrapper，Kubernetes 通过 Pod 管理容器，而不是直接管理容器。
- 一个 Pod 中运行多个需要互相协作的容器。您可以将多个紧密耦合、共享资源且始终在一起运行的容器编排在同一个 Pod 中
:::
![1967881-d8ad2d0b00198509.webp](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/3d07d51cc2734c8594f58e37a9c968d2.webp)
Pod中使用Pause容器来实现, 共享文件系统, 共享资源等

副本
:::info
先引入“副本”的概念——一个 Pod 可以被复制成多份，每一份可被称之为一个“副本”，这些“副本”除了一些描述性的信息（Pod 的名字、uid 等）不一样以外，其它信息都是一样的，譬如 Pod 内部的容器、容器数量、容器里面运行的应用等的这些信息都是一样的，这些副本提供同样的功能。

Pod 的“控制器”通常包含一个名为 “replicas” 的属性。“replicas”属性则指定了特定 Pod 的副本的数量，当当前集群中该 Pod 的数量与该属性指定的值不一致时，k8s 会采取一些策略去使得当前状态满足配置的要求。
:::
控制器
:::info
当 Pod 被创建出来，Pod 会被调度到集群中的节点上运行，Pod 会在该节点上一直保持运行状态，直到进程终止、Pod 对象被删除、Pod 因节点资源不足而被驱逐或者节点失效为止。Pod 并不会自愈，当节点失效，或者调度 Pod 的这一操作失败了，Pod 就该被删除。如此，单单用 Pod 来部署应用，是不稳定不安全的。

Kubernetes 使用更高级的资源对象 “控制器” 来实现对Pod的管理。控制器可以为您创建和管理多个 Pod，管理副本和上线，并在集群范围内提供自修复能力。 例如，如果一个节点失败，控制器可以在不同的节点上调度一样的替身来自动替换 Pod。

**适用于无状态服务:**
Replication Controller:
Replication Controller 简称 RC，RC 是 Kubernetes 系统中的核心概念之一，简单来说，RC 可以保证在任意时间运行 Pod 的副本数量，能够保证 Pod 总是可用的。如果实际 Pod 数量比指定的多那就结束掉多余的，如果实际数量比指定的少就新启动一些Pod，当 Pod 失败、被删除或者挂掉后，RC 都会去自动创建新的 Pod 来保证副本数量，所以即使只有一个 Pod，我们也应该使用 RC 来管理我们的 Pod。可以说，通过 ReplicationController，Kubernetes 实现了 Pod 的高可用性。主要的作用就是用来确保容器应用的副本数始终保持在用户定义的副本数 。即如果有容器异常退出，会自动创建新的 Pod 来替代；而如果异常多出来的容器也会自动回收（已经成为过去时），在 v1.11 版本废弃。
RelicaSet(RS):
	Kubernetes 官方建议使用 RS（ReplicaSet ） 替代 RC （ReplicationController ） 进行部署，RS 跟 RC 没有本质的不同，只是名字不一样，并且 RS 支持集合式的 selector。
label （标签）是附加到 Kubernetes 对象（比如 Pods）上的键值对，用于区分对象（比如Pod、Service）。 label 旨在用于指定对用户有意义且相关的对象的标识属性，但不直接对核心系统有语义含义。 label 可以用于组织和选择对象的子集。label 可以在创建时附加到对象，随后可以随时添加和修改。可以像 namespace 一样，使用 label 来获取某类对象，但 label 可以与 selector 一起配合使用，用表达式对条件加以限制，实现更精确、更灵活的资源查找。
	label 与 selector 配合，可以实现对象的“关联”，“Pod 控制器” 与 Pod 是相关联的 —— “Pod 控制器”依赖于 Pod，可以给 Pod 设置 label，然后给“控制器”设置对应的 selector，这就实现了对象的关联。
Deployment:
       Deployment 为 Pod 和 Replica Set 提供声明式更新。
你只需要在 Deployment 中描述你想要的目标状态是什么，Deployment controller 就会帮你将 Pod 和 Replica Set 的实际状态改变到你的目标状态。你可以定义一个全新的 Deployment，也可以创建一个新的替换旧的 Deployment。

   - 创建 Replica Set / Pod
   - 滚动升级/回滚
   - 平滑扩容和缩容
   - 暂停与恢复 Deployment: 多次修改, 一次滚动升级/回滚

滚动升级/回滚
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/b4d9f51e2b6f2e65dcf0479b9271a974.png)
![image.png](https://raw.githubusercontent.com/choodsire666/blog-img/main/Kubernetes/186cb5d0614d907c9314b346e3cca69e.png)


**适用于有状态服务**
StatefulSet: 
StatefulSet 中每个 Pod 的 DNS 格式为 statefulSetName-{0..N-1}.serviceName.namespace.svc.cluster.local

   - serviceName 为 Headless Service 的名字
   - 0..N-1 为 Pod 所在的序号，从 0 开始到 N-1
   - statefulSetName 为 StatefulSet 的名字
   - namespace 为服务所在的 namespace，Headless Service 和 StatefulSet 必须在相同的 namespace
   - .cluster.local 为 Cluster Domain

主要特点

   - 稳定的持久化存储
      - 即 Pod 重新调度后还是能访问到相同的持久化数据，基于 PVC 来实现
   - 稳定的网络标志
      - 稳定的网络标志，即 Pod 重新调度后其 PodName 和 HostName 不变，基于 Headless Service（即没有 Cluster IP 的 Service）来实现
   - 有序部署，有序扩展
      - 有序部署，有序扩展，即 Pod 是有顺序的，在部署或者扩展的时候要依据定义的顺序依次依次进行（即从 0到 N-1，在下一个Pod 运行之前所有之前的 Pod 必须都是 Running 和 Ready 状态），基于 init containers 来实现
   - 有序收缩，有序删除
      - 有序收缩，有序删除（即从 N-1 到 0）

组成:

      - Headless Service:  用于定义网络标志（DNS domain）Domain Name Server：域名服务, 将域名与 ip 绑定映射关系, 服务名 => 访问路径（域名） => ip
      - volumeClaimTemplate: 用于创建 PersistentVolumes

注意事项:

      - kubernetes v1.5 版本以上才支持
      - 所有Pod的Volume必须使用PersistentVolume或者是管理员事先创建好
      - 为了保证数据安全，删除StatefulSet时不会删除Volume
      - StatefulSet 需要一个 Headless Service 来定义 DNS domain，需要在 StatefulSet 之前创建好

守护进程
DaemonSet:  保证在每个 Node 上都运行一个容器副本，常用来部署一些集群的日志、监控或者其他系统管理应用, 为每一个匹配的Node都部署一个守护进程。典型的应用包括：

   - 日志收集，比如 fluentd，logstash 等
   - 系统监控，比如 Prometheus Node Exporter，collectd，New Relic agent，Ganglia gmond 等
   - 系统程序，比如 kube-proxy, kube-dns, glusterd, ceph 等

任务/定时任务
	Job: 一次性任务，运行完成后Pod销毁，不再重新启动新容器。
CronJob: CronJob 是在 Job 基础上加上了定时功能。
:::

服务发现
	Service:
:::info
“Service” 简写 “svc”。Pod 不能直接提供给外网访问，而是应该使用 service。Service 就是把 Pod 暴露出来提供服务，Service 才是真正的“服务”，它的中文名就叫“服务”。

可以说 Service 是一个应用服务的抽象，定义了 Pod 逻辑集合和访问这个 Pod 集合的策略。Service 代理 Pod 集合，对外表现为一个访问入口，访问该入口的请求将经过负载均衡，转发到后端 Pod 中的容器。
:::
Ingress:
:::info
Ingress 可以提供外网访问 Service 的能力。可以把某个请求地址映射、路由到特定的 service。

ingress 需要配合 ingress controller 一起使用才能发挥作用，ingress 只是相当于路由规则的集合而已，真正实现路由功能的，是 Ingress Controller，ingress controller 和其它 k8s 组件一样，也是在 Pod 中运行。
Ingress-nginx
:::
 
存储
Volume
:::info
数据卷，共享 Pod 中容器使用的数据。用来放持久化的数据，比如数据库数据。
:::
CSI
:::info
Container Storage Interface 是由来自 Kubernetes、Mesos、Docker 等社区成员联合制定的一个行业标准接口规范，旨在将任意存储系统暴露给容器化应用程序。

CSI 规范定义了存储提供商实现 CSI 兼容的 Volume Plugin 的最小操作集和部署建议。CSI 规范的主要焦点是声明 Volume Plugin 必须实现的接口。
:::
特殊类型配置
	ConfigMap
:::info
用来放配置，与 Secret 是类似的，只是 ConfigMap 放的是明文的数据，Secret 是密文存放。
:::
	Secret
:::info
Secret 解决了密码、token、密钥等敏感数据的配置问题，而不需要把这些敏感数据暴露到镜像或者 Pod Spec 中。Secret 可以以 Volume 或者环境变量的方式使用。
Secret 有三种类型：

   - Service Account：用来访问 Kubernetes API，由 Kubernetes 自动创建，并且会自动挂载到 Pod 的 /run/secrets/kubernetes.io/serviceaccount 目录中；
   - Opaque：base64 编码格式的 Secret，用来存储密码、密钥等；
   - kubernetes.io/dockerconfigjson：用来存储私有 docker registry 的认证信息。
:::
	DownwardAPI
:::info
downwardAPI 这个模式和其他模式不一样的地方在于它不是为了存放容器的数据也不是用来进行容器和宿主机的数据交换的，而是让 pod 里的容器能够直接获取到这个 pod 对象本身的一些信息。
downwardAPI 提供了两种方式用于将 pod 的信息注入到容器内部：

- 环境变量：用于单个变量，可以将 pod 信息和容器信息直接注入容器内部
- volume 挂载：将 pod 信息生成为文件，直接挂载到容器内部中去

:::
其他
	Role
:::info
Role 是一组权限的集合，例如 Role 可以包含列出 Pod 权限及列出 Deployment 权限，Role 用于给某个 Namespace 中的资源进行鉴权。
:::
	RoleBinding
:::info
RoleBinding ：将 Subject 绑定到 Role，RoleBinding 使规则在命名空间内生效。
:::

## k8s集群的搭建
```shell
# vim /etc/hosts 修改主机hosts映射
10.0.0.3 k8s-master
10.0.0.4 k8s-node1
10.0.0.5 k8s-node2

# 关闭swap交互区
# 临时关闭，重启恢复
swapoff -a
# 永久关闭
echo vm.swappiness = 0 >> /etc/sysctl.conf
sysctl -p
cat /etc/fstab
# /dev/mapper/centos-swap swap                    swap    defaults        0 0

# 禁用ESLinux
sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/sysconfig/selinux

# 关闭防火墙
systemctl disable firewalld
systemctl stop firewalld

# 修改内核参数
 
modprobe br_netfilter
echo "modprobe br_netfilter" >> /etc/profile
tee /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
# 重新加载配置
sysctl -p /etc/sysctl.d/k8s.conf

# 时间同步
yum install ntp
ntpdate pool.ntp.org

# 配置yum镜像
cd /etc/yum.repos.d/;mkdir bak/; mv *.repo bak/

curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

yum clean all
yum makecache
```

### 1.24.x之前的版本搭建
```shell
# 安装docker
# 先删除之前的
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce

# 安装yum工具
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken

# 设置docker镜像
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast

yum install -y docker-ce

# 启动docker
systemctl enable docker
systemctl start docker


# 下载kubernates
yum install -y kubelet-1.23.6 kubeadm-1.23.6 kubectl-1.23.6

systemctl enable kubelet
systemctl start kubelet

# 可能会出现问题, 使用命令查看一下启动状态
systemctl status kubelet
journalctl -xefu kubelet
# 如果是,不存在cgroup配置
# 配置关闭 Docker 的 cgroups，修改 /etc/docker/daemon.json，加入以下内容
"exec-opts": ["native.cgroupdriver=systemd"]

# 这个只在主节点上运行, k8s-master
kubeadm init \
--apiserver-advertise-address=10.0.0.3 \
--control-plane-endpoint=k8s-master \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
--kubernetes-version v1.25.1 \
--service-cidr=10.1.0.0/16 \
--pod-network-cidr=10.2.0.0/16

# 可能会有bug
# [ERROR Port-10259]: Port 10259 is in use

# 先清空之前的文件
rm -rf /etc/kubernetes/*
rm -rf ~/.kube/*
rm -rf /var/lib/etcd/*

# 重启
kubeadm reset 
# 然后再执行init就可以了


# 注意init之后, 出现successful就代表成功了
# 会出现以下的提示, 照着做就行

# 要使非root用户运行kubectl，请执行以下命令，这也是上面kubeadm init输出的一部分： 
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 如果是root用户，则可以执行以下命令：
export KUBECONFIG=/etc/kubernetes/admin.conf

# 加入集群
kubeadm join k8s-master:6443 --token 4qb42s.dp9284nme8i02p88 \
        --discovery-token-ca-cert-hash sha256:7932e1c803ce42fe7b01269f4ecb7bea420216afd103ab852b8b43f3b9f6bff0 \
        --control-plane

# 如果不小心clear了, 查看token
kubeadm token list

# token过期了就, 创建token
kubeadm token create --print-join-command

# 获取 --discovery-token-ca-cert-hash 值，得到值后需要在前面拼接上 sha256:
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | \
openssl dgst -sha256 -hex | sed 's/^.* //'


# 查看集群节点状态
kubectl get nodes
  
# 此时我们需要给node打上标签，以便区分，执行
kubectl label node qc node-role.kubernetes.io/****=
# 可以为节点增加label，其中****为你要增加的label，qc为你的node名字，注意=不要忘掉
kubectl label node qc node-role.kubernetes.io/****-


# 安装cni网络插件
curl https://docs.projectcalico.org/v3.15/manifests/calico.yaml -O
kubectl apply -f calico.yaml

# 安装需要时间, 等待
kubectl get pod -A | grep calico

# 看到是running 就启动好了
kubectl get nodes

# 可以看到status是ready了

# 创建nginx容器
kubectl create deployment nginx --image=nginx

kubectl get pod,svc

# 暴露端口号
kubectl expose deployment mynginx --port=80 --type=NodePort

kubectl get pod,svc

# 这时候, 就可以用任意个节点ip+暴露的端口号来访问nginx了

# 安装Dashboard 
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
# 由--type=ClusterIP修改为--type=NodePort
kubectl edit svc kubernetes-dashboard -n kubernetes-dashboard
# 查看端口
kubectl get svc -A|grep dashboard

# 访问一下https://k8s-master:port

# 需要创建token, 创建一个dashboard-user.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: admin-user
    namespace: kubernetes-dashboard

# 应用一下
kubectl apply -f dashboard-user.yaml

# 查看servicesaccount
kubectl get serviceaccount -n kubernetes-dashboard

# 创建token
kubectl -n kubernetes-dashboard create token admin-user


# kubeadm reset 错误和, kubeadm init 发生错误
 vi /etc/sysconfig/kubelet
 # 修改成这个
KUBELET_EXTRA_ARGS="--fail-swap-on=false"

kubeadm reset 

# 单机运行
kubectl describe node | grep Taint
kubectl taint node k8s-master (查出来的那一串东西)-

# 修改默认端口
vim /etc/kubernetes/manifests/kube-apiserver.yaml  添加配置
  - --service-node-port-range=1-65535  ##要在--service-cluster-ip-range 下添加
  
systemctl daemon-reload
systemctl restart kubelet
```
### 1.24.x之后的版本搭建
```shell
# 下载kubernates
yum install -y kubelet-1.25.1 kubeadm-1.25.1 kubectl-1.25.1

systemctl enable kubelet
systemctl start kubelet

# 可能会出现问题, 使用命令查看一下启动状态
systemctl status kubelet
journalctl -xefu kubelet
# 如果是,不存在cgroup配置
# 配置关闭 Docker 的 cgroups，修改 /etc/docker/daemon.json，加入以下内容
"exec-opts": ["native.cgroupdriver=systemd"]

# 这个只在主节点上运行, k8s-master
kubeadm init \
--apiserver-advertise-address=10.0.0.3 \
--control-plane-endpoint=k8s-master \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
--kubernetes-version v1.25.1 \
--service-cidr=10.1.0.0/16 \
--pod-network-cidr=10.2.0.0/16

# 可能会有bug
# [ERROR Port-10259]: Port 10259 is in use

# 先清空之前的文件
rm -rf /etc/kubernetes/*
rm -rf ~/.kube/*
rm -rf /var/lib/etcd/*

# 重启
kubeadm reset 
# 然后再执行init就可以了

#  kubeadm init/join 报错 ”unknown service runtime.v1alpha2.RuntimeService”
# 这是因为1.24.x之后就不支持docker了, 需要下载其他支持CRI规范的容器, 如containerd

# 先删除这个
rm /etc/containerd/config.toml
systemctl restart containerd

cat > /etc/crictl.yaml <<EOF
runtime-endpoint: unix:///var/run/containerd/containerd.sock
image-endpoint: unix:///var/run/containerd/containerd.sock
timeout: 0
debug: false
pull-image-on-create: false
EOF

# 然后测试一下好了没
crictl version

# Version:  0.1.0
# RuntimeName:  containerd
# RuntimeVersion:  1.6.28
# RuntimeApiVersion:  v1

# 注意init之后, 出现successful就代表成功了
# 会出现以下的提示, 照着做就行

# 要使非root用户运行kubectl，请执行以下命令，这也是上面kubeadm init输出的一部分： 
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 如果是root用户，则可以执行以下命令：
export KUBECONFIG=/etc/kubernetes/admin.conf

# 加入集群
kubeadm join k8s-master:6443 --token 4qb42s.dp9284nme8i02p88 \
        --discovery-token-ca-cert-hash sha256:7932e1c803ce42fe7b01269f4ecb7bea420216afd103ab852b8b43f3b9f6bff0 \
        --control-plane

# 如果不小心clear了, 查看token
kubeadm token list

# token过期了就, 创建token
kubeadm token create --print-join-command

# 获取 --discovery-token-ca-cert-hash 值，得到值后需要在前面拼接上 sha256:
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | \
openssl dgst -sha256 -hex | sed 's/^.* //'

# 查看集群节点状态
kubectl get nodes
  
# 此时我们需要给node打上标签，以便区分，执行
kubectl label node qc node-role.kubernetes.io/****=
# 可以为节点增加label，其中****为你要增加的label，qc为你的node名字，注意=不要忘掉
kubectl label node qc node-role.kubernetes.io/****-


# 安装cni网络插件, 不按装会出现NoReady
curl https://docs.projectcalico.org/v3.15/manifests/calico.yaml -O
kubectl apply -f calico.yaml

# 安装需要时间, 等待
kubectl get pod -A | grep calico

# 看到是running 就启动好了
kubectl get nodes

# 可以看到status是ready了

# 创建nginx容器
kubectl create deployment nginx --image=nginx

kubectl get pod,svc

# 暴露端口号
kubectl expose deployment mynginx --port=80 --type=NodePort

kubectl get pod,svc

# 这时候, 就可以用任意个节点ip+暴露的端口号来访问nginx了

# 安装Dashboard 
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml
# 由--type=ClusterIP修改为--type=NodePort
kubectl edit svc kubernetes-dashboard -n kubernetes-dashboard
# 查看端口
kubectl get svc -A|grep dashboard

# 访问一下https://k8s-master:port

# 需要创建token, 创建一个dashboard-user.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: admin-user
    namespace: kubernetes-dashboard

# 应用一下
kubectl apply -f dashboard-user.yaml

# 查看servicesaccount
kubectl get serviceaccount -n kubernetes-dashboard

# 创建token
kubectl -n kubernetes-dashboard create token admin-user


# kubeadm reset 错误和, kubeadm init 发生错误
 vi /etc/sysconfig/kubelet
 # 修改成这个
KUBELET_EXTRA_ARGS="--fail-swap-on=false"

kubeadm reset 

# 单机运行
kubectl describe node | grep Taint
kubectl taint node k8s-master (查出来的那一串东西)-

# 修改默认端口
vim /etc/kubernetes/manifests/kube-apiserver.yaml  添加配置
  - --service-node-port-range=1-65535  ##要在--service-cluster-ip-range 下添加
  
systemctl daemon-reload
systemctl restart kubelet
```

## kubectl
### 1.1 在任意节点中使用kubectl
1. 将 master 节点中 /etc/kubernetes/admin.conf 拷贝到需要运行的服务器的 /etc/kubernetes 目录中
scp /etc/kubernetes/admin.conf root@k8s-node1:/etc/kubernetes

2. 在对应的服务器上配置环境变量
echo "export KUBECONFIG=/etc/kubernetes/admin.conf" >> ~/.bash_profile
source ~/.bash_profile

### 1.2 资源操作

