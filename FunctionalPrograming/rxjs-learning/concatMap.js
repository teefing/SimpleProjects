const Rx = require("rxjs/Rx");
const source = Rx.Observable.interval(3000);
const result = source.concatMap((val) => Rx.Observable.interval(1000).take(2));
result.subscribe((x) => console.log(x));
