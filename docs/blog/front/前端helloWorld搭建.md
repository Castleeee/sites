---
title: 前端helloWorld搭建
date: 2019-04-13 15:28:37
categories: frontEnd
tags:
- iview
- 前端
- 语言基础
- web
- 环境管理
---

## 新建vue
vue/cli3  
- vue ui直接创建
- vue create hello-world  //项目名，最后三个选项选no不启用严格模式<br/>
- cnpm install<br/>
- cnpm run serve //自己可以去package.json改为dev<br/>
能跑了就行
## 安装iview或者vux
vue add iview或vux，等一会就好了  
在src下就有了plugin文件夹，在里面按需引入，全局使用  
```py
import Vue from 'vue'
import { Button } from 'iview'

import 'iview/dist/styles/iview.css'

Vue.component('Button', Button)

```
## 安装mock
- `npm install mockjs`
- 在src下新建mock文件，里面新建index.js写入

```js
import Mock from 'mockjs'

import getNewsList from './getNewsList'
let data = [].concat(getNewsList)//想放啥接口放啥
data.forEach(function (res) {
  Mock.mock(res.path, /get|post|delete|patch|put/i, res.data)
})

export default Mock
```

在mock下新建`./getNewsList`

```js
var data = {
  'login': 'aaaaaaaaaaaaaaaaa'
}
export default [
  {
    path: '/getNewsList',
    data: data
  }
]
```

- main.js添加`import './mock/index.js'`  

这样直接axios请求接口就能拦截了，注意生产环境把main.js里面的mock注释掉
## 安装axios
- `npm install axios vue-axios`
- 在mian.js中

```js
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```
调用的时候
```js
  methods: {
    getNewsList () {
      console.log('xxxxxxx')
      this.axios.get('/getNewsList').then((response) => {
        console.log(response)
      }).catch((response) => {
        console.log(response)
      })
    }
  }
```
## echarts

- `npm install echarts`
- main.js中

```js
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

```
- 使用
    - 新建charts.vue写入下面的（这只是个演示
```js
<template>
  <div  id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>


<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style>
  /**
   * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
   * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
   */
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>

```
- 在要使用的文件中直接components引入就行了。
:::tip
注意看怎么引入的echarts，这个要手动按需引入，超级麻烦，好处是图一般不会特别多，而且组件的复用性很高
:::
## 生产环境
在vue-cli3的项目中，
npm run serve时会把process.env.NODE_ENV设置为‘development’；  
npm run build 时会把process.env.NODE_ENV设置为‘production’；  
此时只要根据process.env.NODE_ENV设置不同请求url就可以很简单的区分出本地和线上环境。  