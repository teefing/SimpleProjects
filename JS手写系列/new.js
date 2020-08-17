function NEW(className, ...args) {
  const res = {};
  res.__proto__ = className.prototype;
  className.call(res, ...args);
  return res;
}

function classA(age) {
  this.name = 'start';
  this.age = age;
}
classA.prototype.sayName = function () {
  console.log(this.name);
};
classA.prototype.sayAge = function () {
  console.log(this.age);
};

const a = NEW(classA, 19);
a.sayName();
a.sayAge();
a.name = 'a';
a.sayName();
