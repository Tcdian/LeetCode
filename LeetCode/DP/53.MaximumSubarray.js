/**
 * @param {number[]} nums
 * @return {number}
 */

// dp记录前 i 个元素的最大子列和
// 状态转移方程: dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
var maxSubArray = function (nums) {
  let dp = []
  let result = -Infinity
  for (var i = 0; i < nums.length; i++) {
    if (i === 0) {
      dp[i] = nums[i]
    } else {
      dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    }
    result = Math.max(result, dp[i])
  }
  return result === -Infinity ? null : result
}