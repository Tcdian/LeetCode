/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

var wordBreak = function (s, wordDict) {

  let hashSet = new Set()
  for (let i = 0; i < wordDict.length; i++) {
    hashSet.add(wordDict[i])
  }
  // dp 记录当前长度的 s.slice(0, i) 能否拆解成在 wordDict中 查找到
  let dp = new Array(s.length + 1).fill(false)
  for (var i = 0; i <= s.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (i === 0) {
        dp[i] = true
      } else if (dp[j] && hashSet.has(s.slice(j, i))) {
        dp[i] = true
        break
      }
    }
  }

  return dp[i - 1]
}