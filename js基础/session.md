* sessionStorage()
   	* 每个浏览器的窗口是一个独立的沙箱，在不同的 tab 页面里面存储的 session，在另外的 tab 里面是不可见的
   	* 当浏览器的 tab 关闭的时候，当前的 tab 对应的数据 session 会被销毁；
* localStroage()
  	* 存在 local 里面的数据， 在不同的 tab 里面是可以共享的，
  	* 在 tabA 里面存了一个 local， 在 tabB里面是可以拿到的，在 tabA 关闭之后，这个 local 还是存在的
  	* 

vuex的数据在每次页面刷新时丢失，是否可以在页面刷新前再将数据存储到sessionstorage中呢，是可以的，[beforeunload](https://www.w3cschool.cn/fetch_api/fetch_api-9vhu2oq0.html)事件可以在页面刷新前触发，但是在每个页面中监听beforeunload事件感觉也不太合适，那么最好的监听该事件的地方就在app.vue中。

```javascript
export default {
  name: 'App',
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}


```




