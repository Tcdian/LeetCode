/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// 对nums 进行排序, 然后结果进行去重处理
var subsetsWithDup = function (nums) {
  let result = [[]]
  let hashMap = new Map()
  let item = []
  nums.sort((a, b) => a - b)

  function backtracking(i = 0) {
    if (i >= nums.length) {
      return result
    }
    item.push(nums[i])
    if (!hashMap.has(item.join(','))) {
      result.push(item.slice())
      hashMap.set(item.join(','), 'exist')
    }
    backtracking(i + 1)
    item.pop()
    backtracking(i + 1)
    return result
  }
  return backtracking()
}