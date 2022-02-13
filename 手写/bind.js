Function.prototype._bind = function (obj) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  var args = Array.prototype.slice.call(arguments, 1);
  var fn = this; // 指的是传入进来的原函数
  //创建中介函数
  var fn_ = function () {};
  var bound = function () {
    var params = Array.prototype.slice.call(arguments);
    //通过constructor判断调用方式，为true this指向实例，否则为obj
    fn.apply(obj ? obj : null, args.concat(params));
  };
  fn_.prototype = fn.prototype;
  bound.prototype = new fn_();
  return bound;
};

var obj = { name: "bob" };
function fn(a, b) {
  console.log(this.name, "111111");
  return a + b;
}
const fn1 = fn._bind(null, 1, 2);
console.log(fn1());
