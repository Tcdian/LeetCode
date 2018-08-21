/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

// 滑动窗口问题
var minWindow = function (s, t) {
  let tMap = new Map()
  let tLen = t.length
  for (let i = 0; i < tLen; i++) {
    if (tMap.has(t[i])) {
      let tmpVal = tMap.get(t[i]) + 1
      tMap.set(t[i], tmpVal)
    } else {
      tMap.set(t[i], 1)
    }
  }

  let count = 0
  let windowMap = new Map()
  let result = ''
  let resultLen = Infinity

  for (let i = 0, start = 0; i < s.length; i++) {
    if (tMap.has(s[i])) {
      let tmpVal
      if (windowMap.has(s[i])) {
        tmpVal = windowMap.get(s[i]) + 1
      } else {
        tmpVal = 1
      }
      windowMap.set(s[i], tmpVal)
      if (tmpVal <= tMap.get(s[i])) {
        count++
      }
      while (!tMap.has(s[start]) || windowMap.get(s[start]) > tMap.get(s[start])) {
        if (tMap.has(s[start])) {
          let tmp = windowMap.get(s[start]) - 1
          windowMap.set(s[start], tmp)
        }
        start++
      }
      if (count === tLen) {
        if (resultLen > i - start + 1) {
          resultLen = i - start + 1
          result = s.slice(start, i + 1)
        }
      }
    }
  }
  return result
}