const _instanceOf = (obj, constor) => {
  let proto = obj.__proto__;
  let flag = false;
  while (proto) {
    if (proto === constor.prototype) {
      flag = true;
      return flag;
    }
    proto = proto.__proto__;
  }
  return flag;
};
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
