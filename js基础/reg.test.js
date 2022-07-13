// js
const pattern = /ab/g;
console.log(pattern.test("abcd")); // true
console.log(pattern.lastIndex); // 2
console.log(pattern.test("abcd")); // false
console.log(pattern.test("abcd")); // true

/*
每次当我们用正则 RegExp.exec() 和 RegExp.test() 进行匹配的时候，
		如果返回为 true，lastIndex 属性的值会发生变化，会变成正确匹配的子字符串的最后位置，并将此位置作为下次检索的起始点。
		如果返回为 false，lastIndex 重置为 0 


*/
