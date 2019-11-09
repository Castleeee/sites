---
title: Flask
date: 2019-3-10 14:38:00
prev: false
next: ./Django.md
categories: backEnd
tags:
- 后端
- web
- Flask
- python
- 所有文章
---

<font color=#53abe2 size=5>前言:</font>   
学习flask用来开发一些小的快速的只有几个接口的东西，而且也可以扩充自己的技术栈，我不会深挖原理持续学flask，编程扳手能用就行，因此也不会记的很详细。jinja2除外，因为这个东西可以直接在Django里代替Django原先的模板，一次学习，到处使用。Django作为主力的单机框架，大的web还得用java，没啥要求就用Django，odoo看情况学不学。主要还是想学习大数据方向的东西，有机会搞搞知识图谱和软件工程理论，精力集中在数据层上。  
我搜集的千峰笔记 <a href='https://flaskdoc.ooowl.fun'>https://flaskdoc.ooowl.fun</a> 我直接挂这儿了v.1.0.2。有兴趣的可以直接<a href='https://pan.baidu.com/s/1tfOdUCxlDAleDtTlhpUsDw'>拿去用</a>，密码`1xid`   

## 基础
hello world 程序详解
```py
from flask import Flask # 引入主程序

app=Flask(__name__) # 生成对象并以参数形式获得当前目录

@app.route('/') # 规定路由
def hello_world(): # 处理函数
    return 'hello world'

if __name__ == '__main__':
    app.debug = False # 禁止debug模式 
    app.run(host=None, port=None, debug=Boolean,threaded=True,processes=3) # 运行,多线程进程
```
返回值可以直接写html,不过不推荐你这样做因为很蠢.  
Debug模式只有在develop环境才能使用,默认应该是develop,如果不是,在你的环境变量里面添加"FLASK_ENV".  
Debug可以`app.debug=Bool` or `app.run(debug=False/True)` or 环境变量"".我的现在好像只有环境变量才管用,不知道为啥.

:::tip Linux环境变量   
- 系统级
    - `/etc/envirtonment`
    - `/etc/profile`
- 用户级:`~/.bashrc`
- 临时级:`在窗口中直接export`  
依次生效顺序覆盖,windows可以直接在pycharm中设置
:::

```  
 * Serving Flask app "app.py" (lazy loading)
 * Environment: development #这里显示是不是生产环境
 * Debug mode: on # 这里显示是否是调试模式
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 235-170-085 # 这是pin
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
flask可以直接在网页控制台控制调试,但是需要输入pin码    
<br/>
到这里基本上很小的逻辑都能够解决了,但是如果拓展那就不好办,整个代码耦合在一个文件.  

### Flask-script拆分
用这个可以把app拆分,渐渐的从一个微型文件变成了django.  
首先pip安装这个拓展,<a href="https://flask-script.readthedocs.io/en/latest/">官网</a>  

## jinja2模板


<Valine></Valine>
