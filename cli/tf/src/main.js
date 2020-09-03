import program from 'commander';
import chalk from 'chalk';
import apply from './index';
import { VERSION } from './utils/constants';

// 主要的配置文件
const actionMap = {
  init: {
    description: 'generate a new project from a template',
    usages: [
      'tf init templateName projectName',
    ],
    alias: 'i',
  },
  config: {
    alias: 'cfg',
    description: 'config .tfrc',
    usages: [
      'tf config set <k> <v>',
      'tf config get <k>',
      'tf config remove <k>',
    ],
  },
};

// 将配置传入commander
Object.keys(actionMap).forEach((action) => {
  program.command(action)
    .alias(actionMap[action].alias)
    .description(actionMap[action].description)
    .action(() => {
      switch (action) {
        case 'init':
        case 'config':
          apply(action, ...process.argv.slice(3));
          break;
        default:
          console.log(actionMap[action].description);
          break;
      }
    });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach((usage) => {
      console.log(` - ${usage}`);
    });
  });
  console.log('\r');
}

program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

function makeGreen(txt) {
  return chalk.green(txt);
}
if (!process.argv.slice(2).length) {
  program.outputHelp(makeGreen);
}
