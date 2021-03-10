// 先定义三个常量表示状态
const PENDING = Symbol("pending");
const FULFILLED = Symbol("fulfilled");
const REJECTED = Symbol("rejected");

function MyPromise(fn) {
  // 初始状态为pending
  this.status = PENDING;
  // 初始化value
  this.value = null;
  // 初始化reason
  this.reason = null;
  // 构造函数里面添加两个数组存储成功和失败的回调
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
      this.onFulfilledCallbacks.forEach((cb) => cb());
    }
  };

  const reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      // 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
      this.onRejectedCallbacks.forEach((cb) => cb());
    }
  };

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 1.如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 这是为了防止死循环
  if (x === promise) {
    return reject(new TypeError("promise is equal to promise"));
  }

  // 2.如果 x 为 Promise ，则使 promise 接受 x 的状态
  // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
  else if (x instanceof MyPromise) {
    x.then(function (v) {
      resolvePromise(promise, v, resolve, reject);
    }, reject);
  }

  // 3.如果 x 为对象或者函数
  else if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let then;
    // 3.1把 x.then 赋值给 then
    // !!! 这里按照正常思维可以不用try catch包裹，但是如果x被代理，访问then时throw一个错误，那么用try catch包裹就是有必要的
    try {
      then = x.then;
    } catch (e) {
      // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(e);
    }
    // 3.2 如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
    if (typeof then === "function") {
      // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
      let called = false;
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          function (y) {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          function (r) {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 e
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (called) return;
        called = true;
        // 否则以 e 为据因拒绝 promise
        reject(error);
      }
    }
    // 3.3 如果 then 不是函数，以 x 为参数执行 promise
    else {
      resolve(x);
    }
  }
  // 4.如果 x 不为对象或者函数，以 x 为参数执行 promise
  else {
    resolve(x);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let promise2;
  const onFulfilledCallback = (resolve, reject) => {
    setTimeout(() => {
      try {
        // 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
        if (typeof onFulfilled === "function") {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        }
        // 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
        else {
          resolve(this.value);
        }
      } catch (error) {
        // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因
        reject(error);
      }
    }, 0);
  };
  const onRejectedCallback = (resolve, reject) => {
    setTimeout(() => {
      try {
        if (typeof onRejected === "function") {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        }
        // 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
        else {
          reject(this.reason);
        }
      } catch (error) {
        reject(error);
      }
    }, 0);
  };

  switch (this.status) {
    case PENDING:
      promise2 = new MyPromise((resolve, reject) => {
        this.onFulfilledCallbacks.push(
          onFulfilledCallback.bind(this, resolve, reject)
        );
        this.onRejectedCallbacks.push(
          onRejectedCallback.bind(this, resolve, reject)
        );
      });
      break;
    case FULFILLED:
      promise2 = new MyPromise((resolve, reject) => {
        onFulfilledCallback(resolve, reject);
      });
      break;
    case REJECTED:
      promise2 = new MyPromise((resolve, reject) => {
        onRejectedCallback(resolve, reject);
      });
      break;
    default:
  }

  return promise2;
};

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

MyPromise.resolve = function (value) {
  // !!! 注意如果Promise.resolve传入一个promise作为参数，返回的还是该promise，而Promise.reject如果接受一个promise，返回的是一个新的promise
  if (value instanceof MyPromise) {
    return value;
  }
  return new MyPromise((resolve) => {
    resolve(value);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

MyPromise.all = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    // 完成的promise数量
    let count = 0;
    // all的结果
    let result = [];
    // promise列表总数
    let length = promiseList.length;
    // !!! 当promiseList长度为0时需要返回一个空数组
    if (length === 0) resolve(result);

    promiseList.forEach((promise, index) => {
      MyPromise.resolve(promise).then((value) => {
        count++;
        result[index] = value;
        if (count === length) resolve(result);
      }, reject);
    });
  });
};

MyPromise.race = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    // promiseList长度为0时不用返回
    promiseList.forEach((promise) => {
      MyPromise.resolve(promise).then(resolve, reject);
    });
  });
};

MyPromise.allSettled = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    // 完成的promise数量
    let count = 0;
    // all的结果
    let result = [];
    // promise列表总数
    let length = promiseList.length;
    // !!! 当promiseList长度为0时需要返回一个空数组
    if (length === 0) resolve(result);

    promiseList.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        (value) => {
          count++;
          result[index] = {
            status: "fulfilled",
            value: value,
          };
          if (count === length)
            // 在promise.all上面改造一下，resolve的时候要把状态也返回出去
            resolve(result);
        },
        // 在promise.all上面改造一下，原来reject的时候也要resolve数据
        (err) => {
          count++;
          result[index] = {
            status: "rejected",
            value: err,
          };
          if (count === length) resolve(result);
        }
      );
    });
  });
};

MyPromise.allSettled2 = function (promises) {
  return MyPromise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((res) => ({
          status: "fulfilled",
          value: res,
        }))
        .catch((err) => ({
          status: "rejected",
          value: err,
        }))
    )
  );
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

MyPromise.prototype.finally = function (fn) {
  fn = typeof fn === "function" ? fn : () => {};
  return this.then((value) => {
    fn();
    return value;
  }).catch((e) => {
    fn();
    throw e;
  });
};

MyPromise.retry = function (promiseCreator, times, delay) {
  return new MyPromise((resolve, reject) => {
    function attempt() {
      promiseCreator()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          if (times === 0) {
            reject(err);
          } else {
            times--;
            setTimeout(attempt, delay);
          }
        });
    }
    attempt();
  });
};

module.exports = MyPromise;


