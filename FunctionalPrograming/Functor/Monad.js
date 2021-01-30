const fp = require("lodash/fp");
const fs = require("fs");
const { CLIEngine } = require("eslint");

class IO {
  constructor(fn) {
    this.__value = fn;
  }

  static of(value) {
    return new IO(() => value);
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this.__value));
  }

  // 执行存储的函数，得到对应数据
  join() {
    return this.__value();
  }

  // 得到map后的新函子内存储的函数执行后的数据
  flatMap(fn) {
    return this.map(fn).join();
  }
}

let readFile = function(filename) {
  return new IO(function () {
    return fs.readFileSync(filename, "utf8");
  });
};

let print = function(x) {
  return new IO(function() {
    console.log(x);
    return x;
  });
};

let r = readFile("./package.json")
  .map(fp.toUpper)
  .flatMap(print)
  .join();
