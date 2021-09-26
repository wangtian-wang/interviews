
## JS规定，任何字面量函数可以看做都是Function new出来的，所以任何 **字面量函数**的原型链指向 Function.prototype
* Object.__proto__ === Function.prototype 
* Function.__proto__ === Function.prototype
## constructor
    * 任何构造函数的prototype 天生都有constructor 属性，指向构造函数;
    * 实例的也能访问constructor
   
    function Fn() {

    }
    Fn.prototype.constructor === Fn ;
    const fn = new Fn();
    fn.constroctor === Fn
## instanceof
    *  如 a instanceof b 就看 b的 prototype有没有出现在a的原型链上