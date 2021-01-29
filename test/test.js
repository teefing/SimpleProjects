function curry(fn, ...args) {
  return args.length >= fn.length
    ? fn(...args)
    : (...rest) => curry(fn, ...args, ...rest);
}

let add = (a, b, c) => a + b + c;
let curryAdd = curry(add);
console.log(curryAdd(1, 2, 3));
console.log(curryAdd(1)(2, 3));
console.log(curryAdd(1)(2)(3));
