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
## C
<div align="center"><h1><strong>C语言</strong></h1></div>



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
`(doubel)a`;<br/>
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
### 枚举enum
enum 名字 {e1,e2,e3...} e;
 
这样就定义了一个枚举e（也可以先不定义e，后面enum 名字 e），第一个元素e1默认为0，后续元素逐个+1，可以自己定义，如e3=5那么元素变为0，1，5，6...

:::warning 
枚举被定义int或unsigned int，不连续的枚举无法遍历
:::
```c
留坑
```
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
### IO含树
scanf和printf<br/>
scanf("占位符1,占位符2",变量地址1,变量地址2,...);<br/>
控制台输入要和这个一样1,2<br/>
printf(“格式控制字符串”, 输出表列)<br/>
printf和puts两者都属于stdio.h这个头文件，都能输出字符串<br/>
puts()在输出字符串时会将'\0'自动转换成'\n'进行输出.
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
</strong>
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
经典的斐波那契(Fibonacci)

```c

```
还有求阶乘
```c
```

:::tip
递归是非常消耗空间的。每次进行递归都会为函数开辟新的栈空间,容易栈溢出，大部分的递归都可以改写成非递归
:::


### 闭包和Lambda

不支持闭包但是可以通过`Lambda`和`struct`嵌套定义来实现。用到再说
## 变量存储机制
### 局部&全局
global和local在一个代码块中新定义的变量在代码块使用结束后就会释放，不能在外面调用。全局变量可以直接调用，如果在代码块中定义了和外面相同名字的变量就优先使用local的变量。
:::danger
当局部变量被定义时，系统不会对其初始化，必须自行对其初始化。定义全局变量时，系统会自动对其初始化<br/>
`int->0` `char->'0'` `float->0` `double->0` `pointer->NULL`
:::
### 静态static
<a href='http://www.runoob.com/w3cnote/cpp-static-usage.html'>菜鸟详细解析</a>
<br/>需要一个数据对象为整个类而非某个对象服务,同时又力求不破坏类的封装性,即要求此成员隐藏在类的内部，对外不可见时，可将其定义为静态数据。直接在data和bss段进行定义，生命周期为整个程序<strong>不能在类的声明中定义</strong>（只能声明数据成员）也<strong>不能在头文件中类声明的外部定义</strong>

1. 静态变量的特性:
- 在修饰变量的时候，static 修饰的静态局部变量`只执行初始化一次`，而且延长了局部变量的生命周期，直到程序运行`结束`以后才释放。
- static 修饰全局变量的时候，这个全局变量只能在`本文件中访问`，不能在其它文件中访问，即便是 `extern` 外部声明也`不可以`。
- static 修饰一个函数，则这个`函数`的只能在`本文件中调用`，不能被其他文件调用。static 修饰的变量存放在全局数据区的`静态变量区`，包括全局静态变量和局部静态变量，都在全局数据区分配内存。初始化的时候自动`初始化为 0`。
- 不想被释放的时候，可以使用static修饰。比如修饰`函数中存放在栈空间的数组`。如果不想让这个数组在函数调用结束释放可以使用 static 修饰。
- 考虑到数据安全性（当程序想要使用全局变量的时候应该`优先`考虑使用 static）。

2. 静态与全局变量：

- 静态变量都在`全局数据区分配内存`，包括后面将要提到的静态局部变量
- 未经初始化的静态全局变量会被程序`自动初始化为0`（在函数体内声明的自动变量的值是随机的，除非它被显式初始化，而在函数体外被声明的自动变量也会被初始化为 0）；
- 静态全局变量在声明它的`整个文件都是可见`的，而在文件`之外是不可见`的
- 静态全局变量不能被其它文件所用；其它文件中可以定义`相同名字`的变量，不会发生冲突。

3. 全局变量和全局静态变量的区别:

- 全局变量是不显式用 `static` 修饰的全局变量，全局变量默认是有`外部链接性的`，作用域是整个工程，在一个文件内定义的全局变量，在另一个文件中，通过 `extern` 全局变量名的声明，就可以使用全局变量。
- 全局静态变量是显式用 `static` 修饰的全局变量，作用域是声明此变量所在的文件，其他的文件即使用 `extern` 声明也`不能使用`。

4. 静态局部(internal)变量有以下特点：

- 该变量在`全局数据区`分配内存；
- 静态局部变量在程序执行到`该对象的声明处`时被首次`初始化`，即`以后的函数调用不再进行初始化`；
- 静态局部变量一般在声明处初始化，如果`没有显式初始化`，会被程序`自动初始化为 0`；
- 它始终`驻留在全局数据区`，直到程序运行结束。但其<strong>`作用域为局部作用域`</strong>，当定义它的函数或语句块结束时，其作用域随之结束。
------搬运自菜鸟,转载注明出处
### 外部extern
:::tip
`<>`从系统头文件中寻找，没有则报错，`""`先从非系统头文件找，没有再找系统头文件，不会报错
:::

<h4>在单文件中</h4>

在同一文件时相当于函数的预声明，告诉编译器这个变量在后面声名<br/>
```c
# include <stdio.h>
int main() {
    extern int a;
    printf("%d",a);
    return 0;
}
int a=56;
```
<h4>在多文件中</h4><br/>

多文件可以让一个文件引用另一个文件中的变量。在另一个文件中声明一下时extern，同目录(工程)下的文件就可以引用了。
<br/>如果用include的话就会让本文件所有的函数变量都可见会不安全。
1. 在本文件中声名一个变量`int a=5;`
2. 在公共头文件中声明`extern int a;`
3. 在其他文件中将声名`extern int a;`就可以访问到了
:::warning
只有当一个变量是一个`全局变量`时，extern变量才会起作用,局部变量不起作用<br/>
不能在其他文件中声明的时候同时赋值extern int a=5;是错误的，必须在原来的文件中重新赋值等等
:::
### auto
定义一个变量不指定他的静态还是外部等等就自动默认为auto一般你不指定的就是auto，与之相对的是register寄存器变量这两个不常用。会随机应变auto的出现意味着，当前变量的作用域为当前函数或代码段的局部变量，意味着当前变量会在内存栈上进行分配。
### 程序堆栈
一个由C/C++编译的程序占用的内存分为以下几个部分：
1. <strong>栈区(stack)</strong> ---由编译器自动分配释放，存放`函数的参数值`，`局部变量的值等`。其操作方式类似于数据结构中的`栈`。
2. <strong>堆区(heap)</strong> ---一般由程序员分配释放，若程序员不释放，程序结束时可能由OS回收。注意它与数据结构中的堆是两回事，分配方式类似于`链表`。可能用到的关键字如下：new、malloc、delete、free等等
3. <strong>全局区(静态区)</strong> ---`全局变量`和`静态变量`的存储时放在一块的，<strong>初始化</strong>的全局变量和静态变量在一块区域，<strong>未初始化的</strong>全局变量和未初始化的静态变量在相邻的另一块区域。程序结束后有系统释放。
4. <strong>文字常量区</strong> --- `常量` </strong>`字符串`就是放在这里的。程序结束后由系统释放。
5. <strong>程序代码区</strong> --- 存放`函数体`的二进制。
一般情况下程序存放在Rom或Flash中，运行时需要拷到内存中执行，内存会分别存储不同的信息,<strong>内存中的栈区处于相对较高的地址以地址的增长方向为上的话，栈地址是向下增长的</strong>
```c
//main.cpp
int a = 0; 全局初始化区
char *p1; 全局未初始化区
main()
{
int b; 栈
char s[] = "abc"; 栈
char *p2; 栈
char *p3 = "123456"; 123456\0在常量区，p3在栈上。
static int c =0； 全局（静态）初始化区
p1 = (char *)malloc(10);  堆
p2 = (char *)malloc(20);  堆
}
```
区别和共同点
- 申请释放
    - 堆：需要程序员自己申请，并指明大小
    - 栈：由系统自动分配，例如，声明在函数中一个局部变量int b；系统自动在栈中为b开辟空间
- 系统响应
    - 栈：只要栈的剩余空间大于所申请空间，系统将为程序提供内存，否则将报异常提示栈溢出。
    - 堆：首先应该知道操作系统有一个记录空闲内存地址的链表，当系统收到程序的申请时，会遍历该链表，寻找第一个空间大于所申请空间的堆结点，然后将该结点从空闲结点链表中删除，并将该结点的空间分配给程序，另外，对于大多数系统，会在这块内存空间中的首地址处记录本次分配的大小，这样，代码中的 delete语句才能正确的释放本内存空间。另外，由于找到的堆结点的大小不一定正好等于申请的大小，系统会自动的将多余的那部分重新放入空闲链表中。
          也就是说堆会在申请后还要做一些后续的工作这就会引出申请效率的问题。
- 效率
    - 栈:由系统自动分配，速度较快。但程序员是无法控制的。
    - 堆:是由new分配的内存，一般速度比较慢，而且容易产生内存碎片,不过用起来最方便。
- 内容
    - 栈:在函数调用时，第一个进栈的是主函数中函数调用后的下一条指令（函数调用语句的下一条可执行语句）的地址，然后是函数的各个参数，在大多数的C编译器中，参数是由右往左入栈的，然后是函数中的局部变量。注意静态变量是不入栈的。
          当本次函数调用结束后，局部变量先出栈，然后是参数，最后栈顶指针指向最开始存的地址，也就是主函数中的下一条指令，程序由该点继续运行。
    - 堆:一般是在堆的头部用一个字节存放堆的大小。堆中的具体内容有程序员安排。
## 数组list
数组是自带的,其他的在STL中可以找到，STL里卖弄还有链表树等等啥都有。<br/>
数组是一块`连续的`，`大小固定`并且里面的数据`类型一致`的`内存`空间;<br/>
<strong>
数据类型 数组名称[长度];<br/>
char b[5];<br/>
</strong>
数组初始化有三种形式：<br/>

1. 数据类型 数组名称[长度n] = {元素1,元素2…元素n};

2. 数据类型 数组名称[] = {元素1,元素2…元素n};自己会判断有多少个

3. 数据类型 数组名称[长度n]; 数组名称[0] = 元素1; 数组名称[1] = 元素2; 数组名称[n-1] = 元素n;

<br/>拿取:数组名称[元素所对应下标];如：初始化一个数组 int arr[3] = {1,2,3}; 那么arr[0]就是元素1。<br/>

<h4>多维数组</h4>

<strong>
数据类型 数组名称[行][列];<br/>
char b[2][4];<br/>
</strong>

其实存储方式还是一维数组的存储方式，地址都是连续的

char b[2][4];={1,2,3,4,5,6,7,8};
一般使用for来循环
```c
    int a[5]={1,2,3,4,5};
    for (int i=0;i<5;i++){
        printf("%d",a[i]);
    }
```
:::warning
数组的下标均以`0`开始；初始化的时候，数组内元素的个数`不能大于`声明的数组长度；如果采用`第一种`初始化方式，元素个数小于数组的长度时，多余的数组元素初始化为`0`；在声明数组后没有进行初始化的时候，静态（static）和外部（extern）类型的数组元素初始化元素为0，`自动`（auto）类型的数组的元素初始化值`不确定`。
:::
单独把数组拿出来的时候获得是的数组的`首地址`，也就是数组的名字就是指向数组的指针
作为参数，返回值
```c
# include<stdio.h>

void temp(int arr[]) {
    int i;
    for (i = 0; i < 5; i++) { printf("%d\n", arr[i]); }
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    temp(arr);
    return 0;
}
```
作为返回值，函数返回值为一个指定类型的指针，外部需要一个同类型接收的指针，内部声明数组为`static`，初始化完数组，直接return这个数组的指针(名字)
<h4>不定长数组</h4>
参见vector

:::tip
另外，C 不支持在函数外返回局部变量的地址会报空指针，除非定义局部变量为 static 变量
:::

## 指针
**指针是C语言的灵魂！**<br/>
<strong>`&`</strong>符号是取<strong>`地址`</strong>，取得地址之后得到的是一个<strong>`指针`</strong>类型<br/>
<strong>`*`</strong>符号是<strong>`指针类型`</strong>，用来接收一个<strong>`地址`</strong>，占位符为<strong>`%p`</strong><br/>
变量在内存中是有一个<strong>`地址+值`</strong>存在的。<br/>
所有指针的值的实际数据类型，不管是整型、浮点型、字符型，还是其他的数据类型，都是一样的，都是一个代表内存地址的长的`十六进制数`。不同数据类型的指针之间唯一的不同是，指针所指向的变量或常量的数据类型不同。
一个地址可以被多个指针指向，但是一个指针之可以指一个地址
```c
int    *ip=&a;
int    *id=&a;
double *dp;
float  *fp;
char   *ch;
```
:::danger
如果定义的时候没想好指针怎么指，那就先赋一个空指针<strong>`int *p=NULL;`</strong><br/>
在大多数的操作系统上，程序不允许访问地址为 0 的内存，因为该内存是操作系统保留的。然而，内存地址 0 有特别重要的意义，它表明该指针不指向一个可访问的内存位置
:::
指针可以进行四则运算，他会指向下一块或者上一块内存区域，比如数组可以用指针来遍历。
```c
咕咕咕
```
指针可以作为参数和函数返回值。作为参数的时候会直接对外部的变量内存的值进行修改，做返回值就是拿到了该变量的指针，局部变量的指针不能作为返回值，会被释放，要声明一下static
```c
咕咕咕
```
指针的优先级

|指针定义|含义|
|:----:|:-----:|
|int p;|这是一个普通的整型变量  |
|int *p;|首先从P 处开始,先与*结合,所以说明P 是一个指针,然后再与int 结合,说明指针所指向的内容的类型为int 型.所以P是一个返回整型数据的指针  |
|int p[3];|首先从P 处开始,先与[]结合,说明P 是一个数组,然后与int 结合,说明数组里的元素是整型的,所以P 是一个由整型数据组成的数组  |
|int *p[3];|首先从P 处开始,先与[]结合,因为其优先级比*高,所以P 是一个数组,然后再与*结合,说明数组里的元素是指针类型,然后再与int 结合,说明指针所指向的内容的类型是整型的,所以P 是一个由返回整型数据的指针所组成的数组  |
|int (*p)[3];|首先从P 处开始,先与*结合,说明P 是一个指针然后再与[]结合(与"()"这步可以忽略,只是为了改变优先级),说明指针所指向的内容是一个数组,然后再与int 结合,说明数组里的元素是整型的.所以P 是一个指向由整型数据组成的数组的指针  |
|int **p;|首先从P 开始,先与*结合,说是P 是一个指针,然后再与*结合,说明指针所指向的元素是指针,然后再与int 结合,说明该指针所指向的元素是整型数据.由于二级指针以及更高级的指针极少用在复杂的类型中,所以后面更复杂的类型我们就不考虑多级指针了,最多只考虑一级指针.  |
|int p(int);|从P 处起,先与()结合,说明P 是一个函数,然后进入()里分析,说明该函数有一个整型变量的参数,然后再与外面的int 结合,说明函数的返回值是一个整型数据  |
|Int (*p)(int);|从P 处开始,先与指针结合,说明P 是一个指针,然后与()结合,说明指针指向的是一个函数,然后再与()里的int 结合,说明函数有一个int 型的参数,再与最外层的int 结合,说明函数的返回类型是整型,所以P 是一个指向有一个整型参数且返回类型为整型的函数的指针  |
|int *(*p(int))[3];|可以先跳过,不看这个类型,过于复杂从P 开始,先与()结合,说明P 是一个函数,然后进入()里面,与int 结合,说明函数有一个整型变量参数,然后再与外面的*结合,说明函数返回的是一个指针,,然后到最外面一层,先与[]结合,说明返回的指针指向的是一个数组,然后再与*结合,说明数组里的元素是指针,然后再与int 结合,说明指针指向的内容是整型数据.所以P 是一个参数为一个整数据且返回一个指向由整型指针变量组成的数组的指针变量的函数. |
-----转自<a href='https://blog.csdn.net/constantin_/article/details/79575638'>指针超详细解释</a>
:::danger
void * 类型表示未确定类型的指针。C/C++ 规定 void * 类型可以通过类型转换强制转换为任何其它类型的指针。
<a href="http://www.runoob.com/w3cnote/c-void-intro.html">详解</a>
:::
## 内存管理
c语言的难点，好在数据结构考试中不那么看重，简单整理一下
需要引入`#include <stdlib.h>`
### malloc;free
|函数|作用|
|:----|:-----:|
|void *calloc(int num, int size);|在内存中动态地分配 num 个长度为 size 的连续空间，并将每一个字节都初始化为 0。所以它的结果是分配了 num*size 个字节长度的内存空间，并且每个字节的值都是0。|
|void free(void *address); |该函数释放 address 所指向的内存块,释放的是动态分配的内存空间。|
|void *malloc(int num); |在`堆区`分配一块指定大小的内存空间，用来存放数据。这块内存空间在函数执行完成后不会被初始化，它们的值是未知的。|
|void *realloc(void *address, int newsize); |该函数重新分配内存，把内存扩展到 newsize。|
:::danger
看看就行了，C++中使用new代替了malloc
:::
### memset;memcopy
C语言需要包含头文件string.h；C++需要包含cstring  或  string.h<br/>
- void *memset(void *s,int c,size_t n)<br/>
作用：将已开辟内存空间 s 的首 n 个字节的值设为值 c（给空间初始化）<br/>
最常用的就是把一个数组(未初始化的字符串)初始化
:::danger
char * buffer = "Hello world\n";已初始化的字符串是只读的存在只读存储区，其内容不能被随意更改。
:::
```c
留坑
```
- void *memcpy(void *dest, const void *src, size_t n);<br/>
用来将src地址处的内容拷贝n个字节的数据至目标地址dest指向的内存中去。函数返回指向dest的指针。
```c
留坑
```
:::danger
 memcpy用来做内存拷贝，你可以拿它拷贝任何数据类型的对象，可以指定拷贝的数据长度；例：char a[100],b[50]; memcpy(b, a, sizeof(b));注意如用sizeof(a)，会造成b的内存溢出。<br/>
另外：strcpy只能拷贝字符串，它遇到'\0'就结束拷贝；例：char a[100],b[50];strcpy(a,b);如用strcpy(b,a)，要注意a中的字符串长度（第一个‘\0’之前）是否超过50位，如超过，则会造成b的内存溢出。会造成缓冲区溢出，轻者程序崩溃，重者系统会出现问题！！
:::
----转自<a href='https://blog.csdn.net/scottly1/article/details/16829741'>详解</a> 

### sizeof
高级用法先不谈，最基本的俩用法
类型：sizeof使用形式：sizeof(type)（sizeof（int））
变量：sizeof使用形式：sizeof(var_name)或sizeof var_name
:::danger
sizeof操作符不能用于函数类型，不完全类型或位字段。不完全类型指具有未知存储大小的数据类型，如未知存储大小的数组类型、未知内容的结构或联合类型、void类型等
:::
Sizeof操作符的结果类型是size_t

结果(x64下):

|结果|
|:----|
|sizeof(int)=4|
|sizeof(unsigned int)=4|
|sizeof(short int)=2|
|sizeof(unsigned short)=2|
|sizeof(long int)=4|
|sizeof(unsigned long)=4|
|sizeof(float)=4|
|sizeof(double)=8|
|sizeof(long double)=8|
|sizeof(char/unsigned char/signed char)=1|
|sizeof(*ptr)=4|
|int a[10]，sizeof(a)=40数组结果是数组的总字节数。|
|联合类型操作数的sizeof是其最大字节成员的字节数|
|结构类型操作数的sizeof是这种类型对象的总字节数，包括任何铺垫在内；&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
## 结构体
有点面向对象的意思了，不过还没有对象
### struct
`struct` **name** { <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**member-list**;<br/>
&nbsp;&nbsp;&nbsp;member-list; <br/>
&nbsp;&nbsp;&nbsp;member-list;  <br/>
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ...<br/>
} **variable-list** ;<br/>
`struct` name n; <br/>
以下发言是借用了面向对象的说法<br/>
你可以省略掉name，variable-list相当于直接定义了一堆对象而没有类名，也就不能用类名来在定义其他的变量了<br/>
你可以省略掉variable-list，但不要落下类名，可以后面手动定义name n;<br/>
你也可以把name 通过typedef放在后面typedef struct{} name;让然需要自己生成对象。<br/>
访问对象的成员的时候直接用`.`访问<br/>
关于指针：
- struct name `*p`;这是定义了一个指针赋值的时候p=&n;
- 取值用`p->m`相当于`n.m`
```c

```
### typedef
`typedef` 可以给一个东西娶个别名，比如typedef long long ll
这时候使用`ll a;=long long a;`
一般会用来给结构体娶个新名字
```c
typedef struct Books
{
   char  title[50];
   char  author[50];
   char  subject[100];
   int   book_id;
} Book;
```
:::tip
- typedef 仅限于为类型定义符号名称#define（宏）不仅可以为类型定义别名，也能为数值定义别名
- typedef 是由编译器执行解释的，#define 语句是由预编译器进行处理的
:::
终于整理完C了！！！

## **C++**
<div align="center"><h1><strong>C++</strong></h1></div>
因为很多东西都在C中有，这里就只看看那些没有的
## 输入输出
### 一些规则
<strong>命名空间</strong><br/>
为了避免函数和变量名混乱我们使用命名空间来隔离开。调用的时候是`std::cout`使用了std空间里的cout函数<br/>
一般用std就够了。也可以直接using namespace std使用std下的所有东西。<br/>
<strong>头文件引入</strong><br/>
`#include < string >` c没有string，c++引入就有了，c中很多库需要加c前缀。 `<>`从系统头文件中寻找，没有则报错，`""`先从非系统头文件找，没有再找系统头文件，不会报错

### 标准IO
`#include < iostream >`标准输入输出流。在定义流对象时，系统会在内存中开辟一段缓冲区，用来暂存输入输出流的数据<br/>
cout是标准输出流对象插入到输出流中并输出到屏幕cout<<x<<endl;<br/>
cin是标准输入流对象，接受控制台输入的东西。cin>>x;<br/>
endl是尾部换行符（关于这个更多的google去吧，暂时用到这些）
### 文件IO
`#include < fstream >`文件输入输出流。
```c
ofstream oF("text.txt");//打开一个文件对象
oF<<333<<"aaaaa\n";//写入一个txt文件里
oF.close();//记得关掉
ifstream iF("text.txt");//输入一个文件对象的东西
double d;
string str;
iF>>d>>str;//接收变量
cout<<d<<""<<str//打印出来看看是啥
```
会txt就行了其他的不管了。
## 函数
### 默认参数
**引用变量**
>int a=3;
int &r=a;//r是a的引用变量

引用变量就是给变量起了个别名，指向同一块内存空间，定义的时候必须进行初始化而且必须保证类型匹配。引用变量定义之后就不能再更改指向其他人了。
<br/>主要做函数的形参。<br/>
c++的函数直接放进去是值传递`int f（int a,int b）{...}`调用f（x,y）不会对外部的x,y产生影响，因为函数自己开辟堆栈空间，ab只是复制了xy的值而没有真正拿到xy
<br/>
解决方法:
- 传入俩指针，在函数内部对指针里的值进行修改，直接对内存修改。`int f（int *a,int *b）{...}`调用f（&x,&y）<br/>
- 传入两个引用，不在函数内分配内存通过引用直接修改值。`int f（int &a,int &b）{...}`调用f（x,y）
**函数的默认参数**
参数可以有默认值的，`int f（char r,int x=3）`，**默认形参要靠右！**
### 函数重载
c++允许定义两个名字相同的函数，但**形参类型必须不要相同**，编译器会根据你传入的参数什么样子来调用不同的函数。
函数名和形参列表构成了函数签名，函数重载不能根据返回值来区分。注意歧义的情况。
```c
留坑
```
### 函数模板
上例中的两个函数可以用函数模板进行重构。数据类型变为模板类型参数。
`template <typename T>`定义了一个模板T
```c
留坑
```
:::warning
注意调用时给定的数据类型是否支持函数的操作。<br/>
在重载函数中也可以像函数模板一样指定类型。
:::
## 动态内存管理
C++中使用`new`代替malloc。new除了分配内存外还会对对象进行初始化（new类对象的时候会调用构造函数等）。<br/>
`new`完了一定要`delete`如果没被delete那么这块被分配的内存会一直存在没有名字，不被回收造成内存泄漏。
```c
留坑
```
指针指向new出来的新数组的时候实质上是指向数组的首地址
```c
留坑
```
:::danger
delete 掉new type[] 申请的内存必须要用**`delete[] p`**如果没有**`[]`**则只会删除数组的第一个元素值后面的元素会泄露
:::
## 类和对象
传统的面向过程编程，C++引入了面向对象编程OOP<a href='https://blog.csdn.net/it_man/article/details/6672964'>随便看一看吧后面再找个好的</a>
### 类
面向对象编程：程序是由不同种类的许多对象相互协作完成的。对象之间通过发送/接收消息来协作完成各种任务。由这些对象构成的程序也称为“对象式系统".
<br/>**`class name{};`** 定义类（你要非要用struct我也管不着）。类可以生成一个对象，类是对事物的特征抽象。通过类可以定义对象
访问的时候使用**`.`**。**对象**同样具有指针
看例子**注意后面有分号**
```c
留坑
```
类对象可以通过指针来访问，访问符号为`->`
```c
class_name stu;//生成一个对象
class_name *object_pointer=&stu;//给指针赋值
object_pointer->name;//访问了属性
(*object_pointer).name;//访问了属性

class_name *object_pointer=new class_name;//给指针赋动态对象（存储在堆）
delete object_pointer//记得删除
```
成员可以有函数(行为)和变量(属性)。函数可以先在类中声明在后面实现。

### 构造析构
<br/>对象在生成的时候实际上是通过一个`构造函数`来生成的，构造函数的名称与类的名称是完全相同的，并且不会返回任何类型，也不会返回 void，如果不在类中定义，c++会默认给一个空的`默认构造函数`，啥都不执行。
<br/>构造函数可以用来初始化成员变量。构造函数可以提供参数，在声明对象的时候就要传入对应的参数。
<br/>类的析构函数是类的一种特殊的成员函数，它会在每次删除所创建的对象(delete a;)时执行。
<br/>`析构函数`的名称与类的名称是完全相同的，只是在前面加波浪号`~`作为前缀，它不会返回任何值，也不能带有任何参数。析构函数有助于在跳出程序（比如关闭文件、释放内存等）前释放资源。<a href='https://www.cnblogs.com/nzbbody/p/3523064.html'>构造析构</a>

```c
留坑
```
:::warning
自定义了构造函数之后不会再分配默认构造函数，也就不能直接声明对象数组。<br/>
student stu[3];会报错,存储指针或者用for添加进去
:::
### this指针
类中的成员函数自带了一个this指针。比如`stu.print();==>print(&stu);`把类的指针传入。<br/>
void print(student *this){<br/>
cout<<`this->name`<<""<<`this->score`<<end1;<br/>
}<br/>
## 面向对象
### 封装
类中的成员默认为`private`只有本类中的成员才能调用，外部不能访问，声明一个类的时候通常要声明`public`和`private`.
一般成员不声明设置为private，通过get/set方法进行设置和访问控制。参考java豆(bean)
```ctypename
留坑
```
封装是为了安全考虑。

|属性|访问|
|:---:|:-----|
|private|只能由1.该类中的函数、2.其友元函数访问。不能被任何其他访问，该类的对象也不能访问。|
|protected|可以被1.该类中的函数、2.子类的函数、以及3.其友元函数访问。但不能被该类的对象访问。|
|public|可以被1.该类中的函数、2.子类的函数、3.其友元函数访问，也可以由4.该类的对象访问。|
**友元函数**<br/>
类的友元函数是定义在类外部，但有权访问类的所有私有（private）成员和保护（protected）成员。<br/>
设为友元的普通的非成员函数,类内声明<br/>
**`friend void printWidth( Box box );`**<br/>
设为友元类中的所有成员函数,在class的public声明另一个类**`friend class ClassOther;`**<br/>
有缘不会被继承传递
### 继承
子类继承父类子类就具有了父类的函数和数据成员。<br/>
**`class A: public A1, private A2`**<br/>
在声明类的时候有三种继承方式,我们几乎不使用 protected 或 private 继承

|继承规则       |      public      |       protected    |   private|
|:----:|:---:|:----:|:----:|
|public继承|             public      |        protected   |      不可用 |
|protected继承 |         protected |          protected  |         不可用 |
|private继承|            private  |           private     |        不可用 |
下列属性是不能被继承的
- 基类的构造函数、析构函数和拷贝构造函数。
- 基类的重载运算符。
- 基类的友元函数

可以多继承，但是要注意棱形继承问题和多态问题<br/>
简单的继承关系示例
```c
留坑
```
### 多态

### 类模板

### 接口(抽象类)

### 运算符重载
在类内部声明被重载的运算符，可以使用运算符进行操作类对象。<br/>
**`B operator+(B &b1,B &b2){ ... return B b;}<br/>`**<br/>
在类内部声明一下这个运算符一样的函数，然后调用的时候就可直接加减了。<br/>

|可重载||
|:----|:---:|
|双目算术运算符 |	+ (加)，-(减)，* (乘)，/(除)，% (取模)|
|关系运算符 |	==(等于)，!= (不等于)，< (小于)，> (大于>，<=(小于等于)，>=(大于等于)|
|逻辑运算符 |	||(逻辑或)，&&(逻辑与)，!(逻辑非)|
|单目运算符 |	+ (正)，-(负)，*(指针)，&(取地址)|
|自增自减运算符 |	++(自增)，--(自减)|
|位运算符 	|｜(按位或)，& (按位与)，~(按位取反)，^(按位异或),，<< (左移)，>>(右移)|
|赋值运算符 	|=, +=, -=, *=, /= , % = , &=, ｜=, ^=, <<=, >>=|
|空间申请与释放 	|new, delete, new[ ] , delete[]|
|其他运算符 	|()(函数调用)，->(成员访问)，,(逗号)，[](下标)|
|不可重载||
|.|成员访问运算符|
|.*, ->*|成员指针访问运算符|
|::|域运算符|
|sizeof|长度运算符|
|?:|条件运算符|
|#|预处理符号|
-----from 菜鸟<br/>
原则:
- 运算重载符不可以改变语法结构。
- 运算重载符不可以改变操作数的个数。
- 运算重载符不可以改变优先级。
- 运算重载符不可以改变结合性。
```c
留坑
```
## 异常处理
C++中有了try 和catch<br/>
用法和py，java中相似。<br/>
```c
try{
...
}catch( 错误名字 e1 ){
e1.printf("你出错了")
...
}catch(错误 e2){
throw "出错了";
}
```
自己定义一下出了什么错该怎么办，比如e1被打印了出来，e2就没管。<br/>自己查一下<a href="http://www.runoob.com/cplusplus/cpp-exceptions-handling.html">错误类型</a>。
## STL
### 向量vector
### 队列queue
### 双向队列list
### 元组tuple
### 集合set
### 映射map
### 栈stack
## 日常操作
### 数组
### 字符串

## 参考资料列表
- <a href='https://blog.csdn.net/love_gaohz/article/details/7567856'>const与define√</a>
- <a href='http://www.runoob.com/cprogramming/c-tutorial.html'>菜鸟c语言</a>
- <a href='https://www.imooc.com/view/249'>慕课c语言</a>
- <a href='https://my.oschina.net/jthmath/blog/488462'>开源中国元组</a>
- <a href='https://blog.csdn.net/a1232345/article/details/44957191'>C语言堆栈入门</a>
- <a href='https://blog.csdn.net/constantin_/article/details/79575638'>超级详细的指针</a>
- <a href='https://www.bilibili.com/video/av40959422'>bilibili hw-dong</a>
- <a href='https://www.cnblogs.com/nzbbody/p/3523064.html'>继承过程中构造析构详解</a>
- <a href='http://www.runoob.com/cplusplus/cpp-classes-objects.html'>菜鸟C++</a>
- <a href=''>1</a>
- <a href=''>1</a>
<Valine></Valine>

