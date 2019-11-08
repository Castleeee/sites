---
title: jQuery+Bootstrap
date: 2018-12-28 23:39:45
categories: frontEnd
tags:
- 所有文章
- 前端
- 语言基础
- web
---
:::danger
听从了老师的建议转用了iView<br/>
不用bootstrap和jQ了<br/>
不过好像差不多<br/>
:::
<!-- more -->
# jQuery+Bootstrap
## jQuery
### 咕咕咕~


## 接下来是Bootstrap
### 首先是可视化构建网站<br/>
 <a href='http://www.bootcss.com/p/layoutit/'>这个是中文的</a>好像不如英文的全<br/>
<a href='https://www.layoutit.com/build '>这是英文的</a>，反正都可以直接复制代码对于不专注前端的这些就够用,elementUI不能拖拽（遂弃之<br/>
中文站的一些代码复制到template的时候会失效，报错是<br/>
Uncaught DOMException: Failed to execute 'querySelector' on 'Document'无效的selector<br/>
英文版的没有出现，不知道是哪个地方冲突了希望后面不要有坑<br/>
哪个好心的程序猿解决了评论吱一声<br/>
![image.png](https://upload-images.jianshu.io/upload_images/12620393-29179e402d6f8859.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)<br/>
<br/>
### 基本知识
1. bootstrap提供的额外标签
```html
<mark></mark>文字描边加重<br/>
<del></del>文字带有删除线<br/>
<ins></ins>文字带有下划线<br/>
<strong></strong>加重<br/>
<small></small>减轻<br/>
<em></em>斜体<br/>
```
2. 文字对齐类
```html
<p class="text-left" ></p>文字左对齐<br/>
<p class="text-center" ></p>文字左对齐<br/>
<p class="text-right" ></p>文字左对齐<br/>

<p class="text-lowercase" ></p>文字左对齐<br/>
<p class="text-uppercase" ></p>文字左对齐<br/>
<p class="text-capitalize" ></p>文字左对齐<br/>
```
:::tip 元素属性
.pul-left元素浮动到左边<br/>
.pul-right元素浮动到右边<br/>
.center-block 设置元素为display:block 并居中显示<br/>
.clearfix清除浮动<br/>
.show强制元素显示<br/>
.hidden强制元素隐藏<br/>
.sr-only除了屏幕阅读器外，其他设备上隐藏元素<br/>
.sr-only-focusable|与.sr-only 类结合使用，在元素获取焦点时显示（如：键盘操作的用户）<br/>
.text-hide将页面元素所包含的文本内容替换为背景图<br/>
.close显示关闭按钮<br/>
.caret显示下拉式功能<br/>
:::
3. 表格样式<br/>
```html
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>头行
        <th>头标1</th>
        <th>头标2</th>
        <th>头标3</th>
        <th>头标4</th>
      </tr>
    </thead>
    <tbody>
    <tr class="danger">
      <td>content1</td>
      <td>content2</td>
      <td>content3</td>
      <td>content4</td>

    <tr class="warning">新开一行
      <td>content1</td>
      <td>content2</td>
      <td>content3</td>
      <td>content4</td>
    </tr>

    <tr class="info">
      <td>content1</td>
      <td>content2</td>
      <td>content3</td>
      <td>content4</td>
    </tr>
    <tr class="success">
      <td>content1</td>
      <td>content2</td>
      <td>content3</td>
      <td>content4</td>
    </tr>
    </tbody>
```
:::warning 这是警告黄
柔和灰（text-muted）<br/>主要蓝（text-primary）<br/>成功绿（text-success）<br/>信息蓝（text-info）<br/>警告黄（text-warning）<br/>危险红（text-danger）<br/>这一行（列）都会变成这样，bootstrap的颜色也大部分是这样来的
:::
4. 表单
用一个div包裹起来的表单对div进行改变样式即可<br/>
form-contorl是表单的样式<br/>
```html
<from class="form-inline">#加了这个class 就会横向排列啦
<div class="form-group">
<input type="text" class="form-control" placeholder="这是一个输入框" input-lg>有input-lg就会变大sm就会变小
</div>
<div class="form-group has-success">#会改变颜色
<label for="">这是一个选择框：</Label>
<select class="form-control" name="" id="" >
<option value="">北京</option>
<option value="">北京</option>
<option value="">北京</option>
<option value="">北京</option>
</select>
</div>
<div class="form-group">
<label for="">这是一个文本框：</label>
<textarea class="form-control" name=""  id="" cols="30" rows=1"10"></textarea>
</div>
</from>
```
5. 按钮<br/>
需要更多样式直接去<a href='http://www.bootcss.com/'>bootstrap官网</a>找找<br/>
```html
<button class="btn btn-default btn-1g">这是一个按钮</button>
<button class="btn btn-success btn-sm">这是一个按钮</button>
<button class="btn btn-primary activel">这是一个按钮</button>
<button class="btn btn-info btn-blockl">这是一个按钮</button>
<button class="btn btn-warning"disabled="disabled">这是一个按钮</button>
<button class="btn btn-danger">这是一个按钮</button>
<button class="btn btn-link">这是一个按钮</button>
<a class="btn btn-danger" href="">这是a标签所写的按钮效果</a>
```
![对应的按钮效果](https://upload-images.jianshu.io/upload_images/12620393-86e6efe8d6326e49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)<br/>
<Valine></Valine>