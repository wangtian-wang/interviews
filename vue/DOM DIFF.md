## DOM   DIFF

### 虚拟 DOM



* what
     * 用对象的形式将每个 DOM 节点的信息模拟出来
    
      *     vue 是在模板上面修改的节点，一旦表示 DOM 节点的信息发生变化，就会产生新的 DOM，新旧 DOM 对比，打补丁，更新 DOM被修改部分。
     
          *     用 render 函数将 DOM 渲染出来
     
      特点 ： 先序（从 0 开始往上增加）深度遍历
     
      * 平级对比
      * 每个 DOM 有自己的索引编号
      * 从上往下，深度优先
      * 复用交替原则
      * 每一个虚拟节点 里面有 type， props， children
      * 比较新旧 DOM 的差异  type， props， children： 修改了那个属性，修改后的值为啥，
      * walk 遍历递归，打补丁
  
* useful

*  how does it work

### diff

* 对比两个虚拟节点，找出差异，对应到真实 DOM 上面，打补丁，找到差异，以最小的性能消耗去修改 DOM

