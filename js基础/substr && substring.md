##  区别

 #### 1 当两者都为一个参数的时候，用法相同

#### 2 当两者为两个参数的时候

* substr( startIndex, length 截取的字符串的长度];
  * “goodboy”.substr(1,6);  //oodboy
* Substring(startIndex, end  结束位置的字符串的索引)
  * “goodboy”.substring(1,6); //oodbo
  * Tips : 
    * substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点
    * start 或 end 为 NaN 或者负数，那么将其替换为0

* slice（ start, [,length]）
  * slice（-6） 截取的区间为  slice（str.length + (-6)）
  * Slice( -6, -4)  截取的区间为 slice(str.length + (-6), str,length + (-4))