const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  reject();
  console.log(2);
});
promise.then(
  () => {
    console.log(3);
  },
  () => {
    console.log('失败的状态');
  },
);
console.log(4);
