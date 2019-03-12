---
title: ElasticSearch
date: 2019/2/10
categories: bigData
tags:
- 全文检索引擎
- 大数据
- 分布式
- ELK
- 数据挖掘
---
:::warning 大数据分析处理流行技术栈
E(elasticsearch)L(logstash)K(Kibana)技术栈
:::
<!-- more -->

 <div align=center><h1>Easticsearch</h1></div>

## docker安装ES
安装直接用docker。
1. `docker  pull registry.docker-cn.com/library/elasticsearch`拉取国内镜像站的经镜像
2. `docker run -d -p 9200:9200 -p 9300:9300  registry.docker-cn.com/library/elasticsearch`
      - 出错了如下jdk分配内存太大2G更改一下为512m


            OpenJDK 64-Bit Server VM warning: INFO: os::commit_memory(0x0000000085330000， 2060255232， 0) failed; error='Cannot allocate memory' (errno=12)
            #
            # There is insufficient memory for the Java Runtime Environment to continue.
            # Native memory allocation (mmap) failed to map 2060255232 bytes for committing reserved memory.
            # An error report file with more information is saved as:
            # /tmp/hs_err_pid1.log

3. `docker run -d -p 9200:9200 -p 9300:9300 -e ES_JAVA_OPTS="-Xms256m -Xmx256m" registry.docker-cn.com/library/elasticsearch`
4. "You Know， for Search"
## 数据存储结构
ES的存储是Index(数据库)和Document(表)，文档和索引。组织结构是Node(节点)和Cluster(集群)<br/>
对外提供RESTapi，json传输<br/>
1. Json Object，由字段（Field）组成，常见数据类型如下：
- 字符串：text，keyword
- 数值型：long，integer，short byte，double，float，half_float scaled_float
- 布尔：boolean
- 日期：date
- 二进制：binary
- 范围类型：integer range，float range，long_range，double_range，date_range
每个document都有一个固定_id，如果你自己不指定系统自动指定哈希

2. 元数据（DocumentMetaData），用于标注文档的相关信息每个document中都有元数据
- _index:文档所在的索引名
- type：文档所在的类型名
- id：文档唯一id
- _uid：组合id，由_type和_id组成（6.x_type不再起作用，同_id一样）
- _source：文档的原始Json数据，可以从这里获取每个字段的内容
- all：整合所有字段内容到该字段，默认禁用

3. 索引中存储具有相同结构的文档（Document）
- 每个索引都有自己的mapping定义，用于定义字段名和类型（元数据）
- 一个集群可以有多个索引，比如:nginx日志存储的时候可以按照日期每天生成一个索引来存储，nginx-log-2017-01-01，nginx-log-2017-01-03

## RESTapi
访问http://127.0.0.1:9200/_cat 查看可用的api比如查看索引，查看某个索引数目，健康情况等等。
- PUT方法+索引名可以创建一个index
&nbsp;&nbsp;&nbsp;&nbsp;(PUT http://127.0.0.1:9200/ohh)创建了ohh索引
>response<br/>
{<br/>
"acknowledged":true，<br/>
"shards_acknowledged":true，<br/>
"index":"test_index"<br/>
}<br/>

- 创建文档PUT index/type/id+请求内容<br/>
&nbsp;&nbsp;&nbsp;&nbsp;(PUT http://127.0.0.1:9200/ohh/doc/1 requestbody:{username":"alfred"，"age":1})
<br/>ohh创建一个id为1的document
>response<br/>
{<br/>
"_index":"test_index"，<br/>
"_type":"doc"，<br/>
"id":"1"，如果不指定id只指定到type，自己生成一个id<br/>
"version":1，<br/>
"result":"created"，<br/>
"_shards":{<br/>
"total":2，<br/>
"successful":1，<br/>
"failed":0<br/>
"_seq_no":0，<br/>
"_primary_term":1<br/>
  }<br/>
}<br/>



:::danger
如果插入之前没有es自动创建index和type<br/>
在未来type可能会废除，不提倡使用，现在尽量把type全都弄成doc或者是一样的东西不要使用type来分类
:::

- GET /index/type/_search?q=xx 查询关键词的不带关键词是全查询放在body里面{"query":{"term":{"_id":"1"}}}
&nbsp;&nbsp;&nbsp;&nbsp;
>response <br/>
{<br/>
"took"：0，查询耗时，单位ms<br/>
"timed_out"：false，是否超时<br/>
"_shards"：{<br/>
"total"：5，总记录<br/>
"successful"：5，查询成功的记录<br/>
"skipped"：0，跳过了<br/>
"failed"：0失败了<br/>
"hits"：{<br/>
     "total"：1，符合条件的总文档数<br/>
      "hits"：[     返回的文档详情数据数组，默认前10个文档<br/>
      "_index"："test index"，索引名<br/>
      "_type":"doc"，记录的type<br/>
      "_id"："1" 文档的id<br/>
      "_score":1，文档的得分<br/>
      "_source"：{文档详情<br/>
      username"："alfred"，<br/>
         "age"：1<br/>
             }<br/>

}


- 允许批量创建文档POST /_bulk<br/>

body里面 {"index":{"_index":"test_index"，"_type":"doc"，"_id":"3"}{"username":"alfred"，"age":10}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"delete":{"_index":"test_index"，"_type":"doc"，"_id":"1"}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"update":{"_id":"2"，"_index":"test_index"，"_type":"doc"}{"doc":{"age":"20"}
- 方法
    - index 创建文档如果存在则覆盖
    - update 更新一个文档
    - delete 删除某个文档
    - create 创建文档如果存在则报错
- 批量查询根据id GET /_mget<br/>
body里面{"docs":[<br/>
      {"index":"test_index"，<br/>
      "_type":"doc"，<br/>
      "id":"1"<br/>
      }，<br/>
      {"index":"test_index"，<br/>
      "type":"doc"，<br/>
      "id":"2"<br/>
          }]<br/>
      }<br/>


## 索引
### 正排索引
  - 文档Id到文档内容、单词的关联关系id为x的文档中出现了什么词
### 倒排索引
  - 单词到文档Id的关联关系对句子进行分词之后每个词在哪个文档id出现过

一般是通过倒排索引查找到哪些文档，然后通过正排索引取出文档的完整内容倒排索引是搜索引擎的核心，主要包含两部分
- 单词词典（Term Dictionary）
  - 记录所有文档的单词，一般都比较大
  - 记录单词到倒排列表的关联信息
- 倒排列表（Posting List）记录了单词对应的文档集合，由倒排索引项（Posting）组成<br/>
 倒排索引项（Posting）主要包含如下信息：
- 文档Id，用于获取原始信息
- 单词频率（TF，Term Frequency），记录该单词在该文档中的出现次数，用于后续相关性算分
- 位置（Position），记录单词在文档中的分词位置（多个），用于做词语搜索（Phrase Query）
- 偏移（Offset），记录单词在文档的开始和结束位置，用于做高亮显示
<br/>


## 分词
### 分词器和它的构成
分词把一系列句子分成一系列的词语，例如word to Vec.分词器是es中专门处理分词的组件，Analyzer，它的组成如下：
1. Character Filters针对原始文本进行处理，比如去除html特殊标记符
2. Tokenizer将原始文本按照一定规则切分为单词
3. Token Filters针对tokenizer处理的单词就行再加工，比如转小写、删除或新增等处理
使用_analyze接口可以指定字段，指定analyzer，自定义分词器进行测试

1. POST /_analyze {"analyzer":"standard"，"text":"hello samasiis"}指定分词器和想要分词的文本，
"filter":["lowercase"]自己可以指定比如指定filter就可以返回全小写的结果
>response<br/>
{"tokens":
[{"token":"analyzer"，<br/>"start_offset":1，<br/>"end_offset":9，<br/>"type":"< ALPHANUM >"，<br/>"position":0}<br/>]}

2. 自带的分词器有:`[Standard，Simple，Whitespace，Stop，Keyword，Pattern，Language]`<br/>
`[1]Standard` 默认分词，按词切分，全员小写支持多语言<br/>
`[2]Simple` 简单分词多，非字符(下划线，数字，单引号等等都切分并且去掉)小写处理<br/>
`[3]Whitespace` 空格切分，保留大写<br/>
`[4]Stop` the，an，的等停止词进行分词<br/>
`[5]Keyword`不分词直接返回<br/>
`[6]Pattern` 通过*正则表达式*自定义分割符默认是\W+，即非字词的符号作为分隔符，小写<br/>
`[7]Language`提供多语言分词器(用到就百度)<br/>
### 中文分词
<a href="https://mp.weixin.qq.com/s?__biz=MzU1NDA4NjU2MA==&mid=2247486148&amp;idx=1&amp;sn=817027a204650763c1bea3e837d695ea&source=41#wechat_redirect">难点</a><br/>常用IK，jieba，THULAC，hanlp
### 自定义分词
通过自定义Character Filters、Tokenizer和Token Filter实现<br/>
- Character Filters在Tokenizer之前对原始文本进行处理，比如增加、删除或替换字符等自带的有：
  - HTML Strip去除html标签和转换html实体
  - Mapping 进行字符替换操作
  - Pattern Replace 进行正则匹配替换
  - 会影响后续tokenizer解析的postion和offset信息

例子（其他的留坑以后试试）:
> POST /_analyze<br/>
{"tokenizer":"keyword", <br/>
A"char_filter":["html_strip"],<br/>
"text":"<\p>I& apos;m so<//b>happy<//b>!<//p>"}


- Tokenizer将原始文本按照一定规则切分为单词（term or token）自带：
  - standard 按照单词进行分割-letter 按照非字符类进行分割
  - whitespace 按照空格进行分割
  - UAXURL Email 按照 standard分割，但不会分割邮箱和url
  - NGram 和Edge NGram 连词分割
  - Path Hierarchy 按照文件路径进行切割

例子（其他的留坑以后试试）:

> POST /_analyze<br/>
{"tokenizer":"path_hierarchy",<br/>
 "text":"/one/two/three"<br/>}

- Token Filters对于tokenizer输出的单词（term）进行增加、删除、修改等操作自带的：
  - lowercase将所有term转换为小写
  - stop 删除 stop words
  - NGram和Edge NGram连词分割
  - Synonym添加近义词的term

  >POST _analyze<br/>
  {<br/>
  "text":"a Hello,world!",<br/>
  "tokenizer":"standard",<br/>
  "filter":[<br/>
  "stop",<br/>
  "lowercase",<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type":"ngram",<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"min_gram":4,<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"max_gram":4<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br/>
}
### 自定义分词的api
创建或更新文档时（Index Time），会对相应的文档进行分词处理查询时（Search Time），会对查询语句进行分词。
索引时分词是通过配置Index Mapping中每个字段的analyzer属性实现。不指定分词时，使用默认standard。查询的时候通过 analyzer 指定分词器或者在通过index mapping 设置search_analyzer实现
一般不需要特别指定查询时分词器，如果查询时制定分词器和文档默认分词器不一样可能无法匹配。明确字段是否需要分词，不需要分词的字段就将 type 设置为keyword，可以节省空间和提高写性能
可以先用_anaylize检查然后再测试
<br/>
api像这样<br/>
>PUT test_index(自己指定索引)<br/>
{<br/>
 "settings":{<br/>
 "analysis":<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"char_filter":{},<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"tokenizer":{},<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"filter":{},<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"analyzer":{}<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
 &nbsp;&nbsp;}<br/>
 }<br/>
<Valine></Valine>