## 模块化
- 1： 文件作用域
- 2：通信规则
    - 加载
    - 导出
##  node 中 模块系统
- 1： export()
- 2: require()
## module.exports && exports
```
 var module = {
     exports: {
         
     }
 }
 
```
- module 是node中，每个模块默认导出的对象 相当于 return module.exports
- module对象中有一个exports对象；
- 我们可以把需要导出的接口都挂载到module.exports 接口对象中
-  module.exports.xx = xxx 太麻烦了
-  node 为了让我们方便写，在每个模块中提供了一个成员 角 ‘exports’
- exports.xx = module.exports.xx
   - 在没有给 exports = xxx 赋值的时候，可以使用 export.xx = xx来导出
   - 当 exports 重新赋值之后，引用类型的命名空间被改变，所以 exports.xx = xx 定义的值访问不到，但是之前的属性是可以访问到的。
   - exports 是 module.exports的一个引用；
   - 重新赋值之后，exports.xx ！== module.exports.xx， 但是 node 模块默认导出module.exports,两者之间没有联系了，所以再去访问的时候，访问不到重新赋值之后的值，是空对象。
- module.exports && export 无论哪个重新赋值，引用空间会发生改变，两者之间再无联系
- module.export = xxxx,只能导出一个对象
- 当exports = module.exports 时候，引用关系重新被建立
## 
```
exports 正确性有待考证

exports 是 module 的属性，默认情况是空对象
require 一个模块实际得到的是该模块的 exports 属性
exports.xxx 导出具有多个属性的对象
module.exports = xxx 导出一个对象
```