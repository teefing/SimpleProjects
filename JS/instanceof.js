function instanceOf(instance, constructor) {
  // 如果传入的instance是原始类型，就直接return false
  if(instance === null || typeof instance !== 'object' || typeof instance !== 'function') return false

  let t = instance.__proto__;
  while (t) {
    if (t === constructor.prototype) return true;
    t = t.__proto__;
  }
  return false;
}

console.log(instanceOf(1, Number));
console.log(1 instanceof Number)