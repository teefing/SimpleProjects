const merge = (leftArr, rightArr) => {
  let res = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      res.push(leftArr.shift());
    } else {
      res.push(rightArr.shift());
    }
  }

  res = res.concat(leftArr, rightArr);
  return res;
};

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length - 1);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
};

console.log(mergeSort([3, 1, 6, 4, 7, 9, 0]));
