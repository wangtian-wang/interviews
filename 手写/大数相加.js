function bigNumPlus(num1, num2) {
  const arr1 = num1.split("").reverse();
  const arr2 = num2.split("").reverse();
  const result = [],
    length = Math.max(arr1.length, num2.length);
  let flag = 0;
  for (let i = 0; i < length; i++) {
    const number1 = Number(arr1[i]) || 0;
    const number2 = Number(arr2[i]) || 0;
    let sum = number1 + number2 + flag;
    if (sum >= 10) {
      sum = sum % 10; //加法的结果大于10 表示需要进位 将不需要进位的数字留下
      flag = 1;
    } else {
      flag = 0;
    }
    result.push(sum);
    if (i === length - 1 && flag) {
      result.push(flag);
    }
  }
  return result.reverse().join("");
}
const num1 = "672345678912827";
const num2 = "893718678927819";
console.log(bigNumPlus(num1, num2));
