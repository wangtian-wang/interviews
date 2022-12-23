/**  
 reduce 复习
 let result = [0, 1, 2, 3, 4].reduce((prev, cur, index) => {
  // reduce 函数 内部 return 的任何值 会作为下一个元素的 prev
  return 100;
}, 0);
数组浅拷贝复习    [...arr]
适用： 数组元素不包含对象  适用数组方法改变复制后的数组 不会影响源数组
 */
// 数组扁平化
let arr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, 4, [5, 6, 7, 8, [9, 10, 11, 12]]],
  "a",
  "b",
  "c",
];
// 方法一 ：  Array.flat(Infinity);
// 方法二 ：
const reduceFlat = (arr) => {
  if (!Array.isArray(arr)) return `target ${arr} must be an array`;
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return [...prev, ...reduceFlat(cur)];
    }
    return [...prev, cur];
  }, []);
};

// 实现一个flat
const flat = (arr, deep = 1) => {
  return deep > 0
    ? arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          return [...prev, ...flat(cur, deep - 1)];
        }
        return [...prev, cur];
      }, [])
    : new Error(` target ${arr} must be an array！`);
};

// 方法三 ：  栈结构;

const flattenDeep = (arr) => {
  const result = [];
  const stack = [...arr];
  while (stack.length > 0) {
    const cur = stack.pop();
    if (Array.isArray(cur)) {
      stack.push(...cur);
    } else {
      // 将 栈尾 元素 插入到 result 首部 ，保证源数组顺序不变
      result.unshift(cur);
    }
  }
  return result;
};
const repeatArr = [1, 1, 2, 2, 5, 1, 1, 4, 5, 5];
// 数组去重
// 方法一 ： Array.from(new Set(arr))
// 方法三 ：  reduce;
const RUnique = (arr) => {
  return arr.sort().reduce((prev, cur) => {
    if (prev.length === 0 || prev[prev.length - 1] !== cur) {
      prev.push(cur);
    }
    // 当数组前后两项的元素相等时， 则 返回前一项元素 确保每种情况都有返回值
    return prev;
  }, []);
};
// console.log(RUnique(repeatArr));

// 方法三 ：  filter + indexOf   indexOf  / lastIndexOf 只能找出某个元素在数组第一次(最后一次)出现的索引

const filterUnique = (arr) => {
    return arr.filter((elem, index, arr) => {
      return arr.lastIndexOf(elem) === index
    // return arr.indexOf(elem) === index;
  });
};
// console.log(filterUnique(repeatArr));
console.log(repeatArr.indexOf(1))