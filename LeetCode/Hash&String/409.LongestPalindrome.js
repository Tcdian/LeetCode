/**
 * @param {string} s
 * @return {number}
 */

var longestPalindrome = function (s) {
  let maxLen = 0
  let flag = 0
  let hashMap = new Map()
  for (let i = 0; i < s.length; i++) {
    if (hashMap.has(s[i])) {
      let val = hashMap.get(s[i]) + 1
      hashMap.set(s[i], val)
    } else {
      hashMap.set(s[i], 1)
    }
  }
  hashMap.forEach(val => {
    if (val % 2 === 0) {
      maxLen += val
    } else {
      maxLen += val - 1
      flag = 1
    }
  })
  return maxLen + flag
}