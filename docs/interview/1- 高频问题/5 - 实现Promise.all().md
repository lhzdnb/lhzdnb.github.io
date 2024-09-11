---
title: 实现Promise.all()
tags: ['Promise', '高频题', '手撕', 'JavaScript']
---

## 实现 `Promise.all()`
`Promise.all()` 是 JavaScript 中的一个 API，它用于处理多个 Promise 的结果。它接受一个数组作为参数，这个数组包含多个 Promise，返回一个新的 Promise。

**`Promise.all()` 的作用：**

*   **等待所有 Promise settle**: `Promise.all()` 会将传入的每个 Promise 都视为一个独立的任务，它们之间没有任何顺序或依赖关系。它会等待所有这些任务都完成（即 resolve 或 reject），然后返回一个新 Promise。
*   **收集所有结果值**: 当所有 Promise settle 时，`Promise.all()` 会将它们各自的结果值收集到一个数组中，该数组作为新的 Promise 的 resolve 值。
*   **错误处理**: 如果其中任何一个 Promise 反而 reject 或抛出错误，则新 Promise 会立即 reject，并传递原始 Promise 所抛出的错误。

**`Promise.all()` 的用例：**

1.  **并发执行多个异步任务**: 当需要同时执行多个异步任务（例如网络请求、文件读取等）时，`Promise.all()` 可以帮助您同时等待所有这些任务完成。
2.  **数据处理和聚合**: 如果每个 Promise 返回不同类型的数据，可以使用 `Promise.all()` 将这些结果收集起来，然后对它们进行进一步处理或聚合。

**例子：**

```javascript
const p1 = new Promise((resolve) => {
  globalThis.setTimeout(() => resolve(10), 2000);
});

const p2 = new Promise((resolve) => {
  globalThis.setTimeout(() => resolve(20), 1000);
});

const p3 = new Promise((reject) => {
  globalThis.setTimeout(() => reject("Promise 3 is rejected"), 500);
});

Promise.all([p1, p2, p3]).then(results => {
  globalThis.console.log(results); // Output: [10, 20]
}).catch(error => {
  globalThis.console.error(error); // Output: Promise 3 is rejected
});
```

在这个例子中，`Promise.all()` 等待三个 Promise settle（完成），然后将它们各自的结果值收集到一个数组中，该数组作为新的 Promise 的 resolve 值。

请注意，如果其中任何一个 Promise 反而 reject，则新 Promise 会立即 reject，并传递原始 Promise 所抛出的错误。

### 实现
```javascript
function myPromiseAll(arr) {
  return new Promise((resolve, reject) => {
    // 判断 arr 是否是一个数组
    if (!Array.isArray(arr)) {
      reject(new Error(`myPromiseAll() only accepts an array.`))
    }

    if (arr.length === 0) {
      resolve([])
    }

    const result = new Array(arr.length)
    let count = 0
    arr.forEach((promise, index) => {
      promise.then((res) => {
        result[index] = res
        count ++

        if (count === arr.length) {
          resolve(result)
        }
      }).catch((error) => {
        reject(`Promise ${index + 1} is rejected: ${error.message}`)
      })
    })
  })
}
```