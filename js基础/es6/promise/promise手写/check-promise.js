const checkPromise = (fn) => {
  if (fn !== null && typeof fn === "function") {
    var then;
    try {
      then = fn().then;
    } catch (err) {
      return false;
    }
    if (typeof then === "function") return true;
  } else {
    return false;
  }
};
function test() {
  return new Promise((resolve, reject) => resolve());
}
function isPromise(p) {
  return p && Object.prototype.toString.call(p) === "[object Promise]";
}
let res = checkPromise(test);
console.log(isPromise(test()), "-----");
module.exports = {
  checkPromise,
};
