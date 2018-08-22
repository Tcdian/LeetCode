/**
 * @param {number} n
 * @return {number}
 */

// 将 n 分成两部分, 分别组成左子树和右子树
var numTrees = function (n) {
  let dp = new Array(n + 1).fill(0)
  dp[0] = 1
  for (var i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1]
    }
  }
  return dp[i - 1]
}