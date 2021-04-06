function fromCamelCase(str, separator = '_'){
  return str.replace(/([\da-z])([A-Z])/g, function(match, p1, p2, offset, origin){
    return p1 + separator + p2.toLowerCase()
  }).replace(/^./, function(match){
    // 处理第一个字符
    return match.toLowerCase()
  })
}

console.log(fromCamelCase('Animal1Job'))