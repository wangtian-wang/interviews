const trafficLight = {
  green: 2000,
  yello: 1000,
  red: 3000,
};
function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time || 1000);
  });
}

async function changeColor(color) {
  document.getElementById("traffic-light").style.backgroundColor = color;
  await delay(trafficLight[color]);
}
async function run() {
  for (let key in trafficLight) {
    await changeColor(trafficLight[key]);
  }
  run(); // 这个run的作用是当执行了一轮循环后, 再次递归的执行循环.
}
run();
