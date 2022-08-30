/** ⭐️⭐️⭐️  ==   对象的隐式类型转换
 原始类型和引用类型做比较时，引用类型会依照ToPrimitive规则转换为原始类型。

ToPrimitive规则，是引用类型向原始类型转变的规则，
它遵循先valueOf后toString的模式期望得到一个原始类型。
执行下面的代码 可以证实如上结论

*/
/** 
 ⭐️⭐️⭐️  == 比较规则的隐式类型转换
 - NaN和其他任何类型比较永远返回false（包括和他自己）
 - 原始值变转为Number类型
    - Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型。
        true == 1  // true 
        true == '2'  // false, 先把 true 变成 1，而不是把 '2' 变成 true
        true == ['1']  // true, 先把 true 变成 1， ['1']拆箱成 '1', 再参考规则3
        true == ['2']  // false, 同上
        undefined == false // false ，首先 false 变成 0，然后参考规则4
        null == false // false，同上
    - String和Number比较，先将String转换为Number类型。
    - null == undefined比较结果是true，除此之外，null、undefined和其他任何结果的比较值都为false。

⭐️⭐️⭐️  加减乘除的转换规则
- 我们在对各种非Number类型运用数学运算符(- * /)时，会先将非Number类型转换为Number类型。

⭐️⭐️⭐️  逻辑语句的转换规则 && || 
- 单个变量会尝试将变量转换为boolean值








 */

let valueOf = Object.prototype.valueOf;
let toString = Object.prototype.toString;
Object.prototype.valueOf = function fn() {
  console.log("exec valueof---");
  return valueOf.call(this);
};
Object.prototype.toString = function fn1() {
  console.log(" exec tostring~~");
  return toString.call(this);
};
let a = { a: 1 };
a["toString"] = function () {
  return this.a++;
};

if (a == 1 && a == 2 && a == 3) {
  console.log("bingo");
}

/**          面试题 实现一个obj 满足以下要求                */
let obj = {};
console.log(obj * 2); // 246
console.log(3 + obj); // 3default
console.log(String(obj));
obj = {
  _step: 1,
  toString() {
    if (this._step == 1) {
      this._step++;
      return 123;
    }
    if (this._step == 2) {
      this._step++;
      return "default";
    }
    if (this._step == 3) {
      this._step++;
      return "str";
    }
  },
};
