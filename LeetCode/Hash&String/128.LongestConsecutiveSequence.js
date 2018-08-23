/**
 * @param {number[]} nums
 * @return {number}
 */

// 每次更新相连的数字两边的 count 值
var longestConsecutive = function (nums) {
  let hashMap = new Map()
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.has(nums[i])) {
      continue
    }
    let leftVal = nums[i] - 1
    let rightVal = nums[i] + 1
    let count
    if (hashMap.has(leftVal) && hashMap.has(rightVal)) {
      let leftCount = hashMap.get(leftVal)
      let rightCount = hashMap.get(rightVal)
      count = leftCount + rightCount + 1
      hashMap.set(nums[i], count)
      hashMap.set(nums[i] - leftCount, count)
      hashMap.set(nums[i] + rightCount, count)
    } else if (hashMap.has(leftVal)) {
      let leftCount = hashMap.get(leftVal)
      count = leftCount + 1
      hashMap.set(nums[i], count)
      hashMap.set(nums[i] - leftCount, count)
    } else if (hashMap.has(rightVal)) {
      let rightCount = hashMap.get(rightVal)
      count = rightCount + 1
      hashMap.set(nums[i], count)
      hashMap.set(nums[i] + rightCount, count)
    } else {
      count = 1
      hashMap.set(nums[i], count)
    }
    max = Math.max(max, count)
  }
  return max
}