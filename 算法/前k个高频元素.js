/**
  步骤: 
  1: 先使用map结构的数据,收集所有元素出现的次数
  2: 按照元素出现的次数大小 进行降序排序
  3: 返回元素
 */

function getKFrequent(arr, k) {
  console.time("get");
  const map = new Map();
  for (let item of arr) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((i) => i[0]);
}
class PriorityQueue {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.queue = [];
  }
  size() {
    return this.queue.length;
  }
  push(item) {
    this.queue.push(item);
    let index = this.queue.length - 1;
    let parent = Math.floor((index - 1) / 2);
    while (parent >= 0 && this.compare(parent, index) > 0) {
      [this.queue[index], this.queue[parent]] = [
        this.queue[parent],
        this.queue[index],
      ];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  compare(index1, index2) {
    if (this.queue[index1] === undefined) {
      return 1;
    }
    if (this.queue[index2] === undefined) {
      return -1;
    }
    return this.compareFn(this.queue[index1], this.queue[index2]);
  }
  pop() {
    const ret = this.queue[0];
    this.queue[0] = this.queue.pop();
    let index = 0,
      left = 1,
      selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
    while (
      selectedChild !== undefined &&
      this.compare(index, selectedChild) > 0
    ) {
      [this.queue[index], this.queue[selectedChild]] = [
        this.queue[selectedChild],
        this.queue[index],
      ];
      index = selectedChild;
      left = 2 * index + 1;
      selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
    }
    return ret;
  }
}
function topKFrequent(arr, k) {
  console.time("top");
  const map = new Map();
  for (const num of arr) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  // 创建小顶堆
  const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1]);
  for (const entry of map.entries()) {
    priorityQueue.push(entry);
    if (priorityQueue.size() > k) {
      priorityQueue.pop();
    }
  }
  const result = [];
  for (let i = priorityQueue.size() - 1; i >= 0; i--) {
    result[i] = priorityQueue.pop()[0];
  }
  console.timeEnd("top");
  return result;
}

const arr = [
  1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 0, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 19, 20, 49,
];
const res = getKFrequent(arr, 2);
console.timeEnd("get");
console.log(res, "----");
