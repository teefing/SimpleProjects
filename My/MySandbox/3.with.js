function compileCode (src) {  
  src = 'with (sandbox) {' + src + '}'
  return new Function('sandbox', src)
}
globalParam = 'globalParam'
let outside = 'outside'

compileCode(`
  console.log(inside) // ok 
  console.log(globalParam) // ok
  console.log(outside) // error
`)({ inside: 'inside' })


/**
 * 找不到的变量则又会向上进行搜索
 */