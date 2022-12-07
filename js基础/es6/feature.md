#### 变量声明

###### `const`

- 声明一个只读的常量,一旦声明,常量不能重新赋值,重新声明
- 不能改变指的是 保证变量所指向的内存地址所保存的数据不能改变.对于简单数据类型,值就保存在内存地址中,所以简单数据类型一旦声明,不能改变.
- 复杂数据类型,变量指向的内存地址,保存的是一个指向实际数据的指针.const只能保证这个指针是不变的.既不能重新赋值,但是不能保证该数据结构是不变的.所以const声明的复杂类型数据,其属性可以更改.

###### `let`

- let 声明的变量,只在当前的代码块内有效

#### 数组的扩展

##### 数组构造器

###### `Array.from`

###### `Array.at`

###### 数组实例的遍历方法

- find findIndex
- copywith
- fill
- includes
- flat
- flatMap

###### 数组的扩展运算符

#### 函数的扩展

###### 函数参数的默认值

- 传入的参数是 undefined,则会使用默认值 作为该参数的值, Null 则没有此效果.

###### 函数的 length 属性

- length 指的是函数未被设置默认值的形参的个数. 假设参数中使用了扩展运算符,则 length 属性指的是扩展运算符之前的形参的个数

###### 函数的参数作用域

- 一旦设置了函数参数的默认值,函数进行初始化时,参数会形成一个单独的作用域.等到初始化结束,这个作用域就会消失.在不设置参数默认值时 ,是不会出现的.

```js
var x = 10;
function test(
  x,
  y = function () {
    x = 3;
    console.log(x); // 3
  }
) {
  console.log(x); // undefined
  y();
  console.log(x); // 3
  x = 22;
  console.log(x); // 22
}
test();
console.log(x); //  10
```

#### 对象的扩展

###### 对象的扩展运算符

###### 对象构造器的方法扩展

- Object.js
- Object.assign()
- Object.keys()
- Object.values()
- Object.entries()
- Object.fromEntries()

#### `Symbol`

- 属于一种新的原始数据类型,表示唯一的值

###### `Symbol`的方法

- symbol.for() 接收一个字符串作为key, 然后搜索有没有以该key作为名称的Symbol,如果有就返回值,没有就新建一个以该key为名称的Symbol的值.
- Symbol.keyFor()  返回一个已登记的Symbol类型值的key

#### `set` `map` 数据结构

####  `proxy` `reflect`

#### `promise`对象

#### `async`

#### `class`

#### 修饰器`decorator`

- 用来修改类行为的函数.代码编译时发生的.

#### `module`

