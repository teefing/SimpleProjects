function New(func) {
  const res = {};
  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  }
  const ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret;
  }
  return res;
}

console.log(New(Date, '2020-01-01'));
console.log(new Date('2020-01-01'));
