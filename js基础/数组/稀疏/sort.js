/**二分查找适合有序的数组 查找元素 若使用二分查找的数组是无序的 那给该数组排序的方法 又会花费一些时间 导致整体的时间复杂度提高    */
/**   快速排序  */
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
    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j];
      arr[j] = cur;
      j = j - 1;
    }
  }
  return arr;
};

let arr = [86, 24, 64, 48];
console.log(insertSort(arr, "---"));
// console.log(quickSort(arr), "-----------");
// let res = arr.splice(3, 1)[0];

// for each 不能被终端 ,只能遍历数组中的有效元素
// 如果数组在迭代时被修改了 则其他元素会被跳过
//  如果一个数组的长度在回调函数中被改变 那已经访问过的索引 不会再被遍历 ,假设删除了30 30会被打印出来 但是 删除掉30后,这个90不会被打印出来 ,因为该位置的索引已被访问过了
/**
 arr.forEach((item, index, a) => {
  if (item === 15) {
    a.splice(index, 1);
  }
}); 
 */

// for Each的实现
// Array.prototype.forEach = function forEach(cb, thisArgs) {
//   var t, k;
//   if (this == null) {
//     throw new TypeError("this is null or not defined");
//   }
//   var o = Object(this);
//   var len = o.length >>> 0;
//   if (typeof cb !== "function") {
//     throw new TypeError("cb must be a function");
//   }
//   if (arguments.length > 1) {
//     t = thisArgs;
//   }
//   k = 0;
//   while (k < len) {
//     var value;
//     if (k in o) {
//       value = o[k];
//       console.log(value, " in polyfill");
//       console.log(o, " in polyfill");
//       cb.call(t, value, k, o);
//     }
//     k++;
//   }
// };

// 数组遍历中 删除了某个位置的元素 然后这个位置的元素会被下一个元素替代 但是该位置的元素不会再被遍历 因为该位置的索引已经被遍历过了 会导致元素在遍历的过程中被跳过
// for (let index = 0; index < arr.length; index++) {
//   const element = arr[index];
//   if (element === 15) {
//     arr.splice(index, 1);
//   }
//   console.log(element, index, "index log"); // 数组立即被更改
// }
// console.log(arr, "----- finally----");

// arr1 = arr1.join("");
// let s = arr1 + "4";
// let f = arr1.join();
