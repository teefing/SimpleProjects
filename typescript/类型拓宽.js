"use strict";
function typeExpend() {
    var a = null;
    a = 3;
    a = 'b';
    return a;
}
var b = typeExpend();
function asConst阻止类型拓宽() {
    var a = { x: 3 };
    var b = { x: 3 };
    var c = 1;
    var d = 1;
}
