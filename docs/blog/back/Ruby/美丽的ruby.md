---
title: BeautifulRuby
date: 2019-7-27
next: ./rails.md
categories: backEnd
tags: 
- 后端
- 语言基础
- Ruby
---

:::tip Ruby
优♂雅著称的Ruby💎
:::
<!-- more -->

## 环境
### 安装
ruby的环境win下和linux下是不一样的，安装方式自己去找。  
wins下不建议使用，因为Rails和rvm gem在win下不好用。但ruby本身能用。主要说下Linux下。  
linux下使用rvm+gem管理ruby类比下py的virtualenv和pip conda   
<br/>
参考rubyChina<a href="https://ruby-china.org/wiki/install_ruby_guide">这一篇</a>,装之前先把自己该装的`libssl libssl-dev zlib build-essential openssl wget sudoer gnupg2`等等都装好
有时候那个gpg密钥会失效，按照错误提示获取或者自己去网上找找还能用的密钥。按照上面说的修改下源。 
安装顺序为 rvm->ruby->gem   

<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">Rvm常用命令</I></B></summary>

```yml

```

</details>

--------------------

安装ruby，我看的博客上不成功换了root，我的成功了  
`rvm install ruby`  
测试一下<br/>
`ruby --version`一般会给你下载最新的稳定版
<br/>

>ruby 2.6.0p0 (2018-12-25 revision 66547) [x86_64-linux]<br/>

<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">Ruby常用命令</I></B></summary>

```yml

```

</details>

-------------------
<br/>
在rvm中安完了ruby默认都带了个gem  
<br/>  


 `gem`  



>#RubyGems is a sophisticated package manager for Ruby.  This is a...(输出太长了不写 

<br/>

<details>
  <summary><B><I style="cursor:pointer; color: #0e5870">gem常用命令</I></B></summary>

```yml

```

</details>

-------------------
查看gem的源    
`gem sources -l`  


啥也没有，添加一个国内源  
`gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/`   
`gem sources -l`


> *** CURRENT SOURCES ***<br/>
 https://gems.ruby-china.org/

安装好ruby之后直接输入irb就进入了ruby的命令行，也是和py一样，exit，exit()，Ctrl+B退出  
ruby和rvm和gem都是 version，-v或--version 输出版本号。ruby文件后缀名为`.rb`  
win下用rubyMine会直接检测你的ruby环境，linux下先`source /etc/profile.d/rvm.sh`,会在当前session激活rvm。
 
### Rails
等你学完Ruby用到Rails的时候再来看，可以跳过。  
还是参考rubyChina<a href="https://ruby-china.org/wiki/install_ruby_guide">这一篇</a>  
`gem install bundler`  
`gem install rails`  
如果顺利的话就完成了，主要讲一下是啥，bundler也是用来管理包的，单独管理本项目的gem包
## HelloWorld
`puts "HelloWorld"`  
ruby的语法很少而且十分自由，
 
 <Valine></Valine>

 
 
 
 
 
 
 
 