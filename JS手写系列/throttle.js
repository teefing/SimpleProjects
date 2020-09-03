function throttle(fn, timeout = 200) {
  let lastTime = Date.now();
  let cur;
  return function cb(...args) {
    cur = Date.now();
    if (cur - lastTime >= timeout) {
      fn.call(this, ...args);
      lastTime = cur;
    }
  };
}

function throttleSetTimeOutVersion(fn, timeout = 1000, immediate = false) {
  let timer = null;
  let __immediate = immediate;
  return function (...args) {
    if (__immediate) {
      fn.call(this, ...args);
      __immediate = false;
    }
    if (timer) return;
    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, timeout);
  };
}

const obj = {
  value: 1,
};

function print(val) {
  console.log(this.value + val);
}

const printThrottled = throttle(print, 1000);

// 16毫秒执行一次printThrottled方法
setInterval(() => {
  printThrottled.call(obj, 1);
}, 16);
