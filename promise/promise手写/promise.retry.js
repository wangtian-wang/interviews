/**
  控制promise的运行次数N，总共运行N次后，无论是成功或者失败都返回promise的结果（无论那次成功，结果将立即返回，promise的状态会发生变化）
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
// test example
function getNum() {
  return new Promise((resolve, reject) => {
    const num = Math.random() * 0.5;
    setTimeout(() => {
      if (num > 0.4) {
        resolve("success");
      } else {
        console.log("failing" + num);
        reject("failing");
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
