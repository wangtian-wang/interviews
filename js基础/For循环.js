/**
 foreach 循环 实现是多个立即执行函数包裹的代码体 若里面有异步函数 但是时间相同 会同时执行
 for ()循环
 for of 循环没有这个问题
 */
let arr = [1, 2, 3, 4, 5];
/** forEach()方法的原理 */
function myForEach(arr) {
  for (var i = 0; i < arr.length; i++) {
    ((i) => {
      console.log(i);
    })(i);
  }
}
myForEach(arr);
