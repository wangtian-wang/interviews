var threeSum = function (nums) {
  if (nums.length < 3) return [];
  // 先进行排序
  nums.sort((a, b) => a - b);
  let res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    // 是因为指定两个指针， 并且这两个指针需要移动 所以实际不会作为中心点 所以nums的长度才要减去2吗？
    if (nums[i] > 0) return res;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1,
      r = nums.length - 1;
    // 以当前的i位中心 l代表左指针 代表右指针  l < r  当左指针大于右指针的时候 中心变为下一个i,左指针向左，右指针不变
    while (l < r) {
      if (nums[i] + nums[l] > 0) break; // 两数相加大于 0 的话 那此时三个数相加不可能等于0 ，终止后面判断
      let sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        // 当左指针和左指针右边的数相同时 得到的结果是和之前的结果是相同的 所以直接指针移动
        // arr= [ -2,-1,-1 0, 1,2, 3,]  当左指针为1， 假设 中心点为 0  arr[0] = -2;左指针 l = 1 arr[1] = -1; 右指针 r = 6arr[6] = 3; 此时结果为0 命中
        // l = 1 ， l+1 = 2 arr[2] = -1 和当前左指针相等，那此时这个结果就是重复的 不符合条件 直接pass
        while (sortNums[l] === sortNums[l + 1]);
        while (sortNums[r] === sortNums[r + 1]);
        // 当三数相加结果为0的时候，那左右指针都要移动   关键在于指针的移动
        l++;
        r--;
      } else if (sum > 0) {
        // 总和大于0 ，说明右指针需要小数值方向移动  右边的数是相对较大的数
        r--;
      } else {
        // 总和小于0 ,说明指针需要向大数值方向移动
        l++;
      }
    }
  }
  return res;
};
let res = threeSum([-1, 0, 2, 3, 1, -2]);
console.log(res);
