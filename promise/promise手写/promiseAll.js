/**
  实现一个promise.all
  坑 arr[4] = 10; 数组的下标变化 数组的长度会变化
  [,,,,4].length = 5

  */

function promiseAll(promiseArr) {
  if (!Array.isArray(promiseAll)) {
    return reject(new TypeError("arguments must be an array"));
  }
  let result = [];
  let counter = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then((res) => {
          counter++;
          result[i] = res;
          if (counter === promiseArr.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}
