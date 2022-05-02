1: 控制台报错

```javascript

1: [].reduce(() => {}) // 报错 当数组为空并且没有提供 initialValue, 控制台会报错;
```

```

```

2: callback 不会执行

```javascript
 数组只有一个元素,并且没有提供initialValue
1: [3].reduce(() => {});
 空数组但是提供了initialValue,
2: [].reduce((prev, cur) => {}, 3)
```

3:当 initialValue 有值得时候, prev = initialValue,从数组的索引为 0 的位置开始遍历;当 initialValue 没有传递值的时候,prev 就是数组的第一个于元素从数组的第二个元素开始遍历.
