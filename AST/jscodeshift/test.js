app.say = function(test) {
  console.log(test);
}

app.get('/api/config/save', checkConfigHighRiskPermission, function() {
  console.log('cool')
});

app.say('123')