// 有一个嵌套层次很深的对象，key 都是 a_b 形式 ，需要改成 ab 的形式，注意不能用递归。
const a = {
  a_y: {
    a_z: {
      y_x: 6,
    },
    b_c: 1
  },
};

// dfs 递归
function formatKeyDFS(item) {
  if (!item) return;
  for (let key in item) {
    console.log("key: ", key);
    if (typeof item[key] === "object" && item[key] !== null) {
      formatKeyDFS(item[key]);
    }
    let newKey = key.replace(/_/, "");
    item[newKey] = item[key];
    delete item[key];
  }
  return item;
}

// dfs 非递归
function formatKeyDFS2(obj) {
  let stack = [obj];
  while (stack.length) {
    let item = stack.pop();
    // 倒序遍历子节点
    let keys = Object.keys(item).reverse();
    for (let key of keys) {
      if (typeof item[key] === "object" && item[key] !== null) {
        stack.push(item[key]);
      }
      let newKey = key.replace(/_/, "");
      item[newKey] = item[key];
      delete item[key];
    }
  }
  return obj;
}

// bfs
function formatKeyBFS(obj) {
  let queue = [obj];
  while (queue.length) {
    let item = queue.shift();
    for (let key in item) {
      console.log("key: ", key);
      if (typeof item[key] === "object" && item[key] !== null) {
        queue.push(item[key]);
      }

      let newKey = key.replace(/_/, "");
      item[newKey] = item[key];
      delete item[key];
    }
  }
  return obj;
}

console.log(formatKeyDFS2(a));
