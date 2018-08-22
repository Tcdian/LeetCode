/**
 * @param {number[][]} matrix
 * @return {number}
 */

// 从低到高遍历, 更新四周比它高的地方的 dp 值
var longestIncreasingPath = function (matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0
  let hashMap = new Map()
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (hashMap.has(matrix[i][j])) {
        hashMap.get(matrix[i][j]).push([i, j])
      } else {
        hashMap.set(matrix[i][j], [
          [i, j]
        ])
      }
    }
  }
  let incrementSortVal = Array.from(hashMap.keys()).sort((a, b) => a - b)
  let incrementSortPosition = []
  incrementSortVal.forEach(val => {
    incrementSortPosition.push(...hashMap.get(val))
  })
  let max = 1
  let dp = new Array(matrix.length).fill(0).map(it => new Array(matrix[0].length).fill(1))
  for (let k = 0; k < incrementSortPosition.length; k++) {
    let i = incrementSortPosition[k][0]
    let j = incrementSortPosition[k][1]
    if (i > 0 && matrix[i][j] < matrix[i - 1][j]) {
      dp[i - 1][j] = Math.max(dp[i - 1][j], dp[i][j] + 1)
      max = Math.max(max, dp[i - 1][j])
    }
    if (j < matrix[i].length - 1 && matrix[i][j] < matrix[i][j + 1]) {
      dp[i][j + 1] = Math.max(dp[i][j + 1], dp[i][j] + 1)
      max = Math.max(max, dp[i][j + 1])
    }
    if (i < matrix.length - 1 && matrix[i][j] < matrix[i + 1][j]) {
      dp[i + 1][j] = Math.max(dp[i + 1][j], dp[i][j] + 1)
      max = Math.max(max, dp[i + 1][j])
    }
    if (j > 0 && matrix[i][j] < matrix[i][j - 1]) {
      dp[i][j - 1] = Math.max(dp[i][j - 1], dp[i][j] + 1)
      max = Math.max(max, dp[i][j - 1])
    }
  }
  return max
}