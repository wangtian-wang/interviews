/**
  给定一个数字字符串 将这个数字字符串 组合为合法的IP地址 最多能解析成功几个有效的IP地址
  example  str = '11101'
  ip = ['1.1.10.1', '1.11.0.1','11.1.0.1']
 */

// 验证是否为合法的IP
const isValid = (str) => {
  // 值等于0的时候 长度为 1
  const one = +str === 0 && str.length === 1;
  // 值大于0的时候, 第一个字符串不能是0
  const two = +str > 0 && str.charAt(0) !== "0";
  // 值<= 255
  const three = +str <= 255;
  return (one || two) && three;
};
// 假如 递归里面有异步函数 递归的结果是怎样的呢?
const resolveIp = (str) => {
  const result = [];
  if (str.length < 4 || str.length > 12) {
    return result;
  }

  /**
   *
   * @param str 剩余待处理字符串, 会动态截取 直到长度为0
   * @param count 当前IP段数,从1开始,如果完成了4段分割,并且字符串全部截取完成,则代表处理完成
   * @param out 每轮处理输出的IP值,中间轮 ,需要添加,需要添加.,最后一轮,不需要添加.
   * @param result 最终结果 递归过程中 动态更新结果
   */
  function handleIp(str, count, out, result) {
    if (count === 5) {
      // 字符串的长度已经处理完成
      if (str.length === 0) {
        result.push(out);
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        if (str.length < i) break;
        const v = str.substr(0, i);
        if (!isValid(v)) break;
        const newOut = out + v + (count === 4 ? "" : ".");
        handleIp(str.substr(i), count + 1, newOut, result);
      }
    }
  }
  handleIp(str, 1, "", result);
  return result;
};

function resolveIp1(str) {
  const result = [];
  if (str.length < 4 && str.length > 12) {
    return result;
  }
  for (let a = 1; a < 4; a++) {
    for (let b = 1; b < 4; b++) {
      for (let c = 1; c < 4; c++) {
        const d = str.length - a - b - c;
        if (d >= 1 && d <= 3) {
          const one = str.substring(0, a);
          const two = str.substring(a, a + b);
          const three = str.substring(a + b, a + b + c);
          const four = str.substring(a + b + c);
          if (isValid(one) && isValid(two) && isValid(three) && isValid(four)) {
            result.push(`${one}.${two}.${three}.${four}`);
          }
        }
      }
    }
  }
  return result;
}
// test example
const str = "11101";
let result = resolveIp(str);
let res2 = resolveIp1(str);
console.log(result, "ip result");
console.log(res2, "res 2");
