class EventEmitter {
  constructor() {
    this.events = {};
    this.count = 0;
  }

  subscribe(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);

    return this.unsubscribe.bind(this, type, listener);
  }

  unsubscribe(type, listener) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((cb) => cb !== listener);
    }
  }

  publish(type, ...args) {
    if (this.events[type]) {
      [...this.events[type]].forEach((cb) => {
        cb.call(this, ...args);
      });
    }
  }
}

const event = new EventEmitter();
event.subscribe('daily', function () {
  // 校验call的绑定
  console.log(`there has already ${this.count} subscribers`);
  console.log('bob');
});

event.subscribe('evening', () => {
  console.log('alice');
});

event.subscribe('noon', () => {
  console.log('Jim');
});

const JimEveningFn = function () {
  console.log('Jim');
};
event.subscribe('evening', JimEveningFn);

event.publish('daily');
console.log('****');
event.publish('evening');
console.log('****');
event.publish('noon');
