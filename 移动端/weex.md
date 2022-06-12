# - reactive weex 没有官方维护的插件 框架自身和插件有好多的坑 不懂原生开发 很难玩的比较溜

# native script 插件体系丰富 英文文档

webview 是原生操作系统提供的视图标签

# js-> webapp

通过一个运行在原生 app 内的特殊浏览器 来运行 webapp 特殊浏览器称为 webview,

webview 怎样载入 webview

    通过原生 webview 控件来载入(加载)webapp(URL)

# jsBriage 的作用

    一部分 js 的功能在原生平台上可以实现,还有一些 jsapi 在原生平台上不能实现,所以必须有一个方式能让 js 和原生开发交互

    h5调用原生

    原生调用h5

    实现方式: api 注入 / urlScheme(使用 iframe 因为 window.location.href 会 丢失 url)

可以将 webview 理解为 原生 app 内的 html 标签

android 在 4.4 版本之前 高版本和低版本采用的 webkit 内核不一样 4.4 后 chrome 内核

ios wkwebview
