/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var moveZeroes = function (nums) {
  for (let i = 0, j = -1; i < nums.length; i++) {
    if (nums[i] !== 0) {
      j++
      swap(i, j)
    }
  }

  function swap(x, y) {
    let tmp = nums[x]
    nums[x] = nums[y]
    nums[y] = tmp
  }
}