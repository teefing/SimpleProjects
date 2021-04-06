const hyphenateRE = /\B([A-Z])/g
const hyphenate = (str) => {
  return str.replace(hyphenateRE, '_$1').toLowerCase()
}
console.log(hyphenate('absAdds1Adas'))