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
  let directionX = [-1, 0, 1, 0]
  let directionY = [0, 1, 0, -1]
  for (let k = 0; k < incrementSortPosition.length; k++) {
    let i = incrementSortPosition[k][0]
    let j = incrementSortPosition[k][1]
    for (let d = 0; d < 4; d++) {
      let dx = i + directionX[d]
      let dy = j + directionY[d]
      if (dx < 0 || dx >= matrix.length || dy < 0 || dy >= matrix[i].length) {
        continue
      }
      if (matrix[i][j] < matrix[dx][dy]) {
        dp[dx][dy] = Math.max(dp[dx][dy], dp[i][j] + 1)
        max = Math.max(max, dp[dx][dy])
      }
    }
  }
  return max
}