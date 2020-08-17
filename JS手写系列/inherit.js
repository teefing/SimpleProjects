// es3
function __extends (child, parent) {
  // 继承静态方法和属性
  child.__proto__ = parent
  // 常规继承
  function __ () {
    this.constructor = child
  }
  __.prototype = parent.prototype
  child.prototype = new __()
}

// es5
function Parent (val) {
  this.val = val
}
Parent.StaticFunc = function () {
  console.log('static');
}

Parent.prototype.getValue = function () {
  console.log(this.val);
}

// 常规继承
function Child (value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
// 继承静态属性方法
Child.__proto__ = Parent

// es6就用class继承，太过简单就不写了