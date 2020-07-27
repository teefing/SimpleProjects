function throttle (fn, timeout = 200) {
  let lastTime = Date.now()
  let cur;
  return function cb (args) {
    cur = Date.now()
    if (cur - lastTime >= timeout) {
      fn.apply(this, args)
      lastTime = cur
    }
  }
}

let obj = {
  value: 1
}

function print () {
  console.log(this.value);
}



const printThrottled = throttle(print.bind(obj), 1000)


// 16毫秒执行一次printThrottled方法
setInterval(() => {
  printThrottled()
}, 16);