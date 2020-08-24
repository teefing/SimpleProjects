function intToRoman(num) {
  const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const chars = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let res = '';
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > num) continue;
    while (nums[i] <= num) {
      num -= nums[i];
      res += chars[i];
    }
  }
  return res;
}

function romanToInt(s) {
  const m = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    IV: -1,
    IX: -1,
    XL: -10,
    XC: -10,
    CD: -100,
    CM: -100,
  };
  let res = 0;
  for (let i = 0; i < s.length - 1; i++) {
    res += m[s[i] + s[i + 1]] || m[s[i]];
  }
  res += m[s[s.length - 1]];
  return res;
}
