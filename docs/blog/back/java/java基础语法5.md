---
title: java基础☕️(5)
date: 2019-12-27 21:38:45
prev: ./java基础语法4.md
next: ./java基础语法6.md
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

按操作数据单位不同分为：字节流(8bit),字符流(16bit)  
按数据流的流向不同分为：输入流，输出流  
按流的角色的不同分为：节点流，处理流  
IO流四十多种,但是非常规则,都是从四个抽象基类进化而来的,子类的后缀都是这四个  


|抽象基类|字节流|字符流|
|:---:|:---:|:---:|
|输入流|InputStream|Reader|
|输出流|OutputStream|Writer|  


眼熟一下Java的IO流体系  


<font size=2>

|分类|字节输入流|字节输出流|字符输入流|字符输出流|
|:-----:|:-----:|:-----:|:-----:|:-----:|
|抽象基类|InputStream|OutputStream|Reader|Writer|
|访问文件|FileInputStream|FileOutputStream|FileReader|FileWriter|
|访问数组|ByteArrayInputStream|ByteArrayOutputStream|CharArrayReader|CharArrayWriter|
|访问管道|PipedInputStream|PipedOutputStream|PipedReader|PipedWriter|
|缓冲流|BufferedInputStream|BufferedOutputStream|BufferedReader|BufferedWriter|
|转换流|||InputStreamReader|OutputStreamWriter|
|对象流|ObjectInputStream|ObjectOutputStream|
|抽象基类|FilterInputStream|FilterOutputStream|FilterReader|FilterWriter|
|打印流||PrintStream||PrintWriter|
|特殊流|DataInputStream|DataOutputStream|||

</font>

### File类
`java.io.File`是可以**新建删除重命名目录和文件**,但是不能访问文件内容,要访问必须使用IO流  
把文件路径当作参数传入,`\`是转义,`\\`和`/`和`File.separator`是目录  

- `getPath()`获得路径
- `getAbsolutePath()`获得绝对路径
- `getAbsoluteFile()`获得带文件名的绝对文件
- `getParent()`获得文件的父文件夹
- `renameTo(new File("D:/Test/xxxx"))`重命名
- `exists()`是否存在
- `canExecute()`是否可执行
- `canRead()`是否可读
- `canWrite()`是否可写
- `isFile()`是不是文件
- `isDirectory()`是不是目录
- `lastModified()`最后修改时间
- `length()`返回文件长度,默认是字节数
- `createNewFile()`创建文件
- `delete()`删除文件
- `mkdir()`创建文件夹,mkdirssh可以递归创建
- `list()`列出文件夹和文件String类型数组
- `listFiles()`列出文件夹和文件,File类型数组
  
```java
package javaioPractice;

import javax.swing.*;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;

public class FileP {
    public static void main(String args[]) {
        System.out.println("hello world");
        File f1 = new File("D:"+File.separator+"Test\\sad.txt");
        //访问文件名
        System.out.println(f1.getName());
        File f2=new File("src/javaioPractice/xxx");
        System.out.println("f2.exists()"+f2.exists());
        System.out.println("f2.getPath()"+f2.getPath());
        System.out.println("f2.getAbsolutePath()"+f2.getAbsolutePath());
        System.out.println("f2"+f2);
        System.out.println("f2.getAbsoluteFile()"+f2.getAbsoluteFile());
        System.out.println("f1.getParent()"+f1.getParent());
        f2.renameTo(new File("D:/Test/xxx"));
        File f3=new File("D:/Test/xxx");
        System.out.println("f3.exists()"+f3.exists());
        System.out.println("f3.canExecute()"+f3.canExecute());
        System.out.println("f3.canRead()"+f3.canRead());
        System.out.println("f3.canWrite()"+f3.canWrite());
        System.out.println("f3.isFile()"+f3.isFile());
        System.out.println("f3.isDirectory()"+f3.isDirectory());
        System.out.println("f3.lastModified()"+f3.lastModified());
        System.out.println("f3.length()"+f3.length());
        File f4= new File("D:/Test/x3.txt");
        if(!f4.exists()){
            try{
                f4.createNewFile();
            }catch (IOException e){
                e.printStackTrace();
                System.out.println(e.getMessage());
            }
        }
        f2.delete();
        File f5=new File("D:/Test/aa/bb") ;
        f5.mkdir();
        File f6=new File("D:/Test");
        String fl[]=f6.list();//注意返回的是String,包括目录和文件
        for (String s:fl) {
            System.out.println(s);
        }
        File[] fs=f6.listFiles();//这次返回的是File对象
        for (File f  : fs) {
            System.out.println(f);
        }
        Traversal t= new Traversal();
        try{
            t.Travers(new File("D:/Test"));
        }catch (IOException e){
            e.printStackTrace();
        }

    }
}

class Traversal{//递归遍历文件夹
    public void Travers(File f) throws Exception {
        if (!f.exists()){
            Exception e=new IOException();
            throw e;
        }
        if (f.isFile()){
            System.out.println(f);
        }else if(f.isDirectory()){
            for (File f1  :f.listFiles() ) {
                System.out.println(f);
                Travers(f1);
            }
        };
    }
}

```
:::danger 注意
renameTo之后原来的File对象并没有改变,需要重新申请一个新位置的文件
:::
### 文件IO流
流程
- 使用`FileInputStream`,也是传入一个path
- `byte b[]=new byte[10]`申请一个byte区存字节
- 使用`in.read(b)`读取字节
  - `in.read`方法有一个返回值，返回值是读取的数据的长度，如果读取到最后一个数据，还会向后读一个也就是说当in.read的返回值是-1的时候整个文件就读取完毕了
  - 一般使用while防止最后一次读出一些奇怪的东西
- `in.close()`记得一定要关掉
- 注意文件可能打不开,需要用try-cache

输出流要先转化为byte
```java
package javaioPractice;

import java.io.*;

public class FileIO {
    public static void main(String args[]) {
        System.out.println("hello world");
        IOclass t=new IOclass();
//        t.inS("D:\\Test\\sad.txt");
//        t.outS("D:\\Test\\sad1.txt");
        t.cpf("D:\\Test\\sad.txt","D:\\Test\\sadx.txt");

    }
}
class IOclass{
    public void inS(String Dir){
        try{
            FileInputStream in=new FileInputStream(Dir);
            //BufferedInputStream br=new BufferedInputStream(in);
            byte b[]=new byte[10];
            int len =0;//为啥是0
            //in.read(b);
            while((len=in.read(b))!=-1){//while((len=br.read(b))!=-1)//使用缓冲字节流
                System.out.print(new String(b,0,len));
                //参数1是缓冲数据的数组，参数2是从数组的哪个位置开始转化字符串，参数3是总共转化几个字节
            }
            //br.close();//使用缓冲字节流
            in.close();
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            System.out.println("");
            System.out.println("输出完毕!--------------------------");
        }
    }
    public void outS(String Dir){
        try {
            FileOutputStream os=new FileOutputStream(Dir);
            //BufferedOutputStream bo=new BufferedOutputStream(os);
            String s="sdsadvsjdksa";//申请字符串
            os.write(s.getBytes());//把字符串转化为byte,写到内存,然后写入文件
            //bo.write(s.getBytes());//把字符串转化为byte,写到内存,然后写入内存
            //bo.flush();//刷到硬盘
            //bo.close();
            os.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void cpf(String src,String dst){

        try {
            FileInputStream in=new FileInputStream(src);
            FileOutputStream os=new FileOutputStream(dst);
            byte b[]=new byte[10];
            //in.read(b);
            while(in.read(b)!=-1){
                os.write(b);
                //参数1是缓冲数据的数组，参数2是从数组的哪个位置开始转化字符串，参数3是总共转化几个字节
            }

            in.close();
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
`FileReader,FileWriter`和IOStream一样,只不过要换成char数组来存放  
不过字符流只适合操作字符内容的文件,二进制和字节不合适  
### 缓冲字节流
`Bufferedlnputstream` 和 `BufferedOutputstream`套在`FileInputStream`和`FileOutputStream`上用  
`BufferedReader `和 `BufferedWriter`套在`Reader`和`Writer`上用  
缓冲流要“**套接**”在相应的节点流之上，对读写的数据提供了缓冲的功能，提高了读写的效率，同时增加了一些新的方法对于输出的缓冲流，写出的数据会先在**内存中缓存**，使用`flush()`将会使内存中的数据立刻写出  
关闭的时候按照栈顺序.
代码在上面注释里,字符流知识把类换换,没啥区别.  
### 转换流


## 反射机制
## 引用参考
- [菜鸟注解](https://www.runoob.com/w3cnote/java-annotation.html)
- [java注解求职讲堂pdf:ddcg](https://pan.baidu.com/s/1Xk-zeauimySygjNy1skT5A#list/path=%2F2019Java%E6%B1%82%E7%9F%A5%E8%AE%B2%E5%A0%82%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E8%AF%BE%E4%BB%B6%E6%BA%90%E4%BB%A3%E7%A0%81%2Fday11%2F%E8%B5%84%E6%96%99)
<Valine></Valine>


