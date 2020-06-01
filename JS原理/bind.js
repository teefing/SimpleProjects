Function.prototype.myBind = function (context, ...bindArgs) {
  const _this = this;
  context = context || window;

  return function (...args) {
    _this.apply(context, [...bindArgs, ...args]);
  };
};


const obj = {
  value: 1,
};

function add(val) {
  console.log(this.value + val);
}

const add5 = add.myBind(obj, 5);
add5();
