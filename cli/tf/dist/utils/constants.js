'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULTS = exports.RC = exports.VERSION = undefined;

var _package = require('../../package.json');

const VERSION = exports.VERSION = _package.version;

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

const RC = exports.RC = `${HOME}/.tfsrc`;

const DEFAULTS = exports.DEFAULTS = {
  registry: 'fantasticfbaby'
};