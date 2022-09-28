function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let midIndex = Math.floor(arr.length / 2),
    middle = arr.splice(midIndex, 1)[0]; // 从数组中找到middle 并且删除middle
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middle) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([middle], quickSort(right));
}
/**   插入排序  */

const insertSort = (arr) => {
  if (arr.length <= 1) return arr;
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1,
      cur = arr[i];
    // 因为j是变化的 所以 不能直接写成 jItem = arr[j]
    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j]; //  前一项的较大的值 赋值给后一项后, 再去更改前一项的值
      arr[j] = cur;
      j = j - 1;
    }
  }
  return arr;
};
// 测试
let arr = [86, 24, 64, 48];
console.log(insertSort(arr, "---"));
