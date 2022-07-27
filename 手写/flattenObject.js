const obj = {
  a: {
    b: {
      c: {
        dd: "abcd",
      },
    },
    d: {
      e: {
        ee: "adeee",
      },
    },
    f: "af",
  },
};

function flatterObject(obj, prevKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = `${prevKey}${key}`;
      if (typeof obj[key] === "object") {
        flatterObject(obj[key], `${newKey}.`, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}
// console.log(flatterObject(obj));

const output = {
  "a.b.c.dd": "abcd",
};
function objToTree(obj) {
  for (const key in obj) {
    getNest(key);
  }
  function getNest(key) {
    let index = key.lastIndexOf(".");
    let value = obj[key];
    if (index !== -1) {
      delete obj[key];
      let prevKey = key.substring(0, index);
      let restKey = key.substring(index + 1);
      if (!obj[prevKey]) {
        obj[prevKey] = {
          [restKey]: value,
        };
      } else {
        obj[prevKey][restKey] = value;
      }
      if (/./.test(prevKey)) {
        getNest(prevKey);
      }
    }
  }

  return obj;
}
// console.log(objToTree(output));

// obj.name = "xxxx";
// for (const key in obj) {
//   console.log(key);
// }
// 判断参数是否是普通的对象
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isEmptyObject(obj) {
  return typeof obj === "object" && JSON.stringify(obj) === "{}";
}

Object.defineProperty(Object, "flatten", {
  enumerable: false,
  writable: false,
  configurable: false,
  value: function flatten(value) {
    let result = {};
    const flat = function flat(obj, attr) {
      let isArray = Array.isArray(obj),
        isObject = isPlainObject(obj);
      if (isArray || isObject) {
        if (isObject && isEmptyObject(obj)) {
          result[attr] = {};
          return;
        }
        if (isArray && obj.length === 0) {
          result[attr] = [];
          return;
        }
        if (!isObject) {
          console.log(obj, " not obj");
        }
        if (isObject) {
          for (let key in obj) {
            flat(obj[key], attr ? attr + `.${key}` : key);
          }
          return; // 这为啥要return呢? 不return的话 出来的结果不对
        }
      }

      result[attr] = obj;
    };
    flat(value, "");
    return result;
  },
});
console.log(Object.flatten(obj));
console.log(obj.__proto__);
