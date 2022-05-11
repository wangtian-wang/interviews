function getSum(arr) {
  return arr.reduce((prev, cur) => prev + cur);
}
/**
 * getMaxSum
 * @param {array} arr  要求值的数组
 * @param {string} n  连续几个数
 * @returns
 */
function getMaxSum(arr, n) {
  let left = 0,
    right = left + n; // left < right;
  let max = getSum(arr.slice(left, right));
  for (; right <= arr.length; left++, right++) {
    const curSum = getSum(arr.slice(left, right));
    max = Math.max(curSum, max);
  }
  return max;
}

// 算法实现
/**
当 i= 0  sum = 2 +5 = 7 max = 7
当 i = 1 sum = 7 - 2 + 3 = 8    8 > 7 max = 8
当i = 2  sum = 8 - 5 + 4 = 7    7 < 8  max =  7???
 */
function getMaxSumPlus(arr, n) {
  let max = 0,
    preSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      for (let j = 0; j < n; j++) {
        max += arr[j];
      }
      preSum = max;
    } else {
      const curSum = preSum - arr[i - 1] + arr[i - 1 + n];
      if (curSum > max) {
        max = curSum;
      }
      preSum = curSum;
    }
  }
  return max;
}

// test
const arr = [2, 5, 3, 4, 6];
const res1 = getMaxSum(arr, 2);
const res2 = getMaxSum(arr, 3);
console.log(res1, "res1");
console.log(res2, "res2");
