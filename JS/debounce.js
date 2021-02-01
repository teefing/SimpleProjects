function debounce(fn, timeout = 1000) {
  let t;
  let result;
  return function cb(...args) {
    // 在每次调用的时候都清除上一次的定时器，不管定时器内函数是否已经执行
    clearTimeout(t);
    t = setTimeout(() => {
      result = fn.call(this, ...args);
    }, timeout);
    return result;
  };
}

const obj = {
  value: 1,
};

function print(val) {
  console.log(this.value + val);
}

const printDebounced = debounce(print, 1000);

// 16毫秒执行一次printThrottled方法, 那么print永远不会被执行到
setInterval(() => {
  printDebounced.call(obj, 1);
}, 16);
