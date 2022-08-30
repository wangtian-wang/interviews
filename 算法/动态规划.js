function fib(n) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  console.log(dp);
  return dp[n];
}
function fib2(n) {
  let pre1 = 1,
    pre2 = 0,
    temp;
  if (n === 0) return 0;
  if (n === 1) return 1;
  for (let i = 2; i <= n; i++) {
    temp = pre1;
    pre1 = pre1 + pre2;
    pre2 = temp;
  }
  return pre1;
}
console.log(fib2(8));
