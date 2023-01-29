## requestIdleCallback(callback,timeout);

#### 1: 和 setTimeout 的区别

#### 2： timeout 应该< 50ms 假设当前空闲时间段执行时长任务已经超过了 50ms，那么该任务队列的剩余剩余任务不会执行，

会直接放到下一次空闲时间 的队首执行

#### 3： timeout 超时后， 该 callback 会被放到下一次空闲时间的任务队列中强制执行

#### 使用场景

1： 埋点
