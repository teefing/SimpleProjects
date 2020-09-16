const arr1 = [{ a: 1 }, { a: 2 }, { a: 1, b: 2 }];
const arr1r = arr1.map((item, index) => ({ ...item, index }));

const arr2 = [1, 2, 3, 4, 5];
const arr2r = [...arr2].reverse();

const arr3 = [
  { id: 1, name: 'n1' },
  { id: 2, name: 'n2', combineId: 3 },
  { id: 3, name: 'n3', combineId: 1 },
];

const idNameMap = arr3.reduce((mapObj, item) => {
  mapObj[item.id] = item.name;
  return mapObj;
}, {});
const arr3r = arr3.map((item) => ({
  ...item,
  combineName: idNameMap[item.combineId],
}));

const arr4 = {
  1: { name: 'n1', type: 't1' },
  2: { name: 'n2', type: 't2' },
  3: { name: 'n3', type: 't3' },
};

const arr4r = Object.entries(arr4).reduce((obj, [key, value]) => {
  obj[key] = value.name;
  return obj;
}, {});
