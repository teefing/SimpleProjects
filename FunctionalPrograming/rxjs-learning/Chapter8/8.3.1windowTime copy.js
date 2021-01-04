const { timer } = require("rxjs");
const { windowTime, take } = require("rxjs/operators");

let source = timer(0, 1000).pipe(take(10), windowTime(4000));
source.subscribe((chunk) => {
  chunk.subscribe(console.log);
});
