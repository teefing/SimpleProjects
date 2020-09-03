'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = undefined;

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _rc = require('./rc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadLocal = async (templateName, projectName) => {
  const config = await (0, _rc.getAll)();
  const api = `${config.registry}/${templateName}`;

  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo2.default)(api, projectName, err => {
      if (err) {
        console.log('err: ', err);
        reject(err);
      }
      resolve();
    });
  });
};

exports.downloadLocal = downloadLocal;