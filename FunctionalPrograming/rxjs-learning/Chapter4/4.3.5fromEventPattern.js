const { fromEventPattern } = require("rxjs");
const EventEmitter = require("events");

const emitter = new EventEmitter();

const addHandler = (handler) => {
  emitter.addListener("msg", handler);
};
const removeHandler = (handler) => {
  emitter.removeListener("msg", handler);
};
const source$ = fromEventPattern(addHandler, removeHandler);

const subscription = source$.subscribe(
  console.log,
  (error) => console.log("catch", error),
  () => console.log("complete")
);

emitter.emit("msg", "hello");
emitter.emit("msg", "world");

subscription.unsubscribe();
emitter.emit("msg", "end");
// hello
// world
