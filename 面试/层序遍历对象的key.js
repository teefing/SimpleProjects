var input = {
  a: {
    b: {
      c: { f: "aa" },
    },
    d: {
      e: { g: "bb" },
      h: { i: "cc" },
    },
    j: {
      k: "dd",
    },
  },
};

function bfs (input) {
  let queue = [input]
  let res = []
  while (queue.length) {
    let len = queue.length
    let tempArr = []
    for (let i = 0; i < len; i++) {
      let cur = queue.shift()
      Object.entries(cur).forEach(([key, value]) => {
        tempArr.push(key)
        if (typeof value === 'object' && value !== null) {
          queue.push(value)
        }
      })
    }
    res.push(tempArr)
  }
  return [].concat(...res.reverse())
}

console.log(bfs(input));