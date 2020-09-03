const { swap } = require('./utils');
// 每次都选出后面元素中最小的元素，与当前的元素交换，确保每次外层遍历后，前几个数都是最后的结果
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
