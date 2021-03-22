let obj = {}
Object.defineProperty(obj, 'a', {
  value: 1,
  enumerable: false,
  configurable: true,
  writable: true
})

console.log(obj.a)