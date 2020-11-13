const promise1 = new Promise((resolve) => {
  resolve('promise1')
})

const promise2 = new Promise((resolve, reject) => {
  reject(new Error('error2'))
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
  reject(new Error('error3'))
    
  }, 2000);
})

const res = Promise.all([promise3, promise1, promise2]).then(res => {
  console.log(res);
}).catch(e => {
  console.log(e);
}).finally(() => {
  console.log(promise1);
  console.log(promise2);
})



