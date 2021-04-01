const { swap, defaultSortFunc } = require("./utils");

// 每次找到最大数沉到底部
// 算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端
// 每次都比较相邻的一对数，如果a大于b则交换位置，这样每趟遍历一定能获得这趟遍历的数中最大的数并且被交换到了最后
// 稳定
function BubbleSort(arr, sortFunc = defaultSortFunc) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (sortFunc(arr[j], arr[j + 1]) > 0) {
        swap(j, j + 1, arr);
      }
    }
  }
  return arr;
}

module.exports = BubbleSort;
