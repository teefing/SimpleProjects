const promise1 = new Promise((resolve) => {
  resolve("promise1");
});

const promise2 = new Promise((resolve, reject) => {
  reject(new Error("error2"));
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("error3"));
  }, 2000);
});

const res = Promise.all([promise3, promise1, promise2])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    console.log(promise1); // Promise { 'promise1' }
    console.log(promise2); //  Promise {
    //  <rejected> Error: error2 ...
    console.log(promise3);

    setTimeout(() => {
      console.log(promise3);
    }, 3000);
  });

// 当Promise.all的一个promise reject时，不会影响其它promise的状态，不过Promise.all 返回的是时间维度的第一个reject的error
