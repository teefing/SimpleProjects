/**
 *
 * @param n int整型
 * @return int整型二维数组
 */
function generateMatrix(n) {
  // 方向矩阵
  const fx = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const arr = new Array(n).fill(0).map((_) => new Array(n).fill(0));
  let now = 1;
  let i = 0;
  let j = 0;
  // 当前选用的方向的index
  let dt = 0;
  // 边界
  const border = [
    [0, 0],
    [n - 1, n - 1],
  ];
  while (now <= n * n) {
    arr[i][j] = now;
    // 如果按照当前方向，得到的下一步的位置
    let ti = i + fx[dt][0];
    let tj = j + fx[dt][1];
    // calculate next position
    // 如果超出边界
    if (
      ti < border[0][0]
      || ti > border[1][0]
      || tj < border[0][1]
      || tj > border[1][1]
    ) {
      // 根据当前方向缩小边界
      if (dt === 0) {
        border[0][0]++;
      } else if (dt === 1) {
        border[1][1]--;
      } else if (dt === 2) {
        border[1][0]--;
      } else if (dt === 3) {
        border[0][1]++;
      }

      // 更改方向
      dt = (dt + 1) % 4;
      // 计算新的下一步位置
      ti = i + fx[dt][0];
      tj = j + fx[dt][1];
    }
    i = ti;
    j = tj;
    now++;
  }
  return arr;
}
module.exports = {
  generateMatrix,
};
