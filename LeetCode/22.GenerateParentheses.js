/**
 * @param {number} n
 * @return {string[]}
 */

// 左括号的数量不超过n, 右括号的 数量不超过 左括号, 则可构成合法的括号
var generateParenthesis = function (n) {
  let result = []
  let item = []

  function backtracking(left = 0, right = 0) {
    if (left >= n && right >= n) {
      result.push(item.join(''))
      return result
    }
    if (left < n) {
      item.push('(')
      backtracking(left + 1, right)
      item.pop()
    }
    if (right < left) {
      item.push(')')
      backtracking(left, right + 1)
      item.pop()
    }
    return result
  }
  return backtracking()
}