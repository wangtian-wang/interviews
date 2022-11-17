### 生命周期函数

1. 每个生命周期阶段可以做的事情
2. setup 和 created 谁先执行?为什么?
   1. setup > created > onMounted > mounted
3. setup 中为啥没有 beforeCreate 和 created?
   1. setup 的调用发生在组件 mounted 之前

### new Vue () 的作用

- 合并配置
- 初始化生命周期和事件
- 调用 `render`函数
- 调用`beforeCreate`函数
- 初始化`state`
- 调用 `created`
- 调用 `vm.$mount`,挂载渲染

### vue 实例挂载过程中发生了什么?

1. 初始化 mountComponent
   1. 创建组件实例
   2. 初始化组件实例
   3. 创建响应式数据
2. 建立更新机制
   1. 首次渲染执行 patch 函数,将 vnode 转换为真实 DOM;
   2. 执行渲染函数,会创建**组件的响应式数据与组件更新函数**之间的关系

### vue-loader 的作用.

​ 1: 处理单文件组件(SFC)的 webpack loader,将我们写的 template,script,style 使用不同的 loader 进行链处理.最后将这些单独的块装配成最终组件模块.

#### 组件元数据

给当前组件的 export default {}对象里面添加一个属性,可以在引入这个组件的时候,从该组件解构出该属性

### 异步组件

1.  何为异步组件
1.  在 vue3 中 使用 defineAsyncComponent()函数,传入配置项(delay, timeout, loadingComponent,...),执行该函数就会得到一个异步组件
1.  异步组件的使用场景
1.  异步组件可以进行代码风格,减少当前文件的打包体积,假设当前的文件,是个重要的页面,内容多,代码分包会提交该页面的加载速度,提升页面性能;
1.  异步组件和懒加载的区别
1.  import() 加载的组件,返回的是一个 promise,父文件中的子组件可以使用 import 加载, 但是 import 没有提供额外的配置项,比如对于 delay,timeout,自定义错误组件的支持,这些都需要用户自定义配置
1.  defineAsyncComponent()是 vue 框架层面做了封装,提供了开发者一个快捷的 API 去完成上述功能

## 双向绑定

- 语法:

  v-model

- 特点:

  以绑定一个响应式数据到视图，同时视图中变化能改变该值。

- 实现原理:

  `v-model`是语法糖，默认情况下相当于`:value `和`@input,是 vue 的编译器帮我们做了这些工作,不同的表单类型,绑定不同的事件

- 使用场景

  表单项上使用`v-model`

  vue3 中可以在自定义组件上使用

#### 追问

1. v-model 和 sync 修饰符的区别?

   1. v-model 是一个指令
   2. .sync 属于修饰符 用于监听自定义事件,来改变组件的某些属性 因为 vue 是单项数据流,子组件不能改变父组件的数据,需要向外 emit 一个自定义事件,来更新父组件的属性,sync 是一个语法糖,便于使用.

2. 自定义组件使用 v-model 如果想要改变事件名或者属性应该怎样做

   > 一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件使用的属性/事件 与 input type=text 不同,。`model` 选项可以用来避免这样的冲突：

   ```js
   Vue.component("base-checkbox", {
     model: {
       prop: "checked",
       event: "change",
     },
     props: {
       checked: Boolean,
     },
     template: `
       <input
         type="checkbox"
         v-bind:checked="checked"
         v-on:change="$emit('change', $event.target.checked)"
       >
     `,
   });
   ```

## vue 中如何扩展一个组件

- 定义

  > 通常我们封装的组件的功能是单一的,只完成一件事情.当我们想给这个组件增加一些功能时, 就叫组件扩展

- 扩展方式:

  > Mixins,extends, compositionAPI(逻辑扩展)
  >
  > slot(内容扩展) 具名插槽 | 作用域插槽
  >
  > Vue.extend 扩展单个对象

- 追问 : Vue.extend 与单文件组件的区别?

  > 单文件组件,只能被用在父组件的 template 中, Vue.extend 创建的是组件构造器,可以 new 一个实例, 可以调用$mount()方法,挂载到页面指定的元素上,可以脱离 dom 层级的限制.

  > 像`element-ui` 中的 message, messageBox 等都采用的是 Vue.extend 的写法

#### 修饰符的实现原理

> 事件修饰符 stop prevent self 等 主要靠的是模板编译原理
>
> capture once passive 等编译的时候增加标识

#### 自定义指令

> 用户设置好对应的钩子函数,当元素在不同的状态时 会依次调用对应的钩子

#### mixins 的原理

全局混入

> 当我们使用 Vue.mixin()时 会传入一个 option,Vue.options= mergeOption(全局 options,用户传入的 option,)
>
> initMixin 的时候, 会给当前实例增加$options 属性,值为实例化传进来的 option 和 Vue.options 的合并

局部混入

> 会和 vue 的 option 里面的方法合并

#### Mixin 和 Vuex 的区别？

上面一点说 Mixin 就是一个抽离公共部分的作用。在 Vue 中，Vuex 状态管理似乎也是做的这一件事，它也是将组件之间可能共享的数据抽离出来。两者看似一样，实则还是有细微的区别，区别如下：

- Vuex 公共状态管理，如果在一个组件中更改了 Vuex 中的某个数据，那么其它所有引用了 Vuex 中该数据的组件也会跟着变化。
- Mixin 中的数据和方法都是独立的，组件之间使用后是互相不影响的

#### mixin

> 1: 使用方式 局部, 全局注册
>
> 2: 缺点
>
> 3: 优点
>
> 4: 与组件中同名的属性或者事件会覆盖 mixin 中相同名字的事件或者属性
>
> mixin 中混入的生命周期先执行

#### $set 原理

```js
 $set(obj,key,value)
     Object.defineproperty只能对对象的属性劫持,所以vue2里面 为了让对象和数组本身实现依赖收集 就给 ``数组和对象增加dep``,为了添加不存在的属性的时候 能触发视图更新;
     当调用$set的时候,会找到对象上面的dep属性,调用dep的notify 去更新对象.
```

## Render and template

> vue2 中
>
> Render 的优先级高于 template ; 没有 template render 使用 outerHtml 作为 template

## 持久化登录

> 1: store 里面封装公共的登录方法
>
> 2: 登录页面调用 store 里面的公共方法,并将 token 等信息存储到 localStorage 里面
>
> 3: 在 router 的路由守卫里面 执行一下操作
>
> a: 检查 local 里面有无 token,若没有直接跳到登录页面
>
> b: 将本地存储的 token 设置到 请求头中 让服务端验证, 返回最新结果 存储起来

## 实现一个 vuex 的思路

1. 实现一个 vuex

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

2. #### action | mutation 的区别? 为啥要区分它们

   1. mutation 接收 state,payload 修改 state
   2. action 接收一个 context 上下文对象,dispatch 返回一个 promise 实例便于处理内部异步结果

## 实现一个 vue router 的思路

- vue-router 解决的问题是啥?

  > Spa 应用的路由需要解决的是 页面跳转,加载响应的内容,但是页面不刷新

- vue-router 的实现原理

  > hash | history API
  > router.push
  > router.go
  > router.replace
  >
  > 监听 hashchange| popstate 事件处理跳转
  >
  > 根据 hash 的值或者 state 的值 从 router 表中 匹配对应的 component 并且渲染

- vue-router 加载组件的原理

> 使用 jsonp 来加载当前路由对应的组件

- 模式

  ```js
   hash         监听hashchange事件, 通过location.hash 实现路由跳转

   history      监听 popstate 事件 history.pushState 实现路由跳转
  ```

- 区别

  > hash

  ```js
  url参数 -> hash 只能添加字符串类型的数据
  历史记录 -> hash 后面的内容会显示, 只要不刷新浏览器,点击浏览器的前进后退按钮 可以看到历史记录
  部署    ->  兼容性好,无需后台配置

  ```

  > history

```js
url参数 -> history 添加多重类型的数据
历史记录 -> history 的每条记录都会添加到历史记录里面,即使刷新浏览器, 历史记录也不会受到影响
部署    ->  需要后台配合 ,当发出的请求匹配不到对应的资源时 需要返回index.html资源
```

##### popState

> 触发时机: 点击浏览器的前进后退按钮 或者调用 history.back() 或者 history.forward()

##### router-link 和 router-view 的实现原理

- router-link 主要作用:
  > 路由导航
- 原理:

  > vue-router 会监听 `pop state` 事件,点击 router-link 后,页面不会刷新,会拿出当前 path 去 route 里面找出对应的组件.

  > router-link 会默认生成 a 标签, 点击后取消默认跳转行为而是执行一个 `navigate` 方法,会监听 `pushstate`事件,匹配出一个路由 `injectedRoute`

  > `router-view` 的渲染函数依赖这个路由,根据该路由获取要渲染的组件并重新渲染该组件.

- router-view

  > 将 `router-link`匹配的路由组件渲染出来

- 简单的实现 vue-router

1. 监听浏览器的地址栏拿到当前的 url,保存起来
2. vueRouter 与 vue 连接起来,注册全局的组件,在组件内部可以访问 router | route

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

## vue 中 key 的作用是啥?

- 1. 为了高效的更新虚拟 DOM
     > 在 vue 的 diff 算法中,使用 key 和节点类型来比较两个节点是否相同,如果不设置 key,vue 使用的算法是 , 减少 DOM 的移动, 尽可能多的原地 patch 或者 reuse 相同 type 的 dom, 有 key 的话, 根据 key 找到新节点在旧节点中的位置 ,对于 DOM 重新排序,移除那些之前有 key,更新后没有 key 的元素.
- 2. 在实际开发中应该避免使用数组索引作为 key,会导致一些渲染问题
- 3. 使用相同标签元素过渡切换时,也会使用 key,为了让 vue 可以区分他们,否则 vue 只会替换内部属性,不会触发过渡效果.
- 4. 触发组件的生命周期在恰当的时候

## 按钮的权限控制方法

1. v-if + 自定义全局指令判断函数

   ```js
    1: Vue.prototype.hasPermission = hasPermission
     function hasPermission (perms){
       return localStorage.get('permission').includes(perms)
     }
    2:
   <template>
   <button v-if="hasPermission(add)"></button>
   </template>
   ```

2. 自定义指令

## nextTick

- 1.  原理
  1.  nextTick 是等待下一次 DOM 更新刷新的工具方法
  1.  和 vue 的异步更新策略有关; 若数据发生变化,不会立即更新 DOM.开启一个队列,把组件更行函数缓存在队列中,在同一事件循环中发生的所有数据变更会异步的批量更新.我们传入的回调会被添加到队列刷新函数的后面,等队列内的更新函数全部执行完毕后,所有的 dom 操作也都结束了,自然能获取到最新的 dom 元素的相关属性.

- 2. 使用场景
  1. created 中想要获取 DOM 时
  1. 响应式数据变化后获取 DOM 更新后的状态，比如希望获取列表更新后的高度

## `keep-alive`

#### 作用

- 缓存被`keep-alive`包裹的路由,从而提高渲染性能(减少 diff 虚拟 dom 的创建)

#### 缓存原理 (缓存管理 LRU 算法)

- 1: activate 将组件从原容器 搬运到另外一个隐藏的容器中 实现 假卸载
- 2: deactivated 将组件从隐藏容器里面拿出来

###### LRU 算法

- 维护一个队列, 将最新访问的路由 和 之前已经访问过再次访问的路由 插入到尾部, 当达到最大限制时,将头部的数据丢弃.

#### 渲染原理

- `keep-alive`组件本身不会渲染额外的内容 它的 render 函数只返回需要被 keep-alive 包裹的组件(keep-alive 组件的 内部组件)
- `keep-alive`组件会对内部组件做一些操作 添加一些标记属性,以便渲染器能够据此执行特定的逻辑

## watch/computed

- 1. 使用场景

  - watch
  - 侦听某个响应式数据的变化,执行一些操作 包括异步的操作
  - 原理

  > 是用户传入的 watcher, 基于 watcher 类, 当监听的数据发生变化时候,执行用户传入的回调.

  - computed

  - . 简化行内模板中的复杂表达式
  - . 特点: 具有缓存性;懒执行;可以传递对象变为即可读,又可以写的属性
  - . 原理
    > computed 本质上是一个带有 `dirty:true; lazy:true `属性的 `watcher`, 默认 computed 传入的回调函数不执行,只有当属性在模板中使用后,执行 callback, 会将 dirty 标记为 false,将 callback 的执行结果缓存起来 ,当 computed 的依赖项没发生变化时 ,直接返回缓存结果.依赖项变化, dirty 标记为 false,访问时会执行 callback.

2. ## 追问: watch 和 watchEffect 的区别??

   1. #### 定义不同

      1. watchEffect 立即运行一个函数,被动的追踪依赖,依赖发生变化重新执行该函数
      2. watch 侦听一个或者多个响应式数据源,当响应式数据发生变化时调用一个回调函数

   2. #### 使用场景不同

      1. watchEffect
         1. 假设不关心响应式数据变化前后的值,可以使用 watchEffect 做一些事情
         2. 回调参数的参数也是一个函数,这个函数可以用来清理无效的副作用,在一些竞态的场景下适合
      2. watch

         1. 需要获取响应式数据变化前后的值,使用 watch
         2. 可以指定 getter 函数,依赖控制的更加精准.

      3. 总结

         > watchEffect 将依赖的追踪和副作用的执行合并到一个一个阶段.

         > watch 将依赖追踪和副作用分开,可以更加精确的控制回调函数的执行时机.

## vue 性能优化的方法

- 选择正确的框架
  - 对首页性能要求较高的 可以考虑 SSR/SSG
  - SPA : 当页面对于性能有较高的要求时, 需要单独部署,并采用 SSG 的方式部署.
- 包体积的优化
  - GZIP 压缩
  - 懒加载
  - tree-shaking 尽量采用 esmodule 规范的包
  - 按需引入
- 更新的优化
  - `keep-alive`缓存页面：避免重复创建组件实例，且能保留缓存组件状态.
  - 使用 `v-show`复用 DOM：避免重复创建组件.
  - `v-for` 遍历避免同时使用 `v-if`：实际上在 Vue3 中已经是个错误写法
  - `v-once` 和 `v-memo`：不再变化的数据使用,跳过更新
  - `props`的稳定性
- 通用优化
  - 大型虚拟列表;
  - 减少大型不可变数据的响应式开销
  - 较少不必要的组件抽象
    > 组件实例比普通 DOM 节点要昂贵得多，而且为了逻辑抽象创建太多组件实例将会导致性能损失。
  - 事件,定时器的销毁
  - 骨架屏,或者 loading

## vue 组件为啥是单根节点

- 在 vue2 中

  > `patch`方法在遍历的时候从根节点开始遍历，它要求只有一个根节点。组件会转换为一个 `vdom`，所以 `vdom`是一颗单根树形结构.

- 在 vue3 中

  > `vue3`中之所以可以写多个根节点，是因为引入了 `Fragment`的概念，这是一个抽象的节点，如果发现组件是多根的，就创建一个 Fragment 节点，把多个根节点作为它的 children。将来 patch 的时候，如果发现是一个 Fragment 节点，则直接遍历 children 创建或更新。

## vue-loader

- 1 概念: 是处理.vue 为后缀的文件的 webpack loader
- 2 作用: webpack 打包时,会以 loader 的方式调用 vue-loader,vue-loader 被执行时,会对 SFC 中的每个语言块采用单独的 loader 链处理,最后将这些单独的块装配为最终的组件模块.

## v-once

- 特点: 仅渲染一次,并且会跳过未来更新
- 使用场景: 元素或者组件在初始化后不再变化,这种情况适合该指令

## v-memo

- 1.  特点: 有条件的缓存部分模板并控制它们的更新.

## 错误处理

1. 接口异常
   1. axios 拦截器里面封装
2. 代码逻辑错误
   1. App.config.errorHandler 全局错误处理函数
3. 错误处理
   1. 请求错误 -> 需要上报接口信息,参数,状态码
   2. 代码逻辑错误 -> 获取错误函数的名称
   3. 还可以收集应用的名称,环境,版本信息,用户信息,所在页面等

## 使用 vue 渲染大量数据的优化处理

1. 渲染大量数据会出现页面卡顿
2. 措施
   1. 分页处理
   2. v-once
   3. v-memo 配合 v-for 避免数据变化时 不必要的 vnode 的创建
   4. 采用懒加载的方式
   5. vue-virtual-scroller 等虚拟滚动方案,只渲染视口的数据.

#### Vue2 中进行依赖收集

> 1: 依赖收集才用了观察者模式 被观察者指的是数据(dep), 观察者是 watcher(渲染 watcher, 计算 watcher,用户 watcher)
>
> 2: 一个 watcher 对应多个 dep, 一个 dep 对应多个 watcher 默认渲染的时候会进行依赖收集,数据更新了找到对应的 watcher 去触发更新

#### Vue3 中响应式数据如何进行依赖收集

> vue3 里面这部分功能的实现是通过 effect 和 proxy 来实现的,具体过程如下:
>
> 1: effect.run()会在最开始执行一次,生成一个全局的 active effect
>
> 2: 在 proxy 的 get 里面 ,触发 track
>
> 3: track 里面当前的 active effect :会收集对应的属性 属性也会对 effect 收集
>
> 4: 当属性发生变化的时候 会找到对应的 effect 函数去执行

#### vue3 中被 readonly 代理过的对象,再使用 reactive 代理时,会被直接返回

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

#### 对于靶向更新的优化 ---- 静态提升

> 静态的节点和属性会被缓存起来 避免反复创建造成的性能消耗
>
> 当静态节点过多时,会将静态节点 转换为字符串,缓存起来. 复用节点,节省内存, 省去 dom 更新.
>
> 内联函数会被缓存

#### provide inject 组件的父子关系 patch 中构建父子关系

> provide 的原理:
>
> 默认当前组件继承了父组件的 provides; 当组件要提供自己的 provide 时,就使用父组件的 provide 作为 prototype,创建一个 provides 对象,放在当前的实例上面.
>
> inject
>
> 获取当前实例的 provides 或者 app.context 的 provides(假设当前组件是跟组件)

```javascript
object.create()等,定义了原型链的查找方向

parent son: grandson

provide('name', 'parent') provide('name', 'children') inject('name')

provide = parent.provide? Parent.provide : object.create(null)
```

#### vue 的插槽

> 插槽是啥
>
> 1: 调用 h 函数第三个参数为对象的时候, 会被看做插槽
>
> 2: 在 template 里面编写模板的时候, slot 是官方定义的插槽的写法
>
> 本质: 插槽会被编译为函数 ,使用一个对象保存起来,里面存放着映射关系 渲染组件的时候 去映射表里面找到对应的函数调用

### vue2 object.definedProperty()

- 缺点
  - 只能代理对象的已存在属性, 不能代理后来添加的属性.
  - 不能代理整个对象.当对象的属性较多时,需要使用递归进行处理.
  - 只能拦截对象的 set get 操作,不能拦截 诸如 delete, in 等方法的操作.
- vue 采取的解决办法
  - 对于数组,重写了数组的 7 个方法,实现对响应式数据的支持.
  - 使用 ` $set` `$delete` 来解决对象属性的添加或者删除操作.

#### Vue2 如何检测数组变化

> 数组并没有使用 `defineProperty`进行代理, 因为通过数组索引修改数组的情况不多,假设直接使用 `defineProperty`对索引进行劫持的话, 会浪费性能.
>
> 劫持只能对对象的属性进行劫持 arr[1]也算是属性 访问
>
> vue2 才用了重写数组的变异方法来实现, 对于定义在 data 中的数组进行原型链修改,后续调用的方法都是重写后的方法, 假设数组元素是对象, 这个对象也会被代理

#### vue3 重写数组方法的原因

> 数组的 push pop shift unshift splice ....等方法 会改变数组的长度 数组的长度 length 属性发生变化,会调用 proxy 的 set 方法,
>
> includes ,indexOf 等方法调用的执行过程 : 先将代理对象转化为原始对象 调用原始对象的 includes 方法,原始对象上面假若找不到 就需要去代理对象上面查找

#### vue 模板编译的原理

> 1: 模板编译主要干了一件啥事情 ?
>
> 将模板编译为 ast,再将 ast 生成为代码
>
> 2: 实现的具体函数是啥 具体步骤
>
> parse( ) 使用大量的正则表达式, 将 template 进行解析,将指令,属性,等 变为 ast.
>
> optimize( ), 遍历 ast, 对 ast 进行优化,标记 ast 中的静态节点.便于在 diff 时,直接跳过静态节点,进行框架性能优化.
>
> generator( ) 代码生成; 拼接 生成 render 函数字符串 ;(new Function + with)

### 为啥在 vue 中引入图片需要使用 require()

> vue 项目在启动时,会整个项目打包,并且输出在当前文件的 dist 目录下,所有在 vue 项目中使用相对路径引入的静态的资源,会被 webpack 使用 require 加载进来,这样就能正确找到文件的路径; 假设不使用 require, 那动态加载的资源路径与图片资源被编译后的资源地址不一致.所以找不到文件.

### vite 或者 webpack 中 alias 的原理是啥?

#### v-show 的实现原理

- v-show 在 v2 v3 中的实现方式是一样的

```js
var show = {
    bind(el){
         el.style.display
    }
    update(){}
    }
 var platformDirectives = {
    show: show,
  };
 extend(Vue.options.directives, platformDirectives);
  // 将v-show注册为全局指令 挂在  Vue.options.directives = { v-model,v-show}上面

```

#### v-if 的实现原理

- v-if 指令会删除或者新增加 dom 节点, 会改变 DOM 的结构,进而影响到 vue 的编译过程.

```js
// parse  convert html to ast
function parse() {
  parseHTML(template, {
    start() {
      processIf();
    },
  });
}
// v-if 的实现依靠模板编译和render函数
// 在模板编译阶段 , 生成 ast 给当前的vnode上面挂载 ``if`` 属性, 值为表达式的值
// 在render阶段 根据if属性来 来判断是否需要生成vnode
条件为真, 开始编译DOM ,生成vnode ,动态appendChild,添加DOM, 否则: 动态移除DOM

```

#### v-html 的实现原理

- 给当前的组件实例上面绑定了 rawHtml 的属性,用这个属性来保持`v-html`绑定的`DOM`的更新

#### 使用 v-for 时 需要使用事件代理吗?

- 需要

```js
function add(target) {}
/**
 源码中的add函数是处理事件添加的函数, target是参数, 函数内部的代码是给target添加事件.
    当使用,事件代理的时候, target是父元素, 
    当没有使用代理时, target为v - for循环生成的DOM;
事件代理的好处 
1: 因为只给 父元素添加事件处理函数,所以个数减少,所占用的内存也减少
2: 动态增加的子节点,无需绑定事件, 父元素的事件委托作用于子元素
注意: 不支持事件冒泡的事件,不适合使用事件委托.
 */
```

#### 为啥 Vuex 的 Mutation 不能做异步操作

- 为了方便调试
  > 因为每个 mutation 执行完成后都会对应一个新的状态变更,devtools 就可以以快照的形式 将该变更保存下来,假设有异步的操作, 那没有办法知道状态何时变更,无法进行状态追踪,给调试带来困难.

#### router-link 和 a 标签跳转的区别

- 有 onclick 那就执行 onclick
- click 的时候阻止 a 标签默认事件(这样子点击<a href="/abc">123</a>就 不会跳转和刷新页面)
- 再取得跳转 href(即是 to)，用 history(前端路由两种方式之一，history & hash)跳转，此时只是链接变了，并没有刷新页面

#### v-model 绑定 vuex 中的属性会有啥问题,以及如何解决

- 确实会有问题,会收到来控制台的警告
- 解决方法
  - 1: ` <input type="text" v-model="$store.state.Root.value" />` 直接绑定
  - 2: 将`v-model="exp"` 绑定的 exp 变为 计算属性,定义 get 和 set,set 的时候 直接调用 vuex 中定义的更改 exp 的方法.
  - 3: 自己监听 input 事件,在事件中执行 store 的变更方法

```js
// xx.vue
<template>
    <input type="text" v-model="message" />
    <input type="text" :value="msg" @input="updateMsg" />
</template>
export default {
    computed: {
        message: {
            get(){
                return this.$store.state.message
            },
            set(val){
                this.$store.commit('updateMsg',val)
            }
        },
        msg(){
            return  this.$store.state.message
        }
    },
    methods: {
        updateMsg(val){
            this.$store.commit('updateMsg',val)
        }
    }
}
// message.js

export default {
    state : {
        message: 'xxx'
    },
    mutations: {
        updateMsg(state,val){
            state.message = val
        }
    },

}
```

### 如何理解虚拟`Vnode`

- 概念:
  > 将目标所需 UI,通过 数据结构, `虚拟的` 表示出来.保存在内存中,真实的 dom 节点与虚拟 dom 节点保持一致.
- 优点:
  > 便于**灵活的,声明式的创建 UI**, 把具体的`DOM`操作留给渲染器其做
- 应用:
  - mount dom
    > 运行时的渲染器会遍历 dom 树,并以此来构建真实的 dom,这个过程为挂载
  - patch dom
    > 数据发生变化时,会生成新的 vnode, 对比新旧 vnode 的差异, 并将差异应用在真实的 dom 上
- `mount` 的具体过程
  - 编译:
    > 将`<template></template>` 编译为 render 函数.render 函数返回 vnode tree.这一步可以使用构建步骤提前完成,也可以使用运行时编译器来完成
  - 挂载:
    > 运行时, `渲染器` 会调用 渲染函数, 遍历 vnode,以此来创建真实 DOM. 这一步会是响应式副作用的执行,
  - patch:
    > 数据变化,副作用重新运行,创建一个更新后的 vnode,遍历 vnode,与旧的 vnode 比较,将差异(更新)应用到真实 dom 上.
- 缺点

  > 因为 虚拟 DOM 是纯运行时的,更新算法无法提前知道新的 vnode,所以需要遍历整棵 vnode 树,开确保 vnode 的 prop 是正确的.

  > 即使 Vnode 树上面的变化只有一部分,重新渲染时,还是重新构建 vnode,带来性能上的浪费

- 优化: 编译器的优化

  - 静态提升
  - 更新标记类型 patch flag -> 在更新带有动态绑定的元素时, 来确定更新操作; fragment
  - 树结构拍平 block

    > 内部结构稳定的一部分称为区块,每个区块都会追踪带有更新标记的后代节点.

    > 子区块会在父区块的动态子节点`dynamic children`中被追踪

  - 对于 ssr 的激活影响

#### `render` `h`

- render 函数的参数是 `h`, 用来将整个 `template` 处理为 vnode.
- h 既 `createElement()` 是一个生成 vnode 的实用程序. 可以创建单个的`vnode`

#### dom diff 算法

- 因为虚拟 DOM 都是树结构的数据,所以在 diff 的过程中,遵循树的遍历规则.(都只有一个根节点)
- 广度优先
- 深度优先
- vue 中采用的是 深度优先遍历

###### V2

- 简单 DOM diff
  - 定义一个 maxIndex = 0
  - 新的 Vnode 在旧的 vnode 中寻找 是否有可复用的元素
  - 若有可复用的元素, 找到这个元素在旧的 Vnode 的 index, 假设 index> maxIndex,则不需要移动,更新 maxIndex = index
  - 在更新的过程中,新 vnode 的索引 小于 maxIndex,这说明需要移动该元素.之后再做 `patch` 可以减少 dom 移动的次数.
- 双端 diff
  - **同时**对新旧两组子节点的**两个端点**进行比较的算法
  - 优势在于 在同样的更新场景, 执行 DOM 移动的操作次数更少
  - 过程:
    - 双端对比, 寻找 key 相同的 vnode,移动 , patch
      - 旧的 vnode 的第一个元素和新的 vnode 的最后一个元素比较
      - 旧的 vnode 的最后一个元素和新 vnode 的最后一个元素比较
      - 旧的 vnode 的第一个元素和新的 vnode 的第一个元素比较
      - 旧的 vnode 的最后一个元素和新 vnode 的第一个元素比较
    - 若以上条件都不满足则需要,则遍历旧的一组子节点，寻找与 newStartVNode 拥有相同 key 值的元素
      - 找到了可复用节点，进行 patch， 然后将该节点插入到 oldStartVNode 之前，newStartIdx 索引继续移动
      - 未找到可复用节点，创建和挂载新节点
    - 循环结束检查索引值情况，处理剩余节点，新增或删除节点

###### v3

- 快速 DOM diff 寻找最长上升子序列 (贪心 + 二分查找)
- 运行过程
  - 进行预处
    - 通过找到前置节点 ˙ 和 后置节点中相同的,不需要移动的元素,找到没有处理的元素的区间.
  - 构造一个 source 数组,初始化值为-1
    - 存储 新子节点在旧子节点中存在的话, 将新子节点在旧子节点中的索引存储起来
    - 为了优化双层循环带来的性能问题 , 构建了一张索引表,用来存储节点的 key 和节点位置索引之间的映射.
  - 计算最长上升子序列 (储存的是元素的 Index)
    - 最长上升子序列: 一个数值序列,找到它的一个子序列,并且子序列中的值是递增的,子序列中的元素不一定在原序列中连续.
    - 最长上升子序列所指向的元素不需要移动.
  - 移动 DOM
