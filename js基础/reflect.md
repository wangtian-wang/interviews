## reflect

* 将对对象原型上面的方法，变得易于访问，可以直接使用 reflect 函数上面的和对象原型上面相等的方法，来进行访问
* 可以避免访问对象_proto_上面的属性；
* 常用的方法

```
Reflect.set(target, 'prop1', 'prop2') 给对象增加属性；
```



```js
Reflect.ownKeys(target) 返回对象所有的key

```

```js
Reflect.has(target, prop) 检测对象是否有某种属性；
1: 相当于 in 操作符；主要用于遍历对象的可枚举属性，包括自有属性、继承自原型的属性
1： 是否是检测对象自身的属性 or 原型的属性
```

## proxy

* 可以对被代理的对象经过一系列的操作，
* 可以对对象的所有属性进行监听；
* 有相应的handler函数，来进行辅助操作；
* 最常用的方法是 ： get ： set ： has  只能在判断一个对象上面有某种属性的时候  property inobject 可用 不可以拦截 for in 遍历的方法 ： delete 

* Proxy 的set方法，需要return true 告诉程序，当前执行成功，后面可以继续执行

  ```js
  const proxy = new Proxy(obj, handler:{
    get(obj,key){
      return obj[key]
    },
    set(obj, key,value) {
      obj[key] = value
      return true
    }
  })
  ```

  