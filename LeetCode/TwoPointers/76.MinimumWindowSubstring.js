/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

var minWindow = function (s, t) {
  let hashT = new Map()
  let sLen = s.length
  let tLen = t.length
  for (let i = 0; i < tLen; i++) {
    let tmpVal
    if (hashT.has(t[i])) {
      tmpVal = hashT.get(t[i]) + 1
    } else {
      tmpVal = 1
    }
    hashT.set(t[i], tmpVal)
  }

  let hashS = new Map()
  let result = ''
  let count = 0
  let min = Infinity
  for (let left = 0, right = 0; right < sLen; right++) {
    if (hashT.has(s[right])) {
      let tmpVal
      if (hashS.has(s[right])) {
        tmpVal = hashS.get(s[right]) + 1
      } else {
        tmpVal = 1
      }
      hashS.set(s[right], tmpVal)

      if (tmpVal <= hashT.get(s[right])) {
        count++
      }
      if (count === tLen) {
        while (!hashT.has(s[left]) || hashT.get(s[left]) < hashS.get(s[left])) {
          if (hashS.has(s[left])) {
            hashS.set(s[left], hashS.get(s[left]) - 1)
          }
          left++
        }
        if (min > right - left + 1) {
          min = right - left + 1
          result = s.slice(left, right + 1)
        }
      }
    }
  }
  return result
}