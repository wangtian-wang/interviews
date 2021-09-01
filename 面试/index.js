for (let i = 0, ; i < 9999; i++){
  console.time('start')
  console.log(new Date().getTime(), 'in start  ---')
}
console.timeEnd('start')
function fn () {
  console.log('****');
  console.log(new Date().getTime(), 'in end edn  ---')

  console.timeEnd('start')
}
setTimeout(fn, 1000);
