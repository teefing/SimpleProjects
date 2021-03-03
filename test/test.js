function isReferenceType(o){
  return o instanceof Object
}

function deepClone(obj, hash = new WeakMap(), parent){
  if(!isReferenceType(obj)) {
    return obj
  }

  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof Function) return obj.bind(parent)
  const newObj = obj.constructor()

  if(hash.has(obj)) {
    return hash.get(obj)
  }
  hash.set(obj, newObj)

  Reflect.ownKeys(obj).forEach(key => {
    newObj[key] = deepClone(obj[key], hash, newObj)
  })

  return newObj
}

function add(a, b, c) {
  console.log(this.z)
}

const obj1 = {
  func: add,
  z: 1,
  b: 2,
  date: new Date(),
  regexp: /\w/,
  arr: [1, 2, 3],
  
};
obj1.obj = obj1;

obj1.func()

let o = deepClone(obj1)
o.func()