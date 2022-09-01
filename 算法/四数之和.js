const fourNumCount = (arr1, arr2, arr3, arr4) => {
  const map = new Map();
  let count = 0;
  for (const n1 of arr1) {
    for (const n2 of arr2) {
      const sum = n1 + n2;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }
  console.log(map, "map---");
  for (const n3 of arr3) {
    for (const n4 of arr4) {
      const sum = n3 + n4;
      count += map.get(0 - sum) || 0;
    }
  }
  return count;
};

console.log(fourNumCount([1, 2], [-2, -1], [-1, 2], [0, 2]));
