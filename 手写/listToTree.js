/**
 * 扁平化的数据必须要经过遍历处理 ;在最少次使用遍历的情况下 可以减少时间复杂度,
 * 使用map数据结构,将源数据处理成为更容易查找的数据
 */

const menuOriginal = [
  { id: 1, name: "商品管理" },
  { id: 2, name: "批量管理", parentId: 1 },
  { id: 3, name: "类目管理", parentId: 1 },
  { id: 8, name: "多级类目设置", parentId: 3 },
  { id: 4, name: "店铺设置" },
  { id: 5, name: "上架国家", parentId: 4 },
  { id: 7, name: "退货地址", parentId: 4 },
];

/**
  1: 递归处理
 */

function formatTree(array) {
  if (!Array.isArray(array)) {
    return "arguments must be an array";
  }
  const parent = array.filter((item) => item.parentId === undefined);
  const children = array.filter((item) => item.parentId !== undefined);
  function recuseFormat(parent, child) {
    parent.forEach((p) => {
      child.forEach((c, i) => {
        if (p.id === c.parentId) {
          let _children = JSON.parse(JSON.stringify(children));
          _children.splice(i, 1);
          recuseFormat([c], _children); //  当前的c 可能还有孩子
          p.children ? p.children.push(c) : (p.children = [c]);
        }
      });
    });
  }
  recuseFormat(parent, children);
  return parent;
}
// console.log(formatTree(menuOriginal));
// 该方法省去了递归调用,比较简单 建议使用该方法
function treeFormat(arr) {
  let map = {};
  arr.forEach((item) => {
    map[item.id] = item;
  });
  const result = [];
  arr.forEach((item) => {
    let parent = map[item.parentId];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      result.push(item);
    }
  });
}
// let result = treeFormat(menuOriginal);
// console.log(result, "-------");

/**
  缺点: 该方法的时间复杂度比较高 为o(N^2) 因为使用了嵌套循环
 */
const listToTree = function listToTree(data) {
  let parent = data.filter((item) => item.parentId === undefined);
  parent.forEach((item) => {
    let child = data.filter((child) => child.parentId === item.id);
    if (child.length > 0) {
      item.child = child;
    }
  });
};

/**
 该方法的时间复杂度为o(n) 使用了一个map数据结构,避免了嵌套循环

 */
const listToTreeMap = function listToTreeMap(arr) {
  let data;
  try {
    data = JSON.parse(JSON.stringify(arr));
  } catch (e) {
    console.error("深拷贝arr 失败");
    return;
  }
  const map = new Map();
  let result = [];
  data.forEach((v) => {
    map.set(v.id, v);
  });
  data.forEach((v) => {
    if (v.parentId) {
      let parent = map.get(v.parentId);
      if (parent) {
        parent.child ? parent.child.push(v) : (parent.child = [v]);
      }
    } else {
      result.push(v);
    }
  });
  return result;
};

// console.log(listToTreeMap(menuOriginal));
// console.log(menuOriginal);
