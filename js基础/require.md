## 优先从缓存中加载

```
a.js

require('./b.js')
var fn = require('./c.js')
console.log（fn）



b.js
var fn = require('./c.js')
console.log（fn）



c.js
console.log(我只被加载执行一次)
module.exports = function(){

}


```

- 按照文件的加载顺序，执行脚本，先加载的脚本，先执行，执行完了之后，再去执行下一个脚本；
- 如果先加载的模块里面，加载了 A 一模块，然后在主模块加载这个 A 模块的时候，不会去执行这个 A 模块里面的代码，只是拿到这个 A 模块的导出的对象。提高模块加载效率

## 判断模块标识：

- require('模块标识符')
  - './' 路径形式的模块标识符
  - 核心模块 的本质是文件，被编译到了二进制文件里面了
  - require（）第三方包
    - 1 : 没有一个第三方包名和 node 的核心模块的名称相同
    - 2： 先找到当前 require 文件所在的目录中的 node——module 目录
    - 3 在 node——module 里面找第三方包名
    - node——module/pakeage.json
    - node——module/pakeage.json 文件里面的 main 属性
    - 通过 main ： index.js 属性，找到第三方包的入口文件 index.js
    - 然后加载使用这个入口文件 index.js，使用的也是这个 index.js 文件
    - 默认每个包里面都有 package。json 文件，里面的 main：entry.js
    - 如果包里面的 package.json 不存在，或者 main： ‘’ 不存在 默认加载包文件里面的 index.js
    - 如果 index.js 不存在，不会在同级目录查找，只会一级一级往上级目录查找，即项目的根目录里面找
    - 这一级没有找到，就直接往上面一级查找 node_modules，如果磁盘的根目录也找不到 node_modules,就会报错
- node_module 在项目的根目录中，有且只有一个
