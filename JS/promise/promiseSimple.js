const STATUS = {
  PENDING: Symbol('pending'),
  FULFILLED: Symbol('fulfilled'),
  REJECTED: Symbol('rejected'),
};
class Bromise {
  status = STATUS.PENDING;

  resolvedCallbacks = [];

  rejectedCallbacks = [];

  constructor(fn) {
    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  resolve = (value) => {
    setTimeout(() => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
        this.resolvedCallbacks.map((cb) => cb(this.value));
      }
    });
  };

  reject = (value) => {
    setTimeout(() => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.value = value;
        this.rejectedCallbacks.map((cb) => cb(this.value));
      }
    });
  };

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === 'function'
      ? onRejected
      : (r) => {
        throw r;
      };
    switch (this.status) {
      case STATUS.PENDING:
        this.resolvedCallbacks.push(onFulfilled);
        this.rejectedCallbacks.push(onRejected);
        break;
      case STATUS.FULFILLED:
        onFulfilled(this.value);
        break;
      case STATUS.REJECTED:
        onRejected(this.value);
        break;
      default:
    }
    return this;
  };
}

const p = new Bromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
})
  .then((res) => Bromise.resolve(2))
  .then((res) => console.log(res));
