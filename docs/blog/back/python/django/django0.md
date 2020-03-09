---
title: Django的目录和配置[0]
date: 2020-3-7 10:38:45
categories: backEnd
prev: false
next: django1.md
tags:
- 后端
- web
- Django
- python🐍
- 所有文章
---


这是Django的第一部分,配置基本的环境并建立一个实验性的app  

这节代码比较少

<!-- more -->

::: tip 目标
完整的把自己的django的笔记记下来,提醒自己  
第一个阶段先建立一个vue+django+xadmin+DRF的用户中心  
完善的邮箱登录注册jwt验证刷新sql+redis  
这个用户中心可以拓任意的业务,干啥都行.为什么选django因为它容易搭建,不用自己动手的地方很多,懒人福利,自己用要求不那么高或者快速上线一个东西的地方可以用.
:::

## conda和IDE
conda记得设置代理,所有的中国源都不能用了,pip和conda的代理不是同一个  
创建`conda create -n django_env python=3.7`  
激活`source activate django_env`
### conda需要的包
不带版本号的直接安就行
```
django               2.2(最新的3不兼容xadmin)
django-cors-headers  
django-crispy-forms  
django-filter        
django-formtools     
django-import-export 
django-redis         
django-reversion     
djangorestframework
future               
httplib2             
Jinja2               
Markdown             
PyMySQL              
pytz                 
redis                
six                  
xlrd                 
Xlsxwriter           
xlwt                 
mysqlclient(windows 拓展站下载轮子)linux直接安
xadmin(最好直接把源码包放目录下,去github安直接pip版本不对)
```
<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">xadmin包和懒人命令</I></B></summary>

这是环境必须要求的

```shell
pip install django==2.2 django-cors-headers django-crispy-forms django-filter django-formtools django-import-export django-redis django-reversion djangorestframework future httplib2 Jinja2 Markdown PyMySQL pytz redis six xlrd Xlsxwriter xlwt
```

这是可选的

```py
pip install pymongo mongoengine requests elasticsearch drf-haystack 
```
<br/>

可以查查haystack是怎么用的<br>
**安装xadmin**
```shell
pip install https://codeload.github.com/sshwsfc/xadmin/zip/django2
```  
<br/>
但是直接安装不能自己修改里面的css图标和插件,当然你也可以找到site-packages修改,但是比较麻烦
</details>


### IDE配置
- project interpreter设置使用刚刚创建的环境
- Languages&Frameworks->Template Languages->jinja2
- Run/Edit configuration配置好环境
- 在项目目录下创建目录`apps`,`extra_apps`,`templates`,`static`
## 修改setting
### 更改目录
将apps,extra_apps目录加入系统搜寻路径,并在pycahrm中设置为sources root
```py
#在这段下面加
import os
import sys # 引入sys
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,BASE_DIR) # 加入路径
sys.path.insert(0,os.path.join(BASE_DIR,"apps")) # 加入路径
sys.path.insert(0,os.path.join(BASE_DIR,"extra_apps")) # 加入路径
......
```
### INSTALLED_APPS加入
```py
...
INSTALLED_APPS = [
    ...
    "crispy_forms",
    "xadmin",
    "corsheaders",
    'reversion',
    'rest_framework',
]
...
```
### MIDDLEWARE修改添加跨域插件
```py
MIDDLEWARE = [
      ......
    'corsheaders.middleware.CorsMiddleware',# 加入这个
    'django.middleware.common.CommonMiddleware',# 一定要在这个得前面
      ......
]
```
### 修改TEMPLATES,使用jinja2
```py

CONTEXT_PROCESSORS = [ # 这个是原来自带的,拿出来
    'django.template.context_processors.debug',
    'django.template.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'django.contrib.messages.context_processors.messages',
]
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {'context_processors': CONTEXT_PROCESSORS, },# 提上去了,没变
    },
    { # 新增的Jinja2模板,配置差不多
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [os.path.join(BASE_DIR, 'templates'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': CONTEXT_PROCESSORS,
            'environment': '文件位置.jinja2.environment' # 文件在下面xadmin那里创建
        },
    },
]
```
DB你愿意用什么就用什么,这里提供mysql的方法
```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "***",
        "USER":"root",
        "PASSWORD":"****",
        "HOST":"127.0.0.1",
        "PORT":"3306"
    }
}
```

::: warning
DB添加`OPTIONS`解决Incorrect string value: '\\xF0\\x9F\\x98\\x81'
:::

### 修改static和media路径

### 修改时区添加跨域配置
先修改这三个
```py
LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

...

USE_TZ = False
```
在这最后面添加
```py
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True


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
    'Pragma',
    'x-token',
    'X-Token',# veu 请求的header允许跨域

)
```

## 使用Xadmin

### 引入
1. 先修改url,在`urls`文件中把`admin.site.urls`改为`xadmin`
2. 替换css和图标
   - 去这个网站下载图标4.7版本（xadmin暂时不支持5以上,一定要下载4.7），解压css和font覆盖文件
   - 目录在`.\extra_apps\xadmin\static\xadmin\vendor\font-awesome`下
   - 使用的时候去这个网站找到对应版本的icon，想要哪个直接复制css给model_icon
3. 修正使用jinja2的时候Xadmin报错
   - 首先在`settings.py`同目录下创建两个文件`backends.py`和`jinja2.py`内容如下
   - `'environment': '文件位置.jinja2.environment' # 文件在下面xadmin那里创建`文件位置修改为`jinja2.py`所在的位置


backends.py

```py
import sys

from django.template.backends import jinja2 as jinja2backend
from django.template.backends.utils import csrf_input_lazy, csrf_token_lazy
from django.template import TemplateDoesNotExist, TemplateSyntaxError
from django.utils.module_loading import import_string
import jinja2
import six


class Jinja2Backend(jinja2backend.Jinja2):
    def __init__(self, params):
        self.context_processors = [
            import_string(p)
            for p in params['OPTIONS'].pop('context_processors', [])
        ]
        super(Jinja2Backend, self).__init__(params)

    def from_string(self, template_code):
        return Template(
            self.env.from_string(template_code), self.context_processors)

    def get_template(self, template_name):
        try:
            return Template(
                self.env.get_template(template_name), self.context_processors)
        except jinja2.TemplateNotFound as exc:
            six.reraise(TemplateDoesNotExist, TemplateDoesNotExist(exc.args),
                        sys.exc_info()[2])
        except jinja2.TemplateSyntaxError as exc:
            six.reraise(TemplateSyntaxError, TemplateSyntaxError(exc.args),
                        sys.exc_info()[2])


class Template(jinja2backend.Template):

    def __init__(self, template, context_processors):
        self.template = template
        self.context_processors = context_processors

    def render(self, context=None, request=None):
        if context is None:
            context = {}
        if request is not None:
            context['request'] = request
            lazy_csrf_input = csrf_input_lazy(request)
            context['csrf'] = lambda: lazy_csrf_input
            context['csrf_input'] = lazy_csrf_input
            context['csrf_token'] = csrf_token_lazy(request)
            for cp in self.context_processors:
                context.update(cp(request))
            # print(context)
        return self.template.render(context)
```

jinja2.py

```py
# myapp/jinja2.py
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse

from jinja2 import Environment


def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse,
    })
    return env

```

在尝试进入admin就不会报错了


<Valine></Valine>