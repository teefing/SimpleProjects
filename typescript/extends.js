"use strict";
// extends 用于类型约束
function getValue(obj, key) {
    return obj[key];
}
var obj = { a: 1 };
var a = getValue(obj, 'a');
