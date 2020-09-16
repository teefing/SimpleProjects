const Benchmark = require('benchmark');

const suite = Benchmark.Suite();
suite
  .add('match', () => {
    const reg = /(\d{2})-(\d{2})-(\d{4})/;
    const str = '04-25-2017';
    const res = str.match(reg);
  })
  .add('exec', () => {
    const reg = /(\d{2})-(\d{2})-(\d{4})/;
    const str = '04-25-2017';
    const res = reg.exec(str);
  })
  .add('test', () => {
    const reg = /(\d{2})-(\d{2})-(\d{4})/;
    const str = '04-25-2017';
    const res = reg.test(str);
  })
  .add('search', () => {
    const reg = /(\d{2})-(\d{2})-(\d{4})/;
    const str = '04-25-2017';
    const res = str.search(reg);
  })
  .add('replace', () => {
    const reg = /(\d{2})-(\d{2})-(\d{4})/;
    const str = '04-25-2017';
    const res = str.replace(reg, '$3-$1-$2');
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
 * 实践证明，match，exec，test，search四个方法速度处于一个数量级，replace方法速度比上述四种方法低一个数量级
 */
