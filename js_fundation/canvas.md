* canvas 布局的时候，需要给外面添加一个 div

## methods

* ctx.globalAlpha = 0.3
* Clip()
  		* 先画一个图形 1
  		* 再接着画一个图形2
  		* 使用 clip（）方法裁剪，那么是以图形 1 位坐标，只会留下和图形 1 重叠的部分，在图形 1 之外的图形 2 的区域会被裁剪，

## drawImage(sourceImg, clip startX, clip start Y, clipwidth of souce image, clip height of sorceimage, put startx , put start y, put width, put height)

## canvas.toDateUrl() 将 canvas 画布转化成为 base64

## isPointInPath() 

*  检查某个点是否在路劲上面
* 返回值为 Boolean
* Ctx.isPointInPath() 

## getImageData()

* Ctx.getImageData(startpointx,startpointY, width,height)
* 可以获取画在 canvas 画布上面的图形的信息

## putImageData()

* ctx.putImageData(img, putXaxis, putYaxis)

## globalCompositeOperation 

* 决定哪个 canvas 在图层的上面
* 'source-over' | source-in  显示重叠部分的后来的图形 |  destination-out   只显示先画出来的图形，和后面图形重叠的部分，会变为透明





##    







