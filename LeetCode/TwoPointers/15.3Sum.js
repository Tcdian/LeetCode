/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let hashSet = new Set()
  let result = []
  for (let i = 0; i < nums.length; i++) {
    let left = 0
    let right = nums.length - 1
    while (left < i && right > i) {
      if (nums[left] + nums[i] + nums[right] < 0) {
        left++
      } else if (nums[left] + nums[i] + nums[right] > 0) {
        right--
      } else {
        if (!hashSet.has(`${nums[left]}#${nums[i]}#${nums[right]}`)) {
          result.push([nums[left], nums[i], nums[right]])
          hashSet.add(`${nums[left]}#${nums[i]}#${nums[right]}`)
        }
        left++
        right--
      }
    }
  }
  return result
}