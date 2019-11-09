---
title: Django的基础知识
date: 2019-1-1 20:38:45
categories: backEnd
prev: ./flask.md
next: false
tags:
- 后端
- web
- Django
- python
- 所有文章
---


:::tip   Django的结构<br/>
ORM的基本用法<br/>
xdamin配置<br/>
....
:::


<!-- more -->
# Django的基本用法

## 配置环境和IDE

### 创建env

*我喜欢用Anaconda*<br/>
conda create -n xxxx python=3.6+/2.7<br/>
创建了一个conda的自带环境 <br/>
可以在Anconda中查看里面有啥<br/>
conda list查看所有的包<br/>
conda install xx 安装一个包<br/>
conda uninstall xx 卸载一个包<br/>
conda 存放在Anaconda/envs下<br/>
Linux:  source (de)activate name(虚拟环境名称)<br/>
Windows: (de)activate name(虚拟环境名称)<br/>
Anaconda真的很良心不用自己解决包冲突该有的都有还能兼容pip一块用【爽到<br/>


### 环境搭建&创建工程

*这里默认你已经配置好python环境了*<br/>
- 把django/bin/加入环境变量<br/>
- cmd 中输入进入到想要工程文件夹(最好是空的),*django-admin startproject name*<br/>
- 该目录下会多一个文件夹即是我们的工程.此时可以用pycharm打开配置一下django的configuration<br/>(最好单独创建一个conda env)<br/>
![选择配置好的conda环境](https://upload-images.jianshu.io/upload_images/12620393-c7c9a11932192b4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![配置configuration](https://upload-images.jianshu.io/upload_images/12620393-f71e96ee5210278b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 接下来就可以愉快的撸代码啦<br/>

## Django基本结构介绍

### 特性
django灵活性比pyrimid稍微差一点,但是确实十分快速的一个框架,编写十分的快,虽然不如Flask小巧但是能承担很大的负载![django的基本过程](https://upload-images.jianshu.io/upload_images/12620393-383636fee043c224.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
也是一个MVC但是简化了model的操作,直接用django的engine代替了sql语句,更好写,自带了admin以及升级之后炫酷的的xadmin。<br/>
![在这里可以直接打开manage.py控制台](https://upload-images.jianshu.io/upload_images/12620393-5c4ab58f87086c11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)

### 常用的命令

```python
#记不住也先看一遍,会一直用
django-admin startproject xxx#前面提到的开始一个django的项目cmd进入目录之后
python manage.py startapp xxx#创建一个xxx的app
python manage.py makemigrations#创建更改的makemigrations文件
python manage.py migrate#应用你的更改到数据库
python manage.py runserver 0.0.0.0:8000#在8000端口运行你的程序
python manage.py shell#django命令行
python manage.py flush#清空表
python manage.py createsuperuser#创建管理员账户可以直接登陆后台，填入用户名密码邮箱可以空
python manage.py dbshell#数据库命令行
python manage.py changepassword username#换密码
```
:::tip 注意
在manage.py Tools下前面的python manage.py 不用加
:::
### 新建一个工程

1. 安装拓展包：<br/>
 DjangoUeditor(源码安装)<br/>
    xdamin(git源码安装)<br/>
    django-cors-headers(解决跨域)<br/>
  djangorestframework(RESTful框架)<br/>
  mysql-client(windows 拓展站下载轮子)<br/>
 django-filter
  markdown
2. 建立目录<br/>
![目录](https://upload-images.jianshu.io/upload_images/12620393-390886d8368630df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)
3. 修改setting文件
```python 
sys.path.insert(0,BASE_DIR)
sys.path.inster(0,os.path.join(BASE_DIR,"apps"))
sys.path.inster(0,os.path.join(BASE_DIR,"extra_apps"))
#BASE_DIR下面增加这三条将BASE_DIR apps extra_apps添加进搜索路径去
```
```python
INSTALLED_APPS = [
    .......
    "crispy_forms"
    "xadmin",
    "corsheaders"
]
#注册插件
```
```python
MIDDLEWARE = [
    ......
    'corsheaders.middleware.CorsMiddleware',
    ......
]
#要放在django.middleware.common.CommonMiddleware之前,
```
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "blog",
        "USER":"root",
        "PASSWORD":"1118",
        "HOST":"127.0.0.1",
        "PORT":"3306"
    }
}
#修改默认数据库为Mysql
```
```python
LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'
...
USE_TZ = False
#修改时区

#下面是cors跨域配置
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    '*'
)

CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW',
)

CORS_ALLOW_HEADERS = (
    'XMLHttpRequest',
    'X_FILENAME',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)
```
:::warning 这里有坑
*！数据库使用utf8_unicode 排序集使用utf8_general_ci<br/>
django也是默认unicode,content_type='application/json[json类型才加,必需加]charset=utf-8'才可以返回中文*<br/>
*！AUTH_USER_MODEL = "app(AbstractUser使用者).UserProfile"继承AbstractUser时重复名字错误需要在setting中设置*<br/>
*！出现migrateerror把数据库全删除，重新migrate一遍*<br/>
*!开头标明#-*-coding:utf-8-*-,所有中文字符串前要有u<br/>
:::
## Django的M V C！

### 模型-M
:::tip 字段类型
CharField<br/>
(max_length=n,default="默认值",primary_key=True/False,blank=True/False,<br/>
null=True/False,verbosename=u"管理界面中显示",unique=True/False)<br/>
<br/>
EmailField(verbose_name=u"管理界面显示")<br/>
<br/>
ImageField(upload_to="一个媒体文件夹",default="默认头像",max_length=100)<br/>
max_lengt=时路径最大长度)<br/>
<br/>
:::
::: warning class Meta:<br/>

&nbsp;&nbsp;&nbsp;verbose_name="管理界面显示类的管理名称"<br/>
&nbsp;&nbsp;&nbsp;verbose_name_plural=verbose_name<br/>
&nbsp;&nbsp;&nbsp;db_table="自定义表名"<br/>
&nbsp;&nbsp;&nbsp;ordering="选取一个字段用来排序可用+/-"<br/>
&nbsp;&nbsp;&nbsp;def__str__(self):<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self.管理中显示的字段<br/>
:::
![图片.png](https://upload-images.jianshu.io/upload_images/12620393-94b0591c3953054e.png?imageMogr2/auto-orient/strip%7CimageView2/1/w/240)
<br/>
::: tip 查询模型:
查询方法
model.objects.filter()#过滤器<br/>
model.object.all()[0:x]#从0-x的切片,不支持负索引<br/>
model.objects.all().exists() #判断tb中是否为空<br/>
model.objects.all().count() #查询tb中的对象数量<br/>
model.objects.all().order_by('-name') #对tb中的对象按照name倒序查询<br/>
model.objects.all().reverse() #倒序取值,但需要已经在model中进行了排序,否则无意义。<br/>
:::
::: warning 过滤条件
条件选取querySet的时候，filter表示=，exclude表示!=。<br/>
querySet.distinct() 去重复<br/>
__exact 精确等于 like 'aaa'<br/>
__iexact 精确等于 忽略大小写 ilike 'aaa'<br/>
__contains 包含 like '%aaa%'<br/>
__icontains 包含 忽略大小写 ilike '%aaa%'，对sqlite,contains的效果等于icontains<br/>
__gt 大于<br/>
__gte 大于等于<br/>
__lt 小于<br/>
__lte 小于等于<br/>
__in 存在于一个list范围内<br/>
__startswith 以...开头<br/>
__istartswith 以...开头 忽略大小写<br/>
__endswith 以...结尾<br/>
__iendswith 以...结尾，忽略大小写<br/>
__range 在...范围内<br/>
__year 日期字段的年份<br/>
__month 日期字段的月份<br/>
__day 日期字段的日<br/>
__isnull=True/False<br/>
__regex="^ $"正则<br/>
:::

::: tip 高级查询<br/>
from django.db.models import Q可以进行多连接查询筛选查询子句等<br/>
Q(OS_mark='wd') | Q(OS_mark='wa')可以和关键字混用但*Q必须在前面*<br/>
:::
::: danger 取回结果和操作<br/>
model.values()#返回字典组成的列表<br/>
model.values_list()#元组组成的列表没有键<br/>
model.values_list('name','ip')#只返回想要字段组成的元组的列表<br/>
item=model.objects.get(name='name')#查询出为name的结果一般返回单个<br/>
item.key=value#变更<br/>
item.save()#保存到数据库<br/>
item.delete()#删除记录<br/>
vm.objects.create(name='name',key='value')#创建新对象，调用save直接保存到数据库<br/>
vm.get_or_create(k="v")#返回一个二元组，若查询到了返回(结果,True)or(None,False)<br/>
:::
#### QuerySet<br/>
查询出来的结果是一个QuerySet,是一个结果元组组成的列表<br/>
order_by("key")按照key进行排序，再进行reverse<br/>
可以切片不支持负索引，可调用reverse()将顺序倒过来<br/>
同一model和不同model都可以取并集


:::danger 小心
记得做缓存查询，避免重复
:::
### 视图&url-V
#### URL:
:::tip 引入
from django.urls import include,path
:::
include把app的urls包含进来<br/>
类视图在引入的时候，直接传入类的.as_view()方法<br/>
#### view:
view中处理Httprequest有函数视图和类视图<br/>
*函数视图*<br/>
```python
def root_page(request):
    return HttpResponse("Hello world")
```
在url中引入
```python
from .views import root_page
#your class here

urlpatterns=[
    path(r"",root_page),
]
```
*类视图*<br/>
类视图更加灵活,<br/>可以继承复用
```python
from django.views.generic import View

class view_class(Viwe,):#注意此处是个元组
        def get(self,request,kw):#注意关键词的传入
                return HttpResponse ("hello world")
        def post(self,request):#post一般不需要kw,要对表单进行验证,用model中的form
                ...
                return  ...
#首先要在urls中引入
urlpatterns=[
    path(r"/view_calss",view_calss.as_view(),name="名字,在Django的templates中使用"),
]
```


### 路由&中间件-C
配置自定义500 404
关闭DEBUG模式无法访问static文件需要自己配置STATIC_ROOT
在全局url中handler404="users."

:::danger 留坑
留坑，modelfrom验证器，跟着DRF过一遍
Template
:::


## admin转Xadmin
### admin
在每个app下的admin中需要管理的类要引入并注册
```python
from .models import UserProfile,Banner,EmailVerifyCode#引入类
# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):#定义管理类
    pass
admin.site.register(UserProfile,UserProfileAdmin)#注册管理类
```
### Xadmin
把git xadmin下的包xadmin放到extra_apps下<br/>

![xadmin](https://upload-images.jianshu.io/upload_images/12620393-722177e46ddaaba9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)<br/>xadmin需要"crispy_forms"注册进app中<br/>
使用xadmin的时候把原先的admin的操作注释，不再需要<br/>

>url中引入xadmin<br/>

![配置url](https://upload-images.jianshu.io/upload_images/12620393-f95dca91cbda0bec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/440)<br/>
接下来访问admin就可以了<br/>
![注册完毕的](https://upload-images.jianshu.io/upload_images/12620393-a0b771270230b85b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)<br/>
:::warning 注意
外键字段要写成"foreign__keyword"会对外键的字段进行搜索<br/>
:::
#### 自定义界面和显示
修改adminx文件
```python
from xadmin import views

#global seeting class
class BaseSetting(object):
    enable_themes=True
    #启用主题
    use_bootswatch=True
    #boots主题视图
#注册管理视图
xadmin.site.register(views.BaseAdminView,BaseSetting)
class GlobalSettings(object):
    site_title="年轻人的管理系统"
    #左上角的标志
    site_footer="我的论坛"
    #页脚显示
    menu_style="accordion"
    #折叠apps类
    model_icon = "fa fa-clone"
    #显示什么图标
    ordering=["index"]
    #按照index从小到大排序
    readonly_fields=["add_time",]
    #设置只读不可修改字段
    exclude=["add_time"]
    #不显示某些字段
#注册管理视图
xadmin.site.register(views.CommAdminView,GlobalSettings)
```
在app下的apps里添加命名verbose_name=u"自己定义的名称"<br/>
在__init__.py里添加 default_app_config="users.apps.UserConfig"#app名称.apps.名称的Config<br/>
图标<a href='https://fontawesome.com/'>下载4.7版本</a>（xadmin暂时不支持5以上），解压css和font覆盖文件<br/>
目录在'.\extra_apps\xadmin\static\xadmin\vendor\font-awesome\'下<br/>
去这个网站找到对应版本的icon，想要哪个直接复制css给model_icon<br/>
![图片.png](https://upload-images.jianshu.io/upload_images/12620393-19db3a524cf6bdd7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)<br/>
这个类在做外键的时候设置relfield_style="fk-ajax"即可在其它表中作为ajax和联想查询不再使用默认下拉式<br/>

### 嵌套管理

定义类 
```python
class BannerInline(object):
model=Banner#想要被嵌套的model
extra=0
#在管理class中注册
inlines=[BannerInline]#列表式的，可以有多个inline
```
### 字段分组管理
在model中创建新的类继承想要被管理的类
![model](https://upload-images.jianshu.io/upload_images/12620393-75b7d5c4eb9e949e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/840)<br/>
在xadmin中引入创建admin类重载queryset方法,绑定新的管理类
![adminx](https://upload-images.jianshu.io/upload_images/12620393-c04de43dac670615.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)<br/>
再重载queryset方法，会使符合条件的留下
### 其他几个小功能
- 列表页直接编辑
list_editable=["字段名"]

- 将函数直接作为字段，句柄传入字段列表将函数的返回值显示
可以直接在adminx中定义
定义描述和排序 function(函数句柄).short_description="xxx"后台显示名称就是自己定义的

- 定时刷新
refresh_times=[3,2]
在配置了的Admin类中才会显示
会多出一个选项选择两秒或者三秒刷新一次

- 外链接作为字段
在model中定义(不知道为什么不能跳转不过链接倒是个真链接  ：\
```python
def outer_connect(self):
    from django.utils.safestring import mark_safe
    return mark_safe("<a href='http://www.baidu.com'>跳转</a>")
outer_connect.short_description="后台字段名称"
```
## 安装DjangoUeditor使用富文本
python3不能直接pip版本不兼容，去git把<a href='https://github.com/twz915/DjangoUeditor3/'>源码包</a>下载回家<br/>
解压之后命令行cd进目录激活虚拟环境，python setup.py install秒安完。<br/>
配置url：'ueditor/',include("DjangoUeditor.urls")'<br/>
使用from DjangoUeditor.models import UEditorField在model中引入<br/>
可以代替TextField不过需要额外配置参数我只列出常用的，它是继承自TextField的<br/>
:::tip UEditorField的属性
Content=UEditorField(verbose_name='内容',#别名<br/>
width=600, height=300,#编辑器宽高<br/>
 imagePath="图片/ueditor/", <br/>
filePath="文件路径/ueditor/", #路径如果不加前面的' / '默认media_root为相对路径<br/>
defalut="",#默认为空migrate才不会出错)<br/>
:::
:::danger 留坑
导入xlsx json csv 插件的开发+外键自增似懂非懂留坑先填其他的 404 500 页面
:::
<Valine></Valine>

