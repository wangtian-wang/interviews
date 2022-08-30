/**
 js 相等的分类
    1： == 相等    
        abstract equal 
            ： 先进行类型转换
            ： 再进行全等比较
            特殊：
                 -0 == +0   true       +Infinity == -Infinity ：false
    2： === 全等    
            全等比较的结果更加准确，比较结果更加快
            -0 === +0  ：  true   NaN === NaN   ： false
    3： 零值相等   
            -0 === +0
    4： 同值相等   
             只比较 值是否相等  不比较值的类型    同值相等和全等刚好相反所以在同值相等里面   -0 与 +0 不相等  NaN 与 NaN 是相等的
    5： object.is() 原理 ：同值相等比较
             特殊：Object.is(NaN,NaN) = true    Object.is(+0, -0)：false
    falsy类型的值：
            字符串空串 ： '' `` ""
            数字类型  ： 8n(bigInt)
 */
