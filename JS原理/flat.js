function flat (arr) {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flat(cur) : cur) , [])
}

console.log(flat([1, 2, [3, 4, 5, [6, 7, 8]]]));