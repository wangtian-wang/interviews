

```js
1:  const  isUpload = (e.target.value === 'upload')
```

获取数组的最后一个元素

```js
1:  const  item = array.slice(-1)

2:  const item = array.at(-1)

at 方法传递索引为正时从左往右定位（这与直接通过下标访问的作用一致），索引为负时从右往左定位。
```

#### Compose 

##### 同步的compose

```js
const add = (val) => Promise.resolve(2 + val)
const mul = (val) => Promise.resolve(2 * val)
const sub = (val) => Promise.resolve(val -2)

const compose = (middlewares) => (initialValue) => middlewares.reduceRight((accu, cur) => cur(accu), initialValue)
const fn = compose([add,mul,sub])
const res = fn(6)
console.log(res)



```

#####  异步的compose

```js
const add = (val) => Promise.resolve(2 + val)
const mul = (val) => Promise.resolve(2 * val)
const sub = (val) => Promise.resolve(val -2)

const asyncCompose = (middlewares) => (initialValue) => middlewares.reduceRight(
    (queue, hook) => queue.then(res => hook(res)),
    Promise.resolve(initialValue)
);
const asyncFn = asyncCompose([add,mul,sub])

asyncFn(6).then(res => {
    console.log(res)
})
```

####  解构赋值要给默认值 否则会报错

```js
1:  const  isUpload = (e.target.value === 'upload')
```

####  检查一个对象时候有某个自身属性

```js
Object.hasOwn() 存在兼容性问题
```

#### `Object.keys` 或者 `Object.entries` 转成数组就可以用数组方法遍历了

```js
const _stringify = (obj) => Object.entries(obj).map(([key, val]) => `${key}=${val}`).join("&");

_stringify({
    a: 1,
    b: 2,
    c: "2333"
});
```

#### 日期补0

```js
1:  let date = new Date().getDate(); // 3
     date = `0${date}`.slice(-2);
2:   date = `${date}`.padStart(2, 0);
```

#### 千分位分隔符

```js
"300000000".replace(/(?=(\d{3})+$)/g, ",")
```



```js

```



```js

```

