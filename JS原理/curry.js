function curry(fn, ...fixs) {
  return fn.length === fixs.length ? fn(...fixs) : (...args) => curry(fn, ...fixs, ...args);
}

const add = (a, b, c) => a + b + c;
const curried = curry(add);
console.log(curried(1, 2)(3));
console.log(curried(1)(2, 3));
console.log(curried(1)(2)(3));
