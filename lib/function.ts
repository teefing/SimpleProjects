const curry = (fn, ...fixs) => {
  if (fn.length === fixs.length) {
    return fn(...fixs);
  }
  return (...args) => fn(...fixs, ...args);
};

const compose = (...funcs) => {
  if (funcs.length === 0) return args => args
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((fn1, fn2) => (...args) => fn1(fn2(...args)))
}