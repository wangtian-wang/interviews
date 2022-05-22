let count = 0;
for (let i = 1; i < 10; i++) {
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
