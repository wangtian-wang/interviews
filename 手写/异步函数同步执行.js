/** 实现异步函数像同步函数一样执行 */

const add = (x) => x + 5;
const mul = (x) => x * 5;
const substruct = (x) => x - 5;

const pipeFunctions = (...args) => {
  return args.reduce((prev, cur) => {
    return (...params) => {
      const res = prev(...params);
      return cur(res);
    };
  });
};
const targetFn = pipeFunctions(add, mul, substruct);
let result = targetFn(5);
console.log(result);
const asycnFn = (v) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(v);
    }, 1000);
  });
};
const add1 = async (x) => await asycnFn(x + 5);
const mul1 = async (x) => await asycnFn(x * 5);
const substruct1 = async (x) => await asycnFn(x - 5);
const asyncPipeFunctions = (...args) => {
  return args.reduce((prev, cur) => {
    return async (...params) => {
      const res = await prev(...params);
      return cur(res);
    };
  });
};
const targetFn1 = asyncPipeFunctions(add1, mul1, substruct1);
let result1 = await targetFn1(5);
console.log(result1);
