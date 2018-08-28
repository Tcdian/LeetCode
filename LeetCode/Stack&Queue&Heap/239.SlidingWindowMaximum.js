/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// 使用数组模拟 dequeue, 时间复杂度 O(n)
var maxSlidingWindow = function (nums, k) {
  let result = []
  let window = []
  let front = 0
  for (let i = 0; i < nums.length; i++) {
    let insertIndex = window.length
    while (window[insertIndex - 1] < nums[i] && insertIndex > front) {
      insertIndex--
      window.pop()
    }
    window[insertIndex] = nums[i]
    if (i >= k - 1) {
      result.push(window[front])
    }
    if (window[front] === nums[i - k + 1]) {
      front++
    }
  }
  return result
}