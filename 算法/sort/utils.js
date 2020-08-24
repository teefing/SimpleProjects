exports.swap = (i, j, arr) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
