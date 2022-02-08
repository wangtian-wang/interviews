/**
  拖放元素的触发事件顺序         事件监听对象
        dragStart           被拖动的对象
        drag                被拖动的对象
        dragenter           被拖动的对象
        dragover             要放置的对象
        dragleave            要放置的对象
        drop                 要放置的对象
        dragend              要放置的对象
       
       
       只需要为被拖动的元素添加draggable="true"即可。

       步骤：
       1:  设置被拖动的元素的 draggable="true";
       2:  被拖拽元素  onDragStart里面setData()； e.dataTransfer.setData("img", e.target.id);
       3： 拖拽元素    ondragover 阻止默认行为，否则ondrop事件不会被触发
       4： 拖拽元素    drop getData,append到当前元素里面
                    let data = e.dataTransfer.getData("img");
                    e.target.appendChild(document.getElementById(data));

       drag事件不能和鼠标事件共存

       dataTransfer对象 可以保存当前被拖动的元素的数据
       
       
       
 */
