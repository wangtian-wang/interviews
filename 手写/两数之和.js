const arr = [1, 4, 6, 8, 29, 40];
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
 *  map 将已经遍历过的数字和对应的index存起来 当找到数字的时候 直接从map里面找到对应的index,从而省去查找index的环节
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
console.log("res1", toSumBase(arr, 10));
console.log(" res2: ", toSumMap(arr, 10));
