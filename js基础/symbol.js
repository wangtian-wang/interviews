/* 
数据类型 
      1： 原始的数据类型；2：每个数据都是独一无二的；3：不能使用new 操作符；4:可以基于Object([value])变为包装器对象【实例对象】

*/

/* 
方法 
1： 基础用法
语法： Symbol('descriptor')  以此种方法定义的symbol 里面的描述符不能获得
const a = Symbol('a');
const b = Symbol('a');
console.log(a === b) false

2： 进阶用法：
Symbol.for("descriptor");
用法： 从全局的Symbol注册表里面 找对应的symbol；找到则返回，找不到就创建一个
const a = Symbol.for("AAA");
const b = Symbol.for("AAA");
console.log(a === b); true

3： Symbol.keyFor(a)
用法： 获取全局symbol注册表中 和某个symbol关联的 'descriptor'
console.log(Symbol.keyFor(a));

*/

/* 
使用场景
    给对象设置唯一的key
    重写Function.prototype.call
    在vuex/redux 公共状态管理的时候。派发的行为标识可以基于Symbol进行宏管理
    [symbol.iterator]                for of 方法的底层原理
    [symbol.hasInstance]             instanceof的底层原理
    [symbol.toStringTag]             面试题
    [symbol.toPrimitive]             隐式转换
    [symbol.asyncIterator]           迭代promise 使promise的执行不受延时器的影响



*/
/*  
举例 

1： [symbol.iterator]  的使用
     ecma6 只要一个对象具备了 [symbol.iterator] 方法 那么，就具备了可以迭代的属性
     但是这个方法的代码有一定的规范 必须要返回一个对象 带有next函数 每次迭代的返回结果是{value: any,done: boolean}
        重写数组的 for of

                arr[Symbol.iterator] = function () {
                let index = 0,
                    self = this;
                return {
                    next() {
                    if (index > self.length - 1) {
                        return {
                        done: true,
                        value: undefined,
                        };
                    }
                    return {
                        done: false,
                        value: self[index++],
                    };
                    },
                };
                };
                for (let v of arr) {
                console.log(v);
                }


        使对象可以使用for of 迭代
            let obj = {
            name: "peter",
            [Symbol("a")]: "a",
            num: 123,
            name: "sam",
            };
            Object.prototype[Symbol.iterator] = function () {
            let _this = this,
                keys = Reflect.ownKeys(_this),
                index = 0;
            return {
                next() {
                if (index > keys.length - 1) {
                    return {
                    done: true,
                    value: undefined,
                    };
                }
                return {
                    done: false,
                    value: _this[keys[index++]],
                };
                },
            };
            };

                for (let item of obj) {
                console.log(item);
                }


2 ： [symbol.hasInstance]
            class Person {
            constructor() {
                this.name = Symbol.for("bob");
            }
            static [Symbol.hasInstance](obj) {
                return obj.name && obj.name === Symbol.for("bob");
            }
            }
            const objP = { age: "bob" };
            // 即使重新设置 obj的原型 但是 在构造函数上面加了属性后 会使得设置的原型失效
            Object.setPrototypeOf(objP, Person.prototype);
            console.log(objP instanceof Person);
3： [symbol.toStringTag] 
            题目描述
             class Fn {}
             let f = new Fn()
             怎样可以让 Object.prototype.toString.call(f)  的结果是 [object Fn]

             实现
                class Fn {}
                Fn.prototype[Symbol.toStringTag] = "Fn";
                let f = new Fn();
                console.log(Object.prototype.toString.call(f));

4： [symbol.toPrimitive]  
            题目描述
             if( a == 1 && a ==2 && a == 3){
                console.log('ok)
             }
            实现

                    let a = {
                    i: 0,
                    };
                    a[Symbol.toPrimitive] = function () {
                    return ++this.i;
                    };

                    if (a == 1 && a == 2 && a == 3) {
                    console.log("ok");
                    }

            原理：
            当 对象 == 数字 时候 对象会被默认装换为数字
            转换过程：
            1： 先看对象的 [symbol.toPrimitive]  这个属性， 如果有这个属性 则按照这个方法进行处理
            2： valueOf() 验证是否是原始值类型，如果是则返回原始值
            3： toString()
            4： 将第三步得到的结果变为字符串

4：  [symbol.asyncIterator] 

const fn1 = () => {
  return new Promise((resolev, reject) => {
    setTimeout(() => {
      resolev("fn1");
    }, 1000);
  });
};
const fn2 = () => {
  return Promise.resolve("fn2");
};
const fn3 = () => {
  return new Promise((resolev, reject) => {
    setTimeout(() => {
      resolev("fn3");
    }, 1000);
  });
};
(async () => {
  let obj = {};
  obj[Symbol.asyncIterator] = async function* () {
    yield fn1();  相当于 await fn1()
    yield fn2();
    yield fn3();
  };
  使用for of 来代替手动调用next（）方法；遍历对象
  for await (let item of obj) {
    console.log(item);
  }
})();







*/
/*  */
/*  */
/*  */
/*  */
let arr = ["a", "b", "c", "d"];
