---
title: C环境配置
date: 2019-11-2 17:19:47
prev: false
next: ./C.md
categories: backEnd
sidebar: false
tags:
- 后端
- C/C++
---


:::warning
一步到位cygwin！
:::
<!-- more -->
Clion下载安装不用我说  
去<a href="https://cygwin.com/install.html">官网</a>下载一个包，1.7M很小,打开，一路下一步，到这一步的时候填入网易的镜像源`http://mirrors.163.com/cygwin`,add，下一步。
<div align=center ><img src="./static/QQ图片20191102141224.jpg" style="height: 450px"/></div>  
继续下一步，安装模块是最重要的一步，我们只用基本的GCC写写C/c++，依次搜索  
gcc-core，gcc-g++，make，gdb，binutils，cmake。详细操作看下图。
  <br/>

<div align=center ><img src="./static/QQ图片20191102142828.png" style="height: 450px"/></div>  

之后无脑下一步。  
安完之后进Clion
- 进入设置 Build, Execution, Deployment -> Toolchians
- 点击添加， Environment处选择Cygwin，然后选择刚才安装的路径
<div align=center ><img src="./static/dsfgdhsf.png" style="height: 450px"/></div>  
大功告成~  
参考资料

- <a href="https://blog.csdn.net/amoscn/article/details/88656010">clion以及cygwin的安装与配置</a>