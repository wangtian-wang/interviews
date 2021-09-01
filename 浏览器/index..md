#### 浏览器窗口之间的通信方式

#### 1： websocket

### 2 : **socket.io**和**ws

#### 3: 定时器 + 客户端存储

#### 4: postMessage

		- window.open
		- window.opener
		- iframe

#### 5: storageEvent

- 只要在tab里面监听到了 storage 事件 那就可以监听最新的storage的变动

#### 6：Broadcast Channel

```js
page1
 	 var channel = new BroadcastChannel("channel-BroadcastChannel");
   channel.postMessage('Hello, BroadcastChannel!')
page2
   var channel = new BroadcastChannel("channel-BroadcastChannel");
    channel.addEventListener("message", function(ev) {
        console.log(ev.data)
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

