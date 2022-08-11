/** 间隔1秒 输出打印的结果 */

function square(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
}
let list = [1, 2, 3];
let p = Promise.resolve();
function test(i) {
  if (i === list.length) return;
  // 同一个promise实例的then方法，在1s后改变状态的话， 回调函数  先后  执行   第一次的执行状态和时间影响下一次then方法的执行时间状态
  // 多个promise实例then方法     在1s后改变状态的话， 回调函数  同时 执行
  p = p.then(async () => {
    let result = await square(list[i]);
    console.log(result);
  });
  test(i + 1);
  /**
    多个promise实例then方法     在1s后改变状态的话， 回调函数  同时 执行
    p.then(async () => {
        let result = await square(list[i]);
        console.log(result);
    });
    test(i + 1); 
    */
}
test(0);
