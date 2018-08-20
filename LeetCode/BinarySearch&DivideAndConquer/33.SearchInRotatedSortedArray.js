/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 首先通过二分法找到旋转 point, 然后确定 target在哪个递增的区间内, 二分法求出最终 index
var search = function (nums, target) {
  // 查找旋转 point
  function findRotatedPoint(nums) {
    if (nums[0] <= nums[nums.length - 1]) {
      return
    }
    let left = 0
    let right = nums.length - 1
    while (nums[left] > nums[right]) {
      let mid = Math.floor((left + right) / 2)
      if (nums[mid] > nums[right]) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    return left
  }

  let rotatedPoint = findRotatedPoint(nums)
  let left
  let right
  if (rotatedPoint === void 0) {
    left = 0
    right = nums.length - 1
  } else if (nums[0] > target) {
    left = rotatedPoint
    right = nums.length - 1
  } else {
    left = 0
    right = rotatedPoint - 1
  }
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
}