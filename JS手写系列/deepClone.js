function isReferenceType(o) {
  return o instanceof Object;
}

/**
 * 1. 判断是否引用类型，如果不是直接返回
 * 2. 针对正则、函数和Date做异常处理
 * 3. 获取到原对象的constructor，创建新对象
 * 4. 引入WeakMap解决循环引用问题
 * 5. 遍历原对象中的数据，将数据通过深拷贝的方式赋值给新对象
 */
function deepClone(obj, hash = new WeakMap()) {
  if (!isReferenceType(obj)) {
    return obj;
  }

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Function) return obj.bind({});

  const newObj = new obj.constructor();

  // 解决循环引用问题
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  hash.set(obj, newObj);

  Reflect.ownKeys(obj).forEach((key) => {
    newObj[key] = deepClone(obj[key], hash);
  });

  return newObj;
}

function add(a, b, c) {
  return a + b + c;
}

const obj1 = {
  a: 1,
  b: 2,
  date: new Date(),
  arr: [1, 2, 3],
  func: add.bind({}, 1),
};
obj1.obj = obj1;

console.log(deepClone(obj1).func(2, 3));
