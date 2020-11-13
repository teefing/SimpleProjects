function add(...args) {
  let arr = args;
  function fn(...rest) {
    arr = [...arr, ...rest];
    return fn;
  }
  fn[Symbol.toPrimitive] = function () {
    return arr.reduce((acc, cur) => acc + parseInt(cur));
  };
  // fn.toString = fn.valueOf = function () {
  //   return arr.reduce((acc, cur) => acc + parseInt(cur));
  // };

  return fn;
}

const res = add(1)(2);
console.log(res + 10); // 13
console.log(add(1)(2)(3));
console.log(add(1, 2, 3));
/**
 * 函数柯里化另一种实现思路，可以实现对不定参数的函数实现柯里化，原理是每次调用只存储传入的参数，并且把存储参数的函数返回出去，重写函数的toString和valueOf，在外部对该函数进行使用时，就会调用重写后的toString和valueOf
 */
