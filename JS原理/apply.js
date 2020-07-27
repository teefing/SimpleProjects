Function.prototype.myApply = function (context = window, args = []) {
  context.fn = this;
  const res = context.fn(...args)
  delete context.fn;
  return res;
};

const obj = {
  value: 1,
};

function print(add) {
  console.log(this.value + add);
}

print.myApply(obj, [2]);
