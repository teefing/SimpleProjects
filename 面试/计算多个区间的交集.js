const getIntersection = (...arr) => {
  let maxLeft = -Infinity;
  let minRight = Infinity;
  arr.forEach(([a, b]) => {
    let right = Math.max(a, b);
    let left = Math.min(a, b);
    maxLeft = Math.max(maxLeft, left);
    minRight = Math.min(minRight, right);
  });
  if (maxLeft > minRight) return null;
  return [maxLeft, minRight];
};

console.log(getIntersection([5, 2], [4, 9], [3, 6]));
console.log(getIntersection([1, 7], [8, 9]));
