const combanationSum = (arr, target) => {
  const res = [],
    path = [];
  arr.sort((a, b) => a - b);
  backTracking(0, 0);
  function backTracking(j, sum) {
    if (sum === target) {
      res.push(Array.from(path));
      return;
    }
    for (let i = j; i < arr.length; i++) {
      const cur = arr[i];
      if (cur > target - sum) break;
      path.push(cur);
      sum += cur;
      backTracking(i, sum);
      path.pop();
      sum -= cur;
    }
  }
  return res;
};
const arr = [2, 3, 6, 7];
console.log(combanationSum(arr, 7));
