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
      console.log("---");
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
// test example
function getNum() {
  return new Promise((resolve, reject) => {
    const num = Math.random() * 0.5;
    setTimeout(() => {
      if (num > 0.4) {
        resolve(`${num}ok`);
      } else {
        // console.log("failing" + num);s
        reject(num);
      }
    }, 1000);

    /**
        if (num > 0.3) {
      resolve("success");
    } else {
      console.log("----------");
      reject("failing");
    }
    */
  });
}

Promise.retry(getNum, 5).then(
  (res) => {
    console.log(res);
  },
  (error) => {
    console.log(error, "finally error");
  }
);

/**
 *   将fn执行time次,返回每次fn执行的结果
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
            resolve(result);
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
