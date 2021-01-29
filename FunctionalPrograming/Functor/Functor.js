class Container {
  constructor(v) {
    this._value = v;
  }

  static of(value) {
    return new Container(value);
  }

  map(fn) {
    return Container.of(fn(this._value));
  }
}
// let functor = Container.of(2);
// console.log(functor.map((x) => x + 1).map((x) => x * 2));

module.exports = Container;
