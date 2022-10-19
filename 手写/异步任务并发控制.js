/** delay 函数 */
const delay = function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

/************************************************************ */
/*    并发限制: 每个时刻执行的promise的数量是固定的                */
/*    测试案例开始    getNum有可能返回成功的状态 也有可能返回失败的状态         */

// function getNum(time) {
//   return new Promise((resolve, reject) => {
//     const num = Math.random() * 0.5;
//     setTimeout(() => {
//       if (num > 0.4) {
//         resolve(num);
//       } else {
//         reject("failing");
//       }
//     }, time);
//   }).catch((error) => {
//     /**
//      *    在catch的位置捕获了 reject的状态 getNum执行返回的promise的状态为成功的,这也是为啥状态为reject的list[item],每次都能进到.then()的成功的回调,递归的执行run()方法,
//      */
//     console.log(error, ": catch error in promise.catch");
//   });
// }
function getNum(time) {
  return new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * 0.5);
    setTimeout(() => {
      console.log(" in settime out");
      resolve(num);
    }, time);
  }).catch((error) => {
    /**
     *    在catch的位置捕获了 reject的状态 getNum执行返回的promise的状态为成功的,这也是为啥状态为reject的list[item],每次都能进到.then()的成功的回调,递归的执行run()方法,
     */
    console.log(error, ": catch error in promise.catch");
  });
}
let tasks = [
  () => {
    return getNum(1000);
  },
  () => {
    return getNum(1004);
  },
  () => {
    return getNum(1002);
  },
  () => {
    return getNum(1006);
  },
  () => {
    return getNum(1005);
  },
];

/*    测试案例结束             */

/**
          
         基于递归 + 闭包的方式 使用promise.all的方式管理异步任务队列  结果保证顺序
        promise.all只是同时开启了两个队列,在这两个队列里面递归的执行pool里面的任务
        1: 当前工作区 taskArray.length = 2,表示 工作区每次只有两个请求 
        2: 何时向当前的工作区里面添加新的任务?  
        当上一个任务成功时,递归执行run() 以index为索引,将对应位置的任务加入任务队列
        3: 要使用promise.all , taskarray必须是[promise] 且,
        4:每个工作区的状态何时变为成功?? (每个工作区都是一个递归函数,那递归终止条件是啥)
             index记录当前从任务取出任务的索引; tasks表示当前任务队列; 
             递归地 按照index,从tasks里面取出未执行的任务
             两个工作区是两个独立的promise, 当两个promise的状态都为成功时候,promise.all的状态才是成功的
            若工作区为2个,tasks为3个,那 tasks[2] 会作为在工作区1的第二个任务执行,当工作区1的第二个任务执行完成,递归执行下一个任务,发现tasks里面的任务已经执行完成,此时工作区1的状态应该为成功,终止下方代码执行
            当工作区2的第一个任务自行完成,tasks里面的任务已经执行完成,此时工作区2的状态应该为成功,终止下方代码执行                
            所以会有if (index >= tasks.length)来判断tasks里面的任务是否已经已经执行完成 终止递归
        */

function createRequest(tasks, pool) {
  pool = pool || 5;
  let result = [],
    taskArray = new Array(pool).fill(null),
    index = 0; // 记录当前要加入工作区的任务是原数组中的是第几个任务,(已经执行完成的任务)
  taskArray = taskArray.map(() => {
    return new Promise((resolve, reject) => {
      const run = function run() {
        if (index >= tasks.length) {
          resolve();
          return;
        }

        let order_index = index,
          task = tasks[index++];
        if (!task instanceof Promise) task = Promise.resolve(task);
        task()
          .then((res) => {
            result[order_index] = res;
            run(); // 当工作区中的任务成功时,接着继续从原任务队列里面取出下一个任务
          })
          .catch((reason) => {
            reject(reason);
          });
      };
      run(); // 这个run函数一直在执行,执行这个函数 就可以将promises数组的item执行了
    });
  });
  /**
   * taskArray  这里面的promise的状态 决定最终promise.all的执行状态
   *            tasklist[item]的状态受到list[item]执行状态的影响
   *            result的状态必须等到 list的全部item自行完成
   *            promise.all只是同时开启了两个队列,在这两个队列里面递归的执行list里面的任务
   *   map的作用 : 只是开启了2个任务池, 前2个任务会被抛进任务池,
   *   promise.all执行的时候, 会在前2个任务的.then里面 调用run()函数 用下一个函数来 代替最初的taskArray中的第一个位置的函数 循环执行
   */
  return Promise.all(taskArray).then(() => result);
}
createRequest(tasks, 2).then((res) => {
  console.log(res);
});

/**
         使用class的方式 结果不保证顺序  类似于发布订阅模式
         */
function createRequestC(tasks, pool, callback) {
  if (typeof pool === "function") {
    callback = pool;
    pool = 5;
  }
  if (typeof pool !== "number") {
    pool = 5;
  }
  if (typeof callback !== "function") {
    callback = function () {};
  }
  class TaskQueue {
    running = 0;
    queue = [];
    result = [];
    pushTask(task) {
      let self = this;
      self.queue.push(task);
      self.next();
    }
    next() {
      let self = this;
      while (self.running < pool && self.queue.length) {
        self.running++;
        console.log(self.running, "outer");
        let task = self.queue.shift();
        task()
          .then((result) => {
            self.result.push(result);
          })
          .finally(() => {
            self.running--;
            console.log(self.running, "inner");
            self.next();
          });
      }
      if (self.running === 0) callback(self.result);
    }
  }
  let taskQueue = new TaskQueue();
  tasks.forEachs((v) => taskQueue.pushTask(v));
}

/** 自己默写的 异步任务 并发数量控制 */
function taskControl(limit, list) {
  if (!Array.isArray(list)) throw new TypeError("list must be an array");
  limit = +limit;
  if (typeof limit !== "number") limit = 2;
  let taskList = new Array(limit).fill(null);
  let taskIndex = 0,
    result = [];
  taskList = taskList.map(() => {
    return new Promise((resolve, reject) => {
      function run() {
        if (taskIndex >= list.length) {
          resolve();
          return;
        }
        let index = taskIndex;
        let curTask = list[taskIndex++];
        if (!curTask instanceof Promise) curTask = Promise.resolve(curTask);
        curTask().then(
          (res) => {
            result[index] = res;
            run();
          },
          (error) => {
            reject(error);
          }
        );
      }
      run();
    });
  });
  return Promise.all(taskList).then((res) => result);
}
// taskControl(2, tasks).then((res) => {
//   console.log("task control----", res);
// });
