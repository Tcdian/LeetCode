/**
 * @param {number[]} nums
 * @return {number}
 */

// 每次跳跃时, 贪心的在当前克选择范围内选择最远的跳跃index
var jump = function (nums) {
  if (nums.length < 2)
    return 0
  let maxIndex = 0
  let jumpMin = 0
  let currentMaxIndex = 0
  for (let i = 0; i < nums.length; i++) {
    currentMaxIndex = Math.max(currentMaxIndex, i + nums[i])
    if (currentMaxIndex >= nums.length - 1) {
      return jumpMin + 1
    }
    if (maxIndex === i) {
      jumpMin++
      maxIndex = currentMaxIndex
    }
  }
}