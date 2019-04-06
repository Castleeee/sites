---
title: R语言的基础知识
date: 2018-1-1 20:38:45
categories: backEnd
tags:
- 数据挖掘
- R语言
- 语言基础
- 后端
---


## 基础部分

### 赋值处理
 x<-5 #将5赋值给x（x=5也行但一般不这么用？？<br/>
y<-c(1,2,3,4,5,6)#一个数组<br/>
z<-rnorm(6)#生成6个服从正态分布的随机数<br/>
mean（数组）求数组的平均值<br/>
sd（标准差）<br/>
core（数组a，数组b）求ab的强弱线性关系系数没有就不出来<br/>
matrix(data=NA默认，nrow=1行，ncol=1列，byrow=FALSE默认不按行填充，dimnames=NULL行列名称list（行名字，列名字）)<br/>
5:24从5 到24连续的数字<br/>
![访问行列](https://upload-images.jianshu.io/upload_images/12620393-84c6c788204229b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<br/>三维数组也是一样的操作[1,2,3]，想象一个立方体<br/>

### 查看变量
ls（）<br/>
head（某个数据集【没有引号）查看前五条<br/>
help（"mean"）#获取本函数的帮助，很有用<br/>
getwd（）获取当前的工作空间<br/>
setwd（["path"]）把工作空间移动到其他地方<br/>
history（）获取以前输入的神么东西<br/>
load（["file-path"]）加载某一个空间<br/>
养成建立空间的习惯<br/>
https://cran.r-project.org/web/packages/戳这里下载包<br/>
library()查看有什么包<br/>
help(package="base")#查看包详情<br/>
install.packages("包名"）自己安完了<br/>
安完了不能直接用<br/>
library（"car"）之后才能使用包里面的函数<br/>
update.packages()更新包<br/>
默认带了base datasets graphics methods等包<br/>
lm（a~b，data=x）用x的数据集，分析字段a和b的线性关系会得到一个相关性的值<br/>
plot（变量）将该变量化成图一般作用于结果<br/>
![R的数据结构](https://upload-images.jianshu.io/upload_images/12620393-f1c59a100bee11ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
a<-c(1,2,3,4,5)<br/>
a[1]=1<br/>
a[c(1,2,5)]=1,2,5<br/>

<Valine></Valine>
