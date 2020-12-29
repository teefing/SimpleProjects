const { Observable } = require("rxjs");

// Observable对象的行为
const onSubscribe = (observer) => {
  let number = 1
  const time = setInterval(() => {
    observer.next(number++)
    if (number > 3) {
      clearInterval(time)
      observer.complete()
    }
  }, 1000);
};

// Observable对象/发布者
const source = new Observable(onSubscribe);

source.subscribe({
  next: (item) => console.log(item),
  complete: () => console.log('complete'),
});
// 关联发布者与观察者

