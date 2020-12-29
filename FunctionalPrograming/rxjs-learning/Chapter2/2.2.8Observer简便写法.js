const { Observable } = require("rxjs");

const onSubscribe = (observer) => {
  observer.next(1);
  observer.error("something wrong"); // something wrong
  observer.complete(); // 不执行
};

const source = new Observable(onSubscribe);

source.subscribe(
  (item) => console.log(item),
  () => console.log("complete"),
  (err) => console.log(err)
);
