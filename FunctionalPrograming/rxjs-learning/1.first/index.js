const Rx = require("rxjs/Rx");
const EventEmitter = require("events").EventEmitter;
const clickEvent = new EventEmitter();

Rx.Observable.fromEvent(clickEvent, "click")
  // 流程控制操作
  .throttleTime(1000)
  // 对值进行转换
  .map((event) => event.clientX)
  // 使用纯函数来产生值, scan类比es6的reduce
  .scan((count, clientX) => count + clientX, 0)
  .subscribe((count) => console.log(count));

clickEvent.emit("click", { clientX: 10 });
setTimeout(() => {
  clickEvent.emit("click", { clientX: 10 });
}, 2000);
