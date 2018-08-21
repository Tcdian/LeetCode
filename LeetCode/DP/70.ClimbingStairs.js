/**
 * @param {number} n
 * @return {number}
 */

// 地推公式 dp[i] = dp[i - 1] + dp[i - 2]
var climbStairs = function (n) {
  let dp = []
  for (var i = 0; i <= n; i++) {
    if (i < 3) {
      dp[i] = i
    } else {
      dp[i] = dp[i - 1] + dp[i - 2]
    }
  }
  return dp[i - 1]
}