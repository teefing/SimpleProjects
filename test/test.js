Promise.resolve(1).then(res => {
  if (res === 1) {
    throw new Error('error')
  }
  console.log(11111);
}).catch(err => {
  console.log('in catch');
  // console.log(err);
})