/**
 * 1. 实现一个函数，判断两个变量值是否相等
 *
 * 注意
 * - 数据类型不限于示例，尽可能考虑边界
 * - function 引用相等即可
 */
 const foo1 = {
  a: 1,
  b: "1",
  c: NaN,
  d: [
    {
      a: 1,
      b: 2,
    },
  ],
  f: {
    a: 1,
  },
  g: null,
};

const foo2 = {
  a: 1,
  b: "1",
  c: NaN,
  d: [
    {
      a: 1,
      b: 2,
    },
  ],
  f: {
    a: 1,
  },
  g: null,
};

function isEqual(target1, target2) {}
console.log(isEqual(foo1, foo2), "isEqual");

/**
 * 2. 实现 getValue 函数来获取path对应的值
 */
var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'

function getValue(target, valuePath, defaultValue) {
  
}

console.log(getValue(object, "a[0].b.c", 0)); // 输出3
console.log(getValue(array, "[0].a.b[0]", 12)); // 输出 1
console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出 12

