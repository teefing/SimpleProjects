const { Observable } = require("rxjs");

const onSubscribe = (observer) => {
  let number = 1
  const time = setInterval(() => {
    observer.next(number++)
  }, 1000);
  return {
    unsubscribe: () => {
      clearInterval(time)
    }
  }
};

const source = new Observable(onSubscribe);

const subscription = source.subscribe(
  (item) => console.log(item),
  () => console.log("complete"),
  (err) => console.log(err)
);


setTimeout(() => {
  subscription.unsubscribe()
}, 4000);
