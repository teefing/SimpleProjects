function _instanceof (obj, clazz) {
  let t = obj.__proto__
  while (t) {
    if (t === clazz.prototype) return true
    t = t.__proto__
  }
  return false
}

console.log(_instanceof(1, Number));