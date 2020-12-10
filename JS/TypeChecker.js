let TypeChecker = new Proxy(
  {},
  {
    get(target, key, receiver) {
      let matchRes;
      if ((matchRes = key.match(/is(.*)/))) {
        let type = matchRes[1];
        if (target[key]) return target[key];
        const testFunc = function(t) {
          return Object.prototype.toString.call(t).slice(8, -1) === type;
        };
        target[key] = testFunc;
        return testFunc;
      } else {
        return function() {
          console.log("invalid function");
        };
      }
    },
  }
);

console.log(TypeChecker.isArray([]));
console.log(TypeChecker.isRegExp(/aa/));
