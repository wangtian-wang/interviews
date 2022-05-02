/**
 注意点： 当浏览器进入后台运行时， 定时器会暂停执行； 暂停的时间各个浏览器的标准不同
  setInterval()的缺点
   setInterval()里面设定的毫秒数 并不一定是按照设定的时间去执行

   原因：
     1： 当前任务队列里面只要有定时器代码 那么新的定时器代码不会被添加到队列里面；
     2： 多个定时器代码会连续执行；
     3： 对于定时器的回调代码 等到定时时间到了后 才会被加入回调队列；

    setTimeou（）的特点：
    原因： 
        1： 产生的任务直接push到回调队列 不检查。

    当前文件夹下面的定时器图片 是定时器加入任务队列的详细图解

  如何解决
      使用setTimeout() + 递归
  为啥使用setTimeout()就能解决呢？
      setTimeout（）当代码
          自己总结的 ： 代码运行遇到了setTimeout()会先将这个timeout函数
                加入到 任务队列 等到 当前执行栈没有任务的时候 将任务队列里面的 timeout函数推入执行栈 等到了delay time 执行回调函数
                但如果同一时间向任务队列里面推入了好几个定时器 并且这些定时器的触发事件都相同 那么 等到执行栈中的同步任务清空了 这个定时器 就会全部执行
          这个是蛋蛋老师说的 ：    是到达时间后才执行，运行完一次之后，进行 延迟，再  触发  下一个任务   触发 ： 延迟时间到了后 才在任务队列里面添加任务
          是时间到了后 才加入到任务队列呢？？？
 */
/*  setInterval() 实现的弊端            */
const fn = () => {
  console.log('new interval peer 1"s print');
};
function Interval(fn) {
  setInterval((fn) => {
    for (var i = 0; i < 99; i++) {
      console.log(i);
    }
    fn();
  }, 1000);
}
Interval();
/*  setTimeout() 实现            */
function newInterval(fn, millisecond) {
  function inside() {
    fn();
    setTimeout(inside, millisecond);
  }
  inside();
}
newInterval(fn, 1000);
/*  setTimeout() 实现一个可以控制重复次数的循环器 */
/**
 *
 * @param {要执行的函数} fn
 * @param {间隔时间} delayTime
 * @param {执行次数} times
 */
let timer = null;
function delayTimer(fn, delayTime, times) {
  let counter = 0;
  function _recurionTimer() {
    if (counter >= times) {
      timer = null;
      return;
    }
    counter++;
    timer = setTimeout(() => {
      fn();
      _recurionTimer();
    }, delayTime);
  }
  _recurionTimer();
}

/*  setTimeout（）的妙用 */
/**
 * 实现一个进度条
 * @param {一个dom元素} elem
 */
function process(elem) {
  let i = 0;
  (function run() {
    elem.innerHTML = i;
    elem.style.width = i + "%";
    if (++i <= 100) {
      setTimeout(run, 20);
    }
  })();
}
process(document.querySelector("#process-btn"));

/**
 * 使用异步的方式处理运算量较大的操作 不会阻塞主线程
 *
 * @param {一个较大的数字} num
 */
function sum(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let count = 0;
      for (let i = 0; i < num; i++) {
        count += num--;
      }
      resolve(count);
    });
  });
}
sum(1000000);
console.log("我的执行不受阻塞");

async function sum1(num) {
  let res = await Promise.resolve().then((res) => {
    let count = 0;
    for (let i = 0; i < num; i++) {
      count += num;
    }
    return count;
  });
}
sum1(9999999);
console.log(" exec before exec");
