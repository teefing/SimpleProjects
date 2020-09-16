const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

suite
  .add("无回溯", function() {
    "abbbc".match(/ab{1,3}c/)
  })
  .add("有回溯", function() {
    "abbbc".match(/ab{1,3}bbc/)
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
