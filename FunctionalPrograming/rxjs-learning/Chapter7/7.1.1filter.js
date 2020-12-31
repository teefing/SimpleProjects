const { range } = require("rxjs");
const { filter } = require("rxjs/operators");

range(1, 10)
  .pipe(filter((v) => v % 2 === 0))
  .subscribe(console.log);
