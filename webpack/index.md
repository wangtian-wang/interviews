## webpack

webpack 是一个前端模块打包器, 提供了一整套的前端项目模块化方案,轻松实现对前端项目开发过程中涉及到的资源进行模块化

## 构建流程

## webpack4 webpack5 的区别

## what webpack can do

```javascript

 1: 对于有环境兼容问题的代码,通过loader机制,对代码实现编译转换,然后再进行打包
 2：将零散的js代码 打包到一个js文件中
 3：在js中以模块化的方式加载任何类型的资源文件
 4：代码分包


```

## 零配置的原因

```
npx webpack index.js  -o dist.js   -o 输出的目录
npx 是 node 提供的 API，会自动去找 node_modules 里面的webpack 相关的包， 假如 webpack的包 安装在全局，就可以使用 webpack 命令

```

## 面试题

**_webpack 是怎样打包文件的_**

```js

1 ： 立即执行函数；
2： 参数通过对象的形式传递
 key： 文件的路径 value：函数（执行当前文件里面的代码）
3：eval（‘字符串代码’） 执行整个字符串代码
4：如果文件有多个依赖，通过——webpack_require__的方法，递归的加载依赖的文件最终打包形成一个文件
```

**webpack 的构建流程**

**_webpack 的打包优化_**

```
打包目的： 体积小， 速度快；
优化： 自带的优化：
            tree-shakeing
                依赖关系的解析 —— 不用的代码不打包
                生产环境里面会执行这个功能
            scope-hoisting
                作用域提升
                定义了一个变量，这个变量运算之后，直接有结果的话，就不会将这些变量打包
       自己实现的优化
            速度
                 happypack： 多线程打包：
                            注意 ： 体积小，打包慢


            体积
            1   moment： 时间插件， 会引入许多语言包
                ignorePlugin :会将不用的包删掉
            2  externals: {    不打包
                ‘jquery’ ： ‘s’
            }，
            3： modules: {      不解析
                noParse: '/node_module'
            }
            4： 大的包使用cdn的方式引入
            5： 只安装有需要的插件
            6： 按需加载，引入
            7： 懒加载，热更新
            8： 动态链接库： 一些需要公用的包，可以提取出来，单独放到一个文件打包（可以将这些包放到 CDN 上面），提高加载速度

            webpack.react.js


             let path = require('path');
             let webpack = require('webpack');
             module.exports = {
                 mode: 'development',
                 entry: {
                     react: ['react', 'react-dom']
                 },
                 output: {
                     filename: '_dll_[name].js',
                     path: path.resolve(__dirname, 'dist'),
                     library: '_dll_[name]' -> 打包之后的返回结果
                 }，
                 plugins: [
                  new webpack.DllPlugin([ 生成动态链接库
                    name: '_dll_[name]',
                    path: path.resolve(__dirname, 'dist', 'manifest.json' -> 这个依赖关系的配置文件)
                  ])
                 ]
             }


            webpack.config.js

            引用动态链接库, 通过 manifest.json找到动态链接库的文件，优先引入这个文件

            let webpack = require('webpack');
            plugins: [
             new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, 'dist', 'manifest.json')
             })

            ]
            9：抽离公共代码



```

# 配置让打包过后的不同类型的资源打包到对应的文件夹下面

```
举例子：
module.exports = {
    output: {
        filename: 'js/build.js'  -> 在文件名前面加上目录
    }，
    module: {
        rules: {
            test: /\.(png | jpg | gif)$/,
            loader: 'url-loader',
            options: {
                outputPath: 'imgs'
                imgs 对应的是imgs文件夹 options里面配置
            }
        }
    }
}
```

## webpack

: 定义: 文件打包利器
如何使打包速度变快
: 使用最新版本的 webpack
: 使用最新版本的 node.JS
npx webpack index.js 可以打包这个文件
npm info webpack 查看 webpack 的版本号
npx webpack --config webpackconfig.js 让 webpack 以 webpackconfig.JS 为配置文件
webpack index.js 当 webpack 安装在全局的时候,运行这个命令可以使 webpack 打包
webpack-cli 的作用是:使 webpack 能够在命令行里面运行打包命令
各种 loader
loader 之间的执行顺序

## loader 的执行顺序

: 当 loader 在一行写的时候,匹配执行的顺序是从右到左,
: 当 loader 分开写的时候,匹配执行的顺序为从下到上,上面的 loader 最后去发挥作用
: 1: file-loader 将图片类型的文件移动到 dist 目录下面,将文件的路径做了变更,放入到了 index.JS 中
: 2: url-loader 将图片转为 base64 编码,直接放在打包好的 boundle.JS 中,省去了 HTTP 请求,但不适合图片的 KB 太大,会影响 boundless.JS 的打包速度
: url-loader 有 limit 选项,当文件超过了这个限制的时候,会自动打包到 dist 文件下的 image 文件夹中
: css-loader 找出以.css 结尾的文件,并且理出这几个文件的关系,将这些文件打包为一个 css 文件
: style-loader 将打包好的 css 文件,放入到 html 的 header 部分
: postcss-loader 给 css3 的新特性加上不同浏览器的兼容处理,但是需要单独配置文件 postcss.config.js;需要放在文件所依赖的 loader 的最下面或者最右面,得先加前缀,再转 less 等为 css,再将转译好的 css 打包为一个文件,最后引入资源到 body 中
需要下载 autoprefixer 插件并且在 postcss.config.js 中配置
module.exports = {
plugins: [
'autoprefixer'
]
}
:静态资源打包的配置文件
如果一个 sass 文件中引入了另外一个 sass 文件,这样的写法能保证每个 sass 文件都能添加浏览器兼容性前缀
webpack.config.JS
{
test: /\.(sass|less|stylus)$/,
    use: {
        "style-loader",
        {
            loader: "css-loader",
            options: {
                importLoaders : 2,
                module:true
                开启模块化的 css,将 css 当做一个对象,使用的时候,使用的是 style.class,避免每个模块之间的样式冲突
            }
        },
        "sass-loader",
        'postcss-loader'
    }
},
    处理字体文件的loader
 {
    test: /\.(eot|ttf|svg)$/,
use: {
"file-loader"
}
}

在 index.JS 页面中引入
import style from './index.css';
div.addClass(style.class)

插件 : 在 webpack 运行到某个时刻的时候,可以帮你做一些事情
new CleanWebpackPlugin(['dist']) 每次自定清除 dist 文件夹
将 将入口文件,打包成为 main sub 文件,放在 dist 目录下面
entry : {
main: '/src/index.js',
sub: '/src/index1.js'
}
output : {
publicPath: http://www.cdn.com 加外网路径 或者公共资源加载路径 打包好的 JS 文件会自动加上这些路径
filename: '[name].js',
chunkFilename: '[name].chunk.js',
在入口文件中引入的其他的 JS 文件的打包分割之后的名字
filepath: path.resolve(\_\_dirname, 'dist')
}
devServer: {
contentBase: '/dist' devserver 模拟服务器的根路径是'/dist
open : true,
proxy: {
'/api' : 'http://www.baidu.com' 访问这个/api 就会自动转到代理服务器
}
}

## sourcemap 的隐射原理

```
mode: 'production',
devtool: "cheap-inline-source-map" 隐射关系,精确到行和列提示错误 可以知道在开发的过程中哪里的源代码出了问题,不包含第三方库的代码错误, cheap-module-inline-source-map --> 检查错误包含第三方库
eval-cheap-module-source-map --> 效率高,开发常用

```

一些 json 文件 scripts 命令
webpack-dev-server 开启一个本地网络环境,因为只有在有网络的情况下,才能发送 ajax 请求,
proxy : 支持跨域代理
scripts : {
watch : "webpack --watch" 当源代码发生改变的时候,webpack 自动 打包文件
dev: 'webpack-dev-server'
}
webpack hot-module-replace,可以让模块自动更新只改变的内容,其余的原有的样式不变
在 plugin 里面要 new 一下
new webpack.HotModuleReplacementPlugin(),
在 webpack 的 devServer : {
hot : true,
hotOnly: true 不管能不能成功更新,都是保留当前的页面上的内容
}
手动配置在一个文件内引入多个模块,当一个模块发生变化之后,不影响其他模块的变化,这个时候,就需要对这个变化的模块做一个监听,

|                               : 因为类似于 vue 之类的框架已经将这个方法封装了起来,所以我们不需要去写下面这些代码                                |
| :---------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                             实现 hot replace 的方法                                                             |
|                                                                if (module.hot) {                                                                |
|                                                      module.hot.accept('./change', () => {                                                      |
|                                                                1 remove old file                                                                |
|                                                           2 and then execute new file                                                           |
|                                                                   2 number( )                                                                   |
|                                                                        }                                                                        |
|                                                                        }                                                                        |
| babel-loader @babel/core@7.0.2 是 Bebel 和 webpack 通信的桥梁,并不会将文件中的 es6 语法转换成为 es5 @babel/preset-env 里面有 es6 --> es5 的规则 |
|                      @ babel/polyfill 使用需要引入 将变量和函数翻译,能在低版本浏览器中使用,实现低版本浏览器不能实现的内容                       |
|                                                   只将 当前 JS 文件中使用到的新语法,变量翻译                                                    |
|                                                                   module : {                                                                    |
|                                                                     rules:[                                                                     |
|                                                                        {                                                                        |
|                                                                 test : /\.js$/,                                                                 |
|                                                            execlude: /node_modules/,                                                            |
|                                                             loader: 'babel-loader',                                                             |
|                                                                   options: {                                                                    |
|                                                                   presets: [                                                                    |
|                                                                        [                                                                        |
|                                                              '@babel/preset-env',                                                               |
|                                                                        {                                                                        |
|                                                              useBuiltIns: 'usage',                                                              |
|              usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加。弥补这个浏览器所不能兼容的内容               |
|                                                                    target: {                                                                    |
|                                                                  chorme" '67',                                                                  |
|                                                 如果当前的 target 浏览器支持这个语法,就不用转译                                                 |
|                                                                        }                                                                        |
|                                                                        }                                                                        |
|                                                                        ]                                                                        |
|                                                                        ]                                                                        |
|                                                                        }                                                                        |
|                                                                       },{                                                                       |

    other rules ....

    },

    ]
    在对一些 ui 库打包的时候,为俩防止变量污染,采取另外一种配置方式

    npm i --save-dev @babel/plugin-transform-runtime @babel/runtime
    @babel/runtime-corejs2

    .babelrc  = options 对象对应的配置参数
    {
        plugins: [
            [
             @babel/plugin-transform-runtime,
             {
                corejs: 2,
                "helpers" : true,
                "regenerator": true.
                "useESModules" : false
             }

    ]

    ]
    }

tree shaking 将一个模块里面[可能有很多的方法]不用的子模块[某些没有用到的方法]去除掉
: 只支持 ES module 的引入方式 静态引入
在 development 开发环境下的配置,不会将多余的树叶抖落掉,但是知道使用了哪些子模块, 方便代码调试
与 entry 同级的配置
optimization: {
usedExports: true 使用暴露出来的模块
}
在 package.json 里面配置
'sideEffects': ['@babel/polyfill','*.css'] false 就是对所有文件都进行 treeShakeing 处理
这个数组里面的内容,都不能被自动抖落
可以将 webpack.config.JS 分成三个文件
: webpack.dev.js
: webpack.production.js
:webpack.commom.js
: 安装插件 webpack-merge -D
: 在 dev.js production.js 中引入 common.js
: 在 dev.js import webpack form 'webpack',因为要用到热重载
: 引入 merge 模块 ,合并文件 导出的是
module.exports = merge(commom.js,dev.js)
在 package.json 中配置 scripts
当配置文件和 package.json 在同级目录的时候
scripts: {
dev: 'webpack-dev-server' --congig.webpack.dev.js,
build: 'webpack --config webpack.production.js'
}

当配置文件被放在了项目的 build 文件夹下面,配置文件的路径需要修改;
在 package.json 里面 scripts 的修改
scripts: {
dev: 'webpack-dev-server' --congig ./build/webpack.dev.js,
build: 'webpack --config ./build/webpack.production.js'
}

在 commom.JS 里面打包输出的文件的路劲需要修改

output : {
filename: '[name].js',
filepath: path.resolve(**dirname, '../dist')
}
new CleanwebpackPlugin(['dist'],{
root: path.resolve(**dirname, '../')
})
CODE SPLITING
: 思想: 将不同类型的文件打包到不同的 JS 文件中,
: 不仅可以打包同步代码,还能自动打包异步代码
优点 :
旦某个某件发生改动,用户只需要加载这个被改动的文件即可,
减少文件的加载速度,提高页面的相应速度
在 webpack 4 以上的版本自动携带该插件
: 用法:
optimization: {
splitChunks: {
chunks: 'all'
}
}
mogic comment 只有官方的插件支持这种写法
: import lodash (/webpackChunkName:lodash/ lodash) 给异步引入的 lodash 重新取名字 [在代码分割的时候]
异步打包时候 : 使用官方的异步加载插件
splitChunksPlugin
1: 同步分割的代码会检查是否符合 cache group 里面的规则
2: 异步分割的代码,直接分割成单独代码打包
splitChunks : {}为空对象时候,所有的内容都是官网上默认的
optimization: {
splitChunks: {
chunks: 'async',
minSize: 30000, 大于这个数字的文件才会做代码分割
minRemainingSize: 0,
maxSize: 0, 对大于这个数的文件进行二次拆分
minChunks: 1,最少使用某个 js 多少次才对代码进行分割
maxAsyncRequests: 6,同时加载的模块数量为 6 个, 最多只能将异步请求的文件分割为 6 个文件
maxInitialRequests: 4,入口首页 js 做代码分割只能分割成四个文件
automaticNameDelimiter: '~', 文件名之间的连接符号
name: true
cacheGroups: { 同步打包的必经之路,遇到要打包的模块,将所有的模块都分析好之后,归好类之后,分好组再打包
defaultVendors: {
test: /[\\/]node*modules[\\/]/,
检测要打包的文件如果是 nodez-module 下面的,就放在这个 vendor 里面
priority: -10,
如果要打包的文件的条件两个组的要求都符合,那就把这个文件放到优先级高的这个组里面
filenames: 'vendors.js'
将所有的文件都打包到这个文件里面
},
不属于 node_module 的管理的文件,放在这里
default: {
minChunks: 2,
priority: -20,
reuseExistingChunk: true,
如果一个模块之前已经打包过,那即使复用的时候,就不会再重新打包了
filenames: 'common.js'
}
}
}
}
模块懒加载
1: 在使用 vue 等框架的时候,可以将不同页面对应的文件分开打包,这样只有在访问这个页面的时候,才回去发送请求,提升页面的相应速度
webpack-bundle-analyzer 对打包好的文件做分析,需要在 scripts 里面配置 build 命令的时候,加上生成 json 分析文件的命令
与用户交互的代码,分割为异步的代码,首次加载页面的时候,不会加载异步代码,提升网页的相应速度
代码的合理的使用频率,可以提升网页的性能 code coverage
将首次加载必须就依赖的逻辑代码,和事件交互等异步代码分开打包
webpack 认为这样的异步代码的处理方式,能够极大地提高网页的性能,所以在代码分割的时候,默认的分割代码只对异步代码分割,同步代码采取的方式是缓存
prefetching preloading
: 当用户首次访问的时候,将首屏所需要的业务逻辑加载,当首屏的资源加载完毕之后,等网络空闲了再去加载其他页面需要的逻辑或者资源
: 使用 magic comment
import (/\_webpackPrefetch: true*/'./cilck.js')
prefetching : 等首屏逻辑加载完成之后,再加载其他文件
preloading :与首屏文件并行加载
CSS BUNDLE 打包插件
: webpack 打包的时候,会将 css 文件打包到 js 文件里面
: MiniCssExtractPlugin 线上打包环境运行,开发阶段不支持模块热更新,所以需要将不同场景的配置文件 module.rules 里面的规则替换
{
test: /\.(sass|less|stylus)$/,
use: {
" MiniCssExtractPlugin.loader",
{
loader: "css-loader",
options: {
importLoaders : 2,
module:true

    }
        },
        "sass-loader",
        'postcss-loader'
    }

},
{
test: /\.css$/,
use: {
" MiniCssExtractPlugin.loader",
'css-loader',
'postcss-loader'
}
}
2 :
将 optimization: {
usedExport: true, 使用暴露出来的模块
}
在 package.json 中配置不能进行 treeShaking 的文件有哪些
'sideEffects': ['*.css']
3:
plugins: [
new MiniCssExtractPlugin ({
filename: '[name].css',直接引入的 css 文件的名字
chunkFilename: '[name].chunk.css'
间接引入的文件的名字
})
]

这个插件会将所有引入的 css 的样式,合并到一个 css 文件中
如果要压缩,需要重新安装插件
如果需要分割 CSS 文件,需要参照官方的示例
webpack 缓存
: wepack 打包上线的文件,只要每个文件的内容不变,那用户在访问这个文件的时候就不需要重新发送请求,因为每个文件都有自己的 hash
output : {
filename: '[name].[contenthash]js',
chunkFilename: '[name].[contenthash]chunk.css'
}

在新版本里面只需要对文件名字进行配置,但是较老一点的版本需要重新配置
optimization :{
runtimeChunk: {
name: 'runtime'
}
}
在老的版本里面,每个 JS 文件之间存在相互依赖的关系,为 manifest
当配置了这个选项之后,就会自动将每个 JS 文件之间 的关系单独分离出来一个文件
webpack 的理念是模块化,每个模块里面的变量只有模块内部能使用,另外一个模块除非引用这个模块才能使用这个模块里面的变量
shimming 垫片的概念
const webpack= require( 'webpack')
plugins: {
new webpack. ProvidePlugin({ $: 'jquery'}) 就可以在全局使用 jquery 库
}

一个模块中的 this 指向的是模块本身,
npm i imports-loader -D
在 JS 文件的 rules 中,添加新的 loader
use: [{
loader:'babel-loader'
},
{
laoder: 'imports-loader?this=>window '
}]
环境变量的配置
library 的打包
import \* as math from './math' 将 math 中的所有内容都引入到这个文件,起个名字为 math
const path = require('path');
module.exports = {
mode: 'production',
entry: './src/index.js',
externals: 'lodash', 外界引入的时候,名字必须为 lodash
output : {
path: path.resolve(\_\_dirname, 'dist'),
filename: 'library.js',
library:'root', 以 script 标签引入的时候,会在全局注入一个 root 变量
libraryTarget: 'umd' 在外界引入的时候,可以以任何方式引入,this root 会被注入到 window 对象中
}
}

单页面路由应用问题
devserver 配置的服务器只有在开发环境中有效果,如果项目上线了,出现了访问不到页面的问题,需要去后端的服务器里面配置
配置 devServer: {
historyApiFallBack: true 访问任何地址,其实都访问的是 index.html
}

devServer: {
rewirtes: [{
from:/^\/$/, 访问这个地址
to: 'viewa/landing.html' 跳转的是下面的地址
}]
}

ESLINT
1 npm i eslint --save-dev
2:npx eslint --init 配置 直接在 webpack 上面运行 eslint
3: npx eslint src 用 eslint 的标准去检查 SRC 目录下面的文件
4: npm i babel-eslint 安装 babel 解析器
4-4: npm i eslint-loader
5: 在编辑器里面安装 eslint 插件,让这个插件解决这个问题

|                                 : 将 eslint 提示的有问题的组件的检查规则设置为 0                                  |
| :---------------------------------------------------------------------------------------------------------------: |
|                                                     配置文件                                                      |
|                                                    globals: {                                                     |
|                                        document: false 全局变量不能被覆盖                                         |
|                                                        },                                                         |
|                                                     module: {                                                     |
|                                                     rules: [{                                                     |
|                                                  test: /\.js$/,                                                   |
|                                             exclude: /node_modules/,                                              |
|                                              use: ['babel-loader',{                                               |
|                                             loader: 'eslint-loader',                                              |
|                                                    options: {                                                     |
|                                                     fix:true                                                      |
|                                                        },                                                         |
|                                          force: 'pre' 强制先执行语法校验                                          |
|                                                        }]                                                         |
|                                                        } ]                                                        |
|                                                        },                                                         |
|                                                   devServer: {                                                    |
|                                  overlay: true --> 将语法的错误在浏览器上面提示                                   |
|                                                         }                                                         |
|                                            如何提升 webpack 的打包速度                                            |
|                                        1: 迭代目前的版本(node, npm ,yarn)                                         |
|                                             2: 尽可能少的应用 loader                                              |
| include exclude 约定只有当某一模块必须要使用 某一 loader 的时候才去使用这个 loader, 有的文件不需要使用,就排除在外 |
|                              3: plugin 尽可能精确,确保可靠,不同的模式,使用不同的插件                              |
