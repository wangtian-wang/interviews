// 闭包 递归

/**
  柯力化函数的编程思路

  1： 闭包函数A 返回初始化函数；
  2： 递归A 传递参数  逻辑复用 （判断fn参数是否传递完成）
 */

function curry(fn) {
  let fnLen = fn.length;
  return function curried(...args) {
    if (args.length === fnLen) {
      return fn.apply(this, args);
    } else {
      return (...rest) => curried(...args, ...rest);
    }
  };
}
function add(a, b, c) {
  return a + b + c;
}

// 调用方式1 多次分步调用
let curriedFn = curry(add);
let resCurry = curriedFn(1);
resCurry = resCurry(2);
resCurry = resCurry(8);
// console.log(resCurry);
// 调用方式2 一次分参调用
let curriedFn1 = curry(add);
let resCurry1 = curriedFn(1)(3, 4);
// console.log(resCurry1);

/*
   中间件函数

   中间件函数的 next 回调函数 负责递归遍历整个middleWares数组
   遍历完成，执行next()下面的代码
   实现： 
   1： 边界判断
   2： 闭包函数  遍历执行middlewares加入的函数FN
               执行FN（闭包函数），将闭包作为回调传入



 */

let middleWare = [];
middleWare.push((next) => {
  console.log("1");
  next();
  console.log("~~~~1~~~~");
});
middleWare.push((next) => {
  console.log("2");
  next();
  console.log("~~~~2~~~~");
});
middleWare.push((next) => {
  console.log("3");
  next();
  console.log("~~~~3~~~~");
});
function middleWareFn(middleWares) {
  const copyMiddleWares = [...middleWares];
  let index = 0;
  const fn = () => {
    if (index >= copyMiddleWares.length) {
      return;
    }
    const middleFn = copyMiddleWares[index];
    index++;
    middleFn(fn);
  };
  return fn;
}
let middleFn = middleWareFn(middleWare);
// middleFn();

/**
 结合律函数
 特点： 前一个函数的返回值 作为下一个函数的参数
     
 实现 ： 
  fn      （收集fn arrays）
     闭包函数（ reduce 传递下一个item需要的prev 实现累加 ）
       
 
 */

function add1(x) {
  return x + 2;
}
function add2(x) {
  return x + 3;
}
function add3(x) {
  return x + 4;
}
function compose() {
  let args = [...arguments];
  return (num) => {
    return args.reduce((prev, cur) => cur(prev), num);
  };
}

const composeFn = compose(add1, add2, add3);
// console.log(composeFn(0));

/**
 实现一个event emitter 具有以下功能
 on    添加事件以及对应的回调函数
 once（event, cb）  添加事件以及对应的回调函数
                在执行once时候 要执行 on off 才能实现回调函数只执行一次的功能
                函数只能被执行一次 然后就要从listersMaping中移除 
                内部定义了fn  fn的功能 1： 执行cb(...args) 2: 移除当前event off(event,fn) 
                this.on(event,fn)
 emit  执行回调 传参
 off   移除函数
 可以接受每种事件的最大监听数
 */

class Emitter {
  constructor(maxListeners) {
    this.maxListeners = maxListeners || 10;
    this.listersMaping = {};
  }
  on(event, cb) {
    if (!this.listersMaping[event]) {
      this.listersMaping[event] = [];
    }
    if (
      this.listersMaping[event] &&
      this.listersMaping[event].length > this.maxListeners
    ) {
      return `listeners num outof limit`;
    }
    this.listersMaping[event].push(cb);
  }
  emit(event, ...args) {
    if (this.listersMaping[event].length < 0) return;
    this.listersMaping[event].forEach((elem) => {
      elem.apply(this, args);
    });
  }
  once(event, cb) {
    const fn = (...args) => {
      this.off(event, fn);
      cb.apply(this, args);
    };
    this.on(event, fn);
  }
  off(event, cb) {
    if (!cb) {
      this.listersMaping[event] = null;
    } else {
      this.listersMaping[event] = this.listersMaping[event].filter(
        (item) => item !== cb
      );
    }
  }
}

const plus = (a, b) => console.log(a + b);
const print = (a) => console.log(a);
const event = new Emitter();
event.on("plus", plus);
event.emit("plus", 2, 3);
event.on("print", print);
event.emit("print", "-----------");
event.emit("print", "-----------");
event.emit("print", "-----------");
event.once("once", print);
event.emit("once", "+++++++++");
event.emit("once");
event.emit("once");
event.emit("once");
event.emit("once");
