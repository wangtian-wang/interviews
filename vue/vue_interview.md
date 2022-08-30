## 生命周期函数

1. 每个生命周期阶段可以做的事情
2. setup和created谁先执行?为什么?
3. setup中为啥没有beforeCreate和created?

## 双向绑定

#### 语法:

​	v-model

#### 特点:

​	以绑定一个响应式数据到视图，同时视图中变化能改变该值。

#### 实现原理:

​	v-model`是语法糖，默认情况下相当于`:value`和`@input,是vue的编译器帮我们做了这些工作,不同的表单类型,绑定不同的事件

#### 使用场景

​	表单项上使用`v-model`

​	vue3中可以在自定义组件上使用

#### 追问

1. v-model和sync修饰符的区别?

   1. v-model是一个指令
   2. .sync属于修饰符 用于监听自定义事件,来改变组件的某些属性 因为vue是单项数据流,子组件不能改变父组件的数据,需要向外emit一个自定义事件,来更新父组件的属性,sync是一个语法糖,便于使用.

2. 自定义组件使用v-model如果想要改变事件名或者属性应该怎样做

   > 一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件使用的属性/事件 与input type=text 不同,。`model` 选项可以用来避免这样的冲突：

   ```js
   Vue.component('base-checkbox', {
     model: {
       prop: 'checked',
       event: 'change'
     },
     props: {
       checked: Boolean
     },
     template: `
       <input
         type="checkbox"
         v-bind:checked="checked"
         v-on:change="$emit('change', $event.target.checked)"
       >
     `
   })
   ```

   

## vue中如何扩展一个组件

#### 扩展方式:

> Mixins,extends(逻辑扩展)
>
> slot(内容扩展) 具名插槽 | 作用域插槽
>
> extend扩展单个对象

#### 在vue3中,使用了composition API 可以很好的解决这些问题

#### 你使用过vue extends扩展过组件吗?

#### mixins的原理你了解吗?

## 权限管理

## 实现一个vuex的思路

1. ​	实现一个vuex

   ```js
   1: 定义一个store类,构造器接收options,设置state为响应式数据,提供commit修改mutation/dispatch 修改action, 提供install方法,可以作为插件来使用.
   class Store{
     constructor(options){
       this.state = reactive(options.state)
       this.options = options
       
     }
     commit(type,payload){
       this.options.mutations[type].call(this,this.state,payload)
     }
   }
   ```

   

1. #### 	action | mutation的区别? 为啥要区分它们

   1. mutation接收state,payload修改state
   2. action接收一个context上下文对象,dispatch返回一个promise实例便于处理内部异步结果

## 实现一个vue router的思路

1. #### vue-router解决的问题是啥?

   > Spa应用的路由需要解决的是 页面跳转,内容改变 但是页面不刷新

2. #### vue-router的实现原理

   > hash / history API 
   >
   > 监听hashchange| popstate事件处理跳转 
   >
   > 根据hash的值或者state的值 从router表中 匹配对应的component并且渲染

3. #### vue-router 加载组件的原理

   > 使用jsonp来加载当前路由对应的组件

#### 4: 	router-link 和 router-view的实现原理

> #### router-link: 
>
> #####       主要作用: 
>
> ###### 			路由导航, 
>
> #####        原理: 
>
> ###### 			vue-router会监听`pop state` 事件,点击router-link后,页面不会刷新,会拿出当前path去route里面找出对应的组件, router-view将该组件渲染出来 router-link会默认生成a标签, 点击后取消默认跳转行为而是执行一个`navigate` 方法,会监听`pushstate`事件,匹配处一个路由`injectedRoute` `router-view` 的渲染函数依赖这个路由,根据该路由获取要渲染的组件并重新渲染该组件.  
>
> ####   router-view
>
> #### 	主要作用:
>
> ##### 				组件内容渲染

#### 5: 简单的实现vue-router

1. 监听浏览器的地址栏拿到当前的url,保存起来
2. vueRouter 与vue连接起来,注册全局的组件,在组件内部可以访问 router | route

```js
export function createRouter(options) {
  // 保存用户传入的配置项
  // 监听hashchange | popstate事件, 在对应的回调函数中 根据path匹配对应的路由
  // 返回一个router实例,这个router实例有install方法;注册了router-link| router-view 全局组件;在组件内部可以访问 router | route
  const routerHistory = options.history;
 
  let compo = null,
    compo1 = null;
  window.addEventListener(
    "hashchange",
    (e) => {
      compo = () => import(`view/${e.path}.vue`);
    },
    false
  );
  window.addEventListener(
    "popstate",
    (e) => {
      compo1 = () => import(`view/${e.path}.vue`);
    },
    false
  );
  return router;
}
createRouter.install = function(app){
  app.mixin({
    beforeCreate(){
      if(this.$options && this.$options.router){
        this._root = this;
        this._router = this.$options.router
      }else {
        this._root = this.$parent._root
      }
      Object.definedProperty(this,'$router',{
        get(){
          return this._root._router
        }
      }
    }
  })
  app.component("router-link",{
    render(h){
    	const routesMap = this._self._router.routesMap;
      const component = routesMap[current];
    	return h(component)
    }
  });
  
 
}
```





## vue中key的作用是啥?

1. 为了高效的更新虚拟DOM
2. 在vue的diff算法中,使用key和节点类型来比较两个节点是否相同,如果不设置key,那vue就认为这是两个相同的节点,只能做更新操作,造成了大量的dom更新操作.
3. 在实际开发中应该避免使用数组索引作为key,会导致一些隐蔽的bug
4. 使用相同标签元素过渡切换时,也会使用key,为了让vue可以区分他们,否则vue只会替换内部属性,不会触发过渡效果.

## nextTick

1. #### 原理

   1. nextTick是等待下一次 DOM 更新刷新的工具方法
   2. 和vue的异步更新策略有关; 若数据发生变化,不会立即更新DOM.开启一个队列,把组件更行函数缓存在队列中,在同一事件循环中发生的所有数据变更会异步的批量更新.我们传入的回调会被添加到队列刷新函数的后面,等队列内的更新函数全部执行完毕后,所有的dom操作也都结束了,自然能获取到最新的dom元素的相关属性.

2. #### 使用场景

   1. created中想要获取DOM时
   2. 响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度

## watch/computed

1. #### 使用场景

   1. #### watch

      1. 侦听某个响应式数据的变化,执行一些操作 包括异步的操作

   2. #### computed

      1. 简化行内模板中的复杂表达式
      2. 特点: 具有缓存性;懒执行;可以传递对象变为即可读,又可以写的属性

2. #### 追问: watch和watchEffect的区别??

   1. #### 定义不同

      1. watchEffect立即运行一个函数,被动的追踪依赖,依赖发生变化重新执行该函数
      2. watch侦听一个或者多个响应式数据源,当响应式数据发生变化时调用一个回调函数

   2. #### 使用场景不同

      1. watchEffect
         1. 假设不关心响应式数据变化前后的值,可以使用watchEffect做一些事情
         2. 回调参数的参数也是一个函数,这个函数可以用来清理无效的副作用,在一些竞态的场景下适合
      2. watch
         1. 需要获取响应式数据变化前后的值,使用watch
         2. 可以指定getter函数,依赖控制的更加精准.

## vue性能优化的方法

#### 编码层面的优化

1. #### 最常见的路由懒加载：有效拆分App尺寸，访问时才异步加载

2. #### `keep-alive`缓存页面：避免重复创建组件实例，且能保留缓存组件状态

3. #### 使用`v-show`复用DOM：避免重复创建组件

4. #### `v-for` 遍历避免同时使用 `v-if`：实际上在Vue3中已经是个错误写法

5. #### v-once和v-memo：不再变化的数据使用`v-once`按条件跳过更新时使用`v-momo`

6. #### 长列表性能优化：如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容

7. #### 事件的销毁：Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

8. #### 图片懒加载

9. #### 第三方插件按需引入

10. #### 子组件分割策略：较重的状态组件适合拆分,无状态的组件尽量不要拆分(组件实例消耗大)

11. #### 服务端渲染/静态网站生成：SSR/SSG

## vue组件为啥是单根节点

1. #### 在vue2中

   1. `patch`方法在遍历的时候从根节点开始遍历，它要求只有一个根节点。组件会转换为一个`vdom`，所以`vdom`是一颗单根树形结构.

2. #### 在vue3中

   1. ​	`vue3`中之所以可以写多个根节点，是因为引入了`Fragment`的概念，这是一个抽象的节点，如果发现组件是多根的，就创建一个Fragment节点，把多个根节点作为它的children。将来patch的时候，如果发现是一个Fragment节点，则直接遍历children创建或更新。

## vue-loader

1. #### 概念: 是处理.vue为后缀的文件的webpack loader

2. #### 作用: webpack打包时,会以loader的方式调用vue-loader,vue-loader被执行时,会对SFC中的每个语言块采用单独的loader链处理,最后将这些单独的块装配为最终的组件模块.

## v-once

1. #### 特点: 仅渲染一次,并且会跳过未来更新

2. #### 使用场景: 元素或者组件在初始化后不再变化,这种情况适合该指令

## v-memo

1. #### 特点: 有条件的缓存部分模板并控制它们的更新.

## 错误处理

1. 接口异常
   1. axios拦截器里面封装
2. 代码逻辑错误
   1. App.config.errorHandler 全局错误处理函数
3. 错误处理
   1. 请求错误 -> 需要上报接口信息,参数,状态码
   2. 代码逻辑错误 -> 获取错误函数的名称
   3. 还可以收集应用的名称,环境,版本信息,用户信息,所在页面等

## 使用vue渲染大量数据的优化处理

1.  渲染大量数据会出现页面卡顿
2. 措施
   1. 分页处理
   2. v-once
   3. v-memo 配合v-for 避免数据变化时 不必要的vnode的创建
   4. 采用懒加载的方式
   5. vue-virtual-scroller 等虚拟滚动方案,只渲染视口的数据.

#### Vue3中响应式数据如何进行依赖收集

> vue3里面这部分功能的实现是通过 effect 和 proxy 来实现的,具体过程如下:
>
> 1: effect.run()会在最开始执行一次,生成一个全局的active effect 
>
> 2:  在proxy的get里面 ,触发track 
>
> 3: track里面当前的 active effect :会收集对应的属性  属性也会对effect收集
>
> 4: 当属性发生变化的时候 会找到对应的effect函数去执行

#### vue3中被readonly代理过的对象,再使用reactive代理时,会被直接返回

#### vue3 模板优化策略 ----- 靶向更新

> ```js
> 1: patchFlag 标识节点静态,动态属性
> 
> 2: blockTree 是以树为单位来收集的,收集当前节点的所有后代节点
> 遇到v-if v-for 会将当前的节点作为一个block,收集dynamicChild,和跟节点一起形成一个树形嵌套的blockTree
> 
> 3: dynamicChild:[]收集动态节点,为不稳定的结构也创建block节点,实现blocktree
>  响应式数据变化 ->更新dynamicChild
> ```
>
> 

#### 对于靶向更新的优化 ---- 静态提升

>  静态的节点和属性会被缓存起来 避免反复创建造成的性能消耗
>
> 当静态节点过多时,会将静态节点 转换为字符串,缓存起来
>
> 内联函数会被缓存

#### provide inject 组件的父子关系   patch中构建父子关系

> provide的原理是在 父组件实例上面 挂载了一个provide属性, 通过object.create()等,定义了原型链的查找方向
>
> parent                                                    son:                                                                grandson
>
> provide('name', 'parent')                      provide('name', 'children')                             inject('name')
>
> ​								                          provide = parent.provide? Parent.provide : object.create(null)     

####  vue的插槽

>  插槽是啥
>
> 1: 调用h函数第三个参数为对象的时候, 会被看做插槽
>
> 2: 在template里面编写模板的时候, slot是官方定义的插槽的写法
>
> 本质: 插槽会被编译为函数 ,使用一个对象保存起来,里面存放着映射关系 渲染组件的时候 去映射表里面找到对应的函数 条用

#### vue3重写数组方法的原因

> 数组的push pop shift unshift splice ....等方法 会改变数组的长度  数组的长度 length属性发生变化,会调用proxy的set方法,
>
> includes ,indexOf等方法调用的执行过程 : 先将代理对象转化为原始对象 调用原始对象的includes方法,原始对象上面假若找不到 就需要去代理对象上面查找