/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {

  // 左边界Function
  function leftBoundary(nums, target) {
    let left = 0
    let right = nums.length - 1
    let result
    while (left <= right) {
      let mid = Math.floor((left + right) / 2)
      if (nums[mid] === target) {
        result = mid
      }
      if (nums[mid] >= target) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return result
  }

  // 右边界Function
  function rightBoundary(nums, target) {
    let left = 0
    let right = nums.length - 1
    let result
    while (left <= right) {
      let mid = Math.floor((left + right) / 2)
      if (nums[mid] === target) {
        result = mid
      }
      if (nums[mid] > target) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return result
  }

  let leftBound = leftBoundary(nums, target)
  let rightBound = rightBoundary(nums, target)
  return [leftBound === void 0 ? -1 : leftBound, rightBound === void 0 ? -1 : rightBound]

}