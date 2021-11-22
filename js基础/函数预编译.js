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
