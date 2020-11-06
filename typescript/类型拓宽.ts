function typeExpend() {
  let a = null
  a = 3
  a = 'b'
  return a
}

let b = typeExpend()

function asConst阻止类型拓宽() {
  let a = { x: 3 }
  let b = { x: 3 } as const
  
  let c = 1
  let d = 1 as const
}
