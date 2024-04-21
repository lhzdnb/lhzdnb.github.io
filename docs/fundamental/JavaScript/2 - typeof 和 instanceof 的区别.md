---
title: typeof 和 instanceof 的区别
tags: [JavaScript, typeof, instanceof]
---

# typeof 和 instanceof 的区别

## `typeof`

`typeof` 是一个操作符，用于检测给定变量的数据类型。`typeof` 返回一个表示变量类型的字符串，表示未经过计算的操作数的类型，语法如下：

```javascript showLineNumbers
typeof operand
typeof(operand)
```
示例：
```javascript showLineNumbers
typeof 42; // 'number'
typeof 'hello'; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Symbol(); // 'symbol'
typeof null; // 'object'
typeof {}; // 'object'
typeof []; // 'object'
typeof function() {}; // 'function'
```
虽然 `typeof null` 返回 `'object'`，但 `null` 实际上是一个原始值，而不是对象。这是 JavaScript 语言的一个历史遗留问题，ECMAScript 6 中引入了 `Symbol` 类型，用于解决这个问题。

同时，`typeof` 不能区分数组和对象，它们都返回 `'object'`。

如果我们想判断一个变量是否存在，可以使用 `typeof`：
```javascript showLineNumbers
if (typeof variable !== 'undefined') {
  // variable is defined
}
```
如果直接使用变量名，而变量未定义，会抛出 `ReferenceError` 错误。

## `instanceof`

`instanceof` 是一个操作符，用于检测构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。`instanceof` 返回一个布尔值，表示对象是否是某个构造函数的实例，语法如下：

```javascript showLineNumbers
object instanceof constructor
```
示例：
```javascript showLineNumbers
function Person() {}
const person = new Person();
person instanceof Person; // true

const obj = {};
obj instanceof Object; // true

const arr = [];
arr instanceof Array; // true

[] instanceof Object;        // true
new Date() instanceof Date;  // true
```
`instanceof` 可以用于检测对象的类型，但不能用于检测原始值的类型。

## 区别

- **适用场景**：`typeof` 适合用来检测基本数据类型。`instanceof` 更适合用来检测对象是否属于某个类或对象是否实现了某个接口。
- **准确性**：`typeof` 对基本类型检测准确（除了 `null`），但对于对象类型就显得力不从心。instanceof 能准确判断对象的类型，但不适用于基本数据类型。
- **性能**：`typeof` 比 `instanceof` 更快，因为 `instanceof` 需要遍历对象的原型链。

如果需要通用的检测数据类型的方法，可以采用 `Object.prototype.toString` 方法：

```javascript showLineNumbers
Object.prototype.toString.call(42); // '[object Number]'
Object.prototype.toString.call('hello'); // '[object String]'
Object.prototype.toString.call(true); // '[object Boolean]'
Object.prototype.toString.call(undefined); // '[object Undefined]'
Object.prototype.toString.call(Symbol()); // '[object Symbol]'
Object.prototype.toString.call(null); // '[object Null]'
Object.prototype.toString.call({}); // '[object Object]'
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call(function() {}); // '[object Function]'
Object.prototype.toString.call(new Date()); // '[object Date]',
Object.prototype.toString.call(/regex/); // '[object RegExp]'
Object.prototype.toString.call(new Map()); // '[object Map]'
Object.prototype.toString.call(new Set()); // '[object Set]'
Object.prototype.toString.call(new WeakMap()); // '[object WeakMap]'
Object.prototype.toString.call(new WeakSet()); // '[object WeakSet]'
Object.prototype.toString.call(new Error()); // '[object Error]'
Object.prototype.toString.call(new Promise()); // '[object Promise]'
Object.prototype.toString.call(document); // '[object HTMLDocument]'
Object.prototype.toString.call(window); // '[object Window]'
```

可以将上述方法封装成一个函数：

```javascript showLineNumbers
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
```
