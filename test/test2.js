class Events {
  constructor() {
    this.events = {};
  }

  on(type, listener, ...args) {
    this.events[type] = this.events[type] || [];
    listener.args = [...args]
    this.events[type].push(listener);
    return this.off.bind(this, type, listener);
  }

  off(type, listener) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((cb) => cb !== listener);
    }
  }

  fire(type, ...args) {
    if (this.events[type]) {
      [...this.events[type]].forEach((cb) => {
        cb.args = cb.args || []
        const argArr = [...cb.args, ...args]
        cb.call(this, ...argArr);
      });
    }
  }

  once(type, listener) {
    this.events[type] = this.events[type] || [];
    const proxyListener = (...args) => {
      listener.call(...args)
      this.off(type, proxyListener)
    }
    this.events[type].push(proxyListener);
  }
}

// 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', () => console.log('I want sleep'));
event.fire('sleep');
// I want sleep2 1 2 3
// I want sleep
event.fire('sleep');
// I want sleep2 1 2 3