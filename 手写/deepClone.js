// console.log(new Number(2) == 2)  true;

/**
 new Number(2) 包装类 原始值为2    
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
const testObj = {
  age: 32,
  wife: {
    age: 22,
    height: 168 + "cm",
  },
  arr: [1, 2, 3, 4],
};
// testObj.gf = testObj;  循环引用

// new WeakMap() 解决循环引用 而产生的
const deepClone = (target, hashMap = new WeakMap()) => {
  if (target == undefined || typeof target !== "object") {
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
  console.log(result);
  hashMap.set(target, result);
  for (let k in target) {
    if (target.hasOwnProperty(k)) {
      result[k] = deepClone(target[k], hashMap);
    }
  }
  return result;
};
console.log(deepClone(testObj));

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
