// 页面中的定时器的 setTimeout setInterval id都是从1开始生成的,  ID1 = 1= setTimeout  ID2 = 2= setInterval的 ; 重新生成一个定时器的id是多少,就代表前面已经生成了n-1个定时器
let timeId = setTimeout(() => {}, 1000);
for (let i = 0; i <= timeId.length; i++) {
  clearTimeout(i);
  clearInterval(i);
}
