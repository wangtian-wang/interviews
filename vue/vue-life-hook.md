##### 1: 路由 A 中的flag 为 true 的状态，在 destroy 中的状态为flag当前的状态， 当切换了组件之后，再次进入 A 组件，flag 的状态为 data 中定义的初始状态。

##### 2：在组件 A 里面，更改了某个组件的状态，刷新页面之后， 之前改变的组件的状态将会失效

##### 3 ： 在当前路由A切换到另外的路由，使用 replace 的方式，将会在 historystack 中失去当前的路由记录， 不能回退到路由 A



