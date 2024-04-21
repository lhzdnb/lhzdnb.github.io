---
title: SPA首屏加载速度优化
tags: [SPA, 性能优化, 首屏加载]
---

# SPA首屏加载速度优化

## 什么是首屏加载

首屏时间（First Contentful Paint）是指浏览器从响应用户输入网址，到首屏内容渲染完成时的时间。此时整个页面不一定全部渲染完成，但用户可以看到当前视窗的内容。首屏加载速度是用户体验的重要指标之一，影响用户对网站的第一印象。

## 加载慢的原因
在SPA中，首屏加载慢的原因主要有以下几点：
- **资源过多**：SPA通常会加载大量的JavaScript、CSS和图片资源，导致首次加载时间过长。
- **资源体积大**：资源文件过大，需要较长时间下载和解析。
- **资源加载顺序**：资源加载顺序不当，可能会阻塞页面渲染。
- **网络请求**：网络请求过多，请求时间过长。
- **缓存策略**：缓存策略不当，导致资源重复加载。
- **JavaScript执行**：JavaScript执行时间过长，阻塞页面渲染。

## 优化策略
为了提高SPA的首屏加载速度，可以采取以下优化策略：
- **代码分割**：将代码分割成多个小块，按需加载，减小入口文件体积，从而减少首次加载时间。
- **资源压缩**：对JavaScript、CSS和图片等资源进行压缩，减小文件体积。
- **资源懒加载**：将不必要的资源延迟加载，减少首屏加载时间。
- **资源预加载**：提前加载可能用到的资源，加快资源加载速度。
- **缓存策略**：合理设置缓存策略，减少资源重复加载。
- **异步加载**：使用异步加载资源的方式，减少资源加载时间。
- **服务端渲染**：使用服务端渲染，提前生成页面内容，减少客户端渲染时间。
- **减少HTTP请求**：减少不必要的HTTP请求，提高资源加载速度。

### 代码分割
代码分割是指将代码分割成多个小块，按需加载，减小入口文件体积，从而减少首次加载时间。常用的代码分割工具有Webpack的`SplitChunksPlugin`和`dynamic import`。

```javascript showLineNumbers
// 使用Webpack的SplitChunksPlugin进行代码分割
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
```
在使用React-router时，可以使用`React.lazy`和`Suspense`进行代码分割。

```javascript showLineNumbers
// 使用React.lazy和Suspense进行代码分割
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

### 资源压缩
对JavaScript、CSS和图片等资源进行压缩，减小文件体积，提高加载速度。常用的压缩工具有UglifyJS、Terser、CSSNano等。

```javascript showLineNumbers
// 使用UglifyJS对JavaScript进行压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  plugins: [
    new UglifyJSPlugin()
  ]
};
```

### 资源懒加载
将不必要的资源延迟加载，减少首屏加载时间。常用的懒加载方式有`IntersectionObserver`和`lazyload`。

```javascript showLineNumbers
// 使用IntersectionObserver进行图片懒加载
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img').forEach(img => {
  observer.observe(img);
});
```

### 资源预加载
提前加载可能用到的资源，加快资源加载速度。常用的预加载方式有`<link rel="preload">`和`<link rel="prefetch">`。

```html
<!-- 使用<link rel="preload">进行资源预加载 -->
<link rel="preload" href="image.png" as="image">
```

### 缓存策略
后端合理设置缓存策略，减少资源重复加载。常用的缓存策略有`Cache-Control`和`ETag`。
```javascript showLineNumbers
// 使用Cache-Control设置缓存策略
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=3600');
  next();
});
```
前端可以使用`service worker`进行资源缓存，提高资源加载速度。
```javascript showLineNumbers
// 使用service worker进行资源缓存
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered');
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
```
同时可以合理利用localStorage缓存，减少资源加载时间。
```javascript showLineNumbers
// 使用localStorage进行资源缓存
const cache = localStorage.getItem('cache');
if (cache) {
  // 使用缓存数据
} else {
  // 请求数据并存入缓存
  localStorage.setItem('cache', data);
}
```

### 异步加载
使用异步加载资源的方式，减少资源加载时间。常用的异步加载方式有`<script async>`和`<script defer>`。

```html showLineNumbers
<!-- 使用<script async>进行异步加载 -->
<script async src="script.js"></script>
```

### 服务端渲染（SSR）
SSR是指在服务端生成页面内容，然后将内容传输到客户端显示。 使用服务端渲染，提前生成页面内容，减少客户端渲染时间。常用的服务端渲染框架有Next.js（React）和Nuxt.js（Vue）。

### 减少HTTP请求
减少不必要的HTTP请求，提高资源加载速度。常用的减少HTTP请求方式有合并文件、使用雪碧图、使用Base64编码等。