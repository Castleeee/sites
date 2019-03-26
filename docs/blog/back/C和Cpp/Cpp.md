---
title: C++基础
date: 2019-3-22 17:19:47
categories: backEnd
tags:
- 后端
- C/C++
- 语言基础
---


:::tip
因为很多东西都在C中有，这里就只看看那些没有的
:::
<!-- more -->

<div align="center"><h1><strong>C++</strong></h1></div>

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
|private|能由1.该类中的函数2.其友元函数访问 不能被任何其他访问 该类的对象也不能访问|
|protected|能被1.该类中的函数2.子类的函数 以及3.其友元函数访问 但不能被该类的对象访问|
|public|可以被1.该类中的函数2.子类的函数3.其友元函数访问 也可以由4.该类的对象访问|
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

可以多继承，但是要注意棱形继承多态问题<br/>
简单的继承关系示例
```c
留坑
```
### 多态
**<h4>虚继承</h4>**<br/>
>class A; 
class B:vitual public A; 
class C:vitual public A; 
class D:public B,public C; 

**<h4>虚基类</h4>**<br/>
**<h4>虚函数</h4>**<br/>
**<h4>纯虚函数</h4>**<br/>
**<h4>抽象类(接口)</h4>**<br/>
为了解决棱形继承问题，由此有了虚继承



### 类模板 
C++通过类模板来实现泛型支持。和声明函数模板一样，声明一个类型**`template <class T>`**,在类中使用T类型，声明对象的时候指明类型即可Class**< type >**(a,b)
```c
留坑https://www.jianshu.com/p/70ca94872418
```

- 如果父类自定义了构造函数，记得子类要调用父类构造函数来初始化
- 继承的时候，如果子类不是模板类，则必须指明当前的父类的类型，因为要分配内存空间class ChildOne:public Parent< int >
- 继承的时候，如果子类是模板类，要么指定父类的类型，要么用子类的泛型来指定父类class ChildTwo:public Parent< T >
-----from <a href='http://www.runoob.com/cplusplus/cpp-templates.html'>菜鸟</a>，<a href='https://www.jianshu.com/p/70ca94872418'>一个人的简书</a>

### 运算符重载
在类内部声明被重载的运算符，可以使用运算符进行操作类对象。<br/>
**`B operator+(B &b1,B &b2){ ... return B b;}<br/>`**<br/>
在类内部声明一下这个运算符一样的函数，然后调用的时候就可直接加减了。<br/>

|可重载||
|:----|:---:|
|双目算术运算符 |`	+ `(加)，`-`(减)，`* `(乘)，`/`(除)，`% `(取模)|
|关系运算符 |	`==`(等于)，`!= `(不等于)，`< `(小于)，`> `(大于)，`<=`(小于等于)，`>=`(大于等于)|
|逻辑运算符 |	`｜｜`(逻辑或)，`&&`(逻辑与)，`!`(逻辑非)|
|单目运算符 |	`+ `(正)，`-`(负)，`*`(指针)，`&`(取地址)|
|自增自减运算符 |	`++`(自增)，`--`(自减)|
|位运算符 	|`｜`(按位或)，`& `(按位与)，`~`(按位取反)，`^`(按位异或),，`<< `(左移)，`>>`(右移)|
|赋值运算符 	|`=`, `+=`, `-=`, `*=`, `/=` , `% = `, `&=`, `｜=`,` ^=`, `<<=`, `>>=`|
|空间申请与释放 	|`new`, `delete`, `new[ ]` , `delete[]`|
|其他运算符 	|`()`(函数调用)，`->`(成员访问)，`,`(逗号)，`[]`(下标)|
|不可重载||
|`.`|成员访问运算符|
|`.*`, `->*`|成员指针访问运算符|
|`::`|域运算符|
|`sizeof`|长度运算符|
|`?:`|条件运算符|
|`#`|预处理符号|
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
<a href='http://c.biancheng.net/stl/'>C语言中文网的STL</a>(多到我不想整理不会的就去查把)我随意整理下<br/>
C++ STL中标准关联容器set, multiset, map, multimap内部采用的就是一种非常高效的平衡检索二叉树：红黑树
### 向量vector
vector< T > 容器是包含 T 类型元素的序列容器，和 array<T，N> 容器相似，不同的是 vector< T > 容器的大小可以自动增长，从而可以包含任意数量的元素；因此类型参数 T 不再需要模板参数 N。只要元素个数超出 vector 当前容量，就会自动分配更多的空间。只能在容器尾部高效地删除或添加元素。
线性排序，可以下标访问
**`#include <vector>`**
- **`vector<DataType>Name(MaxSize,defaultValue);`**
    - 定义一个vector
- x=**`Name[i];`**或**`Name.at(i)`**
    - 取出了第i个元素
- **`Name.push_back(i);`**
    - 在数组的最后添加一个数据
- **`Name.pop_back();`**
    - 去掉数组的最后一个数据
- **`Name.begin/end`**
    - 得到数组头/尾的指针
- **`Name.front/back`**
    - 得到数组头/尾的- 引用
- **`Name.size()`**
    - 得到数组的长度
- **`Name.clear()`**
    - 清空当前的vector
- **`Name.empty()`**
    - 是ture否false
### 队列queue

**`#include<queue>`**<br/>
**先进先出队列 < queue >**<br/>
定义`queue<Type> M`<br/>

- 查看是否为空队列 **`M.empty()`** 是的话返回1，不是返回0;
- 从已有元素后面增加元素 **`M.push(x)`**
- 输出现有元素的个数 **`M.size()`** 
- 清除队顶元素 **`M.pop()`** ,同样它不返回值
- 获取队顶元素 **`M.front()`** 
- 获取队尾元素 **`M.back()`** 

**优先级队列 < queue >**
<a href='https://blog.csdn.net/xiaoquantouer/article/details/52015928'>这个挺详细的</a><br/>
定义的时候要决定优先值<br/>
`priority_queue< int >Q;`默认优先输出大的数据(整数)，可以自己定义<br/>
优先输出小数据 `priority_queue<int, vector<int>, greater<int> > p;`<br/>
自己重载例子<br/>
```c
struct Node{
	int x,y;
	Node(int a=0, int b=0):
		x(a), y(b) {}
};
struct cmp{
	bool operator()(Node a, Node b){
		if(a.x == b.x)	return a.y>b.y;
		return a.x>b.x;
	}
};
 
int main(){
	priority_queue<Node, vector<Node>, cmp>p;
```



- **`Q.empty()`** 判断队列是否为空返回ture表示空返回false表示空 bool
- **`Q.top()`** 返回顶端元素的值元素还在队列里
- **`Q.pop()`** 删除顶端元素 void
- **`Q.push(V)`** 把long long型的数V加入到队列里它会制动条件V的位置void
- **`Q.size()`** 返回队列里元素个数 unsigned int

**双端队列**
- **`deque<int>c`**
- **`c.pop_back()`**      删除最后一个数据。
- **`c.pop_front()`**      删除头部数据。
- **`c.push_back(elem)`**  在尾部加入一个数据。
- **`c.push_front(elem)`** 在头部插入一个数据。
- **`c.clear()`**          移除容器中所有数据。
- **`c.front()`**          传回地一个数据。
- **`c.back()`**          传回最后一个数据，不检查这个数据是否存在。
- **`c.size()`**           返回容器中实际数据的个数。
- **`c.empty()`**         判断容器是否为空。
- **`c[i]`** 等同于 **`c.at(i)`**;
### 链表list
由节点组成的双向链表，每个结点包含着一个元素
**`list<int> list1(1,2,3)`**
- **`list.front()`**
    - 返回第一个元素的引用
    - int nRet =list1.front()// nRet = 1
- **`list.back()`**
    - 返回最后一元素的引用
    - int nRet =list1.back()// nRet = 3
- **`list.push_back(x)`**
    - 增加一元素到链表尾
    - list1.push_back(4)//list1(1,2,3,4)
- **`list.push_front(x)`**
    - 增加一元素到链表头
    - list1.push_front(4)//list1(4,1,2,3)
- **`list.pop_back()`**
    - 删除链表尾的一个元素
    - list1.pop_back()//list1(1,2)
- **`list.pop_front()`**
    - 删除链表头的一元素
    - list1.pop_front()//list1(2,3)
- **`list.clear()`**
    - 删除所有元素
    - list1.clear();// list1空了,list1.size()=0
- **`list.sort()`**
    - 对链表排序，默认升序(可自定义回调函数)
    - 定义回调函数
- **`list.insert(指针,[几次],元素)`**
    - 在指定位置插入一个或多个元素
    - list1.insert(++list1.begin(),9);  // list1(1,9,2,3);
    - list1.insert(list1.begin(),2,9);  // list1(9,9,1,2,3);
- **`list.swap()`**
    - 交换两个链表(两个重载)
    - list1.swap(list2);//list1（1，2，3） list2（4，5，6）->list1（4，5，6） list2（1，2，3）
- **`list1.unique()`**
    - 删除相邻重复元素L1(1,1,4,3,5,1)->L1(1,4,3,5,1)
- **`merge()`**
    - 合并两个有序链表并使之有序
    - 升序list1.merge(list2);->list1(1,2,3,4,5,6) list2现为空
    - 降序list1.merge(list2, greater< int >()); //list1(6,5,4,3,2,1) list2现为空
- **`list.reverse()`**
    - 反转链表list1（1，2，3）->list1(3,2,1)
- **`list1.remove(4)`**
    - 删除链表中匹配值的元素(匹配元素全部删除4)
- **`bool bRet =L1.empty();`**
    - 判断是否链表为空true/false
- **`rbegin()`**
    - 返回链表最后一元素的后向指针(reverse_iteratoror const)list< int>::reverse_iterator it = list1.rbegin();  //*it = 3
- **`rend()`**
    - 返回链表第一元素的下一位置的后向指针list< int>::reverse_iteratorit = list1.rend(); // *(--riter) =
### 元组tuple

### 集合set
由节点组成的红黑树，每个节点都包含着一个元素，节点之间以某种作用于元素对的谓词排列，没有两个不同的元素能够拥有相同的次序 < set >
元素不能重复,貌似看到了一个<a href='https://blog.csdn.net/changjiale110/article/details/79108447'>原理解析</a>有兴趣的传送过去看看<br/>
set< type >: 以less< >为排序法则的set<br/>
set< type,op >: 以op为排序法则的set<br/>
ps:我也不知道啥意思，不深究了，拿来即用碰到在查就行<br/>


### 映射map
根据key值快速查找记录，查找的复杂度基本是Log(N)，如果有1000个记录，最多查找10次，1,000,000个记录，最多查找20次
`map<int, string> m;`定义了键是整数值是字符串的一个字典
插入
- `m.insert(pair<int, string>(1, "s1"));` 
- `m.insert(map<int, string>::value_type (2, "student_two"));`//和上面的插入有啥不一样 
- `m[3] = "student_three";`//字符串也可以这样取
:::warning 
当map中有这个关键字时，insert插入不了，但是用数组方式可以覆盖以前该关键字对应的值
:::     
迭代
- `for(iter = m=.begin(); iter != m=.end(); iter++){...}`
- `map.size()`
查找
- `iter = mapStudent.find(1);`
    - `iter->second` 通过map对象的方法获取的iterator数据类型是一个std::pair对象，包括两个数据 ` iterator->first` 和 ` iterator->second` 分别代表关键字和存储的数据。
交换和排序
- map中的swap不是一个容器中的元素交换，而是两个容器所有元素的交换。
- map中的元素是自动按Key升序排序，所以不能对map用sort函数；
函数
- `begin()` 返回指向map头部的迭代器
- `clear()`删除所有元素
- `count()` 返回指定元素出现的次数
- `empty()` 如果map为空则返回true
- `end()`   返回指向map末尾的迭代器
- `erase()`         删除一个元素
- `find()`          查找一个元素
- `size()`          返回map中元素的个数
- `swap()`           交换两个map
- `max_size()`      返回可以容纳的最大元素个数

### 栈stack
后进先出的值的排列 < stack >

`stack<int> s;`
- **`s.push(x);`** 入栈
- **`s.pop();`** 出栈
:::warning
注意，出栈操作只是删除栈顶元素，并不返回该元素。
:::
- **`s.top()`** 返回栈顶
- **`s.empty()`** 当栈空时，返回true。
- **`s.size()`** 访问栈中的元素个数
### 字符串string
众所周知C++处理字符串有点难过。不做最好用的库就是`#include <string>`,别带h。<br/>
**声明:**<br/>
`string s;string s="abcd";`或者`string s="a  b   cd";string s("xtsy")`这样。（空格也会被算进去的<br/>
**输入:**<br/>
`cin>>s; `            不能读入空格，以空格、制表符、回车符作为结束标志<br/>
`getline(cin,s);`   可以读入空格和制表符，以回车符作为结束标志<br/>
**长度:**<br/>
`int len=s.size();`    或者`int len=s.length();`返回一个int<br/>
`bool=s.empty();`        当前字符串是否为空<br/>
**下标字符:**<br/>
`s[i]`或 `char c=s.at(i)`返回的是一个char。<br/>
**转换:**<br/>
`s=str;string`类型=char数组;重载了运算符，直接就能转换。<br/>
`#include "string.h"`<br/>
`strcpy(str,s.c_str());`<br/>
**比较:**<br/>
`if(s1<s2);或s1.compare(s2);`<br/>
真返回1假返回-1<br/>
**拼接:**<br/>
`s1=s1+s2;`或`s1.append(s2);`<br/>
**查找:**<br/>
`s.find(s1)     `    查找s中第一次出现s1的位置，并返回（包括0）<br/>
`s.rfind(s1)     `   查找s中最后次出现s1的位置，并返回（包括0）<br/>
`s.find_first_of(s1)  `     查找在s1中任意一个字符在s中第一次出现的位置，并返回（包括0）<br/>
`s.find_last_of(s1)   `    查找在s1中任意一个字符在s中最后一次出现的位置，并返回（包括0）<br/>
`s.find_first_not_of(s1)   `      查找s中第一个不属于s1中的字符的位置，并返回（包括0）<br/>
`s.find_last_not_of(s1)    `     查找s中最后一个不属于s1中的字符的位置，并返回（包括0）<br/>

**插入:**<br/>
`s.insert(p,s);`在p0位置插入字符串s<br/>
`s.insert(p,s,n);`在p0位置插入字符串s的前n个字符<br/>
`s.insert(p,s);`在p0位置插入字符串s<br/>
`s.insert(p,s,pos,n);`在p0位置插入字符串s从pos下标(整数)开始的连续n个字符<br/>
`s.insert(p, n,c);`在p0处插入n个字符c<br/>


**截取:**<br/>
`s=s.substr(pos, n)  `  截取s中从pos开始（包括0）的n个字符的子串，并返回<br/>
`s=s.substr(pos)  `      截取s中从从pos开始（包括0）到末尾的所有字符的子串，并返回<br/>
**反转:**<br/>
`#include<algorithm>`<br/>
`reverse(s.begin(),s.end());`<br/>
:::warning
反转不返回会直接对原来的字符串进行操作
:::

**替换:**<br/>
`s.replace(pos, n, s1)  `     用s1替换s中从pos开始（包括0）的n个字符的子串<br/>
`#include<algorithm>`<br/>
`replace(str.begin(),str.end(),'a','b');`从开始到结尾a替换成b，也是对原串操作，而且只能对单个字符进行操作<br/>


## 参考资料列表
整理的时候想整理成一个来着，发现太长了就分成了俩，于是参考资料列表也在c中。
