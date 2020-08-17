/**
 * @param {String}  message    错误信息
 * @param {String}  source    出错文件
 * @param {Number}  lineno    行号
 * @param {Number}  colno    列号
 * @param {Object}  error  Error对象（对象）
 */

window.addEventListener('error', function (error) {
  // 对于同步异常和异步异常可以preventDefault阻止上报到系统层面，但是无法阻止网络异常上报到系统层面
  error.preventDefault()

  console.log("捕获到异常：", error);
  // 网络请求异常不会冒泡，必须再捕获阶段进行捕获
}, true)

// 同步异常 可以捕获
// Jartto;

// 语法错误 不能捕获
// let name = 'Jartto

// 异步错误 可以捕获
// setTimeout(() => {
//   Jartto;
// });


// 网络请求异常可以捕获

window.frames[0].addEventListener('error', function (message, source, lineno, colno, error) {
  console.log('捕获到 iframe 异常：',{message, source, lineno, colno, error});
  return true;
})