## 概念：

Cross Site Scripting

1. 跨站脚本攻击 通过存在安全漏洞的 web 网站注册用户的浏览器内运行的非本站点 html js 进行的攻击 2.恶意的 js 代码在本域名上运行

## 类型

1. 反射型 点击短链接 访问恶意 url 运行 js 脚本 获取 cookie
2. 存储型 发表评论 嵌入恶意脚本

## 防范手段

1. x-xss-protection xss 过滤

1. 局限性： 并不安全 部分浏览器能使用

1. csp : 定义安全白名单 告诉浏览器哪些外部资源是可以加载的 白名单的 npm 包 'xss'

1. 转义字符 输入

1. 设置黑名单 富文本编辑会存在这样的 html 输入问题

1.Cookie HttpOnly 只有服务端才能获取 cookie 前端在 cookie 里面有记录 但是不能通过 document.cookie 获取

## 本质原因 ：

`用户提交恶意代码；浏览器执行恶意代码`

## 解决办法

`1:对于数据进行严格的输入校验； 比如html, css, url, vue(v-html) react(dangerousHtml)`

`2: CSP Content Security Policy (x-xss-protection) default-src 'self' 所有加载的内容必须来自于站点的同一个源 `

`3: 输入验证phone, URL, 电话号码, 邮箱`

`4: 开启浏览器的XSS防御: cookie http only`

`5: 验证码`
