```js
const obj = {
  a: 1
}
字面量创建出来的对象，等于 new Object()，是对象的构造函数创建出来的，原型是Object.prototype
```





#### object.create();

```js
const protoObject = { a: 1}
const obj = Object.create(protoObject, { props1: {
  // descriptor
  value:11,
  enumerable: true,
  configurable:true, //默认值是false
  
}})
for (k in obj) {
  console.log(obj[k]) // a: 1
}
for in 可以遍历对象原型上面的属性，但是新定义的属性默认是不能访问的。需要将descriptor配置为true

```



#### Objecte.assgin();

```js
const obj = {a: 1}
const newObj = Object.assgin({},obj);
console.log(newObj) // {a: 1}  不能访问对象原型上面的属性，只要obj的属性可枚举就会被能分配到target里面去。但是只是分配属性，不分配属性描述符
```





