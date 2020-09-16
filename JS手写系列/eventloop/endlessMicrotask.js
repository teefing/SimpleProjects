console.log('script start');
let count = 0;
const st = () => {
  console.log('promise');
  count++;
  if (count === 10000) {
    console.log('promise end');
    return;
  }
  Promise.resolve().then(st);
};
Promise.resolve().then(st);

setTimeout(() => {
  console.log('settimeout');
  process.exit(1);
}, 0);
console.log('script end');

/**
script start
script end
promise
promise end
settimeout
可以看到在执行完了所有的promise后，settimeout才被执行，😱
 */
