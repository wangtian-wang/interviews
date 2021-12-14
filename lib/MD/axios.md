#### axios 拦截器的实现原理

1. 内部维护了一个 InterceptorManager 的类；
2. 通过 handlers【{fullfilled,rejected,synchronous,runWhen}】 存储拦截器，然后提供了添加，移除，遍历执行拦截器的实例方法.

3. 通过直接将拦截器对象设置为 null 将此拦截器移除
4. 拦截器的回调会在请求或响应的 then 或 catch 回调前被调用

```js
关键代码;
var promise;

var chain = [dispatchRequest, undefined];

Array.prototype.unshift.apply(chain, requestInterceptorChain);

chain.concat(responseInterceptorChain);
promise = Promise.resolve(config);

while (chain.length) {
  promise = promise.then(chain.shift(), chain.shift());
}

return promise;
```

```
https://github.com/YY88Xu/axios-js
```
