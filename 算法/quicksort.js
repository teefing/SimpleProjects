function quickSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`${arr} is not an array`);
  }
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr[0];
  const arr1 = arr.slice(1);
  return [
    ...quickSort(arr1.filter((v) => v <= pivot)),
    pivot,
    ...quickSort(arr1.filter((v) => v > pivot)),
  ];
}

console.log(quickSort([1, 3, 2, 7, 3, 4]));
