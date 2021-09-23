Ie6 出现的 bug 问题

##  盒子浮动 margin * 2 

* 解决办法：

  *  display： inline/ block

    ## 元素浮动会产生 3px 间隙

    * 解决办法：
      *  所有的元素都浮动

##  若外部有一个盒子相对定位，内部有一个盒子是绝对定位 内部的盒子的 top  left bottom right = 0 的时候，会产生 1px 的像素 

* 解决办法
  * 设置偶数的宽和高

## img 标签下面有白色间隙 

* 解决办法
  * img 变为 block 元素
  * vertical-align = top | middle | bottom
  * font-size=0
  * line-height=0

##  <div>  

##  如果内容为空的话 会产生 0 -19 px 的 高度     

##    </div>

* 解决办法：
  * overflow：hidden
  * (&   n  b  s    p;)
  * Font-size: 0
  * <!---------> 使用注释
  * 或者避免这种情况发生；

## 在制作文字环绕的效果的时候 ：会使浮动的文字的内容掉下去

* 解决办法：
  * clear：both
  * 一行所有的元素 inline
  * margin-right： 设置为负值

## z-index 失效

* 解决办法
  * 在父元素上设置 position： relative； z-index： 11





