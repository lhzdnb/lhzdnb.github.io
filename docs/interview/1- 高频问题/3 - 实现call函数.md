---
title: 实现call函数
tags: ['JavaScript', '面试', '手撕', 'call', '高频题']
---

## 实现 `call` 函数

`call` 方法在使用一个指定的 `this` 值和若干个指定的参数值的前提下调用某个函数或方法。

```javascript
Function.prototype.myCall = function(thisArg, ...args) {
  // 判断 this 是否是函数
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  // 如果没有提供 thisArg，默认为全局对象（在浏览器环境下为 window，在Node.js 环境下为 global）
  thisArg = thisArg || globalThis;

  // 为 thisArg 创建一个唯一的属性来临时存储函数
  const fnSymbol = Symbol('fn');
  thisArg[fnSymbol] = this;

  // 使用 thisArg 调用该函数，并传递参数
  const result = thisArg[fnSymbol](...args);

  // 删除临时的属性
  delete thisArg[fnSymbol];

  // 返回函数调用结果
  return result;
}
```