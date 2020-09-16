const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();
const int1 = function (str) {
  return +str;
};

const int2 = function (str) {
  return parseInt(str, 10);
};

const int3 = function (str) {
  return Number(str);
};

const number = '100';
suite
  .add('+', () => {
    int1(number);
  })
  .add('parseInt', () => {
    int2(number);
  })
  .add('Number', () => {
    int3(number);
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

/**
 * Fastest is Number, +
 */
