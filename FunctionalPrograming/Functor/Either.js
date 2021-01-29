class Left {
  constructor(value) {
    this.__value = value;
  }
  static of(value) {
    return new Left(value);
  }

  map(fn) {
    return this;
  }
}

class Right {
  constructor(value) {
    this.__value = value;
  }
  static of(value) {
    return new Right(value);
  }

  map(fn) {
    return Right.of(fn(this.__value));
  }
}

function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of({ error: e.message });
  }
}

console.log(parseJSON("{name:xm}").map((obj) => obj.name));
console.log(parseJSON(`{"name":"xm"}`).map((obj) => obj.name));
