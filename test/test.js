function curry(fn, ...fixs) {
  if (fixs.length >= fn) return fn(...fixs);
  return (...args) => curry(fn, ...fixs, ...args);
}
