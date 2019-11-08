---
title: webpack常识
date: 2019-11-1 20:38:45
categories: frontEnd
tags:
- 所有文章
- web
- 前端
- 语言基础
---
## yarn和npm
node 自带npm  
`npm init (-y)` 初始化  
`npm i (-g) packages` 安装（全局）  
`npm update packages` 升级  
`npm uninstall packages` 卸载  
关联文件package.json  
  
`npm install yarn -g` 全局安装yarn  
  
`yarn add packages`:增加包  
`yarn init`:初始化yarn目录  
`yarn install`:安装所有包  
`yarn publish`:发布？？  
`yarn remove packages`:删除某个包  
关联文件package.json和yarn.lock  
  
实在不行删node_modules,重新安  
  
修改全局包的存放位置  
查看配置：  
`npm config ls`  
修改目录：  
`npm config set prefix "E:\nodejs\npm"`  
`npm config set cache "E:\nodejs\npm\cache"`  
添加环境变量：  
`E:\nodejs\`  
`E:\nodejs\npm`  

## 正餐webpack4