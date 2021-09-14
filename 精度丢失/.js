/**     js 会产生精度丢失的原因： 计算机里面 二进制 对整数和小数的处理方式不同导致的
        js 里面的Number都是 64 位 双精度浮点数
        js 里面的最大数是 2^1024-1
        js 里面最大安全数  2^52 16位数
        number-precisous 一个包 可以很方便的对于精度 进行处理
 */
function add(num1, num2) {
  var num1Len = num1.toString().split(".")[1].length;
  var num2Len = num2.toString().split(".")[1].length;
  var baseNum = Math.pow(10, Math.max(num1Len, num2Len)); // 放大一定的倍数 进行操作后 还原
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
