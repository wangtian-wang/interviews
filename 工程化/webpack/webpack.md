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

#### 如何利用 webpack 做缓存

- 利用 webpack 打包输出后的`fileName`
- `fileName`的构成

```js
 {
    fileName: [name].[hash].[ext]
 }
```

- `hash` 的取值
- hash

  > 根据整个项目构建,有一个文件发生变化,整个项目的 hash 都会发生变化

  > 不使用做缓存,因为每次打包版本号都会变化, 不会命中缓存

- chunkHash

  > 为入口文件以及分离出来的文件生成相同的 hash.A.js 从里面分离出 A.css,那么他两属于同一个 chunk 包，那么他们会拥有相同的 hash。

  > 适合设置 JS

- contentHash

  > 文件内容生成 hash

  > 适合设置 css
