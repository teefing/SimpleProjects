const a = 0;
if (true) {
  a = 1;
  function a() {}
  a = 21;
  console.log('里面', a);
}
console.log('外部', a);
