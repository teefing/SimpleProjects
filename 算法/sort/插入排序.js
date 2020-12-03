const { swap, defaultSortFunc } = require("./utils");
// 类似于打扑克时的码牌，在拿到第i个数时使牌组继续保持有序
// 构建有序序列，对于未排序的序列在已排序序列中从后向前扫描，找到相应的位置并插入(这里的插入是通过交换的方式慢慢换上去的)
const InsertSort = (arr, compareFn = defaultSortFunc) => {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (compareFn(arr[j - 1], arr[j]) > 0) {
        swap(j - 1, j, arr);
      }
    }
  }
  return arr;
};
module.exports = InsertSort;
