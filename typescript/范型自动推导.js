"use strict";
var myEvent = {
    target: document.querySelector('#button'),
    type: 'click'
};
function triggerEvent(event) {
}
triggerEvent({
    target: document.querySelector('#button'),
    type: 'click'
});
