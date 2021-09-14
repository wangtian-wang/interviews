/** compose ： 由 纯函数 偏函数 柯力化函数 形成数据传递 并实现一种有序执行的结果 */
function toUpperCase(str) {
  return str.toUpperCase();
}
function exclaim(str) {
  return str + "!";
}
function compose(f, g) {
  return function (x) {
    return f(g(x)); // 左倾函数  ： 函数 调用 里面的参数 是 执行一个带参数的函数  compose 函数从右向左执行
  };
}
var f = compose(exclaim, toUpperCase); //
console.log(f("world"));
function superCompose() {
  let args = Array.from(arguments),
    len = args.length - 1;
  return function (x) {
    let res = args[len](x);
    while (len--) {
      res = args[len](res);
    }
    return res;
  };
}
var f1 = superCompose(exclaim, toUpperCase); //
console.log(f1("wowowow"));
function reduceCompose() {
  let argus = Array.from(arguments);
  return function (p) {
    argus.reduceRight((prev, cb) => {
      return cb(prev);
    }, p);
  };
}
