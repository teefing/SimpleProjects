var SubjectConcrete = /** @class */ (function () {
    function SubjectConcrete() {
        this.observers = [];
        this.numbers = 0;
    }
    SubjectConcrete.prototype.subscribe = function (observer) {
        var isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('已经订阅了');
        }
        console.log('Subject: 新增订阅');
        this.observers.push(observer);
    };
    SubjectConcrete.prototype.unsubscribe = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        this.observers.slice(observerIndex, 1);
        console.log('Subject: 解除订阅');
    };
    SubjectConcrete.prototype.notify = function () {
        console.log('Subject: notifying observers');
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    SubjectConcrete.prototype.getRandom = function () {
        this.numbers = Math.random() * 10;
    };
    return SubjectConcrete;
}());
var ConcreteObserverA = /** @class */ (function () {
    function ConcreteObserverA() {
    }
    ConcreteObserverA.prototype.update = function (subject) {
        if (subject.numbers <= 7) {
            console.log("ObserverA update, get " + subject.numbers);
        }
    };
    return ConcreteObserverA;
}());
var ConcreteObserverB = /** @class */ (function () {
    function ConcreteObserverB() {
    }
    ConcreteObserverB.prototype.update = function (subject) {
        if (subject.numbers > 3) {
            console.log("ObserverB update, get " + subject.numbers);
        }
    };
    return ConcreteObserverB;
}());
var subject = new SubjectConcrete();
var observerA = new ConcreteObserverA();
var observerB = new ConcreteObserverB();
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.getRandom();
subject.notify();
