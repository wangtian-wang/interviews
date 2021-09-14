/**
  point free 把数据的处理过程 定义成一种和参数无关的合成运算
  引入compose函数 从 cdn里面
  point free means never having to say your data
  无值函数  函数返回函数 进行传参  典型案例 ： 闭包
 */
let money = 500;
function buyApple(money) {
  return money - 100;
}
function buyPear(money) {
  return money - 100;
}
let fn = _.composeArgs(buyApple, buyPear);
let left = fn(money);
console.log(left);
