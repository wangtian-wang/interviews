## promise 面试题

```js
const fn1 = async() => {
    console.log('fn1 start')
            await fn2()  这句代码相当于在promise里面立即执行
                                                                new promise((resolve,reject) => {
                                                                    await fn2()
                                                                }).then(result => {
                                                                    console.log('fn1 end')
                                                                })
    console.log('fn1 end') 这句代码相当于在promise.then的回调里面执行
}
const fn2 = async() => {
    console.log('fn2 start')
}
new Promise((resolve, reject) => {
    console.log('promise start')
    resolve()
}).then(result => {
    console.log('then start')
})
fn1()
```

```javascript
console.log('main thread start')
setTimeout(() => {
    console.log('settimeout 1')
    Promise.resolve().then(() => {
        console.log(' in promise.resolve')
    })
}, 0);
new Promise((resolve, reject) => {
    console.log('in  new promise ')
    setTimeout(() => {
        console.log('settimeout 2')
        resolve('in settime out 2')
    }, 0);
}).then(result => {
    console.log('in new promise .then()')
    setTimeout(() => {
        console.log(result)
    }, 0);
})



宏任务和微任务交替执行，总是微任务的优先级高于宏任务

        main thread                         micro task                        macro task
console.log('main thread start')
console.log('in  new promise ')
【主线程执行完毕，检查微任务队列，】
【当前微任务队列为空，执行宏任务】
                                                                            console.log('settimeout 1')
                                                                           【将 console.log(' in promise.resolve')加入微任务队列】

                                     console.log(' in promise.resolve')
                                    【执行这个微任务，完成后
                                     当前微任务队列为空
                                     继续执行宏任务】

                                                                            console.log('settimeout 2')
                                                                            【将resolve('in settime out 2')的状态变为成功，加入微任务】


                                    console.log('in new promise .then()')
                                    【执行这个微任务，完毕后
                                     当前微任务队列为空
                                     执行下一个宏任务】

                                                                            执行最后一个settimeout，并且打印resolve出来的结果
```

```js

const p = function () {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('000000')
                resolve(1)
            }, 0);
            resolve(2)
        })
        p1.then((res => {
            console.log(res)
        }))
        console.log(3);
        resolve(4)
    })
}

p().then(res => {
    console.log(res)
})
console.log('end')


3
end
2
4
000000



***** 代码执行过程中主线程，微任务队列，宏任务队列中的任务分类 预编译

        main thread                         micro task                        macro task
1： 【p()执行里面的第一个promise执行
执行器函数内部的代码p1立即执行
状态立即变为成功，先将定时器加入异步队列，
然后将p1的.then
对应的回调加入微任务队列】

                                                                             2：console.log('000000')
                                                                             [将延时器加入宏任务队列]


                                        3： console.log(res)
                                      【继续执行第一个promise的内部代码】
                                     【主线程加入任务】

4： console.log(3);
【将第一个promise对应的.then加入微任务队列】

                                       5：console.log(res)

6：执行console.log('end')
【执行完成主线程的任务后，再去执行微任务队列的任务

所以先执行主线程的任务输出3，end
再执行微任务队列中的任务 输出 2， 4
由于promise的状态只能被改变一次，所以p1 的状态已经被改变了。就不会再产生微任务了。
最后执行延时器的回调函数,输出00000


```

## promise.resolve()

- resolve 方法会将实参包装为一个 promise 对象
- 面试题

  ```javascript
    Promise.resolve()
          .then(function then1() {
            //  then1    step1  最先执行
            Promise.resolve()
              // then2  step 2执行
              .then(function then2() {
                console.log(1);
              })
              // then3被加入微任务队列  step4
              .then(function then3() {
                console.log(2);
              });
          })
          .then(function then4() {
            // then4执行  step3
            console.log(3);
          });
       1: 对于promise的单实例的链式调用.then()的执行顺序问题
         链式调用的话，上一个.then()的回调影响一个.then（）de 状态， 只有当上一个.then()回调里面的代码执行完成后，代码的执行才会轮到下一个.then()
         promise.resolve().then(cb)中的cb 总是会本次循环 优先执行；
         如果回调中 还有 promise.resolve().then(cb) 在下一轮中，这个微任务优先执行
          v8 对于promise的单例链式调用做了优化  从上向下，每两个.then()回调中产生的微任务最先被执行
           如果下面的代码 嵌套的promise.resolve().then() 的层级过多 代码的执行顺序会有不同

  ```
