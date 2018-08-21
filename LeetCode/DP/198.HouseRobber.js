/**
 * @param {number[]} nums
 * @return {number}
 */

// dp记录是否抢劫当前房间可以获得的最大值
// 状态转移方程: dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
var rob = function (nums) {
  let dp = []
  for (var i = 0; i < nums.length; i++) {
    if (i === 0) {
      dp[i] = nums[i]
    } else if (i === 1) {
      dp[i] = Math.max(dp[i - 1], nums[i])
    } else {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }
  }
  return dp[i - 1] || 0
}