const events = require('events')
const util = require('util')
const fs = require('fs')

function Watcher (watchDir, processedDir) {
  this.watchDir = watchDir
  this.processedDir = processedDir
}
util.inherits(Watcher, events.EventEmitter)

Watcher.prototype.watch = function () {
  const watcher = this
  fs.readdir(this.watchDir, function (err, files) {
    if (err) throw err
    for (let index in files) {
      watcher.emit('process', files[index])
    }
  })
}

Watcher.prototype.start = function () {
  const watcher = this
  fs.watch(watchDir, function () {
    watcher.watch()
  })

  watcher.on('process', function  process (file) {
    const watchFile = this.watchDir + '/' + file
    const processedFile = this.processedDir + '/' + file.toLowerCase()
  
    fs.rename(watchFile, processedFile, function (err) {
      if(err) throw err
    })
  })
}

const watchDir = './watch'
const processedDir = './done'
const watcher = new Watcher(watchDir, processedDir)
watcher.start()