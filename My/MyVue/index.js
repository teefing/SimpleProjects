// https://juejin.cn/post/6844903644953837576#heading-6

let target = null;

class Dep {
  constructor() {
    this.subs = [];
  }

  depend() {
    if (target && !this.subs.includes(target)) {
      this.subs.push(target);
    }
  }

  notify() {
    this.subs.forEach((sub) => sub());
  }
}

// 使data变为响应式
function observe(data) {
  const dep = new Dep();

  // 将data中的子对象也变为响应式
  let val;
  Object.keys(data).forEach((key) => {
    val = data[key];
    if (typeof val === "object" && val !== null) {
      data[key] = observe(val);
    }
  });

  return new Proxy(data, {
    get(target, key, receiver) {
      dep.depend(); // 依赖注入
      return Reflect.get(target, key, receiver);
    },
    set(target, key, val, receiver) {
      Reflect.set(target, key, val, receiver);
      dep.notify(); // 执行
      return true;
    },
  });
}

// 设定存入依赖的target
function watch(myFunc) {
  target = myFunc;
  // 当执行target时，如果其中存在响应式数据，会在调用响应式数据的set方法时将target作为依赖存入该响应式数据，在该响应式数据改变时，会触发其所有的依赖回调
  target();
  // 将target设置为null，供其它响应式数据使用
  target = null;
}
