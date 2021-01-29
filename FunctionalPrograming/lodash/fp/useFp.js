const _ = require("lodash");
const fp = require("lodash/fp");
const str = "NEVER SAY DIE"; // never-say-die

const trace = _.curry((tag, v) => {
  console.log(tag, v);
  return v;
});

const f = _.flowRight(
  fp.join("-"),
  trace("after toLower"),
  fp.map(fp.toLower),
  trace("after split"),
  fp.split(" ")
);
console.log(f(str));

const parse = (...args) => {
  console.log(args);
};
console.log(fp.map(parse, ["1", "2", "3"]));
