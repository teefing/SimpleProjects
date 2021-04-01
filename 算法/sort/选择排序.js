const { swap, defaultSortFunc } = require("./utils");

// 每次选择最小元素换到顶部
// 每次都选出后面元素中最小的元素，与当前的元素交换，确保每次外层遍历后，前几个数都是最后的结果
// 不稳定
function SelectSort(arr, sortFunc = defaultSortFunc) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let index = i;
    for (let j = i + 1; j < len; j++) {
      if (sortFunc(arr[index], arr[j]) > 0) {
        index = j;
      }
    }
    index !== i && swap(index, i, arr);
  }
  return arr;
}

module.exports = SelectSort;
