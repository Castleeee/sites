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
git log (--oneline --all --graph ) 查看所有的提交记录，回滚需要至少7位id，-p查看提交具体干了啥,--all查看所有的分支，--graph 尽可能用图形表示。
### 基本的操作
git add (.) 把文件添加到暂存区，未跟踪的文件可以直接添加为跟踪
git push 推送到分支
git fetch 从分支获取
git pull 获取分支
git commit -m "你的提交信息"
git checkout (id or -) 回到(某个or上一个)提交点，可以直接用tag名
git tag (-a 标签名 -m "标签信息") (id) 默认加在最近的commit上，如果想加其他commit 后面跟上id
 

### 分支和合并
git branch xxx  产生一个新分支，想回到某个点获取分支可以先checkout
git merge  xxx 将xxx合并到master，出现confilct的时候，大于号小于号和等号之间分别是两个分支不同的内容，最后需要在commit一次
git rebase 和mrege的作用是一样的，不过结果不同。
:::warning
:::
git show
### ignore语法

## 服务器部署
## 工作流





