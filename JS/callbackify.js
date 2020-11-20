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