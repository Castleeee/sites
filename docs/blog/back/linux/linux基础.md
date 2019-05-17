---
title: linux
date: 2019-5-7 15:16:35
categories: backEnd
tags:
- 代码之外
- 后端
- linux
---
:::tip 思考
拿到linux一般要干嘛：apt换源，ssh允许远程登陆，装上docker🤔还有呢？
:::

## 快捷键&命令
不全，用哪算哪，最熟的肯定是最常用的，学了又不是为了考试，用得顺手为准。   
命令行有很多种unix用的shell，linux的bash林纳斯·本纳第克特·托瓦兹Linus Benedict Torvalds这吊人发明的。本质上是找到对应的程序去执行。
另外有很多衍生出来的tash，dash之类的不常用，暂时不用管   
<br/>
<details>

  <summary><B><I style="cursor:pointer; color: #0e5870">Click to See More！</I></B></summary>

<h3>快捷键</h3>

:::tip
linux光标很宽，光标盖住的那个字符就是后面的字符
:::

- ctrl+p/n 上一条命令↑/下一条命令↓  
- ctrl+f/b →后←前移动光标  
- ctrl+h/d  backspace删除前面的字符/del删除后面的字符
- **ctrl+u/K 删除光标前/后面的**
- **ctrl+a 命令头部**
- **ctrl+e 命令尾部**  
- **ctrl+l 清屏**
- Ctrl+c 终止当前执行程序
- Ctrl+d 相当于exit命令，退出当前shell
- Ctrl+s 挂起当前shell，你可以理解为冻结
- Ctrl+q 解冻挂起的shell，解不开就重新连接打开一个终端，reboot linux 或 kill 相关进程。
<h3>命令</h3>

- history历史
- date当前日期
    - Fri May 17 15:10:45 CST 2019   
- clear清屏
- pwd查看当前目录  
- 直接用-可以在两个相邻的目录切换
- 安了autojump之后可使用j跳转。 
- tree树结构贼好用(apt-get install tree)


</details>

## 目录结构
linux文件系统是树状结构，每个磁盘，文件，文件夹，驱动全都是文件，也没有后缀名一说。  
:::danger
<B style="color:red;font-size:25px">If you don't know what it is, please don't modify it</B>
鲁迅曾经说过:如果不你不知道这个东西是干嘛的，不要修改它。下面打勾的都是。
:::

<details>
<summary><B><I style="cursor:pointer; color: #0e5870">Click to See More！</I></B></summary>

- bin(<B style="color:red">√</B>)
    - Binary常用的一些命令都放在了这里面
    - ls /bin/就可以看到所有命令
- boot(<B style="color:red">√</B>)
    - 存放是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。
- dev(<B style="color:red">√</B>)
    - dev就是Device，存放的是Linux的外部设备，在Linux中访问设备和驱动当成文件一样访问
- etc
    - 存放所有的系统管理和自己的安装文件的配置文件和其子目录
- home
    - 用户的主目录，宿主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名是用户的账号名
    - 有几个文件夹就有几个用户，不要闲的没事去创建
- lib(<B style="color:red">√</B>)
    - 存放共享库和动态链接库，如果你不知道这是干嘛的，不要动这个
- lib64(<B style="color:red">√</B>)
    - 同lib
- lost+found
    - 一般是空的，非法关机就会在里面留下点什么
- media
    - 系统会自动识别外设，u盘，光驱，硬盘之类的，挂载到media里面
- mnt
    - 如果无法自动识别外设，需要手动挂载，就放这里面了
- opt
    - 默认为空，你想安装额外的软件就可以扔到这里面
- proc(<B style="color:red">√</B>)
    - 虚拟目录，实质上是一些内存映射。可以直接通过访问这个文件夹里的东西来修改内存
- root
    - root用户的~目录，别人都没权限哒
- sbin(<B style="color:red">√</B>)
    - SuperUser缩写，root用户专用的bin
- run(<B style="color:red">√</B>)
    - 存储了进程信息，一大堆.pid文件
    - 能不能删除呢，咱也不知道咱也不敢问
- srv
    - 主要用来存储本机或本服务器提供的服务或数据。（用户主动生产的数据、对外提供服务）
- sys
    - 这是linux2.6内核之后的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统sysfs，sysfs文件系统集成了下面3种文件系统的信息：针对进程信息的proc文件系统、针对设备的devis文件系统以及针对伪终宾的devpts文件系统。该文件系统是内核设备树的一个直观反映。当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统种波创建。
- tmp
    - 保存在使用完毕后可随时销毁的缓存文件。（有可能是由系统或程序产生、也有可能是用户主动放入的临时数据、系统会自动清理）
- usr
    - UserSoftwareResource用户软件资源
    - 大部分的软件按这里面，一些会安到opt
    - /usr/bin用户软件启动目录(<B style="color:red">√</B>)
    - /usr/sbin超级用户(root)软件启动目录 (<B style="color:red">√</B>)
- var(<B style="color:red">√</B>)
    - 经常修改和扩充的文件都放在这里
    - 系统产生的不可自动销毁的缓存文件、日志记录。（系统和程序运行后产生的数据、不对外提供服务、只能用户手动清理）（包括mail、数据库文件、日志文件）
    - mali的预设？？？
     
:::warning
~ 代表是home目录，也就是家目录， / 代表的是根目录。  
用户登录后在~目录 普通用户为 /home/用户名，root用户单独在/root  
家目录用户才有权限操作，权限可分配，root可以操作所有人的~
:::

</details>

## 文件

### 类型

<div align= center>

默认的终端颜色，更改过的终端可能不一样

|颜色|类型|
|:------:|:----:|
|白色|普通文件|
|蓝色|目录文件|
|绿色|可执行文|
|红色|压缩文件|
|浅蓝色|链接文件(软硬连接)|
|黄色|设备文件{块(硬盘)，字符(键盘)，管道}|
|灰色|其他文件|
|.开头|隐藏文件目录，ls/tree的时候需要 -a|


</div>

ls -al查看所有文件(-a)详细信息(-l)


## 用户
### sudo和su
使用su +用户名字可以切换用户，不填就是root用户。  
普通用户的bash后面是$而root的bash后面是#  

sudo由`/etc/sudoer`控制，只有在这里允许了用户才能使用sudo，在sudoer文件中添加(最好和自带的放一块且对齐)`[user]    ALL=(ALL:ALL) ALL`.sudoer只能同时被一个用户编辑。  
sudo是使用root的身份运行，让你输入当前用户的密码，sudo 默认在输入一次密码后 15 分钟内不会再次要求密码。    
`Defaults env_reset`改为`Defaults env_reset,timestamp_timeout=[new-value]`控制在几分钟内不用输密码
- 0每次输入都要输
- -1会永久维持会话（sudo -s之后本次会话就一直sudo了，和su一样）。  

`Defaults env_reset`改为,`Defaults env_reset,pwfeedback`在输密码的时候会有星号。






















































































