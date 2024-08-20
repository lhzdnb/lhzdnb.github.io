---
title: 实现instanceOf
date: 2020-08-20 13:08:00
tags: ['JavaScript', '面试', '手撕', 'instanceOf', '原型链', '高频题']
---

## 实现 `instanceOf` 函数

`instanceOf` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```javascript
function instanceOf(obj, className) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);
  // 获取类的原型
  const prototype = className.prototype;

  // 遍历对象的原型链
  while (proto !== null) {
    // 如果找到匹配的原型，返回 true
    if (proto === prototype) {
      return true;
    }
    // 继续沿着原型链向上查找
    proto = Object.getPrototypeOf(proto);
  }
  // 如果遍历完原型链没有找到匹配的原型，返回 false
  return false;
}
```
