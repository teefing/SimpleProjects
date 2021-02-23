/**
 *
 * @param {*} prototype 传入的prototype将作为新对象的__proto__
 * @param {*} propertyDescriptors 自定义的属性描述符
 */
function create(prototype, propertyDescriptors) {
  const F = function() {};
  F.prototype = prototype;
  let res = new F();
  if (propertyDescriptors) {
    Object.defineProperties(res, propertyDescriptors);
  }
  return res
}

/* Object.create 和 new的本质上都是创建一个新对象，将__proto__指向prototype
两者的区别是前者直接接收prototype， 而后者接收constructor，通过constructor.prototype来间接获得prototype
*/
function create1(prototype, propertyDescriptors) {
  let res = {};
  res.__proto__ = prototype
  if (propertyDescriptors) {
    Object.defineProperties(res, propertyDescriptors);
  }
  return res
}

let obj = {a: 11}
let copy = Object.create(obj, {mm: {value: 10, enumerable: true}})
console.log(copy);
console.log(obj)

let obj1 = {a: 11}
let copy1 = create(obj, {mm: {value: 10, enumerable: true}})
console.log(copy1);
console.log(obj1)

let obj2 = {a: 11}
let copy2 = create1(obj, {mm: {value: 10, enumerable: true}})
console.log(copy2);
console.log(obj2)