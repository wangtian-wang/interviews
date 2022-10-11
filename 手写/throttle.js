/**      html 结构
        let btn = document.getElementById('btn');
        let btnFn = function(num) {
            console.log(num)
        }
        btnFn = throttleWithTimer(btnFn.bind(null,'hello fn'), 1000) 使用bind为要执行的函数传递参数
        btn.addEventListener('click', btnFn ,false)
 */
function throttleWithTimer(fn, delay) {
  let timer = null;
  return function () {
    // let _this = this;  箭头函数 内部的this指向可以不用改变
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}
function throttle(fn, delay) {
  let timer = null,
    startTime = Date.now();
  return function () {
    let curTime = Date.now(),
      _this = this,
      passedTime = curTime - startTime, // 已经过去了多长时间
      remainTime = delay - passedTime / 1000; // 还有多长时间才能运行这个任务
    clearTimeout(timer);
    if (remainTime <= 0) {
      fn.apply(_this, arguments);
    } else {
      timer = setTimeout(fn, delay);
    }
  };
}

function throttleExecNow(fn, delay) {
  let oldTime = delay || 1000;
  return function () {
    let curTime = new Date().getTime();
    if (curTime - oldTime >= delay) {
      oldTime = curTime;
      fn.apply(this, arguments);
    }
  };
}
