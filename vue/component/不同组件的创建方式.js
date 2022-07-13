/**
 普通的组件和createApp()组件区别
 1: 使用:
     普通组件: 引入,注册,使用
     createApp(): 引入, 使用(函数式调用)
2:  是否脱离DOM层级限制
     const vm = createApp(App).amount(container) 需要挂载,可以指定挂载的DOM(container)元素, 手动将这个元素document.body.appendChild(vm)
     一般这种元素的特点是 需要定位 fixed,可能需要跨越DOM层级 ,不在当前组件的布局中
 */
