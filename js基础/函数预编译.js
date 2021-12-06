var x = 10;
function test(
  x,
  y = function () {
    x = 3;
    console.log(x); // 2 : 3
  }
) {
  console.log(x); // 1: 1000
  y();
  console.log(x); // 3: 1000
  var x = 22;
  console.log(x); // 4: 22
}
test();
console.log(x); // 5: 10

/**
 函数的参数 算是单独的作用域， 修改函数参数作用域内的变量， 不会被函数内部的变量产生影响  ； 函数参数作用域内   没有的变量 向全局去查找；
 当函数 形参变量与函数内部声明的变量 同名时候，新申明的变量的值 会覆盖 之前声明同名变量的值；
 函数的形参 只能由 实参 或者 函数内部声明相同的变量 来赋值；

 */

/**
  函数作用域的查找规则： 在函数定义的环境查找
 */

// 使用var 声明的变量和函数声明相同的时候的情况

console.log(fn); // 函数fn
var fn = "fn";
console.log(fn); // 'fn'

function fn() {
  console.log("fn is a function");
}
console.log(fn); //'fn'

// 预编译时候 函数声明和函数体会提升到整个作用域的顶部 当代码执行的时候
//           如果有和函数声明相同的变量，并且 当该变量已经被赋值 则代码执行时候，这个变量会覆盖函数声明
//                                      当该变量未被赋值的时候 函数声明不会被覆盖
