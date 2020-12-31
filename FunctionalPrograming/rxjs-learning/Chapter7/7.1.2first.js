const { range } = require("rxjs");
const { first } = require("rxjs/operators");

range(1, 10)
  .pipe(first((v, i) => v < 0, 0))
  .subscribe(console.log);
