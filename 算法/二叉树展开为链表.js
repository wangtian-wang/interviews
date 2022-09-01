/**
 问题: 写的这个代码在浏览器里面跑有问题,再leetcode里面就能通过,这是为啥呢?
 解题思路: 
  ,从root的第一个左边子节点开始,递归的寻找root的左边子节点的右节点 tempL,
  将这个右节点tempL变为root的右节点;
  root的右节点为之前的左节点,
  root的左节点为空
 */
const arr = [1, 2, 5, 3, 4, null, 6];

function treeToChain(root) {
  while (root) {
    console.log(11);
    if (root.left) {
      let tempL = root.left;
      while (tempL.right) {
        tempL = tempL.right;
      }
      tempL.right = root.right;
      root.right = root.left;
      root.left = null;
    }
    root = root.right;
  }
}
// console.log(treeToChain(arr), "--");
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
function createTree(arr) {
  let tree = new Node(arr[0]);
  let nodes = [tree];
  let i = 1;
  for (let node of nodes) {
    nodes.push((node.left = new Node(arr[i])));
    i += 1;
    if (i == arr.length) {
      return tree;
    }
    nodes.push((node.right = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
  }
}
// let tree = createTree(arr);
// console.log(tree, "tree");
