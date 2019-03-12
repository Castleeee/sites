---
title: 奇特的代码
date: 2018-1-1 20:38:45
categories: backEnd
tags:
- python
- 进阶
- 后端

---

## 小栗子
### 一行九九乘法表
```py
print("\n".join(list(map(lambda x:",".join(['{}*{}='.format(i,x)+str(i*x) for i in range(1,x+1)
```
<Valine></Valine>