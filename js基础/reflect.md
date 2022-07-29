## reflect: 提供拦截 JS 操作的方法.

- 将对对象原型上面的方法，变得易于访问，可以直接使用 reflect 函数上面的和对象原型上面相等的方法，来进行访问
- 可以避免访问对象*proto*上面的属性；
- 常用的方法

```js
Reflect.set(target, 'prop1', 'prop2') 给对象增加属性；
```

```js
Reflect.ownKeys(target) 返回包含所有自身属性的数组,不受enumerable影响;

```

```js
Reflect.has(target, prop) 检测对象是否有某种属性；
1: 相当于 in 操作符；主要用于遍历对象的可枚举属性，包括自有属性、继承自原型的属性
1： 是否是检测对象自身的属性 or 原型的属性
```

#### reflect 与 Object 原型方法的区别

1. reflect 不会对于传入的 target 进行强制类型转换
2. Object 会对传入的对象进行强制类型转换

## proxy

- 可以对被代理的对象经过一系列的操作，
- 有相应的 handler 函数，来进行辅助操作；handler 方法其实是对于对象原型上的方法的代理 对代理对象执行 in/getPrototype 等方法时,会触发 handler 对应的方法(`<font color="red">`当 handler 对应的方法已经被定义`</font>`)
- 最常用的方法是 ： get ： set ： has 只能在判断一个对象上面有某种属性的时候 property inobject 可用 不可以拦截 for in 遍历的方法 ： delete
- Proxy 的 set 方法，需要 return true 告诉程序，当前执行成功，后面可以继续执行

  ```js
  const proxy = new Proxy(obj, handler:{
    get(obj,key,receiver){
      return obj[key]
    },
    set(obj, key,value) {
      obj[key] = value
      return true
    }
  })
  ```

- proxy 对象和源对象之间的关系

  - 当一个对象被代理成功后 代理对象和源对象的属性是指向同一个引用
  - 代理可以劫持对于源对象的操作,来控制对于源对象的操作

# receiver 在 proxy 中的意义:

1: 指向 proxy 对象

```js
const obj = {
  name: "wang.haoyu",
};

const proxy = new Proxy(obj, {
  // get陷阱中target表示原对象 key表示访问的属性名
  get(target, key, receiver) {
    console.log(receiver === proxy); // log: true
    return target[key];
  },
});

proxy.name;
```

2: 指向 get 函数调用对象-- 传递正确的调用者指向

```js
(原型上get/set属性访问器的'屏蔽'效果)

const parent = {
  get value() {
    return '19Qingfeng';
  },
};

const handler =  {
  // receiver表示调用get的对象
  get(target, key, receiver) {
    console.log(receiver === proxy); // false
    console.log(receiver === obj) // true
    console.log(this === handler); // true
    return target[key];
  },
};
const proxy = new Proxy(parent,handler);

const obj = {
  name: 'wang.haoyu',
};

// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);
obj.value // log输出为false
```

### 总结: get 访问器的 reciver 的意义就是为了在 get 中传递正确的上下文; reciver 表示`<font color="red">`代理对象本身或者继承与代理对象的对象`</font>`

### 注意: get 中的 this 指向的是代理的 handler 对象

# recvier 在 reflect 中的意义

#### 假设对象 A 继承与一个 proxy 对象 B, A,B 都有 name 属性,此时想要访问对象 A 的属性 name,则会排上用场

```js
const parent = {
  name: '19Qingfeng',
  get value() {
    return this.name;
  },
};

const handler = {
  get(target, key, receiver) {
-   return Reflect.get(target, key);// 19Qingfeng
+   return Reflect.get(target, key, receiver);//wang.haoyu
  },
};

const proxy = new Proxy(parent, handler);

const obj = {
  name: 'wang.haoyu',
};

// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);


console.log(obj.value);
Reflect.get(target, key, receiver) === target[key].call(recevier) 伪代码 相当于将正确的receiver传递给了 reflect
```

### 总结: reflect 中的 receiver `<font color="red">`可以修改 reflect 中属性访问器中的 this 指向为传入的 receiver 对象;`</font>`
