#!/usr/bin/env node

// node cli 应用入口文件必须要有这样的文件头
// 如果是linux或者maxos还需要修改权限为755 chmod 755 cli.js


// 脚手架工作过程
// 1. 通过命令行交互的方式获取用户的问题
// 2. 根据用户的回答生成相应的文件

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
inquirer.prompt([{
  type: 'input',
  name: 'name',
  message: 'Project name?'
}]).then(answers => {
  // 根据用户的回答生成相应的文件
  console.log('answers: ', answers);
  // 模板目录
  const tmplDir = path.join(__dirname, 'templates')
  // 目标目录
  const destDir = process.cwd()
  // 将模板下的文件全部输出到目标目录
  fs.readdir(tmplDir, (err, files) => {
    if(err) throw err
    files.forEach((file) => {
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
        if(err) throw err
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})
