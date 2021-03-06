---
title: python实战提高
date: 2018-1-1 20:38:45
prev: ./python进阶.md
next: false
categories: backEnd
tags:
- python🐍
- 错误记录
- 后端
- 所有文章

---
:::tip 这里是遇到的一些问题和积累
有时候花了很久才发现根本不能用<br/>
希望给别人一点帮助
:::
<!-- more -->
## 中国天气网的接口免费获取天气
以前那个坏了。
## pyinstaller打包问题
:::tip 环境
pywin32
:::
给一个老师做的心理测试的软件忙活这几天也学到了好多东西<br/>
1. 用32bit系统编译，软件可以在x86x64运行（虚拟机也不行必须是32位电脑）

2. 最低要求.NET3+，vc++2015才能运行

3. 不要随随便便引入，会很卡
:::warning
打包会把当前使用的env所有包管你用没用到的都打进来<br/>
最好新建一个env进行操作
:::
4. 使用pip方式安装的Pyinstaller打包方式
   打开cmd窗口，把路径切换到文件所在路径(文件随便放在哪里都行)打开命令提示行，输入以下内容（最后的是文件名）：

           pyinstaller -F myfile.py

   :::tip 额外的参数

       -F 表示生成单个可执行文件
       -w 表示去掉控制台窗口，这在GUI界面时非常有用。
       -p 表示你自己自定义需要加载的类路径，一般情况下用不到
       -i 表示可执行文件的图标
   :::
5. 打包时--hidden-import=queue -F -w -i 文件utf-8编码

## pyhook的缺陷
hook_3k不支持64bit的python只能忍受pyhook的莫名其妙报错<br/>
建议用Qt
## 软件的高可用性

计算机系统的可用性用平均无故障时间（MTTF）来度量，即计算机系统平均能够正常运行多长时间，才发生一次故障。
系统的可用性越高，平均无故障时间越长。可维护性用平均维修时间（MTTR）来度量，即系统发生故障后维修和重新恢复正常运行平均花费的时间。
系统的可维护性越好，平均维修时间越短。计算机系统的可用性定义为：MTTF/(MTTF+MTTR) * 100%。由此可见，计算机系统的可用性定义为系统保持正常运行时间的百分比。
图书《可伸缩架构：面向增长应用的高可用》
## python的一些
### int(x,base)
作用是把x看作base进制转换到十进制
### 二进制操作<br/>


| 运算符        | 描述           | 实例  |
| ------------- |:-------------:| -----:|
| &      | 按位与运算符：参与运算的两个值如果两个相应位都为1的结果为1.否则为0| 则该位（a&b）输出结果12二进制解释：000011001 |
|  ▏   | 按位或运算符：只要对应的二个二进位有一个为1时，结果位就为1        |   （a▏b）输出结果61，二进制解释：00111101 |
| ^ | 按位异或运算符：当两对应的二进位相异时，结果为1      |   （a^b）输出结果49，二进制解程：00110001|
| &      | 按位与运算符：参与运算的两个值如果两个相应位都为1的结果为1.否则为0| 则该位（a&b）输出结果12二进制解释：000011001 |
| ~      | 按位取反运算符：对数据的每个二进制位取反，即把1变为0.把0变为1,~x类似于-x-1,~     |   （~a）输出结果-61，二进制解释：11000011，在一个有符号二进制数的补码形式。 |
| << | 左移动运算符：运算数的各二进位全部左移若干位，由“<<“右边的数指定移动的位数，高位丢弃，低位补0。      |a<<2输出结果240，二进制解释：11110000|
| >> | 右移动运算符：把”>>“左边的运算数的各二进位全部右移若干位，“>>”右边的数指定移动的位数      |a>>2输出结果15，二进制解释：00001111|
### 就地进行的函数
#### 列表
- extend
- sort
## 集合常用的
### 标准类型操作符(所有的集合类型)<br/>
#### 成员关系 (in, not in)<br/>
- 就序列而言，Python中的in和not in操作符决定某个元素是否是一个集合中的成员。<br/>
#### 集合等价/不等价<br/>
- 等价/不等价被用于在相同或不同的集合之间做比较。两个集合相等是指，对每个集合而言，当且仅当其中一个集合中的每个成员同时也是另一个集合中的成员。也可以说每个集合必须是另一个集合的一个子集， 即s <= t 和s>= t 的值均为真(True)，或(s <= t and s>= t) 的值为真(True)。集合等价/不等价与集合的类型或集合成员的顺序无关，只与集合的元素有关。
#### 子集/超集<br/>
- set用Python的比较操作符检查某集合是否是其他集合的超集或子集。“小于”符号（<、<=）用来判断子集，“大于”符号（>、 >= ）用来判断超集。“小于” 和 “大于”意味着两个集合在比较时不能相等。等于号允许非严格定义的子集和超集。
- set支持严格( < )子集和非严格 ( <= ) 子集，也支持严格( > )超集和非严格 ( >= )超集。只有当第一个集合是第二个集合的严格子集时，我们才称第一个集合“小于”第二个集合。同理，只有当第一个集合是第二个集合的严格超集时，我们才称第一个集合“大于”第二个集合。

#### 对象值的比较

任何相同类型的对象都可以比较，格式为:a == b，在python2.3之前类型不具有布尔值，返回值为1 0；<br/>2.3版本之后返回只为 True False<br/>

#### 对象身份的比较<br/>

- obj1 is obj2  --obj 与obj2是同一个对象  return True False<br/>

- obj1 is not obj2 --obj 与obj2是同一个对象  return True False<br/>

#### 布尔类型--python中的与、或、非

布尔类型的优先级依次为：not>and>or
<br/>--实现功能为逻辑 非 与 或


### 集合类型操作符(所有的集合类型)
#### 联合( | )
- 联合(union)操作和集合的 OR(又称可兼析取(inclusive disjunction))其实是等价的，两个集合的联合是一个新集合，该集合中的每个元素都至少是其中一个集合的成员，即属于两个集合其中之一的成员。联合符号有一个等价的方法：union()。
#### 交集( & )
- 可以把交集操作比做集合的AND(或合取)操作。两个集合的交集是一个新集合，该集合中的每个元素同时是两个集合中的成员，即属于两个集合的成员。交集符号有一个等价的方法：intersection()。
#### 差补/相对补集( – )
- 两个集合(s 和 t)的差补或相对补集是指一个集合 C，该集合中的元素，只属于集合 s，而不属于集合 t。差符号有一个等价的方法：difference()。
#### 对称差分( ^ )
- 和其他的布尔集合操作相似，对称差分是集合的XOR（又称“异或” (exclusive disjunction)）。两个集合(s 和 t)的对称差分是指另外一个集合C，该集合中的元素，只能是属于集合 s 或者集合t的成员，不能同时属于两个集合。对称差分有一个等价的方法：symmetric_difference()。
#### 混合集合类型操作
- 如果左右两个操作数的类型相同，既都是可变集合或不可变集合，则所产生的结果类型是相同的。但如果左右两个操作数的类型不相同（左操作数是 set，右操作数是 frozenset，或相反情况），则所产生的结果类型与左操作数的类型相同 。
:::warning 注意
加号不是集合类型的运算符。
:::

        >>> t | s
        frozenset(['c', 'b', 'e', 'h', 'k', 'o', 'p', 's'])
        >>> t ^ s
        frozenset(['c', 'b', 'e', 'k', 'p'])
        >>> s | t
        set(['c', 'b', 'e', 'h', 'k', 'o', 'p', 's'])
        >>> s ^ t
        set(['p', 'b', 'e', 'k', 'c'])

### 集合类型操作符(仅适用于可变集合)
#### (Union) Update ( |= )
这个更新方法从已存在的集合中添加（可能多个）成员，此方法和update()等价。

          >>> s = set('cheeseshop')
          >>> s |= set('pypi')
          >>> s
          set(['c', 'e', 'i', 'h', 'o', 'p', 's', 'y'])

#### 保留/交集更新( &= )
- 保留（或交集更新）操作保留与其他集合的共有成员，此方法和 intersection_update()等价。
#### 差更新 ( –= )
- 对集合s和t进行差更新操作s-=t，差更新操作会返回一个集合，该集合中的成员是集合s去除掉集合t中元素后剩余的元素。此方法
和difference_update()等价。
#### 对称差分更新( ^= )
- 对集合s和t进行对称差分更新操作(s^=t)，对称差分更新操作会返回一个集合，该集合中的成员仅是原集合s或仅是另一集合t中的成员。此方法和symmetric_difference_update()等价。
参考了<a href='https://www.jb51.net/article/71267.htm'>这里</a>
## 字符串
从右向左查，
- rfind
- ljust(长度,'填充字符')
<Valine></Valine>