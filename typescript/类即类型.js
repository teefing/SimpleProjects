"use strict";
var StringDataBase = /** @class */ (function () {
    function StringDataBase() {
        this.state = {};
    }
    StringDataBase.prototype.get = function (key) {
        return key in this.state ? this.state[key] : null;
    };
    StringDataBase.prototype.set = function (key, value) {
        this.state[key] = value;
    };
    StringDataBase.from = function (state) {
        var db = new StringDataBase;
        for (var key in state) {
            db.set(key, state[key]);
        }
        return db;
    };
    return StringDataBase;
}());
var stringDataBase = new StringDataBase;
