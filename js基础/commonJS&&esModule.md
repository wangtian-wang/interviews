## commonJS

**_require_**

1. 运行时加载,同步加载,阻塞当前文件的 js 代码执行
2. 会在模块被第一次引入时,执行模块中的代码,并将结果缓存起来,实现多次加载,运行一次

**_exports_**

- 是一个对象,我们可以向这个对象里面添加很多属性
- 导出的是一个对象(原模块的拷贝(浅拷贝)), 若对象的属性被属性,则所有地方都会被修改

**_module.exports 和 exports 的关系_**

1. node 中使用 module 类 ,来实现模块的导出,每一个导出的模块都是 module 的实例
2. 在 node 中真正用于导出的是 module.exports
3. module.exports = exports module.exports 对象 持有对 exports 对象的引用

## esModule

**_import_**

1. 是 编译时加载 JS 文件(静态解析),动态引用被加载的 js 的文件中的变量 ,并且是异步的
2. 当 script 标签上面设置了 type=module 相当于在 script 标签上加了 async 属性

**_export_**

- export 在导出一个变量时，js 引擎会解析这个语法，并且创建 **模块环境记录** （module environment record）；
- **模块环境记录**会和变量进行 `绑定`（binding），并且这个绑定是实时的；
- export 导出的是变量本身的**引用**,可以获取到绑定变量的最新值

使用 esmodule 将自动将采用严格模式

```javascript
1.js
 var name = "xiaoming";
setTimeout(() => {
  name = "000000";
  console.log(obj); // xia~~~~~~ obj的name属性被 2.js里面语句修改了
}, 1000);
const obj = { name: "hong" };
export { name, obj };

2.js
   import {name, obj} from './1.js'
    obj.name = 'xia~~~~~~'
    setTimeout(() => {
        console.log(name, '2.js')  // 报错 name已经被声明为常量 不能被修改
    }, 1500);

```

## es module 与 commonjs 交互

- 通常情况下, commonjs 不能加载 esmodule esmodule 必须经过静态分析,无法在加载的时候执行 js 代码 但是可以人为修改；
- 通常情况下,esmodule 导出的 commonjs 可以正常使用,但还是要看具体的运行环境是否支持

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
