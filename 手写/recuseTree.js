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
  1: 
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
  return result;
}
let result = treeFormat(menuOriginal);
console.log(result, "-------");
