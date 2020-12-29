const { of } = require("rxjs");
const { map, filter } = require("rxjs/operators");

// 管道操作
of(1, 2, 3).pipe(
  filter((x) => x % 2 === 0),
  map((x) => x * 2)
).subscribe(console.log)
