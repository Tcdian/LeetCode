/**
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function (s) {
  let hashSet = new Set()
  let max = 0
  for (let left = 0, right = 0; right < s.length; right++) {
    if (hashSet.has(s[right])) {
      while (s[left] !== s[right]) {
        hashSet.delete(s[left++])
      }
      left++
    } else {
      hashSet.add(s[right])
    }
    max = Math.max(max, right - left + 1)
  }
  return max
}