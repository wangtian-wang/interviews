new Promise((res, rej) => {
    rej('fail')
}).then(res => {

}, rej => {
    console.log(rej, 'rej'); //fail rej
    return rej
}).then(res => {
    console.log(res, 'second then value') //fail second then value
    return new Promise(() => {})
}, rej => rej).then(res => {
    console.log('i can not be  execute');
})