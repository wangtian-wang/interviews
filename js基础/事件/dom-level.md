#### DOM层级的划分
- 0级dom (0级DOM被认为是在`Internet Explorer 4.0 `与`Netscape Navigator4.0`支持的最早的DHTML)
    - 内联添加点击事件
- dom level 1 (主要定义的是文档的底层结构)
    - dom core DOM核心能映射以XML为基础的文档结构，允许获取和操作文档的任意部分
    - dom html DOM HTML通过添加HTML专用的对象与函数对DOM核心进行了扩展。
- dom level 2 (扩展了xml的方法,属性)
    - dom views 为文档定义了基于样式信息的不同视图.
    - dom events addEventListener()事件捕获三个阶段
    - dom style 使用编程的方法来访问和改变CSS样式信息
    - dom traversal and range 引入了遍历DOM文档和选择其特定部分的新接口.
    - dom html  在
- dom level 3
    - dom load and save
    - dom validation
#### `mutationObserver`
- 功能
    > 指定一个目标,观察目标的属性,子节点,文本的变化 并且在目标dom被修改时异步执行回调

    > 当一个被监听的 dom被多次修改时,回调函数不会执行多次,但是会将多次修改的记录 保存在回调函数的参数中(`mutationRecord`)

#### `IntersectionObserver`
- 功能
    > 异步观察目标元素与其根元素在某一过渡时刻的交叉状态

    > 当一个`IntersectionObserver`对象被创建,被用来监视根元素中一段给定比例的可见区域

     