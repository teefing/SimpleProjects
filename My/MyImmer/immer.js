// 拷贝函数
function shallowCopy(value) {
    if (Array.isArray(value))
        return value.slice();
    if (value.__proto__ === undefined)
        return Object.assign(Object.create(null), value);
    return Object.assign({}, value);
}
function createState(target) {
    this.modified = false; // 是否被修改
    this.target = target; // 目标对象/源对象
    this.copy = undefined; // 拷贝对象
}
createState.prototype = {
    get: function (key) {
        if (!this.modified)
            return this.target[key];
        return this.copy[key];
    },
    set: function (key, value) {
        if (!this.modified)
            this.markChange();
        return (this.copy[key] = value);
    },
    markChange: function () {
        if (!this.modified) {
            this.modified = true;
            this.copy = shallowCopy(this.target);
        }
    }
};
var PROXY_STATE = Symbol('proxy-state');
var handler = {
    get: function (target, key) {
        if (key === PROXY_STATE)
            return target;
        return target.get(key);
    },
    set: function (target, key, value) {
        return target.set(key, value);
    }
};
function produce(state, producer) {
    var store = new createState(state);
    var proxy = new Proxy(store, handler);
    producer(proxy);
    var newState = proxy[PROXY_STATE];
    if (newState.modified)
        return newState.copy;
    return newState.target;
}
var baseState = [
    {
        todo: 'Learn typescript',
        done: true
    },
    {
        todo: 'Try immer',
        done: false
    },
];
var nextState = produce(baseState, function (draftState) {
    draftState.push({ todo: 'Tweet about it', done: false });
    draftState[1].done = true;
});
console.log(baseState, nextState);
