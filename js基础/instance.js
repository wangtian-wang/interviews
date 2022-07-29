function instance(left, right) {
  if (typeof left !== "object") return false;
  if (typeof right !== "function")
    throw new TypeError(`${right} must be function`);
  let left_proto = Object.getPrototypeOf(left);
  let right_prototype = right.prototype;
  while (true) {
    if (!left_proto) return false;
    if (left_proto === right_prototype) return true;
    left_proto = Object.getPrototypeOf(left_proto);
  }
}
