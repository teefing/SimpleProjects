function transformDFS(data, depth = Infinity) {
  if (!depth || typeof data !== 'object') return;
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const originKey = key;
    key = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    data[key] = data[originKey];
    delete data[originKey];
    transformDFS(data[key], depth - 1);
  });
}

function transformBFS(data, targetDepth=Infinity) {
  const queue = [data];
  let depth = 0;
  while (queue.length) {
    const len = queue.length;
    if(depth === targetDepth) return
    for (let i = 0; i < len; i++) {
      const cur = queue.shift();
      const keys = Object.keys(cur);
      typeof cur === 'object' && keys.forEach((key) => {
        const originKey = key;
        key = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        cur[key] = cur[originKey];
        delete cur[originKey];
        queue.push(cur[key]);
      });
    }
    depth++
  }
}

const obj = {
  abcA: "abc",
  innerInner: {
    aA: "aaa",
    bB: "bbb",
  },
};
transformDFS(obj);
console.log(obj);
