const fs = require("fs");

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
      fn.apply(null, args);
    });
  };
};

const callbackify = (promiseCreator) => {
  return (...args) => {
    const arg = args.slice(0, -1)
    const cb = args.slice(-1)[0];
    promiseCreator(...arg)
      .then((val) => {
        cb(null, val);
      })
      .catch((err) => {
        cb(err, null);
      });
  };
};

// fs.exists("./config.js", (err, val) => {
//   console.log("val: ", val);
//   console.log("err: ", err);
// });

const existPromise = promisify(fs.exists);
// existPromise("./config.js")
//   .then((val) => {
//     console.log("val: ", val);
//   })
//   .catch((err) => {
//     console.log("err: ", err);
//   });

const existFn = callbackify(existPromise)
existFn("./config.js", (err, val) => {
  console.log("val: ", val);
  console.log("err: ", err);
});