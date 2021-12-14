// console.log(new Number(2) == 2)  true;

/**
 new Number(2) 包装类 原始值为2    
 */

/**
 * 对于undefined 和 null 的 合并非空判断
   null == undefined 
   if(target == undefined)  ----> 成立条件   target = null | target = undefined
  */
const testObj = {
  age: 32,
  wife: {
    age: 22,
    height: 168 + "cm",
  },
  arr: [1, 2, 3, 4],
};
// testObj.gf = testObj;

// new WeakMap() 解决循环引用 而产生的死循环
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
