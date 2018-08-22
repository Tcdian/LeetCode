/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 解法一: 自上而下递归解法
var PredictTheWinner = function (nums) {
  let hashMap = new Map()

  function maxDiff(left, right) {
    let key = left + ' ' + right
    let result
    if (hashMap.has(key)) {
      return hashMap.get(key)
    }
    if (left === right) {
      result = nums[left]
    } else {
      result = Math.max(nums[left] - maxDiff(left + 1, right), nums[right] - maxDiff(left, right - 1))
    }
    hashMap.set(key, result)
    return result
  }
  return maxDiff(0, nums.length - 1) >= 0
}

//解法二: dp
var PredictTheWinner = function (nums) {
  let dp = []
  for (var i = 0; i < nums.length; i++) {
    dp[i] = []
    for (var j = i; j >= 0; j--) {
      if (i === j) {
        dp[i][j] = nums[i]
      } else {
        dp[i][j] = Math.max(nums[j] - dp[i][j + 1], nums[i] - dp[i - 1][j])
      }
    }
  }
  return dp[i - 1][0] >= 0
}