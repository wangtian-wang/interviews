## 定时器中的应用
```
const obj = {
    name: 'object-1',
    fn: () => {
       console.log(this.name)
    }
}

setTimeout(fn,time)
 定时器中传入的是一个回调函数的函数体，到了时间就会自动执行；

case 1 setTimeout(obj.fn,1000)
直接将obj.fn对应的 函数体 作为回调函数，到了时间后执行， 此时的运行环境是window。

case 2 setTimeout(function（）{
    obj.fn()
},1000)
定时器的回调函数是一个匿名函数，在函数的作用域里面找到obj.fn,并且执行。 谁调用函数，this指向谁

case 2 setTimeout(obj.fn.bind(obj),1000)
    obj.fn执行，将函数执行的上下文和obj绑定
```