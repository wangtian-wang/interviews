// 每隔n秒,执行一次函数
function repeat(fn, times = 1, delay = 1000) {
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
// repeat(print, 5)();

// 每隔一秒,打印一个数组项
const print = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i);
    }, 1000);
  });
};

async function test(fn) {
  for (let i = 0; i < 5; i++) {
    let res = await fn(i);
    console.log(res);
  }
}
test(print); // ok

/*  forEach循环无法做到 每隔 1000秒 执行一个函数
 */
function Each(fn) {
  const list = [1, 2, 3, 4];
  list.forEach(async (item) => {
    let res = await print(item);
  });
}
/**   await 只在当前的async函数中同步执行 由于forEach中传入的回调函数,
 *         执行时与回调中写的await不属于用一函数 所以 forEach实现不了该功能
 *
 */
async function test1() {
  await print();
  await print();
}
