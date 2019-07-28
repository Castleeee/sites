---
title: 关于uWSGI
date: 2019-6-4 20:38:45
categories: backEnd
sidebar: false
tags:
- 后端
- web
- 网络协议
- python
---

## 是啥
<a href='https://uwsgi-docs.readthedocs.io/en/latest/'>文档</a>
### WSGI  
  
WSGI的全称是Web Server Gateway Interface（Web服务器网关接口），它不是服务器、python模块、框架、API或者任何软件，只是一种描述web服务器（如nginx，uWSGI等服务器）如何与web应用程序（如用Django、Flask框架写的程序）通信的规范。  
  
server和application的规范在PEP3333中有具体描述，要实现WSGI协议，必须同时实现web server和web application，当前运行在WSGI协议之上的web框架有Bottle, Flask, Django。  
### uWSGI  
  
uWSGI是一个全功能的HTTP服务器，实现了WSGI协议、uwsgi协议、http协议等。它要做的就是把HTTP协议转化成语言支持的网络协议。比如把HTTP协议转化成WSGI协议，让Python可以直接使用。  
### uwsgi  
  
与WSGI一样，是uWSGI服务器的独占通信协议，用于定义传输信息的类型(type of information)。每一个uwsgi packet前4byte为传输信息类型的描述，与WSGI协议是两种东西，据说该协议是fcgi协议的10倍快。  
### Nginx  
  
Nginx是一个Web服务器其中的HTTP服务器功能和uWSGI功能很类似，但是Nginx还可以用作更多用途，比如最常用的反向代理功能。  
### Django  
  
Django是一个Web框架，框架的作用在于处理request和 reponse，其他的不是框架所关心的内容。所以如何部署Django不是Django所需要关心的。  
  
Django所提供的是一个开发服务器，这个开发服务器，没有经过安全测试，而且使用的是Python自带的simple HTTPServer 创建的，在安全性和效率上都是不行的。  
  
以下是最新版本Django有关runserver command的代码节选  

- <a href='https://github.com/django/django/blob/master/django/core/management/commands/runserver.py#L100-L107'>django.core.management.commands.runserver.Command:run</a>  
- <a href='https://github.com/django/django/blob/master/django/core/management/commands/runserver.py#L141-L142'>django.core.management.commands.runserver.Command:inner_run</a>  

其中inner_run函数中的run方法和run方法中server_cls 参数分别取自  

- <a href='https://github.com/django/django/blob/master/django/core/servers/basehttp.py#L164-L180'>django.core.servers.basehttp:run</a>  
- <a href='https://github.com/django/django/blob/master/django/core/servers/basehttp.py#L57-L73'>django.core.servers.basehttp:WSGIServer</a>  

在Django源码中可以很清楚的看出来，runserver起来的HTTPServer 就是Python自带的simple_server。而WSGIServer的父类就是wsgiref.simple_server。既然是simple了很多东西都是不太可以的。  
访问过程  
  
用一张图来描述一下上述过程：  
<div align=center ><img src="./static/20180306142935273.png" style="height: 200px"/></div>
  

  
一个成熟的站点提供服务，需要Web服务器（静态数据）和App服务器（动态数据）。Web服务器目前属Nginx最强大，用户请求代理过来后，把数据返回给请求客户端。但是目前的互联网发展时代，都是包含动态数据处理的，这样一般Nginx不处理业务逻辑，都外包给后端的App服务器，就是你的django服务器。  
  
在需要性能优化的场景，通常单单nginx和uWSGI也是不够的。nginx主要优化的是连接数和静态文，uWSGI主要优化的是wsgi 服务，这些都只是手段  
<br/><div align="right"><small>------<a href='https://blog.csdn.net/yjk13703623757/article/details/79457913'>作者原文</a> </small></div>


## 干啥的
## 原理
## 在哪用了
Django部署用了。  
网上部署文章多的是，大部分是步骤，没几个讲原理的，我今天就带着步骤讲一下原理吧。其实也是一点一点从网上找着积累的。  
### 首先，我没时间了

