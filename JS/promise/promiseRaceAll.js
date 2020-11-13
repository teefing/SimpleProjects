function PromiseAll(promises = []) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) throw new Error('xxx');
    const len = promises.length;
    let resolvedCount = 0;
    const res = [];
    for (let i = 0; i < len; i += 1) {
      promises[i].then((data) => {
        res[i] = data;
        resolvedCount += 1;
        if (resolvedCount === len) resolve(res);
      }, reject);
    }
  });
}

function PromiseRace(promises = []) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) throw new Error('xxx');
    const len = promises.length;
    for (let i = 0; i < len; i++) {
      promises[i].then(resolve, reject);
    }
  });
}
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1');
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2');
  }, 2000);
});

PromiseRace([p1, p2]).then((res) => {
  console.log(res);
});
