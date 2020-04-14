function throttle(fn, timeout = 200) {
  let lastTime = Date.now();
  let cur;
  return function cb(args) {
    const context = this;
    cur = Date.now();
    if (cur - lastTime >= timeout) {
      fn.apply(context, args);
      lastTime = cur;
    }
  };
}
