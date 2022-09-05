/**
 new Number(2) 包装类 原始值为2  
 console.log(new Number(2) == 2)  true;
 */

/**
 * 对于undefined 和 null 的 合并非空判断
   null == undefined 
   if(target == undefined)  ----> 成立条件   target = null | target = undefined

   是否是函数的判断方法
   const isFunction = (target) => {
  return target.constructor === "Function";
};
 不同内置类型的判断方法
if (/^(regexp|data)$/i.test(type)) return new constructor(target);
if (/^(error)$/i.test(type)) return new constructor(target.message);
if (isFunction(target))
  return function (...args) {
    return target.call(this, ...args);
  };

JSON.stringify()
1 bigint类型的值是无法装换的
2 如果属性值是 undefined symbol function等类型 会丢失这些属性值对应的属性，当属性名为symbol的时候 会消失这个属性
3： error regexp这些类型的 属性值对应的属性会变为空对象
4 对于属性值类型是 data类型的 会将属性值变为字符串 即使再次变为对象 属性值还是字符串

*/

/**
  浅拷贝:
    - 数组浅拷贝
        [...arr]
        arr.concat();
        arr.slice()
    - 对象浅拷贝
       {...}
       object.assgin()
       循环对象,拿到对象中的属性 和值 放到另外一个对象中
       - 缺点: 
        对于symbol类型的key, object.assgin() 和 for in 都不能拿到
        getOwnPerportySymbols() -> 获取symbol类型的key
 */

const testObj = {
  age: 32,
  wife: {
    age: 22,
    height: 168 + "cm",
  },
  date: new Date(),
  fn: function () {},
  bigNum: Infinity,
  arr: [1, 2, 3, 4],
};
testObj.obj = testObj;
//循环引用;

// new WeakMap() 解决循环引用  map的key是对象, value为对key 的拷贝
//  递归拷贝对象的时候 会先从map里面寻找 key是都已经被拷贝 会直接从map里面拿出key的拷贝    不再递归的执行程序
const deepClone = (target, hashMap = new WeakMap()) => {
  if (target == undefined || typeof target !== "object") {
    console.log(target, "-----");
    return target;
  }
  if (target instanceof RegExp) {
    return new RegExp(target);
  }
  if (target instanceof Date) {
    return new Date(target);
  }
  if (hashMap.get(target)) {
    return hashMap.get(target);
  }
  let result = new target.constructor(); // 只有当这个target为引用类型值时候，才会重生生成result
  hashMap.set(target, result);
  for (let k in target) {
    if (target.hasOwnProperty(k)) {
      result[k] = deepClone(target[k], hashMap);
    }
  }
  return result;
};
// const rs = deepClone(testObj);
// console.log(rs, "as before");
// testObj.fn = function num() {};
// console.log(rs, "rs after");

// 实现深浅拷贝的可选
const clone = (target, deep = false, cache = new WeakMap()) => {
  if (target == null) return target; // target = null || target = undefined
  let type = Object.prototype.toString.call(target);

  if (target == undefined || typeof target !== "object") {
    return target;
  }
  if (typeof target === "symbol") {
    return target;
  }
  let ctor = target.constructor;
  if (type === "[object RegExp]" || type === "[object Date]")
    return new ctor(target);
  if (type === "[object Function]")
    return function (...args) {
      return target.call(this, args);
    };
  if (type === "[object Error]") return new ctor(target.message);
  if (cache.get(target)) {
    return cache.get(target);
  }

  let result;
  if (type === "[object Object]") {
    result = {};
    cache.set(target, result);
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        if (deep) {
          result[key] = clone(target[key], deep, cache);
        } else {
          result[key] = target[key];
        }
      }
    }

    return result;
  }
  if (type === "[object Array]") {
    target = [];
    cache.set(target, result);
    target.forEach((item, index) => {
      if (!deep) {
        result[index] = item;
      } else {
        result[index] = clone(item, deep, cache);
      }
    });
    return result;
  }
};

function deepClone2(obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return obj;
  }
  let res = null;
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];

  if (reference.includes(obj?.constructor)) {
    res = new obj.constructor(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    obj.forEach((e, i) => {
      res[i] = deepClone2(e);
    });
  } else if (typeof obj === "Object" && obj !== null) {
    res = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        res[key] = deepClone2(obj[key]);
      }
    }
  } else {
    res = obj;
  }
  hash.set(obj, res);
  return res;
}
const rs = clone(testObj);
console.log(rs, "as before");
testObj.fn = function num() {};
console.log(rs, "rs after");
