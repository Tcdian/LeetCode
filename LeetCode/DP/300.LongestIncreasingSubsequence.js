/**
 * @param {number[]} nums
 * @return {number}
 */

// 解法一: dp
// dp[i] 表示以 nums[i] 为结尾的最长递增子序列
// 状态转移方程 dp[i] = Math.max(dp[i], dp[j] + 1)
// 时间复杂度 O(n)
var lengthOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1)
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    max = Math.max(max, dp[i])
  }
  return max
}

// 解法二: stack
// 维持一个stack, stack内 元素为以 index + 1结尾的递增子序列的最小值
// 时间复杂度 O(nlogn)
var lengthOfLIS = function (nums) {
  let stack = []
  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0 || stack[stack.length - 1] < nums[i]) {
      stack.push(nums[i])
    } else {
      let left = 0
      let right = stack.length - 1
      while (left < right) {
        let mid = Math.floor((left + right) / 2)
        if (stack[mid] < nums[i]) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      stack[left] = nums[i]
    }
  }
  return stack.length
}