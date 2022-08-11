class ArrangeClass {
  constructor(name) {
    this.name = name;
    this.delay = 0;
    this.taskQueue = [];
    //Promise.resolve().then(this.start()); // start对外不暴露的情形;
  }

  exeute(work) {
    this.taskQueue.push(
      new Promise((resolve, reject) => {
        console.log(`${this.name} wake up doing ${work}`);
        reject("");
      }).catch((error) => {
        console.log("error happend~~~~"); // 假设在 new 的过程中发生了错误,那就需要在这里捕获, 否则 程序报错,后续的代码无法执行
      })
    );

    return this;
  }
  sleep(ms) {
    this.taskQueue.push(
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(`i am sleeping ${ms} seconds`);
          resolve();
        }, ms);
      })
    );
    return this;
  }
  wait(ms) {
    this.taskQueue.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      })
    );
    console.log(this.taskQueue.length);
    return this;
  }
  start() {
    // this.taskQueue.reduce(async (prevPromise, curPromise) => {
    //   try {
    //     prevPromise.then(curPromise);
    //     console.log("lalallalall");
    //   } catch (error) {
    //     console.log(error, "--------");
    //     return;
    //   }
    // }, Promise.resolve());
    this.taskQueue.reduce(
      (prevPromise, curPromise) => prevPromise.then(curPromise),
      Promise.resolve()
    );
  }
}

const arranging = (name) => {
  return new ArrangeClass(name);
};
// 执行start的写法
arranging("bob").exeute("coding").sleep(1000).start();

// 不执行start的写法
/**
 * const arr = [];
arr.push(
  new Promise((resolve) => {
    console.log("---------0000------");
  })
);
向一个数组里面push一个 new promise 这个promise内部的代码会马上执行 打印会马上执行
 */
// arranging("bob").exeute("coding").sleep(1000).wait(1000);
