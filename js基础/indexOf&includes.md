数组的 indexOf() includes()

字符串的 indexof includes

1: 隐式类型转换

字符串的 indexof 会进行隐式类型转换,只要存在就会返回索引值

数组 严格相等模式 不会进行类型转换

举例:

```javascript
const str = "abcd123";
console.log(str.indexOf(1)); // 4
console.log(str.includes(1)); // true
const array = ["a", "b", "c", "1", "2", "3"];
console.log(arrar.indexOf(1)); // -1
console.log(array.includes(1)); // false
```

2: undefined, Null, NaN

```javascript
let str = "undefinedabc";
console.log(str.indexOf("undefined")); //0
const a = ["undefined", 1, 2, 3];
a.indexOf("undefined"); // 0
a.includes("undefined"); // true
```

3:第二个参数的用法.

参考 mdn

4: 对于稀疏数组 includes 能识别到稀疏数组中的 undefined，indexOf 不可以

5:NaN includes 能匹配到 NaN，indexOf 不能匹配到 NaN
