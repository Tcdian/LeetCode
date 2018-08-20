/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */

// 贪心算法
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  for (var i = 0, j = 0; i < s.length; i++) {
    if (g[j] <= s[i]) {
      j++
    }
  }
  return j
}