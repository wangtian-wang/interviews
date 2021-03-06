/**
 * 在对一个数组执行 for 循环时候,删除数组元素 会存在啥问题
 *  for 循环结合 splice 删除数组指定元素
 
 */
const array = ["a", "a", "a", "b", "c", "d"];
for (let i = 0; i < array.length; i++) {
  if (array[i] === "a") {
    array.splice(i, 1);
  }
}
console.log(array); // [ 'a', 'b', 'c', 'd' ]
/**
  通过删除代码 我们发现 a 没有被删除完 这是为啥呢? 整个代码分析如下
   第一次循环 删除了 索引为0的 a 数组变为 ["a", "a", "b", "c", "d"]
   第二次循环 i 变为1 只会删除索引为1处的 a 所以 索引为0处的a 不会被删除;
   问题的关键点在于 计数器 i 不是随着数组长度的变化 总是从0开始的,而是接着删除数组元素之前的计数继续自增加
  */
// 解决办法1
for (let i = 0; i < array.length; i++) {
  if (array[i] === "a") {
    array.splice(i, 1);
    i--;
  }
}
console.log(array, "----");
//! 解决办法2  未处理的元素的位置是没有变化的
for (let i = array.length - 1; i >= 0; i--) {
  if (array[i] === "a") {
    array.splice(i, 1);
  }
}
