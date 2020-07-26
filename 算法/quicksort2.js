function swap (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function sort (arr, left, right) {
  if(left >= right) return
  let i = left, j = right
  while (i < j) {
    while (arr[j] >= arr[left] && i < j) {
      j--
    }
    while (arr[i] <= arr[left] && i < j) {
      i++
    }
    if(i < j) swap(arr, i, j)
  }
  swap(arr, left, i)

  sort(arr, left, i-1)
  sort(arr, i+1, right)
}

function quicksort (arr) {
  if(!Array.isArray(arr)) return []
  if (arr.length < 2) {
    return arr;
  }
  sort(arr, 0, arr.length - 1)
  return arr
}

console.log(quicksort([6, 1, 2, 7, 9, 3, 4, 5, 1, 10, 8]));