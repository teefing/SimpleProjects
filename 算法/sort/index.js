const { defaultSortFunc } = require("./utils");
const BubbleSort = require("./冒泡排序");
const InsertSort = require("./插入排序");
const SelectSort = require("./选择排序");

function main(sort, judgeFunc = defaultSortFunc) {
  const arr = [2, 4, 1, 2, 6, 3];
  console.log(sort(arr, judgeFunc));
}

main(InsertSort, (a, b) => a - b);
