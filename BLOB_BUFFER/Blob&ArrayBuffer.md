## **Blob**

- 定义
  - 1： 广泛定义 ：二进制文件的数据内容，通常用来读写文件
  - 2： js 定义 ： 原始的不可变的类文件对象的原始数据
- 对象使用
  - 浏览器原生提供 Blob()构造函数，用来生成实例。 Blob 的内容由参数中给出的值的串联组成
  - **_用于操作二进制文件_**
- 特点

  - Blob 表示的不一定是 JS 原生格式的数据 。比如 file 接口基于 blob。继承了 blob 的功能

    - new Blob(array [, options]);
      - array 必填 ，array 为**字符串或者二进制对象**，表示新生成的 Blob 实例对象的内容。 array 可以是 ArrayBuffer , ArrayBufferView , Blob , DOMString 等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings 会被编码为 UTF-8。
      - options 可选对象
        - type 表示数据的 MIME 类型
        - endings 用于指定包含行结束符 \n 的字符串如何被写入，默认值 transparent

  - 举例

  ```js
  const leoHtmlFragment = ['<a id="a"><b id="b">hey leo！</b></a>']; // 一个包含 DOMString 的数组
  const leoBlob = new Blob(leoHtmlFragment, { type: "text/html" }); // 得到 blob
  ```

  - 实例属性
    - size
    - type
  - 实例方法
    - slice Bob.slice([start [, end [, contentType]]])
      - start:
      - end : 不包含 end
      - contentType: 新实例的数据类型

## **ArrayBuffer**

- 定义
- 代表存储二进制数据的一段内存
- 不能直接读写 需要创建⼀个 TypedArray 或 DataView 视图来读写 ，视图的作用是以指定格式解读二进制数据。

- 对象使用

  - 浏览器原生提供 ArrayBuffer()构造函数来生成实例
  - **_用于操作内存_**
  - 参数

    - 整数 表示二进制数据占用的字节长度。
    - 返回值 指定大小的 ArrayBuffe 对象，内容被初始化为 0

  - 实例属性：
    - byteLength 表示当前实例占用的内存字节长度（单位字节）只读。
  - 实例方法：
    - slice(start,end)不包括结束位置 参数均为整数

#### TypedArray

#### DataView

## **ArrayBuffer 与 Blob 区别**

![](blob&&arrayBuffer.png)

## **fileList**

- 定义
  - 类数组对象 每个成员都是 File 实例，File 实例是一个特殊的 Blob 实例 增加了 name 和 lastModifiedDate 属性。
- 来源
  - input 选择器返回一个 fileList 对象，
  - 通过拖放文件，查看 DataTransfer.files 属性，返回一个 FileList 实例。
- 实例属性
  - length
- 实例方法
  - item() 返回指定位置的实例，从 0 开始

## **fileReader()**

- 定义
  - 浏览器原生提供的 API，允许 web 应用程序 **异步读取**计算机上的文件 ，既读取 File,Blob 对象所包含的文件内容
- 对象使用

```
`const reader = new FileReader();
```

- 实例属性和方法

  - 实例属性

    - FileReader.error : 表示在读取文件时发生的错误。只读
    - FileReader.readyState : 整数，表示读取文件时的当前状态。只读

    - 共有三种状态：

      - 0 : EMPTY，表示尚未加载任何数据；
      - 1 : LOADING，表示数据正在加载；
      - 2 : DONE，表示加载完成；

    - FileReader.result 读取完成后的文件内容。只读 仅在读取操作完成后才有效，返回的数据格式取决于使用哪个方法来启动读取操作。

- 事件处理

- FileReader.onabort : 处理 abort 事件。该事件在读取操作被中断时触发。
- FileReader.onerror : 处理 error 事件。该事件在读取操作发生错误时触发。
- FileReader.onload : 处理 load 事件。该事件在读取操作完成时触发。
- FileReader.onloadstart : 处理 loadstart 事件。该事件在读取操作开始时触发。
- FileReader.onloadend : 处理 loadend 事件。该事件在读取操作结束时（要么成功，要么失败）触发。
- FileReader.onprogress : 处理 progress 事件。该事件在读取 Blob 时触发。

- 实例方法

  - FileReader.abort()：终止读取操作，readyState 属性将变成 2。
  - FileReader.readAsArrayBuffer()：以 ArrayBuffer 的格式读取文件，读取完成后 result 属性将返回一个 ArrayBuffer 实例。
  - FileReader.readAsBinaryString()：读取完成后， result 属性将返回原始的二进制字符串。
  - FileReader.readAsDataURL()：读取完成后， result 属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。

        对于图片文件，这个字符串可以用于<img>元素的 src 属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀 data:_/_;base64 ,从字符串里删除以后，再进行解码。

  - FileReader.readAsText()：读取完成后， result 属性将返回文件内容的文本字符串。

        该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。
