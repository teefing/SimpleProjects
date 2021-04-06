function sum(...argsSum){
  let args = [...argsSum]
  function temp(...argsTemp){
    args = [...argsSum, ...argsTemp]
    return sum(...args)
  }
  temp.sumOf = function(){
    return args.reduce((acc, cur) => acc+cur, 0)
  }
  return temp
}

console.log(sum(1,2,3).sumOf())
console.log(sum(1)(2)(3).sumOf())
console.log(sum(1,2)(3).sumOf())