## Blob
* 定义
  *  1： 广泛定义 ：表示二进制类型的大对象 一般在数据库的管理系统中，将二进制数据存储为一个单一个体的集合 
  *   2： js 定义 ： 原始的不可变的类文件对象的原始数据
* 类型
  * 影响，声音，或者多媒体文件
* 特点
  * Blob表示的不一定是 JS 原生格式的数据 。比如file接口基于blob。继承了blob的功能
* 组成： 
  * type + bodyParts
  ```js
    const blob = new Blob( [Blob | ArrayBuffer| DomString],{type: ''})

  ```
  
## ArrayBuffer
* 定义
  * 它⽤于表示通⽤的，固定⻓度的原始⼆进制数据缓冲区 你不能直接操纵 ArrayBuffer 需要创建⼀个 TypedArray 对象 或 DataView 对象

## 区别
![](blob&&arrayBuffer.png)

