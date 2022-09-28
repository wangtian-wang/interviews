/**
 注意点： 
 
   1:当浏览器进入后台运行时，被激活的tab的定时最小延迟 >= 1000ms 定时器会暂停执行； 暂停的时间各个浏览器的标准不同
   2:在同一个全局对象(window,worker)里面,公共一个id池
   3: 最大延时 为24.8天,超出最大延时,定时器就会被立即执行 -> 浏览器内部以32位带符号的整数存储延时.

   setInterval()
   缺点
        做不到按照设置的时间间隔,去准确的执行任务
   原因:
    并不一定是按照设定的间隔时间去执行回调, 而是按照间隔时间,间隔回调任务加入到任务队列里面,
   
   但是执行栈每次只能执行一个任务,因此导致了时间间隔不准确,

   关于定时器的延迟时间

   1:  最小延时>=4ms ,由于回调里面的任务耗时,或者是函数嵌套,导致实际的延迟时间会比期待的时间长

   2:  



   原因：
     1： 当前任务队列里面只要有定时器代码 那么新的定时器代码不会被添加到队列里面；
     2： 多个定时器代码会连续执行；
     3： 对于定时器的回调代码 等到定时时间到了后 才会被加入回调队列；

    setTimeout（）的特点：
     按照延迟时间,只执行一次将回调函数 加入任务队列的操作
 

    当前文件夹下面的定时器图片 是定时器加入任务队列的详细图解


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
/*  setTimeout() 实现    不正确版本        */
function newInterval(fn, millisecond) {
  function inside() {
    fn();
    setTimeout(inside, millisecond);
  }
  inside(); // fn 没有加入异步回调,而是同步执行的
}
newInterval(fn, 1000);

/*  setTimeout() 实现    正确版本        */
function interval(fn, seconds, time = 5) {
  let count = 1;
  function inside() {
    if (count <= time) {
      fn();
      setTimeout(inside, seconds); // 模拟递归 间隔执行fn
      count++;
    }
  }
  setTimeout(inside, seconds); // 将fn的执行加入异步队列
}
function print() {
  console.log(" interval test");
}
interval(print, 500);

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
