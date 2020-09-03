'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _util = require('util');

var _get = require('./utils/get');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exists = (0, _util.promisify)(_fs2.default.exists);

const init = (templateName, projectName) => {
  const projectExists = _fs2.default.existsSync(projectName);
  if (!projectExists) {
    _inquirer2.default.prompt([{ name: 'description', message: 'Please enter the project description' }, { name: 'author', message: 'Please enter the author name' }]).then(async answer => {
      const loading = (0, _ora2.default)('downloading template ...');
      loading.start();
      (0, _get.downloadLocal)(templateName, projectName).then(async () => {
        loading.succeed();
        const fileName = `${projectName}/package.json`;
        const fileExists = await exists(fileName);
        if (fileExists) {
          const data = _fs2.default.readFileSync(fileName).toString();
          const json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description;
          _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
          console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
        }
      }, () => {
        loading.fail();
      });
    });
  } else {
    // 项目已经存在
    console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
  }
};

exports.default = init;