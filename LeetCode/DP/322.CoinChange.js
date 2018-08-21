/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// 金额从 0-amount, 递推出amount需要的最小数量
var coinChange = function (coins, amount) {
  let dp = []
  for (var i = 0; i < coins.length; i++) {
    dp[i] = []
    for (var j = 0; j <= amount; j++) {
      if (j === 0) {
        dp[i][j] = 0
      } else if (i === 0) {
        dp[i][j] = 1 + dp[i][j - coins[i]] || Infinity
      } else if (j < coins[i]) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.min(dp[i][j - coins[i]] + 1, dp[i - 1][j])
      }
    }
  }
  let result = dp[i - 1][j - 1]
  return result === Infinity ? -1 : result
}