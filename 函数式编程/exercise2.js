// 重点关注 管道化后 管道函数的调用; 科里化后的函数参数传递的先后顺序(实参与形参的位置--对应)

const ffun = (a, b, c) => {
  console.log(` a is ${a}; b is ${b}; c is ${c}`);
  return a + b + c;
};
const bfun = (d, e) => {
  console.log(` d is ${d}; e is ${e}`);
  return d + e;
};
const hfun = (f, g, h) => {
  console.log(` f is ${f}; g is ${g}; h is ${h}`);
  return f + g + h;
};
// way one
const curriedF = curryPart(ffun);
const curriedB = curryPart(bfun);
const curriedH = curryPart(hfun);
const newFun = pipe(curriedF(1)(2), curriedB(4), curriedH(5)(6));
// console.log(newFun(3));

// way two
const newFun2 = pipe(
  curryPart(ffun)(1)(2),
  curryPart(bfun)(4),
  curryPart(hfun)(5)(6)
);
// console.log(newFun2(3));

const doubleNum = (num) => {
  return num + num;
};
const totalIt = (a, b, c, d) => {
  return a + b + c + d;
};
const doArray = (num1, num2) => {
  return [num1, num2];
};

const pipeNum = pipe(
  doubleNum,
  curryPart(totalIt)(3)(2)(1),
  curryPart(doArray)(50)
);
// console.log(pipeNum(5));

// 偏函数的示例
const list = (lastJoin, ...items) => {
  const commaSeparated = items.slice(0, -1).join(", ");
  const lastItem = items.pop();
  console.log("last join sign:", lastJoin);
  console.log("item:", ...items);
  return `${commaSeparated} ${lastJoin} ${lastItem}`;
};
const listAnd = partial(list, "and");
const res = listAnd("red", "green", "blue");
console.log(res);
