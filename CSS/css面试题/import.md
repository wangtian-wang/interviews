- import 一般在以.css 为后缀的文件中使用,
- 当浏览器以 link 标签引入 css 样式表时, 假设当前的样式表中,有 import 引入的资源
- 浏览器会先加载 link 标签 的 href 属性指定的资源, 随后才去加载 import 引入的资源
- 虽然浏览器最后加载 import 引入的资源,但是 import 引入的资源 总是被置于当前 css 文件的上面,所以与当前 css 文件中类型同名的属性 容易被覆盖.

### link 标签的属性

- 用来在 HTML 中引入一些外部的资源
- rel 属性,表示了被链接的资源与被包含文档的关系.
- as link 引入的内容类型. 只有在 preload 和 Prefetch 时,才有用
- crossorigin 表示是否采用一个跨域请求.

  - anonymous 表示会发起一个跨域请求,但是不会发送任何认证信息.cookie .如果服务器没有给出源站凭证, 资源会被污染且被限制使用.
  - use-credientials 发起一个带有认证信息的跨域请求.如果服务器没有给出源站凭证, 资源会被污染且被限制使用
  - diasbled
  -
