/**
 * @param {number[]} nums
 * @return {number[][]}
 */

//对于数组中的每个元素, 都有选或者不选两种情况, 回溯处理每种情况
var subsets = function (nums) {
  let result = [[]]
  let item = []

  function backtracking(i = 0) {
    if (i >= nums.length) {
      return result
    }
    item.push(nums[i])
    result.push(item.slice())
    backtracking(i + 1)
    item.pop()
    backtracking(i + 1)
    return result
  }
  return backtracking()
}