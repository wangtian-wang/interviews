const num = 1234567;
function thousandsNum(num) {
  num = num.toString();
  let result = "";
  while (num.length > 3) {
    result = "," + num.substring(num.length - 3) + result;
    num = num.substring(0, num.length - 3);
  }
  result = num + result;
  return result;
}
console.log(thousandsNum(num));
