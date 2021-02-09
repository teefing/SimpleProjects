const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const arr = new Array(10000).fill(0)

suite
  .add("for", function() {
    let a;
    for(let i=0;i<arr.length;i++){
      a=arr[i]
    }
  })
  .add("forEach", function() {
    let a;
    arr.forEach(v => {
      a = v
    })
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
