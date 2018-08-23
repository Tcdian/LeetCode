/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */

var minSubArrayLen = function (s, nums) {
  let min = Infinity
  let sum = 0
  for (let left = 0, right = 0; right < nums.length; right++) {
    sum += nums[right]
    while (sum >= s) {
      min = Math.min(min, right - left + 1)
      sum -= nums[left++]
    }
  }
  return min === Infinity ? 0 : min
}