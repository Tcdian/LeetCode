/**
 * @param {string} s
 * @return {number}
 */

var calculate = function (s) {
  let sign = 1
  let result = 0
  let number = 0
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (/[0-9]/.test(s[i])) {
      let tmpStr = s.slice(i);
      let tmpNum = /\d+/.exec(tmpStr)[0];
      let len = tmpNum.length
      number = Number(tmpNum)
      i += len - 1
    } else if (s[i] === '+') {
      result += sign * number
      number = 0
      sign = 1
    } else if (s[i] === '-') {
      result += sign * number
      number = 0
      sign = -1
    } else if (s[i] === '(') {
      stack.push(result)
      stack.push(sign)
      result = 0
      sign = 1
    } else if (s[i] === ')') {
      result += number * sign
      number = 0
      sign = 1
      result *= stack.pop()
      result += stack.pop()
    }
  }
  return number === 0 ? result : result += sign * number
}