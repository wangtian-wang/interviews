function fn(num) {
  console.log(num, " fn num fn num");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 1000);
  });
}

function* gen() {
  // 赋值语句的执行顺序是从右向左 所以 fn(1)先执行 遇到yield 暂停赋值
  const num1 = yield fn(1);
  console.log(num1, "num1");
  const num2 = yield fn(num1);
  console.log(num2, "num2");
  const num3 = yield fn(num2);
  return num3;
}

/**
    生成器函数的执行过程
    const g = gen();
    let res = null;
    //next()激活生成器  执行fn(1)   遇到yield 暂停执行 赋值操作 将fn(1)的执行的结果交给 res保管
    res = g.next();
    //next(res.value)执行 将fn(1)的执行结果 res 交给num1 
    // 执行代码 打印和 fn(num1) ,遇到yield暂停执行
    res = g.next(res.value);
    res = g.next(res.value);
    res = g.next(res.value);

    //  但是 res是个promise 需要使用.then的方法 拿出resolve的data
    res.value.then((data) => res = g.next(data))   // 本质上是await promise的过程
    // 需要人工执行执行多次才能将gen函数内部的代码执行完成
    请看下面的代码 ⬇️
   
 */
/**
   不能自动将 gen函数内部的函数执行完成 有多少个函数需要手动执行多少次  还会造成回调地域
    const g = gen();
    let res = null;
    res = g.next();
    res.value.then((data) => {
        console.log(data, "data");
        res = g.next(data);
        res.value.then((data) => {
            res = g.next(data);
            res.value.then((data) => {
                res = g.next(data);
                if (res.done) {
                    console.log(res.value);
                }
            });
        });
    });
 */
/**  自执行版    */
function wrap() {
  return new Promise((resolve, reject) => {
    function go(data) {
      res = g.next(data);
      if (!res.done) {
        res.value.then((data) => go(data));
      } else {
        resolve(res.value);
      }
    }
    go();
  });
}
wrap().then((res) => {
  console.log(res, "finally log");
});

// async function exec() {
//   let res = await fn(1);
//   res = await fn(res);
//   res = await fn(res);
//   return res;
// }
// exec().then((res) => {
//   console.log(res);
// });
