/**
 观察者模式

  观察者 订阅者 
  订阅者将观察者 收集起来 当订阅者的行为发生变化的时候 执行观察者的一些操作
 
 发布订阅者模式

   发布者 订阅 事件中心

订阅者先将自己添加到事件中心, 发布者也将自己的消息发布到事件中心, 事件中心统一处理这些已经订阅的事件

 */

class Subscribe {
  constructor(name, state = "success") {
    this.state = state;
    this.name = name;
    this.observer = [];
  }
  addObserver(fn) {
    this.observer.push(fn);
  }
  setState(state) {
    this.state = state;
    this.stateChange();
  }
  stateChange() {
    // 可以将任何想传递的信息 给到观察者
    this.observer.forEach((ob) => {
      ob.doSomething(this.state);
    });
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }
  doSomething(state) {
    console.log(`${this.name}: 观察到了${state}`);
  }
}

const s = new Subscribe("baby", "happy");
let o1 = new Observer("o1");
let o2 = new Observer("o2");
s.addObserver(o1);
s.addObserver(o2);
s.setState("excited");

const eventCenter = {
  subs: [],
  on(fn) {
    this.subs.push(fn);
  },
  emit(sub) {
    this.subs.forEach((fn) => fn(sub));
  },
};
eventCenter.on((sub) => {
  console.log("xiaoming : 订阅了" + sub);
});
eventCenter.on((sub) => {
  console.log("xiaoGang : 订阅了" + sub);
});
eventCenter.on((sub) => {
  console.log("xiaoAi : 订阅了" + sub);
});
eventCenter.emit("xi hua news");
eventCenter.emit("yang cheng  news");
