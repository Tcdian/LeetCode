/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 每次贪心的跳到 当前可以跳到的最远 index
var canJump = function (nums) {
  let maxIndex = nums[0]
  for (i = 0; i <= maxIndex; i++) {
    maxIndex = Math.max(maxIndex, i + nums[i])
    if (maxIndex >= nums.length - 1) return true
  }
  return false
}
