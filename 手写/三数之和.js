/**
 leecodes上 三数之和 需要将符合条件的三元组返回,  条件 a + b + c = 0 返回的三元组不能重复
 标记一个当前的cur,当遍历到当前的cur的时候,移动左右指针,直到找到一个符合条件的三元组
 当cur和前一个i- 1重复的时候,有重复项 跳过结果查找



 */

function threeSum(nums) {
  const res = [],
    len = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    let left = i + 1,
      right = len - 1,
      cur = nums[i];
    if (cur > 0) return res;
    if (cur == nums[i - 1]) continue; // cur去重 left变化
    while (left < right) {
      let lNum = nums[left],
        rNum = nums[right],
        threeSums = cur + lNum + rNum;

      if (threeSums < 0) {
        left++;
      } else if (threeSums > 0) {
        right--;
      } else {
        res.push([cur, lNum, rNum]);

        // 左边去重;
        while (left < right && nums[left] == nums[left + 1]) {
          //   console.log(left, "left -----");
          left++;
        }
        // right去重
        while (left < right && nums[right] == nums[right - 1]) {
          //   console.log(right, "right ----");
          right--;
        }
        left++;
        right--;
        // console.log("left", left, "right", right);
      }
    }
  }
  return res;
}
const arr = [-1, -1, -2, 0, 0, -2, 1, 2, -1, -4, 1];
console.log(threeSum(arr));
