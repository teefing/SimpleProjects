var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** Creator类声明了一个factoryMethod方法，这个方法应该返回一个Product类型的对象。Creator类的子类通常实现了这个方法 */
var Creator = /** @class */ (function () {
    function Creator() {
    }
    /**
     * 同时也要注意，不管他的名称，Creator类的主要职责并不是创建产品，通常，它包含了一些核心的业务逻辑，这些业务逻辑依赖于由工厂方法返回的Product对象，
     * 子类可以通过重写工厂方法和返回一个不同类型的product来间接的改变业务逻辑
     */
    Creator.prototype.someOperation = function () {
        // 调用工厂方法来创建一个Product对象
        var product = this.factoryMethod();
        // 使用product
        return "Creator: The same creator's code has just worked with " + product.operation();
    };
    return Creator;
}());
var ConcreteCreator1 = /** @class */ (function (_super) {
    __extends(ConcreteCreator1, _super);
    function ConcreteCreator1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteCreator1.prototype.factoryMethod = function () {
        return new ConcreteProduct1();
    };
    return ConcreteCreator1;
}(Creator));
var ConcreteCreator2 = /** @class */ (function (_super) {
    __extends(ConcreteCreator2, _super);
    function ConcreteCreator2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteCreator2.prototype.factoryMethod = function () {
        return new ConcreteProduct2();
    };
    return ConcreteCreator2;
}(Creator));
var ConcreteProduct1 = /** @class */ (function () {
    function ConcreteProduct1() {
    }
    ConcreteProduct1.prototype.operation = function () {
        return '{Result of the ConcreteProduct1}';
    };
    return ConcreteProduct1;
}());
var ConcreteProduct2 = /** @class */ (function () {
    function ConcreteProduct2() {
    }
    ConcreteProduct2.prototype.operation = function () {
        return '{Result of the ConcreteProduct2}';
    };
    return ConcreteProduct2;
}());
function clientCode(creator) {
    console.log('Client: 我不关心creator类的具体实现，但是它生效了');
    console.log(creator.someOperation());
}
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');
console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
