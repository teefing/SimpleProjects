const { Observable } = require("rxjs");

// Observable对象的行为
const onSubscribe = (observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
};

// Observable对象/发布者
const source = new Observable(onSubscribe);

// 观察者
const theObserver = {
  next: (item) => console.log(item),
};

source.subscribe(theObserver);
// 关联发布者与观察者

