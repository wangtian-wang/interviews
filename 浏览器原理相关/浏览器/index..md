#### 浏览器窗口之间的通信方式

#### 1： websocket

### 2 : **socket.io**和\*\*ws

#### 3: 定时器 + 客户端存储

#### 4: postMessage

    	- window.open
    	- window.opener
    	- iframe

#### 5: storageEvent

- 只要在 tab 里面监听到了 storage 事件 那就可以监听最新的 storage 的变动

#### 6：Broadcast Channel

```js
page1;
var channel = new BroadcastChannel("channel-BroadcastChannel");
channel.postMessage("Hello, BroadcastChannel!");
page2;
var channel = new BroadcastChannel("channel-BroadcastChannel");
channel.addEventListener("message", function (ev) {
  console.log(ev.data);
});
```

#### 7: SharedWorker

```
var portList = [];

onconnect = function(e) {
  var port = e.ports[0];
  ensurePorts(port);
  port.onmessage = function(e) {
    var data = e.data;
    disptach(port, data);
  };
  port.start();
};

function ensurePorts(port) {
  if (portList.indexOf(port) < 0) {
    portList.push(port);
  }
}

function disptach(selfPort, data) {
  portList
    .filter(port => selfPort !== port)
    .forEach(port => port.postMessage(data));
}
```

#### 8: MessageChannel

```
github demo地址 ： https://github.com/xiangwenhu/page-communication/tree/master/docs
```

## 浏览器的事件循环

#### 思考 当面试官问 浏览器的事件循环的时候 想了解的是哪方面的知识 应该回答那个方面的知识

## 在那几个 part 之间进行循环 ？

在执行栈 和回调队列 之间循环

##

主线程 执行栈（初始化代码 包括（ 定时器 事件监听 网络请求），将这些代码 交给 webAPI）
webAPI（dom 管理事件监听 ajax 管理请求发送 settimeout 管理定时器）对应的回调函数 到了固定的时间或者事件触发后 将自己管理的模块里面的回调函数 加入回调队列 tips settimeout 加入回调队列的时间一定是准确的 但是执行的时间不一定准确

回调队列 （缓存作用） 等主线程里面的任务执行完成后 去执行队列里面的任务 执行回调代码

回调队列里面代码 还是放到主线程里面执行
微任务：
宏任务：

### js 只有一个线程就是主线程 主线程一次只能干一件事 js 引擎在主线程里面 所以，所有的代码执行都在主线程里面 但是还有其他的分线程去处理其他的事情
