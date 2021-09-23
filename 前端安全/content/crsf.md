## 概念：

`CROSS ORIGIN REQUEST FORGERY 跨站请求伪造`

## 复现步骤

1. 受害者登录 a.com 保留了登录凭证 cookie
2. 攻击者诱导受害者 访问了 b.com.html
3. 受害者从 b.com 向 a.com 发送请求 a.com/xxxxx 浏览器会在这个请求上面直接带上 a.com 的 cookie 浏览器的机制

【假如一个域名下面存储了 cookie 任何域 只要向这个域名发起请求，该请求就会自动携带上这个域名的 cookie】

4. a.com 收到了请求，执行了操作
5. 操作完成

## 攻击类型

1. GET 型： 在页面的某个 img 发起一个 get 请求
2.
3.

## 本质原因 ：

`cookie被非法客户端使用`

## 解决办法

1. 同源检测 request header origin refer refer-policy 但是 https 不发送 refer

2. cookie samesite
3. csrf token 将登录凭证 token，加到能够发送请求的 html 元素上面 js 请求，携带 token ；服务端校验 token 的有效性
4.

`1:对于数据进行严格的输入校验； 比如html, css, url, vue(v-html) react(dangerousHtml)`

`2: CSP Content Security Policy (x-xss-protection) default-src 'self' 所有加载的内容必须来自于站点的同一个源 `

`3: 输入验证phone, URL, 电话号码, 邮箱`

`4: 开启浏览器的XSS防御: cookie http only`

`5: 人机图形验证码 + 短信`
