let prizes = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3
  }
];
function Random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandoms() {
  var a = Random(0, prizes.length - 1);
  var b = Random(0, prizes.length - 1);
  var c = Random(0, prizes.length - 1);
  var prizeA = prizes[a].id;
  var prizeB = prizes[b].id;
  var prizeC = prizes[c].id;
  if (prizeA === prizeB || prizeA === prizeC || prizeB === prizeC) {
    return getRandoms();
  } else {
    return [prizes[a].id, prizes[b].id, prizes[c].id];
  }
}

let start = Date.now()
console.log(getRandoms());
let end = Date.now()
console.log(`${(end-start)/1000}s`);