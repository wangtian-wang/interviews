/**
 总结: 该问题的实质是: 匀速   1秒钟 走300米
 */

function animate(dom) {
  const oDom = document.querySelector(`.${dom}`);
  let time = 0,
    timer = null;
  // 匀速运动公式: t 已经运动的时间 b 起始位置 c 总距离 d 总时间 => 当前运动到的位置
  const linear = function linear(t, b, c, d) {
    return (c * t) / d + b;
  };
  timer = setInterval(() => {
    time += 17;
    if (time >= 1000) {
      clearInterval(timer);
      oDom.style.transform = `translateX(300px)`;
      return;
    }
    let cur = linear(time, 0, 300, 1000);
    oDom.style.transform = `translateX${cur}px`;
  }, 17);
}
