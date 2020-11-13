let x = new Proxy({}, {
  get (target, key, receiver) {
    console.log('key: ', key);
    if (key === 'then') {
      throw new Error('error')
    } else {
      return target[key]
    }
  }
})

console.log(x !== null && (typeof x === "object" || typeof x === "function"));

try {
  console.log(x.then);
} catch (e) {
  console.log(222);
  console.log(e);
}