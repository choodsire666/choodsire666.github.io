#### 第一章 安装

##### 安装nginx

```shell
yum update	
yum install gcc openssl openssl-devel pcre pcre-devel zlib zlib-devel -y

cd /root/opt/mysoftwares
tar -zxvf nginx.tar

cd nginx

./configure --prefix=/usr/local/nginx

make & make install

cd /usr/local/nginx

cd sbin
ls

# nginx

#运行
./nginx

#检测
ps -ef|grep nginx

# master worker 进程代表成功
```

##### 启动Nginx

进入到sbin目录下

```shell
./nginx
```

通过配置文件启动

```shell
./nginx -c /usr/local/nginx/conf/nginx.conf
```

##### 关闭nginx

###### 第一种 优雅的关闭

```shell
ps -ef|grep nginx
kill -quit pid
```

###### 第二种 快速关闭

```shell
ps -ef|grep nginx
kill -term pid
```

##### 重启nginx

```shell
./nginx -s reload
```

##### 配置检查

```shell
./nginx -c /usr/local/nginx/conf/nginx.conf -t
```

-t: 进行配置检查

##### 查看版本

```shell
#查看版本号
./nginx -v
#查看版本号,编译版本,配置信息
./nginx -V
```

#### 第二章 配置文件

```shell
#配置worker进程运行用户,nobody也是一个linux用户,一般用于启动程序,没有密码
#user  nobody;

#配置工作进程数目,根据硬件调整,通常等于cpu数量或者2倍
worker_processes  1;

#配置全局错误日志及类型[debug | info | notice | warn | error | crit],默认是error
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#保存pid的文件
#pid        logs/nginx.pid;


#配置工作模式和连接数
events {
    worker_connections  1024;#配置每个worker进程的连接数上限,nginx支持的总连接数就等于改数乘工作进程数目,最大为65535
}

#配置http服务器,利用它的反向代理功能提供负载均衡支持
http {
	#配置nginx支持哪些多媒体类型,可以在conf/mime.types查看支持哪些多媒体类型
    include       mime.types;
    #默认文件类型 流类型,可以理解为支持任意类型
    default_type  application/octet-stream;

	#配置日志格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

	#配置access.log日志及存放路径,并使用上面的main日志格式,访问日志
    #access_log  logs/access.log  main;

    sendfile        on;#开启高效文件传输模式
    #tcp_nopush     on;#防止网络阻塞,上线一般开启

    #keepalive_timeout  0;
    keepalive_timeout  65;#长连接超时时间,单位是秒

    #gzip  on;#开启gzip压缩输出,上线一般开启

	#配置虚拟主机
    server {
        listen       80;#配置监听端口
        server_name  localhost;#配置服务名

        #charset koi8-r; #配置字符集,默认是utf-8

        #access_log  logs/host.access.log  main; #访问日志,虚拟主机的

		#默认的匹配斜杠/的请求,当访问路径中有斜杠/,会被该location匹配到并进行处理
        location / {
            root   html;#root是配置服务器的默认网站跟目录位置,默认为nginx安装主目录下的html目录
            index  index.html index.htm;#默认的首页文件的名称
        }

        #error_page  404              /404.html; #配置404页面

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

#### 第三章 静态网页部署

直接改nginx.conf中的location,把静态资源上传上去就ok了

#### 第四章 负载均衡

##### 硬件负载

f5 Arrary等

性能好等优点

费用贵

##### 软件负载

Nginx等

免费开源

##### 启动tomcat

```shell
./apache-tomcat-9.0.60-01/bin/startup.sh | tail -f ./apache-tomcat-9.0.60-01/logs/catalina.out &
```

#### 第五章 nginx常用负载均衡策略

##### 轮询(默认)

##### 权重

```shell
upstream www.myweb.com{
     server ***.***.**.***:8081 weight 3;
	server ***.***.**.***:8082 weight 4;
          }

    server {
        listen       80;
        server_name  localhost; 
        #server_name本地域名
  
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

	location /myweb {
	    proxy_pass http://www.myweb.com;
	}
```

##### ip_hash

通过ip的hash%tomcat数 相同 ,访问tomcat

一次连接后,永远不变

```shell
upstream www.myweb.com{
	ip_hash;
     server ***.***.**.***:8081;
	server ***.***.**.***:8082;
}
```
##### fair
按后端服务器的响应时间来分配请求，响应时间短的优先分配
```shell
upstream server pool{
server 192.168.5.21:80
server 192.168.5.22:80
fair
}
```

##### 最少连接

```shell
upstream www.myweb.com{
     least conn;
     server ***.***.**.***:8081;
	server ***.***.**.***:8082;
}
```

##### 备份

```shell
upstream www.myweb.com{
     least conn;
     server ***.***.**.***:8081;
	server ***.***.**.***:8082 backup;
}
```

#### 第六章 静态代理

用nginx 静态代理,效率高

##### 第一种 后缀名

```shell
location ~ .*\.(css|htm|html|js|jpg|png|map3)${
		root /opt/static;
}
```

##### 第二种 目录

```shell
location ~ .*/(css|js|img|images|image){
		root /opt/static;
}
```

#### 第七章 动静分离
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29688613/1712215479547-0f90a98f-3c1a-4dfc-be4e-bbf628f6161c.png#averageHue=%23f7fbf7&clientId=u604db47f-e3f0-4&from=paste&height=442&id=u57cfa41a&originHeight=548&originWidth=911&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=58819&status=done&style=none&taskId=ud46ea968-30ad-4c11-bf50-75517b30bd8&title=&width=734.9243461889589)<br />从实现的角度上大致上分为两种：<br />一种是纯粹把静态文件独立成单独的域名，放在独立的服务器上。<br />另一种就是动态跟静态文件混合在一起发布，通过nginx来分开<br />通过location指定不同的后缀名实现不同的请求转发。通过expire参数设置，可以使浏览器缓冲过期时间，减少与服务器之间的请求和流量。我们这里设置3d，表示这3天之内访问这个URI，发送一个请求，比对服务器该文件最后的更新时间没有变化	<br />nginx只用与负载均衡

然后其他nginx负载静态资源

tomcat负载动态资源

```shell
   #tomcat
   upstream www.p2p.com{
             ip_hash;
             server xxx.xxx.xxx.xxx:8081;
            server xxx.xxx.xxx.xxx:8082;
    }	

	#处理静态资源的nginx
    upstream static.p2p.com{
	server xxx.xxx.xxx.xxx:81;
	server xxx.xxx.xxx.xxx:82;
    }

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

		#动态资源转发给tomcat
        location /p2p {
            proxy_pass http://www.p2p.com;
        }

		#静态资源转发给nginx
        location  ~ .*/(css|js|img|images){
                 proxy_pass http://static.p2p.com;
        }
```

#### 第八章 虚拟主机

```shell
upstream beijing.myweb.com {
		server 192.168.1.101:8081;
	}

	upstream nanjing.myweb.com {
		server 192.168.1.101:8082;
	}

	upstream tianjing.myweb.com {
		server 192.168.1.101:8083;
	}


	server{
		listen	80;
		server_name	beijing.myweb.com;

		location / {
			proxy_pass http://beijing.myweb.com;
		}
	}

	server{
		listen	80;
		server_name	tianjing.myweb.com;

		location / {
			proxy_pass http://tianjing.myweb.com;
		}
	}

	server{
		listen	80;
		server_name	nanjing.myweb.com;

		location / {
			proxy_pass http://nanjing.myweb.com;
		}
	}
```

配置本地dns映射

在c盘的windows文件夹中的system32中的drivers中的etc中的hosts文件

C:\Windows\System32\drivers\etc

添加本地ip DNS 映射
#### 第八章 高可用
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29688613/1712216479848-40013f78-745b-496b-9f1c-79f2c937b7fe.png#averageHue=%23f5faf6&clientId=u604db47f-e3f0-4&from=paste&height=249&id=u7bc28ab4&originHeight=309&originWidth=1121&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=77439&status=done&style=none&taskId=u70de337d-8597-474c-96dc-402ef6d8235&title=&width=904.3361054641305)<br />高可用<br />![image.png](https://cdn.nlark.com/yuque/0/2024/png/29688613/1712216745507-20d6227c-35e3-4b89-9ec8-1b9af00f0207.png#averageHue=%23f3f8f4&clientId=u604db47f-e3f0-4&from=paste&height=365&id=uc111e6dc&originHeight=452&originWidth=1320&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=141308&status=done&style=none&taskId=ueef4f6fd-4ae7-42d1-b5e8-e9e60b55bd6&title=&width=1064.873915443936)
##### 安装keeyalived
1.使用yum命令进行安装<br />yum install keepalived -y<br />2.安装之后，在etc里面生成目录keepalived，有文件keepalived.conf

完成高可用配置(主从配置)<br />静态资源最大并发数是：worker_connection*worker_process/2,<br />HTTP为反向代理来说，最大并发数量应该是worker_connections*worker_process/4
