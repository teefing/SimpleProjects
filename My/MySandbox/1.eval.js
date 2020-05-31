globalParam = "globalParam";
let outside = "outside";
let sandbox = () => {
  return eval(`
  let inside = 'inside'
  console.log(inside) // ok
  console.log(outside) // ok
  console.log(globalParam) // ok
  `);
};

sandbox();

/**
 * eval 的特性是如果当前域里面没有,则会向上遍历.一直到最顶层的global scope 比如window.以及,他还可以访问closure内的变量.
 * 因此不适合用于沙箱
 */
