const { defaultSortFunc } = require("./utils");

// 稳定
const merge = (leftArr, rightArr, compareFn) => {
  let res = [];
  while (leftArr.length && rightArr.length) {
    if (compareFn(leftArr[0], rightArr[0]) > 0) {
      res.push(rightArr.shift());
    } else {
      res.push(leftArr.shift());
    }
  }
  return res.concat(leftArr, rightArr);
};

// 分治思想，递归将排序好的子序列归并
const MergeSort = (arr, compareFn = defaultSortFunc) => {
  let len = arr.length;
  if (len <= 1) return arr;
  const mid = Math.floor(arr.length / 2);

  return merge(
    MergeSort(arr.slice(0, mid), compareFn),
    MergeSort(arr.slice(mid), compareFn),
    compareFn
  );
};
module.exports = MergeSort;
