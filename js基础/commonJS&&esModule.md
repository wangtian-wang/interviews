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
    加载的文件类型： 编译时输出接口
                  对外接口是一种静态定义 在代码静态解析阶段就会生产
    this指向    this指向undefined
    导出 ：默认导出和按需导出
