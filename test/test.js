
new Promise((resolve, reject) => {
  reject(new Error('promise error'))
}).then((val) => {
  console.log('val: ', val);
}, (reason) => {
  console.log('reason: ', reason);
  return new Error('reason')
}).then(val => {
  console.log(val);
})