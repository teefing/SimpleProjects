const { timer } = require("rxjs");
const { take, bufferTime } = require("rxjs/operators");

let source = timer(0, 1000).pipe(take(10), bufferTime(4000));
source.subscribe(console.log);
