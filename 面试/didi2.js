
function transform(data, depth) {
  if (!depth || !data) return;
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const originKey = key;
    key += 'transformed';
    data[key] = data[originKey];
    delete data[originKey];
    transform(data[key], depth - 1);
  });
}


const obj = {
  Abc: 'abc',
  Inner: {
    Aaa: 'aaa',
    Bbb: 'bbb',
  },
};
transform(obj, 2);
console.log(obj);
