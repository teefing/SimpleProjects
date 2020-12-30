const { fromEvent } = require("rxjs");
const EventEmitter = require("events");
const clg = console.log;

const emitter = new EventEmitter();
emitter.emit("msg", "before");

// fromEvent第一个参数必须是dom或者event emitter
fromEvent(emitter, "msg").subscribe(clg);

emitter.emit("msg", 1);
emitter.emit("msg", 2);
emitter.emit("msg", 3);
// 1
// 2
// 3

// fromEvent产生一个hot observable
