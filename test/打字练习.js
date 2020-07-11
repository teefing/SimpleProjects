const process = require("process");

const list_number_only = "1234567890";
const list_full_line = "`1234567890-=";
const list_full_double_line = "`1234567890-=~!@#$%^&*()_+";
const spec_list = "456789";
const list = list_number_only;
const length = 20;

function generateRandom() {
  let str = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    str += list[randomIndex];
  }
  return str;
}

let randomStr = generateRandom();
console.log(randomStr);

process.stdin.on("data", (buffer) => {
  let val = buffer.toString("utf-8");
  val = val.substring(0, val.length - 1);
  if (val === randomStr) {
    console.log('\x1B[36m%s\x1B[0m', 'checked!!')
  } else {
    console.log('\x1B[31m%s\x1B[0m', 'error!!')
  }
  console.log('')
  randomStr = generateRandom()
  console.log(randomStr);
});
/**
 * 1:
 * 2:
 * 3:
 * 4: 1111111111
 * 5: 11111
 * 6: 11111
 * 7: 11111
 * 8: 1111111111111
 * 9: 111
 * 0: 1
 */

//
