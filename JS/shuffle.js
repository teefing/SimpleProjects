function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let changeIndex = Math.floor(Math.random() * i);
    [arr[i], arr[changeIndex]] = [arr[changeIndex], arr[i]];
  }
  return arr;
}

let arr2 = [1, 2, 3, 4, 5, 6];
console.log(shuffle(arr2));