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

let obj = {
  value: 1,
};

function print(val) {
  console.log(this.value + val);
}

const printThrottled = throttle(print.bind(obj), 1000);

// 16毫秒执行一次printThrottled方法
setInterval(() => {
  printThrottled(1);
}, 16);
