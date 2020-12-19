const proxy = new Proxy([], {
  get(target, key, receiver) {
    let val = target[key];
    let value = typeof val === "object" && val !== null ? observe(val) : val;
    console.log("value: ", value);
    // Reflect.set(target, key, value, receiver);
    return value;
  },
  set(target, key, val, receiver) {
    Reflect.set(target, key, value, receiver);
    return true;
  },
});

proxy.push(111);
