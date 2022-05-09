class ArrangeClass {
  constructor(name) {
    this.name = name;
    this.delay = 0;
    this.taskQueue = [];
    //Promise.resolve().then(this.start()); // start对外不暴露的情形;
  }

  exeute(work) {
    this.taskQueue.push(
      new Promise((resolve) => {
        console.log(`${this.name} wake up doing ${work}`);
        resolve();
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
    return this;
  }
  start() {
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
arranging("bob").exeute("coding").sleep(1000);
