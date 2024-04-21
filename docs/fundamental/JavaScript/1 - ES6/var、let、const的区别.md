---
title: var、let、const的区别
tags: [JavaScript, ES6]
---

# var、let、const的区别

## `var`
在ES5中，使用`var`关键字声明变量。`var`声明的变量是函数作用域（function-scoped）的，它的作用域是最近的函数或全局作用域。`var`声明的变量可以被重复声明，而且可以在声明之前使用。

在ES5中，顶层对象的属性和全局变量是等价的，在浏览器环境中可以通过`window`对象访问，在Node.js可以通过`global`对象访问。

```javascript showLineNumbers
var a = 10;
console.log(window.a); // 10
```
- 使用`var`声明的变量会被提升（hoisting），即变量的声明会被提升到作用域的顶部，但赋值不会被提升。

  ```javascript showLineNumbers
  console.log(a); // undefined
  var a = 10;
  ```

  
- 在编译阶段，上述代码会被解释为：

  ```javascript showLineNumbers
  var a;
  console.log(a);
  a = 10;
  ```

  
- 使用`var`，可以对一个变量多次声明，后面的声明会覆盖前面的声明。

  ```javascript showLineNumbers
  var a = 10;
  var a = 20;
  console.log(a); // 20
  ```

  

- 在函数中使用`var`声明的变量的时候，该变量是局部的，只在函数内部有效。

  ```javascript showLineNumbers
  var a = 10;
  function test() {
    var a = 20;
    console.log(a); // 20
  }
  test();
  console.log(a); // 10
  ```

  

- 如果函数内不使用`var`，该变量是全局的

  ```javascript showLineNumbers
  var a = 10;
  function test() {
    a = 20;
  }
  test();
  console.log(a); // 20
  ```

  
## `let`
在ES6中，引入了`let`关键字用来声明变量。`let`声明的变量是块级作用域（block-scoped）的，它的作用域是最近的块（`{}`）。
```javascript showLineNumbers
{
  let a = 10;
  console.log(a); // 10
}
console.log(a); // Uncaught ReferenceError: a is not defined
```

- 使用`let`声明的变量不会被提升，如果在声明之前使用会报错。

  ```javascript showLineNumbers
  console.log(a); // Uncaught ReferenceError: Cannot access 'a' before initialization
  let a = 10;
  ```

  使用`let`声明的变量，在声明之前都不可以用，JavaScript会将他们存放在暂时性死区（Temporal Dead Zone，TDZ）。如果访问在暂时性死区内的变量，会抛出`ReferenceError`错误。

- 使用`let`声明的变量不允许重复声明。

  ```javascript showLineNumbers
  let a = 10;
  let a = 20; // Uncaught SyntaxError: Identifier 'a' has already been declared
  ```
- `let`声明的变量在循环中的表现与`var`不同。

  ```javascript showLineNumbers
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }
  ```

  上述代码会输出`0 1 2`，而使用`var`声明的变量会输出`3 3 3`。原因是`let`声明的变量在每次迭代时都会创建一个新的变量，而`var`声明的变量是全局的。这个现象的核心原因在于`let`和`var`声明变量的作用域不同，以及JavaScript事件循环和闭包的行为。

  - **使用 `var` 时的表现**

    当使用 `var` 声明变量 `i` 时，这个变量是在函数作用域（或全局作用域，如果是在函数外声明的）中被创建的。在 `for` 循环中，不管循环进行了多少次迭代，都只存在一个 `i` 变量。

    ```javascript showLineNumbers
    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        console.log(i);
      }, 0);
    }
    ```

    在这段代码中，`setTimeout` 函数创建了一个异步的延时操作，它会将传入的函数（闭包）推入事件队列，在当前执行栈清空后执行。由于 `for` 循环非常快速地完成，`i` 的值增加到 3 后，循环停止。因此，当事件队列中的 `setTimeout` 回调执行时，它们引用的是同一个 `i`，此时 `i` 的值已经是 3。结果就是每个回调都输出 `3`。

  - **使用 `let` 时的表现**

    而当使用 `let` 声明变量时，JavaScript 引擎对 `let` 声明在循环中的行为做了特别处理：每次迭代循环时都会创建一个新的 `i` 实例，每个实例的作用域限定在那次循环迭代内。

    

    ```javascript showLineNumbers
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        console.log(i);
      }, 0);
    }
    ```

    这里的每次循环迭代都创建了一个新的 `i`，并且每个 `setTimeout` 的回调函数都闭包了自己迭代的 `i`。因此，当这些 `setTimeout` 回调执行时，它们各自输出的是闭包中各自的 `i` 值（即 0, 1, 2），因为每个 `i` 都是独立的，与其他迭代中的 `i` 分隔开。

    这种差异性是 `let` 和 `var` 在处理作用域和闭包方面的根本区别。`let` 提供的块级作用域（Block Scope）特性使得它特别适合用在循环及类似的局部变量需求场合。

## `const`

`const` 声明一个只读的常量，一旦声明，常量的值就不能改变。

```javascript showLineNumbers
const a = 10;
a = 20; // Uncaught TypeError: Assignment to constant variable.
```

- `const` 声明的变量必须初始化，否则会报错。

  ```javascript showLineNumbers
  const a; // Uncaught SyntaxError: Missing initializer in const declaration
  ```
- 之前用`var`或者`let`声明的变量，不可以用`const`重新声明。
  ```javascript showLineNumbers
  let a = 10;
  const a = 20; // Uncaught SyntaxError: Identifier 'a' has already been declared
  ```
- 对于复合类型的数据（数组、对象），`const`声明的变量指向的是数据结构的地址，而不是数据结构本身。因此，`const`声明的变量可以修改数据结构的内容，但不能重新赋值。
    ```javascript
    const arr = [1, 2, 3];
    arr.push(4);
    console.log(arr); // [1, 2, 3, 4]
    
    arr = [4, 5, 6]; // Uncaught TypeError: Assignment to constant variable.
    ```
其他情况下，`const`的行为与`let`相似。