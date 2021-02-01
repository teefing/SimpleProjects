new Promise(function f1(resolve, reject) {
  console.log(1);
  resolve();
})
  .then(function f2() {
    console.log(2);
    new Promise(function f3(resolve, reject) {
      console.log(3);
      resolve();
    })
      .then(function f4() {
        console.log(4);
        new Promise(function f5(resolve, reject) {
          console.log(5);
          resolve();
        })
          .then(function f7() {
            console.log(7);
          })
          .then(function f9() {
            console.log(9);
          });
      })
      .then(function f8() {
        console.log(8);
      });
  })
  .then(function f6() {
    console.log(6);
  });