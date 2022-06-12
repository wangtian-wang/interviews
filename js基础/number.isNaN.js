Number.isNaN(NaN); // true
Number.isNaN(undefined); // false
Number.isNaN({}); //false

isNaN(undefined); // true
isNaN({}); // true

/**
 * 

 */

// Number.isNaN()不存在隐式类型转换, 严格的判断当前的参数是否是NAN
// isNaN() 会进行隐式类型转换; step1 let res = Number(undefined) // NaN  step2 isNaN(res) = true
