## window.screen.orientation 

* 可以在做移动端的时候，获取屏幕的方向
* landscope
* portrait 

## Location

* protocal
* port ： 更该port，发生跳转
* hostname ： 更该域名，发生跳转
* pathname ： 更该pathname，发生跳转
* hash ： 更该hash，不发生浏览器的跳转行为， 利用 hash 的特性，做单页面应用， 多个页面跳转不发生页面刷新
  * 锚点：<a  href="#location1"></a>
    * window.onhashchange()        		监控 hash 的改变 hash 变化，更改页面
* search
* href: 获取整个 URL， 重新赋值可以跳转