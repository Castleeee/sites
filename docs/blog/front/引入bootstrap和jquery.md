---
title: vue引入Bootstrap和jQuery
date: 2019-1-1 16:00:45
categories: frontEnd
tags:
- vue
- 前端
- 语言基础
- web
sidebar: false
---

:::danger
vue里面强烈不建议使用，在老师的建议下转向iview和vux
:::
<!-- more -->
# vue引入bootstrap和jQuery
参照着<br/>这个
<a href='https://segmentfault.com/a/1190000015765805'>这个</a>和
<a href='https://blog.csdn.net/qq_34200964/article/details/81436449'>这个</a>
做的<br/>
先<a href='/blog/front/菜鸡vue.html'>新建一个vue</a>

:::warning
cnpm install jquery --save-dev<br/>
cnpm insatll bootstrap --save-dev<br/>
我这里提示缺少popper.js依赖，缺啥安啥<br/>
cnpm install --save  popper.js<br/>
:::
修改webpack<br/>
build文件夹下的webpack.base.conf.js<br/>
- 在开头加入var webpack=require('webpack');<br/>
- 在module.exports最后面加入（即webpack.base.conf.js文件末尾加入）plugins块；<br/>
- 修改resolve块<br/>

```js
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

var webpack=require('webpack');//修改这里

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': path.resolve(__dirname, '../src/assets'),//这里
      'jquery': "jquery/src/jquery"//这里
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [//添加这个pluging
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
}

```
:::tip 在mian.js中直接引入<br/>
import 'jQuery'<br/>
import 'bootstrap/dist/css/bootstrap.min.css'<br/>
import 'bootstrap/dist/js/bootstrap.min'<br/>
:::
实验代码<br/>
把这个粘贴进一个组件中<br/>
```html
 <template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <div class="btn-group" role="group" aria-label="...">
      <button type="button" class="btn btn-info">Left</button>
      <button type="button" class="btn btn-primary">Middle</button>
      <button type="button" class="btn btn-success">Right</button>
    </div>
    <div id="cc">cc</div>
    <h4>提示工具（Tooltip）插件 - 锚</h4>
这是一个 <a href="#" class="tooltip-test" data-toggle="tooltip"
        title="默认的 Tooltip">
    默认的 Tooltip
</a>.
这是一个 <a href="#" class="tooltip-test" data-toggle="tooltip"
        data-placement="left" title="左侧的 Tooltip">
    左侧的 Tooltip
</a>.
这是一个 <a href="#" data-toggle="tooltip" data-placement="top"
        title="顶部的 Tooltip">
    顶部的 Tooltip
</a>.
这是一个 <a href="#" data-toggle="tooltip" data-placement="bottom"
        title="底部的 Tooltip">
    底部的 Tooltip
</a>.
这是一个 <a href="#" data-toggle="tooltip" data-placement="right"
        title="右侧的 Tooltip">
    右侧的 Tooltip
</a>

<br>

<h4>提示工具（Tooltip）插件 - 按钮</h4>
<button type="button" class="btn btn-default" data-toggle="tooltip"
        title="默认的 Tooltip">
    默认的 Tooltip
</button>
<button type="button" class="btn btn-default" data-toggle="tooltip"
        data-placement="left" title="左侧的 Tooltip">
    左侧的 Tooltip
</button>
<button type="button" class="btn btn-default" data-toggle="tooltip"
        data-placement="top" title="顶部的 Tooltip">
    顶部的 Tooltip
</button>
<button type="button" class="btn btn-default" data-toggle="tooltip"
        data-placement="bottom" title="底部的 Tooltip">
    底部的 Tooltip
</button>
<button type="button" class="btn btn-default" data-toggle="tooltip"
        data-placement="right" title="右侧的 Tooltip">
    右侧的 Tooltip
</button>
  </div>
</template>
<script>
  $(function () {
    alert(123);
    $(".btn:eq(1)").click(function(){
      alert("abc");
    })
  });
  $(function () { $("[data-toggle='tooltip']").tooltip(); });
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
```
效果是这样的<br/>
![直接拖拽完美](https://upload-images.jianshu.io/upload_images/12620393-f4dbd5bcaeb87092.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## *一些教程啊*
<a href='/blog/front/jQuery%2Bbootstrap.html'>Bootstrap和jQ看这里</a><br/>
<a href='http://www.runoob.com/bootstrap4/bootstrap4-tutorial.html'>菜鸟Bootstrap</a><br/>
<a href='http://www.runoob.com/jquery/jquery-tutorial.html'>菜鸟jQuery</a><br/>
<Valine></Valine>
