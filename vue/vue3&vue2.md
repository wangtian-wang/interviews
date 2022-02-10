## 自己定义的元素 在模板编译的时候 不需要使用 vue 内部的处理，应该这样设置

- 在 vue2.x 版本中
  ```js
  define-component 是不需要vue compiler 处理的自定义元素
   rule: [
       {
           test: /\.vue$/,
           use: 'vue-loader',
           options: {
               compilerOptions: {
                   isCustomElement: tag =>tag === 'define-component'
               }
           }
       }
   ]
  ```
- 在 vue3.x 版本中

```js
vite.config.js;

module.export = {
  vueCompilerOptions: {
    isCustomElement: (tag) => tag === "custom-component",
  },
};
```

## is

```js

 <component is="currentComponent"/>
 currentcomponent 决定当前到底渲染那个组件
 在Vue3中的写法有严格的要求
```

- vue2x
- vue3.x

  - 只能用在 component 标签上面
  - 在.vue 文件中

  ```js
  .vue
      在原生的HTML的规范里面 有的标签内部只能出现某些特定的标签，否则就会发生错误 但在vue中可以采取一些hack的方式欺骗HTML，将最终渲染的表格的元素换掉 下面就是例子
      <div>
          <table>
                  v-is=‘组件名称’ 必须是字符串
              <tr v-is="'row'"></tr>
          </table>
      </div>

      component: {
          row:{
              props: {

              },
              render:()=> {

              },
              methods: {

              }
          }
      }

  ```

  - 在 in-dom 模板中

  ```js
   <div>
          <table>
              <tr v-is=" 'row'"></tr>
          </table>
  </div>
  <script src="https://cdn.bootcdn"></script>
  <script>
  Vue.createApp({
      data(){
          return {
              items: ['aaaa','sssss']
          }
      }
  }).component('row',{
      props: ['data'],
      template:`
      <tr><td>{{this.data}}</td></tr>
      `
  }).mount('#app')

  </script>
  ```

# Router

- 在组件内部调用 route.push 方法

```js
addRoute()
import { useRouter, onBeforeRouteLeave,onBeforeRouteAfter} from 'vue-route'
setup(){
    const route = useRouter();
    route是响应式对象，可以监控变化
    watch(()=>route.query,(newVal,oldVal) => {

    })
}
```

- 创建 router 实例

```js
            import {createApp} from 'vue';
            import {createRouter,createWebHistory,createWebHashHistory} from 'vue-router';
            const router = createRouter({
                history:createWebHistory({
                    base: '/baseapi'
                }),
                route: [
                    {
                        path: '/:pathMatch(.*)*',
                        name: '404',
                        component: NotFound
                    }
                ],
                strict: boolean,
                sensitive: boolean
            })
使用命名导航跳至404
        router.resolve({
            name:'not-found',
            params: {
                pathMatch:['not','found']
            }
        })

isReady();
            router.isReady().then((success,error) => {

            }).catch()
滚动行为
        scrollBehavior(to, from ,savedPosition){
            return {
                left:number,
                top: number
            }
        }

keep-alive transition 必须在router-view内部
        <router-view>
            <keep-alive>
            <keep-alive/>
        <router-view/>

        <router-view v-slot='{component}'>
            <transition>
                <keep-alive>
                    <component is="component"/>
                <keep-alive/>
            <transition/>
        <router-view/>

        createApp(App).router(router).$mount('#app')

router-link 移除了一些属性
            append
                app.config.globalProperties.append = function(){

                }
            tag/event
                <router-link to="path" custom v-slot='{navigate}'>
                <span click='gotopage'></span>
                </router-link>

            exact 完全匹配逻辑简化  完全相等才是匹配

match 被移除 使用resolve代替

包括首屏在内的所有导航均为异步

            app.use(router)
            router.isReady().then(() => app.mount('#app'))
            如果首屏存在路由，可以不等待就绪直接挂载，产生结果和vue2相同

router的parent被移除了。
            const parent = this.$route.matched[this.$route.matched.length - 2]
history.state
            history.pushstate(mystate,'',url)
            现在
            history.replaceState({...history.state},'',url)


            history.replaceState(mystate,'',url)
            现在
            history.replaceState(history.state,'',url)
routes:
            1 变为必填项

跳转不存在的命名路由报错

缺少必填参数抛出异常

命名子路由的path为空的时候不在追/

            before:
                {
                    path: '/goods',
                    children: [
                        {
                            path: '',
                            name:'food',
                            conponent:() => import()
                        }
                    ]
                }

                子路由的url = /goods/
            now:
                    子路由的url = /goods 匹配不到
                    影响： 给设置了redirect的选项的子路由带来影响
                          举例：
                                {
                                    path: '/goods',
                                    children: [
                                        {
                                            path: '',
                                            name:'food',
                                            redirect： 'fruit', 非完整路径 失败
                                            redirect： '/goods/fruit', 完整路径 成功
                                            conponent:() => import()
                                        }，
                                        {
                                            path: 'fruit',
                                            name: 'fruit',
                                            component:()=> import()
                                        }
                                    ]
                                }
                            当food组件 使用的是非完整路径作为redirect的url ，此时redirect的URL是/fruit  这个路径不存在 redirect失败
属性 path/fullpath 不再解码
    hash解码
方法 push resolve replace 字符串参数，或者对象参数 path必须编码
```

## vue2 的缺点

- 1 定义在 data 里面的数据会做响应式处理，如果没有定义在 data 中的 prop，就没有响应式的能力
- 2 在做响应式处理的时候，初始化需要递归，速度比较慢
- 3 不支持 map set 等
- 4 动态增加，删除属性需要额外的 API 支持
- 5 数组支持需要特殊实现

## vue3 在编译方面做得优化；

> slot 编译优化，在 vue3 中 在父组件中使用的子组件的 slot 使用 v-if 来动态判断，那么，只有在动态插槽情况下，当父组件更新时候，子组件才会被更新

## Vue3 在 diff 方面做得优化

> 源码体积更小：

- 1： 移除一些冷门的 feature
- 2： 引入 tree shaking （import export） 通过编译阶段的静态分析，找到没有引入的模块 打上标记

> 数据响应式变化

- 1： object.definedPeoperty

  缺点： 1：只能对已经存在的属性 进行劫持 对于新添加的属性 需要用到$set()强制变为响应式
  2： 嵌套层级较深的对象，会递归遍历这个对象，影响性能

- 2： proxy：
  劫持的是整个对象，所以对于对象新增加的属性也能劫持
  proxy 对象不能监听到内部深层次的对象变化 在 vue3.0 中的处理方式为 在 getter 中去递归响应式 优点是 只有真的访问这个内部对象才会变为响应式，提升性能

> 编译优化

- 1：
  编译阶段 对静态模板分析，标记 block tree，渲染效率变成与模板中的动态节点的数量成正相关
  借助 block tree vue3 将 vnode 的更新性能变为与动态内容的数量相关

  block tree：
  将模板基于动态节点指令切割的嵌套区域，每个区域内部的节点结构是固定的，每个区块需要以一个 array 来追踪自身包含的动态节点。

- 2： 重写了 diff 算法
- 3： slot 的编译优化
  父组件更新时，只更新子组件 带有 v-if/ v-show 指令的动态 slot
- 4： cache handler 事件侦听缓存

> composition api

- 1： 优化逻辑复用，更好的类型支持
- 2： 对 tree shaking 友好，代码易于压缩

#### 作用域插槽 是虚拟节点树的插槽位置替换

#### 为啥不要用 index 作为可以：

- 因为 vue 内部对于 dom 的 diff 有优化算法 但是对于数组来说 无论数组元素的顺序怎样颠倒 ，index 都是 0 1 2 这样的排列顺序 这会使 vue 复用错误的子节点 导致优化策略失效，产生额外的开销

#### 为啥 data 要是一个数组

- 因为组件会被用到多次 如果 data 是对象的话 假若在某个组件中修改了 data，那其他组件的 data 也会被修改 而使用函数的话 每个组件的 data 都会有单独的引用 不会有这样的问题存在

#### computed 和 watch 的区别

- computed 会有自己的 watcher， 内部有 dirty 属性来决定是复用之前的值还是重新计算 dirty= true 的时候 需要重新求值

#### watch 中的 deep： true 是如何实现的？？

- 当 deep：true 被开启时，VUE 内部会对被监听的对象的属性进行 递归依赖收集
