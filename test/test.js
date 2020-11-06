
function transform(data, depth) {
  if (!depth || !data) return;
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const originKey = key;
    key = key.replace(/\B([A-Z])/g, '_$1').toLowerCase();
    data[key] = data[originKey];
    delete data[originKey];
    transform(data[key], depth - 1);
  });
}


const obj = {
  AbcAddd: 'abc',
  Inner: {
    Aaa: 'aaa',
    Bbb: 'bbb',
  },
};
transform(obj, 2);
console.log(obj);
