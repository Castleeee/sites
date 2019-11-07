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
装好之后先配置一下账户。  
**`git config --global user.name "ooowl" `**  
**`git config --global user.email "2411708618aqq.com"`**  
**`git config --global core.editor vim`**  
作者是谁，仓库commit会有你的名字，名字和email(名字可以重复但email一般唯一)并不作为身份标识，只是一个标记而已所有的独立提交不记名只验证公钥或github账号,你可以通过这样来查看  
**`git config user.name `**  
**`git config user.email`**  
进入到你想建立的目录下，用git init就会在该目录下生成一个.git文件夹，想知道这个文件夹里面是什么就自己去搜。  
### 查看
**`git status`** 看看自己目前仓库里未跟踪的文件，修改未提交的文件  
**`git log (--oneline --all --graph ) `** 查看所有的提交记录，回滚需要至少7位id，-p查看提交具体干了啥,--all查看所有的分支，--graph 尽可能用图形表示。  
**`git reflog `** 查看命令历史，以便确定要回到未来的哪个版本  
**`git remote -v`** 查看你的远程仓库的路径  
### 基本的操作
**`git clone Address `** 克隆项目  
**`git add (.) `** 把文件添加到暂存区，未跟踪的文件可以直接添加为跟踪  
**`git restore`**   
**`git push -u origin master`** 推送到 远程的master分支  
**`git fetch`** 从分支获取  
**`git pull`** 获取分支  
**`git commit -m "你的提交信息"`**  
**`git checkout (id or -)(/path/file)`** 回到(某个or上一个)提交点，可以直接用tag名,跟文件名可以直接修改单独某个文件  
**`git tag (-a 标签名 -m "标签信息") (id)`** 默认加在最近的commit上，如果想加其他commit 后面跟上id  
**`git remote add Name RemoteAddress.git`** 添加一个远程仓库地址。  
:::tip
https是无状态的，使用https提交每次都要输入用户名和密码，SSH url克隆需要在克隆之前先配置和添加好SSH key，ssh默认是每次fetch和push代码都不需要输入账号和密码，如果你想要每次都输入账号密码才能进行fetch和push也可以另外进行设置。
:::

### 分支和合并
**`git branch xxx`**  产生一个新分支，想回到某个点获取分支可以先checkout  
**`git merge  xxx`** 将xxx合并到master，出现confilct的时候，大于号小于号和等号之间分别是两个分支不同的内容，最后需要在commit一次  
**`it rebase `** 和mrege的作用是一样的，不过结果不同。  

:::warning
merge会在head后面紧接着提交，合并后自动提交一次作为标记，worktree会有一个分支记录。  
rebase会在分支根提交点处接着提交，之后再跟上master该节点之后的的提交，worktree不会有分支记录。
:::

**`git show (id or tag)`** 查看这次id和tag的详细信息，包括提交时间作者提交了啥等等  

图解（源水印）  
<div align=center ><img src="./static/TQDj8Uo1pj3YkMSoeSitYC1QB4a019V68N6GZFBE.png" style="height: 450px"/></div>  

### ignore语法
史上最全的<a href='https://github.com/github/gitignore'>gitignore语法</a>模板  

## 服务器部署

## 工作流
git的<a href="https://mp.weixin.qq.com/s?src=11&timestamp=1573019956&ver=1957&signature=9yr-go0D6Rd9S1BhlQjlIHpIwVDRvoDp2-mOQxtSUxhwlroJBP2rAN-pqEeUcdp4TfuRwbNh9ogCZ8jsHOniwvuwbI1zt4n5uk*Byc9LEOzR6nmXwK8RlHmI-6IljzKk&new=1">工作流</a>，团队开发的范例。

## 参考


