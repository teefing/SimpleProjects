/**
 * 
 * @param {*} prototype 传入的prototype将作为新对象的__proto__
 * @param {*} propertyDescriptors 自定义的属性描述符
 */
function create (prototype, propertyDescriptors) {
  const F = function () {};
  F.prototype = prototype;
  if (descriptors) {
    Object.defineProperties(F, propertyDescriptors)
  }
  return new F();
}


console.log(Object.create(RegExp.prototype));
console.log(create(RegExp.prototype));
