---
title: java基础(2)
date: 2019-12-27 21:38:45
prev: ./java基础语法1.md
next: ./java基础语法2.md
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
### 封装和隐藏
- 隐藏一个类中不需要对外提供的实现细节;
- 使用者只能通过事先定制好的方法来访问数据，可以方便地加入控制逻辑，限制对属性的不合理操作;
- 便于修改，增强代码的可维护性;  
  
<br/>

  具体就是变量私有方法公有通过GetSet来获取改变,防止修改成一个奇奇怪怪的值  
  <br/>

### 构造析构
**构造方法**  

- 具有与`类`相同的名称
- 不声明返回值类型。（与声明为`void`不同）不能被`static`、`final`、`synchronized`、`abstract`、`native`修饰
- 不能有`return`返回值
- 不声明的话会有一个没有参数啥也不干的构造器
- 构造方法可以接受参数
- 构造方法和类的访问属性**一样**
- 可以**重载**,但是**不能被继承**

**析构方法**  
析构比较叼,放在jvm里面讲,java设计思路之一就是避免像c那样手动管理内存，以减少因程序员的疏误导致的内存溢出等问题。所以垃圾回收交给了jvm自己来做


### this
和python差不了很多,代指本类,避免重名,其他构造方法可以调用`this()`相当于先调用一次无参构造.  

- 1.使用this()必须放在构造器的首行！
- 2.使用this调用本类中其他的构造器，保证至少有一个构造器是不用this的。

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

## Java Bean
逻辑上定义的java写成的可重用的组件

## 引用参考

wu 
<Valine></Valine>




类变量存在哪里?是不是和py一样有一个类变量?类变量能改变吗,全局共享一个吗?jvm回收所有引用该变量的实例之后类变量会被回收吗,类对象会被回收吗?  
循环调用前面可以输出,报错栈溢出,编译型语言不是应该先编译一次吗,为什么编译能通过  
删除了out下的class文件运行出错,但是重新build不会重新生成,build的机制是什么,不会识别文件吗  
static方法只能访问static变量为什么?
为什么这个例子中一定要用static  



