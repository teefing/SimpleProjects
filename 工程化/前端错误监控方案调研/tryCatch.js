// 同步错误可以捕获
// try {
//   let name = 'jartto';
//   console.log(nam);
// } catch(e) {
//   console.log('捕获到异常：',e);
// }


// 语法错误不能捕获
// try {
//   let name = 'jartto;
//   console.log(nam);
// } catch(e) {

//   console.log('捕获到异常：',e);
// }

// 异步错误无法捕获
// try {
//   setTimeout(() => {
//     undefined.map(v => v);
//   }, 1000)
// } catch(e) {
//   console.log('捕获到异常：',e);
// }