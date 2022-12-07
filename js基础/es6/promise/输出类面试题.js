async function async1() {
  console.log("async 1 start");
  await async2;
  console.log("async 1 end");
}
async function async2() {
  console.log("async 2 start");
}
console.log("script start");
setTimeout(() => {
  console.log("timer start");
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise then");
});
console.log("script end");
/**
 * script start
 * async 1 start
 * promise1
 * script end
 * async 1 end
 * promise then
 * timer start
 */

/**  函数作用域 */
/**
 var a = 10;
(function () {
  console.log(a);
  a = 5;
  console.log(window.a);
  var a = 20;
  console.log(a);
})();
 */

const arrayLike = {
  2: 3,
  3: 4,
  length: 2,
  push: Array.prototype.push,
};
arrayLike.push(1); // 以当前的length作为下标去添加新的元素
arrayLike.push(2);
console.log(arrayLike); // {2: 1, 3: 2, length: 4, push: ƒ}

var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);

function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo.prototype.a = function () {
  console.log(3);
};
Foo.a = function () {
  console.log(4);
};
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
/**
 * 4
 * 2
 * 1
 */
