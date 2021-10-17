/**
  setInterval()的缺点
   setInterval()里面设定的毫秒数 并不一定是按照设定的时间去执行
   原因：
      setInterval() 是每间隔一段时间 把任务加入任务队列里面 等到当前执行栈中没有同步任务执行的时候，才回去执行任务队列里面的任务
      而此时任务队列里面已经加入多个定时器任务，这些任务会被一次性取出来 执行
      setInterval()内部函数的执行时间过长 那会影响下一个任务的执行时间
      所以 任务并不总是按照设定的时间去执行
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
  console.log('new interval peer 1"s print')
}
function Interval (fn) {
  setInterval((fn) => {
    for (var i = 0; i < 99; i++){
      console.log(i)
    }
    fn()
  }, 1000);
}
Interval()
/*  setTimeout() 实现            */
function newInterval (fn, millisecond) {
  function inside () {
    fn()
     setTimeout(inside, millisecond);
  }
  inside()
}
newInterval(fn, 1000)
/*  setTimeout() 实现一个可以控制重复次数的循环器 */
/**
 *
 * @param {要执行的函数} fn
 * @param {间隔时间} delayTime
 * @param {执行次数} times
 */
let timer = null;
function delayTimer(fn, delayTime,times){
  let counter = 0;
 function _recurionTimer (){
   if (counter >= times) {
     timer = null;
    return
  };
  counter++;
   timer = setTimeout(() => {
     fn()
     _recurionTimer()
   }, delayTime);
 }
 _recurionTimer()
}
