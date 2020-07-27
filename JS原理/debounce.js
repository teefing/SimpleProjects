function debounce(fn, timeout = 1000) {
  let t;
  return function cb (...args) {
    // 在每次调用的时候都清除上一次的定时器，不管定时器内函数是否已经执行
    clearTimeout(t);
    t = setTimeout(() => {
      fn.call(this, ...args);
    }, timeout);
  };
}

let obj = {
  value: 1,
};

function print(val) {
  console.log(this.value + val);
}

const printDebounced = debounce(print.bind(obj), 1000);

// 16毫秒执行一次printThrottled方法
setInterval(() => {
  printDebounced(1);
}, 16);
