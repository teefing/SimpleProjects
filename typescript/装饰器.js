"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function deprecate() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length > 1) {
        var target = args[0], name_1 = args[1], descriptor = args[2];
        var oldValue_1 = descriptor.value;
        descriptor.value = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            console.log(name_1 + " has been deprecated");
            return oldValue_1.call(this, rest);
        };
    }
    else {
        var customWarning_1 = args[0];
        return function (target, name, descriptor) {
            var oldValue = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log("" + customWarning_1);
                return oldValue.call(this, args);
            };
        };
    }
}
function testable(target) {
    target.isTestable = 'testable';
}
function onlyRead(target, name) {
    Object.defineProperty(target, name, {
        writable: false
    });
    return target[name];
}
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.getName1 = function () {
        return this.name;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    __decorate([
        onlyRead
    ], User.prototype, "name");
    __decorate([
        deprecate
    ], User.prototype, "getName1");
    __decorate([
        deprecate("已被废弃")
    ], User.prototype, "getName");
    User = __decorate([
        testable
    ], User);
    return User;
}());
var user = new User("Bob");
user.getName();
// user.getName1();
// console.log(User.isTestable)
// user.name = 'alice'
// console.log(user.name);
