const { from } = require("rxjs");

const clg = console.log;

from([1, 2, 3]).subscribe(clg);
// 1
// 2
// 3

from("abc").subscribe(clg);
// a
// b
// c

from({ 0: 0, 1: 1, length: 3 }).subscribe(clg);
// 0
// 1
// undefined

function* generateNumber(max) {
  for (let i = 1; i <= max; ++i) {
    yield i;
  }
}
from(generateNumber(3)).subscribe(clg);
// 1
// 2
// 3

// 不能将1传入from
// from(1).subscribe(clg);
// error

from(Promise.resolve("success")).subscribe(clg);
// success

from(Promise.reject("error")).subscribe(clg, (err) => clg(err));
// error
