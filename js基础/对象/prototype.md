## **\_proto\_** prototype

```javascript
[Array, Object,Function, Date, Reg,Number,Boolean...]._proto_ = Function.prototype

[Array, Object,Function, Date, Reg,Number,Boolean...].prototype._proto_ = Object.prototype

object.prototype._proto_ = null

```

JS 规定，任何字面量函数可以看做都是 Function new 出来的，所以任何 **字面量函数**的原型链指向 Function.prototype ->所有内置函数

## 判断对象和构造函数的关系的方法

1. instanceof
   1. 如 a instanceof b 就看 b 的 prototype 有没有出现在 a 的原型链上
2. constructor
   1. a.constructor === b

## 手写 instanceof

```javascript
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
```
