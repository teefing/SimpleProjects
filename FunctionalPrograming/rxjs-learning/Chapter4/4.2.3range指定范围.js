const { range } = require("rxjs");

// ! range(start, count) 注意第二个参数是count而不是end
const source$ = range(1.5, 10)
source$.subscribe(
  console.log,
  null,
  () => console.log('complete')
)
// 1.5
// 2.5
// 3.5
// 4.5
// 5.5
// 6.5
// 7.5
// 8.5
// 9.5
// 10.5
// complete