## vuex 原理

```js
 每个组件 在beforeCreate 的生命周期中都混入同一个store实例 作为属性$store
```

## store 是如何实现注入的？？

```js
    Vue.use(Vuex) 方法执行的是install方法，它实现了Vue实例对象的init方法封装和注入，使传入的store对象被设置到Vue上下文环境的$store中。因此在Vue Component任意地方都能够通过this.$store访问到该store。
```

## vuex 对象是 vue 的一个插件,谈谈 vue.use()方法

```
如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
该方法需要在调用 new Vue() 之前被调用。
当 install 方法被同一个插件多次调用，插件将只会被安装一次。


```
