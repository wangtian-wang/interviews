## why it  exit：

* Js  single thread 需要有人帮助完成其他的任务
* 在浏览器后台开启的一个服务，和页面之间需要通信,沟通帮助页面完成了哪些工作
* 

### What does it can do：

### Features

```js
1 : 不能操作 DOM 元素，没有 document 对象， window， parent;
有 this 对象
2 : 和浏览器之间的通讯都s需要调用 postMessage 接口;
3 : 是一个异步的过程；settimeout， setinterval
4 : 不能跨域；
5 ：但是可以发送 Ajax 请求；
6 ： 一个 work 可以委派任务给其他的 worker；
7 ： importScripts('url') 可以加载其他的 worker；
8 ： terminate 终止 work
```



### how to use it 

* postMessage()
* sendMessage()
* terminate（）终止 work ？ 销毁这个 work 实例吗？
* onmessage事件
* code
  * index.js

 ```javascript
 
if (window.Work) {
   let work = new Worker()；
   let message = { addThis: {
     num1: 1,
     num2: 2
   }};
  let finallyResult;
   work.postMessage(message) 将这个计算工作传递 WebWork 在后台完成
   work.onMessage = function( e) {
     finallyResult = e.data.result;
     
   }
 }
 ```

   * work.js

     ```JavaScript 
     this.onmessage = function(e) {
       if (e.data.addThis !== undefined) {
          var resultMessage = { result: e.data.addThis.num1 + e.data.addThis.num2}
          work.postMessage(resultMessage)
       }
     }
     ```

     

### Effects：



### benefits ：



