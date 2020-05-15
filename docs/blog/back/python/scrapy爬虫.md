---
title: Scrapy
date: 2018-7-13 14:40:45
prev: ./基础爬虫.md
next: false
categories: backEnd
tags:
- python🐍
- scrapy
- 后端
- 异步
- 所有文章
- 爬虫🕷
- 进阶
---


<div align= center><h1>Scrapy介绍</h1></div>
<div align= center><h3>异步</h3>
engine异步调用缩短事件
<h3>事件循环</h3>
对象传递+事件循环<br/>
spider—>item—>pipline
<h3>定制化</h3>
定制的pipline集中存储<br/>
selector+xpath定位爬取
<img src="./static/scrapy_architecture.png"/></div>

## Setting&命令
<h3>环境</h3>

Pycharm设置好环境python路径等等不用多说<br/>
从wheel找
- pywin32
- pillow
- tiwsted
:::danger
不能只装pymysql需要MYSQLdb<br/>
安装MYSQLdb也就是mydqlclient和pymysql<br/>
如果失败apt-get install python-devel mysql-devel
:::

linux下需要安装的

```shell
pip install asyncio aiohttp beautifulsoup4 bs4 demjson elasticsearch elasticsearch-dsl fake-useragent lxml mysqlclient pymongo PyMySQL pyquery redis requests Scrapy selenium six Twisted urllib3 scrapy_djangoitem scrapy-redis
```
如果需要和django搭配使用,那就运行下面这一条,然后再去运行django的那一条懒人命令
