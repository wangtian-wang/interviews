import { checkPromise } from "./check-promise";
/** 实现promise数组的成功返回成功的结果 失败的话 达到失败的限制次数 然后返回结果 */
const promiseLimitController = (promises, limit) => {
  if (!Array.isArray(promises))
    throw new TypeError("promises must be an array");
  limit = +limit;
  if (isNaN(limit)) limit = 1;
  var successCount = 0,
    failCount = 0,
    successResList = [],
    failResList = [];
  return new Promise((resolve, reject) => {
    for (var i = 0; i < promises.length; i++) {
      (function (index) {
        var promise = promises[index];
        let res = checkPromise(promise);
        if (!res) promise = Promise.resolve(promise); // promise的状态改变后才能拿到结果，手动变为promise
        promise
          .then((res) => {
            successCount++;
            successResList[index] = res;
            if (successCount >= promises.length) resolve(successResList);
          })
          .catch((error) => {
            failCount++;
            if (failCount == limit) {
              failResList.push(error);
              reject(failResList);
            } else {
              successCount++;
              successResList[index] = null; // 某次promsise的状态是失败的 但是 没有到达失败并发限制 所以 for循坏继续遍历下一个promise，promise执行
              if (successCount >= promises.length) resolve(successResList);
            }
          });
      })(i);
    }
  });
};
