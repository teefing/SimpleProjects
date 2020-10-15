const inquirer = require('inquirer');
const chalk = require('chalk');
const symbol = require('log-symbols');
const ora = require('ora');
const { exec } = require('child_process');

const CHOICES = {
  startServer: '启动mongodb服务',
  stopServer: '停止mongodb服务',
};


function runCommand(command) {
  return new Promise((resolve, reject) => {
    const loading = ora('命令执行中，请稍等...\n');
    loading.start();
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(symbol.error, chalk.red(err));
        loading.fail(chalk.red('执行失败'));
        reject();
        return;
      }
      console.log(symbol.success, chalk.green(stdout));
      loading.succeed(chalk.green('执行成功'));
      resolve();
    });
  });
}

async function startServer() {
  await runCommand('brew services start mongodb-community@4.2');
}
async function stopServer() {
  await runCommand('brew services stop mongodb-community@4.2');
}

inquirer.prompt([{
  type: 'list',
  name: 'question',
  message: '想要进行什么操作\n',
  choices: [CHOICES.startServer, CHOICES.stopServer],
}]).then(async (answer) => {
  switch (answer.question) {
    case CHOICES.startServer:
      await startServer();
      break;
    case CHOICES.stopServer:
      await stopServer();
      break;
    default:
  }
});
