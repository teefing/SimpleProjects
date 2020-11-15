function Add (...rest) {
  const args = [...rest]
  function AddInner (...rest1) {
    args.push(...rest1)
    return AddInner
  }

  AddInner.sumOf = function () {
    return args.reduce((acc, cur) => acc+cur, 0)
  }

  return AddInner
}

console.log(Add(1)(2)(3).sumOf());
console.log(Add(1, 2)(3)(4).sumOf());
console.log(Add(1, 2, 5)(3)(4).sumOf());
