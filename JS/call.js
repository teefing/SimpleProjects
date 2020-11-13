Function.prototype.myCall = function (context = window, ...args) {
  const unique = Symbol('fn');
  context[unique] = this;
  const res = context[unique](...args);
  delete context[unique];
  return res;
};

const foo = {
  value: 1,
};

function bar(add) {
  console.log(this.value + add);
}

bar.myCall(foo, 2);
