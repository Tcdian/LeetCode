/**
 * @param {number[]} nums
 * @return {boolean}
 */

//这题的关键在于剪枝, 减少回溯的次数
var makesquare = function (nums) {

  // 数量小于4, 返回false
  if (nums.length < 4) {
    return false
  }

  // 总和不能被4整除, 返回false
  let sum = nums.reduce((accumulator, num) => accumulator + num)
  if (sum % 4 !== 0) {
    return false
  }

  // 长边到短边回溯, 减少回溯次数
  nums.sort((a, b) => b - a)

  // 最大边大于 sum / 4, 返回false
  let sideLen = sum / 4
  if (nums[0] > sideLen) {
    return false
  }

  let sides = new Array(4).fill(0)
  let result = false

  function backtracking(j = 0) {

    // 不直接判断 sides.filter(side => side === sideLen).length === 4, 减少sides.filter运行次数
    if (j >= nums.length) {
      return sides.filter(side => side === sideLen).length === 4
    }
    for (let i = 0; i < 4; i++) {
      if (sides[i] + nums[j] <= sideLen) {
        sides[i] += nums[j]
        if (backtracking(j + 1)) {
          return true
        }
        sides[i] -= nums[j]
      }
    }
    return false
  }

  return backtracking()
}