import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
import { promisify } from 'util';
import { downloadLocal } from './utils/get';

const exists = promisify(fs.exists);

const init = (templateName, projectName) => {
  const projectExists = fs.existsSync(projectName);
  if (!projectExists) {
    inquirer.prompt([
      { name: 'description', message: 'Please enter the project description' },
      { name: 'author', message: 'Please enter the author name' },
    ]).then(async (answer) => {
      const loading = ora('downloading template ...');
      loading.start();
      downloadLocal(templateName, projectName).then(async () => {
        loading.succeed();
        const fileName = `${projectName}/package.json`;
        const fileExists = await exists(fileName);
        if (fileExists) {
          const data = fs.readFileSync(fileName).toString();
          const json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description;
          fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
          console.log(symbol.success, chalk.green('Project initialization finished!'));
        }
      }, () => {
        loading.fail();
      });
    });
  } else {
    // 项目已经存在
    console.log(symbol.error, chalk.red('The project already exists'));
  }
};

export default init;
