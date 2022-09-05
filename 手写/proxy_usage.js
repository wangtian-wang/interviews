const source = {
  sum: 0,
};
const add = new Proxy(source, {
  get(target, prop, receive) {
    if (prop === Symbol.toPrimitive) {
      // 代理对象add + 30 时,隐式转换 会调用Symbol.toPrimitive 方法 所以给add 增加一个属性
      let res = target.sum;
      target.sum = 0;
      return () => res;
    } else {
      target.sum += Number(prop);
      // 因为下面访问的是代理对象中的属性,而且是链式访问 所以将每次访问的属性 存到 target.sum上面
      return receive;
    }
  },
});

const res = add[10][20] + 30; // 60
console.log(res);
