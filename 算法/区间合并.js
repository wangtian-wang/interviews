let arr = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
  [1, 4],
  [4, 5],
];
// 时间 空间复杂度
function mergeRange(arr) {
  let result = [];
  //   arr.sort((a, b) => a[0] - b[0]);
  let start = arr[0][0];
  let end = arr[0][1];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] > end) {
      // 无区间重合,挪动start end指针
      result.push([start, end]);
      start = arr[i][0];
      end = arr[i][1];
    } else {
      console.log(arr[i]);
      end = Math.max(end, arr[i][1]); // 有区间重合的地方 算出区间最大值
    }
  }

  result.push([start, end]);

  return result;
}
console.log(
  mergeRange([
    [1, 4],
    [4, 5],
  ])
);
var merge = function (intervals) {
  //对于左边界从小到大排序
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  let prev = intervals[0];
  //合并重叠区间
  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] < cur[0]) {
      result.push(prev);
      prev = cur;
    } else {
      prev[1] = Math.max(prev[1], cur[1]);
    }
  }
  //将最后一个区间加入result集合中
  result.push(prev);
  return result;
};
