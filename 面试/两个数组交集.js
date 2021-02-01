function arrayInclude (arrA, arrB) {
  function getMap (arr) {
    let m = new Map()
    for (let key of arr) {
      if (m.has(key)) {
        m.set(key, m.get(key)+1)
      } else {
        m.set(key, 1)
      }
    }
    return m
  }
  let mapA = getMap(arrA)
  let interSection = []
  for (let v of arrB) {
    let count = mapA.get(v) || 0
    if (count > 0) {
      interSection.push(v)
      mapA.set(v, count-1)
    }
  }

  let lenIS = interSection.length, lenA = arrA.length, lenB = arrB.length
  let aAllInB = lenA === lenIS
  let bAllInA = lenB === lenIS
  if (aAllInB && bAllInA) return 0
  if (aAllInB) return 1
  if (bAllInA) return 2
  return -1
}

var a1 = [4,2,3,1,4]
var a2 = [4,2,3,1,4,5]
console.log(arrayInclude(a1, a2)) // 1

var a3 = [4,2,3,1,4]
var a4 = [4,2,3,1]
console.log(arrayInclude(a3, a4)) // 2

var a5 = [4,2,3,1,4]
var a6 = [4,2,3,1,4]
console.log(arrayInclude(a5, a6)) // 0

var a7 = [4,2,3,1,4]
var a8 = [3,2,3,1,4]
console.log(arrayInclude(a7, a8)) // -1

