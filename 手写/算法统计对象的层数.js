function getObjectNest(object = {}) {
  let result = 1;
  function getLevel(obj, level = 0) {
    if (typeof obj === "object" && obj !== null) {
      Object.values(obj).forEach((item) => {
        if (typeof item === "object" && item !== null) {
          getLevel(item, level + 1);
        } else {
          result = level + 1 > result ? level + 1 : result;
        }
      });
    } else {
      result = level > result ? level : result;
    }
  }
  getLevel(object);
  return result;
}
/** test example */
const obj = {
  a: {
    b: {
      c: "cc",
    },
  },
  b: {
    b: {
      c: "c",
    },
  },
};
let result = getObjectNest(obj);
console.log(result);
