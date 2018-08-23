/**
 * @param {number[]} height
 * @return {number}
 */

var trap = function (height) {
  let left = 0
  let right = height.length - 1
  let maxLeftHeight = 0
  let maxRightHeight = 0
  let result = 0
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] < maxLeftHeight) {
        result += maxLeftHeight - height[left]
      } else {
        maxLeftHeight = height[left]
      }
      left++
    } else {
      if (height[right] < maxRightHeight) {
        result += maxRightHeight - height[right]
      } else {
        maxRightHeight = height[right]
      }
      right--
    }
  }
  return result
}