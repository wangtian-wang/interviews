|                                            |                                                              | brower | node                                                         |      |      |
| :----------------------------------------- | :----------------------------------------------------------- | ------ | ------------------------------------------------------------ | ---- | ---- |
|                                            |                                                              |        |                                                              |      |      |
| <font color="red">区别</font>              | 对于微任务宏任务的划分比较粗糙 只有宏任务和微任务<br /> **<font color="purple">1: 优先级</font>**<br /><font color="red">所有宏任务的优先级相等,没有优先级概念,按照加入任务队列的先后顺序执行</font><br />**如何解决优先级问题??** <br />插队机制----微任务<br /><font color="purple">2:**任务执行区别**</font><br />每执行一个宏任务,然后执行所有的微任务(script 标签中的代码也是宏任务,但是先执行,接着清空微任务队列,执行一个类似于定时器一样的宏任务,然后清空所有微任务队列) |        | 宏任务和微任务都有优先级划分<br />**<font color="purple">1: 优先级</font>**<br /><font color="red">不同类型的宏任务,微任务根据优先级的高低先后执行</font><br /><<font color="purple">2:**任务执行区别**</font><br />**执行当前阶段的一定数量的宏任务（剩余的到下个循环执行），然后执行所有微任务，一共有 Timers、Pending、Idle/Prepare、Poll、Check、Close 6 个阶段。<br />订正：11后又改为了一个宏任务所有微任务** |      |      |
|                                            | **宏任务**: <br /><script>脚本同步代码, <br />setTimeOut,<br />setInterval.<br />ajax.fetch<br /><br />requestAnimationFrame<br /> **微任务**: <br />promise.then<br />mutation.observer<br />Object.observe |        | **宏任务** <br />Timers Callback <br />Pending Callback  网络处理,IO 等异常时候的回调<br />Poll Callback：处理 IO 的 data，网络的 connection <br />Check Callback：执行 setImmediate 的回调，特点是刚执行完 **IO** **之后就能回调这个** <br />Close Callback：关闭资源的回调，晚点执行影响也不到，优先级最低<br />**微任务** <br />process.nextTick  <font color="red">优先级高于其他微任务</font> <br />其他微任务 |      |      |
| <font color="red">设计理念</font>          | **设计 Loop 机制和 Task 队列是为了支持异步，解决逻辑执行阻塞主线程的问题**，<br />**设计 MicroTask 队列的插队机制是为了解决高优任务尽早执行的问题。** |        | 服务端处理比较复杂,高性能的服务器的要求精准的优先级控制      |      |      |
| <font color="red">新观点</font>            | 浏览器上的异步任务是在后台线程执行,然后通过任务队列通知主线程,是一种事件机制,所以这个循环叫做 Event Loop |        |                                                              |      |      |
| <font color="red">node 需要注意的点</font> |                                                              |        | **如果执行到poll，poll 队列为空并且 timers、check 队列也为空，就一直阻塞在这里等待 IO，直到 timers、check 队列有回调再继续 loop 。** |      |      |
|                                            |                                                              |        |                                                              |      |      |
|                                            |                                                              |        |                                                              |      |      |
|                                            |                                                              |        |                                                              |      |      |



## Event loop 示意图

###  node

![node_event](/Users/wangtian/Desktop/interviews/事件/node_event.png)

### brower

![brower_loop](/Users/wangtian/Desktop/interviews/事件/brower_loop.png)