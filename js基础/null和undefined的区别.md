## null undefined 区别：

- null 设计之初是用来表示空值 但是 typeof null = object 作者觉得表示空值的不应该是个对象。所以设计了 undefined
- number（null） = 0 null 可以自动转化为 0
- null 是一个特殊关键字 不是标识符 不能被当做变量来使用和赋值 undefined 是全局的标识符 可以被赋值和当做变量来使用

```js
   'name' + true/ false 会进行字符串拼接的操作
```
