"use strict";
var x = 1;
x = '1';
console.log(x.length);
function getLength(something) {
    // return something.length 报错
    return something.length;
}
function getLength2(sth) {
    if (typeof sth === 'string') {
        return sth.length;
    }
    if (typeof sth === 'number') {
        return 0;
    }
}
