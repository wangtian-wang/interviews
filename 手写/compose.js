// 异步的compose函数
const compose = (middlewares) => (initialValue) =>
  middlewares.reduceRight((prev, cur) => cur(prev), initialValue);
const asyncCompose = (middlewares) => (initialValue) =>
  middlewares.reduceRight(
    (accu, cur) => accu.then((res) => cur(res)),
    Promise.resolve(initialValue)
  );
// 测试代码
const add = (val) => Promise.resolve(2 + val);
const mul = (val) => Promise.resolve(2 * val);
const sub = (val) => Promise.resolve(val - 2);
const fn = asyncCompose([add, mul, sub]);
const res = fn(6);
res.then((res) => {
  console.log(res, "-----");
});
