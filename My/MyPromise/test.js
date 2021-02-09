const Promise = require("./MyPromise");
let p3 = new Promise((resolve, reject) => {
  resolve('ps promise')
})

let aa = p3.then(res => {
  console.log('codingBug')
  return aa
}).then(res => {
  console.log(res)
})
console.log(111)
// let p3 = new Promise((resolve, reject) => {
//   resolve("ps promise");
// });

// let aa = p3.then((res) => {
//   console.log("codingBug");
//   return aa;
// });

// aa.then((res) => {
//   console.log(res);
// }).catch((e) => {
//   console.log(e);
// });
