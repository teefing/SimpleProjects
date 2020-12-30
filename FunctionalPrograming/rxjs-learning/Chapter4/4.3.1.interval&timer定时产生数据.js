const { interval, timer } = require("rxjs");

const source$ = interval(1000);
source$.subscribe(console.log);

timer(2000, 1000).subscribe(console.log);
