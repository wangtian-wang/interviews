/**
  并发限制: 每个时刻执行的promise的数量是固定的
 */

/*    测试案例开始             */
const delay = function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

let tasks = [
  () => {
    console.log(1000, "task[0]");
    return delay(1000);
  },
  () => {
    console.log(1004, "task[1]");
    return delay(1004);
  },
  () => {
    console.log(1002, "task[2]");
    return delay(1002);
  },
  () => {
    return delay(1006);
  },
  () => {
    return delay(1005);
  },
];

/*    测试案例结束             */

/**
  
 基于递归的方式 使用promise.all的方式管理异步任务队列  结果保证顺序
 
1: 当前工作区 taskArray.length = 2,表示 工作区每次只有两个请求 
2: 何时向当前的工作区里面添加新的任务?  
当上一个任务成功时,递归执行run() 以index为索引,将对应位置的任务加入任务队列
3: 要使用promise.all , taskarray必须是[promise] 且,必须状态都为成功
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
      //   debugger;
      const run = function run() {
        if (index >= tasks.length) {
          resolve();
          return;
        }
        console.log(index, "--before");
        let order_index = index,
          task = tasks[index++];
        task()
          .then((res) => {
            console.log(res, "in singale task ---");
            result[order_index] = res;
            run(); // 当工作区中的任务成功时,接着继续从原任务队列里面取出下一个任务
          })
          .catch((reason) => {
            reject(reason);
          });
      };
      run();
    });
  });

  return Promise.all(taskArray).then(() => result);
}
// createRequest(tasks, 2).then((res) => {
//   console.log(res);
// });

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
  tasks.forEach((v) => taskQueue.pushTask(v));
}
createRequestC(tasks, 3, (res) => {
  console.log(res);
});
