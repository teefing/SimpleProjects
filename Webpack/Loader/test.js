const transformer = require('./asyncErrorLoader2')
const code = `
async function func() {
  await asyncFunc()
  await asyncFunc()
}
`

const transformedCode = transformer(code)
console.log('transformedCode: ', transformedCode);
