---
title: java基础☕️(5)
date: 2019-12-27 21:38:45
prev: ./java基础语法5.md
next: ./java基础语法6.md
categories: backEnd
tags:
- 语言基础
- 所有文章
- 后端
- java☕️
---

:::tip   多线程<br/>
为了达拉然!
:::

<!-- more -->

## 反射机制

## 多线程编程

## 引用参考
- 啊


java内置包详解

## 内置包详解
1. java.lang---包含一些Java语言的核心类，如String、Math、Integer、System和Thread，提供常用功能。
2. java.net---包含执行与网络相关的操作的类和接口。
3. java.io---包含能提供多种输入/输出功能的类。
4. java.util---包含一些实用工具类，如定义系统特性、接口的集合框架类、使用与日期日历相关的函数。
5. java.text---包含了一些java格式化相关的类6.iava.sql---包含了java进行JDBC数据库编程的相关类/接口7. java.awt---包含了j构成抽象窗口工具集（abstract window toolkits）的多个类，这些类被用来构建和管理应用程序的图形用户界面（GUI）
8. java.applet---包含applet运行所需的一些类。   
<div align=center ><img src="./static/Snipaste_2019-12-28_13-20-25.png" style="height: 600px"/>
</div>


<Valine></Valine>

#user  nobody;
worker_processes  1;
 
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
 
#pid        logs/nginx.pid;
 
 
events {
    worker_connections  1024;
}
 
 
http {
    include       mime.types;
    default_type  application/octet-stream;
 
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
 
    #access_log  logs/access.log  main;
 
    sendfile        on;
    #tcp_nopush     on;
 
    #keepalive_timeout  0;
    keepalive_timeout  65;
 
    #gzip  on;
    server {
        listen       80;
        server_name  localhost;
 
        charset utf-8;
	location / { # /表示根目录，该配置表示Nginx默认打开/www下的index.html  
	    root C:\foo;
	    index  index.html index.htm;
	}

    }
 }

server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;



    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
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
