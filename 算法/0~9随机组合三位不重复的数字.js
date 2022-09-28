let count = 0;
// 每轮循环的i都应该从0开始
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (j === i) continue;
    for (let k = 0; k < 10; k++) {
      if (k !== i && k !== j) {
        count++;
      }
    }
  }
}
console.log(count);
console.log(9 * 9 * 8);
