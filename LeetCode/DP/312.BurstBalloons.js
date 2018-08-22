/**
 * @param {number[]} nums
 * @return {number}
 */

// i 代表 i在 left - right 区间内最后一个打破可以获得的分数
var maxCoins = function (nums) {
  let numsLen = nums.length
  nums.push(1)
  nums.unshift(1)
  let dp = new Array(numsLen + 2).fill(0).map(it => new Array(numsLen + 2).fill(0))
  for (let len = 1; len <= numsLen; len++) {
    for (let left = 1; left <= numsLen - len + 1; left++) {
      let right = left + len - 1
      for (let i = left; i <= right; i++) {
        dp[left][right] = Math.max(dp[left][right], dp[left][i - 1] + dp[i + 1][right] + nums[left - 1] * nums[i] * nums[right + 1])
      }
    }
  }
  return dp[1][numsLen]
}