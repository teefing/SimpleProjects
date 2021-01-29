class MayBe {
  constructor(value) {
    this.__value = value;
  }
  static of(value) {
    return new MayBe(value);
  }
  map(fn) {
    return this.isNullOrUndefined()
      ? MayBe.of(null)
      : MayBe.of(fn(this.__value));
  }

  isNullOrUndefined() {
    return this.__value === null || this.__value === undefined;
  }
}

console.log(MayBe.of("hello world").map((str) => str.toUpperCase()));
console.log(MayBe.of(null).map((str) => str.toUpperCase()));
