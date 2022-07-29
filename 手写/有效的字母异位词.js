const str = "dabc";
const str2 = "bcad";
function isAnagram(str1, str2) {
  let map = {},
    arr = [];
  if (str1.length > str2.length) {
    arr = str1;
  } else {
    arr = str2;
  }
  arr.split("").forEach((i) => {
    map[i] = 0;
  });
  let tempA = str1.split("");
  let tempB = str2.split("");
  for (let i = 0; i < tempA.length; i++) {
    if (Reflect.has(map, tempA[i])) {
      map[tempA[i]] += 1;
    }
    // if (map[tempA[i]] === 0) {
    //   map[tempA[i]] += 1;
    // }
  }
  for (let i = 0; i < tempB.length; i++) {
    map[tempB[i]] -= 1;
  }
  console.log(map);
  let temp = Object.values(map).find((item) => item !== 0);
  return temp ? false : true;
}
let res = isAnagram(str, str2);
console.log(res);
