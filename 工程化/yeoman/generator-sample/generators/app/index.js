const Generator = require('yeoman-generator')
module.exports = class extends Generator {
  prompting () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }]).then(answers => {
      // 得到结果
      this.answers = answers
    })
  }
  writing () {
    // yeoman在自动生成文件文件阶段调用此方法
    // 这里尝试在项目中写入文件
    // this.fs.write(
    //   this.destinationPath('temp.txt'),
    //   Math.random().toString()
    // )


    // 使用模板
    // 模板路径
    const tmpl = this.templatePath('foo.txt')
    // 输出路径
    const output = this.destinationPath('foo.txt')
    // 模板数据上下文
    const context = this.answers
    this.fs.copyTpl(tmpl, output, context)
  }
}