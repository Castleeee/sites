---
title: iview-UI和VUX
date: 2019-01-02 11:28:37
categories: frontEnd
tags:
- iview
- 前端
- 语言基础
- web
- 错误记录
---

:::tip 前端UI套件
VUX 适配手机端
:::
<!-- more -->
# iview
嗷嗷
# iview admin
啊啊
# VUX
vux需要配置一堆东西，但是本着不求甚解的原则在github上找到了一个<a href="https://github.com/hookszhang/vue-cli-plugin-vux">插件</a>（脚本？）直接命令行vue add vux自动配好.不过有几个问题要注意下
- 建议新项目直接安装，issue里面说老项目会把原来的配置都干掉（淦）。
- 如果TypeScript会出错js不会，我已经提交了issue。


# cordova打包vue
今晚回去试试。
# 问题
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