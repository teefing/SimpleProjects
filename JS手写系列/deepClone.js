function isReferenceType(o) {
  return o instanceof Object;
}

/**
 * 1. 判断是否引用类型，如果不是直接返回
 * 2. 针对正则和函数做异常处理
 * 3. 获取到原对象的constructor，创建新对象
 * 4. 遍历原对象中的数据，将数据通过深拷贝的方式赋值给新对象
 */
function deepClone(obj) {
  if (!isReferenceType(obj)) {
    return obj;
  }

  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Function) return obj.bind({});

  const newObj = new obj.constructor();
  Reflect.ownKeys(obj).forEach((key) => {
    newObj[key] = deepClone(obj[key]);
  });

  return newObj;
}
