/**
 * @param {number[]} height
 * @return {number}
 */

var maxArea = function (height) {
  let currentHeight = 0
  let water = 0
  let left = 0
  let right = height.length - 1
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] > currentHeight) {
        currentHeight = height[left]
        water = Math.max(water, currentHeight * (right - left))
      }
      left++
    } else {
      if (height[right] > currentHeight) {
        currentHeight = height[right]
        water = Math.max(water, currentHeight * (right - left))
      }
      right--
    }
  }
  return water
}