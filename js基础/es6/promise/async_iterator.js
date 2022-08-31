// 异步迭代器 当一个异步函数 执行完成之后，再去执行下一个异步函数
function iterator (i) {
    // 异步函数
    (function () {
        iterator(++i)
    })
}
iterator(0)
