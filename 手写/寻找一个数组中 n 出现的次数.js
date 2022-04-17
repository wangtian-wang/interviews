var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "12-3"];
// '12'.split('') [1, 2]   split('')参数空字符串  将字符串每一项都拆分为数组
//"12-3".split('-')  ['12', '3']   split('-')参数为连接符字符串  在连接符号处 将字符串拆分为数组  / 连接符号不合法或者split无参数  将整个字符串拆分为数组

arr = arr.map((item) => item + "");
arr.forEach((item) => {
  console.log(item.split("-"));
});
//   let num = 1 ;   reg =  /mum/g ; 这样的写法不行 会报错的.
function getNumsTime(length, num) {
  let arr = Array.from({ length }).map((v, i) => i + 1);
  return arr.reduce((prev, cur) => {
    const count = String(cur).match(/1/g);
    if (count) {
      return prev + count.length;
    } else {
      return prev;
    }
  }, 0);
}
let res = getNumsTime(11, 1);
function getNumsTimeTwo(length, num) {
  let arr = Array.from({ length }).map((v, i) => i + 1);
  return arr.reduce((prev, cur) => {
    let res = String(cur)
      .split("")
      .filter((item) => item == num);
    if (Array.isArray(res) && res.length > 0) {
      return prev + res.length;
    } else {
      return prev;
    }
  }, 0);
}
let res1 = getNumsTimeTwo(11, 1);
console.log(res1, "res1 res1");

/**
 算法实现过程

t  为当前位的值
x  为目标值 x = 1
1. t > x   => (高位 + 1) * 10 ^ ( n -1)
2. t === x  => 高位 * 10 ^( n -1) + 低位 + 1
3. t < x    => 高位 * 10 ^ ( n -1)

2333 -> 按高位 + 当前位 + 低位 拆分
高位    当前位      低位
233     3(个位)     0   有233个10 (233 + 1) * 1 = 234;
 23     3(十位)     3   有23个100 (23 +1) * 10 + 3 +1 = 240;
  2     3(百位)     33  有2个1000( 2 + 1) * 100 = 30
  0     2(千位)     333 有0 个1000 ( 0 + 1) * 1000 = 1000;

  total = 234 + 240 + 300 + 1000 = 1774;




 */
/**
 *
 * @param {number} n 目标数字
 * @param {number} x 要在目标数里面找的数
 */
function getNumsTimeThree(n, x) {
  let factor = 1,
    count = 0,
    next = parseInt(n / factor);
  while (next !== 0) {
    let lower = n - next * factor;
    let cur = next % 10;
    let high = parseInt(n / (factor * 10));
    if (cur > x) {
      count += (high + 1) * factor;
    } else if (cur === x) {
      count += high * factor + lower + 1;
    } else {
      count += high * factor;
    }
    factor *= 10;
    next = parseInt(n / factor);
  }
  return count;
}
let res3 = getNumsTimeThree(11, 1);
console.log("res3", res3);
