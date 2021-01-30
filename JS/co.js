function ajax(url) {
  return Promise.resolve(url);
}

function* main() {
  let res1 = yield ajax("https://www.baidu.com");
  console.log(res1);

  let res2 = yield ajax("https://www.google.com");
  console.log(res2);

  let res3 = yield ajax("https://www.taobao.com");
  console.log(res3);
}

function co(generator) {
  const g = generator();
  function handleResult(result) {
    if (result.done) return;
    result.value.then(
      (res) => {
        handleResult(g.next(res));
      },
      (e) => {
        g.throw(e);
      }
    );
  }
  handleResult(g.next());
}

co(main);
