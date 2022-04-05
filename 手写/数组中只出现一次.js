const arr = ["a", "b", "c", "c", "d", "a"];
function getOne(arr) {
  const map = {};
  let key = [];
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];
    if (!map[cur]) {
      map[cur] = 1;
    } else {
      map[cur]++;
    }
  }

  for (let value in map) {
    if (map[value] === 1) {
      key.push(value);
    }
  }
  return key;
}
let result = getOne(arr);
console.log(result);

function getOne2(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let index = arr.indexOf(arr[i]);
    let lastIndex = arr.lastIndexOf(arr[i]);
    if (index === lastIndex) {
      result.push(arr[i]);
    }
  }
  return result;
}
let result1 = getOne2(arr);
console.log(result1);
