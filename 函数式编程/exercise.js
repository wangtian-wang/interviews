/**
 * compose 函数需要传递参数 当传递2个参数的时候 该怎样处理
 *
 */

const users = [
  { name: "James", score: 30, tries: 1 },
  { name: "Mary", score: 20, tries: 1 },
  { name: "Henry", score: 50, tries: 2 },
];

const storeUser = (arr, user) => {
  return arr.map((item) => {
    if (item.name.toLowerCase() === user.name.toLowerCase()) {
      return user;
    } else {
      return item;
    }
  });
};

const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const getUser = (arr, name) => {
  return arr.filter((item) => {
    return item.name.toLowerCase() === name.toLowerCase();
  })[0];
};
const updateScore = (user, newScore) => {
  if (user) {
    user.score += newScore;
    return user;
  }
};
const updateScoreBind = (newScore, user) => {
  if (user) {
    user.score += newScore;
    return user;
  }
};
const updateTries = (user) => {
  if (user) {
    user.tries++;
    return user;
  }
};

// 未采用科里化的函数
// const user = getUser(users, "Henry");
// const user1 = updateScore(cloneObj(user), 100);
// const user2 = updateTries(cloneObj(user1));
// const newArray = storeUser(users, user2);

// use bind
const partGetUser = getUser.bind(null, users);
const partUpdateScore = updateScoreBind.bind(null, 30);
const updateUsers = pipe(partGetUser, cloneObj, partUpdateScore, updateTries);
const newArrays = updateUsers("Henry");
