const { interval } = require("rxjs");
const { map, withLatestFrom } = require("rxjs/operators");

const a$ = interval(1000).pipe(map(v => 'A' + v))
const b$ = interval(2000).pipe(map(v => 'B' + v))

a$.pipe(withLatestFrom(b$)).subscribe(console.log)
// [ 'A1', 'B0' ]
// [ 'A2', 'B0' ]
// [ 'A3', 'B1' ]
// [ 'A4', 'B1' ]
// [ 'A5', 'B2' ]
// [ 'A6', 'B2' ]
// [ 'A7', 'B3' ]
// [ 'A8', 'B3' ]
// [ 'A9', 'B4' ]
// [ 'A10', 'B4' ]
// [ 'A11', 'B5' ]
// [ 'A12', 'B5' ]
// [ 'A13', 'B6' ]
// ...