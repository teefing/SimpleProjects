
/**
 * 千分位分隔符
 * @param {string | number} str 
 * @returns string
 */
function thousandsSeparator(str){
  str = String(str)
  let indexDot = str.indexOf('.')
  let before = str, after = ''
  if(indexDot !== -1) {
    before = str.slice(0, indexDot)
    after = str.slice(indexDot+1)
  }
  return before.replace(/(?!^)(?=(\d{3})+$)/g, ',') + (after ? '.' : '') + after.slice(0,3)
}

console.log((123456789.1111).toLocaleString())
console.log(thousandsSeparator(123456789.1111))