const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

suite
  .add('new Date', () => {
    const now = +new Date();
  })
  .add('Date.now', () => {
    const now = Date.now();
  })
  // add listeners
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  // run async
  .run({ async: true });
