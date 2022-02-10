## 原型

[[prototype]] 是对其他对象的引用。

所有普通的[[prototype]] 都会指向 object.prototype;

所有的函数都默认拥有一个原型对象 通过 函数名.prototype 的引用来访问它

## 继承

js 中没有类（类似于 Java 的类)，所以 通过构造函数 或者 class 关键字 new 出来的是一个实例对象，并不是实例

js 中的 继承 关键字 只是将生成的实例对象和构造器关联了起来。

类中的 继承 是将父类中的属性和行为全部复制到子类当中

传统的语言中 继承意味着 复制操作 js 并不会复制对象属性或者方法 只会在构造函数或者 class 之间简历一种联系 这样一个对象就可以通过委托访问另外一个对象的属性和函数

### 构造函数

###### 构造函数的 constructor 属性

```javascript
javascript;
function Foo() {}
console.log(Foo.prototype.constructor === Foo);
const foo = new Foo();
console.log(foo.constructor === Foo);
```

- 任何一个构造函数都有一个共有的并且不可枚举的.constructor 属性 这个属性引用的是构造函数自身
- foo.constructor === Foo ???

  ```javascript
  javascript
  foo.prototype = Foo.prototype
  Foo.prototype.constructor = Foo
  foo.constructor = Foo
  最主要的原因是 foo.prototype = Foo.prototype 通过这层关系， foo.constructor 才会指向 Foo


  ```

  - constructor 并不表示 实例对象是由它构造的。 并且 constructor 容易被修改 是一个非常不可靠并且不安全的引用；

###### 何为构造函数

- js 中所有的函数都是普通函数 只有使用 new 调用的函数 才是构造函数。 new 会劫持所有的普通函数 并用构造对象的形式来调用它

### （原型)继承 prototype

###### 方式

###### prototype ：优点

###### prototype ：缺点

- 构造函数需要执行一次 需要使用 new 来调用构造函数

### class

- js 中 只有 class 关键字有 继承 的功能 只有类的类之间才会有继承关系这样的说法
- class 是[[prototype]]的语法糖

###### class： 优点

- 没有使用.prototype
- 可以通过 super 来实现多态 子类可以引用原型链上层的同名方法 并且可以重新定义此方法
- 可以通过 extends 自然的扩展子类型 甚至是内置子类型。
- 总结 ： 解决额原型分格代码中显而易见的语法问题。

###### class：缺点

- 子类可以修改或者替换父类中的方法
- 无法定义成员属性，只能定义方法 无法跟踪实例之间的共享状态
- super 静态绑定 根据情况需要手动绑定

###### 构造函数继承

- 实际上是构造函数 和实例之间的关系。对象内部通过 prototype 关联

#### 构造函数继承

- 子类的 constructor 容易丢失,改为 Object.defineProperties 定义 constructor

```javascript
javascript;
function Foo(name) {
  this.name = name;
}
Foo.prototype.myName = function () {
  return this.name;
};
function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}
Bar.prototype = Object.create(Foo.prototype); //  构造函数重新设置prototype的安全方法 实例化必须发生在该方法之后 实例才能继承FOO的方法；
// Bar.prototype.constructor = Bar    // 将BAR的构造函数重新设置回Bar 但是这种方式定义的constructor 可以被枚举出来 不能采用这种方式
Object.defineProperties(Bar.prototype, "constructor", {
  value: Bar,
  enumable: false,
});
Object.setPrototypeOf(Bar.prototype, Foo.prototype);
Bar.prototype.myLabel = function () {
  return this.label;
};
const bar = new Bar("bar", "bar bar");
```

#### 构造函数.prototype**proto**

```javascript
function Person(name, sex) {
  this.name = name;
  this.sex = sex;
}
Person.prototype.sayHi = function sayHi() {
  console.log("hi~~");
};
function XiaoMing() {}
const xiaoming = new XiaoMing();
XiaoMing.prototype.__proto__ = Person.prototype; //改造函数的__proto__ 优点 :该构造函数可以保存自己的prototype; 实例即使在该修改方法之前 也能继承Person的方法；
XiaoMing.prototype.sayHello = function () {
  console.log("say hello ~~");
};
xiaoming.sayHi();
xiaoming.sayHello();
```

#### 优点：

- 该构造函数可以保存自己的 prototype;
- 实例化即使在该修改方法之前 也能继承 Person 的方法；

#### 原型工厂继承

```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  Object.defineProperty(sub.prototype, "constructor", {
    value: sub,
    enumable: false,
  });
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.eat = function eat() {
  console.log("eatting" + this.name);
};
function ZhangSan(name, age) {
  Person.apply(this, [name, age]);
}
extend(ZhangSan, Person);
const zhangsan = new ZhangSan("zhangsan", "12");
zhangsan.eat();
```

#### 对象工厂继承

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.eat = function eat() {
  console.log("eatting" + this.name);
};
function zhangsan(name, age) {
  const instance = Object.create(Person.prototype);
  Person.apply(instance, [name, age]);
  return instance;
}
const zs = zhangsan("zhangsan", 13);
zs.eat();
```

#### mixin 多继承

```javascript
const dancing = {
  dance() {
    console.log(this.name + "dancing");
  },
};
const singing = {
  sing() {
    console.log(this.name + "singing");
  },
};
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = Object.assign(Person.prototype, singing, dancing);
const zs = new Person("zhangsan", 13);
zs.sing();
zs.dance();
```

#### instanceof

- 判断普通对象的[[prototype]]链中是否有构造函数.prototype 指向的对象

#### 如何判断两个对象是否通过[[prototype]]关联 **isPrototypeof** ？？？

B.i**_sPrototypeof_**(A) B 对象是否出现在 C 对象的[[prototype]]

#### object.getPrototypeof() 直接获取一个对象的[[prototype]]

#### \_**\_proto 是啥？？**

- 是浏览器支持的一种非标准的方法来内部的[[prototype]]属性， 是内置的 object.prototype 的一个属性 不可枚举； 但是可以设置

#### object.create()与原型链创建的对象有何区别？？？

- object.create()会创建一个新对象，并且把它关联到我们指定的对象 \*\*并且避免了使用 new 构造函数会生成.prototype .constructor 的引用
- Object.create(null)创建的对象没有 prototype， 无法通过 instanceof 判断， 适合来存储数据
- object.create(object,{b: {enumerable:true}}) 修改对象的属性描述符

  polyfill()的实现

  ```javascript
   if(!Object.create()){
     Object.create = function(o){
       function Fn = {};
       Fn.prototype = o
       Object.definedProperty(Fn.prototype, 'constructor', {value: Fn,enumable: false}) // 解决修改完原型对象后 constructor丢失的问题
       return new Fn()
     }
  }
  ```

- 缺点： 使用 object.create()更改对象的原型 实例直接调用原型上面的方法 这个行为会让对象的 api 看起不清晰，难以维护 可以采用更好的做法 **_内部委托_**

  ```javascript
  const Obj = {
    hello() {
      console.log("say hello");
    },
  };
  const obj1 = Object.create(Obj);
  obj1.hello = function () {
    this.hello();
  };
  obj1.hello();
  ```

# proxy()实现的是在对象的属性无法找到时的行为？？？

#### 对象委托

```javascript
 const Task = {
   setId:function(id){this.id = id;},
   printId: function(){console.log(this.id)}
 }

const obj = Object.create(Task);
obj.setLabel = function(label){
  this.setId();  // 委托行为在内部实现
  this.label = label;
}
obj.printLable = function(){
  this.printId(); // 委托行为在内部实现
  console.log(this.label)
}
给Obj增添属性 不会影响Task


```

- 委托模式的优点

  - 让代码看起来更加简介
  - 委托模式简化代码结构
  - 不需要实例化对象 (new)
  - 委托可以基于[[prototype]]非常自然的实现

本书作者认为基于委托的对象关联能还可以通过委托模式简化代码结构

#### 总结

- [[prototype]] 机制 是一个对象的内部链接引用另外一个对象 本质是对象之间的关联关系。
- 一个构造函数的 prototype 是一个对象 里面包含了 定义在 prototype 对象上的方法 和 constructor 方法； constructor 方法 指向构造函数自身。
- `Person.prototype.constructor` 可以访问构造函数的代码段 ` Person.constructor` 得到的是一个 native code
- 只有修改构造函数的 prototype 属性 会对实例的 instanceof 的原型判断

  ```javascript
   case 1
  Person.prototype = new Animal();
  console.log(new Animal())   // Animal {name: 'dogAnimal'}
  Person.prototype = Animal {name: 'dogAnimal'}
  const p1 =  new Person();
  p1.__proto__ = Animal {name: 'dogAnimal'}
  p1.instanceof Animal // true

  case 2
  Person.prototype = new Animal().__proto__;
  实例的所有属性都在构造器上面；
  实例的__proto__ 指向构造函数的prototype

  对象的构造函数的prototype 直接或者间接指向那个构造函数 这个构造函数就出现在对象的原型链上面
  ```

- chrome 控制台打印一个实例化的对象 返回的是 new 后面的函数
-
