---
title: Docker🐳
date: 2019/2/10
categories: Distributed
tags:
- 容器技术
- 分布式
- linux
- 所有文章
---

<!-- more -->
<div align= center>
<h1>Docker🐳</h1>
<br/>

docker架构网上一大把，文档里也有主要介绍常用命令和使用中遇到的问题<br/>
被linux各种奇奇怪怪的错误折磨疯了<br/> 用了docker一时爽，一直用docker一直爽！

</div>





## 🐳

### 安装与启动
windows下安装需要在BIOS中启动虚拟化和Hyper-v。无脑下一步就行<br/>
linux <a href="https://www.cnblogs.com/yufeng218/p/8370670.html">这是centos</a> <br/>
启动服务:sudo service docker start<br/>
先试一下:docker run ubuntu echo hello docker<br/>
hello docker<br/>
<a href="https://hub.daocloud.io/">国内的镜像</a>

### 基本命令
:::warning
可以把每个 container 看做是一个独立的主机,container 一旦创建如果没有用 rm 命令移除，将会一直存在。所以用完后记得删除
:::
- docker info 查看本机上docker的信息
- docker version 查看docker的版本
- docker login/logout登陆/登出
- docker images 查看镜像可以跟name
    - -a 列出所有镜像（含过程镜像）；

    - -f 过滤镜像，如： -f ['dangling=true'] 只列出满足dangling=true 条件的镜像；

    - --no-trunc 可显示完整的镜像ID；

    - -q 仅列出镜像ID。

    - --tree 以树状结构列出镜像的所有提交历史。

- docker run -p 8080:80 -d xxx  容器运行指定的image,将镜像的80映射到本机的8080，-d意思是直接返回不阻塞
    - -i - t 进入命令行

:::tip
映射端口docker run -d -p 80:80 -p 22:22<br/>
进入命令行docker run -i - t xxxx (注意有个空格)/bin/bash
:::
- docker ps 查看当前正在运行的容器的信息<br/>
列出所有运行中容器。
    - -a 列出所有容器（含沉睡镜像）；
    - --before="nginx" 列出在某一容器之前创建的容器，接受容器名称和ID作为参数；
    - --since="nginx" 列出在某一容器之后创建的容器，接受容器名称和ID作为参数；
    - -f [exited=int] 列出满足exited=int条件的容器；
    - -l 最新创建的一个容器；
    - --no-trunc 显示完整的容器ID；
    - -n=4 列出最近创建的4个容器；
    - -q 仅列出容器ID；
    - -s 显示容器大小。<br/>








           [root@izuf6720onwdpnl2xfy65lz ~]# docker ps
           CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
           28ee7cbe79da        docker.io/nginx     "nginx -g 'daemon ..."   53 seconds ago      Up 52 seconds       0.0.0.0:8081->80/tcp   goofy_ritchie








- docker cp file.txt 28ee7cbe79da(容器id)：//usr/share/nginx/html 将file.txt复制到该容器的指定目录
- ctrl+Q+P退出容器
:::warning
你所做的对容器内部的更改docker不会保存，需要用命令commit
:::
- docker commit -m "commit信息" imageid 保存的image的名字
- docker rmi imageid 删掉image
- docker rm imageid 删掉image可以删除历史
    - -f 强行移除该容器，即使其正在运行

    - -l 让该镜像断网

    - -v 移除与容器关联的空间
- docker /stop imageid 启动/停止/重启 一个image
    - -i 启动一个容器并进入交互模式操控该镜像的命令行

    - -t 10 停止或者重启容器的超时时间（秒），超时后系统将杀死进程。
- docker inspect
- docker history imageid 查看历史
    - --no-trunc 显示完整的提交记录；

    - -q 仅列出提交记录ID。
- docker pull xxx 获取image
- docker build + path 把这个路径下所有的文件打包成一个dockerimage
    - -t xxx 附加这个image的标签
- docker push 推送dockerimage
- docker exec -it 容器id或name /bin/bash 进入容器的命令行用attach的时候推出会直接结束容器

:::tip
docker rm `docker ps -a -q`删除所有的容器<br/>
docker rmi `docker images -q`删除所有镜像<br/>
docker rmi `docker images -q | awk '/^<none>/ { print $3 }'`按条件删除镜像<br/>
docker rmi --force `docker images | grep doss-api | awk '{print $3}'`按条件删除镜像其中doss-api为关键字<br/>
:::






### dcokerfile

|命令|用途|
|:----|----:|
|FROM|base image|
|RUN|执行命令|
|ADD|添加文件|
|COPY|拷贝文件|
|ADD|可以添加远程文件和本机文件|
|CMD|执行命令|
|EXPOSE|暴露端口|

### 分层存储
运行docker image时候，不同的容器可能只读共享一个image，当运行起来之后上面每个容器的状态不保存，commit会产生改过的新容器
### volume
独立与容器外提供持久化存储，容器之间共享
- docker run -d --name -v 容器内部的一个路径 nginx(imageName)挂载了一个路径。<br/>
docker inspect nginx(name)进行访问

            "Mounts": [
                        {
                            "Type": "volume",
                            "Name": "f9bdb344eba8cf6667950ded15d5561e2624225703d0472d0432cfa4a3dcf742",
                            "Source": "/www/server/docker/volumes/f9bdb344eba8cf6667950ded15d5561e2624225703d0472d0432cfa4a3dcf742/_data",
                            "Destination": "/usr/share/nginx/html",
                            "Driver": "local",
                            "Mode": "",
                            "RW": true,
                            "Propagation": ""
                        }
注意source容器外和destination容器内<br/>
- docker exec -i -t nginx(镜像名) /bin/bash(linux的bash路径)进入镜像内部
- docker run -p 8080:80 -d -v $PWD/a:/usr/share/nginx/html nginx
  - 将内部的80映射到8080，将内部的/usr/share/nginx/html目录挂载到$PWD(当前工作目录)的a目录下
- 1.docker create -v $PWD/data:/var/mydata --name data_container ubuntu
  - 以ubuntu为基础，创建一个容器。-v让这个容器的目录/var/mydata挂载到$PWD/data
- 2.docker run -it --volumes-from data_container ubuntu /bin/bash 运行ubuntu镜像和这个镜像互通(这个ubuntu的这个目录修改会同步到data_container和挂载的目录)

### 镜像仓库
docker daemon 管着container 和images，images是从Registry拉取的，默认是官方的dockerHub<br/>
国内 aliyun 时速云 daocloud<br/>
- docker search xxx搜索
- docker pull xxx拉取
- docker push xxx 推送到Registry
- docker tag aaa bbb改掉aaa的tags产生一个bbb

### 持久化
## ⚓
<div align= center>
<h1>K8s⚓</h1>
<br/>

利用k8s编排并且管理集群和分布式环境<br/>
说白了就是用来数框框的😶

</div>

## 鸽了

/usr/myporject/go/distribute/worker/server
docker run -it -p 8083:8888 --name worker3 --volumes-from dataContainer golang /bin/bash
<Valine></Valine>

