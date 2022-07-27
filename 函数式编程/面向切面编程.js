/**
 概念: 
 将与核心业务无关的功能抽离, 再通过'动态植入的方式渗入业务模块'
 */
Function.prototype.before = function before(beforefn) {
  if (typeof beforefn !== "function")
    throw new TypeError("beforefn must bn a function");
  let _ = this;
  return function inner(...params) {
    beforefn(...params);
    return _.call(this, ...params);
  };
};
Function.prototype.after = function after(afterfn) {
  if (typeof afterfn !== "function")
    throw new TypeError("afterfn must bn a function");
  let _ = this;
  return function inner(...params) {
    let res = _.call(this, ...params);
    afterfn.call(this, ...params);
    return res;
  };
};
/**     test 案例 */
const obj = {};
let fun = () => {
  console.log("fun");
};
fun = fun
  .before(() => {
    console.log("before fn ");
  })
  .after(() => {
    console.log("after fn");
  });
fun();
