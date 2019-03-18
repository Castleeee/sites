---
title: C/C++基础
date: 2019-2-15 16:26:45
categories: backEnd
tags:
- 语言基础
- 后端
- C/C++
- 错误记录
---


:::tip
考研需要c++，回忆一下语言基础。<br/>
因为不是专精底层，记录错误和踩到的坑
:::
<!-- more -->

<div align="center"><h1>C语言</h1></div>

## C

## 变量和类型
1B=8bit<br/>
1kB=1024B<br/>
1mB=1024kB<br/>
1GB=1024MB<br/>
1TB=1024GB<br/>
1PB=1024TB<br/>
- 先定义后使用
- 字母数字下划线,不能数字开头

### 整数类型

|类型	|存储大小	|值范围|
|---------:|:-------:|:--------|
|char	|1 字节	|-128 到 127 或 0 到 255|
|unsigned char	|1 字节	|0 到 255|
|signed char	|1 字节	|-128 到 127|
|int	|2 或 4 字节	|-32,768 到 32,767 或 -2,147,483,648 到 2,147,483,647|
|unsigned int|	2 或 4 字节|	0 到 65,535 或 0 到 4,294,967,295|
|short	|2 字节	|-32,768 到 32,767|
|unsigned short|	2 字节|	0 到 65,535|
|long	|4 字节	|-2,147,483,648 到 2,147,483,647|
|unsigned long|	4 字节	|0 到 4,294,967,295|

### 浮点数类型
类型|	存储大小	|值范围|	精度|
|----:|:------:|:-----:|:----|
|float|	4 字节	|1.2E-38 到 3.4E+38	|6 位小数|
|double	|8 字节|	2.3E-308 到 1.7E+308	15 |位小数|
|long double	|16 字节|	3.4E-4932 到 1.1E+4932	|19 位小数|

### 类型定义
变量是有地址中的一个`值`和`名字`构成的.<br/>
在定义中不允许连续赋值，如int a=b=c=5;是不合法的。

### 类型转换
字符型变量的值实质上是一个8位的整数值，因此取值范围一般是-128～127，char型变量也可以加修饰符unsigned，则unsigned char 型变量的取值范围是0～255(有些机器把char型当做unsighed char型对待， 取值范围总是0～255)。
- 浮点数赋给整型，该浮点数小数被舍去；
- 整数赋给浮点型，数值不变，但是被存储到相应的浮点型变量中； 
强制类型转换的时候:<br/>
自动类型转换:**char->int->double<-char**<br/>
强制类型转换:**char,short->unsigned->long->double<-float**<br/>
不能逆序,会有信息损失，分数转成整数就会舍掉小数位,char类型数据转换为int类型数据遵循ASCII码中的对应值<br/>
看<a href="https://blog.csdn.net/ce123_zhouwei/article/details/9104681">这里</a><br/>
`int a=5;`<br/>
`double_a=(double) a;`#类型转换不会影响原来的值<br/>
### 字符&字符串
<h4>字符</h4>

定义字符用`char`来定义(实质上是ascii的编码的int)，所占空间和范围见上表，占位符使用`%c`
```c
char q='a'
char x='x';
printf("%d,%c",x,x);
```
声明一个字符，但是我们用整型输出，就会输出它对应的ASCII码数字了,char只能存储一个字符，它的取值范围是：ASCII码字符 或者 -128~127的整数
:::danger
用`''`单引号，切忌，千万不能用双引号，双引号是来表示字符串的。
:::
<h4>字符串</h4>

c中没有string。c的字符串是以null`'/0'`结尾的一维字符数组，字符数量会比实际显示的字符数多1，可以简写为`char yy[] = "Hello";`
```c
char xx[4]={'x','y','z','\0'};
char yy[]="hello";
printf("%s,%s",xx,yy);
```
c基本的几个函数(等后面c++里还会变)

|序号	|函数  |目的|
|----:|:------:|:------:|
|1	|strcpy(s1, s2);|复制字符串 s2 到字符串 s1。|
|2	|strcat(s1, s2);|连接字符串 s2 到字符串 s1 的末尾。|
|3	|strlen(s1);|返回字符串 s1 的长度。|
|4	|strcmp(s1, s2);|如果 s1 和 s2 是相同的，则返回 0；如果 s1<s2 则返回小于 0；如果 s1>s2 则返回大于 0。|
|5	|strchr(s1, ch);|返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置。|
|6	|strstr(s1, s2);|返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置。|
----from 菜鸟教程


## 常量
### define
`#define X 3`定义了X为3，利用宏定义，不能改变，不做计算，不做表达式求解
- define宏是在预处理阶段展开。
- define宏没有类型，不做任何类型检查，仅仅是展开
- define宏仅仅是展开，有多少地方使用，就展开多少次，不会分配内存。
:::tip 冷知识
宏定义不分配内存，变量定义分配内存<br/>
比如说C语言标准规定编译器至少支持宏的名字有63个字符（多的话意义不能保证），至少支持同时定义4095个宏，函数形的宏最多可能有127个参数
:::
<a href='https://blog.csdn.net/clever101/article/details/8053510'>define的上限</a>

### const
`const 变量类型 X=3`使用const定义了X为3
- const常量是编译运行阶段使用。
- const常量有具体的类型，在编译阶段会执行类型检查
- const常量会在内存中分配(可以是堆中也可以是栈中)
const  可以节省空间，避免不必要的内存分配看代码
```c
#define PI 3.14159 //常量宏
const doulbe Pi=3.14159; //此时并未将Pi放入ROM中
double i=Pi; //此时为Pi分配内存，以后不再分配！
double I=PI; //编译期间进行宏替换，分配内存
double j=Pi; //没有内存分配
double J=PI; //再进行宏替换，又一次分配内存！
```
:::warning
const定义常量从汇编的角度来看，只是给出了对应的内存地址，而不是象#define一样给出的是立即数，所以，const定义的常量在程序运行过程中只有一份拷贝（因为是全局的只读变量，存在静态区），而 #define定义的常量在内存中有若干个拷贝。
<br/>编译器通常不为普通const常量分配存储空间，而是将它们保存在符号表中，这使得它成为一个编译期间的常量，没有了存储与读内存的操作，使得它的效率也很高。
:::
一些规则<br/>
- 有些集成化的调试工具可以对const常量进行调试，但是不能对宏常量进行调试。
- 在C++ 程序中只使用const常量而不使用宏常量，即const常量完全取代宏常量。
- 需对外公开的常量放在头文件中，不对外公开的常量放在定义文件头部,可以把不同模块的常量集中放在一个公共头文件中
- 如果某一常量与其它常量密切相关，应在定义中包含这种关系，而不应给出一些孤立的值。

:::danger
const数据成员只在某个对象生存期内是常量，而对于整个类而言却是可变的，因为类可以创建多个对象，不同的对象其const数据成员的值可以不同,应该用类中的枚举常量来实现
:::

## 输入输出

### 占位符
格式字符有d,o,x,u,c,s,f,e,g等。 

|类型|作用|
|----:|:----|
|％d&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|整型输出|
|％ld&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|长整型输出，|
|％o&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|以八进制数形式输出整数，|
|％x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|以十六进制数形式输出整数，或输出字符串的地址。|
|％u&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|以十进制数输出unsigned型数据(无符号数)。|
|％c&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|用来输出一个字符，|
|％s&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|用来输出一个字符串，|
|％f&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|用来输出实数，以小数形式输出，默认情况下保留小数点6位。|
|%.100f&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|用来输出实数，保留小数点100位。|
|％e&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|以指数形式输出实数，|
|％g&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|根据大小自动选f格式或e格式，且不输出无意义的零。|


:::warning
%d与%u有无符号的数值范围，也就是极限的值，不然数值打印出来会有误。
:::
### 特殊符号
6个特殊符号

|符号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意义|ascii对应|
|---:|:---|:----|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;空格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\u0020|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;换页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'\f'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;换行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'\n'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\u0010|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'\r'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\u0013|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水平制表符&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'\t'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\u0009|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;垂直制表符&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'\v'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||

### 运算符
常见的我就不放了，注意`%`是取余数

|等级|运算符|
|----:|:----|
|1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（ ）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！ &nbsp;+（正号）&nbsp; -（负号）&nbsp; ++ &nbsp;--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *&nbsp; /&nbsp; %&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+（加）&nbsp; -（减）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;< &nbsp;<= &nbsp;>= &nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;==&nbsp; !=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&&&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**||**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
|9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ?:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp; += &nbsp;-=&nbsp;*=&nbsp;/=&nbsp;%=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |

:::warning
注意：复合运算符中运算符和等号之间是不存在空格的。
:::

## 分支循环
### if 语句
分支循环时
```c
if (i==10){
    printf("%d",i);
}else{
    printf("%d",a);
}
```
嵌套if的时候是有域的定义的，注意变量的作用域
```c
if (i==6){
     printf("%d",i);
 }else{
     int i=5;
         if (i==5){
             printf("%d",i);
         }
     printf("%d",a);
 }
```
:::danger
if和else后面不要加分号
:::
### for 语句
使用for语句应该注意：
1. for循环中的“表达式1. 2. 3”均可可以缺省，但分号(;)不能缺省。
2. 省略“表达式1（循环变量赋初值）”，表示不对循环变量赋初始值。如：
```c
    int i =1;
    for (;i<=10;i++) {
        printf("start %d\n",i);
    }
```
3. 省略“表达式2(循环条件)”，不做其它处理，循环一直执行（死循环）。如：
```c
    int i;
    for ( i=0;;i++){
        printf("%d",i);

    }
```
4. 省略“表达式3(循环变量增量)”，不做其他处理，循环一直执行（死循环）。如：
```c
    int i
    for ( i=0;i<=10;){
        printf("%d",i);

    }
```
5. 表达式1可以是设置循环变量的初值的赋值表达式，也可以是其他表达式。如：
```c
    int sun,moon;
    sun=0;
    for (moon =0;sun<10;moon++,++sun)
        printf("sun:%d,moon%d",sun,moon);
    }
```
6. 表达式1和表达式3可以是一个简单表达式也可以是多个表达式以逗号分割。如：
    - 同上
7. 表达式2一般是关系表达式或逻辑表达式，但也可是数值表达式或字符表达式，只要其值非零，就执行循环体。
```c
    int sun,moon;
    sun=0;
    for (moon =0;sun<10&&moon;moon++,++sun)
    printf("sun:%d,moon%d",sun,moon);
    }
```
8. 各表达式中的变量一定要在for循环之前定义。如：


:::danger
函数块，if()后面没有分号，直接写{}，else后面也没有分号，直接写{} 可以嵌套
:::
### while语句
若o不为空则一直执行
```c
int o=4;
while(o){
    printf("%d",o);
}
```
do while会先执行一次语句然后在执行while判断。
```c
do {
    printf("%d", o);
}
while (o);

```
:::danger
do while后面有分号
:::
### switch语句
```c
    int score=87;
    switch(score){
        case 10:
            printf("%d",0);
        case 87:
            printf("%d",87);
            break;
        case 85:
            printf("%d",87);
            //不要使用continue;
    }
```
1. 在case后的各常量表达式的值不能相同，否则会出现错误。
2. 在case子句后如果没有break;会一直往后执行一直到遇到break;才会跳出switch语句。
3. switch后面的表达式语句只能是整型或者字符类型。
4. 在case后，允许有多个语句，可以不用{}括起来。
5. 各case和default子句的先后顺序可以变动，而不会影响程序执行结果。
6. default子句可以省略不用

## 含树🌳
就是可复用的代码块<br/>
>返回值 &nbsp;&nbsp;函数名&nbsp;&nbsp; (参数){&nbsp;&nbsp;&nbsp;<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return 返回值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
}<br/>


返回值没有就写void,自定义函数尽量放在main函数之前，如果要放在main函数后面的话，需要在main函数之前先声明自定义函数<br/>声明格式为：`返回值类型 函数名(参数);`
```c
void f(int,int);
int main() {

f();
}
void f(int a,int b){
    printf("da sha bi");
}

```
void 可以有`return;`其他的函数可以`return x;`或`return (x);`
### 参数
<h4>形参和实参</h4>
分型参和实参,形参是在定义函数名和函数体的时候使用的参数,目的是用来接收调用该函数时传入的参数，实参就是实际使用到的参数。

- 形参只有在被调用时才分配内存单元，在调用结束时会释放所分配的内存单元。
- 实参可以是`常量` `变量` `表达式` `函数`等，无论实参是何种类型的量，在进行函数调用时，它们都必须具有确定的值，以便把这些值传送给形参,应预先用赋值等办法使实参获得确定值。
- 在参数传递时，实参和形参在数量上，类型上，顺序上应严格一致，否则会类型不匹配


<h4>不定长参数</h4>

不定长参数需要先引入`#include <stdarg.h>`,函数的第一个参数需要int，指明传进来多少，然后是三个...<br/>

函数体内拿到一个数组，赋值给另一个已知类型的数组，然后清理内存就拿到了。
```c
#include <stdarg.h>
...
int main()
{
    double x=f1(2,22,55);
    return 0;
}
...
double f1(int a,...){
    double res=0;
    va_list valist;//定义一个va_list数组
    va_start(valist,a);//将数组初始化
    for (int i=0;i<a;i++){//循环访问
        double temp=double(va_arg(valist,int));//注意这个函数每次调用拿到一个,不使用下标
        printf("%f\n",temp);
        res+=temp;
    }
    va_end(valist);
    return res/a;
}
```

:::danger
实际的可变参数的个数必须比前面强制参数中指定的个数要多，或者不小于。也即后续参数多一点不要紧，但不能少！如果少了则会访问到函数参数以外的堆栈区域，这可能会把程序搞崩掉。前面强制参数中指定的类型和后面实际参数的类型不匹配也有可能造成程序崩溃
<br/>va_arg(valist,int);//注意这个函数每次调用拿到一个，无论什么时候，不使用下标(栈)
:::
### 递归
定义:在含树体中自己调用自己，执行递归函数将反复调用其自身，每调用一次就进入新的一层。递归需要有边界条件、递归前进段和递归返回段。
```c

```


:::tip
递归是非常消耗空间的。每次进行递归都会为函数开辟新的栈空间,容易栈溢出，大部分的递归都可以改写成非递归
:::


### 闭包
不支持闭包但是可以通过`Lambda`和`struct`嵌套定义来实现。用到再说
## 变量存储机制

### 局部&全局
global和local在一个代码块中新定义的变量在代码块使用结束后就会释放，不能在外面调用。全局变量可以直接调用，如果在代码块中定义了和外面相同名字的变量就优先使用local的变量。
:::danger
当局部变量被定义时，系统不会对其初始化，必须自行对其初始化。定义全局变量时，系统会自动对其初始化<br/>
`int->0` `char->'0'` `float->0` `double->0` `pointer->NULL`
:::
### 静态static

### extern

## 数据结构(STL)

### 数组list

### 元组tuple

### 集合set

### 映射tuple

## 指针

## 结构体


## 参考资料列表
- <a href='https://blog.csdn.net/love_gaohz/article/details/7567856'>const与define√</a>
- <a href='http://www.runoob.com/cprogramming/c-tutorial.html'>菜鸟c语言</a>
- <a href='https://www.imooc.com/view/249'>慕课c语言</a>
- <a href='https://my.oschina.net/jthmath/blog/488462'>开源中国元组</a>
- <a href=''>1</a>
<Valine></Valine>