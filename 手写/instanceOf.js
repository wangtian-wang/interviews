function myInstanceOf(obj, fn) {
  if (typeof obj !== "object" || obj === null) return false;
  let objProto = Object.getPrototypeOf(obj),
    constorProto = fn.prototype;
  while (true) {
    if (objProto === constorProto) {
      return true;
    }
    if (objProto === null) {
      return false;
    }
    objProto = Object.getPrototypeOf(objProto);
  }
}
