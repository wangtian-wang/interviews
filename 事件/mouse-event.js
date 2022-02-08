/**
 mouseleave : 鼠标移除 事件监听的元素时候触发；
 mouseout :  鼠标离开元素或进入该元素的子元素时均会被触发，冒泡

  <div id="div1"  @mouseout="handleMouseOut">
    <div id="div2" ></div>
  </div>


  div1 监听了 mouseout 事件  但是div2在div1内部 mdn上说 div2遮挡了div1的部分区域 所以 即使没有给div2安装事件监听器 div2 还是会触发 mouseout 事件 
  div2的事件冒泡到了div1 div1的mouseout事件会被触发
   
   
   鼠标事件 的触发顺序


   mouseover mouseenter mousedown mouseup click mouseout mouseleave


   定时器的回调函数会被添加到事件队列里面 等到时间到了后 并且主线程没有任务的时候才会执行
   其他的异步事件按照加入的先后顺序执行回调函数



   dispatchEvent(event)可以派发自定义事件 
   当自定义事件 === 原生事件  不能在原生事件的回调函数里面dispatchEvent(event)
   当自定义事件 ！== 原生事件 可以原生事件的回调函数里面dispatchEvent(event)
 */
