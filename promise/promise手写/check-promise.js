export const checkPromise = (fn) => {
  if (fn !== null && typeof fn === "function") {
    var then;
    try {
      then = fn.then;
    } catch (err) {
      return false;
    }
    if (typeof fn === "function") return true;
  } else {
    return false;
  }
};
