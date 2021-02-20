var ProgressBar = require('progress');
var bar = new ProgressBar(':current: :token1 :token2', { total: 3 })
bar.tick({
  'token1': "Hello",
  'token2': "World!\n"
})
bar.tick(2, {
  'token1': "Goodbye",
  'token2': "World!"
})
