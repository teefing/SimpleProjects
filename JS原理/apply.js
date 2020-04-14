Function.prototype.myApply = function (context, args) {
  context = context || window;
  context.fn = this;
  const res = args ? context.fn(...args) : context.fn();
  delete context.fn;
  return res;
};

const obj = {
  value: 1,
};

function print(add) {
  console.log(this.value + add);
}

print.apply(obj, [2]);
