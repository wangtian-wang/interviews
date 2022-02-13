## JS 的表达式

- ###### 特点 ：表达式都可以返回一个结果值
- ###### 表达式的分类

  - 左表达式 左边的值是赋值的目标
    分类 ：.对象属性访问符；new ； new.target； 展开运算符
  - 主要表达式： this function class [] {} // ()分组操作符

## JS 语句

- 语句都有一个结果值
- 语句 = 表达式 + 运算符

## ++a, a++

参与运算 指的是出现在赋值语句中 `var a = 10; var b = a++ + 20;`

## JS 运算符 ；

#### 自增自减运算符 前置 后置

#### 一元运算符 只有一个操作数

delete void typeof +(将操作转换为 number 类型) - (转换为 number 类型并且取反) ~ ！

###### +

- +A 会将 A 隐式转换为 number 如果转换失败 则返回值为 NaN

```javascript
+NaN + // NaN;
  undefined + // NaN
  [] + // 0
  null + // 0;
  false + // 0;
  true + // 1
  ""; // 0
```

###### ,

- 逗号运算符， 从左到右执行运算， 返回最右边表达式的结果

```javascript
var b;
var a = ((b = 12 + 3), b);
console.log(a);
15;
console.log(b);
15;
```

#### 算数运算符 以 2 个数值为操作数，并返回单个数值

- +； -； \* ； /；%;

#### 关系运算符 比较两个操作数返回 Boolean 值

- in ; instanceof ; < ; <= ; > ; >=

#### 相等运算符 返回的是 Boolean 类型的 true 或者 false

- ==； ===； ！==； ！=

#### 二元逻辑运算符 用于 Boolean 值运算 返回布尔值

- &&； || ； ？？(空值合并运算符)

#### 三元运算符

#### 赋值运算符

#### 逗号运算符

## js 的运算符有哪些？

## JS 运算符的执行顺序？

## 运算符优先级?

#### 运算符的关联指的是多个运算符之间的组合顺序

常见的关联的方式：

- 左关联

  - &&

- 右关联

  - ？：三元表达式 ； = 赋值运算符
  - 举例`var a , b , c; a = b = c = 42 a = (b = (c= 42)`)

一般来说 代码的执行顺序和组合顺序无关, 关联是代码的组合方式 代码执行的优先级可能被（）

## 隐式类型转换

```javascript

 number + 非number      非number会被执行隐式类型转换
  1 + {}   运算符 +， 会对 {} 进行隐式类型转换  '[object Object]';
  1 + []   运算符 +，会对 []进行隐式类型转换   '';
  {} + 1   {}被当做一个空的代码块不执行任何操作   ; // 1
    列如：  {a: 12}  + 1;                      // 1
  [] + 1   []会被隐式转换为'';                  // '1'
```

##

```
运算符常见面试题
```

```javascript
typeof 1 / 0
typeof 1  -> number;
number / 0 = NaN;
总结 typeof的优先级高
```

## arguments

- arguments 在形参传入的时候，与形参形成隐射关系，可以相互更改
- arguments 在无形参传入的时候， 无法与形参形成隐射关系， 修改 arguments，形参不会发生变化
- ```javascript
  function foo(a) {
    a = 12;
    console.log(a);
    arguments[0] = 13;
    console.log(a); // 12
    console.log(arguments[0]); // 13
  }
  foo(); // 实参为空，不能与函数内部的arguments形成隐射关系
  ```

## try...finally

- try 中的代码 先执行； 接下来是 catch（)； 最后是 finally（)；
- finally 中的代码一定会执行， 即使 try 代码块中使用了 return；

  ```javascript
  function bar() {
    try {
      return 999; // 即使这里使用了return
    } finally {
      console.log("finally exec"); // "finally exec"
    }
  }
  console.log(bar(), "-------"); // 999 -------
  ```

- finally 中的 return 的返回值会覆盖 try catch 中的 return 的返回值
- finally 中抛出错误，函数就会在此处终止 即使 try return 了返回值
- `span`
- ```javascript
  function bar() {
    try {
      return 999;
    } finally {
      throw new Error("exec error");
      return 1000;
    }
  }
  console.log(bar(), "-------"); // 报错
  ```

## switch

#### switch(a) a 必须为 Boolean 类型的值， case 语句 的表达式才能运算

```javascript
var a = "nihao";
var b = 10;
switch (
  1 //  假设 Switch（1) 则里面的打印不会输出
) {
  case a == "nihao":
    console.log(a); // nihao
  case b == 10:
    console.log(b); //10
}
```

#### case 语句在进行运算时 运算结果只有为 true 的时候，才会命中该条件

```JavaScript
var a = "nihao";
var b = 10;
switch (true) {
  case a || b == 10:            // a || b == 10 的运算结果为"nihao" 不是Boolean类型  既条件不命中
    console.log(a);
    break;
  case b == 10:                // b == 10 运算结果为true
    console.log(b);            // 10
    break;
}
```
