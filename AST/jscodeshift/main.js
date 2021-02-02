const path = require('path')
const execa = require('execa');

const astFilePath = [
  './react/index.jsx',
  './react1/index.jsx'
]

astFilePath.forEach(async (transferPath, i) => {
  const outdrr = await execa.sync('npx', ['jscodeshift', '-t', './transformer/transformer.js', transferPath])
  console.log('outdrr: ', outdrr);
  if(outdrr.failed) {
    console.log(`编译出错`);
  }
})

