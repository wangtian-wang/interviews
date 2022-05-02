######  js 原生拖拽

###### 原生拖拽相关事件

![](/Users/wangtian/Desktop/interviews/js基础/拖拽/img/drag.png)

![](/Users/wangtian/Desktop/interviews/js基础/拖拽/img/drag1.png)

![](/Users/wangtian/Desktop/interviews/js基础/拖拽/img/drag2.png)

```js
html

    <div
        class="drop_container"
        ondrop="handleDrop(e)"
        ondragover="handleDragOver(e)"
      ></div>
      <div class="source_container">
        <img
          src="img/img.png"
          id="dropedImg"
          ondragstart="handleDragStart(e)"
          draggable="true"
          alt=""
        />
      </div>


 js
 
 
function handleDragStart(e) {
        e.dataTransfer.setData("Img", e.target.id);
      }
      function handleDragOver(e) {
        e.preventDefault();
      }
      function handleDrop(e) {
        e.preventDefault();
        let data = e.dataTransfer.getData("Img");
        //将要拖拽的元素作为子节点插入到目标元素,(将 img 数据化)原来位置的图片消失
        e.target.appendChild(document.getElementById(data));
      }
```



######  思考 1: 图片和文字拖拽的实现方式有啥区别

###### 思考2: mousemove 实现的拖拽 和 drag 有啥不一样

​			Mousemove 只能在一个元素内移动 ,可以从一个元素拖动到另外一个元素吗?

