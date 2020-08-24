const { swap } = require('./utils');

const selectSort = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(minIndex, i, arr);
    }
  }
  return arr;
};

console.log(selectSort([3, 1, 6, 4, 7, 9, 0]));
