const fp = require('lodash/fp')

class IO {
  constructor(fn) {
    this.__value = fn
  }

  static of (value) {
    return new IO(() => value)
  }

  map (fn) {
    return new IO(fp.flowRight(fn, this.__value))
  }
}

let r = IO.of(process).map(p => p.execPath)

console.log(r.__value());


