const { of, interval } = require("rxjs");
const { count, min, isEmpty } = require("rxjs/operators");

interval(1000)
  .pipe(isEmpty())
  .subscribe(console.log);
