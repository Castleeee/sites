---
title: java基础☕️(3)
date: 2019-12-27 21:38:45
prev: ./java基础语法2.md
next: ./java基础语法4.md
categories: backEnd
tags:
- 语言基础
- 所有文章
- 后端
- java☕️
---

:::tip   奥力给!!<br/>
面向对象基本完成,下一步是其他的
:::

<!-- more -->

## 类的冷知识
### instanceof
**instanceof** 是 Java 的保留关键字。它的作用是测试它左边的对象是否是它右边的类的实例，返回 boolean 的数据类型,`x instanceof V`  
**子类对象完全可以顶替父类对象**,会判断为true
### Object
所有类的基类,如果未声明extend父类的时候,默认继承**Object**,如果你的参数不知道会传入个什么类但是一定会传入某个类的时候,那就可以写个**Object**  
- Object的重要方法:
    - `public Object();`构造方法
    - `public boolean equals(Object obj)`
      - 判断是不是**同一个**对象,是不是在**堆**中指向**同一块**内存地址
    - `public int hashCode()`返回哈希码
    - `public String toString()`打印当前对象的内存地址
### 对象类型转换
父类到子类的转换必须通过强制类型转换,从子类到父类的转换是自动进行的,无继承关系不能转换  
### 比较
判断是不是**同一个**对象,两个引用是不是在**堆**中指向**同一块**内存地址  
用“==”进行比较时，符号两边的数据类型必须兼容（可自动转换的本数据类型除外），否则编译出错；  
当用a.equals(b)方法进行比较时，对类`File`、`String`、`Date`及包装类（`Wrapper class`）来说，是比较`类型及内容`而不考虑引用的是否是同一个对象;因为在这些类中**重写**了Obiect类的equals()方法。  

https://www.cnblogs.com/dolphin0520/p/3681042.html 留坑 hashcode和equal牵扯到后面collection

## 包装类
对八种基本数据类型的封装
`boolean`->`Boolean` 
`byte`->`Byte` 
`short`->`Short` 
`int`->`Integer` 
`long`->`Long` 
`char`->`Character` 
`float`-> `Float` 
`double`->`Double`   
装箱就是把数据封装成包装类的过程,反之叫拆箱.
```java
int a=299;
Integer A=new Integer(a);//通过传入变量构造装箱
Float F1=new Float("5.24f");//通过字符串构造,但是必须是要符合格式,否则报错
int b=A.intValue();//可以获得拆箱后的值
// byteValue() intValue() shortValue() doubleValue() floatValue() longValue()
Float F=51.12f;//自动装箱
float f=F;//自动拆箱
```
通过包装类的`int i =Xxx.parseXxx("45")`把字符串转为基本数据类型  
用`String i=String.valueOf(425)`把基本数据类型转为字符串  
```java
String s0=F.toString();//包装类转换为字符串
String s1=String.valueOf(f);//将基本数据类型转为字符串.
String s2=f+"";//直接+连接
```
:::warning
`toString()`是Object的方法,如果没有重写就会直接返回这个对象的内存地址.  
显然包装类重写了
:::
## 几个关键字
### static
当我们编写一个类时，其实就是在描述其对象的属性和行为，而并没有产生实质上的对象，只有通过new关键字才会产生出对象，这时系统才会分配内存空间给对象，其方法才可以供外部调用,static就是提前直接声明好,不用子类对象就可以调用,所有的对象都是用一份数据,static变量保存在 Class 实例的尾部,随类加载,Class 对象确实在堆中
- static一般是类变量,不用实例化就能使用
- 一般用**类变量方式**访问不用实例变量访问
- 所有实例化类型**共享**
- 可以修饰 **属性** **方法** **代码块** **内部类**
- 在static方法中调用本身的静态变量时,要用类变量方式访问,**不能使用this和super**
### 单例模式
饿汉式
```java

```
懒汉式
```java

```
留坑 static的作用和c++ static的区别,单例模式懒汉式和饿汉式71集  
https://blog.csdn.net/fengyuzhengfan/article/details/38082999  
https://blog.csdn.net/lyf52010/article/details/76785318  
https://www.cnblogs.com/grandyang/p/4778038.html  
https://www.runoob.com/design-pattern/singleton-pattern.html  

:::tip main
由于JVM需要调用类的`main()`方法，所以该方法的访问权限必须是public，又因为JVM在执行`main()`方法时不必创建对象，所以该方法必须是`static`的，该方法接收一个`String`类型的数组参数保存执行java命令时传递的参数,JVM有限制，不能有返回值，因此返回值类型为`void`
:::

### final  

修饰**类** **属性** **方法**,修饰之后类**不能被继承**,属性**不能被修改**变为**常量**,全**大写**_连接必须被显式赋值且只能被赋值一次,方法**不能被子类重写**  
`static final A`全局常量  
  
### 初始化块
在类初始化时:  
1. 类的属性的默认初始化和显示初始化
3. 执行构造器的代码
2. 执行代码块的代码
   - 如果有多个代码块按照编写顺序执行
```java
package com.company;

public class Codeblock {
    int an=5;
    String name;
    public Codeblock(String name){
        this.name=name;
        System.out.println("构造方法");
    }
//非静态代码块
    {
        System.out.println(an+"非静态代码块1");
    }
    {
        System.out.println(an+"非静态代码块2");
    }
    {
        System.out.println(an+"非静态代码块3");
    }
//静态代码块
    static{
        System.out.println("静态代码块");
    }
}
//程序结果
// 静态代码块
// 5非静态代码块1
// 5非静态代码块2
// 5非静态代码块3
// 构造方法
// 5非静态代码块1
// 5非静态代码块2
// 5非静态代码块3
// 构造方法

```
代码块只执行一次,先执行静态代码块,也是按顺序执行,可以输出初始化,静态只可访问静态成员,非静态可以访问静态和非静态  
static代码块多用于初始化static成员变量或复杂对象属性.  

## 抽象类
- 抽象类是用来模型化那些父类无法确定全部实现，而是由其子类提供具体实现的对象的类。  
- `abstract`修饰类那这个类就是抽象类,修饰方法这个方法就是抽象方法,只有在抽象类里才能声明抽象方法,类中里含有抽象方法的就是抽象类.  
- 抽象类不能实例化,但是必须被继承,然后实现抽象方法,可以不全实现,但是不全实现那还是抽象类,需要继续被继承.构造方法可以有但是不能调用也不能声明为抽象方法
- 不能修饰**属性** **构造器** **静态方法** **私有方法** **final**
### 模板方法
留坑
```java

```
## 接口interface
一套用来解决多继承问题的方式

- 用`interface`来定义。
- 所有成员变量都默认是由`public static final`修饰的。
- 所有方法都默认是由`public abstract`修饰的。
- 没有构造器。
- 接口可以多层继承。
- 类可以继承多个接口  
- 类如果不实现继承的所有接口,就要定义成抽象类
- 既继承又实现接口的时候,优先继承然后再实现接口
  
<br/>

这是接口继承了接口,类继承了两个接口

```java
package com.test;

public interface TestIn {
    int test0=0;
    public void setTest0();

}
//------------------------------------------
package com.test;

public interface TestIn1 extends TestIn{
    int test1=1;
    public void setTest1();

    @Override
    void setTest0();
}
//------------------------------------------
package com.test;

public interface TestIn2 {
    int test2=2;
    public void setTest2();
}
//------------------------------------------
package com.test;

public class letmego implements TestIn2,TestIn1{
    int aaa=5;

    @Override
    public void setTest1() {
        System.out.print(test0);
    }

    @Override
    public void setTest0() {
        System.out.print(test1);
    }

    @Override
    public void setTest2() {
        System.out.print(test2);
        System.out.print(test1);
    }
}

```

:::warning 思考:抽象类也能实现抽🐘功能,为什么还需要接口?<br/>
当你的抽象方法已经被实现,然后这个时候需要修改逻辑,但是一旦改动了抽象类,子类因为没有实现新增的抽象方法,都不能使用了,但是接口就不会.也就是说抽象基类必须保持稳定.
:::

描述会唱歌的厨子是个好老师;
```java
```
### 工厂模式
用接口实现工厂模式
```java
```
## 内部类
另一套解决不能多重继承的问题.
### 成员内部类
### 匿名内部类
留坑:https://www.cnblogs.com/nerxious/archive/2013/01/25/2876489.html  
https://www.cnblogs.com/chenssy/p/3390871.html  
https://www.zhihu.com/question/26954130  
https://blog.csdn.net/hikvision_java_gyh/article/details/8964155
https://www.cnblogs.com/chenssy/p/3388487.html

***面向对象完成!!!!***

## 引用参考
- https://blog.csdn.net/fengyuzhengfan/article/details/38082999  
- https://blog.csdn.net/lyf52010/article/details/76785318  
- https://www.cnblogs.com/grandyang/p/4778038.html  
- https://www.runoob.com/design-pattern/singleton-pattern.html  
<Valine></Valine>


为啥不放在构造里?or非静态放构造里静态放静态块里?