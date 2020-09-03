'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 主要的配置文件
const actionMap = {
  init: {
    description: 'generate a new project from a template',
    usages: ['tf init templateName projectName'],
    alias: 'i'
  },
  config: {
    alias: 'cfg',
    description: 'config .tfrc',
    usages: ['tf config set <k> <v>', 'tf config get <k>', 'tf config remove <k>']
  }
};

// 将配置传入commander
Object.keys(actionMap).forEach(action => {
  _commander2.default.command(action).alias(actionMap[action].alias).description(actionMap[action].description).action(() => {
    switch (action) {
      case 'init':
      case 'config':
        (0, _index2.default)(action, ...process.argv.slice(3));
        break;
      default:
        console.log(actionMap[action].description);
        break;
    }
  });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log(` - ${usage}`);
    });
  });
  console.log('\r');
}

_commander2.default.usage('<command> [options]');
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);
_commander2.default.version(_constants.VERSION, '-V --version').parse(process.argv);

function makeGreen(txt) {
  return _chalk2.default.green(txt);
}
if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp(makeGreen);
}