/**
 分清楚到底以那个对象的属性为准
 - 可能会出现的几种情况
    A option  B target (以B的属性为准)
    1: A B中的相同的属性都是原始值, B中的属性替换A即可
    2: A 是对象 B为原始值 ,抛出异常
    3: A 原始值 B对象 B中的属性替换A
    4: A B 中的属性都是对象; B中的属性替换A中的属性 注意嵌套对象的情况
 */

function isObj(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

// target中的属性替换 option
function mergeObject(option, target) {
  for (let k in target) {
    if (target.hasOwnProperty(k)) {
      let isA = isObj(option[k]),
        isB = isObj(target[k]);
      if (isA && !isB) throw new TypeError(`${k} in target must be an object`);
      if (isA && isB) {
        console.log(k, option, "k");
        // key 为address的时候,开启了一个递归,等这个递归执行返回结果后 属性address才会有值
        // key 为class的时候,又开启了一个递归,执行过程如上所示
        option[k] = mergeObject(option[k], target[k]);
      }
      option[k] = target[k];
    }
  }
  console.log(option); //  将多次调用的递归函数加入到栈顶,然后弹栈(后加入的函数先执行)
  return option;
}

let obj1 = {
  name: "xiaoming",
  adress: {
    mile: 100,
    class: {
      pe: 300,
    },
  },
};
let obj2 = {
  name: "xiaohong",
  adress: {
    mile: 500,
    class: {
      pe: 200,
      car: {
        blue: "benz",
      },
    },
  },
};
console.log(mergeObject(obj1, obj2), "finally result");
