#### 去除字符转首尾空格的正则表达式

> /(^\s*)|(\s*$)/igm

#### 判断一个 URL 是否是合法的

```js
function checkUrl(URL) {
  var str = URL;
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(str) == true) {
    return true;
  } else {
    return false;
  }
}
```
