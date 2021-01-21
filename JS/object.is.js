function is(x, y) {
  if (x === y) {
    if (x !== 0 && y !== 0) return true;
    // x和y相等的情况下，处理+0和-0的情况
    else return 1 / x === 1 / y;
  } else {
    // x和y不相等的情况下，处理NaN的情况
    return x !== x && y !== y;
  }
}

console.log(is(+0, -0));
console.log(is(NaN, NaN));
