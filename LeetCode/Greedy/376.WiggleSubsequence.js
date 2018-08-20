/**
 * @param {number[]} nums
 * @return {number}
 */

var wiggleMaxLength = function (nums) {
  if (nums.length < 2)
    return nums.length
  let result = 1
  let up
  //标记当前的状态
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      if (up === void 0 || up === false) {
        up = true
        result++
      }
    } else if (nums[i] < nums[i - 1]) {
      if (up === void 0 || up === true) {
        up = false
        result++
      }
    }
  }
  return result
}
