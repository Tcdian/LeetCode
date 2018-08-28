/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var twoSum = function (nums, target) {
  let hash = new Map()
  for (let i = 0; i < nums.length; i++) {
    let tmp = target - nums[i]
    if (hash.has(tmp)) {
      return [hash.get(tmp), i]
    } else {
      hash.set(nums[i], i)
    }
  }
}