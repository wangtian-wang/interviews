#### websocket

#### WebSocket简介

###### 网络传输协议 位于osi模型的应用层 可在单个tcp连接上面 进行全双工通信(实时通信) 能节省服务器带宽和资源 

#### websocket的握手过程:

```js
请求头
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

- Connection：必须设置Upgrade，表示客户端希望连接升级
- Upgrade：必须设置Websocket，表示希望升级到Websocket协议
- 必须是get方法
- http版本不能低于1.1
- Sec-WebSocket-Key：客户端发送的一个 base64 编码的密文，用于简单的认证秘钥。要求服务端必须返回一个对应加密的“Sec-WebSocket-Accept应答，否则客户端会抛出错误，并关闭连接
- Sec-WebSocket-Version ：表示支持的Websocket版本

```js
响应头
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=Sec-WebSocket-Protocol: chat
```

- HTTP/1.1 101 Switching Protocols：表示服务端接受 WebSocket 协议的客户端连接
- Upgrad: 若缺失该字段 表示WebSocket握手失败,客户端应该终止握手
- Sec-WebSocket-Accep：验证客户端请求报文，同样也是为了防止误连接。具体做法是把请求头里“Sec-WebSocket-Key”的值，加上一个专用的 UUID，再计算摘要

### 占用的端口号 状态码 协议名

- 协议名: ws wss 默认端口是80 或者 443
-  状态码 101 switching protocol

#### WebSock优点

1. 与http有良好的兼容性.默认端口是80 和 443 ,并且握手阶段采用http协议,握手不容易被屏蔽,能通过各种http代理服务器.
2. 数据格式轻量,性能开销小,通信高效
3. 更好的二进制帧支持
4. 没有同源限制,客户端可以和任意服务器通信

WebSock使用注意事项

1. 存在断线可能

