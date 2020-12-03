exports.swap = (i, j, arr) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

function defaultSortFunc(a, b) {
  return a - b;
}
exports.defaultSortFunc = defaultSortFunc;
