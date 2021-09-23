```
Function.prototype === Function.__proto__  true
Object.__proto__ === Function.prototype    true 
Object.__proto__ === Function.__proto__    true

Object.prototype.__proto__       null
Object.__proto__ : 
                    ƒ () { [native code] }  

Object.prototype: 
                    {
                        constructor:() => {

                        }
                    }
```

## different options
```
先有的Object.prototype， Object.prototype构造出Function.prototype，然后Function.prototype构造出Object和Function。


idea2: 
JavaScript引擎是个工厂。最初，工厂做了一个最原始的产品原型。这个原型叫Object.prototype，本质上就是一组无序key-value存储（{}）之后，工厂在Object.prototype的基础上，研发出了可以保存一段“指令”并“生产产品”的原型产品，叫函数。起名为Function.prototype，本质上就是[Function: Empty]（空函数）为了规模化生产，工厂在函数的基础上，生产出了两个构造器：生产函数的构造器叫Function，生产kv存储的构造器叫Object。你在工厂定制了一个产品，工厂根据Object.prototype给你做了一个Foo.prototype。然后工厂发现你定制的产品很不错。就在Function.prototype的基础上做了一个Foo的构造器，叫Foo。工厂在每个产品上打了个标签__proto__，以标明这个产品是从哪个原型生产的。为原型打了个标签constructor，标明哪个构造器可以依照这个原型生产产品。为构造器打了标签prototype，标明这个构造器可以从哪个原型生产产品。

作者：知乎用户
链接：https://www.zhihu.com/question/35442532/answer/62984459
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```