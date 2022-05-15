// 无序数组  时间复杂度 o^n
const getCloseNumber = (arr, targetNum) => {
  let result = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (Math.abs(arr[i] - targetNum) < Math.abs(result - targetNum)) {
      result = arr[i];
    }
  }
  return result;
};

const getCloseNumberPlus = (arr, targetNum) => {
  return arr.reduce((prev, cur) => {
    return Math.abs(prev - targetNum) < Math.abs(cur - targetNum) ? prev : cur;
  });
};

const arr = [1, 3, 5, 6, 20];
let num = getCloseNumberPlus(arr, 7);
let num2 = getCloseNumberPlus(arr, 3);

console.log(num, "num");
console.log(num2, "num2");
// 有序数组
// 二分查找方法   o logN

const arr1 = [1, 3, 5, 8, 10, 11, 14, 16, 18];
const grtCloseNumBinary = (arr, targetNum) => {
  let left = 0;
  let right = arr.length - 1;
  let middle;
  while (right - left > 1) {
    middle = Math.floor((left + right) / 2);
    if (arr[middle] < targetNum) {
      left = middle;
    } else {
      right = middle;
    }
  }
  return Math.abs(arr[left] - targetNum) < Math.abs(arr[right] - targetNum)
    ? arr[left]
    : arr[right];
};

let num3 = grtCloseNumBinary(arr1, 7);
let num4 = grtCloseNumBinary(arr1, 3);

console.log(num3, "num3");
console.log(num4, "num4");
