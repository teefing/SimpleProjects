const { concat } = require("rxjs");
const { interval } = require("rxjs");
const { take, mapTo, sampleTime } = require("rxjs/operators");

concat(
  interval(500).pipe(take(2), mapTo("A")),
  interval(1000).pipe(take(3), mapTo("B")),
  interval(500).pipe(take(3), mapTo("C"))
)
  .pipe(sampleTime(800))
  .subscribe(console.log);
