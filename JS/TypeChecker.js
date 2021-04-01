let TypeChecker = new Proxy(
  {},
  {
    get(target, key, receiver) {
      let matchRes;
      if ((matchRes = key.match(/is(.*)/))) {
        let type = matchRes[1];
        if (target[key]) return target[key];
        const judgeFunc = function(t) {
          return Object.prototype.toString.call(t).slice(8, -1).toLowerCase() === type.toLowerCase();
        };
        target[key] = judgeFunc;
        return judgeFunc;
      } else {
        return function() {
          throw new Error("invalid function")
        };
      }
    },
  }
);

console.log(TypeChecker.isArray([])); // true
console.log(TypeChecker.isRegExp(/aa/)); // true
console.log(TypeChecker.isNumber('1')); // false
