const { swap, defaultSortFunc } = require("./utils");

// 先将整个数据序列分割成若干子序列分别进行直接插入排序，待整个序列中的记录基本有序时，再对全部数据进行依次直接插入排序
const ShellSort = (arr, compareFn = defaultSortFunc) => {
  let step = Math.floor(arr.length / 2);
  while (step > 0) {
    let start = 0;
    while (start < step) {
      for (let i = start; i < arr.length; i += step) {
        for (let j = i; j > start; j -= step) {
          if (compareFn(arr[j - step], arr[j]) > 0) {
            swap(j, j - step, arr);
          }
        }
      }
      start++;
    }

    step = Math.floor(step / 2);
  }

  return arr;
};
module.exports = ShellSort;
