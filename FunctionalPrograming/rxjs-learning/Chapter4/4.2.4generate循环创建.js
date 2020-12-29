const { generate } = require("rxjs");

const result = [];
for (let i = 2; i < 10; i += 2) {
  result.push(i * i);
}

const source$ = generate(
  2, // 初始值，相当于for循环中的i=2
  (i) => i < 10, //继续的条件，相当于for中的条件判断
  (i) => i + 2, //每次值的递增
  (i) => i * i
);
source$.subscribe(console.log, null, () => console.log("complete"));

// 4
// 16
// 36
// 64
// complete


const range = (start, count) => {
  const max = start + count
  return generate(start,
    i => i < max,
    i => i + 1,
    i=>i
  )
}

range(1, 5).subscribe(console.log, null, () => console.log("complete"));
// 1
// 2
// 3
// 4
// 5
// complete