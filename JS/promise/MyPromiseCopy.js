// 先定义三个常量表示状态
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

function MyPromise(fn) {
  this.status = PENDING
  this.value = null
  this.reason = null

  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  var that = this
  function resolve (value) {
    if (that.status === PENDING) {
      that.status = FULFILLED
      that.value = value
      that.onFulfilledCallbacks.forEach(cb => {
        cb(value)
      })
    }
  }

  function reject (reason) {
    if (that.status === PENDING) {
      that.status = REJECTED
      that.reason = reason
      that.onRejectedCallbacks.forEach(cb => {
        cb(reason)
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch(err) {
    reject(err)
  }
}

function resolvePromise (promise, x, resolve, reject) {
  // 解决循环
  if (promise === x) {
    reject(new TypeError('promise is same with value'))
    return
  }
  // x是promise
  if (x instanceof MyPromise) {
    x.then(function (val) {
      resolvePromise(promise, val, resolve, reject)
    }, function (err) {
        reject(err)
    })
  }

  // x是对象或函数
  else if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 取x.then
    var then
    try {
      then = x.then
    } catch (error) {
      return reject(error)
    }
    // x.then是函数
    if (typeof then === 'function') {
      var called = false
      try {
        then.call(x, function (val) {
          if (called) return
          called = true
          resolvePromise(promise, val, resolve, reject)
        }, function (reason) {
            if (called) return
            called = true
            reject(reason)
        })
      } catch (err) {
        if(called) return
        reject(err)
      }
    }
    // x.then不是函数
    else {
      resolve(x)
    }
  }
  // x不是上面类型
  else {
    resolve(x)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  
  var promise2
  var that = this

  function onFulfilledCallback (resolve, reject) {
    setTimeout(() => {
      try {
        if (typeof onFulfilled === 'function') {
          var x = onFulfilled(that.value)
          resolvePromise(promise2, x, resolve, reject)
        } else {
          resolve(that.value)
        }
      } catch (error) {
        reject(error)
      }
    }, 0);
  }

  function onRejectedCallback (resolve, reject) {
    setTimeout(() => {
      try {
        if (typeof onRejected === 'function') {
          var x = onRejected(that.reason)
          resolvePromise(promise2, x, resolve, reject)
        } else {
          reject(that.reason)
        }
      } catch (error) {
        reject(error)
      }
      
    }, 0);
  }

  if (this.status === PENDING) {
    promise2 = new Promise(function (resolve, reject) {
      that.onFulfilledCallbacks.push(onFulfilledCallback.bind(that, resolve, reject))
      that.onRejectedCallbacks.push(onRejectedCallback.bind(that, reject, resolve))
    })
  } else if (this.status === FULFILLED) {
    promise2 = new Promise(function (resolve, reject) {
      onFulfilledCallback(that, resolve, reject)
    })
  } else if(this.status === REJECTED) {
    promise2 = new Promise(function (resolve, reject) {
      onRejectedCallback(that, resolve, reject)
    })
  }

  return promise2;
};

MyPromise.deferred = function() {
  var result = {};
  result.promise = new MyPromise(function(resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};



module.exports = MyPromise;