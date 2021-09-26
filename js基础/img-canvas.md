### 图片的渲染需要一定的时间，等图片全部渲染完成之后的话，就要用到 img 的 onload 事件

```javascript
​```
var canvas = document.createElement('canvas'),  画布
		ctx = canvas.getContext('2d');  						画笔
ctx.drawImage(img, placePositionX,,placePositionY) 画图片
var imgData = ctx.getImageData(startPositionX,startPositionY , width, height) 获取 image 的信息
ctx.putImageData(imgData,placePositionX,,placePositionY)
   获取到的是一个类数组，里面包括每个像素的 rgba()的值 
		tips: 当 rgb()的三个值都相等的时候， 得到的颜色是灰色；

​```

```



