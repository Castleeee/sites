---
title: java基础☕️(5)
date: 2019-12-27 21:38:45
prev: ./java基础语法3.md
next: ./java基础语法5.md
categories: backEnd
tags:
- 语言基础
- 所有文章
- 后端
- java☕️
---

:::tip   快了快了!!<br/>
java是全世界最好的语言!
:::

<!-- more -->

## 枚举和注解
### 枚举类
- 使用enum定义的枚举类默认继承了`java.lang.Enum`类
- 枚举类的构造器只能使用**private** 访问控制符
- 枚举类的所有实例必须在枚举类中**显式列出**,逗号分隔分号结束系统**自动添加**`public static final` 
- 修饰所有的枚举类都提供了一个values方法，可以**遍历**所有的枚举值
- 所有的枚举类对象在**内存中只有一个**,相当于单例模式
- 可以在`switch`表达式中使用枚举类的对象**作为表达式**，`case`子句可以直接使用枚举值的名字**无需声明**
- 若枚举只有一个成员，则可以作为一种**单例模式**的实现方式
- 枚举类也可以**实现接口**

```java
/**
 * FileName: EnumTest
 * Author:   ooowl
 * Date:     12/30/2019 9:21 PM
 * Description: 测试enum
 */

public class EnumTest
{
    public static void main(String args[]) {
        Seasons spring1=Seasons.SPRING;//获取一个Season的对象
        spring1.showInfo();
        Seasons spring2=Seasons.SPRING;//获取一个Season的对象
        System.out.println(spring1.equals(spring2));
    }
}
enum Seasons{
    //声明枚举实例
    SPRING("春天","春暖花开"),//相当调用了私有构造方法,在静态区申请了单例
    SUMMER("夏天","夏日炎炎"),
    AUTUMN("秋天","秋高气爽"),
    WINTER("冬天","凌冽寒冬");
    
    //声明枚举类的属性
    private final String name;
    private final String desc;

    //构造函数
    private Seasons(String name, String desc){
        this.desc=desc;
        this.name=name;
    }
    
    // 其他方法
    public void showInfo(){
        System.out.println(this.name+":"+this.desc);
    }

}
```
## 注解
Java 定义了一套注解，共有 7 个，3 个在 java.lang 中，剩下 4 个在 `**java.lang.annotation`** 中

1. 作用在代码的注解是

    - **`@Override`** - 检查该方法是否是重载方法。如果发现其父类，或者是引用的接口中并没有该方法时，会报编译错误。
    - **`@Deprecated`** - 标记过时方法。如果使用该方法，会报编译警告。
    - **`@SuppressWarnings`** - 指示编译器去忽略注解中声明的警告。

2. 作用在其他注解的注解(或者说 元注解)是:

    - **`@Retention`** - 标识这个注解怎么保存，是只在代码中，还是编入class文件中，或者是在运行时可以通过反射访问。
    - **`@Documented`** - 标记这些注解是否包含在用户文档中。
    - **`@Target`** - 标记这个注解应该是哪种 Java 成员。
    - **`@Inherited`** - 标记这个注解是继承于哪个注解类(默认 注解并没有继承于任何子类)

3. 从 Java 7 开始，额外添加了 3 个注解:

    - **`@SafeVarargs`** - Java 7 开始支持，忽略任何使用参数为泛型变量的方法或构造函数调用产生的警告。
    - **`@FunctionalInterface`** - Java 8 开始支持，标识一个匿名函数或函数式接口。
    - **`@Repeatable`** - Java 8 开始支持，标识某注解可以在同一个声明上使用多次。  


:::tip
暂时注解了解知道就行,看到之后明白是个什么东西,以后再深入了解
:::
## Java IO
IO是语言的重中之重.  

## 内置包详解
1. java.lang---包含一些Java语言的核心类，如String、Math、Integer、System和Thread，提供常用功能。
2. java.net---包含执行与网络相关的操作的类和接口。
3. java.io---包含能提供多种输入/输出功能的类。
4. java.util---包含一些实用工具类，如定义系统特性、接口的集合框架类、使用与日期日历相关的函数。
5. java.text---包含了一些java格式化相关的类6.iava.sql---包含了java进行JDBC数据库编程的相关类/接口7. java.awt---包含了j构成抽象窗口工具集（abstract window toolkits）的多个类，这些类被用来构建和管理应用程序的图形用户界面（GUI）
8. java.applet---包含applet运行所需的一些类。   
<div align=center ><img src="./static/Snipaste_2019-12-28_13-20-25.png" style="height: 600px"/>`
</div>

## 引用参考
- [菜鸟注解](https://www.runoob.com/w3cnote/java-annotation.html)
- [java注解求职讲堂pdf:ddcg](https://pan.baidu.com/s/1Xk-zeauimySygjNy1skT5A#list/path=%2F2019Java%E6%B1%82%E7%9F%A5%E8%AE%B2%E5%A0%82%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E8%AF%BE%E4%BB%B6%E6%BA%90%E4%BB%A3%E7%A0%81%2Fday11%2F%E8%B5%84%E6%96%99)
<Valine></Valine>


