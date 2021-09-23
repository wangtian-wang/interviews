var o = {
    a: 1,
    b: 2
};
function decorator (fn) {
    /** 拿到将要增加的新属性的值， 可以做一些预先的校验 */
    return function (needToBeDecorateObj) {
        return Object.assign(needToBeDecorateObj,fn())
    }
}
o = decorator(
    function () {
    // 需要被装饰的属性
        return {
            c: 3
        }
    }
)(o);
console.log(o);
function decoratorSum (fn) {
    /** 拿到将要增加的新属性的值， 可以做一些预先的校验 */
    return function (needToBeDecorateObj) {
        let sum = 0;
        for (let key in needToBeDecorateObj) {
            sum += needToBeDecorateObj[key]
        }
        return Object.assign(needToBeDecorateObj,fn(sum))
    }
}
o = decoratorSum(
    function (sum) {
    // 需要被装饰的属性
        return {
            c: sum * 2
        }
    }
)(o);
console.log(o)



函数的作用域 
函数在那个环境定义 就在当前环境里面查找变量的作用域  和函数调用的位置没有关系
函数执行时候的变量查找规则 作用域 和函数定义时候的环境相关
function foo () {
  var name = 'lucky';
   return function bar (){ 吗
    // console.log(this.name); 
     return name
  };
};
var name = 'unlucky';
 var res = foo(); 
res()// lucky  
res 是全局的变量 引用这个foo函数的闭包 闭包不会被js引擎及时回收，需要手动清除。否则会造成内存泄漏。

函数的this 指向和 函数的调用者相关

function foo () {
  var name = 'lucky';
  console.log(this.name);
};

var name = 'unlucky';
var obj = {
  name: 'bob'
}
foo.call(obj,222);


// 将递归的函数处理成为一般的函数
function runStack(n) {
  if(n === 0) return 'tast end';
  return runStack.bind(null,n - 2);
};
function temp(fn){
  while(fn && fn instanceof Function){
    fn = fn();
  }
  return fn;
};
temp(runStack(10000));

//关于this的坑
1： 嵌套函数中的this 不能从外层继承；
var obj = {
    name: 'lisa',
    getname(){
        console.log(this.name);
        function inner(){
            console.log(this.name); // 指向window， window上面没有name属性 为undefined
        }
        inner();
    }
};
obj.getname();
