const Benchmark = require('benchmark');
const _ = require('lodash');

const suite = new Benchmark.Suite();
const list = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];

suite
  .add('set', () => {
    const res = Array.from(new Set(list));
  })
  .add('解构+set', () => {
    const res = [...new Set(list)];
  })
  .add('indexOf', () => {
    const unique = (arr) => {
      const array = [];
      for (let i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
          array.push(arr[i]);
        }
      }
      return array;
    };
    unique(list);
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
