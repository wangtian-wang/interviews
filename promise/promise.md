## 关于 promise 中的返回值

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 100);
})
只要p的状态是成功的，那么所有p的then方法里面的成功的回调函数都会执行
console.log(p); // 此时打印p p的状态是pending状态 ,不会执行.then方法里面的回调函数，当p的状态发生了改变后，才会根据p的状态去执行对应的回调
let p2, p3;
p2 = p.then((res => {
    console.log('00000') // 不会马上执行这个打印    状态未改变，
    /*  return new Promise((resolve, rej) => {
            rej(res)
        })
        return Promise.reject('res')  返回一个失败的回调函数
        Promise.reject('exec now')这样子这个函数会立即执行，需要在后面catch一下 否则会报错
    */
}))
p3 = p2.then(res => {
    console.log(res)
}, rej => {
    console.log(rej)
}).catch(e => {
    console.log(e)
})
console.log(p2) // 同步的代码先打印，状态还未发生改变 pending
setTimeout(() => {
    console.log(p, p2, p3); // 只能在延时器里面拿到p, p1的返回结果
    /*
    p的状态在延时器执行后改变， 状态为 fullfilled   result : ok;
    p2  state： fullfilled   result
                                    1： 当 p 的返回值为任意值（0， false， null， undefined）的时候，       p2状态为成功的
                                    2： 当 p 的返回值为失败的  throw '1111'                                           p2的状态是失败
                                    3:  当 p 的 返回值为promise实例的时候，p2由实例的状态决定
    */
}, 1000);

```

## 异常传透

- 当使用 promise 的 then 链式调用时候，可以在最后指定失败的回调
- 前面的任何操作除了错误 都会传递到最后失败的回调中处理

```js
当promise中的状态为失败的时候，可以用以下两种方法将失败的状态传递给后面的promise处理

new Promise((res, rej) => {
   rej('fail')
}).then(res => {

}, rej => {
   throw rej // 方法1  将错误的状态传递给下一个.then里面的promise的reject

}).then(res => {

}, rej => Promise.reject()) // 方法1   将错误的状态传递给下一个.then里面的promise的reject
.catch( rej => {
  log(rej)
})
```

## 中断链式调用

```js
当想要中断promise链的时候，需要在当前的promise里面return一个pending状态的promise

new Promise((res, rej) => {
    rej('fail')
}).then(res => {

}, rej => {
    console.log(rej, 'rej'); //fail rej
    return rej
}).then(res => {
    console.log(res, 'second then value') //fail second then value
    return new Promise(() => {}) // pending状态的promise 会中断后续promise链的执行
}, rej => rej).then(res => {
    console.log('i can not be  execute');
})
```

## 失败的 promise.reject()

```js
.then() (b) 前面的失败的promise a 的reject()的状态，只会影响当前.then (b) 执行成功或者是失败的回调函数，不能影响一下个.then() (c) 的执行结果
.then (b) 的reject（）执行，是对promise1 里面 reject（）状态的处理；
.then (b) 的reject（）执行，只要reject（）函数内部的状态是 ok 的，那么下一个函数 .then () (c) 执行的函数就是 resolve（）
    a  new Promise((res, rej) => {
          rej('fail')
    b  }).then(res => {

       }, rej => {
          console.log(rej, 'rej'); //fail rej
          return rej
    c  }).then(res => {
          console.log(res, 'second then value') //fail second then value
       }, rej => rej)
```

```javascript
async function execTwoMinutes() {
  await new Promise(function (cb) {
    setTimeOut(() => cb(), 2000);
  });
}
```

想要在 ajax 中使用 async await 必须封装一个返回 promise 实例的函数

```js
function getDataFn(url) {
    return new Promise(res => {
        $.get(url,(data) => {
            res(data)
        })
    })
}
asycn getData() {
  await getDataFn(url)
}
以同步的方式获取得到数据之后的返回值
```

### then 的链式调用

```js
new Promise((res, rej) => {
    promise的状态只能是 三种 状态中的一种 成功 | 失败 | pending
    promise 的状态是成功的 就会执行.then的成功的回调函数，反之亦然 promise的状态只能有一种   一旦改变了就不可逆
    res('success')
})
    .then(
        上面的promise 的状态是成功或者失败就会进入相应的回调函数里面，执行对应的成功的或者失败的函数
        res => {
            上一个promise的返回状态是成功的 所以会执行这里面的代码，下面的reject的代码不会执行
            return Promise.reject('2222')
        },
        rej => {
            return Promise.reject('888888')
        })
    .then(
        上一个.then的函数执行的是失败的reject，所以 这个.then 里面 会执行失败的 reject函数
        res => {

        },
        rej => {
            console.log(rej, 'rej2')
        })
```

#### 关于 await 的返回值的问题

- 当 await 的右边是其他的值，直接将此值作为 await 的返回值

## promise 并发执行 3 个任务，假设 P 第一个完成，那就遍历剩下的 promise，从中找到一个 p，将这个 p 加入到已完成的 p 的位置，循环，总是在最先完成的 promise 的位置添加新的待执行的 promise

```javascript
const taskArray = [
  {
    info: "task1",
    time: 3000,
  },
  {
    info: "task2",
    time: 1000,
  },
  {
    info: "task3",
    time: 2050,
  },
  {
    info: "task4",
    time: 1000,
  },
  {
    info: "task5",
    time: 3000,
  },
  {
    info: "task6",
    time: 2000,
  },
  {
    info: "task7",
    time: 3000,
  },
  {
    info: "task8",
    time: 4000,
  },
  {
    info: "task9",
    time: 2000,
  },
];
function handlerPromise(Item) {
  console.log(Item.info + "start");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(Item.info + "success");
      resolve();
    }, Item.time);
  });
}
function limitPromise(taskArray, handler, limitNum) {
  let taskArrays = [].concat(taskArray),
    promises = taskArrays.splice(0, limitNum);
  promises = promises.map((item, index) => {
    return handler(item).then(() => {
      return index;
    });
  });
  let firstDone = Promise.race(promises);
  for (let i = 0; i < taskArrays.length; i++) {
    firstDone = firstDone.then((index) => {
      // 拿到最先完成的promise ，在promises（3个并发任务）中的索引，给剩余promise数组的item重新赋值
      // index 的取值范围是0 到 1 只要当前位置的任务完成，就会给当前的任务重新赋值
      // 通过链式调用 来将剩下的Ppromise一个个推入队列
      promises[index] = handler(taskArrays[i]).then(() => {
        return index;
      });
      return Promise.race(promises);
    });
  }
}
limitPromise(taskArray, handlerPromise, 3);
```

## promise 并发执行 3 个任务，假设 P 第一个完成，那就遍历剩下的 promise，从中找到一个 p，将这个 p 加入到已完成的 p 的位置，循环，总是在最先完成的 promise 的位置添加新的待执行的 promise

```js
const taskArray = [
  {
    info: "task1",
    time: 3000,
  },
  {
    info: "task2",
    time: 1000,
  },
  {
    info: "task3",
    time: 2050,
  },
  {
    info: "task4",
    time: 1000,
  },
  {
    info: "task5",
    time: 3000,
  },
  {
    info: "task6",
    time: 2000,
  },
  {
    info: "task7",
    time: 3000,
  },
  {
    info: "task8",
    time: 4000,
  },
  {
    info: "task9",
    time: 2000,
  },
];
function handlerPromise(Item) {
  console.log(Item.info + "start");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(Item.info + "success");
      resolve();
    }, Item.time);
  });
}
function limitPromise(taskArray, handler, limitNum) {
  let taskArrays = [].concat(taskArray),
    promises = taskArrays.splice(0, limitNum);
  promises = promises.map((item, index) => {
    return handler(item).then(() => {
      return index;
    });
  });
  let firstDone = Promise.race(promises);
  for (let i = 0; i < taskArrays.length; i++) {
    firstDone = firstDone.then((index) => {
      // 拿到最先完成的promise ，在promises（3个并发任务）中的索引，给剩余promise数组的item重新赋值
      // index 的取值范围是0 到 1 只要当前位置的任务完成，就会给当前的任务重新赋值
      // 通过链式调用 来将剩下的Ppromise一个个推入队列
      promises[index] = handler(taskArrays[i]).then(() => {
        return index;
      });
      return Promise.race(promises);
    });
  }
}
limitPromise(taskArray, handlerPromise, 3);
```

## promise 微任务嵌套微任务

- resolve 方法会将实参包装为一个 promise 对象
- ```javascript
  Promise.resolve()
    .then(function then1() {
      Promise.resolve()
        .then(function then2() {
          console.log(1);
        })
        .then(function then3() {
          console.log(2);
        });
    })
    .then(function then4() {
      Promise.resolve("then4")
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          console.log("last~~~~~~");
        });
    });
  ```

  > 代码执行步骤详解 见 `微任务嵌套微任务.png`

  - 总结
    - 1： 第一个 tick 的每个微任务执行时候，新产生的微任务都会加入到下一个 tick，以此类推
    - 2： 只有第一个 tick 的微任务执行完成，才会去执行下一个 tick 产生的微任务，以此类推

## promise+ 事件

```javascript
<button id="btn"></button>

let btn = document.getElementById("btn");
      btn.addEventListener("click", () => {
        Promise.resolve().then(() => {
          console.log("click1~~");
        });
        console.log(1);
      });
      btn.addEventListener("click", () => {
        Promise.resolve().then(() => {
          console.log("click2~~");
        });
        console.log(2);
      });

  点击按钮       打印的输出为 1 , click1~~ , 2  ,click2~~
          分析： 点击一次，click事件注册的回到函数都会执行
                代码遇见then()加入到回调队列，执行第二个回调同理


 btn.click()    打印的输出为 1 , 2 , click1~~ ,2 click2~~
         分析：   btn的click函数自执行， 此时所有的click注册的函数为同步函数 fn1,fn2
		const fn1 = () => {
       		 Promise.resolve().then(() => {
                     console.log("click1~~");
                 });
                  console.log(1);
                });
		const fn2= () => {
       		  Promise.resolve().then(() => {
                     console.log("click2~~");
                  });
                   console.log(2);
                 });

                所以代码的执行顺序 1 , 2 , click1~~ ,2 click2~~
```
