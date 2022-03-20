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
  b;
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
console.log(objToTree(output));
