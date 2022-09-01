/**
 回文数的概念 : 1,22,121,1221这样的数字
 回文数的解题思路: 找关联

length  1    2   3   4      
        1   11  101 1001
        2   22  111 1111
        3   33  121 1221

min     1   1   10  10
max     9   9   99  99

  202 101 303 这些难道不是回文数吗? 是回文数 那为啥结果里面出现的2的回文数是121呢

 题目要求: 将给定的数组中的元素,变为给定长度的回文数,并且每个回文数的length不能超过给定的length
 */
function kthPalindrom(arr, length) {
  let res = [];
  let min = Math.pow(10, Math.floor(length - 1) / 2); // 10
  let max = Math.pow(10, Math.floor((length + 1) / 2)) - 1; // 99

  for (let i = 0; i < arr.length; i++) {
    let temp = min + arr[i] - 1;
    if (temp <= max) {
      if (length % 2 == 0) {
        let first = temp.toString();
        let second = temp.toString().split("").reverse().join("");

        res.push(parseInt(first + second));
      } else {
        let first = temp.toString();
        let second = temp
          .toString()
          .slice(0, Math.floor(length / 2))
          .split("")
          .reverse()
          .join("");
        console.log(first, second, temp, "-----");
        res.push(parseInt(first + second));
      }
    } else {
      res.push(-1);
    }
  }
  return res;
}
console.log(kthPalindrom([1, 2, 3, 4, 5, 90, 99], 3));
