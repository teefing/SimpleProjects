const cacheMap = new Map();

function cache(maxage = 1000) {
  return function(target, name, descriptor) {
    const val = descriptor.value;
    descriptor.value = async function(...args) {
      const cacheKey = name + JSON.stringify(args);
      const cacheData = cacheMap.get(cacheKey);
      if (cacheData && Date.now() < cacheData.expirationTime) {
        return cacheData.value;
      } 

      const cacheValue = Promise.resolve(val.apply(this, args)).catch(() => {
        cacheMap.set(cacheKey, null);
      });
      const expirationTime = Date.now() + maxage
      cacheMap.set(cacheKey, {value: cacheValue, expirationTime});
      return cacheValue;
    };

    return descriptor;
  };
}

function sleep(timeout = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
}
class A {
  name = "a";

  @cache(3000)
  async getName() {
    await sleep();
    return this.name;
  }
}

let a = new A();
a.getName().then((res) => {
  console.log(res);
  a.getName().then((res) => {
    console.log(res);
  });
});
