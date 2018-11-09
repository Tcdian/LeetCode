/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// 主体思想在于维持一个有序的 decrementQueue, 常规方法是利用二分法或者 BST 树, 总体时间复杂度为 O(n.logn)
// 下面用 dequeue 思想记录一个有利用价值(如果后方出现比之前大的值, 则删除小的值)的递减序列, 可以将时间复杂度降低为 O(n)
// 使用数组模拟 dequeue, 时间复杂度 O(n)
var maxSlidingWindow = function (nums, k) {
  let result = []
  let decrementQueue = []
  let front = 0
  for (let i = 0; i < nums.length; i++) {
    let insertIndex = decrementQueue.length
    while (decrementQueue[insertIndex - 1] < nums[i] && insertIndex > front) {
      insertIndex--
      decrementQueue.pop()
    }
    decrementQueue[insertIndex] = nums[i]
    if (i >= k - 1) {
      result.push(decrementQueue[front])
    }
    if (decrementQueue[front] === nums[i - k + 1]) {
      front++
    }
  }
  return result
}