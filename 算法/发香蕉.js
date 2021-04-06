// -动物园有猴山，每天需要给猴子们发香蕉，猴子会排队依次取食 猴子们铺张浪费，会多拿食物，但最多不会拿超过自身食量的二倍且不会超过当前还存在的香蕉的一半，最后一个猴子除外（即最后一个猴子可以拿完剩余的所有香蕉）。 最少需要准备多少香蕉，能保证所有猴子都能吃饱？
// 1 16 4 3===34
// 1 4 8===18
function giveBanana(monkeys) {
  let len = monkeys.length
  let dp = new Array(monkeys.length).fill(0);
  dp[len - 1] = monkeys[len-1];
  // dp[i] [i, ...]只猴子需要准备香蕉数量

  for (let i = len - 2; i >= 0; i--) {
    if(dp[i+1] < monkeys[i]) {
      dp[i] = 2 * monkeys[i]
    } else {
      dp[i] = Math.min(dp[i+1] + 2 * monkeys[i], 2 * dp[i+1]) 
    }
  }
  return dp[0];
  
}
console.log(giveBanana([1,16,4,3]));