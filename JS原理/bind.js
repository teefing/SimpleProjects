Function.prototype.myBind = function (context) {
  const _this = this;
  context = context || window;
  const bindArgs = arguments.length > 1 ? arguments[1] : [];

  return function (args) {
    _this.apply(context, [...bindArgs, ...args]);
  };
};


const obj = {
  value: 1,
};

function add(val) {
  console.log(this.value + val);
}

const add5 = add.bind(obj, 5);
add5();
