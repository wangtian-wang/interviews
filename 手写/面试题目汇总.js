/**  纵横航旅面试题
js基础  
    原型 原型链  闭包  promise  继承的方式  class继承的特点   super() call applay bind
vue  
    双向绑定原理
webpack
   常用loader  插件和loader有没有手写过   自己配置过webpack 优化策略

**/

// 实现一个函数 封装promise 5S后返回失败的promise结果
const request = () => {
  const axios = $axios;

  return new Promise((resolve, reject) => {
    axios.get("ppp").then((res) => {
      resolve(res);
    });

    setTimeout(() => {
      reject();
    }, 1000);
  });
};
var a = 1;
function fn1() {
  console.log(a);
}
function fn2() {
  var a = 10;
  fn1();
}
fn2();
function fn3() {
  var a = 10;
  function inner() {
    console.log(a);
    a = 100;
  }
  inner();
  console.log(window.a);
}
fn3();

new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("settimeout 1");
  }, 0);
  resolve(2);
  Promise.resolve("resolve").then((res) => {
    console.log(res);
    setTimeout(() => {
      console.log("settimeout 2");
    }, 0);
  });
}).then((res) => {
  console.log(res);
});
console.log(22222);

console.log(Function.__proto__ === Function.prototype);
console.log(Object.__proto__ === Function.prototype);
