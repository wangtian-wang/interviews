## hash
* 不刷新浏览器
* 与a标签的href 属性相结合 可以进行路由跳转
```js
 <a href="#/foo"></a> 利用a标签的锚点属性，实现在不刷新浏览器的前提下 进行路由的切换
```
## location
* 会刷新整个浏览器
* 会向目标url发起http请求
```js
  window.location='/foo';
```
## history API
### pushstate({name: 'fool'},null,url)
* 会向当前的浏览器的浏览记录里面添加数据，可以使用浏览器提供的回退按钮
* 不会向浏览器发起请求
* 不刷新浏览器 刷新页面
### replacestate({name:'replace'},null,url)
* 不会向当前的浏览器的浏览记录里面添加数据 不可以使用浏览器提供的回退按钮
* 不会向浏览器发起请求
* 不刷新浏览器 刷新页面
## popstate事件只会在某些行为下触发
* 通过pushState 或者 replaceState向浏览器里面添加的历史记录，可以通过下面的操作触发
```js
触发 ：
  比如点击后退、前进按钮
  (或者在JavaScript中调用history.back()、history.forward()、history.go()方法)，
   此外，a 标签的锚点也会触发该事件
   则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝.


```
