const { of, interval } = require("rxjs");

const { repeatWhen, delay } = require("rxjs/operators");

// const source$ = of(1, 2, 3);
// const repeated$ = source$.pipe(
//   repeatWhen(() => {
//     return interval(1000);
//   })
// );

// repeated$.subscribe(console.log);
// 1
// 2
// 3
// 1
// 2
// 3
// ...

const source$ = of(1, 2, 3);
const repeated$ = source$.pipe(
  repeatWhen((notification$) => {
    return notification$.pipe(delay(2000));
  })
);

repeated$.subscribe(console.log);
