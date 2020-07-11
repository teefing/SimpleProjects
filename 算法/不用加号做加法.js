const sum = (a, b) => {
  if (a === 0) return b
  if (b === 0) return a
  let temp1 = a ^ b
  let temp2 = (a & b) << 1
  return sum(temp1, temp2)
}

console.log(sum(99999, 999));