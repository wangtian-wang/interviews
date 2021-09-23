##  Svg

*  可以作为单独的文件，如 demo.svg， 直接在浏览器中打开

  ``` javascript
  ​```
  <svg  
  version="1.2"  
  baseProfile="full" 
  width="300" height="300"
  xmIns="http://www.w3.org/2000/svg">
  	<rect width="100" height="100"></rect>
  
  </svg>
  ​```
  ```

  

* 可以作为 img 的 src 属性，引入；

* 可以作为 bacKground： url() 引入；

* 可以在 html 中直接定义

  ```javascript
  ​```
  <svg width="300" height="300">
   <circle width="300" height="300" ></circle>
  <image	xlink:href=""	x="start" y="starty" width="" height=""		/>  图像标签和 html 不一样
  </svg>
  ​```
  ```

* 后添加的元素总是在 svg 画布的最上面

## 应用

* 可以给图片添加简介