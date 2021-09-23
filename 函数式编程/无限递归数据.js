/**
 *  pid = 0  的元素为父元素
 *  pid = 1  父元素的标识为id = 1
 */

const data = [
    {
        id: 1,
        name: 'dataP1',
        pid: 0
    },
    {
        id: 2,
        name: 'dataP1',
        pid: 1
    },
    {
        id: 3,
        name: 'dataP1',
        pid: 2
    },
    {
        id: 4,
        name: 'dataP1',
        pid: 1
    },
    {
        id: 5,
        name: 'dataP1',
        pid: 2
    },
]
function formatDataTree (data) {
    let parent = data.filter(item => item.pid === 0),
        children = data.filter(item => item.pid !== 0);
    
   
    /**
     * 
     * @param {Array} parent 
     * @param {Array} children 
     */
    function handleDataTree (parent, children) {
        parent.map((p, idx) => {
            children.map((c, i) => {
                if (p.id === c.pid) {
                    let _children = JSON.parse(JSON.stringify(children))
                    _children.splice(i, 1);
                    handleDataTree([c], _children)
                    // pid : 0为一级菜单，其他都是子菜单，当前c作为父元素， 在分类好的children中寻找与当前c元素 id 相同的元素
                    if (p.children) {
                        p.children.push(c)
                    } else {
                        p.children = [c]
                    }
                }
            })
        })
    }
    handleDataTree(parent, children);
    return parent
}
console.log(formatDataTree (data));