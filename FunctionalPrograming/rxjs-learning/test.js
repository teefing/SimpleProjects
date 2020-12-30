const Rx = require("rxjs/Rx");
console.log("start");
const s1 = Rx.Observable.interval(2000).take(3);
const s2 = Rx.Observable.interval(1000).take(5);
const result = s1.combineLatest(s2, (a, b) => a + b);
result.subscribe((x) => console.log(x));
