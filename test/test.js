new Promise((resolve, reject) => {
  setTimeout(() => {
  }, 0);
  resolve();
})
  .then(() => {
    new Promise((resolve, reject) => {
      resolve();
    })
      .then(() => {
        setTimeout(() => {
          console.log("H");
        }, 0);
      })
      .then(() => {
        console.log("J");
      });
  })
  .then(() => {
  });

setTimeout(() => {
}, 0);

new Promise((resolve, reject) => {
  resolve();
}).then(() => {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      resolve();
    })
      .then(() => {
        setTimeout(() => {
          console.log("O");
        }, 0);
      })
      .then(() => {
        console.log("P");
      });
  }, 0);
});

