// 结论 : fn.length是一个函数形参的个数,假设有默认形参,则只算默认参数前面的参数个数
function foo(a, b, c) {
  console.log(foo.length); // 3
}

foo(1, 2);

function foo(a, c) {
  console.log(foo.length); //2
}

foo(1, 2, 3);

function foo(a, b = 10, c) {
  console.log(foo.length); //1
}

foo(1, 2, 3);
