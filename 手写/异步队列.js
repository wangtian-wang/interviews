class TaskQueue {
  constructor() {
    this.max = 10;
    this.taskList = [];
    setTimeout(() => {
      this.run();
    }, 0);
  }
  addTask(task) {
    this.taskList.push(task);
  }
  run() {
    const len = this.taskList.length;
    if (!len) {
      return;
    }
    const min = Math.min(len, this.max);
    for (let i = 0; i < min; i++) {
      this.max--; // 开始占用一个任务空间
      const task = this.taskList.shift();
      task()
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.max++; // 开始释放一个任务空间
          this.run(); // 自动执行下一轮任务
        });
    }
  }
}
// test   每多少秒 执行 n 个任务
function createTask(i) {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, 2000);
    });
  };
}
const taskQueue = new TaskQueue();
for (let i = 0; i < 20; i++) {
  const task = createTask(i);
  taskQueue.addTask(task);
}
