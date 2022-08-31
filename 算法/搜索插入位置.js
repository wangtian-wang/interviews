// 给定一个数字和一个有序数组,插入数字到指定位置
const arr = [1, 3, 5, 6]; //2
function search(arr, target) {
  if (arr[arr.length - 1] < target) return arr.length;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= target) {
      return i;
    }
  }
  return arr.length;
}
function search2(arr, target) {
  if (arr[arr.length - 1] < target) return arr.length;
  let left = 0,
    right = arr.length - 1,
    middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (arr[middle] == target) {
      return middle;
    } else if (arr[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return left;
}
console.log(search2(arr, 5));
console.log(search2(arr, 2));
console.log(search2(arr, 7));
