/**
 用于测试的例子
 <button id="btn">click1</button>
 <button id="btn">click2</button>
 <button id="btn">click3</button>
 */

/**
 竟态，意思是程序的运行结果与时间有关，可能前一秒是 A 结果但是推迟几秒后是 B 结果。
 日常开发中 最常见的就是一个页面 通过点击不同的按钮来 展示不同的结果  axios 取消请求
 axios 的cancelToken() 加入这个请求是已经发送到了服务器 只是前端忽略了后台返回的结果 那还是会造成网络浪费



 */

const sleep = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
};
let totalCount = 0;
async function getPosts(userId) {
  console.log(userId);
  const users = [
    { id: 1, posts: 5 },
    { id: 4, posts: 3 },
  ];
  await sleep(userId);
  return users.find((user) => user.id === userId).posts;
}

async function addPosts(userId) {
  const posts = await getPosts(userId);
  console.log(totalCount, "totalCount before");
  totalCount += posts;
  //  读取和赋值totalCount的是微任务,一定会等到getPosts的结果返回.
  //  将返回的结果赋值给totalCount,
  // 第二次读取totalCount时, 此时全局的totalCount已经第一次执行完的getPosts()赋值
  console.log(totalCount, "totalCount after");
  //   console.log("total brfore", totalCount);
  //   会导致 promise 竞态的写法 addPosts(1)与addPosts(2)同步读取totalCount时,读取都是初始值0
  // totalCount += await getPosts(userId);
  //   console.log("total after", totalCount);
}
const start = async () => {
  await Promise.all([addPosts(1), addPosts(4)]);
  console.log(totalCount);
};
//start();

let btn = document.querySelectorAll("#btn");
let btn1 = btn[0];
let btn2 = btn[1];
let btn3 = btn[2];
let num = 0;

btn1.addEventListener(
  "click",
  () => {
    num = 1;
    getQuery().then((res) => {
      console.log(res);
    });
  },
  false
);
btn2.addEventListener(
  "click",
  () => {
    num = 2;
    getQuery().then((res) => {
      console.log(res);
    });
  },
  false
);
btn3.addEventListener(
  "click",
  () => {
    num = 3;
    getQuery().then((res) => {
      console.log(res);
    });
  },
  false
);

function getQuery() {
  num++;
  let curNum = num; // 2
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num === 2) {
        resolve("click btn1 res");
      } else if (num === 3) {
        resolve("click btn2 res");
      } else if (num === 4) {
        resolve("click btn3 res");
      }
      resolve(num);
    }, Math.random() * 1000);
  }).then((res) => {
    console.log(curNum, "curNum then ");
    console.log(num, "num then ");

    /**
     * 当点击 btn3 的时候 全局的 num 会发生立即发生改变  变为 3 执行 getquery()后 num 变为4 cunNum 也变为4,
     *  因为 then 里面是微任务 所以当btn3的微任务执行的时候,只要点击了其他的 btn 总是能拿到全局最新改变的 num
     * btn3的闭包 curNum 与 最新的 num 比较, 若不相等 ,则说明发生了切换事件 btn3点击的结果应该摒弃.
     *  每个 btn 点击时候 curNum 记录当前点击的是哪个 btn
     * 只要curNum 与 全局的num 不相等 则说明发生了新的 点击事件  上一次点击的结果被废弃
     */
    if (curNum === num) {
      return Promise.resolve(res);
    } else {
      return Promise.reject("fail");
    }
  });
}
