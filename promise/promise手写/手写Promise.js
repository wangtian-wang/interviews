/**
  let p =  new Promise((res,rej) => {
   res('ok')
  })
  
  
 */
class Promise {
    constructor(fn) {
        this.promiseState = 'pending';
        this.promiseResult = null;
        this.callBacks = [];
        const self = this;
        // 同步调用执行器函数，并且传参
        function resolve (result) {
            // 改变对象的状态，设置promise的结果
            if (self.promiseState !== 'pending') return; // promise的状态只能被改变一次
            self.promiseState = 'fullfilled';
            self.promiseResult = result;
            // 执行异步的成功的回调函数 
            setTimeout(() => {
                self.callBacks.forEach(item => {
                    item.onResolved(result);
                })
            }, 0);
        }
        function reject (result) {
            if (self.promiseState !== 'pending') return; // promise的状态只能被改变一次
            self.promiseState = 'rejected';
            self.promiseResult = result;

            // 执行异步的失败的回调函数 
            setTimeout(() => {
                self.callBacks.forEach(item => {
                    item.onRejected(result);
                })

            }, 0);
        }
        fn(resolve, reject);


    }
    // promise.resolve可以快速的改变promise的状态，具体的状态由promise的传入值决定
    static resolve (value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(result => {
                    resolve(result)
                }, error => {
                    reject(error)
                })
            } else {
                resolve(value)
            }
        })

    }
    // promise reject快读的将promise的状态设置为失败
    static reject (error) {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
    static all (promiseArray) {
        return new Promise((resolve, reject) => {
            let allResult = [],
                count = 0;
            // 遍历每一个promise，用then方法里面的回调，来判断当前的promise的状态是否为成功的
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(success => {
                    // 当前promise的状态是成功的
                    allResult[i] = success
                    count++;
                    if (count === promiseArray.length) {
                        resolve(allResult)
                    }
                }, error => {
                    reject(error)
                });
            }

        })
    }
    // 那个item 先改变状态， all的状态就会发生改变
    static race (promiseArray) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(success => {
                    resolve(success)
                }, error => {
                    reject(error)
                });
            }

        })
    }
    // 实例方法 then函数的回调方法 resolve reject 只要返回的结果不是 error 或者失败 下一个promise 的状态都是成功的
    // 不管执行器执行了那个函数 promise then方法里面的回调函数都得异步执行
    then (resolve, reject) {
        let self = this;
        // 加入.then方法里面传递的参数不是函数的话，给个默认值为函数
        // 一个实例有可能有多个.then方法 .then方法里面的回调函数都要执行
        if (typeof resolve !== 'function') {
            resolve = res => res
        }
        if (typeof reject !== 'function') {
            reject = rej => {
                throw rej
            }
        }
        return new Promise((res, rej) => {
            function callbackExecute (type) {
                try {
                    let result = type(self.promiseResult);
                    if (result instanceof Promise) {
                        result.then(result => {
                            res(result)
                        }, error => {
                            rej(error)
                        })
                    } else {
                        res(result)
                    }
                } catch (e) {
                    rej(e)
                }

            }
            if (self.promiseState === 'fullfilled') {
                setTimeout(() => {
                    callbackExecute(resolve)
                }, 0);
            }
            if (self.promiseState === 'rejected') {
                setTimeout(() => {
                    callbackExecute(reject)
                }, 0);
            }
            // 当异步状态时并且promise的状态不确定的时候 .then方法只是将回调函数加入callbacks数组里面，到底调用callbacks里面那个回调函数 还是根据 执行器函数调用了那个方法决定
            if (self.promiseState === 'pending') {
                self.callBacks.push({
                    onResolved: function () {
                        callbackExecute(resolve)
                    },
                    onRejected: function () {
                        callbackExecute(reject)
                    }
                })
            }
        })

    }
    catch (error) {
        return this.then(null, error)
    }
}


