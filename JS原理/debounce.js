function debounce(fn, timeout = 1000) {
  let t;
  return function cb(args) {
    const context = this;
    clearTimeout(t);
    t = setTimeout(() => {
      fn.apply(context, args);
    }, timeout);
  };
}
