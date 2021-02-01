function fullRow(arr) {
  let result = [];
  function backtrack(current) {
    if (current.length === arr.length) {
      result.push(current.slice());
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const choice = arr[i];
      if (current.includes(choice)) {
        continue;
      }
      current.push(choice);
      backtrack(current);
      current.pop();
    }
  }
  backtrack([]);
  return result;
}

console.log(fullRow([1, 2, 3]));
