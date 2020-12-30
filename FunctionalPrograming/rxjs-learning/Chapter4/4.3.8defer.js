const { defer, of } = require("rxjs");

const observableFactory = () => {
  console.log("observableFactory");
  return of(1, 2, 3);
};
const source$ = defer(observableFactory);

setTimeout(() => {
  source$.subscribe(console.log);
}, 2000);
