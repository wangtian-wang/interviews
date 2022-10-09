/**
 *  函数是数学上的概念   输入和输出的应射关系 相等的输入一般会产生相同的输出
   函数式编程： 用函数写程序  封装 组合 复用   用表达式来描述程序
 1: 如何理解函数是一等公民？？
  mdn 上的解释为： 当一门编程语言的函数 可以被当做变量一样用时，则称这门语言拥有头等函数 
  函数的作用很广： 可以作为参数（高阶函数），可以作为另一个函数的返回值（闭包），可以被赋值为一个变量
           
 */
// 函数柯里化;   仔细想一想函数执行的过程
function add(a, b, c) {
  return a + b + c;
}
function curry(fn) {
  let argsLen = fn.length; // fn函数一共有几个形参
  let curried = (...args) => {
    if (args.length < argsLen) {
      return (...rest) => curried(...args, ...rest);
    }
    return fn(...args);
  };
  return curried;
}
let curryFn = curry(add);
// 只要函数够 原来的函数才会执行
let curryExec1 = curryFn(1, 3)(3);
let curryExec2 = curryFn(1)(2)(3);
console.log(curryExec1, curryExec2);

function curryPart(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArgs) {
      const args = [...prevArgs, nextArgs];
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}
