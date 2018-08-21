/**
 * @param {number[]} nums
 * @return {number}
 */

// 不可同时抢劫 nums[0] 和 nums[nums.length - 1],则取 Math.max(houseRob(nums.slice(1)), houseRob(nums.slice(0, nums.length - 1)))
var rob = function (nums) {

  if (nums.length === 0) {
    return 0
  } else if (nums.length < 3) {
    return Math.max(...nums)
  } else {
    return Math.max(houseRob(nums.slice(1)), houseRob(nums.slice(0, nums.length - 1)))
  }

  function houseRob(nums) {
    let dp = []
    for (var i = 0; i < nums.length; i++) {21
      if (i === 0) {
        dp[i] = nums[i]
      } else if (i === 1) {
        dp[i] = Math.max(dp[i - 1], nums[i])
      } else {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
      }
    }
    return dp[i - 1]
  }
}