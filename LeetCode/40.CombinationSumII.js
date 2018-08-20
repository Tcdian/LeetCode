/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

var combinationSum2 = function (candidates, target) {
  let result = target === 0 ? [[]] : []
  let hashMap = new Map()
  let sum = 0
  let item = []
  // 从大到小排序, 便于剪枝
  candidates.sort((a, b) => b - a)

  function backtracking(i = 0) {
    if (sum > target || i >= candidates.length) {
      return result
    }
    item.push(candidates[i])
    sum += candidates[i]
    if (sum === target && !hashMap.has(item.join(','))) {
      result.push(item.slice())
      hashMap.set(item.join(','), 'exist')
    }
    backtracking(i + 1)
    sum -= candidates[i]
    item.pop()
    backtracking(i + 1)
    return result
  }
  return backtracking()
}