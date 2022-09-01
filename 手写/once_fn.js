const once = (fn) => {
  let res,
    isFirst = true;
  return function (...args) {
    if (!isFirst) return res;
    res = fn.call(this, ...args);
    isFirst = false;
    return res;
  };
};
function repeat(fn, times, delay) {
  return async function (...args) {
    for (let i = 0; i < times; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          fn.call(this, ...args);
          resolve();
        }, delay);
      });
    }
  };
}
const repeatFn = repeat(console.log, 4, 1000);
// 函数调用四次，每次间隔 1s 打印 hello
repeatFn("hello");
