function instanceOf(obj, clazz) {
  let t = obj.__proto__;
  while (t) {
    if (t === clazz.prototype) return true;
    t = t.__proto__;
  }
  return false;
}

console.log(instanceOf(1, Number));
