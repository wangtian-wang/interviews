const getObjectAttr = (obj, attr) => {
  let data = obj;
  // "a/b/c/" 会返回undefined 对于最后一个没有意义的/ 做处理
  //   attr = attr.substring(0, attr.lastIndexOf("/"));
  if (attr.lastIndexOf("/") + 1 === attr.length) {
    attr = attr.substring(0, attr.lastIndexOf("/"));
  }
  while (attr.includes("/")) {
    const arrAttr = attr.split("/");
    const curAttr = arrAttr[0];
    data = data[curAttr];
    attr = arrAttr.slice(1).join("/");
  }
  console.log(attr, `finally : the  attr is ${attr}`);
  return data[attr];
};
const obj = {
  a: {
    b: {
      c: "ccccccc",
    },
  },
};
const getObjectAttrRecurion = (obj, attr) => {
  // if  else是互斥语句 想要拿到当前函数的执行结果 就必须每个分支都返回一个结果
  if (!attr.includes("/")) {
    console.log("  不用递归的情况  直接返回递归的最终结果-------", obj[attr]);
    return obj[attr];
  } else {
    const arrAttr = attr.split("/");
    const curAttr = arrAttr[0];
    const attrStr = arrAttr.slice(1).join("/");
    console.log("   需要递归的情况    拿到递归的结果返回 ----", attr);
    let res = getObjectAttrRecurion(obj[curAttr], attrStr);
    return res;
  }
};
const result = getObjectAttrRecurion(obj, "a/b");
// const result1 = getObjectAttrRecurion(obj, "a/b/c/");
console.log("result", result);
