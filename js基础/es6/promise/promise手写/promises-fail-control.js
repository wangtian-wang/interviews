// import { checkPromise } from "./check-promise";
const { checkPromise } = require("./check-promise.js");
/** 实现promise数组元素全部执行, 当达到失败限制后,停止执行剩余promise函数, 立即返回结果
 *  某个promise的状态是失败的,是跳过这个promise重新执行下一个,还是从这个位置开始尝试执行呢? 重新执行下一个元素
 * 达到失败次数 达到失败的限制次数 然后返回结果 即使后面还有函数未执行
 *  未达到失败次数 继续尝试 若后续的状态都为成功 则剩余的promise函数能全部执行完成
 *
 *
 *  */
// const promiseLimitController = (promises, limit) => {
//   if (!Array.isArray(promises))
//     throw new TypeError("promises must be an array");
//   limit = +limit;
//   if (isNaN(limit)) limit = 1;
//   var successCount = 0,
//     failCount = 0,
//     successResList = [],
//     failResList = [];
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promises.length; i++) {
//       let index = i;
//       var promise = promises[index];
//       let res = checkPromise(promise);
//       if (!res) promise = Promise.resolve(promise); // promise的状态改变后才能拿到结果，手动变为promise
//       promise
//         .then((res) => {
//           successCount++;
//           successResList[index] = res; // 结果数组的每一项和promise数组每一项对应起来
//           if (successCount >= promises.length) resolve(successResList);
//         })
//         .catch((error) => {
//           failCount++;
//           failResList.push(error);
//           if (failCount == limit) {
//             reject(failResList);
//           } else {
//             successCount++;
//             successResList[index] = error; // 某次promsise的状态是失败的 但是 没有到达失败并发限制 所以 for循坏继续遍历下一个promise，promise执行
//             if (successCount >= promises.length) resolve(successResList);
//           }
//         });
//     }
//   });
// };
function getNum() {
  return new Promise((resolve, reject) => {
    const num = +(Math.random() * 0.5).toFixed(2);
    setTimeout(() => {
      if (num > 0.2) {
        resolve(`${num}ok`);
      } else {
        console.log("failing in get num" + num);
        reject(`${+num}`);
      }
    }, 1000);
  });
}

const promiseLimitController = (promises, limit) => {
  if (!Array.isArray(promises))
    throw new TypeError("promises must be an array");
  if (typeof limit !== "number") limit = 1;
  let failCount = 0, // 记录执行失败的promise的个数
    successCount = 0, // 记录已经执行的promise的个数
    result = [],
    failResult = [];
  return new Promise((resolve, reject) => {
    let len = promises.length;
    for (let i = 0; i < len; i++) {
      let current = promises[i];
      if (!checkPromise(current)) current = Promise.resolve(current);
      current.then(
        (success) => {
          successCount++;
          result[i] = success;
          if (successCount >= len) resolve(result);
        },
        (fail) => {
          failCount++;
          failResult.push(fail);
          if (failCount == limit) {
            reject(failResult);
          } else {
            successCount++;
            result[i] = null;
            if (successCount >= len) resolve(result);
          }
        }
      );
    }
  });
};

promiseLimitController([getNum(), getNum(), getNum(), getNum()], 2).then(
  (res) => {
    console.log(res, "all result");
  },
  (error) => {
    console.log(error, "error");
  }
);
Promise.allSettled([Promise.reject("error---")]).then(
  (res) => {
    console.log("res--");
  },
  (error) => {
    console.log("error----");
  }
);
