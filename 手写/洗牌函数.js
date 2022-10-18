const shuffle = (arr) => {
  arr = [...arr];
  for (let i = arr.length; i > 0; i--) {
    const index = Math.floor(Math.random() * i);
    [arr[index], arr[i - 1]] = [arr[i - 1], arr[index]];
  }
  return arr;
};

const arr = [1, 2, 3, 4, 5];
console.log(shuffle(arr));
