const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

const resolutionProcedure = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }

  if (x instanceof MyPromise) {
    x.then(function (value) {
      resolutionProcedure(promise2, value, resolve, reject);
    }, reject);
  }

  let called = false;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolutionProcedure(promise2, y, resolve, reject);
          },
          (e) => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

class MyPromise {
  /** 一开始Promise的状态应该是pending */
  state = PENDING;

  /** 用于保存resolve和reject中传入的值 */
  value = null;

  resolvedCallbacks = [];

  rejectedCallbacks = [];

  constructor(fn) {
    const resolve = (value) => {
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = RESOLVED;
          this.value = value;
          this.resolvedCallbacks.map((cb) => {
            cb(this.value)
          });
        }
      }, 0);
    };

    const reject = (value) => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.value = value;
          this.resolvedCallbacks.map((cb) => cb(this.value));
        }
      }, 0);
    };

    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then = (onFulfilled, onRejected) => {
    let promise2
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (r) => {
            throw r;
          };
    if (this.state === PENDING) {
      return (promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value);
            
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (r) {
            reject(r);
          }
        });

        this.rejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (r) {
            reject(r);
          }
        });
      }));
    }

    if (this.state === RESOLVED) {
      return (promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        });
      }));
    }

    if (this.state === REJECTED) {
      return (promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        });
      }));
    }

    return this;
  };
}

new MyPromise((resolve, reject) => {
  resolve(999);
})
  .then((val) => {
    console.log(1);
    console.log(val);
  })
  .then((val) => {
    console.log(2);
    console.log(val);
  });
