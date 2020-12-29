const { of } = require("rxjs");

const source$ = of(1,2,3)
source$.subscribe(
  console.log,
  null,
  () => console.log('complete')
)

// 1
// 2
// 3
// complete