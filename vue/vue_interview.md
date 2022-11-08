## 生命周期函数

1. 每个生命周期阶段可以做的事情
2. setup 和 created 谁先执行?为什么?
   1. setup > created > onMounted > mounted
3. setup 中为啥没有 beforeCreate 和 created?
   1. setup 的调用发生在组件 mounted 之前

## 双向绑定

#### 语法:

    v-model

#### 特点:

    以绑定一个响应式数据到视图，同时视图中变化能改变该值。

#### 实现原理:

    v-model`是语法糖，默认情况下相当于`:value `和`@input,是vue的编译器帮我们做了这些工作,不同的表单类型,绑定不同的事件

#### 使用场景

    表单项上使用`v-model`

    vue3中可以在自定义组件上使用

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

#### 扩展方式:

> Mixins,extends(逻辑扩展)
>
> slot(内容扩展) 具名插槽 | 作用域插槽
>
> extend 扩展单个对象

#### 修饰符的实现原理

> 事件修饰符 stop prevent self 等 主要靠的是模板编译原理
>
> capture once passive 等编译的时候增加标识

#### 自定义指令

> 用户设置好对应的钩子函数,当元素在不同的状态时 会依次调用对应的钩子

#### 你使用过 vue extends 扩展过组件吗?

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
     Object.defineproperty只能对对象的属性劫持,所以vue2里面 为了让对象和数组本身实现依赖收集 就给
 数组和对象增加dep,为了添加不存在的属性的时候 能触发视图更新; 当调用$set的时候,会找到对象上面的dep属性,
 调用dep的notify 去更新对象.
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

1. #### vue-router 解决的问题是啥?

   > Spa 应用的路由需要解决的是 页面跳转,加载响应的内容,但是页面不刷新

2. #### vue-router 的实现原理

   > hash | history API
   > router.push
   > router.go
   > router.replace
   >
   > 监听 hashchange| popstate 事件处理跳转
   >
   > 根据 hash 的值或者 state 的值 从 router 表中 匹配对应的 component 并且渲染

3. #### vue-router 加载组件的原理

   > 使用 jsonp 来加载当前路由对应的组件

4. ##### 模式

   ```js
    hash         监听hashchange事件, 通过location.hash 实现路由跳转

    history      监听 popstate 事件 history.pushState 实现路由跳转
   ```

5. ##### 区别

   > hash

   ```js
   url参数 -> hash 只能添加字符串类型的数据
   历史记录 -> hash 后面的内容会显示, 只要不刷新浏览器,点击浏览器的前进后退按钮 可以看到历史记录
   部署    ->  兼容性好,无需后台配置

   ```

6. > history

   ```js
   url参数 -> history 添加多重类型的数据
   历史记录 -> history 的每条记录都会添加到历史记录里面,即使刷新浏览器, 历史记录也不会受到影响
   部署    ->  需要后台配合 ,当发出的请求匹配不到对应的资源时 需要返回index.html资源
   ```

7. ##### popState

   > 触发时机: 点击浏览器的前进后退按钮 或者调用 history.back() 或者 history.forward()

##### 4:router-link 和 router-view 的实现原理

> #### router-link:
>
> ##### 主要作用:
>
> ###### 路由导航,
>
> ##### 原理:
>
> ###### vue-router 会监听 `pop state` 事件,点击 router-link 后,页面不会刷新,会拿出当前 path 去 route 里面找出对应的组件, router-view 将该组件渲染出来 router-link 会默认生成 a 标签, 点击后取消默认跳转行为而是执行一个 `navigate` 方法,会监听 `pushstate`事件,匹配处一个路由 `injectedRoute` `router-view` 的渲染函数依赖这个路由,根据该路由获取要渲染的组件并重新渲染该组件.
>
> #### router-view
>
> #### 主要作用:
>
> ##### 组件内容渲染

#### 5: 简单的实现 vue-router

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

1. 为了高效的更新虚拟 DOM
2. 在 vue 的 diff 算法中,使用 key 和节点类型来比较两个节点是否相同,如果不设置 key,vue 使用的算法是 , 减少 DOM 的移动, 尽可能多的原地 patch 或者 reuse 相同 type 的 dom, 有 key 的话, 根据元素的 key 重新排序,移除那些之前有 key,更新后没有 key 的元素.
3. 在实际开发中应该避免使用数组索引作为 key,会导致一些渲染问题
4. 使用相同标签元素过渡切换时,也会使用 key,为了让 vue 可以区分他们,否则 vue 只会替换内部属性,不会触发过渡效果.
5. 触发组件的生命周期在恰当的时候

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

1. #### 原理

   1. nextTick 是等待下一次 DOM 更新刷新的工具方法
   2. 和 vue 的异步更新策略有关; 若数据发生变化,不会立即更新 DOM.开启一个队列,把组件更行函数缓存在队列中,在同一事件循环中发生的所有数据变更会异步的批量更新.我们传入的回调会被添加到队列刷新函数的后面,等队列内的更新函数全部执行完毕后,所有的 dom 操作也都结束了,自然能获取到最新的 dom 元素的相关属性.

2. #### 使用场景

   1. created 中想要获取 DOM 时
   2. 响应式数据变化后获取 DOM 更新后的状态，比如希望获取列表更新后的高度

## watch/computed

1. #### 使用场景

   1. #### watch

      1. 侦听某个响应式数据的变化,执行一些操作 包括异步的操作
      2. 原理
         > 是用户传入的 watcher, 基于 watcher 类, 当监听的数据发生变化时候,执行用户传入的回调.

   2. #### computed

      1. 简化行内模板中的复杂表达式
      2. 特点: 具有缓存性;懒执行;可以传递对象变为即可读,又可以写的属性
      3. 原理
         > computed 本质上是一个带有 dirty:true; lazy:true 属性的 watcher, 默认 computed 传入的回调函数不执行,只有当属性在模板中使用后,执行 callback, 会将 dirty 标记为 false,将 callback 的执行结果缓存起来 ,当 computed 的依赖项没发生变化时 ,直接返回缓存结果.依赖项变化, dirty 标记为 false,访问时会执行 callback.

2. #### 追问: watch 和 watchEffect 的区别??

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

## vue 性能优化的方法

#### 编码层面的优化

1. #### 最常见的路由懒加载：有效拆分 App 尺寸，访问时才异步加载
2. #### `keep-alive`缓存页面：避免重复创建组件实例，且能保留缓存组件状态
3. #### 使用 `v-show`复用 DOM：避免重复创建组件
4. #### `v-for` 遍历避免同时使用 `v-if`：实际上在 Vue3 中已经是个错误写法
5. #### v-once 和 v-memo：不再变化的数据使用 `v-once`按条件跳过更新时使用 `v-momo`
6. #### 长列表性能优化：如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容
7. #### 事件的销毁：Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。
8. #### 图片懒加载
9. #### 第三方插件按需引入
10. #### 子组件分割策略：较重的状态组件适合拆分,无状态的组件尽量不要拆分(组件实例消耗大)
11. #### 服务端渲染/静态网站生成：SSR/SSG
12. **减少响应式数据的生成,对于不需要展示在模板中的数据,可以使用 Objecet.freeze()**
13. **单页面应用首屏加载缓慢 可采用 loading 动画 或者骨架屏**

## vue 组件为啥是单根节点

1. #### 在 vue2 中

   1. `patch`方法在遍历的时候从根节点开始遍历，它要求只有一个根节点。组件会转换为一个 `vdom`，所以 `vdom`是一颗单根树形结构.

2. #### 在 vue3 中

   1. `vue3`中之所以可以写多个根节点，是因为引入了 `Fragment`的概念，这是一个抽象的节点，如果发现组件是多根的，就创建一个 Fragment 节点，把多个根节点作为它的 children。将来 patch 的时候，如果发现是一个 Fragment 节点，则直接遍历 children 创建或更新。

## vue-loader

1. #### 概念: 是处理.vue 为后缀的文件的 webpack loader
2. #### 作用: webpack 打包时,会以 loader 的方式调用 vue-loader,vue-loader 被执行时,会对 SFC 中的每个语言块采用单独的 loader 链处理,最后将这些单独的块装配为最终的组件模块.

## v-once

1. #### 特点: 仅渲染一次,并且会跳过未来更新
2. #### 使用场景: 元素或者组件在初始化后不再变化,这种情况适合该指令

## v-memo

1. #### 特点: 有条件的缓存部分模板并控制它们的更新.

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
> 当静态节点过多时,会将静态节点 转换为字符串,缓存起来
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

#### new Vue

> 初始化 事件 `$on` `$once`...
>
> 初始化 状态 `$set` `$delete`...
>
> 增加全局指令,过滤器,方法, mixin; 注册全局组件
>
> 建立更新机制 ; 执行 render 方法

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

#### v-if v-show 的实现原理

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

#### v-if

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

#### 使用 v-for 时 需要使用事件代理吗?

需要

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
