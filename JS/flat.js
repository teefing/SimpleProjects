function flat(arr, depth = Infinity) {
  if (depth === 0) return arr;
  return arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur),
    []
  );
}

console.log(flat([1, 2, [3, 4, 5, [6, 7, 8]]], 1));

let arr = [1, [2, [3, 4], 5], 6];
let str = JSON.stringify(arr);
console.log(str.replace(/\[|\]/g, "").split(","));
console.log(JSON.parse("[" + str.replace(/\[|\]/g, "") + "]"));
