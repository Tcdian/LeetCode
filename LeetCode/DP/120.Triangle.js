/**
 * @param {number[][]} triangle
 * @return {number}
 */

// 从下往上的dp解法
// 状态转移方程 dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j]
var minimumTotal = function (triangle) {
  let dp = []
  for (let i = triangle.length - 1; i >= 0; i--) {
    dp[i] = []
    for (let j = 0; j < triangle[i].length; j++) {
      if (i === triangle.length - 1) {
        dp[i][j] = triangle[i][j]
      } else {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j]
      }
    }
  }
  return dp[0][0]
}