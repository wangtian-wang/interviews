### 1: vue实例挂载过程中发生了什么?

1. 初始化 mountComponent
   1. 创建组件实例
   2. 初始化组件实例
   3. 创建响应式数据
2. 建立更新机制
   1. 首次渲染执行patch函数,将vnode转换为真实DOM;
   2. 执行渲染函数,会创建组件的响应式数据与组件更新函数之间的关系

可能的追问

1: 响应式数据怎样建立

2: 依赖关系如何建立

### 2:vue-loader的作用.

​	1: 处理单文件组件(SFC)的webpack loader,将我们写的template,script,style使用不同的loader进行链处理.最后将这些单独的块装配成最终组件模块.

### 3: 异步组件

1.    何为异步组件
   1. 在vue3中 使用defineAsyncComponent()函数,传入配置项(delay, timeout, loadingComponent,...),执行该函数就会得到一个异步组件
2.    异步组件的使用场景
   1. 异步组件可以进行代码风格,减少当前文件的打包体积,假设当前的文件,是个重要的页面,内容多,代码分包会提交该页面的加载速度,提升页面性能;
3.    异步组件和懒加载的区别
   1. import() 加载的组件,返回的是一个promise,父文件中的子组件可以使用import加载, 但是import没有提供额外的配置项,比如对于delay,timeout,自定义错误组件的支持,这些都需要用户自定义配置
   2. defineAsyncComponent()是vue框架层面做了封装,提供了开发者一个快捷的API去完成上述功能

### 

#### 如何监听插槽的变化

```js
export default {
  mounted() {
    // 当有变化时调用`update`
    const observer = new MutationObserver(this.update);

    // 监听此组件的变化
    observer.observe(this.$el, {
      childList: true,
      subtree: true
    });
  }
};
```

####   vue提供的选择器 (>>>)

> 覆盖子组件的样式,跳出这个作用域

#### v-for

> 当我们使用带范围的 `v-for`时，它将从 `1`开始，

#### 递归的使用插槽

```
<!-- VFor.vue -->
<template>
    <div>
        <!--  渲染第一项 -->
    {{ list[0] }}
        <!-- 如果我们有更多的项目，继续!但是不要使用我们刚刚渲染的项 -->
    <v-for
      v-if="list.length > 1"
            :list="list.slice(1)"
        />
    </div>
</template>

<template>
  <div>
    <!-- Pass the item into the slot to be rendered -->
    <slot v-bind:item="list[0]">
      <!-- Default -->
      {{ list[0] }}
    </slot>

    <v-for
      v-if="list.length > 1"
      :list="list.slice(1)"
    >
      <!-- Recursively pass down scoped slot -->
      <template v-slot="{ item }">
        <slot v-bind:item="item" />
      </template>
    </v-for>
  </div>
</template>
<template>
  <div>
    <!-- 常规列表 -->
    <v-for :list="list" />

    <!-- 加粗的项目列表 -->
    <v-for :list="list">
      <template v-slot="{ item }">
        <strong>{{ item }}</strong>
      </template>
    </v-for>
  </div>
</template>

```

#### 组件元数据

给当前组件的export default {}对象里面添加一个属性,可以在引入这个组件的时候,从该组件解构出该属性

#### 多文件单文件组件

```js
<template src="./template.html"></template>
<script src="./script.js"></script>
<style scoped src="./styles.css"></style>
```

### 	