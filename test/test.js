function bfs(start, target) {
  const q = [start];
  const visit = new Set();
  let step = 0;
  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      let cur = q.shift();
      if (cur === target) {
        return step;
      }

      if (cur.left && visit.has(cur.left)) {
        q.push(cur.left);
        visit.add(cur.left);
      }
      if (cur.right && visit.has(cur.right)) {
        q.push(cur.right);
        visit.add(cur.right);
      }
    }
    step++;
  }
}
