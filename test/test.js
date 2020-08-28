const scope = 'global scope';
function checkscope() {
  const scope = 'local scope';
  const f = function () {
    console.log(this);
    return scope;
  };
  return f;
}
checkscope()();
function isReferenceType(o) {
  return o instanceof Object;
}
function deepClone(obj, hash = new WeakMap()) {
  if (!isReferenceType(obj)) {
    return obj;
  }

  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Function) return obj.bind({});

  const newObj = new obj.constructor();

  if (hash.has(obj)) {
    return hash.get(obj);
  }
  hash.set(obj, newObj);

  Reflect.ownKeys(obj).forEach((key) => {
    newObj[key] = deepClone(obj[key], hash);
  });

  return newObj;
}
