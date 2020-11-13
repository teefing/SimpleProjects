const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

const test = asyncToGenerator(function* testG() {
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield Promise.reject(222);
  console.log("data2: ", data2);
  return "success";
});

// 这样的一个函数 应该再1秒后打印data 再过一秒打印data2 最后打印success
test().then((res) => {
  console.log(res);
});

function asyncToGenerator(generatorFunc) {
  return function() {
    const gen = generatorFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step (operate, val) {
        let genRes
        try {
          genRes = gen[operate](val);
        } catch (err) {
          return reject(err);
        }
        const { value, done } = genRes;
        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value).then((val) => step('next', val), err => step('throw', err));
        }
      }
      step('next');
    });
  };
}
