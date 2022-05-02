/**
 总结 ：创建一个函数作用域 保存循环时候 每次循环的i
 if(true){ let i = 0; let i = 1 ; console.log(i)}; let 声明的变量在一个块级作用域里面只能有一个 ，否则 就会报错

 若是绑定的是DOM元素 可以给dom元素增加自身属性i，避免闭包产生的内存浪费
 */

function forEach(arr) {
  for (var i = 0; i < arr.length; i++) {
    (function (i) {
      return function () {
        setTimeout(() => {
          console.log(i);
        }, 1000 * i);
      };
    })(i);
  }
}
forEach(arr);
function forEach2(arr) {
  for (var i = 0; i < arr.length; i++) {
    let j = i;
    setTimeout(() => {
      console.log(j);
    }, 1000 * j);
  }
}
forEach2(arr);
function forEach3(arr) {
  for (var i = 0; i < arr.length; i++) {
    setTimeout(
      (function (i) {
        return function () {
          console.log(i);
        };
      })(i),
      i * 1000
    );
  }
}
forEach3(arr);
function print(arr) {
  for (var i = 0; i < arr.length; i++) {
    function inner(i) {
      setTimeout(() => {
        console.log(i);
      }, i * 1000);
    }
    inner(i);
  }
}
print(arr);

let arr = [1, 2, 3, 4, 5];
function printNum(arr) {
  let i = 0;
  for (; i < arr.length; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
  console.log(i, "outter");
}
printNum(arr);
let arr = [1, 2, 3, 4, 5];
function printNum(arr) {
  for (let i = 0; i < arr.length; i++) {
    let i = 0;
    console.log(i, "---");

    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
}
printNum(arr);
