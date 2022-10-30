/**
  控制promise的运行次数N，总共运行N次后，
  有一次成功后 就返回成功时候的结果
  否则: 直到尝试了n次后,返回最后一次的运行结果
 */

Promise.retry = function (fn, limit) {
  return new Promise(async (resolve, reject) => {
    // limit = 5
    while (limit--) {
      // limit -- ;limit = 4
      try {
        let result = await fn();
        resolve(result);
        break;
      } catch (error) {
        if (!limit) {
          // 尝试的次数用完后 立即变为失败
          reject(error);
        }
      }
    }
  });
};
Promise.retryAsync = function retryAsync(fn, limit) {
  if (typeof limit !== "number") limit = 3;
  return new Promise((resolve, reject) => {
    let index = 0;
    async function inner() {
      index++;
      try {
        let res = await fn();
        resolve(res);
      } catch (err) {
        // console.log(index, "index");
        if (index < limit) {
          inner();
        } else {
          reject(err);
        }
      }
    }
    inner();
  });
};
// test example
function getNum() {
  return new Promise((resolve, reject) => {
    const num = Math.random() * 0.5;
    setTimeout(() => {
      if (num > 0.1) {
        resolve(`${num}ok`);
      } else {
        reject(undefined);
      }
    }, 1000);
  });
}

/**
 *   将fn 一共 执行time次,  执行完time后 ,返回每次fn执行的结果
 */
Promise.retryAll = (fn, time) => {
  return new Promise((resolve, reject) => {
    let index = 0, // 当前执行到第几次
      result = [];
    while (index < time) {
      let i = index; // 保存当前次执行结果的index
      index++;
      fn().then(
        (res) => {
          if (i === time - 1) {
            resolve(result); // 执行resolve后 后面的代码  result[i] = res;还能执行
          }
          result[i] = res;
        },
        (error) => {
          if (i === time - 1) {
            reject(result);
          }
          result[i] = error;
        }
      );
    }
  });
};

/**
 *  总共尝试n次,  哪次成功, 就返回哪次成功之前 函数执行的所有结果
 *               n次都是失败的 则返回所有失败的结果
 */
Promise.retryAllAsync = function retryAllAsync(fn, limit) {
  return new Promise((resolve, reject) => {
    let result = [],
      index = 0;
    async function run() {
      // 只要run函数 执行了一次 就代表当前的limit次数 少了一次
      let curIndex = index++;
      try {
        let res = await fn();
        result[curIndex] = res;
        resolve(result);
      } catch (err) {
        result[curIndex] = err;
        if (index < limit) {
          run();
        } else {
          reject(result);
        }
      }
    }
    run();
  });
};
Promise.retryAll(getNum, 5).then(
  (res) => {
    console.log(res);
  },
  (error) => {
    console.log(error, "finally error");
  }
);
/** 发送一个请求，1s后就返回失败的结果 */

function getData() {
  return new Promise((resolve, reject) => {
    getNum().then(
      (res) => {
        resolve(res);
      },
      (error) => {
        setTimeout(() => {
          reject(error);
        }, 1000);
      }
    );
  });
}
/**
getData().then(
  (res) => {
    console.log("res", res);
  },
  (error) => {
    console.log("error", error);
  }
);

 */
