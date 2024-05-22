id: bidah4yzy0ih3lbu
title: k8s集群搭建
date: '2024-05-22 16:19:18'
updated: '2024-05-22 16:19:20'
tags:
  - k8s
  - 容器
  - 容器编排
categories:
  - java后端
---

```shell
# vim /etc/hosts
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
yum install -y kubelet-1.25.1 kubeadm-1.25.1 kubectl-1.25.1

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

# 可能有这个错误, kubeadm init/join 报错 ”unknown service runtime.v1alpha2.RuntimeService”, 这是因为1.24.3版本开始的, 这些端点废弃了,需要重新指定

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

# 查看token
kubeadm token list

# 创建token
kubeadm token create --print-join-command

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



