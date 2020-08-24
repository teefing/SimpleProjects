const { swap } = require('./utils');

const insertSort = (arr) => {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(j, j - 1, arr);
      }
    }
  }
  return arr;
};

console.log(insertSort([3, 1, 6, 4, 7, 9, 0]));
