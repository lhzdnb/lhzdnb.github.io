---
title: 实现new操作符
date: 2020-08-20 13:08:00
tags: ['JavaScript', '面试', '手撕', 'new', '高频题']
---

## 实现 `new` 操作符

`new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。`new` 关键字会进行如下的操作：

1. 创建一个空的简单 JavaScript 对象（即 `{}`）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象；
3. 将步骤 1 新创建的对象作为 `this` 的上下文；
4. 如果该函数没有返回对象，则返回 `this`。

```javascript
function myNew(constructor, ...args) {
  // 创建一个新对象
  const obj = {}
  // 将新对象的原型设置为构造函数的原型
  Object.setPrototypeOf(obj, constructor.prototype)
  // 使用提供的参数将构造函数应用于新对象
  const result = constructor.apply(obj, args)
  // 如果构造函数没有返回对象，则返回新对象
  return result instanceof Object ? result : obj
}
```
