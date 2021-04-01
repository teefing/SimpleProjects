function Instanceof(instance, constructor){
  if(instance === null || typeof instance !== 'object' || typeof instance !== 'function') return false

  let p = instance.__proto__
  while(p) {
    if(p === constructor.prototype) return true
    p = p.__proto__
  }
  return false
}

console.log(Instanceof(1, Number))
// let a = new Number(1)
// console.log(a instanceof Number)
// console.log(typeof new Number(1))
