/**
 关于const 的误解
    const 不是被用来声明常量 而是因为const 声明的变量 不能被重新更改引用 
 */
/**利用es5 实现一个const */
const _const = (key, val) => {
  window.key = val;
  Object.defineProperty(window, key, {
    enumerable: false,
    configurable: false,
    get() {
      return val;
    },
    set() {
      throw new TypeError("Assigment to constant variable is not allowed");
    },
  });
};
const a = _const("a", 10);

console.log(a, "----");
/**利用es5 实现一个let */
(function () {
  var number = 123;
})();
console.log(number); //number ins not defined
