const _ = require("lodash");
// const compose = _.flowRight;

function compose(...func) {
  return func.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
}

let array = ["a", "b", "c", "d"];
// 结合律
console.log(compose(_.toUpper, _.first, _.reverse)(array.slice()));

console.log(compose(_.toUpper, compose(_.first, _.reverse))(array.slice()));
console.log(compose(compose(_.toUpper, _.first), _.reverse)(array.slice()));
