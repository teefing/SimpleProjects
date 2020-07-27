Function.prototype.myCall = function (context = window) {
  context.fn = this;
  const args = [...arguments].slice(1);
  const res = context.fn(...args);
  delete context.fn;
  return res;
};

const foo = {
  value: 1,
};

function bar(add) {
  console.log(this.value + add);
}

bar.myCall(foo, 2);
