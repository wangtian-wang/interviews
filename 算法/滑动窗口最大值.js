function maxSlideWindow(arr, k) {
  class MonoQueue {
    constructor() {
      this.queue = [];
    }
    enqueue(value) {
      let back = this.queue[this.queue.length - 1]; // 当前窗口的最大数
      while (back !== undefined && back < value) {
        this.queue.pop(); // 删除掉 小于最大数的数
        back = this.queue[this.queue.length - 1];
        console.log(this.queue, "---- print1--");
      }
      this.queue.push(value);
      console.log(this.queue, "--helperQueue--");
    }
    dequeue(value) {
      let front = this.front();
      if (front && front === value) {
        this.queue.shift();
      }
    }
    front() {
      return this.queue[0];
    }
  }
  let helperQueue = new MonoQueue(); // 维护的当前滑动窗口的元素
  let i = 0,
    j = 0;
  let resArr = [];
  while (j < k) {
    helperQueue.enqueue(arr[j++]);
  }
  resArr.push(helperQueue.front());
  while (j < arr.length) {
    helperQueue.enqueue(arr[j]);
    helperQueue.dequeue(arr[i]);
    resArr.push(helperQueue.front());
    i++;
    j++;
  }
  return resArr;
}
const res = maxSlideWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
console.log(res, "-----");
