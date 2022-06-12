Array.prototype.isEquals = function isEquals(arr) {
  if (!arr) {
    return false;
  }
  if (this.length !== arr.length) {
    return false;
  }
  s;
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i]) && Array.isArray(arr[i])) {
      if (!this[i].isEquals(arr[i])) {
        return false; /*  */
      }
    } else {
      if (this[i] !== arr[i]) {
        return false;
      }
    }
  }
  return true;
};
Object.defineProperty(Array.prototype, "isEquals", {
  enumerable: false,
});

const hh = ["a", "b", ["c", "d"], "e"];
const arr = ["1", 2];
const arr4 = ["a", "b", ["c", "d"], "e"];
console.log(arr.isEquals(arr2));
console.log(arr3.isEquals(arr4));

// 思考 为啥在递归函数中 需要将  return 递归函数的调用结果ss
