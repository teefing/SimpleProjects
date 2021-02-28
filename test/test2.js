let promise = new Promise((resolve, reject) => {
  resolve(1)
}).then(2).then(val => {
  console.log(val);
})