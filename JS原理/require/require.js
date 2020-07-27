const vm = require('vm')
const path = require('path')
const fs = require('fs')

function customRequire (filePath) {
  const pathToFile = path.resolve(__dirname, filePath)
  const content = fs.readFileSync(pathToFile, 'utf-8')


  const wrapper = ["(function(require, module, exports) {", "})"]
  const wrappedContent = wrapper[0] +  content + wrapper[1]
  console.log('wrappedContent: ', wrappedContent);

  const script = new vm.Script(wrappedContent, {
    filename: 'index.js'
  })
  const module = {
    exports: {}
  }
  const func = script.runInThisContext()
  func(customRequire, module, module.exports)
  return module.exports
}

const { add } = customRequire('./module.js')
console.log(add(1,2));