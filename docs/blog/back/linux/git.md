---
title: git
date: 2019-11-5 15:16:35
categories: backEnd
tags:
- 代码之外
- 后端
- linux
---
## 工具测评
**gitkraken**  
基本功能齐全，还能追踪issue，支持本地仓库部署，不支持私仓库，付费可以单号基本功能都有，没必要付费。  
**tortoiseGit**  
超级好用，右键直接启用，占用资源小，有中文，有点复古不过还好，实用性抵消了不好看。  
**GitGUI**  
自带的没怎么用过。  
**SourceTree**  
免费，基本功能齐全，好用，不过不好看。  
**GitDesktop**  
不大好用，不是很习惯，而且每次打开还要安装  
## Git操作
### 初始化
这是<a href="https://rogerdudler.github.io/git-guide/index.zh.html">简单指南</a>，可以放在收藏夹想不起来了拿起来看看.  
git的<a href="https://mp.weixin.qq.com/s?src=11&timestamp=1573019956&ver=1957&signature=9yr-go0D6Rd9S1BhlQjlIHpIwVDRvoDp2-mOQxtSUxhwlroJBP2rAN-pqEeUcdp4TfuRwbNh9ogCZ8jsHOniwvuwbI1zt4n5uk*Byc9LEOzR6nmXwK8RlHmI-6IljzKk&new=1">工作流</a>，团队开发的范例。
装好之后先配置一下账户。  
**`git config --global user.name "ooowl" `**  
**`git config --global user.email "2411708618aqq.com"`**  
**`git config --global core.editor vim`**  
作者是谁，仓库commit会有你的名字，名字和email(名字可以重复但email一般唯一)并不作为身份标识，只是一个标记而已所有的独立提交不记名只验证公钥或github账号,你可以通过这样来查看  
**`git config user.name `**  
**`git config user.email`**  
进入到你想建立的目录下，用git init就会在该目录下生成一个.git文件夹，想知道这个文件夹里面是什么就自己去搜。  
### 查看
git status 看看自己目前仓库里未跟踪的文件，修改未提交的文件  
git log (--oneline) 查看所有的提交记录
### 基本的操作
git add .
git push
git fetch
git pull
git commit -m "你的提交信息"
git checkout 
git tag 
### 分支和合并
git merge
git rebase
git show
### ignore语法

## 服务器部署
## 工作流





