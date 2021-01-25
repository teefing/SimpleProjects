// 拷贝函数
function shallowCopy(value) {
  if (Array.isArray(value)) return value.slice();
  if (value.__proto__ === undefined) {
    return Object.assign(Object.create(null), value);
  }

  return Object.assign({}, value);
}

class createState {
  target: any = null; // 目标对象/源对象
  modified: boolean = false; // 是否被修改
  copy: any = undefined; // 拷贝对象
  constructor(target) {
    this.target = target;
  }

  public get(key: string) {
    if (!this.modified) return this.target[key];
    return this.copy[key];
  }
  public set(key: string, value: any) {
    if (!this.modified) this.markChange();
    return (this.copy[key] = value);
  }
  private markChange() {
    if (!this.modified) {
      this.modified = true;
      this.copy = shallowCopy(this.target);
    }
  }
}

const PROXY_STATE = Symbol("proxy-state");
const handler = {
  get(target, key) {
    if (key === PROXY_STATE) return target;
    return target.get(key);
  },
  set(target, key, value) {
    return target.set(key, value);
  },
};

function produce(state, producer) {
  const store = new createState(state);
  const proxy = new Proxy(store, handler);
  producer(proxy);
  const newState = proxy[PROXY_STATE];
  if (newState.modified) return newState.copy;
  return newState.target;
}

const baseState = [
  {
    todo: "Learn typescript",
    done: true,
  },
  {
    todo: "Try immer",
    done: false,
  },
];
const nextState = produce(baseState, (draftState) => {
  draftState.push({ todo: "Tweet about it", done: false });
  draftState[1].done = true;
});
console.log(baseState, nextState);
