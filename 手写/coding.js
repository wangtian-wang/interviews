/*
 forEach()实现是 while 遍历一个元素，执行一次回调函数 所以 forEach 的回调函数 使用async ，await 是无效的；
 只有在一个函数里面 使用await才会实现 同步化 效果 所以 forEach函数必须是异步函数


*/

Array.prototype.myForEach = async (cb, arg) => {
  const _arr = this,
    // 谁调用myForEach this 指向谁
    _isArray = Array.isArray(_arr),
    _thisArg = arg ? Object(arg) : window;
  if (!_isArray) {
    return new TypeError("the caller must be an array");
  }
  for (let i = 0; i < _arr.length; i++) {
    await cb.call(_thisArg, _arr[i], i, _arr);
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const fun = async (arr) => {
  arr.myForEach(async (fn) => {
    await fn();
  });
};
fun([
  () => console.log("start"),
  () => sleep(1000),
  () => console.log("1"),
  () => console.log("2"),
  () => sleep(2000),
  () => console.log("end"),
]);
