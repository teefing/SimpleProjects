Function.prototype.myApply = function (context = window, args = []) {
  const unique = Symbol('fn');
  context[unique] = this;
  const res = context[unique](...args);
  delete context[unique];
  return res;
};

const obj = {
  value: 1,
};

function print(add) {
  console.log(this.value + add);
}

print.myApply(obj, [2]);
