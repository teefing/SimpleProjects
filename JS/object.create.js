function create(prototype) {
  const F = function () {};
  F.prototype = prototype;
  return new F();
}


console.log(Object.create(RegExp.prototype));
console.log(create(RegExp.prototype));
