globalParam = 'globalParam'
let outside = 'outside'
let sandbox = new Function(`
  let inside = 'inside'
  console.log(inside) // 当然可以被访问到
  console.log(globalParam) // 可以被访问到
  console.log(outside) // 不能被访问到
`)


sandbox()

/**
 * 不能访问closure的变量, 但是能访问全局变量
 * 性能比eval好
 */