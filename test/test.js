/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  let arr = s.split("");
  let char;
  let m = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  for (let i = 0; i < s.length; i++) {
    char = s[i];
    if (Object.keys(m).includes(char)) {
      if (m[char] !== stack.pop()) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};

console.log(isValid('({})'));