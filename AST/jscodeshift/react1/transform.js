const fs = require('fs')
const path = require('path')
const j = require('jscodeshift')
const transformer = require('../transformer/transformer')

const file = fs.readFileSync(path.join(__dirname, './index.jsx'))
const result = transformer({source: file.toString('utf-8')}, {jscodeshift: j})

fs.writeFileSync('./index-output.js', result)