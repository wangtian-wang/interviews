const travers = function travers(num) {
  let arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    arrUnit = ["", "拾", "佰", "仟", "万"];
  num = String(num).split("");
  num = num.reverse().map((item, index) => {
    let char = arr[+item];
    if (index > 0 && char !== "零") {
      char += arrUnit[index];
    }
    return char;
  });
  return num.reverse().join("");
};
console.log(travers(20876));
