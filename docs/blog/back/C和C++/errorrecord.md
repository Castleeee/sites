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
|char	1 字节	|-128 到 127<br/> 或 0 到 255|
|unsigned char	|1 字节	|0 到 255|
|signed char	|1 字节	|-128 到 127|
|int	|2 或 4 字节	|-32,768 到 32,767 或 -2,147,483,648 到 2,147,483,647|
|unsigned |int|	2 或 4 字节	0 到 65,535 或 0 到 4,294,967,295|
|short	|2 字节	|-32,768 到 32,767|
|unsigned |short|	2 字节|	0 到 65,535|
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

**char,short->unsigned->long->double<-float**<br/>
不能逆序,会有信息损失，分数转成整数就会舍掉小数位<br/>
看<a href="https://blog.csdn.net/ce123_zhouwei/article/details/9104681">这里</a><br/>
`int a=5;`<br/>
`double_a=(double) a;`#类型转换不会影响原来的值<br/>
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

### switch语句
1. 在case后的各常量表达式的值不能相同，否则会出现错误。
2. 在case子句后如果没有break;会一直往后执行一直到遇到break;才会跳出switch语句。
3. switch后面的表达式语句只能是整型或者字符类型。
4. 在case后，允许有多个语句，可以不用{}括起来。
5. 各case和default子句的先后顺序可以变动，而不会影响程序执行结果。
6. default子句可以省略不用



## 不知道属于哪一块

### static

### const

### define

### 程序内存分配

### 屌人的一些技巧

### 数据结构和算法常用lib



<Valine></Valine>