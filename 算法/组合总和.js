const combanationSum = (arr, target) => {
  const res = [],
    path = [];
  arr.sort((a, b) => a - b);
  backTracking(0, 0);
  // j 单层递归起始位置
  function backTracking(j, sum) {
    if (sum === target) {
      // 因为下面要修改path中的元素 所以可以使用array.from 来拷贝一份原来的数组
      res.push(Array.from(path));
      return;
    }
    for (let i = j; i < arr.length; i++) {
      const cur = arr[i];
      if (cur > target - sum) break; // 剪枝操作
      path.push(cur);
      sum += cur;
      backTracking(i, sum);
      path.pop(); // 回溯
      sum -= cur; // 回溯
    }
  }
  return res;
};
const arr = [2, 3, 6, 7];
console.log(combanationSum(arr, 7));
