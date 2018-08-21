/**
 * @param {number[][]} grid
 * @return {number}
 */

// 状态转移方程 dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
var minPathSum = function (grid) {
  let dp = []
  for (var i = 0; i < grid.length; i++) {
    dp[i] = []
    for (var j = 0; j < grid[i].length; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j]
      } else if (i === 0) {
        dp[i][j] = dp[i][j - 1] + grid[i][j]
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j] + grid[i][j]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
      }
    }
  }
  return grid.length === 0 || grid[0].length === 0 ? 0 : dp[i - 1][j - 1]
}