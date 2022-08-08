const arr = [1, 4, 5, 8, 29, 40, 5];
/**
 输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 
  返回的是数组中元素相加为target的元素的下标
 */
/**
 *
 * @param {Array} array
 * @param {Number} target
 * @returns [index, index]
 */
function toSumBase(array, target) {
  for (let index = 0; index < array.length; index++) {
    let diff = target - array[index];
    let diffIndex = array.indexOf(diff);
    if (diffIndex !== -1 && diff !== array[index]) {
      return [index, diffIndex];
    }
  }
  return [];
}
/**
 *   map 存储的是 已经遍历过的数组元素和对应的index存起来
 *   diff + 当前遍历的数组元素  = target  diff为减数  但是diff必须是数组中的元素
 *
 *  遍历当前项cur时候,从已经遍历过的元素中 map 看有没有???(cur + ??? = target)
 * 当从map里面找到与diff相同的元素时, (diff必须是数组中的元素)   查找完成,返回该元素对应的index
 * @param {*} array
 * @param {*} target
 * @returns [index, index]
 */

function toSumMap(array, target) {
  let map = new Map();
  for (let i = 0; i < array.length; i++) {
    let diff = target - array[i];
    if (!map.has(diff)) {
      map.set(array[i], i);
    } else {
      return [map.get(diff), i];
    }
  }
  return [];
}
// console.log("res1", toSumBase(arr, 10));
console.log(" res2: ", toSumMap(arr, 10));
