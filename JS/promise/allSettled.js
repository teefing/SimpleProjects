Promise.allSettled = function (promises) {
  return Promise.all(promises.map((p) => Promise.resolve(p).then((res) => ({
    status: 'fulfilled',
    value: res,
  })).catch((err) => ({
    status: 'rejected',
    value: err,
  }))));
};

Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error('an error')),
])
  .then((values) => console.log(values));
