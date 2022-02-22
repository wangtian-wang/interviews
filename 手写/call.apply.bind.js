/**call */
Function.prototype._call = function _call(context, args) {
  let fn = Symbol();
  context = context || window;
  context[fn] = this;
  const result = context[fn](args);
  delete context.fn;
  return result;
};
const obj = {
  age: "obj",
};
function print(...words) {
  console.log(this.age, ...words);
}
//test;
print._call(obj, "-------");
print._call(null, "-----------");
print();

/** apply  因为ES5不兼容拓展运算符 所以不要采用拓展运算符的写法                 */
Function.prototype._apply = function _apply(context, argus) {
  let fn = Symbol();
  context = context || window;
  context[fn] = this;
  let result = context[fn](Array.prototype.slice.call(arguments, 1));
  delete context.fn;
  return result;
};
// test
print._apply(obj, [1, 2, 3, 4]);
print._apply(null, ["a", "b", "c", "d"]);
print(1, 2, 3, 4, 5);
/** 利用闭包将this强制绑定到第一次更改的对象上面 */
Function.prototype._bind = function () {
  var fn = this,
    _this = arguments[0],
    params = Array.prototype.slice.call(arguments, 1);
  function o() {}
  function bound() {
    let argus = params.concat(Array.prototype.slice.call(arguments, 0));
    if (this instanceof o) {
      // 将this绑定到当前new bound实例上面
      return fn.apply(this, argus);
    }
    return fn.apply(_this, argus);
  }
  o.prototype = fn.prototype;
  bound.prototype = new o();
  return bound;
};

let res = print._bind(obj, 1, 2);
let p = new res("a");
console.log(p);
