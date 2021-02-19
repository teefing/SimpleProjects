class Observer {
  constructor(target) {
    this.observers = [];
    this.target = new Proxy(target, {
      set: (target, key, value, receiver) => {
        const result = Reflect.set(target, key, value, receiver);
        [...this.observers].forEach((cb) => cb(target, key, value, receiver));
        return result;
      },
    });

    return [this.target, this.observe]
  }

  observe = fn => {
    this.observers.push(fn);
    return this.unobserve.bind(null, fn)
  }

  unobserve = fn => {
    this.observers = this.observers.filter(o => o !== fn)
  }
}

let [person, observe] = new Observer({ name: 1, age: 2 });
let unsubscribe = observe((target, key, value) => {
  console.log("target, key, value: ", target, key, value);
});

person.name = 'bob' // target, key, value:  { name: 'bob', age: 2 } name bob

unsubscribe()
person.name = 'aaa'