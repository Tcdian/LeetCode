/**
 * @param {number[][]} dungeon
 * @return {number}
 */

// dp记录走到终点时, 该处至少需要消耗的血量
var calculateMinimumHP = function (dungeon) {
  let dp = []
  let row = dungeon.length
  for (let i = row - 1; i >= 0; i--) {
    dp[i] = []
    let column = dungeon[i].length
    for (let j = column - 1; j >= 0; j--) {
      if (i === row - 1 && j === column - 1) {
        dp[i][j] = Math.min(0, dungeon[i][j])
      } else if (i === row - 1) {
        dp[i][j] = Math.min(0, dp[i][j + 1] + dungeon[i][j])
      } else if (j === column - 1) {
        dp[i][j] = Math.min(0, dp[i + 1][j] + dungeon[i][j])
      } else {
        dp[i][j] = Math.min(0, Math.max(dp[i + 1][j], dp[i][j + 1]) + dungeon[i][j])
      }
    }
  }
  return -dp[0][0] + 1
}