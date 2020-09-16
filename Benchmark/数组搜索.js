const Benchmark = require("benchmark");
const _ = require("lodash")
const suite = new Benchmark.Suite();
const arr = _.shuffle(new Array(10).fill(0).map((item, index) => index))

suite
  .add("indexOf", function() {
    const res = arr.indexOf(1) > -1
  })
  .add("includes", function() {
    const res = arr.includes(1)
  })
  .add("findIndex", function () {
    const res = arr.findIndex(v => v === 1) > -1
  })
  // add listeners
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
