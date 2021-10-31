## commonJS

     加载机制： require 同步加载
     输出的    是当前模块的拷贝，会对加载结果进行缓存 一旦输出了某个值 模块内部的变化**不会影响**这个值
        ```
         var count = 0;
         function add(a,b){
             console.log( a + b)
             count++;
         }
         module.exports= {add, count}

         let utils = require('./utils);
         utils.add(1,2);
         console.log(count) 0
        ```
     加载的文件类型： 运行时加载
                   加载的是一个对象 该对象只有在脚本运行完才会生成
     this指向    this指向模块本身
     导出 module.exports

## esModule

    加载机制：  import 动态加载  浏览器原生支持
    输出的是    当前模块的一个引用 即使输出了某个值 模块内部的变化**也会影响** 这个值
           ```
         var count = 0;
         function add(a,b){
             console.log( a + b)
             count++;
         }
         module.exports= {add, count}

         let utils = require('./utils);
         utils.add(1,2);
         console.log(count) 1
        ```
    加载的文件类型： 编译时输出模块之间的依赖关系
                  对外接口是一种模块依赖关系 在代码静态解析阶段就会生产
    this指向    this指向undefined
    导出 ：默认导出和按需导出

## commonjs ESmodule 中 不同的导出 导出的都是啥？？？

- ESmodule 中

```js
 export const name = 'bob'
 导出的是module对象
    module: {
        _esModule:true,
        name: bob
        symbol(symbol.toStringTag): Module
    }


 const name = 'bob'
 export default name = bob
 导出的是module对象
    module: {
        _esModule:true,
        default: 'bob',
        name: bob
        symbol(symbol.toStringTag): Module
    }

```

- commonjs 中

```js
module.exports = obj;
导出的是一个对象;
{
    children: [],
    exports: {},
    load:true,
    parents:[]
}
```

## 使用 es module 导出语法 使用 commonjs require 语法 ???

- 使用 export 导出的变量 require 后，可以正常使用；
- 使用 export default 导出变量 require 后 需要使用 default 属性 来获取 使用 export default 导出的变量

## 使用 module.exports 导出 使用 import 引入 可以正常使用

## ESmodule 两种不同的导出方式的注意点

```js
  在esmodule 中 一个js文件 可以采用两种不同的导出方式
  1：  export
  2 ： export default
  不同的导出方式 导出的变量互不影响

  在引入js文件时， 不同的导出 需要采用不同的引入方式,才能正确获得这种方式下面导出的变量

```

## CommonJS module 是啥？？

```js
 commonjs 中；
 module是啥
    module是一个对象 里面包含了{id, exports,parents}等属性
    require（）一个文件，既引入这个文件module对象的exports属性
    exports 中有哪些属性 在require进来的模块中，可以使用exports中的属性
    因为 module.exports 是一个对象 ；
    所以 导出模块的过程 就是给这个exports 赋值的过程

  module.exports对象赋值原则：
  若给exports对象赋值一个对象，如module.exports = obj  则obj这个变量对外暴露
     module.exports.age = 12 这个写法等同于 module.exports.obj.age = 12
  因为给exports赋值的是一个引用值，所以当obj的属性发生变化，exports的属性也会发生变化
```
