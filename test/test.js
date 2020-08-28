const scope = 'global scope';
function checkscope() {
  const scope = 'local scope';
  var f = function() {
    console.log(this);
    return scope;
  };
  return f;
}
checkscope()();
