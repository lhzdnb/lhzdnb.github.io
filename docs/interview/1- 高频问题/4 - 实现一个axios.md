---
title: 实现Axios
tags: ['Promise', 'XMLHttpRequest', 'JavaScript', '面试', '手撕', 'Axios', '高频题']
---

## Axios的底层实现
Axios 的底层基于两种技术：

1. 浏览器端使用 XHR (XMLHttpRequest)：在浏览器环境下，Axios 使用 XMLHttpRequest 来发送 HTTP 请求。它对 XMLHttpRequest 进行了封装，使得接口更为现代化和易于使用。
   Axios 实现基于 Promise 和 XHR (XMLHttpRequest) 的请求，主要通过对 XHR 进行封装，并结合 JavaScript 的 Promise 机制来管理异步操作。
2. Node.js 环境下使用 http 模块：在 Node.js 环境下，Axios 使用 Node.js 原生的 http 和 https 模块来发送 HTTP 请求，这使得它可以在服务器端使用，且具有跨平台的能力。

这里主要讲解在浏览器端使用的axios的底层实现。
### 1. 创建 Axios 实例

首先，Axios 的请求通过一个配置对象初始化，类似于创建一个 Axios 实例。该配置对象包括 `url`、`method`、`headers` 等参数。

```javascript
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 2. 封装 XHR 请求

在发送请求时，Axios 封装了 `XMLHttpRequest`。主要流程如下：

- **创建 XHR 对象**：通过 `new XMLHttpRequest()` 创建一个新的 XHR 对象。

- **配置请求**：通过 `xhr.open(method, url, async)` 配置请求的方法和目标 URL，并设置是否为异步请求（一般设置为 `true`）。

- **设置请求头**：使用 `xhr.setRequestHeader` 方法来设置请求头，比如 `Content-Type` 或者自定义的认证 token。

- **处理响应**：定义 `onreadystatechange` 事件处理函数，监听 XHR 对象的 `readyState` 和 `status`，当请求完成时（`readyState === 4`），根据状态码来判断请求是否成功，并解析响应数据。

- **发送请求**：通过 `xhr.send(data)` 发送请求，其中 `data` 是请求的主体数据，比如 JSON 数据或表单数据。

### 3. 使用 Promise 封装异步逻辑

Axios 将上述 XHR 请求逻辑封装在一个 Promise 内，这样开发者可以通过链式调用 `.then()` 和 `.catch()` 来处理成功和失败的情况。

#### Axios 请求的核心逻辑：
- **Promise 实例化**：Axios 在发起请求时，返回一个新的 Promise 实例。

- **请求成功时调用 resolve**：当请求成功（HTTP 状态码在 2xx 范围内），调用 `resolve(response)`，将响应数据传递给 `.then()` 方法处理。

- **请求失败时调用 reject**：当请求失败（如网络错误或 HTTP 状态码在 4xx 或 5xx 范围内），调用 `reject(error)`，将错误信息传递给 `.catch()` 方法处理。

```javascript
function axiosRequest(config) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);

    // 设置请求头
    for (const header in config.headers) {
      xhr.setRequestHeader(header, config.headers[header]);
    }

    // 检查是否有取消请求的需求
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (request) {
          request.abort();  // 调用 XMLHttpRequest.abort() 取消请求
          reject(cancel);
          request = null;
        }
      });
    }

    // 处理响应
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {  // 请求完成
        if (xhr.status >= 200 && xhr.status < 300) {
          // 请求成功，解析响应数据
          resolve({
            data: JSON.parse(xhr.responseText),
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            config: config,
            request: xhr
          });
        } else {
          // 请求失败
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            config: config,
            request: xhr
          });
        }
      }
    };

    // 处理网络错误
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
        config: config,
        request: xhr
      });
    };

    // 发送请求
    xhr.send(config.data);
  });
}
```

### 4. 请求和响应拦截器

Axios 还提供了请求和响应拦截器，允许在请求发送前或响应处理前进行一些预处理或修改。拦截器本质上是在 Promise 流程中插入了一些额外的操作。

- **请求拦截器**：可以在请求发送前对请求配置进行修改，比如在请求头中添加认证 token。

- **响应拦截器**：可以在响应到达后但在 Promise 被 resolved 或 rejected 前处理响应数据或错误，比如统一处理错误消息。

```javascript
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
```

### 5. 取消请求

Axios 还支持通过 `CancelToken` 实现请求的取消，这也是对 `XMLHttpRequest.abort()` 方法的封装。在创建请求时，可以传入一个 `CancelToken`，在需要取消请求时调用 `cancel()` 函数即可。

```javascript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

// 取消请求
source.cancel('Operation canceled by the user.');
```

### 总结

Axios 的核心就是将 `XMLHttpRequest` 进行了封装，使其具备现代化、Promise 风格的接口，并提供了拦截器、取消请求等功能。整个过程通过 Promise 将 XHR 的异步逻辑封装起来，使得开发者可以使用更简洁的代码来处理复杂的网络请求操作。