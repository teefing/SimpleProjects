function isDuplicatePair (left, right) {
  left = String(left).split('')
  right = String(right).split('')
  return [...new Set([...left, ...right])].length !== left.length+right.length
}

function isValid (str) {
  let arr = str.split('')
  return [...new Set(arr)].length === 10
}

/**
 * 求0~9各出现一次并且地址用二进制表示时左右对称的IP地址
 */
function getSymmetricalIp () {
  // 0-255获取翻转后的数组,原数和翻转后的数以key value的方式存入map
  // 最后的结果是key1.key2.value2.value1的形式
  let map = new Map()

  let str = ''
  let reverseStr = ''
  let reverseNum = 0
  for (let i = 0; i < 255; i++) {
    str = i.toString(2).padStart(8, '0')
    reverseStr = str.split('').reverse().join('')
    reverseNum = parseInt(reverseStr, 2)
    if (!isDuplicatePair(i, reverseNum)) {
      map.set(i, reverseNum)
    }
  }


  let res = []
  for (let [key1, value1] of map) {
    for (let [key2, value2] of map) {
      str = String(key1) + String(key2) + String(value2) + String(value1)
      if (isValid(str)) {
        res.push([key1, key2, value2, value1].join('.'))
      }
    }
  }
  return res
}

console.log(getSymmetricalIp());