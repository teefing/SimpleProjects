"use strict";
var API = /** @class */ (function () {
    function API(options) {
        this.options = options;
    }
    return API;
}());
var badOptions = {
    baseURL: 'https://www.baidu.com',
    badTier: 'prod'
};
new API(badOptions);
