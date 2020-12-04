const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const subArr = arr.slice(1);

  return [
    ...quickSort(subArr.filter((v) => v < pivot)),
    pivot,
    ...quickSort(subArr.filter((v) => v > pivot)),
  ];
};

// console.log(quickSort([3, 1, 6, 4, 7, 9, 0]));

const { swap, defaultSortFunc } = require("./utils");
const QuickSort = (arr, compareFn = defaultSortFunc) => {
  let len = arr.length;
  let left = 0;
  let right = len - 1;

  const sort = (left, right, arr) => {
    if (left >= right) return;
    let pivot = left;
    let i = left,
      j = right;
    while (i < j) {
      // 从右往左找到比arr[pivot]小的数
      while (i < j && compareFn(arr[j], arr[pivot]) >= 0) j--;
      // 从左往右找到比arr[pivot]大的数
      while (i < j && compareFn(arr[i], arr[pivot]) <= 0) i++;
      swap(i, j, arr);
    }

    swap(pivot, i, arr);
    pivot = i;
    sort(left, pivot - 1, arr);
    sort(pivot + 1, right, arr);
  };

  sort(left, right, arr);
  return arr;
};
module.exports = QuickSort;
