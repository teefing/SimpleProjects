'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rc = require('./utils/rc');

const config = async (action, key, value) => {
  switch (action) {
    case 'get':
      if (key) {
        const result = await (0, _rc.get)(key);
        console.log(result);
      } else {
        const obj = await (0, _rc.getAll)();
        Object.keys(obj).forEach(key => {
          console.log(`${key}=${obj[key]}`);
        });
      }
      break;
    case 'set':
      (0, _rc.set)(key, value);
      break;
    case 'remove':
      (0, _rc.remove)(key);
      break;
    default:
      break;
  }
};

exports.default = config;