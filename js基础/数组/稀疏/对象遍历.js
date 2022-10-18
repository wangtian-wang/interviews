/**

+ for forEach循环
for 循环是自己控制循环过程, 可以使用break, continue终止循环
forEach
    循环是基于while循环做的封装 不能被中断 除非抛出错误.
    如果一个数组的长度在回调函数中被改变 那已经访问过的索引 不会再被遍历 ,
使用 forEach  for  删除元素时要注意
        假设删除了 i 位置的元素 arr[i]会被打印出来 
        但是 删除掉arr[i]后, 数组元素发生变化,
        下一个在arr[i]位置的元素 , 会被跳过遍历
        因为该位置的索引已被访问过了
for forEach循环的差别
    当使用var声明循环计数器时 FOR 和while的性能差不多
    使用let声明循环计数器时 For循环性能更好[块级作用域,循环结束后,块级作用域会被释放掉, 不占全局内存]
+ for in循环
    性能差 [会遍历对象原型上的 + 可枚举属性] 按照原型链一级级查找 很耗性能
    bug: 不能迭代symbol属性,迭代顺序会以数字属性优先 公有可枚举属性也会进行迭代

+ for of
    内部实现了迭代器规范

foreach 循环 是使用while循环实现的 若里面有异步函数 虽然时间相同 但是会同时执行  foreach 循环比较慢 foreach循环的缺点
 for ()循环
 for of 循环没有这个问题
 */
let arr = [1, 2, 3, 4, 5];
/** forEach()方法的原理 */
function myForEach(arr) {
  for (var i = 0; i < arr.length; i++) {
    ((i) => {
      console.log(i);
    })(i);
  }
}
// myForEach(arr);
/**题目 
 每隔一秒输出打印
*/
const list = [1, 2, 8, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};
/**使用froeach时 1秒后,全部的打印输出 */
list.forEach(async (item) => {
  let res = await square(item);
  //   console.log(res);
});

/**
 * 基于递归的处理  按照顺序输出结果  拿到所有的结果 
  let index = 0;
  function print(arr, cb) {
  let result = [];

  function inner() {
    let orderIndex = index;
    if (index >= arr.length) {
      cb(result);
      return;
    }
    square(arr[index++])
      .then((res) => {
        result[orderIndex] = res;
        inner();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  inner();
}
print(list, (res) => {
  console.log(res, "in rs");
});
 
*/

/**  
 * 按照顺序输出 递归处理
let index = 0;
const fn = async function fn() {
  if (index >= list.length) return;
  let x = list[index++],
    result;
  result = await square(x);
  console.log(result);
  fn();
};
fn();

*/
/**   基于 for await of (es9 数组异步迭代协议实现 )
原理: 触发Symbol.asyncInterator这个方法的执行,并且返回迭代器对象;Symbol.asyncInterator必须遵循 generator+ iterator规范
每一轮循环 都是迭代器对象.next() 执行返回结果{value: yield后的值,done: 是否迭代完成} 

async function fn() {
  let index = 0;
  list[Symbol.asyncIterator] = async function* () {
    yield square(list[index++]);
    yield square(list[index++]);
    yield square(list[index++]);
  };
  for await (let res of list) {
    console.log(res);
  }
}
fn();


*/

/** mdn上面的for each的实现 */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    var O = Object(this);

    var len = O.length >>> 0;

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    k = 0;

    while (k < len) {
      var kValue;

      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}
