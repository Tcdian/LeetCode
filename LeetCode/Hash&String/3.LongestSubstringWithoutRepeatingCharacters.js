/**
 * @param {string} s
 * @return {number}
 */

//经典滑动窗口
var lengthOfLongestSubstring = function (s) {
  let result = 0
  let hashMap = new Map()
  for (let i = 0, start = 0; i < s.length && start < s.length - result; i++) {
    if (hashMap.has(s[i])) {
      while (s[start] !== s[i]) {
        hashMap.delete(s[start])
        start++
      }
      start++
    } else {
      hashMap.set(s[i], 'exist')
    }
    result = Math.max(result, i - start + 1)
  }
  return result
}