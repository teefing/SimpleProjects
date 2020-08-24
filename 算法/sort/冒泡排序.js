const { swap } = require('./utils');

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) swap(j, j + 1, arr);
    }
  }
  return arr;
};

console.log(bubbleSort([3, 1, 6, 4, 7, 9, 0]));
