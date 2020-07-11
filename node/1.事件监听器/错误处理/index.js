const events = require('events')
const process = require('process')
const myEmitter = new events.EventEmitter()
// myEmitter.on('error', function (err) {
//   console.log(`Error ${err.message}`);
// })

myEmitter.emit('error', new Error('something is wrong'))

process.on('uncaughtException', function (err) {
  console.error(err.stack)
  process.exit(1)
})