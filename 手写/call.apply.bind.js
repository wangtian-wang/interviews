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
  name: "obj",
};
function print(...words) {
  console.log(this, "this in print");
  console.log(this.name, ...words, "-----");
}
//test;
// print._call(obj, "-------");
// print._call(null, "-----------");
// print();

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
// print._apply(obj, [1, 2, 3, 4]);
// print._apply(null, ["a", "b", "c", "d"]);
// print(1, 2, 3, 4, 5);
/** 利用闭包将this强制绑定到第一次更改的对象上面 */
Function.prototype._bind = function () {
  var fn = this,
    _this = arguments[0],
    params = Array.prototype.slice.call(arguments, 1);
  function o() {} // 为了在bound函数内部判断 bind是否被new 了, 好让this指向失效.
  function bound() {
    let argus = params.concat(Array.prototype.slice.call(arguments, 0));
    if (this instanceof o) {
      console.log("this in bound", this);
      // bind可以被 new   将this绑定到 fn上面 ;因为new 后 ,this会失效
      return fn.apply(this, argus);
    }

    console.log(_this, "----- this---");
    return fn.apply(_this, argus);
  }
  o.prototype = fn.prototype;
  bound.prototype = new o();
  return bound;
};

let res = print._bind(obj, 1, 2);
let p = new res("a"); // res 实例化的对象 原型链上面没有name 属性
// let p1 = res("a");
console.log(p, "p result");
// soft bind

/**
soft bind与 bind的区别是 
bind只能绑定一次 this 内部怎样实现的
参数科里化
返回一个新函数 bound 原始函数在bound内部被执行,所以外界不能操作 原始函数
this不能修改
bind 内部修改原型链的指向 作用何在?  bind函数可以被 new 所以要修改原型链

new  bind() 返回的函数,会使得原始函数中的this失效
 */
Function.prototype.softBind = function softBind(obj, ...rest) {
  const fn = this;
  const bound = function (...args) {
    const o = !this || this === (window || global) ? obj : this;
    return fn.apply(o, [...rest, ...args]);
  };
  bound.prototype = Object.create(fn.prototype);
  return bound;
};
function foo() {
  console.log(" this name is :", this.name);
}
let obj1 = { name: "obj" };
obj2 = { name: "obj2" };
obj3 = { name: "obj3" };

// let fooBJ = foo.softBind(obj1);
// fooBJ(); // name: obj   这个时候软绑定已经生效了，this绑定到obj上
// obj2.foo = foo.softBind(obj1);
// obj2.foo(); //name: obj2   这里已经的this隐式绑定到obj2上了
// fooBJ.call(obj3); // name: obj3  这里this被硬绑定到obj3上了
// setTimeout(obj2.foo, 100); // name: obj  软绑定了最初的obj
