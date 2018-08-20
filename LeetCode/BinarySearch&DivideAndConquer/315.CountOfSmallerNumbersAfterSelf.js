/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 解法一: 分治
var countSmaller = function (nums) {
  let count = new Array(nums.length).fill(0)
  let pairs = nums.map((num, index) => [num, index])

  function merge(pairs) {
    if (pairs.length <= 1) {
      return pairs
    }
    let len = pairs.length
    let separator = Math.floor(len / 2)
    let leftPart = merge(pairs.slice(0, separator))
    let rightPart = merge(pairs.slice(separator))
    let mergeResult = []
    for (var i = 0, j = 0; i < leftPart.length; i++) {
      // rightPart部分有几个元素比当前leftPart元素小
      while (j < rightPart.length && leftPart[i][0] > rightPart[j][0]) {
        mergeResult.push(rightPart[j])
        j++
      }
      count[leftPart[i][1]] += j
      mergeResult.push(leftPart[i])
    }
    mergeResult.push(...rightPart.slice(j))
    return mergeResult
  }

  merge(pairs)
  return count
}