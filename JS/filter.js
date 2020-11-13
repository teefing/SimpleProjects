Array.prototype.filter = function (filterCb, thisArg) {
  const res = [];
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (filterCb.call(thisArg, arr[i], i, arr)) {
      res.push(arr[i]);
    }
  }
  return res;
};

console.log([1, 2, 3].filter((v) => v > 1));
