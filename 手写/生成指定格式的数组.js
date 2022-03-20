/**
  题目要求 : 生成的数组格式如下
  [[0,2,4], [10,14,19], [20,22,29]]
  [0 ~ 9, 10 ~ 19, 20 ~ 29, ......]
 */
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateArray(length) {
  return Array.from({ length }, (item) => getRandomNum(0, 99));
}
function sort(array) {
  return [...new Set(array.sort((a, b) => a - b))];
}
function formatArray(array) {
  const map = {},
    result = [];
  for (let i = 0; i < array.length; i++) {
    const key = parseInt(Math.floor(array[i] / 10));
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(array[i]);
  }
  for (let key in map) {
    result.push(map[key]);
  }
  return result;
}

function getArray() {
  let array = generateArray(10);
  array = sort(array);
  array = formatArray(array);
  return array;
}
console.log(getArray());
