## 模块化面试答题思路

1. 为啥会出现模块化
2. 早期的模块化
3. 主流的模块化

## commonJS

**_require_**

1. 运行时加载,同步加载,阻塞当前文件的 js 代码执行
2. 会在模块被第一次引入时,先将模块加入缓存,再执行模块中的代码,并将结果缓存起来,实现多次加载,执行一次

**_exports_**

- 是一个对象,我们可以向这个对象里面添加很多属性
- 导出的是一份值的拷贝,放在新的内存中,每次直接在新内存中取值,所以对变量修改没法同步

**_module.exports 和 exports 的关系_**

1. node 中使用 module 类 ,来实现模块的导出,每一个导出的模块都是 module 的实例
2. 在 node 中真正用于导出的是 ` module.exports` 是当前模块的 `值` 的拷贝
3. module.exports = exports module.exports 对象 持有对 exports 对象的引用,但是不能直接赋值给 exports, 如 export= {}

   ```js
   exports.name = 'steven'
   module.exports = { name: 'lucy'}
   最终导出的是{ name: 'lucy'} 因为 exports对象的引用被重新赋值

   module.exports = exports 或者 module.exports.name = 'steven'
   最终导出的是{ name: 'steven'}
   ```

## module exports 的关系

1: exports 记录了当前模块导出的变量

2: module 记录了当前模块的详细信息

## commonjs 模块查找规则

1. 内置核心模块 node 内部将其编译为二进制代码,直接书写标识符 fs, http 即可
2. 自己写的文件模块 需要使用相对路径引入 require 会将相对路径转化为真实路径, 找到模块
3. 第三方模块, 会使用到 path 变量, 一次查找当前目录下的 node_modules 文件夹,假设没找到,会在父级目录查找,一直找到根目录,找到目录后,会以 package,json 中的 main 字段为准,找到包的入口文件,假设没有 main 字段,则查找 index.js/index.json/index.node

## Commonjs 如何处理模块循环引用

采取了模块缓存技术,每一个模块都先加入缓存再执行，每次遇到 require 都先检查缓存，这样就不会出现死循环；借助缓存，输出的值也很简单就能找到了。

# esModule

**_import_**

1. 是 编译时加载 JS 文件(静态解析),动态引用被加载的 js 的文件中的变量 ,并且是异步的
2. 当 script 标签上面设置了 type=module 相当于在 script 标签上加了 async 属性
3. ES module 会根据 import 关系构建一棵 `依赖树`，遍历到树的叶子模块后，`然后根据依赖关系，反向找到父模块`，将 export/import 指向同一地址。

**_export_**

- export 导出的是变量本身的**引用**,可以获取到绑定变量的最新值
- esmodule 规定必须导出一个接口,只有导出一个接口,才能被其他模块引用; 每当使用时,根据地址找到对应的内存空间,实现了 所谓的动态绑定

```js
- export 在导出一个变量时，js 引擎会解析这个语法，并且创建 `模块环境记录` （module environment record）；
- **模块环境记录**会和变量进行 `绑定`（binding），并且这个绑定是实时的；
```

**使用 esmodule 将自动将采用严格模式**

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

## esmodule 如何实现动态绑定

依赖模块地图和模块记录

1. 模块地图模块间依赖关系的地图, 标记进入过的模块为获取中,所以循环引用时,不会再次进入,来解决循环引用问题
2. 模块记录
   模块身份证,记录者模块的详细信息,像内存地址,加载状态等,等到其他模块导入时,会做一个'连接'-根据模块记录,把导入的变量指向同一块内存,实现了 `动态绑定`

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

## 浏览器是怎样实现 esmodule 的

- 浏览器实现 esmodule 的过程是一个异步加载的过程,实现 es6 模块的浏览器可以从顶级模块加载整个依赖图
- 缺点:

  虽然这种方式加载效率高,但是对于大型应用来说, 深度依赖加载的时间比较长

- 加载过程举例:

  ```js
  mo// index.js

  import A from './a.js';
  import B from './b.js';
  console.log(A)

  // a.js
   import C from './c.js'
   import D from './d.js'

  // 模块的加载过程

  从index.js 入手, 先去加载A模块; 然后去加载B模块; A,B 模块的加载是先后执行的,是同步加载的
  发现A模块依赖C,D,分别去加载C, D模块, 等C,D模块加载完成后才会执行被加载的模块中的代码.
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
