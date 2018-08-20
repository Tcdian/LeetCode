/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var searchInsert = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  if (target > nums[nums.length - 1]) {
    return nums.length
  }
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
}