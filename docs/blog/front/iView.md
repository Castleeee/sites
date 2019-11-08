---
title: iview-UI和VUX
date: 2019-01-02 11:28:37
categories: frontEnd
tags:
- 所有文章
- iview
- 前端
- 语言基础
- web
- 错误记录
---

:::tip 前端UI套件
VUX 适配手机端  
可以先看上一篇搭建helloworld
:::
<!-- more -->
## iview
直接vue add iview然后自己就安好了，美滋滋。  



## iview admin

## VUX
直接vue add vux然后自己就安好了，美滋滋。  

## cordova打包vue
需要安卓SDK环境，顺带就安了个Android Studio+SDK+Gradle，java东西真的多（虽然我还没开始研究。<br/>
参考<a href='https://www.jianshu.com/p/25d797b983cd'>这个</a>,能弄起来。

<h3>环境安装</h3>

:::tip 我的基本环境
vue --version<br/>
node --version <br/>
npm --version<br/>
vux--<br/>
cordrova--<br/>
:::
- npm install -g cordova
- 安装SDK+android studio+Gradle见环境管理<a href='/blog/back/java/java环境管理.html'>java部分</a>
<h3>新建工程</h3>

- 新建
```js
cordova create cordovaApp com.cordova.testapp
cd cordovaApp
cordova platform add android
```
- 按照博客上写的修改项目我没有出错就先不写了
- 先在vue项目中运行`npm run build`
- 在cordova中运行
  - 把dist文件夹里面的所有文件复制到你的cordova项目的www文件夹下替换它原有的文件。
  - cordova build android

生成完毕，得到一个可执行的apk文件就可以运行啦,爽到~


## 问题
1. vuepress dev: throws res.getHeader() is not a function<br/>
经群里的讨论以及四处寻找，确定并不是电脑的问题。1.x的vuepress不会出现该问题，但是1.x不兼容0.x的主题。
应该是webpackmiddlware的版本问题，换回版本就可以了
:::tip
vue --version<br/>
node --version <br/>
npm --version<br/>
查看版本号<br/>
vue ui网页项目控制台<br/>
:::

<Valine></Valine>