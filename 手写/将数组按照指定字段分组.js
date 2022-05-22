function groupBy(arr, fn) {
  return arr
    .map((item) => {
      if (typeof fn === "function") {
        return fn(item);
      } else {
        return item[fn];
      }
    })
    .reduce((prev, cur, i) => {
      if (!prev[cur]) {
        prev[cur] = [arr[i]];
      } else {
        prev[cur] = prev[cur].concat(arr[i]);
      }
      return prev;
    }, {});
}
let res1 = groupBy([6.1, 4.2, 6.3], Math.floor);
let res2 = groupBy(["one", "two", "three"], "length");
console.log(res1, "res1");
console.log("res2", res2);
