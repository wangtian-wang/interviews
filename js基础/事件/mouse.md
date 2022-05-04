#### Mousemove Mouseout

###### Mousemove 鼠标移出节点时触发

###### Mouseout 鼠标移出节点内部的子元素时会触发 既会触发多次

#### Mouseenter Mouseover

###### Mouseenter 事件只在鼠标进入一个节点时触发

###### Mouseover  只要鼠标在节点内部移动 会在子节点上触发多次

#### 鼠标事件的触发顺序

######  mousedown mouseup click dbclick



#### 拖拽事件

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        position: relative;
        width: 500px;
        height: 500px;
        background-color: azure;
      }
      .box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        border: 1px solid black;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="box"></div>
    </div>
    <script>
      function move(dom) {
        let startX = 0,
          startY = 0,
          startL = 0,
          startT = 0,
          curX = 0,
          curY = 0,
          maxWidth = dom.parentNode.clientWidth - dom.offsetWidth,
          maxHeight = dom.parentNode.clientHeight - dom.offsetHeight;
        const mousedown = (e) => {
          startX = e.clientX;
          startY = e.clientY;
          startL = dom.offsetLeft;
          startT = dom.offsetTop;
          mousemove();
        };
        let handlerMove = (e) => {
          curX = e.clientX - startX + startL;
          curY = e.clientY - startY + startY;
          if (curX < 0) {
            curX = 0;
          }
          if (curX >= maxWidth) {
            curX = maxWidth;
          }
          if (curY < 0) {
            curY = 0;
          }
          if (curY >= maxHeight) {
            curY = maxHeight;
          }
          dom.style.left = curX + "px";
          dom.style.top = curY + "px";
          e.preventDefault();
        };
        const handleUp = (e) => {
          document.removeEventListener("mousemove", handlerMove);
        };
        const mousemove = () => {
          // document.onmousemove 只能采用这样的写法 否则document上面的move事件一直存在 元素会一直被拖动
          document.onmousemove = (e) => {
            handlerMove(e);
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
          };
        };
        dom.addEventListener("mousedown", mousedown, false);
      }
      move(document.querySelector(".box"));
    </script>
  </body>
</html>

```

