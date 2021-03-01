const {} = require('gulp')

const browserSync = require('browser-sync')
const bs = browserSync.create()

const serve = () => {
  bs.init({
    port: 8083,
    server: {
      baseDir: '.'
    }
  })
}

module.exports = {
  serve
}