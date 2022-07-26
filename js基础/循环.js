/**

+ for forEach循环
for 循环是自己控制循环过程, 可以使用break, continue终止循环
forEach循环是基于while循环做的封装
for forEach循环的差别
    当使用var声明循环计数器时 FOR 和while的性能差不多
    使用let声明循环计数器时 For循环性能更好[块级作用域,循环结束后,块级作用域会被释放掉, 不占全局内存]
+ for in循环
    性能差 [会遍历对象原型上的 + 私有的可枚举属性] 按照原型链一级级查找 很耗性能
    bug: 不能迭代symbol属性,迭代顺序会以数字属性优先 公有可枚举属性也会进行迭代

+ for of
    内部实现了迭代器规范

















 foreach 循环 实现是多个立即执行函数包裹的代码体 若里面有异步函数 但是时间相同 会同时执行  foreach 循环比较慢 foreach循环的缺点
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

/**版本号比较 */

/**多维对象扁平化 */

/**URL传参解析 */

/** 阿拉伯数字转换为中文数字 并且加上单位   
 20896  两万零八百九十六 
*/

/** 一维数组转为树形结构数据 */
