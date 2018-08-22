/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */

// dp 记录以 i , j 结尾的A, B的公共子串长度
var findLength = function (A, B) {
  let dp = []
  let max = 0
  for (let i = 0; i < A.length; i++) {
    dp[i] = []
    for (let j = 0; j < B.length; j++) {
      if (A[i] === B[j]) {
        dp[i][j] = i === 0 || j === 0 ? 1 : dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = 0
      }
      max = Math.max(dp[i][j], max)
    }
  }
  return max
}