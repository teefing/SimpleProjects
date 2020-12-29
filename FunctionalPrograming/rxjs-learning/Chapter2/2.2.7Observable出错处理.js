const { Observable } = require("rxjs");

const onSubscribe = (observer) => {
  observer.next(1)
  observer.error('something wrong') // something wrong
  observer.complete() // 不执行
};

const source = new Observable(onSubscribe);

source.subscribe({
  next: (item) => console.log(item),
  complete: () => console.log('complete'),
  error: err => console.log(err)
});

