/**
 * @param {String}  message    错误信息
 * @param {String}  source    出错文件
 * @param {Number}  lineno    行号
 * @param {Number}  colno    列号
 * @param {Object}  error  Error对象（对象）
 */

window.onerror = function (message, source, lineno, colno, error) {
  console.log("捕获到异常：", { message, source, lineno, colno, error });
  // 如果return true，则不会向系统再抛出异常
  return true
};

// 同步异常 可以捕获
// Jartto;

// 语法错误 不能捕获
// let name = 'Jartto

// 异步错误 可以捕获
// setTimeout(() => {
//   Jartto;
// });


// 网络请求异常无法捕获


// iframe异常可以捕获
window.frames[0].onerror = function (message, source, lineno, colno, error) {
  console.log('捕获到 iframe 异常：',{message, source, lineno, colno, error});
  return true;
};
