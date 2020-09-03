// 第一版
// Function.prototype.myBind = function (context, ...bindArgs) {
//   const _this = this;
//   context = context || window;

//   return function (...args) {
//     _this.apply(context, [...bindArgs, ...args]);
//   };
// };

// 精简版
// Function.prototype.myBind = function (context = window, ...bindArgs) {
//   return (...args) => this.apply(context, [...bindArgs, ...args]);
// };

// 无依赖版
Function.prototype.myBind = function (context = window, ...bindArgs) {
  const uniq = Symbol('fn');
  context[uniq] = this;
  return function (...args) {
    const res = context[uniq](...bindArgs, ...args);
    delete context[uniq];
    return res;
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
