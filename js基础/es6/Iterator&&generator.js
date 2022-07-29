/**
 迭代器 iterator： 是一种迭代数据的规范，需要自己去按照规范实现一个迭代器
 自己实现的迭代器必须如下格式
 */
function iterator(obj) {
  let index = 0;
  if (!Object.prototype.toString.call(obj) == "[object Array]") return;
  obj[Symbol.iterator] = function () {
    return {
      next() {
        if (index > obj.length - 1) {
          return {
            done: true,
            value: undefined,
          };
        } else {
          return {
            done: false,
            value: obj[index++],
          };
        }
      },
    };
  };
  for (let i of obj) {
    console.log(i);
  }
}
/**
 迭代器的实现原理是 [Symbol.iterator] 
 Symbol.iterator  为每一个对象定义了默认的迭代器
 当需要对一个对象进行迭代时（比如开始用于一个for..of循环中），
 它的@@iterator方法都会在不传参情况下被调用，自动执行
 返回的迭代器用于获取要迭代的值。
 */

/**
 迭代器与生成器的关系
  生成器函数 首次执行会 返回一个迭代器
  这个迭代器的next()方法 去执行 生成器内部因为yeild而暂停的代码 
  next（）方法 可以迭代整个 生成器函数 ？？？？
 */
