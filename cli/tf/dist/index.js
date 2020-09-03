"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const apply = (action, ...args) => {
  // babel-env
  require(`./${action}`).default(...args);
};

exports.default = apply;