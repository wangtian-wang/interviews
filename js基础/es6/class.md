## class

* 类可以访问自己的静态方法和属性
* 类访问 get 定义的方法， 和普通方法得到的是 undefined, 加（）调用方法就会报错

### class instance

* 类的实例可以继承类的公共属性和方法；
* 实例可以访问并且继承带get 的方法（或者说是属性更加贴切）

### get +  methods

* get 定义的方法在调用的时候不用加（）
* get 定义的方法实例都能继承
* 可以访问类的私有属性，并且可以返回类的私有属性



### methods

* 类里面的方法        可以访问类的私有属性，并且可以返回类的私有属性

* 类的普通方法里面不能访问到类的静态属性

### static

* 凡是带有static 定义的属性和方法，实例不能访问
* 静态方法通常创建工具函数

###  static get methods

* 类的静态方法里面不能访问私有属性
* 静态方法可以访问静态属性

### #privateAttr

* 公共方法里面可以访问类的私有属性，可以将私有属性 return 出去
* 类的私有属性不能继承给实例对象；

## this

* 当调用静态或原型方法时没有指定 *this* 的值，那么方法内的 *this* 值将被置为 **`undefined`**

  ```javascript
  class Animal { 
    speak() {
      return this;
    }
    static eat() {
      return this;
    }
  }
  
  let obj = new Animal();
  obj.speak(); // Animal {}
  let speak = obj.speak;
  speak(); // undefined
  
  Animal.eat() // class Animal
  let eat = Animal.eat; // 定义了一个变量eat将类的eat方法赋值给变量eat。
  eat(); // undefined
  ```

  



## 字段申明

类的共有字段可以不用声明，直接赋值

类的私有字段仅能在字段声明中预先定义，然后赋值，否则报错

## 抽象类
* 1： 以abstract 开头的类是抽象类。在抽象类中 以abstract开头的方法是抽象方法
* 2： 抽象类     不能用抽象类来创建 new 一个对象，专门用来被继承的类，爸爸类。
* 3： 抽象方法   抽象方法只能定义在抽象类中，子类必须进行重写。
```
    abstract class Person {
        abstract sayHello():void; // 没有返回值
    }
```