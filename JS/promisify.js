function func(a, b, cb) {
  const res = a + b;
  cb(null, res);
}

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
      fn.apply(null, args);
    });
  };
}

const funcPromisify = promisify(func);

funcPromisify(1, 2).then((val) => {
  console.log(val);
});
