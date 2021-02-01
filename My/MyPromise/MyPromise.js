/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/
/** 三种状态 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  /** 默认为等待态 */
  status = PENDING;
  /** 当状态为FULFILLED时存储的值 */
  value = undefined;
  /** 当状态为REJECTED时存储的拒因 */
  reason = undefined;
  /** 通过时的回调队列 */
  successCallbacks = [];
  /** 拒绝时的回调队列 */
  failCallbacks = [];

  constructor(executor) {
    /** promise同步代码执行时的错误处理 */
    try {
      /** 在创建promise时执行执行器函数 */
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  /** 以value为值通过该promise */
  resolve = (value) => {
    /** 只有当状态为等待态时才能改变状态 */
    if (this.status === PENDING) {
      /** 将状态改为完成 */
      this.status = FULFILLED;
      this.value = value;
      /** 执行成功回调队列中的函数 */
      this.successCallbacks.forEach((fn) => fn());
    }
  };

  /** 以reason为拒因拒绝改promise */
  reject = (reason) => {
    /** 只有当状态为等待态时才能改变状态 */
    if (this.status === PENDING) {
      /** 将状态改为拒绝 */
      this.status = REJECTED;
      this.reason = reason;
      /** 执行成功回调队列中的函数 */
      this.failCallbacks.forEach((fn) => fn());
    }
  };

  /** 向promise中执行或注册promise在不同状态时的回调事件 */
  then = (onSuccess, onFail) => {
    let promise2;
    const resolvePromise = (promise2, x, resolve, reject) => {
      /**处理promise循环调用自身的情况 */
      if (promise2 === x) {
        return reject(new TypeError("不允许promise循环调用自身"));
      }
      if (x instanceof MyPromise) {
        x.then((v) => {
          resolvePromise(promise2, v, resolve, reject);
        }, reject);
      } else {
        resolve(x);
      }
    };
    const successCallback = (resolve, reject) => {
      /** promise2只有在MyPromise的逻辑结束后才能生成，如果因此如果同步执行下面的代码，获取到的promise2是undefined, 因此需要使用settimeout使下面代码执行时间推迟到promise2生成后 */
      setTimeout(() => {
        /** then回调函数执行时的错误处理 */
        try {
          /** 处理传入的callback非法的情况，当callback不是函数时，忽略这个then */
          if (typeof onSuccess === "function") {
            /** 不仅要执行回调函数，还要处理then中return数据作为下一个then的value的情况 */
            let x = onSuccess(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } else {
            /** 以上当前promise的value作为promise2 resolve时的value */
            resolve(this.value);
          }
        } catch (e) {
          reject(e);
        }
      }, 0);
    };

    const failCallback = (resolve, reject) => {
      /** promise2只有在MyPromise的逻辑结束后才能生成，如果因此如果同步执行下面的代码，获取到的promise2是undefined, 因此需要使用settimeout使下面代码执行时间推迟到promise2生成后 */
      setTimeout(() => {
        /** then回调函数执行时的错误处理 */
        try {
          /** 处理传入的callback非法的情况，当callback不是函数时，忽略这个then */
          if (typeof onFail === "function") {
            /** 不仅要执行回调函数，还要处理then中return数据作为下一个then的value的情况 */
            let x = onFail(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } else {
            /** 以上当前promise的reason作为promise2 reject时的reason */
            reject(this.reason);
          }
        } catch (e) {
          reject(e);
        }
      }, 0);
    };

    /** 为了支持then的链式调用，需要每次都返回一个新的promise */
    promise2 = new MyPromise((resolve, reject) => {
      /** 如果是PENDING状态，存储回调事件，否则直接执行 */
      switch (this.status) {
        case FULFILLED:
          console.log(111);
          successCallback(resolve, reject);
          break;
        case REJECTED:
          console.log(222);
          failCallback(resolve, reject);
          break;
        case PENDING:
          console.log(333);
          this.successCallbacks.push(() => successCallback(resolve, reject));
          this.failCallbacks.push(() => failCallback(resolve, reject));
          break;
        default:
      }
    });

    return promise2;
  };

  /** this.then(null, fn)的语法糖 */
  catch = (fn) => {
    /** 需要链式调用，所以需要return */
    return this.then(null, fn);
  };

  /**
   * finally传入的回调函数不管promise被reject还是resolve都会被执行
   * finally支持链式调用
   * 如果finally返回了普通值，将无视该返回值，下一个then接收的值仍然是finally上游的返回值
   * 如果返回了promise，下一个then将等待该promise的执行
   * 如果回调函数在执行过程中throw了一个错误，则会作为新的拒因传递给下一个then
   * 注意，finally的回调函数不接受value或者reason
   */
  finally = (fn) => {
    /** 需要链式调用，所以需要return */
    return this.then(
      (value) => {
        /** 在如果fn在执行过程中抛出错误，不会执行then中的回调函数，而是继续向下传递 */
        return MyPromise.resolve(fn()).then(() => value);
      },
      (e) => {
        /** 在如果fn在执行过程中抛出错误，不会执行then中的回调函数，而是继续向下传递 */
        return MyPromise.resolve(fn()).then(() => {
          throw e;
        });
      }
    );
  };

  /** 如果Promise.resolve的参数是一个promise，直接返回该promise，否则创建一个新的promise，该promise状态为fulfilled */
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  /** 不管Promise.reject的参数是什么，都将它作为拒因，创建一个新的promise，该promise的状态为rejected */
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  /** 下面的race，allSettled，any都是以all为蓝本进行修改的 */
  static all(array) {
    /** 已经resolve的promise数量 */
    let count = 0;
    let length = array.length;
    /** 返回的结果数组 */
    let result = [];
    /** 当数组中有一个promise的结果为rejected，直接整个promise reject，并且以该rejected状态的promise的拒因为promise.all的拒因 */
    return new MyPromise((resolve, reject) => {
      array.forEach((promise, index) => {
        /** 通过Promise.resolve将非promise的值转为promise，来统一处理 */
        MyPromise.resolve(promise).then((v) => {
          result[index] = v;
          count++;
          /** 只有当已经resolve的promise的数量和传入的数组长度一致，才resolve结果数组 */
          if (count === length) {
            resolve(result);
          }
        }, reject);
      });
    });
  }

  static race(array) {
    /** 当数组中有一个promise被resolve或者reject了，就作为race的value或reason被返回 */
    return new MyPromise((resolve, reject) => {
      array.forEach((promise) => {
        /** 通过Promise.resolve将非promise的值转为promise，来统一处理 */
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  /** 当数组中的promise被resolve或者reject时，都是被settle了，当数组中所有的promise都被settle，返回结果数组 */
  static allSettled(array) {
    /** 已经settle的promise数量 */
    let count = 0;
    let length = array.length;
    /** 返回的结果数组 */
    let result = [];

    return new MyPromise((resolve, reject) => {
      array.forEach((promise, index) => {
        /** 通过Promise.resolve将非promise的值转为promise，来统一处理 */
        MyPromise.resolve(promise).then(
          (v) => {
            result[index] = {
              value: v,
              status: "fulfilled",
            };
            count++;
            /** 只有当已经settle的promise的数量和传入的数组长度一致，才resolve结果数组 */
            if (count === length) {
              resolve(result);
            }
          },
          (e) => {
            result[index] = {
              reason: e,
              status: "rejected",
            };
            count++;
            /** 只有当已经settle的promise的数量和传入的数组长度一致，才resolve结果数组 */
            if (count === length) {
              resolve(result);
            }
          }
        );
      });
    });
  }

  /** 借用Promise.all的Promise.allSettle的简化版 */
  static allSettled2(array) {
    return MyPromise.all(
      array.map((promise) => {
        return MyPromise.resolve(promise).then(
          (v) => ({ status: "fulfilled", value: v }),
          (e) => ({ status: "rejected", reason: e })
        );
      })
    );
  }

  /** https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any */
  static any(array) {
    /** 已经reject的promise数量 */
    let count = 0;
    let length = array.length;
    /** 当数组中有一个promise的结果为fulfilled，直接整个promise resolve，并且以该ulfilled状态的promise的value为promise.any的value */
    return new MyPromise((resolve, reject) => {
      array.forEach((promise) => {
        /** 通过Promise.resolve将非promise的值转为promise，来统一处理 */
        MyPromise.resolve(promise).then(resolve, (e) => {
          count++;
          /** 当所有的promise都失败时，reject一个 AggregateError*/
          if (count === length) {
            reject(
              new Error(
                "AggregateError: No Promise in Promise.any was resolved"
              )
            );
          }
        });
      });
    });
  }
}

module.exports = MyPromise;
