---
title: 深入python
date: 2017-12-28 23:39:45
categories: backEnd
tags:
- 语言进阶
- 异步
- python
- 后端
---

## python中一切皆对象
### 对象的产生
type->class->obj <br/>
object是最高的父类，本身继承None <br/>


```python
type(type(1))
```




    type




```python
type(object)
```




    type




```python
type.__base__
```




    object



python中的对象有基本的三个特征：
- id（身份）
- type（类型）
- value（值）


```python
a=[]
id(a)
```




    2296013674440




```python
type(a)
```




    list




```python
a
```




    []



### python中不同的类型<br/>
:::warning 1
None类型<br/>
:::
解释器刚开始运行就生成了一个None类型对象所有用到了None的地方指向的都是同一个全局的None

```python
a=None
b=None
print(id(a)==id(b))
c=[]
d=[]
print(id(c)==id(d))
```

    True
    False

::: warning 2
数值类型 四种<br/>
int float bool complex
:::
```python
print(
type(1),
type(0.2),
type(True),
type(complex(1))
)
```

    <class 'int'> <class 'float'> <class 'bool'> <class 'complex'>
:::warning  3
迭代类型
:::
可用for迭代的对象
实现了iter方法或者getitem方法的对象

:::warning 4
序列类型
:::
list<br/>tuple<br/> arry <br/>str<br/> range<br/> bytes <br/>bytearry <br/> memoryview(二进制序列)    <br/>
#### 其他类型
:::tip
5 映射类型 k-v 字典，queryset等    <br/>
6 集合类型set frozenset ，set和映射类型底层实现一致效率较高    <br/>
7 上下文管理类型 with 语句所形成的类型    8 模块类型（package也是一种类型）    <br/>
9 class和实例类型    <br/>
10 函数类型    <br/>
11 方法类型    <br/>
12 代码类型（代码本身也会被解释为一种类型！！！）   <br/>
13 object对象    <br/>
14 type类型  <br/>
15 ellipsis类型省略号类型？！    <br/>
16 notimplemented类型就是类对象<br/>
:::

## 魔法函数
以双下划线开头结尾，具有特殊功能的函数 一般不要去自己定义，重载python提供给我们的即可<br/>

python的数据模型是python底层实现机制重要的一环我们可以通过重载这些魔法函数来实现自己想要的功能<br/>

先列出主要的魔法函数<br/>
### 非数学运算类<br/>
    字符串表示：
        __repr__():

        __str__():

	集合序列相关：
		__len__():
		__getitem__():
		__setitem__():
		__delitem__():
		__contains__():
	迭代相关:
		__iter__():
		__next__():
	可调用
		__call__():
	with上下文管理器
		__enter__():
		__exit__():
	数值转换
		__abs__():
		__bool__():
		__int__():
		__float__():
        __hash__():
        __index__():
	元类相关
        __new__():
        __init__():
	属性相关
		__getattr__():
		__setattr__():
		__getattribute__():
		__setattribute__():
		__dir__():
	属性描述符
		__get__():
		__set__():
		__delete__():
	协程
		__await__():
        __aiter__():
        __anext__():
        __aenter__():
        __aexit__():

### 数学运算类
#### 略

### str 和 repr


```python
class company(object):
    def __init__(self,em):
        self.em=em

    def __str__(self):
        return "employee:" +",".join(em)

    def __repr__(self):
        return "开发者模式下不用打印就可以调用"

    def __len__(self):
        return len(self.em)
em=["bobby","tom","bob","jhon"]
com=company(em)
print(com)
print("len的用法: ",len(com))
com
```

    employee:bobby,tom,bob,jhon
    len的用法:  4

    开发者模式下不用打印就可以调用


#### _ _str_ _(self):
在直接打印这个对象时就会调用该方法，若没有定义则会打印一些基本属性
#### _ _repr_ _(self):
在开发者模式中直接调用这个对象则会调用repr方法<br/>python内置的数据类型是用Cpython实现的，内置方法是C语言实现的效率会很高<br/>
例如_ _len_ _方法是在数据结构内维护一个长度，调用len的时候直接从内存读取会快很多<br/>
for 对一个对象进行遍历的时候会先寻找iter方法，找不到会自动寻找getitem方法<br/>

## 鸭子类型和python的多态性 <br/>
### 什么是鸭子
走路像鸭子叫声像鸭子长得像鸭子 那么就是鸭子。<br/>
只要对象拥有这个特性那就是这个类型就可以调用相关的方法


```python
class Cat(object):
    def say(self):
        print("hahaha...")



class Dog(object):
    def say(self):
        print("15551")

l=[]
l.append(Dog())
l.append(Cat())

for i in l:
    i.say()
```

    15551
    hahaha...


不同类型的对象只要拥有相同名字的方法就可以调用,传入对象的句柄(名字)即可


```python
li=[1,2]
se=(3,4)

li.extend(se)
li
```




    [1, 2, 3, 4]



只要是相同的基础数据类型（迭代类型，序列类型）方法可以混用<br/>
_ _getitem_ _：根据传入的int参数，返回一个列表中的元素

_ _iter_ _：返回一个可迭代对象

_ _next_ _：当被迭代时，返回下一个迭代的对象


```python
class Test():
    def __init__(self):
        self.n=[1,2,3,4]

    def __getitem__(self,i):
        return "it is string"[i]

    def __iter__(self):
        for i in range(4):
            yield self.n[i]


test=Test()
for i in range(10):
    print(test[0:i])

for x in test:
    print(x)
#和下面是等价的，不过__iter__是返回一个可迭代对象，而iter()直接把这这个可迭代对象拿出来转换
test1=iter(test)
next(test1)
next(test1)
next(test1)
next(test1)
next(test1)

```


    i
    it
    it
    it i
    it is
    it is
    it is s
    it is st
    it is str
    1
    2
    3
    4



    ---------------------------------------------------------------------------

    StopIteration                             Traceback (most recent call last)

    <ipython-input-52-1fe123b9197d> in <module>()
         23 next(test1)
         24 next(test1)
    ---> 25 next(test1)


    StopIteration:

next(x)=x.__next__,关于迭代有两个概念
<br/>第一个是Iterable(可迭代对象)
<br/>第二个是Iterator（迭代器）<br/>
协议规定Iterable的__iter__方法会返回一个Iterator,<br/>
Iterator的__next__方法会返回下一个迭代对象，如果迭代结束则抛出StopIteration异常。<br/>iter(itr, 'c')  这个意思是说，返回itr的iterator，而且在之后的迭代之中，迭代出来'c'就立马停止。<br/>对这个itr有什么要求呢？这个itr在这里必须是callable的，即要<br/>实现__call__函数定义了__getitem__方法之后该对象就可以被下标和切片

### 抽象基类
<a href='https://blog.csdn.net/qijiqiguai/article/details/77269839'>一个博主的详细介绍</a>
 ABC，Abstract Base Class（抽象基类），主要定义了基本类和最基本的抽象方法，可以为子类定义共有的API，不需要具体实现。相当于是Java中的接口或者是抽象类。

```python
class company(object):
    def __init__(self,l):
        self.l=l

    def __len__(self):
        return 5

from collections import Sized
#对象是否有长度
isinstance(company(1),Sized)
#对象是否有某个属性，传入的是句柄
hasattr(company(1),"__len__")
```

    True



实现一个抽象基类最简单的方法就是在要做基类的类方法中抛出异常，使其必须重写这个方法


```python
class AbstractBase(object):
    def a():
        raise NotImplementError

    def b():
        raise NotImplementError

#更优雅一些的方法
import abc#自带的abc，可以做装饰器用
class A(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def my(self):
        pass
A()
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-59-dc359d224db9> in <module>()
         12     def my(self):
         13         pass
    ---> 14 A()


    TypeError: Can't instantiate abstract class A with abstract methods my

:::danger 其实有一点不太明白 留坑
abc中强制规定了abstractmethod，继承时若不实现这一方法就无法实例化<br/>
from collections.abc import *<br/>
已经做好的一些基类可以拿来继承<br/>
实现了__subclasshook__用于类型判断<br/>
:::
python的鸭子类型是根本,抽象基类可以给我们提供一些接口的强制规定和帮助我们自定义类型等等


```python
class A ():
    pass


class B(A):
    pass


b=B()
isinstance(b,A)
```




    True



:::danger  is 和 ==不能混用

is是判断是不是同一个对象通过id()的指向，而相等是判断值相等<br/>isinstance判断对象是否在继承链的类型中
:::
### 功能类MixIn和变量机制
功能类，以MixIn命名结尾多继承关系中作为功能类继承，设计实现单一功能，相当于代替接口<br/>
Mixin的特点<br/>
和基类是弱相关或不相关<br/>
Mixin功能单一<br/>
不要使用Mixin的super<br/>

#### 类变量和对象变量


```python
class A():
    aa=1
    def __init__(self,x,y):#self 实在实例化的时候传递进来的实例本身
        self.x=x
        self.y=y

a=A(2,3)
a.aa=100
print(a.aa,a.x,a.y)
print(A.aa)
```

    100 2 3
    1

再调用的时候，会首先查找实例变量再去查找类变量<br/>
在没有初始化a的时候存在一个A的类是一个类对象,实例化的时候成为一个类对象的实例<br/>
对类实例进行赋值，会影响后续类对象，对类对象进行赋值，则只会影响本类对象<br/>
python3中使用C3算法解决<a href='https://www.cnblogs.com/chenyoude/p/9857308.html'>菱形继承</a><br/>

```python
class Date():
    def __init__(self,y,m,d):
        self.year=y
        self.month=m
        self.day=d

    def __str__(self):
        return r"{0}/{1}/{2}".format(self.year,self.month,self.day)

    def tomorrow(self):
        self.day+=1


date=Date(2018,3,4)
print(date)
date.tomorrow()
print(date)
```

    2018/3/4
    2018/3/5
:::warning
调用date.tomorrow()相当于tomorrow（date）<br/>只会改变当前对象的属性，类属性应该写成Date.day+=1
:::
```python
class Date():
    def __init__(self,y,m,d):
        self.year=y
        self.month=m
        self.day=d

    def __str__(self):
        return r"{0}-{1}-{2}".format(self.year,self.month,self.day)

    def tomorrow(self):
        self.day+=1

    @staticmethod
    def vaild(string):
        temp=string.split("-")
        if temp[0]:
            print("valited")

    @classmethod
    def dformat(cls,string):
        temp=string.split("-")
        for i in range(3):
            temp[i]=int(temp[i])
        return cls(temp[0],temp[1],temp[2])


date=Date(2018,3,4)
string=str(date)
print(Date.dformat(string))
```

    2018-3-4


### 类方法和静态方法<br/>
静态方法一般是用来验证是否符合规范，不用再新建一个对象，而类方法可以直接返回实例对象


```python
class Date():
    birthday=1995
    def __init__(self,birthday):
        self.birthday=birthday


class User(Date):
    def __init__(self):
        self.age=2018-super().birthday

    def __repr__(self):
        return str(self.age)


user=User()
user
print(user.__dict__,User.__dict__)
```

    {'age': 23} {'__module__': '__main__', '__init__': <function User.__init__ at 0x0000025EDB51DE18>, '__repr__': <function User.__repr__ at 0x0000025EDB5606A8>, '__doc__': None}

### 自省机制
__attr不能直接访问，相当于private，但也可_class__attr来访问<br/>
__dict__可以直接下标访问是存贮属性的字典，也可以动态修改<br/>
dir会把所有的属性特有的和基础的完整的列出来<br/>
super函数是按照__mro__顺序来调用的，BFS，如果super有缺省可以直接让父类的构造函数来完成初始化<br/>
Mixin的特点<br/>
和基类是弱相关或不相关<br/>
Mixin功能单一<br/>
:::warning
不要使用Mixin的super<br/>
:::
:::danger Try的堆栈
python的try except和finally语句的return执行到error 时进入except 栈顶push 一个值，不返回，先运行finally语句再从栈顶拿出一个值pop
:::
## 基于协议的python
### 上下文管理协议
python是基于协议的运行,首先介绍上下文管理器的协议
也就是我们经常用的with

```python
class Sample(object):
    S="山口山"
    def hah(self):
        print("aa")

    def __enter__(self):
        print("start")

    def __exit__(self,exc_type,exc_val,exc_tb):
        print("end")

    @classmethod
    def get(cls):
        return cls()

def gett():
    return Sample()

a=Sample()
# a.__dict__
# dir(a)
with gett() as sample:
    print(type(sample))
    dir(sample)
    sample.hah()
    print(sample.S)
```

    start
    <class 'NoneType'>
    end



    ---------------------------------------------------------------------------

    AttributeError                            Traceback (most recent call last)

    <ipython-input-172-7d068effdd73> in <module>()
         23     print(type(sample))
         24     dir(sample)
    ---> 25     sample.hah()
         26     print(sample.S)


    AttributeError: 'NoneType' object has no attribute 'hah'


具体可控的上下文管理协议
```python
import contextlib

@contextlib.contextmanager
def p():
    print("前操作")
    yield {}
    print("后操作")

with p() as pp:
    print("中间的操作")
```

    前操作
    中间的操作
    后操作


### 序列相关协议

序列 <br/>容器序列 <br/>扁平序列 <br/>可变/不可变<br/>
在 collections abc中有两个抽象基类:<br/> Squence MutableSequence序列和多对象序列<br/>

Sequence序列类继承了<br/>{
&nbsp;&nbsp;&nbsp;&nbsp;Reversible可反转，<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Collection继承了{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sized长度<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Iterable可迭代<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Container容器{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;的absctactmethod __contains__负责is以以及__setitem__ __delitem__}}}}

#### 在序列中+ += extend的区别


```python
a=[1,2]
c=a+[3,4]
c+=[5,6]
c
```




    [1, 2, 3, 4, 5, 6]



:::tip
+=实际上时abc中的__iadd__调用的时extend ->执行for 循环一个个append到序列中<br/>所以可以接受一个序列即可，在原序列中直接加<br/>而+是产生一个新的序列
<br/>切片操作是会返回一个新的列表
:::
```python
class Group ():
    def __init__(self,groupname,companyname,member):
        self.group_name = groupname
        self.company = companyname
        self.member = member
    def __reversed__(self):
        pass#自行解决

    def __getitem__(self, item):
        cls=type(self)
        if isinstance (item,slice):
            return cls(group_name=self.group_name,companyname=self.company,member=self.member[item])
        elif isinstance(item,numbers.Integral):
            return cls(group_name=self.group_name,companyname=self.company,member=[self.member[item]])
        #切片slice对象和item是重点

    def __iter__(self):
        pass#自行解决

    def __contains__(self,item):
        if item in self.member:
            return True
        else:
            return False
        # 用if 来解决 in
```

#### 维护一个已排序的序列


```python
import bisect

#your class&function here


if __name__ == "__main__":
    l=[]
    bisect.insort(l,1)
    bisect.insort(l, 3)
    bisect.insort(l, 5)
    bisect.insort(l, 6)
    bisect.insort(l, 2)
    print(l)
    bisect.insort_left(l,5)
    bisect.insort_right(l,2.9)
    print(l)
```

    [1, 2, 3, 5, 6]
    [1, 2, 2.9, 3, 5, 5, 6]



arr留坑
```python
import arry
from collections import deque

```
:::tip
列表生成式性能是高于列表普通操作的，可以用函数来进行操作

:::
```python
    def x(y):
        print(y)
        return 2*y#返回值会被添加进列表中
    l=[x(i) for i in l if i %2==1]
    l1=(x(i) for i in l if i %2==1)
    print(type(l),type(l1))#生成器表达式
    print(l,l1)
    dic={"a":15,"b":56,"c":88}
    reverseddic={v:k for k,v in dic.items()}
    print(reverseddic)#键值对反转
```

### Mapping类型协议
#### dict
dict是一个典型Mapping类型，abc继承关系是<br/>
       -Container as Container,<br/>
       -Hashable as Hashable,<br/>
       -Iterable as Iterable,<br/>
        Iterator as Iterator,<br/>
       -Sized as Sized,<br/>
        Callable as Callable,<br/>
       -Mapping as Mapping,<br/>
        MutableMapping as MutableMapping,<br/>
        Sequence as Sequence,<br/>
        MutableSequence as MutableSequence,<br/>
        Set as Set,<br/>
        MutableSet as MutableSet,<br/>
        MappingView as MappingView,<br/>
        ItemsView as ItemsView,<br/>
        KeysView as KeysView,<br/>
        ValuesView as ValuesView,<br/>

:::warning copy
深拷贝改变拷贝对象不会改变原对象，只要拷贝的对象是非容器类型（比如字符串，数字和其他原子类型）就不能进行拷贝而是添加引用
:::
这是代码
```python
import copy
a={}
b=a
c=a.copy()#浅拷贝,复制了一个其他对象，但是不会把字典中的字典和列表进行修改
d=copy.deepcopy(a)#深拷贝，递归复制
b["c"]=5
c["d"]=6
print(a,b,c,d)
```

    {'c': 5} {'c': 5} {'c': 6} {}


yuan


#### dict用法补充
```python
a=["a","b","c"]
dic={}
dic.fromkeys(a,"沙雕牛肉")#传入一个 可迭代对象，默认值 生成字典
dic.get("想取的索引","取不到就返回的默认值")
dic.setdefault("索引","值")#先添加或更改一个键值对，然后取出
dic.update(Iterable)#将这个可迭代对象一般是键值对形式添加到字典中去，[(a,b),(c,d)] a=b,c=d {"a":"b","c":"d"}
```




    '默认值'


:::danger 原生结构
python原生的一些数据结构list dict等等直接继承在某些情况下不会生效<br/>
最好继承collections UserDict，list同理
:::
#### set的用法补充
set是一个无序不重复集合修改用add（）del（）pop（）等等，frozenset是不可变集合，无法修改但是可以作为dict的key


```python
s=set("def")#会把迭代对象分别作为元素
s.add("abc")#直接添加
s.update("abc")#会把迭代对象分别作为元素
d=set("defgh")
s.difference(d)#比较两个set的不同，取差集，是一个新的set，主要的操作 |并 &交 -差
```




    {'a', 'abc', 'b', 'c'}


:::tip 垃圾回收
python中的垃圾回收算法是引用计数，一个变量有n个引用，当引用计数变为 0 即回收垃圾，del函数可完成更高级的垃圾回收
参数绝对不能用可变对象（list）
注意环形引用问题
:::
### collections的用法
#### 关于queue dequeue Counter partial ChainMap namedtuple defaultdict Chain

```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/23 16:34"

#import your model here
import collections
from collections import namedtuple,defaultdict,deque,Counter,ChainMap
from functools import partial#包裹函数返回句柄
from itertools import chain#传入好几个可迭代一块迭代
from pprint import pprint#漂亮打印
from copy import deepcopy#深拷贝
#your class&function here


if __name__ == "__main__":
    tup=("a","b","c")#tuple是不可变对象，有序
    a,b,c=tup#可以直接拆包
    d,*other=tup#d是第一个元素，其他的不管了
    #c语言中tuple是struct而list却是arry，tuple在编译的时候就确定，性能强，可作为dic的key，不可变->可哈希
    print(a,b,c,d)
#namedtuple的用法
    dic={"age":23,"country":"china","height":165,"edu":"master"}
    User=namedtuple("User",["age","country","height","edu"])#会给你创建一个类，类名加属性列表
    user=User(age=23,country="china",height=165,edu="mm")#可以按属性名实例化，并且属性名不可变
    f=(23,"china",165)
    user2=User(*f,"muster")#和上面初始化是一样,并且额外传入了了master这个属性
    #从数据库里拿出来少了一列的话可以直接加上
    user3=User(**dic)#用字典实例化
    print(user3)
    print("age is :",user2.age)#省空间，内存和消耗小，参数就是用tuple完成的
    exec("print('hello')")#执行代码
#defualtdict的用法,c写的,还有setdefault
dic= {'runoob': '菜鸟', 'google': 'Google 搜索'}

print("Value : %s" % dic.setdefault('runoob', None))#调用setdefault的时候，找不到就返回这个default值
print("Value : %s" % dic.setdefault('Taobao', '淘宝'))

def de():
    return {"a":"booon"}
d=defaultdict(de)#传入一个可调用对象，如果字典没有找到你要的🗡，就给你新建一个键值为对象的返回值,可用函数包装一下
for i in ["apple","sansum","HP"]:#int默认为0,list默认空字典
    print(d[i])
#deque双端队列
x=[1,2,3,4,5]
q=deque(x,maxlen=20)#可迭代对象，最大长度
print(q)
q.clear()#清空
print(q)
q.append(6)#添加对象
q.appendleft([1,2])#向左端添加对象
print(q.count(6))#返回6出现的次数
q1=q.copy()#浅拷贝
q2=deepcopy(q)#深拷贝
q.extend(q1)#合并，直接在原来deque操作，不会返回新的
q.extendleft(q1)#从左边合并，直接在原来deque操作，不会返回新的
q.insert(3,"xxx")#在下标为3地方插入
q.reverse()#翻转
q.pop()#返回最后一个并删除
q.popleft()#返回最左边的一个并删除
q.index(6,0,5)#在0-5下标之间查找6
#Counter的使用
a="sadbsdvfbdjfbdksdv"
s=Counter(a)#传入一个可迭代对象字符串列表什么的，统计元素出现次数
s1=Counter(a)
s.update(s1)#把两个Counter加起来
pprint(s.most_common(2))#最多次数的俩，是列表
print(s)
for i in ChainMap(s,s1):
    pprint(i)#把俩字典合成Chainmap对象，但是不是加在一起了，迭代的时候前面出现的元素后面不会在打印

```
:::tip
接下来的代码会很多我在PyCharm里面写然后复制过来
:::
## 三神器
### 装饰器(留坑)
自定义get set方法
```python
@property
@被装饰的类.setter
@被装饰的类.getter
```
### 属性查找过程

```python
class A():
    def __init__(self,birth,day):
        self.birth=birth
        self.day=day

    def __getattr__(self,item):#找不到属性的时候会进入这个函数
        return "没发现"+item

    def __getattribute__(self,item):#只要查找属性就会进入这里
        return "发现了"+item

a=A(1,3)
a.name
```




    '发现了name'



使用属性描述符限制传值的类型，参考Django的form验证<br/>
如果user是某个类的实例，那么user.age 以及等价的getattr(user,age)<br/>

- 首先调用__getattribute__。如果类定义了 __getattr__方法，<br/>

- 那么在____getattribute__拋出AttributeError的时候就会调用到__getattr__，<br/>

而对于描述符(__get__)的调用，则是发生在__getattribute__内部的<br/>

user = User(),那么user.age 顺序如下：<br/>
1. E3果“”是出现在User或其基类的__diet__中，且age是data descriptor，<br/>
2. 如果“age”出现在obj的__diet__中，那么直接返回obj.__diet__[fage’],<br/>
3. 如果“age”出现在User或其基类的__dict__*<br/>
	- 如果age是non-data descriptor,那么调用其__get__方 法 ， 否 则<br/>
	- 返回 __dict__[fage’]<br/>
4. 如果User有__getattr__方法，调用__getattr__方法，否则<br/>
5. 抛出AttributeError<br/>

```python
class A ():
    def __new__(cls):#代表本类
        return super.__new__(cls)
    def __init__(self):#代表本对象

```


      File "<ipython-input-2-00e9d8750bd0>", line 5

        ^
    SyntaxError: unexpected EOF while parsing


:::tip new和init
new是用来自定义类产生过程的逻辑<br/>init是用来定义实例产生的过程的<br/>
如果new没有返回对象，则不会进入实例化阶段
:::
### 迭代器
#### 迭代器是实现的迭代协议
无法下标访问（getitem）不直接返回，惰性返回数据的方式<br/>iterable-> iter函数 和tierator->netx函数 <br/>
实际访问通过的是next
### 生成器
#### 只要是含有yield的就是生成器
提供了惰性求值<br/>
python—切皆对象，栈帧对象，字节码对象<br/>
当foo调用子函数bar，又士创建一个栈帧<br/>
所有的栈帧都是分配在堆内存上，这就决定了栈帧可以独立于调用者存在<br/>
静态语言是放到栈上运行完毕之后会销毁<br/>动态语言放在堆上，找到栈帧可以持续调用<br/>

![栈帧字节码](https://upload-images.jianshu.io/upload_images/12620393-3e2b72fd6678a24b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

:::tip
原生过程是将递归之后的字节码都压到栈帧里去，然后函数的指针指向最近一次运行的栈帧，运行之后就会执行下一个栈帧所以可以顺利的yield
:::



![栈帧](https://upload-images.jianshu.io/upload_images/12620393-401946d7f7695b32.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "10/12/2018 3:51 PM"

#import your model here
import dis
import numpy as np
from collections.abc import Mapping,MutableMapping
#your class&function here
def generat():
    yield 1
    s="我是s"
    yield 2
    m = "我是m"
    yield 3

def gen_fib(index):
    n,f0,f1=0,0,1
    while n<=index:
        f0,f1=f1,f1+f0
        yield f0
        n+=1

if __name__ == "__main__":
    ge=generat()
    print(dis.dis(ge))
    print(ge.gi_frame.f_lasti)#最后指向栈帧的指针
    print(ge.gi_frame.f_locals)#本地变量
    next(ge)
    print(ge.gi_frame.f_lasti)#最后指向栈帧的指针
    print(ge.gi_frame.f_locals)#本地变量
    next(ge)
    print(ge.gi_frame.f_lasti)#最后指向栈帧的指针
    print(ge.gi_frame.f_locals)#本地变量
    next(ge)
    print(ge.gi_frame.f_lasti)#最后指向栈帧的指针
    print(ge.gi_frame.f_locals)#本地变量
    next(ge)
    # for i in ge:
    #     print(i)
    # for i in gen_fib(50):
    #     print(i)
```

     12           0 LOAD_CONST               1 (1)
                  2 YIELD_VALUE
                  4 POP_TOP

     13           6 LOAD_CONST               2 ('我是s')
                  8 STORE_FAST               0 (s)

     14          10 LOAD_CONST               3 (2)
                 12 YIELD_VALUE
                 14 POP_TOP

     15          16 LOAD_CONST               4 ('我是m')
                 18 STORE_FAST               1 (m)

     16          20 LOAD_CONST               5 (3)
                 22 YIELD_VALUE
                 24 POP_TOP
                 26 LOAD_CONST               0 (None)
                 28 RETURN_VALUE
    None
    -1
    {}
    2
    {}
    12
    {'s': '我是s'}
    22
    {'s': '我是s', 'm': '我是m'}



    ---------------------------------------------------------------------------

    StopIteration                             Traceback (most recent call last)

    <ipython-input-9-c12afe8f7bdb> in <module>()
         37     print(ge.gi_frame.f_lasti)#最后指向栈帧的指针
         38     print(ge.gi_frame.f_locals)#本地变量
    ---> 39     next(ge)
         40     # for i in ge:
         41     #     print(i)


    StopIteration:



```python
#### 读取一行超大文件有分隔符
超大一行文件,不能直接read,readline也不行因为只有一行,内存会爆掉
:::tip
使用迭代器惰性返回,设置buffer代码如下
:::
```


```python

def myreadlines(f,newline):
    buf=""
    while True:
        while newline in buf :
            pos=buf.index(newline)
            yield buf[:pos]
            buf=buf[pos+len(newline):]
        chunk=f.read(4096)
        if not chunk:
            yield buf
            break
        buf+=chunk

if __name__ == "__main__":
    with open("./files/a.txt","r",encoding="utf-8") as f:
        for i in myreadlines(f,"|"):
            print(i)
```

    sdfghRSXCSYDVASYEDCRAVSBWDYGT
    exrsadcsvydbasfygv7aysdsaidbas9dunb
    shdvgyascvdtysacdysgbdyuasfvy
    dsfvgyasuvbdas87fydvasyfvi
    dvfysaded7ftv7sadybs
    sdyfb87dygvfds7ybnfufvwb8dfvbe6tvdb8uvfwy8duiygwdf
    sedfuwyiyfrte7y8urgevtfbyefb7vyd8unedyb8
    edyundimgrfey8unimdgrvyb8unwime



## WebSocket
### 基本的API
- <strong>sk.bind(address)</strong>

　　s.bind(address) 将套接字绑定到地址。address地址的格式取决于地址族。在AF_INET下，以元组（host,port）的形式表示地址。

- <strong>sk.listen(backlog)</strong>

　　开始监听传入连接。backlog指定在拒绝连接之前，可以挂起的最大连接数量。

      backlog等于5，表示内核已经接到了连接请求，但服务器还没有调用accept进行处理的连接个数最大为5
      这个值不能无限大，因为要在内核中维护连接队列

- <strong>sk.setblocking(bool)</strong>

　　是否阻塞（默认True），如果设置False，那么accept和recv时一旦无数据，则报错。

- <strong>sk.accept()</strong>

　　接受连接并返回（conn,address）,其中conn是新的套接字对象，可以用来接收和发送数据。address是连接客户端的地址。

　　接收TCP 客户的连接（阻塞式）等待连接的到来

- <strong>sk.connect(address)</strong>

　　连接到address处的套接字。一般，address的格式为元组（hostname,port）,如果连接出错，返回socket.error错误。

- <strong>sk.connect_ex(address)</strong>

　　同上，只不过会有返回值，连接成功时返回 0 ，连接失败时候返回编码，例如：10061

- <strong>sk.close()</strong>

　　关闭套接字

- <strong>sk.recv(bufsize[,flag])</strong>

　　接受套接字的数据。数据以字符串形式返回，bufsize指定最多可以接收的数量。flag提供有关消息的其他信息，通常可以忽略。

- <strong>sk.recvfrom(bufsize[.flag])</strong>

　　与recv()类似，但返回值是（data,address）。其中data是包含接收数据的字符串，address是发送数据的套接字地址。

- <strong>sk.send(string[,flag])</strong>

　　将string中的数据发送到连接的套接字。返回值是要发送的字节数量，该数量可能小于string的字节大小。即：可能未将指定内容全部发送。

- <strong>sk.sendall(string[,flag])</strong>

　　将string中的数据发送到连接的套接字，但在返回之前会尝试发送所有数据。成功返回None，失败则抛出异常。

      内部通过递归调用send，将所有内容发送出去。

- <strong>sk.sendto(string[,flag],address)</strong>

　　将数据发送到套接字，address是形式为（ipaddr，port）的元组，指定远程地址。返回值是发送的字节数。该函数主要用于UDP协议。

- <strong>sk.settimeout(timeout)</strong>

　　设置套接字操作的超时期，timeout是一个浮点数，单位是秒。值为None表示没有超时期。一般，超时期应该在刚创建套接字时设置，因为它们可能用于连接的操作（如 client 连接最多等待5s ）

- <strong>sk.getpeername()</strong>

　　返回连接套接字的远程地址。返回值通常是元组（ipaddr,port）。

- <strong>sk.getsockname()</strong>

　　返回套接字自己的地址。通常是一个元组(ipaddr,port)

- <strong>sk.fileno()</strong>

　　套接字的文件描述符
### TCP/UDP的使用代码
#### 服务器
```python
#__server__
import socket
#tcp
sk=socket.socket(socket.AF_INET,socket.SOCK_STREAM)#使用ipv4,TCP
sk.bind(("127.0.0.1",5333))#一个元组监听（ip,端口号）
sk.listen(5)#请求来了被挂起的最大数量，超过之后便不再接受请求
sock,addr=sk.accept()#先accep之后会产生sock和addr使用本sock对象进行操作
while True:#用一个while True来不断接受请求,若要处理多个请求请用多线程
    data=sock.recv(1024)#一次接受1024个Bytes
    recvmssage=data.decode("utf-8")#客户端怎么编码就得怎么解码
    print(recvmssage)
    temp="hello traveler"
    sock.send(temp.encode("utf-8"))#可以指定也可以不制定编码
    sock.close()#Tcp一定要关闭连接
#上述程序进行一次之后接收不到东西就会停止，需要client不断发送自行控制吧

#udp
sk = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)#使用ipv4,UDP
sk.bind(("127.0.0.1",5333))#需要绑定("ip",port)
data, addr = sk.recvfrom(1024)#接受到 数据,地址(地址要留着后面还要发回去)
print(data.decode("utf-8"))#打印
temp="the light will bring me vicetory"
sk.sendto(temp.encode(),addr)#发送到addr

```

#### 客户端
```python
#__client__
import socket
#tcp
sk=socket.socket(socket.AF_INET,socket.SOCK_STREAM)#使用ipv4 TCP
sk.connect(("127.0.0.1",5333))#TCP是需要连接的
temp="hello remote people"
sk.send(temp.encode())#发送同样需要编码
d=sk.recv(1024).decode("utf-8")#接收字节并解码
print(d)
sk.close()#需要关闭

#udp
sk = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)#用ipv4,UDP
addr = ('127.0.0.1',5333)#先确定自己的地址
data="ha? me?"
sk.sendto(data.encode(), addr)#发送到，记得编码
recvdata, addr=sk.recvfrom(1024)#接受，同样需要区大小，最好能给个buffer
print(recvdata.decode('utf-8'))#发送的时候要记得编码

```


### socketserver的使用
继承关系如图
![socketserver的继承](https://upload-images.jianshu.io/upload_images/12620393-ec7af0bec463f5d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


import socketserver<br/>
封装好了一些东西了拿来直接用<br/>
调用方式为<br/>
sock=socketserver.ThreadTCPServer(("ip",port),HandlerClass)<br/>
sock.server_forever如果知道应用程序只能操纵面向数据流的连接（如TCP），那么应从StreamRequestHandler继承，而不是BaseRequestHandler。StreamRequestHandler类设置了两个属性，<br/>
h.wfile是将数据写入客户端的类文件对象，h.rfile是从客户端读取数据的类文件对象。<br/>
如果要编写针对数据包操作的处理程序并将响应持续返回发送方，那么它应当从DatagramRequestHandler继承。<br/>
它提供的类接口与StramRequestHandler相同。<br/>
常用的handler属性<br/>
h.client_address#客户端地址<br/>
h.server#获取自己的server对象<br/>
h.request<br/>
对 TCP server，h.request 属性是连接到 client 的连接套接字对象；就是那个socket<br/>
对 UDP server，h.request 属性是一个二元组(data, sock)，data 是 client 端发送的数据（最大8192字节），sock是server端套接字。<br/>
　　使用这个属性可以获取在这个进/线程中与client套接字建立连接的连接套接字，从而可以使用这个套接字与client端通信。<br/>
　　 StreamRequestHandler 和 DatagramRequestHandler 则屏蔽了 self.request 对TCP和UDP连接的区别，二者都重定义了 setup() 和 finish() 方法，提供统一的 self.rfile 和 self.wfile 属性以便从客户端读取数据或向客户端发送数据。<br/>
代码如下
:::danger 留坑
这里没怎么实验
:::
```python
from socketserver import BaseRequestHandler

class MyHandl(BaseRequestHandler):
    def setup(self):
        print("begine")

    def handle(self):
        conn=self.request#拿到请求对象
        data=conn.recv(1024)#接收
        print(data.decode("utf-8"))
        temp="你好，你好~"
        conn.sendall(temp.encode("utf-8"))
        print(self.client_address)

    def finish(self):
        print("over")

```
- ThreadTCPServer<br/>
- ThreadUDPServer<br/>
- ThreadingUnixStreamServer<br/>
- ThreadingUnixDatagramServer<br/>
所有的Server都有下面的方法

| 类或者方法                |  作用                                                                             |
| ------------------------ |:--------------------------------------------------------------------------------: |
| sock.socket              | 用于传入请求的套接字对象                                                             |
| sock.server_address      | 监听服务器的地址.比如元组("127.0.0.1",80)                                            |
| sock.RequestHandlerClass | 传递给服务器构造函数并由用户提供的请求处理程序类                                        |
| sock.serve_forever()     | 处理无限的请求                                                                      |
| sock.shutdown()          | 停止serve_forever()循环                                                             |
| sock.fileno()            | 返回服务器套接字的整数文件描述符.该方法可以有效的通过轮询操作(如select()函数)使用服务器实例 |


## 多线程

python中的一个线程对应c中的一个线程<br/>因为GIL,在某一时刻只能有一个线程在一个cpu上执行字节码无法将多个线程映射到多个核上<br/>
GIL不是在本线程使用完之后才会释放<br/>根据执行的字节码和时间片和IO操作才释放，导致线程不安全<br/>
最开始语言使用的都是多进程，对系统资源消耗很大，后来开始使用线程，线程是依附于进程的，<br/>操作系统能调度的最小单位是线程IO为主的程序性能差别不大<br/>
具体请看<a href='www.baidu.com'>操作系统-线程和进程</a><br/>
### 使用线程函数和线程类
```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/19 8:48"

#import your model here
from threading import Thread
#your class&function here

class sayHello(Thread):#创建一个线程类
    def __init__(self,someone):#init传参数
        super().__init__()#调用父类的构造
        self.someone=someone#参数
        self.daemon = True#在这里设置守护线程
    def run(self):#重写run函数线程会执行这个函数
        print("Hello ",self.someone)



if __name__ == "__main__":
    def sayHi(someone):#定义一个线程要用的函数
        print("Hi ",someone)

    t = Thread(target=sayHi,args = ("janny",))#实例化一个县城
    t.start()#开始执行

    namelist=["天使","76","Bob","安娜","法鸡"]
    ThreadList=[]#定义一个线程列表

    for i in namelist:
        ThreadList.append(sayHello(i))#添加线程
    ThreadList[2].setDaemon(True)#设置为守护线程,其他线程结束的时候自动结束
    print(ThreadList[2].isAlive())#返回线程是否还活着
    ThreadList[2].setName("你好线程")#设置线程名。
    print(ThreadList[2].getName())#返回线程名。

    for t in ThreadList:
        t.start()#开始一个线程
```

    Hi False
     你好线程
    janny
    Hello  天使
    Hello  76
    Hello  Bob
    Hello  安娜
    Hello  法鸡


### 线程安全队列
LIFO队列 基本FIFO队列 优先级队列<br/>
这三种基础队列已经实现了线程安全


```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/19 11:36"

#import your model here
from queue import Queue,LifoQueue,PriorityQueue
from threading import Thread

import time
#your class&function here



if __name__ == "__main__":
    #先进先出FIFO 也就是基本的Queue
    q=Queue(maxsize=10)#定义最大容量,满了就会阻塞线程,不定义就默认无上限
    for i in range (10):
        q.put(i,timeout=5)#往里放一个东西,超时时间

    for i in range(10):
        print(q.get(timeout=5))#返回了一个取出的值，超时等待时间

    print("--------分割----------"    )

    #先进后出LIFO
    q=LifoQueue(maxsize=10)
    for i in range(5):
        q.put(i)

    #q.join()#会直接在这里卡住不动,等队列清空并且task_down发出才会执行
    # 可以配合empty full 判断是不是消费或者生产结束

    for i in range(10):
        print(q.get())

    print("--------分割----------"    )

    #优先级队存储一个元组,数字越小优先级越高
    from random import randint
    q=PriorityQueue(maxsize=10)#maxsize同上
    for p in zip([randint(0,10) for i in range(10)],[chr(randint(65,90))for i in range(10)]):
        #随机生成数字和字母的列表表达式
        q.put(p)
    print(q.qsize())#获取队列的长度
    print(q.empty())#队列是空的吗
    print(q.full())#队列是满的吗
    for i in range(10):
        print(q.get())
```

join()会暂时挂起队列和妄图注入队列的线程，直到队列清空<br/>每娶一个就要执行task_down()否则他不知道这个队列已经空了就会一直挂着。。。
就是用join的时候就一定要每次取完task_down一下

### 线程锁

锁要小心使用<br/>
假设得到a，b才能运行<br/>
线程A得到了b,B得到了A<br/>
AB都不能运行<br/>
:::danger
锁里在获得锁会死锁<br/>
注意锁只能被一个线程获得执行释放之后其他线程才会使用
:::
锁使用代码如下
```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/19 15:58"

#import your model here
from threading import Lock,RLock#引入锁
from threading import Thread
#your class&function here
a = 0
lock=Lock()
rLock=RLock()
def add1():
    global a
    global lock
    for i in range(1000000):
        lock.acquire()#获得锁
        a += 1
        lock.release()#释放锁

def sub1():
    global a
    global rLock
    for i in range(1000000):
        rLock.acquire()#在一个线程内可重复获得的锁
        rLock.acquire()#重复获得
        a -= 1
        rLock.release()#一定要有对应次数的释放
        rLock.release()

if __name__ == "__main__":
    t1=Thread(target=add1)
    t2=Thread(target=sub1)
    t1.start()
    t2.start()
    print(a)
    #如果去掉锁的话结果a会乱
```
:::warning 产生死锁的四个必要条件：


（1） 互斥条件：一个资源每次只能被一个进程使用。

（2） 请求与保持条件：一个进程因请求资源而阻塞时，对已获得的资源保持不放。

（3） 不剥夺条件:进程已获得的资源，在末使用完之前，不能强行剥夺。

（4） 循环等待条件:若干进程之间形成一种头尾相接的循环等待资源关系。
:::

### 条件变量


```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/19 16:29"

#import your model here
from threading import Thread,Condition

#your class&function here
class TianMao(Thread):
    def __init__(self,cond):
        super().__init__()
        self.cond = cond

    def run(self):
        self.cond.acquire()#获得

        print("天猫:1")
        self.cond.notify()#会发送一个信号
        self.cond.wait()#没收到信号之前会阻塞

        print("天猫:3")
        self.cond.notify()#会发送一个信号
        self.cond.wait()#没收到信号之前会阻塞

        print("天猫:5")
        self.cond.notify()#会发送一个信号
        self.cond.wait()#没收到信号之前会阻塞

        self.cond.release()#一定记得释放掉


class XiaoAi(Thread):
    def __init__(self,cond):
        super().__init__()
        self.cond=cond

    def run(self):#和天猫的调用一样，两种调用方式
        with self.cond:#with 好用

            self.cond.wait()
            print("小爱:2")
            self.cond.notify()

            self.cond.wait()
            print("小爱:4")
            self.cond.notify()

            self.cond.wait()
            print("小爱:6")
            self.cond.notify()

if __name__ == "__main__":
    cond=Condition()
    t = TianMao(cond)
    x = XiaoAi(cond)
    x.start()
    t.start()
```
:::tip 提示
启动顺序很重要,如果notify先启动了那么没有wait的线程就会卡住<br/>
with cond/acquire 之后才能使用wait和notify<br/>
condition原理是两层锁，底层锁在线程调用了wait的时候释放，上面的锁在每次wait的时候分配一把放到cond的等待队列中去，等notify的唤醒<br/>
:::
### 信号量

和锁一样用,可以不用同一个函数来释放，可以调用多个<br/>
是个全局对象<br/>
定义n个信号量，每次qcquire就-1，每次release就+1减到了0 就会锁住<br/>

使用代码如下
```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/19 17:10"

#import your model here

from threading import Thread,Semaphore
import time
#your class&function here
class consumer(Thread):
    def __init__(self,sem):
        super().__init__()
        self.sem=sem

    def run(self):
        time.sleep(2)
        print("eat!")
        self.sem.release()


class producer(Thread):
    def __init__(self, sem):
        super().__init__()
        self.sem = sem

    def run(self):
        self.sem.acquire()
        print("make!")
        consumer(self.sem).start()

if __name__=="__main__":
    sem=Semaphore(3)
    for i in range(20):
        p=producer(sem)
        p.start()
```

    make!make!

    make!
    eat!eat!eat!

    make!
    make!make!


    eat!
    eat!
    make!
    make!
    eat!
    make!
    eat!
    eat!
    make!
    make!eat!

    make!
    eat!eat!

    make!
    make!
    eat!
    make!
    eat!
    eat!
    make!
    make!
    eat!
    make!
    eat!eat!
    make!

    make!
    eat!
    eat!
    eat!

:::tip
程序结构基本就是一个生产者线程拉起一个消费者线程，消费者消费完了才会释放信号量
:::
### 线程池

对线程进行管理，调用线程状态，获取线程返回值，进行池化管理<br/>
子线程完成之后主线程能够立即知道
代码如下

```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/19 18:57"

#import your model here
from concurrent.futures import ThreadPoolExecutor,as_completed,wait,ALL_COMPLETED

import time
#your class&function here
def go(times):
    time.sleep(times)
    print("{}is done".format(times))

    return "it is {} done".format(times)#函数有返回值


executor=ThreadPoolExecutor(max_workers=2)#n个线程并发执行

task1=executor.submit(go,(2))#提交一个线程对象到池中，池中可以放无数个，但是只能同时执行max_workers个
task2=executor.submit(go,(8))#submit提交了之后会立即执行，附带了execute了
#task是一个future对象

if __name__ == "__main__":
    print(task2.done())#获取函数是否执行完了。
    print("取消1成功了吗",task1.cancel())#尝试取消一个线程，取消成功Ture，否则False
    print("取消2成功了吗",task2.cancel())#完成了的线程无法取消，未完成已经在池中的可以取消
    print(task1.result())#获取执行完之后的返回结果
    time.sleep(9)
    print(task2.done())

    #穷举是比较低级的做法
    t=[5,6,3,7]
    all_task=[executor.submit(go,(i)) for i in t]#迭代放进一个线程池
    for future in as_completed(all_task):#允许异步的等代线程池中完成的线程并取回结果
        print(future.result())#谁先做完取回谁

    wait(all_task,return_when=ALL_COMPLETED)#等all_task全执行完才执行main线程
    '''
    FIRST_COMPLETED = 'FIRST_COMPLETED'
    FIRST_EXCEPTION = 'FIRST_EXCEPTION'
    ALL_COMPLETED = 'ALL_COMPLETED'
    _AS_COMPLETED = '_AS_COMPLETED'
    可以取上面的值
    '''

    #使用map
    for future in executor.map(go,t):#和map是一个道理 映射
        print(future)#直接可以打印结果哦，返回顺序和url的顺序一致
```

## 多进程
<a href=''>操作系统-进程</a>
进程之间是相互独立的，变量空间按不能共享，各进程保留一份代码副本和运行堆栈需要用特殊的数据结构来访问<br/>
:::tip windows 和 linux
linux下子进程永远返回0，而父进程返回子进程的ID。这样做的理由是，一个父进程可以fork出很多子进程，所以，父进程要记下每个子进程的ID，而子进程只需要调用getppid()就可以拿到父进程的ID。<br/>
:::
### 进程池

ProcessPoolExecutor 代替ThreadPoolExecutor就可以了，接口形状一样<br/>
代码如下

```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/19 20:07"

#import your model here
import multiprocessing

#your class&function here
def go(a):
    print("it seems like ",a)

    return "it is {} done ".format(a)
if __name__ == "__main__":
   p=multiprocessing.Process(target=go,args=(5,))
   print(p.pid)#没启动的时候为None
   p.start()
   print(p.pid)#启动了返回pid
   p.join()

   #使用池
   pool=multiprocessing.Pool(multiprocessing.cpu_count())#传入worker数量默认为cpu核数量
   result=pool.apply_async(go,args=(3,))#和commit一个作用直接传进去

   pool.close()#不再接受新的进程任务
   pool.join()#可以一次性将池中的进程都阻塞
   print(result.get())

   for result in pool.imap(go,[1,5,3]):#异步返回结果，一次性提交
       print(result)

   for result in pool.imap_unordered(go,[2,6,4]):#异步返回结果，一次性提交，无序
       print(result)
```

### 进程之间通信
- Queue.qsize()：返回当前队列包含的消息数量；
- Queue.empty()：如果队列为空，返回True，反之False ；
- Queue.full()：如果队列满了，返回True,反之False；
- Queue.get():获取队列中的一条消息，然后将其从列队中移除，可传参超时时长。
- Queue.get_nowait()：相当Queue.get(False),取不到值时触发异常：Empty；
- Queue.put():将一个值添加进数列，可传参超时时长。
- Queue.put_nowait():相当于Queue.get(False),当队列满了时报错：Full。
:::danger
windows下所有关于进程的操作都要放在if __name__ == '__main__':下面进行，否则会报错
在使用进程池的时候必须用Manager()对象的Queue不然会出错
:::
```py
import multiprocessing
from multiprocessing import Queue,Pipe,Manager,Lock,Process
import time

def putit(q):
    q['a']='aaa'
    #q.put([1,2,3])
    #print(q.qsize())

def getit(q):
    time.sleep(2)
    print(q['a'])
    #print(q.get())
    #print(q.qsize())

if __name__ == '__main__':
    Q = Queue()  # 在使用进程池的时候，会出错，使用manage.Queue()
    P = Pipe(False)  # 设置为False就是单向队列
    M = Manager()
    D = M.dict()
    MQ = M.Queue()
    # a = Process(target=putit, args=(Q,))
    # b = Process(target=getit, args=(Q,))
    a = Process(target=putit, args=(D,))
    b = Process(target=getit, args=(D,))
    a.start()
    b.start()
    a.join()
    b.join()
```
复杂的数据对象用M.dict，简单的用list，所有的数据结构去源码里看看
## 异步
### 异步基本概念
#### 并发 并行 阻塞 非阻塞 同步 异步<br/>
1. <strong>并发</strong> 在某一时间段内有多个程序运行在一个cpu上<br/>
2. <strong>并行</strong> 在某一时刻有多个程序运行在多个cpu上<br/>
3. <strong>阻塞</strong> 调用函数时当前函数被挂起<br/>
4. <strong>非阻塞</strong>调用函数线程不会被挂起会立即返回<br/>
5. <strong>同步IO</strong> 发出请求之后等待结果<br/>
6. <strong>异步IO</strong> 发出请求之后立即返回，不等待结果uinx下五种IO模型
    - 阻塞式IO
    - 非阻塞式IO
    - IO多路复用
    - 异步IO（协程）
    - 信号驱动式IO（用的少）select、poll、epoll


### 三种异步机制
:::danger 留坑
需要花时间好好整理
:::
select, poll , epoll都是I〇多路复用的机制。I/O多路复用就是通过一种机
制，一个进程可以监视多个描述符，一旦某个描述符就绪（一般是读就绪或
者写就绪），能够通知程序进行相应的读写操作。但select, poll , epoll本
质上都是同步I/O ,因为他们都需要在读写事件就绪后自己负责进行读写，
也就是说这个读写过程是阻塞的，而异步I/O则无需自己负责进行读写，异
步I/O的实现会负责把数据从内核拷贝到用户空间。select

select函数监视的文件描述符分3类，分别是writefds、readfds、和
exceptfds。调用后select函数会阻塞，直到有描述副就绪（有数据可读、
可写、或者有except),或者超时（timeout指定等待时间，如果立即返回
设为null即可），函数返回。当select函数返回后，可以通过遍历fdset,来
找到就绪的描述符。

select目前几乎在所有的平台上支持，其良好跨平台支持也是它的一个
优点。selec啲一个缺点在于单个进程能够监视的文件描述符的数量存在最
大限制，在Linux上一般为1024 ,可以通过修改宏定义甚至重新编译内核的
方式提升这一限制，但是这样也会造成效率的降低。poll

不同与select使用三个位图来表示三个fdset的方式，poll使用一个
pollfd的指针实现。

pollfd结构包含了要S见的event和发生的event,不再使用select "参
数-填〃传递的方式。同时，poNfd并没有最大数量限制（但是数量过大后
性能也是会下降）。和select函数_样，poll返回后，需要轮询pollfd来获
取就绪的描述符。

从上面看，select和poll都需要在返回后，通过遍历文件描述符来获取
已经就绪的socket。事实上，同时连接的大量客户端在一时刻可能只有很少
的处于就绪状态，因此随着监视的描述符数量的增长，其效率也会线性下降epoll
linux支持，windows不支持
epoll是在2.6内核中提出的，是之前的select和poll的增强版本。
相对于select和poll来说，epol更加灵活，没有描述符限制。
epoll使用一个文件描述符管理多个描述符，
将用户关系的文件描述符的事件存放到内核的一个事件表中，这样在用户空间和内核空间的copy只需一次。
代码
```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/21 19:29"

#import your model here
import asyncio
import time
from functools import partial
#your class&function here
async def gethtml(html):
    print("start "+html)
    await asyncio.sleep(2)#异步等待
    print('end '+html)
    return "窝做完了"

def callback(address,future):#使用partial时参数必须按顺序摆放，调用时是先传入的地址，loop又给的future
    print("I have send it to ",address)

if __name__ == "__main__":
    start_time=time.time()
    loop=asyncio.get_event_loop()#创建一个协程池
    loop.run_until_complete(gethtml("a.com"))#基本用法，提交一个协程对象立即异步运行

#使用future

    get_future=asyncio.ensure_future(gethtml("b.com"))#和loop.create_task的方法作用一样，返回一个future对象,参考submit，把协程对象放进去
    loop.run_until_complete(get_future)#传入协程future并运行，会直接对原先的队列做操作
    print(get_future.result())#打印处理完的返回值

# 使用task，可以添加回调

    task = loop.create_task(gethtml("c.com"))  # task和future一样，是future的子类
    task.add_done_callback(partial(callback,"576359186@qq.com"))#太难嫁一个回调,在任务完成时就会调用，会自动向callback传入一个完成了的future
    loop.run_until_complete(task)  # 传入协程future并运行，会直接对原先的队列做操作
    #partial函数用于把（函数，参数）包裹起来形成一个新的（句柄）可供其他函数接收
    print(task.result())  # 打印处理完的返回值

#使用任务队列

    tasks=[gethtml("a.com") for i in range(10)]#任务列表，全是协程对象
    #loop.run_until_complete(asyncio.wait(tasks))#传入asyncio.wait(任务列表)默认直到全完成才退出
    tasks2 = [gethtml("a.com") for i in range(10)]
    tasks2=asyncio.gather(*tasks2)
    #wait方法和线程中的wait方法一样，会阻塞线程直到满足returnwhen然后触发一个事件继续进行
    loop.run_until_complete(asyncio.gather(*tasks,tasks2))
    #可以直接task2.cancel()取消队列中的任务
    # gather更加高层，*tasks可以将task传入，可传入多个taskgroup,注意task和task2


    print(time.time()-start_time)
```
:::warning 使用场景
包含各种特定系统实现的模块化事件循环传输和协议抽象<br/>
对TCP、UDP、SSL、子进程、延时调用以及其他的具体支持模仿futures模块但适用于事件循环使用的Future类型<br/>
基于yield from的协议和任务，可以让你用顺序的方式编写并发代码必须使用一个将产生阻塞IO的调用时<br/>
有接口可以把这个事件转移到线程池莫仿threading模块中的同步原语、可以用在单线程内的协程之间<br/>
:::

### asyncio生态

asyncio官方只实现了比较底层的协议，比如TCP，UDP。所以诸如HTTP协议之类都需要借助第三方库，比如aiohttp。<br/>

虽然异步编程的生态不够同步编程的生态那么强大，但是如果又高并发的需求不妨试试，下面说一下比较成熟的异步库

<a href='https://aiohttp.readthedocs.io/en/stable/'>aiohttp</a>
异步http client/server框架

<a href='https://sanic.readthedocs.io/en/latest/'>sanic</a><br/>
速度更快的类flask web框架。<br/>

<a href='https://uvloop.readthedocs.io/'>uvloop</a>
快速，内嵌于asyncio事件循环的库，使用cython基于libuv实现。<br/>
官方性能测试:<br/>
nodejs的两倍，追平golang<br/>
为了减少歧义，这里的性能测试应该只是网络IO高并发方面不是说任何方面追平golang。<br/>
摘自哪个博客我给忘了,回头找到了就添上
### 小总结
Python之所以能够处理网络IO高并发，是因为借助了高效的IO模型，能够最大限度的调度IO，然后事件循环使用协程处理IO，协程遇到IO操作就将控制权抛出，那么在IO准备好之前的这段事件，事件循环就可以使用其他的协程处理其他事情，然后协程在用户空间，并且是单线程的，所以不会像多线程，多进程那样频繁的上下文切换，因而能够节省大量的不必要性能损失。<br/>
:::warning 注意
不要再协程里面使用time.sleep之类的同步操作，因为协程再单线程里面，所以会使得整个线程停下来等待，也就没有协程的优势了
:::
本文主要讲解Python为什么能够处理高并发,不是为了讲解某个库怎么使用,所以使用细节请查阅官方文档或者执行。<br/>

无论什么编程语言，高性能框架，一般由事件循环 + 高性能IO模型(也许是epoll)组成

### async关键字
可以异步的定义函数
:::danger
留坑
:::
```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/22 8:18"

#import your model here
import asyncio
import time

#your class&function here
async def get(t):
    print("waiting")
    await asyncio.sleep(t)
    print("done after {} seconds".format(t))

if __name__ == "__main__":
    tasks=[get(1),get(2),get(3)]
    loop=asyncio.get_event_loop()
    try:
        loop.run_until_complete(asyncio.wait(tasks))#开始运行任务
    except KeyboardInterrupt as e:#按下Ctrl+c的时候会触发
        all_tasks=asyncio.Task.all_tasks()#获取所有的协程任务，没有传入，同过eventloop获取的
        for i in all_tasks:#迭代
            print("cancel it!")
            print(i.cancel())#取消任务，成功就返回True
        loop.stop()#停止循环
        loop.run_forever()#调用，否则会出错
    finally:
        loop.close()#无论怎样都要关闭loop
```

### 嵌套协程的返回机制
:::danger
留坑
:::

![嵌套协程的返回机制](https://upload-images.jianshu.io/upload_images/12620393-1c869fc45f491682.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 在异步中使用同步代码
:::danger
留坑
:::

```python
#import your model here
import asyncio,time
from concurrent.futures import ThreadPoolExecutor
#your class&function here
def s(t):
    print("sleep ",t)
    time.sleep(t)
#在异步中使用同步代码
if __name__ == "__main__":
    loop=asyncio.get_event_loop()
    executor=ThreadPoolExecutor(3)#创建线程池
    tasks=[]
    for i in range(3):
        task=loop.run_in_executor(executor,s,i)#传入要添加的线程池，要运行的同步函数，参数，返回一个task对象
        tasks.append(task)#添加任务列表
    loop.run_until_complete(asyncio.wait(tasks))
```
### 异步生命周期中的一些函数
:::danger
留坑
:::

```python
def callback(t):
    print("sleep {} times".format(t))

def stoploop(loop):
    loop.stop()

if __name__ == "__main__":
    loop=asyncio.get_event_loop()
    now=loop.time()
    loop.call_later(2,callback,5)#过指定的时间就会运行某个函数，参数，根据时间排列先后顺序
    loop.call_at(now+4,callback,1)#过指定的时间就会运行某个函数，参数，loop中的时间
    loop.call_soon(callback,4)#立即运行某个函数，参数，不会按时间排序一起开始运行
    loop.call_soon(stoploop,loop)#停止协程
    loop.call_soon_threadsafe(callback,3)#线程安全的运行某个函数
    loop.run_forever()#别忘了这个
```

### 异步中的锁
在异步中因为代码片执行到一定时间或执行了一定栈帧，GIL会自动释放，也可能导致线程(异步)不安全<br/>
和多线程中一样我们需要使用锁来保证数据一致性
```python
lock=Lock()
cache={}
async def parse(arg):#请求html的函数
    global cache
    async with lock:#可以acquire也可以直接async with=with await
        if arg in cache:
            return cache[arg]
        await asyncio.sleep(3)#耗时操作
        cache["arg"]=2
    print(arg)

async def use():#使用这个请求，调用了这个解析函数
    await parse("didi")

async def reparse():#重新解析这个请求，再次调用这个解析函数，这样就对一个url调用了2次
    await parse("didi")
#在这样使用时会导致协程不安全所以使用锁
```

### aio异步爬虫


```python
#-*-coding:utf-8-*-
#SettingCode here
__author__ = "a_little_rubbish"
__date__ = "2018/11/23 13:27"

#import your model here
import aiohttp
import aiomysql
import asyncio
import re
from asyncio.queues import Queue
from pyquery import PyQuery

stop=False

#your class&function here
start_url="http://www.jobbole.com/"
waiting_urls=Queue()#未爬取的连接
seen_urls=set()#已爬取过的连接，量大就用布隆过滤器



async def fetch(url,session):#获取url
    try:
        async with session.get(url) as the_response:
            print("url status:{}".format(the_response.status))
            if the_response.status in [200,201]:
                data =await the_response.text()
                return data
    except Exception as e:
        print(e)

async def extract_urls(html):
    urls=[]
    pq=PyQuery(html)
    for links in pq.items("a"):
        url=links.attr("href")
        if url and url.startswith("http") and url not in seen_urls:
            urls.append(url)
            await waiting_urls.put(url)



async def init_urls(url,session):#用作启动
    html= await fetch(url,session)
    await extract_urls(html)


async def article_handler(url,session,pool):
    html=await fetch(url,session)
    seen_urls.add(url)
    await extract_urls(html)
    pq=PyQuery(html)
    tittle=pq("tittle").text()

    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute("INSERT INTO tittle VALUE {}".format(tittle))
            print("ok +1")


async def consumer(pool):
    async with aiohttp.ClientSession() as session:
        while not stop:
            url= await waiting_urls.get()
            print("get {}".format(url))
            if re.match("http://.*?jobbole.com/\d+/",url):
                if url not in seen_urls:
                    asyncio.ensure_future(article_handler(url,session,pool))
            else:
                if url not in seen_urls:
                    asyncio.ensure_future(init_urls(url,session))


async def main(loop):
    pool = await aiomysql.create_pool(host="127.0.0.1", port=3306, user="root", password="1118", db="aiosql", loop="",
                                charset="utf8", autocommit=True)

    async with aiohttp.ClientSession() as session:
        html= await fetch(start_url,session)
        seen_urls.add(start_url)
        await extract_urls(html)
    asyncio.ensure_future(consumer(pool))

if __name__ == "__main__":
    loop=asyncio.get_event_loop()
    asyncio.ensure_future(main(loop))
    loop.run_forever()
```

### 异步插入数据库
在scrapy中异步插入mysql看<a href=''>这里</a>
:::danger
留坑
:::
## 后续将持续更新
<Valine></Valine>