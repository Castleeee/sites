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
- python🐍
- 所有文章
---

<font color=#53abe2 size=5>前言:</font>   
学习flask用来开发一些小的快速的只有几个接口的东西，而且也可以扩充自己的技术栈，我不会深挖原理持续学flask，编程扳手能用就行，因此也不会记的很详细。jinja2除外，因为这个东西可以直接在Django里代替Django原先的模板，一次学习，到处使用。Django作为主力的单机框架，大的web还得用java，没啥要求就用Django，odoo看情况学不学。主要还是想学习大数据方向的东西，有机会搞搞知识图谱和软件工程理论，精力集中在数据层上。  
我搜集的千峰笔记 <a href='https://flaskdoc.ooowl.fun'>https://flaskdoc.ooowl.fun</a> 我直接挂这儿了v.1.0.2。有兴趣的可以直接<a href='https://pan.baidu.com/s/1tfOdUCxlDAleDtTlhpUsDw'>拿去用</a>，密码`1xid`   

## 项目结构
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
Debug可以`app.debug=Bool` or `app.run(debug=False/True)` or 环境变量"FLASK_DEBUG".我的现在好像只有环境变量才管用,不知道为啥.

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
首先pip安装这个拓
展,<a href="https://flask-script.readthedocs.io/en/latest/">官网</a>  

```py
from flask import Flask
from flask_script import Manager

app = Flask(__name__)

manager = Manager(app)
@app.route('/') # 规定路由
def hello_world(): # 处理函数
    return 'hello world'

if __name__ == '__main__':
    #app.run() # 运行
    manager.run()
```
文件名改名为manage.py,使用cmd中python manage.py runserver 可django一样  
参数如下  
>  -?, --help  show this help message and exitM<br>
>  -h HOST, --host HOST 指定主机M<br>
>  --threaded 是否启用多线程M<br>
>  --processes PROCESSES 是否启用多进程 M<br>
>  --passthrough-errors 忽略错误不报告M<br>
>  -d, --debug   调试模式  enable the Werkzeug debugger (DO NOT use in production code)M<br>
>  -D, --no-debug  不调试模式  disable the Werkzeug debuggerM<br>
>  -r, --reload 自动重新加载 monitor Python files for changes (not 100% safe for production use)M<br>
>  -R, --no-reload       do not monitor Python files for changesM<br>
>  --ssl-crt SSL_CRT     Path to ssl certificateM<br>
>  --ssl-key SSL_KEY     Path to ssl keyM<br>

### 独立view和拓展SQL
安装`flask-blueprint`,`flask_sqlalchemy`,把view和拓展都独立出去,方便管理
拆分view的基本思路是
每个文件是一组view，然后在每一个view.py文件里面初始化一个blueprint
```py
from flask import Blueprint

first= Blueprint("first",__name__)
@first.route("/")
def index():
    return "我是主页"
```
在views的__init__里引入其他文件的blueprint，声明函数init_view，然后函数接收app，注册blueprint
```py
from .first import first
from .second import second

def init_view(app):
    app.register_blueprint(first)
    app.register_blueprint(second)
```
App中包含views(文件夹)，models，先把这三个引入，ext。在App的__init__中主要任务是生成app，引入view的init_view，ext的init_ext。
```py
from flask import Flask
from App.views import init_view
from App.ext import init_ext
def create_app():
    app=Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///sqlite.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
    init_view(app)
    init_ext(app)
    return app
```
ext的思路也是一样的，用函数接收app初始化，因为整个app是以一个对象的形式传递的
```py
#import your model here
from flask_sqlalchemy import SQLAlchemy
#your class&function here
models=SQLAlchemy()
migrate=Migrate()# 安装migrate后使用
def init_ext(app):
    models.init_app(app)
    migrate.init_app(app,models)# 安装migrate后使用
```
数据库url写法`数据库+驱动://用户名:密码@主机:端口/具体哪一个库`  
最后在`manage.py`里面引入这个app，然后运行就可以了
```py
from flask_script import Manager

from App import create_app

app = create_app()

manager = Manager(app)

if __name__ == '__main__':
    #App.run() # 运行
    manager.run()
```
组后工程结构图
<div align=center ><img src="./static/Snipaste_2019-11-20_16-50-47.png" style="height: 350px"/></div>

### 管理环境
建立`settings.py`,或者直接改ini为py
测试，开发，演示，生产四个环境,传入对象的格式是固定的,记住以后就这么写,模仿django的配置.
<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">Click to See More Code</I></B></summary>

```py
def get_db_url(dbinfo):#将配置组合成url
    engine = dbinfo.get("ENGINE") or "sqlite"
    driver = dbinfo.get("DRIVER") or "sqlite"
    user = dbinfo.get("USER") or ""
    password = dbinfo.get("PASSWORD") or ""
    host = dbinfo.get("HOST") or ""
    port = dbinfo.get("PORT") or ""
    table = dbinfo.get("TABLE") or ""

    return "{}+{}://{}:{}@{}:{}/{}".format(engine, driver, user, password,host, port, table)

class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS=False

class DevConfig(Config):
    DEBUG = True
    dbinfo={
        "ENGINE":"mysql",
        "DRIVER":"pymysql",
        "USER":"root",
        "PASSWORD":"1118",
        "HOST":"mysql.ooowl.fun",
        "PORT":"3306",
        "TABLE":"flaskStudy",
    }
    SQLALCHEMY_DATABASE_URI=get_db_url(dbinfo)

class TestConfig(Config):
    DEBUG = True
    dbinfo={
        "ENGINE":"mysql",
        "DRIVER":"pymysql",
        "USER":"root",
        "PASSWORD":"1118",
        "HOST":"mysql.ooowl.fun",
        "PORT":"3306",
        "TABLE":"flaskStudy",
    }
    SQLALCHEMY_DATABASE_URI=get_db_url(dbinfo)


class StageConfig(Config):
    DEBUG = True
    dbinfo = {
        "ENGINE": "mysql",
        "DRIVER": "pymysql",
        "USER": "root",
        "PASSWORD": "1118",
        "HOST": "mysql.ooowl.fun",
        "PORT": "3306",
        "TABLE": "flaskStudy",
    }
    SQLALCHEMY_DATABASE_URI = get_db_url(dbinfo)

class ProductConfig(Config):
    DEBUG = True
    dbinfo={
        "ENGINE":"mysql",
        "DRIVER":"pymysql",
        "USER":"root",
        "PASSWORD":"1118",
        "HOST":"mysql.ooowl.fun",
        "PORT":"3306",
        "TABLE":"flaskStudy",
    }
    SQLALCHEMY_DATABASE_URI=get_db_url(dbinfo)

#包装成一个对象，便于manage引入
envs={
"dev":DevConfig,
"test":TestConfig,
"stage":StageConfig,
"prod":ProductConfig,
"default":DevConfig
}
```

</details>


在App的init中`app.config.from_object(envs.get("dev"))#相当于字典，拿到里面的对象`  

### Migrate数据库表迁移
`pip install flask-Migrate`  
在ext中添加`migrate=Migrate()` `migrate.init_app(app,models)`上面有.  
在manage.py中添加`manager.add_command("db",MigrateCommand)`少啥引入啥  

```py
这里是以后拿笔画结构图的地方
```
flask可以通过各种插件拓展功能,你可以把她变得和django一样,也可以一个文件搭建很小的服务,真正大小可变轻量级,想拆成什么规模都行. 
通常是 init,生成python文件,upgrade生成sql的migrate表,migrate生成数据库
## 路由
### 获取参数
**限定方法**  
`@app.route('/demo2', methods=['GET','POST','DELETE','PUT','HEAD','Options'])`
**参数**有 
<div align= center>

|Type  |  example|
|:----|:----:|
|&lt;string:para&gt;| 默认接收没有斜杠的,如果你的url有"/",那你的访问地址也要带,否则会报错|
|&lt;int:para&gt;| 整型|
|&lt;float:para&gt;| 浮点型|
|&lt;path:para&gt;|接收路径,可接收斜线.如果你url带了斜线,那么访问地址最后的斜线就会被忽略|
|&lt;uuid:para&gt;| 只接受uuid字符串|
|&lt;any(a,b):para&gt;| 可以同时指定多路径,访问a,b都可以使用处理函数,默认string|

</div>

自带converter,默认为string  
可以叠加,一个函数使用多个装饰器  

```py
@first.route("/number/<string:xxx>")
@first.route("/path/<path:xxx>")
def a(xxx):
    return xxx
```

###  重定向和request
硬编码
```py
@first.route("/redirect/")
def redirectx():
    return redirect("/path/阿斯帝芬")
```  
函数带参数反向解析
```py
@first.route("/redirect/")
def redirectx():
    return redirect(url_for('first.a',xxx = "事实上"))
```  

request对象由flask自己生成(需要引入),携带了各种各样的信息,看不懂的去补HTTP的知识  

<div align=center ><img src="./static/Snipaste_2019-11-19_18-01-557.png" style="height: 450px"/></div>

常用参数

<div align= center>

|属性|说明|类型|
|:----:|:----:|:----:|
|data|记录请求的数据，并转换为字符串,比如json,xml|*|
|form|记录请求中的表单数据|MultiDict|
|args(request.args.get("city"))|获取请求中的查询参数(?city="x")|MultiDict |
|cookies|记录请求中的cookie信息|Dict |
|headers|记录请求中的报文头|EnvironHeaders |
|method|记录请求使用的HTTP方法|GET/POST等 |
|url|记录请求的URL地址|string |
|base_url|去掉GET参数的URL||
|host_url|只有主机和端口号的URL||
|remote_addr|请求的客户端地址||
|files|记录请求上传的文件|*|
</div>

### 响应Response
- `return "xxx",状态码`直接返回响应字符串
- `return render_template("testfile.html")`直接渲染html
- `return make_response(" <h1>sdsadasd</h1>")`调用函数构建
- `return Response()`自己构建,debug去看具体参数
- `abort(404)/abort(Response("xxx"))`返回**错误** 响应码并终止响应  
- `return redirect(url_for('first.a',xxx = "事实上"))` 函数带参反向解析

可以使用装饰器直接拦截错误响应,最常用的是5xx和4xx的   
```py
@first.route("/request/<string:paramas>")
def show_request(paramas):
    a=request
    print(request.host)
    abort(401)
    return Response()

@first.errorhandler(401)
def handle_401(error):
    print(error,type(error))
    return "what,you're wrong"
```  
blueprint的处理机制和原生的flask不大一样,原生也有要用原生地去查  

### 会话
session cookie 持久化  
需要一个加密Key，在settings.py->Config类中添加`SECRET_KEY="mykey"`用作混淆
```py
@second.route("/login/",methods=["GET","POST"])
def login_action():
    if request.method=="GET":
        return render_template("loginpage.html")
    elif request.method=="POST":
        username=request.form.get("username")
        response=Response("登陆成功%s" %username)
        response.set_cookie("username",username)#使用cookie
        session["username"]=username#使用session
        return response

@second.route("/my/")
def home():
    username=request.cookies.get("username")#获取cookie
    username=session.get("username")#获取session
    return "biss %s"%username
```  
  
  对数据进行序列化，进行了base64，进行了zlib压缩，传递了hash
  
:::tip
需要注意的是flask存储session的做法不同于django，django是直接存储到服务器端，cookie存储一个sessionid，按照这个id获取session。flask直接把session存储在cookie放在了客户端
:::  

<h3>session持久化到数据库</h3>

`pip install flask-session`,官网<a href='https://pythonhosted.org/Flask-Session/'>链接</a>  
`SESSION_TYPE = 'redis'`加入到settings.py->Config类中,ext.py`from flask_session import Session`初始化`Session(app)`  
这个插件支持 redis memcached filesystem mongodb sqlalchmey。  
在settings->Config类中配置
公共前缀
```py
SESSION_PERMANENT = True # 如果设置为True，则关闭浏览器session就失效。
SESSION_USE_SIGNER = False # 是否对发送到浏览器上session的cookie值进行加密
SESSION_KEY_PREFIX = 'session:' # 保存到session中的值的前缀
```

<h3>redis </h3>
<details>

  <summary><B><I style="cursor:pointer; color: #0e5870">Click to See More </I></B></summary>

```py
SESSION_TYPE = 'redis'  # session类型为redis
SESSION_REDIS = redis.Redis(host='127.0.0.1', port='6379', password='123123')  
# 用于连接redis的配置
```

</details>
<h3>memcached </h3>

<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">Click to See More </I></B></summary>

```py
SESSION_TYPE = 'memcached' # session类型为memcached
SESSION_MEMCACHED = memcache.Client(['10.211.55.4:12000'])
```
</details>
<h3>filesystem </h3>

<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">Click to See More </I></B></summary>

```py
SESSION_TYPE = 'filesystem'  # session类型为redis
SESSION_FILE_DIR = '/session/dir'  # 存储session文件夹
SESSION_FILE_THRESHOLD = 500  # 存储session的个数如果大于这个值时，就要开始进行删除了
SESSION_FILE_MODE = 384  # 文件权限类型
```

</details>
<h3>mongodb </h3>

<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">Click to See More </I></B></summary>

```py
SESSION_TYPE = 'mongodb'  # session类型为redis
SESSION_MONGODB = pymongo.MongoClient()
SESSION_MONGODB_DB = 'mongo的db名称（数据库名称）'
SESSION_MONGODB_COLLECT = 'mongo的collect名称（表名称）'
```

</details>
<h3>sqlalchmey</h3>

<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">Click to See More </I></B></summary>

```py
SESSION_TYPE = 'sqlalchemy'  # session类型为sqlalchemy
SESSION_SQLALCHEMY = models # SQLAlchemy对象,记得前面要注册models=SQLAlchemy()
SESSION_SQLALCHEMY_TABLE = 'session' # session要保存的表名称
```

</details>



## jinja2模板
官网<a href="http://docs.jinkan.org/docs/jinja2/">在这</a>,记不住了去瞅瞅  
使用:render_template('template1.html',key=value)  

- 获取变量值: 
```py
    <h1>整数:{{ number }}</h1>
    <h1>元祖:{{ tuple[0] }}</h1>
    <h1>列表:{{ list[0] }}</h1>
    <h1>字典:{{ dict['key'] }}</h1>
```
- 分支语句if
```py
{ % if a==b % }
    语句1
 { % else % }    
    语句2
{ % endif % }
```
- for循环
```py
{% for i  in value %}
    语句
{% endfor%}
```
留坑loop的使用

- 注释
```
{# 注释内容 #}
```
- block,extends  
    父模板挖坑子模板填.   

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;/>
    <title>{{ tittle }}</title>
</head>
<body>

{% block header %}
{% endblock %}
this is base content
{% block content %}
{% endblock %}

{% block footer %}
{% endblock %}
</body>
</html>
```

继承之后


```html
{% extends "base.html" %}
{% block header %}
<hr size=5>
{% endblock %}
{% block content %}
    <ul>
    {% for i in students %}
        <li>i am students {{ i }}</li>
    {% endfor %}
    </ul>
{% endblock %}
{% block footer %}
<hr size=5>
{% endblock %}
```
如果有又继承了子模板之后,重写的块内容会被覆盖,在块头加入 `{ { super() } }` 就可以,没重写的block会显示
  
- include,marco  
  
宏定义留坑

### flask-bootstrap
注册拓展之后直接就可以用bootstrap了,无需引入css之类的,<a href="https://pythonhosted.org/Flask-Bootstrap/">官网</a>例子  
结构留坑
## Model
删除表
添加表
清除表
字段类型
Integer
Smallinteger
BigInteger
Float
Numeric
String
Text
Unicode
Unicode Text
Boolean
Date
Time
DateTime
Interval
LargeBinary
引用方式在
常用约束
primary key
autoincrement
unique
index
oullable
default
Foreignkey()

db.create.all（）
db.drop all（）
数据操作
在事务中处理，数据插入
db.session.add(object)
db.session.add_all(list[object])
d业.session.delete(object)
db.session.commit()
修改和删除基于查询
User.query.all()拿到所有的对象
User.query.get(id)只支持主键
User.query.first()拿到第一条记录
User.query.filter()查询条件

blueprint("blue",__name__,template_folder="xxx",urlprefi="/db")url前缀

`pip install flask-debugtoolbar` 在ext中引入,DebugToolbarExtension(app)  
config中的变量都可以在Config中配置,每一项具体作用自己百度  

静态资源也是有路由的
endpoint是static 
参数有一个filename
```
{{url_for('static,filename=xxx)}}
```


## 参考引用
- https://www.cnblogs.com/52forjie/p/8282453.html
- 千峰flask视频
<Valine></Valine>
