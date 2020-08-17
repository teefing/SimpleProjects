function isReferenceType(o) {
  return o instanceof Object;
}

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
