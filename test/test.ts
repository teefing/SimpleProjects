const IMMER_PROXY = Symbol("immer-proxy");

function shallowCopy(value) {
  if (Array.isArray(value)) return value.slice();
  return Object.assign({}, value);
}

class Store {
  target = null;
  copy = null;
  modified: boolean = false;
  constructor(target) {
    this.target = target;
  }

  get(key) {
    if (!this.modified) return this.target[key];
    return this.copy[key];
  }

  set(key, value) {
    if (!this.modified) this.markModify();
    this.copy[key] = value;
  }

  markModify() {
    if (!this.modified) {
      this.copy = shallowCopy(this.target);
      this.modified = true;
    }
  }

  getTarget() {
    return this.modified ? this.copy : this.target;
  }
}

const handler = {
  get(target: Store, key) {
    if (key === IMMER_PROXY) return target.getTarget();
    return target.get(key);
  },
  set(target: Store, key, value) {
    target.set(key, value);
    return true;
  },
};

function produce(state, producer) {
  let store = new Store(state);
  let proxy = new Proxy(store, handler);
  producer(proxy);
  return proxy[IMMER_PROXY];
}

const baseState = {
  a: {
    b: 1,
  },
};
const nextState = produce(baseState, (draftState) => {
  draftState.a.b = 2;
});
console.log(baseState, nextState);

export {};
