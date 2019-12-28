---
title: java基础(2)
date: 2019-12-27 21:38:45
prev: ./java基础语法1.md
next: ./java基础语法3.md
categories: backEnd
tags:
- 语言基础
- 所有文章
- 后端
- java
---

:::tip   书接上回<br/>
太多了第一节放不下...  
从面向对象开始
:::


<!-- more -->
## 面向对象
- 封装（Encapsulation）
- 继承（Inheritance）
- 多态（Polymorphism）

### 类
和C++也是很相似的 

```java
public class Cat extends animal{
    String name="kitty";
    public void showage(){
        System.out.println("名字是:"+name)
    }   
}
```
- 类中`public static String sex="男"`
  - static是静态变量,在编译过程中提前放到静态区,可以直接通过类名调用
  - 实例变量存在堆中,局部变量存在栈中,必须显式初始化无默认值,不指定修饰符  
- java中一个pubilc类一个文件,文件名和类名必须相同
- 类的权限关系  

<div align= center>

|作用域 |当前类| 同一包(package) |子孙类 |其他包|
|:----:|:----:|:----:|:----:|:----:|
|public|√|√|√|√|
|protected|√|√|√|×|
|default|√|√|×|×|
|private|√|×|×|×|

</div>
  
`class`只能被`default`或`public`修饰,默认`default`,能被同一包内访问

### 函数  
- 函数不能嵌套
- 直接`new Animal().showage()`是可以的,匿名对象  
  - 如果对一个对象只需要进行一次方法调用，那么就可以使用匿名对象。
  - 我们经常将匿名对象作为实参传递给一个方法调用
- 本类中的方法可以直接访问本类中的成员变量。**static方法只能访问static变量**
- 在不同类中的访问机制,先创建要被访问类的对象，再用对象访问类中定义的成员。


**函数的重载**  
和C++类似,每个重载的函数参数必须有所不同,根据参数判断,顺序不同也能重载
  
**可变参数**
- 用数组传递可变参数
  - 没参数也要传个空数组
- 用`public void x(String ... args){}`
  - 可以直接传入多个字符串,也可以先把字符串放在一个数组中,然后传入数组
  - 使用时把`args`当成一个数组就可以了
  - 可变参数要放在其他参数后面
  - 没参数可以直接不填
  
**值传递**
Java中只有**值传递**!
```java
public class Main {
    public static int transforme(int a){//3-初始化局部变量的a,把全局a赋值给这个局部a
        a+=10;//将局部a加10
        System.out.println(a);//10 
        return a;//返回
    }
    public static void main(String args[]){
        int a =0;//1-栈开辟一块空间,存放a的值0
        int x=transforme(a);//10 2-调用,赋予x返回值
        System.out.print(a);//0全局a并没有改变

    }
}
```

因为普通变量传的是栈中的值,但是引用变量在栈中存的是地址,所以函数修改时会真正改变堆中的值
```java
class data{
    int d;
}
public class Main {
    public static int transforme(data D){//3-初始化堆内的D.d,将D地址传入
        D.d+=10;//将D.d加10
        System.out.println(D.d);//10 
        return D.d;//返回
    }
    public static void main(String args[]){
        data D=new data();//1-栈开辟一块空间,存放D的地址
        int x=transforme(D);//10 2-调用,赋予x返回值
        System.out.print(D.d);//D改变了

    }
}

```

### 构造析构
**构造方法**  

- 具有与`类`相同的名称
- 不声明返回值类型。（与声明为`void`不同）不能被`static`、`final`、`synchronized`、`abstract`、`native`修饰
- 不能有`return`返回值
- 不声明的话会有一个没有参数啥也不干的构造器
- 构造方法可以接受参数
- 构造方法默认和类的访问属性**一样**
  - 构造方法可以处于**public**、**protected**、**private**和默认四种访问级别之一。
      - `public`这里就不多说了
      - `private` 当构造方法为`private`级别时，意味着**只能在当前类访问**它，**不能被继承**，不能被其他类用new创建实例对象。可以对比其他几种修饰符的作用
      - `abstract`修饰的类，**不允许被实例化**，这点和`private`修饰构造方法相同，但`abstract`修饰的类**可以被继承**，拥有子类，可以创建子类的实例
      - `final`类**禁止被继承**，这点和`private`修饰构造方法相同，但是`final`类**可以用new**创建实例对象。
      - `protected` 如果构造函数是`protected`,那么该类可以继承,可以在被包内其他类中产生实例,但是无法在包外或者子类以外的地方产生实例. 
- 可以**重载**,但是**不能被继承**

**析构方法**  
析构比较叼,放在jvm里面讲,java设计思路之一就是避免像c那样手动管理内存，以减少因程序员的疏误导致的内存溢出等问题。所以垃圾回收交给了jvm自己来做


### this和super

**this**  
和python差不了很多,代指本类,避免重名,其他构造方法可以调用`this()`相当于先调用一次无参构造.  

- 1.使用this()必须放在构造器的首行！
- 2.使用this调用本类中其他的构造器，保证至少有一个构造器是不用this的。
- 3.访问本类中的属性，如果本类没有此属性则从父类中继续查找
**super**  


在Java类中使用super来调用父类中的指定操作：
- super可用于访问父类中定义的属性
- super可用于调用父类中定义的成员方法
- super可用于在子类构造方法中调用父类的构造器注意：
- 尤其当子父类出现同名成员时，可以用super进行区分
- super的追溯不仅限于直接父类
- super和this的用法相像，this代表本类对象的引用，super代表父类的内存空间的标识  

王父类只有有参构造可以使用的时候，子类必须显示的构建一个构造来调用父类的有参构造，并且调用父类构
无参不一定能够是默认,重写一个无参也行
子类中所有的构造器默认都会访问父类中空参数的构造器当父类中没有空参数的构造器时，子类的构造器必须通过this（参数列表）或者super（参数列表）语句指定调用本类或者父类中相应的构造器，且必须放在构造器的第一行
如果子类构造器中既未显式调用父类或本类的构造器，且父类中又没有无参的构造器，则编译出错


:::tip
子类中`this`和`super`只能使用一个
:::



留坑:整理super和this



### 类实例化过程
**简单类实例化**  
1. JVM方法区加载类
2. 栈中开辟内存,存放引用
3. 堆中开辟空间,先队成员变量进行默认初始化
4. 类变量进行赋值初始化
5. 构造方法进栈,调用构造方法执行
6. 把堆内存的地址赋给栈中的引用  


**子类实例化**  
1. JVM方法区加载类,先加载父类再加载子类
2. 栈中开辟内存,存放引用
3. 堆中开辟空间,先对子类和父类成员变量进行默认初始化
4. 子类构造方法进栈,调用子类构造方法执行
5. 然后再进行父类变量赋值初始化
6. 父类构造方法进栈,执行完毕出栈
7. 进行子类变量赋值初始化
8. 把堆内存的地址赋给栈中的引用  

## 继承
- java只支持**单继承**不支持多继承,
- 继承的出现提高了代码的**复用性**。
- 继承的出现让类与类之间产生了关系，提供了**多态的前提**。
- 不要仅为了获取其他类中某个功能而去继承,父子类之间必须要有**逻辑关系便于维护**  


**重写方法**  

- 子类可以重写父类的**方法体**,保持原来的方法**名**称、**参数**列表和**返回值**类型。
- 重写方法**不能**使用比被重写方法**更严格**的访问权限。
- 重写和被重写的方法须**同时**为static的，或同时为非static的
- 子类方法抛出的异常不能大于父类被重写方法的异常

## 多态
可以简单地概括为“一个接口，多种方法”，程序在运行时才决定调用的函数

1. 方法的**重载**（overload）和**重写**（overwrite）。
    - 重载同名方法体现的是本类中的堕胎
    - 重写子类可以使用父类中的方法名实现不同的逻辑
2. 对象的多态性可以直接应用在**抽象类**和**接口**上。
    - 子类的对象可以替代父类的对象使用
        - 一个**变量**只能有**一种**确定的**数据类型**
        - 一个**引用**类型变量可能指向（引用）**多种**不同类型的**对象**
    - 一个引用类型变量如果声明为父类的类型，但实际引用的是子类对象，那么该变量就**不能**再访问子类中**添加的属性和方法**

3. 若**编译时类型**和**运行时类型**不一致，就出现多态（Polymorphism）
    - Java引用变量有两个类型：**编译时类型**和**运行时类型**。编译时类型由**声明该变量时使用的类型**决定，运行时类型由**实际赋给该变量的对象**决定。(留坑不懂)

成员方法：
>编译时：要查看引用变量所属的类中是否有所调用的方法。
>运行时：调用实际对象所属的类中的重写方法。
>不具备多态性，只看引用变量所属的类。
若子类重写了父类方法，就意味着子类里定义的方法彻底覆盖了父类里的同名方法，系统将不可能把父类里的方法转移到子类中对于实例变量则不存在这样的现象，即使子类里定义了与父类完全相同的实例变量，这个实例变量依然不可能覆盖父类中定义的实例变量


## 封装  

- 隐藏一个类中不需要对外提供的实现细节;
- 使用者只能通过事先定制好的方法来访问数据，可以方便地加入控制逻辑，限制对属性的不合理操作;
- 便于修改，增强代码的可维护性;  
  
<br/>
  具体就是变量私有方法公有通过GetSet来获取改变,防止修改成一个奇奇怪怪的值  
  <br/>

### Java Bean
某种意义上javaBean也解决了没有多继承的一些问题  
逻辑上定义的java写成的可重用的组件,属性私有先声明,方法公有.  
在编辑框中`右击`，选择`generator`，可以拖选住你想要生成`get`、`set`方法的属性，点击完成即可自动生成`get`和`set`方法。  
快捷键为：`alt+insert`  

```java
/**
 * FileName: Cat
 * Author:   ooowl
 * Date:     12/28/2019 3:36 PM
 * Description: cat java bean
 */

package com.company;

public class Cat {
    private int age=10;
    private String name="kitty";
    private String variety="英短";


    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }
}
```

根据维基百科上的介绍[1]以及Shaun Abram的一篇博文[2]，一个JavaBean通常是一个有以下3种特点的公共Java类：
- 有一个无参的构造方法（默认构造方法）；
- 所有属性都是private的，类外部需要通过public的getter和setter来访问属性；
- 实现了Serializable接口。

JavaBeans规范[3]中指出，JavaBeans是一种能在开发工具中可视化地编辑的可重用的软件组件，它需要有一系列的属性，可能有一些事件。在JavaBeans规范的第7章中规定了一个JavaBean的属性应该是private的，类外部应该通过pubilc的getter和setter方法来访问属性。在JavaBeans规范的第2章中有规定一个JavaBean需要是可序列化的，以便传输和持久化JavaBean的状态。但是JavaBeans规范中没有规定一个JavaBean必须有一个无参的构造方法。

JavaBeans规范发布于1997年，所以JavaBeans规范其实主要是围绕Java Applet来设计的。Java Applet中的GUI组件会有属性（例如按钮的名称）和事件（例如输入框的输入事件），GUI组件的状态可能需要在服务器端和客户端之间传输，因此JavaBeans的定义中除了属性还包括了事件，而且也规定了JavaBeans需要可序列化。但是现在许多的Java开发是在纯服务器端软件的领域，服务器应用上的如数据库连接这样的对象或者一些实现业务逻辑的对象是不应该在电脑之间传输的，所以我认为这些对象就不适用传统的JavaBeans的定义，至少不适用可序列化这个特性。
### EJB企业级JavaBeans

EJB是企业级JavaBeans（Enterprise JavaBeans）的英文缩写。根据EJB规范[4]，一个企业级Bean（Enterprise Bean）
- 有以下特性：
    - 通常包含操作企业数据的业务逻辑；
    - 由容器在运行时管理；
    - 用户需要通过容器访问企业级Bean；
    - 能在部署时根据运行环境定制；
    - 能通过注解或XML在编译或部署时指定其中使用的一些配置信息（可配置）；
    - 只使用了EJB规范中规定的服务的企业级Bean能在任意EJB容器中使用（可移植）；
    - 企业级Bean可以不需要重新编译就被封装在一个企业级应用中。

EJB规范中还指出，一个企业级Bean可以是有状态的，也可以是无状态的；可以实现业务逻辑，也可以代表一个持久化的实体。由此可见，EJB和JavaBeans其实是有挺大区别的，可以说一个EJB并不一定是一个JavaBean。一个EJB也不一定有无参构造方法和实现Serializable接口。

EJB规范中也没有规定一个企业级Bean的属性必须是private的，要通过public的getter和setter来访问。不过我们基于类的封装性和降低类之间的耦合的考虑，通常还是会遵循将属性设为private，为其写public的getter和setter这样的设计。
### Spring Bean

根据Spring Framework的官方文档[5]，在Spring中由Spring IoC容器管理的构成应用主干的对象就是bean。（注：IoC是控制反转 Inverse of Control 的英文缩写。）Spring beans都是由Spring IoC容器根据XML配置文件或注解等方式来实例化、组装和管理的。

我认为，Spring beans和EJB比较类似，它们通常都是数据库连接、事务管理器、消息中间件连接、Session管理器、数据访问对象、业务逻辑服务之类的，只是Spring beans是由Spring IoC容器管理的，EJB是由EJB容器管理的。Spring beans同样不一定有无参构造方法和实现Serializable接口。
### POJO简单的Java对象

POJO是简单的传统的Java对象（Plain Old Java Object）的英文缩写，另有Plain Ordinary Java Object、Pure Old Java Object等说法，最早由Martin Fowler、Rebecca Parsons和Josh MacKenzie提出。[6][7] 结合Spring文档中对POJO的介绍[8]，我们可以知道，POJO是一种尽量不依赖任何第三方库、框架甚至JavaEE规范的实现的Java对象，它应该尽量不继承任何类、不实现任何接口、不包含任何与第三方库或框架相关的注解。

由上述介绍我们可以发现，POJO和JavaBeans、EJB和Spring beans都没有必然的联系。负责GUI组件的继承java.awt.Component的JavaBeans、实现JavaEE规范中的接口的EJB、实现Spring框架中的接口的Spring beans或者使用了Spring框架中的注解的Spring beans都不是POJO。POJO的定义中同样没有规定它有怎样的构造方法和怎样的属性。

因为一个POJO不依赖任何第三方库和框架，它的可维护性和可移植性会更强，开发人员开发与这个POJO相关的功能时，不必考虑它依赖的第三方库或框架的实现，可以更专注于这个POJO本身的业务功能。第三方库或框架升级的时候，不必对POJO进行修改。POJO给了开发人员充分的灵活性，开发人员可以选择将一个POJO应用在任意一个框架中（例如Spring或者Struts、Hibernate或者MyBatis），或者选择不应用在框架中。
### BO业务对象

BO是业务对象（Business Object）的英文缩写。通常认为，业务对象是用于描述业务逻辑中的对象，但业务对象不依赖具体实现。如果换一种实现方式，例如从关系式数据库迁移到非关系式数据库，或者从单点系统改成一个分布式系统，一个业务对象类需要发生改变的话，那这个业务对象类的设计就是不合理的。

业务对象中的属性应该与业务人员、需求人员、客户理解的一致。例如一个用户信息类中，开发人员可能会在里面设置一个”创建时间“字段，但对于业务人员来说，用户没有“创建时间”，只有“注册时间”，那么用户业务对象中的字段就应该叫做“注册时间”而非“创建时间”。又例如，多数互联网应用，删除一个实体的时候并不会从数据库中物理删除，而是在数据库记录中将该实体的记录的状态字段改为“已删除”，这种“已删除”状态的对象可以是下文说的PO或者DTO，但是一个BO。

又例如，用关系式数据库时，通常会用一个中间表/中间对象来帮助描述多对多关系，我认为这种多对多关系对象（通常是一个PO）就不能算是业务对象。

我觉得，由于业务对象是业务人员，通常业务对象只是在需求或者实现设计中出现，很少人会在代码里写一个纯粹的BO类，即使写BO类，也是作为下文所说的DTO、PO或者VO的基类或组成部分。
### DTO数据传输对象

DTO是数据传输对象（Data Transfer Object）的英文缩写。

DTO通常是一个JavaBean（按照有无参构造方法、属性都为private、属性通过public的getter/setter来访问、实现Serializable接口的定义）。DTO也通常是一个POJO，因为要考虑其在交互的系统之间的可移植性。
### PO展现层对象

PO是展现层对象（Persistent Object）的英文缩写。通常我们对PO的理解就跟百度百科[9]中说的一样：一个PO类与一个数据库表对应，一个PO与数据库表中的一行对应。PO通常是也一个JavaBean（按照有无参构造方法、属性都为private、属性通过public的getter/setter来访问、实现Serializable接口的定义）。PO可以是一个POJO，也可能含有JPA规范中定义的一些注解（例如@Entity、@Table、@Column、@Id等）。

虽然在很多架构设计中，DTO和PO等对象没有作区分，都放在model包或者entity包中，我认为一个结构清晰的架构应该对PO与DTO等其他对象作区分，因为存储在数据库中的对象与其他业务对象还是有一些区别的。例如数据库对象通常会有创建时间、创建者的用户ID、最后一次修改时间、最后一次修改者的用户ID、状态、数据库自增ID等字段，但这些信息很多是不需要甚至不应该暴露给用户或者其他系统的，即不应该出现在DTO等其他对象中的。

而在对象关系映射（Object/Relation Mapping，简称ORM）框架Hibernate中，上述含义的PO有三种状态：持久化对象状态（也简称PO）、值对象（Value Object，简称VO）状态、游离（Detached）状态。根据Hibernate的文档[10]，在Hibernate中，与一个Hibernate session绑定的广义PO是一个Hibernate PO，对一个Hibernate PO作修改后，对Hibernate session做flush或close操作时，Hibernate session会将修改后的Hibernate PO的状态持久化到数据库中。开发者手动将Hibernate PO从Hibernate session中解除绑定（detach）之后，该PO就进入游离状态。游离状态的PO可以重新与一个Hibernate session绑定而重新变为持久化对象状态。
### VO值对象/展现层对象

VO有两种含义，一种是值对象（Value Object）的英文缩写，另一种是展现层对象（View Object）的英文缩写。

对于值对象，上文有提到在Hibernate中，值对象是广义PO的一种状态。在Hibernate中，除了持久化对象状态和游离状态的广义PO都是值对象。

值对象也有另一种定义，即所有用于存储数据的对象（如PO和DTO）都是值对象。

展现层对象，又可称“视图对象”，是对应一个客户端页面或者组件中数据的对象。展现层对象跟DTO的结构很相似，都有一些private的属性及其public的getter/setter，因为它们本质上都是用来承载传输的数据，DTO通常用于跨应用传输数据，而展现层对象用于业务逻辑层和客户端页面之间传输数据。对于要不要将DTO和展现层对象合并在一起，下文中推荐的博文有详细的讨论，这里不再赘述。
### DO数据对象/领域对象

DO有两种含义，一种是数据对象（Data Object）的英文缩写，另一种是领域对象（Domain Object）的英文缩写。

阿里巴巴的《Java开发手册》中的DO用的就是数据对象这个概念，它的含义跟PO的含义是一样的（一个DO类与一个数据库表对应，一个DO与数据库表中的一行对应）。

而领域对象是领域驱动设计（Domain Driven Design）中的一个概念。对领域驱动设计的解释，推荐大家参考一下阿里的盒马技术团队的文章。对领域对象的具体解释，推荐大家参考一下《领域驱动设计系列文章——浅析VO、DTO、DO、PO的概念、区别和用处》《浅析VO、DTO、DO、PO的概念、区别和用处》这两篇博文。
### DAO数据访问对象

DAO是数据访问对象（Data Access Object）的英文缩写。DAO是对数据库具体实现细节的封装、对数据库访问方法的抽象。[11] DAO通常需要依赖注入容器为其注入数据库连接对象之类的对象，因此DAO通常是一个EJB或者是Spring bean。

:::tip 再啰嗦两句  
作者认为，上文所说的BO、DTO、PO、VO（展现层对象）、DO和DAO，其作用、功能、职责都是有区别的，为了一个软件工程的结构清晰、软件的部件的功能明确，为了最大程度的软件的可拓展性、可移植性和可维护性，应该将这些对象分别放在不同的包（package）中，不要将这些对象混淆或合并在一起使用，虽然这样会使首次开发时的工作量增加。
:::

留坑:整理

## 项目结构

### package
 
- **类**名必须和**文件**名相同
- 每个文件只能有一个`public`类,也可以没有
- 每个public类都可以有`main`函数,但是只能运行**一个**(留坑,不懂为什么报错)
- 同一`package`下**不需要引入**可以互相调用类
- 不同`package`需要**引入**,同`src`下的文件引入
- 每个文件必须声明`package`,不同`package`用`.`区分,包下可以有包和文件**层级结构**,包名一律**小写**
- **重名**时可以声明包`day06.test.Person p=new day06.test.Person();`


### import用法

- 必须放在`package`之后类声明之前,JDK1.5之后可使用`import static`
- `import java.*;`这样写的话只会将java包下的类声明，而不不会声明子包的任何类,即不递归。
- 编译器自动引入1`java.lang1`,也就是默认内置包 
- 单类型导入(single-type-import)（`import java.util.ArrayList;`）
- 按需类型导入(type-import-on-demand)（`import java.util.*;`）,编译后的class会自动转为单类型导入,不会拖慢速度,但是会有重名风险
- java以这样两种方式导入包中的任何一个public的**类和接口**(只有public类和接口才能被导入)`
- 多次导入,也可编译通过。编译器会将**冗余**导入声明**忽略**.
- 导入的类或接口的简名(simple name)具有**编译单元作用域**。这表示该类型简名可以在导入语句所在的编译单元的任何地方使用.这并不意味着你可以使用该类型所有**成员**的简名,而只能使用**类型自身**的简名。
    - 例如: `java.lang`包中的`public`类都是自动导入的,包括`Math`和`System`类.但是,你不能使用它们的成员的简名`PI()`和`gc()`,而必须使用`Math.PI()`和`System.gc()`.你不需要键入的是`java.lang.Math.PI()`和`java.lang.System.gc()`。  

<br/>
<h3>static import</h3>
<br/>

`static import`导入的是静态成员，而`import`导入的是类或接口类型

```java
package com.assignment.test;

public class staticFieldsClass {
    static int staticNoPublicField = 0; 
    public static int staticField = 1;
    public static void staticFunction(){}
}
```
平时我们使用这些静态成员是用类名.静态成员的形式使用，即  
`staticFieldsClass.staticField`或者`staticFieldsClass.staticFunction()`  

```java
//**精准导入**
//直接导入具体的静态变量、常量、方法方法，注意导入方法直接写方法名不需要括号。
import static com.assignment.test.StaticFieldsClass.staticField;
import static com.assignment.test.StaticFieldsClass.staticFunction;

//或者使用如下形式：
//**按需导入**不必逐一指出静态成员名称的导入方式
//import static com.assignment.test.StaticFieldsClass.*;

public class StaticTest {
    public static void main(String[] args) {
        //这里直接写静态成员而不需要通过类名调用
        System.out.println(staticField);
        staticFunction();
    }
}
```
- `Static Import`无权改变无法使用本来就不能使用的**静态成员的约束**，上面例子的`StaticTest`和`staticFieldsClass`不是在同一个包下，所以`StaticTest`只能访问到`staticFieldsClass`中`public`的变量。使用了`Static Import`也同样如此。

- 导入的静态成员和本地的静态成员名字相同起了冲突，这种情况下的处理规则，是**本地优先**。

- **不同的类**（接口）可以包括**名称相同的静态成员**。例如在进行`Static Import`的时候，出现了“两个导入语句导入同名的静态成员”的情况。在这种时候，J2SE 1.5会这样来加以处理：
    - 如果两个语句都是精确导入的形式，或者都是按需导入的形式，那么会造成**编译错误**。
    - 如果一个语句采用**精确导入的形式**，一个采用**按需导入的形式**，那么采用**精确导入的形式的一个有效**。
- 去掉静态成员前面的类型名，固然有助于在频繁调用时显得**简洁**，但是同时也失去了关于**这个东西在哪里定义**的提示信息，理解或维护代码就呵呵了


### 输出目录
什么意思?




## 引用参考
- https://chinese.freecodecamp.org/forum/t/java-bean-ejb-spring-bean-pojo-bo-dto-po-vo-do-dao/69

- [1] DropDeadGorgias, Fvdham, JimmyShelter, 等．JavaBeans[M/OL]．https://en.wikipedia.org/wiki/JavaBeans, 引用于2018-09-05 10:11

- [2] Shaun Abram. JavaBeans vs Spring beans vs POJOs[J/OL]. http://www.shaunabram.com/beans-vs-pojos/, 引用于2018-09-05 10:16

- [3] Sun Microsystems, JavaBeans™ API specification Version 1.01-4[S/OL], 1997-08-08:9. http://download.oracle.com/otndocs/jcp/7224-javabeans-1.01-fr-spec-oth-JSpec/, 引用于2018-09-05 10:53

- [4] Sun Microsystems, JSR-000220 Enterprise JavaBeans v.3.0 Final Release[S/OL], 2006-05-08:30-35. http://download.oracle.com/otndocs/jcp/ejb-3_0-fr-eval-oth-JSpec/, 引用于2018-09-05 11:19

- [5] Spring Source, Core Technologies[M/OL], 2018-07-26. https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-introduction, 引用于2018-09-05 12:24

- [6] Chronist, WikiFan04, Graham87, 等. Plain old Java object[M/OL]. https://en.wikipedia.org/wiki/Plain_old_Java_object, 引用于2018-09-05 12:40

- [7] chunchill. 理解POCO[J/OL], 2011-01-08. http://www.cnblogs.com/shineqiujuan/archive/2011/01/08/1930911.html, 引用于2018-09-05 12:47

- [8] Spring Source. Understanding POJOs[M/OL]. https://spring.io/understanding/POJO, 引用于2018-09-05 12:54

- [9] 匿名. （持久对象 (persistent object)）[M/OL]. https://baike.baidu.com/item/Po/6446468, 引用于2018-09-05 18:27

- [10] hibernate.org. Working with objects[M/OL]. http://docs.jboss.org/hibernate/orm/3.3/reference/en/html/objectstate.html, 引用于2018-09-06 15:49

- [11] Anonymous. Data access object[M/OL]. https://en.wikipedia.org/wiki/Data_access_object, 引用于2018-09-05 14:34
<Valine></Valine>




类变量存在哪里?是不是和py一样有一个类变量?类变量能改变吗,全局共享一个吗?jvm回收所有引用该变量的实例之后类变量会被回收吗,类对象会被回收吗?  
循环调用前面可以输出,报错栈溢出,编译型语言不是应该先编译一次吗,为什么编译能通过  
删除了out下的class文件运行出错,但是重新build不会重新生成,build的机制是什么,不会识别文件吗  
static方法只能访问static变量为什么?
为什么这个例子中一定要用static  

## 内置包详解
1. java.lang---包含一些Java语言的核心类，如String、Math、Integer、System和Thread，提供常用功能。
2. java.net---包含执行与网络相关的操作的类和接口。
3. java.io---包含能提供多种输入/输出功能的类。
4. java.util---包含一些实用工具类，如定义系统特性、接口的集合框架类、使用与日期日历相关的函数。
5. java.text---包含了一些java格式化相关的类6.iava.sql---包含了java进行JDBC数据库编程的相关类/接口7. java.awt---包含了j构成抽象窗口工具集（abstract window toolkits）的多个类，这些类被用来构建和管理应用程序的图形用户界面（GUI）
8. java.applet---包含applet运行所需的一些类。  
   
Snipaste_2019-12-28_13-20-25.png  

<div align=center ><img src="./static/Snipaste_2019-12-27_22-00-44.png" style="height: 400px"/>
</div>

