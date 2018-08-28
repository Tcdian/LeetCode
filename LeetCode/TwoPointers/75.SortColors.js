/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var sortColors = function (nums) {

  function swap(x, y) {
    let tmp = nums[x]
    nums[x] = nums[y]
    nums[y] = tmp
  }

  let left = 0
  let right = nums.length - 1
  for (let i = 0; i <= right; i++) {
    // 注意判断顺序,应该先判断 2 的情况, 因为 i 从前往后遍历, swap不可能交换一个 0 到当前位置,
    // 但是有可能交换一个2到当前位置, 所以需要先判断 2 的情况, 同时需要 while
    while (nums[i] === 2 && i < right) {
      swap(i, right--)
    }
    if (nums[i] === 0) {
      swap(i, left++)
    }
  }
}