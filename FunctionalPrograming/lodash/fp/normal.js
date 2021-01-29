const _ = require("lodash");
const str = "NEVER SAY DIE"; // never-say-die
const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, arr) => _.join(arr, sep));
const toLower = _.toLower;
const map = _.curry((fn, array) => _.map(array, fn));

const trace = _.curry((tag, v) => {
  console.log(tag, v);
  return v;
});

const f = _.flowRight(
  join("-"),
  trace("after toLower"),
  map(toLower),
  trace("after split"),
  split(" ")
);
console.log(f(str));
