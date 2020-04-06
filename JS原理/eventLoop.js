const isWindow = typeof window !== 'undefined'
const isNode = !isWindow
var color = 'white'

console.log(1);

new Promise((resolve, reject) => {
  console.log(2);
  resolve();
}).then(() => {
  console.log(3);
  color = 'red'
  
});

isNode && process.nextTick(() => {
    console.log(6);
  });

function getData(val) {
  return new Promise((resolve, reject) => {
    console.log(val);
    resolve()
  });
}

isNode && setImmediate  &&
  setImmediate(async () => {
    console.log(7);
    await getData(8);
  });

setTimeout(async () => {
  console.log(5);
  await getData(4);
  setTimeout(() => {
    console.log(11);
  }, 100);
}, 0);

isWindow && requestAnimationFrame(() => {
  console.log(9);
  requestAnimationFrame(() => {
    console.log(10);
  })
});

isWindow && (document.body.style.background = color)