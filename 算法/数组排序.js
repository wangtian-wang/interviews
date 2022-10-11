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

// 冒泡排序
const bableSort = (arr) => {
  arr = [...arr];
  let temp,
    i = arr.length;
  // 外层循环的计数器i  > 内存循环的计数器j
  while (i > 0) {
    console.log(i);
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
    i--;
  }

  return arr;
};

/**
 * 
 * chooseSort
minIndex 是变化的 必须写在循环体内

[6, 9, 20, 88, 8, 90, 77, 38, 8]

外层循环 第一次遍历时 i = 1 ;minIndex = 0  arr[1] = 9  arr[0] = 6; 
内层循环遍历的元素为[9, 20, 88, 8, 90, 77, 38, 8] 与 arr[minindex] 做比较 , 
遍历完成 数组的排列为 [6,9, 20, 88, 8, 90, 77, 38, 8]

外层循环 第二次遍历时 i = 2 ;minIndex = 1  arr[i] = 20  arr[minIndex] = 9; 
内层循环遍历的元素为[20, 88, 8, 90, 77, 38, 8] 与 arr[minindex] 做比较 , 发现 arr[8] < arr[minIndex] minIndex = 8 交换元素位置
遍历完成 数组的排列为 [6,8, 20, 88, 8, 90, 77, 38, 9]    

.....



 */
const chooseSort = (arr) => {
  arr = [...arr];
  let minIndex,
    i = 1,
    len = arr.length;
  while (i < len) {
    minIndex = i - 1;
    // 数组的遍历都是从下标为0的位置开始  表示从数组下标i处 开始 遍历剩余数组元素
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i - 1) {
      let temp = arr[i - 1];
      arr[i - 1] = arr[minIndex];
      arr[minIndex] = temp;
    }
    i++;
  }
  return arr;
};
