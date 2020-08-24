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

console.log(quickSort([3, 1, 6, 4, 7, 9, 0]));
