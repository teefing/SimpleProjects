#!/usr/bin/env node

const fse = require('fs-extra')
const babelParser = require('@babel/parser')
const babelTraverse = require('@babel/traverse').default
const babelGenerate = require('@babel/generator').default
// const prettier = require('prettier')
const eslint = require('eslint')
const t = require('@babel/types')
const chalk = require('chalk')
const path = require('path')

process.env.NODE_ENV = 'production'
const warn = (...msg) => console.warn(chalk.red(...msg))
const log = (...msg) => console.log(chalk.blue(...msg))
const logTitle = (title) =>
  console.log('========================', chalk.blueBright.bold(title), '========================', '\n')
const basename = process.cwd()

function bootstrap () {
  const configPath = basename + '/.kjy-migration.js'
  const isConfigFile = fse.existsSync(process.cwd() + '/.kjy-migration.js')
  if (!isConfigFile) {
    warn(chalk.red('不存在配置文件，忽略'))
    return
  }

  const config = require(configPath)
  config.forEach(resolveSingleConfig)
}

function resolveSingleConfig (config) {
  logTitle(config.title)
  const { include, file } = config
  const jsPathArray = include.reduce((acc, subPath) => {
    const link = basename + subPath
    const pathArray = resolveFileReleation(link, file)
    return acc.concat(pathArray)
  }, [])
  log('统计include共包含:', jsPathArray.length, '个文件')
  transformCode(jsPathArray, config)
}

function transformCode (jsPathArray, config) {
  warn('开始解析代码，请勿终止，以免发生意外')
  const filtered = []
  jsPathArray.forEach((jsFile) => {
    const file = fse.readFileSync(jsFile, { encoding: 'utf-8' })
    const ast = babelParser.parse(file, {
      sourceType: 'module',
      plugins: [ 'jsx', 'decorators-legacy', 'classProperties', 'dynamicImport' ]
    })
    const result = traverseAST(ast, file, config, jsFile)
    if (result === null) {
      filtered.push(jsFile)
      return
    }
    fse.writeFileSync(jsFile, result.code, { encoding: 'utf-8' })
    log('完成', jsFile, '有', result.count, '处修改')
  })
  // const eslintConfig = require(basename + '/.eslintrc.js')
  log('\n开始格式化')
  const formatFileArray = jsPathArray.filter((file) => !filtered.includes(file))
  const cli = new eslint.CLIEngine({
    useEslintrc: true,
    fix: true
  })
  log('格式化', formatFileArray.length, '个文件')
  const reports = cli.executeOnFiles(formatFileArray)
  eslint.CLIEngine.outputFixes(reports)
  log('格式化完成\n')
}

function traverseAST (ast, jsFile, config, filePath) {
  const { replacement, file, replaceToken, token, importToken } = config

  let count = 0

  babelTraverse(ast, {
    Program (pth) {
      if (importToken) {
        pth.traverse({
          ImportDeclaration (idp) {
            if (idp.node.source.value === importToken.source) {
              count++
              const originImportSpecifier = idp.node.specifiers.filter(
                (isp) => !importToken.identifer.includes(isp.local.name)
              )
              if (originImportSpecifier.length) idp.replaceWith(t.importDeclaration(originImportSpecifier))
              else idp.remove()
              idp.insertAfter(
                t.importDeclaration(
                  importToken.identifer.map((id) => t.importSpecifier(t.identifier(id), t.identifier(id)))
                )
              )
            }
          }
        })
      }

      if (replacement) {
        let isUsed = false
        const depency = []
        pth.traverse({
          MemberExpression (p) {
            if (p.node.object.name === replaceToken && replacement[p.node.property.name]) {
              isUsed = true
              count += 1
              if (token) {
                p.replaceWith(t.memberExpression(t.identifier(token), t.identifier(replacement[p.node.property.name])))
              } else {
                const dep = t.identifier(replacement[p.node.property.name])
                depency.push(t.identifier(dep))
                p.replaceWith(t.identifier(dep))
              }
            }
          }
        })
        // 判断是否存在 目标token, 不存在自动生成一个import
        if (!pth.scope.hasBinding(token) && isUsed) {
          count += 1
          const lastAbsoluteImport = pth
            .get('body')
            .filter((fp) => t.isImportDeclaration(fp) && !fp.node.source.value.startsWith('.'))
            .pop()
          const importDefaultExpress = t.importDeclaration(
            [ t.importDefaultSpecifier(t.identifier(token)) ],
            t.stringLiteral(file)
          )
          const importExportExpress = t.importDeclaration(
            depency.map((dep) => t.importSpecifier(t.identifier(dep), t.identifier(dep))),
            t.stringLiteral(file)
          )
          if (lastAbsoluteImport) {
            lastAbsoluteImport.insertBefore(token ? importDefaultExpress : importExportExpress)
          } else {
            pth.node.body.unshift(token ? importDefaultExpress : importExportExpress)
          }
        }
        if (!isUsed) return null
      }
    }
  })

  const { code } = babelGenerate(ast, { jsescOption: { quotes: 'single' }, filename: path.basename(filePath) }, jsFile)
  return { code, count }
}

function resolveFileReleation (link, fileName) {
  let array = []
  const stat = fse.statSync(link)
  if (stat.isFile() && !link.includes(fileName) && isJsFile(link)) {
    array.push(link)
  }

  if (stat.isDirectory()) {
    const dir = fse.readdirSync(link)
    array = array.concat(
      dir.reduce((acc, name) => {
        return acc.concat(resolveFileReleation(`${link}/${name}`, fileName))
      }, [])
    )
  }
  return array
}

function isJsFile (link) {
  return path.extname(link) === '.js'
}

bootstrap()
