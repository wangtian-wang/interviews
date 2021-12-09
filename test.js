const obj1 = {
  name: "peter",
  age: 12,
  hobbies: "playing pingpang",
  arr: [1, 2, 3],
  //   gift: Symbol("obj1"),
  reg: /\w$/gim,
};
const obj2 = {
  name: "bob",
  hobbies: "playing pingpang",
  age: 13,
};
const obj3 = {
  name: "peter",
  age: 12,
  arr: [1, 2, 3],
  hobbies: "playing pingpang",
  //   gift: Symbol("obj3"),
  reg: /^\d$/gim,
};

const menuOriginal = [
  { id: 1, name: "商品管理" },
  { id: 2, name: "批量管理", parentId: 1 },
  { id: 3, name: "类目管理", parentId: 1 },
  { id: 8, name: "多级类目设置", parentId: 3 },
  { id: 4, name: "店铺设置" },
  { id: 5, name: "上架国家", parentId: 4 },
  { id: 7, name: "退货地址", parentId: 4 },
];
function formatData(data = []) {
  const parentArray = data.filter((p) => p.parentId === undefined);
  const children = data.filter((c) => c.parentId !== undefined);
  function handleTree(parent, children) {
    parent.map((p, idx) => {
      children.map((c, i) => {
        if (c.parentId === p.id) {
          let _children = JSON.parse(JSON.stringify(children));
          _children.splice(i, 1);
          handleTree([c], _children);
          p.children ? p.children.push(c) : (p.children = [c]);
        }
      });
    });
  }
  handleTree(parentArray, children);
  return parentArray;
}
// let res = formatData(menuOriginal);
// console.log(res);

// let url = "https://bytedance.com/?name=info&select=1,3,7#second-section";

// const url0 = new URL(url);
// let obj = {};
// let arr = url0.search.substring(1).split("&");
// arr.forEach((c) => {
//   let arr = c.split("=");
//   if (arr[0] === "select") {
//     obj[arr[0]] = arr[1].split(",").map((c) => Number(c));
//   } else {
//     obj[arr[0]] = arr[1];
//   }
//   console.log(arr);
// });
// console.log(obj);
const url = "https://bytedance.com/?name=info&select=1,3,7#second-section";
// 出参格式参考：
const result = { name: "info", select: [1, 3, 7] };
function handleFormatUrl(url) {
  let obj = {};
  const urlObj = new URL(url);
  const urlArr = urlObj.search.substring(1).split("&");
  urlArr.forEach((c) => {
    let tempArr = c.split("=");
    if (tempArr[0] === "select") {
      obj[tempArr[0]] = tempArr[1]
        .split(",")
        .map((c) => (Number(c) ? Number(c) : c));
    } else {
      obj[tempArr[0]] = tempArr[1];
    }
  });

  return obj;
}
let res = handleFormatUrl(url);
console.log(res);
function arrange(str) {
  return new Arrange(str);
}
class Arrange {
  constructor(name) {
    this.name = name;
    this.delay = 0;
    console.log(this.name + `醒了`);
  }
  execute = function (work) {
    console.log(this.name + "开始" + `<${work}>`);
    return this; // 实现链式调用
  };
  sleep = function (delay) {
    this.delay = delay;
    console.log(`${this.name} 开始睡觉<${this.delay}毫秒>`);
    return this;
  };
  wait = function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${this.name}睡了<${this.delay}毫秒>`);
        resolve();
      }, this.delay);
    });
  };
  start = async function () {
    await this.wait();
    console.log(`${this.name}开始<写代码>`);
    console.log(`${this.name}结束了今天的工作`);
  };
}
arrange("Bob").execute("写代码").sleep(5000).execute("写代码").start();
