const { timer } = require("rxjs");
const { concat } = require("rxjs");
const { count } = require("rxjs/operators");

concat(timer(1000), timer(1000))
  .pipe(count())
  .subscribe(console.log);
