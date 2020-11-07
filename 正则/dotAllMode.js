const reg = /./g;
const regDotAll = /./gs;
// flag为s时 .能匹配到/n /r
const str = `abc
aaa
`;
console.log(str.replace(reg, '')); // 三个空行
console.log(str.replace(regDotAll, '')); // 一个空行
