const pattern = /a(b?(c?))/g;
const str = 'abcdefabac';
let matches = pattern.exec(str);
console.log('matches: ', matches);

matches = pattern.exec(str);
console.log('matches: ', matches);

matches = pattern.exec(str);
console.log('matches: ', matches);
