/**
 递归
    - 概念
        是一种自上而下解决问题的思路,不断的拆分问题和组合问题的解 来解决问题
    - 思想
        分而治之
    - 执行顺序
        数据结构 : 栈 深度优先遍历
        入栈(拆分问题) 出栈(后入栈的函数计算结果向上传递)
        A函数执行时,遇到B函数调用的,会记住A函数的执行(112行)位置,当处理完嵌套的函数调用,会再回到这个(112行)位置,继续执行

    - 使用
        1: 划分问题
        2: 拆解问题
        3: 汇总
        4: 递归终止条件
    - 注意事项 栈溢出
        原因: 执行栈的内存是有限的,如果一直向执行栈里面添加函数,就会需要空间去保存函数执行上下文
            栈的空间就会越来越大,
            函数执行会产生调用帧 假设函数执行完成 调用帧被回收 内存就会释放
    - 优化
        尾调用优化
        尾调用: 函数return的是一个函数的调用  既return fn() / 不能是表达式 return x * fn()
 */

/** 尾调用举例 */
/**
 * 
 斐波那契数列是一个数组, 输入n(数组下标),求 在数组中n位置的数字
 [1，1，2，3，5，8，13，21，34，55，89，144，233] 这是正确的数组,自己求解的数组,求出的结果要符合这个正确数组
 */
function factorial(n, total) {
  if (n === 1) {
    return total;
  }
  return factorial(n - 1, n * total);
}
console.log(factorial(8, 0));
function fibonacci(n, n1 = 1, n2 = 1) {
  if (n <= 2) return n2;
  return fibonacci(n - 1, n2, n1 + n2);
}
console.log(fibonacci(8), "fibonacci");

/**递归案例       */
const arr = [12, 90, 100, 34, 23, 29, 30, 8];
function findMax(arr) {
  arr = JSON.parse(JSON.stringify(arr));
  if (arr.length <= 1) return arr;
  if (arr.length === 2) {
    return Math.max(arr[0], arr[1]);
  }
  let middle = Math.round(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  let maxLeft = findMax(left);
  let rightMax = findMax(right);
  if (maxLeft > rightMax) {
    return maxLeft;
  } else {
    return rightMax;
  }
}

function each(arr) {
  arr = JSON.parse(JSON.stringify(arr));
  if (arr.length === 0) return;
  if (arr.length === 1) {
    console.log(arr[0]);
    return;
  }
  console.log(arr.shift());
  each(arr);
}

function reverse(arr) {
  arr = JSON.parse(JSON.stringify(arr));
  if (arr.length <= 1) return arr;
  return [arr.pop(), ...reverse(arr)];
}
