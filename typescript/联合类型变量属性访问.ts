let x: number | string = 1;
x = '1';
console.log(x.length);
function getLength(something: string | number):number {
  // return something.length 报错
  return (something as string).length
}

function getLength2(sth: string | number):number {
  if (typeof sth === 'string') {
    return sth.length
  }
  if (typeof sth === 'number') {
    return 0
  }
}
