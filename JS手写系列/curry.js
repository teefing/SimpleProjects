function curry(fn, ...fixs) {
  return fn.length <= fixs.length ? fn(...fixs) : (...args) => curry(fn, ...fixs, ...args);
}

// 函数柯里化核心：fn.length
// 当传入的参数列表长度大于等于 原函数所需的参数长度(fn.length)时，执行原函数
// 否则返回一个能接收参数继续进行柯里化的函数

const add = (a, b, c) => a + b + c;
const curried = curry(add);
console.log(curried(1, 2)(3));
console.log(curried(1)(2, 3));
console.log(curried(1)(2)(3));
console.log(curried(1,2,3,4));
