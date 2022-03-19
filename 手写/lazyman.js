/**
lazyMan("Bob").eat("apple").eat("meat").sleepFirst(2).sleep(3).eat("pizza");
 lazyMan 的实现思路
 1: 任务分析
    目的: 实现一个按照函数调用顺序链式调用的函数lazyMan,具有优先级可以控制sleepFirst无论出现在任何位置 都要最先执行
 2: 解题思路
    2-1 : 可以用队列(数据结构)来管理这些任务,根据这些任务调用的顺序 依次加入到任务队列里面
  
    2-2 : 这些任务必须有一个自执行方法 next(),将他们串联起来达到让任务队列中的方法按照顺序 一个个执行

    2-3 : 这些任务必须等全部加入队列后才能执行,从第一个加入任务队列的方法开始依次执行
 3: 思考
 */

class LazyMan {
  constructor(name) {
    console.log(`hi i am  ${name}`);
    this.taskList = [];
    setTimeout(() => {
      this.next();
    }, 10);
  }
  eat(food) {
    const _this = this;
    const fn = ((food) => {
      return function eat() {
        console.log(` i am eating ${food}`);
        _this.next();
      };
    })(food);
    this.taskList.push(fn);
    return this;
  }
  sleep(time) {
    const _this = this;
    const fn = ((t) => {
      return function () {
        setTimeout(() => {
          console.log(` i am sleeping ${t} seconds`);
          _this.next();
        }, t * 1000);
      };
    })(time);
    this.taskList.push(fn);
    return this;
  }
  sleepFirst(time) {
    const _this = this;
    const fn = ((t) => {
      return function () {
        setTimeout(() => {
          console.log(` i were sleeped ${t} seconds`);
          _this.next();
        }, t * 1000);
      };
    })(time);
    this.taskList.unshift(fn);
    return this;
  }
  next() {
    const fn = this.taskList.shift();
    console.log();
    typeof fn === "function" && fn();
  }
}
function lazyMan(name) {
  return new LazyMan(name);
}
lazyMan("Bob").eat("apple").eat("meat").sleepFirst(2).sleep(3).eat("pizza");
