const { interval, of } = require("rxjs");
const { map, concatAll } = require("rxjs/operators");

const source = interval(2000)
const example = source.pipe(
  map(val => of(val + 10)),
  concatAll()
)

example.subscribe(console.log)